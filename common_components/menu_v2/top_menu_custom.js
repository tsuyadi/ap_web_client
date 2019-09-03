'use strict'

import { LoadLabel } from '../resources/label';
import { getAllUrlParams } from '../../common_components/helper/url_helper';
import api_route from '../../common_components/api_route';

class TopMenuCustom extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			username: localStorage.getItem('name') != null ? localStorage.getItem('name') : localStorage.getItem('username'),
			lastlogin: localStorage.getItem('last_login'),
			lastUpdate: localStorage.getItem('last_update'),
			mgtRole: [1, 2, 3, 4],
			dashboardRole: [5, 6, 7, 8, 9, 14, 11, 12, 13, 15, 16, 17, 18, 19, 20, 999],
			uri: getAllUrlParams(window.location.href).uri,
		}

		this.logout = this.logout.bind(this);
		this.changeLang = this.changeLang.bind(this);
		this.setTab = this.setTab.bind(this);

	}



	componentDidMount() {
	}

	componentWillReceiveProps(p) {
		if (p.username != null) {
			this.setState({
				username: p.username,
				lastlogin: p.lastlogin,
				lastUpdate: p.lastUpdate
			});
		}
	}

	logout(e) {
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

	jiraHelpdesk() {

		$('#submit-issue').click(function (e) {
			e.preventDefault();
			$('#atlwdg-trigger').trigger('click');
		});
	}

	changeLang(lang) {
		this.props.eventLang(lang);
	}

	setTab(e) {
		localStorage.setItem('ams_dashboard', e);
		debugger;
	}

	render() {
		let last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0, 10)) : null;
		let formated_last_login = null;
		if (last_login) {
			var monthNames = ["January", "February", "March", "April", "May", "June",
				"July", "August", "September", "October", "November", "December"
			];
			let dd = last_login.getDate();
			let mm = last_login.getMonth(); //January is 0!
			let yyyy = last_login.getFullYear();

			formated_last_login = dd + ' ' + monthNames[mm] + ' ' + yyyy;
		}

		let dashboardUrl = null;
		let userrole = parseInt(localStorage.getItem('userrole'));
		if (this.state.dashboardRole.indexOf(userrole) != -1) {
			//dashboardUrl  ='dashboard_' + this.state.dashboardMaps[userrole];	
			dashboardUrl = 'dashboard';
		}

		let memoMenu = [];

		if (this.state.mgtRole.indexOf(userrole) != -1) {
			dashboardUrl = 'dashboard';
			memoMenu.push(
				<ul>
					<li><a href={'#/' + dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> Dashboard</a></li>
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-group"></i> Org Chart</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					{/*<li><a href="#/group_info" title="Group Info Tree"><i className="fa fa-group"></i> Group Info</a></li>*/}
					{/*<li><a href="#/cpp_leader" title="Core Producer Program"> CPP</a></li>									*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		} else if (localStorage.getItem('role') == '2') {

			memoMenu.push(
				<ul>
					<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);

		}else if (localStorage.getItem('role') == '999') {

			memoMenu.push(
				<ul>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);

		} else if (localStorage.getItem('role') == '9' || localStorage.getItem('role') == '8' || localStorage.getItem('role') == '14') {
			memoMenu.push(
				<ul>
					<li><a href={'#/' + dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="report"><i className="fa fa-bar-chart"></i> Report</a></li>
					<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>
					{/*<li><a href="#/cpp" title="Core Producer Program"> CPP</a></li>									*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		} else if (localStorage.getItem('role') == '11' || localStorage.getItem('role') == '12' || localStorage.getItem('role') == '13' || localStorage.getItem('role') == '15' || localStorage.getItem('role') == '16') {
			memoMenu.push(
				<ul>
					<li><a href={'#/' + dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="report"><i className="fa fa-bar-chart"></i> Report</a></li>
					<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					{/* <li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li> */}
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-users"></i> Org Chart</a></li>
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>
					{/* <li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>		
						<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
						<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li> */}
					{/*<li><a href="#/cpp" title="Core Producer Program"> CPP</a></li>									*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}else if(localStorage.getItem('role') == 17 || localStorage.getItem('role') == 18 || localStorage.getItem('role') == 19 || localStorage.getItem('role') == 20 || (localStorage.getItem('role') == 5 && localStorage.getItem('agent_code').charAt(0) == '9')){
			memoMenu.push(
				<ul> 
					<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> Dashboard</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> Profile</a></li>
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			)
		}
			
		/*else if(this.state.dashboardMaps[userrole] == 'sm'){
			memoMenu.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="report"><i className="fa fa-bar-chart"></i> Report</a></li>
					<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> {LoadLabel('Memo')}</a></li>		
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>	
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>
					<li><a href="#/cpp_leader" title="Core Producer Program"> CPP</a></li>
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}
		else if(this.state.dashboardMaps[userrole] == 'sm'){
			memoMenu.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> Dashboard</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> Profile</a></li>
					<li><a href="#/comission" title="Report"><i className="fa fa-bar-chart"></i> Report</a></li>
					
					<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> Memo / Form</a></li>
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>
					<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-users"></i> Org Chart</a></li>
					<li><a href="#/group_info" title="Group Info Tree"><i className="fa fa-group"></i> Group Info</a></li>
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>
					<li><a href="#/cpp_leader" title="Core Producer Program"> CPP</a></li>
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}*/
		else {
			memoMenu.push(
				<ul>
					<li><a href={'#/' + dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="report"><i className="fa fa-bar-chart"></i> Report</a></li>
					<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>
					<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-users"></i> Org Chart</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					{/*<li><a href="#/group_info" title="Group Info Tree"><i className="fa fa-group"></i> Group Info</a></li>*/}
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>
					{/*<li><a href="#/cpp_leader" title="Core Producer Program"> CPP</a></li>*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}

		let header = this.props.header;
		let groupTab = [];
		if (this.state.uri == 'ams_dashboard') {
			groupTab.push(
				<div className="left">
					<ul className="nav nav-tabs" role="tablist">
						<li role="presentation" className="active"><a href="#personalams" aria-controls="personalams" role="tab" data-toggle="tab" onClick={this.setTab.bind(this, 'personal')}>Personal</a></li>
						{(localStorage.getItem('role') == 9 || localStorage.getItem('role') == 13 || localStorage.getItem('role') == 15 || localStorage.getItem('role') == 16) ? '' : <li role="presentation"><a href="#groupams" aria-controls="groupams" role="tab" data-toggle="tab" onClick={this.setTab.bind(this, 'group')}>Group</a></li>}
					</ul>
				</div>
			)
		}
		return (
			<div className="header-wrapper">
				<div className="header">
					<div className="logo">
						<img src="assets/img/logo.png" width="190" height="64" alt="TOKIO MARINE" />
					</div>

					<div className="afterLogo">
						<div className="afterTop">
							<div className="left">
								Welcome, { localStorage.getItem('name') != null ? this.state.username : localStorage.getItem('username')}
							</div>

							<div className="right">
								{memoMenu}
							</div>

							<div className="clearfix"></div>
						</div>

						<div className="afterBottom">
							<div className="left">
								<ul className="nav nav-tabs staticPage">
									{header}
								</ul>
							</div>
							{groupTab}
							<div className="right">
								<i className="fa fa-clock-o"></i>
								<span> (Last login: {formated_last_login})</span>
							</div>
							<div className="right">
								<a style={{ 'color': 'red' }} data-target="#submit_ap" data-toggle="modal" onClick={this.initForm} ><i className="fa fa-bug"></i> Submit Issue</a>
							</div>
							<div className="right">
								<a className="feature-modal-link animated infinite flash" data-target="#feature-modal" data-toggle="modal" ><i className="fa fa-info"></i> New Features</a>
							</div>
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

export default TopMenuCustom;

