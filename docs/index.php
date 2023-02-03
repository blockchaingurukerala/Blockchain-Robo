<?php	
    //error_reporting(0);   
    //For insert into D
    
    if (isset($_POST["robo_name"][0])) {
              // $conn = mysqli_connect("localhost","root","", "robodb");
              // $itemCount = count($_POST["robo_name"]);
              // $itemValues=0;
              // $query = "INSERT INTO rating (id,roboname,robopurpose,roboseller,customer,rating) VALUES ";
              // $queryValue = "";
              // for($i=0;$i<$itemCount;$i++) {
              //     $itemValues++;
              //     if (isset($_POST["robo_checkBox"][$i])) {
              //       if($queryValue!="") {
              //         $queryValue .= ",";
              //       }
              //       $queryValue .= "('" . $_POST["robo_id"][$i] . "', '" . $_POST["robo_name"][$i] . "', '" . $_POST["robo_purpose"][$i] . "', '" . $_POST["robo_seller"][$i] . "', '" . $_POST["robo_customer"][$i] . "', '" . $_POST["robo_selectrating"][$i] . "')";
              //       }				
              // }
              // $sql = $query.$queryValue;
              // if($itemValues!=0) {
              //     $result = mysqli_query($conn, $sql);

              //   if(!empty($result)) $message = "Added Successfully.";
              // }
              // mysqli_close($conn);
  }

?>

<!DOCTYPE html>
<html>
  <head> 
    <title>Hello Robot</title> 
    <link rel="shortcut icon" href="#"> 
    <link href='https://fonts.googleapis.com/css?family=Open Sans:400,700' rel='stylesheet' type='text/css'> 
    <link href='https://maxcdn.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css' rel='stylesheet' type='text/css'>
  </head>
  <body >
   <div class="container"> 
     <!-- new registration page stars   -->
     <div id="registrationpage">
      <div class="row">
        <div class="col-lg-8 offset-lg-2">
            <label for="RoleSelect">Select Role</label>
            <select class="form-control" id="RoleSelect" onchange="App.CustomerOrSupplier(this);">
                <option value="1" selected>Customer</option>
                <option value="2">Supplier</option>               
            </select>
        </div>        
    </div>
    <div class="row">
        <div  class="col-lg-8 offset-lg-2" id="cblist11">  
          <label>Following Robot Purposes are available. Please select your Interest</label>         
        </div>
        <div id="cblist" class="col-lg-8 offset-lg-2">           
        </div>
    </div>
    <div class="row">
        <div class="col-lg-8 offset-lg-2 offset-md-3">
            <button class="btn btn-primary" onclick="App.proceesRegistration()">Proceed</button>
        </div>
    </div>     
   </div>
     <!-- new registration page Ends   -->
   
     
       <!-- Customer page starts  -->
       <div id="customer" style="display: none;">
        <h1>IBBRB</h1>
        <p>Your Smart way to seelct the best suited robot for your tasks</p>
        <li> <a style="pointer-events: none; " onclick="App.showAddNewRobotPage()"><i class="fa fa-dashboard"></i> <span>Add New Robot</span></a></li>
        <li> <a style="pointer-events: none; " onclick="App.showupdateOntologyPage()"><i class="fa fa-dashboard"></i> <span>Update ontology</span></a></li>
        <li> <a style="pointer-events: none; " onclick="App.showaproveOntologyPage()"><i class="fa fa-dashboard"></i> <span>Aprove ontology update</span></a></li>
        <li> <a style="cursor: pointer; color: blue;" onclick="App.showRatingRobotPage()"><i class="fa fa-dashboard"></i> <span>Rating Robot</span></a></li>
        <li> <a style="pointer-events: none; " onclick="App.showAdminPage()"><i class="fa fa-dashboard"></i> <span>Admin</span></a></li>
       
       </div>
        <!-- Customer page starts  -->
         <!-- Supplier page starts  -->
       <div id="supplier" style="display: none;">
        <h1>IBBRB</h1>
        <p>Your Smart way to seelct the best suited robot for your tasks</p>
        <li> <a style="cursor: pointer; color: blue;" onclick="App.showAddNewRobotPage()"><i class="fa fa-dashboard"></i> <span>Add New Robot</span></a></li>
        <li> <a style="cursor: pointer; color: blue;" onclick="App.showupdateOntologyPage()"><i class="fa fa-dashboard"></i> <span>Update ontology</span></a></li>
        <li> <a style="cursor: pointer; color: blue;" onclick="App.showaproveOntologyPage()"><i class="fa fa-dashboard"></i> <span>Aprove ontology update</span></a></li>
        <li> <a style="pointer-events: none; " onclick="App.showRatingRobotPage()"><i class="fa fa-dashboard"></i> <span>Rating Robot</span></a></li>
        <li> <a style="pointer-events: none; " onclick="App.showAdminPage()"><i class="fa fa-dashboard"></i> <span>Admin</span></a></li>
       
     </div>
      <!-- Supplier page starts  -->
        <!-- Admin page starts  -->
        <div id="admin" style="display: none;">
          <h1>IBBRB</h1>
        <p>Your Smart way to seelct the best suited robot for your tasks</p>
        <li> <a style="pointer-events: none; " onclick="App.showAddNewRobotPage()"><i class="fa fa-dashboard"></i> <span>Add New Robot</span></a></li>
        <li> <a style="pointer-events: none; " onclick="App.showupdateOntologyPage()"><i class="fa fa-dashboard"></i> <span>Update ontology</span></a></li>
        <li> <a style="pointer-events: none; " onclick="App.showaproveOntologyPage()"><i class="fa fa-dashboard"></i> <span>Aprove ontology update</span></a></li>
        <li> <a style="pointer-events: none; " onclick="App.showRatingRobotPage()"><i class="fa fa-dashboard"></i> <span>Rating Robot</span></a></li>
        <li> <a style="cursor: pointer; color: blue;" onclick="App.showAdminPage()"><i class="fa fa-dashboard"></i> <span>Admin</span></a></li> 
        <!-- <li> <a style="cursor: pointer; color: blue;" onclick="App.showAdminXSDUpdatePage()"><i class="fa fa-dashboard"></i> <span>Update XSD File</span></a></li>       -->
       </div>
        <!-- Admin page Ends  -->
         <!-- approve or reject  page starts -->
         <div id="approveorrejectpage" style="display: none;">
          <div class="row">
            <h2>Approve Ontology Update</h2>
            <table class="table">
              <tr>
                <th>Approve update Description</th>
                <th>Justification</th>
                <th>StartDate</th>
                <th>EndDate</th>
                <th>Approve</th>
                <th>Reject</th>
              </tr>
              <tbody id="aproveorrejectlist"></tbody>
                
            </table>
          </div>
        </div>
        <!-- approve or reject page ends -->
        <!-- propose page starts -->
        <div id="proposepage" style="display: none;">
          <div class="row">
            
            <table class="table">
              <tr>
                
                <td  colspan="2" align="center" ><h2>Update Ontology </h2></td>
                <!-- <td style="display:none;"><label for="displayallroboides">Select Robo ID</label><select class="form-control" id="displayallroboides"></select></td> -->
              </tr>
              <tr>  
                <td>Propose a Change in the Atrribute</td>              
                <td ><textarea  id="proposaltext" class="form-control"></textarea></td>
              </tr>
              <tr>  
                <td>Justification</td>              
                <td ><textarea  id="justificationtext" class="form-control" ></textarea></td>
              </tr>
              <tr>
                <td colspan="2" align="center"><button type="button" class="btn btn-primary" onclick="App.updateOntology()">Submit To Admin</button></td>
              </tr>
            </table>
          </div>
        </div>
        <!-- propose page ends -->
        <!-- add new robot page start -->
        <div id="addnewrobot" style="display: none;">
           
          <div class="row">
            <h2>Add new Robot</h2>
          
            
            <!-- purpose1 Begins -->
            <table class="table">
              <tr>
                <td>Single or Multiple purpose robot</td>
                <td>
                  <select class="form-control" id="singleorMultiple">
                    <option value="1" selected>Single</option>
                    <option value="2">Multiple</option>               
                </select>
                </td>
              </tr>

              <tr>
              <td>purpose1</td>
                <td><input class="form-control" type="text" id="purpose1"></td>
              </tr>
            </table>
           

           
            
            <table class="table" style="border: 1px solid;margin-left: 20%;">
           
              <tr>
                <td colspan="2" style="text-align:center;"> <h5>Purpose1 Description</h5></td>
              </tr>
             
              <tr>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>type of user</td>
                <td><input type="text" class="form-control" id="typeuser_purpose1"></td>
              </tr>
              <tr>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>Service Description</td>
                <td><input type="text" class="form-control" id="serviceDesc_purpose1"></td>
              </tr>
              <tr>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>Location</td>
                <td><input type="text" class="form-control" id="location_purpose1"></td>
              </tr>
              <tr>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>Environment</td>
                <td><input type="text" class="form-control" id="environment_purpose1"></td>
              </tr>
              <tr>
              <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>Time</td>
                <td><input type="text" class="form-control" id="time_purpose1"></td>
              </tr>
            </table>
            <!-- purpose1 Ends -->
           
            
            <!-- purpose2 Begins -->
            <table class="table purposetworow" style="display:none;">
              <tr>
              <td>purpose2</td>
                <td><input class="form-control" type="text" id="purpose2"></td>
              </tr>
            </table>
            <table class="table purposetworow" style="border: 1px solid;margin-left: 20%;display:none;">
              <tr>
                <td colspan="2" style="text-align:center;"> <h5>Purpose2 Description</h5></td>
              </tr>
              <tr>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>type of user</td>
                <td><input type="text" class="form-control" id="typeuser_purpose2"></td>
              </tr>
              <tr>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>Service Description</td>
                <td><input type="text" class="form-control" id="serviceDesc_purpose2"></td>
              </tr>
              <tr>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>Location</td>
                <td><input type="text" class="form-control" id="location_purpose2"></td>
              </tr>
              <tr>
                <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>Environment</td>
                <td><input type="text" class="form-control" id="environment_purpose2"></td>
              </tr>
              <tr>
              <td>&nbsp&nbsp&nbsp&nbsp</td>
                <td>Time</td>
                <td><input type="text" class="form-control" id="time_purpose2"></td>
              </tr>
            </table>
            <!-- purpose2 Ends -->
            <table class="table">
              <tr >
                <td>Robot Name</td>
                <td><input  class="form-control" type="text" id="robotname"></td>
              </tr>
            </table>
            <!-- <table class="table">
              <tr>
                <td>Single or Multiple purpose robot</td>
                <td>
                  <select class="form-control" id="singleorMultiple">
                    <option value="1" selected>Single</option>
                    <option value="2">Multiple</option>               
                </select>
                </td>
              </tr>
              
              <tr>
                <td>purpose</td>
                <td><input class="form-control" type="text" id="purpose1"></td>
              </tr>
              <tr style="display: none;" class="purposetworow">
                <td>purpose2 Name</td>
                <td><input class="form-control" type="text" id="purpose2"></td>
              </tr>
              <tr style="display: none;" class="purposetworow">
                <td></td>
                <td><input class="form-control" type="text" id="purpose2" placeholder="Service Requester"></td>
              </tr>
              <tr style="display: none;" class="purposetworow">
                <td></td>
                <td><input class="form-control" type="text" id="purpose2" placeholder="Description"></td>
              </tr>
              <tr style="display: none;" class="purposetworow">
                <td></td>
                <td><input class="form-control" type="text" id="purpose2" placeholder="Location"></td>
              </tr>
              <tr style="display: none;" class="purposetworow">
                <td></td>
                <td><input class="form-control" type="text" id="purpose2" placeholder="Time"></td>
              </tr>
              <tr >
                <td>Robot Name</td>
                <td><input  class="form-control" type="text" id="robotname"></td>
              </tr>
            </table> -->
          </div>
          <div class="row">
          <div class="col col-12 col-sm-4 col-md-4 col-lg-4">              
            </div>
            <div class="col col-12 col-sm-4 col-md-4 col-lg-4">
              <h2>SPECIFICATIONS</h2>
            </div>
            <div class="col col-12 col-sm-4 col-md-4 col-lg-4">             
            </div>          
          </div>
          <div class="row">  
          <?php
                 
                 $doc = new DOMDocument();
                 $doc->preserveWhiteSpace = true;                  
                
                 $filename = 'RAO_changeFromRequest';
                 $filextention = 'xml';
                 $filepath = 'http://localhost:8080/Robot/docs/';
                 //$filfullpath = $filename.'.'.$filextention;  
                 $filfullpath=$_SERVER["DOCUMENT_ROOT"] . '/Robot/docs/'. $filename.'.'.$filextention   ;          
                 $doc->loadXML($filfullpath);

                $k=1;
                while(1) {
                    if (file_exists($filfullpath)) {
                        $doc->load( $filfullpath);
                        $filename='RAO_changeFromRequest'.strval($k);
                        $filfullpath=$_SERVER["DOCUMENT_ROOT"] . '/Robot/docs/'. $filename.'.'.$filextention   ; 
                       
                    } else {
                     
                       break;
                    }
                    clearstatcache();
                    $k= $k+1;
                } 

                 $doc->save($_SERVER["DOCUMENT_ROOT"] . '/Robot/docs/t.xml');
                 $xsdstring = file_get_contents($_SERVER["DOCUMENT_ROOT"] . '/Robot/docs/t.xml');
                 $doc->loadXML(mb_convert_encoding($xsdstring, 'utf-8', mb_detect_encoding($xsdstring)));
                 $xpath = new DOMXPath($doc);
                 $xpath->registerNamespace('xs', 'http://www.w3.org/2001/XMLSchema');
                 
                 function echoElements($indent, $elementDef,$i) {
                    global $doc, $xpath;  if($i==1){?> 
                    
                <div class="col col-12 col-sm-4 col-md-4 col-lg-4">
                    <table class="table">
                      <tr>
                        <td colspan="2" align="center"><strong><?php 
                         global $atr;
                         global $z;
                         $z=0;
                         
                         $atr=$indent . $elementDef->getAttribute('name');
                        echo $indent . $elementDef->getAttribute('name'); ?></strong></td>
                      </tr>

                <?php 
                   }  
                   $elementDefs = $xpath->evaluate("xs:complexType/xs:all/xs:element", $elementDef);
                   
                   foreach($elementDefs as $elementDef) {
                     if($i==1){
                      
                    ?>  
                    <tr>
                    <?php echoElements($indent , $elementDef,$i+1); ?>
                     <td><?php 
                      $z=$z+1;
                     echo $indent . $elementDef->getAttribute('name'); ?></td>     
                     <?php
                          if($atr=="subjective"){
                     ?>  
                       <td>
                        <!-- <select class="form-control" id=<?php echo  $atr.$z ?>>
                         <option value="5">High</option>
                         <option value="4">Medium High</option>
                         <option value="3">Medium </option>
                         <option value="2">Medium Low </option>
                         <option value="1">Low </option>
                       </select> -->
                       <input type="text"  id=<?php echo  $atr.$z ?> class="form-control"  >
                      </td>
                      <?php
                         }
                         else{
                     ?>             
                     <td><input class="form-control" type="text" id=<?php echo  $atr.$z ?> ></td>
                     <?php
                         }
                        
                     ?> 
                   </tr>

                 <?php
                     } 
                     else{
                      echoElements($indent , $elementDef,$i+1);
                     }   
                   } 
                   if($i==1){                      
                    ?> 
                  </table>
                 </div>
                 <?php
                 }
                }
                 ?>  
                 
                 <?php
                 $elementDefs = $xpath->evaluate("/xs:schema/xs:element");
                 foreach($elementDefs as $elementDef) {
                   echoElements("", $elementDef,0);
                 }     
                 
               ?>            
          </div>            
          <div class="row">
              <div class="col col-12 col-sm-4 col-md-4 col-lg-4"></div>              
                
                <div class="col col-12 col-sm-4 col-md-4 col-lg-4">
                <button type="button" class="btn btn-primary" onclick="App.saveAddnewRobot()">SAVE TO BLOCKCHAIN</button>
                </div>
                <div class="col col-12 col-sm-4 col-md-4 col-lg-4"> </div>               
                     
          </div>
        </div>
        <!-- add new robot page ends -->
        <!-- customer Rating page starts -->
        <div id="customerratingpage" style="display: none;">
          <div class="row">         
          <br>
           
            <br>
            
            <form onSubmit="App.storeRatingintoBC(this); return false;" method="post">
                  <table class="table" >
                  <tr><td colspan="5"><h2>Rating Robot</h2></td></tr>
                  <!-- <tr>
                    <td colspan="3">Select the Robot</td>
                    <td colspan="2">
                      <select class="form-control" id="selectRobotID" onchange="App.selectRobotChange();">
                    
                      </select>
                    </td>
                   
                  </tr> -->
                    <tr>
                      <th>Select</th>
                      <th>ID</th>
                      <th>Robot Nme</th>
                      <th>Pupose</th>
                      <th>Reputation Score</th>
                      <th>Your Rating(/5)</th>
                    </tr>
                    <tbody id="displayallrobots" style="display: none;" ></tbody>
                      
                  </table>
            </form>
           
          </div>
        </div>
        <!-- customer Rating page ends -->
         <!-- Admin supplier view page starts -->
         <div id="adminproposalviewpage" style="display: none;">
          <div class="row">
            <h2>You are Admin</h2>
            <table class="table">
              <tr>                
                <th>Supplier</th>
                <th>Message</th>
                <th>End Date</th>
                <th>Total Approval Recieved</th> 
                <th>% of Acceptance</th>               
              </tr>
              <tbody id="displayallproposals"></tbody>
                <tr><th >Total Suppliers= <span id="totalsupllier"></span> </th><th ></th></tr>
            </table>
          </div>
          <div class="row">
            <h2>Send Ontology Update to All Suppliers</h2>
            <table class="table">
              <tr>                
                <th>From Supplier</th>
                <th>Proposal</th>
                <th>Justification</th>
                <th>Start Date </th>
                <th>End Date</th>
                <th>Send</th> 
                <th>Reject</th>               
              </tr>
              <tbody id="displayallproposalstoadmin"></tbody>
                
            </table>
          </div>
        </div>
        <!-- Admin supplier view page ends -->
        <!-- Admin Update XSD page starts -->
        <div id="adminupdatexsdpage" style="display: none;">
          <div class="row">
            <h2>Update Latest XSD File by Admin</h2>           
          </div>
          <div class="row">           
             <div class="col col-12 col-sm-4 col-md-4 col-lg-4">
                 <table class="table">
                   <tr>
                     <td colspan="2" align="center"><h3>Subject Atrributes</h3></td>
                   </tr>
                   <tr>
                     <td>Man Machine Interface</td>
                     <td><input class="form-control" type="text" id="manmachineinterfaceadmin"></td>
                   </tr>
                   <tr>
                    <td>Programming Flexibility</td>
                    <td><input class="form-control" type="text" id="programmingflexibilityadmin"></td>
                  </tr>
                  <tr>
                    <td>Stability</td>
                    <td><input class="form-control" type="text" id="stabilityadmin"></td>
                  </tr>
                  <tr>
                    <td>Compliance</td>
                    <td><input class="form-control" type="text" id="complianceadmin"></td>
                  </tr>
                 </table>
             </div>
             <div class="col col-12 col-sm-4 col-md-4 col-lg-4">
              <table class="table">
                <tr>
                  <td colspan="2" align="center"><h3>General Atrributes</h3></td>
                </tr>
                <tr>
                  <td>Processor</td>
                  <td><input class="form-control" type="text" id="processoradmin"></td>
                </tr>
                <tr>
                  <td>Type of Robot</td>
                  <td><input class="form-control" type="text" id="typeofrobotadmin"></td>
                </tr>
              </table>
            </div>
            <div class="col col-12 col-sm-4 col-md-4 col-lg-4">
              <table class="table">
                <tr>
                  <td colspan="2" align="center"><h3>Objective  Atrributes</h3></td>
                </tr>
                <tr>
                  <td>Purchase cose</td>
                  <td><input class="form-control" type="text" id="purchasecoseadmin"></td>
                </tr>
                <tr>
                  <td>Delivery Time</td>
                  <td><input class="form-control" type="time" id="deliverytimeadmin"></td>
                </tr>
                <tr>
                  <td colspan="2" align="center"> <button type="button" class="btn btn-primary" onclick="App.updateXSDFilebyAdmin()">Update XSD</button></td>
                </tr>
              </table>
            </div>
        </div>
        <!-- Admin Update XSD page ends -->
    </div> 
  </body>
  <script src="https://cdn.jsdelivr.net/gh/ethereum/web3.js@1.0.0-beta.37/dist/web3.min.js"></script>
  <!-- <script src="https://code.jquery.com/jquery-3.1.1.slim.min.js"></script> -->
  <!-- <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.5.1/jquery.min.js"></script> -->
  <script src="js/jquery-3.2.1.min.js"></script>
  <script src="js/popper.min.js"></script> 
  <script src="js/jquery.slimscroll.js"></script>
  <script src="js/truffle-contract.js"></script>
  <script src="js/bootstrap.min.js"></script>
  <script src="js/index.js"></script>
  </html>
