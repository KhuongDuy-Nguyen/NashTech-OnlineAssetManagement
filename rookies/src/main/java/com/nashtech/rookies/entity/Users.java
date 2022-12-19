package com.nashtech.rookies.entity;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.fasterxml.jackson.annotation.JsonProperty.Access;
import lombok.*;

import javax.persistence.*;
import javax.validation.constraints.Size;
import java.util.Date;


@Entity
@AllArgsConstructor
@NoArgsConstructor
@Getter
@Setter
@Builder
public class Users {
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	@Column(unique = true)
	@Size(max = 15)
	private String username;
	
	@JsonProperty(access = Access.WRITE_ONLY)
	private String password;

	private boolean enabled;

	@Size(min = 1, max = 10)
	private String firstName;

	@Size(min = 1, max = 50)
	private String lastName;

	private Date dob;

	private String location;

    private String fullName;

	private Date joinedDate;

	private boolean gender;

	private String role;

	private String code;

	private Date createdDate;

	private Date updatedDate;

	private boolean disabled = false;


    public Users(String username, String password, boolean enabled, String firstName, String lastName , boolean gender,  Date dob, String location, Date joinedDate, String role, String code) {
        this.username = username;
        this.password = password;
        this.enabled = enabled;
        this.firstName = firstName;
        this.lastName = lastName;
        this.fullName = firstName + " " + lastName;
        this.dob = dob;
        this.location = location;
        this.joinedDate = joinedDate;
        this.gender = gender;
        this.role = role;
        this.code = code;
    }

}
