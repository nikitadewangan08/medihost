package com.app.pojos;

import java.time.LocalDateTime;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
@Entity
public class User  {


	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	private Long id;
	
	private String username;

	@Column(unique = true)
	private String email;

	@Column(length = 255) // larger length required for encrypted passwords
	private String password;

	private String role;

	private boolean active;

	private String resetPasswordOTP;

	@Column(columnDefinition = "TIMESTAMP")
	private LocalDateTime resetOTPCreationDate;
	
	public void setResetOTPCreationDate(LocalDateTime resetOTPCreationDate) {
		this.resetOTPCreationDate = resetOTPCreationDate;
	}

	public User(String username, String email, String password, String role, boolean active) {
		
		super();
		this.username = username;
		this.email = email;
		this.password = password;
		this.role = role;
		this.active = active;
	}

}
