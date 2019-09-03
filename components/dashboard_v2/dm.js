'use strict'

import {CheckAgentType} from '../../common_components/helper/formatter';

// Helper
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import Loading from '../../common_components/loading';

// Layout 
import TopMenu from '../../common_components/menu_v2/top_menu';
// Personal Component
import AgentProfile from './agent_profile';
import NewBusinessTrackingSummary from './new_business_tracking_summary';
import Production from './production';
import Persistency from './persistency';
import WeeklyBonus from './weekly_bonus';
import YearEndBonus from './year_end_bonus';
// Group Component
import GroupMonthlyReport from './group_monthly_report';
import GroupNewBusinessTrackingSummary from './group_new_business_tracking_summary';
import GroupProduction from './group_production';
import GroupPersistency from './group_persistency';
import GroupOverriding from './group_overriding';
import GroupBonusOverriding from './group_bonus_overriding';
import LeaderWeeklyBonus from './LeaderWeeklyBonus';
// Modal 
import NewBusinessModal from '../../common_components/modal/new_business';

import ModalMessage from '../../common_components/modal/modal_message';
import SubmitModal from '../../common_components/modal/submit_modal';

import {getDashboardMenu} from '../../common_components/helper/user_session';

import Footer from '../../common_components/footer';

import FeatureModal from '../../common_components/modal/feature_modal';
import NewInfoModal from '../../common_components/modal/new_info_modal';
import cookie from 'react-cookie';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import VideoDashboard from './video_dashboard';
import BannerDashboard from './banner_dashboard';
import NotificationAlert from '../../common_components/alert/NotificationAlert';

class dashboard_dm extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			agentType: 'MO'
		}

	}

	componentWillMount(){
		CekAuth();

		$.ajax({
            url: api_route.agentDashboardv2,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');
              
				// set local storage
				localStorage.setItem('name', response.name);
				localStorage.setItem('last_login', response.last_login);
				localStorage.setItem('agent_code', response.agent_data.code);
				localStorage.setItem('last_update', response.last_updated);
				localStorage.setItem('agent_id', response.agent_data.id);

				this.setState({
					data:response,
					agentType : CheckAgentType(response.agent_data.code)
				});
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
		// $('#loading').modal('show');
		
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

	render(){
		
		let weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : null;
		let weekly_qc_commission = [];
		if(weekly_qc_commission_table)
		{
			$.map(weekly_qc_commission_table, (value, index) => {
	            let row = null;
	            if(index == 0){
	              row = <tr classNameName="red" key={index}><td>{value.total_qc}</td><td classNameName="down"><i classNameName="fa fa-level-down"></i> {value.percentage}</td><td>{value.bonus}<i classNameName="fa fa-arrow-left"></i></td></tr>
	            }else{
	              row = <tr key={index}><td>{value.total_qc}</td><td classNameName="down"><i classNameName="fa fa-level-down"></i> {value.percentage}</td><td>{value.bonus}</td></tr>
	            }
	            weekly_qc_commission.push(row);
	          }); 		
		}


		let menu = getDashboardMenu();

		return (
		<div className="wrap2">
			<MaintenanceAlert />
			{/* Start Top Menu Section */}
			{/*<NotificationAlert/>*/}
			{menu}
			{/* End Top Menu Section */}
			
			<div className="main-wrapper">
				<ol className="breadcrumb" style={{marginBottom: '5px'}}>
					 <li className="active">Dashboard</li>
				</ol>
				<div className="main">
					<div className="tab-content">
						<div role="tabpanel" className="tab-pane active" id="personalselling">
							<div className="topWidget">
								<div className="row">
									
									<div className="col-xs-6 responsive3">
										<VideoDashboard/>
									</div>
									<div className="col-xs-6 responsive3">
										<BannerDashboard/>
									</div>
								</div>
								
								<div className="clearfix h25"></div>

								<div className="row">
									<div className="col-xs-4 responsive3">
										{/* Start Agent Profile Section */}
										<AgentProfile data={this.state.data && this.state.data} />
										{/* End Agent Profile Section */}
									</div>
									<div className="col-xs-8 responsive3">
											<NewBusinessTrackingSummary data={this.state.data && this.state.data} />
									</div>
								</div>

								<div className="clearfix h25"></div>
								
								<div className="row">
									<div className="col-xs-6 responsive3">
										{/* Start Production Section */}
										<Production data={this.state.data && this.state.data} />
										{/* End Production Section */}
									</div>
									<div className="col-xs-6 responsive3">
										{/* Start Production Section */}
											{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
										        ? <Persistency data={this.state.data && this.state.data} />
										        : ''
										    )}
										{/* End Production Section */}
									</div>
								</div>
								
								<div className="clearfix h25"></div>
								
								{/*{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
							        ? 	<div className="bottomWidget">
											<div className="title">Income Calculation</div>
											<div className="content">
												<div className="row">
												  <div className="col-xs-12 responsive3">
													<WeeklyBonus data={this.state.data && this.state.data} />
												  </div>
												  
												  <div className="clearfix h25"></div>	

												  <div className="col-xs-12 responsive3">
													<YearEndBonus data={this.state.data && this.state.data} />
												  </div>
												</div>
											</div>
										</div>
							        : ''
							    )}*/}
							</div>
						</div>
						
						<div role="tabpanel" className="tab-pane" id="groupselling">
							<div className="topWidget">
								<div className="row">
									<div className="col-xs-6 responsive3">
										<VideoDashboard/>
									</div>
									<div className="col-xs-6 responsive3">
										<BannerDashboard/>
									</div>
								</div>
								
								<div className="clearfix h25"></div>
								
								<div className="row">
									<div className="col-xs-4 responsive3">
										{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
									        ? <GroupMonthlyReport data={this.state.data && this.state.data} />
									        : <GroupProduction data={this.state.data && this.state.data} />
									    )}
									</div>
									<div className="col-xs-8 responsive3">
											<GroupNewBusinessTrackingSummary data={this.state.data && this.state.data} />
									</div>
								</div>
										
								<div className="clearfix h25"></div>
								
								<div className="row">
									<div className="col-xs-6 responsive3">
										{/* Start Production Section */}
										{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
									        ? <GroupProduction data={this.state.data && this.state.data} />
									        : ''
									    )}
										{/* End Production Section */}
									</div>
									<div className="col-xs-6 responsive3">
										{/* Start Production Section */}
										{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
									        ? <GroupPersistency data={this.state.data && this.state.data} />
									        : ''
									    )}
										{/* End Production Section */}
									</div>
								</div>
								
								<div className="clearfix h25"></div>
								{/*<div className="bottomWidget">
									<div className="title">Income Calculation</div>
									<div className="content">

										<div className="row">
											<div className="col-xs-4">
												<GroupOverriding data={this.state.data && this.state.data} />
											</div>		
											<div className="col-xs-8">
												<LeaderWeeklyBonus data-bonus={'Ok'} />
											</div>																			
										</div>
										<div className="row">
											<div className="col-xs-1">
												<div className="clearfix"></div>
											</div>
										</div>
										
									</div>
								</div>*/}
							</div>
						</div>
					</div>
				</div>
			</div>

			<SubmitModal />

			<Footer />
			
			<div className="modal fade" id="persistency" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content">
					<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<tr>
								<th colspan="2">Persistency Personal</th>
							</tr>
							<tr>
								<td>1</td>
								<td>No SPAJ</td>
							</tr>
							<tr>
								<td>2</td>
								<td>No Policy (Jika sudah terbentuk)</td>
							</tr>
						</table>
					</div>
				</div>
			  </div>
			</div>
			
			<div className="modal fade" id="weeklyBonus" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content">
					<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<thead>
								<tr>
									<th>Total 12 rolling week QC</th>
									<th>% of FYC</th>
									<th>Total Bonus</th>
								</tr>
							</thead>
							<tbody>
								{weekly_qc_commission}
							</tbody>
						</table>
					</div>
				</div>
			  </div>
			</div>

			<Loading />
			<FeatureModal />
			<NewInfoModal />
		</div>
		);
	}
}

export default dashboard_dm;