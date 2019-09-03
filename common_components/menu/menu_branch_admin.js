'use strict'

class MenuBranchAdmin extends React.Component {
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
		                <a href="#/admin" className="auto">   
                  		  <i className="glyphicon glyphicon-stats icon text-primary-dker"></i>   
		                  <span>Inquiry</span>
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

export default MenuBranchAdmin;