package com.nashtech.rookies.services.impl;

import com.nashtech.rookies.entity.Category;
import com.nashtech.rookies.repository.CategoryRepository;
import com.nashtech.rookies.services.interfaces.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class CategoryServiceImpl implements CategoryService {

	CategoryRepository categoryRepository;

	@Autowired
	public CategoryServiceImpl(CategoryRepository categoryRepository) {
		this.categoryRepository = categoryRepository;
	}

	@Override
	public List<Category> getAll() {
		return categoryRepository.findAll();
	}

}