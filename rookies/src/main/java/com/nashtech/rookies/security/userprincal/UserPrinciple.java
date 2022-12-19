package com.nashtech.rookies.security.userprincal;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.nashtech.rookies.entity.Users;
import lombok.Getter;
import lombok.Setter;
import org.springframework.security.core.GrantedAuthority;
import org.springframework.security.core.authority.SimpleGrantedAuthority;
import org.springframework.security.core.userdetails.UserDetails;

import java.util.ArrayList;
import java.util.Collection;
import java.util.List;

@Getter
@Setter
public class UserPrinciple implements UserDetails {

	private static final long serialVersionUID = 1L;

	private Long id;
	private String fullName;
	private String location;

	private String username;
	@JsonIgnore
	private String password;

	private Collection<? extends GrantedAuthority> role;

	public UserPrinciple(Long id, String fullName, String location, String username, String password,
			Collection<? extends GrantedAuthority> role) {
		this.id = id;
		this.fullName = fullName;
		this.location = location;
		this.username = username;
		this.password = password;
		this.role = role;
	}

	public UserPrinciple() {
	}

	public static UserPrinciple build(Users user) {
		GrantedAuthority authority = new SimpleGrantedAuthority(user.getRole());
		List<GrantedAuthority> authories = new ArrayList<>();
		authories.add(authority);

		return new UserPrinciple(user.getId(), user.getFullName(), user.getLocation(), user.getUsername(),
				user.getPassword(), authories);
	}

	@Override
	public Collection<? extends GrantedAuthority> getAuthorities() {
		return (Collection<? extends GrantedAuthority>) role;
	}

	@Override
	public String getPassword() {
		return password;
	}

	@Override
	public String getUsername() {
		return username;
	}

	@Override
	public boolean isAccountNonExpired() {
		return true;
	}

	@Override
	public boolean isAccountNonLocked() {
		return true;
	}

	@Override
	public boolean isCredentialsNonExpired() {
		return true;
	}

	@Override
	public boolean isEnabled() {
		return true;
	}

}
