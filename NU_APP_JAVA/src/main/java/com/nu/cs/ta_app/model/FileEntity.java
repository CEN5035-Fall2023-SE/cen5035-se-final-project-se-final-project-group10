package com.nu.cs.ta_app.model;

import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.Lob;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
public class FileEntity {
	@Id
	@GeneratedValue
	private Long id;
	private String fileName;
	private String contentType;
	@Lob
	@Column(length = 1000000)
	private byte[] data;

}
