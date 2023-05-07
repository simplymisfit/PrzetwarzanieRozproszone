package pl.sggw.przetwarzanierozproszone.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import pl.sggw.przetwarzanierozproszone.configuration.MQConfig;
import pl.sggw.przetwarzanierozproszone.domain.CustomMessage;

@Component
public class MessageListener {

    @RabbitListener(queues = MQConfig.QUEUE)
    public void chatListener(CustomMessage message){
        System.out.println(message.getMessageDate().getHours() + ":" + message.getMessageDate().getMinutes() + "\t" + message.getPlayerName() + " : " + message.getMessage());
    }
}