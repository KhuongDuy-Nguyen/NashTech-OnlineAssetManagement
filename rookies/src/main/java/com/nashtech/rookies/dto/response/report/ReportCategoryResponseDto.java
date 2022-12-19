package com.nashtech.rookies.dto.response.report;

public interface ReportCategoryResponseDto {
    String getCateName();
    Integer getTotal();
    Integer getAssigned();
    Integer getAvailable();
    Integer getNotAvailable();
    Integer getWaitingForRecycling();
    Integer getRecycled();

}
