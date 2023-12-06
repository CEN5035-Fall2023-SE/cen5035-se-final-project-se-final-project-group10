package com.nu.cs.ta_app.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.nu.cs.ta_app.model.FileEntity;

public interface FileEntityRepository extends JpaRepository<FileEntity, Long>{
	
}
