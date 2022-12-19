package com.nashtech.rookies.entity;

import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class Assignment {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String note;
    private String state;
    private Date assignedDate;
    private Date returnedDate;
    private Date createdDate;
    private boolean checkReturn = false;

    private boolean isComplete = false;

    @ManyToOne
    private Users assignedBy;

    @ManyToOne
    private Users assignedTo;

    @ManyToOne
    private Asset asset;

    public Assignment(String note, String state, Date assignedDate, Date returnedDate, Date createdDate, Users assignedBy, Users assignedTo, Asset asset,boolean checkReturn) {
        this.note = note;
        this.state = state;
        this.assignedDate = assignedDate;
        this.returnedDate = returnedDate;
        this.createdDate = createdDate;
        this.assignedBy = assignedBy;
        this.assignedTo = assignedTo;
        this.asset = asset;
        this.checkReturn = checkReturn;
    }
}
