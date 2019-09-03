'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuClaim from '../../common_components/menu_v2/left_menu_claim';
import Footer from '../../common_components/footer';

class detail extends React.Component {
	constructor(props){
		super(props);

	}

	componentDidMount = () => {
		this.getData(this.props.params.policy_id);
	}

	getData = (policy_id) => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.insured_info,
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
		let data = this.state.data;
		let address = null;
		let mobile_phone = null;
		let business_phone = null;
		let phone = null;

		if(data)
		{
			$.map(data.policy.policy_holder.clientaddress_set, (value) => {
          if(value.is_active)
					{
						address = value.address;
					}
	    });
		}

		if(data)
		{
			$.map(data.policy.policy_holder.clientphone_set, (value) => {
          switch (value.type) {
          	case "Mobile":
							if(value.is_active)
							{
									mobile_phone = value.number;
							}
          		break;
          }
	    });
		}

		return (
		<div className="wrap2">

            <TopMenuNewBusinessDetail title="Insured Info" />

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
												<label>Policy No</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.number}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Policy Holder</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.policy_holder.name}
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
												<label>Life Assured</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.lifeassured_set[0].person.name}
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
									</form>
								</div>
							</div>
						</div>

						<hr />

						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Claim No</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.policy_holder.name}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Claim Type</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.policy_holder.name}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-12 bg-info">
												<label>Form Receive Date</label>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<div className="col-sm-2 bg-info"></div>
												<div className="col-sm-10 bg-info">
													<label>By Branch</label>
												</div>
											</div>

											<div className="col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control date_picker" id="bybranch_date" name="bybranch_date" value={this.state.param.policy_effective_date_start} onChange={this.handleChangeData} placeholder="05/06/2015"/>
													<div className="input-group-addon"><i className="fa fa-calendar"></i></div>
												</div>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<div className="col-sm-2 bg-info"></div>
												<div className="col-sm-10 bg-info">
													<label>By HO</label>
												</div>
											</div>

											<div className="col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control date_picker" id="bybranch_ho" name="bybranch_ho" value={this.state.param.policy_effective_date_start} onChange={this.handleChangeData} placeholder="05/06/2015"/>
													<div className="input-group-addon"><i className="fa fa-calendar"></i></div>
												</div>
											</div>
										</div>

									</form>
								</div>

								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Status</label>
											</div>

											<div className="col-sm-6">
												{phone}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Hospital</label>
											</div>

											<div className="col-sm-6">
												{mobile_phone}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
													<label>Treatment Date</label>
											</div>

											<div className="col-sm-6">
												<div className="input-group">
													<input type="text" className="form-control date_picker" id="treatment_date" name="treatment_date" value="" onChange="" placeholder="05/06/2015"/>
													<div className="input-group-addon"><i className="fa fa-calendar"></i></div>
												</div>
											</div>
										</div>
									</form>
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

export default detail;
