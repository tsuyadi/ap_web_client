'use strict'

class LeftMenu extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		
	}

	render(){
		return (
			<aside id="aside" className="app-aside hidden-xs bg-light">
		      <div className="aside-wrap">
		        <div className="navi-wrap">
		          <nav ui-nav className="navi clearfix">
		            <ul className="nav">
		              <li className="hidden-folded padder m-t m-b-sm text-muted text-xs">
		                <span>Navigation</span>
		              </li>
		              <li>
		                <a href="#/dashboard" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Agent Dashboard</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/dashboardsm" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Agent Dashboard SM</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/dashboardrm" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Agent Dashboard RM</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/dashboardrd" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Agent Dashboard RD</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/dashboarddm" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Agent Dashboard DM</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/management" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>    
		                  <span>Management</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/admin" className="auto">    
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Branch Admin</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/profile" className="auto">    
		                  <i className="icon-user icon text-success-lter"></i>
		                  <span>My Profile</span>
		                </a>
		              </li>
		              <li className="line dk"></li>
		            </ul>
		          </nav>
		          <div className="wrapper m-t">
		            <div className="text-center-folded">
		              <span className="pull-right pull-none-folded">60%</span>
		              <span className="hidden-folded">Milestone</span>
		            </div>
		            <div className="progress progress-xxs m-t-sm dk">
		              <div className="progress-bar progress-bar-info" style={{width: '60%'}}>
		              </div>
		            </div>
		            <div className="text-center-folded">
		              <span className="pull-right pull-none-folded">35%</span>
		              <span className="hidden-folded">Release</span>
		            </div>
		            <div className="progress progress-xxs m-t-sm dk">
		              <div className="progress-bar progress-bar-primary" style={{width: '35%'}}>
		              </div>
		            </div>
		          </div>
		        </div>
		      </div>
		  </aside>
		);
	}
}

export default LeftMenu;