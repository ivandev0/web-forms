package com.webforms;

import com.webforms.entities.Item;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ItemsTable extends JpaRepository<Item, Long> {
    public List<Item> findByUserIdOrderByDateDesc(Long userId);
    public void deleteByItemIdAndUserId(Long itemId, Long userId);
    public Item findByItemIdAndUserId(Long itemId, Long userId);
}
