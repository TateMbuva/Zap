<?php

 
// include database 
include_once '../config/database.php';


//database connection
$database = new Database();
$db = $database->getConnection();

if($db != null){

    
    if($_POST){

		
		$email = $_POST['email'];
		$password = $_POST['password'];
		$success = 'success';
		$fail = 'fail';
		
	
		try {
				
				$check = "SELECT * FROM accounts WHERE email = :email and password = :password";
				$st = $db->prepare($check);
				$st->execute(['email' => $email , 'password' => $password]);
				$rc = $st->rowCount();
				
				if($rc > 0){
					print_r(json_encode(array('msg' => $success), JSON_FORCE_OBJECT));
				}else{
					print_r(json_encode(array('msg' => $fail), JSON_FORCE_OBJECT));
					
				}


		    }
		catch(PDOException $e)
		    {
		    echo $e->getMessage();
		    }
		}
}
else {

	echo "Could not connect to database";

}

 

?>