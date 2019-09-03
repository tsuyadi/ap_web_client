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

class incomplete_doc extends React.Component {
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
            url: api_route.incomplete_document,
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
			
			console.log("masuk incomplete");  
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
	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	// showStatus(){
	// 	{StatusPolicy}
	// }
	render(){
	let data = this.state.data && this.state.data.incomplete_doc_serializer;
	let incomplete_doc = [];
    if(data != null && data.length > 0){
		let notes = data;

		$.map(notes, (value, index) => {
			incomplete_doc.push(
				<tr key={index}>
					<td>{(index + 1)}</td>
					<td>{value.document_name}</td>
					<td>{value.type}</td>
					<td>{value.status}</td>
				</tr>
			);
		});
		
		
	}else {
		let row = <tr>
					<td colSpan="4" style={{'textAlign':'center'}}>No data.</td>
				</tr>
		incomplete_doc.push(row);

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

					<LeftMenuClaimTracking active="1" claim_id={this.props.params.claim_id} policy_id={this.props.params.policy_id}/>

					<div className="main-content boxShadow">
						<div className="row">
							<div className="col-sm-12">
								<h3 style={{marginTop:'0px', marginBottom:'20px'}}>Document</h3>
								
								<div className="boxBody">
									<div className="row">
										<div className="col-sm-12">
											<div className="table-responsive">
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">No</th>															
															<th className="header_table ">Document Name</th>
															<th className="header_table ">Type</th>
															<th className="header_table ">Status</th>
														</tr>
													</thead>
													<tbody>     
                                                    {/* <tr>
                                                        <td colSpan="4" style={{'textAlign':'center'}}>No data.</td>
                                                    </tr> */}
														{incomplete_doc}               
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

export default incomplete_doc;
