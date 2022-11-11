package com.app.pojos;

import java.util.List;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.OneToMany;
import javax.persistence.Table;

import com.app.dto.DoctorDTO;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;


@Getter
@Setter
@Entity
@NoArgsConstructor
@Table(name = "doctor")
public class Doctor extends Login{
	
	@Id
	@GeneratedValue(strategy = GenerationType.IDENTITY)
	@Column(name = "doctor_id", unique = true)
	private Long doctorId;
	
	@Column(name = "doctor_name", length = 50)
	private String doctorName;
	
	@Column(name = "doctor_uprn_no", unique = true, length = 15)
	private String doctorUPRNNo;
	
	@Column(name = "doctor_address", length = 200)
	private String doctorAddress;
	
	@Column(name = "doctor_city", length = 40)
	private String doctorCity;
	
	@Column(name = "doctor_mobile_no", unique = true)
	private Long doctorMobileNo;
	
	@Column(name = "doctor_speciality", length = 25)
	private String doctorSpeciality;
	
	@OneToMany(mappedBy = "appointmentId")
	List<Appointment> appointments;

	public Doctor(DoctorDTO doctorDTO) {
		
		super(doctorDTO.getEmail(), doctorDTO.getPassword());
		this.doctorName = doctorDTO.getDoctorName();
		this.doctorUPRNNo = doctorDTO.getDoctorUPRNNo();
		this.doctorAddress = doctorDTO.getDoctorAddress();
		this.doctorCity = doctorDTO.getDoctorCity();
		this.doctorMobileNo = doctorDTO.getDoctorMobileNo();
		this.doctorSpeciality = doctorDTO.getDoctorSpeciality();
	}
}
