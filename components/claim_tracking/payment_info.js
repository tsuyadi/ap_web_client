'use strict'

import React from 'react';
import $ from 'jquery';
import api_route from '../../common_components/api_route';
import {MoneyFormat, DateFormat, DateFormatMMM} from '../../common_components/helper/formatter';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuClaimTracking from '../../common_components/menu_v2/left_menu_claim_tracking';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';

import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
//import StatusPolicy from '../../common_components/modal/status_payment_info';

class payment_info extends React.Component {
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
            url: api_route.payment_info,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: {claim_id: claim_id},
            success: (response) => {
              $('#loading').modal('hide');

              this.setState({
					data:response.content
              });
            },
            error: (err) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
				window.location.href = window.location.href.split('#') + '#/';
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
	let data = this.state.data;
	let data_claim = this.state.data_claim;

	let decision = [];
	if(data && data.hospital_decision_serializer && data.hospital_decision_serializer.length > 0 && data.hospital_decision_serializer != null && data.hospital_decision_serializer[0].claim_status != "Reject"){
		let decision_type = <div className="col-sm-12">
								<h3 style={{marginTop:'20px', marginBottom:'20px'}}>Decision</h3>
								<div className="boxHeader">
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision</label>
													</div>
													<div className="col-sm-6">
														{data && data.hospital_decision_serializer && data.hospital_decision_serializer[0].decision}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.hospital_decision_serializer && DateFormatMMM(data.hospital_decision_serializer[0].decision_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Total Number Days Approved</label>
													</div>
													<div className="col-sm-6">
														{data && data.hospital_decision_serializer && data.hospital_decision_serializer[0].approve_days}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Submit</label>
													</div>
													<div className="col-sm-6">
														{data && data.hospital_decision_serializer && MoneyFormat(data.hospital_decision_serializer[0].amount_submit)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Approved</label>
													</div>
													<div className="col-sm-6">
														{data && data.hospital_decision_serializer && MoneyFormat(data.hospital_decision_serializer[0].amount_approve)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Reject</label>
													</div>
													<div className="col-sm-6">
														{data && data.hospital_decision_serializer && MoneyFormat(data.hospital_decision_serializer[0].amount_reject)}
													</div>
												</div>
											</form>
										</div>
									</div>	
								</div>	
							</div>;
			decision.push(decision_type);
	} else if(data && data.death_decision_serializer && data.death_decision_serializer.length > 0 && data.death_decision_serializer != null && data.death_decision_serializer[0].claim_status != "Reject"){
		let decision_type = <div className="col-sm-12">
								<h3 style={{marginTop:'20px', marginBottom:'20px'}}>Decision</h3>
								<div className="boxHeader">
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision</label>
													</div>
													<div className="col-sm-6">
														{data && data.death_decision_serializer && data.death_decision_serializer[0].decision}
														{/* {data && data.policy.number} */}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.death_decision_serializer && DateFormatMMM(data.death_decision_serializer[0].decision_date)}
														{/* {data && data.policy.number} */}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Submit</label>
													</div>
													<div className="col-sm-6">
														{data && data.death_decision_serializer && MoneyFormat(data.death_decision_serializer[0].amount_submit)}
														{/* {data && data.policy.status} */}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Approved</label>
													</div>
													<div className="col-sm-6">
														{data && data.death_decision_serializer && MoneyFormat(data.death_decision_serializer[0].amount_approve)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Reject</label>
													</div>
													<div className="col-sm-6">
														{data && data.death_decision_serializer && MoneyFormat(data.death_decision_serializer[0].amount_reject)}
														{/* {data && data.policy.agent.code} */}
													</div>
												</div>
											</form>
										</div>
									</div>	
								</div>	
							</div>;
							decision.push(decision_type);
	} 
	else if(data && data.reject_decision_serializer && data.reject_decision_serializer.length > 0 && data.reject_decision_serializer != null && data.reject_decision_serializer[0].claim_status == "Reject" ){
		let reject_dec = "";
		if(data && data && data.reject_decision_serializer[0].claim_type == "Death Claim" && data.death_decision.length > 0 && data.death_decision != null ){
			reject_dec = data && data.death_decision && data.death_decision[0].decision;
		}else{
			reject_dec = data && data.hospital_decision && data.hospital_decision[0].decision;
		}
		let reject_hist = [];
		let data_reject = data && data && data.reject_decision_serializer;
		if(data_reject != null && data_reject.length > 0)
		{
			// data_reject_info = "   Show "+data_reject.length+" of "+this.state.total_data_reject;
			// data_reject_info = "   Show 0 of 0";
			$.map(data_reject, (value, index) => {
	            
				let row = null;
				let num = 0;
				// let insured = "";
				
					num += (index+1);
					row = <tr key={index}>
							<td>{num}</td>															
							<td>{value.code}</td>
							<td>{value.description}</td>
							<td>{value.notes}</td>
							<td>{DateFormat(value.decision_date)}</td>
						</tr>
					reject_hist.push(row);

				});

			} else {
				let row = <tr>
							<td colSpan="4" style={{'textAlign':'center'}}>No data.</td>
						</tr>
				reject_hist.push(row);

			}
		let decision_type = <div className="col-sm-12" >
								<h3 style={{marginTop:'20px', marginBottom:'20px'}}>Decision</h3>
								<div className="boxHeader">
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision</label>
													</div>
													<div className="col-sm-6">
													{reject_dec}

														{/* {data && data.policy.number} */}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6">
														<label>Reject Reason</label>
													</div>
													<div className="col-sm-6">
													{/* {data && data.reject_decision_serializer && data.claim_detail_serializer.death_decision[0].decision} */}

														{/* {data && data.policy.agent.code} */}
													</div>
												</div>
											</form>
										</div>
										<div className="col-sm-12">
											<div className="table-responsive">
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">No</th>															
															<th className="header_table ">Code</th>
															<th className="header_table ">Description</th>
															<th className="header_table ">Notes</th>
															<th className="header_table ">Decision Date</th>
														</tr>
													</thead>
													<tbody>     
														{/* <tr>
															<td colSpan="4" style={{'textAlign':'center'}}>No data.</td>
														</tr> */}
														{reject_hist}               
													</tbody>
												</table>
											</div>
										</div>
									</div>	
								</div>	
							</div>;
							decision.push(decision_type);

	}
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
							<li className="active">Payment Info</li>
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

					<LeftMenuClaimTracking active="3" claim_id={this.props.params.claim_id} policy_id={this.props.params.policy_id}/>

					<div className="main-content boxShadow">
						<div className="row">
							{/* <div className="col-sm-12">
								<h3 style={{marginTop:'0px', marginBottom:'20px'}}>Decision</h3>
								<div className="boxHeader">
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision</label>
													</div>
													<div className="col-sm-6">
														{data && data.payment_info_serializer && data.payment_info_serializer.hospital_decission && data.payment_info_serializer.hospital_decission.decision}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision Date</label>
													</div>
													<div className="col-sm-6">
														{(data && data.payment_info_serializer && data.payment_info_serializer.hospital_decission && data.payment_info_serializer.hospital_decission.decision_date) ? DateFormat(data.payment_info_serializer.hospital_decission.decision_date) : "-"}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Total Number Day Approved</label>
													</div>
													<div className="col-sm-6">
														{data && data.payment_info_serializer && data.payment_info_serializer.hospital_decission && data.payment_info_serializer.hospital_decission.approve_days}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Submit</label>
													</div>
													<div className="col-sm-6">
														{data && data.payment_info_serializer && data.payment_info_serializer.hospital_decission && MoneyFormat(data.payment_info_serializer.hospital_decission.amount_submit)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Approved</label>
													</div>
													<div className="col-sm-6">
														{data && data.payment_info_serializer && data.payment_info_serializer.hospital_decission && MoneyFormat(data.payment_info_serializer.hospital_decission.amount_approve)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Reject</label>
													</div>
													<div className="col-sm-6">
														{data && data.hospital_decission[0] && data.payment_info_serializer.hospital_decission && MoneyFormat(data.payment_info_serializer.hospital_decission.amount_reject)}
													</div>
												</div>
											</form>
										</div>
									</div>	
								</div>	
							</div> */}
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
							{decision}
							<hr />
							<div className="col-sm-12">
								<h3 style={{marginTop:'0px', marginBottom:'20px'}}>Payment Info</h3>
								<div className="boxHeader">
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Bank Name</label>
													</div>
													<div className="col-sm-6">
														{(data && data.payment_info_serializer && data.payment_info_serializer[0]) ? data.payment_info_serializer[0].bank_name : '-'}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Bank Account</label>
													</div>
													<div className="col-sm-6">
														{(data && data.payment_info_serializer && data.payment_info_serializer[0]) ? data.payment_info_serializer[0].bank_account_number : '-'}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Bank Account Name</label>
													</div>
													<div className="col-sm-6">
														{(data && data.payment_info_serializer && data.payment_info_serializer[0]) ? data.payment_info_serializer[0].bank_account_name : '-'}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Payment Date</label>
													</div>
													<div className="col-sm-6">
														{(data && data.payment_info_serializer && data.payment_info_serializer[0]) ? DateFormatMMM(data.payment_info_serializer[0].payment_date) : "-"}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount</label>
													</div>
													<div className="col-sm-6">
														{(data && data.payment_info_serializer && data.payment_info_serializer[0]) ? MoneyFormat(data.payment_info_serializer[0].amount) : '-'}
													</div>
												</div>
											</form>
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

export default payment_info;
