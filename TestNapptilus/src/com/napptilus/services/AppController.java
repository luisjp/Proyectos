package com.napptilus.services;


import java.util.ArrayList;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.bind.annotation.RestController;

import com.napptilus.dao.OLoompaDao;
import com.napptilus.model.OLoompa;
 
 
 
@RestController
@RequestMapping(value = "/Loompa")
public class AppController 
{
	@Autowired    
    OLoompaDao dao;//will inject dao from XML file    
	
	@RequestMapping(value = "/getListOLoompas", method = RequestMethod.GET)
	public String getListOLoompas(Model m)
	{
		 List<OLoompa> list=dao.getOLoompas();    
	     m.addAttribute("list",list);  
	     return "viewOloompa";    
	}
	
	@RequestMapping(value = "/editOLoompa", method = RequestMethod.GET)
	public String editOLoompa(@PathVariable int id, Model m)
	{
        OLoompa oloompa=dao.findById(id);    
        m.addAttribute("command",oloompa);  
        return "Oloompaeditform";    
	}
	
    @RequestMapping(value="/save",method = RequestMethod.POST)    
    public String save(@ModelAttribute("oloompa") OLoompa oloompa){    
        dao.save(oloompa);    
        return "redirect:/viewOloompa";//will redirect to viewemp request mapping    
    }  
    
    @RequestMapping(value="/deleteOloompa/{id}",method = RequestMethod.GET)    
    public String delete(@PathVariable int id){    
        dao.deleteById(id);    
        return "redirect:/viewOloompa";    
    }         
}