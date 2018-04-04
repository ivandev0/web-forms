package com.webforms;

import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface UserRepository extends JpaRepository<Item, Long> {
    public List<Item> findAllByOrderByDateDesc();
}
