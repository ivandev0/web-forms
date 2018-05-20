package com.webforms.controllers;

import com.webforms.UsersTable;
import com.webforms.entities.User;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.util.DigestUtils;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.servlet.ServletException;
import javax.servlet.http.Cookie;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

@Controller
@RequestMapping(path = "/")
public class AuthenticationController {
    @Autowired
    UsersTable usersTable;

    @PostMapping(path = "/signIn")
    public ResponseEntity signIn(HttpServletRequest request, @RequestBody User user){
        User fromDb = usersTable.findByLogin(user.getLogin());
        if(fromDb == null || !fromDb.getPassword().equals(hash(user.getPassword(), fromDb.getSalt()))){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("Неверное имя пользователя или пароль");
        }

        request.getSession();
        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body(fromDb.getId());

    }

    @PostMapping(path = "/signUp")
    public ResponseEntity signUp(@RequestBody User user){
        if(usersTable.findByLogin(user.getLogin()) != null){
            return ResponseEntity
                    .status(HttpStatus.FOUND)
                    .body("Пользователь с таким логином уже существует");
        }
        if(usersTable.findByEmail(user.getEmail()) != null){
            return ResponseEntity
                    .status(HttpStatus.FOUND)
                    .body("Пользователь с таким почтовым адресом уже существует");
        }
        //TODO hash + salt
        int salt = 100 + (int) (Math.random()*899);

        user.setSalt(salt);
        user.setPassword(hash(user.getPassword(), salt));
        User newUser = usersTable.save(user);

        return ResponseEntity
                .status(HttpStatus.CREATED)
                .body(newUser.getId());
    }

    @RequestMapping(path = "/check")
    public ResponseEntity check(HttpServletRequest request){
        if(request.getSession(false) == null){
            return ResponseEntity
                    .status(HttpStatus.NOT_FOUND)
                    .body("");
        }

        return ResponseEntity
                .status(HttpStatus.FOUND)
                .body("");

    }

    @RequestMapping(path = "/logOut")
    public ResponseEntity logOut(HttpServletRequest request){
        HttpSession session = request.getSession(false);
        if(session != null){
            session.invalidate();
        }

        return ResponseEntity
                .status(HttpStatus.OK)
                .body(0);

    }

    private String hash(String password, int salt){
        String hash = DigestUtils.md5DigestAsHex(password.getBytes());
        hash = hash + String.valueOf(salt);
        return DigestUtils.md5DigestAsHex(hash.getBytes());
    }

}
