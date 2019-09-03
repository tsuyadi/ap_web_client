'use strict'
import { getAllUrlParams } from '../../common_components/helper/url_helper';
import api_route from '../../common_components/api_route';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import {DateFormat, DateFormatEx, DateFormatMonthName, DateFormatExYMDs } from '../../common_components/helper/formatter';

class TopMenuTakumi extends React.Component {
	constructor(props){
		super(props);

		this.logout = this.logout.bind(this);
		this.jiraHelpdesk = this.jiraHelpdesk.bind(this);
		this.initForm = this.initForm.bind(this);
	}

	state = {
		username : localStorage.getItem('name'),
		lastlogin : localStorage.getItem('last_login'),
		lastUpdate : localStorage.getItem('last_update'),
		dashboardRole: [11,12,13, 15, 16],
	}

	componentDidMount = () => {
	}

	componentWillReceiveProps = (p) => {
        if(p.username != null)
        {
          this.setState({
            username: p.username,
            lastlogin : p.lastlogin,
			lastUpdate : p.lastUpdate
          });
        }
    }

	logout(e){
		$.ajax({
			url: api_route.logout,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token'),//logout
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			type: 'POST',
			// dataType: "binary",
			data: {},
			// contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			success: (response) => {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
				var url = window.location.href.split("#");
				window.location.href = url[0];
				
			},
			error: (xhr, status) => {
			  $('#loading').modal('hide');
			  if(xhr.status == '401') {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
				var url = window.location.href.split("#");
				window.location.href = url[0];
			  }else{
				alert("something wrong");
  
			  }
			}
		});
	}

	jiraHelpdesk(){
		
	}

	initForm(){
		$('#inform').hide();
		$('#submitfom').show();
	}

	changeLang(lang){
		this.props.eventLang(lang);
	}
	
	setTab =(e)=>{
        localStorage.setItem('tab', e);
        debugger;
    }
	render(){
		let tab = [];
			debugger;
			 if(localStorage.getItem('tab') == 0){
				tab.push (
					<ul className="nav nav-tabs" role="tablist">
						<li role="presentation" className="active"><a href="#personalselling" aria-controls="personalselling" role="tab" data-toggle="tab" onClick={this.setTab(0)}>Personal Selling </a></li>
						<li role="presentation"><a href="#groupselling" aria-controls="groupselling" role="tab" data-toggle="tab" onClick={this.setTab(1)}>Group Selling</a></li>
					</ul>
				);
			} else if(localStorage.getItem('tab') == 1){
				tab.push (
					<ul className="nav nav-tabs" role="tablist">
						<li role="presentation"><a href="#personalselling" aria-controls="personalselling" role="tab" data-toggle="tab" onClick={this.setTab(0)}>Personal Selling </a></li>
						<li role="presentation" className="active"><a href="#groupselling" aria-controls="groupselling" role="tab" data-toggle="tab" onClick={this.setTab(1)}>Group Selling</a></li>
					</ul>
				);
			} else {
				tab.push (
					<ul className="nav nav-tabs" role="tablist">
						<li role="presentation" className="active"><a href="#personalselling" aria-controls="personalselling" role="tab" data-toggle="tab" onClick={this.setTab(0)}>Personal Selling </a></li>
						<li role="presentation"><a href="#groupselling" aria-controls="groupselling" role="tab" data-toggle="tab" onClick={this.setTab(1)}>Group Selling</a></li>
					</ul>
				);
			}
			let last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0,10)) : new Date();
			// let last_login = new Date();
            let formated_last_login = null;
            console.log( this.state.lastlogin);
            console.log(last_login);
			if(last_login)
			{
				var monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"
                              ];
				let dd = last_login.getDate();
				let mm = last_login.getMonth(); //January is 0!
				let yyyy = last_login.getFullYear();

				formated_last_login = dd+' '+monthNames[mm]+' '+yyyy;
			}

			let dashboardUrl = null;
			let userrole = parseInt(localStorage.getItem('userrole'));
			if(this.state.dashboardRole.indexOf(userrole) != -1)
	      	{
	      		//dashboardUrl  ='dashboard_' + this.state.dashboardMaps[userrole];	
				  dashboardUrl  ='dashboard';
	      	}
			
			let last_update = this.state.lastUpdate ? new Date(DateFormatExYMDs(this.state.lastUpdate.substring(0,10))) : null;
			let formated_last_update = null;
			if(this.state.lastUpdate)
			{
				var monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"
                              ];
				let dd = last_update.getDate();
				let mm = last_update.getMonth(); //January is 0!
				let yyyy = last_update.getFullYear();

				formated_last_update = dd+' '+monthNames[mm]+' '+yyyy;		
			}
	 
		return (

			<div className="header-wrapper">
				{/*<MaintenanceAlert />*/}
				<div className="header">
					<div className="logo hidden-sm hidden-xs">
						<img src="assets/img/logo.png" width="190" height="64" alt="TOKIO MARINE"/>
					</div>
					
					<div className="afterLogo">
						<div className="afterTop">
							<div className="left hidden-sm hidden-xs">
								Welcome, {localStorage.getItem('name')}
							</div>
							
							<div className="right">
								<ul>
									<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> Dashboard</a></li>
									<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> Profile</a></li>
									<li><a href="#/comission" title="Report"><i className="fa fa-bar-chart"></i> Report</a></li>
									
									<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
									<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>
									<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
									<li><a href="#/takumi_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>
									{/* <li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> Memo / Form</a></li>
									<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li> */}
									<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-users"></i> Org Chart</a></li>
									{/* <li><a href="#/group_info" title="Group Info Tree"><i className="fa fa-group"></i> Group Info</a></li>
									<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
									<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>
									<li><a href="#/cpp_leader" title="Core Producer Program"> CPP</a></li> */}
									<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
								</ul>
							</div>
							
							<div className="clearfix"></div>
						</div>
						
						<div className="afterBottom">
							{(localStorage.getItem('role') == '12' || localStorage.getItem('role') == '11' ?
								<div className="left">
								<ul className="nav nav-tabs" role="tablist">
									<li role="presentation" className="active"><a href="#personalselling" aria-controls="personalselling" role="tab" data-toggle="tab">Personal Selling </a></li>
									<li role="presentation"><a href="#groupselling" aria-controls="groupselling" role="tab" data-toggle="tab">Group Selling</a></li>
								</ul>
							</div>
								: ''
							)}
							<div className="right">
								<i className="fa fa-clock-o"></i> 
								<span> (Last login: {formated_last_login})</span>
							</div>
							<div className="right">
								<a style={{'color':'red'}} data-target="#submit_ap" data-toggle="modal" onClick={this.initForm} ><i className="fa fa-bug"></i> Submit Issue</a>
							</div>
							{/*<div className="right">
								<a  className="feature-modal-link animated infinite flash" data-target="#feature-modal" data-toggle="modal"><i className="fa fa-info"></i> New Features</a>
							</div>*/}
							<div className="right hidden">
								<a onClick={this.changeLang.bind(this, 'EN')} > EN</a>
								<a onClick={this.changeLang.bind(this, 'ID')} > ID</a>
							</div>
							
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
			</div>
		);
	}
}

export default TopMenuTakumi;

