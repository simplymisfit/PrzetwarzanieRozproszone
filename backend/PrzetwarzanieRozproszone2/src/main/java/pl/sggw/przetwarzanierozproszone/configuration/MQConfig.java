package pl.sggw.przetwarzanierozproszone.configuration;

import org.springframework.amqp.core.*;
import org.springframework.amqp.rabbit.connection.ConnectionFactory;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
public class MQConfig {

    public static final String SEND_QUEUE = "message_queue2";
    public static final String LISTEN_QUEUE = "message_queue1";
    public static final String EXCHANGE1 = "message_exchange2";
    public static final String EXCHANGE2 = "message_exchange1";
    public static final String ROUTING_KEY1 = "2";
    public static final String ROUTING_KEY2 = "1";

    @Bean
    public Queue queue() {
        return  new Queue(SEND_QUEUE);
    }

    @Bean
    public MessageConverter messageConverter() {
        return  new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate template(ConnectionFactory connectionFactory) {
        RabbitTemplate template = new RabbitTemplate(connectionFactory);
        template.setMessageConverter(messageConverter());
        return  template;
    }

}