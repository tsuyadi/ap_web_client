'use strict'

import React from 'react';
import CekAuth from '../../common_components/helper/cek_auth';
import api_route from '../../common_components/api_route';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';

class claim_inquiry extends React.Component {

	constructor(props){
		super(props);
	}

	componentDidMount = () => {
		this.getData();
	}

	getData = () => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.claim_Tracking,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param,
            success: (response) => {
              	$('#loading').modal('hide');
              	this.setState({
              		data:response.content
              	});
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	//window.location.href = window.location.href.split('#')[0] + '#/';
              }

            }
        });
	}

	state = {
		data: null,
		param: {
			policy_no:"",
			policy_holder_name:"",
			agent_name:"",
			agent_code:"",
			agent_status:"",
			page:"",
			offset: "",
			insured: "",
			branch: "",
			submit_date: "",
			claim_no: ""
		}
	}

	handleChangeData = (e) => {
		let data_array = {};
		for (let i in this.state.param) {
			if(i==event.target.name){
				data_array[i] = event.target.value
			}
			else{
				data_array[i] = this.state.param[i]
			}
		}
		this.setState({
			param : data_array
		});
	}


	render(){
		let data = this.state.data;
		let policies = [];
		if(data && data.policy_list.length > 0)
		{
			$.map(data.policy_list, (value, index) => {
	            let url = "#/newbusiness/policy_info/"+value.id;
	            let row = null;
				let insured = "";
				$.map(value.lifeassured_set,(value,index) => {
					insured += value.person.name + "\n";
				})
    			row = <tr key={index}>
								<td>{index+1}</td>
								<td>{value.number}</td>
								<td>{value.status}</td>
								<td>{value.policy_holder.name}</td>
								<td>{insured}</td>
								<td>{value.effective_date}</td>
								<td>{value.sum_assured}</td>
								<td>{value.payment_mode}</td>
								<td>{value.payment_method}</td>
								<td>{value.agent.full_name}</td>
								<td>{value.agent.user.level.type}</td>
								<td>{value.agent.status}</td>
								<td>{value.agent.branch.name}</td>
								<td>{value.agent.branch.name}</td>
							</tr>
				policies.push(row);
	          });
		}
		else 
		{
			let row = <tr>
						<td colSpan="13" style={{'text-align':'center'}}>No data.</td>
					</tr>
            policies.push(row);
		}
		return (
		<div className="wrap2">

    <TopMenuNewBusinessDetail title="Claim" />

			<div className="main-wrapper">
				<ol className="breadcrumb" style={{marginBottom: '5px'}}>
					<li className="active">Claim</li>
				</ol>
				<div className="main twoColumnMain">

					<LeftMenuInquiry active="4"/>

					<div className="main-content">
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-6">
									<div className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy No</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="policy_no" name="policy_no" value={this.state.param.policy_no} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy Holder Name</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="policy_holder_name" name="policy_holder_name" value={this.state.param.policy_holder_name} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Life Assured</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="life_assured" name="life_assured" value={this.state.param.insured} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Branch</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="branch" name="branch" value={this.state.param.branch} onChange={this.handleChangeData} />
											</div>
										</div>
									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6">
												<label>Submit Date</label>
											</div>

											<div className="col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control date_picker" id="submit_date" name="submit_date" value={this.state.param.policy_effective_date_start} onChange={this.handleChangeData} placeholder="05/06/2015"/>
													<div className="input-group-addon"><i className="fa fa-calendar"></i></div>
												</div>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Name</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="agent_name" name="agent_name" value={this.state.param.agent_name} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Code</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="agent_code" name="agent_code" value={this.state.param.agent_code} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Status</label>
											</div>

											<div className="col-sm-6">
													<select className="form-control" id="agent_status" name="agent_status" onChange={this.handleChangeData} >
														<option value="">All Status</option>
														<option value="Pending">Pending</option>
														<option value="Active">Active</option>
													</select>
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-12">
								<div className="clearfix h25"></div>

								<div className="col-sm-3 pull-right">
									<button className="btn btn-primary btn-block" type="button" onClick={() => this.getData()}><i className="fa fa-search"></i> Search</button>
								</div>
							</div>
						</div>

						<div className="clearfix h25"></div>

						<hr />

						<div className="row">
							<div className="col-sm-12">
								<div className="table-responsive">
									<table className="table table-bordered table-striped table-hover text-center table-box">
										<thead>
											<tr>
												<th className="header_table valign-middle text-center">No</th>
												<th className="header_table valign-middle text-center">Claim No</th>
												<th className="header_table valign-middle text-center">Submit Date</th>
												<th className="header_table valign-middle text-center">Claim Type</th>
												<th className="header_table valign-middle text-center">Policy No</th>
												<th className="header_table valign-middle text-center">Policy Holder</th>
												<th className="header_table valign-middle text-center">Life Assured</th>
												<th className="header_table valign-middle text-center">Name</th>
												<th className="header_table valign-middle text-center">Level</th>
												<th className="header_table valign-middle text-center">Claim Status</th>
												<th className="header_table valign-middle text-center">Claim Submit Date</th>
											</tr>
										</thead>
										<tbody>
											{policies}
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="clearfix"></div>

					</div>

					<div className="clearfix"></div>
				</div>
			</div>

			<Footer />

		</div>
		);
	}
}
export default claim_inquiry;
