<?php	
        error_reporting(0);   
        $id = $_REQUEST['id'];   
	    $conn = mysqli_connect("localhost","root","", "robodb");		
		$itemValues=0;
		$query = "select keyword2 from rating where id='".$id."' limit 1";	
        $result = mysqli_query($conn, $query); 
        $list = mysqli_fetch_array($result);
       

        // $a=array();
        // if($result){
        //     while ($row = $result->fetch_array()) 
        //     {                
        //             array_push($a,$row['rating']);    
        //             //echo $row['rating'] ;             
        //     }
        //     echo json_encode($a);
        // }
        // else{
        //     echo "no result";
        // }
        mysqli_close($conn); 
        echo $list[0];
?>