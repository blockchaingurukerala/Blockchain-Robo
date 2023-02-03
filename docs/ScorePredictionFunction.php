<?php
$r1 = $_REQUEST['r1'];
$r2 = $_REQUEST['r2'];
ScorePredictionFunction($r1,$r2);
function ScorePredictionFunction(array $Robot1,array $Robot2) {


  $size = count($Robot2);
  $max=max($Robot1);
  $max2=max($Robot2);
  $max_total=max($max,$max2);
   
  $min=min($Robot1);
  $min2=min($Robot2);
  $min_total=min($min,$min2);
  
  
   
   $normalised_R1=array();
   for ($i = 0; $i < count($Robot1); $i++)  {
            $normalised_R1[$i] = ($Robot1[$i]-$min_total)/($max_total-$min_total);
    
     
          }
          
      
     $normalised_R2=array();
   for ($i = 0; $i < count($Robot2); $i++)  {
            $normalised_R2[$i] = ($Robot2[$i]-$min_total)/($max_total-$min_total);
    
     
          }
   
  
   
   
   $diff=array();
   for ($i = 0; $i < count($Robot1); $i++)  {
           $diff[$i] =  pow(($normalised_R1[$i] - $normalised_R2[$i]),2);
            }
            
            
            $euclidean = (sqrt(array_sum($diff))/$size);
            
            
   
    $similarity=100-$euclidean*100;
  echo $similarity;
 
 }
?>


