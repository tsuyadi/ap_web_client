'use strict'

import api_route from '../../common_components/api_route';
import ManagementApplicationModal from '../../common_components/modal/management_application_modal';
import {MoneyFormat} from '../../common_components/helper/formatter';

class GroupNewBusinessTrackingSummaryManagement extends React.Component {

	constructor(props){
		super(props);
		this.state = {
			data : null,
			dataApe : null,
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
		this.getDataAPE = this.getDataAPE.bind(this);
	}

	getDataAPE(){
		// // debugger;
		$('.load-ape').show();
		$.ajax({
			url: api_route.agentApeDashboard,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data: [],
			processData: false,
			contentType: false,
			type: 'POST',
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				this.setState({
					dataApe:response,
					data: response
				});
			},
			error: (err, response) => {
				$('.load-ape').hide();
				if(err.responseJSON){
					window.location.href = window.location.href.split('#')[0] + '#/';
				}					
			}
		});
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
		this.getDataAPE();
		this.setState({
	        data: p.data
	    });
	}

	render(){
		// di New Bussiness Tracking

		let now = {
			group_decline : this.state.dataApe && this.state.dataApe.production.ape.now.group.declined != null ? MoneyFormat(this.state.dataApe.production.ape.now.group.declined) : 0, 
			group_issued : this.state.dataApe && this.state.dataApe.production.ape.now.group.issued != null ? MoneyFormat(this.state.dataApe.production.ape.now.group.issued) : 0, 
			group_pending : this.state.dataApe && this.state.dataApe.production.ape.now.group.pending != null ? MoneyFormat(this.state.dataApe.production.ape.now.group.pending) : 0, 
			group_postponed : this.state.dataApe && this.state.dataApe.production.ape.now.group.postponed != null ? MoneyFormat(this.state.dataApe.production.ape.now.group.postponed) : 0, 
			group_submit : this.state.dataApe && this.state.dataApe.production.ape.now.group.submit != null ? MoneyFormat(this.state.dataApe.production.ape.now.group.submit) : 0, 
			group_underwriting : this.state.dataApe && this.state.dataApe.production.ape.now.group.underwriting != null ? MoneyFormat(this.state.dataApe.production.ape.now.group.underwriting) : 0, 
			group_withdrawn : this.state.dataApe && this.state.dataApe.production.ape.now.group.withdrawn != null ? MoneyFormat(this.state.dataApe.production.ape.now.group.withdrawn) : 0
		};

		let mtd = {
			group_decline : this.state.dataApe && this.state.dataApe.production.ape.mtd.group.declined != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.group.declined) : 0, 
			group_issued : this.state.dataApe && this.state.dataApe.production.ape.mtd.group.issued != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.group.issued) : 0, 
			group_pending : this.state.dataApe && this.state.dataApe.production.ape.mtd.group.pending != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.group.pending) : 0, 
			group_postponed : this.state.dataApe && this.state.dataApe.production.ape.mtd.group.postponed != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.group.postponed) : 0, 
			group_submit : this.state.dataApe && this.state.dataApe.production.ape.mtd.group.submit != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.group.submit) : 0, 
			group_underwriting : this.state.dataApe && this.state.dataApe.production.ape.mtd.group.underwriting != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.group.underwriting) : 0, 
			group_withdrawn : this.state.dataApe && this.state.dataApe.production.ape.mtd.group.withdrawn != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.group.withdrawn) : 0
		};

		let ytd = {
			group_decline : this.state.dataApe && this.state.dataApe.production.ape.ytd.group.declined != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.group.declined) : 0, 
			group_issued : this.state.dataApe && this.state.dataApe.production.ape.ytd.group.issued != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.group.issued) : 0, 
			group_pending : this.state.dataApe && this.state.dataApe.production.ape.ytd.group.pending != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.group.pending) : 0, 
			group_postponed : this.state.dataApe && this.state.dataApe.production.ape.ytd.group.postponed != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.group.postponed) : 0, 
			group_submit : this.state.dataApe && this.state.dataApe.production.ape.ytd.group.submit != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.group.submit) : 0, 
			group_underwriting : this.state.dataApe && this.state.dataApe.production.ape.ytd.group.underwriting != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.group.underwriting) : 0, 
			group_withdrawn : this.state.dataApe && this.state.dataApe.production.ape.ytd.group.withdrawn != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.group.withdrawn) : 0
		};

		let current_year = {
			personal_decline : 0, 
			personal_issued :  0, 
			personal_pending : 0, 
			personal_postponed : 0, 
			personal_submit : 0, 
			personal_underwriting : 0, 
			personal_withdrawn : 0
		};

		return (
        <div className="content">
			<div className="title"><i className="fa fa-newspaper-o"></i> New Business Tracking Summary</div>
			
			<div className="row">
				<div className="col-md-4">
					<h3>Based on Case <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape" ></i></h3>
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
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'submitted', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj && this.state.data.spaj.mtd.group.submit}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'submitted', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj && this.state.data.spaj.ytd.group.submit}</span></a></td>
								</tr>
								<tr key="headernbt_pending">
									<td>&nbsp;&nbsp;Pending</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'pending', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.pending}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'pending', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.pending}</span></a></td>
								</tr>
								<tr key="headernbt_underwriting">
									<td>&nbsp;&nbsp;Underwriting Approved</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'underwriting', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.underwriting}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'underwriting', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.underwriting}</span></a></td>
								</tr>
								<tr key="headernbt_declined">
									<td>&nbsp;&nbsp;Declined</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'declined', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.declined}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'declined', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.declined}</span></a></td>
								</tr>
								<tr key="headernbt_withdrawn">
									<td>&nbsp;&nbsp;Withdrawn</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'withdrawn', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.withdrawn}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'withdrawn', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.withdrawn}</span></a></td>
								</tr>
								<tr key="headernbt_postponed">
									<td>&nbsp;&nbsp;Postponed</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'postponed', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.postponed}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'postponed', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.postponed}</span></a></td>
								</tr>
								<tr key="headernbt_inforce">
									<td>&nbsp;&nbsp;In Force (IF)</td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'issued', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.issued}</span></a></td>
									<td className="bullet"><a href="#" data-toggle="modal" data-target="#management_application_modal" onClick={this._data.bind(this, 'issued', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.issued}</span></a></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
				<div className="col-md-8">
					<h3>Based on APE <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape" ></i></h3>
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
												<td style={{'text-align' : 'center !important'}}><span>{now.group_submit}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Pending</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.group_pending}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Underwriting Approved</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.group_underwriting}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Declined</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.group_decline}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Withdrawn</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.group_withdrawn}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Postponed</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.group_postponed}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;In Force (IF)</td>
												<td style={{'text-align' : 'right !important'}}><span>{now.group_issued}</span></td>
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
												<td style={{'text-align' : 'center !important'}}><span>{mtd.group_submit}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Pending</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.group_pending}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Underwriting</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.group_underwriting}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Declined</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.group_decline}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Withdrawn</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.group_withdrawn}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Postponed</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.group_postponed}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;In Force (IF)</td>
												<td style={{'text-align' : 'right !important'}}><span>{mtd.group_issued}</span></td>
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
												<td style={{'text-align' : 'center !important'}}><span>{ytd.group_submit}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Pending</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.group_pending}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Underwriting</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.group_underwriting}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Declined</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.group_decline}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Withdrawn</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.group_withdrawn}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;Postponed</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.group_postponed}</span></td>
											</tr>
											<tr>
												<td>&nbsp;&nbsp;In Force (IF)</td>
												<td style={{'text-align' : 'right !important'}}><span>{ytd.group_issued}</span></td>
											</tr>
										</tbody>
									</table>						
								</div>
							</div>
						</div>

						<table className="table table-striped forbullet table-box table-bordered hidden-xs hidden-sm">
							<thead>								
								<tr>
									<th className="header_table"></th>
									<th className="header_table">Current Month</th>
									<th className="header_table">MTD</th>
									<th className="header_table">YTD</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Submit</td>
									<td style={{'text-align':'center'}}><span>{now.group_submit}</span></td>	
									<td style={{'text-align':'center'}}><span>{mtd.group_submit}</span></td>	
									<td style={{'text-align':'center'}}><span>{ytd.group_submit}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Pending</td>
									<td style={{'text-align':'right'}}><span>{now.group_pending}</span></td>
									<td style={{'text-align':'right'}}><span>{mtd.group_pending}</span></td>
									<td style={{'text-align':'right'}}><span>{ytd.group_pending}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Underwriting Approved</td>
									<td style={{'text-align':'right'}}><span>{now.group_underwriting}</span></td>
									<td style={{'text-align':'right'}}><span>{mtd.group_underwriting}</span></td>
									<td style={{'text-align':'right'}}><span>{ytd.group_underwriting}</span></td>
									
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Declined</td>
									<td style={{'text-align':'right'}}><span>{now.group_decline}</span></td>
									<td style={{'text-align':'right'}}><span>{mtd.group_decline}</span></td>
									<td style={{'text-align':'right'}}><span>{ytd.group_decline}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Withdrawn</td>
									<td style={{'text-align':'right'}}><span>{now.group_withdrawn}</span></td>
									<td style={{'text-align':'right'}}><span>{mtd.group_withdrawn}</span></td>
									<td style={{'text-align':'right'}}><span>{ytd.group_withdrawn}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Postponed</td>
									<td style={{'text-align':'right'}}><span>{now.group_postponed}</span></td>
									<td style={{'text-align':'right'}}><span>{mtd.group_postponed}</span></td>
									<td style={{'text-align':'right'}}><span>{ytd.group_postponed}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;In Force (IF)</td>
									<td style={{'text-align':'right'}}><span>{now.group_issued}</span></td>
									<td style={{'text-align':'right'}}><span>{mtd.group_issued}</span></td>
									<td style={{'text-align':'right'}}><span>{ytd.group_issued}</span></td>
								</tr>
							</tbody>
						</table>

						{/*}
						<table className="table table-striped table-bordered table-box hidden-xs hidden-sm">
							<thead>
								<tr>
									<th className="header_table" style={{width:250 + 'px !important'}}></th>
									<th className="header_table" style={{width:25 + '%'}}>Current Month</th>
									<th className="header_table" style={{width:25 + '%'}}>Current Year</th>
									<th className="header_table" style={{width:25 + '%'}}>MTD</th>
									<th className="header_table" style={{width:25 + '%'}}>YTD</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td>Submit</td>
									<td style={{'text-align' : 'center !important'}}><span>{now.personal_submit}</span></td>
									<td style={{'text-align' : 'center !important'}}><span>{current_year.personal_submit}</span></td>
									<td style={{'text-align' : 'center !important'}}><span>{mtd.personal_submit}</span></td>
									<td style={{'text-align' : 'center !important'}}><span>{ytd.personal_submit}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Pending</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_pending}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{current_year.personal_pending}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_pending}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_pending}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Underwriting Approved</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_underwriting}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{current_year.personal_underwriting}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_underwriting}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_underwriting}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Declined</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_decline}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{current_year.personal_decline}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_decline}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_decline}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Withdrawn</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_withdrawn}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{current_year.personal_withdrawn}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_withdrawn}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_withdrawn}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;Postponed</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_postponed}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{current_year.personal_postponed}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_postponed}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_postponed}</span></td>
								</tr>
								<tr>
									<td>&nbsp;&nbsp;In Force (IF)</td>
									<td style={{'text-align' : 'right !important'}}><span>{now.personal_issued}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{current_year.personal_issued}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{mtd.personal_issued}</span></td>
									<td style={{'text-align' : 'right !important'}}><span>{ytd.personal_issued}</span></td>
								</tr>
							</tbody>
						</table>
						*/}
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
