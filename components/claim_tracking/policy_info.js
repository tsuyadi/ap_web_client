'use strict'

import React from 'react';
import $ from 'jquery';
import api_route from '../../common_components/api_route';
import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuClaimTracking from '../../common_components/menu_v2/left_menu_claim_tracking';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';

import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
//import StatusPolicy from '../../common_components/modal/status_claim_policy_info';

class claim_policy_info extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: null
		}
		this.getData = this.getData.bind(this);
        this.openMenu = this.openMenu.bind(this);
		//this.showStatus = this.showStatus.bind(this);
	}

  componentDidMount(){
		this.getData(this.props.params.policy_id);
	}

	getData (policy_id) {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.policy_info,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: {policy_id: policy_id},
            success: (response) => {
              $('#loading').modal('hide');

			  var polis = response.content.policy;

			  var policy_no = polis && polis.number;
			  var policy_holder = polis && polis.policy_holder && polis.policy_holder.name;
			  if (polis.lifeassured_set.length > 0){
			 	 var insured = polis && polis.lifeassured_set && polis.lifeassured_set.length > 0 && polis.lifeassured_set[0].person.name ;
				
			  } else {
			 	 var insured = '-' ;

			  }
			  var agent_code = polis && polis.agent && polis.agent.code;
			  var agent_name = polis && polis.agent && polis.agent.full_name;
			  var agent_status = polis && polis.agent && polis.agent.status;
			  var spaj_number = polis && polis.spaj_number;
			  var policy_status = polis  && polis.status;
			  var premium_period = polis && polis.premium_period;
			  var payment_mode = polis  && polis.payment_mode;
			  var payment_method = polis  && polis.payment_method;
			  var effective_date = polis  && DateFormat(polis.effective_date);
			  var currency = response.content.currency;
			  var regular_premium = MoneyFormat(polis && polis.regular_premium);
			  var regular_topup = MoneyFormat(polis && polis.regular_topup);
			  var total_premium = MoneyFormat(polis && polis.total_premium);
			  var premium_duedate = polis && DateFormat(polis.premium_duedate);
			//   var contract_date = polis && DateFormat(polis.premium_duedate);

			  localStorage.setItem('policy_no', policy_no);
			  localStorage.setItem('policy_status', policy_status);
			  localStorage.setItem('policy_holder', policy_holder);
			  localStorage.setItem('insured', insured);
			  localStorage.setItem('agent_code', agent_code);
			  localStorage.setItem('agent_name', agent_name);
			  localStorage.setItem('agent_status', agent_status);
			  localStorage.setItem('spaj_number', spaj_number);

			  localStorage.setItem('premium_period', premium_period);
			  localStorage.setItem('payment_mode', payment_mode);
			  localStorage.setItem('payment_method', payment_method);
			  localStorage.setItem('effective_date', effective_date);
			  localStorage.setItem('currency', currency);
			  localStorage.setItem('regular_premium', regular_premium);
			  localStorage.setItem('regular_topup', regular_topup);
			  localStorage.setItem('total_premium', total_premium);
			  localStorage.setItem('premium_duedate', premium_duedate);
			  localStorage.setItem('contract_date', effective_date);
              this.setState({
					data:response.content
              });
            },
            error: (err) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
				window.location.href = window.location.href.split('#')[0] + '#/';
              }

            }
        });
	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	// showStatus(){
	// 	{StatusPolicy}
	// }
	render(){
    let data = this.state.data;
	debugger;
	if (data && data.policy && data.policy.lifeassured_set.length > 0){
		var insured = data.policy && data.policy.lifeassured_set && data.policy.lifeassured_set.length > 0 && data.policy.lifeassured_set[0].person.name ;
	
	} else {
		var insured = '-' ;

	}
    let benefeciary = [];
	let component_row = [];
    if(data){
		$.map(data.policy.beneficiary_set, (value, index) => {
			let row = null;
			row = <tr key={index}>
					<td>{index+1}</td>
					<td>{value.person == null ? '' : value.person.name}</td>
					<td>{DateFormat(value.person == null ? '' : value.person.birth_date)}</td>
					<td>{value.person == null ? '' : value.person.gender}</td>
					<td>{value.relationship}</td>
					<td>{value.percentage}</td>
				</tr>
						benefeciary.push(row);
			});
		

		// // debugger;

		let components = data.components;

		components.map((d, e) => {
			// // debugger;
			var cov_start = d.coverage_start == '1900-01-01' ? '' : d.coverage_start;
			var cov_end = d.coverage_end == '1900-01-01' ? '' : d.coverage_end;

			var product_type = "";

			try{
				if(product_type != 'T'){
					product_type = (d.risk_type == 'B') ? 'Basic' : 'Rider';
				}
			}catch(e){

			}

			component_row.push(
				<tr key={'cpd_' + e}>
					<td>{(e + 1)}</td>
					<td>{d.product_code}</td>
					<td>{d.product_name}</td>
					<td>{product_type}</td>
					<td>{MoneyFormat(d.sum_assured)}</td>
					<td>{DateFormat(cov_start)}</td>
					<td>{DateFormat(cov_end)}</td>
					<td>{/*<button onClick={thi.showStatus}>{d.status}</button>*/}{d.status}</td>
				</tr>
			);
		});
		
		
	}

	// console.log("alamat"+document.location.href);	
	// var url = document.location.href;
	// var id_polic = url.substr(48,(url.indexOf("?")-48));
	// console.log("nilai id :"+id_polic);
		return (
		<div className="wrap2">
			<SubmitModal />
			<FeatureModal />
            <TopMenuNewBusinessDetail opsi="policyt" title="Policy Info" id={this.props.params.policy_id} />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/claim_tracking">Claim Tracking</a></li>
							<li className="active">Policy Info</li>
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
				</div>
				*/}
				<div className="main twoColumnMain">

					<LeftMenuClaimTracking active="5" claim_id={this.props.params.claim_id} policy_id={this.props.params.policy_id}/>

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
														{data && data.policy.number}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Status</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.status}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Status Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.policy_status_date && DateFormat(data.policy.policy_status_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Code</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.agent.code}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Name</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.agent.full_name}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Premium Payment Period</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy && data.policy.premium_period}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Payment Mode</label>
													</div>

													<div className="col-sm-6">
														{data && data.policy.payment_mode}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Payment Method</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.payment_method}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Contract Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy && DateFormat(data.policy.effective_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Effective Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy && DateFormat(data.policy.effective_date)}
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
														{data && data.policy.spaj_number}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Holder Name</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.policy_holder.name}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Insure Name</label>
													</div>
													<div className="col-sm-6">
														{insured}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Status</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.agent.status}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Currency</label>
													</div>
													<div className="col-sm-6">
														{data && data.currency}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Regular Premium</label>
													</div>
													<div className="col-sm-6">
														{MoneyFormat(data && data.policy.regular_premium)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Regular Top Up / Rider Premium</label>
													</div>
													<div className="col-sm-6">
														{MoneyFormat(data && data.policy.regular_topup)}
													</div>
												</div>												
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Total Premium</label>
													</div>
													<div className="col-sm-6">
														{MoneyFormat(data && data.policy.total_premium)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Next Premium Due Date</label>
													</div>

													<div className="col-sm-6">
														{data && DateFormat(data.policy.premium_duedate)}
													</div>
												</div>	
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Branch</label>
													</div>

													<div className="col-sm-6">
														{data && data.policy.branch}
													</div>
												</div>												
											</form>
										</div>
									</div>
								</div>
								<div className="boxBody">
									<div className="row">
										<div className="col-sm-12">
											<h3>Product Info</h3>

											<div className="table-responsive">
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">No</th>															
															<th className="header_table ">Product Code</th>
															<th className="header_table ">Product Name</th>
															<th className="header_table ">Product Type</th>
															<th className="header_table ">Sum Assured</th>
															<th className="header_table ">Coverage Start Date</th>
															<th className="header_table ">Coverage End Date</th>
															<th className="header_table ">Status</th>
														</tr>
													</thead>
													<tbody>     
														{component_row}               
													</tbody>
												</table>
											</div>

											<div className="clearfix"></div>

											<h3>Beneficiary</h3>

											<div className="table-responsive">
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">No</th>
															<th className="header_table ">Name</th>
															<th className="header_table ">Birth Date</th>
															<th className="header_table ">Gender</th>
															<th className="header_table ">Relationship with Life Assured</th>
															<th className="header_table ">Sharing Percentage</th>
														</tr>
													</thead>
													<tbody>
														{benefeciary}
													</tbody>
												</table>
											</div>
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

		</div>
		);
	}
}

export default claim_policy_info;
