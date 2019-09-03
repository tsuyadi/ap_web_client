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
import LeaderWeeklyBonus from './LeaderWeeklyBonus';
// Group Component
import GroupMonthlyReport from './group_monthly_report';
import GroupNewBusinessTrackingSummary from './group_new_business_tracking_summary';
import GroupProduction from './group_production';
import GroupPersistency from './group_persistency';
import GroupSmOverriding from './group_sm_overriding';
import GroupSmBonusOverriding from './group_sm_bonus_overriding';
// Modal 
// import NewBusinessModal from '../../common_components/modal/new_business';

import ModalMessage from '../../common_components/modal/modal_message';
import SubmitModal from '../../common_components/modal/submit_modal';

import {getDashboardMenu} from '../../common_components/helper/user_session';

import Footer from '../../common_components/footer';

import FeatureModal from '../../common_components/modal/feature_modal';
import NewInfoModal from '../../common_components/modal/new_info_modal';
import cookie from 'react-cookie';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';

class dashboard_sm extends React.Component {
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
			<SubmitModal />
			{/* Start Top Menu Section */}
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
									<div className="col-xs-4 responsive3">
										{/* Start Agent Profile Section */}
										<AgentProfile data={this.state.data && this.state.data} />
										{/* End Agent Profile Section */}
									</div>
									<div className="col-xs-8 responsive3">
										{/* Start New Business Tracking Summary Section */}
										<NewBusinessTrackingSummary data={this.state.data && this.state.data} />
										{/* End New Business Tracking Summary Section */}
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
								{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
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
							    )}
							</div>
						</div>
						
						<div role="tabpanel" className="tab-pane" id="groupselling">
							<div className="topWidget">
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
								
								<div className="bottomWidget">
									<div className="title">Income Calculation</div>
									<div className="content">
										<div className="row">
											<div className="col-xs-5 responsive3">
												<GroupSmOverriding data={this.state.data && this.state.data} />
											</div>
											
											<div className="col-xs-7 responsive3">
												<LeaderWeeklyBonus data-bonus={'Ok'} />
											</div>
										</div>
									</div>
								</div>
								
								
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

export default dashboard_sm;

var NewBusiness = React.createClass({
  render: function() {
    return <div className="content newbusiness">
			<div className="title"><i className="fa fa-newspaper-o"></i> New Business Tracking Summary</div>
			<div className="entry">
				<table className="table table-striped">
					<thead>
						<tr>
							<th></th>
							<th className="bullet">MTD</th>
							<th className="bullet">YTD</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td>Submit</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && this.state.data.spaj.mtd.personal.submit}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && this.state.data.spaj.ytd.personal.submit}</span></a></td>
						</tr>
						<tr>
							<td>&nbsp;&nbsp;Issued</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.issued}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.issued}</span></a></td>
						</tr>
						<tr>
							<td>&nbsp;&nbsp;Pending</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.pending}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.pending}</span></a></td>
						</tr>
						<tr>
							<td>&nbsp;&nbsp;Declined</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.declined}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.declined}</span></a></td>
						</tr>
						<tr>
							<td>&nbsp;&nbsp;Withdrawn</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.withdrawn}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.withdrawn}</span></a></td>
						</tr>
						<tr>
							<td>&nbsp;&nbsp;Postponed</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.postponed}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#newbusiness"><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.postponed}</span></a></td>
						</tr>
					</tbody>
				</table>
			</div>
		</div>;
  }
});