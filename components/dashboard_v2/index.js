'use strict'

import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';

import TopMenu from '../../common_components/menu_v2/top_menu';
import AgentProfile from './agent_profile';
import NewBusinessTrackingSummary from './new_business_tracking_summary';
import Production from './production';
import Persistency from './persistency';
import WeeklyBonus from './weekly_bonus';
import YearEndBonus from './year_end_bonus';

class dashboard extends React.Component {
	constructor(props){
		super(props);
		
	}

	componentWillMount = () => {
		CekAuth();
	}

	componentDidMount = () => {
		NProgress.start();
		$.ajax({
            url: api_route.agentDashboardv2,
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
            error: (err, response) => {
              NProgress.done();
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
              
            }
        });
	}

	state = {
		data: null
	}

	render(){
		
		let weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : null;
		let weekly_qc_commission = [];
		if(weekly_qc_commission_table)
		{
			$.map(weekly_qc_commission_table, (value, index) => {
	            let row = null;
	            if(index == 0){
	              row = <tr className="red" key={index}><td>{value.total_qc}</td><td className="down"><i className="fa fa-level-down"></i> {value.percentage}</td><td>{value.bonus}<i className="fa fa-arrow-left"></i></td></tr>
	            }else{
	              row = <tr key={index}><td>{value.total_qc}</td><td className="down"><i className="fa fa-level-down"></i> {value.percentage}</td><td>{value.bonus}</td></tr>
	            }
	            weekly_qc_commission.push(row);
	          }); 		
		}

		return (
		<div className="wrap2">
			
			{/* Start Top Menu Section */}
			<TopMenu username={this.state.data && this.state.data.name} lastlogin={this.state.data && this.state.data.last_login}/>
			{/* End Top Menu Section */}

			<div className="main-wrapper">
				<ol className="breadcrumb" style={{marginBottom: '5px'}}>
					 <li className="active">Dashboard</li>
				</ol>
				<div className="main">
					<div className="topWidget">
						<div className="row">
							<div className="col-xs-6 responsive3">
								{/* Start Agent Profile Section */}
								<AgentProfile data={this.state.data && this.state.data} />
								{/* End Agent Profile Section */}
							</div>
							<div className="col-xs-6 responsive3">
								{/* Start New Business Tracking Summary Section */}
								<NewBusinessTrackingSummary data={this.state.data && this.state.data} />
								{/* End New Business Tracking Summary Section */}
							</div>
						</div>
						
						<div className="clearfix h25"></div>
						
						<div className="row">
							<div className="col-xs-6 responsive3">
								{/* Start Production Section */}
								<Production data={this.state.data && this.state.data} />
								{/* End Production Section */}
							</div>
							<div className="col-xs-6 responsive3">
								{/* Start Production Section */}
								<Persistency data={this.state.data && this.state.data} />
								{/* End Production Section */}
							</div>
						</div>
						
						<div className="clearfix h25"></div>
						
						<div className="bottomWidget">
							<div className="title">Income Calculation</div>
							<div className="content">
								<div className="row">
								  <div className="col-xs-7 responsive3">
									{/* Start Weekly Bonus Section */}
									<WeeklyBonus data={this.state.data && this.state.data} />
									{/* End Weekly Bonus Section */}
								  </div>
								  
								  <div className="col-xs-5 responsive3">
								  	{/* Start Weekly Bonus Section */}
									<YearEndBonus data={this.state.data && this.state.data} />
									{/* End Weekly Bonus Section */}
								  </div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>
			
			<div className="footer-wrapper">
				<div className="footer">
					<div className="disclaimer">
						
					</div>
					
					<div className="copyright">
						&copy; 2017 TMLI Agency Portal - Powered by TMLI
					</div>
				</div>
			</div>
			
			<div className="modal fade" id="newbusiness" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content">
					<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<tbody>
								<tr>
									<th>No</th>
									<th>Information</th>
								</tr>
								<tr>
									<td>1</td>
									<td>No SPAJ</td>
								</tr>
								<tr>
									<td>2</td>
									<td>No Policy (Jika sudah terbentuk)</td>
								</tr>
								<tr>
									<td>3</td>
									<td>Nama Policy Holder</td>
								</tr>
								<tr>
									<td>4</td>
									<td>Status SPAJ</td>
								</tr>
								<tr>
									<td>5</td>
									<td>Alasan (Hanya untuk status Pending)</td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			  </div>
			</div>
			
			<div className="modal fade" id="persistency" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content">
					<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<tr>
								<th colSpan="2">Persistency Personal</th>
							</tr>
							<tr>
								<td>1</td>
								<td>No SPAJ</td>
							</tr>
							<tr>
								<td>2</td>
								<td>No Policy (Jika sudah terbentuk)</td>
							</tr>
						</table>
					</div>
				</div>
			  </div>
			</div>
			
			<div className="modal fade" id="weeklyBonus" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content">
					<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<thead>
								<tr>
									<th>Total 12 rolling week QC</th>
									<th>% of FYC</th>
									<th>Total Bonus</th>
								</tr>
							</thead>
							<tbody>
								{weekly_qc_commission}
							</tbody>
						</table>
					</div>
				</div>
			  </div>
			</div>
			
		</div>
		);
	}
}

export default dashboard;