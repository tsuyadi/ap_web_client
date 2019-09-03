'use strict'

import {LoadLabel} from '../resources/label';
import api_route from '../../common_components/api_route';
class TopMenuNewBusinessDetail extends React.Component {
	constructor(props){
		super(props);
		this.logout = this.logout.bind(this);
		this.jiraHelpdesk = this.jiraHelpdesk.bind(this);
		this.state = {
			username : localStorage.getItem('name'),
			lastlogin : localStorage.getItem('last_login'),
			lastUpdate : localStorage.getItem('last_update'),
			opsi : '',
			mgtRole : [1,2,3,4],
			dashboardRole: [5,6,7,8,9,14,11,12,13,15,16],
			departmentRole : [10,201,202,203,204,205],
		}
	}

	componentDidMount(){
		if(localStorage.getItem('name') != null && this.state.departmentRole.indexOf(localStorage.getItem('role')) != -1){
			$.ajax({
				url: api_route.managementDashboard,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				// processData: false,
				// contentType: false,
				type: 'POST',
				success: (response) => {
					console.log(response);
					$('#loading').modal('hide');
					if(localStorage.getItem('name') == null ||localStorage.getItem('name') == '' ){
						localStorage.setItem('name', response.common_data.name);
						localStorage.setItem('last_login', this.changeDate(intToken));

					}
					var intToken = parseInt(localStorage.getItem('tokenLastActivity'));
					this.setState({dataGraph:response});
				
				},
				error: (err, response) => {
				$('#loading').modal('hide');
				if(err.responseJSON){
					window.location.href = window.location.href.split('#')[0] + '#/';
				}
				}
			});
		}else{
			localStorage.setItem('name', localStorage.getItem('username'));

		}
	}

	componentWillReceiveProps(p){	
        if(p.username != null)
        {
          this.setState({
            username: p.username,
            lastlogin : p.lastlogin,
			lastUpdate : p.lastUpdate,
			opsi : p.opsi
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

		$('#submit-issue').click(function(e){
			e.preventDefault();
			$('#atlwdg-trigger').trigger('click');
		});
	}

	changeLang(lang){
		this.props.eventLang(lang);
	}

	render(){
		let last_login = this.state.lastlogin ? new Date(this.state.lastlogin) : null;
		let formated_last_login = null;
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

		this.jiraHelpdesk();

		let menu_custom = [];
		let addMenuButton = [];
		
		if(this.props.opsi == 'inquiry'){
			menu_custom.push(
				<ul className="nav navbar-nav">
					<li><a href="#/newbusiness/inquiry" title="SPAJ Tacking"  style={{'color':'#17b2e2'}}>SPAJ Tracking</a></li>
					<li><a href="#/policy/list_policies" title="List Policy"  style={{'color':'#17b2e2'}}>Policy Tracking</a></li>
					<li><a href="#/lapse_policy/" title="Lapse Policy"  style={{'color':'#17b2e2'}}>Lapse Policy</a></li>
					<li><a href="#/premium_due_data/" title="Premium Due Data"  style={{'color':'#17b2e2'}}>Premium Due Data</a></li>
					<li><a href="#/suspense/" title="Suspense"  style={{'color':'#17b2e2'}}>Suspense</a></li>
					<li><a href="#/unit_price/" title="Unit Price"  style={{'color':'#17b2e2'}}>Unit Price</a></li>
					<li><a href="#/claim_tracking/" title="Claim Tracking"  style={{'color':'#17b2e2'}}>Claim Tracking</a></li>
					{/*<li className="hidden"><a href="#/claim/" title="Claim"  style={{'color':'#17b2e2'}}>Claim</a></li>*/}
				</ul>
			);

			addMenuButton.push(
				<button type="button" className="navbar-toggle collapsed" style={{"float":"left !important", "font-size" : "12px", "margin-left":"5px"}} data-toggle="collapse" data-target="#new_business_navbar" aria-expanded="false" aria-controls="navbar">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
			);

		}else if(this.props.opsi == 'spajt'){
			menu_custom.push(
				<ul className="nav navbar-nav">
					<li><a href={"#/newbusiness/inquiry"} title="Inquiry"  style={{'color':'#17b2e2'}}> SPAJ Tracking</a></li>
					<li><a href={"#/newbusiness/policy_info/"+this.props.id} title="Policy Holder Info"  style={{'color':'#17b2e2'}}>SPAJ Info</a></li>
					<li><a href={"#/newbusiness/policy_holder_info/"+this.props.id} title="Policy Holder Info"  style={{'color':'#17b2e2'}}>Policy Holder Info</a></li>
					<li><a href={"#/newbusiness/life_assured_info/"+this.props.id} title="Life Assured Info"  style={{'color':'#17b2e2'}}>Insured Info</a></li>
					<li><a href={"#/newbusiness/support_document/"+this.props.id} title="Document" style={{'color':'#17b2e2'}}>Document</a></li>
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
					<li><a href={"#/policy/policy_info/"+this.props.id} title="Policy Info" style={{'color':'#17b2e2'}}>Policy Info</a></li>
					<li><a href={"#/policy/policy_holder_info/"+this.props.id} title="Policy Holder Info" style={{'color':'#17b2e2'}}>Policy Holder Info</a></li>
					<li><a href={"#/policy/insured_info/"+this.props.id} title="Insured Info" style={{'color':'#17b2e2'}}>Insured Info</a></li>
					<li><a href={"#/policy/investment/"+this.props.id} title="Policy Investment" style={{'color':'#17b2e2'}}>Investment</a></li>
					<li><a href={"#/policy/premium_payment_information/"+this.props.id} title="Policy Premium Payment" style={{'color':'#17b2e2'}}>Premium Payment Information</a></li>
					<li><a href={"#/policy/support_document/"+this.props.id} title="Document" style={{'color':'#17b2e2'}}>Document</a></li>

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
		}else if(this.props.opsi == 'claim'){
			menu_custom.push(
				<ul className="nav navbar-nav">
					<li><a href="#/claim_tracking" title="Claim Tracking" style={{'color':'#17b2e2'}}> Policy Tracking</a></li>
					<li><a href={"#/claim/claim_data/"+this.props.id} title="Claim Data" style={{'color':'#17b2e2'}}> Claim Data</a></li>
					<li><a href={"#/claim/incomplete_doc/"+this.props.id} title="Incomplete Document" style={{'color':'#17b2e2'}}>Incomplete Document</a></li>
					<li><a href={"#/claim/claim_notes/"+this.props.id} title="Claim Notes" style={{'color':'#17b2e2'}}>Claim Notes</a></li>
					<li><a href={"#/claim/payment_info/"+this.props.id} title="Payment Info" style={{'color':'#17b2e2'}}>Payment Info</a></li>
					<li><a href={"#/policy/policy_info/"+this.props.id} title="Policy Info" style={{'color':'#17b2e2'}}>Policy Info</a></li>
				</ul>
			);

			addMenuButton.push(
				<button type="button" className="navbar-toggle collapsed" style={{"float":"left !important", "font-size" : "12px", "margin-left":"5px"}} data-toggle="collapse" data-target="#new_business_navbar" aria-expanded="false" aria-controls="navbar">
					<span className="sr-only">Toggle navigation</span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
					<span className="icon-bar"></span>
				</button>
			);
		}


		let memoMenu = [];
		let menuDD = [];
		if(this.state.mgtRole.indexOf(userrole) != -1 && localStorage.getItem('role') != '4' && localStorage.getItem('role') != '2')
		{
			dashboardUrl = 'dashboard';
			memoMenu.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-group"></i> Org Chart</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					{/*<li><a href="#/group_info" title="Group Info Tree"><i className="fa fa-group"></i> Group Info</a></li>									*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>				
			);
			menuDD.push(
				<ul className="nav navbar-nav navbar-right">
					<li><a href={'#/'+dashboardUrl} title="Dashboard" style={{'color':'#17b2e2'}}><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/newbusiness" title="New Business" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo" style={{'color':'#17b2e2'}}><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/group_info/tree" title="Org Chart" style={{'color':'#17b2e2'}}><i className="fa fa-group"></i> Tree</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					<li><a href="#/tm_connect" title="TMConnect" style={{'color':'#17b2e2'}}><i className="fa fa-mobile"></i> TMConnect</a></li>
					{/*<li><a href="#/group_info" title="Group Info Tree" style={{'color':'#17b2e2'}}><i className="fa fa-group"></i> Group Info</a></li>	*/}
					{/*<li><a href="#/cpp_leader" title="Core Producer Program" style={{'color':'#17b2e2'}}> CPP</a></li>								*/}
					<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}else if(localStorage.getItem('role') == '2' || localStorage.getItem('role') == '102')
		{
			dashboardUrl = 'dashboard';
			memoMenu.push(
				<ul>
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>				
			);
			menuDD.push(
				<ul className="nav navbar-nav navbar-right">
					<li><a href="#/newbusiness" title="New Business" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}else if(localStorage.getItem('role') == '4')
		{
			dashboardUrl = 'dashboard';
			memoMenu.push(
				<ul>
						<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> Dashboard</a></li>
						<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
						<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
						<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-group"></i> Org Chart</a></li>
						<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>
						<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
						{/*<li><a href="#/group_info" title="Group Info Tree"><i className="fa fa-group"></i> Group Info</a></li>	*/}
						<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>									
						<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>				
			);
			menuDD.push(
				<ul className="nav navbar-nav navbar-right">
					<li><a href={'#/'+dashboardUrl} title="Dashboard" style={{'color':'#17b2e2'}}><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/newbusiness" title="New Business" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo" style={{'color':'#17b2e2'}}><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/group_info/tree" title="Org Chart" style={{'color':'#17b2e2'}}><i className="fa fa-group"></i> Tree</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					<li><a href="#/tm_connect" title="TMConnect" style={{'color':'#17b2e2'}}><i className="fa fa-mobile"></i> TMConnect</a></li>
					{/*<li><a href="#/group_info" title="Group Info Tree" style={{'color':'#17b2e2'}}><i className="fa fa-group"></i> Group Info</a></li>*/}
					<li><a href="#/training" title="training" style={{'color':'#17b2e2'}}><i className="fa fa-caret-square-o-right"></i> Training</a></li>
					{/*<li><a href="#/cpp_leader" title="Core Producer Program" style={{'color':'#17b2e2'}}> CPP</a></li>							*/}
					<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}else if(localStorage.getItem('role') == '9' || localStorage.getItem('role') == '8' || localStorage.getItem('role') == '14'){
			memoMenu.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="Comission"><i className="fa fa-bar-chart"></i> {LoadLabel('Report')}</a></li>				
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>		
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>	
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>	
					{/*<li><a href="#/cpp" title="Core Producer Program" style={{'color':'#17b2e2'}}> CPP</a></li>						*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
			menuDD.push(
				<ul className="nav navbar-nav navbar-right">
					<li><a href={'#/'+dashboardUrl} title="Dashboard" style={{'color':'#17b2e2'}}><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile" style={{'color':'#17b2e2'}}><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="Comission" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> {LoadLabel('Report')}</a></li>	
					<li><a href="#/newbusiness" title="New Business" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo" style={{'color':'#17b2e2'}}><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/my_commission" title="My Commission" style={{'color':'#17b2e2'}}><i className="fa fa-dollar"></i> My Commission</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					{/*<li><a href="#/group_info/tree" title="Org Chart" style={{'color':'#17b2e2'}}><i className="fa fa-group"></i> Tree</a></li>*/}
					{/*<li><a href="#/group_info" title="Group Info Tree" style={{'color':'#17b2e2'}}><i className="fa fa-group"></i> Group Info</a></li>		*/}
					<li><a href="#/tm_connect" title="TMConnect" style={{'color':'#17b2e2'}}><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training" style={{'color':'#17b2e2'}}><i className="fa fa-caret-square-o-right"></i> Training</a></li>	
					{/*<li><a href="#/cpp" title="Core Producer Program" style={{'color':'#17b2e2'}}> CPP</a></li>									*/}
					<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}else if(localStorage.getItem('role') == '11' || localStorage.getItem('role') == '12' || localStorage.getItem('role') == '13' || localStorage.getItem('role') == '15'|| localStorage.getItem('role') == '16'){
			
			dashboardUrl = 'dashboard';
			memoMenu.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="report"><i className="fa fa-bar-chart"></i> Report</a></li>
					<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
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
			menuDD.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard" style={{'color':'#17b2e2'}}><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile" style={{'color':'#17b2e2'}}><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="report" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> Report</a></li>
					<li><a href="#/newbusiness" title="Inquiry" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					<li><a href="#/tm_connect" title="TMConnect" style={{'color':'#17b2e2'}}><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/group_info/tree" title="Org Chart" style={{'color':'#17b2e2'}}><i className="fa fa-users"></i> Org Chart</a></li>
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>	
					{/* <li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>		
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li> */}
					{/*<li><a href="#/cpp" title="Core Producer Program"> CPP</a></li>									*/}
					<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}else if(localStorage.getItem('role') == '10' || localStorage.getItem('role') == '201' || localStorage.getItem('role') == '202' || localStorage.getItem('role') == '203'  || localStorage.getItem('role') == '204' || localStorage.getItem('role') == '205' || localStorage.getItem('role') == '206'  || localStorage.getItem('role') == '207')
		{
			dashboardUrl = 'dashboard';
			if(localStorage.getItem('username')=='user.banca'){

				memoMenu.push(
					<ul>
						<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
						{/* <li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li> */}
						<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
						{/* <li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
						<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li> */}
						<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
					</ul>				
				);
				menuDD.push(
					<ul className="nav navbar-nav navbar-right">
						<li><a href="#/newbusiness" title="New Business" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
						{/* <li><a href="#/pre_reg_list" title="Pre Registration" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Pre Registration</a></li> */}
						<li><a href="#/memo/folder" title="Memo" style={{'color':'#17b2e2'}}><i className="fa fa-book"></i> E-Library</a></li>
						{/* <li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
						<li><a href="#/training" title="training" style={{'color':'#17b2e2'}}><i className="fa fa-caret-square-o-right"></i> Training</a></li> */}
						<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
					</ul>
				);
			}else{
				memoMenu.push(
					<ul>
						<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
						{/* <li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li> */}
						<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
						<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
						<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>
						<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
					</ul>				
				);
				menuDD.push(
					<ul className="nav navbar-nav navbar-right">
						<li><a href="#/newbusiness" title="New Business" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
						{/* <li><a href="#/pre_reg_list" title="Pre Registration" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Pre Registration</a></li> */}
						<li><a href="#/memo/folder" title="Memo" style={{'color':'#17b2e2'}}><i className="fa fa-book"></i> E-Library</a></li>
						<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
						<li><a href="#/training" title="training" style={{'color':'#17b2e2'}}><i className="fa fa-caret-square-o-right"></i> Training</a></li>
						<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
					</ul>
				);
			}
		}else if(localStorage.getItem('role') == '17' || localStorage.getItem('role') == '18' || localStorage.getItem('role') == '19' || localStorage.getItem('role') == '20'){
			
			dashboardUrl = 'dashboard';
			memoMenu.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					{/* <li><a href="#/comission" title="report"><i className="fa fa-bar-chart"></i> Report</a></li> */}
					<li><a href="#/newbusiness" title="Inquiry"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					{/* <li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li> */}
					{/* <li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li> */}
					{/* <li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-users"></i> Org Chart</a></li>
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>						 */}
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>		
					{/* <li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li> */}
					{/*<li><a href="#/cpp" title="Core Producer Program"> CPP</a></li>									*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
			menuDD.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard" style={{'color':'#17b2e2'}}><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile" style={{'color':'#17b2e2'}}><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					{/* <li><a href="#/comission" title="report" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> Report</a></li> */}
					<li><a href="#/newbusiness" title="Inquiry" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
					{/* <li><a href="#/pre_reg_list" title="Pre Registration" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Pre Registration</a></li> */}
					{/* <li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> AMS Report</a></li> */}
					{/* <li><a href="#/tm_connect" title="TMConnect" style={{'color':'#17b2e2'}}><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/group_info/tree" title="Org Chart" style={{'color':'#17b2e2'}}><i className="fa fa-users"></i> Org Chart</a></li>
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>	 */}
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>		
					{/* <li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li> */}
					{/*<li><a href="#/cpp" title="Core Producer Program"> CPP</a></li>									*/}
					<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}else{
			memoMenu.push(
				<ul>
					<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="Comission"><i className="fa fa-bar-chart"></i> {LoadLabel('Report')}</a></li>				
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration"><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>		
					<li><a href="#/my_commission" title="My Commission"><i className="fa fa-dollar"></i> My Commission</a></li>	
					<li><a href="#/group_info/tree" title="Org Chart"><i className="fa fa-group"></i> Org Chart</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM"><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					{/*<li><a href="#/group_info" title="Group Info Tree"><i className="fa fa-group"></i> Group Info</a></li>*/}
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>
					{/*<li><a href="#/cpp_leader" title="Core Producer Program"> CPP</a></li>						*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
			menuDD.push(
				<ul className="nav navbar-nav navbar-right">
					<li><a href={'#/'+dashboardUrl} title="Dashboard" style={{'color':'#17b2e2'}}><i className="fa fa-cogs"></i> {LoadLabel('Dashboard')}</a></li>
					<li><a href="#/profile" title="Profile" style={{'color':'#17b2e2'}}><i className="fa fa-user"></i> {LoadLabel('Profile')}</a></li>
					<li><a href="#/comission" title="Comission" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> {LoadLabel('Report')}</a></li>	
					<li><a href="#/newbusiness" title="New Business" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/pre_reg_list" title="Pre Registration" style={{'color':'#17b2e2'}}><i className="fa fa-suitcase"></i> Pre Registration</a></li>
					<li><a href="#/memo/folder" title="Memo" style={{'color':'#17b2e2'}}><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/my_commission" title="My Commission" style={{'color':'#17b2e2'}}><i className="fa fa-dollar"></i> My Commission</a></li>	
					<li><a href="#/group_info/tree" title="Org Chart" style={{'color':'#17b2e2'}}><i className="fa fa-group"></i> Tree</a></li>
					<li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="SAM" style={{'color':'#17b2e2'}}><i className="fa fa-bar-chart"></i> AMS Report</a></li>
					{/*<li><a href="#/group_info" title="Group Info Tree" style={{'color':'#17b2e2'}}><i className="fa fa-group"></i> Group Info</a></li>	*/}
					<li><a href="#/tm_connect" title="TMConnect" style={{'color':'#17b2e2'}}><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training" style={{'color':'#17b2e2'}}><i className="fa fa-caret-square-o-right"></i> Training</a></li>	
					{/*<li><a href="#/cpp_leader" title="Core Producer Program"> CPP</a></li>								*/}
					<li><a onClick={this.logout} title="Log Out" style={{'color':'#17b2e2'}}><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			);
		}


		return (

			<div>
				<div className="header-wrapper hidden-xs ">
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
								{memoMenu}
							</div>

							<div className="clearfix"></div>
						</div>
						<div className="afterBottom">
							<div className="left">
								<span className="titleStaticPage"><i className="fa fa-exclamation-circle"></i> {this.props.title}</span>
							</div>
							<div className="right">
								<i className="fa fa-clock-o"></i>
								<span> (Last login: {formated_last_login})</span>
							</div>
							{(localStorage.getItem('userrole') == 1 || localStorage.getItem('userrole') == 2 || localStorage.getItem('userrole') == 3 || localStorage.getItem('userrole') == 4 || localStorage.getItem('userrole') == 10?
								<div className="right">
									<a data-target="#submit_ap" data-toggle="modal" onClick={this.initForm} ><i className="fa fa-bug"></i> Submit Issue</a>
								</div>
								:
								<div className="right">
									<a style={{'color':'red'}} data-target="#submit_ap" data-toggle="modal" onClick={this.initForm} ><i className="fa fa-bug"></i> Submit Issue</a>
								</div>
							)}
							
							{(localStorage.getItem('role') != '10' ?
								<div className="right">
									<a className="feature-modal-link animated infinite flash" data-target="#feature-modal" data-toggle="modal" ><i className="fa fa-info"></i> New Features</a>
								</div>
								:''
							)}
							<div className="right hidden">
								<a onClick={this.changeLang.bind(this, 'EN')} > EN</a>
								<a onClick={this.changeLang.bind(this, 'ID')} > ID</a>
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

					<div id="navbar" className="navbar-collapse collapse navbar-collapese-mobile" aria-expanded="false" style={{"height": "0.8px"}}>
						{menuDD}
					</div>					
				</nav>
			</div>

		);
	}
}

export default TopMenuNewBusinessDetail;
