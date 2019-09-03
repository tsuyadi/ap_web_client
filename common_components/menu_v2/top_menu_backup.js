'use strict'

class TopMenu extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		username : localStorage.getItem('name'),
		lastlogin : localStorage.getItem('last_login'),
		dashboardRole: [5,6,7,8,9],
		dashboardMaps : []
	}

	componentDidMount = () => {
		this.state.dashboardMaps[9] = 'fc';
		this.state.dashboardMaps[8] = 'sm';
		this.state.dashboardMaps[7] = 'dm';
		this.state.dashboardMaps[6] = 'rm';
		this.state.dashboardMaps[5] = 'rd';
	}

	componentWillReceiveProps = (p) => {
        if(p.username != null)
        {
          this.setState({
            username: p.username,
            lastlogin : p.lastlogin
          });
        }
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
	      		dashboardUrl  ='dashboard_' + this.state.dashboardMaps[userrole];	
	      	}
			 
		return (
			<div className="header-wrapper">
				<div className="header">
					<div className="welcome">
						<h1><span className="text">Welcome,</span> <i className="fa fa-user"></i> <span className="user">{this.state.username}</span></h1>
					</div>
					<div className="menu">
						<div className="menuIcon">
							<i className="fa fa-bars"></i>
							<i className="fa fa-times"></i>
						</div>
						<ul>
							<li><a href={'#/'+dashboardUrl} title="Dashboard"><i className="fa fa-cogs"></i> Dashboard</a></li>
							<li><a href="#/profile" title="Profile"><i className="fa fa-user"></i> Profile</a></li>
							<li><a href="#/comission" title="Comission"><i className="fa fa-bar-chart"></i> Report</a></li>
									{/*
									<li><a href="#/newbusiness" title="New Business"><i className="fa fa-suitcase"></i> New Business</a></li>
									
									<li><a href="#/newbusiness/policy_info" title="New Business"><i className="fa fa-suitcase"></i> New Business</a></li>
									<li><a href="#/policy/policy_info" title="Policy"><i className="fa fa-exclamation-circle"></i>Policy</a></li>
									*/}
							<li><a href="#" title="Log Out"><i className="fa fa-sign-out"></i> Log Out</a></li>
						</ul>
					</div>
					
					<div className="clearfix"></div>
				</div>
				<div className="nav noTab">
					<div className="date">
						<i className="fa fa-clock-o"></i> <span>(Last login: {formated_last_login})</span>
					</div>
					
					<div className="clearfix"></div>
				</div>
			</div>
		);
	}
}

export default TopMenu;

