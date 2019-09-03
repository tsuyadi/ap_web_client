'use strict'

import {CheckAgentType,DateFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';

import TopMenuProfile from '../../common_components/menu_v2/top_menu_profile';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';
import ModalMessage from '../../common_components/modal/modal_message';

class profile extends React.Component {
	constructor(props){
		super(props);
		this.changePasswordDialog = this.changePasswordDialog.bind(this);
		this.changePasswordAction = this.changePasswordAction.bind(this);

		this.submitIssue = this.submitIssue.bind(this);
		this.clearForm = this.clearForm.bind(this);

	}

	componentWillMount = () => {
		CekAuth();
	}

	state = {
			ch_old_password: "",
			ch_new_password: "",
			ch_new_password_conf: "",
			ch_status_s: "",
			ch_status_f: "",
			ch_name: localStorage.getItem('name'),
			ch_last_login: localStorage.getItem('last_login'),
			ch_username: localStorage.getItem('username'),
		  status_response : "",
		  disabled : "disabled",
		  name : null,
		  last_login : null,
		  agent_profile : null,
		  first_name: '-',
		  fullname: '-',
		  code: '-',
		  status:  '-',
		  gender: '-',
		  birth_date: '-',
		  religion: '-',
		  marital_status: '-',
		  id_number: '-',
		  npwp_number: '-',
		  ptkp_status: '-',
		  bank_account_no: '-',
		  bank_name: '-',
		  bank_holder_name: '-',
		  address: '-',
		  phone: '-',
		  mobile_phone: '-',
		  business_phone: '-',
		  email: '-',
		  rd: '-',
		  rm: '-',
		  sm: '-',
		  dm: '-',
		  recruiter: '-',
		  office_name: '-',
		  aaji_number: '-',
		  aaji_expired_date: '-',
		  user : [],
		  userLevel: ['Tokio Marine Management','Branch Admin','Senior Regional Sales Head','Regional Sales Head','Regional Director','Regional Manager','District Manager','Sales Manager','Financial Consultant']
	}

	componentDidMount = () => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.profile,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
            	console.log(response);
              $('#loading').modal('hide');
              this.setState({
              	name : localStorage.getItem('name'),
              	last_login : localStorage.getItem('last_login'),
              	agent_profile:response.content.agent_profile,
              	  fullname: response.content.user.first_name + ' ' + response.content.user.last_name,
              	  first_name: response.content.user.first_name,
              	  last_name: response.content.user.last_name,
				  code: response.content.agent_profile.code,
				  status:  response.content.agent_profile.status,
				  gender: response.content.agent_profile.gender,
				  birth_date: DateFormat(response.content.agent_profile.birth_date),
				  religion: response.content.agent_profile.religion,
				  marital_status: response.content.agent_profile.marital_status,
				  id_number: response.content.agent_profile.id_number,
				  npwp_number: response.content.agent_profile.npwp_number,
				  ptkp_status: response.content.agent_profile.ptkp_status,

				  // di set kalo null ga tampil
				  bank_account_no: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_no : '-'),
				  bank_name: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].name : '-'),
				  bank_holder_name: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_holder_name : '-'),
				  address: (response.content.agent_profile.address_set[0] ? response.content.agent_profile.address_set[0].address : '-'),
				  mobile_phone: (response.content.agent_profile.phone_set[0] ? response.content.agent_profile.phone_set[0].number : '-'),
				  business_phone: (response.content.agent_profile.phone_set[1] ? response.content.agent_profile.phone_set[1].number : '-'),
		  		  office_name: (response.content.agent_profile.branch != null ? (response.content.agent_profile.branch.name ? response.content.agent_profile.branch.name : '-') : ''),

				  email: response.content.user.email,
				  aaji_number: response.content.agent_profile.aaji_number,
				  aaji_expired_date: DateFormat(response.content.agent_profile.aaji_expired_date),
              	  user:response.content.user,
              	  level_user:response.content.user.level.type,
              	  level:response.content.user.level.parent,

				  // di set kalo null ga tampil
				  // rd: response.content.user.level.parent[1] ? response.content.user.level.parent[1].user : '-',
				  // rm: response.content.user.level.parent[2] ? response.content.user.level.parent[2].user : '-',
				  // dm: response.content.user.level.parent[3] ? response.content.user.level.parent[3].user : '-',
				  // sm: response.content.user.level.parent[4] ? response.content.user.level.parent[4].user : '-',

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
		e.preventDefault();
		$('#loading').modal('show');
		$.ajax({
            url: api_route.changeProfile,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token'),
		        'Content-Type':'application/json',
		        'Accept':'application/json'
		    },
		    data: JSON.stringify({
		    	"agent_profile": {
		    		"birth_date" : this.state.birth_date,
		    		"religion" : this.state.religion,
		    		"marital_status" : this.state.marital_status,
		    		"id_number" : this.state.id_number,
		    		"npwp_number" : this.state.npwp_number,
		    		"ptkp_status" : this.state.ptkp_status,
		    		"aaji_number": this.state.aaji_number,
        			"aaji_expired_date": this.state.aaji_expired_date,
		    		"bank_set" : [
		    			{
		    				"bank" : this.state.bank_name,
		    				"bank_account_number" : this.state.bank_account_no,
		    				"bank_account_holder" : this.state.bank_holder_name
		    			}
		    		],
		    		"address_set" : [
		    			{
		    				"address" : this.state.address,
		    				"zip_code" : ""
		    			}
		    		],
		    		"phone_set" : [
		    			{
		    				"type" : "Fix line",
		    				"number" : this.state.business_phone
		    			},
		    			{
		    				"type" : "Mobile",
		    				"number" : this.state.mobile_phone
		    			}
		    		]},
		    		"user" : {
		    			"first_name" : this.state.first_name,
		    			"last_name" : this.state.last_name,
		    			"email" : this.state.email
		    		},
		    		"support_document": [
						{
							"filename": "",
							"mimetype": "",
							"content": ""
						}
					]
		    }),
		    dataType: "json",
            contentType: "application/json",
            type: 'POST',
            success: (response) => {
			  $('#loading').modal('hide');
              this.setState({
          			status_response:"Successfully to update profile.",
          			disabled:"disabled"
          		});
            },
            error: (err, response) => {
				$('#loading').modal('hide');
              	this.setState({
          			status_response:"Failed to update profile.",
          			disabled:"disabled"
          		});
            	window.location.href = window.location.href.split('#')[0] + '#/profile';
            }
        });
	}

	handleChangeEdit = (e) => {
		this.setState({disabled: ""});
	}

	handleChangeBirthdate = (e) => {
		this.setState({birth_date: e.target.value});
	}

	handleChangeReligion = (e) => {
		this.setState({religion: e.target.value});
	}

	handleChangeMarital = (e) => {
		this.setState({marital_status: e.target.value});
	}

	handleChangeIdnumber = (e) => {
		this.setState({id_number: e.target.value});
	}

	handleChangeNpwpnumber = (e) => {
		this.setState({npwp_number: e.target.value});
	}

	handleChangePtkp = (e) => {
		this.setState({ptkp_status: e.target.value});
	}

	handleChangeBankno = (e) => {
		this.setState({bank_account_no: e.target.value});
	}

	handleChangeBankname = (e) => {
		this.setState({bank_name: e.target.value});
	}

	handleChangeBankholder = (e) => {
		this.setState({bank_holder_name: e.target.value});
	}

	handleChangeAddress = (e) => {
		this.setState({address: e.target.value});
	}

	handleChangeFixphone = (e) => {
		this.setState({business_phone: e.target.value});
	}

	handleChangeMobile = (e) => {
		this.setState({mobile_phone: e.target.value});
	}

	handleChangeAajino = (e) => {
		this.setState({aaji_number: e.target.value});
	}

	handleChangeAajiexp = (e) => {
		this.setState({aaji_expired_date: e.target.value});
	}

	handleChangeEmail = (e) => {
		this.setState({email: e.target.value});
	}

	emailChangeRequest(e){
		e.preventDefault();
		$('#loading').modal('show');
		$.ajax({
            url: api_route.emailChange,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    dataType: "json",
            type: 'POST',
            success: (response) => {
			  $('#loading').modal('hide');
			  if(response.status == 'OK')
			  {
				var tout = setTimeout(function(){
					
					$('#email-change-request').find(".modal-body").html('We have been received your request, please contact Tokio Marine Life Indonesia Customer Service at +62-21 2975 1800'); 
	        		$("#email-change-request").modal('show'); 
					clearTimeout(tout);
				}, 500);
			  }
			  else
			  {
				var tout = setTimeout(function(){
					$('#email-change-request').find(".modal-body").html('Something went wrong'); 
	        		$("#email-change-request").modal('show'); 
					clearTimeout(tout);
				}, 500);
			  }
              console.log(response);
            },
            error: (err, response) => {
				$('#loading').modal('hide');
              	console.log(err);
            	//window.location.href = window.location.href.split('#')[0] + '#/profile';
            }
        });
	}

	changePasswordDialog(e){
		e.preventDefault();
		$('#forgotPasswordModal').modal('show');
		
	}

	changePasswordAction(e){
		e.preventDefault();
		
		var error = 0;
		if(this.state.ch_new_password == "" || this.state.ch_new_password_conf == ""){
			alert("Fill all field");
			error = 1;
		}
		else if(this.state.ch_new_password != this.state.ch_new_password_conf){
			alert("New Password and Confirm New Password should be the same");
			error = 1;
		}
		else if(error == 0){
			$('#loading').modal('show');
			$.ajax({
	            url: api_route.passwordChange,
	            headers: {
			        'Authorization':'JWT '+sessionStorage.getItem('token'),
			        'Content-Type':'application/json',
			        'Accept':'application/json'
			    },
			    data: JSON.stringify({
			    	"username": this.state.ch_username,
			    	"old_password": this.state.ch_old_password,
			    	"new_password": this.state.ch_new_password
			    }),
			    dataType: "json",
	            contentType: "application/json",
	            type: 'POST',
	            success: (response) => {
				  $('#loading').modal('hide');
				  window.location.href = window.location.href.split('#')[0] + '#/profile';
				  alert("Successfully to change password.");
	              this.setState({ch_status_s:"Successfully to change password."});
				  $('#forgotPasswordModal').modal('hide');
	            },
	            error: (err, response) => {
					$('#loading').modal('hide');
				    alert("Failed to change password.");
	              	this.setState({
	              		ch_status_f:"Failed to change password.",
	              		ch_old_password:"",
	              		ch_new_password:"",
	              		ch_new_password_conf:""
	              	});
	            }
	        });
		}

	}

	handleChangeCurrent = (e) => {
	
		this.setState({ch_old_password: e.target.value});
	}

	handleChangeNew = (e) => {
		this.setState({ch_new_password: e.target.value});
	}

	handleChangeConf = (e) => {
		this.setState({ch_new_password_conf: e.target.value});
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
	
	render(){
		let agent_level = '-';
		let sm = '-';
		let dm = '-';
		let rm = '-';
		let rd = '-';
		if(this.state.agent_profile)
		{
			if($.isNumeric(this.state.user.level.type)){
				agent_level = this.state.userLevel[parseInt(this.state.user.level.type) - 1];
			}
			else
			{
				agent_level = this.state.agent_profile.user.Level.type;
			}
		}
		if(this.state.level)
		{
			$.map(this.state.level, (value, index) => {
				if(value.type == "Regional Director"){
              			rd = value.user;
				}
				else if(value.type == "District Manager"){
              			dm = value.user;
				}
				else if(value.type == "Sales Manager"){
              			sm = value.user;
				}
				else if(value.type == "Regional Manager"){
              			rm = value.user;
				}
	        }); 		
		}

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

			{/* Start Top Menu Section */}
			<TopMenuProfile username={this.state.name} lastlogin={this.state.last_login}/>
			{/* End Top Menu Section */}
			<ModalMessage id="submit_ap" title="Submit Issue" message={issueForm} />
			<div className="main-wrapper">
				<ol className="breadcrumb" style={{marginBottom: '5px'}}>
					 <li className="active">Profile</li>
				</ol>
				<div className="main">
					<div className="container-fluid personalData">
						<div className="title"><i className="fa fa-user"></i> Personal Data</div>
						<div className="row">
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">Agent Name</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.fullname} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Agent Code</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.code} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Agent Level</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={agent_level} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Agent Status</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.status} disabled />
									</div>
								</div>
							</form>
						  </div>
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">Sex</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="sex" value={this.state.gender} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Birthdate</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="birthdate" name="birth_date" value={this.state.birth_date} disabled={this.state.disabled} onChange={this.handleChangeBirthdate}/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Religion</label>
									<div className="col-sm-8">
										<select className="form-control" id="religion" name="religion" disabled={this.state.disabled} onChange={this.handleChangeReligion}>
											<option selected={this.state.religion == "Islam" ? "selected" : ""} value="Islam">Islam</option>
											<option selected={this.state.religion == "Kristen" ? "selected" : ""} value="Kristen">Kristen</option>
											<option selected={this.state.religion == "Katholik" ? "selected" : "" || this.state.religion == "Katolik" ? "selected" : ""} value="Katholik">Katholik</option>
											<option selected={this.state.religion == "Hindu" ? "selected" : ""} value="Hindu">Hindu</option>
											<option selected={this.state.religion == "Buddha" ? "selected" : ""} value="Buddha">Buddha</option>
											<option selected={this.state.religion == "Kong Hu Cu" ? "selected" : ""} value="Kong Hu Cu">Kong Hu Cu</option>
											<option selected={this.state.religion == "Lain-lain" ? "selected" : ""} value="Lain-lain">Lain-lain</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Marital Status</label>
									<div className="col-sm-8">
										<select className="form-control" id="marital_status" name="marital_status" disabled={this.state.disabled} onChange={this.handleChangeMarital}>
											<option selected={this.state.marital_status == "Belum Menikah" ? "selected" : ""} value="Belum Menikah">Belum Menikah</option>
											<option selected={this.state.marital_status == "Menikah" ? "selected" : ""} value="Menikah">Menikah</option>
											<option selected={this.state.marital_status == "Cerai" ? "selected" : ""} value="Cerai">Cerai</option>
											<option selected={this.state.marital_status == "Lainnya" ? "selected" : ""} value="Lainnya">Lainnya</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">ID No.</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="id_number" value={this.state.id_number} disabled={this.state.disabled} onChange={this.handleChangeIdnumber} />
									</div>
								</div>
							</form>
						  </div>
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">NPWP No.</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="npwp_number" value={this.state.npwp_number} disabled={this.state.disabled} onChange={this.handleChangeNpwpnumber} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">PTKP Status</label>
									<div className="col-sm-8">
										<select className="form-control" id="ptkp_status" name="ptkp_status" disabled={this.state.disabled} onChange={this.handleChangePtkp}>
											<option selected={this.state.ptkp_status == "Kawin" ? "selected" : ""} value="Kawin">Kawin</option>
											<option selected={this.state.ptkp_status == "Kawin Tidak Punya Anak" ? "selected" : ""} value="Kawin Tidak Punya Anak">Kawin Tidak Punya Anak</option>
											<option selected={this.state.ptkp_status == "Kawin Dengan Anak 1" ? "selected" : ""} value="Kawin Dengan Anak 1">Kawin Dengan Anak 1</option>
											<option selected={this.state.ptkp_status == "Kawin Dengan Anak 2" ? "selected" : ""} value="Kawin Dengan Anak 2">Kawin Dengan Anak 2</option>
											<option selected={this.state.ptkp_status == "Kawin Dengan Anak 3" ? "selected" : ""} value="Kawin Dengan Anak 3">Kawin Dengan Anak 3</option>
											<option selected={this.state.ptkp_status == "Lainnya" ? "selected" : ""} value="Lainnya">Lainnya</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Bank Account No.</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="bank_no" value={this.state.bank_account_no} disabled={this.state.disabled} onChange={this.handleChangeBankno} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Bank Name</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="bank_name" value={this.state.bank_name} disabled={this.state.disabled} onChange={this.handleChangeBankname} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4 twoline">Account Holder Name</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="bank_account" value={this.state.bank_holder_name} disabled={this.state.disabled} onChange={this.handleChangeBankholder} />
									</div>
								</div>
							</form>
						  </div>

						  <div className="clearfix"></div>
						  <div className="col-xs-12">
							<div className="form-group">
								<a href="#/update_password" className="btn btn-danger hidden-md hidden-lg"><i className="fa fa-lock"></i> Change Password</a>
								<a onClick={this.changePasswordDialog} className="btn btn-danger hidden-xs hidden-sm"><i className="fa fa-lock"></i> Change Password</a>
								{/*
								<button className="btn btn-warning" style={{marginLeft:'5px'}} onClick={this.emailChangeRequest.bind(this)}><i className="fa fa-envelope"></i> Change Email</button>
								*/}
							</div>
						  </div>
						  <div className="col-xs-12">
						  	<div className="form-group">
							  	
							  </div>
						  </div>
						</div>
					</div>

					<div className="container-fluid supportData">
						<div className="row">
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title"><i className="fa fa-phone"></i> Contact</div>
									<div className="col-xs-12">
										<form className="form-horizontal">
											<div className="form-group">
												<label className="col-sm-4 twoline">Address</label>
												<div className="col-sm-8">
													<textarea className="form-control" rows="2" value={this.state.address} disabled={this.state.disabled} onChange={this.handleChangeAddress}></textarea>
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Phone</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.phone} disabled />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Mobile Phone</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" name="mobile_phone" value={this.state.mobile_phone} disabled={this.state.disabled} onChange={this.handleChangeMobile} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Business Phone</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" name="fix_phone" value={this.state.business_phone} disabled={this.state.disabled} onChange={this.handleChangeFixphone} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Email Address</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" name="email" value={this.state.email} disabled={this.state.disabled} onChange={this.handleChangeEmail} />
												</div>
											</div>
											<div className="row">
												<div className="col-md-12">
													<p className="text-danger">If you need to change an email address, <br/>Please Contact Tokio Marine Agent Support at <b>( +62-21 2975 1800 )</b></p>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title"><i className="fa fa-bar-chart"></i> Structure</div>
									<div className="col-xs-12">
										<form className="form-horizontal">

										{(this.state.level_user == 9 && sm != '-'
									        ? <div className="form-group">
												<label className="col-sm-4 twoline">SM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={sm} disabled />
												</div>
											</div>
									        : ''
									    )}
										{((this.state.level_user == 9 || this.state.level_user == 8) && dm != '-'
									        ? <div className="form-group">
												<label className="col-sm-4 twoline">DM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={dm} disabled />
												</div>
											</div>
									        : ''
									    )}
										{((this.state.level_user == 9 || this.state.level_user == 8 || this.state.level_user == 7) && rm != '-'
									        ? <div className="form-group">
												<label className="col-sm-4 twoline">RM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={rm} disabled />
												</div>
											</div>
									        : ''
									    )}
										{((this.state.level_user == 9 || this.state.level_user == 8 || this.state.level_user == 7 || this.state.level_user == 6) && rd != '-'
									        ? <div className="form-group">
												<label className="col-sm-4 twoline">RD</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={rd} disabled />
												</div>
											</div>
									        : ''
									    )}
											{/*<div className="form-group">
												<label className="col-sm-4 twoline">Recruiter</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.recruiter} disabled />
												</div>
											</div>*/}
										</form>
									</div>
								</div>
							</div>
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title"><i className="fa fa-bar-chart"></i> Agent Status</div>
									<div className="col-xs-12">
										<form className="form-horizontal">
											<div className="form-group">
												<label className="col-sm-4 twoline">Office Name</label>
												<div className="col-sm-8">
													<textarea className="form-control" rows="2" value={this.state.office_name} disabled ></textarea>
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">AAJI No.</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" name="aaji_number" value={this.state.aaji_number} disabled={this.state.disabled} onChange={this.handleChangeAajino} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">AAJI Expired</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" id="AAJI-EX" name="aaji_expired_date" value={this.state.aaji_expired_date} disabled={this.state.disabled} onChange={this.handleChangeAajiexp} />
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>

{/*
					<div className="buttonAction">
						<form className="form-horizontal" onSubmit={this.handleSubmit}>
							<button type="button" className="btn btn-danger" onClick={this.handleChangeEdit}><i className="fa fa-pencil"></i> Edit Profile</button>
							<button type={this.state.disabled == "disabled" ? "button" : "submit"} className="btn btn-primary"><i className="fa fa-check"></i> Update Profile</button>
						</form>
					</div>
*/}
				</div>
				<Loading />
			</div>

			<Footer />
			<ModalMessage id="email-change-request" title="Notification" message="" />

			
			<div className="modal" id="forgotPasswordModal" tabindex="-1" role="dialog" aria-labelledby="successPopUpLabel">
				<div className="modal-dialog" role="document">
					<div className="modal-content">
						<div className="modal-header">
							<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
							<h4 className="modal-title" id="myModalLabel">Change Password</h4>
						</div>
						<div className="modal-body">
							<div className="row">
								<div className="col-xs-12 responsive2">
									<form className="form-horizontal" onSubmit={this.handleSubmit}>
										<div className="form-group">
											<label className="col-sm-4">Current Password</label>
											<div className="col-sm-8">
												<input type="password" name="ch_old_password" className="form-control" value={this.state.ch_old_password} onChange={this.handleChangeCurrent} readonly/>
											</div>
										</div>
										<div className="form-group">
											<label className="col-sm-4">New Password</label>
											<div className="col-sm-8">
												<input type="password" name="ch_new_password" className="form-control" value={this.state.ch_new_password} onChange={this.handleChangeNew}/>
											</div>
										</div>
										<div className="form-group">
											<label className="col-sm-4">Confirm New Password</label>
											<div className="col-sm-8">
												<input type="password" name="ch_new_password_conf" className="form-control" value={this.state.ch_new_password_conf} onChange={this.handleChangeConf}/>
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-8 col-sm-offset-4">
												<button type="submit" className="btn btn-warning btn-block" onClick={this.changePasswordAction}><i className="fa fa-sign-in fa-rotate-90" aria-hidden="true"></i> Save Password</button>
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			
		</div>
		);
	}
}

export default profile;
