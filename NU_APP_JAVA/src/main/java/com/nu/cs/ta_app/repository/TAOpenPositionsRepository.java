package com.nu.cs.ta_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.transaction.annotation.Transactional;

import com.nu.cs.ta_app.model.TAPosition;

public interface TAOpenPositionsRepository extends JpaRepository<TAPosition, Integer> {
	public TAPosition findByCourse(String course);
	
	@Modifying
	@Transactional
	@Query(
			value = "UPDATE nu_cs.tapositions set positions = ?1 WHERE course = ?3 and id = ?2",
			nativeQuery = true
			)
	public int updatePosition (int totalPositions, int id, String course);
}
