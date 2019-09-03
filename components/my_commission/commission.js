'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import Pagination from 'react-js-pagination';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import {getMenu} from '../../common_components/helper/user_session';
import {DatePicker, MonthPicker} from '../../common_components/date_picker';
import {COMM_TYPE, GET_COMM_NAME, MIME_TYPE, GET_PROD_NAME, PROD_TYPE} from '../../common_components/helper/constant';
import {DateFormat, MoneyFormat, DateFormatYMD} from '../../common_components/helper/formatter';
import {getDataSource} from '../../common_components/resources/datasource';
import {load, AjaxDownloadFile} from '../../common_components/helper/url_helper';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';

var FileSaver = require('file-saver');

class commission extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			comission: null,
			rollingWeekQC : null,
			rollingWeekFYC : null,
			bonusComponentList : null,
			collpreList : null,
			param : {
				comission : {
					bonus_type : null,
					start_date : null,
					end_date : null
				},
				component : {
					variable : null,
					start_date : null,
					end_date : null
				},
				collected_premium : {
					type : 'personal',
					date : null
				}				
			}
		}
	}

	changeHandler = (tipe_param, changes) => {
		
		if(tipe_param == 'component'){
			this.state.bonusComponentList = null;
		}

		let data_array = this.state.param;
		for (let i in this.state.param) {
			if(i==tipe_param){				
				for(let n in this.state.param[i]){
					if(n==changes.target.name){
						data_array[i][n] = changes.target.value
					}
					else{
						data_array[i][n] = this.state.param[i][n];
					}
				}
			}			
		}
		// console.log(data_array);
		this.setState({
			param : data_array
		});


	}

	componentDidMount = () => {

		/**
		 * For an Initial Instance
		 * Load Commision with Month To Date Filter and All Commission Type
		 */

		var date = new Date();

		var start_date = new Date(date.getUTCFullYear(), date.getUTCMonth(), 1);

		$('[name=param\\.comission\\.start_date]').val(DateFormat(start_date));
		$('[name=param\\.comission\\.end_date]').val(DateFormat(date));

		$('[name=comp_start_date]').val(DateFormat(start_date));
		$('[name=comp_end_date]').val(DateFormat(date));
		
		var colpre_date = new Date(date.getUTCFullYear(), date.getUTCMonth() - 1, 1);
		var colpre_date_param = new Date( colpre_date.getFullYear(), colpre_date.getMonth() + 1, 0 );
		
		$('[name=collpre_date]').val(DateFormat(colpre_date_param));

		this.getRollingWeekBonus();

		this.getData();

		this.getBonusComponent();

		this.getCollectedPremium();

	}

	downloadBonusComponent = (variable_code, e) => {
		
		if(e != null) {
			e.preventDefault();
		}

		var params = {
			'variable' 		: variable_code,
			'start_date'	: this.state.param.component.start_date,
			'end_date' 		: this.state.param.component.end_date,
			'download-excel': 'download-excel'
		};

		var url_component = api_route.bonus_component;

			if(variable_code == PROD_TYPE.NEW_RECRUIT ){
				url_component = api_route.new_recruit_agent;
			} else if(variable_code == PROD_TYPE.FYC_PARALLEL){
				url_component = api_route.fyc_syc_parallel;
			} else if(variable_code == PROD_TYPE.SYC_PARALLEL){
				url_component = api_route.fyc_syc_parallel;
			}

			$.ajax({
			url : url_component,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data : {
				'variable' : variable_code,
				'start_date' : this.state.param.component.start_date,
				'end_date' : this.state.param.component.end_date,
				'download-excel' : 'download-excel'
			},
			dataType: 'binary',
			type : 'POST',		
			success: (response) => {				
				var blob = new Blob([response], {type: MIME_TYPE.XSLX + ";charset=utf-8"});
				FileSaver.saveAs(blob, "Component_" + GET_PROD_NAME(variable_code) + '_' + localStorage.agent_code + ".xls");
            },
		});

	}

	getBonusComponent = (e) => {

		if(e != null) {
			e.preventDefault();
		}


		let start_date = $('[name=comp_start_date]').val();
		let end_date = $('[name=comp_end_date]').val();

		let variable_type = $('[name=cb_comp_comission]').val();

		start_date = this.state.param.component.start_date = start_date.split("-").reverse().join("-");
		end_date = this.state.param.component.end_date = end_date.split("-").reverse().join("-");

		var params = null;

		var url_component = api_route.bonus_component;

		if(this.state.param.component.variable != null && this.state.param.component.variable != ''){
			params = this.state.param.component;

			if(params.variable == PROD_TYPE.NEW_RECRUIT ){
				url_component = api_route.new_recruit_agent;
			} else if(params.variable == PROD_TYPE.FYC_PARALLEL){
				url_component = api_route.fyc_syc_parallel;
			} else if(params.variable == PROD_TYPE.SYC_PARALLEL){
				url_component = api_route.fyc_syc_parallel;
			}

		}else{
			params = {
				start_date : this.state.param.component.start_date,
				end_date : this.state.param.component.end_date
			}
		}

		$('.load-component').show();
		load(url_component, params
		, (response) => {
			$('.load-component').hide();
			this.setState({
				bonusComponentList : response
			});
		}
		, (error) => {
			$('.load-component').hide();
			console.dir(error);			
		});

	}

	getRollingWeekBonus = () => {

		load(api_route.bonus_rollingweek,{
			'type' : 8
		}
		, (response) => {
			$('.load-incomecalc').hide();
			
			this.setState({
				rollingWeekFYC : response
			});

		}
		, (error) => {
			$('.load-incomecalc').hide();
			console.dir(error);
			alert('Something error happened, please contact agency portal support');			
		});

		load(api_route.bonus_rollingweek,{
			'type' : 12
		}
		, (response) => {
			$('.load-incomecalc').hide();
			
			this.setState({
				rollingWeekQC : response
			});

		}
		, (error) => {
			$('.load-incomecalc').hide();
			console.dir(error);
			alert('Something error happened, please contact agency portal support');			
		});

	}

	getCollectedPremium = (e) => {
		
		if(e != null) {
			e.preventDefault();
		}

		var dt = new Date();
		

		var colpre_date = new Date(dt.getUTCFullYear(), dt.getUTCMonth() - 1, 1);
		var colpre_date_param = new Date( colpre_date.getFullYear(), colpre_date.getMonth() + 1, 0 );

		let date = $('[name=collpre_date]').val();
		// // debugger;
		
		date = this.state.param.collected_premium.date = date.split("-").reverse().join("-");
		
		if(e != null) {

			var date_compare = new Date(date);
			date_compare.setHours(0);
			date_compare.setMinutes(0);
			date_compare.setSeconds(0);
			if(colpre_date_param < date_compare) {
				alert('Data ACP dan ECP hanya tersedia per ' + DateFormat(colpre_date_param));
				return;
			}
		}

		$('.load-acp').show();

		load(api_route.bonus_collected, this.state.param.collected_premium
		, (response) => {
			$('.load-acp').hide();
			this.setState({
				collpreList : response
			});
		}
		, (error) => {
			$('.load-acp').hide();
			console.log(error);			
		});

	}

	getData = () => {
		$('#loading').modal('show');
		
		$('.load-component').show();
    	// console.log(this.state.param);
    	// return false;

		let start_date = $('[name=param\\.comission\\.start_date]').val();
		let end_date = $('[name=param\\.comission\\.end_date]').val();
		this.state.param.comission.bonus_type = $('[name=param\\.comission\\.bonus_type]').val();

		start_date = this.state.param.comission.start_date = start_date.split("-").reverse().join("-");
		end_date = this.state.param.comission.end_date = end_date.split("-").reverse().join("-");

		$.ajax({
            url: api_route.bonus_comission,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param.comission,
            success: (response) => {
			  // console.log(response);
			  $('.load-component').hide();
              $('#loading').modal('hide');
              this.setState({
              	comission:response
              });
            },
            error: (err, response) => {
			  $('.load-component').hide();
              $('#loading').modal('hide');
              if(err.responseJSON){
				  if(err.responseJSON.detail){
					if(err.responseJSON.detail == "Signature has expired."){
						alert(err.responseJSON.detail);
						window.location.href = window.location.href.split('#')[0] + '#/';
					}else{
						alert(err.responseJSON.detail);
					}
				  }else{
					alert('Opps, something wrong happened !');
				  }				  
              	//window.location.href = window.location.href.split('#')[0] + '#/';
              }

            }
        });
	}

	downloadComission = (e) => {
		
		e.preventDefault();

		let param_comission = this.state.param.comission;
		let agent_code = localStorage.getItem('agent_code');

		let bonus_type = $('[name=param\\.comission\\.bonus_type]').val();

		let start_date = param_comission.start_date;
		let end_date = param_comission.end_date;
		
		if(bonus_type != '' && param_comission.start_date != '' && param_comission.end_date) {

			let download_url = api_route.commission_report + '?agent=' + agent_code + '&type=' + bonus_type + '&start_date=' + start_date + '&end_date=' + end_date;

			location.href = download_url;

		} else {

			alert('Date Period and Type of Bonus are Mandatory to Download Report');

		}


	}

	colpre_val = (e) => {

		// changes

	}

	render(){
		/**
		 * Load Menu Based on Its Module
		 */
		let menu = getMenu('Comission and Compensation');
		
		/**
		 * Load Comission Data and display it as table
		 */
		let comm_basic = [];

		if(this.state.comission != null && this.state.comission.length > 0){
			
			this.state.comission.map((detail) => {
				
				comm_basic.push(
					<tr  key={detail.generate_date+detail.bonus_type}>
						<td className="ct_table text-center">{DateFormat(detail.generate_date)}</td>
						<td className="ct_table">{GET_COMM_NAME(detail.bonus_type)}</td>
						<td className="ct_table text-right">{MoneyFormat(detail.bonus_amount)}</td>
					</tr>
				);

			});

		}else{

			comm_basic.push(
				<tr  key={'comm_basic' + 0}>
					<td className="ct_table text-center" colSpan={3}>Empty</td>
				</tr>
			);

		}

		let comp_comission = [];

		if(this.state.bonusComponentList != null && this.state.bonusComponentList.length > 0) {


			if(this.state.param.component.variable != null && this.state.param.component.variable != ''){
				let detail = this.state.bonusComponentList[0];

				comp_comission.push(
					<tr key={'comm_comp' + i}>
						<td className="text-left">{GET_PROD_NAME(this.state.param.component.variable)}</td>
						<td className="text-center">{detail.period[0] + ' - ' + detail.period[1]}</td>
						{/*<td className="text-right">{MoneyFormat(detail.production_value)}</td>*/}
						<td className="text-right">{MoneyFormat(detail.total_production)}</td>
						<td className="text-center">
							<button type="button" className="btn btn-primary" onClick={this.downloadBonusComponent.bind(this, this.state.param.component.variable)} >Detail</button>
						</td>
					</tr>
				);

			}else{
				let comp = this.state.bonusComponentList[0];

				var period_start_v = null;
				var period_end_v = null;

				if(comp.total_production.length > 0){
					period_start_v = comp.period[0];
					period_end_v = comp.period[1];
				}

				var list_cb_comp = getDataSource('DS_PRODTYPE_' + localStorage.getItem('role'));

				var list = [];

				list_cb_comp.map((d) => {

					var prd_total = 0;

					comp.total_production.map((detail, i) => {
						if(detail.variable === d.value){
							prd_total = detail.production_total;
						}
					})
					
					if(d.value != PROD_TYPE.ACTIVE_AGENT && d.value != PROD_TYPE.NEW_RECRUIT){
						list.push({variable : d.value, period_start : period_start_v, period_end : period_end_v, production_total : prd_total });
					}

					
					
				});

				list.map((detail, i) => {

				comp_comission.push(
					<tr key={'comm_comp' + i}>
						<td className="text-left">{GET_PROD_NAME(detail.variable)}</td>
						<td className="text-center">{comp.period[0] + ' - ' + comp.period[1]}</td>
						{/*<td className="text-right">{MoneyFormat(detail.production_value)}</td>*/}
						<td className="text-right">{MoneyFormat(detail.production_total)}</td>
						<td className="text-center">
							<button  type="button" className="btn btn-primary" onClick={this.downloadBonusComponent.bind(this, detail.variable)} >Detail</button>
						</td>
					</tr>

				);

			});

			}

			

		}else{
			
			if(this.state.bonusComponentList != null){
				
				let detail = this.state.bonusComponentList;

				var comp_c = [];

				try{
					comp_c = <tr key={'comm_comp' + i}>
							<td className="text-left">{GET_PROD_NAME(this.state.param.component.variable)}</td>
							<td className="text-center">{detail.period[0] + ' - ' + detail.period[1]}</td>
							{/*<td className="text-right">{MoneyFormat(detail.production_value)}</td>*/}
							<td className="text-right">{MoneyFormat(detail.total_production)}</td>
							<td className="text-center">
								<button className="btn btn-primary" onClick={this.downloadBonusComponent.bind(this, this.state.param.component.variable)} >Detail</button>
							</td>
						</tr>;
				}catch(e){
					comp_c = <tr key={'comm_comp' + 0}>
								<td className="text-center" colSpan={4}>Empty</td>
							</tr>;
				}

				comp_comission.push(comp_c);

			}else{
				comp_comission.push(
					<tr key={'comm_comp' + 0}>
						<td className="text-center" colSpan={4}>Empty</td>
					</tr>

				);
			}

		}


		/**
		 * Load FYC QC Rolling Week and Display it as Table
		 */
		let comm_header_table = [];

		comm_header_table.push(<th  key={'comm_header' + 0} className="header_table text-center" style={{'width':'200px'}}>Week</th>);

		for(var i = 1; i<= 12; i++){
			
			comm_header_table.push(
				<th key={'comm_header' + i} className="header_table text-center"  style={{'width':'250px'}}>{i}</th>
			);

		}

		let comm_body_table = [];

		comm_body_table.push( <td key={'comm_body' + 0} className="ct_table">QC</td>);

		for(var i = 1; i<= 12; i++){
			
			comm_body_table.push(
				<td key={'comm_body' + i} className="ct_table text-right">{'1.000.000'}</td>
			);

		}

		let cb_comm = [];
		let cb_comm_opt = [];

		/**
		 * Get Combobox DataSource of Commission Type Based on its Role
		 */

		cb_comm = getDataSource('DS_COMMTYPE_' + localStorage.getItem('role'));

		cb_comm.map((detail) => {
			cb_comm_opt.push(
				<option key={'DS_COMMTYPE_' + detail.value} value={detail.value}>{detail.text}</option>
			);
		});

		let cb_comp = [];
		let cb_comp_opt = [];

		/**
		 * Get Combobox DataSource of Component Comission Based on its Role
		 */

		cb_comp = getDataSource('DS_PRODTYPE_' + localStorage.getItem('role'));

		cb_comp.map((detail) => {
			cb_comp_opt.push(
				<option key={'DS_PRODTYPE_' + detail.value} value={detail.value}>{detail.text}</option>
			);
		});

		let rolling_week = [];


		let rollingWeekDetail = [];

		if(this.state.rollingWeekQC != null){

			rollingWeekDetail.push(
				<td className="ct_table text-center">QC</td>
			);

			this.state.rollingWeekQC.map((detail) => {
				rollingWeekDetail.push(
					<td className="ct_table text-right">{detail.amount}</td>
				);
			});

			rolling_week.push(
				<tr>
					{rollingWeekDetail}
				</tr>
			);

		}

		rollingWeekDetail = [];

		if(this.state.rollingWeekFYC != null) {
			
			rollingWeekDetail.push(
				<td className="ct_table text-center">FYC</td>
			);

			this.state.rollingWeekFYC.map((detail) => {
				rollingWeekDetail.push(
					<td className="ct_table text-right">{MoneyFormat(detail.amount)}</td>
				);
			});

			rolling_week.push(
				<tr>
					{rollingWeekDetail}
				</tr>
			);
			

		}

		let collectedPremium = [];

		let collpre_list = this.state.collpreList;

		if(collpre_list != null){
			// // debugger;
			var agent_code = localStorage.getItem('agent_code');
			var date = this.state.param.collected_premium.date;
			
			collectedPremium.push(
				<tr>
					<td className="ct_table text-right">{MoneyFormat(collpre_list.acp)}</td>
					<td className="ct_table text-right">{MoneyFormat(collpre_list.ecp)}</td>
					<td className="ct_table text-center"><a className="btn btn-default" href={api_route.collected_premium_report + '?agent='+agent_code+'&date='+date}>View Details</a></td>
				</tr>
			);
		}

		return (
			<div className="wrap2">

	            {menu}
				<SubmitModal />

				<div className="main-wrapper">
					<ol className="breadcrumb" style={{marginBottom: '5px'}}>
						 <li className="active">My Commission</li>
					</ol>

					<div className="main">

						<div className="panel panel-default boxShadow">
							<div className="panel-heading textShadow headPanel">
								<h1 className="panel-title"><i className="fa fa-dollar"></i> Comission and Compensation</h1>
							</div>
							<div className="panel-body">
								<div id="block1">
									<div className="row">
										<form className="form-horizontal">  
											<div className="col-xs-12">
																			
												<div className="form-group">
													<label className="col-sm-4">Period</label>
													<div className="col-md-2 col-sm-4">
														<DatePicker className="form-control" id="start_date" name="param.comission.start_date" placeholder="from" />
													</div>
													<div className="col-md-2 col-sm-4">
														<DatePicker className="form-control" id="end_date" name="param.comission.end_date" placeholder="to" />
													</div>
													<div className="col-md-1 col-sm-3 col-xs-4">
														<button type="button" className="btn btn-default btn-block" onClick={this.getData}>Submit <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-component" ></i></button>
													</div>
												</div>
												
											</div>
											<div className="col-xs-12">
												<div className="form-group">
													<label className="col-sm-4">Type of Comission</label>
													<div className="col-md-4 col-sm-7">
														<select className="form-control" id="bonus_type" name="param.comission.bonus_type" >
															<option value="">ALL</option>
															{cb_comm_opt}
														</select>
													</div>
													<div className="col-md-1 col-sm-3 col-xs-4">
														<button type="button" className="btn btn-primary btn-block" onClick={this.downloadComission}>Download</button>
													</div>
												</div>
											</div>
											<hr />
											<div className="col-xs-12">
												<div style={{'overflow':'auto', 'border':'1px solid #ddd'}}>
												<table className="table table-striped table-box">
													<thead>
														<tr>
															<th className="header_table text-center" style={{'fontWeight':'bold', 'width':'150px'}}>Generate Date</th>
															<th className="header_table text-center" style={{'fontWeight':'bold'}}>Type of Comission or Compensation</th>
															<th className="header_table text-center" style={{'fontWeight':'bold', 'width':'300px'}}>Amount IDR</th>
														</tr>
													</thead>
													<tbody>
														{comm_basic}
													</tbody>
												</table>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>

						<div className="panel panel-default boxShadow">
							<div className="panel-heading textShadow headPanel">
								<h1 className="panel-title"><i className="fa fa-dollar"></i> FYC, QC, FYP, AFYP and SYC</h1>
							</div>
							<div className="panel-body">
								<div id="block1">
									<div className="row">
										<form className="form-horizontal">  
											<div className="col-xs-12">
												FYC & QC 12 Rolling Week
											</div>
											<div className="col-xs-12">
												<div style={{'overflowX':'auto', 'border':'1px solid #ddd'}}>
													<table className="table table-striped table-box" style={{'width':'1935px'}}>
														<thead>
															<tr>
																{comm_header_table}
															</tr>
														</thead>
														<tbody>
															{rolling_week}
														</tbody>
													</table>
												</div>
											</div>
											
											<div className="col-xs-12">
												<div className="clearfix">&nbsp;</div>
											</div>

											<div className="col-xs-12">
												<div className="form-group">
													<label className="col-sm-4">Component Comission</label>
													<div className="col-md-5 col-sm-7">
														<select className="form-control" name="variable" onChange={this.changeHandler.bind(this, 'component')}>
															<option value="">ALL</option>
															{cb_comp_opt}
														</select>
													</div>													
												</div>
											</div>
											
											<div className="col-xs-12">
																			
												<div className="form-group">
													<label className="col-sm-4">Period</label>
													<div className="col-md-2 col-sm-3">
														<DatePicker className="form-control" id="comp_start_date" name="comp_start_date" placeholder="from" />
													</div>
													<div className="col-md-2 col-sm-3">
														<DatePicker className="form-control" id="comp_end_date" name="comp_end_date" placeholder="to" />
													</div>
													<div className="col-md-1 col-sm-2 col-xs-4">
														<button type="button" className="btn btn-primary btn-block" onClick={this.getBonusComponent} >Search <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-component" ></i></button>														
													</div>
												</div>
												
											</div>

											<hr />
											<div className="col-xs-12">
												<div style={{'overflowX':'auto', 'border':'1px solid #ddd'}}>
												<table className="table table-striped table-box">
													<thead>
														<tr>
															<th className="header_table text-center" style={{'fontWeight':'bold', 'width':'150px'}}>Variable</th>
															<th className="header_table text-center" style={{'fontWeight':'bold', 'textAlign':'center', 'width':'200px'}}>Production Period</th>
															<th className="header_table text-center" style={{'fontWeight':'bold'}}>Total</th>
															<th className="header_table text-center" style={{'fontWeight':'bold', 'width':'200px'}}>Details</th>
														</tr>
													</thead>
													<tbody>
														{comp_comission}
													</tbody>
												</table>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>

						<div className="panel panel-default boxShadow">
							<div className="panel-heading textShadow headPanel">
								<h1 className="panel-title"><i className="fa fa-dollar"></i> Actual Collected Premium and Expected Collected Premium</h1>
							</div>
							<div className="panel-body">
								<div id="block1">
									<div className="row">
										<form className="form-horizontal">  
											<div className="col-xs-12">
																			
												<div className="form-group">
													<div className="col-sm-4 col-md-2">
														<DatePicker className="form-control" id="collpre_date" name="collpre_date" placeholder="from" onBlur={this.colpre_val} />
													</div>
													<div className="col-sm-3 col-md-1">														
														<button  type="button" className="btn btn-primary btn-block" onClick={this.getCollectedPremium} >Search  <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-acp" ></i></button>
													</div>
												</div>
												
											</div>											
											<hr />
											<div className="col-xs-12">
												<div style={{'overflowX':'auto', 'border':'1px solid #ddd'}}>
												<table className="table table-striped table-box">
													<thead>
														<tr>
															<th className="header_table text-center" style={{'fontWeight':'bold'}}>Total ACP 1</th>
															<th className="header_table text-center" style={{'fontWeight':'bold'}}>Total ECP 1</th>
															<th className="header_table text-center" style={{'fontWeight':'bold', 'width':'200px'}}>Details</th>
														</tr>
													</thead>
													<tbody>
														{collectedPremium}
													</tbody>
												</table>
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>

					</div>
					

				</div>
				<FeatureModal />
				<div className="clearfix"></div>
				<Footer />

			</div>
		);
	}
}

export default commission;
