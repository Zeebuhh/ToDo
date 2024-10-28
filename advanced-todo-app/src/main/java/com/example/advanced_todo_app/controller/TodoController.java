package com.example.advanced_todo_app.controller;

import com.example.advanced_todo_app.model.Todo;
import com.example.advanced_todo_app.repository.TodoRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/api/todos")
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
    public Optional<Todo> findTodoById(@PathVariable Long id){
        return todoRepository.findById(id);
    }

    @PostMapping
    public Todo saveTodo(@RequestBody Todo todo){
        return todoRepository.save(todo);
    }

    @PutMapping("/{id}")
    public Todo udateTodo(@PathVariable Long id, @RequestBody Todo todo){
        todo.setId(id);
        return todoRepository.save(todo);
    }

    @DeleteMapping("/{id}")
    public void deleteTodo(@PathVariable Long id){
        todoRepository.deleteById(id);
    }







}
