package com.nu.cs.ta_app.model;

import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.OneToOne;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Entity(name = "TAPositions")
@Data
@NoArgsConstructor
@AllArgsConstructor
public class TAPosition {
	
	@Id
	@GeneratedValue
	private int id;
	private String course;
	private Integer positions;
}
