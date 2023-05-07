package pl.sggw.przetwarzanierozproszone.controller;

import lombok.RequiredArgsConstructor;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import pl.sggw.przetwarzanierozproszone.configuration.MQConfig;
import pl.sggw.przetwarzanierozproszone.domain.CustomMessage;
import pl.sggw.przetwarzanierozproszone.domain.Player;
import pl.sggw.przetwarzanierozproszone.service.ApplicationService;

import java.util.Date;
import java.util.UUID;

@RestController
@RequiredArgsConstructor
@RequestMapping("/api/game")
public class ApplicationController {

    @Autowired
    private RabbitTemplate template;
    private final ApplicationService applicationService;
    @PostMapping("/register")
    public Player processRegister(@RequestBody Player player) {
        return applicationService.createPlayer(player);
    }
    @PostMapping("/publish")
    public String publishMessage(@RequestBody CustomMessage message){
        message.setMessgaeId(UUID.randomUUID().toString());
        message.setMessageDate(new Date());
        template.convertAndSend(MQConfig.EXCHANGE, MQConfig.ROUTING_KEY, message);

        return "Message published";
    }

    @PostMapping("/channel")
    public String channel(@RequestBody int channel){
        return applicationService.setChannel(channel) ? "Zalogowano na kanał "+channel : "Wybrano nieistniejący kanał";
    }
}
