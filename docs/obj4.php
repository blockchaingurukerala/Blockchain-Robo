

<?php

// function pedicts the score for second pupose
$First_purposeRS = $_REQUEST['p1r'];
$Second_purposeRS = $_REQUEST['p2r'];
$Overall_RS = $_REQUEST['r'];
$First_Keywords = $_REQUEST['keywords1'];
$Second_Keywords = $_REQUEST['keywords2'];
MultiPurpose_Score_Inference($First_purposeRS,$Second_purposeRS,$Overall_RS ,$First_Keywords,$Second_Keywords);

function MultiPurpose_Score_Inference( $First_purposeRS, $Second_purposeRS, $Overall_RS, $First_Keywords, $Second_Keywords) {
$Similarity=0;
$min=0;
$max=0;



 $Similarity= Similarity_btn_purposes($First_Keywords, $Second_Keywords);
if($Overall_RS != 0 && !(is_null($Overall_RS))){
 if($Overall_RS >= $First_purposeRS ){
    $min= $First_purposeRS;
    $max= $First_purposeRS +((5-$First_purposeRS)*$Similarity);
    }
    
    else
    {
    $min= $First_purposeRS-(($First_purposeRS-1)*$Similarity);
    $max= $First_purposeRS;
    }
    
    
    $Second_purposeRS=(string)$min.','.(string)$max;
    }
    else
        {
            $min= $First_purposeRS-(($First_purposeRS-1)*$Similarity);
            $max= $First_purposeRS +((5-$First_purposeRS)*$Similarity);
        }
   # echo  $Second_purposeRS;
   
     return array ($min,$max);

 
 }


function Similarity_btn_purposes( $First_purpose_Keywords, $Second_purpose_Keywords) {


$parts1 = explode(' ', strtolower($First_purpose_Keywords));
$parts2 = explode(' ', strtolower($Second_purpose_Keywords));


$intersectiont=array_intersect($parts1,$parts2);
$union = array_unique(array_merge($parts1, $parts2));

$numerator= sizeof($intersectiont);
$denominator= sizeof($union);
 
return (1-round($numerator/$denominator,2));
    
 
 }
?>

