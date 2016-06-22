package com.appdynamics.sample.model;

/**
 * Created by mark.prichard on 6/21/16.
 */

import org.codehaus.jackson.annotate.JsonProperty;
import javax.persistence.*;

@Entity
public class Product {
    @JsonProperty
    @Id
    @GeneratedValue(strategy= GenerationType.AUTO)
    private int id;

    @JsonProperty
    @Column
    private String name;

    @JsonProperty
    @Column
    private int stock;

    public int getId() {
        return id;
    }

    public void setId(int id) {
        this.id = id;
    }

    public Product() {
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public int getStock() {
        return stock;
    }

    public void setStock(int stock) {
        this.stock = stock;
    }
}
