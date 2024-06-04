package com.vermeg.Controllers;

import com.vermeg.dtos.MessageRequest;
import com.vermeg.dtos.ResponseMessage;
import com.vermeg.services.DialogFlowService;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import java.io.IOException;

@RestController
@RequestMapping("/api/v1/dialog-flow")
@RequiredArgsConstructor
@Slf4j
public class DialogflowController {
    private final DialogFlowService dialogflowService;

    @PostMapping("/query")
    public ResponseEntity<ResponseMessage> query(@RequestBody MessageRequest query) throws IOException {
            return ResponseEntity.status(HttpStatus.CREATED).body(dialogflowService.detectIntent(query));
    }
}
