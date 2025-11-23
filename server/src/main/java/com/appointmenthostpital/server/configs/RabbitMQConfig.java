package com.appointmenthostpital.server.configs;

import org.springframework.amqp.core.Queue;
import org.springframework.amqp.core.TopicExchange;
import org.springframework.amqp.rabbit.core.RabbitTemplate;
import org.springframework.amqp.support.converter.Jackson2JsonMessageConverter;
import org.springframework.amqp.support.converter.MessageConverter;
import org.springframework.beans.factory.annotation.Qualifier;
import org.springframework.amqp.core.AmqpTemplate;
import org.springframework.amqp.core.Binding;
import org.springframework.amqp.core.BindingBuilder;
import org.springframework.amqp.core.DirectExchange;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

import com.appointmenthostpital.server.utils.RabbitMQ;

import org.springframework.amqp.rabbit.connection.ConnectionFactory;

@Configuration
public class RabbitMQConfig { 
    // Converter to JSON
    @Bean
    public MessageConverter jsonMessageConverter() {
        return new Jackson2JsonMessageConverter();
    }

    @Bean
    public AmqpTemplate amqpTemplate(ConnectionFactory connectionFactory) {
        RabbitTemplate rabbitTemplate = new RabbitTemplate(connectionFactory);
        rabbitTemplate.setMessageConverter(jsonMessageConverter());
        return rabbitTemplate;
    }

    // Exchanges
    @Bean
    public TopicExchange mainExchange() {
        return new TopicExchange(RabbitMQ.MAIN_EXCHANGE, true, false);
    }

    @Bean
    public TopicExchange sendEmailExchange() {
        return new TopicExchange(RabbitMQ.SEND_EMAIL_EXCHANGE, true, false);
    }

    @Bean
    public DirectExchange uploadDoctorExchange() {
        return new DirectExchange(RabbitMQ.UPLOAD_DOCTOR_EXCHANGE, true, false);
    }

    @Bean
    public DirectExchange removeDoctorExchange() {
        return new DirectExchange(RabbitMQ.REMOVE_DOCTOR_EXCHANGE, true, false);
    }

    // Queues
    @Bean
    public Queue uploadDoctorQueue() {
        return new Queue(RabbitMQ.UPLOAD_DOCTOR_QUEUE);
    }

    @Bean
    public Queue removeDoctorQueue() {
        return new Queue(RabbitMQ.REMOVE_DOCTOR_QUEUE);
    }

    @Bean
    public Queue resetPasswordQueue() {
        return new Queue(RabbitMQ.RESET_PASSWORD_QUEUE);
    }

    @Bean 
    public Queue emailContactQueue() {
        return new Queue(RabbitMQ.EMAIL_CONTACT_QUEUE);
    }

    /* @Qualifier("params") -> params -> Func name */

    /**
     * Upload Doctor Binding. Used to upload doctor profile pictures.
     *  
     * @param uploadDoctorQueue
     * @param uploadDoctorExchange
     * @return
     * 
     */
    @Bean
    public Binding uploadDoctorBinding(
        @Qualifier("uploadDoctorQueue") Queue uploadDoctorQueue, @Qualifier("uploadDoctorExchange") DirectExchange uploadDoctorExchange) {
        return BindingBuilder.bind(uploadDoctorQueue)
        .to(uploadDoctorExchange)
        .with(RabbitMQ.UPLOAD_DOCTOR_ROUTING_KEY);
    }


    @Bean
    public Binding removeDoctorBinding(
        @Qualifier("removeDoctorQueue") Queue removeDoctorQueue, @Qualifier("removeDoctorExchange") DirectExchange removeDoctorExchange) {
        return BindingBuilder.bind(removeDoctorQueue)
        .to(removeDoctorExchange)
        .with(RabbitMQ.REMOVE_DOCTOR_ROUTING_KEY);
    }

    /**
     * Reset Password Binding. Used to reset user passwords.
     *  
     * @param resetPasswordQueue
     * @param mainExchange
     * @return
     * 
     * #: Allows binding with routing keys that have zero or more words in place of the # symbol.
     */
    @Bean
    public Binding resetPasswordBinding(
        @Qualifier("resetPasswordQueue") Queue resetPasswordQueue,
        @Qualifier("sendEmailExchange") TopicExchange sendEmailExchange) {
        return BindingBuilder.bind(resetPasswordQueue)
        .to(sendEmailExchange)
        .with(RabbitMQ.SEND_EMAIL_ROUTING_KEY +".reset-password.#");
    }

    /**
     * Email Contact Binding. Used to handle contact emails.
     *  
     * @param emailContactQueue
     * @param mainExchange
     * @return
     */
    @Bean
    public Binding emailContactBinding(
        @Qualifier("emailContactQueue") Queue emailContactQueue,
        @Qualifier("sendEmailExchange") TopicExchange sendEmailExchange) {
        return BindingBuilder.bind(emailContactQueue)
        .to(sendEmailExchange)
        .with(RabbitMQ.SEND_EMAIL_ROUTING_KEY +".contact.#");
    }
}