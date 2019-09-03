'use strict'

import api_route from '../../common_components/api_route';
import Footer from '../../common_components/footer';
import TopMenu from '../../common_components/menu_v2/top_mgt';
import LeftMenu from '../../common_components/menu/menu_management';
import CekAuth from '../../common_components/helper/cek_auth';
import ProductionSummary from '../../components/management/production_summary_v2';
import Application from '../application_v2';
import Customer from '../customer_v2';
import Loading from '../../common_components/loading';
import GroupMonthlyReportManagement from '../../components/management/group_monthly_report_management';
import GroupNewBusinessTrackingSummaryManagement from '../../components/management/group_new_business_tracking_summary_management';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';

class DeptDashboard extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: null,
			// spaj.mtd.group.issued
			data_sample : {
				data : {
					spaj : {
						mtd : {
							group : {
								issued : 10,
								postponed : 10,
								withdrawn : 10,
								declined : 10,
								underwriting : 10,
								pending : 10,
								submit : 10
							},
							personal : {
								issued : 10,
								postponed : 10,
								withdrawn : 10,
								declined : 10,
								underwriting : 10,
								pending : 10,
								submit : 10
							}
						},
						ytd : {
							group : {
								issued : 10,
								postponed : 10,
								withdrawn : 10,
								declined : 10,
								underwriting : 10,
								pending : 10,
								submit : 10
							},
							personal : {
								issued : 10,
								postponed : 10,
								withdrawn : 10,
								declined : 10,
								underwriting : 10,
								pending : 10,
								submit : 10
							}
						}
					}
				}
			}
		}
	}

	componentWillMount(){
		CekAuth();
	}

	componentDidMount(){
		$('#loading').modal('show');
		$.ajax({
            url: api_route.managementDashboard,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: { 
					'viewtype': 'branch'
			},
            processData: false,
            // contentType: false,
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');
			  localStorage.setItem('name', response.common_data.name);
			  var intToken = parseInt(localStorage.getItem('tokenLastActivity'));
			  localStorage.setItem('last_login', this.changeDate(intToken));
			  this.setState({data:response});
			  
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
	}

	changeDate(millisecond){
		return new Date(millisecond);
	}

	render(){
		
		return (
			<div className="wrap2">
					{/*<MaintenanceAlert />*/}
					{/* Start Top Menu Section */}
					<TopMenu username={this.state.data && this.state.data.common_data.name} lastlogin={this.state.data && this.state.data.last_login}/>
					{/* End Top Menu Section */}

					<div className="main-wrapper">
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li className="active">Dashboard</li>
						</ol>
						<div className="main">
							<div className="topWidget">
								<div className="row">
									<div className="col-xs-4 responsive3">
										{/* Start New Business Tracking Summary Section */} 
										<GroupMonthlyReportManagement data={this.state.data && this.state.data} />
										{/* End New Business Tracking Summary Section */}
									</div>
									<div className="col-xs-8 responsive3">
										{/* Start New Business Tracking Summary Section */}
										<GroupNewBusinessTrackingSummaryManagement data={this.state.data && this.state.data} />
										{/* End New Business Tracking Summary Section */}
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12">&nbsp;</div>
								</div>
								<div className="row">
									<ProductionSummary data={this.state.data}/>
								</div>
							</div>
							<div className="clearfix h25"></div>
							
						</div>
					</div>
					<Footer />
					<Loading />

				</div>
		);
	}
}

export default DeptDashboard;