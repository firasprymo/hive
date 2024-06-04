package com.vermeg.dtos;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ResponseMessage {
    private Long id;
    private String responseMessage;
    private String originalQuery;
    private String intent;
}
