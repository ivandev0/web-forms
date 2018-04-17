package com.webforms;

import javax.persistence.Entity;

import javax.persistence.Id;
import java.io.Serializable;
import java.sql.Date;

@Entity
public class Item implements Serializable{

    @Id
    Long id;
    Date date;
    Integer expenses;
    String comment;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public Date getDate() {
        return date;
    }

    public void setDate(Date date) {
        this.date = date;
    }

    public Integer getExpenses() {
        return expenses;
    }

    public void setExpenses(Integer expenses) {
        this.expenses = expenses;
    }

    public String getComment() {
        return comment;
    }

    public void setComment(String comment) {
        this.comment = comment;
    }

    public boolean isValid(){
        return id != null && date != null && expenses != null && comment != null;
    }

    @Override
    public String toString() {
        return "Item{" +
                "id=" + id +
                ", date='" + date + '\'' +
                ", expenses=" + expenses +
                ", comment='" + comment + '\'' +
                '}';
    }
}
