package com.napptilus.dao;

import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.List;

import org.springframework.jdbc.core.BeanPropertyRowMapper;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.jdbc.core.RowMapper;

import com.napptilus.model.OLoompa;


public class OLoompaDaoImpl implements OLoompaDao {

	JdbcTemplate template; 
	
	@Override
	public OLoompa findById(int id) {
		// TODO Auto-generated method stub
		String sql="select * from OLoompa where id=?";    
	    return template.queryForObject(sql, new Object[]{id},new BeanPropertyRowMapper<OLoompa>(OLoompa.class));    
	}



	@Override
	public int save(OLoompa user) {
		 String sql="insert into OLoompa(Name,Description,Job,Age,Height,Weight) values('"+user.getName()+"','"+user.getDescription()+"','"+user.getJob()+"',"+user.getAge()+","+user.getHeight()+","+user.getWeight()+","+user.getId()+")";    
		 return template.update(sql);   
		
	}

	@Override
	public int deleteById(int id) {
	    String sql="delete from OLoompa where id="+id+"";    
	    return template.update(sql);    
		
	}

	@Override
	public List<OLoompa> getOLoompas() {
		// TODO Auto-generated method stub
		 return template.query("select * from OLoompa",new RowMapper<OLoompa>(){    
		        public OLoompa mapRow(ResultSet rs, int row) throws SQLException {    
		        	OLoompa e=new OLoompa();    
		            e.setId(rs.getInt(1));    
		            e.setName(rs.getString(2));    
		            e.setDescription(rs.getString(3));    
		           
		            return e;    
		        }    
		    });    
	}



	@Override
	public int editByID(OLoompa user) {
		String sql="update OLoompa set Name='"+user.getName()+"', Description='"+user.getDescription()+"', Job='"+user.getJob()+"', "
				+ "Age="+user.getAge()+", Height="+user.getHeight()+", Weight="+user.getWeight()+" where id="+user.getId()+"";    
	    return template.update(sql);
	}

}
