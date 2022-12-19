package com.nashtech.rookies.mapper;

import com.nashtech.rookies.entity.Category;
import org.springframework.stereotype.Component;

@Component
public class CategoryMapper {
	public Category mapToCategory(String name, String code) {		
		return Category.builder()
				.name(name)
				.code(code)
				.build();	
	}
}
