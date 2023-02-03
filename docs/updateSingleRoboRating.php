<?php	
    // error_reporting(0);   
$queryValue = "";
$id = $_REQUEST['id'];
$r= $_REQUEST['r'];
$Overall= $_REQUEST['p1r'];
$c=$_REQUEST['c'];
insertDB($id,$r,$Overall,$c);


function insertDB($id,$r,$Overall,$c){
    $conn = mysqli_connect("localhost","root","", "robodb");
    $query = "INSERT INTO rating (id,roboname,robopurpose,roboseller,customer,rating) VALUES ('".$id."','new','new','new','".$c."','".$r."')";
    $result = mysqli_query($conn, $query);
    $query = "UPDATE rating SET overallscore='".$Overall."' where id='".$id."'";
    mysqli_query($conn, $query);
    mysqli_close($conn);
    echo $result;
}
?>

