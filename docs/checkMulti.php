<?php	
       // error_reporting(0);   
        $id = $_REQUEST['id'];   
	    $conn = mysqli_connect("localhost","root","", "robodb");		
		$itemValues=0;
		$query = "select robopurpose from rating where id='".$id."' limit 1";	
        $result = mysqli_query($conn, $query); 
        $list = mysqli_fetch_array($result);
       

   
        mysqli_close($conn); 
        echo $list[0];
?>