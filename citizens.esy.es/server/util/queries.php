<?php 

class queries
{
	private $obtener_todos_los_jugadores = "Select id, nombre, apellido, fechaNacimiento, dorsal, posicion from jugadores";

	public function getObt_tod_jug()
	{

		return $this->obtener_todos_los_jugadores;
	}
}

?>