'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuPolicy from '../../common_components/menu_v2/left_menu_policy';
import {DatePicker} from '../../common_components/date_picker';
import {DateFormat} from '../../common_components/helper/formatter';
import Footer from '../../common_components/footer';

class investment_transaction_report extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			policy_id : this.props.params.policy_id,
			param : {
				report_start_date : null,
				report_end_date : null,
				policy_id : this.props.params.policy_id
			},
			content : null
		}
        this.openMenu = this.openMenu.bind(this);

	}

	getData = (action) => {
		if(action != null){
			action.preventDefault();
		}

		let report_start_date = $('[name=report_start_date]').val();
		let report_end_date = $('[name=report_end_date]').val();

		if(report_start_date == null && report_end_date == null){
			alert('Transaction statement Date are mandatory');
			return false;
		}

		report_start_date = this.state.param.report_start_date = report_start_date.split('-').reverse().join('-');
		report_end_date = this.state.param.report_end_date = report_end_date.split('-').reverse().join('-');


		$.ajax({
            url: api_route.policy_investment_transaction_report,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: this.state.param,
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');

			  this.setState({
				  content : response.content
			  });

            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	alert(err.statusText);
            	// window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });


	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }
	render(){

		var policy = {
			agent_code : localStorage.getItem('agent_code'),
			agent_name : localStorage.getItem('agent_name'),
			insured : localStorage.getItem('insured'),
			policy_holder : localStorage.getItem('policy_holder'),
			policy_no : localStorage.getItem('policy_no')	
		};

		var inv_tran = [];
		var inv_tran_comp = [];

		if(this.state.content != null){
			inv_tran = this.state.content.policy_investment_transaction_report;
		}

		inv_tran.map((detail) => {
			inv_tran_comp.push(
				<tr>
					<td>{DateFormat(detail.generate_date)}</td>
					<td><a href={api_route.baseAPI + detail.report_path} className="btn btn-default">Download</a></td>
				</tr>
			);
		});

		return (
		<div className="wrap2">

            <TopMenuNewBusinessDetail opsi="policyt" title="Investment Transaction Report" />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/policy/list_policies">Policy Tracking</a></li>
							<li className="active">Investment Transaction Report</li>
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
				
				<div className="main twoColumnMain boxShadow">

					<LeftMenuPolicy active="7" policy_id={this.state.policy_id} />

					<div className="main-content">
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
														{policy.policy_no}
													</div>
												</div>
												
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Policy Holder</label>
													</div>
													
													<div className="col-sm-6">
														{policy.policy_holder}
													</div>
												</div>
												
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Name</label>
													</div>
													
													<div className="col-sm-6">
														{policy.agent_name}
													</div>
												</div>
												
											</form>
										</div>
										
										<div className="col-sm-6">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6">
														<label></label>
													</div>
													
													<div className="col-sm-6">
													</div>
												</div>
												
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Insured</label>
													</div>
													
													<div className="col-sm-6">
														{policy.insured}
													</div>
												</div>
												
												<div className="form-group">
													<div className="col-sm-6 bg-info">
														<label>Agent Code</label>
													</div>
													
													<div className="col-sm-6">
														{policy.agent_code}
													</div>
												</div>
												
											</form>
										</div>
									</div>
								</div>
								<div className="boxBody">
									<div className="row">
										<div className="col-sm-8">
											<form className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6">
														<label>Transaction Statement Date</label>
													</div>
													
													<div className="col-sm-3">
														<div className="form-group">
															<div className="input-group">
																<DatePicker className="form-control" name="report_start_date" id="report_start_date" />
															</div>
														</div>
													</div>

													<div className="col-sm-3">
														<div className="form-group">
															<div className="input-group">
																<DatePicker className="form-control" name="report_end_date" id="report_end_date" />
															</div>
														</div>
													</div>
												</div>
												
												
											</form>
										</div>
										<div className="col-sm-2">
											<input type="button" className="btn btn-default" value="Search" onClick={this.getData} />
										</div>
									</div>
									<div className="row">
										<div className="col-sm-12">
											<div className="table-responsive">
												<table className="table table-bordered table-striped table-hover table-box">
													<thead>
														<tr>
															<th className="header_table ">Generate Date</th>
															<th className="header_table ">Download</th>
														</tr>
													</thead>
													<tbody>	
														{inv_tran_comp}												
													</tbody>
												</table>
											</div>
										</div>
									</div>
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

export default investment_transaction_report;
