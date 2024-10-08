package com.example.api.dto.Order;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class GetOrdersRequestDto {
    private int page = 0;
    private int size = 5;
    private String[] sorts = {"orderDate,desc"};
    private Integer userId;
}