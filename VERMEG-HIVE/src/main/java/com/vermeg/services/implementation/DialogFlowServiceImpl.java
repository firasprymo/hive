package com.vermeg.services.implementation;

import com.google.api.gax.core.FixedCredentialsProvider;
import com.google.cloud.dialogflow.v2.*;
import com.vermeg.dtos.MessageRequest;
import com.vermeg.dtos.ResponseMessage;
import com.vermeg.services.DialogFlowService;
import lombok.Value;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ClassPathResource;
import org.springframework.core.io.Resource;
import org.springframework.stereotype.Service;
import com.google.auth.oauth2.GoogleCredentials;

import java.io.FileInputStream;
import java.io.FileNotFoundException;
import java.io.IOException;
import java.util.UUID;

@Service
@Slf4j
public class DialogFlowServiceImpl implements DialogFlowService {
    @Override
    public ResponseMessage detectIntent(MessageRequest query) throws IOException {
        Resource resource = new ClassPathResource("bee-sxtx-config.json");

        GoogleCredentials credentials = GoogleCredentials.fromStream(resource.getInputStream());

        SessionsSettings sessionsSettings = SessionsSettings.newBuilder()
                .setCredentialsProvider(FixedCredentialsProvider.create(credentials))
                .build();
        String sessionId = UUID.randomUUID().toString();
        String projectId = "bee-sxtx";
        SessionName session = SessionName.of(projectId, sessionId);

        try (SessionsClient sessionsClient = SessionsClient.create(sessionsSettings)) {
            TextInput textInput = TextInput.newBuilder().setText(query.getRequestText()).setLanguageCode("en-US").build();
            QueryInput queryInput = QueryInput.newBuilder().setText(textInput).build();
            DetectIntentRequest request = DetectIntentRequest.newBuilder()
                    .setSession(session.toString())
                    .setQueryInput(queryInput)
                    .build();

            DetectIntentResponse response = sessionsClient.detectIntent(request);
            QueryResult queryResult = response.getQueryResult();
            log.info("Detected intent: {}", queryResult.getIntent().getDisplayName());
            log.info("Fulfillment text: {}", queryResult.getFulfillmentText());
            log.info("Original query: {}", queryResult.getQueryText());
            ResponseMessage responseMessage = getResponseMessage(queryResult);

            log.info("result" + queryResult);
            return responseMessage;
        } catch (Exception e) {
            log.error("Error detecting intent", e);
            throw new RuntimeException("Error detecting intent", e);
        }
    }

    private static ResponseMessage getResponseMessage(QueryResult queryResult) {
        ResponseMessage responseMessage = new ResponseMessage();
        responseMessage.setIntent(queryResult.getIntent().getDisplayName());
        responseMessage.setResponseMessage(queryResult.getFulfillmentText());
        responseMessage.setOriginalQuery(queryResult.getQueryText());
        if (queryResult.getIntent().getIsFallback() || queryResult.getFulfillmentText().isEmpty()) {
            responseMessage.setResponseMessage("Je suis désolé, je ne connais pas la réponse à cette question. Vous pouvez contacter un administrateur pour plus d'aide.");
        }
        return responseMessage;
    }
}
