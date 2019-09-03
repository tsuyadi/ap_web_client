'use strict'

import api_route from '../../common_components/api_route';
import Loading from '../../common_components/loading';
import ChangePassword from '../../common_components/modal/change_password';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';

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
		var closed = localStorage.getItem('notifClosed');
        
        if(closed == "false"){
            $('.header-wrapper').css('top', '50px');
            $('body').css('margin-top', '125px');
            $('#notif-maintenance').addClass('animated bounceInDown');
        }else{
            $('#notif-maintenance').hide();
        }
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
              	if(response.first_time == true)
				{
					sessionStorage.setItem('token', response.token);
					localStorage.setItem('username', this.state.username);
					this.setState({
						token : response.token,
						first_time : true
					});
					

				}
				else
				{
					localStorage.setItem('username', this.state.username);
					sessionStorage.setItem('token', response.token);
					localStorage.setItem('role', response.role);
					localStorage.setItem('tokenLastActivity', Date.now());
					localStorage.setItem('userrole', response.role);
					localStorage.setItem('afterlogin', 'true');
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
					else if(this.state.adminRole.indexOf(response.role) != -1 || response.role == 102)
					{
						// window.location.href = window.location.href.split('#')[0] + '#/admin';
						window.location.href = window.location.href.split('#')[0] + '#/newbusiness';
					}

					else if(this.state.departmentRole.indexOf(response.role) != -1)
					{
						window.location.href = window.location.href.split("#")[0] + '#/memo/folder';
					}	
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

	close(){

        $('#notif-maintenance').addClass('animated fadeOutUp');
        $('.header-wrapper').css('top', '0px');
        $('body').css('margin-top', '80px');
        localStorage.setItem('notifClosed', 'true');

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

		
		if(this.state.first_time){
			$('#firstTimeLogin').modal('show');
		}
		

		return (
			<div className="wrap2">
				{/*<div id="notif-maintenance" className="alert alert-danger alert-dismissible text-center" style={{"margin-bottom":"20px"}}>  
					<button type="button" className="close" aria-label="Close" onClick={this.close}>
						<span aria-hidden="true">&times;</span>
					</button>  
					Agency Portal will be Under Maintenance on <b>21 January 2018 12:00,</b> Please comeback to us on <b>22 January 2018 08:30</b>
				</div>*/}
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
								</div>
							</div>
							{alert_status}
								{/*<div className="headerForm" >								
									<div className="welcomeLogo" style={{"margin-top" : "30px","margin-bottom":"30px", "font-weight" : "bold", "color":"red"}}>
									Agency Portal will be Under Maintenance on <u>5 July 2018 12:00pm</u> until <u>5 July 2018 09:00pm</u>

									</div>
								</div> */}
							
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
								&copy; <b>2017 TMLI Agency Portal</b> <br/>Best View using <a target="_blank" href="http://www.google.com/chrome/">Chrome</a>, <a target="_blank" href="https://www.mozilla.org/id/firefox/new/">Firefox</a> <br/>and <a target="_blank" href="http://www.microsoft.com/en-us/download/Internet-Explorer-11-for-Windows-7-details.aspx">Internet Explorer 11</a>
							</div>
						</div>
					</div>
				</div>
				<Loading />
				
				<ChangePassword user_token={this.state.token} />

			</div>
		); 
	}
}

export default login;
