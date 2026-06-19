package com.example.Brisa.Sur.Aromas.model;

import jakarta.persistence.*;
import lombok.Data;

@Data
@Entity
@Table(name = "perfumes")
public class Perfume {
    
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;
    
    private String nombre;
    private String marca;
    private Double precio;
    private Integer stock;
}