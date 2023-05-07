package pl.sggw.przetwarzanierozproszone;

import org.springframework.amqp.rabbit.annotation.RabbitListener;
import org.springframework.stereotype.Component;

@Component
public class MessageListener {

    @RabbitListener(queues = MQConfig.QUEUE)
    public void chatListener(CustomMessage message){
        System.out.println(message.getMessageDate().getHours() + ":" + message.getMessageDate().getMinutes() + "\t" + message.getPlayerName() + " : " + message.getMessage());
    }
}
