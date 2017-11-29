<?php

	$filename = uniqid ("sign") . ".png";
	$success = fwrite(fopen("../signs/". $filename, "wb"), base64_decode($_POST['signature']));
	
	if($success) {
		$msg = "Request for medical documents was registered:\r\n";
		$msg .= "Patient Name: " . $_POST['patient-name'] . "\r\n";
		$msg .= "Date of Birth (MM/DD/YYYY): " . $_POST['date-of-birth'] . "\r\n";
		$msg .= "Phone: " . $_POST['patient-phone'] . "\r\n";
		$msg .= "E-mail: " . $_POST['patient-email'] . "\r\n";
		$msg .= "Province: " . $_POST['province'] . "\r\n";
		$msg .= "Referring Physician or Clinic Name: " . $_POST['medic-name'] . "\r\n";
		$msg .= "Referring Physician or Clinic Phone: " . $_POST['medic-phone'] . "\r\n";
		$msg .= "Referring Physician or Clinic E-mail: " . $_POST['medic-email'] . "\r\n";
		$msg .= "Print Name " . $_POST['contract-name'] . "\r\n";
		$msg .= "Today's Date (MM/DD/YYYY): " . $_POST['date'] . "\r\n";
		$msg .= "Patient Signature: http://" . $_SERVER['HTTP_HOST'] . "/dsfitz/signs/" . $filename . " \r\n";
		
		$success = mail("leo_kinach@hotmail.com, enquire@dsandfitz.com", "Request for medical documents", $msg, "From: leonardo.rodrigues@brazilrules.net");
	}
	
	if($success) {
		echo "Request for medical documents filed successfuly for client {$_POST['patient-name']}.";
	} else {
		echo "There was an error while filing the request for medical documents for client {$_POST['patient-name']} .";
	}
?>