<?php
	class conexion
	{
		var $servername = "mysql.hostinger.es";
		var $username = "u344175135_citiz";
		var $password = "caramelo2015";
		var $database = "u344175135_citiz";
		var $conn;

		public function __construct()
		{
			$this->conn = new mysqli(
				$this->servername, 
				$this->username, 
				$this->password, 
				$this->database
			);
			$this->conn->set_charset("utf8");
			// Check connection
			if ($this->conn->connect_error) {
				die("Connection failed: " . $conn->connect_error);
			}
			
		}
		public function getConnection()
		{
			return $this->conn;
		}
		public static  function disconnectDB($conexion){
 
		    $close = mysqli_close($conexion);
		 
		   /* if($close){
		        echo '<script>console.log(La desconexión de la base de datos se ha hecho satisfactoriamente)</script>';
		    }else{
		        echo '<script>console.log(Ha sucedido un error inesperado en la desconexión de la base de datos)</script>';
		    }*/   
		 
		    return $close;
		}
	}
?>