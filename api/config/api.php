<?php

// required headers
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
header("Access-Control-Allow-Headers: Content-Type, Access-Control-Allow-Headers, Authorization, X-Requested-With");
 
// include database 
include_once './database.php';


//database connection
$database = new Database();
$db = $database->getConnection();

if($db != null){

    echo "Connected";
}

 

?>