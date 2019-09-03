'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import {DateFormat, MoneyFormat} from '../../common_components/helper/formatter';
import {getDashboardMenu} from '../../common_components/helper/user_session'; 
import Loading from '../../common_components/loading';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import {DatePicker} from '../../common_components/date_picker';

class Autodebit extends React.Component {
	constructor(props){
		super(props);

		var default_agent_code = localStorage.getItem('agent_code');
		this.getData = this.getData.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);

		this.state = {
			data: null,
			param: {
				policy_no:"",
				agent_name:"",
				agent_notice: "",
				display_group:"true",
				policy_holder_name:"",
				agent_code:"",
				premium:"",
				page:"1",
				offset: 20
			},
			total : 0,
			current : 0,
			visiblePages : 3,
			mgtRole : [1,2,3,4],
			takumiRole : [11,12,13],
			dashboardRole: [1,2,3,4,5,6,7,8,9,11,12,13],
			dashboardMaps : {
				9:'fc',
				8:'sm',
				7:'dm',
				6:'rm',
				5:'rd'
			}
		}

		//this.handlePageChanged = this.handlePageChanged.bind(this);
        this.openMenu = this.openMenu.bind(this);

	}

	componentDidMount(){
		this.getData();
	}

	getData(){
		// this.state.param.page = '1';

		// $('#loading').modal('show');
		// $.ajax({
        //     url: '',
        //     headers: {
		//         'Authorization':'JWT '+sessionStorage.getItem('token')
		//     },
        //     type: 'POST',
        //     success: (response) => {
        //       $('#loading').modal('hide');
		// 	  var num_data = [];
		// 	 var total_page = 0;
		// 	  this.setState({
        //       });
        //     },
        //     error: (err, response) => {
        //       $('#loading').modal('hide');
		// 	  if(err.responseJSON){
		// 		  alert('Session expired, please login');
		// 	  	  window.location.href="/";
        //       }else{
		// 		  alert('Please check your connection');
		// 	  }

        //     }
        // });
	}

	handleChangeData(event){
		let data_array = {};
		for (let i in this.state.param) {
			if(i==event.target.name){
				if(event.target.name == 'display_group'){									
					data_array[i] = event.target.value == 'false' ? 'true' : 'false'
				}else{
					data_array[i] = event.target.value
				}
			}
			else{
				data_array[i] = this.state.param[i]
			}
		}
		this.setState({
			param : data_array
		});
	}

	// handlePageChanged(newPage){
		
	// 	this.state.param.page = newPage;
	// 	$('#loading').modal('show');
	// 	$.ajax({
	// 		url: '',
	// 		headers: {
	// 			'Authorization':'JWT '+sessionStorage.getItem('token')
	// 		},
	// 		type: 'POST',
	// 		data: this.state.param,
	// 		success: (response) => {
	// 		$('#loading').modal('hide');
	// 		var num_data = [];
	// 		var total_page = 0;
	// 			this.setState({
	// 			});
	// 		},
	// 		error: (err, response) => {
	// 		$('#loading').modal('hide');
	// 		if(err.responseJSON){
	// 		}

	// 		}
	// 	});

	// }

    openMenu(){
        $(".sidebar,.sidebar4").toggleClass("active");
    }
	
   showRight = (event) => {
	   	event.preventDefault();
		this.refs.right.show();
	}

	 changeSidebar(e){
        this.setState({
            visibleSidebar: e
        });
    }
	
	logout(e){
		$.ajax({
			url: api_route.logout,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token'),//logout
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			type: 'POST',
			// dataType: "binary",
			data: {},
			// contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			success: (response) => {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
				var url = window.location.href.split("#");
				window.location.href = url[0];
				
			},
			error: (xhr, status) => {
			  $('#loading').modal('hide');
			  if(xhr.status == '401') {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
				var url = window.location.href.split("#");
				window.location.href = url[0];
			  }else{
				alert("something wrong");
  
			  }
			}
		});
	}


	show= (event) =>{
		if(event.target.id == "buttShow" || event.target.id == "buttShow1" || event.target.id == "buttShow2"){
		console.log(event.target.id);			
            $('#wrapShadow').css('display','unset');
			return document.getElementById("mySidenav").style.width = "250px";
			}
		else {
			console.log(event.target.id);			
            $('#wrapShadow').css('display','none');
			return document.getElementById("mySidenav").style.width = "0px";             
		}
	}

	render(){
		let data = this.state.data;
		let policies = [];

		

		// if(data && data.policy_list.length > 0)
		// {

			/*let offs = this.state.param.offset;
			let page = this.state.param.page; 
			let num = (page - 1) * offs;

			$.map(data.policy_list, (value, index) => {
				
				

					let url = "#/autodebit"+value.id;
					let row = null;
					let insured = "";
					$.map(value.lifeassured_set,(value,index) => {
						insured += value.person.name + "\n";
					})

					num += 1;

					var phone_number = '';

					try{
						phone_number = value.policy_holder.clientphone_set[0].number;
					}catch(e){

					}

					row = <tr key={index}>
							<td>{num}</td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
					policies.push(row);
				

			});*/
		// }
		// else {
			let row = <tr>
						<td colSpan="13" style={{'text-align':'center'}}>No data.</td>
					</tr>
            policies.push(row);
		//}

		let checked = this.state.param.display_group == "true" ? "checked" : "";

		// let paging = [];

		// let total = 0;
		// let current = 0;

		// try{
		// 	current = parseInt(this.state.param.page);
		// }catch(e){
		// 	current = 0;
		// }

		// try{
		// 	total = parseInt(this.state.total);
		// }catch(e){
		// 	total = 0;
		// }

		// let start = (current - 5) < 0 ? 0 : (current-5);
		// let end = (current + 5) > total ? total : (current+5);

		// if(total > 0){
		// 	paging.push(
		// 		<li><a onClick={this.handlePageChanged.bind(this, (current - 1) < 0 ? 1 : (current - 1))}>Prev</a></li>
		// 	);
		// 	for(var i = start; i < end; i++){
		// 		if(i == (current-1)){
		// 			paging.push(
		// 				<li className="active"><a onClick={this.handlePageChanged.bind(this, (i+1))}>{(i+1)}</a></li>
		// 			);
		// 		}else{
		// 			paging.push(
		// 				<li><a onClick={this.handlePageChanged.bind(this, (i+1))}>{(i+1)}</a></li>
		// 			);
		// 		}
		// 	}
		// 	paging.push(
		// 		<li><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1)) }>Next</a></li>
		// 	);
		// }

		let username = localStorage.getItem('name');
		let lastLogin = localStorage.getItem('last_login');
		let lastUpdate = localStorage.getItem('last_update');

		let sidemenu = getDashboardMenu();
		return (
			<div>
		<div className="wrap2">
			<div id="wrapShadow"></div>
			<SubmitModal />
    		<TopMenuNewBusinessDetail title="Auto Debit" opsi="inquiry"  onClick={this.showRight} />
			
			<div className="main-wrapper">
				<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>
						<ol className="breadcrumb" style={{marginBottom: '5px', marginTop:'55px'}}>
							<li className="active">Autodebit Saving Account Failed Information</li>
						</ol>
					</div>
					<div className="col-xs-2" style={{paddingLeft : 5}}>
						<ol className="breadcrumb" onClick={this.openMenu} style={{marginBottom: '5px', marginTop:'55px', cursor : 'pointer'}}>
							<li className="active">
								<span className="menuIconSidebar">
									<i className="fa fa-bars"></i>
								</span>
							</li>
						</ol>
					</div>
				</div>
				<div className="main twoColumnMain">

					<LeftMenuInquiry active="4"/>

					<div className="main-content">
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-6">
									<div className="form-horizontal">

										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy No</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="policy_holder_name" name="policy_holder_name" value="" onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Name</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="agent_name" name="agent_name" value="" onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Notice</label>
											</div>

											<div className="col-sm-6">
													<select className="form-control" id="agent_status" name="agent_status" onChange={this.handleChangeData} >
														<option value="">All Status</option>
														<option value="1">Active</option>
														<option value="2">Terminate</option>
														<option value="3">Resign</option>
														<option value="4">Others</option>
													</select>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Display Group?</label>
											</div>

											<div className="col-md-1 text-left">
											  <div className="checkbox">
												<label>
												  <input type="checkbox" id="display_group" className="form-control" name="display_group" value="" onChange={this.handleChangeData} checked={checked} />
												</label>
											  </div>
											</div>
										</div>

									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-3">
												<label>Policy Holder Name</label>
											</div>

											<div className="col-sm-7">
												<input type="text" className="form-control" id="insured" name="insured" value="" onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-3">
												<label>Agent Code</label>
											</div>

											<div className="col-sm-7">
												<input type="text" className="form-control" id="agent_code" name="agent_code" value="" onChange={this.handleChangeData} />
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-3">
												<label>Premium</label>
											</div>

											<div className="col-sm-7">
													<select className="form-control" id="agent_premium" name="agent_premium" onChange={this.handleChangeData} >
														<option value=""></option>
														<option value="1">Premium</option>
													</select>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-12">
								<div className="clearfix h25"></div>

								<div className="col-sm-3 pull-right">
									<button className="btn btn-primary btn-block" type="button" onClick={() => this.getData()}><i className="fa fa-search"></i> Search</button>
								</div>
							</div>
						</div>

						<div className="clearfix h25"></div>

						<hr />

						<div className="row">
							<div className="col-sm-12">
								<div>
									<nav aria-label="Page navigation">
										<ul className="pagination">
											{/*paging*/}
										</ul>
									</nav>
								</div>
								<div className="scroll-h" style={{'overflow-x':'auto'}}>
									
									<table className="table table-bordered table-striped table-hover text-center table-box">
										<thead>
											<tr>
												<th className="header_table valign-middle text-center">No</th>
												<th className="header_table valign-middle text-center">Policy No</th>
												<th className="header_table valign-middle text-center">Policy Status</th>
												<th className="header_table valign-middle text-center">Policy Holder</th>
												<th className="header_table valign-middle text-center">Account No/Name</th>
												<th className="header_table valign-middle text-center" style={{'width' : '120px'}}>Policy Holder Phone No</th>
												<th className="header_table valign-middle text-center" style={{'width' : '120px'}}>Premium Due Date</th>
												<th className="header_table valign-middle text-center">Premium Amount</th>
												<th className="header_table valign-middle text-center">Premium Mode</th>
												<th className="header_table valign-middle text-center">Status Performance</th>
												<th className="header_table valign-middle text-center">Audebit</th>
												<th className="header_table valign-middle text-center">Agent Code</th>
												<th className="header_table valign-middle text-center" style={{'width' : '120px'}}>Agent Name</th>
											</tr>
										</thead>
										<tbody>
											{policies}
										</tbody>
									</table>
									
								</div>
								<div>
									<nav aria-label="Page navigation">
										<ul className="pagination">
											{/*paging*/}
										</ul>
									</nav>
								</div>
								
							</div>
						</div>
						
						

						<div className="clearfix"></div>

					</div>

					<div className="clearfix"></div>
				</div>
			</div>
			<Loading />
			<Footer />
		    	<SubmitModal />
		    	<FeatureModal />

		</div>
		</div>
		);
	}
}

export default Autodebit;
