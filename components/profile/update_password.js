'use strict'

import api_route from '../../common_components/api_route';
import TopMenuProfile from '../../common_components/menu_v2/top_menu_profile';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';
import CekAuth from '../../common_components/helper/cek_auth';
import {PasswordValidation} from '../../common_components/helper/validation';

class UpdatePassword extends React.Component {
	constructor(props){
		super(props);
		CekAuth();
	}

	state = {
		old_password: "",
		new_password: "",
		new_password_conf: "",
		status_s: "",
		status_f: "",
		name: localStorage.getItem('name'),
		last_login: localStorage.getItem('last_login'),
		username: localStorage.getItem('username'),
	}

	handleSubmit = (e) => {
		e.preventDefault();
		var error = 0;
		if(this.state.new_password == "" || this.state.new_password_conf == ""){
			alert("Fill all field");
			error = 1;
		}
		else if(this.state.new_password != this.state.new_password_conf){
			alert("New Password and Confirm New Password should be the same");
			error = 1;
		}
		else if(error == 0){
			
			if(PasswordValidation(this.state.new_password)){
				$('#loading').modal('show');
				$.ajax({
					url: api_route.passwordChange,
					headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token'),
						'Content-Type':'application/json',
						'Accept':'application/json'
					},
					data: JSON.stringify({
						"username": this.state.username,
						"old_password": this.state.old_password,
						"new_password": this.state.new_password
					}),
					dataType: "json",
					contentType: "application/json",
					type: 'POST',
					success: (response) => {
					$('#loading').modal('hide');
					window.location.href = window.location.href.split('#')[0] + '#/profile';
					alert("Successfully to change password.");
					this.setState({status_s:"Successfully to change password."});
					},
					error: (err, response) => {
						$('#loading').modal('hide');
						alert("Failed to change password.");
						this.setState({
							status_f:"Failed to change password.",
							old_password:"",
							new_password:"",
							new_password_conf:""
						});
					}
				});
			}

		}
	}

	handleChangeCurrent = (e) => {
		this.setState({old_password: e.target.value});
	}

	handleChangeNew = (e) => {
		this.setState({new_password: e.target.value});
	}

	handleChangeConf = (e) => {
		this.setState({new_password_conf: e.target.value});
	}

	render(){
		return (
			<div className="wrap2">

			{/* Start Top Menu Section */}
			<TopMenuProfile username={this.state.name} lastlogin={this.state.last_login}/>
			{/* End Top Menu Section */}

			<div className="main-wrapper">
				<ol className="breadcrumb" style={{marginBottom: '5px'}}>
					<li><a href="#/profile">Profile</a></li>
					<li className="active">Change Password</li>
				</ol>
				<div className="main">
					<div className="container-fluid personalData">
						<div className="title"><i className="fa fa-lock"></i> Change Password</div>
						<div className="row">
						  <div className="col-xs-12 responsive2">
							<form className="form-horizontal" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label className="col-sm-4">Current Password</label>
									<div className="col-sm-8">
										<input type="password" name="old_password" className="form-control" value={this.state.old_password} onChange={this.handleChangeCurrent} readonly/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">New Password</label>
									<div className="col-sm-8">
										<input type="password" name="new_password" className="form-control" value={this.state.new_password} onChange={this.handleChangeNew}/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Confirm New Password</label>
									<div className="col-sm-8">
										<input type="password" name="new_password_conf" className="form-control" value={this.state.new_password_conf} onChange={this.handleChangeConf}/>
									</div>
								</div>
								
								<div className="form-group">
									<div className="col-sm-8 col-sm-offset-4">
										<button type="submit" className="btn btn-warning btn-block"><i className="fa fa-sign-in fa-rotate-90" aria-hidden="true"></i> Save Password</button>
									</div>
								</div>
							</form>
						  </div>
						</div>
					</div>
				</div>
			</div>

			<Footer />
			
		</div>
		);
	}
}
export default UpdatePassword;