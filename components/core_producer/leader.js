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
import CppModal from '../../common_components/modal/cpp_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
var FileSaver = require('file-saver');

class cpp_leader extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			member: null,
			header: null,
			cppName: null,
			cppTarget: null,
			cppRefund: null,
			cppHistory: null,
			cppMonthly: null,
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
				type : 'member',
				agent_code : '',
				agent_name : '',
				// page:"1",
				// offset:10
			},
			total : 0,
			current : 0,
			visiblePages : 3
		}
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
		this.getData();
	}
	
	getData(){
		
		$('.load-component').show();
		var param_agent_code = $('[name=agent_code]').val() ? $('[name=agent_code]').val() : "";
		var param_agent_name = $('[name=agent_name]').val() ? $('[name=agent_name]').val() : "";

		this.state.param.agent_code = param_agent_code;
		this.state.param.agent_name = param_agent_name;

        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: this.state.param,
            success: (response) => {

                this.setState({
                    member : response.content
                });
				$('.load-component').hide();
            },
            error: (err, response) => {
                $('#loading').modal('hide');
                if(err.responseJSON){
				$('.load-component').hide();
                    alert('Session expired, please login');
                    window.location.href="/";
                    //window.location.href = window.location.href.split('#')[0] + '#/';
                }else{
				$('.load-component').hide();
                    alert('Please check your connection');
                }

            }
        });
	}

	loadCppInfo = (id, name, r) => {
		$('#loading').modal('show');
        this.state.cppName = name;
		this.getDataTarget(id);
		this.getDataHeader(id);
		this.getDataRefund(id);
		this.getDataHistory(id);
		this.getDataMonthly(id);
	}
	
	getDataHeader(id){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'header', 
                    agent_id : id},
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
	
	getDataTarget(id){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'target', 
                    agent_id : id},
            success: (response) => {

                this.setState({
                    cppTarget : response.content
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
	
	getDataRefund(id){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'refund', agent_id : id},
            success: (response) => {

                this.setState({
                    cppRefund : response.content
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
	
	getDataHistory(id){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'history', agent_id : id},
            success: (response) => {

                this.setState({
                    cppHistory : response.content
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
	
	getDataMonthly(id){
		
        $.ajax({
            url: api_route.core_procedure_program,
            headers: {
                'Authorization':'JWT '+sessionStorage.getItem('token')
            },
            type: 'POST',
            data: {type : 'monthly_progress', agent_id : id},
            success: (response) => {

                this.setState({
                    cppMonthly : response.content
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


	render(){
		
		/**
		 * Load Menu Based on Its Module
		 */
		let menu = getMenu('Core Producer Program', this.showRight, 'fa fa-caret-square-o-right');
		 
		//member
        var data_member = this.state.member;
        var member = [];
		if(data_member && data_member.length > 0)
		{
			debugger;
			$.map(data_member, (value, index) => {
	            
				let row = null;
				row = <tr key={index}>
							<td><a data-toggle="modal" data-target="#cpp-modal" onClick={this.loadCppInfo.bind(this, value.agent.id, value.agent.full_name)}>{value.agent.code}</a></td>
							<td>{value.agent.full_name}</td>
							<td>{value.agent.level}</td>
							<td>{value.recruiter.code}</td>
							<td>{value.recruiter.full_name}</td>
							<td>{value.recruiter.level}</td>
							<td>{DateFormatMMM(value.production_date)}</td>
							<td>{DateFormatMMM(value.effective_date)}</td>
							<td>{DateFormatMMM(value.end_date)}</td>
							<td>{value.status}</td>
							<td>{value.month_process}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.monthly_bonus)}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.deposit)}</td>
						</tr>
				member.push(row);
	          });
		} else {
			let row = <tr>
						<td colSpan="13" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            member.push(row);
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
							<div className="panel-body" style={{height:'800px'}}>
								{/*<div className="container">*/}
                                    <div className="row">
                                        <div className ="col-md-12">
                                            <div className="col-md-4">
                                                <div className="col-md-6">
                                                    <label>Agent Code</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control" id="agent_code" name="agent_code" ></input>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row" style={{marginTop : '10px'}}>
                                        <div className ="col-md-12">
                                            <div className="col-md-4">
                                                <div className="col-md-6">
                                                    <label>Agent Name</label>
                                                </div>
                                                <div className="col-md-6">
                                                    <input type="text" className="form-control" id="agent_name" name="agent_name" ></input>
                                                </div>
                                            </div>
                                            <div className="col-md-4">
                                                <div className="col-md-6" style={{marginTop:'10px'}}>
													<button className="btn btn-primary btn-block" onClick={this.getData.bind(this)} >Search <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-component" ></i></button>		
                                                </div>
                                                <div className="col-md-6">
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="row">
                                        <div className="col-md-12">
                                            <div className="col-md-12">
                                                <div className="col-md-12" style={{overflow : 'auto', maxHeight: '600px'}}>
                                                    <table className="table table-striped forbullet table-box table-bordered">
                                                        <thead>
                                                            <tr>
                                                                <th className="header_table text-right">Agent Code</th>
                                                                <th className="header_table text-right">Agent Name</th>
                                                                <th className="header_table text-right">Agent Level</th>
                                                                <th className="header_table text-right">Recruiter Code</th>
                                                                <th className="header_table text-right">Recruiter Name</th>
                                                                <th className="header_table text-right">Recruiter Level</th>
                                                                <th className="header_table text-right">Production Date</th>
                                                                <th className="header_table text-right">Effective Date</th>
                                                                <th className="header_table text-right">End Date</th>
                                                                <th className="header_table text-right">CPP Status</th>
                                                                <th className="header_table text-right">Month Process</th>
                                                                <th className="header_table text-right">Monthly Bonus</th>
                                                                <th className="header_table text-right">Registration Fee</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
															{member}
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
				<CppModal cppTarget={this.state.cppTarget} cppRefund={this.state.cppRefund} cppHistory={this.state.cppHistory} cppMonthly={this.state.cppMonthly} header={this.state.header} cppName={this.state.cppName} />
			</div>
		);
	}
}


export default cpp_leader;
