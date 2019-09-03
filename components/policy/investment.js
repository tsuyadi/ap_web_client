'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuPolicy from '../../common_components/menu_v2/left_menu_policy';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';
import {DateFormat, MoneyFormat, MoneyFormatUnit} from '../../common_components/helper/formatter';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import {MIME_TYPE} from '../../common_components/helper/constant';

import {DatePicker} from '../../common_components/date_picker';
var FileSaver = require('file-saver');

class investment extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			unit_link: null,
			transaction_type_list: null,
			fund_type_list: null,
			policy_id: this.props.params.policy_id,
			param: {
				policy_id: this.props.params.policy_id,
				report_start_date:"",
				report_end_date:"",
				transaction_desc:"",
				fund_type:"",
				page:"1",
				offset:10,
				'export':'',
			},
			investment : null,
			data : null,
			total : 0,
			current : 0,
			visiblePages : 3,
			hideBalance : false
		}
		this.getData = this.getData.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		this.openMenu = this.openMenu.bind(this);
		this.downloadInvestment= this.downloadInvestment.bind(this);
		this.downloadInvestmentPDF= this.downloadInvestmentPDF.bind(this);
        
	}

	
	handleChangeData(event){
		let data_array = {};
		for (let i in this.state.param) {
			if(i==event.target.name){
				if(event.target.name == 'display_group'){	
												
					data_array[i] = event.target.value == 'false' ? 'true' : 'false'
				}else{
					data_array[i] = event.target.value
				}				
			}
			else{
				data_array[i] = this.state.param[i]
			}
		}
		this.setState({
			param : data_array
		});
		debugger;
	}

	handlePageChanged(newPage){
		
		this.state.param.page = newPage;
		$('#loading').modal('show');
		// debugger;
		$.ajax({
			url: api_route.policy_unit_link,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			var num_data = response.content.unit_link_list || [];
			var total_page = response.content.total_pages;
			// // debugger di listpolicies ajax
			
				this.setState({
					unit_link: response.content.unit_link_list,
					transaction_type_list:response.transaction_desc,
					fund_type_list:response.fund_type,
					total: total_page
				});
			},
			error: (err, response) => {
			$('#loading').modal('hide');
			// alert('Session expired, please login');
			// window.location.href="/";
			if(err.responseJSON){
				window.location.href = window.location.href.split('#')[0] + '#/';
			}

			}
		});

	}

	componentWillMount = () => {
		CekAuth();
	}

	downloadInvestment(){

		this.state.param.export = 'excel';

		$('#loading').modal('show');

		$.ajax({
            url: api_route.policy_unit_link,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param,	
			dataType: 'binary',			
            // contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            success: (response) => {
              	$('#loading').modal('hide');
				var blob = new Blob([response], {type: MIME_TYPE.XSLX + ";charset=utf-8"});
				FileSaver.saveAs(blob, "investment" + localStorage.agent_code + ".xlsx");
            },
            error: (err, response) => {
              $('#loading').modal('hide');
			  alert("something wrong");
            }
        });
	}

	downloadInvestmentPDF(){

		this.state.param.export = 'pdf';

		$('#loading').modal('show');

		$.ajax({
            url: api_route.policy_unit_link,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param,	
			dataType: 'binary',			
            // contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
            success: (response) => {
              	$('#loading').modal('hide');
				var blob = new Blob([response], {type: MIME_TYPE.XSLX + ";charset=utf-8"});
				FileSaver.saveAs(blob, "unitlinktransaction" + localStorage.policy_no + ".pdf");
            },
            error: (err, response) => {
              $('#loading').modal('hide');
			  alert("something wrong");
            }
        });
	}

	componentDidMount = () => {
		$('#loading').modal('show');
		// State Default
  		
		$.ajax({
            url: api_route.policy_investment,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {policy_id:this.state.policy_id},
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');
			  this.setState({
				  investment : response.content
			  });
            },
            error: (err, response) => {
              	$('#loading').modal('hide');
          		if(err.responseJSON){
	        		window.location.href = window.location.href.split('#')[0] + '#/';
	          	}
            }
		});
		
		$('#loading').modal('show');
		$.ajax({
            url: api_route.policy_info,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: {policy_id:this.state.policy_id},
            success: (response) => {
              $('#loading').modal('hide');
              this.setState({
					data:response.content
			  })
			},
			error: (err, response) => {
				$('#loading').modal('hide');
				if(err.responseJSON){
					window.location.href = window.location.href.split('#')[0] + '#/';
				}
			}
		});
		this.getData();
	}
	changeDateFormat(date){
		var now = date.split("-");
		var day = now[0];
		var month = now[1];
		var year = now[2];
		var newDate = null;
		newDate = year+'-'+month+'-'+day;
		return newDate;
	}
	
	getData(){
		
		if(this.state.param.transaction_desc != ""){
			 this.state.hideBalance = true;
		}else{
			 this.state.hideBalance = false;
		}

		var param_date_start = $('[name=report_start_date]').val() ? this.changeDateFormat($('[name=report_start_date]').val()) : "";
		var param_date_end = $('[name=report_end_date]').val() ? this.changeDateFormat($('[name=report_end_date]').val()) : "";

		this.state.param.report_start_date = param_date_start;
		this.state.param.report_end_date = param_date_end;
		this.state.param.page = '1';

		var paramSearch = this.state.param;
		
			$.ajax({
				url: api_route.policy_unit_link,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {

					// // debugger;
					this.setState({
						transaction_type_list: response.transaction_desc,
						fund_type_list: response.fund_type,
						unit_link: response.content.unit_link_list,
						total: response.content.total_pages
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

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }
	render(){
		let unit_link = this.state.unit_link;
		let transaction_type = this.state.transaction_type_list;
		let fund_type = this.state.fund_type_list;
		let allocation = [];
		let investment = [];
		let investment_topup = [];
		let trad_comp_maturity = [];
		let trad_comp_cashv = [];

		let prem_allocation = [];
		let traditional = [];
		let unitlink = [];
		let unitlink_topup = [];
		let data = this.state.data;
		if (data && data.policy && data.policy.lifeassured_set.length > 0){
			var insured = data.policy && data.policy.lifeassured_set && data.policy.lifeassured_set.length > 0 && data.policy.lifeassured_set[0].person.name ;
		} else {
			var insured = '-' ;
		}
		if (data && data.policy && data.policy.premium_duedate == "Premium Holiday"){
			var next_premium = "Premium Holiday";
			localStorage.setItem('premium_duedate', next_premium);
		} else if (data && data.policy && data.policy.premium_duedate == "-"){
			var next_premium = "-";
			localStorage.setItem('premium_duedate', next_premium);
		} else {
			var next_premium = data && data.policy && DateFormat(data.policy.premium_duedate);
			localStorage.setItem('premium_duedate', next_premium);
	
		}
		
		let dataUnitLink = [];
		let transaction_type_list = [];
		let temp_transaction_type_list = [];
		let unique_transaction_type_list = [];
		let fund_type_list = [];
		let styleBalance = "";
		if(this.state.hideBalance){
			styleBalance = "hidden";
		}else{
			styleBalance = "";
		}

		if(unit_link && unit_link.length > 0)
		{
			debugger;
			$.map(unit_link, (value, index) => {
	            
				let offs = this.state.param.offset;
				let page = this.state.param.page; 
				let num = (page - 1) * offs;
				let row = null;
				let transaction_desc = '';
				if(value.transaction_desc == 'Contract Issue'){
					transaction_desc = 'Premium Collection';
				}else{
					transaction_desc = value.transaction_desc;
				}
				num += (index+1);
				row = <tr key={index}>
							<td>{DateFormat(value.transaction_date)}</td>
							<td>{transaction_desc}</td>
							<td>{value.fund}</td>
							<td>{DateFormat(value.price_date)}</td>
							<td style={{textAlign:'right'}}>{MoneyFormatUnit(value.nav_per_unit)}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.transaction_amount)}</td>
							<td style={{textAlign:'right'}}>{MoneyFormatUnit(value.transaction_unit)}</td>
							<td style={{textAlign:'right'}} className={styleBalance}>{MoneyFormatUnit(value.balance)}</td>
						</tr>
				dataUnitLink.push(row);
	          });
		} else {
			let row = <tr>
						<td colSpan="8" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            dataUnitLink.push(row);
		}
		if(transaction_type && transaction_type.length > 0)
		{
			$.map(transaction_type, (value) => {
				let option = null;
				if(value.transaction_desc != 'Contract Issue'){
					// option = <option value={value.transaction_desc}>{value.transaction_desc}</option>
					temp_transaction_type_list.push(value.transaction_desc);
				}else{
					// option = <option value='Premium Collection'>Premium Collection</option>
					temp_transaction_type_list.push('Premium Collection');
				}
	          });
			$.each(temp_transaction_type_list, function(i, el){
				if($.inArray(el, unique_transaction_type_list) === -1) {
					unique_transaction_type_list.push(el);
				}
			});
			$.map(unique_transaction_type_list, (value) => {
				let option = <option value={value}>{value}</option>
				transaction_type_list.push(option);

			});
		} 
		
		if(fund_type && fund_type.length > 0)
		{
			$.map(fund_type, (value) => {
				let option = null;
				option = <option value={value.fund}>{value.fund}</option>
				fund_type_list.push(option);
	          });
		} 

		let policy = null;
		policy = {
				policy_no : localStorage.getItem('policy_no'),	
				policy_holder : localStorage.getItem('policy_holder'),	
				insured : localStorage.getItem('insured'),	
				spaj_number : localStorage.getItem('spaj_number'),	
				agent_code : localStorage.getItem('agent_code'),	
				policy_status : localStorage.getItem('policy_status'),	
				agent_status : localStorage.getItem('agent_status'),	
				agent_name : localStorage.getItem('agent_name')	
			};

		if(this.state.investment && this.state.investment.investments){

			prem_allocation = this.state.investment.investments.allocation;
			traditional = this.state.investment.investments.traditional;
			unitlink = this.state.investment.investments.unitlink;
			unitlink_topup = this.state.investment.investments.unitlink_topup;

		}

		if(prem_allocation && prem_allocation.length > 0){
			$.map(prem_allocation, (value, index) => {
	            let row = null;
				let insured = "";
				
	            row = <tr key={index}>
						<td>{value.type_of_fund}</td>
						<td>{value.percentage_allocation}</td>
					</tr>
				allocation.push(row);
            });
		}
		else {
			let row = <tr>
						<td colSpan="2" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            allocation.push(row);
		}
		if(unitlink_topup && unitlink_topup.length > 0){
			var total_investment_topup = 0;
			$.map(unitlink_topup, (value, index) => {
	            let row = null;
				let insured = "";
				total_investment_topup = total_investment_topup + parseFloat(value.total_investment_value);
	            row = <tr key={index}>
						<td>{value.product_name}</td>
						<td>{value.type_of_fund}</td>
						<td>{DateFormat(value.price_date)}</td>
						<td>{MoneyFormatUnit(value.unit_price)}</td>
						<td>{MoneyFormatUnit(value.total_unit)}</td>
						<td>{MoneyFormat(value.total_investment_value)}</td>
					</tr>
				investment_topup.push(row);
            });
		}else{
			let row = <tr>
						<td colSpan="6" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            investment_topup.push(row);
		}
		if(unitlink && unitlink.length > 0){
			var total_investment = 0;
			$.map(unitlink, (value, index) => {
	            let row = null;
				let insured = "";
				total_investment = total_investment + parseFloat(value.total_investment_value);
	            row = <tr key={index}>
						<td>{value.product_name}</td>
						<td>{value.type_of_fund}</td>
						<td>{DateFormat(value.price_date)}</td>
						<td>{MoneyFormatUnit(value.unit_price)}</td>
						<td>{MoneyFormatUnit(value.total_unit)}</td>
						<td>{MoneyFormat(value.total_investment_value)}</td>
					</tr>
				investment.push(row);
            });
		}
		else if((traditional && traditional.cash_value && traditional.cash_value.length > 0) || (traditional && traditional.maturity && traditional.maturity.length > 0)){
			let maturity = traditional.maturity;
			let cash_value = traditional.cash_value;

			if(maturity.length > 0){
				$.map(maturity, (value, index) => {
					let row = null;
					let insured = "";

					trad_comp_maturity.push(
						<tr key={index}></tr>
					);
				});
			}

			if(cash_value.length > 0){
				$.map(cash_value, (value, index) => {
					let row = null;
					let insured = "";

					trad_comp_cashv.push(
						<tr key={index}></tr>
					);
				});
			}

		}
		else {
			let row = <tr>
						<td colSpan="6" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            investment.push(row);
		}

		let comp_investment = [];
		let comp_investment_topup = [];

		if(investment.length > 0){
			comp_investment_topup.push(
				<div className="col-sm-12">
					<h3>Investment Value - Top Up Reguler</h3>
					
					<div className="table-responsive">
						<table className="table table-bordered table-striped table-hover table-box">
							<thead>
								<tr>
									<th className="header_table ">Product Name</th>	
									<th className="header_table ">Type of Fund</th>															
									<th className="header_table ">Price Date</th>
									<th className="header_table ">Unit Price</th>
									<th className="header_table ">Total Unit</th>
									<th className="header_table ">Investment Value</th>
								</tr>
							</thead>
							<tbody>
								{investment_topup}	
								<tr>
									<td colSpan="5">Total </td>
									<td>{MoneyFormat(total_investment_topup)}</td>
								</tr>													
							</tbody>
						</table>
					</div>
				</div>
			);
		}
		if(investment.length > 0){
			comp_investment.push(
				<div className="col-sm-12">
					<h3>Investment Value - Premi Reguler</h3>
					
					<div className="table-responsive">
						<table className="table table-bordered table-striped table-hover table-box">
							<thead>
								<tr>
									<th className="header_table ">Product Name</th>	
									<th className="header_table ">Type of Fund</th>															
									<th className="header_table ">Price Date</th>
									<th className="header_table ">Unit Price</th>
									<th className="header_table ">Total Unit</th>
									<th className="header_table ">Investment Value</th>
								</tr>
							</thead>
							<tbody>
								{investment}	
								<tr>
									<td colSpan="5">Total </td>
									<td>{MoneyFormat(total_investment)}</td>
								</tr>													
							</tbody>
						</table>
					</div>
				</div>
			);
		}else{
			comp_investment.push(
				<div className="col-sm-12">
					<h3>Cash Value</h3>
					
					<div className="table-responsive">
						<table className="table table-bordered table-striped table-hover table-box">
							<thead>
								<tr>
									<th className="header_table ">Policy Year</th>															
									<th className="header_table ">Sum Assured</th>
									<th className="header_table ">CSV</th>
								</tr>
							</thead>
							<tbody>
								{trad_comp_cashv}														
							</tbody>
						</table>
					</div>

					<h3>Maturity</h3>
					
					<div className="table-responsive">
						<table className="table table-bordered table-striped table-hover table-box">
							<thead>
								<tr>
									<th className="header_table ">Policy Year</th>															
									<th className="header_table ">Sum Assured</th>
									<th className="header_table ">Maturity</th>
								</tr>
							</thead>
							<tbody>
								{trad_comp_maturity}														
							</tbody>
						</table>
					</div>
				</div>
			);
		}
	let listPoliciesClass = "";

		if(unit_link != null && unit_link.length > 0){
			listPoliciesClass = "table table-bordered table-striped table-hover text-center table-box ";
		}else{
			listPoliciesClass = "table table-bordered table-striped table-hover text-center table-box hidden";
		}

		
		let paging = [];
		let total = 0;
		let current = 0;

		try{
			current = parseInt(this.state.param.page);
		}catch(e){
			current = 0;
		}

		try{
			total = parseInt(this.state.total);
		}catch(e){
			total = 0;
		}

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

		return (
		<div className="wrap2">
			<SubmitModal />
			<FeatureModal />
            <TopMenuNewBusinessDetail opsi="policyt" title="Investment" id={this.props.params.policy_id} />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/policy/list_policies">Policy Tracking</a></li>
							<li className="active">Investment</li>
						</ol>
					{/*</div>
					<div className="col-xs-2">
						<ol className="breadcrumb" onClick={this.openMenu} style={{marginBottom: '5px', cursor : 'pointer'}}>
							<li className="active">
								<span className="menuIconSidebar">
									<i className="fa fa-bars"></i>
								</span>
							</li>
						</ol>
					</div>
				</div>*/}
				
				<div className="main twoColumnMain">

					<LeftMenuPolicy active="4" policy_id={this.state.policy_id} />

					<div className="main-content boxShadow">
						<div className="row">
							<div className="col-sm-12">
							<div className="boxHeader">
									<div className="row">
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy No</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.number}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Status</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.status}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Status Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.policy_status_date && DateFormat(data.policy.policy_status_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Holder Name</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.policy_holder.name}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Insure Name</label>
													</div>
													<div className="col-sm-6">
														{insured}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Premium Payment Period</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy && data.policy.premium_period}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Payment Mode</label>
													</div>

													<div className="col-sm-6">
														{data && data.policy.payment_mode}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Payment Method</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.payment_method}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Contract Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy && DateFormat(data.policy.effective_date)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Effective Date</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy && DateFormat(data.policy.effective_date)}
													</div>
												</div>
												
											</form>
										</div>
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>SPAJ No</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.spaj_number}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Code</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.agent.code}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Name</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.agent.full_name}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Status</label>
													</div>
													<div className="col-sm-6">
														{data && data.policy.agent.status}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Currency</label>
													</div>
													<div className="col-sm-6">
														{data && data.currency}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Regular Premium</label>
													</div>
													<div className="col-sm-6">
														{MoneyFormat(data && data.policy.regular_premium)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Regular Top Up / Rider Premium</label>
													</div>
													<div className="col-sm-6">
														{MoneyFormat(data && data.policy.regular_topup)}
													</div>
												</div>												
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Total Premium</label>
													</div>
													<div className="col-sm-6">
														{MoneyFormat(data && data.policy.total_premium)}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Next Premium Due Date</label>
													</div>

													<div className="col-sm-6">
														{next_premium}
													</div>
												</div>	
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Branch</label>
													</div>

													<div className="col-sm-6">
														{data && data.policy.branch}
													</div>
												</div>												
											</form>
										</div>
									</div>
								</div>
								<div className="boxBody">
									<div className="row">
										<div className="col-sm-12">
											<h3>Investment Premium Allocation</h3>											
											<div className="table-responsive">
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">Type of Fund</th>
															<th className="header_table ">Percentage Allocation</th>
														</tr>
													</thead>
													<tbody>
														{allocation}														
													</tbody>
												</table>
											</div>
										</div>
									</div>
									<div className="row">
										{comp_investment}
									</div>
									
									<div className="row">
										{comp_investment_topup}
									</div>
									
									<div className="row">
										<div className="col-sm-12">
										<h3>Unit link Transaction</h3>
										<div className="row" style={{marginTop:'30px'}}>
											<div className="col-sm-12">
												<div className="col-sm-6">
													<div className="form-horizontal">
														<div className="form-group">
															<div className="col-sm-6">
																<label>Transaction Type</label>
															</div>
															<div className="col-sm-6">
																<select className="form-control" id="transaction_desc" name="transaction_desc" onChange={this.handleChangeData}>
																	<option value="">All</option>
																	{transaction_type_list}
																</select>
															</div>
														</div>

													</div>
												</div>

												<div className="col-sm-6">
													<div className="form-horizontal">
														<div className="form-group">
															<div className="col-sm-6">
																<label>Fund Name</label>
															</div>
															<div className="col-sm-6">
																<select className="form-control" id="fund_type" name="fund_type" onChange={this.handleChangeData} >
																	<option value="">All Fund</option>
																	{fund_type_list}
																</select>
															</div>
														</div>

													</div>
												</div>
											</div>

											<div className="col-sm-12">
												<div className="form-horizontal">
													<div className="col-sm-6">
														<div className="form-group">
															<div className="col-sm-6">
																<label>Transaction Date</label>
															</div>

															<div className="col-sm-6">
																<DatePicker className="form-control" id="report_start_date" name="report_start_date"/>
															</div>
														</div>
													</div>

													<div className="col-sm-6">
														<div className="form-group">
															<div className="col-sm-6">
																<label>to</label>
															</div>
															<div className="col-sm-6">
																<DatePicker className="form-control" id="report_end_date" name="report_end_date"/>
															</div>
														</div>
													</div>
												</div>
											</div>


											<div className="col-sm-12">
												<div className="clearfix h25"></div>

												<div className="col-sm-12 col-md-3 pull-right">
													<button className="btn btn-primary btn-block btn-md" type="button" onClick={this.getData.bind(this, '0')}><i className="fa fa-search"></i> Search</button>
												</div>
											</div>
										</div>

										<hr />
										<div className="col-sm-12">
											<div className="table-responsive">
												<div>
													<nav aria-label="Page navigation">
														<ul className="pagination">
															{paging}	
														</ul>
													</nav>
												</div>
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">Transaction Date</th>
															<th className="header_table ">Transaction</th>
															<th className="header_table ">Fund</th>
															<th className="header_table ">Price Date</th>
															<th className="header_table ">NAV per Unt</th>
															<th className="header_table ">Transaction Amount</th>
															<th className="header_table ">Transaction Unit</th>
															<th className={'header_table '+styleBalance}>Balance Unit</th>
														</tr>
													</thead>
													<tbody>
														{dataUnitLink}												
													</tbody>
													<tfoot>
														<tr>
															<th colSpan="15"><button style={{marginRight:'10px'}} className="btn btn-primary" onClick={() => this.downloadInvestment()}>Export as XLSX</button><button className="btn btn-primary" onClick={() => this.downloadInvestmentPDF()}>Export as PDF</button></th>
														</tr>
													</tfoot>
												</table>
												<div>
													<nav aria-label="Page navigation">
														<ul className="pagination">
															{paging}	
														</ul>
													</nav>
												</div>
											</div>
										</div>
									</div>
									</div>
									{/*
									<div className="row">
										<div className="col-sm-12">
											<h3>Disclaimer</h3>
											<div className="boxDisclaimer">
												Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc id nisi eget sem tempor adipiscing. Suspendisse et ante sapien. Ut adipiscing mattis aliquam. Pellentesque non varius lorem. Integer tellus arcu, vestibulum ac faucibus eget, vulputate at mauris. Donec nibh dui, lobortis vel ullamcorper eu, semper accumsan metus. Nulla tortor purus, pulvinar nec commodo in, scelerisque id urna. Fusce sagittis eleifend odio, id bibendum erat gravida non. Fusce augue dolor, commodo nec adipiscing vel, mattis a est. Integer egestas dictum tellus. Phasellus at dignissim lectus. Maecenas sed sem sit amet erat pulvinar ultricies ac quis nisi. Vestibulum sit amet risus orci, sit amet feugiat magna. Nullam gravida tellus at tellus tristique varius suscipit tortor fringilla. Vivamus suscipit urna sit amet nisl viverra vulputate.
												<br/>
												<br/>
												Curabitur at urna id nisi lobortis luctus eu id urna. Cras rhoncus sem a lacus ultricies sed tincidunt risus ultrices. Sed elementum neque quis ante bibendum posuere. Donec vel justo lorem, ac suscipit nulla. Donec vel sapien vel sem suscipit suscipit vitae in velit. Integer consectetur mauris a ante posuere fringilla. Praesent pharetra pellentesque enim ac consectetur. Nam nisi urna, consequat auctor eleifend pulvinar, pulvinar at ipsum. Phasellus at dolor at turpis eleifend rutrum in non magna. Nullam dapibus venenatis leo, non facilisis augue placerat eu. Nulla vel urna sed lacus fermentum aliquet eu sit amet dui. Sed elementum placerat augue et porttitor. Phasellus eu sapien nec diam facilisis placerat. Integer id odio sed justo ultricies convallis sed vitae est.
												<br/>
												<br/>
												Aliquam sed massa quis enim molestie adipiscing. Morbi ac enim quam, eu pulvinar purus. Curabitur vulputate, odio nec rutrum tincidunt, urna dui sagittis sem, quis rhoncus quam massa ut mauris. Nullam pulvinar, nisl at fermentum condimentum, ipsum sapien dictum sem, et tempus quam velit nec magna. Nulla facilisi. Duis adipiscing tempor dui nec elementum. Aliquam dui ipsum, convallis quis facilisis vitae, hendrerit at odio. Phasellus elementum blandit fringilla. Nullam eget felis nunc. Donec adipiscing tellus nec tortor ultricies commodo. Quisque neque nibh, laoreet eget euismod id, lobortis ut dui. Cras leo justo, ornare id porttitor et, sollicitudin vel leo. Duis vitae justo urna. Praesent ultricies mattis luctus. Maecenas id urna a libero cursus venenatis.
											</div>
										</div>
									</div>
									*/}

								</div>
		
							</div>
						</div>
						
					</div>

					<div className="clearfix"></div>
				</div>
			</div>

			<Footer />

		</div>
		);
	}
}

export default investment;