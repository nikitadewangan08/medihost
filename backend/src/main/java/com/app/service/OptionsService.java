package com.app.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.app.repository.OptionsRepository;

@Service
public class OptionsService implements IOptionsService {
	
	@Autowired
	OptionsRepository optionsRepository;
	
	@Override
	public List<String> getOptions(int type){
		return optionsRepository.findValueByType(type);
	}
}
