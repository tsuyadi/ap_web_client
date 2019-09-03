'use strict'
import { getAllUrlParams } from '../../common_components/helper/url_helper';
import api_route from '../../common_components/api_route';

class TopMenuPolicy extends React.Component {
	constructor(props){
		super(props);

		this.logout = this.logout.bind(this);
	}

	state = {
		username : localStorage.getItem('name'),
		lastlogin : localStorage.getItem('last_login'),
		lastUpdate : localStorage.getItem('last_update'),
		dashboardRole: [1,5,6,7,8,9,14],
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

	render(){
			let last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0,10)) : null;
			let formated_last_login = null;
			if(last_login)
			{
				let dd = last_login.getDate();
				let mm = last_login.getMonth()+1; //January is 0!
				let yyyy = last_login.getFullYear();

				if(dd<10){dd='0'+dd}
				if(mm<10){mm='0'+mm}
				formated_last_login = dd+'-'+mm+'-'+yyyy;
			}

			let dashboardUrl = null;
			let userrole = parseInt(localStorage.getItem('userrole'));
			if(this.state.dashboardRole.indexOf(userrole) != -1)
	      	{
	      		//dashboardUrl  ='dashboard_' + this.state.dashboardMaps[userrole];	
				  dashboardUrl  ='dashboard';	
	      	}

		let menu_custom = [];
		let addMenuButton = [];
		
		if(this.props.opsi == 'inquiry'){
			menu_custom.push(
				<ul className="nav navbar-nav">
					<li><a href="#/newbusiness/inquiry" title="SPAJ Tacking"  style={{'color':'#17b2e2'}}>SPAJ Tracking</a></li>
					<li><a href="#/policy/list_policies" title="List Policy"  style={{'color':'#17b2e2'}}>Policy Tracking</a></li>
					<li><a href="#/lapse_policy/" title="Lapse Policy"  style={{'color':'#17b2e2'}}>Lapse Policy</a></li>
					<li><a href="#/premium_due_data/" title="Premium Due Data"  style={{'color':'#17b2e2'}}>Premium Due Data</a></li>
					<li className="hidden"><a href="#/claim/" title="Claim"  style={{'color':'#17b2e2'}}>Claim</a></li>
				</ul>
			);

			addMenuButton.push(
				<button type="button" className="navbar-toggle collapsed" style={{"float":"left !important", "font-size" : "12px", "margin-left":"5px"}} data-toggle="collapse" data-target="#new_business_navbar" aria-expanded="false" aria-controls="navbar">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
			);

		}else if(this.props.opsi == 'policyt'){
			menu_custom.push(
				<ul className="nav navbar-nav">
					<li><a href="#/policy/list_policies" title="List Policy" style={{'color':'#17b2e2'}}> Policy Tracking</a></li>
					<li><a href={"#/policy/policy_info/"+this.state.policy_id} title="Policy Info" style={{'color':'#17b2e2'}}>Policy Info</a></li>
					<li><a href={"#/policy/policy_holder_info/"+this.state.policy_id} title="Policy Holder Info" style={{'color':'#17b2e2'}}>Policy Holder Info</a></li>
					<li><a href={"#/policy/insured_info/"+this.state.policy_id} title="Insured Info" style={{'color':'#17b2e2'}}>Insured Info</a></li>
					<li><a href={"#/policy/investment/"+this.state.policy_id} title="Policy Investment" style={{'color':'#17b2e2'}}>Investment</a></li>
					<li><a href={"#/policy/premium_payment_information/"+this.state.policy_id} title="Policy Premium Payment" style={{'color':'#17b2e2'}}>Premium Payment Information</a></li>
					<li><a href={"#/policy/support_document/"+this.state.policy_id} title="Support Document" style={{'color':'#17b2e2'}}>Support Document</a></li>

				</ul>
			);

			addMenuButton.push(
				<button type="button" className="navbar-toggle collapsed" style={{"float":"left !important", "font-size" : "12px", "margin-left":"5px"}} data-toggle="collapse" data-target="#new_business_navbar" aria-expanded="false" aria-controls="navbar">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
			);
		}

		let menu = [];
		if(parseInt(localStorage.getItem('role')) > 4){

			menu.push(
				<ul>
					<li><a href={"#/"+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> Dashboard</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> Profile</a></li>
					<li><a href="#/comission" title="Comission"><i className="fa fa-bar-chart"></i> Report</a></li>
					
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> SPAJ / Policy Tracking</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> Memo / Form</a></li>		
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>	
					<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-group"></i> Org Chart</a></li>
					{/*<li><a href="#/group_info" title="Group Info Tree"><i className="fa fa-group"></i> Group Info</a></li>*/}
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>						
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);

		}else{

			menu.push(
				<ul>
					<li><a href={"#/"+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> Dashboard</a></li>				
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> SPAJ / Policy Tracking</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> Memo / Form</a></li>									
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);

		}

		return (

			<div>
				<div className="header-wrapper">
					<div className="header">
						<div className="logo">
							<img src="assets/img/logo.png" width="190" height="64" alt="TOKIO MARINE"/>
						</div>

						<div className="afterLogo">
							<div className="afterTop">
								<div className="left">
									Welcome, {this.state.username}
								</div>

								<div className="right">
									{menu}
								</div>

								<div className="clearfix"></div>
							</div>

							<div className="afterBottom">
								<div className="left">
									<span className="titleStaticPage"><i className="fa fa-exclamation-circle"></i> {this.props.title}</span>
								</div>
								<div className="left">
									<div className="lastupdatelabel">Last Update : {this.state.lastUpdate} </div>
								</div>
								<div className="right">
									<i className="fa fa-clock-o"></i>
									<span> (Last login: {formated_last_login})</span>
								</div>

								<div className="right">
									<a data-target="#submit_ap" data-toggle="modal" onClick={this.initForm} ><i className="fa fa-bug"></i> Submit Issue</a>
								</div>
								<div className="right">
									<a className="feature-modal-link animated infinite flash" data-target="#feature-modal" data-toggle="modal" ><i className="fa fa-info"></i> New Features</a>
								</div>

								<div className="clearfix"></div>
							</div>
						</div>
					</div>
				</div>

				<nav className="navbar navbar-default navbar-fixed-top hidden-sm hidden-md hidden-lg">
					<div className="header navbar-header navbar-header-mobile">
						<button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#navbar" aria-expanded="false" aria-controls="navbar">
							<span className="sr-only">Toggle navigation</span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
							<span className="icon-bar"></span>
						</button>
						{addMenuButton}
						<div className="logo">
							<img src="assets/img/logo.png" width="190" height="64" alt="TOKIO MARINE"/>
						</div>
						<div className="welcome-user" style={{'textAlign':'center', 'padding':'5px 0px'}}>
							Welcome, {this.state.username}
						</div>
						<div className="afterBottom">
							<div className="left">
								<span className="titleStaticPage"><i className="fa fa-exclamation-circle"></i> {this.props.title}</span>
							</div>
							<div style={{'textAlign':'center', 'padding':'5px 0px'}}>
								<i className="fa fa-clock-o"></i>
								<span> (Last login: {formated_last_login})</span>
							</div>

							<div className="clearfix"></div>
						</div>
					</div>

					<div id="new_business_navbar" className="navbar-collapse collapse navbar-collapese-mobile" aria-expanded="false" style={{"height" : "0.8px", 'color':'#17b2e2'}}>
						{menu_custom}
					</div>

					<div id="navbar" className="navbar-collapse collapse navbar-collapse-mobile" aria-expanded="false" style={{"height": "0.8px"}}>
						<ul className="nav navbar-nav navbar-right">
							<li><a href={"#/"+dashboardUrl} title="Dashboard" style={{'color':'#17b2e2'}}><i className="fa fa-cogs"></i> Dashboard</a></li>
							<li><a href="#/profile" title="Profile" style={{'color':'#17b2e2'}}><i className="fa fa-user"></i> Profile</a></li>
							<li><a href="#/comission" title="Comission" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> Comission Report</a></li>							
							<li><a href="#/newbusiness" title="New Business" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> SPAJ / Policy Tracking</a></li>
							<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
						</ul>
					</div>					
				</nav>

			</div>

		);
	}
}

export default TopMenuPolicy;
