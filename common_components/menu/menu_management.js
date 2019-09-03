'use strict'

class MenuManagement extends React.Component {
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
		                <a href="#/profile" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Profile</span>
		                </a>
		              </li>
		                <li>
		                <a href="#/profile" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Group Info</span>
		                </a>
		              </li>
		                <li>
		                <a href="#/profile" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Family Tree</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/management" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Inquiry</span>
		                </a>
		              </li>
		              <li>
		                <a href="#/management" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Reporting</span>
		                </a>
		              </li>
		              <li className="line dk"></li>
		            </ul>
		          </nav>

		        </div>
		      </div>
		  </aside>
		);
	}
}

export default MenuManagement;