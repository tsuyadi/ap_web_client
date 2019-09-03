'use strict'

import api_route from '../../common_components/api_route';
import ManagementApplicationModal from '../../common_components/modal/management_application_modal';
import {MoneyFormat} from '../../common_components/helper/formatter';

class GroupNewBusinessTrackingSummaryManagement extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data : null,
			modalVal : [{
						"no":'-',
						"spaj_number":'-',
						"spaj_policy_no":'-',
						"spaj_holder":'-',
						"spaj_status":'-',
						"spaj_notes":'-'
					}],
			statusSPAJ : null
		}
	}

	_data(status, period, group) {
		this.setState({
			statusSPAJ: status
		});
		
		$.ajax({
            url: api_route.new_business,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {
		    	'status':status,
		    	'period':period,
		    	'group':group
		    },
            type: 'POST',
            success: (response) => {
              if(response.length > 0) {
              	this.setState({
	              	modalVal:response
	              });
              } else {
              	this.setState({
              		modalVal:[{
								 'no':'-',
								 'spaj_number':'-',
								 'spaj_submit_date':'-',
								 'spaj_policy_no':'-',
								 'spaj_holder':'-',
								 'spaj_status':'-',
								 'spaj_status_date':'-',
								 'spaj_agent_name':'-',
								 'spaj_agent_code':'-',
								 'spaj_notes':'-'
							   }]
                });
              }
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
		
    }

	componentWillReceiveProps(p){
		this.setState({
	        data: p.data
	    });
	}

	render(){
		// di New Bussiness Tracking
		// // debugger;

		let now = {
			personal_decline : this.state.data && this.state.data.specific_data.ape.now.declined != null ? MoneyFormat(this.state.data.specific_data.ape.now.declined) : 0, 
			personal_issued : this.state.data && this.state.data.specific_data.ape.now.issued != null ? MoneyFormat(this.state.data.specific_data.ape.now.issued) : 0, 
			personal_pending : this.state.data && this.state.data.specific_data.ape.now.pending != null ? MoneyFormat(this.state.data.specific_data.ape.now.pending) : 0, 
			personal_postponed : this.state.data && this.state.data.specific_data.ape.now.postponed != null ? MoneyFormat(this.state.data.specific_data.ape.now.postponed) : 0, 
			personal_submit : this.state.data && this.state.data.specific_data.ape.now.submit != null ? MoneyFormat(this.state.data.specific_data.ape.now.submit) : 0, 
			personal_underwriting : this.state.data && this.state.data.specific_data.ape.now.underwriting != null ? MoneyFormat(this.state.data.specific_data.ape.now.underwriting) : 0, 
			personal_withdrawn : this.state.data && this.state.data.specific_data.ape.now.withdrawn != null ? MoneyFormat(this.state.data.specific_data.ape.now.withdrawn) : 0
		};

		let mtd = {
			personal_decline : this.state.data && this.state.data.specific_data.ape.mtd.declined != null ? MoneyFormat(this.state.data.specific_data.ape.mtd.declined) : 0, 
			personal_issued : this.state.data && this.state.data.specific_data.ape.mtd.issued != null ? MoneyFormat(this.state.data.specific_data.ape.mtd.issued) : 0, 
			personal_pending : this.state.data && this.state.data.specific_data.ape.mtd.pending != null ? MoneyFormat(this.state.data.specific_data.ape.mtd.pending) : 0, 
			personal_postponed : this.state.data && this.state.data.specific_data.ape.mtd.postponed != null ? MoneyFormat(this.state.data.specific_data.ape.mtd.postponed) : 0, 
			personal_submit : this.state.data && this.state.data.specific_data.ape.mtd.submit != null ? MoneyFormat(this.state.data.specific_data.ape.mtd.submit) : 0, 
			personal_underwriting : this.state.data && this.state.data.specific_data.ape.mtd.underwriting != null ? MoneyFormat(this.state.data.specific_data.ape.mtd.underwriting) : 0, 
			personal_withdrawn : this.state.data && this.state.data.specific_data.ape.mtd.withdrawn != null ? MoneyFormat(this.state.data.specific_data.ape.mtd.withdrawn) : 0
		};

		let ytd = {
			personal_decline : this.state.data && this.state.data.specific_data.ape.ytd.declined != null ? MoneyFormat(this.state.data.specific_data.ape.ytd.declined) : 0, 
			personal_issued : this.state.data && this.state.data.specific_data.ape.ytd.issued != null ? MoneyFormat(this.state.data.specific_data.ape.ytd.issued) : 0, 
			personal_pending : this.state.data && this.state.data.specific_data.ape.ytd.pending != null ? MoneyFormat(this.state.data.specific_data.ape.ytd.pending) : 0, 
			personal_postponed : this.state.data && this.state.data.specific_data.ape.ytd.postponed != null ? MoneyFormat(this.state.data.specific_data.ape.ytd.postponed) : 0, 
			personal_submit : this.state.data && this.state.data.specific_data.ape.ytd.submit != null ? MoneyFormat(this.state.data.specific_data.ape.ytd.submit) : 0, 
			personal_underwriting : this.state.data && this.state.data.specific_data.ape.ytd.underwriting != null ? MoneyFormat(this.state.data.specific_data.ape.ytd.underwriting) : 0, 
			personal_withdrawn : this.state.data && this.state.data.specific_data.ape.ytd.withdrawn != null ? MoneyFormat(this.state.data.specific_data.ape.ytd.withdrawn) : 0
		};

		return (
        <div className="content">
			<div className="title"><i className="fa fa-newspaper-o"></i> New Business Tracking Summary</div>
			
			<div className="row">
				<div className="col-md-4">
					<h3>Based on Case</h3>
					<div className="entry">
						<table className="table table-striped forbullet table-box table-bordered">
							<thead>
								<tr key="headernbt">
									<th className="header_table" style={{'width':'200px !important'}}></th>
									<th className="header_table">MTD</th>
									<th className="header_table">YTD</th>
								</tr>
							</thead>
							<tbody>
								<tr key="headernbt_submit">
									<td>Submit</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'submitted', 'mtd', 1)}><span>{this.state.data && this.state.data.specific_data.spaj.month_to_date.group.submit}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'submitted', 'ytd', 1)}><span>{this.state.data && this.state.data.specific_data.spaj.year_to_date.group.submit}</span></a></td>
								</tr>
								<tr key="headernbt_pending">
									<td>&nbsp;&nbsp;Pending</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'pending', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.pending}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'pending', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.pending}</span></a></td>
								</tr>
								<tr key="headernbt_underwriting">
									<td>&nbsp;&nbsp;Underwriting Approved</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'underwriting', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.underwriting}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'underwriting', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.underwriting}</span></a></td>
								</tr>
								<tr key="headernbt_declined">
									<td>&nbsp;&nbsp;Declined</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'declined', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.declined}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'declined', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.declined}</span></a></td>
								</tr>
								<tr key="headernbt_withdrawn">
									<td>&nbsp;&nbsp;Withdrawn</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'withdrawn', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.withdrawn}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'withdrawn', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.withdrawn}</span></a></td>
								</tr>
								<tr key="headernbt_postponed">
									<td>&nbsp;&nbsp;Postponed</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'postponed', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.postponed}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'postponed', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.postponed}</span></a></td>
								</tr>
								<tr key="headernbt_inforce">
									<td>&nbsp;&nbsp;In Force (IF)</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'issued', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.issued}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'issued', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.issued}</span></a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="col-md-8">
					<h3>Based on APE</h3>
					<div className="entry">

						<div className="tab-mobile hidden-md hidden-lg">
							<ul className="nav nav-tabs" role="tablist">
								<li role="presentation" className="active"><a href="#ape_current" aria-controls="cur" role="tab" data-toggle="tab">Current</a></li>
								<li role="presentation"><a href="#ape_mtd" aria-controls="mtd" role="tab" data-toggle="tab">MTD</a></li>
								<li role="presentation"><a href="#ape_ytd" aria-controls="ytd" role="tab" data-toggle="tab">YTD</a></li>
							</ul>
							<div className="tab-content">
								<div role="tabpanel" className="tab-pane active" id="ape_current">	
									<table className="table table-striped table-bordered table-box">
										<thead>
											<tr>
												<th className="header_table" style={{width:150 + 'px'}}></th>
												<th className="header_table" >Current Month APE</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Submit</td>
												<td style={{'text-align' : 'center !important'}}><span>{now.personal_submit}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Pending</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.personal_pending}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Underwriting Approved</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.personal_underwriting}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Declined</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.personal_decline}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Withdrawn</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.personal_withdrawn}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Postponed</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.personal_postponed}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;In Force (IF)</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.personal_issued}</span></td>
											</tr>
										</tbody>
									</table>						
								</div>
								<div role="tabpanel" className="tab-pane" id="ape_mtd">	
									<table className="table table-striped table-bordered table-box">
										<thead>
											<tr>
												<th className="header_table" style={{width:150 + 'px'}}></th>
												<th className="header_table">MTD APE</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Submit</td>
												<td style={{'text-align' : 'center !important'}}><span>{mtd.personal_submit}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Pending</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_pending}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Underwriting</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_underwriting}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Declined</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_decline}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Withdrawn</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_withdrawn}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Postponed</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_postponed}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;In Force (IF)</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_issued}</span></td>
											</tr>
										</tbody>
									</table>								
								</div>
								<div role="tabpanel" className="tab-pane" id="ape_ytd">		
									<table className="table table-striped table-bordered table-box">
										<thead>
											<tr>
												<th className="header_table" style={{width:150 + 'px'}}></th>
												<th className="header_table">YTD APE</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Submit</td>
												<td style={{'text-align' : 'center !important'}}><span>{ytd.personal_submit}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Pending</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_pending}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Underwriting</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_underwriting}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Declined</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_decline}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Withdrawn</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_withdrawn}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Postponed</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_postponed}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;In Force (IF)</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_issued}</span></td>
											</tr>
										</tbody>
									</table>						
								</div>
							</div>
						</div>

						<table className="table table-striped table-bordered table-box hidden-xs hidden-sm">
							<thead>
								<tr>
									<th className="header_table" style={{width:250 + 'px !important'}}></th>
									<th className="header_table" style={{width:30 + '%'}}>Current Month</th>
									<th className="header_table" style={{width:30 + '%'}}>MTD</th>
									<th className="header_table" style={{width:30 + '%'}}>YTD</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Submit</td>
									<td style={{'text-align' : 'center !important'}}><span>{now.personal_submit}</span></td>
									<td style={{'text-align' : 'center !important'}}><span>{mtd.personal_submit}</span></td>
									<td style={{'text-align' : 'center !important'}}><span>{ytd.personal_submit}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Pending</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_pending}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_pending}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_pending}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Underwriting Approved</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_underwriting}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_underwriting}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_underwriting}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Declined</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_decline}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_decline}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_decline}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Withdrawn</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_withdrawn}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_withdrawn}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_withdrawn}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Postponed</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_postponed}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_postponed}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_postponed}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;In Force (IF)</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_issued}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_issued}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_issued}</span></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				
			</div>
			

			{/*
			<div className="entry">
				<table className="table table-striped forbullet">
					<thead>
						<tr key="headernbt">
							<th></th>
							<th className="bullet">MTD</th>
							<th className="bullet">YTD</th>
						</tr>
					</thead>
					<tbody>
						<tr key="headernbt_submit">
							<td>Submit</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'submit', 'mtd', 1)}><span>{this.state.data && this.state.data.specific_data.spaj.month_to_date.group.submit}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'submit', 'ytd', 1)}><span>{this.state.data && this.state.data.specific_data.spaj.year_to_date.group.submit}</span></a></td>
						</tr>
						<tr key="headernbt_pending">
							<td>&nbsp;&nbsp;Pending</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'pending', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.pending}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'pending', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.pending}</span></a></td>
						</tr>
						<tr key="headernbt_underwriting">
							<td>&nbsp;&nbsp;Underwriting Approved</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'underwriting', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.underwriting}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'underwriting', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.underwriting}</span></a></td>
						</tr>
						<tr key="headernbt_declined">
							<td>&nbsp;&nbsp;Declined</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'declined', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.declined}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'declined', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.declined}</span></a></td>
						</tr>
						<tr key="headernbt_withdrawn">
							<td>&nbsp;&nbsp;Withdrawn</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'withdrawn', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.withdrawn}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'withdrawn', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.withdrawn}</span></a></td>
						</tr>
						<tr key="headernbt_postponed">
							<td>&nbsp;&nbsp;Postponed</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'postponed', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.postponed}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'postponed', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.postponed}</span></a></td>
						</tr>
						<tr key="headernbt_inforce">
							<td>&nbsp;&nbsp;In Force (IF)</td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'issued', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.month_to_date.group.issued}</span></a></td>
							<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'issued', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.specific_data.spaj.year_to_date.group.issued}</span></a></td>
						</tr>
					</tbody>
				</table>
			</div>
			*/}
			
				<ManagementApplicationModal data={this.state.modalVal && this.state.modalVal} statusSPAJ={this.state.statusSPAJ} />
		</div>
		);
	}
}

export default GroupNewBusinessTrackingSummaryManagement;
