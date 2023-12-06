package com.nu.cs.ta_app.repository;

import java.util.List;
import java.util.Optional;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import com.nu.cs.ta_app.model.UserModel;

public interface UserRepository extends JpaRepository<UserModel, Integer> {
	
	Optional<UserModel> findByUsername(String username);
	
	@Query(value = "SELECT * FROM nu_cs.nu_user u WHERE u.firstname = ?",
			nativeQuery = true)
	Optional<List<UserModel>> findByFirstname(String firstName);
	
	
	@Query(value = "SELECT * FROM nu_cs.nu_user u WHERE u.firstname = ?1 and u.lastname = ?2",
	nativeQuery = true)
	Optional<List<UserModel>> findByFullname(String firstName, String lastName);


}
