'use strict'

import {CheckAgentType} from '../../common_components/helper/formatter';

// Helper
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import Loading from '../../common_components/loading';
// Layout 
import TopMenuRd from '../../common_components/menu_v2/top_menu_rd';
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
// Modal 
import NewBusinessModal from '../../common_components/modal/new_business_group_rd';
import GroupRdMIO from './group_rd_mio';
import GroupRdMIB from './group_rd_mib';
import GroupRdMPA from './group_rd_mpa';
import GroupRdTotalIncome from './group_rd_total_income';
import GroupRdComission from './group_rd_comission';

import ModalMessage from '../../common_components/modal/modal_message';
import {getDashboardMenu} from '../../common_components/helper/user_session'; 

import {loadLinkCustom} from '../../common_components/helper/url_helper';

import Footer from '../../common_components/footer';

import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import NewInfoModal from '../../common_components/modal/new_info_modal';

import cookie from 'react-cookie';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import NotificationAlert from '../../common_components/alert/NotificationAlert';
import VideoDashboard from './video_dashboard';
import BannerDashboard from './banner_dashboard';
//import InfoAlert from '../../common_components/alert/InfoAlert';

class dashboard_rd extends React.Component {
	constructor(props){
		super(props);
		
		this.state = {
			data: null,
			incalc : null,
			agentType: 'MO'
		}

		this.getBonus = this.getBonus.bind(this);
		CekAuth();
	}

	componentWillMount () {
		CekAuth();
		
		this.getBonus();
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
				debugger;
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

	componentDidMount () {
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

	getBonus(){
		loadLinkCustom(api_route.bonus_mib, (response) => {
			// $('.load-incomecalc').hide();
			this.setState({
				incalc : response.specific_data.income_calculation
			});
		}
		, (error) => {
			// $('.load-incomecalc').hide();
			console.dir(error);
			alert('Something error happened, please contact agency portal support');			
		});
	}

	
	render(){
		
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

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

		//notif
		 	// var divNotif = [];
			// var rowNotif = null;
			// var dataNotif = null;
			// var content= [];
			// if(this.state.dataNotif || this.state.dataNotif != []){
			// 	dataNotif = this.state.dataNotif;
			// 	$.map(dataNotif, (value, index) => {
			// 		row = <a style={{textAlign:'left', marginRight:'10', fontSize: '14', fontWeight: 'bold', color:'white'}} data-toggle='modal' data-target='#notif-modal'>{value.title} </a>
			// 		divNotif.push(row);
			// 		content.push(<NotifModal data={value.title}/>)
			// 	});
			// }
		return (
		<div className="wrap2">
			{/*<InfoAlert/>*/}
			<MaintenanceAlert />
			{/*<NotificationAlert />*/}
			<SubmitModal />
			{/* Start Top Menu Section */}
			{menu}
			{/* End Top Menu Section */}
			{/*<div>
                <div id="notif-maintenance" className="alert text-center" style={{height:'50px'}}>
                    <marquee scrolldelay="100">{divNotif}</marquee>
                </div>
            </div>*/}

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
										{/* Start New Business Tracking Summary Section */} 
										{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
									        ? <GroupMonthlyReport data={this.state.data && this.state.data} />
									        : <GroupProduction data={this.state.data && this.state.data} />
									    )}
										{/* End New Business Tracking Summary Section */}
									</div>
									<div className="col-xs-8 responsive3">
										{/* Start New Business Tracking Summary Section */}
										<GroupNewBusinessTrackingSummary data={this.state.data && this.state.data} />
										{/* End New Business Tracking Summary Section */}
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
											<div className="col-xs-12">
												<GroupRdComission data={this.state.incalc} />
											</div>
										</div>
										<div className="row">
											
											<div className="col-md-4 responsive3">
												<GroupRdMIB data={this.state.incalc} />
											</div>
											
											<div className="col-md-4 responsive3">
												<GroupRdMIO data={this.state.incalc} />
											</div>

											<div className="col-md-4 responsive3">
												<GroupRdMPA data={this.state.incalc} />
											</div>
										</div>
										<br />
										<div className="row">
											
											
											<div className="col-xs-12 responsive3">
												<GroupRdTotalIncome data={this.state.incalc} />
											</div>
										</div>
									</div>
								</div>*/}
								
							</div>
						</div>
					</div>
				</div>
			</div>
			
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

export default dashboard_rd;