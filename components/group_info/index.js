'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import Pagination from 'react-js-pagination';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import {getMenu} from '../../common_components/helper/user_session';
import {DatePicker, MonthPicker} from '../../common_components/date_picker';
import {COMM_TYPE, GET_COMM_NAME, MIME_TYPE} from '../../common_components/helper/constant';
import {DateFormat, MoneyFormat, DateFormatYMD} from '../../common_components/helper/formatter';
import {gethataSource} from '../../common_components/resources/datasource';
import {load, AjaxDownloadFile} from '../../common_components/helper/url_helper';
import GroupInfoModal from '../../common_components/modal/group_info_modal';
import ProfileModal from '../../common_components/modal/profile_modal';

import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';

var FileSaver = require('file-saver');

class group_info extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			summaryData: null,
			profileData:null,
			profileName:null,
			groupInfoList: null,
			summaryProduction : null,
			summaryProductionCode : '0000001',
			param : {
				agent_name : null,
				agent_code : null,
				level : null,
				group : 'false',
				agent_status : null,	
				page : 1,
				offset : 20			
			},
			total : 0,
			current : 0,
			visiblePages : 3,
			groupDropdown : false
		}
	}

	handlePageChanged(newPage){
		
		this.state.param.page = newPage;
		$('#loading').modal('show');
		// debugger;
		$.ajax({
			url: api_route.agent_group_info,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			var num_data = response || [];
			var total_page = response[(response.length-1)].total_page;
			
				this.setState({
					groupInfoList : response,
					total : total_page
				});
			},
			error: (err, response) => {
			$('#loading').modal('hide');
			// alert('Session expired, please login');
			// window.location.href="/";
			if(err.responseJSON){
				window.location.href = window.location.href.split('#')[0] + '#/';
			}

			}
		});

	}

	changeHandler = (changes) => {

		let data_array = this.state.param;
		for(let n in this.state.param){
			if(n==changes.target.name){
				data_array[n] = changes.target.value
			}
			else{
				data_array[n] = this.state.param[n];
			}

			if(changes.target.name == 'group'){
				this.state.groupInfoList = null;
				if(changes.target.value == 'true'){
					this.state.param.level = 5;
					this.state.groupDropdown = true;
				} else {
					this.state.groupDropdown = false;
				}
			}

		}
		// console.log(data_array);

		this.setState({
			param : data_array
		});


	}

	componenthidMount = () => {
		this.loadGroupInfo();
	}

	loadProfileInfo = (code, name, r) => {

		if(r){
			r.preventDefault();
		}

		$.ajax({
            url: api_route.profile,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: { agent:code },
            type: 'POST',
            success: (response) => {
            	console.log(response);              	
             	 this.setState({
					profileData : response,
					profileName : name
	            });
            },
            error: (err, response) => {
              
              if(err.responseJSON){
				  alert(err.responseJSON);
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }

            }
        });

	}

	loadGroupInfo = (response) => {
		// // debugger;
		if(response){
			response.preventDefault();
		}

		$('.search-group-info').show();
		load(api_route.agent_group_info
		, this.state.param
		, (response) => {
			var num_data = response || [];
			var total_page = response[(response.length-1)].total_page;
			$('.search-group-info').hide();
			this.setState({
				groupInfoList : response,
				total : total_page
			});
		}, (response) => {
			$('.search-group-info').hide();
			if(response && response.detail){
				alert(response.detail);
				window.location.href="/#";
			}
		});


	}

	clickSummary = (item, response) => {
		if(response){
			response.preventDefault();
		}

		// this.state.summaryProductionCode = item;

		// debugger;
		$('.load-group-info').show();
            $('.content-modal-group').hide();
		load(api_route.agentDashboardv2
		, { 'agent' : item }
		, (response) => {
           
			this.setState({
				summaryData : response,
                summaryProductionCode : item
			});
		}, (response) => {
            $('.load-group-info').hide();
			if(response && response.detail){
				alert(response.detail);
				window.location.href="/#";
			}
		});
		

	}


	render(){
		
		/**
		 * Load Menu Based on Its Module
		 */
		let menu = getMenu('Group Info');
		
		var groupInfo = this.state.groupInfoList;

		let groupInfoTr = [];

		// Name Agent, Code Agent, Level Agent, Status Agent, Direct Leader Agent, Direct Leader Code, Direct Leader Level, Direct Leader Status, Summary Production

		if(groupInfo != null && groupInfo.length > 0){

			groupInfo.map((response, index) => {
				
				if(this.state.param.group && this.state.param.group == 'false') {
					groupInfoTr.push(
						<tr>
							<td className="ct_table"><a data-toggle="modal" data-target="#group-info-modal" onClick={this.clickSummary.bind(this, response.code)}>Summary Production</a></td>
							<td className="ct_table">{response.name}</td>
							<td className="ct_table"><a data-toggle="modal" data-target="#profile-info-modal" onClick={this.loadProfileInfo.bind(this, response.code, response.name)}>{response.code}</a></td>
							<td className="ct_table">{response.level}</td>
							<td className="ct_table">{response.status}</td>
							<td className="ct_table">{response.leader_name}</td>
							<td className="ct_table">{response.leader_code}</td>
							<td className="ct_table">{response.leader_level}</td>
							<td className="ct_table">{response.leader_status}</td>
						</tr>
					);
				}else{
					groupInfoTr.push(
						<tr>
							<td className="ct_table"><a data-toggle="modal" data-target="#group-info-modal" onClick={this.clickSummary.bind(this, response.code)}>Summary Production</a></td>
							<td className="ct_table">{response.name}</td>
							<td className="ct_table">{response.code}</td>
							<td className="ct_table">{response.level}</td>
							<td className="ct_table">{response.status}</td>
							<td className="ct_table">{response.leader_name}</td>
							<td className="ct_table">{response.leader_code}</td>
							<td className="ct_table">{response.leader_level}</td>
							<td className="ct_table">{response.leader_status}</td>
						</tr>
					);
				}

			});

			groupInfoTr.pop(); // hapus index terakhir (total page)

			//this.state.total = groupInfo[(groupInfo.length-1)].total_page; // tampung total page
		}else{
			//this.state.total = 0;
			groupInfoTr.push(
				<tr>
					<td colSpan={9} className="text-center">Empty</td>
				</tr>
			);
		}

		//let paging = [];

		// for ($x = 1;  $x <= ($totalpages); $x++) {
		// // if it's a valid page number...
		// if (($x > 0) && ($x <= $totalpages)) {
		// 	//limit for each 5 pages
		// 	if ($x % 5 == 0) { 
		// 	// if we're on current page...
		// 		if ($x == $currentpage) {
		// 			// 'highlight' it but don't make a link
		// 			echo " [<b>$x</b>] ";
		// 		// if not current page...
		// 		} else {
		// 			// make it a link
		// 			echo " <a href='{$_SERVER['PHP_SELF']}?currentpage=$x'>$x</a> ";
		// 		} // end else
		// 	}
		// } // end if 
		// }

		let paging = [];

		let total = 0;
		let current = 0;

		try{
			current = parseInt(this.state.param.page);
		}catch(e){
			current = 0;
		}

		try{
			total = parseInt(this.state.total);
		}catch(e){
			total = 0;
		}

		let start = (current - 5) < 0 ? 0 : (current-5);
		let end = (current + 5) > total ? total : (current+5);

		if(total > 0){
			paging.push(
				<li><a onClick={this.handlePageChanged.bind(this, (current - 1) <= 0 ? 1 : (current - 1))}>Prev</a></li>
			);
			for(var i = start; i < end; i++){
				if(i == (current-1)){
					paging.push(
						<li className="active"><a onClick={this.handlePageChanged.bind(this, (i+1))}>{(i+1)}</a></li>
					);
				}else{
					paging.push(
						<li><a onClick={this.handlePageChanged.bind(this, (i+1))}>{(i+1)}</a></li>
					);
				}
			}
			paging.push(
				<li><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1)) }>Next</a></li>
			);
		}

		let levelDD = [];
		if(this.state.groupDropdown == false){
			levelDD.push(
				<select className="form-control" id="level" name="level" onChange={this.changeHandler} >
					<option value="">All Level</option>
					<option value="5">RD</option>
					<option value="6">RMB</option>
					<option value="7">AMB</option>
					<option value="8">RMP</option>
					<option value="14">AMP</option>
					<option value="9">FC</option>
					{/*<option value="5">RD</option>
					<option value="6">RM</option>
					<option value="7">DM</option>
					<option value="8">SM</option>
					<option value="9">FC</option>*/}
				</select>
			);
		} else {
			levelDD.push(
				<select className="form-control" id="level" name="level" onChange={this.changeHandler} >
					<option value="5">RD</option>
					<option value="6">RMB</option>
					<option value="7">AMB</option>
					<option value="8">RMP</option>
					<option value="14">AMP</option>
					<option value="9">FC</option>
				</select>
			);
		}
		return (
			<div className="wrap2">
				<SubmitModal />
				<FeatureModal />
	            {menu}

				<div className="main-wrapper">
					<ol className="breadcrumb" style={{marginBottom: '5px'}}>
						 <li className="active">Group Info</li>
					</ol>

					<div className="main">

						<div className="panel panel-default boxShadow">
							<div className="panel-heading textShadow headPanel">
								<h1 className="panel-title"><i className="fa fa-group"></i> Group Info</h1>
							</div>
							<div className="panel-body">
								<div className="col-sm-12">
										<form className="form-horizontal">
										
											{/* // agent_name, agent_code, display, agent_level, agent_status */}

											<div className="row">
												<div className="col-sm-6">
													<div className="form-group">
															<div className="col-sm-6">
																<label>Agent Name</label>
															</div>
															<div className="col-sm-6">
																<input type="text" className="form-control" id="agent_name" name="agent_name" onChange={this.changeHandler} />
															</div>
														</div>

														<div className="form-group">
															<div className="col-sm-6">
																<label>Agent Code</label>
															</div>
															<div className="col-sm-6">
																<input type="text" className="form-control" id="agent_code" name="agent_code" onChange={this.changeHandler} />
															</div>
														</div>

														<div className="form-group">
															<div className="col-sm-6">
																<label>Group / Direct</label>
															</div>
															<div className="col-sm-6">
																<select className="form-control" id="cbgroup" name="group" onChange={this.changeHandler}>
																	<option value="false">Direct</option>
																	<option value="true">Group</option>
																</select>
															</div>
														</div>

												</div>
												<div className="col-sm-6">
													
													<div className="form-group">
														<div className="col-sm-6">
															<label>Agent Level</label>
														</div>
														<div className="col-sm-6">
															{levelDD}
														</div>
													</div>

													<div className="form-group">
														<div className="col-sm-6">
															<label>Agent Status</label>
														</div>
														<div className="col-sm-6">
															<select className="form-control" id="agent_status" name="agent_status" onChange={this.changeHandler} >
																<option value="">All Status</option>
																<option value="1">Active</option>
																<option value="2">Terminate</option>
																<option value="3">Resign</option>
															</select>
														</div>
													</div>
												</div>
											</div>

											<div className="row">
												<div className="col-xs-12 text-right">
													<button className="btn btn-primary" onClick={this.loadGroupInfo}><i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw search-group-info"></i> Search Group Info</button>
												</div>
											</div>

											<div className="row">
												<div className="col-xs-12">&nbsp;</div>
											</div>

											<div className="row">
												<div className="col-xs-12">
													<div className="scroll-h" style={{'overflow-x':'auto'}}>
														<div>
															<nav aria-label="Page navigation">
																<ul className="pagination">
																	{paging}
																</ul>
															</nav>
														</div>
														<table className="table table-striped table bordered table-hover table-box">
															<thead>
																<tr>
																	<th className="header_table">Summary Production</th>
																	<th className="header_table">Name Agent</th>
																	<th className="header_table">Code Agent</th>
																	<th className="header_table">Level Agent</th>
																	<th className="header_table">Status Agent</th>
																	<th className="header_table">Direct Leader Agent</th>
																	<th className="header_table">Direct Leader Code</th>
																	<th className="header_table">Direct Leader Level</th>
																	<th className="header_table">Direct Leader Status</th>
																</tr>
															</thead>
															<tbody>
																{groupInfoTr}
															</tbody>
														</table>
														<div>
															<nav aria-label="Page navigation">
																<ul className="pagination">
																	{paging}
																</ul>
															</nav>
														</div>
													</div>
												</div>
											</div>

										</form>
									</div>
							</div>
						</div>

						

					</div>

				</div>

				<GroupInfoModal summaryData={this.state.summaryData} productionCode={this.state.summaryProductionCode} />
				<ProfileModal profileData={this.state.profileData} profileName={this.state.profileName} />

				<Footer />

			</div>
		);
	}
}

export default group_info;
