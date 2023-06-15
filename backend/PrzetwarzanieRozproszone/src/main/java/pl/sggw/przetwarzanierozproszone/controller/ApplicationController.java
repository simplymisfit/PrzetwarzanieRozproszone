package pl.sggw.przetwarzanierozproszone.controller;

import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import pl.sggw.przetwarzanierozproszone.configuration.MQConfig;
import pl.sggw.przetwarzanierozproszone.domain.CustomMessage;
import pl.sggw.przetwarzanierozproszone.domain.Player;
import pl.sggw.przetwarzanierozproszone.enums.ChannelEnum;
import pl.sggw.przetwarzanierozproszone.service.ApplicationService;

import java.util.Date;
import java.util.List;
import java.util.UUID;

@RestController
@AllArgsConstructor
public class ApplicationController {
    private ApplicationService applicationService;
    private RabbitTemplate template;
    @PostMapping("/register")
    public Player processRegister(@RequestBody Player player) {
        return applicationService.createPlayer(player);
    }
    @PostMapping("/chat")
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
    }

    @PostMapping("/attack/{id}")
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
}
