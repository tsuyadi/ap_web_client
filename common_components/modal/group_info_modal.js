"use strict"

import React from 'react';

import api_route from '../../common_components/api_route';

import {CheckAgentType} from '../../common_components/helper/formatter';
import {AGENT_LEVEL} from '../../common_components/helper/constant';

import {load, AjaxDownloadFile} from '../../common_components/helper/url_helper';

import AgentProfile from '../../components/dashboard_v2/agent_profile';
import NewBusinessTrackingSummary from '../../components/dashboard_v2/new_business_tracking_summary';
import Production from '../../components/dashboard_v2/production';
import Persistency from '../../components/dashboard_v2/persistency';
import WeeklyBonus from '../../components/dashboard_v2/weekly_bonus';
import YearEndBonus from '../../components/dashboard_v2/year_end_bonus';
import LeaderWeeklyBonus from '../../components/dashboard_v2/LeaderWeeklyBonus';
import GroupMonthlyReport from '../../components/dashboard_v2/group_monthly_report';
import GroupNewBusinessTrackingSummary from '../../components/dashboard_v2/group_new_business_tracking_summary';
import GroupProduction from '../../components/dashboard_v2/group_production';
import GroupPersistency from '../../components/dashboard_v2/group_persistency';

/* Available for SM Only */
import GroupSmOverriding from '../../components/dashboard_v2/group_sm_overriding';
import GroupSmBonusOverriding from '../../components/dashboard_v2/group_sm_bonus_overriding';

/* Available for DM Only */
import GroupOverriding from '../../components/dashboard_v2/group_overriding';
import GroupBonusOverriding from '../../components/dashboard_v2/group_bonus_overriding';

/* Available for RM Only */
import GroupRmOverriding from '../../components/dashboard_v2/group_rm_overriding';
import GroupRmParalllelOverriding from '../../components/dashboard_v2/group_rm_parallel_overriding';
import GroupRmBonusOverriding from '../../components/dashboard_v2/group_rm_bonus_overriding';

/* Available for RD Only */
import GroupRdMIO from '../../components/dashboard_v2/group_rd_mio';
import GroupRdMIB from '../../components/dashboard_v2/group_rd_mib';
import GroupRdMPA from '../../components/dashboard_v2/group_rd_mpa';
import GroupRdTotalIncome from '../../components/dashboard_v2/group_rd_total_income';
import GroupRdComission from '../../components/dashboard_v2/group_rd_comission';

/*
    Author  : Nasrul A Gifari
    Date    : 23 Sep 2016
    Param   : 
        1. id
        2. title
        3. message
 */

class GroupInfoModal extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            data : null,
            agentType : null,
            code : null
        }

    }

    componentWillReceiveProps = (props) => {
        // // debugger;
        // from receiveProps

        // debugger;

        // $.ajax({
        //     url: api_route.agentDashboardv2,
        //     headers: {
        //     'Authorization':'JWT '+sessionStorage.getItem('token')
        //     },
        //     data: { 'agent' : props.productionCode },
        //     type: 'POST',
        //     success: successCallback,
        //     error: errorCallback
        // });

        this.setState({
            data : props.summaryData,
            agentType : CheckAgentType(props.productionCode),
            code : props.productionCode
        });


    }

    loaded = (r) => {
        // debugger;
        if(r == true){
            $('.load-group-info').hide();
            $('.content-modal-group').show();
        }
    }

    componentDidMount = () => {

        
    }

    loadDashboardFC(){
        return(
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#personal" aria-controls="personal" role="tab" data-toggle="tab">Personal Selling</a></li>
                    <li role="presentation"><a href="#group" aria-controls="group" role="tab" data-toggle="tab">Group Seling</a></li>
                </ul>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane fade in active" id="personal">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 text-center">                               
                                <div className="topWidget">
                                    <div className="row">
                                        <div className="col-xs-4 responsive3">
                                            {/* Start Agent Profile Section */}
                                            <AgentProfile data={this.state.data && this.state.data} disabled="true" />
                                            {/* End Agent Profile Section */}
                                        </div>
                                        <div className="col-xs-8 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            <NewBusinessTrackingSummary data={this.state.data && this.state.data} disabled="true" param_agent={this.props.productionCode} loaded={this.loaded} />
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                    </div>
                                    
                                    <div className="clearfix h25"></div>
                                    
                                    <div className="row">
                                        <div className="col-xs-6 responsive3">
                                            {/* Start Production Section */}
                                            <Production data={this.state.data && this.state.data} disabled="true" />
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
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="group">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <h3>Not Available</h3>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    loadDashboardSM(){
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#personal" aria-controls="personal" role="tab" data-toggle="tab">Personal Selling</a></li>
                    <li role="presentation"><a href="#group" aria-controls="group" role="tab" data-toggle="tab">Group Seling</a></li>
                </ul>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane fade in active" id="personal">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                
                                <div className="topWidget">
                                    <div className="row">
                                        <div className="col-xs-4 responsive3">
                                            {/* Start Agent Profile Section */}
                                            <AgentProfile data={this.state.data && this.state.data} disabled="true" />
                                            {/* End Agent Profile Section */}
                                        </div>
                                        <div className="col-xs-8 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            <NewBusinessTrackingSummary data={this.state.data && this.state.data} disabled="true" param_agent={this.props.productionCode} />
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                    </div>
                                    
                                    <div className="clearfix h25"></div>
                                    
                                    <div className="row">
                                        <div className="col-xs-6 responsive3">
                                            {/* Start Production Section */}
                                            <Production data={this.state.data && this.state.data} disabled="true" />
                                            {/* End Production Section */}
                                        </div>
                                        <div className="col-xs-6 responsive3">
                                            {/* Start Production Section */}
                                                {(this.state.agentType == 'MO' || this.state.agentType == 'SO'
                                                    ? <Persistency data={this.state.data && this.state.data} />
                                                    : ''
                                                )}
                                            {/*} End Production Section */}
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
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="group">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">

                                <div className="topWidget">
								<div className="row">
									<div className="col-xs-4 responsive3">
										{/* Start New Business Tracking Summary Section */} 
										{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
									        ? <GroupMonthlyReport data={this.state.data && this.state.data} />
									        : <GroupProduction data={this.state.data && this.state.data} disabled="true" />
									    )}
										{/* End New Business Tracking Summary Section */}
									</div>
									<div className="col-xs-8 responsive3">
										{/* Start New Business Tracking Summary Section */}
										<GroupNewBusinessTrackingSummary data={this.state.data && this.state.data} disabled="true" param_agent={this.props.productionCode} loaded={this.loaded} />
										{/* End New Business Tracking Summary Section */}
									</div>
								</div>
								
								<div className="clearfix h25"></div>
								
								<div className="row">
									<div className="col-xs-6 responsive3">
										{/* Start Production Section */}
										{(this.state.agentType == 'MO' || this.state.agentType == 'SO'
									        ? <GroupProduction data={this.state.data && this.state.data} disabled="true" />
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

            </div>
        );
    }

    loadDashboardDM(){
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#personal" aria-controls="personal" role="tab" data-toggle="tab">Personal Selling</a></li>
                    <li role="presentation"><a href="#group" aria-controls="group" role="tab" data-toggle="tab">Group Seling</a></li>
                </ul>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane fade in active" id="personal">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="topWidget">
                                    <div className="row">
                                        <div className="col-xs-4 responsive3">
                                            {/* Start Agent Profile Section */}
                                            <AgentProfile data={this.state.data && this.state.data}  disabled="true" />
                                            {/* End Agent Profile Section */}
                                        </div>
                                        <div className="col-xs-8 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            <NewBusinessTrackingSummary data={this.state.data && this.state.data} disabled="true" param_agent={this.props.productionCode} />
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                    </div>
                                    
                                    <div className="clearfix h25"></div>
                                    
                                    <div className="row">
                                        <div className="col-xs-6 responsive3">
                                            {/* Start Production Section */}
                                            <Production data={this.state.data && this.state.data} disabled="true" />
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
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="group">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">

                                <div className="topWidget">
                                    <div className="row">
                                        <div className="col-xs-4 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            {(this.state.agentType == 'MO' || this.state.agentType == 'SO'
                                                ? <GroupMonthlyReport data={this.state.data && this.state.data} />
                                                : <GroupProduction data={this.state.data && this.state.data} disabled="true" />
                                            )}
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                        <div className="col-xs-8 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            <GroupNewBusinessTrackingSummary data={this.state.data && this.state.data} disabled="true" param_agent={this.props.productionCode} loaded={this.loaded} />
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                    </div>
                                    
                                    <div className="clearfix h25"></div>
                                    
                                    <div className="row">
                                        <div className="col-xs-6 responsive3">
                                            {/* Start Production Section */}
                                            {(this.state.agentType == 'MO' || this.state.agentType == 'SO'
                                                ? <GroupProduction data={this.state.data && this.state.data} disabled="true" />
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
                                    </div>
                                </div>

                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    loadDashboardRM(){
        // debugger;
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation" className="active"><a href="#personal" aria-controls="personal" role="tab" data-toggle="tab">Personal Selling</a></li>
                    <li role="presentation"><a href="#group" aria-controls="group" role="tab" data-toggle="tab">Group Seling</a></li>
                </ul>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane fade in active" id="personal">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="topWidget">
                                    <div className="row">
                                        <div className="col-xs-4 responsive3">
                                            {/* Start Agent Profile Section */}
                                            <AgentProfile data={this.state.data}  disabled="true" />
                                            {/* End Agent Profile Section */}
                                        </div>
                                        <div className="col-xs-8 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            <NewBusinessTrackingSummary data={this.state.data && this.state.data} disabled="true" param_agent={this.props.productionCode} />
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                    </div>
                                    
                                    <div className="clearfix h25"></div>
                                    
                                    <div className="row">
                                        <div className="col-xs-6 responsive3">
                                            {/* Start Production Section */}
                                            <Production data={this.state.data && this.state.data} disabled="true" />
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
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade" id="group">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="topWidget">
                                    <div className="row">
                                        <div className="col-xs-4 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            {(this.state.agentType == 'MO' || this.state.agentType == 'SO'
                                                ? <GroupMonthlyReport data={this.state.data && this.state.data} />
                                                : <GroupProduction data={this.state.data && this.state.data} disabled="true" />
                                            )}
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                        <div className="col-xs-8 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            <GroupNewBusinessTrackingSummary data={this.state.data && this.state.data} disabled="true" param_agent={this.props.productionCode} loaded={this.loaded} />
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                    </div>
                                    
                                    <div className="clearfix h25"></div>
                                    
                                    <div className="row">
                                        <div className="col-xs-6 responsive3">
                                            {/* Start Production Section */}
                                            {(this.state.agentType == 'MO' || this.state.agentType == 'SO'
                                                ? <GroupProduction data={this.state.data && this.state.data} disabled="true" />
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
                                                <div className="col-md-5">
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            <GroupRmOverriding data={this.state.data && this.state.data} />
                                                        </div>
                                                    </div>
                                                    <div className="row"></div>
                                                    <div className="row">
                                                        <div className="col-md-12">
                                                            {/* <GroupRmParalllelOverriding data={this.state.data && this.state.data} /> */}
                                                        </div>
                                                    </div>
                                                </div>
                                                
                                                <div className="col-md-7">
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

            </div>
        );
    }

    loadDashboardRD(){
        return (
            <div>
                <ul className="nav nav-tabs" role="tablist">
                    <li role="presentation"><a href="#personal" aria-controls="personal" role="tab" data-toggle="tab">Personal Selling</a></li>
                    <li role="presentation" className="active"><a href="#group" aria-controls="group" role="tab" data-toggle="tab">Group Seling</a></li>
                </ul>

                <div className="tab-content">
                    <div role="tabpanel" className="tab-pane fade" id="personal">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12 text-center">
                                <h3>Not Available</h3>
                            </div>
                        </div>
                    </div>
                    <div role="tabpanel" className="tab-pane fade in active" id="group">
                        <div className="row">
                            <div className="col-xs-12">&nbsp;</div>
                        </div>
                        <div className="row">
                            <div className="col-xs-12">
                                <div className="topWidget">
                                    <div className="row">
                                        <div className="col-xs-4 responsive3">
                                            {/* Start New Business Tracking Summary Section */} 
                                            {(this.state.agentType == 'MO' || this.state.agentType == 'SO'
                                                ? <GroupMonthlyReport data={this.state.data && this.state.data} />
                                                : <GroupProduction data={this.state.data && this.state.data} disabled="true" />
                                            )}
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                        <div className="col-xs-8 responsive3">
                                            {/* Start New Business Tracking Summary Section */}
                                            <GroupNewBusinessTrackingSummary data={this.state.data && this.state.data} disabled="true" param_agent={this.props.productionCode} loaded={this.loaded} />
                                            {/* End New Business Tracking Summary Section */}
                                        </div>
                                    </div>
                                    
                                    <div className="clearfix h25"></div>
                                    
                                    <div className="row">
                                        <div className="col-xs-6 responsive3">
                                            {/* Start Production Section */}
                                            {(this.state.agentType == 'MO' || this.state.agentType == 'SO'
                                                ? <GroupProduction data={this.state.data && this.state.data} disabled="true" />
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
                                    </div>
                                    
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

            </div>
        );
    }

    componentDidUpdate = () => {

    }

    closeModal = (r) => {
        if(r){
            r.preventDefault();
        }

        this.setState({
            data : null
        });

    } 

    render()
    {
        let dialogClassname = 'modal-dialog ' + this.props.id;
        let dialogLabel = this.props.id + 'Label';
        // debugger;
        let dashboardMain = [];

        if(this.state.data && this.state.data.level == AGENT_LEVEL.FC || this.state.data && this.state.data.level == AGENT_LEVEL.AMP || this.state.data && this.state.data.level == AGENT_LEVEL.RMP){
            dashboardMain.push(this.loadDashboardFC());            
        // }else if(this.state.data && this.state.data.level == AGENT_LEVEL.SM){
        //     dashboardMain.push(this.loadDashboardSM());
        }else if(this.state.data && this.state.data.level == AGENT_LEVEL.AMB){
            dashboardMain.push(this.loadDashboardDM());
        }else if(this.state.data && this.state.data.level == AGENT_LEVEL.RMB){
            dashboardMain.push(this.loadDashboardRM());
        }else if(this.state.data && this.state.data.level == AGENT_LEVEL.RD){
            dashboardMain.push(this.loadDashboardRD());
        }else {
            dashboardMain.push(
                <div className="text-center">Processing Information</div>
            );
        }

        let name = "";
        if(this.state.data && this.state.data.name != null){
            name = this.state.data.name;
        }

        let id = "";
        if(this.state.data && this.state.data.agent_data.code != null){
            id = this.state.data.agent_data.code;
        }

        return(
            <div className="modal fade" id="group-info-modal" tabIndex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true"  style={{marginLeft: '0px', marginRight: '0px', marginTop:'10px'}}>
			  <div className={dialogClassname} style={{width:'90%'}}>
				<div className="modal-content zero-padding" style={{'padding':'0px'}}>
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.closeModal} >&times;</button>
                        <h4>Agent Summary Production {name} - {id} <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-group-info"></i></h4>
                    </div>
					<div className="modal-body content-modal-group">
                        {dashboardMain}
                    </div>
				</div>
			  </div>
			</div>
        );
    }

}

export default GroupInfoModal;