<?php
	$msg = "A new user was registered:\r\n";
	$msg .= "First and Last Name: " . $_POST['name'] . "\r\n";
	$msg .= "Email: " . $_POST['email'] . "\r\n";
	$msg .= "Phone: " . $_POST['phone'] . "\r\n";
	$msg .= "City/Town: " . $_POST['city'] . "\r\n";
	$msg .= "Province: " . $_POST['province'] . "\r\n";
	$msg .= "Are you 25 years of age or older? " . $_POST['age'] . "\r\n";
	$msg .= "Do you have a documented medical condition? " . $_POST['condition'] . "\r\n";
	$msg .= "Do you currently medicate with cannabis? " . $_POST['medicate'] . "\r\n";
	$msg .= "How did you hear about us? " . $_POST['referer'] . "\r\n";
	
	$success = mail("leo_kinach@hotmail.com, enquire@dsandfitz.com", "User registered", $msg, "From: leonardo.rodrigues@brazilrules.net");
	
	if($success) {
		echo "User {$_POST['name']} registered successfuly.";
	} else {
		echo "There was an error while registering the  {$_POST['name']} user.";
	} ?>