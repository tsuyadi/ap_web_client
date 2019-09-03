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
//import StatusPolicy from '../../common_components/modal/status_claim_data';

class claim_data extends React.Component {
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
		this.getData(this.props.params.claim_id);
	}

	getData (claim_id) {
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
					data:response.content
              });
			},
			error: (xhr, status) => {
				$('#loading').modal('hide');
				if(xhr.status == '404') {
					  alert('Claim has no data');
				}else{
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
	let investigation_check = [];
	let benefit_check = [];
	let claim_50_check = [];
	let decision = [];
	if(data && data.claim_detail_serializer &&  data.claim_detail_serializer.hospital_decision.length > 0 && data.claim_detail_serializer.hospital_decision != null && data.claim_detail_serializer.claim_status != "Reject"){
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
														{data && data.claim_detail_serializer.hospital_decision && data.claim_detail_serializer.hospital_decision[0].decision}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.hospital_decision && DateFormatMMM(data.claim_detail_serializer.hospital_decision[0].decision_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Approve Days</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.hospital_decision && data.claim_detail_serializer.hospital_decision[0].approve_days}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Submit</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.hospital_decision && MoneyFormat(data.claim_detail_serializer.hospital_decision[0].amount_submit)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Approved</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.hospital_decision && MoneyFormat(data.claim_detail_serializer.hospital_decision[0].amount_approve)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Reject</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.hospital_decision && MoneyFormat(data.claim_detail_serializer.hospital_decision[0].amount_reject)}
													</div>
												</div>
											</form>
										</div>
									</div>	
								</div>	
							</div>;
			decision.push(decision_type);
	} else if(data && data.claim_detail_serializer && data.claim_detail_serializer.death_decision.length > 0 && data.claim_detail_serializer.death_decision != null && data.claim_detail_serializer.claim_status != "Reject"){
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
														{data && data.claim_detail_serializer.death_decision && data.claim_detail_serializer.death_decision[0].decision}
														{/* {data && data.policy.number} */}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Decision Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.death_decision && DateFormatMMM(data.claim_detail_serializer.death_decision[0].decision_date)}
														{/* {data && data.policy.number} */}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Submit</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.death_decision && MoneyFormat(data.claim_detail_serializer.death_decision[0].amount_submit)}
														{/* {data && data.policy.status} */}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Approved</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.death_decision && MoneyFormat(data.claim_detail_serializer.death_decision[0].amount_approve)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Amount Reject</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer.death_decision && MoneyFormat(data.claim_detail_serializer.death_decision[0].amount_reject)}
														{/* {data && data.policy.agent.code} */}
													</div>
												</div>
											</form>
										</div>
									</div>	
								</div>	
							</div>;
							decision.push(decision_type);
	} else if(data && data.claim_detail_serializer && data.claim_detail_serializer.claim_status == "Reject" && data.claim_detail_serializer.reject_decision.length > 0 && data.claim_detail_serializer.reject_decision != null){
		let reject_dec = "";
		if(data && data.claim_detail_serializer && data.claim_detail_serializer.claim_type == "Death Claim" && data.claim_detail_serializer.death_decision.length > 0 && data.claim_detail_serializer.death_decision != null ){
			reject_dec = data && data.claim_detail_serializer.death_decision && data.claim_detail_serializer.death_decision[0].decision;
		}else{
			reject_dec = data && data.claim_detail_serializer.hospital_decision && data.claim_detail_serializer.hospital_decision[0].decision;
		}
		let reject_hist = [];
		let data_reject = data && data.claim_detail_serializer && data.claim_detail_serializer.reject_decision;
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
													{/* {data && data.claim_detail_serializer.reject_decision && data.claim_detail_serializer.death_decision[0].decision} */}

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
	
	if (data && data.claim_detail_serializer && data.claim_detail_serializer.investigation != null && data.claim_detail_serializer.investigation == 0){
		let checkbox = <input type="checkbox" disabled id="investigation" name="investigation" style={{width:"25px", height:"25px", margin:"0px"}} />
		investigation_check.push(checkbox);
	} else {
		let checkbox = <input type="checkbox" disabled id="investigation" name="investigation" style={{width:"25px", height:"25px", margin:"0px"}} checked />
		investigation_check.push(checkbox);

	}
	
	if (data && data.claim_detail_serializer && data.claim_detail_serializer.benefit_coordination != null && data.claim_detail_serializer.benefit_coordination == 0){
		let checkbox2 = <input type="checkbox" disabled id="koordinasi_manfaat" name="koordinasi_manfaat" style={{width:"25px", height:"25px", margin:"0px"}} />
		benefit_check.push(checkbox2);
	} else {
		let checkbox2 = <input type="checkbox" disabled id="koordinasi_manfaat" name="koordinasi_manfaat" style={{width:"25px", height:"25px", margin:"0px"}} checked/>
		benefit_check.push(checkbox2);

	}
	
	if (data && data.claim_detail_serializer && data.claim_detail_serializer.claim_50 != null && data.claim_detail_serializer.claim_50 == 0){
		let checkbox3 = <input type="checkbox" disabled id="claim_50" name="claim_50" style={{width:"25px", height:"25px", margin:"0px"}} />
		claim_50_check.push(checkbox3);
	} else {
		let checkbox3 = <input type="checkbox" disabled id="claim_50" name="claim_50" style={{width:"25px", height:"25px", margin:"0px"}} checked/>
		claim_50_check.push(checkbox3);

	}

	debugger;
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

					<LeftMenuClaimTracking active="0" claim_id={this.props.params.claim_id} policy_id={this.props.params.policy_id}/>

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
														{data && data.claim_detail_serializer && data.claim_detail_serializer.policy_no}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim Reg No.</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.claim_reg_no}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Holder</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.policy_holder}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Insured</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.insured}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Branch</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.branch}
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
														{data && data.claim_detail_serializer && data.claim_detail_serializer.claim_status}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim Type</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.claim_type}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim Product</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.product}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Branch Receive Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && DateFormat(data.claim_detail_serializer.branch_receive_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Complete Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && DateFormat(data.claim_detail_serializer.completed_date)}
													</div>
												</div>			
											</form>
										</div>
									</div>
								</div>
								<hr />
								<h3 style={{marginTop:'0px', marginBottom:'20px'}}>Claim Info</h3>
								<div className="boxHeader" style={{borderBottom:'none'}}>
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Hospital</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.hospital}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Initial Amount Submit</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && MoneyFormat(data.claim_detail_serializer.initial_amount_submit)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim Currency</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.claim_currency}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claim 50%</label>
													</div>
													<div className="col-sm-6" style={{fontSize:'20px'}}>
														{claim_50_check}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Koordinasi Manfaat</label>
													</div>
													<div className="col-sm-6" style={{fontSize:'20px'}}>
														{benefit_check}
													</div>
												</div>	
                                                <div className="form-group">
                                                    <div className="col-sm-6 bg-info">
                                                        <label>Investigation</label>
                                                    </div>
													<div className="col-sm-6" style={{fontSize:'20px'}}>
														{investigation_check}
                                                        {/* <input type="checkbox" disabled id="investigation" name="investigation" style={{width:'25px', height:'25px', margin:'0px'}}/> */}
													</div>
                                                </div>
												
											</form>
										</div>
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Event Date From</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && DateFormat(data.claim_detail_serializer.event_date_start)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Event Date To</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && DateFormat(data.claim_detail_serializer.event_date_end)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Event Date Days</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && DateFormat(data.claim_detail_serializer.event_date_days)}
													</div>
												</div>			
											</form>
										</div>
									</div>
								</div>
								<hr />
								<h3 style={{marginTop:'0px', marginBottom:'20px'}}>Claimant Info</h3>
								<div className="boxHeader" style={{borderBottom:'none'}}>
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claimant Name</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.claimant_name}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claimant Mobile</label>
													</div>

													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.claimant_mobile}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Claimant Email</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.claimant_email}
													</div>
												</div>
												
											</form>
										</div>
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Bank Name</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.bank_name}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Bank Account</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.bank_account_number}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Bank Account Name</label>
													</div>
													<div className="col-sm-6">
														{data && data.claim_detail_serializer && data.claim_detail_serializer.bank_account}
													</div>
												</div>			
											</form>
										</div>
									</div>
								</div>
							</div>
							<hr />
					{/* {decision} */}
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

export default claim_data;
