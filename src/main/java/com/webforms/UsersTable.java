package com.webforms;

import com.webforms.entities.User;
import org.springframework.data.jpa.repository.JpaRepository;

public interface UsersTable extends JpaRepository<User, Long> {
    public User findByLogin(String login);
    public User findByEmail(String email);
}
