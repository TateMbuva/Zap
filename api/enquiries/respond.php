<?php

 
// include database 
include_once '../config/database.php';


//database connection
$database = new Database();
$db = $database->getConnection();

if($db != null){

	if($_POST){

		
		$email = $_POST['email'];
		$response = $_POST['response'];

		$success = 'success';
		$fail = 'fail';
		
		
	
		try {
				
				$check = "SELECT * FROM enquiries WHERE email = :email";
				$st = $db->prepare($check);
				$st->execute(['email' => $email]);
				$rc = $st->rowCount();
				

				if($rc > 0){



					$sq = "UPDATE `enquiries` SET response = :resp WHERE email = :email";
					$psq = $db->prepare($sq);
					$psq->execute(['email' => $email, 'resp' => $response]);

					mail($email,"Enquiry Response",$response);
					


					/*$sqB = "SELECT * FROM enquiries WHERE email = :email";
					$psqB = $db->prepare($sqB);
					$psqB->execute(['email' => $email]);
					$rec = $psq->fetch(PDO::FETCH_OBJ);*/

					
					print_r(json_encode(array('msg' => $success), JSON_FORCE_OBJECT));






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