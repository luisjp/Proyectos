package com.napptilus.model;

import javax.persistence.Column;
import javax.persistence.Entity;
import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import javax.persistence.Id;
import javax.persistence.Table;

import org.hibernate.validator.constraints.NotEmpty;

/**
 * 
 * Clase Model Oompa Loompa
 * 
 * Atributos que definen el modelo Oompa Loompa
 * 
 * @author luisjp
 *
 */

@Entity
@Table(name = "users")
public class OLoompa 
{
	
	@Id
	@GeneratedValue(strategy = GenerationType.AUTO)
	private Integer id;
	
	@NotEmpty
	@Column(name="Name", nullable=false)
	private String Name;
	
	@NotEmpty
	@Column(name="Age", nullable=false)	
	private Integer Age;
	
	@NotEmpty
	@Column(name="Job", nullable=false)		
	private String Job;
	
	@NotEmpty
	@Column(name="Height", nullable=false)		
	private Integer Height;
	
	@NotEmpty
	@Column(name="Weight", nullable=false)			
	private Integer Weight;
	
	@NotEmpty
	@Column(name="Description", nullable=false)		
	private String Description;
	
	public OLoompa()
	{
		
	}
	
	public Integer getId() {
		return id;
	}
	public void setId(Integer id) {
		this.id = id;
	}
	public String getName() {
		return Name;
	}
	public void setName(String name) {
		Name = name;
	}
	public Integer getAge() {
		return Age;
	}
	public void setAge(Integer age) {
		Age = age;
	}
	public String getJob() {
		return Job;
	}
	public void setJob(String job) {
		Job = job;
	}
	public Integer getHeight() {
		return Height;
	}
	public void setHeight(Integer height) {
		Height = height;
	}
	public Integer getWeight() {
		return Weight;
	}
	public void setWeight(Integer weight) {
		Weight = weight;
	}
	public String getDescription() {
		return Description;
	}
	public void setDescription(String description) {
		Description = description;
	}
	@Override
	public String toString() {
		return "OLoompa [id=" + id + ", Name=" + Name + ", Age=" + Age
				+ ", Job=" + Job + ", Height=" + Height + ", Weight=" + Weight
				+ ", Description=" + Description + "]";
	}
	
	
}
