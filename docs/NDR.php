<?php
     $r = $_REQUEST['r'];
     NDR($r);
    function NDR(array $rating) {

      $n = count($rating);
      $r=$n-1;     
  
      $sum=array();
  
      for($i=0; $i<$n; $i++)
        {
        $sum[$i]= pow($rating[$i]-3,2)/$n;
        }
  
      $s_d= sqrt(array_sum($sum));
  
  
      $x=array($n);
      $a=array($n);
      $normalised_a=0;
      $rating_weight=array($n);
  
      for($i=0; $i <= $r; $i++)
        {
        $i_=$i+1;
        $x[$i_] = (4*$i/$r)+1;
  
        $a[$i]=stats_wafa($x[$i_], 3, $s_d);
        $normalised_a= $a[$i]+$normalised_a;
        }
        
  
       for($i=0; $i < $n; $i++)
        {
        $rating_weight[$i]=$a[$i]/$normalised_a;
       
        }
        
        $count1=0;
        $count2=0;
        $count3=0;
        $count4=0;
        $count5=0;
  
       for($i=0; $i < $n; $i++)
        {
        if ($rating[$i] == 1 ) {
  $count1++;
  } elseif ($rating[$i] == 2) {
  $count2++;
  }
  elseif ($rating[$i] == 3) {
  $count3++;
  }
  elseif ($rating[$i] == 4) {
  $count4++;
  }
  else {
  $count5++;
  }
        }
         
        $level_weight= array(0,0,0,0,0);
        
        
   for($i=0; $i < $n; $i++)
        {
        if ($rating[$i] == 1 ) {
  $level_weight[0]=$rating_weight[$i]+$level_weight[0];
  } elseif ($rating[$i] == 2) {
  $level_weight[1]=$rating_weight[$i]+$level_weight[1];
  }
  elseif ($rating[$i] == 3) {
  $level_weight[2]=$rating_weight[$i]+$level_weight[2];
  }
  elseif ($rating[$i] == 4) {
  $level_weight[3]=$rating_weight[$i]+$level_weight[3];
  }
  else {
  $level_weight[4]=$rating_weight[$i]+$level_weight[4];
  }
        }
        
     
        
        $reputation_score=0;
        if ($level_weight[0] != 0)
        {                       $reputation_score=$reputation_score+(1*$level_weight[0]);
  }
  
    if ($level_weight[1] != 0)
        {                       $reputation_score=$reputation_score+(2*$level_weight[1]);
  }
  
   if ($level_weight[2] != 0)
        {                       $reputation_score=$reputation_score+(3*$level_weight[2]);
  }
   if ($level_weight[3] != 0)
        {                       $reputation_score=$reputation_score+(4*$level_weight[3]);
  }
         if ($level_weight[4] != 0)
        {                       $reputation_score=$reputation_score+(5*$level_weight[4]);
  }
  
      echo  round($reputation_score,2);
   
  
      }
      
      
      
      
      function stats_wafa( $x, $m, $s_d) {
  $top=pow($x-$m,2);
  $bottom= -2*(pow($s_d,2));
  
  return (pow(2.72,$top/$bottom))/($s_d*sqrt(2*3.14));
  
  }
  ?>