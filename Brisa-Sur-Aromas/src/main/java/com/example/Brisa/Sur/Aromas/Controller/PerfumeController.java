package com.example.Brisa.Sur.Aromas.controller;
import com.example.Brisa.Sur.Aromas.model.Perfume;
import com.example.Brisa.Sur.Aromas.repository.PerfumeRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/perfumes")
public class PerfumeController {

    @Autowired
    private PerfumeRepository perfumeRepository;

    @GetMapping
    public List<Perfume> obtenerTodos() {
        return perfumeRepository.findAll();
    }

    @PostMapping
    public Perfume crearPerfume(@RequestBody Perfume perfume) {
        return perfumeRepository.save(perfume);
    }
}