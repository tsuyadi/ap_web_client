"use strict"

import React from 'react';

import api_route from '../../common_components/api_route';

import {DateFormat, MoneyFormat, DateFormatYMD, DateFormatEx, DateFormatMMM } from '../../common_components/helper/formatter';
import {AGENT_LEVEL} from '../../common_components/helper/constant';

import {load, AjaxDownloadFile} from '../../common_components/helper/url_helper';

import {LoadLabel} from '../../common_components/resources/label';

class CppModal extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
			name: null,
			header: null,
			target: null,
			refund: null,
			history: null,
			monthly_progress: null,
            
        }

    }

    componentWillReceiveProps = (props) => {
       
        this.state.name = props.cppName;
        this.state.header = props.header;
        this.state.target = props.cppTarget;
        this.state.refund = props.cppRefund;
        this.state.history = props.cppHistory;
        this.state.monthly_progress = props.cppMonthly;

    }

    componentDidMount = () => {
        
        
    }


    loadProfile = () => {
        
		
		let paging = [];
		let total = 5;
		let current = 0;

		// try{
		// 	current = parseInt(this.state.param.page);
		// }catch(e){
		// 	current = 0;
		// }

		// try{
		// 	total = parseInt(this.state.total);
		// }catch(e){
		// 	total = 0;
		// }

		let start = (current - 5) < 0 ? 0 : (current-5);
		let end = (current + 5) > total ? total : (current+5);

		if(total > 0){
			paging.push(
				<li><a onClick={this.handlePageChanged.bind(this, (current - 1) < 0 ? 1 : (current - 1))}>Prev</a></li>
			);
			for(var i = start; i < end; i++){
				if(i == (current-1)){
					paging.push(
						<li className="active"><a onClick={this.handlePageChanged.bind(this, (i+1))}>{(i+1)}</a></li>
					);
				}else{
					paging.push(
						<li><a onClick={this.handlePageChanged.bind(this, (i+1))}>{(i+1)}</a></li>
					);
				}
			}
			paging.push(
				<li><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1)) }>Next</a></li>
			);
		}
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
            <div className="main">
                <div className="container-fluid personalData boxShadow">
                    <div className="title textShadow"><i className="fa fa-user"></i> Core Producer Program - {this.state.name}</div>
                    <div className="row">
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
        );
    }

    componentDidUpdate = () => {

    }

    closeModal = (r) => {
        if(r){
            r.preventDefault();
        }

        this.setState({
            profileData : null
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

    render()
    {
        let dialogClassname = 'modal-lg modal-dialog ' + this.props.id;
        let dialogLabel = this.props.id + 'Label';
        // debugger;
        let cppInfo = [];
        // debugger;
        if(this.props.cppTarget != null && this.props.cppRefund != null && this.props.cppHistory != null){
            cppInfo.push(this.loadProfile());  
        }else {
            cppInfo.push(
                <div className="text-center">Processing Information</div>
            );
        }

        

        return(
            <div className="modal fade" id="cpp-modal" tabIndex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true">
			  <div className={dialogClassname} style={{width:'90%'}}>
				<div className="modal-content zero-padding" style={{'padding':'0px'}}>
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.closeModal} >&times;</button>
                        <h4>Agent Core Producer Program - {this.state.name} <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-group-info"></i></h4>
                    </div>
					<div className="modal-body content-modal-group" style={{overflowY:'auto'}}>
                        {cppInfo}
                    </div>
				</div>
			  </div>
              
			</div>
        );
    }

}

export default CppModal;