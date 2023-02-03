// import Web3 from "web3";
// import votingArtifact from "../../build/contracts/Voting.json";

const App = {  
	web3: null, 
	loading: false, 
	account: null,
	contracts: {},  
	robot: null, 
	selectedRobos:[],
	selectedRatings:[],
	uniqueproposes :[],
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
					var purposes=[];
					App.uniqueproposes=[]
					var count=await App.robot.totalRobots();											  
					for(var i=1;i<=count;i++) {
						var roboinfo=await App.robot.robotgeneralinformations(i);
						if(roboinfo[1]!=""){
							purposes.push(roboinfo[1]);
						}
						if(roboinfo[2]!=""){
							purposes.push(roboinfo[2]);
						}
					}
					//window.alert("hi");
					
					App.uniqueproposes = [...new Set(purposes)];
					for(var i=0;i<App.uniqueproposes.length;i++){
						await App.addCheckbox(App.uniqueproposes[i],i);
					}
					//console.log(App.uniqueproposes);
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
	  addCheckbox:async (name,id)=>{
		var container = $('#cblist');
		$('<input />', { type: 'checkbox', id: 'cb'+id, value: name, }).appendTo(container);
		$('<label />', { 'for': 'cb'+id, text: name }).appendTo(container);
	  },
	  CustomerOrSupplier :async (val)=>{		
		if($("#RoleSelect").val()=="1"){
			$('#cblist').show();
			$('#cblist11').show();
		}
		if($("#RoleSelect").val()=="2"){
			$('#cblist').hide();
			$('#cblist11').hide();
		}
	  },
	  updateOntology:async ()=>{
		var id=$("#displayallroboides").val();
		var desc=$("#proposaltext").val();	
		var justification=$("#justificationtext").val();				
			//await App.robot.updateOntology(desc,{from:App.account});
			await App.robot.updateOntologyToAdmin(desc,justification,{from:App.account});
			window.alert("Request Sent To Admin");
			await App.render();		
	  },
	  proceesRegistration:async ()=>{
		  var interests=[];
		for(var i=0;i<App.uniqueproposes.length;i++){
			var checkboxd='#cb'+i.toString();
			if($(checkboxd).is(':checked')){
				interests.push(App.uniqueproposes[i]);
			}
		}			
		var RoleSelect=$("#RoleSelect").val();
		if(RoleSelect=="1"){
			await App.robot.addinterests(interests,{from:App.account});
		}
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
			// var i=parseInt($("#selectRobotID").val());
			App.selectedRobos=[];
			App.selectedRatings=[];
			reputationscores=[];

			var count=await App.robot.totalRobots();
			for(var i=1;i<=count;i++) {
				var checkboxid="selectedRobo"+i.toString();
				var chkRobo = document.getElementById(checkboxid);	
				if(chkRobo){
					var selectedrobo="#selectrobo"+i.toString();
					var ratinggiven=parseInt($(selectedrobo).val());			
					if(chkRobo.checked) {
						App.selectedRobos.push(parseInt(i));
						App.selectedRatings.push(ratinggiven);
					}				
				}				
			}	
			if(App.selectedRobos.length>0){
				//console.log("id="+App.selectedRobos[q]);
				//add rating to Database
				for(var q=0;q<App.selectedRobos.length;q++){
					
					 console.log("id="+App.selectedRobos[q])
					// console.log("new rating"+App.selectedRatings[q])



					//Step1 check single or multi purpose
					var multi=await $.post("../docs/checkMulti.php", {id: App.selectedRobos[q]});
					window.alert(multi);
					//If multi puprose Robot
					if(multi=="Multi"){
						var keywords1=await $.post("../docs/getkeywords1.php", {id: App.selectedRobos[q]});
						//window.alert(keywords1);
						var keywords2=await $.post("../docs/getkeywords2.php", {id: App.selectedRobos[q]});
						//window.alert(keywords2);
						var ratingOverAll=await $.post("../docs/getOverAllRating.php", {id: App.selectedRobos[q]});
						
						var ratingPupose1=await $.post("../docs/getPurppose1Rating.php", {id: App.selectedRobos[q]});
						
						var ratingPupose2=await $.post("../docs/getPurpose2Rating.php", {id: App.selectedRobos[q]});
						
						var selectedrobopurpose="#selectrobopurpose"+App.selectedRobos[q].toString();
						//window.alert(selectedrobopurpose)
						//window.alert($(selectedrobopurpose).val())
						//case1. Not at all rated
						if(ratingPupose1=="0" && ratingPupose2=="0" && ratingOverAll=="0"){
							if($(selectedrobopurpose).val()=="0"){// if overall
								
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:App.selectedRatings[q],p1r:"0",p2r:"0",c:App.account,case:"0000",o:ratingOverAll,rs1:ratingPupose1,rs2:ratingPupose2});
								
							}
							if($(selectedrobopurpose).val()=="1"){// if purpose1 rating
								//predict p2 score using obj4
								
							   	r2=await $.post("../docs/obj4.php",{p1r:App.selectedRatings[q],
								p2r:ratingPupose2,
								r:ratingOverAll,
								keywords1:keywords1,
								keywords2:keywords2
								})
								
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:"0",p1r:App.selectedRatings[q],p2r:r2,c:App.account,case:"0001",o:ratingOverAll,rs1:ratingPupose1,rs2:ratingPupose2});	
								
							}
							if($(selectedrobopurpose).val()=="2"){// if purpose1 rating
								//predict p1 score using obj4
								window.alert("no rating selected purpose2")
							   	r2=await $.post("../docs/obj4.php",{p1r:ratingPupose1,
								p2r:App.selectedRatings[q],
								r:ratingOverAll,
								keywords1:keywords1,
								keywords2:keywords2
								})
								window.alert("Predicted score is"+r2)
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:"0",p1r:r2,p2r:App.selectedRatings[q],c:App.account,case:"0002",o:ratingOverAll,rs1:ratingPupose1,rs2:ratingPupose2});		
							}
						}

						if(ratingPupose1=="0" && ratingPupose2=="0" && ratingOverAll!="0"){
							//Case 2 have overall score but no other scores

							if($(selectedrobopurpose).val()=="0"){// if overall
								var data=await $.post("../docs/rating.php", {id: App.selectedRobos[q]});
								//data.append(App.selectedRatings[q]);
								var myArray = JSON.parse(data);
								myArray.push(App.selectedRatings[q]);
								//convert to int array
								for(z=0;z<myArray.length;z++){
									myArray[z]=parseInt(myArray[z]);
								}
								//console.log(myArray);
								//caculating reputation score for each robot selected
								var reputationscore=await $.post("../docs/NDR.php",{ r: myArray} );
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:App.selectedRatings[q],p1r:"0",p2r:"0",c:App.account,case:"0010",o:reputationscore,rs1:ratingPupose1,rs2:ratingPupose2});
								
							}
							if($(selectedrobopurpose).val()=="1"){// if purpose1 rating
								//predict p2 score using obj4
								
							   	r2=await $.post("../docs/obj4.php",{p1r:App.selectedRatings[q],
								p2r:ratingPupose2,
								r:ratingOverAll,
								keywords1:keywords1,
								keywords2:keywords2
								})
								
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:"0",p1r:App.selectedRatings[q],p2r:r2,c:App.account,case:"0011",o:ratingOverAll,rs1:ratingPupose1,rs2:ratingPupose2});	
								
							}
							if($(selectedrobopurpose).val()=="2"){// if purpose1 rating
								//predict p1 score using obj4
								//window.alert("no rating selected purpose2")
							   	r2=await $.post("../docs/obj4.php",{p1r:ratingPupose1,
								p2r:App.selectedRatings[q],
								r:ratingOverAll,
								keywords1:keywords1,
								keywords2:keywords2
								})
								//window.alert("Predicted score is"+r2)
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:"0",p1r:r2,p2r:App.selectedRatings[q],c:App.account,case:"0012",o:ratingOverAll,rs1:ratingPupose1,rs2:ratingPupose2});		
							}
						}

						if(ratingPupose1!="0" && ratingPupose2!="0" && ratingOverAll!="0"){
							//Case 3 have all the scores

							if($(selectedrobopurpose).val()=="0"){// if overall
								var data=await $.post("../docs/rating.php", {id: App.selectedRobos[q]});
								//data.append(App.selectedRatings[q]);
								var myArray = JSON.parse(data);
								myArray.push(App.selectedRatings[q]);
								//convert to int array
								for(z=0;z<myArray.length;z++){
									myArray[z]=parseInt(myArray[z]);
								}
								//console.log(myArray);
								//caculating reputation score for each robot selected
								var reputationscore=await $.post("../docs/NDR.php",{ r: myArray} );
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:App.selectedRatings[q],p1r:"0",p2r:"0",c:App.account,case:"1110",o:reputationscore,rs1:ratingPupose1,rs2:ratingPupose2});
								
							}
							if($(selectedrobopurpose).val()=="1"){// if purpose1 rating
								//predict p2 score using obj4
								
							   	r2=await $.post("../docs/obj4.php",{p1r:App.selectedRatings[q],
								p2r:ratingPupose2,
								r:ratingOverAll,
								keywords1:keywords1,
								keywords2:keywords2
								})
								
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:"0",p1r:App.selectedRatings[q],p2r:r2,c:App.account,case:"1011",o:ratingOverAll,rs1:ratingPupose1,rs2:ratingPupose2});	
								
							}
							if($(selectedrobopurpose).val()=="2"){// if purpose1 rating
								//predict p1 score using obj4
								//window.alert("no rating selected purpose2")
							   	r2=await $.post("../docs/obj4.php",{p1r:ratingPupose1,
								p2r:App.selectedRatings[q],
								r:ratingOverAll,
								keywords1:keywords1,
								keywords2:keywords2
								})
								//window.alert("Predicted score is"+r2)
								await $.post("../docs/updateMultiroboRating.php", {id: App.selectedRobos[q],r:"0",p1r:r2,p2r:App.selectedRatings[q],c:App.account,case:"0111",o:ratingOverAll,rs1:ratingPupose1,rs2:ratingPupose2});		
							}
						}




					}
					else{
						//if Single purpose Robot
						window.alert("selected single")	
						var data=await $.post("../docs/rating.php", {id: App.selectedRobos[q]});
						//data.append(App.selectedRatings[q]);
						var myArray = JSON.parse(data);
						myArray.push(App.selectedRatings[q]);
						//convert to int array
						for(z=0;z<myArray.length;z++){
							myArray[z]=parseInt(myArray[z]);
						}
						console.log(myArray);
						//caculating reputation score for each robot selected
						var reputationscore=await $.post("../docs/NDR.php",{ r: myArray} );
						console.log("Reputation score="+reputationscore);
						//For handlig decimal values
						reputationscores.push(reputationscore*100);
						//updating database
						var p=await $.post("../docs/updateSingleRoboRating.php", {id: App.selectedRobos[q],r:App.selectedRatings[q],p1r:reputationscore,c:App.account})
						window.alert("updated"+p)
					}


				
				}
				//console.log(reputationscores)
				//await App.robot.addRatings(reputationscores,App.selectedRobos,{from:App.account});
				form.submit();
			}			
			else{
				window.alert("Select atleast one Robot");
			}
			//form.submit();	
	  },
	//   selectRobotChange :async ()=>{
	// 	var i=parseInt($("#selectRobotID").val());
	// 	$("#displayallrobots").empty();
	// 	var roboinfo=await App.robot.robotgeneralinformations(i);
	
	// 	var seller=await App.robot.robotowners(parseInt(i));
	// 	var roborating=await App.robot.roboratings(i);
	// 	var avgRating=parseFloat(roborating[2]);
	// 	var totalCustomer=parseInt(roborating[1])
	// 	if(totalCustomer!=0){
	// 		avgRating=avgRating/totalCustomer;
	// 	}
	// 	var str="<tr><td>"+`<input type="text" class="form-control" value='`+roboinfo[0]+`'  name="robo_id" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[3]+`'  name="robo_name" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[1]+`'  name="robo_purpose" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+avgRating.toString()+`'  name="robo_score" readonly>`+"</td><td>";
	// 	str=str+`<select class="form-control" id='selectrobo`+i+`' name="robo_selectrating"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td><td>`;
	// 	//hidden fields
	// 	str=str+`<input type="hidden"  value='`+seller+`'  name="robo_seller">`+"</td><td>"+`<input type="hidden"  value='`+App.account+`'  name="robo_customer">`+"</td></tr>";
	// 	$("#displayallrobots").append(str);	
	// 	var str1;
	// 	var rated=await App.robot.ratedotnot(App.account,i);
	// 	if(rated=="1"){
	// 		str1=`<tr><td colspan="5" align="center"><input type="button" class="btn btn-danger disabled" name="save" value="Save" disabled /></td></tr>`	
	// 	}
	// 	else{
	// 		str1=`<tr><td colspan="5" align="center"><input type="submit" class="btn btn-primary" name="save" value="Save"  /></td></tr>`
	// 	}
	// 	$("#displayallrobots").append(str1);	
	// 	$("#displayallrobots").show();
	//   },
	  showRatingRobotPage :async ()=>{
		var count=await App.robot.totalRobots();
		
		var totalCustomer=await App.robot.customerCount();
		$("#displayallrobots").hide();
		$("#displayallrobots").empty();
			
		//retrieve rating from dtabase
		var interests=await App.robot.getinterests(App.account);	
		console.log(interests)  ;


		for(var i=1;i<=count;i++) {
			var interestfound=0;			
			var roboinfo=await App.robot.robotgeneralinformations(i);
			for(var z=0;z<interests.length;z++){
				if((roboinfo[1]==interests[z] )||(roboinfo[2]==interests[z]) ){
					interestfound=1;
					break;
				}
			}
			if(interestfound==1){
				var seller=await App.robot.robotowners(parseInt(i));			
				var roborating=await App.robot.roboratings(i);
				var avgRating=parseFloat(roborating[2]);
				avgRating=avgRating/100;
				var totalCustomer=parseInt(roborating[1])
				// if(totalCustomer!=0){
				// 	avgRating=avgRating/100;
				// }
				var str="";
				//hidden fields
				var purpose='';
				multipurpose=false;
				vardropdownstr='';
				if(roboinfo[2]!=""){
					purpose=roboinfo[1]+","+roboinfo[2];
					multipurpose=true;
					vardropdownstr=`<select class="form-control" id='selectrobopurpose`+i+`' name="robo_purpose[]" ><option value="0">Overall</option><option value="1">`+roboinfo[1]+`</option><option value="2">`+roboinfo[2]+`</option></select>`;
					console.log(vardropdownstr);
				}
				else{
					purpose=roboinfo[1]	;
					multipurpose=false;
					vardropdownstr=`<input type="text" class="form-control" value='`+purpose+`'  name="robo_purpose[]" readonly>`;
				}
				var rated=await App.robot.ratedotnot(App.account,i);
				if(rated=="1"){
					str="<tr><td>"+`<input type="checkbox" id='selectedRobo`+i+`' name="robo_checkBox[]" disabled>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[0]+`'  name="robo_id[]" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[3]+`'  name="robo_name[]" readonly>`+"</td><td>"+vardropdownstr+"</td><td>"+`<input type="text" class="form-control" value='`+avgRating.toString()+`'  name="robo_score[]" readonly>`+"</td><td>";
				
					str=str+`<select class="form-control" id='selectrobo`+i+`' name="robo_selectrating[]" disabled><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td><td>`;
				}
				else{
					str="<tr><td>"+`<input type="checkbox" id='selectedRobo`+i+`' name="robo_checkBox[]" >`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[0]+`'  name="robo_id[]" readonly>`+"</td><td>"+`<input type="text" class="form-control" value='`+roboinfo[3]+`'  name="robo_name[]" readonly>`+"</td><td>"+vardropdownstr+"</td><td>"+`<input type="text" class="form-control" value='`+avgRating.toString()+`'  name="robo_score[]" readonly>`+"</td><td>";
				
					str=str+`<select class="form-control" id='selectrobo`+i+`' name="robo_selectrating[]"><option value="1">1</option><option value="2">2</option><option value="3">3</option><option value="4">4</option><option value="5">5</option></select></td><td>`;
				}
				str=str+`<input type="hidden"  value='`+seller+`'  name="robo_seller[]">`+"</td><td>"+`<input type="hidden"  value='`+App.account+`'  name="robo_customer[]">`+"</td></tr>";
				$("#displayallrobots").append(str);	
			}			
		}
		var str1;
		$("#displayallrobots").show();
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
		var count=await App.robot.ontologyCount();
		for(var i=1;i<=count;i++) {
			var ontology=await App.robot.ontology(i);
			var addr=ontology[1];	
			var percentage=	parseInt(ontology[2])*100/parseInt(totalsupplier);	
			var str="<tr><td>"+addr+"</td><td>"+ontology[3]+"</td><td>"+ontology[6]+"</td><td>"+ontology[2]+"</td><td>"+percentage+"%</td></tr>";
			$("#displayallproposals").append(str);		
		}

		$("#displayallproposalstoadmin").empty();
		var count1=await App.robot.ontologiestoadminCount();
		for(var i=1;i<=count1;i++) {
			var ontology1=await App.robot.ontologiestoadmin(i);
			var addr=ontology1[1];		
			var stdteid='stdate'+i.toString();
			var enddateid='eddate'+i.toString();

			var str="<tr><td>"+addr+"</td><td>"+ontology1[3]+"</td><td>"+ontology1[4]+
			`</td><td><input type='date' class='form-control' id='`+stdteid+`'></td>`+
			`<td><input type='date' class='form-control' id='`+enddateid+`'></td>`+
			`<td><button type='button' class='btn btn-primary' onclick="App.sendProposaltoAll('`+i+`');">SEND</button></td><td><button type='button' class='btn btn-primary' onclick="App.deleteProposaltoAll('`+i+`');">REJECT</button></td></tr>`;
			//console.log(str)
			if(ontology1[2]==0){
				$("#displayallproposalstoadmin").append(str);		
			}
			
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
	  sendProposaltoAll :async (i)=>{
		  var stdateid="#stdate"+i.toString();
		  var eddateid="#eddate"+i.toString();
		  var startdate=$(stdateid).val();
		  var enddate=$(eddateid).val();		 
		await App.robot.updateOntology(parseInt(i),startdate,enddate,{from:App.account});
		window.alert("Sent to all Suplliers");
		await App.render();
	  },
	  deleteProposaltoAll: async (i)=>{
		await App.robot.deleteOntology(parseInt(i),{from:App.account});
		window.alert("Proposal Rejected");
		await App.render();
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
		var count=await App.robot.ontologyCount();
		$("#aproveorrejectlist").empty();
		for(var i=1;i<=count;i++) {
			var ontology=await App.robot.ontology(i);
			//var ontologyofadmin=await App.robot.ontologiestoadmin(i);
			var addr=ontology[1];

			//show all others proposals
			if(addr.toUpperCase().localeCompare(App.account.toUpperCase())!=0){
				
				var desc=ontology[3];
				var justi=ontology[4];
				var stdate=ontology[5];
				var enddate=ontology[6];
				//if that supplier proposed request allproposals
				//var checkalreadyapproved=await App.robot.checkProposalAlreadyDone(parseInt(i));
				var allproposals=await App.robot.allproposals(App.account,parseInt(i))				
					var today=new Date();
					var edate=new Date(enddate);
					// console.log(today);
					// console.log(edate);
					var str;
					if((parseInt(allproposals)==0)&&(today<=edate)){
						str=`<tr><td>`+desc+`<td>`+justi+`</td>`+`<td>`+stdate+`</td>`+`<td>`+enddate+`</td>`+`</td><td><button type='button' class='btn btn-primary' onclick="App.acceptProposal('`+i+`');">Accept</button></td><td><button type='button' class='btn btn-primary' onclick="App.rejectProposal('`+i+`');">Reject</button></td></tr>`;
					}				
					 else{
						str=`<tr><td>`+desc+`<td>`+justi+`</td>`+`<td>`+stdate+`</td>`+`<td>`+enddate+`</td>`+`</td><td><button type='button' class='btn btn-danger disabled' disabled ">Accept</button></td><td><button type='button' class='btn btn-danger disabled' disabled >Reject</button></td></tr>`;
					 }
					$("#aproveorrejectlist").append(str);
				
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


			var oneortwo=$("#singleorMultiple").val();
			var singleormulti="";
			if(oneortwo=="1"){
				singleormulti="Single";
			}
			else{
				singleormulti="Multi";
			}

			var purpose1=$("#purpose1").val();
			var purpose2=$("#purpose2").val();
			var keyword1=$("#typeuser_purpose1").val()+" "+$("#serviceDesc_purpose1").val()+" "+$("#location_purpose1").val()+" "+$("#environment_purpose1").val()+" "+$("#time_purpose1").val();
			var keyword2=$("#typeuser_purpose2").val()+" "+$("#serviceDesc_purpose2").val()+" "+$("#location_purpose2").val()+" "+$("#environment_purpose2").val()+" "+$("#time_purpose2").val();


			var robotname=$("#robotname").val();
			var subjectivedata=[];
			var objectivedata=[];
			var r2=[];
			for(var q=0;q<50;q++){
				var id="#subjective"+q.toString();	
				if( $(id).length ){
					var d=$(id).val();										
					if(d){
						subjectivedata.push(parseInt(parseFloat(d)*100));
						r2.push(parseFloat(d).toFixed(2));
					}	
				} 			
			}
			//console.log(r2);
			for(var q=0;q<50;q++){
				var id="#objective"+q.toString();	
				if( $(id).length ){
					var d=$(id).val();
					if(d){
						objectivedata.push(parseInt(parseFloat(d)*100));
						r2.push(parseFloat(d).toFixed(2));
					}
				} 			
			}
			console.log(subjectivedata);
			console.log(objectivedata);
			//calculate Predicted Score for this Robot
			var maxsimilarity=0;
			var maxsimilarityrobotid=0;
			var count=await App.robot.totalRobots(); //Finding robots with same Pupose	
					
				for(var i=1;i<=count;i++) {					
					var robot=await App.robot.robotgeneralinformations(i);
					var pupose=robot[1];
					if(pupose.toUpperCase().localeCompare(purpose1.toUpperCase())==0){
						//Same pupose Robot found
						//Going to calculate similarity
						var s=await App.robot.getSbjectiveData(parseInt(i));
						var o=await App.robot.getObjectiveData(parseInt(i));
						var r1=[];
						for(var z=0;z<s.length;z++){
							var x=parseFloat(s[z]/100).toFixed(2);
							r1.push(x);
						}
						for(var z=0;z<o.length;z++){
							var x=parseFloat(o[z]/100).toFixed(2);
							r1.push(x);
						}
						console.log("Finding Similarity ");
						console.log("r1=");
						console.log(r1);
						console.log("r2=");
						console.log(r2);
						var similarity=await $.post("../docs/ScorePredictionFunction.php",{ r1: r1,r2:r2} );
						console.log("Similarity recieved="+similarity)
						if(similarity>maxsimilarity){
							maxsimilarityrobotid=i;
							maxsimilarity=similarity;
						}
						console.log("maxsimilarity score="+maxsimilarity);						
					}
				}
				//Get  the score of Max similarity Robot
				var score=0;
				var sscore=0;
				if(maxsimilarityrobotid>0){
					var score1=await App.robot.roboratings(parseInt(maxsimilarityrobotid));
					score=score1[2];					
					sscore=parseFloat(parseInt(score)/100).toFixed(2);					
				}
				
				var predictedscore=	parseFloat(maxsimilarity*sscore/100).toFixed(2);				
				var pscore=parseInt(predictedscore*100);
				window.alert("Prediction score is" +predictedscore);
				
				//Predicted score completed

				//Insert new robot without rating into DATABASE	
				var count1=await App.robot.totalRobots();
				
				var id1=parseInt(count1)+1;	
				
				//var str="('" +id1.toString()+ "' )";
				
				
				var str="('" +id1.toString()+ "', '"+robotname + "', '" + singleormulti + "', '" + App.account + "', '" + "New Robot" + "', '" +predictedscore + "', '"+purpose1 + "', '" + purpose2 + "', '" + keyword1 + "', '" + keyword2 + "',0,0,0,0,0)";
				console.log(str)

				//window.alert(str)
				var s=await $.post("../docs/insertNewRoboDB.php",{ str: str} );
				console.log(s)

			var manmachineinterface=" ";
			var programmingflexibility=" ";
			var stability=" ";
			var compliance=" ";

			var processor=" ";
			var typeofrobot=" ";

			var purchasecose=" ";
			var deliverytime=" ";
			
			await App.robot.addNewRobot(purpose1,purpose2,robotname,subjectivedata,objectivedata,pscore,{from: App.account});
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
		$(".purposetworow").show();
	}
	else{
		$(".purposetworow").hide();
	}	
});
 
	