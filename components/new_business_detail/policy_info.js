'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuNewBusinessDetail from '../../common_components/menu_v2/left_menu_new_business_detail';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';

import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';

class newbusiness_policy_info extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			spaj_id: this.props.params.spaj_id,
			data: null,
		}
        this.openMenu = this.openMenu.bind(this);
	}

	componentWillMount(){
		CekAuth();
	}

	componentDidMount(){
		$('#loading').modal('show');
		$.ajax({
            url: api_route.spaj_policyInfo,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {spaj_id:this.state.spaj_id},
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');
              
			  var insured = "";
			  try
			  {
				  insured = response.content.spaj.policy ? response.content.spaj.policy.lifeassured_set[0].person.name : '-';
			  }
			  catch(e)
			  {
				  insured = "";
			  }

			  try
			  {


				// // debugger;

				localStorage.setItem('spaj_no', response.content.spaj.number);
				// localStorage.getItem('policy_holder', response.content.spaj.policy.holder);
				localStorage.setItem('agent_name', response.content.spaj.agent == null ? '' : response.content.spaj.agent.full_name);
				localStorage.setItem('policy_no', response.content.spaj.policy && response.content.spaj.policy.number || '-');
				localStorage.setItem('life_assured', insured);
				localStorage.setItem('agent_code', response.content.spaj.agent == null ? '' : response.content.spaj.agent.code);
			  }
			  catch(e)
			  {

			  }

              this.setState({
              		agent_name: response.content.spaj.agent == null ? '' : response.content.spaj.agent.full_name,
              		agent_code: response.content.spaj.agent == null? '' : response.content.spaj.agent.code,
              		spaj_number: response.content.spaj.number,
              		spaj_status: response.content.spaj.status,
              		spaj_status_date: response.content.spaj.status_date,
					submit_date: response.content.spaj.submit_date,
					regular_premium: response.content.spaj ? response.content.spaj.regular_premium : '-',
					total_premium: response.content.spaj ? response.content.spaj.total_premium : '-',
					effective_date: response.content.spaj.policy ? response.content.spaj.policy.affective_date : '-',
					regular_topup: response.content.spaj ? response.content.spaj.regular_topup : '-',
					sum_assured: response.content.spaj.policy ? response.content.spaj.policy.sum_assured : '-',
					payment_method: response.content.spaj.policy ? response.content.spaj.policy.payment_method : '-',
					payment_mode: response.content.spaj.policy ? response.content.spaj.policy.payment_mode : '-',
					branch: response.content.spaj.branch ? response.content.spaj.branch : '-',
					policy_no: response.content.spaj.policy ? response.content.spaj.policy.number : '-',
					policy_status: response.content.spaj.policy ? response.content.spaj.policy.status : '-',
					product_name: response.content.spaj.policy ? response.content.spaj.policy.product.name : '-',
					product_type: response.content.spaj.policy ? response.content.spaj.policy.product.type : '-',
					coverage_period : response.content.spaj.policy ? response.content.spaj.policy.coverage_period : '-',
					premium_period : response.content.spaj.policy ? response.content.spaj.policy.premium_period : '-',
					fu_notes : response.content.spaj.policy ? response.content.spaj.policy.follow_up_notes : [],
					product_comp : response.content.spaj.policy ? response.content.spaj.policy.components : [],
					product_comp_lr : response.content.spaj.policy ? response.content.spaj.policy.components_lr : [],
					life_assured: insured,
              	});

            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
            	window.location.href = window.location.href.split('#')[0] + '#/newbusiness';
              }
            }
        });
	}


    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	render(){
		var fu_arr = [];
		var comp_arr = [];
		var comp_arr_lr = [];

		var num = 0;
		if(this.state.fu_notes != undefined && this.state.fu_notes.length > 0){
			
			this.state.fu_notes.map(function(e, t){
				++num;
				
				let recDate = e.received_date == '1990-01-01' || e.received_date == '1900-01-01' ? '' : e.received_date;

				let status = e.flag_stat == '1' ? 'Not Receive' : 'Receive'; 

				fu_arr.push(
					<tr>
						<td>{(t+1)}</td>
						<td>{e.note}</td>
						<td>{DateFormat(e.follow_date)}</td>
						<td>{status}</td>
						<td>{recDate}</td>				
					</tr>
				);
			});
		}

		num = 0;
		if(this.state.product_comp != undefined && this.state.product_comp.length > 0){
			++num;
			this.state.product_comp.map(function(t, e){
				
				comp_arr.push(
					<tr>
						<td>{(e+1)}</td>
						<td>{t.product_name}</td>
						<td>{MoneyFormat(t.sum_assured)}</td>
						<td>{t.insured.name}</td>
						<td>{t.status}</td>
					</tr>
				);
			});
		}
		
		if(this.state.product_comp_lr != undefined && this.state.product_comp_lr.length > 0){
			// ++num;
			this.state.product_comp_lr.map(function(t, e){
				
				comp_arr_lr.push(
					<tr>
						<td>{(e+1)}</td>
						<td>{t.product_name}</td>
						<td>{MoneyFormat(t.sum_assured)}</td>
						<td>{t.insured.name}</td>
						<td>{t.status}</td>
					</tr>
				);
			});
		}

		return (
		<div className="wrap2">
			<SubmitModal />
            <TopMenuNewBusinessDetail title="SPAJ Info" opsi="spajt" id={this.props.params.spaj_id} />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/newbusiness/">SPAJ Tracking</a></li>
							<li className="active">SPAJ Info</li>
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

					<LeftMenuNewBusinessDetail active="0" spaj_id={this.props.params.spaj_id} />

					<div className="main-content">
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Agent Name</label>
											</div>
											<div className="col-sm-6">
												{this.state.agent_name}
											</div>
										</div>
									</form>
								</div>

								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Agent Code</label>
											</div>
											<div className="col-sm-6">
												{this.state.agent_code}
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

						<hr />

						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-4">
									<form className="form-horizontal">

                                        <div className="form-group">
											<div className="col-sm-6">
												<label>SPAJ No</label>
											</div>
											<div className="col-sm-6">
												{this.state.spaj_number}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy No</label>
											</div>
											<div className="col-sm-6">
												{this.state.policy_no}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>SPAJ Receive Date</label>
											</div>
											<div className="col-sm-6">
												{DateFormat(this.state.submit_date)}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>SPAJ Status</label>
											</div>
											<div className="col-sm-6">
												{this.state.spaj_status}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>SPAJ Status Date</label>
											</div>
											<div className="col-sm-6">
												{DateFormat(this.state.spaj_status_date)}
											</div>
										</div>
									</form>
								</div>

								<div className="col-sm-4">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6">
												<label>Sum Insured</label>
											</div>
											<div className="col-sm-6">
												{MoneyFormat(this.state.sum_assured)}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Coverage Period</label>
											</div>
											<div className="col-sm-6">
												{this.state.coverage_period}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Premium Period</label>
											</div>
											<div className="col-sm-6">
												{this.state.premium_period}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Payment Mode</label>
											</div>
											<div className="col-sm-6">
												{this.state.payment_mode}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6">
												<label>Branch</label>
											</div>
											<div className="col-sm-6">
												{this.state.branch}
											</div>
										</div>
									</form>
								</div>

								<div className="col-sm-4">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6">
												<label>Payment Method</label>
											</div>
											<div className="col-sm-6">
												{this.state.payment_method}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Regular Premium</label>
											</div>
											<div className="col-sm-6">
												{MoneyFormat(this.state.regular_premium)}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Regular Top-Up</label>
											</div>
											<div className="col-sm-6">
												{MoneyFormat(this.state.regular_topup)}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Total Premium</label>
											</div>
											<div className="col-sm-6">
												{MoneyFormat(this.state.total_premium)}
											</div>
										</div>
									</form>
								</div>

							</div>
						</div>

						<div className="row">
							<div className="col-sm-12">
								<h3>Product Info</h3>

								<div className="table-responsive">
									<table className="table table-bordered table-striped table-hover table-box">
										<thead>
											<tr>
												<th className="header_table">No</th>
												<th className="header_table">Product Name</th>
												<th className="header_table">Sum Insured</th>
												<th className="header_table">Insured</th>
												<th className="header_table">Status</th>
											</tr>
										</thead>
										<tbody>
											{comp_arr}
										</tbody>
									</table>
								</div>
								{ (this.state.product_comp_lr != undefined && this.state.product_comp_lr.length > 0) ?
								<div className="table-responsive">
									<table className="table table-bordered table-striped table-hover table-box">
										<thead>
											<tr>
												<th className="header_table">No</th>
												<th className="header_table">Product Name</th>
												<th className="header_table">Sum Insured</th>
												<th className="header_table">Insured</th>
												<th className="header_table">Status</th>
											</tr>
										</thead>
										<tbody>
											{comp_arr_lr}
										</tbody>
									</table>
								</div> : '' }
							</div>
						</div>

						<div className="row">
							<div className="col-sm-12">
								<h3>Follow-Up Notes</h3>

								<div className="table-responsive">
									<table className="table table-bordered table-striped table-hover table-box">
										<thead>
											<tr>
												<th className="header_table ">No</th>
												<th className="header_table ">Description</th>
												<th className="header_table ">Create Date</th>
												<th className="header_table ">Status</th>
												<th className="header_table ">Receive Date</th>
											</tr>
										</thead>
										<tbody>
											{fu_arr}
										</tbody>
									</table>
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

export default newbusiness_policy_info;
