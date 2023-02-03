<?php
	if(!empty($_POST["save"])) {
	    $conn = mysqli_connect("localhost","root","", "robodb");
		$itemCount = count($_POST["robo_name"]);
		$itemValues=0;
		$query = "INSERT INTO rating (id,roboname,robopurpose,roboseller,customer,rating) VALUES ";
		$queryValue = "";
		for($i=0;$i<$itemCount;$i++) {
		
				$itemValues++;
				if($queryValue!="") {
					$queryValue .= ",";
				}
				$queryValue .= "('" . $_POST["robo_id"][$i] . "', '" . $_POST["robo_name"][$i] . "', '" . $_POST["robo_purpose"][$i] . "', '" . $_POST["robo_seller"][$i] . "', '" . $_POST["robo_customer"][$i] . "', '" . $_POST["robo_selectrating"][$i] . "')";
			
		}
		$sql = $query.$queryValue;
		if($itemValues!=0) {
		    $result = mysqli_query($conn, $sql);
			if(!empty($result)) $message = "Added Successfully.";
		}
    mysqli_close($conn);
	} 
?>