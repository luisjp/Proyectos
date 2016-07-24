<?php
    class database
    {
        private $conexion;
        
        public function conectar()
        {
            if(!isset($this->conexion)){
             //    $this->conexion = mysql_connect("localhost:8889","root","root") or die(mysql_error());
             $this->conexion = mysql_connect("localhost","root","") or die(mysql_error());
                mysql_select_db("bd_blog_arza",  $this->conexion) or die(mysql_error());
            }
        }
        
        public function consulta($sql)
        {
           $resultado= mysql_query($sql,  $this->conexion);
           if(!$resultado)
           {
               echo "Error Mysql " . mysql_error();
               exit;
           }
           return $resultado;
           
        }
        
        public function numero_de_filas($result)
        {
            if(!is_resource($result)) return false;
            return mysql_num_rows($result);
        }
        
        public function fetch_assoc($result)
        {
            if(!is_resource($result)) return false;
            return mysql_fetch_assoc($result);
        }
        
        public function disconnect()
        {
            mysql_close();
        }
    }
?>