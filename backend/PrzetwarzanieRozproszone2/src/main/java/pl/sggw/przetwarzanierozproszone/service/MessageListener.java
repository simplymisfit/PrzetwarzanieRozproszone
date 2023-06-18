package pl.sggw.przetwarzanierozproszone.service;

import lombok.AllArgsConstructor;
import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import pl.sggw.przetwarzanierozproszone.configuration.MQConfig;
import pl.sggw.przetwarzanierozproszone.domain.CustomMessage;

import java.util.Date;

@Component
@AllArgsConstructor
public class MessageListener {
    private ApplicationService applicationService;
    @RabbitListener(queues = MQConfig.LISTEN_QUEUE)
    public void listener(CustomMessage message){
        System.out.println(returnMessage(message));
        applicationService.chatMessages.add(returnMessage(message));
        applicationService.sendToAllEmitters(returnMessage(message));
    }

    public String returnMessage(CustomMessage message){
        return returnDate(message.getMessageDate()) + " | " + message.getPlayerName() + " : " + message.getMessage();
    }

    public String returnDate(Date date){
        return date.getHours() + ":" + date.getMinutes() + ":" + date.getSeconds();
    }
}