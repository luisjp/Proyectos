<?php
    ini_set('display_errors', '1');
    require "database.php";
    if(isset($_POST["Id_title"]) )
    {
        $db = new database();
        $db->conectar();
        $query = $db->consulta("UPDATE `bd_blog_arza`.`blog_posts` SET `name_post` = '".$_POST["Id_title"]."' WHERE `blog_posts`.`id` = ".$_POST["id"]." ");
        $this->disconnect();  
    }else if(isset($_POST["Id_cont"]) )
    {
        $db = new database();
        $db->conectar();
        $query = $db->consulta("UPDATE `bd_blog_arza`.`blog_posts` SET `content_post` = '".$_POST["Id_cont"]."' WHERE `blog_posts`.`id` = ".$_POST["id"]." ");
        $this->disconnect();          
    }    
?>