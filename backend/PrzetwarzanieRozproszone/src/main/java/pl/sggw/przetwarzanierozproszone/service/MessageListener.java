package pl.sggw.przetwarzanierozproszone.service;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;
import pl.sggw.przetwarzanierozproszone.configuration.MQConfig;
import pl.sggw.przetwarzanierozproszone.domain.CustomMessage;

@Component
public class MessageListener {
    @RabbitListener(queues = MQConfig.QUEUE)
    public void listener(CustomMessage message){
        System.out.println(message);
    }

    @RabbitListener(queues = MQConfig.QUEUE2)
    public void listener2(CustomMessage message){
        System.out.println(message);
    }
}