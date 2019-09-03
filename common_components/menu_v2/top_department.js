'use strict'

import {DateFormat, DateFormatEx, DateFormatMonthName } from '../../common_components/helper/formatter';
import { getAllUrlParams } from '../../common_components/helper/url_helper';
import api_route from '../../common_components/api_route';
class TopMenuDepartment extends React.Component {
	constructor(props){
		super(props);

		this.logout = this.logout.bind(this);
	}

	state = {
		username : localStorage.getItem('username'),
		lastlogin : localStorage.getItem('last_login'),
		lastUpdate : localStorage.getItem('last_update'),
		dashboardRole: [1,2,3,4,5,6,7,8,9,10,14],
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
				var monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"
                              ];
				let dd = last_login.getDate();
				let mm = last_login.getMonth()+1; //January is 0!
				let yyyy = last_login.getFullYear();

				formated_last_login = dd+' '+monthNames[mm]+' '+yyyy;		
			}
			else
			{
				let currentdate = new Date();
				var monthNames = ["January", "February", "March", "April", "May", "June",
                              "July", "August", "September", "October", "November", "December"
                              ];
				let dd = currentdate.getDate();
				let mm = currentdate.getMonth()+1; //January is 0!
				let yyyy = currentdate.getFullYear();

				formated_last_login = dd+' '+monthNames[mm]+' '+yyyy;		
			}

			let dashboardUrl = null;
			let userrole = parseInt(localStorage.getItem('userrole'));
			// // debugger;
			if(this.state.dashboardRole.indexOf(userrole) != -1)
	      	{
	      		//dashboardUrl  ='dashboard_' + this.state.dashboardMaps[userrole];	
				  dashboardUrl  ='dashboard';	
	      	}
			 let menu =[];
			 
		if(localStorage.getItem('username') == 'user.banca'){
			menu.push(
				<ul>
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
					{/* <li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li> */}
					{/*<li><a href="#/report_management" title="Comission"><i className="fa fa-bar-chart"></i> Report</a></li>
					
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> New Business</a></li>
					
					<li><a href="#/newbusiness/policy_info" title="New Business"><i className="fa fa-suitcase"></i> New Business</a></li>
					<li><a href="#/policy/policy_info" title="Policy"><i className="fa fa-exclamation-circle"></i>Policy</a></li>
					*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			)
		} else{
			menu.push(
				<ul>
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> Inquiry</a></li>
					<li><a href="#/memo/folder" title="Memo"><i className="fa fa-book"></i> E-Library</a></li>
					<li><a href="#/tm_connect" title="TMConnect"><i className="fa fa-mobile"></i> TMConnect</a></li>
					<li><a href="#/training" title="training"><i className="fa fa-caret-square-o-right"></i> Training</a></li>
					{/*<li><a href="#/report_management" title="Comission"><i className="fa fa-bar-chart"></i> Report</a></li>
					
					<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> New Business</a></li>
					
					<li><a href="#/newbusiness/policy_info" title="New Business"><i className="fa fa-suitcase"></i> New Business</a></li>
					<li><a href="#/policy/policy_info" title="Policy"><i className="fa fa-exclamation-circle"></i>Policy</a></li>
					*/}
					<li><a onClick={this.logout} title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
				</ul>
			)
		}
		return (

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
								<ul className="nav nav-tabs staticPage">
									<span className="titleStaticPage"><i className="fa fa-lock"></i> Department Dashboard</span>
								</ul>
							</div>
							<div className="right">
								<i className="fa fa-clock-o"></i> 
								<span> (Last login: {formated_last_login})</span>
							</div>
							<div className="right">
								<a data-target="#submit_ap" data-toggle="modal" onClick={this.initForm} ><i className="fa fa-bug"></i> Submit Issue</a>
							</div>
							
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
			</div>

		);
	}
}

export default TopMenuDepartment;

