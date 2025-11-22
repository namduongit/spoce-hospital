*Note*: RabbitMQ messaging configuration and exchange types in Spring Boot.

---
### Direct Exchange
```java
@Configuration
public class RabbitMQConfig {
    @Bean
    public Queue messageQueue() {
        return new Queue(RabbitMQ.MESSAGE_QUEUE, false); 
        // MESSAGE_QUEUE = "message-queue"
    }

    @Bean
    public DirectExchange messageExchange() {
        return new DirectExchange(RabbitMQ.MESSAGE_EXCHANGE); 
        // MESSAGE_EXCHANGE = "message-exchange" -> true
        // MESSAGE_EXCHANGE = "message-exchanges" -> false
    }

    @Bean
    public Binding messageBinding() {
        return BindingBuilder.bind(messageQueue()).to(messageExchange()).with(RabbitMQ.MESSAGE_ROUTING_KEY);
    }
}
```
- `Direct Exchange`: Routes messages to queues based on exact routing key match.
- Use case: Simple point-to-point messaging where routing key must match exactly.
- Example: `"notification.email"` only routes to queues bound with `"notification.email"`.

---
### Topics Exchange
```java
@Configuration
public class RabbitMQConfig {
    @Bean
    public Queue messageQueue() {
        return new Queue(RabbitMQ.MESSAGE_QUEUE, false);
        // MESSAGE_QUEUE = "message-queue"
    }   
    @Bean
    public TopicExchange messageExchange() {
        return new TopicExchange(RabbitMQ.MESSAGE_EXCHANGE);
        // MESSAGE_EXCHANGE = "message-exchange" -> true
        // MESSAGE_EXCHANGE = "message*" -> true
        // MESSAGE_EXCHANGE = "messages" -> false
    }   
    @Bean
    public Binding messageBinding() {
        return BindingBuilder.bind(messageQueue()).to(messageExchange()).with(RabbitMQ.MESSAGE_ROUTING_KEY);
    }
}
```
- `Topic Exchange`: Routes messages using wildcard pattern matching on routing keys.
- Patterns: `*` (matches one word), `#` (matches zero or more words).
- Use case: Publish/subscribe with selective routing based on patterns.
- Example: Routing key `"notification.*.urgent"` matches `"notification.email.urgent"`, `"notification.sms.urgent"`.

---
### Fanout Exchange
```java
@Configuration
public class RabbitMQConfig {
    @Bean
    public Queue messageQueue() {
        return new Queue(RabbitMQ.MESSAGE_QUEUE, false);
    }   
    @Bean
    public FanoutExchange messageExchange() {
        return new FanoutExchange(RabbitMQ.MESSAGE_EXCHANGE);
    }   
    @Bean
    public Binding messageBinding() {
        return BindingBuilder.bind(messageQueue()).to(messageExchange());
    }
}
```
- `Fanout Exchange`: Broadcasts messages to all bound queues, ignoring routing keys.
- Use case: Broadcast messages to multiple consumers (e.g., notification to all services).
- Example: Send appointment update to email service, SMS service, and logging service simultaneously.

---
### Configuration Overview: RabbitMQ
```java
@Bean
public TopicExchange mainExchange() {
    return new TopicExchange(RabbitMQ.MAIN_EXCHANGE, true, false);
}
```
- `durable: true`: The exchange survives broker restart (stored on disk).
- `autoDelete: false`: The exchange won't be deleted when no longer in use.
- `exclusive`: If true, only one connection can use the queue.

---
### Sending Messages
```java
@Service
public class MessageProducer {
    @Autowired
    private RabbitTemplate rabbitTemplate;

    public void sendMessage(String routingKey, String message) {
        rabbitTemplate.convertAndSend(RabbitMQ.MAIN_EXCHANGE, routingKey, message);
    }
}
```

---
### Consuming Messages
```java
@Component
public class MessageConsumer {
    @RabbitListener(queues = RabbitMQ.MESSAGE_QUEUE)
    public void receiveMessage(String message) {
        System.out.println("Received: " + message);
        // Process the message
    }
}
```

---
**Architecture Diagram**
```bash
            +------------------+
            |   Producer App   |
            +------------------+
                     |
                     v
            +------------------+
            |   RabbitMQ       |
            |   (Exchange)     |
            +------------------+
                     |
     ---------------------------------
     |               |               |       Binding Keys / Routing Keys
     v               v               v
+---------+     +---------+     +---------+
| Queue 1 |     | Queue 2 |     | Queue 3 |
+---------+     +---------+     +---------+
     |               |               |
     v               v               v
+---------+     +---------+     +---------+
|Consumer1|     |Consumer2|     |Consumer3|
+---------+     +---------+     +---------+
```

***Note***
- Producer App: The application that sends messages to RabbitMQ.
- RabbitMQ (Exchange): The message broker that routes messages to queues based on exchange type and routing keys.
- Queues: Buffers that store messages until they are processed by consumers.
- Consumers: Applications or services that receive and process messages from the queues.
