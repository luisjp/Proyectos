<?php

require 'database.php';
class post extends database{
    
    function posts($id=null){
        $this->conectar();
        if($id==null){
            $query = $this->consulta("Select * from blog_posts order by data_post limit 5");
        }else{
            $query = $this->consulta("Select * from blog_posts where id='".$id."' order by data_post limit 5");
        }
        
        $this->disconnect();
        if($this->numero_de_filas($query))
        {
            while($psts = $this->fetch_assoc($query))
            {
                $data[] = $psts;
            }
            return $data;
        }
        else {
            return '';
        }
    }
    
    function add_image($id)
    {
        $this->conectar();

        $query = $this->consulta("Select image_posts from blog_posts where id='".$id."'  limit 5");
        
        
        $this->disconnect();
        if($this->numero_de_filas($query))
        {
            while($psts = $this->fetch_assoc($query))
            {
                $data[] = $psts;
            }
            return $data;
        }
        else {
            return '';
        }        
    }
    
    function paginacion()
    {
        
    }
    
}
?>