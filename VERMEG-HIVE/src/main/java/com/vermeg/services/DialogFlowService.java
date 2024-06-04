package com.vermeg.services;

import com.vermeg.dtos.MessageRequest;
import com.vermeg.dtos.ResponseMessage;
import org.springframework.stereotype.Service;

import java.io.FileNotFoundException;
import java.io.IOException;

public interface DialogFlowService {
    ResponseMessage detectIntent(MessageRequest query) throws IOException;

}
