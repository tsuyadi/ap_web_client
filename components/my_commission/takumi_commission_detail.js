'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import {MoneyFormat,DateFormatMonthName, DateFormat, DateFormatYMD,getDayCurrentWeek, DateFormatMMM,DateFormatMMWithoutYear, DateFormatMMWithoutDay, getPreviousWeek, getNextWeek, getNextDay, getPreviousDay} from '../../common_components/helper/formatter';

class  TakumiCommissionDetail extends React.Component {
	constructor(props){
		super(props);

		this.state = {
            data_weekly : null,
            data_bonus : null,
            data_bonus_stc : null,
            data_agent : null,
            data_personal_monthly : null,
            data_personal_yearly : null,
            data_group_monthly : null,
            data_yearly : null,
            data_overriding : null,
            data_parallel_overriding : null,
            menu: props.menu,
            menu_folder : props.menu_folder,
            achievement : {    
                fontSize: '16px',
                fontStyle: 'italic',
                textDecoration: 'underline',
                fontWeight: '600',
                color: '#ff2b2b',
            },
            // test : '',
		}
	}

	componentWillReceiveProps = (p) => {
		this.setState({
            menu : p.menu,
            menu_folder : p.menu_folder,
            // test : p.menu + ' - ' + p.menu_folder
        });
        switch(p.menu){
            case 'agent_' :
                this.getDataAgent();
                // data = this.state.data_agent.validated_case;
				break;
			case 'weekly_calculation' :
                this.getDataWeekly();
                // data = this.state.data_weekly.validated_case;
				break;
            case 'bonus_stc_etc' :
                this.getDataBonusStc();
                // data = this.state.data_yearly.validated_case;
                break;
            case 'personal_monthly_bonus' :
                this.getDataPersonalMonthly();
                // data = this.state.data_persistence;
                break;
            case 'personal_yearly_bonus' :
                this.getDataPersonalYearly();
                // data = this.state.data_persistence;
                break;
                
            case 'group_monthly_bonus' :
                this.getDataGroupMonthly();
                // data = this.state.data_persistence;
                break;
            case 'group_yearly_bonus' :
                this.getDataGroupYearly();
                // data = this.state.data_persistence;
                break;
            case 'overriding' :
                this.getDataOverriding();
                // data = this.state.data_overriding.validated_case;
				break;
             case 'parallel_overriding' :
                this.getDataOverridingParallel();
				break;
			default :
				list_menu.push(		
				);
				break;
		}
        // console.log(this.state);
	}

    componentDidMount(){
		this.setState({
            menu : this.props.menu,
            menu_folder : this.props.menu_folder
        });
        
    }
    
	componentWillMount(){
        // var price_date = $('[name=price_date]').val();
       let choosen_menu = this.state.menu_folder;
       let uri = '';
		switch(choosen_menu){
            case 'menu_1' :
                this.getDataWeekly();
                // this.getDataYearly();
                // this.getDataMonthly();
                // this.getDataAgent();
                // this.getDataOverriding();
				break;
			case 'menu_2' :
                this.getDataPersonalMonthly();
                // this.getDataYearly();
                // this.getDataMonthly();
				break;
           
			case 'menu_3' :
                // this.getDataPersonalMonthly();
                // this.getDataYearly();
                // this.getDataMonthly();
				break;
           
			default :
                uri = '';
				break;
		}
        
        // console.log(this.state);
    }
    
	setValidated = (menu_name) =>{
        
        // let active_list = ['-o','-o','-o','-o','-o'];
        // active_list[parseInt(active)] = '';
        // switch(menu_name){
        //     case 'agent_' :
        //         data = this.state.data_agent.validated_case;
		// 		break;
		// 	case 'weekly_bonus' :
        //         data = this.state.data_weekly.validated_case;
		// 		break;
        //     case 'yearly_bonus' :
        //         data = this.state.data_yearly.validated_case;
		// 		break;
        //     case 'persistency' :
        //         // data = this.state.data_persistence;
		// 		break;
        //     case 'overriding' :
        //         data = this.state.data_overriding.validated_case;
		// 		break;
        //     case 'overriding_group' :
        //         // data = this.state.data_agent;
		// 		break;
        //     case 'bonus_overriding' :
		// 		break;
        //      case 'parallel_overriding' :
		// 		break;
        //     case 'yearly_bonus_rd' :
		// 		break;
        //     case 'mpa_mio_mib' :
		// 		break;
        //     case 'overriding_rd' :
		// 		break;
        //     case 'quarterly_bonus' :
		// 		break;
		// 	default :
		// 		list_menu.push(		
		// 		);
		// 		break;
		// }
		// this.setState({
		// 	data_validated : data,
        //     // active: active_list,
        // });
        // console.log("masuk" + this.state);
        // this.props.menu(this.state.menu); 
        // console.log(this.state);
		// $('li').removeClass("active");
		// $('#'+menu_name).addClass("active");
	}
    //get Data
    getDataWeekly(){
        
		$.ajax({
            url: api_route.takumi_weekly_calculation,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_weekly:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
        
    }

    //get Data
    getDataYearly(){
        
		$.ajax({
            url: api_route.takumi_stc_etc_bonus,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_yearly:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

    
    //get Data
    getDataAgent(){
        
		$.ajax({
            url: api_route.takumi_agent_get,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_agent:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }
    //get Data
    getDataPersonalMonthly(){
        
		$.ajax({
            url: api_route.takumi_monthly_bonus_personal,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_personal_monthly:response,
                });
                console.log(this.state.data_personal_monthly);
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

    getDataPersonalYearly(){
        
		$.ajax({
            url: api_route.takumi_yearly_bonus_personal,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_personal_yearly:response,
                });
                console.log(this.state.data_personal_yearly);
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

    getDataGroupMonthly(){
        
		$.ajax({
            url: api_route.takumi_monthly_bonus_group,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_group_monthly:response,
                });
                console.log(this.state.data_group_monthly);
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

    
    getDataGroupYearly(){
        
		$.ajax({
            url: api_route.takumi_yearly_bonus_group,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_group_yearly:response,
                });
                console.log(this.state.data_group_yearly);
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }
    
    //get Data
    getDataOverriding(){
        
		$.ajax({
            url: api_route.takumi_overriding,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_overriding:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

    //get Data
    getDataOverridingGroup(){
        
		$.ajax({
            url: api_route.overriding_group,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_overriding_group:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }
    
    //get Data
    getDataBonusStc(){
        
		$.ajax({
            url: api_route.takumi_stc_etc_bonus,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_bonus_stc:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }
    
    //get Data
    getDataOverridingParallel(){
        
		$.ajax({
            url: api_route.takumi_parallel_overriding,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_overriding_parallel_group:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

    
    //get Data
    getDataMonthlyIncentive(){
        
		$.ajax({
            url: api_route.monthly_incentive_bonus_rd,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_monthly_incenctive:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
        
		$.ajax({
            url: api_route.parallel_overriding_rd,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_parallel_overriding_rd:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }
    
    //get Data
    getDataQuarterlyBonus(){
        
		$.ajax({
            url: api_route.quarterly_bonus_rd,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_quarterly_bonus:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

    
    //get Data
    getDataYearlyBonusRD(){
        
		$.ajax({
            url: api_route.yearly_bonus_rd,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_yearly_bonus_rd:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }
    
    //get Data
    getDataOverridingPersonal(){
        
		$.ajax({
            url: api_route.overriding_personal_rd,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
            data : {},
            async: false,
            success: (response) => {
				this.setState({
					data_overriding_personal:response,
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

    loadAgent(){
        
        var data_agent = this.state.data_agent && this.state.data_agent.agent_get_agent_personal;
        var list_data_agent = this.state.data_agent && this.state.data_agent.agent_detail;
        console.log(data_agent);
        // var vc = data_agent ? data_agent.vc : 0;
        // var data = this.state.data_agent;
        var list_agent = [];
        var row = null; 
        var bonusAGA = 0;
        // console.log(data);
        // console.log(data.detail_agent);
        // console.log('a');
            if(list_data_agent && list_data_agent.length > 0)
            {
            // console.log('b');
                $.map(list_data_agent.detail_agent, (value, index) => {
                    bonusAGA =  parseFloat(bonusAGA) + parseFloat(value.bonus);
                    row = <tr key={index}>
                        <td>{value.recruited_name}</td>
                        <td>{MoneyFormat(value.fyc_mtd)}</td>
                        <td>{MoneyFormat(value.bonus)}</td>						
                    </tr>
                    list_agent.push(row);
                });
                // console.log(list_agent);
            }else{
                let row = <tr>
						<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
					</tr>
                list_agent.push(row);
            }
        
        // var row2 = null; 
        var detail_ec = this.state.data_agent && this.state.data_agent.effective_case;
        var row2 = [];
        let list_detail_ec = [];
        console.log(this.state.data_weekly);
            if(detail_ec && detail_ec.length > 0 )
            {
                $.map(detail_ec, (value, index) => {
                    
                    row2 = <tr key={index}>
                        <td>{value.policy_number}</td>
                        <td>{DateFormatMonthName(value.issued_date)}</td>
                        <td>{value.effective_case}</td>						
                    </tr>
                    list_detail_ec.push(row2);
                });
            }else{
                let row2 = <tr>
						<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
					</tr>
                list_detail_ec.push(row2);
            }

        // var row2 = null; 
        // let list_validate = [];
        // // console.log('validated case'+data.validate_case);
        // if(data != null && (data.validate_case != null || data.validate_case != [] || data.validate_case != undefined)){
        //     if(data && data.validate_case && data.validate_case.length > 0 )
        //     {
        //         $.map(data.validate_case, (value, index) => {
                    
        //             row2 = <tr key={index}>
        //                 <td>{value.policy_number}</td>
        //                 <td>{DateFormatMonthName(value.issued_date)}</td>
        //                 <td>{value.vc}</td>						
        //             </tr>
        //             list_validate.push(row2);
        //         });
        //     }else{
        //         let row2 = <tr>
		// 				<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
		// 			</tr>
        //         list_validate.push(row2);
        //     }
        // }
        

         return(
            <div className="wrapContent">
            {/* //     <div className="subtitle"><h2>Agent Get Agent Bonus</h2></div>
            //     <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Total EC Saya Per <b>{DateFormatMMWithoutDay(new Date())}</b> </label>
                                    <div className="col-sm-3 responsive3">
                                        <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#ec-modal-agent' ><u>{MoneyFormat(data_agent.ec)}</u></a>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>

                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <div className="col-sm-2 responsive3"/>
                            <div className="col-sm-8 responsive3">
                                <table className="table table-bordered table-striped table-hover table-box" style={{textAlign:'center'}}>
                                    <thead>
                                        <tr>
                                            <th className="header_table" style={{textAlign:'center'}}>Nama Agent Yang Direkrut</th>
                                            <th className="header_table" style={{textAlign:'center'}}>Total FYC MTD</th>
                                            <th className="header_table" style={{textAlign:'center'}}>Bonus</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {list_agent}
                                    </tbody>
                                    <tfoot>
                                            <th className="header_table" style={{textAlign:'center'}}>Total AGA saya </th>
                                            <th className="header_table" style={{textAlign:'center'}}></th>
                                            <th className="header_table" style={{textAlign:'center'}}>{MoneyFormat(bonusAGA)}</th>
                                    </tfoot>
                                </table>
                            </div>
                            <div className="col-sm-2 responsive3"/>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="ec-modal-agent" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
                    <div className="modal-dialog ec-modal" style={{height:'auto', width:'50%'}}>
                        <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                            <div className="modal-header" style={{height: 'auto'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Efektif Case</h3>
                            </div>
                            <div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                        <thead>
                                            <tr>
                                                <th className="header_table" style={{textAlign:'center'}}>No Polis </th>
                                                <th className="header_table" style={{textAlign:'center'}}>Tanggal Issued</th>
                                                <th className="header_table" style={{textAlign:'center'}}>Total EC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <tr>
                                                <td style={{textAlign:'center'}} colSpan="3">No Data Found </td>
                                            </tr> */}
                                            {list_detail_ec}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    loadWeeklyCalculation(){
        var fyc_mtd = 0;
        var weekly_style =null;
        var rolling_style =null;
        var data_weekly = this.state.data_weekly && this.state.data_weekly.weekly_calculation_personal;
        // var data_new_weekly = this.state.data.new_weekly_bonus_personal;
        // var vc = data_new_weekly ? data_new_weekly.vc: 0;
        // var fyc = data_new_weekly ? data_new_weekly.fyc : 0;
        // var bonus = data_new_weekly ? data_new_weekly.bonus : 0;
        // var period_start = data_new_weekly && data_new_weekly.period_start ? data_new_weekly.period_start : this.state.data_profile.aaji_license_date;
        // var period_end = data_new_weekly && data_new_weekly.period_start ? data_new_weekly.period_end : DateFormatYMD(getNextWeek(this.state.data_profile.aaji_license_date, 12));

        // if(new Date() > (data_new_weekly.agent_license_date ? new Date (DateFormatYMD(getNextDay( data_new_weekly.agent_license_date, 84 ))) : new Date (DateFormatYMD(getNextDay( this.state.data_profile.aaji_license_date, 85 ))))){
        // console.log
        // console.log( DateFormatYMD(getNextWeek(getDayCurrentWeek(getNextDay(period_start, 85), 0), 1)));
            // console.log( DateFormatYMD(getNextWeek(getDayCurrentWeek(getNextDay(data_new_weekly.agent_license_date, 85), 0), 1)));
            // console.log( new Date (DateFormatYMD(getNextWeek(getDayCurrentWeek(getNextDay(data_new_weekly.agent_license_date ? data_new_weekly.agent_license_date : this.state.data_profile.aaji_license_date, 85), 0), 1))));
        // if(new Date() > new Date (DateFormatYMD(getNextWeek(getDayCurrentWeek(getNextDay( data_new_weekly && data_new_weekly.agent_license_date ? data_new_weekly.agent_license_date : this.state.data_profile.aaji_license_date, 85), 0), 1))) ){
        //     // console.log('masuk');
        //     weekly_style = {display:'none'};
        // }else{
            // if(data_new_weekly == undefined){
            //     weekly_style = {display:'none'};
            // }else{
                // weekly_style = {display:'block'};
            // }
        // }

        // var data_rolling = this.state.data_rolling && this.state.data_rolling.weekly_rolling_bonus_personal;
        // var rvc = data_rolling ? data_rolling.vc : 0;
        // var rfyc_cur = data_rolling ? data_rolling.fyc_current : 0;
        // var rfyc_rol = data_rolling ? data_rolling.fyc_rolling_week : 0;
        // var rbonus = data_rolling ? data_rolling.bonus : 0;
        // var rperiod_start = data_rolling && data_rolling.period_start ? data_rolling.period_start :DateFormatYMD(getPreviousDay(  getNextWeek( getDayCurrentWeek(new Date(), 0), 1 ), 83 ));
        // var rperiod_end = data_rolling && data_rolling.period_start ? data_rolling.period_end : DateFormatYMD(getNextWeek( getDayCurrentWeek(new Date(), 0), 1 ));
        // console.log(this.state);
        // console.log(new Date());
        // console.log(DateFormatYMD(getNextDay( data_rolling.agent_license_date, 84 )));
        // console.log(new Date (DateFormat(getNextDay( data_rolling ? data_rolling.agent_license_date : new Date(), 84).replace( /(\d{2})-(\d{2})-(\d{4})/, "$2/$1/$3") )));
        
        // if(new Date() > (data_rolling && data_rolling.agent_license_date ? new Date (DateFormatYMD(getNextDay( data_rolling.agent_license_date, 84 ))) : new Date (DateFormatYMD(getNextDay( this.state.data_profile.aaji_license_date, 84 ))))){
        //     if((data_rolling.agent_license_date == undefined || data_rolling.agent_license_date == [] || data_rolling.agent_license_date == null) && this.state.data_profile.aaji_license_date == null ){
        //         // console.log('a');
        //         rolling_style = {display:'none'}; 
        //     }else{
        //         // console.log('b');

        //         rolling_style = {display:'block'};
        //     }
        // }else{
        //     // console.log('c');
            
        //     rolling_style = {display:'none'}; 
        // }
        
        // var row2 = null; 
        var detail_ec = this.state.data_weekly && this.state.data_weekly.effective_case;
        var row2 = [];
        let list_detail_ec = [];
        console.log(this.state.data_weekly);
            if(detail_ec && detail_ec.length > 0 )
            {
                $.map(detail_ec, (value, index) => {
                    
                    row2 = <tr key={index}>
                        <td>{value.policy_number}</td>
                        <td>{DateFormatMonthName(value.issued_date)}</td>
                        <td>{value.effective_case}</td>						
                    </tr>
                    list_detail_ec.push(row2);
                });
            }else{
                let row2 = <tr>
						<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
					</tr>
                list_detail_ec.push(row2);
            }

        // var row= null; 
        // let list_validate_rolling = [];
        // var data_rollingv = this.state.data_rolling;
        // if(data_rollingv != null && (data_rollingv.validate_case != undefined || data_rollingv.validate_case != null || data_rollingv.validate_case != [])){
        //     if(data_rollingv && data_rollingv.validate_case && data_rollingv.validate_case.length > 0 )
        //     {
        //         $.map(data_rollingv.validate_case, (value, index) => {
                    
        //             row = <tr key={index}>
        //                 <td>{value.policy_number}</td>
        //                 <td>{DateFormatMonthName(value.issued_date)}</td>
        //                 <td>{value.vc}</td>						
        //             </tr>
        //             list_validate_rolling.push(row);
        //         });
        //     }else{
        //         let row = <tr>
		// 				<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
		// 			</tr>
        //         list_validate_rolling.push(row);
        //     }

        // }
        // console.log(new Date());
        // console.log(DateFormatMMM(getNextWeek(getDayCurrentWeek(getNextDay(data_new_weekly.agent_license_date, 85), 0), 1)));
        return(
            <div className="wrapContent ">
                {/* <div className="subtitle "><h2>Weekly Bonus</h2></div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div style={weekly_style}>
                    {/* <h4 style={{ fontWeight: 'bold' }}>Weekly Bonus {DateFormatMMWithoutYear(data_new_weekly && data_new_weekly.agent_license_date ? data_new_weekly.agent_license_date : this.state.data_profile.aaji_license_date) + ' - ' + DateFormatMMM(getNextWeek(data_new_weekly.agent_license_date ? data_new_weekly.agent_license_date : this.state.data_profile.aaji_license_date, 12))} </h4> */}
                        <h4 style={{ fontWeight: 'bold' }}>Weekly Calculation ({DateFormatMMWithoutYear(getNextDay(getDayCurrentWeek(new Date(), 0), 1))} - {DateFormatMMM(getNextWeek(getDayCurrentWeek(new Date(), 0),1))})</h4>
                        <div className="clearfix h15"></div>
                        <div className="row">
                            <div className="col-sm-12 responsive1">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className="col-sm-3 responsive3">FYC</label>
                                        <div className="col-sm-3 responsive3">
                                            <input type="text" className="form-control" placeholder="-" value={MoneyFormat(data_weekly.fyc)} />
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <label className="col-sm-3 responsive3">EC</label>
                                        <div className="col-sm-3 responsive3">
                                            <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#ec-modal-weekly' ><u>{MoneyFormat(data_weekly.ec)}</u></a>
                                        </div>
                                    </div>
                                </form>
                            </div>
                        </div>
                        <div className="note">
                            <h3 style={{ textAlign: 'center' }}>Weekly Allowance Saya Berdasarkan New Business Periode (Periode Weekly Senin - Minggu) Adalah Rp. {MoneyFormat(data_weekly.weekly_allowance)}</h3>
                        </div>
                        <div className="clearfix h15"></div>
                        <h4 style={{ fontWeight: 'bold' }}>Tunjangan Extra</h4>
                        <div className="clearfix h15"></div>
                        <div className="col-sm-6">    
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <label>Akumulasi Variable Income</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="variable_income" name="variable_income" value={MoneyFormat(data_weekly.income_variable_accumulation)} disabled/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <label>Akumulasi Variable Tunjangan</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="variable_tunjangan" name="variable_tunjangan" value={MoneyFormat(data_weekly.allowance_variable_accumulation)} disabled />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <label>Total Tunjungan extra</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="total" name="total" value={MoneyFormat(data_weekly.total_extra_allowance)} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="ec-modal-weekly" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
                    <div className="modal-dialog ec-modal" style={{height:'auto', width:'50%'}}>
                        <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                            <div className="modal-header" style={{height: 'auto'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Efektif Case</h3>
                            </div>
                            <div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                        <thead>
                                            <tr>
                                                <th className="header_table" style={{textAlign:'center'}}>No Polis </th>
                                                <th className="header_table" style={{textAlign:'center'}}>Tanggal Issued</th>
                                                <th className="header_table" style={{textAlign:'center'}}>Total EC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list_detail_ec}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    
    loadBonusStc(){
        var data_bonus = this.state.data_bonus_stc && this.state.data_bonus_stc;
        
        return(
            <div className="wrapContent ">
                {/* <div className="subtitle "><h2>Weekly Bonus</h2></div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div>
                    {/* <h4 style={{ fontWeight: 'bold' }}>Weekly Bonus {DateFormatMMWithoutYear(data_new_weekly && data_new_weekly.agent_license_date ? data_new_weekly.agent_license_date : this.state.data_profile.aaji_license_date) + ' - ' + DateFormatMMM(getNextWeek(data_new_weekly.agent_license_date ? data_new_weekly.agent_license_date : this.state.data_profile.aaji_license_date, 12))} </h4> */}
                        <div className="clearfix h15"></div>
                        <div className="col-sm-6">    
                            <div className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <label>FYC MTD</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="fyc_mtd" name="fyc_mtd" value={MoneyFormat(data_bonus.fyc_mtd)}  disabled/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6">
                                        <label>Bonus STC/ETC</label>
                                    </div>
                                    <div className="col-sm-6">
                                        <input type="text" className="form-control" id="bonus" name="bonus" value={MoneyFormat(data_bonus.bonus)} disabled />
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    loadYearlyBonus(){
        // console.log(this.state);
        

        var data_yearly = this.state.data_yearly && this.state.data_yearly;
        console.log(data_yearly);
        // var agent_license_date = data_yearly ? data_yearly.agent_license_date : this.state.data_profile.aaji_license_date;
        
        // var yvc = data_yearly ? data_yearly.vc : 0;
        // var yfyc = data_yearly ? data_yearly.fyc : 0;
        // var ybonus = data_yearly ? data_yearly.bonus : 0;
        // var p1 = data_yearly ? data_yearly.p1 : 0;
        // var target = '';
        
        var table_yearly_bonus = [];
        var row = null;
        // console.log(agent_license_date);
        // console.log(new Date(agent_license_date));
        // if(new Date(agent_license_date) < new Date( new Date().getFullYear()+'-01-01') || (new Date(agent_license_date) >= new Date( new Date().getFullYear()+'-01-01') && new Date(agent_license_date) <= new Date( new Date().getFullYear()+'-03-31'))){
        //     target = '100%';
        // }else if(new Date(agent_license_date) >= new Date( new Date().getFullYear()+'-04-01') && new Date(agent_license_date) <= new Date( new Date().getFullYear()+'-06-30')){
        //     target = '75%';
        // }else if(new Date(agent_license_date) >= new Date( new Date().getFullYear()+'-07-01') && new Date(agent_license_date) <= new Date( new Date().getFullYear()+'-09-30')){
        //     target = '50%';
        // }else if(new Date(agent_license_date) >= new Date( new Date().getFullYear()+'-10-01') && new Date(agent_license_date) <= new Date( new Date().getFullYear()+'-12-31')){
        //     target = '25%';
        // }
        // console.log('target ' + target);
        // if(target == '100%'){
        //      row = <tbody><tr style={(parseFloat(yvc) >= parseFloat(18) && parseFloat(yvc) < parseFloat(25)) ? this.state.achievement : {}}>
        //                 <td>18 to &lt; 25 </td>
        //                 <td>5%</td>
        //             </tr>
        //             <tr style={(parseFloat(yvc) >= parseFloat(25) && parseFloat(yvc) < parseFloat(36)) ? this.state.achievement : {}}>
        //                 <td>25 to &lt; 36</td>
        //                 <td>15%</td>
        //             </tr>
        //             <tr style={(parseFloat(yvc) >= parseFloat(36)) ? this.state.achievement : {}}>
        //                 <td>>= 36</td>
        //                 <td>30%</td>
        //             </tr></tbody>
        // }else if(target == '75%'){
        //     row = <tbody><tr style={(parseFloat(yvc) >= parseFloat(13.5) && parseFloat(yvc) < parseFloat(18.75)) ? this.state.achievement : {}}>
        //                 <td>13.5 to &lt; 18.75 </td>
        //                 <td>5%</td>
        //             </tr>
        //             <tr style={(parseFloat(yvc) >= parseFloat(18.75) && parseFloat(yvc) < parseFloat(27)) ? this.state.achievement : {}}>
        //                 <td>18.75 to &lt; 27</td>
        //                 <td>15%</td>
        //             </tr >
        //             <tr style={(parseFloat(yvc) >= parseFloat(27)) ? this.state.achievement : {}}>
        //                 <td>>= 27</td>
        //                 <td>30%</td>
        //             </tr></tbody>
        // }else if(target == '50%'){
        //     row = <tbody><tr style={(parseFloat(yvc) >= parseFloat(9) && parseFloat(yvc) < parseFloat(12.5)) ? this.state.achievement : {}}>
        //                 <td>9 to &lt; 12.5 </td>
        //                 <td>5%</td>
        //             </tr>
        //             <tr style={(parseFloat(yvc) >= parseFloat(12.5) && parseFloat(yvc) < parseFloat(18)) ? this.state.achievement : {}}>
        //                 <td>12.5 to &lt; 18</td>
        //                 <td>15%</td>
        //             </tr>
        //             <tr style={(parseFloat(yvc) >= parseFloat(18)) ? this.state.achievement : {}}>
        //                 <td>>= 18</td>
        //                 <td>30%</td>
        //             </tr></tbody>
        // }else if(target == '25%'){
        //      row = <tbody><tr style={(parseFloat(yvc) >= parseFloat(4.5) && parseFloat(yvc) < parseFloat(6.25)) ? this.state.achievement : {}}>
        //                 <td>4.5 to &lt; 6.25 </td>
        //                 <td>5%</td>
        //             </tr>
        //             <tr style={(parseFloat(yvc) >= parseFloat(6.25) && parseFloat(yvc) < parseFloat(9)) ? this.state.achievement : {}}>
        //                 <td>6.25 to &lt; 9</td>
        //                 <td>15%</td>
        //             </tr>
        //             <tr style={(parseFloat(yvc) >= parseFloat(9)) ? this.state.achievement : {}}>
        //                 <td>>= 9</td>
        //                 <td>30%</td>
        //             </tr></tbody>
        // }
        // table_yearly_bonus.push(row);
        let data = this.state.data_yearly; 
        // let row2 = null; 
        // let list_validate_yearly = [];
        // console.log(data.validate_case);
        // if(data != null && (data.validate_case != null || data.validate_case != undefined || data.validate_case != [])){
        //     if(data && data.validate_case && data.validate_case.length > 0 )
        //     {
        //         $.map(data.validate_case, (value, index) => {
                    
        //             row2 = <tr key={index}>
        //                 <td>{value.policy_number}</td>
        //                 <td>{DateFormatMonthName(value.issued_date)}</td>
        //                 <td>{value.vc}</td>						
        //             </tr>
        //             list_validate_yearly.push(row2);
        //         });
        //     }else{
        //         let row2 = <tr>
		// 				<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
		// 			</tr>
        //         list_validate_yearly.push(row2);
        //     }
        // }
        return(
            <div className="wrapContent">
                {/* <div className="subtitle"><h2>Yearly Bonus (Year Period)</h2></div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal" style={{marginLeft:'50px'}}>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">FYC (1 Jan - 31 Des) </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" value={MoneyFormat()}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">EC (1 Jan - 31 Des) </label>
                                    <div className="col-sm-3 responsive3">
                                       <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#vc-modal-yearly' ><u>{MoneyFormat()}</u></a>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3"><b>Total Yearly Bonus</b></label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value=""/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                    <div className="row">
                        <div className="col-xs-2 responsive3"/>
                        <div className="col-xs-8 responsive3">
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign:'center'}}>
                                <thead>
                                    <tr>
                                        <th className="header_table" style={{width:'50%', textAlign : 'center'}}>Jumlah EC Issued Dalam Setahun</th>
                                        <th className="header_table" style={{width:'50%', textAlign : 'center'}}>%*FYC</th>
                                    </tr>
                                </thead>
                                {table_yearly_bonus}
                            </table>
                        </div>
                        <div className="col-xs-2 responsive3"/>
                    </div>
                     <div className="clearfix h15"></div>
                     <div className="row">
                        <div className="col-xs-12 responsive3">
                            <h3 style={{textAlign:'center'}}>Bonus Saya Berdasarkan Pencapaian Saat ini Adalah Rp. { MoneyFormat(ybonus)}</h3>
                        </div>
                    </div> 
                </div>
                <div className="modal fade" id="vc-modal-yearly" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
                    <div className="modal-dialog vc-modal" style={{height:'auto', width:'50%'}}>
                        <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                            <div className="modal-header" style={{height: 'auto'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Validate Case</h3>
                            </div>
                            <div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                        <thead>
                                            <tr>
                                                <th className="header_table" style={{textAlign:'center'}}>No Polis </th>
                                                <th className="header_table" style={{textAlign:'center'}}>Tanggal Issued</th>
                                                <th className="header_table" style={{textAlign:'center'}}>Total VC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list_validate_yearly}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    loadPersonalMonthlyBonus(){

        var data_personal_monthly = this.state.data_personal_monthly && this.state.data_personal_monthly;
        console.log(data_personal_monthly);
        var ad_fyp = data_personal_monthly && data_personal_monthly.monthly_bonus_personal ? data_personal_monthly.monthly_bonus_personal.adjusted_fyp : 0;
        var fyc = data_personal_monthly && data_personal_monthly.monthly_bonus_personal ? data_personal_monthly.monthly_bonus_personal.fyc : 0;
        var bonus = data_personal_monthly && data_personal_monthly.monthly_bonus_personal ? data_personal_monthly.monthly_bonus_personal.bonus : 0;
        // var syc_mtd = data_persistence ? data_persistence.syc_mtd : 0;
        // var bonus = data_persistence ? data_persistence.bonus : 0;
        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Persistency Bonus</div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal" style={{marginLeft:'50px'}}>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Adjust FYP </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={MoneyFormat(ad_fyp)} disabled/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">FYC </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyc)} disabled/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Total Monthly Bonus </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={MoneyFormat(bonus)} disabled/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                    <div className="row">
                        <div className="col-sm-2 responsive3"/>
                        <div className="col-sm-8 responsive3">
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign:'center'}}>
                                <thead>
                                    <tr>
                                        <th className="header_table" style={{textAlign:'center'}}>Collected Adjust First Year Premium</th>
                                        <th className="header_table" style={{textAlign:'center'}}>Rate Monthly Bonus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr style={(parseFloat(fyc) <= parseFloat(24000000)) ? this.state.achievement : {}}>
                                        <td>  {'<'} 24.000.000 </td>
                                        <td>0%</td>
                                    </tr>
                                    <tr  style={(parseFloat(fyc) > parseFloat(24000000)  && parseFloat(fyc) < parseFloat(35000000) ) ? this.state.achievement : {}}>
                                        <td> > 24.000.000 - 35.000.000</td>
                                        <td>10%</td>
                                    </tr>
                                    <tr  style={(parseFloat(fyc) >= parseFloat(35000000) && parseFloat(fyc) < parseFloat(50000000) ) ? this.state.achievement : {}}>
                                        <td> > 35.000.000 - 50.000.000 </td>
                                        <td>25%</td>
                                    </tr>
                                    <tr  style={(parseFloat(fyc) >= parseFloat(50000000) && parseFloat(fyc) < parseFloat(70000000) ) ? this.state.achievement : {}}>
                                        <td> > 50.000.000 - 70.000.000 </td>
                                        <td>40%</td>
                                    </tr>
                                    <tr  style={(parseFloat(fyc) >= parseFloat(70000000) && parseFloat(fyc) < parseFloat(120000000) ) ? this.state.achievement : {}}>
                                        <td> > 70.000.000 - 120.000.000 </td>
                                        <td>75%</td>
                                    </tr>
                                    <tr  style={(parseFloat(fyc) >= parseFloat(120000000) ) ? this.state.achievement : {}}>
                                        <td> > 120.000.000 </td>
                                        <td>25%</td>
                                    </tr>
                                    
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-2 responsive3"/>
                    </div>
                </div>
            </div>
        );
    }
    
    loadPersonalYearlyBonus(){

        var data_personal_yearly = this.state.data_personal_yearly && this.state.data_personal_yearly;
        console.log(data_personal_yearly);
        var fyc = data_personal_yearly && data_personal_yearly.yearly_bonus_personal ? data_personal_yearly.yearly_bonus_personal.fyc : 0;
        var ec = data_personal_yearly && data_personal_yearly.yearly_bonus_personal ? data_personal_yearly.yearly_bonus_personal.ec : 0;
        var bonus = data_personal_yearly && data_personal_yearly.yearly_bonus_personal ? data_personal_yearly.yearly_bonus_personal.bonus : 0;
        // var syc_mtd = data_persistence ? data_persistence.syc_mtd : 0;
        // var bonus = data_persistence ? data_persistence.bonus : 0;
        var detail_ec = this.state.data_personal_yearly && this.state.data_personal_yearly.effective_case;
        var row2 = [];
        let list_detail_ec = [];
        console.log(this.state.data_weekly);
        if(detail_ec && detail_ec.length > 0 )
        {
            $.map(detail_ec, (value, index) => {
                
                row2 = <tr key={index}>
                    <td>{value.policy_number}</td>
                    <td>{DateFormatMonthName(value.issued_date)}</td>
                    <td>{value.effective_case}</td>						
                </tr>
                list_detail_ec.push(row2);
            });
        }else{
            let row2 = <tr>
                    <td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
                </tr>
            list_detail_ec.push(row2);
        }

        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Persistency Bonus</div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal" style={{marginLeft:'50px'}}>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">FYC (1 Jan - 31 Des) </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={MoneyFormat(fyc)} disabled/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">EC (1 Jan - 31 Des) </label>
                                    <div className="col-sm-2 responsive3">
                                        <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#ec-modal-yearly-personal' ><u>{MoneyFormat(ec)}</u></a>

                                        {/* <input type="text" className="form-control" placeholder="-" value={MoneyFormat(ec)} disabled/> */}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Total Yearly Bonus </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={MoneyFormat(bonus)} disabled/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                    <div className="row">
                        <div className="col-sm-2 responsive3"/>
                        <div className="col-sm-8 responsive3">
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign:'center'}}>
                                <thead>
                                    <tr>
                                        <th className="header_table" style={{textAlign:'center'}}>Jumlah EC Issued Dalam Setahun</th>
                                        <th className="header_table" style={{textAlign:'center'}}>% FYC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     <tr style={(parseFloat(ec) <= parseFloat(20)) ? this.state.achievement : {}}>
                                        <td> {'<'} 20 </td>
                                        <td>0%</td>
                                    </tr>
                                    <tr  style={(parseFloat(ec) > parseFloat(21)  && parseFloat(ec) < parseFloat(30) ) ? this.state.achievement : {}}>
                                        <td> 21 - 30</td>
                                        <td>10%</td>
                                    </tr>
                                    <tr  style={(parseFloat(ec) >= parseFloat(31) && parseFloat(ec) < parseFloat(48) ) ? this.state.achievement : {}}>
                                        <td> 31 - 48 </td>
                                        <td>30%</td>
                                    </tr>
                                    <tr  style={(parseFloat(ec) >= parseFloat(48)) ? this.state.achievement : {}}>
                                        <td> > 48 </td>
                                        <td>50%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-sm-2 responsive3"/>
                    </div>
                </div>
                <div className="modal fade" id="ec-modal-yearly-personal" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
                    <div className="modal-dialog ec-modal" style={{height:'auto', width:'50%'}}>
                        <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                            <div className="modal-header" style={{height: 'auto'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Efektif Case</h3>
                            </div>
                            <div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                        <thead>
                                            <tr>
                                                <th className="header_table" style={{textAlign:'center'}}>No Polis </th>
                                                <th className="header_table" style={{textAlign:'center'}}>Tanggal Issued</th>
                                                <th className="header_table" style={{textAlign:'center'}}>Total EC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* <tr>
                                                <td style={{textAlign:'center'}} colSpan="3">No Data Found </td>
                                            </tr> */}
                                            {list_detail_ec}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    loadGroupMonthlyBonus(){

        var data_group_monthly = this.state.data_group_monthly && this.state.data_group_monthly;
        console.log(data_group_monthly);
        var maapr = data_group_monthly && data_group_monthly.monthly_bonus_group ? data_group_monthly.monthly_bonus_group.maapr_mtd : 0;
        var new_recruit = data_group_monthly && data_group_monthly.monthly_bonus_group ? data_group_monthly.monthly_bonus_group.new_recruit : 0;
        var bonus = data_group_monthly && data_group_monthly.monthly_bonus_group ? data_group_monthly.monthly_bonus_group.bonus : 0;
   
        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Persistency Bonus</div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal" style={{marginLeft:'50px'}}>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">MAAPR MTD </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={maapr} disabled/>
                                    </div>
                                </div>
                                <div className="form-group" style={localStorage.getItem('role') == 11 ? {display:'none'} : {}}>
                                    <label className="col-sm-3 responsive3">New Recruit </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={new_recruit} disabled/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Total Monthly Bonus </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={MoneyFormat(bonus)} disabled/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    loadGroupYearlyBonus(){

        var data_group_yearly = this.state.data_group_yearly && this.state.data_group_yearly;
        console.log(data_group_yearly);
        var maapr = data_group_yearly && data_group_yearly.yearly_bonus_group ? data_group_yearly.yearly_bonus_group.maapr_ytd : 0;
        var new_recruit = data_group_yearly && data_group_yearly.yearly_bonus_group ? data_group_yearly.yearly_bonus_group.new_recruit : 0;
        var bonus = data_group_yearly && data_group_yearly.yearly_bonus_group ? data_group_yearly.yearly_bonus_group.bonus : 0;
   
        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Persistency Bonus</div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal" style={{marginLeft:'50px'}}>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">MAAPR YTD </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={maapr} disabled/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Total Yearly Bonus </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" value={MoneyFormat(bonus)} disabled/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    loadOverriding(){
        
        var data_overriding = this.state.data_overriding && this.state.data_overriding.overriding;
        var eaa_mtd = data_overriding ? data_overriding.eaa_mtd : 0;
        var agent_age = data_overriding ? data_overriding.agent_age : 0;
        var fyc_mtd = data_overriding ? data_overriding.fyc_mtd : 0;
        var syc = data_overriding ? data_overriding.syc : 0;
        var p2 = data_overriding ? data_overriding.p2 : 0;
        var or_rate = data_overriding ? data_overriding.or_rate : 0;
        var total = data_overriding ? data_overriding.total : 0;
        var leader_age = data_overriding ? data_overriding.leader_age : 0;
        var total_allowance = data_overriding ? data_overriding.total_allowance : 0;
        
        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">AMP/RMP Overriding</div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <b>Overriding </b>
                            {/* <p style={{fontStyle: 'italic' }}>(promotion/maintenance AMP/RMP)</p> */}
                            <div className="clearfix h15"></div>
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Effective Active Agent MTD </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(eaa_mtd)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Lama Sebagai Agent </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={agent_age}/> 
                                    </div>
                                    <label className="col-sm-1 responsive3">Bulan</label>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">FYC MTD </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyc_mtd)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">SYC </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(syc)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">P2 </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(p2)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">OR Rate </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(or_rate)}/>
                                    </div>
                                </div>
                                <div className="form-group" style={{marginTop:'20px'}}>
                                    <label className="col-sm-3 responsive3"><b>Total Overidding</b></label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-xs-12 responsive3">
                            <b>Tunjangan Bulanan </b>
                            {/* <p style={{fontStyle: 'italic' }}>(promotion/maintenance AMP/RMP)</p> */}
                            <div className="clearfix h15"></div>
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Lama Sebagai Leader </label>
                                    <div className="col-sm-2 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={leader_age}/>
                                    </div>
                                    <label className="col-sm-1 responsive3">Bulan </label>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3 responsive3">Total Tunjangan </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_allowance)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="vc-modal-overriding" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
                    <div className="modal-dialog vc-modal" style={{height:'auto', width:'50%'}}>
                        <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                            <div className="modal-header" style={{height: 'auto'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Validate Case</h3>
                            </div>
                            <div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                        <thead>
                                            <tr>
                                                <th className="header_table" style={{textAlign:'center'}}>No Polis </th>
                                                <th className="header_table" style={{textAlign:'center'}}>Tanggal Issued</th>
                                                <th className="header_table" style={{textAlign:'center'}}>Total VC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {/* {list_validate_overriding} */}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    loadOverridingGroup(){
        var or_group = null;
        var detail_or = [];
        let data = this.state.data_overriding_group; 
        let row = null; 
        let list_validate_overriding_group = [];
        // console.log(data);
        // console.log(data.validate_case);
        // console.log(data);
        if(data != null && (data.detail_vaa!= null || data.detail_vaa != undefined || data.detail_vaa != [])){
            if(data && data.detail_vaa && data.detail_vaa.length > 0 )
            {
                $.map(data.detail_vaa, (value, index) => {
                    
                    row = <tr key={index}>
                        <td>{value.agent_code}</td>
                        <td>{value.agent_name}</td>
                        <td>{value.vaa}</td>						
                    </tr>
                    list_validate_overriding_group.push(row);
                });
            }else{
                let row = <tr>
						<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
					</tr>
                list_validate_overriding_group.push(row);
            }
        }
        var amp_group = [];
        var amb_group = [];
        if(data != null && (data.overriding_group!= null || data.overriding_group != undefined || data.overriding_group != []) && localStorage.getItem('role') == 6){
            if(data && data.overriding_group && data.overriding_group.length > 0 )
            {
                $.map(data.overriding_group, (value, index) => {
                    if(value.type == 1)
                    amp_group = value;
                    else if(value.type == 2)
                    amb_group = value;

                });
            }
        }else{
            
            amb_group = data.overriding_group;
        }

        console.log(data);
        console.log(amp_group);
        console.log(amb_group);
        if(localStorage.getItem('role') == 7){
            or_group = <div className="entry">
                            <div className="row">
                                <div className="col-xs-12 responsive3">
                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            {/* <div className="col-sm-2 responsive3"/> */}
                                            <label className="col-sm-3 responsive3">VAA MTD </label>
                                            <div className="col-sm-3 responsive3">
                                                <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#vc-modal-overriding-group' ><u>{MoneyFormat(amb_group.vaa_mtd)}</u></a>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            {/* <div className="col-sm-2 responsive3"/> */}
                                            <label className="col-sm-3 responsive3">FYC MTD </label>
                                            <div className="col-sm-3 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.fyc_mtd)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            {/* <div className="col-sm-2 responsive3"/> */}
                                            <label className="col-sm-3 responsive3">SYC MTD </label>
                                            <div className="col-sm-3 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.syc_mtd)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            {/* <div className="col-sm-2 responsive3"/> */}
                                            <label className="col-sm-3 responsive3">P2 Average per ({DateFormatMMWithoutDay(new Date())}) </label>
                                            <div className="col-sm-2 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.p2_average)+' %'}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            {/* <div className="col-sm-2 responsive3"/> */}
                                            <label className="col-sm-3 responsive3">OR Rate </label>
                                            <div className="col-sm-2 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.or_rate)+' %'}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            {/* <div className="col-sm-2 responsive3"/> */}
                                            <label className="col-sm-3 responsive3">Total Overriding </label>
                                            <div className="col-sm-3 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.total_overriding)}/>
                                            </div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <div className="clearfix h15"></div>
                        </div>
        }else if(localStorage.getItem('role') == 6){
            or_group = <div className="entry">
                            <div className="row">
                                <div className="col-xs-12 responsive3">
                                    <h4 style={{fontWeight:'bold'}}><u>From Group AMB </u> </h4>
                                    <div className="clearfix h15"></div>

                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">VAA MTD </label>
                                            <div className="col-sm-3 responsive3">
                                                <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#vc-modal-overriding-group' ><u>{MoneyFormat(amb_group.vaa_mtd)}</u></a>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">FYC MTD </label>
                                            <div className="col-sm-3 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.fyc_mtd)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">SYC MTD </label>
                                            <div className="col-sm-3 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.syc_mtd)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">P2 Average per ({DateFormatMMWithoutDay(new Date())}) </label>
                                            <div className="col-sm-2 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.p2_average)+' %'}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">OR Rate </label>
                                            <div className="col-sm-2 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.or_rate)+' %'}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">Total Overriding </label>
                                            <div className="col-sm-3 responsive3"><input type="text" className="form-control" placeholder="-" value={MoneyFormat(amb_group.total_overriding)}/></div>
                                            <div className="col-sm-2 responsive3">(A)</div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                            <hr size="100"/>
                            <div className="row">
                                <div className="col-xs-12 responsive3">
                                    <h4 style={{fontWeight:'bold'}}><u>From Direct FC/AMP/RMP </u> </h4>
                                    <div className="clearfix h15"></div>

                                    <form className="form-horizontal">
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">FYC MTD </label>
                                            <div className="col-sm-3 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amp_group.fyc_mtd)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">SYC MTD </label>
                                            <div className="col-sm-3 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amp_group.syc_mtd)}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">P2 Average per ({DateFormatMMWithoutDay(new Date())}) </label>
                                            <div className="col-sm-2 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amp_group.p2_average)+' %'}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">OR Rate </label>
                                            <div className="col-sm-2 responsive3">
                                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(amp_group.or_rate)+' %'}/>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <label className="col-sm-2 responsive3">Total Overriding </label>
                                        <div className="col-sm-3 responsive3"><input type="text" className="form-control" placeholder="-" value={MoneyFormat(amp_group.total_overriding)}/></div>
                                            <div className="col-sm-2 responsive3">(B)</div>
                                        </div>
                                        <div className="form-group" style={{marginTop:'30px'}}>
                                            <label className="col-sm-2 responsive3" style={{fontWeight:'600 !important'}}> Total Overriding </label>
                                            <div className="col-sm-3 responsive3"><input type="text" className="form-control" placeholder="-" value={MoneyFormat(parseFloat(amb_group.total_overriding)+parseFloat(amp_group.total_overriding))}/></div>
                                            <div className="col-sm-2 responsive3">(A + B)</div>
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
        }

        detail_or.push(or_group);
        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Overriding</div>
                <div className="clearfix h15"></div> */}
                {detail_or}
                <div className="modal fade" id="vc-modal-overriding-group" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
                    <div className="modal-dialog vc-modal" style={{height:'auto', width:'50%'}}>
                        <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                            <div className="modal-header" style={{height: 'auto'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Validate Active Agent</h3>
                            </div>
                            <div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                        <thead>
                                            <tr>
                                                <th className="header_table" style={{textAlign:'center'}}>Kode Agent </th>
                                                <th className="header_table" style={{textAlign:'center'}}>Nama Agent</th>
                                                <th className="header_table" style={{textAlign:'center'}}>Total VC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list_validate_overriding_group}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    loadBonusOR(){
        let data = this.state.data_overriding_bonus_group; 
        let row = null; 
        let row2 = null; 
        let list_validate_overriding_group_bonus = [];
        let detail_amb = [];
        // console.log(data);
        // console.log(data.validate_case);
        // console.log(data);
        if(data != null && (data.detail_vaa!= null || data.detail_vaa != undefined || data.detail_vaa != [])){
            if(data && data.detail_vaa && data.detail_vaa.length > 0 )
            {
                $.map(data.detail_vaa, (value, index) => {
                    
                    row = <tr key={index}>
                        <td>{value.agent_code}</td>
                        <td>{value.agent_name}</td>
                        <td>{value.vaa}</td>						
                    </tr>
                    list_validate_overriding_group_bonus.push(row);
                });
            }else{
                let row = <tr>
						<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
					</tr>
                list_validate_overriding_group_bonus.push(row);
            }
        }
        if(data != null && (data.amb_detail!= null || data.amb_detail != undefined || data.amb_detail != [])){
            if(data && data.amb_detail && data.amb_detail.length > 0 )
            {
                $.map(data.amb_detail, (value, index) => {
                    
                    row2 = <tr key={index}>
                        <td>{value.agent_name}</td>
                        <td>{MoneyFormat(value.bonus_or)}</td>						
                    </tr>
                    detail_amb.push(row2);
                });
            }else{
                let row2 = <tr>
						<td colSpan="2" style={{'textAlign':'center'}}>No data.</td>
					</tr>
                detail_amb.push(row2);
            }
        }
        var fyc_aa = (data && data.bonus_overriding_group) ? data.bonus_overriding_group.fyc_mtd : '-';
        var vaa_aa = (data && data.bonus_overriding_group) ? data.bonus_overriding_group.vaa_mtd : '-';
        // vaa_aa = 7;
        var bonus_aa =  localStorage.getItem('role') == 6 ? ((data && data.bonus_overriding_group) ? data.bonus_overriding_group.bonus_or_direct_aa : '-') : data.bonus_overriding_group.bonus;
        var bonus_amb = (data && data.bonus_overriding_group) ? data.bonus_overriding_group.bonus_or_from_amb : '-';
        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Bonus Overriding</div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <b style={localStorage.getItem('role') == 6 ? {} : {display:'none'}}><u>Bonus Overriding dari Direct AA</u></b>
                            <div className="clearfix h15"></div>
                            <form className="form-horizontal">
                                <div className="form-group">
                                    {/* <div className="col-sm-2 responsive3"/> */}
                                    <label className={localStorage.getItem('role') == 6 ? "col-sm-3 responsive3" : "col-sm-2 responsive3"}>FYC MTD </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyc_aa)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    {/* <div className="col-sm-2 responsive3"/> */}
                                    <label className={localStorage.getItem('role') == 6 ? "col-sm-3 responsive3" : "col-sm-2 responsive3"}>VAA MTD </label>
                                    <div className="col-sm-3 responsive3">
                                         <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#vc-modal-overriding-group-bonus' ><u>{MoneyFormat(vaa_aa)}</u></a>
                                    </div>
                                </div>
                                
                                <div className="form-group">
                                        <label className={localStorage.getItem('role') == 6 ? "col-sm-3 responsive3" : "col-sm-2 responsive3"}>{localStorage.getItem('role') == 6 ? 'Bonus Overriding dari Direct AA': 'Bonus Overriding'}</label>
                                    <div className="col-sm-3 responsive3"><input type="text" className="form-control" placeholder="-" value={MoneyFormat(bonus_aa)}/></div>
                                        <div className="col-sm-2 responsive3"  style={localStorage.getItem('role') == 6 ? {} : {display:'none'}}>(A)</div>
                                    </div>
                                {/* <div className="form-group"> */}
                                    {/* <div className="col-sm-2 responsive3"/> */}
                                    {/* <label className="col-sm-2 responsive3">{localStorage.getItem('role') == 6 ? 'Bonus Overriding': 'Bonus Overriding dari Direct AA'} </label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(bonus_aa)}/>
                                        <div className="col-sm-2 responsive3" style={localStorage.getItem('role') == 6 ? {} : {display:'none'}}>(A)</div>
                                    </div> */}
                                {/* </div> */}
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                    <div className="row">
                        <div className="col-xs-2 responsive3"/>
                        <div className="col-xs-8 responsive3">
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign:'center'}}>
                                <thead>
                                    <tr>
                                        <th className="header_table" style={{textAlign:'center'}}>Total Direct VAA </th>
                                        <th className="header_table" style={{textAlign:'center'}}>Rate Bonus OR</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr style={(parseFloat(vaa_aa) == 3) ? this.state.achievement : {}}>
                                        <td>3</td>
                                        <td>10%</td>
                                    </tr>
                                    <tr style={(parseFloat(vaa_aa) == 4) ? this.state.achievement : {}}>
                                        <td>4</td>
                                        <td>15%</td>
                                    </tr>
                                    <tr style={(parseFloat(vaa_aa) == 5) ? this.state.achievement : {}}>
                                        <td>5</td>
                                        <td>20%</td>
                                    </tr>
                                    <tr style={(parseFloat(vaa_aa) == 6) ? this.state.achievement : {}}>
                                        <td>6</td>
                                        <td>30%</td>
                                    </tr>
                                    <tr style={(parseFloat(vaa_aa) == 7) ? this.state.achievement : {}}>
                                        <td>7</td>
                                        <td>40%</td>
                                    </tr>
                                    <tr style={(parseFloat(vaa_aa) >= 8) ? this.state.achievement : {}}>
                                        <td>>=8</td>
                                        <td>50%</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        <div className="col-xs-2 responsive3"/>
                        {/* <hr /> */}
                    </div>
                    <hr />
                    <div  style={localStorage.getItem('role') == 6 ? {} : {display:'none'}}>
                        <div className="row">
                            <div className="col-xs-12 responsive3">
                                <b><u>Bonus Overriding dari Group AMB</u></b>
                            </div>
                            <div className="clearfix h15"></div>
                            <div className="col-xs-2 responsive3"/>
                            <div className="col-xs-8 responsive3">
                                <table className="table table-bordered table-striped table-hover table-box" style={{textAlign:'center', marginTop:'20px'}}>
                                    <thead>
                                        <tr>
                                            <th className="header_table" style={{textAlign:'center'}}>AMB Name</th>
                                            <th className="header_table" style={{textAlign:'center'}}>Bonus OR</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                            {detail_amb}
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-xs-2 responsive3"/>
                            {/* <hr /> */}
                            
                            <div className="col-xs-12 responsive3">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <label className={localStorage.getItem('role') == 6 ? "col-sm-4 responsive3" : "col-sm-2 responsive3"}>Bonus Overidding dari Group AMB (50%) </label>
                                    <div className="col-sm-3 responsive3"><input type="text" className="form-control" placeholder="-" value={MoneyFormat(bonus_amb)}/></div>
                                        <div className="col-sm-2 responsive3">(B)</div>
                                    </div>
                                    <div className="form-group" style={{marginTop:'30px'}}>
                                        <label className={localStorage.getItem('role') == 6 ? "col-sm-4 responsive3" : "col-sm-2 responsive3"} style={{fontWeight:'600 !important'}}> Total Overriding </label>
                                        <div className="col-sm-3 responsive3"><input type="text" className="form-control" placeholder="-" value={MoneyFormat(parseFloat(bonus_aa)+parseFloat(bonus_amb))}/></div>
                                        <div className="col-sm-2 responsive3">(A + B)</div>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
                <div className="modal fade" id="vc-modal-overriding-group-bonus" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
                    <div className="modal-dialog vc-modal" style={{height:'auto', width:'50%'}}>
                        <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                            <div className="modal-header" style={{height: 'auto'}}>
                                <button type="button" className="close" data-dismiss="modal">&times;</button>
                                <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Validate Active Agent</h3>
                            </div>
                            <div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                        <thead>
                                            <tr>
                                                <th className="header_table" style={{textAlign:'center'}}>Kode Agent </th>
                                                <th className="header_table" style={{textAlign:'center'}}>Nama Agent</th>
                                                <th className="header_table" style={{textAlign:'center'}}>Total VC</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {list_validate_overriding_group_bonus}
                                        </tbody>
                                    </table>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    loadParallelOR(){
        var first_gen = [];
        // var generations = [[]];
        var second_gen = [];
        var third_gen = [];
        var fourth_gen = [];
        let data = this.state.data_overriding_parallel_group; 
        console.log(data);
        let row = null; 
        let row2 = null; 
        let list_validate_overriding_group = [];
        // console.log(data);
        // console.log(data.validate_case);
        // console.log(data);
        if(data != null && (data.generations!= null || data.generations != undefined || data.generations != [])){
            if(data && data.generations && data.generations.length > 0 )
            {
                $.map(data.generations, (value, index) => {
                    
                    row = <div className="form-group">
                            
                            <div className="col-sm-4">{value.agent_name}</div>
                            <label className="col-sm-2"> FYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(value.fyc_mtd)} />
                            </div>
                            <label className="col-sm-2">SYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(value.syc_mtd)}/>
                            </div>
                            </div>
                    if(value.generation == 1){
                        first_gen.push(row);
                    }else if(value.generation == 2){
                        second_gen.push(row);
                    }else if(value.generation == 3){
                        third_gen.push(row);
                    }else if(value.generation == 4){
                        fourth_gen.push(row);
                    }
                });
            } else{
                
                    row = <div className="form-group">
                            
                            <div className="col-sm-4"></div>
                            <label className="col-sm-2 right">FYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value='-' />
                            </div>
                            <label className="col-sm-2">SYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value='-'/>
                            </div>
                            </div>
                    first_gen.push(row);
            }
        }
        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Parallel Overriding</div><br/>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row" style={first_gen.length > 0 ? {} : {display:'none'}}>
                        <div className="col-xs-12 responsive3">
                            <b><u>{localStorage.getItem('role') == 11 ? 'TD' : 'TM'} Generation 1 </u></b>
                            <div className="clearfix h15"></div>
                            <form className="form-horizontal">
                                {first_gen}
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                    <div className="row" style={second_gen.length > 0 ? {} : {display:'none'}}>
                        <div className="col-xs-12 responsive3">
                            <b><u>{localStorage.getItem('role') == 11 ? 'TD' : 'TM'} Generation 2 </u></b>
                            <div className="clearfix h15"></div>
                            <form className="form-horizontal">
                                {second_gen}
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-3">Total FYC </label>
                                    <div className="col-sm-3">= {MoneyFormat(data.parallel_overriding.total_fyc)}</div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3">Total SYC </label>
                                    <div className="col-sm-3">= {MoneyFormat(data.parallel_overriding.total_syc)}</div>
                                </div>
                                 <div className="form-group">
                                    <label className="col-sm-3">P1 </label>
                                    <div className="col-sm-3">= {MoneyFormat(data.parallel_overriding.p1)} %</div>
                                </div>
                                 <div className="form-group">
                                    <label className="col-sm-3">P2 </label>
                                    <div className="col-sm-3">= {MoneyFormat(data.parallel_overriding.p2)} %</div>
                                </div>
                                <div className="form-group" style={{fontWeight:'600 !important'}}>
                                    <label className="col-sm-3" style={{fontWeight:'600 !important'}}>Total Parallel OR </label>
                                    <div className="col-sm-3">= {MoneyFormat(data.parallel_overriding.total_parallel_or)}</div>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    loadOverridingRD(){
        let data = this.state.data_overriding_personal;
        var fyc_mtd = (data && data.overriding_personal_rd) ? data.overriding_personal_rd.fyc_mtd : 0;
        var syc_mtd = (data && data.overriding_personal_rd) ? data.overriding_personal_rd.syc_mtd : 0;
        var p2_premium = (data && data.overriding_personal_rd) ? data.overriding_personal_rd.p2_premium : 0;
        var total_overriding = (data && data.overriding_personal_rd) ? data.overriding_personal_rd.total_overriding : 0;
         return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Overriding Penjualan Pribadi RD</div><br/>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-2">FYC MTD</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyc_mtd)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2">SYC MTD</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(syc_mtd)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2">P2 Premium</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(p2_premium)+'%'}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-2">Total Overriding</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_overriding)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                </div>
            </div>
        );
    }
    loadQuarterly_Bonus(){
        let data = this.state.data_quarterly_bonus;
        var fyp_quarter_previous_year = (data && data.quarterly_bonus) ? data.quarterly_bonus.fyp_quarter_previous_year : 0;
        var fyp_quarter_current_year = (data && data.quarterly_bonus) ? data.quarterly_bonus.fyp_quarter_current_year : 0;
        var fyp_growth = (data && data.quarterly_bonus) ? data.quarterly_bonus.fyp_growth : 0;
        var total_current_mib = (data && data.quarterly_bonus) ? data.quarterly_bonus.total_current_mib : 0;
        var total_quarterly_bonus = (data && data.quarterly_bonus) ? data.quarterly_bonus.total_quarterly_bonus : 0;
         return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Quarterly Bonus</div><br/>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-4">Total FYP Quarter Tahun Sebelumnya</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyp_quarter_previous_year)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-4">Total FYP Quarter Saat Ini</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyp_quarter_current_year)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-4">FYP Growth</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyp_growth)+'%'}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-4">Total MIB Quarter Saat Ini</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_current_mib)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-4"><b>Total Quarterly Bonus</b></label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_quarterly_bonus)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                </div>
            </div>
        );
    }
    loadYearlyBonusRD(){
        let data = this.state.data_yearly_bonus_rd;
        var total_fyp_yearly = (data && data.yearly_bonus) ? data.yearly_bonus.total_fyp_yearly : 0;
        var total_fyp_ytd = (data && data.yearly_bonus) ? data.yearly_bonus.total_fyp_ytd : 0;
        var total_fyc_ytd = (data && data.yearly_bonus) ? data.yearly_bonus.total_fyc_ytd : 0;
        var fyp_growth = (data && data.yearly_bonus) ? data.yearly_bonus.fyp_growth : 0;
        var total_bonus_yearly = (data && data.yearly_bonus) ? data.yearly_bonus.total_bonus_yearly : 0;
         return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">Yearly Bonus</div><br/>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-3">Total FYP {new Date().getFullYear()-1 }</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_fyp_yearly)} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3">Total FYP YTD</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_fyp_ytd)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3">Total FYC YTD</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_fyc_ytd)}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3">FYP Growth</label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyp_growth)+'%'}/>
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-3"><b>Total Year End Bonus</b></label>
                                    <div className="col-sm-3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_bonus_yearly)}/>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    <div className="clearfix h15"></div>
                </div>
            </div>
        );
    }
    loadMMM(){
        
        let data = this.state.data_monthly_incenctive;
        var first_gen =[];
        var second_gen =[];
        var third_gen =[];
        let data_detail_parallel = this.state.data_parallel_overriding_rd; 
        
        if(data_detail_parallel != null && (data_detail_parallel.first_generation_detail!= null || data_detail_parallel.first_generation_detail != undefined || data_detail_parallel.first_generation_detail != [])){
            if(data_detail_parallel && data_detail_parallel.first_generation_detail && data_detail_parallel.first_generation_detail.length > 0 )
            {
                $.map(data_detail_parallel.first_generation_detail, (value, index) => {
                    
                    var first_row = <div className="form-group">
                            <div className="col-sm-4">{value.agent_name}</div>
                            <label className="col-sm-2"> FYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(value.fyc_mtd)} />
                            </div>
                            <label className="col-sm-2">SYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(value.syc_mtd)}/>
                            </div>
                            </div>
                    first_gen.push(first_row);
                });
            }else{
                
                var first_row = <div className="form-group">
                        <div className="col-sm-4"></div>
                        <label className="col-sm-2 right">FYC MTD =</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" placeholder="-" value='-' />
                        </div>
                        <label className="col-sm-2">SYC MTD =</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" placeholder="-" value='-'/>
                        </div>
                        </div>
                first_gen.push(first_row);
            }
        }
        
        if(data_detail_parallel != null && (data_detail_parallel.second_generation_detail!= null || data_detail_parallel.second_generation_detail != undefined || data_detail_parallel.second_generation_detail != [])){
            if(data_detail_parallel && data_detail_parallel.second_generation_detail && data_detail_parallel.second_generation_detail.length > 0 )
            {
                $.map(data_detail_parallel.second_generation_detail, (value, index) => {
                    
                    var second_row = <div className="form-group">
                            <div className="col-sm-4">{value.agent_name}</div>
                            <label className="col-sm-2"> FYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(value.fyc_mtd)} />
                            </div>
                            <label className="col-sm-2">SYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(value.syc_mtd)}/>
                            </div>
                            </div>
                    second_gen.push(second_row);
                });
            }else{
                
                var second_row = <div className="form-group">
                        <div className="col-sm-4"></div>
                        <label className="col-sm-2 right">FYC MTD =</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" placeholder="-" value='-' />
                        </div>
                        <label className="col-sm-2">SYC MTD =</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" placeholder="-" value='-'/>
                        </div>
                        </div>
                second_gen.push(second_row);
            }
        }
        
        if(data_detail_parallel != null && (data_detail_parallel.third_generation_detail!= null || data_detail_parallel.third_generation_detail != undefined || data_detail_parallel.third_generation_detail != [])){
            if(data_detail_parallel && data_detail_parallel.third_generation_detail && data_detail_parallel.third_generation_detail.length > 0 )
            {
                $.map(data_detail_parallel.third_generation_detail, (value, index) => {
                    
                    var third_row = <div className="form-group">
                            <div className="col-sm-4">{value.agent_name}</div>
                            <label className="col-sm-2"> FYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(value.fyc_mtd)} />
                            </div>
                            <label className="col-sm-2">SYC MTD =</label>
                            <div className="col-sm-2">
                                <input type="text" className="form-control" placeholder="-" value={MoneyFormat(value.syc_mtd)}/>
                            </div>
                            </div>
                    third_gen.push(third_row);
                });
            }else{
                
                var third_row = <div className="form-group">
                        <div className="col-sm-4"></div>
                        <label className="col-sm-2 right">FYC MTD =</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" placeholder="-" value='-' />
                        </div>
                        <label className="col-sm-2">SYC MTD =</label>
                        <div className="col-sm-2">
                            <input type="text" className="form-control" placeholder="-" value='-'/>
                        </div>
                        </div>
                third_gen.push(third_row);
            }
        }
        var fyc_group = (data && data.monthly_performance_allowance) ? data.monthly_performance_allowance.fyc_group : 0;
        var total_mpa = (data && data.monthly_performance_allowance) ? data.monthly_performance_allowance.total_mpa : 0;
        var mio_parallel = (data && data.monthly_incentive_overriding) ? data.monthly_incentive_overriding.mio_parallel : 0;
        var mio_group = (data && data.monthly_incentive_overriding) ? data.monthly_incentive_overriding.mio_group : 0;
        var total_mio = (data && data.monthly_incentive_overriding) ? data.monthly_incentive_overriding.total_mio : 0;
        var fyc_mtd_group = (data && data.mio_group_detail) ? data.mio_group_detail.fyc_mtd : 0;
        var syc_mtd_group = (data && data.mio_group_detail) ? data.mio_group_detail.syc_mtd : 0;
        var p1p_group = (data && data.mio_group_detail) ? data.mio_group_detail.p1_premium : 0;
        var p2p_group = (data && data.mio_group_detail) ? data.mio_group_detail.p2_premium : 0;
        
        var mib = [];
        var total_mib = 0;
        var row = 0;
        if(data != null && (data.monthly_incentive_bonus!= null || data.monthly_incentive_bonus != undefined || data.monthly_incentive_bonus != [])){
            if(data && data.monthly_incentive_bonus && data.monthly_incentive_bonus.length > 0 )
            {
                $.map(data.monthly_incentive_bonus, (value, index) => {
                    
                    row = <tr key={index}>
                        <td>{value.agent_name}</td>
                        <td>{MoneyFormat(value.bonus_or)}</td>	
                        <td>{MoneyFormat(value.mib)}</td>						
                    </tr>
                    mib.push(row);
                    total_mib = total_mib + value.mib;
                });
            }else{
                let row2 = <tr>
						<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
					</tr>
                mib.push(row2);
            }
        }
        return(
            <div className="wrapContent">
                {/* <div className="subtitle textShadow">MPA, MIO, MIB</div>
                <div className="clearfix h15"></div> */}
                <div className="entry">
                     <h4 style={{fontWeight:'bold'}}><u>Monthly Performance Allowance</u></h4>
                     <div className="clearfix h15"></div>
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal">
                                <div className="form-group" style={localStorage.getItem('agent_code') == '80000012' ? {display:'none'}:{}}>
                                    <label className="col-sm-2 responsive3">10% * FYC Group</label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyc_group)} />
                                    </div>
                                    <div className="col-sm-2 responsive3 or_area" style={{height: '30px', margin:'0px'}}>
                                        <div className="titleTable or_word" style={{color:'red', textAlign:'center', height: '30px'}}><b>OR</b></div>
                                    </div>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={(new Date() < new Date('2018-12-31') && localStorage.getItem('agent_code') == '80000012') ? MoneyFormat(30000000) :  MoneyFormat(7500000)} />
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 responsive3">Total MPA</label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_mpa)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <div className="clearfix h15"></div>

                    <h4 style={{fontWeight:'bold'}}><u>Monthly Incentive Overriding</u></h4>
                     <div className="clearfix h15"></div>
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <label className="col-sm-2 responsive3">Parallel</label>
                                    <div className="col-sm-3 responsive3">
                                        <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#parallelrd-modal' ><u>{MoneyFormat(mio_parallel)}</u></a>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 responsive3">Group</label>
                                    <div className="col-sm-3 responsive3">
                                        <a className="form-control" readOnly title="detail" data-toggle='modal' data-target='#grouprd-modal' ><u>{MoneyFormat(mio_group)}</u></a>
                                    </div>
                                </div>

                                <div className="form-group">
                                    <label className="col-sm-2 responsive3"><b>Total MIO</b></label>
                                    <div className="col-sm-3 responsive3">
                                        <input type="text" className="form-control" placeholder="-" value={MoneyFormat(total_mio)} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>

                    <div className="clearfix h15"></div>

                    <h4 style={{fontWeight:'bold'}}><u>Monthly Incentive Bonus</u></h4>
                    <div className="clearfix h15"></div>
                    <div className="row">
                        <div className="col-xs-12 responsive3">
                            <table className="table table-bordered table-striped table-hover table-box" style={{textAlign:'center', width:'80%', margin:'0px auto'}}>
                                <thead>
                                    <tr>  
                                        <th className="header_table" style={{textAlign:'center'}}>RMB</th>
                                        <th className="header_table" style={{textAlign:'center'}}>Bonus OR</th>
                                        <th className="header_table" style={{textAlign:'center'}}>MIB</th>
                                    </tr>
                                </thead>
                                <tbody>
                                     {mib}
                                     <tr>
                                         <td colSpan={2}><b>TOTAL</b></td>
                                         <td>{MoneyFormat(total_mib)}</td>
                                     </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                
                <div className="modal fade" id="parallelrd-modal" tabIndex="-1" role="dialog" aria-labelledby="parallelrd-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
                <div className="modal-dialog modal-lg parallelrd-modal" style={{height:'auto'}}>
                    <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                        <div className="modal-header" style={{height: 'auto'}}>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h3 style={{fontWeight:'bold', textAlign:'center'}}>Parallel</h3>
                        </div>
                        <div className="modal-body content-modal-group" style={{overflowY:'auto'}}>
                            <div className="entry">
                                <div className="row">
                                    <div className="col-xs-12 responsive3">
                                        <b><u>RD Generation 1 </u></b>
                                        <div className="clearfix h15"></div>
                                        <form className="form-horizontal">
                                            {first_gen}
                                        </form>
                                    </div>
                                </div>
                                <div className="clearfix h15"></div>
                                <div className="row">
                                    <div className="col-xs-12 responsive3">
                                        <b><u>RD Generation 2 </u></b>
                                        <div className="clearfix h15"></div>
                                        <form className="form-horizontal">
                                            {second_gen}
                                        </form>
                                    </div>
                                </div>
                                <div className="clearfix h15"></div>
                                <div className="row">
                                    <div className="col-xs-12 responsive3">
                                        <b><u>RD Generation 3 </u></b>
                                        <div className="clearfix h15"></div>
                                        <form className="form-horizontal">
                                            {third_gen}
                                        </form>
                                    </div>
                                </div>
                                <div className="clearfix h15"></div>
                                <div className="row">
                                    <div className="col-xs-12 responsive3">
                                        <form className="form-horizontal">
                                            <div className="form-group">
                                                <label className="col-sm-3">Total FYC MTD </label>
                                                <div className="col-sm-3">= {MoneyFormat((data_detail_parallel && data_detail_parallel.mio_parallel_or_rd) ? data_detail_parallel.mio_parallel_or_rd.total_fyp_mtd : 0)}</div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-3">Total SYC MTD </label>
                                                <div className="col-sm-3">= {MoneyFormat((data_detail_parallel && data_detail_parallel.mio_parallel_or_rd) ? data_detail_parallel.mio_parallel_or_rd.total_syc_mtd : 0)}</div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-3">P1 per ({DateFormatMMWithoutDay(new Date())}) </label>
                                                <div className="col-sm-3">= {MoneyFormat((data_detail_parallel && data_detail_parallel.mio_parallel_or_rd) ? data_detail_parallel.mio_parallel_or_rd.p1 : 0)} %</div>
                                            </div>
                                            <div className="form-group">
                                                <label className="col-sm-3">P2 Average per ({DateFormatMMWithoutDay(new Date())}) </label>
                                                <div className="col-sm-3">= {MoneyFormat((data_detail_parallel && data_detail_parallel.mio_parallel_or_rd) ? data_detail_parallel.mio_parallel_or_rd.p2_average : 0)} %</div>
                                            </div>
                                            <div className="form-group" style={{fontWeight:'600 !important'}}>
                                                <label className="col-sm-3" style={{fontWeight:'600 !important'}}>Total Parallel OR </label>
                                                <div className="col-sm-3">= {MoneyFormat((data_detail_parallel && data_detail_parallel.mio_parallel_or_rd) ? data_detail_parallel.mio_parallel_or_rd.total_or : 0)}</div>
                                            </div>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>
                
                <div className="modal fade" id="grouprd-modal" tabIndex="-1" role="dialog" aria-labelledby="grouprd-modalLabel" aria-hidden="true">
                <div className="modal-dialog grouprd-modal" style={{height:'auto', width:'50%'}}>
                    <div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                        <div className="modal-header" style={{height: 'auto'}}>
                            <button type="button" className="close" data-dismiss="modal">&times;</button>
                            <h3 style={{fontWeight:'bold', textAlign:'center'}}>GROUP</h3>
                        </div>
                        <div className="modal-body content-modal-group" style={{overflowY:'auto', paddingLeft:'100px', paddingRight:'100px'}}>
                        <div className="row">
                                <div className="col-xs-3 responsive3">FYC MTD</div>
                                <div className="col-xs-4 responsive3">= Rp. {MoneyFormat(fyc_mtd_group)}</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3 responsive3">SYC MTD</div>
                                <div className="col-xs-4 responsive3">= Rp. {MoneyFormat(syc_mtd_group)}</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3 responsive3">P1 Premium</div>
                                <div className="col-xs-4 responsive3">= {MoneyFormat(p1p_group)} %</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-3 responsive3">P2 Premium</div>
                                <div className="col-xs-4 responsive3">= {MoneyFormat(p2p_group)} %</div>
                            </div>
                        </div>
                    </div>
                </div>
                </div>            
            </div>
        );
    }
    
	render(){
        // console.log(this.state.data_validated);
       let choosen_menu = this.state.menu && this.state.menu;
       let list_menu = [];
       let list_menu_ = [];
       let data = null;
		switch(choosen_menu){
            case 'agent_' :
                list_menu.push(this.loadAgent());
                // data = this.state.data_agent;
				break;
			case 'weekly_calculation' :
				list_menu.push(this.loadWeeklyCalculation());
                data = this.state.data_weekly;
				break;
            case 'personal_monthly_bonus' :
                list_menu.push(this.loadPersonalMonthlyBonus());
                data = this.state.data_personal_monthly;
                break;
            case 'personal_yearly_bonus' :
                list_menu.push(this.loadPersonalYearlyBonus());
                data = this.state.data_personal_yearly;
                break;
            case 'group_monthly_bonus' :
                list_menu.push(this.loadGroupMonthlyBonus());
                data = this.state.data_group_monthly;
                break;
            case 'group_yearly_bonus' :
                list_menu.push(this.loadGroupYearlyBonus());
                data = this.state.data_group_monthly;
                break;
            case 'yearly_bonus' :
				// list_menu.push(this.loadYearlyBonus());
                data = this.state.data_yearly;
				break;
            case 'persistency' :
				// list_menu.push(this.loadPersistency());
                // data = this.state.data_persistence;
				break;
            case 'overriding' :
				list_menu.push(this.loadOverriding());
                data = this.state.data_overriding;
				break;
            case 'overriding_group' :
				list_menu.push(this.loadOverridingGroup());
                data = this.state.data_agent;
				break;
            case 'bonus_stc_etc' :
				list_menu.push(this.loadBonusStc());
				break;
             case 'parallel_overriding' :
				list_menu.push(this.loadParallelOR());
				break;
            case 'yearly_bonus_rd' :
				list_menu.push(this.loadYearlyBonusRD());
				break;
            case 'mpa_mio_mib' :
                list_menu.push(this.loadMMM());
				break;
            case 'overriding_rd' :
                list_menu.push(this.loadOverridingRD());
				break;
            case 'quarterly_bonus' :
                list_menu.push(this.loadQuarterly_Bonus());
				break;
			default :
				list_menu.push(		
				);
				break;
		}
		list_menu_ = list_menu;
        var list_validate = [];
        var row = null; 

        // if(data && data.validated_case != null)
		// {
		// 	$.map(data.validated_case, (value, index) => {
                
		// 		row = <tr key={index}>
        //             <td>{value.policy_number}</td>
        //             <td>{DateFormatMonthName(value.issued_date)}</td>
        //             <td>{value.vc}</td>						
        //         </tr>
        //         list_validate.push(row);
        //     });
        // }
		return (
        <div>
            {/* {this.state.test} */}
            {list_menu_}

            <div className="modal fade" id="vc-modal" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
			  <div className="modal-dialog vc-modal" style={{height:'auto', width:'50%'}}>
				<div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                    <div className="modal-header" style={{height: 'auto'}}>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Validate Case</h3>
                    </div>
                    <div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
                       <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                <thead>
                                    <tr>
                                        <th className="header_table" style={{textAlign:'center'}}>No Polis </th>
                                        <th className="header_table" style={{textAlign:'center'}}>Tanggal Issued</th>
                                        <th className="header_table" style={{textAlign:'center'}}>Total VC</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {list_validate}
                                </tbody>
                            </table>
                    </div>
				</div>
			  </div>
			</div>

            <div className="modal fade" id="vaa-modal" tabIndex="-1" role="dialog" aria-labelledby="vaa-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
			  <div className="modal-dialog vaa-modal" style={{height:'auto', width:'50%'}}>
				<div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                    <div className="modal-header" style={{height: 'auto'}}>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Validate Active Agent</h3>
                    </div>
                    <div className="modal-body content-modal-group" style={{overflowY:'auto'}}>
                       <table className="table table-bordered table-striped table-hover table-box" style={{textAlign : 'center', width:'90%', margin:'0px auto'}}>
                                <thead>
                                    <tr>
                                        <th className="header_table" style={{textAlign:'center'}}>Kode Agent </th>
                                        <th className="header_table" style={{textAlign:'center'}}>Nama Agent</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td></td>
                                        <td></td>
                                    </tr>
                                </tbody>
                            </table>
                    </div>
				</div>
			  </div>
			</div>

            
        </div>
		);
	}
}
export default TakumiCommissionDetail;