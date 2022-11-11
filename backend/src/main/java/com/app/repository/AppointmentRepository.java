package com.app.repository;

import java.time.LocalDate;
import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Appointment;

public interface AppointmentRepository extends JpaRepository<Appointment, Long>{

	List<Appointment> findByPatientPatientIdOrderByAppointmentIdDesc(Long patientId);

	List<Appointment> findByDoctorDoctorIdOrderByAppointmentIdDesc(Long doctorId);
	
	@Query("select a.slot from Appointment a where a.doctor.doctorId=:did and a.requestedDate=:rdate")
	List<Integer> getBookedSlots(@Param("did") Long doctorId,  @Param("rdate") LocalDate requestedDate);
}
