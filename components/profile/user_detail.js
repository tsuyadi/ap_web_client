'use strict'

import React from 'react';
import NProgress from 'nprogress';
// import $ from 'jQuery';

import api_route from '../../common_components/api_route';
import Footer from '../../common_components/footer';
import TopMenu from '../../common_components/menu/top_menu';
import LeftMenu from '../../common_components/menu/left_menu';
import CekAuth from '../../common_components/helper/cek_auth';

class user_detail extends React.Component {
	constructor(props){
		super(props);
		CekAuth();
	}

	componentDidMount = () => {
		NProgress.start();
		$.ajax({
			url: api_route.profile,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
		    data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
            	NProgress.done();
              this.setState({
              	agent_profile:response.content.agent_profile,
              	user:response.content.user,
              	user_name:response.content.user.first_name + ' ' + response.content.user.last_name
              });
            },
            error: (err, response) => {
              NProgress.done();
              if(err.responseJSON){
              	
              }
              
            }
        });
	}

	render(){
		return (
			<div className="app app-header-fixed">
				<TopMenu />
				<LeftMenu />
				<div id="content" className="app-content" role="main">
					<div className="app-content-body ">
						<div className="hbox hbox-auto-xs hbox-auto-sm" ng-init=" app.settings.asideFolded = false; app.settings.asideDock = false; ">
							<div className="col">
								<div className="wrapper-md" ng-controller="FlotChartDemoCtrl">
									<div className="row">
										<div>
										Personal Data
										</div>
										<div className="panel no-border col-md-12" style={{float: 'left',padding: '20px'}}>
								            <div className="col-md-2">
								            	<div><img src="http://placehold.it/140x200" width="100%" height="200px" /></div>
								            </div>
								            <div className="col-md-3">
								            	<div style={{paddingBottom: '10px'}}>&nbsp;</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Agent Name 
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Agent Code
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Agent Level
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Agent Status
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            </div>
								            <div className="col-md-3">
								            	<div style={{paddingBottom: '10px'}}>&nbsp;</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Sex
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Birthdate
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Religion
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Marital Status
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			ID No
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>								            	
								            </div>
								            <div className="col-md-4">
								            	<div style={{paddingBottom: '10px'}}>&nbsp;</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			NPWP No
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			PTKP Status
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Bank Account No
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Bank Name
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Account Holder Name
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            </div>
								          </div>

									</div>
								</div>


								<div className="wrapper-md" ng-controller="FlotChartDemoCtrl">
									<div className="row">
										<div className="panel no-border col-md-12" style={{float: 'left',padding: '20px'}}>
								            <div className="col-md-4">
								            	<div style={{paddingBottom: '10px'}}>CONTACT</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Address
								            		</div>
								            		<div className="col-md-8" valign="top">
								            			: <textarea style={{width: '95%'}} value="Test"></textarea>
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Phone
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Mobile Phone
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Business Phone
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Email Address
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            </div>
								            <div className="col-md-4">
								            	<div style={{paddingBottom: '10px'}}>STATUS</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			RD
								            		</div>
								            		<div className="col-md-8">
								            			: <textarea style={{width: '95%'}} value="Test"></textarea>
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			RM
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			SM
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			DM
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Recruiter
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            </div>
								            <div className="col-md-4">
								            	<div style={{paddingBottom: '10px'}}>CONTACT</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			Office Name
								            		</div>
								            		<div className="col-md-8">
								            			: <textarea style={{width: '95%'}} value="Test"></textarea>
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			AAJI No.
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            	<div className="row" style={{paddingBottom: '10px'}}>
								            		<div className="col-md-4">
								            			AAJI Expired
								            		</div>
								            		<div className="col-md-8">
								            			: <input type="text" value="test" style={{width: '95%'}} />
								            		</div>
								            	</div>
								            </div>
								            <div className="clear" style={{clear:'both'}}></div>
								          	<div><a href>Update Data...</a></div>
								          </div>

									</div>
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

export default profile;