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
//import StatusPolicy from '../../common_components/modal/status_claim_data';

class claim_notes extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: null,
			data_claim: null
		}
		this.getData = this.getData.bind(this);
        this.openMenu = this.openMenu.bind(this);
		//this.showStatus = this.showStatus.bind(this);
	}

  componentDidMount(){
		this.getData(this.props.params.claim_id);
	}

	getData (claim_id) {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.note,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: {claim_id: claim_id},
            success: (response) => {
              $('#loading').modal('hide');

			//   var polis = response.content.policy;

			//   var policy_no = polis && polis.number;
			//   var policy_holder = polis && polis.policy_holder && polis.policy_holder.name;
			//   if (polis.lifeassured_set.length > 0){
			//  	 var insured = polis && polis.lifeassured_set && polis.lifeassured_set.length > 0 && polis.lifeassured_set[0].person.name ;
				
			//   } else {
			//  	 var insured = '-' ;

			//   }
			//   var agent_code = polis && polis.agent && polis.agent.code;
			//   var agent_name = polis && polis.agent && polis.agent.full_name;
			//   var agent_status = polis && polis.agent && polis.agent.status;
			//   var spaj_number = polis && polis.spaj_number;
			//   var policy_status = polis  && polis.status;
			//   var premium_period = polis && polis.premium_period;
			//   var payment_mode = polis  && polis.payment_mode;
			//   var payment_method = polis  && polis.payment_method;
			//   var effective_date = polis  && DateFormat(polis.effective_date);
			//   var currency = response.content.currency;
			//   var regular_premium = MoneyFormat(polis && polis.regular_premium);
			//   var regular_topup = MoneyFormat(polis && polis.regular_topup);
			//   var total_premium = MoneyFormat(polis && polis.total_premium);
			//   var premium_duedate = polis && DateFormat(polis.premium_duedate);
			// //   var contract_date = polis && DateFormat(polis.premium_duedate);

			//   localStorage.setItem('policy_no', policy_no);
			//   localStorage.setItem('policy_status', policy_status);
			//   localStorage.setItem('policy_holder', policy_holder);
			//   localStorage.setItem('insured', insured);
			//   localStorage.setItem('agent_code', agent_code);
			//   localStorage.setItem('agent_name', agent_name);
			//   localStorage.setItem('agent_status', agent_status);
			//   localStorage.setItem('spaj_number', spaj_number);

			//   localStorage.setItem('premium_period', premium_period);
			//   localStorage.setItem('payment_mode', payment_mode);
			//   localStorage.setItem('payment_method', payment_method);
			//   localStorage.setItem('effective_date', effective_date);
			//   localStorage.setItem('currency', currency);
			//   localStorage.setItem('regular_premium', regular_premium);
			//   localStorage.setItem('regular_topup', regular_topup);
			//   localStorage.setItem('total_premium', total_premium);
			//   localStorage.setItem('premium_duedate', premium_duedate);
			//   localStorage.setItem('contract_date', effective_date);
			console.log("masuk note");  
			console.log(response);  
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
		$('#loading').modal('show');
		$.ajax({
            url: api_route.claim_detail,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: {claim_id: claim_id},
            success: (response) => {
              $('#loading').modal('hide');

			this.setState({
					data_claim:response.content
              });
            },
			error: (xhr, status) => {
				$('#loading').modal('hide');
				if(xhr.status != '404') {
				  alert("something wrong");
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
    let data = this.state.data && this.state.data.note_serializer;
	let data_claim = this.state.data_claim;
	let claim_notes = [];
    if(data != null && data.length > 0){
		let notes = data;

		$.map(notes, (value, index) => {
			claim_notes.push(
				<tr key={index}>
					<td>{(index + 1)}</td>
					<td>{value.claim_reg_no}</td>
					<td>{value.types}</td>
					<td>{value.notes}</td>
				</tr>
			);
		});
		
		
	}else {
		let row = <tr>
					<td colSpan="4" style={{'textAlign':'center'}}>No data.</td>
				</tr>
		claim_notes.push(row);

	}

	// console.log("alamat"+document.location.href);	
	// var url = document.location.href;
	// var id_polic = url.substr(48,(url.indexOf("?")-48));
	// console.log("nilai id :"+id_polic);
		return (
		<div className="wrap2">
			<SubmitModal />
			<FeatureModal />
            <TopMenuNewBusinessDetail opsi="claim" title="Claim Data" id={this.props.params.claim_id} />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/claim_tracking">Claim Tracking</a></li>
							<li className="active">Claim Data</li>
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

					<LeftMenuClaimTracking active="2" claim_id={this.props.params.claim_id} policy_id={this.props.params.policy_id}/>

					<div className="main-content boxShadow">
						<div className="row">
							<div className="col-sm-12">
								<h3 style={{marginTop:'0px', marginBottom:'20px'}}>Claim Data</h3>
								<div className="boxHeader" style={{borderBottom:'none'}}>
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy No.</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && data_claim.claim_detail_serializer.policy_no}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim Reg No.</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && data_claim.claim_detail_serializer.claim_reg_no}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Holder</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && data_claim.claim_detail_serializer.policy_holder}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Insured</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && data_claim.claim_detail_serializer.insured}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Branch</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && data_claim.claim_detail_serializer.branch}
													</div>
												</div>
											</form>
										</div>
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim Status</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && data_claim.claim_detail_serializer.claim_status}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim Type</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && data_claim.claim_detail_serializer.claim_type}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim Product</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && data_claim.claim_detail_serializer.product}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Branch Receive Date</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && DateFormat(data_claim.claim_detail_serializer.branch_receive_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Complete Date</label>
													</div>
													<div className="col-sm-6">
														{data_claim && data_claim.claim_detail_serializer && DateFormat(data_claim.claim_detail_serializer.completed_date)}
													</div>
												</div>			
											</form>
										</div>
									</div>
								</div>
								<hr />
								<h3 style={{marginTop:'0px', marginBottom:'20px'}}>Claim Notes</h3>
								
								<div className="boxBody">
									<div className="row">
										<div className="col-sm-12">
											<div className="table-responsive">
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">No</th>															
															<th className="header_table ">Claim Reg No.</th>
															<th className="header_table ">Type</th>
															<th className="header_table ">Notes</th>
														</tr>
													</thead>
													<tbody>     
                                                        {/* <tr>
                                                            <td colSpan="4" style={{'textAlign':'center'}}>No data.</td>
                                                        </tr> */}
														{claim_notes}               
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

export default claim_notes;
