package dk.springboot.restful.webscrape;
import lombok.RequiredArgsConstructor;
import lombok.SneakyThrows;
import lombok.extern.slf4j.Slf4j;
import org.springframework.amqp.core.Message;
import org.springframework.amqp.core.MessageListener;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;
import org.springframework.amqp.rabbit.annotation.RabbitListener;


@RestController
@RequestMapping(value = "api/v1/webscrape", produces = "application/json")
@Slf4j
@RequiredArgsConstructor

@Service
public class WebscrapeListener implements MessageListener {

    private static String webscrapeMessage = "";

    @GetMapping
    public ResponseEntity<String> getLatestRabbitMQMessage() {
        return ResponseEntity.ok(webscrapeMessage);
    }

    @SneakyThrows
    @RabbitListener(queues = "webscrapeData")
    public void onMessage(Message message) {
        try {
            webscrapeMessage = new String(message.getBody());
        }catch (Exception err) {
            System.out.println(err);
        }
    }
}