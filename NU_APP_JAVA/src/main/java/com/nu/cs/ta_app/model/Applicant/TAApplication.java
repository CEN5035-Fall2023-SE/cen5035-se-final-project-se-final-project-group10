package com.nu.cs.ta_app.model.Applicant;

import java.util.Date;

import com.nu.cs.ta_app.model.UserModel;

import jakarta.annotation.Nullable;
import jakarta.persistence.CascadeType;
import jakarta.persistence.Column;
import jakarta.persistence.Entity;
import jakarta.persistence.GeneratedValue;
import jakarta.persistence.GenerationType;
import jakarta.persistence.Id;
import jakarta.persistence.JoinColumn;
import jakarta.persistence.ManyToOne;
import jakarta.persistence.OneToMany;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@Entity(name = "TA_Applications")
@AllArgsConstructor
@NoArgsConstructor
public class TAApplication {
	@Id
	@GeneratedValue(strategy = GenerationType.SEQUENCE)
	private Integer application_id;
	private String applyFor;
	private String priorExperience;
	private String experienceInCourse;
	private Date fromDate;
	private Date toDate;
	private String cvFileId;
	private String application_status;
	private String offer_accepted;
	@Column(nullable = false)
	private Integer applicant_id;

}
