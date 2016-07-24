<?php

	include_once("../model/Model1.php");

	class controller1
	{
		public $model;

		public function __construct()
		{
			$this->model = new Model1();
		}

		public function invoke()
		{

			if(isset($_POST["players"]))
			{

				echo json_encode($this->model->obtener_todos_jugadores());
			}
		}
	}
	
	$controller = new controller1();
	$controller->invoke();
?>	