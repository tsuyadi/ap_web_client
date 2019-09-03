'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import {DateFormat} from '../../common_components/helper/formatter';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuNewBusinessDetail from '../../common_components/menu_v2/left_menu_new_business_detail';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';

import ModalMessage from '../../common_components/modal/modal_message';

import FeatureModal from '../../common_components/modal/feature_modal';


class newbusiness_policy_holder_info extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			spaj_id: this.props.params.spaj_id,
			data: null
		}

		this.getPhone = this.getPhone.bind(this);
		this.getBank = this.getBank.bind(this);
		this.getAddress = this.getAddress.bind(this);

		this.submitIssue = this.submitIssue.bind(this);
		this.clearForm = this.clearForm.bind(this);
        this.openMenu = this.openMenu.bind(this);
	}

	componentWillMount(){
		CekAuth();
	}

	getPhone(list, type){
		try{
			if(list == null || list.length == 0){
				return "";
			}else{
				for(var i = 0; i < list.length; i++){
					if(list[i].type == type && list[i].is_active == true){
						return list[i].number;
					}
				}
				return "";
			}
		}catch(e){
			return "";
		}
	}

	getBank(list, column){
		try
		{
			// // debugger in getBank
			// // debugger;
			return list.policy_holder.clientbank_set[0][column];
		}catch(e){
			return "";
		}
	}

	getAddress(list){
		// // debugger in getAddress()
		// // debugger;
		try{
			if(list.length > 0){
				return list[0].address;
			}
			else{
				return "";
			}
		}catch(e){
			return "";
		}
	}

	getLifeAssured(list){
		try{
			if(list.length > 0){
				return list[0].person.name;
			}else{
				return "";
			}
		}catch(e){
			return "";
		}
	}

	componentDidMount(){
		$('#loading').modal('show');
		$.ajax({
            url: api_route.spaj_policyHolder,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {spaj_id:this.state.spaj_id},
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');
              this.setState({
              		agent_name: response.content.spaj.agent == null ? '' : response.content.spaj.agent.full_name,
              		agent_code: response.content.spaj.agent == null ? '' : response.content.spaj.agent.code,
              		spaj_number: response.content.spaj.number,
              		spaj_status: response.content.spaj.status,
					submit_date: response.content.spaj.submit_date,
					regular_premium: response.content.spaj.policy == null ? '' : response.content.spaj.policy.regular_premium,
					total_premium: response.content.spaj.policy == null ? '' : response.content.spaj.policy.total_premium,
					effective_date: response.content.spaj.policy == null ? '' : response.content.spaj.policy.affective_date,
					regular_topup: response.content.spaj.policy == null ? '' : response.content.spaj.policy.regular_topup,
					sum_assured: response.content.spaj.policy == null ? '' : response.content.spaj.policy.sum_assured,
					payment_method: response.content.spaj.policy == null ? '' : response.content.spaj.policy.payment_method,
					policy_no: response.content.spaj.policy == null ? '' : response.content.spaj.policy.number,
					policy_status: response.content.spaj.status,
					life_assured: response.content.spaj.policy == null ? '' : this.getLifeAssured(response.content.spaj.policy.lifeassured_set),
					policy_holder_name: response.content.spaj.policy == null ? '' : response.content.spaj.policy.policy_holder.name,
					policy_holder_gender: response.content.spaj.policy == null ? '' : response.content.spaj.policy.policy_holder.gender,
					policy_holder_email: response.content.spaj.policy == null ? '' : response.content.spaj.policy.policy_holder.email,
					policy_holder_birthdate: response.content.spaj.policy == null ? '' : response.content.spaj.policy.policy_holder.birth_date,
					policy_holder_address: response.content.spaj.policy == null ? '' : this.getAddress(response.content.spaj.policy.policy_holder.clientaddress_set),
					policy_holder_mobile_phone: response.content.spaj.policy == null ? '' : this.getPhone(response.content.spaj.policy.policy_holder.clientphone_set, 'Mobile'),
					policy_holder_fix_phone:response.content.spaj.policy == null ? '' :  this.getPhone(response.content.spaj.policy.policy_holder.clientphone_set, 'Fixline'),
					policy_holder_bank : response.content.spaj.policy == null ? '' : this.getBank(response.content.spaj.policy, 'name'),
					policy_holder_bank_cabang : '',
					policy_holder_bank_norek : response.content.spaj.policy == null ? '' : this.getBank(response.content.spaj.policy, 'account_number'),
					policy_holder_bank_account : response.content.spaj.policy == null ? '' : this.getBank(response.content.spaj.policy, 'account_holder_name')
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

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	render(){

		let issueForm = [];

		issueForm.push(

			<div id="submitIssueDiv">
				<div id="inform" style={{'display':'none'}} className="form-group">
					<p className="alert alert-success">Thank you, your inquiry has been submitted.</p>
					<button type="button" className="btn btn-danger" data-dismiss="modal" >Close</button>
				</div>
				<div id="submitfom" className="form-group">
					<p>Please submit issues related to your account inaccuracy and system functionalities
					<br/><i>Silahkan isi saran dan pertanyaan anda mengenai data akun dan fungsional sistem</i></p>
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
		<div className="wrap2">

            <TopMenuNewBusinessDetail title="Policy Holder Info" opsi="spajt" id={this.props.params.spaj_id} />
			<ModalMessage id="submit_ap" title="Submit Issue" message={issueForm} />
			<FeatureModal />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/newbusiness/">SPAJ Tracking</a></li>
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

					<LeftMenuNewBusinessDetail active="1" spaj_id={this.props.params.spaj_id} />

					<div className="main-content boxShadow">
						<div className="row">
								<div className="col-sm-12">
									<div className="col-sm-6">
										<form className="form-horizontal">
											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>SPAJ No</label>
												</div>

												<div className="col-sm-6">
													{this.state.spaj_number}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Agent Name</label>
												</div>

												<div className="col-sm-6">
													{this.state.agent_name}
												</div>
											</div>

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

									<div className="col-sm-6">
										<form className="form-horizontal">
											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Policy No</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_no}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Policy Status</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_status}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Insured</label>
												</div>

												<div className="col-sm-6">
													{this.state.life_assured}
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>

							<hr />

							<div className="row">
								<div className="col-sm-12">
									<div className="col-sm-6">
										<form className="form-horizontal">
											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Name</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_name}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Gender</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_gender}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Birth Date</label>
												</div>

												<div className="col-sm-6">
													{DateFormat(this.state.policy_holder_birthdate)}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Address</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_address}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Phone</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_fix_phone}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Mobile Phone</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_mobile_phone}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Business Phone</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_fix_phone}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Email</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_email}
												</div>
											</div>
										</form>
									</div>

									<div className="col-sm-6">
										<form className="form-horizontal">
											<div className="form-group">
												<div className="col-sm-12 bg-info">
													<label>Bank Account Info</label>
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Bank</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_bank}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>No Rekening</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_bank_norek}
												</div>
											</div>

											<div className="form-group">
												<div className="col-sm-6 bg-info">
													<label>Account Name</label>
												</div>

												<div className="col-sm-6">
													{this.state.policy_holder_bank_account}
												</div>
											</div>
										</form>
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

export default newbusiness_policy_holder_info;
