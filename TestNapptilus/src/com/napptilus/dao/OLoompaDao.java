package com.napptilus.dao;

import java.util.List;

import com.napptilus.model.OLoompa;



public interface OLoompaDao {

	OLoompa findById(int id);
	
	int editByID(OLoompa user);
	
	int save(OLoompa user);
	
	int deleteById(int id);
	
	List<OLoompa> getOLoompas();

}
