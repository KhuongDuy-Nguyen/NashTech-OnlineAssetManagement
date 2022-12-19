package com.nashtech.rookies.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Getter
@Builder
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class ReturnRequest {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;

    private Date returnDate;

    private String state;

    private String requestBy;
    private String acceptedBy;
    @OneToOne
    Assignment assignment;

    public ReturnRequest(Date returnDate, String state, String requestBy, String acceptedBy, Assignment assignment) {
        this.returnDate = returnDate;
        this.state = state;
        this.requestBy = requestBy;
        this.acceptedBy = acceptedBy;
        this.assignment = assignment;
    }
}
