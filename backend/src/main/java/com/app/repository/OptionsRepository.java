package com.app.repository;

import java.util.List;

import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;

import com.app.pojos.Options;

public interface OptionsRepository extends JpaRepository<Options, Long>{

	@Query("select distinct o.value from Options o where o.type=:type") 
	List<String> findValueByType(@Param("type") int type);
}
