'use strict'

import React from 'react';
// import $ from 'jQuery';

import api_route from '../../common_components/api_route';
import Footer from '../../common_components/footer';
import TopMenu from '../../common_components/menu_v2/menu_comission';
import CekAuth from '../../common_components/helper/cek_auth';

import ModalMessage from '../../common_components/modal/modal_message';
import SubmitModal from '../../common_components/modal/submit_modal';

import {getMenu} from '../../common_components/helper/user_session';
import FeatureModal from '../../common_components/modal/feature_modal';

const month = [
	'', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

class comission_slip_production extends React.Component {
	constructor(props){
		super(props);
		CekAuth();
		this.state = {
			data: {'commission_statement_url': null},
			month: '',
			year: '',
			reportYear: '',
			reportType: '',
			user: {'name':localStorage.getItem('name'),'last_login':localStorage.getItem('last_login')},
			agent_id: localStorage.getItem('agent_id'),
			r_month : '',
			r_year : ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);
		this.handleReportDownload = this.handleReportDownload.bind(this);
		this.submitIssue = this.submitIssue.bind(this);
		this.clearForm = this.clearForm.bind(this);
	}

	componentDidMount(){

		// // debugger;

		var d = new Date();
		var current_month = d.getMonth();
		var current_year = d.getFullYear();

		current_month = (parseInt(current_month) < 10 ? '0' + parseInt(current_month) : current_month);

		$('#loading').modal('show');
		$.ajax({
            url: api_route.comissionSlip,
            headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data: {
				'year': current_year,
				'month': current_month
				// 'with':'name'
			},
            type: 'POST',
            success: (response) => {
				$('#loading').modal('hide');
            	console.log(response);
				$('#loading').modal('hide');
				this.setState({
					data:response,
					r_month: month[current_month],
					r_year: current_year,
					year: current_year,
					month: current_month
				});
            },
            error: (err, response) => {
				this.setState({data:response});
				$('#loading').modal('hide');
				if(err.responseJSON){
					window.location.href = window.location.href.split('#')[0] + '#/';
				}
            }
        });

	}

	handleSubmit(e){
		e.preventDefault();
		$('#loading').modal('show');
		$.ajax({
            url: api_route.comissionSlip,
            headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data: {
				'year':this.state.year,
				'month': (parseInt(this.state.month) < 10 ? '0' + parseInt(this.state.month) : this.state.month)
				// 'with': 'name'
			},
            type: 'POST',
            success: (response) => {
            	console.log(response);

				$('#loading').modal('hide');
				this.setState({
					data:response,
					r_month: month[this.state.month],
					r_year: this.state.year
				});
            },
            error: (err, response) => {
				this.setState({data:response});
				$('#loading').modal('hide');
				if(err.responseJSON){
					window.location.href = window.location.href.split('#')[0] + '#/';
				}
            }
        });
	}

	handleReportDownload(e){
		e.preventDefault();
		if(this.state.reportType == 'personal'){
			
			var url = api_route.production_report_agentpersonal + this.state.agent_id+ (this.state.reportYear != 2019 ? '?year='+this.state.reportYear : '')+(localStorage.role == '9' ? '' : (this.state.reportYear == 2019 ? '?' : '&')+'detail=1');
			window.location.href=url;
		}else{
			// if(localStorage.role == 5){
			// 	var url = api_route.production_report_rd + this.state.agent_id+ (this.state.reportYear != 2019 ? '?year='+this.state.reportYear+'&detail=1' : '?detail=1');
			// }else{
				var url = api_route.production_report_agent + this.state.agent_id+ (this.state.reportYear != 2019 ? '?year='+this.state.reportYear+'&detail=1' : '?detail=1');
			// }
			window.location.href=url;
		}
	}

	handleChangeMonth = (e) => {
		this.setState({month: e.target.value});
	}

	handleChangeYear = (e) => {
		this.setState({year: e.target.value});
	}

	handleChangeType = (e) => {
		this.setState({reportType: e.target.value});
	}

	handleChangeReportYear = (e) => {
		this.setState({reportYear: e.target.value});
	}


	submitIssue(){
		
		var email = $('[name=email]').val();
		var message = $('[name=message]').val();

		var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 

		$('.email-alert').hide();

		if(email.match(pattern))
		{

			$('.sendissue').show();

			$.ajax({
				url : api_route.issueAPI,
				headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				data: {
					'email':email,
					'message':message
				},
				type: 'POST',
				success: (response) => {
					
					$('.sendissue').hide();
					$('#submitfom').hide();
					$('#inform').show();

				},
				error: (err, response) => {
					$('.sendissue').hide();
					alert('Something wrong happened, please contact our Agency Portal Contact Support');
				}
			});

		}
		else
		{
			$('.email-alert').show();
		}

	}

	clearForm(){
		$('[name=email]').val('');
		$('[name=message]').val('');
	}

	render(){

		var prodReportButton = [];

		var prodReportLocation = [];

		var tablist_name = [];

		tablist_name.push(
			<ul className="nav nav-tabs" role="tablist">
				<li role="presentation" className="active"><a href="#comm_report" aria-controls="comm_report" role="tab" data-toggle="tab">Commission Report (SOA)</a></li>
				<li role="presentation"><a href="#prod_report_hier" aria-controls="prod_report_hier" role="tab" data-toggle="tab">Production Report by Hierarchy</a></li>				
			</ul>
		);

		if(localStorage && localStorage.getItem('userrole') == "5")
		{

			tablist_name = [];
			tablist_name.push(
				<ul className="nav nav-tabs" role="tablist">
					<li role="presentation" className="active"><a href="#comm_report" aria-controls="comm_report" role="tab" data-toggle="tab">Commission Report (SOA)</a></li>
					<li role="presentation"><a href="#prod_report_hier" aria-controls="prod_report_hier" role="tab" data-toggle="tab">Production Report by Hierarchy</a></li>
					{/* <li role="presentation"><a href="#prod_report_loc" aria-controls="prod_report_loc" role="tab" data-toggle="tab">Production Report by Location</a></li> */}
				</ul>
			);

			prodReportLocation.push(
				<div role="tabpanel" className="tab-pane" id="prod_report_loc">
					<div className="main boxShadow">
						<div className="row clearfix">&nbsp;</div>						
						<div className="row">		
							<div className="col-sm-12">
								<a href={this.state.data && api_route.production_report_management + '?uid=' + this.state.agent_id}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report By Location 2017</button>
								</a>
							</div>
						</div>
					</div>
				</div>
			);
		}
		
		if(localStorage && localStorage.role == "9")
		{

			prodReportButton.push(
				<div role="tabpanel" className="tab-pane active" id="prod_report_hier">
					<div className="main boxShadow">
						<div className="row clearfix">&nbsp;</div>
						<div className="row">
							<div className="col-sm-8">
								<form className="form-horizontal" onSubmit={this.handleReportDownload}>
									<div className="form-group">
										<label className="col-sm-2">Report Type</label>
										<div className="col-sm-3">
											<select name="report-type" className="form-control" onChange={this.handleChangeType}>
												<option selected={this.state.reportType == '' ? 'selected' : ''} value="">Choose Report Type</option>
												<option selected={this.state.reportType == 'personal' ? 'selected' : ''} value="personal">Production Report Personal</option>
											</select>
										</div>
										<label className="col-sm-2">Report Year</label>
										<div className="col-sm-3">
											<select name="report-type" className="form-control" onChange={this.handleChangeReportYear}>
												<option selected={this.state.reportYear == '' ? 'selected' : ''} value="">Choose Report Year</option>
												<option selected={this.state.reportYear == 2019 ? 'selected' : ''} value="2019">2019</option>
												<option selected={this.state.reportYear == 2018 ? 'selected' : ''} value="2018">2018</option>
												<option selected={this.state.reportYear == 2017 ? 'selected' : ''} value="2017">2017</option>
												<option selected={this.state.reportYear == 2016 ? 'selected' : ''} value="2016">2016</option>
											</select>
										</div>
										<div className="col-sm-2">
											<button className="btn btn-primary" type="submit" id="d_report"><i className="fa fa-download"></i> Download</button>
										</div>
									</div>
								</form>
								{/*<a href={this.state.data && api_route.production_report_agentpersonal+this.state.agent_id}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report Personal 2016</button>
								</a>							*/}
							</div>
							{/*<div className="col-sm-12">
								<a href={this.state.data && api_route.production_report_agentpersonal+this.state.agent_id}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report Personal 2017</button>
								</a>
							</div>*/}
						</div>
					</div>
				</div>
			);
		}
		else if(localStorage && localStorage.role == "5")
		{
			prodReportButton.push(
				<div role="tabpanel" className="tab-pane active" id="prod_report_hier">
					<div className="main boxShadow">
						<div className="row clearfix">&nbsp;</div>
						<div className="row">
							<div className="col-sm-8">
								<form className="form-horizontal" onSubmit={this.handleReportDownload}>
									<div className="form-group">
										<label className="col-sm-2">Report Type</label>
										<div className="col-sm-3">
											<select name="report-type" className="form-control" onChange={this.handleChangeType}>
												<option selected={this.state.reportType == '' ? 'selected' : ''} value="">Choose Report Type</option>
												<option selected={this.state.reportType == 'group' ? 'selected' : ''} value="group">Production Report Group</option>
											</select>
										</div>
										<label className="col-sm-2">Report Year</label>
										<div className="col-sm-3">
											<select name="report-type" className="form-control" onChange={this.handleChangeReportYear}>
												<option selected={this.state.reportYear == '' ? 'selected' : ''} value="">Choose Report Year</option>
												<option selected={this.state.reportYear == 2019 ? 'selected' : ''} value="2019">2019</option>
												<option selected={this.state.reportYear == 2018 ? 'selected' : ''} value="2018">2018</option>
												<option selected={this.state.reportYear == 2017 ? 'selected' : ''} value="2017">2017</option>
												<option selected={this.state.reportYear == 2016 ? 'selected' : ''} value="2016">2016</option>
											</select>
										</div>
										<div className="col-sm-2">
											<button className="btn btn-primary" type="submit" id="d_report"><i className="fa fa-download"></i> Download</button>
										</div>
									</div>
								</form>
								{/*<a href={this.state.data && api_route.production_report_agent + this.state.agent_id + '?year=2016'}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report Group 2016</button>
								</a>							
							</div>
							<div className="col-sm-12">
								<a href={this.state.data && api_route.production_report_agent + this.state.agent_id}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report Group 2017</button>
								</a>*/}
							</div>
						</div>
					</div>
				</div>
			);
		}
		else
		{
			prodReportButton.push(
				<div role="tabpanel" className="tab-pane active" id="prod_report_hier">
					<div className="main boxShadow">
						<div className="row clearfix">&nbsp;</div>
						<div className="row">
							<div className="col-sm-8">
								<form className="form-horizontal" onSubmit={this.handleReportDownload}>
									<div className="form-group">
										<label className="col-sm-2">Report Type</label>
										<div className="col-sm-3">
											<select name="report-type" className="form-control" onChange={this.handleChangeType}>
												<option selected={this.state.reportType == '' ? 'selected' : ''} value="">Choose Report Type</option>
												<option selected={this.state.reportType == 'personal' ? 'selected' : ''} value="personal">Production Report Personal</option>
												<option selected={this.state.reportType == 'group' ? 'selected' : ''} value="group">Production Report Group</option>
											</select>
										</div>
										<label className="col-sm-2">Report Year</label>
										<div className="col-sm-3">
											<select name="report-type" className="form-control" onChange={this.handleChangeReportYear}>
												<option selected={this.state.reportYear == '' ? 'selected' : ''} value="">Choose Report Year</option>
												<option selected={this.state.reportYear == 2019 ? 'selected' : ''} value="2018">2019</option>
												<option selected={this.state.reportYear == 2018 ? 'selected' : ''} value="2018">2018</option>
												<option selected={this.state.reportYear == 2017 ? 'selected' : ''} value="2017">2017</option>
												<option selected={this.state.reportYear == 2016 ? 'selected' : ''} value="2016">2016</option>
											</select>
										</div>
										<div className="col-sm-2">
											<button className="btn btn-primary" type="submit" id="d_report"><i className="fa fa-download"></i> Download</button>
										</div>
									</div>
								</form>
								{/*<a href={this.state.data && api_route.production_report_agentpersonal + this.state.agent_id  + '?year=2016'}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report Personal 2016</button>
								</a>							
							</div>
							<div className="col-sm-12">
								<a href={this.state.data && api_route.production_report_agentpersonal + this.state.agent_id}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report Personal 2017</button>
								</a>
							</div>
						</div>
						<div className="row clearfix">&nbsp;</div>
						<div className="row">
							<div className="col-sm-12">
								<a href={this.state.data && api_route.production_report_agent + this.state.agent_id + '?year=2016'}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report Group 2016</button>
								</a>							
							</div>
							<div className="col-sm-12">
								<a href={this.state.data && api_route.production_report_agent + this.state.agent_id}>
									<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report Group 2017</button>
								</a>*/}
							</div>
						</div>
					</div>
				</div>
			);
		}
		let msg_info = '';
		let data = this.state.data;
		let commision = [];
		let counter = 0
		if(data)
		{
			// // debugger;
			if(data.commission_statement_url != null && data.commission_statement_url.length > 0)
			{
				for(var i = 0; i<data.commission_statement_url.length; i++){
						// let name = data.commission_statement_url["name"][i];
						// // debugger;
						let url = '';
						let link = '';
						try{
							url = data.commission_statement_url[i].split('/')[6];
							link = data.commission_statement_url[i];
						}catch(e){
							url = data.commission_statement_url[i];
							link = data.commission_statement_url[i];
						}
						let row = null;
						row = <tr>
								<td>{i+1}</td>
								<td>{url}</td>
								<td><a className="btn btn-warning" target="_blank" href={link}><i className="fa fa-download"></i> Download</a></td>
							</tr>
						++counter;
						commision.push(row);
				}
				// for(var i = 0; i<data.commission_statement_url["name"].length; i++)
				// {
				// 	// // debugger;
				// 	let name = data.commission_statement_url["name"][i];
				// 	let url = data.commission_statement_url["file_url"][i];
				// 	let row = null;
				// 	row = <tr>
				// 			<td>{i+1}</td>
				// 			<td>{name}</td>
				// 			<td><a className="btn btn-warning" target="_blank" href={url}><i className="fa fa-download"></i> Download</a></td>
				// 		</tr>
				// 	++counter;
				// 	commision.push(row);
				// }
			}			
			msg_info = this.state.r_month != '' && this.state.r_month != undefined && this.state.r_year != '' && this.state.r_year != undefined ? 'Commision Report & Tax Slip as of ' + this.state.r_month + ' ' + this.state.r_year : 'Commision Report & Tax Slip';
		}

		let menu = getMenu('Report', 'fa-bar-chart');

		return (
			<div className="outer-wrapper">
				<SubmitModal />
				<div className="wrap2">
					{/* Start Top Menu Section */}
					<TopMenu username={this.state.user && this.state.user.name} lastlogin={this.state.user && this.state.user.last_login}/>
					{/* End Top Menu Section */}
				</div>
				<div className="main-wrapper twoColumnMain boxComReport">

					<div className="tab-mobile">
						{tablist_name}
						<div className="tab-content">
							<div role="tabpanel" className="tab-pane" id="comm_report">								
								<div className="main boxShadow">
									<ol className="breadcrumb" style={{marginBottom: '5px'}}>
										<li>Commision Report &amp; Tax Slip</li>
									</ol>
									<div className="formSearch">
										<form className="form-horizontal" onSubmit={this.handleSubmit}>
											<div className="form-group">
												<label className="col-sm-6">Commision Report Period</label>
												<div className="col-sm-2">
													<select name="commission-year" className="form-control" onChange={this.handleChangeYear}>
														<option selected={this.state.year == '' ? 'selected' : ''}>Year</option>
														<option selected={this.state.year == 2018 ? 'selected' : ''} value="2017">2018</option>
														<option selected={this.state.year == 2017 ? 'selected' : ''} value="2017">2017</option>
														<option selected={this.state.year == 2016 ? 'selected' : ''} value="2016">2016</option>
														<option selected={this.state.year == 2015 ? 'selected' : ''} value="2015">2015</option>
													</select>
												</div>
												<div className="col-sm-2">
													<select name="commission-month" className="form-control" onChange={this.handleChangeMonth}>
														<option selected={this.state.month == '' ? 'selected' : ''}>Month</option>
														<option selected={this.state.month == 1 ? 'selected' : ''} value="1">January</option>
														<option selected={this.state.month == 2 ? 'selected' : ''} value="2">February</option>
														<option selected={this.state.month == 3 ? 'selected' : ''} value="3">March</option>
														<option selected={this.state.month == 4 ? 'selected' : ''} value="4">April</option>
														<option selected={this.state.month == 5 ? 'selected' : ''} value="5">May</option>
														<option selected={this.state.month == 6 ? 'selected' : ''} value="6">June</option>
														<option selected={this.state.month == 7 ? 'selected' : ''} value="7">July</option>
														<option selected={this.state.month == 8 ? 'selected' : ''} value="8">August</option>
														<option selected={this.state.month == 9 ? 'selected' : ''} value="9">September</option>
														<option selected={this.state.month == 10 ? 'selected' : ''} value="10">October</option>
														<option selected={this.state.month == 11 ? 'selected' : ''} value="11">November</option>
														<option selected={this.state.month == 12 ? 'selected' : ''} value="12">December</option>
													</select>
												</div>
												<div className="col-sm-2">
													<button className="btn btn-primary" type="submit" id="s_report"><i className="fa fa-search"></i> Search</button>
												</div>
											</div>
										</form>
									</div>
									
									<div className="tableResult">
										<div className="table-responsive">
											<table className="table table-bordered table-box">
												<tr>
													<th className="header_table">No.</th>
													<th className="header_table">{msg_info}</th>
													<th className="header_table"></th>
												</tr>
												{commision}

												<tr style={(counter < 1) ? {display:''} : {display:'none'}}>
													<td colSpan="3" style={{'textAlign':'center'}}>Commission Statement untuk periode yang Anda cari tidak tersedia.</td>
												</tr>
											</table>
										</div>
									</div>
								</div>
							</div>
							{prodReportButton}
							{prodReportLocation}
						</div>
					</div>

				</div>
				<FeatureModal/>
				<Footer />
			</div>
		);
	}
}

export default comission_slip_production;