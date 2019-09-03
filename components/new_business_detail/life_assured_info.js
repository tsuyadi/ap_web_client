'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import {DateFormat, Formatter} from '../../common_components/helper/formatter';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuNewBusinessDetail from '../../common_components/menu_v2/left_menu_new_business_detail';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';

import ModalMessage from '../../common_components/modal/modal_message';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';

class newbusiness_life_assured_info extends React.Component {
	constructor(props){
		super(props);

		this.submitIssue = this.submitIssue.bind(this);
		this.clearForm = this.clearForm.bind(this);
        this.openMenu = this.openMenu.bind(this);
	}

	componentWillMount = () => {
		CekAuth();
	}

	componentDidMount = () => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.spaj_policyAssured,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {spaj_id:this.state.spaj_id},
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');
				if(response.content.spaj.policy!=null){
					//Formated Birth Date
	              	let birth_date = new Date(response.content.spaj.policy.policy_holder.birth_date);
					let dd = birth_date.getDate();
					let mm = birth_date.getMonth()+1; //January is 0!
					let yyyy = birth_date.getFullYear();

					if(dd<10){dd='0'+dd} 
					if(mm<10){mm='0'+mm} 
					let formated_birthdate = dd+'-'+mm+'-'+yyyy;

					//Map User Phone
					let phone 				= response.content.spaj.policy.policy_holder.clientphone_set;
					let user_phone 			= "-";
					let user_mobile_phone 	= "-";
					let user_business_phone = "-";
					$.map(phone, (value, index) => {
						if(value.is_active){
							if(value.type != "Mobile"){
								user_phone = value.number;
							}
							else{
								user_mobile_phone 	= value.number;
								user_business_phone = value.number;
							}
						}
			        });

					let address = '';
					let life_assured = '';

					try{
						address = response.content.spaj.policy.policy_holder.clientaddress_set[0].address;
					}catch(e){

					}

					try{
						life_assured = response.content.spaj.policy.lifeassured_set[0].person.name;
					}catch(e){
						
					}

					// Set initial state
			        this.setState({
			        	spaj_id: response.content.spaj.id,
	              		spaj_number: response.content.spaj.number,
						policy_number: response.content.spaj.policy.number,
						policy_holder: response.content.spaj.policy.policy_holder.name,
						agent_code: response.content.spaj.agent.code,
						agent_name: response.content.spaj.agent.full_name,
						life_assured: life_assured,
						user_name: response.content.spaj.policy.policy_holder.name,
						user_gender: (response.content.spaj.policy.policy_holder.gender == 1 ? "Male" : "Female"),
						user_address: address,
			        	user_birthdate: formated_birthdate,
			        	user_phone: user_phone,
			        	user_mobile_phone: user_mobile_phone,
			        	user_business_phone: user_business_phone,
						policy_status: response.content.spaj.status,
						entry_age : response.content.spaj.policy.lifeassured_set== null || response.content.spaj.policy.lifeassured_set == [] || (response.content.spaj.policy.lifeassured_set).length== 0 ? '-' : response.content.spaj.policy.lifeassured_set[0].life_assured_age == undefined || response.content.spaj.policy.lifeassured_set[0].life_assured_age == null ? '-' : response.content.spaj.policy.lifeassured_set[0].life_assured_age,
					});
				} 	
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
            	window.location.href = window.location.href.split('#')[0] + '#/newbusiness';
              }
            }
        });
	}

	state = {
		spaj_number: "-",
		policy_number: "-",
		policy_holder: "-",
		agent_code: "-",
		agent_name: "-",
		life_assured: "-",
		user_name: "-",
		user_gender: "-",
		user_birthdate: "-",
		user_address: "-",
		user_email: "-",
		user_phone: "-",
		user_mobile_phone: "-",
		user_business_phone: "-",
		policy_status: "-",
		spaj_id: this.props.params.spaj_id,
		entry_age : "-"
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
			
            <TopMenuNewBusinessDetail title="Life Assured Info"  opsi="spajt" id={this.props.params.spaj_id}  />
			<SubmitModal />
			<FeatureModal />
			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/newbusiness/">SPAJ Tracking</a></li>
							<li className="active">Life Assured Info</li>
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
				
					<LeftMenuNewBusinessDetail active="2" spaj_id={this.props.params.spaj_id} />
					
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
												{this.state.policy_number}
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
												<label>Policy Holder</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.policy_holder}
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
												{this.state.user_name}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Gender</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.user_gender}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Birth Date</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.user_birthdate}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Entry Age</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.entry_age}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Address</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.user_address}
											</div>
										</div>
									</form>
								</div>
								
								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Phone</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.user_phone}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Mobile Phone</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.user_mobile_phone}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Business Phone</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.user_business_phone}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Email</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.user_email}
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

export default newbusiness_life_assured_info;