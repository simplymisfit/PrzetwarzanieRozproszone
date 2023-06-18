package pl.sggw.przetwarzanierozproszone.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.servlet.mvc.method.annotation.SseEmitter;
import pl.sggw.przetwarzanierozproszone.configuration.MQConfig;
import pl.sggw.przetwarzanierozproszone.domain.CustomMessage;
import pl.sggw.przetwarzanierozproszone.domain.Player;
import pl.sggw.przetwarzanierozproszone.domain.PlayerIdUsername;
import pl.sggw.przetwarzanierozproszone.domain.Pokemon;
import pl.sggw.przetwarzanierozproszone.enums.ChannelEnum;
import pl.sggw.przetwarzanierozproszone.service.ApplicationService;

import java.io.IOException;
import java.util.*;

@RestController
@AllArgsConstructor
@RequestMapping("/api/game")
public class ApplicationController {
    private ApplicationService applicationService;
    private RabbitTemplate template;
    private final List<String> chatMessages = new ArrayList<>();
    private final List<SseEmitter> emitters = new ArrayList<>();
    @PostMapping("/register")
    public Player processRegister(@RequestBody Player player) {
        return applicationService.createPlayer(player);
    }
    @GetMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getChatMessages() {
        SseEmitter emitter = new SseEmitter();
        emitters.add(emitter);
        sendChatHistory(emitter);
        return emitter;
    }

    @PostMapping("/trigger")
    public void publishMessage(@RequestBody CustomMessage message){
        message.setMessageId(UUID.randomUUID().toString());
        message.setMessageDate(new Date());

        var msg = message.getMessage();
        if (msg.startsWith("!")) {
            message.setMessage(msg.substring(1));
            template.convertAndSend(MQConfig.EXCHANGE, MQConfig.ROUTING_KEY, message);
            template.convertAndSend(MQConfig.EXCHANGE2, MQConfig.ROUTING_KEY2, message);
        }
        else {
            String exchange;
            String routingKey;
            if (message.getChannel() == ChannelEnum.firstChannel) {
                exchange = MQConfig.EXCHANGE;
                routingKey = MQConfig.ROUTING_KEY;
            } else {
                exchange = MQConfig.EXCHANGE2;
                routingKey = MQConfig.ROUTING_KEY2;
            }

            template.convertAndSend(exchange, routingKey, message);
        }
        chatMessages.add(msg);
        sendToAllEmitters(msg);
    }

    private String returnMessage(CustomMessage message){
        return returnDate(message.getMessageDate()) + " | " + message.getPlayerName() + " : " + message.getMessage();
    }

    private String returnDate(Date date){
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }

    private void sendChatHistory(SseEmitter emitter) {
        try {
            for (String message : chatMessages) {
                emitter.send(message, MediaType.TEXT_PLAIN);
            }
        } catch (IOException e) {
            emitter.completeWithError(e);
        }
    }

    private void sendToAllEmitters(String message) {
        Iterator<SseEmitter> iterator = emitters.iterator();

        while (iterator.hasNext()) {
            SseEmitter emitter = iterator.next();
            try {
                emitter.send(message, MediaType.TEXT_PLAIN);
            } catch (IOException e) {
                emitter.completeWithError(e);
                iterator.remove();
            }
        }
    }

    @PostMapping("/attack/{defenderId}")
    public List<String> attackPlayer(@PathVariable int defenderId){
        String username = applicationService.getPrincipalUsername(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        int attackerId = applicationService.getUserByUsername(username).getId();
        return applicationService.attackPlayer(attackerId,defenderId);
    }

    @PostMapping("/setPokemons")
    public void setPokemons(@RequestBody List<Integer> pokemonsId){
        String username = applicationService.getPrincipalUsername(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        applicationService.choosePokemons(username,pokemonsId);
    }

    @GetMapping("/activePlayers")
    public List<PlayerIdUsername> getActivePlayers(){
        return applicationService.getActivePlayers();
    }

    @GetMapping("/playerPokemons")
    public List<Pokemon> getPlayerPokemons(){
        String username = applicationService.getPrincipalUsername(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return applicationService.getPlayerPokemons(username);
    }

    @GetMapping("/pokemonList")
    public List<Pokemon> getPokemonList(){
        return applicationService.getPokemonList();
    }

    @GetMapping("/getWinsAndLoses")
    public int[] getWinsAndLoses(){
        String username = applicationService.getPrincipalUsername(SecurityContextHolder.getContext().getAuthentication().getPrincipal());
        return applicationService.getWinsAndLoses(username);
    }
}
