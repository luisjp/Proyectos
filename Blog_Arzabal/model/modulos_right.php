<?php

   
    class modules extends database
    {
        public $name_module='Buscador' ;
        private $archivos = array();
        
        function buscar($name)
        {
            
            $this->conectar();
            $query = $this->consulta("Select * from blog_posts where name_post LIKE '%".$name."%' order by name_post limit 5");
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
        function getName_Module()
        {
            return $this->name_module;
        }
        public  function add($pagina,$ruta){
           $html = "";
           $this->listar_directorios_ruta($ruta);

           for($i = 0 ; $i < sizeof($this->archivos) ; $i ++){ 
                $html .= $this->arrays_modules_post($this->archivos,$i);
           } 

            $pagina = preg_replace('/\#MENU_LEFT\#/ms' ,$html , $pagina);
            

            return $pagina;
        }
        public function arrays_modules_post($array_modules,$i=0)
        {
            $menu_left = file_get_contents("vista/modulos/menu_left.php"); 
            
            $title_modulo = explode("/", $array_modules[$i]);
            $title_modulo = explode(".", $title_modulo[3]);
           
            $array_modules[$i] = file_get_contents($array_modules[$i]);
            $html = preg_replace('/\#CONTENT_MODULO\#/ms' ,$array_modules[$i] , $menu_left);
            
            $html = preg_replace('/\#TITLE_MODULO\#/ms' ,$title_modulo[0] , $html); 
            return $html;
        }
        public function listar_directorios_ruta($ruta){ 
       
            if (is_dir($ruta)) { 
               if ($dh = opendir($ruta)) { 
                  while (($file = readdir($dh)) !== false) { 
                     //esta línea la utilizaríamos si queremos listar todo lo que hay en el directorio 
                     //mostraría tanto archivos como directorios 
                     //echo "<br>Nombre de archivo: $file : Es un: " . filetype($ruta . $file); 
                     if (is_dir($ruta . $file) && $file!="." && $file!=".."){ 
                        //solo si el archivo es un directorio, distinto que "." y ".." 
                        $rutafile = $ruta.$file; 

                        $this->listar_archivos($rutafile);

                        $this->listar_directorios_ruta($ruta . $file . "/"); 
                     } 
                  } 
               closedir($dh); 

               } 
            }else {
               echo "<br>No es ruta valida"; 
            }
       
        }
        function listar_archivos($directorio)
        {
            $dir = opendir($directorio);
            while ($archivo = readdir($dir)) //obtenemos un archivo y luego otro sucesivamente
            {
                if (is_dir($archivo))//verificamos si es o no un directorio
                {

                }
                else
                {

                    $dir_archivo = $directorio."/".$archivo;

                    array_push($this->archivos, $dir_archivo);

                }
            }
        }        
    }
?>