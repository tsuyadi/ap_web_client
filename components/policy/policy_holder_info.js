'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuPolicy from '../../common_components/menu_v2/left_menu_policy';
import Footer from '../../common_components/footer';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import {DateFormat, MoneyFormat} from '../../common_components/helper/formatter';

class policy_holder_info extends React.Component {
	constructor(props){
		super(props);
        this.openMenu = this.openMenu.bind(this);

	}

	componentDidMount = () => {
		this.getData(this.props.params.policy_id);
	}

	getData = (policy_id) => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.policy_holder_info,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
						data: {policy_id: policy_id},
            success: (response) => {
              $('#loading').modal('hide');
              this.setState({
              	data:response.content
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

	state = {
		data: null
	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }
	render(){
		let data = this.state.data;
		let address = null;
		let address2 = null;
		let mobile_phone = null;
		let business_phone = null;
		let phone = null;

		let policy = null;
		policy = {
				premium_period : localStorage.getItem('premium_period'),	
				payment_mode : localStorage.getItem('payment_mode'),	
				payment_method : localStorage.getItem('payment_method'),	
				effective_date : localStorage.getItem('effective_date'),	
				currency : localStorage.getItem('currency'),	
				regular_premium : localStorage.getItem('regular_premium'),	
				regular_topup : localStorage.getItem('regular_topup'),	
				total_premium : localStorage.getItem('total_premium'),	
				premium_duedate : localStorage.getItem('premium_duedate'),	
				// // contract_date : localStorage.getItem('contract_date'),	

				policy_no : localStorage.getItem('policy_no'),	
				policy_holder : localStorage.getItem('policy_holder'),	
				insured : localStorage.getItem('insured'),	
				spaj_number : localStorage.getItem('spaj_number'),	
				agent_code : localStorage.getItem('agent_code'),	
				policy_status : localStorage.getItem('policy_status'),	
				agent_status : localStorage.getItem('agent_status'),	
				agent_name : localStorage.getItem('agent_name')	
		};

		if(data)
		{
			try 
			{
				$.map(data.policy.policy_holder.clientaddress_set, (value) => {
					if(value.is_active)
					{
						address = value.address + ' ' + value.zipcode;
					}
				});
			}
			catch(e)
			{
				address = '';
			}
		}

		if(data)
		{
			try 
			{
				$.map(data.policy.policy_holder.correspondence_set, (value) => {
					if(value.is_active)
					{
						address2 = value.address + ' ' + value.zipcode;
					}
				});
			}
			catch(e)
			{
				address2 = '';
			}
		}

		if(data)
		{
			try
			{
				$.map(data.policy.policy_holder.clientphone_set, (value) => {
					switch (value.type) {
						case "Mobile":
							if(value.is_active)
							{
								mobile_phone = value.number;
							}
							break;
						case "Fix Line":
							if(value.is_active)
							{
								phone = value.number;
							}
							break;
					}
				});
			}
			catch(e)
			{

			}
		}

		let bank_name = '';
		let account_number = '';
		let account_name = '';

		try
		{
			bank_name = data.policy.policy_holder.clientbank_set[0].name;
			account_number = data.policy.policy_holder.clientbank_set[0].account_number;
			account_name = data.policy.policy_holder.clientbank_set[0].account_holder_name;
		}
		catch(e)
		{

		}

		
		var holder_email = "";

		try{
			holder_email = data.policy.policy_holder.email == "client@tokiomarine.co.id" ? "" : data.policy.policy_holder.email;
		}catch(e){

		}

		return (
		<div className="wrap2">
			<SubmitModal />
			<FeatureModal />
            <TopMenuNewBusinessDetail opsi="policyt" title="Policy Holder Info" id={this.props.params.policy_id} />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/policy/list_policies">Policy Tracking</a></li>
							<li className="active">Policy Holder Info</li>
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

					<LeftMenuPolicy active="1" policy_id={this.props.params.policy_id}/>

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
														<label>Policy status</label>
													</div>
													<div className="col-sm-6">
														{policy.policy_status}
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
											</form>
										</div>
									</div>
								</div>
								<div className="boxBody">
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Name</label>
													</div>

													<div className="col-sm-6">
														{data && data.policy.policy_holder.name}
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Gender</label>
													</div>

													<div className="col-sm-6">
														{data && data.policy.policy_holder.gender}
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Birth Date</label>
													</div>

													<div className="col-sm-6">
														{data && DateFormat(data.policy.policy_holder.birth_date)}
													</div>
												</div>

												{/*<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Address</label>
													</div>

													<div className="col-sm-6">
														{address}
													</div>
												</div>*/}

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Address 1</label>
													</div>

													<div className="col-sm-6">
														{address}
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Address 2</label>
													</div>

													<div className="col-sm-6">
														{address2}
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Phone</label>
													</div>

													<div className="col-sm-6">
														{phone}
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Mobile Phone</label>
													</div>

													<div className="col-sm-6">
														{mobile_phone}
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Business Phone</label>
													</div>

													<div className="col-sm-6">
														{business_phone}
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Email</label>
													</div>

													<div className="col-sm-6">
														{holder_email}
													</div>
												</div>
											</form>
										</div>

										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Bank</label>
													</div>

													<div className="col-sm-6">
														{bank_name}
													</div>
												</div>


												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>No Rekening</label>
													</div>

													<div className="col-sm-6">
														{account_number}
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Account Name</label>
													</div>

													<div className="col-sm-6">
														{account_name}
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

			<Footer />

		</div>
		);
	}
}

export default policy_holder_info;
