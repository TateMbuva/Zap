<?php

 
// include database 
include_once '../config/database.php';

//database connection
$database = new Database();
$db = $database->getConnection();

if($db != null){

	if($_POST){

		$name =  $_POST['name'];
		$email = $_POST['email'];
		$number = $_POST['number'];
		$enquiry = $_POST['enquiry'];
		$response = $_POST['response'];

		$success = 'success';
		$fail = 'fail';
		
		
	
		try {
				
				$check = "SELECT * FROM enquiries WHERE email = :email";
				$st = $db->prepare($check);
				$st->execute(['email' => $email]);
				$rc = $st->rowCount();
				

				if($rc > 0){
					print_r(json_encode(array('msg' => $fail), JSON_FORCE_OBJECT));
				}else{
					
					$sql = "INSERT INTO enquiries (name, email, numb, enquiry, response )
				    VALUES ('$name', '$email', '$number', '$enquiry', '$response')";
				   
				    $db->exec($sql);

				    print_r(json_encode(array('msg' => $success), JSON_FORCE_OBJECT));
				}



				
				
			
		    }
		catch(PDOException $e)
		    {
		    echo $e->getMessage();
		    }
		}else {
			echo "nada";
		}


    
}
else {

	echo "Could not connect to database";

}



?>