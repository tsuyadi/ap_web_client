'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuClaim from '../../common_components/menu_v2/left_menu_claim';
import Footer from '../../common_components/footer';

class life_assured extends React.Component {
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
												<label>Insured</label>
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
												<label>Name</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.policy_holder.name}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Gender</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.policy_holder.gender}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Birth Date</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.policy_holder.birth_date}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Address</label>
											</div>

											<div className="col-sm-6">
												{address}
											</div>
										</div>
									</form>
								</div>

								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Phone</label>
											</div>

											<div className="col-sm-6">
												{phone}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Mobile Phone</label>
											</div>

											<div className="col-sm-6">
												{mobile_phone}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Business Phone</label>
											</div>

											<div className="col-sm-6">
												{business_phone}
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Email</label>
											</div>

											<div className="col-sm-6">
												{data && data.policy.policy_holder.email}
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

export default life_assured;
