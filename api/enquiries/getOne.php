<?php

 
// include database 
include_once '../config/database.php';

//database connection
$database = new Database();
$db = $database->getConnection();

if($db != null){

	if($_POST){

		
		$email = $_POST['email'];
		

		$success = 'success';
		$fail = 'fail';
		
		
	
		try {
				
				$check = "SELECT * FROM enquiries WHERE email = :email";
				$st = $db->prepare($check);
				$st->execute(['email' => $email]);
				$rc = $st->fetch(PDO::FETCH_OBJ);
				

				if($rc > 0){
					print_r(json_encode($rc));


				}else{
					
				    print_r(json_encode(array('msg' => $fail), JSON_FORCE_OBJECT));
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