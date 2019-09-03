'use strict'

import api_route from '../../common_components/api_route';
import Footer from '../../common_components/footer';
import TopMenu from '../../common_components/menu/top_menu';
import LeftMenu from '../../common_components/menu/menu_branch_admin';
import CekAuth from '../../common_components/helper/cek_auth';
import Application from '../application_v2';
import CustomerPolicyServicing from '../customer_v2';

class Admin extends React.Component {
	constructor(props){
		super(props);
		CekAuth();
	}

	componentDidMount = () => {
		NProgress.start();
		$.ajax({
            url: api_route.branchDashboard,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
              NProgress.done();
              this.setState({data:response});
            },
            error: (err, response) => {
              NProgress.done();
              if(err.responseJSON){
              	
              }
              
            }
        });
	}

	state = {
		data: null
	}

	render(){
		return (
			<div className="app app-header-fixed ">
				<TopMenu />
				<LeftMenu />
				<div id="content" className="app-content" role="main">
					<div className="app-content-body ">
						<div className="hbox hbox-auto-xs hbox-auto-sm" ng-init=" app.settings.asideFolded = false; app.settings.asideDock = false; ">
							<div className="col">
								<div className="bg-light lter b-b wrapper-md">
									<div className="row">
										<div className="col-md-12" >
											<h3 style={{margin: 0}}>Admin Dashboard</h3>
										</div>
									</div>
								</div>
							</div>
						</div>
						<div className="wrapper-md" ng-controller="FlotChartDemoCtrl">
							<div className="row">
								<div className="col-md-12" style={{marginTop:'0px'}}>
									<Application data={this.state.data != null ? this.state.data.specific_data.spaj : {}}/>
								</div>
							</div>
							<div className="row">
								<div className="col-md-12">
									<CustomerPolicyServicing data={this.state.data != null ? this.state.data.specific_data : {}} />
								</div>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default Admin;