package com.webforms.controllers;

import com.webforms.Item;
import com.webforms.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/api")
public class ApiController {
    @Autowired
    UserRepository userRepository;

    @PostMapping(path = "/add", consumes = "application/json")
    public @ResponseBody String add(@RequestBody Item item){
        //System.out.println(item);
        if(!item.isValid()){
            return "Not Saved";
        }
        userRepository.save(item);
        return "Saved";
    }

    @PostMapping(path = "/delete")
    public @ResponseBody String delete(@RequestBody Item item){
        if(!item.isValid()){
            return "Not Deleted";
        }
        userRepository.delete(item);
        return "Deleted";
    }

    @PostMapping(path = "/update")
    public @ResponseBody String update(@RequestBody Item item){
        if(!item.isValid()){
            return "Not Updated";
        }
        userRepository.deleteById(item.getId());
        userRepository.save(item);
        return "Updated";
    }

    @GetMapping(path = "/all")
    public @ResponseBody Iterable<Item> getAll(){
        // This returns a JSON or XML with the users
        return userRepository.findAllByOrderByDateDesc();
    }
}
