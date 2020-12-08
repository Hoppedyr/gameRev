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
import org.json.JSONObject;
import org.springframework.amqp.rabbit.annotation.RabbitListener;

import java.util.ArrayList;

@RestController
@RequestMapping("api/v1/webscrape")
@Slf4j
@RequiredArgsConstructor

@Service
public class WebscrapeListener implements MessageListener {

    private static ArrayList<String> messages = new ArrayList<>();

    @GetMapping
    public ResponseEntity<ArrayList<String>> getRabbitMQMessages() {
        return ResponseEntity.ok(messages);
    }

    @SneakyThrows
    @RabbitListener(queues = "gameRevWebscraper")
    public void onMessage(Message message) {

        System.out.println("HEEEEEEEEEEY");
        System.out.println("HEEEEEEEEEEY");
        System.out.println("HEEEEEEEEEEY");
//        JSONObject jsonBody = new JSONObject(new String(message.getBody()));
//        messages.add(jsonBody);
        messages.add(message.toString());
        System.out.println("Consuming Message - " + new String(message.getBody()));
    }

    @RabbitListener(queues = "gameRevWebscraper")
    public void receiveMessage(Message message) {
        System.out.println("Received Message:" + message);
        System.out.println();
//        JSONObject jsonBody = new JSONObject(new String(message.getBody()));
        messages.add(message.toString());
    }
}