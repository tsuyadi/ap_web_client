'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import {MoneyFormat} from '../../common_components/helper/formatter';
import {DateFormatYMD, DateFormat} from '../../common_components/helper/formatter';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuPolicy from '../../common_components/menu_v2/left_menu_policy';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';
import {DatePicker} from '../../common_components/date_picker';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import UnpaidModal from '../../common_components/modal/unpaid_modal';

class premium_payment_information extends React.Component {

	constructor(props){
		super(props);
		localStorage.setItem('policyid', this.props.params.policy_id);
		this.state = {
			param_unpaid : {
				policy_id:localStorage.getItem('policyid'),
				due_date : null,
			},
			param : {
				policy_id:this.props.params.policy_id,
				page:1,
				offset:20,
				due_date_start:null,
				due_date_end:null,
				payment_date_start:null,
				payment_date_end:null
			},
			branch_list: null,
			total : 0,
			total_data : 0,
			current : 0,
			visiblePages : 3,
			list : null,
			policy_id: null,
			policy_no: null,
			policy_holder: null,
			agent_name: null,
			agent_code: null,
			insured: null,
			policy_payment: null,
			policy_hd :null,
			data_unpaid : [],
		}
        this.openMenu = this.openMenu.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		this.getData = this.getData.bind(this);
	}

	componentWillMount = () => {
		CekAuth();
	}

	componentDidMount = () => {
		$('#loading').modal('show');
		var param = [];

		if(this.props.disabled == "true"){
			param = {
				agent : this.props.param_agent
			};
		}else{
			param = [];
		}

		$.ajax({
            url: api_route.policy_premiumPayment,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: this.state.param,
            type: 'POST',
            success: (response) => {
			
          		$('#loading').modal('hide');
				  this.setState({
		    		policy_no:response.content.policy.number,
					policy_holder: response.content.policy.policy_holder.name,
					agent_name: response.content.policy.agent.full_name,
					agent_code: response.content.policy.agent.code,
					insured: response.content.policy.lifeassured_set[0].person.name,
					policy_payment: response.content.policy_list,
					total : response.content.total_pages,
					policy_hd : response.content.policy,
              	});
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
            	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
	}

	handleSubmit = (e) => {
		
		if(e)
		{
			e.preventDefault();
		}
		
		let payment_start_date = $('[name=payment_date_start]').val();
		let payment_end_date = $('[name=payment_date_end]').val();

		let due_start_date = $('[name=due_date_start]').val();
		let due_end_date = $('[name=due_date_end]').val();

		payment_start_date = this.state.param.payment_date_start = payment_start_date.split("-").reverse().join("-");
		payment_end_date = this.state.param.payment_date_end = payment_end_date.split("-").reverse().join("-");

		due_start_date = this.state.param.due_date_start = due_start_date.split('-').reverse().join('-');
		due_end_date = this.state.param.due_date_end = due_end_date.split('-').reverse().join('-');

		$('.load-payment').show();

		$.ajax({
            url: api_route.policy_premiumPayment,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: this.state.param,
            type: 'POST',
            success: (response) => {
              
			  $('.load-payment').hide();

              this.setState({
		    		policy_no: response.content.policy.number,
					policy_holder: response.content.policy.policy_holder.name,
					agent_name: response.content.policy.agent.full_name,
					agent_code: response.content.policy.agent.code,
					insured: response.content.policy.lifeassured_set[0].person.name,
					policy_payment: response.content.policy_list,
					total : response.content.total_pages,
					policy_hd : response.content.policy,
              	});
            },
            error: (err, response) => {
              $('.load-payment').hide();
              if(err.responseJSON){              	
            	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
	}

	handlePageChanged(newPage){
		
		this.state.param.page = newPage;
		$('#loading').modal('show');
		// // debugger;
		$.ajax({
			url: api_route.policy_premiumPayment,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			// // debugger di listpolicies ajax
			
				this.setState({
					policy_payment: response.content.policy_list,
					total : response.content.total_pages
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

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
	}
	getData(){
		// this.state.param_unpaid.due_date = '2019-03-28';
		// this.state.param_unpaid.policy_id = localStorage.getItem('policyid');
		//$('#unpaid-modal').modal('show');
		// var date = $(this).attr('data-id');
		// console.log("date" +date);
		
	}
	render(){
		var toggleProp = "";

		if(this.props.disabled == "true"){
			toggleProp="";
		}else{
			toggleProp="modal";
		}

		let policies = [];
		let dateid='';
		if(this.state.policy_payment && this.state.policy_payment.length > 0){
			$.map(this.state.policy_payment, (value, index) => {
	            let row = null;
				let insured = "";
				var styles = {};
				let payment_date = "";
				var now = new Date();
				var a = new Date(DateFormatYMD(now));
				var b =new Date(value.due_date);
				debugger;
				if(value.payflag != 'P' && b < a){
					styles = {color:'red'};
					debugger;
				}
				payment_date = (value.payment_date == '1900-01-01') ? '' : DateFormat(value.payment_date);
				dateid = value.due_date;
	            row = <tr key={index}>
						<td>{DateFormat(value.due_date)}</td>
						<td>{MoneyFormat(value.amount)}</td>
						<td>{payment_date}</td>
						<td><div style={styles}>{(value.payflag == 'P') ? 'PAID' : <a data-toggle='modal' data-target='#unpaid-modal' style={{textDecoration:'underline'}} data-id={dateid}>UNPAID</a>}</div></td>
					</tr>
				policies.push(row);
            });
		}
		else {
			let row = <tr>
						<td colSpan="4" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            policies.push(row);
		}
		
		let policy = null;
		policy = {
				premium_period : localStorage.getItem('premium_period'),	
				payment_mode : localStorage.getItem('payment_mode'),	
				payment_method : localStorage.getItem('payment_method'),	
				effective_date : this.state.policy_hd && this.state.policy_hd.effective_date,	
				currency : localStorage.getItem('currency'),	
				regular_premium : localStorage.getItem('regular_premium'),	
				regular_topup : localStorage.getItem('regular_topup'),	
				total_premium : localStorage.getItem('total_premium'),	
				premium_duedate : localStorage.getItem('premium_duedate'),	
				contract_date : localStorage.getItem('contract_date'),	
				policy_status_date : this.state.policy_hd && this.state.policy_hd.policy_status_date,

				policy_no : localStorage.getItem('policy_no'),	
				policy_holder : localStorage.getItem('policy_holder'),	
				insured : localStorage.getItem('insured'),	
				spaj_number : localStorage.getItem('spaj_number'),	
				agent_code : localStorage.getItem('agent_code'),	
				policy_status : localStorage.getItem('policy_status'),	
				agent_status : localStorage.getItem('agent_status'),	
				agent_name : localStorage.getItem('agent_name'),
				branch : this.state.policy_hd && this.state.policy_hd.agent.branch.name
		};

		let paging = [];

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
			if(current > 1){
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, 1)}>First</a></li>
				);
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, (current - 1) < 0 ? 1 : (current - 1))}>Prev</a></li>
				);

			} else {
				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, 1)}>First</a></li>
				);
				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, (current - 1) < 0 ? 1 : (current - 1))}>Prev</a></li>
				);
			}
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
			if(current < total){
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1)) }>Next</a></li>
				);
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, total)}>Last</a></li>
				);

			} else {
				
				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1)) }>Next</a></li>
				);
				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, total)}>Last</a></li>
				);
			}
		}


		return (
		<div className="wrap2">
			<SubmitModal />
			<FeatureModal />
            <TopMenuNewBusinessDetail opsi="policyt" title="Premium Payment Information" id={this.props.params.policy_id} />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/policy/list_policies">Policy Tracking</a></li>
							<li className="active">Premium Payment Information</li>
						</ol>
					{/*</div>
					<div className="col-xs-2">
						<ol className="breadcrumb" onClick={this.openMenu} style={{marginBottom: '5px', cursor : 'pointer'}}>
							<li className="active">
								<span className="menuIconSidebar">
									<i className="fa fa-bars"></i>
								</span>
							</li>
						</ol>
					</div>
				</div>*/}
				
				<div className="main twoColumnMain">

					<LeftMenuPolicy active="5" policy_id={this.state.param.policy_id} />

					<div className="main-content boxShadow">
						<div className="row">
							<div className="col-sm-12">

								<div className="boxHeader">
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy No</label>
													</div>
													<div className="col-sm-6">
														{policy.policy_no}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Status</label>
													</div>
													<div className="col-sm-6">
														{policy.policy_status}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Status Date</label>
													</div>
													<div className="col-sm-6">
														{DateFormat(policy.policy_status_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Holder Name</label>
													</div>
													<div className="col-sm-6">
														{policy.policy_holder}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Insure Name</label>
													</div>
													<div className="col-sm-6">
														{policy.insured}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Premium Payment Period</label>
													</div>
													<div className="col-sm-6">
														{policy.premium_period}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Payment Mode</label>
													</div>

													<div className="col-sm-6">
														{policy.payment_mode}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Payment Method</label>
													</div>
													<div className="col-sm-6">
														{policy.payment_method}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Contract Date</label>
													</div>
													<div className="col-sm-6">
														{policy.contract_date}
														
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Effective Date</label>
													</div>
													<div className="col-sm-6">
														{DateFormat(policy.effective_date)}
													</div>
												</div>
												
											</form>
										</div>
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>SPAJ No</label>
													</div>
													<div className="col-sm-6">
														{policy.spaj_number}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Code</label>
													</div>
													<div className="col-sm-6">
														{policy.agent_code}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Name</label>
													</div>
													<div className="col-sm-6">
														{policy.agent_name}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Status</label>
													</div>
													<div className="col-sm-6">
														{policy.agent_status}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Currency</label>
													</div>
													<div className="col-sm-6">
														{policy.currency}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Regular Premium</label>
													</div>
													<div className="col-sm-6">
														{policy.regular_premium}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Regular Top Up / Rider Premium</label>
													</div>
													<div className="col-sm-6">
														{policy.regular_topup}
													</div>
												</div>												
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Total Premium</label>
													</div>
													<div className="col-sm-6">
														{policy.total_premium}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Next Premium Due Date</label>
													</div>

													<div className="col-sm-6">
														{policy.premium_duedate}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Branch</label>
													</div>

													<div className="col-sm-6">
														{policy.branch == null ? '' : policy.branch}
													</div>
												</div>
											</form>
										</div>
									</div>
								</div>
								<div className="boxHeader">
									<div className="row">
										<div className="clearfix h25"></div>
										
										<div className="col-sm-12">
											<div data-mh="group3" className="col-sm-5 col-sm-offset-1 sameHeight2">
												<div className="col-sm-6">
													<div className="form-group">
														<label>Payment Date</label>
													</div>
												</div>
												<div className="col-sm-6">
													<div className="form-group">
														<div className="input-group">
															<DatePicker className="form-control" name="payment_date_start" id="payment_date_start" />
														</div>
													</div>
												</div>
												
												<div className="clearfix"></div>
												
												<div className="col-sm-6">
													<div className="form-group">
														<label>Premium Due Date</label>
													</div>
												</div>
												
												<div className="col-sm-6">
													<div className="form-group">
														<div className="input-group">
															<DatePicker className="form-control" name="due_date_start" id="due_date_start" />
														</div>
													</div>
												</div>
											</div>
											
											<div data-mh="group3" className="col-sm-1 text-center sameHeight2">
												to
											</div>
											
											<div data-mh="group3" className="col-sm-5 sameHeight2">
												<div className="col-sm-6">
													<div className="form-group">
														<div className="input-group">
															<DatePicker className="form-control" name="payment_date_end" id="payment_date_end" />
														</div>
													</div>
												</div>
												
												<div className="clearfix"></div>

												<div className="col-sm-6">
													<div className="form-group">
														<div className="input-group">
															<DatePicker className="form-control" name="due_date_end" id="due_date_end" />
														</div>
													</div>
												</div>
											</div>
											
											<div className="clearfix"></div>
											
											<div className="col-sm-4 col-sm-offset-4">
												<div className="clearfix h25"></div>
												
												<div className="form-group">
													<form className="form-horizontal" >
														<button className="btn btn-primary btn-lg btn-block" onClick={this.handleSubmit}>Search <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-payment"></i></button>
													</form>
												</div>
											</div>
											
										</div>
									</div>
								</div>
								<div className="boxBody">
									<div className="row">
									<div>
										<nav aria-label="Page navigation">
											<ul className="pagination">
												{paging}
											</ul>
										</nav>
									</div>
										<div className="col-sm-12">
											<div className="table-responsive">
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">Premium Due Date</th>
															<th className="header_table ">Payment Amount</th>
															<th className="header_table ">Payment Date</th>
															<th className="header_table ">Status</th>
														</tr>
													</thead>
													<tbody>
														{policies}														
													</tbody>
												</table>
											</div>
										</div>
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
						</div>
			
					</div>

					<div className="clearfix"></div>
				</div>
			</div>
			<Loading />

			<Footer />
			<UnpaidModal/>
		</div>
		);
	}
}

export default premium_payment_information;
