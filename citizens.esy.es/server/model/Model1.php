<?php 
	include_once("conexion.php");
	include_once("../util/queries.php");

	class Model1
	{
		private $conn;
		private $querie;

		public function __construct()
		{
			$conexion = new conexion();
			$this->conn = $conexion->getConnection();
			$this->querie = new queries();
		}

		public function obtener_todos_jugadores()
		{
			$objeto_jugadores = $this->conn->query($this->querie->getObt_tod_jug());
			return $this->crear_array_jugadores($objeto_jugadores);
			
		}

		private function crear_array_jugadores($jug)
		{
			$rawdata = array(); 
			$i=0;
		 
		    while($row = mysqli_fetch_array($jug))
		    {

		        $rawdata[$i] = $row;
		        $i++;
		    }

		    conexion::disconnectDB($this->conn);

		    return $rawdata;
		}
	}

?>