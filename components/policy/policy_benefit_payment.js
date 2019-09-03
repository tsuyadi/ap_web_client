'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import {MoneyFormat} from '../../common_components/helper/formatter';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuPolicy from '../../common_components/menu_v2/left_menu_policy';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';

class policy_benefit_payment extends React.Component {
	constructor(props){
		super(props);
        this.openMenu = this.openMenu.bind(this);
	}

	componentWillMount = () => {
		CekAuth();
	}

	componentDidMount = () => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.policy_benefitPayment,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {policy_id:this.state.policy_id},
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');

              this.setState({
					policy_no: response.content.policy_no,
					policy_holder: response.content.policy_holder_name,
					agent_name: response.content.agent.name,
					agent_code: response.content.agent.code,
					product_name: response.content.product_name,
					life_assured: response.content.insured[0],
					sum_assured: MoneyFormat(response.content.sum_assured),
					policy_benefit_payment: response.content.policy_benefit_payment
              	});
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){}
            }
        });
	}

	state = {
		policy_id: this.props.params.policy_id,
		policy_no: "",
		policy_holder: "",
		agent_name: "",
		agent_code: "",
		product_name: "",
		life_assured: "",
		sum_assured: "",
		policy_benefit_payment: null
	}

// {
//     "status": "OK",
//     "content": {
//         "policy_no": "00001021",
//         "policy_holder_name": "Dahlia",
//         "policy_benefit_payment": [],
//         "sum_assured": 50000000,
//         "insured": [
//             "Iskandar"
//         ],
//         "agent": {
//             "code": "60005410",
//             "name": "MUHAMMAD ADI"
//         },
//         "product_name": "TM Peace of Mind SCAP"
//     }
// }

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }
	render(){
		let policies = [];
		if(this.state.policy_benefit_payment && this.state.policy_benefit_payment.length > 0){
			$.map(this.state.policy_benefit_payment, (value, index) => {
	            let row = null;
				let insured = "";
				
	            row = <tr key={index}>
						<td>{idx}</td>
		              	<td></td>
		              	<td></td>
		              	<td></td>
		              	<td></td>
		              	<td></td>
		              	<td></td>
					</tr>
				policies.push(row);
            });
		}
		else {
			let row = <tr>
						<td colSpan="7" style={{'text-align':'center'}}>No data.</td>
					</tr>
            policies.push(row);
		}
		return (
		<div className="wrap2">

            <TopMenuNewBusinessDetail title="Policy Benefit Payment" />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/policy/list_policies">Policy Tracking</a></li>
							<li className="active">Policy Benefit Payment</li>
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
				
				<div className="main twoColumnMain">

					<LeftMenuPolicy active="6" policy_id={this.state.policy_id} />

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
												{this.state.policy_no}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Policy Holder</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.policy_holder}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Agent Name</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.agent_name}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Product Name</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.product_name}
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
												{this.state.life_assured}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Agent Code</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.agent_code}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Sum Assured</label>
											</div>
											
											<div className="col-sm-6">
												{this.state.sum_assured}
											</div>
										</div>
									</form>
								</div>
							</div>
						</div>

						<hr />
						
						<div className="row">
							<div className="col-sm-12">
								<div className="table-responsive">
									<table className="table table-bordered table-striped table-hover table-box">
										<thead>
											<tr>
												<th className="header_table ">No</th>
												<th className="header_table ">Transaction Name</th>
												<th className="header_table ">Transaction Ammount</th>
												<th className="header_table ">Paid Date</th>
												<th className="header_table ">Bank</th>
												<th className="header_table ">Account No</th>
												<th className="header_table ">Account Holder Name</th>
											</tr>
										</thead>
										<tbody>
											{policies}
											{
												/*<tr>
													<td>1</td>
													<td>Withdrawal</td>
													<td>12.000.000</td>
													<td>21/11/2015</td>
													<td>BCA</td>
													<td>1223454545</td>
													<td>Galih</td>
												</tr>
												<tr>
													<td>2</td>
													<td>Hospital Claim</td>
													<td>1.450.000</td>
													<td>01/11/2015</td>
													<td>BCA</td>
													<td>1223454545</td>
													<td>Galih</td>
												</tr>*/
											}
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

export default policy_benefit_payment;
