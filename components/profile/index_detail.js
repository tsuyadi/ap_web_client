'use strict'

import {CheckAgentType,DateFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import Loading from '../../common_components/loading';

import TopMenu from '../../common_components/menu_v2/top_menu';
import Footer from '../../common_components/footer';

class profile_update extends React.Component {
	constructor(props){
		super(props);
		CekAuth();
	}

	state = {
		  agent_profile : null,
		  first_name: '-',
		  code: '-',
		  status:  '-',
		  gender: '-',
		  birth_date: '-',
		  religion: '-',
		  marital_status: '-',
		  id_number: '-',
		  npwp_number: '-',
		  ptkp_status: '-',
		  bank_account_no: '-',
		  bank_name: '-',
		  bank_holder_name: '-',
		  address: '-',
		  phone: '-',
		  mobile_phone: '-',
		  business_phone: '-',
		  email: '-',
		  rd: '-',
		  rm: '-',
		  sm: '-',
		  dm: '-',
		  recruiter: '-',
		  office_name: '-',
		  aaji_number: '-',
		  aaji_expired_date: '-',
		  user : [],
		  userLevel: ['Tokio Marine Management','Branch Admin','Senior Regional Sales Head','Regional Sales Head','Regional Director','Regional Manager','District Manager','Sales Manager','Financial Consultant', 'Tokio Marine Sub Management','Takumi Director', 'Takumi Manager', 'Takumi Consultant','Executive Takumi Consultant','Senior Takumi Consultant','Regional Bancassurance Manager','Executive Bancassurance Consultant','Senior Bancassurance Consultant','Bancassurance Consultant']
	}

	componentDidMount = () => {
		NProgress.start();
		$.ajax({
            url: api_route.profile,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
              NProgress.done();
              this.setState({
              	agent_profile:response.content.agent_profile,
              	first_name: response.content.user.first_name,
				  code: response.content.agent_profile.code,
				  status:  response.content.agent_profile.status,
				  gender: response.content.agent_profile.gender,
				  birth_date: DateFormat(response.content.agent_profile.birth_date),
				  religion: response.content.agent_profile.religion,
				  marital_status: response.content.agent_profile.marital_status,
				  id_number: response.content.agent_profile.id_number,
				  npwp_number: response.content.agent_profile.npwp_number,
				  ptkp_status: response.content.agent_profile.ptkp_status,

		  // di set kalo null ga tampil 
		  bank_account_no: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_no : '-'),
		  bank_name: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].name : '-'),
		  bank_holder_name: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_holder_name : '-'),
		  address: (response.content.agent_profile.address_set[0] ? response.content.agent_profile.address_set[0].address : '-'),
		  mobile_phone: (response.content.agent_profile.phone_set[0] ? response.content.agent_profile.phone_set[0].number : '-'),
		  business_phone: (response.content.agent_profile.phone_set[1] ? response.content.agent_profile.phone_set[1].number : '-'),

				  email: response.content.user.email,
				  aaji_number: response.content.agent_profile.aaji_number,
				  aaji_expired_date: DateFormat(response.content.agent_profile.aaji_expired_date),
              	  user:response.content.user,
              	  level:response.content.user.level.parent,

		  // di set kalo null ga tampil 
		  rd: response.content.user.level.parent[1] ? response.content.user.level.parent[1].user : '-',
		  rm: response.content.user.level.parent[2] ? response.content.user.level.parent[2].user : '-',
		  sm: response.content.user.level.parent[3] ? response.content.user.level.parent[4].user : '-',
		  dm: response.content.user.level.parent[4] ? response.content.user.level.parent[3].user : '-',
              });
            },
            error: (err, response) => {
              NProgress.done();
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
              
            }
        });
	}

	render(){
		let agent_level = '-';
		if(this.state.agent_profile)
		{
			if($.isNumeric(this.state.user.level.type)){
				agent_level = this.state.userLevel[parseInt(this.state.user.level.type) - 1];
			}
			else
			{
				agent_level = this.state.agent_profile.user.Level.type;	
			}
		}

		
		return (
			<div className="wrap2">

			{/* Start Top Menu Section */}
			<TopMenu username={this.state.data && this.state.data.name} lastlogin={this.state.data && this.state.data.last_login}/>
			{/* End Top Menu Section */}

			<div className="main-wrapper">
				<div className="main">
					<div className="container-fluid personalData">
						<div className="title"><i className="fa fa-user"></i> Personal Data</div>
						<div className="row">
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">Agent Name</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.first_name} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Agent Code</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.code} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Agent Level</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={agent_level} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Agent Status</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.status} disabled />
									</div>
								</div>
							</form>
						  </div>
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">Sex</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="sex" value={this.state.gender} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Birthdate</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.birth_date} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Religion</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="religion" value={this.state.religion} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Marital Status</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="marital_status" value={this.state.marital_status} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">ID No.</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.id_number} />
									</div>
								</div>
							</form>
						  </div>
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">NPWP No.</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.npwp_number} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">PTKP Status</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.ptkp_status} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Bank Account No.</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.bank_account_no} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">Bank Name</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.bank_name} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4 twoline">Account Holder Name</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.bank_holder_name} />
									</div>
								</div>
							</form>
						  </div>
						</div>
					</div>
					
					<div className="container-fluid supportData">
						<div className="row">
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title"><i className="fa fa-phone"></i> Contact</div>
									<div className="col-xs-12">
										<form className="form-horizontal">
											<div className="form-group">
												<label className="col-sm-4 twoline">Address</label>
												<div className="col-sm-8">
													<textarea className="form-control" rows="2" value={this.state.address} ></textarea>
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Phone</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.phone} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Mobile Phone</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.mobile_phone} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Business Phone</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.business_phone} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Email Address</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.email} />
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title"><i className="fa fa-bar-chart"></i> Status</div>
									<div className="col-xs-12">
										<form className="form-horizontal">
											<div className="form-group">
												<label className="col-sm-4 twoline">RD</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.rd} disabled />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">RM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.rm} disabled />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">SM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.sm} disabled />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">DM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.dm} disabled />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">Recruiter</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.recruiter} disabled />
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title"><i className="fa fa-bar-chart"></i> Agent Status</div>
									<div className="col-xs-12">
										<form className="form-horizontal">
											<div className="form-group">
												<label className="col-sm-4 twoline">Office Name</label>
												<div className="col-sm-8">
													<textarea className="form-control" rows="2" value={this.state.office_name} disabled ></textarea>
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">AAJI No.</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.aaji_number} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">AAJI Expired</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" id="AAJI-EX" value={this.state.aaji_expired_date} />
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="buttonAction">
						<button type="button" className="btn btn-primary"><i className="fa fa-check"></i> Update Profile</button>
					</div>
					
				</div>
			</div>
			
			<Footer />
			
		</div>
		);
	}
}

export default profile_update;