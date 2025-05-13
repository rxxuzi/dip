package com.rxxuzi.dip.service;

import com.rxxuzi.dip.model.User;
import com.rxxuzi.dip.repository.UserRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 * <h1>UserService</h1>
 * Service class that provides user management functionality.
 * Handles user registration and lookup operations.
 *
 * @see User
 * @see UserRepo
 * @author rxx
 */
@Service
public class UserService {

    private final UserRepo userRepository;

    @Autowired
    public UserService(UserRepo userRepository) {
        this.userRepository = userRepository;
    }

    public User registerUser(User user) {
        return userRepository.save(user);
    }

    public User findByUsername(String username) {
        return userRepository.findByUsername(username).orElse(null);
    }

    public boolean existsByUsername(String username) {
        return userRepository.existsByUsername(username);
    }
}