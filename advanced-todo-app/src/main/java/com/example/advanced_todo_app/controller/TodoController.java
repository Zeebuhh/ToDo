package com.example.advanced_todo_app.controller;

import com.example.advanced_todo_app.exceptions.ResourceNotFoundException;
import com.example.advanced_todo_app.model.Todo;
import com.example.advanced_todo_app.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
@CrossOrigin(origins = "http://localhost:3000")
public class TodoController {

    private final TodoRepository todoRepository;

    @Autowired
    public TodoController(TodoRepository todoRepository){
        this.todoRepository = todoRepository;
    }

    @GetMapping
    public List<Todo> getAllTodos(){
       return todoRepository.findAll();
    }

    @GetMapping("/{id}")
    public Todo getTodoById(@PathVariable Long id){
        return todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo with Id " + id + " not found"));
    }

    @PostMapping
    public Todo saveTodo(@RequestBody Todo todo){
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo updateTodo(@PathVariable Long id, @RequestBody Todo todo){
        Todo existingTodo = todoRepository.findById(id)
                .orElseThrow(() -> new ResourceNotFoundException("Todo with Id " + id + " not found"));
        existingTodo.setTitle(todo.getTitle());
        existingTodo.setDescription(todo.getDescription());
        return todoRepository.save(existingTodo);
    }


    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoRepository.findById(id).orElseThrow(() -> new ResourceNotFoundException("Todo with Id " + id + " not found"));
        todoRepository.deleteById(id);
    }







}
