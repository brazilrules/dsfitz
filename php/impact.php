<?php
	$msg = "A new social enterprise was registered:\r\n";
	$msg .= "Name: " . $_POST['name'] . "\r\n";
	$msg .= "Organization Name: " . $_POST['organization'] . "\r\n";
	$msg .= "Email: " . $_POST['email'] . "\r\n";
	$msg .= "Phone: " . $_POST['phone'] . "\r\n";
	
	$success = mail("leo_kinach@hotmail.com, enquire@dsandfitz.com", "Social enterprise registered", $msg, "From: leonardo.rodrigues@brazilrules.net");
	
	if($success) {
		echo "Organization {$_POST['organization']} registered successfuly.";
	} else {
		echo "There was an error while registering the {$_POST['organization']} organization.";
	} ?>