<?php 
    error_reporting(E_ALL ^ E_DEPRECATED);
    ini_set('display_errors', '1');
    require 'controller/mvc_controller.php';
    session_start();
    $user ="Anonimo";
    if(isset($_SESSION['login_user']))
    {
        $user= "<b user='select'> ".$_SESSION['login_user']."</b>";
    }
    $mvc = new mvc_controller();
    if(isset ($_GET["buscar"])){

        $mvc->buscar($_GET["buscar"]);
      
    }else if(isset ($_GET["select_post"]))    
    {
          $mvc->select_post($_GET["select_post"]);
    }else if(isset($_POST['loguear']))    
    {     
        $mvc->login($_POST["login-user"],$_POST["login-pass"]);
        
    }else if(isset($_GET['loguear'])){
        $mvc->login($user=null, $pass=null);
    }

    else{
        $mvc->inicio($user);
    }
?>
