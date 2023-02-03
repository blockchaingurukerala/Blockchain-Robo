pragma solidity >=0.4.22 <0.8.0;
pragma experimental ABIEncoderV2;
contract Robot { 
       uint public supplierCount=0;
       uint public customerCount=0;
       uint public totalRobots=0;
       uint public xsdCount=0;
       uint public ontologyCount=0;
	   uint public ontologiestoadminCount=0;
	   
       address public admin;
       struct RobotGeneralInformation {
              uint id;       
              string purpose1;
              string purpose2;
              string robotname;
              string proposed;
              string ROAapproved;
              uint rating;
              uint totalapproval; 
              string descproposed;                          
       }
       mapping(uint => RobotGeneralInformation) public robotgeneralinformations;
       struct RobotSubjectAtribute {
              uint id;       
              string manmachineinterface;
              string programmingflexibility;
              string stability;
              string compliavce;              
        }
       mapping(uint => RobotSubjectAtribute) public robotsubjectattributes;
       struct Ontology {
              uint id;
              address proposer;      
              uint totalapproval; 
              string descproposed; 
			  string justification;
				string stdate;
				string enddate;			  
        }
       mapping(uint => Ontology) public ontology;
	   struct OntologyToAdmin {
              uint id;
              address proposer;      
              uint sendtoAll; 
              string descproposed; 
			  string justification;	
				string startdate;
				string enddate;
        }
       mapping(uint => OntologyToAdmin) public ontologiestoadmin;
	   
       struct RobotGeneralAtribute {
              uint id;       
              string processor;
              string typeofrobot;                           
        }
       mapping(uint => RobotGeneralAtribute) public robotgeneralattributes;

       struct RobotObjectiveAtribute {
              uint id;       
              string purchasecode;
              string deliverytime;                           
        }
       mapping(uint => RobotObjectiveAtribute) public robotobjectiveattributes;
       struct XSDFile1 { 
              uint id;                  
              string manmachineinterface;
              string programmingflexibility;
              string stability;
              string compliavce;                       
       }  
       mapping(uint => XSDFile1) public latestXSDFile1; 
       struct XSDFile2 { 
              uint id;
              string processor;
              string typeofrobot;
              string purchasecode;
              string deliverytime;               
       }        
       mapping(uint => XSDFile2) public latestXSDFile2; 
       struct RoboRating { 
              uint id;
              uint totalCustomersRated;
              uint totalRatings;                             
       }        
       mapping(uint => RoboRating) public roboratings; 
       mapping(address =>mapping(uint=>uint)) public ratedotnot;
       mapping(uint => address) public robotowners;
       mapping(address => string) public roles; 
       mapping(address => string) public rated; 
	mapping (address => string[]) public interests;
       mapping(address =>mapping(uint=>uint)) public allproposals;

       mapping(uint=>uint[]) public subjectivedata;
       mapping(uint=>uint[]) public objectivedata;
       constructor() public {  
              admin=msg.sender;    
       }
        function getSbjectiveData (uint _id) public view returns(uint[] memory){
              return subjectivedata[_id];
       }
        function getObjectiveData (uint _id) public view returns(uint[] memory){
              return objectivedata[_id];
       }

		function addinterests (string [] memory _interest) public {
			interests[msg.sender]=_interest;
		}
		function getinterests(address a) public view returns (string [] memory) {
            return interests[a];
		}
       function registerRoles (string memory _role) public {
              require(bytes(roles[msg.sender]).length==0);
              roles[msg.sender]=_role;
              if(keccak256(abi.encodePacked((_role))) == keccak256(abi.encodePacked(("2")))){
                   supplierCount++;  
              }
       }
       function addNewRobot(string memory _p1,string memory _p2,string memory _rname,uint[] memory _sub,uint[] memory _obj,uint _pscore) public {
              totalRobots++;
              robotgeneralinformations[totalRobots] =RobotGeneralInformation(totalRobots,_p1,_p2,_rname,"false","false",0,0,"");            
              //robotsubjectattributes[totalRobots] =RobotSubjectAtribute(totalRobots,_mm,_pf,_st,_cp);
              //robotgeneralattributes[totalRobots] =RobotGeneralAtribute(totalRobots,_prc,_type);
              //robotobjectiveattributes[totalRobots] =RobotObjectiveAtribute(totalRobots,_pc,_pt);
              robotowners[totalRobots]=msg.sender;
              subjectivedata[totalRobots]=_sub;
              objectivedata[totalRobots]=_obj;
              roboratings[totalRobots]=RoboRating(totalRobots,0,_pscore);
       }
       function updateOntology(uint i,string memory _startdate,string memory _enddate) public { 
			  address _adr=ontologiestoadmin[i].proposer;
			  string memory _desc=ontologiestoadmin[i].descproposed;
			  string memory _justification=ontologiestoadmin[i].justification;
			  ontologiestoadmin[i].sendtoAll=1;
			  ontologiestoadmin[i].startdate=_startdate;
			  ontologiestoadmin[i].enddate=_enddate;
              ontologyCount++;
              ontology[ontologyCount] =Ontology(ontologyCount,_adr,0,_desc,_justification,_startdate,_enddate);        
       }
	    function deleteOntology(uint i) public { 			  
			  ontologiestoadmin[i].sendtoAll=2  ;                   
       }
	    function updateOntologyToAdmin(string memory _desc,string memory _justification) public { 
              ontologiestoadminCount++;
              ontologiestoadmin[ontologiestoadminCount] =OntologyToAdmin(ontologiestoadminCount,msg.sender,0,_desc,_justification,"","");        
       }
       function acceptProposal(uint id) public {
              address  _proposer=ontology[id].proposer;
              string memory _desc=ontology[id].descproposed;                          
              uint totalapproval=ontology[id].totalapproval+1;  
			  
				string memory _justi=ontology[id].justification; 
				string memory _stdate=ontology[id].stdate; 
				string memory _enddate=ontology[id].enddate;                         
              ontology[id] =Ontology(id,_proposer,totalapproval,_desc,_justi,_stdate,_enddate);
              allproposals[msg.sender][id]=2;
       }
       function rejectProposal(uint id) public {
              allproposals[msg.sender][id]=1;
       }
       function updateRatings(uint [] memory ratings,uint count) public {                     
              customerCount++;
              for(uint id=1;id<=count;id++){
                     string memory _p1=robotgeneralinformations[id].purpose1;
                     string memory _p2=robotgeneralinformations[id].purpose2;
                     string memory _rname=robotgeneralinformations[id].robotname;
                     string memory _propo=robotgeneralinformations[id].proposed;
                     string memory _roa=robotgeneralinformations[id].ROAapproved;
                     uint rating=robotgeneralinformations[id].rating;
                     rating=rating+ratings[id-1];
                     uint totalapproval=robotgeneralinformations[id].totalapproval; 
                     string memory _desc=robotgeneralinformations[id].descproposed; 
                     robotgeneralinformations[id] =RobotGeneralInformation(id,_p1,_p2,_rname,_propo,_roa,rating,totalapproval,_desc);
              }            
             rated[msg.sender]="1";
       }
       function addtoXSDFile(string memory _mm,string memory _pf,string memory _st,string memory _cp,string memory _prc,string memory _type,string memory _pc,string memory _pt) public {
              xsdCount++;                       
              latestXSDFile1[xsdCount] =XSDFile1(xsdCount,_mm,_pf,_st,_cp);
              latestXSDFile2[xsdCount] =XSDFile2(xsdCount,_prc,_type,_pc,_pt);              
       }
       function addtoXSDFilebyOntology(uint id) public {
              xsdCount++; 
              string memory _mm=robotsubjectattributes[id].manmachineinterface;
              string memory _pf=robotsubjectattributes[id].programmingflexibility;
              string memory _st=robotsubjectattributes[id].stability;
              string memory _cm=robotsubjectattributes[id].compliavce;
              string memory _pr=robotgeneralattributes[id].processor;
              string memory _type=robotgeneralattributes[id].typeofrobot;
              string memory _pc=robotobjectiveattributes[id].purchasecode;
              string memory _dt=robotobjectiveattributes[id].deliverytime;                                       
              latestXSDFile1[xsdCount] =XSDFile1(xsdCount,_mm,_pf,_st,_cm);
              latestXSDFile2[xsdCount] =XSDFile2(xsdCount,_pr,_type,_pc,_dt);              
       }
       function addRatingsOLD(uint [] memory ratings,uint [] memory robos) public {
	       for(uint i=0;i<robos.length;i++){
                     uint _roboid=robos[i];
                     uint _rating=ratings[i];
                     uint rating=roboratings[_roboid].totalRatings;
                     rating=rating+_rating;
                     uint totalcust=roboratings[_roboid].totalCustomersRated;
                     totalcust=totalcust+1;
                     roboratings[_roboid]=RoboRating(_roboid,totalcust,rating);
                     ratedotnot[msg.sender][_roboid]=1;
              }
       }
       function addRatings(uint [] memory ratings,uint [] memory robos) public {
	       for(uint i=0;i<robos.length;i++){
                     uint _roboid=robos[i];
                     uint _rating=ratings[i];
                     uint totalcust=roboratings[_roboid].totalCustomersRated;
                     totalcust=totalcust+1;
                     roboratings[_roboid]=RoboRating(_roboid,totalcust,_rating);
                     ratedotnot[msg.sender][_roboid]=1;
              }
       }
      
}