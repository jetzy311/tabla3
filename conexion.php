<?php



$conexion=mysqli_connect("localhost","root",'',"nuestras_ferias");

if ($conexion->connect_error) {

    die('Error en la conexion' . $conexion->connect_error);

}



?>