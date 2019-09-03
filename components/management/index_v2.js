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
import ProductionGraph from '../../components/management/production_graph';
import SubmitModal from '../../common_components/modal/submit_modal';
import ManagementApplicationModal from '../../common_components/modal/management_application_modal';
import PreRegModal from '../../common_components/modal/pre_reg_modal';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import FeatureModal from '../../common_components/modal/feature_modal';

import cookie from 'react-cookie';
import NewInfoModal from '../../common_components/modal/new_info_modal';

class Management extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: null,
			dataGraph: null,
			period_type : 1,
			dataProductInfo: null,
			dataProductionByBranch: null,
			dataProductionByType: null,
			// spaj.mtd.group.issued
			last_update : null,
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
		$('body').css('margin-top', '80px');
	}

	changePeriod = (period) => {

		this.loadGraphSummary(period);
		this.loadProductionByBranch(period);

		this.setState({
			changePeriod : period
		});
	}

	loadGraphSummary = (period_type) => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.managementDashboard,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: { 
					'viewtype': 'agent',
					'option' : period_type
			},
            // processData: false,
            // contentType: false,
            type: 'POST',
            success: (response) => {
				$('#loading').modal('hide');
				localStorage.setItem('name', response.common_data.name);
				var intToken = parseInt(localStorage.getItem('tokenLastActivity'));
				localStorage.setItem('last_login', this.changeDate(intToken));
				this.setState({dataGraph:response});
			  
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
	}

	componentDidMount(){
		
		$('#loading').modal('show');
		$('body').css('padding-right', '0px');
		$.ajax({
            url: api_route.managementDashboard,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: { 
					'viewtype': 'agent',
					'option' : '1'
			},
            // processData: false,
            // contentType: false,
            type: 'POST',
            success: (response) => {
				this.loadProductInfo();
				this.loadProductionByBranch('1');
				localStorage.setItem('uid', response.common_data.agent_data.id);
				$('#loading').modal('hide');
				localStorage.setItem('name', response.common_data.name);
				localStorage.setItem('last_update', response.common_data.updated.summary);
				var intToken = parseInt(localStorage.getItem('tokenLastActivity'));
				localStorage.setItem('last_login', this.changeDate(intToken));
				this.setState({data:response, dataGraph:response, last_update:response.common_data.updated});
				if(localStorage.getItem('role') == 3 || localStorage.getItem('role') == 4){
					if(localStorage.getItem('afterlogin') == "true"){
						var agent_code = localStorage.getItem('username');
						let hidefeature = cookie.load('hidefeature_' + agent_code);
			  
						if(hidefeature == "false" || hidefeature == undefined ){
							localStorage.setItem('afterlogin', 'false');
							var dt = new Date('2017-04-01');
							cookie.save('hidefeature_' + agent_code, "true", { path : '/', expires : dt })
							$('#info-modal').modal('show');
						}

					}
				}
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
	}

	loadProductInfo = () => {

		$.ajax({
            url: api_route.product_info_summary,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            // processData: false,
            // contentType: false,
            type: 'GET',
            success: (response) => {
			  this.setState({dataProductInfo:response.content});
			  
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
	}

	openNewBusiness = (modalVal, statusSPAJ) => {
		this.setState({
			modalVal : modalVal,
			statusSPAJ : statusSPAJ
		});
	}

	loadProductionByBranch = (param) => {
		

		$.ajax({
            url: api_route.production_by_branch,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {
				'period' : param
			},
            // processData: false,
            // contentType: false,
            type: 'POST',
            success: (response) => {
			 	this.setState({
				  dataProductionByBranch:response.production_by_branch,
				  dataProductionByType:response.production_by_type
				});
			  
            },
            error: (err, response) => {
				// // debugger;
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
				{/*{localStorage.getItem('role') == 3 || localStorage.getItem('role') == 4 ? <MaintenanceAlert /> : ''}*/}
					{/* Start Top Menu Section */}
					<TopMenu username={this.state.data && this.state.data.common_data.name} lastlogin={this.state.data && this.state.data.last_login} last_update={this.state.last_update && this.state.last_update.summary}/>
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
										<GroupNewBusinessTrackingSummaryManagement data={this.state.data && this.state.data} newBusinessAction={this.openNewBusiness} />
										{/* End New Business Tracking Summary Section */}
									</div>
								</div>
								<div className="row">
									<div className="col-xs-12">&nbsp;</div>
								</div>
								<div className="row">
									<ProductionSummary data={this.state.data}  />
								</div>
								<div className="row">
									<div className="col-xs-12">&nbsp;</div>
								</div>
								<div className="row" style={{display: 'none'}}>
									<div className="col-xs-12">
										<ProductionGraph 
											data={this.state.dataGraph} 
											dataProductInfo={this.state.dataProductInfo} 
											changePeriod={this.changePeriod}
											dataProductionByBranch={this.state.dataProductionByBranch} 
											dataProductionByType={this.state.dataProductionByType}  
											/>
									</div>
								</div>
							</div>
							<div className="clearfix h25"></div>
							
						</div>
					</div>
					<NewInfoModal />
					<Loading />
					<FeatureModal/>
					<SubmitModal />
					<ManagementApplicationModal data={this.state.modalVal && this.state.modalVal} statusSPAJ={this.state.statusSPAJ} />
					{/* <PreRegModal /> */}
					<Footer />

				</div>
		);
	}
}

export default Management;