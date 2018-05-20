package com.webforms.controllers;

import com.webforms.entities.Item;
import com.webforms.ItemsTable;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.*;

@Controller
@RequestMapping(path = "/api")
public class ApiController {
    @Autowired
    ItemsTable itemsTable;

    @PostMapping(path = "/add", consumes = "application/json")
    public ResponseEntity add(@RequestBody Item item){
        //System.out.println(item);
        if(!item.isValid()){
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body("");
        }
        itemsTable.save(item);

        return ResponseEntity
                .status(HttpStatus.OK)
                .body("");
    }

    @PostMapping(path = "/delete")
    public ResponseEntity delete(@RequestBody String id){
        itemsTable.deleteById(Long.parseLong(id));
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("");
    }

    @PostMapping(path = "/update")
    public ResponseEntity update(@RequestBody Item item){
        if(!item.isValid()){
            return ResponseEntity
                    .status(HttpStatus.NOT_ACCEPTABLE)
                    .body("");
        }
        long id = itemsTable.findByItemIdAndUserId(item.getItemId(), item.getUserId()).getId();
        item.setId(id);
        itemsTable.save(item);
        return ResponseEntity
                .status(HttpStatus.OK)
                .body("");
    }

    @PostMapping(path = "/all")
    public @ResponseBody Iterable<Item> getAll(@RequestBody String userId){
        // This returns a JSON or XML with the users
        userId = userId.replaceAll("\"", "");
        return itemsTable.findByUserIdOrderByDateDesc(Long.parseLong(userId));
    }
}
