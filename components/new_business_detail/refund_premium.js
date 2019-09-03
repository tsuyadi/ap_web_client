'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuNewBusinessDetail from '../../common_components/menu_v2/left_menu_new_business_detail';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';

class newbusiness_refund_premium extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			spaj_id: this.props.params.spaj_id,
			spaj_number: "-",
			policy_no: "-",
			policy_holder: "-",
			life_assured: "-",
			agent_name: "-",
			agent_code: "-",
			refund_premium: [],
		}
        this.openMenu = this.openMenu.bind(this);
	}

	componentWillMount(){
		CekAuth();
	}

	componentDidMount(){
		$('#loading').modal('show');
		$.ajax({
            url: api_route.spaj_refundPremium,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {spaj_id:this.state.spaj_id},
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');
              this.setState({
              		spaj_number: response.content.spaj.number,
					policy_no: response.content.spaj.policy.number,
					policy_holder: response.content.spaj.policy.policy_holder.name,
					life_assured: response.content.spaj.policy.lifeassured_set[0].person.name,
              		agent_name: response.content.spaj.agent.full_name,
              		agent_code: response.content.spaj.agent.code,
					refund_premium: response.content.spaj.policy.refundpremium_set,
              	});
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
            	window.location.href = window.location.href.split('#')[0] + '#/newbusiness';
              }
            }
        });
	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	render(){
		let refundPremium  = [];
		let refund_premium = this.state.refund_premium;
		if(refundPremium && refundPremium.length > 0)
		{
			$.map(refundPremium, (value, index) => {
	            row = <tr key={index}>
						<td>{index+1}</td>
						<td>{"-"}</td>
						<td>{"-"}</td>
						<td>{"-"}</td>
						<td>{"-"}</td>
						<td>{"-"}</td>
					</tr>
	            refundPremium.push(row);
	          });
		}
		else {
			let row = <tr>
						<td colSpan="6" style={{'text-align':'center'}}>No data.</td>
					</tr>
            refundPremium.push(row);
		}

		return (
		<div className="wrap2">
			
            <TopMenuNewBusinessDetail title="Refund Premium" />
			
			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/newbusiness/">SPAJ Tracking</a></li>
							<li className="active">Refund Premium</li>
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
				
					<LeftMenuNewBusinessDetail active="4" spaj_id={this.props.params.spaj_id} />
					
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
												{this.props.params.spaj_id}
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
									</form>
								</div>
								
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
									</form>
								</div>
							</div>
						</div>
						
						<hr />
						
						<div className="row">
							<div className="col-sm-12">
								<div className="table-responsive">
									<table className="table table-bordered table-striped table-hover">
										<thead>
											<tr className="info">
												<th>No</th>
												<th>Refund Date</th>
												<th>Refund Amount</th>
												<th>Bank</th>
												<th>Account No</th>
												<th>Account Holder Name</th>
											</tr>
										</thead>
										<tbody>
											{refundPremium}
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

export default newbusiness_refund_premium;