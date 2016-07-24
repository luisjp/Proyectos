<?php

/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */

/**
 * Description of mvc_controller
 *
 * @author luisjp
 */
require_once 'model/posts.php';
require_once  'model/modulos_right.php';
require_once 'model/users.php';

class mvc_controller {
  
    
    function login($user,$pass){
        if($user==null){
            users::session_destroy();
            header("Location: index.php");
        }else{
            $usr = new users($user, $pass);
            if($usr->comprobar()){
                $_SESSION['login_user']= $user;
                header("Location: " . $_SERVER['REQUEST_URI']);
            }else{
                header("Location: " . $_SERVER['REQUEST_URI']);
            }            
        }

    }
    
    function buscar($name)
    {
      
        $results = new modules();
        
      
        $array_results = $results->buscar($name);
        
         $html = "";
         $pagina = $this->cargar_plantilla("Blog LuzoLab 0.1",$results); 
        if(!empty($array_results))
        {
          
            for($i = 0 ; $i < sizeof($array_results) ; $i ++){        
                $html .= $this->arrays_content_post($array_results,$i);

            }        
            $pagina = $this->replace_content('/\#CONTENIDO\#/ms' ,$html , $pagina);
            $this->ver_pagina($pagina); 
        }else
        {
            $pagina = $this->replace_content('/\#CONTENIDO\#/ms' ,"<p>No Se Han encontrado resultados</p>" , $pagina);
            
            $this->ver_pagina($pagina);             
        }

        
        
    }
    
    function select_post($id)
    {
       global $user;
       $Array_posts = new post();
       $array_contents = $Array_posts->posts($id);
       $pagina = $this->cargar_plantilla("Blog LuzoLab 0.1",$Array_posts);
       $html = $this->arrays_content_post($array_contents,$i=0,$inicio=false);
       $pagina = $this->replace_content('/\#CONTENIDO\#/ms' ,$html , $pagina);
       $this->ver_pagina($pagina);
    }
    
    
    function cargar_plantilla($titulo="Sin titulo",$Array_posts)
    {
        global $user;
        $user = ($user=="Anonimo") ?  $user : $user . "<a href='index.php?loguear=desconectar'> [ Cerrar Sesión ]</a>";  
        $pagina = $this->cargar_pagina("vista/default.php");
        $mod = new modules();
        $pagina = $mod->add($pagina,"vista/Widgets/");
        
       //$pagina = $this->replace_content('/\#CONTENT_MODULO\#/ms' ,$this->cargar_pagina("vista/Widgets/widget_Buscar/Buscar.html") , $pagina);
        $pagina = $this->replace_content('/\#user\#/ms' ,$user , $pagina);        
        $pagina = $this->replace_content('/\#TITLE_MODULO\#/ms' ,"Buscador", $pagina);
        return $pagina;
    }

    private function cargar_pagina($page)
    {
        return file_get_contents($page);
    }
    
    private function ver_pagina($html)
    {
        echo $html;
    }
    
    function inicio($user)
    {
        $Array_posts = new post();
        $array_contents = $Array_posts->posts();
        $html = "";
        
        $pagina = $this->cargar_plantilla("Blog LuzoLab 0.1",$Array_posts,$user); 
        for($i = 0 ; $i < sizeof($array_contents) ; $i ++){        
            $html .= $this->arrays_content_post($array_contents,$i);
        }

        $pagina = $this->replace_content('/\#CONTENIDO\#/ms' ,$html , $pagina);
        $this->ver_pagina($pagina);   
    }
    private function replace_content($in='/\#CONTENIDO\#/ms', $out,$pagina)
    {
        return preg_replace($in, $out, $pagina);	 	
    }
    
    public function arrays_content_post($array_contents,$i=0,$inicio=true)
    {
     
        $dir_images = "vista/modulos/img_posts/";
          
        if($array_contents[$i]["image_posts"]=="")
        {
            $array_contents[$i]["image_posts"]= "imagen-default.png";
        }
         
        $html = $this->cargar_pagina("vista/modulos/lista_posts.php");
        $html = $this->replace_content('/\#TITLE_POST\#/ms' ,$array_contents[$i]["name_post"] , $html); 
        $html = $this->replace_content('/\#ID\#/ms' ,$array_contents[$i]["id"]  , $html); 
        $html = $this->replace_content('/\#IMAGEN\#/ms' ,$dir_images.$array_contents[$i]["image_posts"] , $html); 
        if($inicio)
        {
            $html = $this->replace_content('/\#CONTENT_POST\#/ms' ,  $this->leer_mas($array_contents[$i]["content_post"]) , $html); 
        } else {
            $html = $this->replace_content('/\#CONTENT_POST\#/ms' ,  $array_contents[$i]["content_post"] , $html);              
        }
        $html = $this->replace_content('/\#CREATED_BY\#/ms' ,$array_contents[$i]["created_by"] , $html); 
        $html = $this->replace_content('/\#CATEGORIES\#/ms' ,$array_contents[$i]["categories_post"] , $html); 
        $html = $this->replace_content('/\#DATA\#/ms' ,$array_contents[$i]["data_post"] , $html); 
            
       $pagina = $html;
        return $pagina;
    }
    
    public function leer_mas($cadena){
        if(strlen($cadena) > 700){
            $cadena = substr($cadena,0,700)."...";
        }
        $cadena.="<br/><div class='read-more'><a href='index.php'>Leer Más</a></div>";
        return $cadena;
    }
   

 
}
?>