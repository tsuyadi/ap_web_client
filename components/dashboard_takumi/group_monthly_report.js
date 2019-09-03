'use strict'
import api_route from '../../common_components/api_route';
import {decimalFormat,MoneyFormat} from '../../common_components/helper/formatter';

class GroupMonthlyReport extends React.Component {
	constructor(props){
		super(props);
	this.state = {
			data : null
		}
		//this.getDataManpower = this.getDataManpower.bind(this);
	}

	componentWillMount(){
		$.ajax({
            url: api_route.manpower,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');
              		this.setState({
					data:response.manpower_takumi,
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

	render(){
		let data = this.state.data && this.state.data;
		let mtd = [];
		let ytd=[];
		let new_recruit_active_30= 0;
		let new_recruit_active_60 = 0;
		if(data && data.length > 0 || data != null){
				new_recruit_active_30 = data.new_recruit_active_30 == 0 || isNaN(data.new_recruit_active_30) ? 0 : (data.new_recruit_active_30 +' %');
				new_recruit_active_60 = data.new_recruit_active_60 == 0 || isNaN(data.new_recruit_active_60) ? 0 : (data.new_recruit_active_60 +' %');
				
				mtd = {
					active_agent: data.active_agent_mtd == 0 || isNaN(data.active_agent_mtd) ? 0 : data.active_agent_mtd,
					active_agent_man_month: data.active_agent_man_month_mtd == 0 || isNaN(data.active_agent_man_month_mtd) ? '-' : data.active_agent_man_month_mtd,
					activity_ratio: data.activity_ratio_mtd == 0 || isNaN(data.activity_ratio_mtd) ? 0 : data.activity_ratio_mtd,
					effective_agent: data.effective_agent_mtd == 0 || isNaN(data.effective_agent_mtd) ? 0 : data.effective_agent_mtd,
					effective_agent_man_month: data.effective_agent_man_month_mtd == 0 || isNaN(data.effective_agent_man_month_mtd) ? '-' : data.effective_agent_man_month_mtd,
					effective_ratio: data.effective_ratio_mtd == 0 || isNaN(data.effective_ratio_mtd) ? 0 : data.effective_ratio_mtd,
					maapr: data.maapr_mtd == 0 || isNaN(data.maapr_mtd) ? 0 : data.maapr_mtd,
					mapr: data.mapr_mtd == 0 || isNaN(data.mapr_mtd) ? 0 : data.mapr_mtd
				}
				ytd = {
					active_agent: data.active_agent_ytd == 0 || isNaN(data.active_agent_ytd) ? '-' : data.active_agent_ytd,
					active_agent_man_month: data.active_agent_man_month_ytd == 0 || isNaN(data.active_agent_man_month_ytd) ? 0 : data.active_agent_man_month_ytd,
					activity_ratio: data.activity_ratio_ytd == 0 || isNaN(data.activity_ratio_ytd) ? 0 : data.activity_ratio_ytd,
					effective_agent: data.effective_agent_ytd == 0 || isNaN(data.effective_agent_ytd) ? '-' : data.effective_agent_ytd,
					effective_agent_man_month: data.effective_agent_man_month_ytd == 0 || isNaN(data.effective_agent_man_month_ytd) ? 0 : data.effective_agent_man_month_ytd,
					effective_ratio: data.effective_ratio_ytd == 0 || isNaN(data.effective_ratio_ytd) ? 0 : data.effective_ratio_ytd,
					maapr: data.maapr_ytd == 0 || isNaN(data.maapr_ytd) ? 0 : data.maapr_ytd,
					mapr: data.mapr_ytd == 0 || isNaN(data.mapr_ytd) ? 0 : data.mapr_ytd
				}
		}
	return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-search-plus"></i>Manpower Report</div>
			<div className="box-summary">
				<div className="entry">
					{/* <div className="tab-mobile hidden-md hidden-lg">
						<ul className="nav nav-tabs" role="tablist">
							<li role="presentation" className="active"><a href="#monthly_report_mtd" aria-controls="mtd" role="tab" data-toggle="tab">MTD</a></li>
							<li role="presentation"><a href="#monthly_report_ytd" aria-controls="ytd" role="tab" data-toggle="tab">YTD</a></li>
						</ul>
						<div className="tab-content">
							<div role="tabpanel" className="tab-pane active" id="monthly_report_mtd">
							<div style={{'overflowX':'auto'}}>
								<table className="table table-striped cpadding">
									<thead>
										<tr className="header_table">
											<th className="header_table" style={{'width':'30vh!important'}}></th>
											<th className="text-center">MTD</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="header_table">Start Man Power</td>
											<td className="bullet"><span>{mtd.start_mp_mtd}</span></td>
										</tr>
										<tr>
											<td className="header_table" style={{textIndent:'10px'}}>New Recruit</td>
											<td className="bullet"><span>{mtd.new_recruit}</span></td>
										</tr>
										<tr>
											<td className="header_table" style={{textIndent:'10px'}}>Reactivate Agent</td>
											<td className="bullet"><span>{mtd.reactive_agent}</span></td>
										</tr>
										<tr>
											<td className="header_table" style={{textIndent:'10px'}}>Terminated</td>
											<td className="bullet "><span>{mtd.terminated}</span></td>
										</tr>
										<tr>
											<td className="header_table" style={{textIndent:'10px'}}>Transfer Agent</td>
											<td className="bullet "><span>{mtd.transfer_agent}</span></td>
										</tr>
										<tr>
											<td className="header_table">End Man Power</td>
											<td className="bullet "><span>{mtd.end_mp}</span></td>
										</tr>
									</tbody>
								</table>
								</div>
							</div>						
							<div role="tabpanel" className="tab-pane" id="monthly_report_ytd">
							<div style={{'overflowX':'auto'}}>
								<table className="table table-striped cpadding">
									<thead>
										<tr className="header_table ">
											<th className="header_table"  style={{'width':'30vh!important'}}></th>
											<th className="text-center">YTD</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="header_table">Start Man Power</td>
											<td className="bullet"><span>{ytd.start_mp}</span></td>
										</tr>
										<tr>
											<td className="header_table" style={{textIndent:'10px'}}>New Recruit</td>
											<td className="bullet"><span>{ytd.new_recruit}</span></td>
										</tr>
										<tr>
											<td className="header_table" style={{textIndent:'10px'}}>Reactivate Agent</td>
											<td className="bullet"><span>{ytd.reactive_agent}</span></td>
										</tr>
										<tr>
											<td className="header_table" style={{textIndent:'10px'}}>Terminated</td>
											<td className="bullet "><span>{ytd.terminated}</span></td>
										</tr>
										<tr>
											<td className="header_table" style={{textIndent:'10px'}}>Transfer Agent</td>
											<td className="bullet "><span>{ytd.transfer_agent}</span></td>
										</tr>
										<tr>
											<td className="header_table">End Man Power</td>
											<td className="bullet "><span>{ytd.end_mp}</span></td>
										</tr>
									</tbody>
								</table>
								</div>
							</div>
						</div>
					</div> */}

					<div className="tab-mobile hidden-md hidden-lg">
						<ul className="nav nav-tabs" role="tablist">
							<li role="presentation" className="active"><a href="#monthly_reports_mtd" aria-controls="mtd" role="tab" data-toggle="tab">MTD</a></li>
							<li role="presentation"><a href="#monthly_reports_ytd" aria-controls="ytd" role="tab" data-toggle="tab">YTD</a></li>
						</ul>
						<div className="tab-content">
							<div role="tabpanel" className="tab-pane active" id="monthly_reports_mtd">
							<div style={{'overflowX':'auto'}}>
								<table className="table table-striped cpadding">
									<thead>
										<tr>
											<th className="header_table"  style={{'width':'30vh!important'}}></th>
											<th className="header_table text-center">MTD</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="header_table"> Active Agent</td>
											<td className="bullet "><span>{mtd.active_agent}</span></td>
										</tr>
										<tr>
											<td className="header_table">Active Agent Man Month</td>
											<td className="bullet "><span>{mtd.active_agent_man_month}</span></td>
										</tr>
										<tr>
											<td className="header_table">Effective Agent</td>
											<td className="bullet "><span>{mtd.effective_agent}</span></td>
										</tr>
										<tr>
											<td className="header_table">Effective Agent Man Month</td>
											<td className="bullet "><span>{mtd.effective_agent_man_month}</span></td>
										</tr>
										<tr>
											<td className="header_table">Activity Ratio</td>
											<td className="bullet "><span>{mtd.activity_ratio+' %'}</span></td>
										</tr>
										{/* <tr>
											<td className="header_table">Effective Ratio</td>
											<td className="bullet"><span>{mtd.effective_ratio}</span></td>
										</tr> */}
										<tr>
											<td className="header_table">MAPR</td>
											<td className="bullet"><span>{mtd.mapr}</span></td>
										</tr>
										<tr>
											<td className="header_table">MAAPR</td>
											<td className="bullet"><span>{mtd.maapr}</span></td>
										</tr>
										<tr>
											<td className="header_table">New Recruit Active 30 days </td>
											<td className="bullet"><span>{new_recruit_active_30}</span></td>
										</tr>
										<tr>
											<td className="header_table">New Recruit Active 60 days </td>
											<td className="bullet"><span>{new_recruit_active_60}</span></td>
										</tr>
									</tbody>
								</table>
								</div>
							</div>						
							<div role="tabpanel" className="tab-pane" id="monthly_reports_ytd">
							<div style={{'overflowX':'auto'}}>
								<table className="table table-striped cpadding">
									<thead>
										<tr>
											<th className="header_table"  style={{'width':'30vh!important'}}></th>
											<th className="header_table text-center">YTD</th>
										</tr>
									</thead>
									<tbody>
										<tr>
											<td className="header_table"> Active Agent</td>
											<td className="bullet "><span>{ytd.active_agent}</span></td>
										</tr>
										<tr>
											<td className="header_table">Active Agent Man Month</td>
											<td className="bullet "><span>{ytd.active_agent_man_month}</span></td>
										</tr>
										<tr>
											<td className="header_table">Effective Agent</td>
											<td className="bullet "><span>{ytd.effective_agent}</span></td>
										</tr>
										<tr>
											<td className="header_table">Effective Agent Man Month</td>
											<td className="bullet "><span>{ytd.effective_agent_man_month}</span></td>
										</tr>
										<tr>
											<td className="header_table">Activity Ratio</td>
											<td className="bullet "><span>{ytd.activity_ratio+' %'}</span></td>
										</tr>
										{/* <tr>
											<td className="header_table">Effective Ratio</td>
											<td className="bullet"><span>{ytd.effective_ratio}</span></td>
										</tr> */}
										<tr>
											<td className="header_table">MAPR</td>
											<td className="bullet"><span>{ytd.mapr}</span></td>
										</tr>
										<tr>
											<td className="header_table">MAAPR</td>
											<td className="bullet"><span>{ytd.maapr}</span></td>
										</tr>
										<tr>
											<td className="header_table">New Recruit Active 30 days </td>
											<td className="bullet"><span>{new_recruit_active_30}</span></td>
										</tr>
										<tr>
											<td className="header_table">New Recruit Active 60 days </td>
											<td className="bullet"><span>{new_recruit_active_60}</span></td>
										</tr>
									</tbody>
								</table>
								</div>
							</div>
						</div>
					</div>

					{/* <div style={{'overflowX':'auto'}}>
						<table className="table table-striped forbullet table-box table-bordered hidden-xs hidden-sm">
							<thead>
								<tr>
									<th className="header_table"></th>
									<th className="header_table">MTD</th>
									<th className="header_table">YTD</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="header_table">Start Man Power</td>
									<td className="bullet"><span>{mtd.start_mp}</span></td>
									<td className="bullet"><span>{ytd.start_mp}</span></td>
								</tr>
								<tr>
									<td className="header_table" style={{textIndent:'10px'}}>New Recruit</td>
									<td className="bullet"><span>{mtd.new_recruit}</span></td>
									<td className="bullet"><span>{ytd.new_recruit}</span></td>
								</tr>
								<tr>
									<td className="header_table" style={{textIndent:'10px'}}>Reactivate Agent</td>
									<td className="bullet"><span>{mtd.reactive_agent}</span></td>
									<td className="bullet"><span>{ytd.reactive_agent}</span></td>
								</tr>
								<tr>
									<td className="header_table" style={{textIndent:'10px'}}>Terminated</td>
									<td className="bullet"><span>{mtd.terminated}</span></td>
									<td className="bullet"><span>{ytd.terminated}</span></td>
								</tr>
								<tr>
									<td className="header_table" style={{textIndent:'10px'}}>Transfer Agent</td>
									<td className="bullet"><span>{mtd.transfer_agent}</span></td>
									<td className="bullet"><span>{ytd.transfer_agent}</span></td>
								</tr>
								<tr>
									<td className="header_table">End Man Power</td>
									<td className="bullet "><span>{mtd.end_mp}</span></td>
									<td className="bullet "><span>{ytd.end_mp}</span></td>
								</tr>
							</tbody>
						</table>
					</div> */}

					<div style={{'overflowX':'auto'}}>
						<table className="table table-striped forbullet table-box table-bordered hidden-xs hidden-sm">
							<thead>
								<tr>
									<th className="header_table"></th>
									<th className="header_table">MTD</th>
									<th className="header_table">YTD</th>
								</tr>
							</thead>
							<tbody>
								<tr>
									<td className="header_table"> Active Agent</td>
									<td className="bullet "><span>{mtd.active_agent}</span></td>
									<td className="bullet "><span>{ytd.active_agent}</span></td>
								</tr>
								<tr>
									<td className="header_table">Active Agent Man Month</td>
									<td className="bullet "><span>{mtd.active_agent_man_month}</span></td>
									<td className="bullet "><span>{ytd.active_agent_man_month}</span></td>
								</tr>
								<tr>
									<td className="header_table">Effective Agent</td>
									<td className="bullet "><span>{mtd.effective_agent}</span></td>
									<td className="bullet "><span>{ytd.effective_agent}</span></td>
								</tr>
								<tr>
									<td className="header_table">Effective Agent Man Month</td>
									<td className="bullet "><span>{mtd.effective_agent_man_month}</span></td>
									<td className="bullet "><span>{ytd.effective_agent_man_month}</span></td>
								</tr>
								<tr>
									<td className="header_table">Activity Ratio</td>
									<td className="bullet "><span>{mtd.activity_ratio+' %'}</span></td>
									<td className="bullet "><span>{ytd.activity_ratio+' %'}</span></td>
								</tr>
								{/* <tr>
									<td className="header_table">Effective Ratio</td>
									<td className="bullet"><span>{mtd.effective_ratio}</span></td>
									<td className="bullet"><span>{ytd.effective_ratio}</span></td>
								</tr> */}
								<tr>
									<td className="header_table">MAPR</td>
									<td className="bullet"><span>{mtd.mapr}</span></td>
									<td className="bullet"><span>{ytd.mapr}</span></td>
								</tr>
								<tr>
									<td className="header_table">MAAPR</td>
									<td className="bullet"><span>{mtd.maapr}</span></td>
									<td className="bullet"><span>{ytd.maapr}</span></td>
								</tr>
								<tr>
									<td className="header_table">New Recruit Active 30 days </td>
									<td colSpan="2"><span>{new_recruit_active_30}</span></td>
								</tr>
								<tr>
									<td className="header_table">New Recruit Active 60 days </td>
									<td colSpan="2"><span>{new_recruit_active_60}</span></td>
								</tr>
							</tbody>
						</table>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default GroupMonthlyReport;