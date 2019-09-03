'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import Pagination from 'react-js-pagination';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import {getMenu} from '../../common_components/helper/user_session';
import {DatePicker, MonthPicker} from '../../common_components/date_picker';
import {COMM_TYPE, GET_COMM_NAME, MIME_TYPE} from '../../common_components/helper/constant';
import {DateFormat, MoneyFormat, DateFormatYMD, DateFormatEx, DateFormatMMM } from '../../common_components/helper/formatter';
import {getDataSource} from '../../common_components/resources/datasource';
import {load, AjaxDownloadFile} from '../../common_components/helper/url_helper';

import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
var FileSaver = require('file-saver');

class cpp extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			header: null,
			target: null,
			refund: null,
			history: null,
            mgtRole : [1,2,3,4],
            dashboardRole: [1,2,3,4,5,6,7,8,9],
            dashboardMaps : {
                9:'fc',
                8:'sm',
                7:'dm',
                6:'rm',
                5:'rd'
            },
			transaction_type_list: null,
			fund_type_list: null,
			policy_id: this.props.params.policy_id,
			param: {
				page:"1",
				offset:10
			},
			total : 0,
			current : 0,
			visiblePages : 3
		}
		// this.getDataTarget = this.getDataTarget.bind(this);
	}

	componentDidMount = () => {
		$('#loading').modal('show');
		// State Default
  		
		// $.ajax({
        //     url: api_route.policy_investment,
        //     headers: {
		//         'Authorization':'JWT '+sessionStorage.getItem('token')
		//     },
		//     data: {policy_id:this.state.policy_id},
        //     type: 'POST',
        //     success: (response) => {
        //       $('#loading').modal('hide');
		// 	  this.setState({
		// 		  investment : response.content
		// 	  });
        //     },
        //     error: (err, response) => {
        //       	$('#loading').modal('hide');
        //   		if(err.responseJSON){
	    //     		window.location.href = window.location.href.split('#')[0] + '#/';
	    //       	}
        //     }
        // });
		this.getDataHeader();
		this.getDataTarget();
		this.getDataRefund();
		this.getDataHistory();
		this.getDataMonthly();
	}
	
	getDataHeader(){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'header'},
            success: (response) => {

                this.setState({
                    header : response.content
                });
            },
            error: (err, response) => {
                $('#loading').modal('hide');
                if(err.responseJSON){
                    alert('Session expired, please login');
                    window.location.href="/";
                    //window.location.href = window.location.href.split('#')[0] + '#/';
                }else{
                    alert('Please check your connection');
                }

            }
        });
	}

	getDataTarget(){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'target'},
            success: (response) => {

                this.setState({
                    target : response.content
                });
            },
            error: (err, response) => {
                $('#loading').modal('hide');
                if(err.responseJSON){
                    alert('Session expired, please login');
                    window.location.href="/";
                    //window.location.href = window.location.href.split('#')[0] + '#/';
                }else{
                    alert('Please check your connection');
                }

            }
        });
	}
	
	getDataRefund(){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'refund'},
            success: (response) => {

                this.setState({
                    refund : response.content
                });
            },
            error: (err, response) => {
                $('#loading').modal('hide');
                if(err.responseJSON){
                    alert('Session expired, please login');
                    window.location.href="/";
                    //window.location.href = window.location.href.split('#')[0] + '#/';
                }else{
                    alert('Please check your connection');
                }

            }
        });
	}
	
	getDataHistory(){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'history'},
            success: (response) => {

                this.setState({
                    history : response.content
                });
            },
            error: (err, response) => {
                $('#loading').modal('hide');
                if(err.responseJSON){
                    alert('Session expired, please login');
                    window.location.href="/";
                    //window.location.href = window.location.href.split('#')[0] + '#/';
                }else{
                    alert('Please check your connection');
                }

            }
        });
	}
	
	getDataMonthly(){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'monthly_progress'},
            success: (response) => {

                this.setState({
                    monthly_progress : response.content
                });
            },
            error: (err, response) => {
                $('#loading').modal('hide');
                if(err.responseJSON){
                    alert('Session expired, please login');
                    window.location.href="/";
                    //window.location.href = window.location.href.split('#')[0] + '#/';
                }else{
                    alert('Please check your connection');
                }

            }
        });
	}

   showRight = (event) => {
	   	event.preventDefault();
		this.refs.right.show();
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

	handlePageChanged(newPage){
		
		this.state.param.page = newPage;
		// $('#loading').modal('show');
		// // debugger;
		// $.ajax({
		// 	url: api_route.policy_unit_link,
		// 	headers: {
		// 		'Authorization':'JWT '+sessionStorage.getItem('token')
		// 	},
		// 	type: 'POST',
		// 	data: this.state.param,
		// 	success: (response) => {
		// 	$('#loading').modal('hide');
		// 	var num_data = response.content.unit_link_list || [];
		// 	var total_page = response.content.total_pages;
		// 	// // debugger di listpolicies ajax
			
		// 		this.setState({
		// 			unit_link: response.content.unit_link_list,
		// 			transaction_type_list:response.transaction_desc,
		// 			fund_type_list:response.fund_type,
		// 			total: total_page
		// 		});
		// 	},
		// 	error: (err, response) => {
		// 	$('#loading').modal('hide');
		// 	// alert('Session expired, please login');
		// 	// window.location.href="/";
		// 	if(err.responseJSON){
		// 		window.location.href = window.location.href.split('#')[0] + '#/';
		// 	}

		// 	}
		// });

	}


	render(){
		
		/**
		 * Load Menu Based on Its Module
		 */
		let menu = getMenu('Core Producer Program', this.showRight, 'fa fa-caret-square-o-right');
		
        //header
        var data_header = this.state.header;
        
		
        //target
        var data_target = this.state.target;
        var target = [];
		if(data_target && data_target.length > 0)
		{
			debugger;
			$.map(data_target, (value, index) => {
	            
				let row = null;
				row = <tr key={index}>
							<td>{value.month}</td>
							<td>{value.scheme}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.allowance)}</td>
							<td>{value.accumulation}</td>
						</tr>
				target.push(row);
	          });
		} else {
			let row = <tr>
						<td colSpan="4" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            target.push(row);
		}
        //refund
        var data_refund = this.state.refund;
        var refund = [];
		if(data_refund && data_refund.length > 0)
		{
			debugger;
			$.map(data_refund, (value, index) => {
	            
				let row = null;
				row = <tr key={index}>
							<td>{value.month}</td>
							<td>{DateFormatMMM(value.start_date)}</td>
							<td>{DateFormatMMM(value.end_date)}</td>
							<td>{value.target_month_2}</td>
							<td>{value.actual_month_2}</td>
							<td>{value.target_month_3}</td>
							<td>{value.actual_month_3}</td>
							<td>{MoneyFormat(value.refund)}</td>
							<td>{DateFormatMMM(value.adjustment)}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.total_payment)}</td>
							<td>{DateFormatMMM(value.payment_date)}</td>
						</tr>
				refund.push(row);
	          });
		} else {
			let row = <tr>
						<td colSpan="11" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            refund.push(row);
		}
        //history
        var data_history = this.state.history;
        var history = [];
		if(data_history && data_history.length > 0)
		{
			debugger;
			$.map(data_history, (value, index) => {
	            
				let row = null;
				row = <tr key={index}>
							<td>{value.month}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.target_monthly_bonus)}</td>
							<td>{value.target_monthly_vc}</td>
							<td>{value.actual_monthly_vc}</td>
							<td>{value.target_accumulation_vc}</td>
							<td>{value.actual_accumulation_vc}</td>
							<td>{value.target_ratio_policy}</td>
							<td>{value.actual_ratio_policy}</td>
							<td>{value.target_absen}</td>
							<td>{value.actual_absen}</td>
							<td>{MoneyFormat(value.monthly_bonus)}</td>
							<td>{MoneyFormat(value.adjust)}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.total_payment)}</td>
							<td>{DateFormatMMM(value.payment_date)}</td>
                            <td>{value.p1}</td>
							<td>{value.p2}</td>
						</tr>
				history.push(row);
	          });
		} else {
			let row = <tr>
						<td colSpan="16" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            history.push(row);
		}
        //monthly_progress
        var data_monthly_progress = this.state.monthly_progress;
        var monthly_progress = [];
		if(data_monthly_progress && data_monthly_progress.length > 0)
		{
			debugger;
			$.map(data_monthly_progress, (value, index) => {
	            
				let row = null;
				row = <tr key={index}>
							<td>{value.month}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.target_monthly_bonus)}</td>
							<td>{value.target_monthly_vc}</td>
							<td>{value.actual_monthly_vc}</td>
							<td>{value.target_accum_vc}</td>
							<td>{value.actual_accum_vc}</td>
							<td>{value.target_ratio_policy}</td>
							<td>{value.actual_ratio_policy}</td>
							<td>{value.target_absen}</td>
							<td>{value.actual_absen}</td>
                            <td>{value.p1}</td>
							<td>{value.p2}</td>
						</tr>
				monthly_progress.push(row);
	          });
		} else {
			let row = <tr>
						<td colSpan="12" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            monthly_progress.push(row);
		}
		return (
			<div className="wrap2">
	            {menu}
				<div className="main-wrapper">
					<ol className="breadcrumb" style={{marginBottom: '5px', marginTop:'55px'}}>
						<li className="active">Core Producer Program</li>
					</ol>
					<div className="main">

						<div className="panel panel-default boxShadow">
							<div className="panel-heading textShadow headPanel">
								<h1 className="panel-title">Core Producer Program</h1>
							</div>
							<div className="panel-body">
								{/*<div className="container">*/}
                                    <div className="row">
                                        <div className ="col-md-12">
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Recruiter Name</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && data_header.recruiter.full_name}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Recruiter Code</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && data_header.recruiter.code}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Recruiter Position</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && data_header.recruiter.level}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className ="col-md-12">
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Production Date</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && DateFormatMMM(data_header.production_date)}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Month Process</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && data_header.month_process}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6">
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                        </div>
                                    
                                    </div>
                                    <div className="row" style={{marginTop : '10px'}}>
                                        <div className ="col-md-12">
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Effective Date</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && DateFormatMMM(data_header.effective_date)}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>End Date</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && DateFormatMMM(data_header.end_date)}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Status</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && data_header.status}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className ="col-md-12">
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Scheme</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && data_header.scheme}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Monthly Bonus</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && MoneyFormat(data_header.monthly_bonus)}</label>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6 bg-info">
                                                    <label>Registration Fee</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <label>{data_header && MoneyFormat(data_header.deposit)}</label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <label>Target</label>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="col-md-12" style={{overflow : 'auto', maxHeight: '450px'}}>
                                                    <table className="table table-striped forbullet table-box table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th className="header_table text-right">Month</th>
                                                                <th className="header_table text-right">Scheme</th>
                                                                <th className="header_table text-right">Monthly Allowance</th>
                                                                <th className="header_table text-right">Accumulation VC</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {target}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <label>Current Monthly Progress</label>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="col-md-12" style={{overflow : 'auto', maxHeight: '450px'}}>
                                                    <table className="table table-striped forbullet table-box table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th className="header_table text-right">Month</th>
                                                                <th className="header_table text-right">Target Monthly Bonus</th>
                                                                <th className="header_table text-right">Target Monthly VC</th>
                                                                <th className="header_table text-right">Actual Monthly VC</th>
                                                                <th className="header_table text-right">Target Accum VC</th>
                                                                <th className="header_table text-right">Actual Accum VC</th>
                                                                <th className="header_table text-right">Target Ratio Policy</th>
                                                                <th className="header_table text-right">Actual Ratio Policy</th>
                                                                <th className="header_table text-right">Target Absen</th>
                                                                <th className="header_table text-right">Actual Absen</th>
                                                                <th className="header_table text-right">P1</th>
                                                                <th className="header_table text-right">P2</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {monthly_progress}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <label>Registration Fee Refund</label>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="col-md-12" style={{overflow : 'auto', maxHeight: '450px'}}>
                                                    <table className="table table-striped forbullet table-box table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th className="header_table text-right">Month</th>
                                                                <th className="header_table text-right">Start Date</th>
                                                                <th className="header_table text-right">End Date</th>
                                                                <th className="header_table text-right">Target Month 2</th>
                                                                <th className="header_table text-right">Actual Month 2</th>
                                                                <th className="header_table text-right">Target Month 3</th>
                                                                <th className="header_table text-right">Actual Month 3</th>
                                                                <th className="header_table text-right">Refund</th>
                                                                <th className="header_table text-right">Adjustment Refund</th>
                                                                <th className="header_table text-right">Total Refund</th>
                                                                <th className="header_table text-right">Payment Date</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {refund}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-6">
                                                    <label>History</label>
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                            <div className="col-md-12">
                                                <div className="col-md-12" style={{overflow : 'auto'}}>
                                                    <table className="table table-striped forbullet table-box table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th className="header_table text-right">Month</th>
                                                                <th className="header_table text-right">Target Monthly Bonus</th>
                                                                <th className="header_table text-right">Target Monthly VC</th>
                                                                <th className="header_table text-right">Act Monthly VC </th>
                                                                <th className="header_table text-right">Target Accum VC</th>
                                                                <th className="header_table text-right">Act Accum VC</th>
                                                                <th className="header_table text-right">Target Ratio Policy</th>
                                                                <th className="header_table text-right">Act Ratio Policy</th>
                                                                <th className="header_table text-right">Target Absen</th>
                                                                <th className="header_table text-right">Act Absen</th>
                                                                <th className="header_table text-right">Monthly Bonus</th>
                                                                <th className="header_table text-right">Adjust</th>
                                                                <th className="header_table text-right">Total Paym</th>
                                                                <th className="header_table text-right">Paym Date</th>
                                                                <th className="header_table text-right">P1</th>
                                                                <th className="header_table text-right">P2</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {history}
                                                        </tbody>
                                                    </table>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
								{/*</div>*/}
							</div>
						</div>
					</div>
				</div>
				<Footer />
		    	<SubmitModal />
		    	<FeatureModal />
			</div>
		);
	}
}


export default cpp;
