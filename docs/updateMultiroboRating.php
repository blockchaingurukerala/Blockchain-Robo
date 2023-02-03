<?php
$id = $_REQUEST['id'];
$r= $_REQUEST['r'];
$p1r= $_REQUEST['p1r'];
$p2r= $_REQUEST['p2r'];
$c=$_REQUEST['c'];
$case=$_REQUEST['case'];
$o=$_REQUEST['o'];
$rs1=$_REQUEST['rs1'];
$rs2=$_REQUEST['rs2'];
insertDB($id,$r,$p1r,$p2r,$c,$case,$o,$rs1,$rs2);


function insertDB($id,$r,$p1r,$p2r,$c,$case,$o,$rs1,$rs2){
    $conn = mysqli_connect("localhost","root","", "robodb");
    $query = "INSERT INTO rating (id,roboname,robopurpose,roboseller,customer,rating,purpose1rating,purpose2rating,overallscore,purpose1score,purpose2score) VALUES ('".$id."','new','new','new','".$c."','".$r."','".$p1r."','".$p2r."','".$o."','".$rs1."','".$rs2."')";
    $result = mysqli_query($conn, $query);
    if($case=="0000"){
      //no rating and selected overall
      $query = "UPDATE rating SET overallscore='".$r."' where id='".$id."'";
      mysqli_query($conn, $query);
    }
    if($case=="0001"){
      //no rating and selected purpose1
      $query = "UPDATE rating SET purpose1score='".$p1r."' where id='".$id."'";
      mysqli_query($conn, $query);
      $query = "UPDATE rating SET purpose2score='".$p2r."' where id='".$id."'";
      mysqli_query($conn, $query);
    }
    if($case=="0002"){
      //no rating and selected purpose2
      $query = "UPDATE rating SET purpose1score='".$p1r."' where id='".$id."'";
      mysqli_query($conn, $query);
      $query = "UPDATE rating SET purpose2score='".$p2r."' where id='".$id."'";
      mysqli_query($conn, $query);
    }
    if($case=="0010"){
      //no rating and selected purpose2
      $query = "UPDATE rating SET overallscore='".$o."' where id='".$id."'";
      mysqli_query($conn, $query);
    }
    if($case=="0011"){
      //has only overall rating and selected purpose1
      $query = "UPDATE rating SET purpose1score='".$p1r."' where id='".$id."'";
      mysqli_query($conn, $query);
      $query = "UPDATE rating SET purpose2score='".$p2r."' where id='".$id."'";
      mysqli_query($conn, $query);
    }
    if($case=="0012"){
      //has only overall rating and selected purpose2
      $query = "UPDATE rating SET purpose1score='".$p1r."' where id='".$id."'";
      mysqli_query($conn, $query);
      $query = "UPDATE rating SET purpose2score='".$p2r."' where id='".$id."'";
      mysqli_query($conn, $query);
    }
    if($case=="1110"){
      //have all thge score and selected overall
      $query = "UPDATE rating SET overallscore='".$o."' where id='".$id."'";
      mysqli_query($conn, $query);
    }
    if($case=="1011"){
       //have all thge score and selected purpose1
      $query = "UPDATE rating SET purpose1score='".$p1r."' where id='".$id."'";
      mysqli_query($conn, $query);
      $query = "UPDATE rating SET purpose2score='".$p2r."' where id='".$id."'";
      mysqli_query($conn, $query);
      $avg = (floatval($p1r)+floatval($p2r))/2;
      $query = "UPDATE rating SET overallscore='".$avg."' where id='".$id."'";
      mysqli_query($conn, $query);
    }

    if($case=="0111"){
      //have all thge score and selected purpose1
     $query = "UPDATE rating SET purpose1score='".$p1r."' where id='".$id."'";
     mysqli_query($conn, $query);
     $query = "UPDATE rating SET purpose2score='".$p2r."' where id='".$id."'";
     mysqli_query($conn, $query);
     $avg = (floatval($p1r)+floatval($p2r))/2;
     $query = "UPDATE rating SET overallscore='".$avg."' where id='".$id."'";
     mysqli_query($conn, $query);
   }
   
    mysqli_close($conn);
    echo $result;
}
?>