'use strict'

import React from 'react';
// import $ from 'jQuery';

import api_route from '../../common_components/api_route';
import Footer from '../../common_components/footer';
import TopMenu from '../../common_components/menu_v2/top_mgt';
import CekAuth from '../../common_components/helper/cek_auth';

const month = [
	'', 'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'
];

class report_management extends React.Component {
	constructor(props){
		super(props);
		CekAuth();
		this.state = {
			data: {'commission_statement_url': null},
			month: '',
			year: '',
			user: {'name':localStorage.getItem('name'),'last_login':localStorage.getItem('last_login')},
			agent_id: localStorage.getItem('agent_id'),
			r_month : '',
			r_year : ''
		}
		this.handleSubmit = this.handleSubmit.bind(this);

		this.submitIssue = this.submitIssue.bind(this);
		this.clearForm = this.clearForm.bind(this);
	}

	componentDidMount(){

		// // debugger;

		var d = new Date();
		var current_month = d.getMonth();
		var current_year = d.getFullYear();

		current_month = (parseInt(current_month) < 10 ? '0' + current_month : current_month);

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
				'month': (parseInt(this.state.month) < 10 ? '0' + this.state.month : this.state.month)
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

	handleChangeMonth = (e) => {
		this.setState({month: e.target.value});
	}

	handleChangeYear = (e) => {
		this.setState({year: e.target.value});
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
		
		if(localStorage && localStorage.role == "9")
		{

			prodReportButton.push(
				<div role="tabpanel" className="tab-pane active" id="prod_report_hier">
					<div className="row clearfix">&nbsp;</div>
					<div className="row">
						<div className="col-sm-12">
							<a href={this.state.data && api_route.production_report_management + '?year=2016'}>
								<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report 2016</button>
							</a>							
						</div>
						<div className="col-sm-12">
							<a href={this.state.data && api_route.production_report_management}>
								<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report 2017</button>
							</a>
						</div>
					</div>
				</div>
			);
		}
		else if(localStorage && localStorage.role == "5")
		{
			prodReportButton.push(
				<div role="tabpanel" className="tab-pane active" id="prod_report_hier">
					<div className="row clearfix">&nbsp;</div>
					<div className="row">
						<div className="col-sm-12">
							<a href={this.state.data && api_route.production_report_management + '?year=2016'}>
								<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report 2016</button>
							</a>							
						</div>
					</div>
					<div className="row clearfix">&nbsp;</div>
					<div className="row">
						<div className="col-sm-12">
							<a href={this.state.data && api_route.production_report_management}>
								<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report 2017</button>
							</a>							
						</div>
					</div>
				</div>
			);
		}
		else
		{
			prodReportButton.push(
				<div role="tabpanel" className="tab-pane active" id="prod_report_hier">
					<div className="row clearfix">&nbsp;</div>
					<div className="row">
						<div className="col-sm-12">
							<a href={this.state.data && api_route.production_report_management + '?year=2016'}>
								<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report 2016</button>
							</a>							
						</div>
					</div>
					<div className="row clearfix">&nbsp;</div>
					<div className="row">
						<div className="col-sm-12">
							<a href={this.state.data && api_route.production_report_management}>
								<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production Report 2017</button>
							</a>							
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
						try{
							url = data.commission_statement_url[i].split('/')[6];
						}catch(e){
							url = data.commission_statement_url[i];
						}
						let row = null;
						row = <tr>
								<td>{i+1}</td>
								<td>{url}</td>
								<td><a className="btn btn-warning" target="_blank" href={url}><i className="fa fa-download"></i> Download</a></td>
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

		let issueForm = [];

		issueForm.push(

			<div id="submitIssueDiv">
				<div id="inform" style={{'display':'none'}} className="form-group">
					<p className="alert alert-success">Thank you, your inquiry has been submitted.</p>
					<button type="button" className="btn btn-danger" data-dismiss="modal" >Close</button>
				</div>
				<div id="submitfom" className="form-group">
					<input type="text" className="form-control" name="email" style={{'margin-bottom':'10px'}} placeholder="Your email" />
					<p className="email-alert text-danger" style={{'display':'none'}}>Please use valid email address</p>
					<textarea className="form-control" style={{'margin-top':'10px'}} id="issueMessage" name="message" placeholder="Submit your Issue here">
					</textarea>
					<button type="submit" className="btn btn-default" style={{'margin-top':'10px', 'margin-right':'10px'}} onClick={this.clearForm}>Clear</button>
					<button type="submit" className="btn btn-primary" style={{'margin-top':'10px'}} onClick={this.submitIssue}>Submit</button> <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw sendissue" ></i>					
				</div>
				
			</div>

		);

		return (
			<div className="outer-wrapper">
				<div className="wrap2">
					{/* Start Top Menu Section */}
					<TopMenu username={this.state.user && this.state.user.name} lastlogin={this.state.user && this.state.user.last_login}/>
					<ModalMessage id="submit_ap" title="Submit Issue" message={issueForm} />
					{/* End Top Menu Section */}
				</div>
				<div className="main-wrapper twoColumnMain">

					<div className="tab-mobile">
						<ul className="nav nav-tabs" role="tablist">
							<li role="presentation" className="active"><a href="#prod_report_hier" aria-controls="prod_report_hier" role="tab" data-toggle="tab">Production Report by Hierarchy</a></li>
						</ul>
						<div className="tab-content">							
							{prodReportButton}
						</div>
					</div>

				</div>
				<Footer />
			</div>
		);
	}
}

export default report_management;