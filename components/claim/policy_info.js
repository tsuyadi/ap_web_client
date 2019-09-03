'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuClaim from '../../common_components/menu_v2/left_menu_claim';
import Footer from '../../common_components/footer';

class policy_info extends React.Component {
	constructor(props){
		super(props);

	}

  componentDidMount = () => {
		this.getData(this.props.params.policy_id);
	}

	getData = (policy_id) => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.policy_info,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
						data: {policy_id: policy_id},
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
		data: null
	}

	render(){
		return (
		<div className="wrap2">

            <TopMenuNewBusinessDetail title="Policy Info" />

			<div className="main-wrapper">
				<div className="main twoColumnMain">

					<LeftMenuClaim />

					<div className="main-content">
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>SPAJ No</label>
											</div>

											<div className="col-sm-6">
												00000001
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Policy No</label>
											</div>

											<div className="col-sm-6">
												000000002
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Due Date Premium</label>
											</div>

											<div className="col-sm-6">
												05/06/2015
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Basic Premium</label>
											</div>

											<div className="col-sm-6">
												1.000.000
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Additional Premium</label>
											</div>

											<div className="col-sm-6">
												500.000
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Commencement Date</label>
											</div>

											<div className="col-sm-6">
												05/06/2015
											</div>
										</div>
									</form>
								</div>

								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Issued Date</label>
											</div>

											<div className="col-sm-6">
												05/06/2015
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Status</label>
											</div>

											<div className="col-sm-6">
												Inforce
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Payment Mode</label>
											</div>

											<div className="col-sm-6">
												Yearly
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Payment Method</label>
											</div>

											<div className="col-sm-6">
												Transfer
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Total Premium</label>
											</div>

											<div className="col-sm-6">
												1.500.000
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

						<hr />

						<div className="row">
							<div className="col-sm-12">
								<h3>Product Info</h3>

								<div className="table-responsive">
									<table className="table table-bordered table-striped table-hover">
										<thead>
											<tr className="info">
												<th>No</th>
												<th>Product Code</th>
												<th>Product Name</th>
												<th>SA</th>
												<th>Coverage Start Date</th>
												<th>Coverage End Date</th>
												<th>Status</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td>XXXX</td>
												<td>Team Life</td>
												<td>1.000.000.000</td>
												<td>23/01/2013</td>
												<td>23/01/2050</td>
												<td>Inforce</td>
											</tr>
										</tbody>
									</table>
								</div>

								<div className="clearfix"></div>

								<h3>Benefeciary</h3>

								<div className="table-responsive">
									<table className="table table-bordered table-striped table-hover">
										<thead>
											<tr className="info">
												<th>No</th>
												<th>Name</th>
												<th>Birth Date</th>
												<th>Gender</th>
												<th>Relationship with Life Assured</th>
												<th>Sharing Percentage</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>1</td>
												<td>Galih</td>
												<td>27/07/1980</td>
												<td>Male</td>
												<td>Children</td>
												<td>100</td>
											</tr>
										</tbody>
									</table>
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

export default policy_info;
