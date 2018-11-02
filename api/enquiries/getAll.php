<?php

 
// include database 
include_once '../config/database.php';


//database connection
$database = new Database();
$db = $database->getConnection();

if($db != null){

    

   

    $sql = "SELECT * FROM enquiries";
    $stmt = $db->prepare($sql);
    $stmt->execute();
    $results = $stmt->fetchAll(PDO::FETCH_OBJ);

    
    echo json_encode($results);

	


}
else {

	echo "Could not connect to database";

}

 

?>