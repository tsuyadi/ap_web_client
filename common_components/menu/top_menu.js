'use strict'

class TopMenu extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		
	}

	render(){
		return (
			<header id="header" className="app-header navbar" role="menu">
		      <div className="collapse pos-rlt navbar-collapse box-shadow bg-info" style={{marginLeft: '0',paddingLeft: '200px'}}>
		        <div className="nav navbar-nav hidden-xs">
		          <a href="#" className="btn no-shadow navbar-btn" ui-toggle-className="show" >
		            Branch Office
		          </a>
		        </div>

		        <div className="nav navbar-nav navbar-right">
		          	<div className="nav navbar-nav hidden-xs">
			          <a href="#" className="btn no-shadow navbar-btn" ui-toggle-className="show" >
			            Log Out
			          </a>
			        </div>
		        </div>

		      </div>
		  </header>
		);
	}
}

export default TopMenu;