package com.nashtech.rookies.entity;

import com.fasterxml.jackson.annotation.JsonIgnore;
import lombok.*;

import javax.persistence.*;
import java.util.Date;

@Entity
@Builder
@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class Asset {

	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;

	private String name;
	private String code;
	private String specification;
	private String location;
	private String state;
	private Date installedDate;

	@ManyToOne
	private Category category;

	
	@ManyToOne
	@JsonIgnore
	private Users users;

	public Asset(String name, String code, String specification, String location, String state, Category category, Users users) {
		this.name = name;
		this.code = code;
		this.specification = specification;
		this.location = location;
		this.state = state;
		this.category = category;
		this.users = users;
	}
}
