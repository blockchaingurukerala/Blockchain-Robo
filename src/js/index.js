// import Web3 from "web3";
// import votingArtifact from "../../build/contracts/Voting.json";

const App = {  
	web3: null, 
	loading: false, 
	account: null,
	contracts: {},  
	robot: null, 
	load: async () => {
		
		await App.loadWeb3();
		await App.loadAccount();
		await App.loadContract();
		await App.render();
	  },
	  testing : async ()=>{
			window.alert("tested");
	  },
	  render:async ()=>{		
			// Prevent double render
			if (App.loading==true) {
			  return
			}	
			App.loading=true;
			var role=await App.robot.roles(App.account);			
			if(role=="1"){
				//customer page
				$("#customer").show();
				$("#supplier").hide();
				$("#admin").hide();
				$("#registrationpage").hide();	
				$("#addnewrobot").hide();	
				$("#proposepage").hide();
				$("#approveorrejectpage").hide();
				$("#customerratingpage").hide();
				$("#adminproposalviewpage").hide();
				$("#adminupdatexsdpage").hide();
			}
			else if(role=="2"){
				//Supplier page
				$("#customer").hide();
				$("#supplier").show();
				$("#admin").hide();
				$("#registrationpage").hide();
				$("#addnewrobot").hide();
				$("#proposepage").hide();
				$("#approveorrejectpage").hide();
				$("#customerratingpage").hide();
				$("#adminproposalviewpage").hide();
				$("#adminupdatexsdpage").hide();
			}
			else{
				var admin=await App.robot.admin();       
          		if(admin.toUpperCase().localeCompare(App.account.toUpperCase())==0){
					  //Admin User
					$("#customer").hide();
					$("#supplier").hide();
					$("#admin").show();
					$("#registrationpage").hide();
					$("#addnewrobot").hide();
					$("#proposepage").hide();
					$("#approveorrejectpage").hide();
					$("#customerratingpage").hide();
					$("#adminproposalviewpage").hide();
					$("#adminupdatexsdpage").hide();
				}
				else{
					//new User 
					$("#customer").hide();
					$("#supplier").hide();
					$("#admin").hide();
					$("#registrationpage").show();
					$("#addnewrobot").hide();
					$("#proposepage").hide();
					$("#approveorrejectpage").hide();
					$("#customerratingpage").hide();
					$("#adminproposalviewpage").hide();
					$("#adminupdatexsdpage").hide();
				}           
			}			
			App.loading=false;
	  },
	  updateOntology:async ()=>{
		var id=$("#displayallroboides").val();
		var desc=$("#proposaltext").val();
		if(id!=null){			
			await App.robot.updateOntology(parseInt(id),desc,{from:App.account});
			window.alert("Updated");
			await App.render();
		}
		else{ window.alert("You dont have added any robot");await App.render();}
	  },
	  proceesRegistration:async ()=>{		
		var RoleSelect=$("#RoleSelect").val();
		await App.robot.registerRoles(RoleSelect,{from:App.account});
		await App.render();
	  },
	  acceptProposal:async (i)=>{
			await App.robot.acceptProposal(parseInt(i),{from:App.account});
			await App.render();
	  },
	  rejectProposal:async (i)=>{
			await App.robot.rejectProposal(parseInt(i),{from:App.account});
			await App.render();
	  },
	  storeRatingintoBC :async (form)=>{
			var i=parseInt($("#selectRobotID").val());
			var selectedrobo="#selectrobo"+i.toString();		
			var ratinggiven=parseInt($(selectedrobo).val());	
			await App.robot.addRatings(ratinggiven,i,{from:App.account});
			form.submit();	
		
		//store into rating table ,values(id,name,pupose,seller,customer,rating)
		//and update the table roborating
	  },
	  selectRobotChange :async ()=>{
		var i=parseInt($("#selectRobotID").val());
		$("#displayallrobots").empty();
		var roboinfo=await App.robot.robotgeneralinformations(i);
		var roborating=await App.robot.roboratings(i);
		var seller=await App.robot.robotowners(parseInt(i));
		
		var avgRating=parseFloat(roborating[2]);
		var totalCustomer=parseInt(roborating[1])
		if(totalCustomer!=0){
			avgRating=avgRating/totalCustomer;
		}
		var str="<tr><td>"+`<input type="text" class="form-control" value='`+roboinfo[0]+`'  name="robo_id" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[3]+`'  name="robo_name" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[1]+`'  name="robo_purpose" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+avgRating.toString()+`'  name="robo_score" readonly>`+"</td><td>";
		str=str+`<select class="form-control" id='selectrobo`+i+`' name="robo_selectrating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td><td>`;
		//hidden fields
		str=str+`<input type="hidden"  value='`+seller+`'  name="robo_seller">`+"</td><td>"+`<input type="hidden"  value='`+App.account+`'  name="robo_customer">`+"</td></tr>";
		$("#displayallrobots").append(str);	
		var str1;
		var rated=await App.robot.ratedotnot(App.account,i);
		if(rated=="1"){
			str1=`<tr><td colspan="5" align="center"><input type="button" class="btn btn-danger disabled" name="save" value="Save" disabled /></td></tr>`	
		}
		else{
			str1=`<tr><td colspan="5" align="center"><input type="submit" class="btn btn-primary" name="save" value="Save"  /></td></tr>`
		}
		$("#displayallrobots").append(str1);	
		$("#displayallrobots").show();
	  },
	  showRatingRobotPage :async ()=>{
		var count=await App.robot.totalRobots();
		var totalCustomer=await App.robot.customerCount();
		$("#displayallrobots").hide();
		$("#displayallrobots").empty();
		$("#selectRobotID").empty();	
		//retrieve rating from dtabase		  
		for(var i=1;i<=count;i++) {
			var roboinfo=await App.robot.robotgeneralinformations(i);
			var seller=await App.robot.robotowners(parseInt(i));
			var avgRating=parseFloat(roboinfo[6]);
			if(totalCustomer!=0){
				avgRating=avgRating/totalCustomer;
			}
			// var str="<tr><td>"+`<span name="item_name[]">`+roboinfo[0]+`</span>`+"</td><td>"+`<span name="item_name[]">`+roboinfo[3]+`</span>`+"</td><td>"+roboinfo[1]+"</td><td>"+roboinfo[6]+"</td><td>";
			// str=str+`<select class="form-control" id='selectrobo`+i+`' ><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td></tr>`;
			var str="<tr><td>"+`<input type="text" class="form-control" value='`+roboinfo[0]+`'  name="robo_id[]" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[3]+`'  name="robo_name[]" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[1]+`'  name="robo_purpose[]" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+avgRating.toString()+`'  name="robo_score[]" readonly>`+"</td><td>";
			str=str+`<select class="form-control" id='selectrobo`+i+`' name="robo_selectrating[]"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td><td>`;
			//hidden fields
			str=str+`<input type="hidden"  value='`+seller+`'  name="robo_seller[]">`+"</td><td>"+`<input type="hidden"  value='`+App.account+`'  name="robo_customer[]">`+"</td></tr>";
			var newstr=`<option value='`+i+`'>`+roboinfo[3]+`</option>`;
			$("#selectRobotID").append(newstr);
			$("#displayallrobots").append(str);	
		}
		var str1;
		var rated=await App.robot.rated(App.account);
		if(rated=="1"){
			str1=`<tr><td colspan="5" align="center"><input type="button" class="btn btn-danger disabled" name="save" value="Save" disabled /></td></tr>`	
		}
		else{
			str1=`<tr><td colspan="5" align="center"><input type="submit" class="btn btn-primary" name="save" value="Save"  /></td></tr>`
		}
		$("#displayallrobots").append(str1);	
		$("#customer").hide();
		$("#supplier").hide();
		$("#admin").hide();
		$("#registrationpage").hide();
		$("#addnewrobot").hide();
		$("#proposepage").hide();
		$("#approveorrejectpage").hide();
		$("#customerratingpage").show();
		$("#adminproposalviewpage").hide();
		$("#adminupdatexsdpage").hide();
	  },
	  showAdminPage :async ()=>{
		var totalsupplier=await App.robot.supplierCount();
		$("#displayallproposals").empty();
		var count=await App.robot.totalRobots();
		for(var i=1;i<=count;i++) {
			var addr=await App.robot.robotowners(i);
			var roboinfo=await App.robot.robotgeneralinformations(i);	
			var str="<tr><td>"+addr+"</td><td>"+roboinfo[8]+"</td><td>"+roboinfo[7]+"</td></tr>";
			$("#displayallproposals").append(str);		
		}
		$("#totalsupllier").html(totalsupplier.toString());
		$("#customer").hide();
		$("#supplier").hide();
		$("#admin").hide();
		$("#registrationpage").hide();
		$("#addnewrobot").hide();
		$("#proposepage").hide();
		$("#approveorrejectpage").hide();
		$("#customerratingpage").hide();
		$("#adminproposalviewpage").show();
		$("#adminupdatexsdpage").hide();
	  },
	  showAdminXSDUpdatePage :async ()=>{
		var i=await App.robot.xsdCount();
		//Latest ROA approved found;
		var subjectattr=await App.robot.latestXSDFile1(i);
		var generalattr=await App.robot.latestXSDFile2(i);
		$("#manmachineinterfaceadmin").val(subjectattr[1]);
		$("#programmingflexibilityadmin").val(subjectattr[2]);
		$("#stabilityadmin").val(subjectattr[3]);
		$("#complianceadmin").val(subjectattr[4]);
		$("#processoradmin").val(generalattr[1]);
		$("#typeofrobotadmin").val(generalattr[2]);
		$("#purchasecoseadmin").val(generalattr[3]);
		$("#deliverytimeadmin").val(generalattr[4]);	


		$("#customer").hide();
		$("#supplier").hide();
		$("#admin").hide();
		$("#registrationpage").hide();
		$("#addnewrobot").hide();
		$("#proposepage").hide();
		$("#approveorrejectpage").hide();
		$("#customerratingpage").hide();
		$("#adminproposalviewpage").hide();
		$("#adminupdatexsdpage").show();
	  },
	  updateXSDFilebyAdmin :async ()=>{
		var mm=$("#manmachineinterfaceadmin").val();
		var pf=$("#programmingflexibilityadmin").val();
		var st=$("#stabilityadmin").val();
		var cm=$("#complianceadmin").val();
		var pr=$("#processoradmin").val();
		var type=$("#typeofrobotadmin").val();
		var pc=$("#purchasecoseadmin").val();
		var dt=$("#deliverytimeadmin").val();
		await App.robot.addtoXSDFile(mm,pf,st,cm,pr,type,pc,dt,{from:App.account});
		await App.render();	
	  },
	  showaproveOntologyPage:async ()=>{
		var count=await App.robot.totalRobots();
		$("#aproveorrejectlist").empty();
		for(var i=1;i<=count;i++) {
			var addr=await App.robot.robotowners(i);
			//show all others proposals
			if(addr.toUpperCase().localeCompare(App.account.toUpperCase())!=0){
				var roboinfo=await App.robot.robotgeneralinformations(i);
				var desc=roboinfo[8];
				//if that supplier proposed request allproposals
				//var checkalreadyapproved=await App.robot.checkProposalAlreadyDone(parseInt(i));
				var allproposals=await App.robot.allproposals(App.account,parseInt(i))				
				if((roboinfo[4]=="true")){	
					var str;
					if(parseInt(allproposals)==0){
						str=`<tr><td>`+desc+`</td><td><button type='button' class='btn btn-primary' onclick="App.acceptProposal('`+i+`');">Accept</button></td><td><button type='button' class='btn btn-primary' onclick="App.rejectProposal('`+i+`');">Reject</button></td></tr>`;
					}				
					 else{
						str=`<tr><td>`+desc+`</td><td><button type='button' class='btn btn-danger disabled' disabled ">Accept</button></td><td><button type='button' class='btn btn-danger disabled' disabled >Reject</button></td></tr>`;
					 }
					$("#aproveorrejectlist").append(str);
				}
			}
		}
		$("#customer").hide();
		$("#supplier").hide();
		$("#admin").hide();
		$("#registrationpage").hide();	
		$("#addnewrobot").hide();	
		$("#proposepage").hide();
		$("#approveorrejectpage").show();
		$("#customerratingpage").hide();
		$("#adminproposalviewpage").hide();
		$("#adminupdatexsdpage").hide();
	  },
	  showupdateOntologyPage:async ()=>{
		var count=await App.robot.totalRobots();
		$("#displayallroboides").empty();
		for(var i=1;i<=count;i++) {
			var addr=await App.robot.robotowners(i);
			if(addr.toUpperCase().localeCompare(App.account.toUpperCase())==0){
				var str="<option value='"+i.toString()+"'>"+i+"</option>"; 
				$("#displayallroboides").append(str);
			}
		}
		$("#customer").hide();
		$("#supplier").hide();
		$("#admin").hide();
		$("#registrationpage").hide();	
		$("#addnewrobot").hide();	
		$("#proposepage").show();	
		$("#approveorrejectpage").hide();
		$("#customerratingpage").hide();
		$("#adminproposalviewpage").hide();
		$("#adminupdatexsdpage").hide();
	  },
	  showAddNewRobotPage:async ()=>{
		  //Load specific attributes from latest ROA file
		  var i=await App.robot.xsdCount();		  
			  
				  //Latest ROA approved found;
				  var subjectattr=await App.robot.latestXSDFile1(i);
				  var generalattr=await App.robot.latestXSDFile2(i);
				 
				  $("#manmachineinterface").val(subjectattr[1]);
				  $("#programmingflexibility").val(subjectattr[2]);
				  $("#stability").val(subjectattr[3]);
				  $("#compliance").val(subjectattr[4]);

				  $("#processor").val(generalattr[1]);
				  $("#typeofrobot").val(generalattr[2]);

				  $("#purchasecose").val(generalattr[3]);
				  $("#deliverytime").val(generalattr[4]);				 
			 
		 

		$("#customer").hide();
		$("#supplier").hide();
		$("#admin").hide();
		$("#registrationpage").hide();
		$("#addnewrobot").show();
		$("#proposepage").hide();
		$("#approveorrejectpage").hide();
		$("#customerratingpage").hide();
		$("#adminproposalviewpage").hide();
		$("#adminupdatexsdpage").hide();
	  },
	  saveAddnewRobot :async ()=>{
			var purpose1=$("#purpose1").val();
			var purpose2=$("#purpose2").val();
			var robotname=$("#robotname").val();
			
			// var manmachineinterface=$("#manmachineinterface").val();
			// var programmingflexibility=$("#programmingflexibility").val();
			// var stability=$("#stability").val();
			// var compliance=$("#compliance").val();

			// var processor=$("#processor").val();
			// var typeofrobot=$("#typeofrobot").val();

			// var purchasecose=$("#purchasecose").val();
			// var deliverytime=$("#deliverytime").val();

			var manmachineinterface=" ";
			var programmingflexibility=" ";
			var stability=" ";
			var compliance=" ";

			var processor=" ";
			var typeofrobot=" ";

			var purchasecose=" ";
			var deliverytime=" ";
			
			await App.robot.addNewRobot(purpose1,purpose2,robotname,manmachineinterface,programmingflexibility,stability,compliance,processor,typeofrobot,purchasecose,deliverytime,{from: App.account});
			$("#purpose1").val('');$("#purpose2").val('');$("#robotname").val('');
			$("#manmachineinterface").val('');$("#programmingflexibility").val('');$("#stability").val('');$("#compliance").val('');
			$("#processor").val('');$("#typeofrobot").val('');$("#purchasecose").val('');$("#deliverytime").val('');
			
			await App.render();
	  },
	 
	  		loadWeb3: async () => {
			//var Web3 = require('web3')  ;  
			if (typeof web3 !== 'undefined') {
			  App.web3Provider = web3.currentProvider
			  web3 = new Web3(web3.currentProvider)
			} else {
		
			  //web3 = new Web3(new Web3.providers.HttpProvider("http://localhost:7545"));
		
			  window.alert("Please connect to Metamask.")
			}
			// Modern dapp browsers...
			if (window.ethereum) {
			  window.web3 = new Web3(ethereum)
			  try {
				// Request account access if needed
				App.acc=await ethereum.enable()
				// Acccounts now exposed
				web3.eth.sendTransaction({/* ... */})
			  } catch (error) {
				// User denied account access...
			  }
			}
			// Legacy dapp browsers...
			else if (window.web3) {
			  App.web3Provider = web3.currentProvider
			  window.web3 = new Web3(web3.currentProvider)
			  // Acccounts always exposed
			  web3.eth.sendTransaction({/* ... */})
			}
			// Non-dapp browsers...
			else {
			  console.log('Non-Ethereum browser detected. You should consider trying MetaMask!')
			}
		  },
		
		  loadAccount: async () => {
			// Set the current blockchain account
			App.account = App.acc[0];
		  },
		  loadContract: async () => {
			// Create a JavaScript version of the smart contract
			const Robot = await $.getJSON('Robot.json')
			App.contracts.Robot = TruffleContract(Robot)
			App.contracts.Robot.setProvider(App.web3Provider)
			// Hydrate the smart contract with values from the blockchain
			App.robot = await App.contracts.Robot.deployed()
		  },
}; 


$(window).on('load', function(){ App.load();});

$("#singleorMultiple").change(function() {
	if($("#singleorMultiple").val()=="2"){
		$("#purposetworow").show();
	}
	else{
		$("#purposetworow").hide();
	}	
});
 
	