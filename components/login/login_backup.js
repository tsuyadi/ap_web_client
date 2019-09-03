'use strict'

import api_route from '../../common_components/api_route';
import Loading from '../../common_components/loading';

class login extends React.Component {
	constructor(props){
		super(props);
		localStorage.clear();

	}

	componentWillMount = () => {
		localStorage.clear();
	}

	state = {
		username: '',
		password: '',
		status: '',
		islogin: false,
		dashboardRole: [5,6,7,8,9],
		managementRole : [1,3,4],
		adminRole : [2],
		departmentRole : [10],
		dashboardMaps : [],
		usertype : 'mo',
		token : '',
		first_time : false
	}

	componentDidMount = () => {
		this.state.dashboardMaps[9] = 'fc';
		this.state.dashboardMaps[8] = 'sm';
		this.state.dashboardMaps[7] = 'dm';
		this.state.dashboardMaps[6] = 'rm';
		this.state.dashboardMaps[5] = 'rd';
		localStorage.setItem('notifClosed', 'false');
	}

	handleSubmit = (e) => {
		e.preventDefault();
		this.setState({status: ''});
        let formData = new FormData();
        formData.append('username', this.state.username);
        formData.append('password', this.state.password);
        $('#loading').modal('show');
        $.ajax({
            url: api_route.authToken,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
				
              $('#loading').modal('hide');
              if(response.status == 'OK')
              {
              	localStorage.setItem('username', this.state.username);
              	sessionStorage.setItem('token', response.token);
              	localStorage.setItem('role', response.role);
              	localStorage.setItem('tokenLastActivity', Date.now());
              	localStorage.setItem('userrole', response.role);
              	// buat agent
              	if(this.state.dashboardRole.indexOf(response.role) != -1)
              	{
              		//window.location.href = window.location.href.split('#')[0] + '#/dashboard_' + this.state.dashboardMaps[response.role];
              		window.location.href = window.location.href.split('#')[0] + '#/dashboard';
              	}

              	// buat management
              	else if(this.state.managementRole.indexOf(response.role) != -1)
              	{
              		window.location.href = window.location.href.split('#')[0] + '#/management';
              	}

              	// buat admin
              	else if(this.state.adminRole.indexOf(response.role) != -1)
              	{
              		window.location.href = window.location.href.split('#')[0] + '#/admin';
              	}
				else if(this.state.departmentRole.indexOf(response.role) != -1)
				{
					window.location.href = window.location.href.split("#")[0] + '#/memo/folder';
				}
              }
              else
              {
              	this.setState({status: response.status});
              }
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	this.setState({status: err.responseJSON.status});
              }

            }
        });
    }

    handleChangeUsername = (e) => {
		this.setState({username: e.target.value});
	}

	handleChangePassword = (e) => {
		this.setState({password: e.target.value});
	}

	render(){
		var alert_status = [];
		
		if(this.state.status != '')
		{
			alert_status.push(
				<div className="alert-error text-danger">{this.state.status}</div>
			);
		}
		else
		{
			alert_status.push(
				<div>
				</div>
			);
		}

		return (
			<div className="wrap2">
				<div className="main-wrapper">
					<div className="main">
						<div className="formLogin">
							<div className="headerForm">
								<div className="logo">
									<a href="#"><img src="assets/img/logo.jpg" width="190" height="64" alt="TOKIO MARINE"/></a>
								</div>

								<div className="welcomeLogo">
								Welcome in Agency Portal
								<br /><b>Tokio Marine Life Insurance Indonesia</b>
								{/*
								Selamat Datang di Agency Portal 
									 <br /><b>Tokio Marine Life Insurance Indonesia</b>
									 */}
								</div>
							</div>
							{alert_status}
							<div className="headerForm hidden">								
								<div className="welcomeLogo" style={{"padding-top" : "10px", "font-weight" : "bold"}}>
									Agency Portal Website is currently <br />under maintenance
								</div>
							</div>
							<form className="form-horizontal" onSubmit={this.handleSubmit}>
								<div className="form-group">
									<label for="inputEmail3">Username</label>
									<div className="iconForm">
										<input type="text" className="form-control" id="inputEmail3" placeholder="Username" value={this.state.username} onChange={this.handleChangeUsername} />
										<i className="fa fa-user"></i>
									</div>

									<div className="clearfix h15"></div>

									<label for="inputPassword3">Password</label>
									<div className="iconForm">
										<input type="password" className="form-control" id="inputPassword3" placeholder="Password" value={this.state.password} onChange={this.handleChangePassword} />
										<i className="fa fa-lock"></i>
									</div>
								</div>

								<div className="form-group">
									<div className="col-sm-6">
										<div className="remember">
										<a href="#/forgot_password">Forgot password ?</a>
										</div>
									</div>
									<div className="col-sm-6">
										<button type="submit" className="btn btn-primary btn-block" data-toggle="modal" data-target="#loading">Sign in</button>
									</div>
								</div>
							</form>
							<div className="text-center" style={{'padding':'10px 0px'}}>
								&copy; <b>2017 TMLI Agency Portal</b> <br/>Best View using <a href="http://www.google.com/chrome/">Chrome</a>, <a href="https://www.mozilla.org/id/firefox/new/">Firefox</a> <br/>and <a href="http://www.microsoft.com/en-us/download/Internet-Explorer-11-for-Windows-7-details.aspx">Internet Explorer 11</a>
							</div>
						</div>
					</div>
				</div>
				<Loading />

			</div>
		);
	}
}

export default login;
