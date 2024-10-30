package com.example.advanced_todo_app.controller;


import com.example.advanced_todo_app.model.User;
import com.example.advanced_todo_app.repository.UserRepository;
import com.example.advanced_todo_app.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;

import java.util.Optional;

@RestController
@RequestMapping("/api/users")
@CrossOrigin(origins = "http://localhost:3000")
public class UserController {

    private final UserService userService;
    private final UserRepository userRepository;

    @Autowired
    private PasswordEncoder passwordEncoder;

    @Autowired
    public UserController(UserService userService, UserRepository userRepository) {
        this.userService = userService;
        this.userRepository = userRepository;
    }

    @PostMapping("/register")
    public void registerUser(@RequestBody User user){
       userService.saveUser(user);
    }

    @PostMapping("/login")
    public ResponseEntity<String> loginUser(@RequestBody User user){
        Optional<User> existingUser = userRepository.findByUsername(user.getUsername());
        if(existingUser.isPresent() && passwordEncoder.matches(user.getPassword(), existingUser.get().getPassword())){
            return ResponseEntity.ok("Login Erfolgreich");
        } else {
            return ResponseEntity.status(HttpStatus.UNAUTHORIZED).body("Ungültige Anmeldedaten");
        }
    }



}
