package pl.sggw.przetwarzanierozproszone.controller;

import lombok.AllArgsConstructor;
import lombok.Data;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.core.env.Environment;
import org.springframework.http.MediaType;
import org.springframework.scheduling.annotation.Async;
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
    private Environment environment;
    @PostMapping("/register")
    public Player processRegister(@RequestBody Player player) {
        return applicationService.createPlayer(player);
    }
    @Async
    @GetMapping(value = "/chat", produces = MediaType.TEXT_EVENT_STREAM_VALUE)
    public SseEmitter getChatMessages() {
        SseEmitter emitter = new SseEmitter(-1L);//nieskończony timeout
        applicationService.emitters.add(emitter);
        applicationService.sendChatHistory(emitter);
        return emitter;
    }

    @PostMapping("/trigger")
    public void publishMessage(@RequestBody String msg){
        CustomMessage message = new CustomMessage();
        message.setMessage(msg);
        message.setMessageId(UUID.randomUUID().toString());
        message.setMessageDate(new Date());
        message.setPlayerName(applicationService.getPrincipalUsername(SecurityContextHolder.getContext().getAuthentication().getPrincipal()));
        if (msg.startsWith("!")) {
            message.setMessage(msg.substring(1));
            template.convertAndSend(MQConfig.EXCHANGE1, MQConfig.ROUTING_KEY1, message);
            template.convertAndSend(MQConfig.EXCHANGE2, MQConfig.ROUTING_KEY2, message);
        }
        else {
            String exchange;
            String routingKey;
            if (environment.getProperty("server.number").equals(1)) {
                exchange = MQConfig.EXCHANGE1;
                routingKey = MQConfig.ROUTING_KEY1;
            } else {
                exchange = MQConfig.EXCHANGE2;
                routingKey = MQConfig.ROUTING_KEY2;
            }

            template.convertAndSend(exchange, routingKey, message);
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
    @GetMapping("/isonline/{username}")
    public boolean isOnline(@PathVariable(value="username") String username){
        return applicationService.logout(username);
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
