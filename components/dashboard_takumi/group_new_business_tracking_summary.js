'use strict'

import api_route from '../../common_components/api_route';
import NewBusinessModal from '../../common_components/modal/new_business';
import {MoneyFormat} from '../../common_components/helper/formatter';
import CekAuth from '../../common_components/helper/cek_auth';
class GroupNewBusinessTrackingSummary extends React.Component {
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
			statusSPAJ : null,
			dataApe : null,
			agent: null
		}
		this.getDataAPE = this.getDataAPE.bind(this);
	}
	getDataAPE(){
		// // debugger;

		var param = [];

		// debugger;

		if(this.props.disabled == "true"){
			param = {
				agent : this.props.param_agent
			};
		}else{
			param = [];
		}

		$('.load-ape-personal').show();
		$.ajax({
			url: api_route.agentApeDashboard,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data: param,
			// processData: false,
			// contentType: false,
			type: 'POST',
			success: (response) => {
				$('.load-ape-personal').hide();
				// // debugger;
				try{
					this.props.loaded(true);
				}catch(e){}
				this.setState({
					dataApe:response,
					data: response,
					agent:this.props.param_agent && this.props.param_agent
				});
			},
			error: (err, response) => {
				$('.load-ape').hide();
				if(err.responseJSON){
					// window.location.href = window.location.href.split('#')[0] + '#/';
				}					
			}
		});
	}

	componentWillMount(){
		CekAuth();
	}
	componentWillReceiveProps = (p) => {
		this.getDataAPE();
	}

	_data(status, period, group, obj) {

		if(obj){
			obj.preventDefault();
		}

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

	render(){
		if(this.state.agent != this.props.param_agent){
			this.getDataAPE();
		}

		let current_year = {
			personal_decline : this.state.dataApe && this.state.dataApe.production.ape.current_year.personal.declined != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.personal.declined) : 0, 
			personal_issued : this.state.dataApe && this.state.dataApe.production.ape.current_year.personal.issued != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.personal.issued) : 0, 
			personal_pending : this.state.dataApe && this.state.dataApe.production.ape.current_year.personal.pending != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.personal.pending) : 0, 
			personal_postponed : this.state.dataApe && this.state.dataApe.production.ape.current_year.personal.postponed != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.personal.postponed) : 0, 
			personal_submit : this.state.dataApe && this.state.dataApe.production.ape.current_year.personal.submit != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.personal.submit) : 0, 
			personal_underwriting : this.state.dataApe && this.state.dataApe.production.ape.current_year.personal.underwriting != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.personal.underwriting) : 0, 
			personal_withdrawn : this.state.dataApe && this.state.dataApe.production.ape.current_year.personal.withdrawn != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.personal.withdrawn) : 0
		};

		let now = {
			personal_decline : this.state.dataApe && this.state.dataApe.production.ape.now.personal.declined != null ? MoneyFormat(this.state.dataApe.production.ape.now.personal.declined) : 0, 
			personal_issued : this.state.dataApe && this.state.dataApe.production.ape.now.personal.issued != null ? MoneyFormat(this.state.dataApe.production.ape.now.personal.issued) : 0, 
			personal_pending : this.state.dataApe && this.state.dataApe.production.ape.now.personal.pending != null ? MoneyFormat(this.state.dataApe.production.ape.now.personal.pending) : 0, 
			personal_postponed : this.state.dataApe && this.state.dataApe.production.ape.now.personal.postponed != null ? MoneyFormat(this.state.dataApe.production.ape.now.personal.postponed) : 0, 
			personal_submit : this.state.dataApe && this.state.dataApe.production.ape.now.personal.submit != null ? MoneyFormat(this.state.dataApe.production.ape.now.personal.submit) : 0, 
			personal_underwriting : this.state.dataApe && this.state.dataApe.production.ape.now.personal.underwriting != null ? MoneyFormat(this.state.dataApe.production.ape.now.personal.underwriting) : 0, 
			personal_withdrawn : this.state.dataApe && this.state.dataApe.production.ape.now.personal.declined != null ? MoneyFormat(this.state.dataApe.production.ape.now.personal.declined) : 0,
		};

		let mtd = {
			personal_decline : this.state.dataApe && this.state.dataApe.production.ape.mtd.personal.declined != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.personal.declined) : 0, 
			personal_issued : this.state.dataApe && this.state.dataApe.production.ape.mtd.personal.issued != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.personal.issued) : 0, 
			personal_pending : this.state.dataApe && this.state.dataApe.production.ape.mtd.personal.pending != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.personal.pending) : 0, 
			personal_postponed : this.state.dataApe && this.state.dataApe.production.ape.mtd.personal.postponed != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.personal.postponed) : 0, 
			personal_submit : this.state.dataApe && this.state.dataApe.production.ape.mtd.personal.submit != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.personal.submit) : 0, 
			personal_underwriting : this.state.dataApe && this.state.dataApe.production.ape.mtd.personal.underwriting != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.personal.underwriting) : 0, 
			personal_withdrawn : this.state.dataApe && this.state.dataApe.production.ape.mtd.personal.withdrawn != null ? MoneyFormat(this.state.dataApe.production.ape.mtd.personal.withdrawn) : 0
		};

		let ytd = {
			personal_decline : this.state.dataApe && this.state.dataApe.production.ape.ytd.personal.declined != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.personal.declined) : 0, 
			personal_issued : this.state.dataApe && this.state.dataApe.production.ape.ytd.personal.issued != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.personal.issued) : 0, 
			personal_pending : this.state.dataApe && this.state.dataApe.production.ape.ytd.personal.pending != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.personal.pending) : 0, 
			personal_postponed : this.state.dataApe && this.state.dataApe.production.ape.ytd.personal.postponed != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.personal.postponed) : 0, 
			personal_submit : this.state.dataApe && this.state.dataApe.production.ape.ytd.personal.submit != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.personal.submit) : 0, 
			personal_underwriting : this.state.dataApe && this.state.dataApe.production.ape.ytd.personal.underwriting != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.personal.underwriting) : 0, 
			personal_withdrawn : this.state.dataApe && this.state.dataApe.production.ape.ytd.personal.withdrawn != null ? MoneyFormat(this.state.dataApe.production.ape.ytd.personal.withdrawn) : 0
		};

		$('.header_table').tooltip();

		var toggleProp = "";

		if(this.props.disabled == "true"){
			toggleProp="";
		}else{
			toggleProp="modal";
		}

		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-newspaper-o"></i> SPAJ Status Tracking</div>
				<div className="box-summary">
					<div className="row">
						<div className="col-md-12 hidden-xs hidden-sm">
							<div style={{'overflowX':'auto'}}>
								<table className="table table-striped forbullet table-box table-bordered">
									<thead>
										<tr>
											<th className="header_table" rowSpan={2}></th>
											<th className="header_table" colSpan={4}>Based on Case <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape-personal" ></i></th>
											<th className="header_table" colSpan={4}>Based on APE <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape-personal" ></i></th>
										</tr>
										<tr>
											<th className="header_table" style={{"width":"10px !important"}}>Current Month</th>
											<th className="header_table" style={{"width":"10px !important"}}>Current Year</th>
											<th className="header_table" style={{"width":"10px !important"}}>MTD</th>
											<th className="header_table" style={{"width":"10px !important"}}>YTD</th>
											<th className="header_table" style={{"width":"150px !important"}}>Current Month</th>
											<th className="header_table" style={{"width":"150px !important"}}>Current Year</th>
											<th className="header_table" style={{"width":"150px !important"}}>MTD</th>
											<th className="header_table" style={{"width":"150px !important"}}>YTD</th>
										</tr>
									</thead>
									<tbody>									
										<tr>
											<td>&nbsp;&nbsp;Pending</td>
											<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.pending}</span></a></td>
											<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.pending}</span></a></td>
											<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.pending}</span></a></td>
											<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.pending}</span></a></td>
											<td style={{'textAlign':'right'}}><span>{now.personal_pending}</span></td>
											<td style={{'textAlign':'right'}}><span>{current_year.personal_pending}</span></td>
											<td style={{'textAlign':'right'}}><span>{mtd.personal_pending}</span></td>
											<td style={{'textAlign':'right'}}><span>{ytd.personal_pending}</span></td>								
										</tr>
										<tr>
											<td>&nbsp;&nbsp;Underwriting Approved</td>
											<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'underwriting', 'cmtd', 1)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.underwriting}</span></a></td>
											<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'underwriting', 'cytd', 1)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.underwriting}</span></a></td>
											<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'underwriting', 'mtd', 1)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.underwriting}</span></a></td>
											<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'underwriting', 'ytd', 1)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.underwriting}</span></a></td>
											<td style={{'textAlign':'right'}}><span>{now.personal_underwriting}</span></td>
											<td style={{'textAlign':'right'}}><span>{current_year.personal_underwriting}</span></td>
											<td style={{'textAlign':'right'}}><span>{mtd.personal_underwriting}</span></td>
											<td style={{'textAlign':'right'}}><span>{ytd.personal_underwriting}</span></td>
										</tr>
										<tr>
											<td>&nbsp;&nbsp;Declined</td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'declined', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.declined}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'declined', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.declined}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'declined', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.declined}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'declined', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.declined}</span></a></td>
											<td style={{'textAlign':'right'}}><span>{now.personal_decline}</span></td>
											<td style={{'textAlign':'right'}}><span>{current_year.personal_decline}</span></td>
											<td style={{'textAlign':'right'}}><span>{mtd.personal_decline}</span></td>
											<td style={{'textAlign':'right'}}><span>{ytd.personal_decline}</span></td>
										</tr>
										<tr>
											<td>&nbsp;&nbsp;Withdrawn</td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'withdrawn', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.withdrawn}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'withdrawn', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.withdrawn}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'withdrawn', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.withdrawn}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'withdrawn', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.withdrawn}</span></a></td>
											<td style={{'textAlign':'right'}}><span>{now.personal_withdrawn}</span></td>
											<td style={{'textAlign':'right'}}><span>{current_year.personal_withdrawn}</span></td>
											<td style={{'textAlign':'right'}}><span>{mtd.personal_withdrawn}</span></td>
											<td style={{'textAlign':'right'}}><span>{ytd.personal_withdrawn}</span></td>
										</tr>
										<tr>
											<td>&nbsp;&nbsp;Postponed</td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'postponed', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.postponed}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'postponed', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.postponed}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'postponed', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.postponed}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'postponed', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.postponed}</span></a></td>
											<td style={{'textAlign':'right'}}><span>{now.personal_postponed}</span></td>
											<td style={{'textAlign':'right'}}><span>{current_year.personal_postponed}</span></td>
											<td style={{'textAlign':'right'}}><span>{mtd.personal_postponed}</span></td>
											<td style={{'textAlign':'right'}}><span>{ytd.personal_postponed}</span></td>
										</tr>
										<tr>
											<td>&nbsp;&nbsp;In Force (IF)</td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'issued', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.issued}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'issued', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.issued}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'issued', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.issued}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'issued', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.issued}</span></a></td>
											<td style={{'textAlign':'right'}}><span>{now.personal_issued}</span></td>
											<td style={{'textAlign':'right'}}><span>{current_year.personal_issued}</span></td>
											<td style={{'textAlign':'right'}}><span>{mtd.personal_issued}</span></td>
											<td style={{'textAlign':'right'}}><span>{ytd.personal_issued}</span></td>
										</tr>
										<tr>
											<td>Total</td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'submitted', 'cmtd', 0)}><span>{this.state.dataApe && this.state.dataApe.spaj.now.personal.submit}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'submitted', 'cytd', 0)}><span>{this.state.dataApe && this.state.dataApe.spaj.current_year.personal.submit}</span></a></td>
											<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'submitted', 'mtd', 0)}><span>{this.state.dataApe && this.state.dataApe.spaj.mtd.personal.submit}</span></a></td>
											<td className="bullet"><a   data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'submitted', 'ytd', 0)}><span>{this.state.dataApe && this.state.dataApe.spaj.ytd.personal.submit}</span></a></td>
											<td style={{'textAlign':'center'}}><span>{now.personal_submit}</span></td>	
											<td style={{'textAlign':'center'}}><span>{current_year.personal_submit}</span></td>	
											<td style={{'textAlign':'center'}}><span>{mtd.personal_submit}</span></td>	
											<td style={{'textAlign':'center'}}><span>{ytd.personal_submit}</span></td>
										</tr>
									</tbody>
								</table>
								</div>
						</div>
						<div className="col-md-6  hidden-md hidden-lg">
							<div className="entry">
								<div className="tab-mobile hidden-md hidden-lg">
									<ul className="nav nav-tabs" role="tablist">
										<li role="presentation" className="active"><a href="#nb_case" aria-controls="nb_case" role="tab" data-toggle="tab">Based on Case <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape-personal" ></i></a> </li>
										<li role="presentation"><a href="#nb_ape" aria-controls="nb_ape" role="tab" data-toggle="tab">Based on APE <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape-personal" ></i></a> </li>
									</ul>
									<div className="tab-content">														
										<div role="tabpanel" className="tab-pane active" id="nb_case">
										<div style={{'overflowX':'auto', 'border':'1px solid #ddd'}}>
											<table className="table table-striped cpadding">
												<thead>
													<tr>
														<th className="header_table" style={{width:15 + 'px'}}></th>
														<th className="header_table" data-toggle="tooltip" data-placement="top" title="SPAJ that status change in running month no matter what is submit month">Current Month</th>
														<th className="header_table" data-toggle="tooltip" data-placement="top" title="SPAJ that status change in running month no matter what is submit month">Current Year</th>
														<th className="header_table" data-toggle="tooltip" data-placement="top" title="SPAJ that status change in running month no matter what is submit month">MTD</th>
														<th className="header_table" data-toggle="tooltip" data-placement="top" title="SPAJ that status change in running year no matter what is submit month">YTD</th>	
													</tr>
												</thead>
												<tbody>												
													<tr>
														<td>&nbsp;&nbsp;Pending</td>
														<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.pending}</span></a></td>
														<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.pending}</span></a></td>
														<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.pending}</span></a></td>
														<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.pending}</span></a></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;Underwriting Approved</td>
														<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'underwriting', 'cmtd', 1)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.underwriting}</span></a></td>
														<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'underwriting', 'cytd', 1)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.underwriting}</span></a></td>
														<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'underwriting', 'mtd', 1)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.underwriting}</span></a></td>
														<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'underwriting', 'ytd', 1)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.underwriting}</span></a></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;Declined</td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'declined', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.declined}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'declined', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.declined}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'declined', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.declined}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'declined', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.declined}</span></a></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;Withdrawn</td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'withdrawn', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.withdrawn}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'withdrawn', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.withdrawn}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'withdrawn', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.withdrawn}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'withdrawn', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.withdrawn}</span></a></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;Postponed</td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'postponed', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.postponed}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'postponed', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.postponed}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'postponed', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.postponed}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'postponed', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.postponed}</span></a></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;In Force (IF)</td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'issued', 'cmtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.now.personal.issued}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'issued', 'cytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.current_year.personal.issued}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'issued', 'mtd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.mtd.personal.issued}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'issued', 'ytd', 0)}><span>{this.state.dataApe && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.dataApe.spaj.ytd.personal.issued}</span></a></td>
													</tr>
													<tr>
														<td>Total</td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'submitted', 'cmtd', 0)}><span>{this.state.dataApe && this.state.dataApe.spaj.now.personal.submit}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'submitted', 'cytd', 0)}><span>{this.state.dataApe && this.state.dataApe.spaj.current_year.personal.submit}</span></a></td>
														<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'submitted', 'mtd', 0)}><span>{this.state.dataApe && this.state.dataApe.spaj.mtd.personal.submit}</span></a></td>
														<td className="bullet"><a   data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'submitted', 'ytd', 0)}><span>{this.state.dataApe && this.state.dataApe.spaj.ytd.personal.submit}</span></a></td>
													</tr>
												</tbody>
											</table>
											</div>
										</div>
										<div role="tabpanel" className="tab-pane" id="nb_ape">
										<div style={{'overflowX':'auto', 'border':'1px solid #ddd'}}>
											<table className="table table-striped cpadding">
												<thead>
													<tr>
														<th className="header_table" style={{width:15 + 'px'}}></th>
														<th className="header_table" data-toggle="tooltip" data-placement="top" title="SPAJ that status change in running month no matter what is submit month">Current Month</th>
														<th className="header_table" data-toggle="tooltip" data-placement="top" title="SPAJ that status change in running month no matter what is submit month">Current Year</th>
														<th className="header_table" data-toggle="tooltip" data-placement="top" title="SPAJ that status change in running month no matter what is submit month">MTD</th>
														<th className="header_table" data-toggle="tooltip" data-placement="top" title="SPAJ that status change in running year no matter what is submit month">YTD</th>	
													</tr>
												</thead>
												<tbody>												
													<tr>
														<td>&nbsp;&nbsp;Pending</td>
														<td style={{'textAlign':'right'}}><span>{now.personal_pending}</span></td>
														<td style={{'textAlign':'right'}}><span>{current_year.personal_pending}</span></td>
														<td style={{'textAlign':'right'}}><span>{mtd.personal_pending}</span></td>
														<td style={{'textAlign':'right'}}><span>{ytd.personal_pending}</span></td>								
													</tr>
													<tr>
														<td>&nbsp;&nbsp;Underwriting Approved</td>
														<td style={{'textAlign':'right'}}><span>{now.personal_underwriting}</span></td>
														<td style={{'textAlign':'right'}}><span>{current_year.personal_underwriting}</span></td>
														<td style={{'textAlign':'right'}}><span>{mtd.personal_underwriting}</span></td>
														<td style={{'textAlign':'right'}}><span>{ytd.personal_underwriting}</span></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;Declined</td>
														<td style={{'textAlign':'right'}}><span>{now.personal_decline}</span></td>
														<td style={{'textAlign':'right'}}><span>{current_year.personal_decline}</span></td>
														<td style={{'textAlign':'right'}}><span>{mtd.personal_decline}</span></td>
														<td style={{'textAlign':'right'}}><span>{ytd.personal_decline}</span></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;Withdrawn</td>
														<td style={{'textAlign':'right'}}><span>{now.personal_withdrawn}</span></td>
														<td style={{'textAlign':'right'}}><span>{current_year.personal_withdrawn}</span></td>
														<td style={{'textAlign':'right'}}><span>{mtd.personal_withdrawn}</span></td>
														<td style={{'textAlign':'right'}}><span>{ytd.personal_withdrawn}</span></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;Postponed</td>
														<td style={{'textAlign':'right'}}><span>{now.personal_postponed}</span></td>
														<td style={{'textAlign':'right'}}><span>{current_year.personal_postponed}</span></td>
														<td style={{'textAlign':'right'}}><span>{mtd.personal_postponed}</span></td>
														<td style={{'textAlign':'right'}}><span>{ytd.personal_postponed}</span></td>
													</tr>
													<tr>
														<td>&nbsp;&nbsp;In Force (IF)</td>
														<td style={{'textAlign':'right'}}><span>{now.personal_issued}</span></td>
														<td style={{'textAlign':'right'}}><span>{current_year.personal_issued}</span></td>
														<td style={{'textAlign':'right'}}><span>{mtd.personal_issued}</span></td>
														<td style={{'textAlign':'right'}}><span>{ytd.personal_issued}</span></td>
													</tr>
													<tr>
														<td>Total</td>
														<td style={{'textAlign':'center'}}><span>{now.personal_submit}</span></td>	
														<td style={{'textAlign':'center'}}><span>{current_year.personal_submit}</span></td>	
														<td style={{'textAlign':'center'}}><span>{mtd.personal_submit}</span></td>	
														<td style={{'textAlign':'center'}}><span>{ytd.personal_submit}</span></td>
													</tr>
												</tbody>
											</table>
											</div>
										</div>
									</div>	
								</div>
							</div>
						</div>
					</div>
				</div>
			<NewBusinessModal data={this.state.modalVal && this.state.modalVal} statusSPAJ={this.state.statusSPAJ} />
		</div>
		);
	}
}

export default GroupNewBusinessTrackingSummary;
