'use strict'

import api_route from '../../common_components/api_route';
import NewBusinessModal from '../../common_components/modal/new_business_group';
import PreRegModal from '../../common_components/modal/pre_reg_modal';
import {DateFormat, MoneyFormat, DateFormatYMD} from '../../common_components/helper/formatter';

class GroupNewBusinessTrackingSummary extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null,
			param: {
					page: 1,
					offset: "",
					userid: "",
					spaj_no: "",
					spaj_no2: "",
					owner_name: "",
					owner_name2: "",
					insured_name: "",
					insured_name2: "",
					agent_code: "",
					agent_code2: "",
					agent_name: "",
					agent_name2: "",
					agent_branch: "",
					agent_branch2: "",
					channel_distribution: "",
					channel_distribution2: "",
					status: "",
					status2: "",
					pre_reg_date_start: "",
					pre_reg_date_end: "",
					pre_reg_date: "",
					sort_by: ""
			},
			pre_reg : null,
			modalPreReg :[],
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
		},
		this.getDataAPE = this.getDataAPE.bind(this);
	}

	getDataAPE(){
		debugger;

		var param = [];

		if(this.props.disabled == "true"){
			param = {
				agent : this.props.param_agent
			};
		}else{
			param = [];
		}

		$('.load-ape-group').show();
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
				debugger;
				$('.load-ape-group').hide();
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
				$('.load-ape-group').hide();
				if(err.responseJSON){
					debugger;
					// window.location.href = window.location.href.split('#')[0] + '#/';
				}					
			}
		});
		$.ajax({
            url: api_route.pre_reg_summary+localStorage.getItem('agent_code'),
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            type: 'GET',
            success: (response) => {
              	// console.log(response);
				this.setState({
					pre_reg:response,
				});
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
              
            }
        });
	}

	_data(status, period, group, obj) {
		debugger;
		if(obj){
			obj.preventDefault();
		}
		var start = null;
		var end = null;
		this.setState({
			statusSPAJ: status
		});
		if(status != 'prereg' && status != 'p_incomplete'){
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
			}else{
				if(period == 'pytd'){
					this.state.param.pre_reg_date_start = DateFormat(new Date(new Date().getFullYear(), 0, 1));
					this.state.param.pre_reg_date_end = DateFormat(new Date(new Date().getFullYear(), 11, 31));
				}else{
					this.state.param.pre_reg_date_start =  DateFormat(new Date(new Date().getFullYear(), new Date().getMonth(), 1));
					this.state.param.pre_reg_date_end =  DateFormat(new Date(new Date().getFullYear(), new Date().getMonth() + 1, 0));
				}
				if(status == 'prereg'){
					this.state.param.status = [1, 2, 4, 5, 7];
				}else{
					
					this.state.param.status = [3];
				}
				this.state.param.userid = localStorage.getItem("username");
				var param = this.state.param;
				$.ajax({
					url: api_route.pre_reg_spaj_list,
					headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token'),
					'Content-Type':'application/json',
					'Accept':'application/json'
				},
				data: JSON.stringify(param),
						type: 'POST',
						success: (response) => {
								this.setState({
									modalPreReg:response.spaj
								});
						},
						error: (err, response) => {
							if(err.responseJSON){
								window.location.href = window.location.href.split('#')[0] + '#/';
							}
						}
				});
			}
    }

	componentWillReceiveProps = (p) => {
		
		this.getDataAPE();

	}

	render(){

		debugger;

		if(this.state.agent != this.props.param_agent){
			this.getDataAPE();
		}

		// if(this.state.dataApe == undefined && this.state.dataApe == null){
		// 	if(this.props.data != undefined && this.props.data != null){
		// 		this.getDataAPE();
		// 	}
		// }

		let current_year = {
			group_decline : this.state.dataApe && this.state.dataApe.production.ape.current_year.group.declined != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.group.declined) : 0, 
			group_issued : this.state.dataApe && this.state.dataApe.production.ape.current_year.group.issued != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.group.issued) : 0, 
			group_pending : this.state.dataApe && this.state.dataApe.production.ape.current_year.group.pending != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.group.pending) : 0, 
			group_postponed : this.state.dataApe && this.state.dataApe.production.ape.current_year.group.postponed != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.group.postponed) : 0, 
			group_submit : this.state.dataApe && this.state.dataApe.production.ape.current_year.group.submit != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.group.submit) : 0, 
			group_underwriting : this.state.dataApe && this.state.dataApe.production.ape.current_year.group.underwriting != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.group.underwriting) : 0, 
			group_withdrawn : this.state.dataApe && this.state.dataApe.production.ape.current_year.group.withdrawn != null ? MoneyFormat(this.state.dataApe.production.ape.current_year.group.withdrawn) : 0
		};

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
				<div className="row">
					<div className="col-md-12 hidden-xs hidden-sm">
						<div className="entry">
						<div style={{'overflowX':'auto', 'border':'1px solid #ddd'}}>
							<table className="table table-striped forbullet table-box table-bordered">
								<thead>
									<tr>
										<th className="header_table" rowSpan={2}></th>
										<th className="header_table" colSpan={4}>Based on Case <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape-group" ></i></th>
										<th className="header_table" colSpan={4}>Based on APE <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape-group" ></i></th>
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
									<tr className="pre_reg_border">
										<td>&nbsp;&nbsp;Pre Registration</td>	
										<td className="bullet"><a data-toggle={toggleProp} data-target="#pre_reg" onClick={this._data.bind(this, 'prereg', 'pmtd', 0)}><span>{this.state.pre_reg && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.pre_reg.current_month}</span></a></td>
										<td className="bullet"><a data-toggle={toggleProp} data-target="#pre_reg" onClick={this._data.bind(this, 'prereg', 'pytd', 0)}><span>{this.state.pre_reg && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.pre_reg.current_year}</span></a></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>								
									</tr>						
									<tr className="pre_reg_border" style={{borderBottom:"3pt solid #ccc"}}>
										<td>&nbsp;&nbsp;Incomplete Document</td>	
										<td className="bullet"><a data-toggle={toggleProp} data-target="#pre_reg" onClick={this._data.bind(this, 'p_incomplete', 'pmtd', 0)}><span>{this.state.pre_reg && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.pre_reg.incomplete_current_month}</span></a></td>
										<td className="bullet"><a data-toggle={toggleProp} data-target="#pre_reg" onClick={this._data.bind(this, 'p_incomplete', 'pytd', 0)}><span>{this.state.pre_reg && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.pre_reg.incomplete_current_year}</span></a></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>
										<td style={{'textAlign':'right'}}><span>{}</span></td>								
									</tr>						
									<tr>
										<td>&nbsp;&nbsp;Pending</td>
									<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'cmtd', 0)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.pending}</span></a></td>
									<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusiness" onClick={this._data.bind(this, 'pending', 'cytd', 0)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.pending}</span></a></td>
										<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'pending', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.pending}</span></a></td>
										<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'pending', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.pending}</span></a></td>
										<td style={{'textAlign':'right'}}><span>{now.group_pending}</span></td>
										<td style={{'textAlign':'right'}}><span>{current_year.group_pending}</span></td>
										<td style={{'textAlign':'right'}}><span>{mtd.group_pending}</span></td>
										<td style={{'textAlign':'right'}}><span>{ytd.group_pending}</span></td>
									</tr>
									<tr>
										<td>&nbsp;&nbsp;Underwriting Approved</td>
										<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'underwriting', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.underwriting}</span></a></td>
										<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'underwriting', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.underwriting}</span></a></td>
										<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'underwriting', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.underwriting}</span></a></td>
										<td className="bullet"><a data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'underwriting', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.underwriting}</span></a></td>
										<td style={{'textAlign':'right'}}><span>{now.group_underwriting}</span></td>
										<td style={{'textAlign':'right'}}><span>{current_year.group_underwriting}</span></td>
										<td style={{'textAlign':'right'}}><span>{mtd.group_underwriting}</span></td>
										<td style={{'textAlign':'right'}}><span>{ytd.group_underwriting}</span></td>
										
									</tr>
									<tr>
										<td>&nbsp;&nbsp;Declined</td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'declined', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.declined}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'declined', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.declined}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'declined', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.declined}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'declined', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.declined}</span></a></td>
										<td style={{'textAlign':'right'}}><span>{now.group_decline}</span></td>
										<td style={{'textAlign':'right'}}><span>{current_year.group_decline}</span></td>
										<td style={{'textAlign':'right'}}><span>{mtd.group_decline}</span></td>
										<td style={{'textAlign':'right'}}><span>{ytd.group_decline}</span></td>
									</tr>
									<tr>
										<td>&nbsp;&nbsp;Withdrawn</td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'withdrawn', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.withdrawn}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'withdrawn', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.withdrawn}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'withdrawn', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.withdrawn}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'withdrawn', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.withdrawn}</span></a></td>
										<td style={{'textAlign':'right'}}><span>{now.group_withdrawn}</span></td>
										<td style={{'textAlign':'right'}}><span>{current_year.group_withdrawn}</span></td>
										<td style={{'textAlign':'right'}}><span>{mtd.group_withdrawn}</span></td>
										<td style={{'textAlign':'right'}}><span>{ytd.group_withdrawn}</span></td>
									</tr>
									<tr>
										<td>&nbsp;&nbsp;Postponed</td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'postponed', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.postponed}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'postponed', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.postponed}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'postponed', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.postponed}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'postponed', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.postponed}</span></a></td>
										<td style={{'textAlign':'right'}}><span>{now.group_postponed}</span></td>
										<td style={{'textAlign':'right'}}><span>{current_year.group_postponed}</span></td>
										<td style={{'textAlign':'right'}}><span>{mtd.group_postponed}</span></td>
										<td style={{'textAlign':'right'}}><span>{ytd.group_postponed}</span></td>
									</tr>
									<tr>
										<td>&nbsp;&nbsp;In Force (IF)</td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'issued', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.issued}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'issued', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.issued}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'issued', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.issued}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'issued', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.issued}</span></a></td>
										<td style={{'textAlign':'right'}}><span>{now.group_issued}</span></td>
										<td style={{'textAlign':'right'}}><span>{current_year.group_issued}</span></td>
										<td style={{'textAlign':'right'}}><span>{mtd.group_issued}</span></td>
										<td style={{'textAlign':'right'}}><span>{ytd.group_issued}</span></td>
									</tr>
									<tr>
										<td>Total</td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'submitted', 'cmtd', 1)}><span>{this.state.data && this.state.data.spaj.now.group.submit}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'submitted', 'cytd', 1)}><span>{this.state.data && this.state.data.spaj.current_year.group.submit}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'submitted', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj.mtd.group.submit}</span></a></td>
										<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'submitted', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj.ytd.group.submit}</span></a></td>
										<td style={{'textAlign':'center'}}><span>{now.group_submit}</span></td>	
										<td style={{'textAlign':'center'}}><span>{current_year.group_submit}</span></td>	
										<td style={{'textAlign':'center'}}><span>{mtd.group_submit}</span></td>	
										<td style={{'textAlign':'center'}}><span>{ytd.group_submit}</span></td>
									</tr>
								</tbody>
							</table>
						</div>
						</div>
					</div>

					<div className="col-md-6  hidden-md hidden-lg">
						<div className="entry">
							<div className="tab-mobile hidden-md hidden-lg">
								<ul className="nav nav-tabs" role="tablist">
									<li role="presentation" className="active"><a href="#nb_case" aria-controls="nb_case" role="tab" data-toggle="tab">Based on Case <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape-group" ></i></a> </li>
									<li role="presentation"><a href="#nb_ape" aria-controls="nb_ape" role="tab" data-toggle="tab">Based on APE <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-ape-group" ></i></a> </li>
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
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'pending', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.pending}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'pending', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.pending}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'pending', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.pending}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'pending', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.pending}</span></a></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;Underwriting Approved</td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'underwriting', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.underwriting}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'underwriting', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.underwriting}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'underwriting', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.underwriting}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'underwriting', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.underwriting}</span></a></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;Declined</td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'declined', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.declined}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'declined', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.declined}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'declined', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.declined}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'declined', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.declined}</span></a></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;Withdrawn</td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'withdrawn', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.withdrawn}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'withdrawn', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.withdrawn}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'withdrawn', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.withdrawn}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'withdrawn', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.withdrawn}</span></a></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;Postponed</td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'postponed', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.postponed}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'postponed', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.postponed}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'postponed', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.postponed}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'postponed', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.postponed}</span></a></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;In Force (IF)</td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'issued', 'cmtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.now.group.issued}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'issued', 'cytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.current_year.group.issued}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'issued', 'mtd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.issued}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'issued', 'ytd', 1)}><span>{this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.issued}</span></a></td>
												</tr>
												<tr>
													<td>Total</td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'submitted', 'cmtd', 1)}><span>{this.state.data && this.state.data.spaj.now.group.submit}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'submitted', 'cytd', 1)}><span>{this.state.data && this.state.data.spaj.current_year.group.submit}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'submitted', 'mtd', 1)}><span>{this.state.data && this.state.data.spaj.mtd.group.submit}</span></a></td>
													<td className="bullet"><a  data-toggle={toggleProp} data-target="#newbusinessgroup" onClick={this._data.bind(this, 'submitted', 'ytd', 1)}><span>{this.state.data && this.state.data.spaj.ytd.group.submit}</span></a></td>
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
													<td style={{'textAlign':'right'}}><span>{now.group_pending}</span></td>
													<td style={{'textAlign':'right'}}><span>{current_year.group_pending}</span></td>
													<td style={{'textAlign':'right'}}><span>{mtd.group_pending}</span></td>
													<td style={{'textAlign':'right'}}><span>{ytd.group_pending}</span></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;Underwriting Approved</td>
													<td style={{'textAlign':'right'}}><span>{now.group_underwriting}</span></td>
													<td style={{'textAlign':'right'}}><span>{current_year.group_underwriting}</span></td>
													<td style={{'textAlign':'right'}}><span>{mtd.group_underwriting}</span></td>
													<td style={{'textAlign':'right'}}><span>{ytd.group_underwriting}</span></td>
													
												</tr>
												<tr>
													<td>&nbsp;&nbsp;Declined</td>
													<td style={{'textAlign':'right'}}><span>{now.group_decline}</span></td>
													<td style={{'textAlign':'right'}}><span>{current_year.group_decline}</span></td>
													<td style={{'textAlign':'right'}}><span>{mtd.group_decline}</span></td>
													<td style={{'textAlign':'right'}}><span>{ytd.group_decline}</span></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;Withdrawn</td>
													<td style={{'textAlign':'right'}}><span>{now.group_withdrawn}</span></td>
													<td style={{'textAlign':'right'}}><span>{current_year.group_withdrawn}</span></td>
													<td style={{'textAlign':'right'}}><span>{mtd.group_withdrawn}</span></td>
													<td style={{'textAlign':'right'}}><span>{ytd.group_withdrawn}</span></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;Postponed</td>
													<td style={{'textAlign':'right'}}><span>{now.group_postponed}</span></td>
													<td style={{'textAlign':'right'}}><span>{current_year.group_postponed}</span></td>
													<td style={{'textAlign':'right'}}><span>{mtd.group_postponed}</span></td>
													<td style={{'textAlign':'right'}}><span>{ytd.group_postponed}</span></td>
												</tr>
												<tr>
													<td>&nbsp;&nbsp;In Force (IF)</td>
													<td style={{'textAlign':'right'}}><span>{now.group_issued}</span></td>
													<td style={{'textAlign':'right'}}><span>{current_year.group_issued}</span></td>
													<td style={{'textAlign':'right'}}><span>{mtd.group_issued}</span></td>
													<td style={{'textAlign':'right'}}><span>{ytd.group_issued}</span></td>
												</tr>
												<tr>
													<td>Total</td>
													<td style={{'textAlign':'center'}}><span>{now.group_submit}</span></td>	
													<td style={{'textAlign':'center'}}><span>{current_year.group_submit}</span></td>	
													<td style={{'textAlign':'center'}}><span>{mtd.group_submit}</span></td>	
													<td style={{'textAlign':'center'}}><span>{ytd.group_submit}</span></td>
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
				<NewBusinessModal data={this.state.modalVal && this.state.modalVal} statusSPAJ={this.state.statusSPAJ} />
				<PreRegModal data={this.state.modalPreReg && this.state.modalPreReg} statusSPAJ={this.state.statusSPAJ} />
		</div>
		);
	}
}

export default GroupNewBusinessTrackingSummary;
