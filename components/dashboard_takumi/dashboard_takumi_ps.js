
import {CheckAgentType} from '../../common_components/helper/formatter';

import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import Loading from '../../common_components/loading';
import AgentProfile from './agent_profile';
import GroupNewBusinessTrackingSummary from './group_new_business_tracking_summary';
import GroupNewBusinessTrackingSummaryGS from './group_new_business_tracking_summary_gs';
import IssuranceRatio from './group_issuance_ratio';
import GroupPersistency from './group_persistency';
import PersonalPersistency from './personal_persistency';
import GroupMonthlyReport from './group_monthly_report';
import ProductionPremium from './production_premium';
import ProductionPremiumGroup from './production_premium_group';
import MonthlyAllowance from './monthly_allowance';
import MonthlyBonus from './monthly_bonus';
import YearlyBonus from './yearly_bonus';
import ExtraAllowance from './extra_allowance';
import MonthlyAllowanceGS from './monthly_allowance_gs';
import MonthlyAllowanceTD from './monthly_allowance_td';
import ExtraAllowanceGS from './extra_allowance_gs';
import MonthlyBonusGS from './monthly_bonus_gs';
import YearlyBonusGS from './yearly_bonus_gs';
import ModalMessage from '../../common_components/modal/modal_message';
import {loadLinkCustom} from '../../common_components/helper/url_helper';
import Footer from '../../common_components/footer';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import cookie from 'react-cookie';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import Overriding from './or';
import ParallelOverriding from './po';
import NewBusinessTrackingSummary from '../dashboard_v2/new_business_tracking_summary';
import BannerDashboardTakumi from '../dashboard_takumi/banner_dashboard_takumi';
import BannerDashboard from '../dashboard_v2/banner_dashboard';
import NewInfoModal from '../../common_components/modal/new_info_modal';
//Menu
import {getDashboardMenu} from '../../common_components/helper/user_session';
class DashboardTakumiPs extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			datamanpower : null
		}
	}

	componentWillMount () {
		CekAuth();
		$.ajax({
			url: api_route.dashboard_takumi,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data: [],
			processData: false,
			contentType: false,
			type: 'POST',
			success: (response) => {
				$('#loading').modal('hide');

				this.setState({
					data: response,
					//data : response.takumi_dashboard_group
				});
			},
			error: (err, response) => {
			$('#loading').modal('hide');
			if(err.responseJSON){
				window.location.href = window.location.href.split('#')[0] + '#/';
			}

			}
		});
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
              $('#loading').modal('hide');
              console.log(response);
              // set local storage
            	localStorage.setItem('name', response.content.user.first_name + ''+response.content.user.last_name);
				localStorage.setItem('last_login', response.content.user.last_login);
				// localStorage.setItem('agent_code', response.agent_data.code);
				// localStorage.setItem('last_update', response.last_updated);
				localStorage.setItem('agent_id', response.content.agent_profile.id);



							// this.state.data = response;
							// this.state.agentType = CheckAgentType(response.agent_data.code);

              this.setState({
              	data: response,
              	// agentType : CheckAgentType(response.agent_data.code)
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


	componentDidMount (){

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

	 changeSidebar(e){
        this.setState({
            visibleSidebar: e
        });
    }

	logout(e){
		$.ajax({
			url: api_route.logout,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token'),//logout
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			type: 'POST',
			// dataType: "binary",
			data: {},
			// contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			success: (response) => {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
				var url = window.location.href.split("#");
				window.location.href = url[0];
				
			},
			error: (xhr, status) => {
			  $('#loading').modal('hide');
			  if(xhr.status == '401') {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
				var url = window.location.href.split("#");
				window.location.href = url[0];
			  }else{
				alert("something wrong");
  
			  }
			}
		});
	}
	//Menu
   showRight = (event) => {
	   	event.preventDefault();
		this.refs.right.show();
	}

	show= (event) =>{
		if(event.target.id == "buttShow" || event.target.id == "buttShow1" || event.target.id == "buttShow2"){
            $('#wrapShadow').css('display','unset');
			return document.getElementById("mySidenav").style.width = "250px";
			}
		else {
            $('#wrapShadow').css('display','none');
			return document.getElementById("mySidenav").style.width = "0px";
		}
	}
	render(){
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});

		let menu = getDashboardMenu();
		return (
		<div>
			<div className="wrap2">
				<SubmitModal />
				{menu}
				<div></div>

				<div className="main-wrapper">
					<ol className="breadcrumb" style={{marginBottom: '5px',marginTop:'55px'}}>
						<li className="active">Dashboard</li>
					</ol>
					<div className="main">
						<div className="tab-content">

							{/*personal selling*/}
							<div role="tabpanel" className="tab-pane active" id="personalselling">
								<div className="topWidget">
									{/* <div className="row">
										<div className="col-xs-6 responsive3">
											<VideoDashboard/>
										</div>
										<div className="col-xs-6 responsive3">
											<BannerDashboard/>
										</div>
									</div>
									<div className="clearfix h25"></div> */}
									<div className="row">
										<div className="col-xs-12 responsive3">
											<BannerDashboardTakumi/>
										</div>
									</div>
									<div className="clearfix h25"></div>
									<div className="row">
										<div className="col-xs-4 responsive3">
											<AgentProfile/>
										</div>
										<div className="col-xs-8 responsive3">
											<NewBusinessTrackingSummary data={this.state.data && this.state.data} />
											{/* <GroupNewBusinessTrackingSummary data={this.state.data} /> */}
										</div>
									</div>

									<div className="clearfix h25"></div>

									<div className="row">
										<ProductionPremium data={this.state.data && this.state.data}/>
									</div>

									<div className="row">
										<div className="col-xs-6 responsive3">
											<PersonalPersistency data={this.state.data && this.state.data} />
										</div>

										<div className="col-xs-6 responsive3">
											<IssuranceRatio data={this.state.data && this.state.data} />
										</div>
									</div>

									<div className="clearfix h25"></div>

									<div className="bottomWidget">
										<div className="title">Income Calculation</div>
										<div className="content">
											<div className="row">
												<div className="col-md-6 responsive3">
													<MonthlyBonus data={this.state.data}/>
												</div>

												<div className="col-md-6 responsive3">
													<YearlyBonus data={this.state.data}/>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>

							{/*group selling*/}
							<div role="tabpanel" className="tab-pane" id="groupselling">
								<div className="topWidget">
									{/* <div className="row">
										<div className="col-xs-6 responsive3">
											<VideoDashboard/>
										</div>
										<div className="col-xs-6 responsive3">
											<BannerDashboard/>
										</div>
									</div> */}
									<div className="row">
										<div className="col-xs-12 responsive3">
											<BannerDashboardTakumi/>
										</div>
									</div>
									<div className="clearfix h25"></div>
									<div className="row">
										<div className="col-xs-4 responsive3">
											<GroupMonthlyReport/>
										</div>
										<div className="col-xs-8 responsive3">
											<GroupNewBusinessTrackingSummaryGS data={this.state.data && this.state.data} />
										</div>
									</div>

									<div className="clearfix h25"></div>

									<div className="row">
										<div className="col-xs-12 responsive3">
											<ProductionPremiumGroup data={this.state.data && this.state.data}/>
										</div>
									</div>

									<div className="clearfix h25"></div>

									<div className="row">
										<div className="col-xs-8 responsive3">
											<Overriding data={this.state.data && this.state.data}/>
										</div>
										<div className="col-xs-4 responsive3">
											<GroupPersistency data={this.state.data} />
										</div>
									</div>

									<div className="clearfix h25"></div>

									<div className="row">
										<div className="col-xs-12 responsive3">
											<ParallelOverriding data={this.state.data && this.state.data}/>
										</div>
									</div>

									<div className="clearfix h25"></div>

									<div className="bottomWidget">
										<div className="title">Income Calculation</div>
										<div className="content">
											{/* <div className="row">
												<div className="col-md-1 responsive3"/>
												<div className="col-md-5 responsive3">
													{(localStorage.getItem('role') == 11 ?
														<MonthlyAllowanceTD data={this.state.data}/>
														:
														<MonthlyAllowanceGS data={this.state.data}/>
													)}

												</div>

												<div className="col-md-5 responsive3">
													<ExtraAllowanceGS data={this.state.data} data={this.state.data}/>
												</div>
												<div className="col-md-1 responsive3"/>
											</div> */}

											<div className="row">
												{/* <div className="col-md-1 responsive3"/> */}
												<div className="col-md-6 responsive3">
													<MonthlyBonusGS data={this.state.data} />
												</div>

												<div className="col-md-6 responsive3">
													<YearlyBonusGS data={this.state.data} />
												</div>
												{/* <div className="col-md-1 responsive3"/> */}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<Footer />
				<Loading />
				<FeatureModal />
				<NewInfoModal />
			</div>
		</div>
		);
	}
}

export default DashboardTakumiPs;
