package com.example.Brisa.Sur.Aromas.repository;

import com.example.Brisa.Sur.Aromas.model.Perfume;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface PerfumeRepository extends JpaRepository<Perfume, Long> {
}