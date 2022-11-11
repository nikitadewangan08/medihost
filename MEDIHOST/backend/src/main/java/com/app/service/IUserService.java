package com.app.service;

import java.util.List;

import com.app.dto.UserDTO;
import com.app.pojos.User;

public interface IUserService {

	User registerUser(UserDTO user);

	User getUser(String userName);

	List<User> getUsers();

	void updatePassword(User user, String newPassword);
	
}
