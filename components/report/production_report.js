'use strict'

import React from 'react';
// import $ from 'jQuery';

import api_route from '../../common_components/api_route';
import Footer from '../../common_components/footer';
import MenuReport from '../../common_components/menu_v2/menu_report';
import CekAuth from '../../common_components/helper/cek_auth';

class ProductionReport extends React.Component {
	constructor(props){
		super(props);
		CekAuth();
	}

	componentDidMount = () => {
		$.ajax({
            url: api_route.managementDashboard,
            headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
				NProgress.done();
				this.setState({data:response});
			},
			error: (err) => {
				NProgress.done();
				if(err.responseJSON){
					console.log(err.responseJSON);	
				}  
            }
        });
	}

	state = {
		data: null
	}

	render(){
		return (
			<div className="outer-wrapper">
				<div className="wrap2">
					{/* Start Top Menu Section */}
					<MenuReport username={this.state.data && this.state.data.common_data.name} lastlogin={this.state.data && this.state.data.last_login}/>
					{/* End Top Menu Section */}
				</div>
				<div className="main-wrapper">
					<div className="main">
						<div className="formSearch">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-6">Commision Statement Period</label>
									<div className="col-sm-2">
										<select className="form-control">
											<option selected>Year</option>
											<option>2016</option>
											<option>2015</option>
										</select>
									</div>
									<div className="col-sm-2">
										<select className="form-control">
											<option selected>Month</option>
											<option>March</option>
											<option>April</option>
										</select>
									</div>
									<div className="col-sm-2">
										<button className="btn btn-primary" type="button"><i className="fa fa-search"></i> Search</button>
									</div>
								</div>
							</form>
						</div>
						
						<div className="tableResult">
							<div className="table-responsive">
								<table className="table table-bordered">
									<tr className="info">
										<th>No.</th>
										<th>Commision Slip</th>
										<th></th>
									</tr>
									<tr>
										<td>1</td>
										<td>Agentcode_201603_07</td>
										<td><button className="btn btn-warning" type="button"><i className="fa fa-download"></i> Download</button></td>
									</tr>
									<tr>
										<td>2</td>
										<td>Agentcode_201603_15</td>
										<td><button className="btn btn-warning" type="button"><i className="fa fa-download"></i> Download</button></td>
									</tr>
									<tr>
										<td>3</td>
										<td>Agentcode_201603_21</td>
										<td><button className="btn btn-warning" type="button"><i className="fa fa-download"></i> Download</button></td>
									</tr>
									<tr>
										<td>4</td>
										<td>Agentcode_201603_28</td>
										<td><button className="btn btn-warning" type="button"><i className="fa fa-download"></i> Download</button></td>
									</tr>
									<tr>
										<td>5</td>
										<td>Agentcode_201603_07</td>
										<td><button className="btn btn-warning" type="button"><i className="fa fa-download"></i> Download</button></td>
									</tr>
									<tr>
										<td>6</td>
										<td>Agentcode_201603_15</td>
										<td><button className="btn btn-warning" type="button"><i className="fa fa-download"></i> Download</button></td>
									</tr>
									<tr>
										<td>7</td>
										<td>Agentcode_201603_21</td>
										<td><button className="btn btn-warning" type="button"><i className="fa fa-download"></i> Download</button></td>
									</tr>
									<tr>
										<td>8</td>
										<td>Agentcode_201603_28</td>
										<td><button className="btn btn-warning" type="button"><i className="fa fa-download"></i> Download</button></td>
									</tr>
								</table>
							</div>
						</div>
					</div>
				</div>
				<Footer />
			</div>
		);
	}
}

export default ProductionReport;