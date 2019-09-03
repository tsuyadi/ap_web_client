'use strict'

import {decimalFormat} from '../../common_components/helper/formatter';
import {MoneyFormat} from '../../common_components/helper/formatter';

class GroupMonthlyReport extends React.Component {
	constructor(props){
		super(props);
	this.state = {
			data : null
		}
	}

	componentWillReceiveProps(p){
		this.setState({
	        data: p.data
	    });
	}

	componentDidMount = () => {
		$('[data-toggle="tooltip"]').tooltip();
	}

	render(){

		if(this.state.data == undefined && this.state.data == null){
			if(this.props.data != undefined && this.props.data != null){
				this.state.data = this.props.data;
			}
		}

		// // debugger;
		var vMNRP = this.state.data && this.state.data.manpower.mtd.new_recruit_personal;
		var vMNRG = this.state.data && this.state.data.manpower.mtd.new_recruit_group;
		var vMNRA = this.state.data && this.state.data.manpower.mtd.new_recruit_active;
		var vMP = this.state.data && this.state.data.manpower.mtd.promotion;
		var vMD = this.state.data && this.state.data.manpower.mtd.demotion;
		var vMTM = this.state.data && this.state.data.manpower.mtd.terminated;
		var vMEMP = this.state.data && this.state.data.manpower.mtd.end_man;
		var vMTotalMM = this.state.data && this.state.data.manpower.mtd.total_man;
		var vMActiveMM = this.state.data && this.state.data.manpower.mtd.validate_active_man;
		var vMAR = this.state.data && this.state.data.manpower.mtd.activity_ratio;
		var vMMAPR = this.state.data && this.state.data.manpower.mtd.mapr;
		var vMMAAPR = this.state.data && this.state.data.manpower.mtd.maapr;
		var vMMASPR = this.state.data && this.state.data.manpower.mtd.maspr;
		var vMMAASPR = this.state.data && this.state.data.manpower.mtd.maaspr;

		var vYNRP = this.state.data && this.state.data.manpower.ytd.new_recruit_personal;
		var vYNRG = this.state.data && this.state.data.manpower.ytd.new_recruit_group;
		var vYNRA = this.state.data && this.state.data.manpower.ytd.new_recruit_active;
		var vYP = this.state.data && this.state.data.manpower.ytd.promotion;
		var vYD = this.state.data && this.state.data.manpower.ytd.demotion;
		var vYTM = this.state.data && this.state.data.manpower.ytd.terminated;
		var vYEMP = this.state.data && this.state.data.manpower.ytd.end_man;
		var vYTotalMM = this.state.data && this.state.data.manpower.ytd.total_man;
		var vYActiveMM = this.state.data && this.state.data.manpower.ytd.validate_active_man;
		var vYAR = this.state.data && this.state.data.manpower.ytd.activity_ratio;
		var vYMAPR = this.state.data && this.state.data.manpower.ytd.mapr;
		var vYMAAPR = this.state.data && this.state.data.manpower.ytd.maapr;
		var vYMASPR = this.state.data && this.state.data.manpower.ytd.maspr;
		var vYMAASPR = this.state.data && this.state.data.manpower.ytd.maaspr;
		var vYTransferAgentIn = this.state.data && this.state.data.manpower.ytd.transfer_in;
		var vYTransferAgentOut = this.state.data && this.state.data.manpower.ytd.transfer_out;
		// // debugger;

		$('.manpower-popover').popover({
			animation:true
		});

		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-search-plus"></i>[{this.state.data && this.state.data.specific_data.monthly_report.month_period}] Manpower Report</div>
			<div className="entry">

				<div className="tab-mobile hidden-md hidden-lg">
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
										<td className="header_table">New Recruit Personal</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMNRP || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">New Recruit Group</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMNRG || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">New Recruit Active</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMNRA || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Promosi</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMP || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Demosi</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMD || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Terminated</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMTM || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Total Manpower</td>
										<td className="bullet "><span>{vMEMP || 0}</span></td>
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
										<td className="header_table">New Recruit Personal</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYNRP || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">New Recruit Group</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYNRG || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">New Recruit Active</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYNRA || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Promosi</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYP || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Demosi</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYD || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Terminated</td>
										<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYTM || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Total Manpower</td>
										<td className="bullet "><span>{vYEMP || 0}</span></td>
									</tr>
								</tbody>
							</table>
							</div>
						</div>
					</div>
				</div>

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
										<td className="header_table">Total Man Month</td>
										<td className="text-right bullet "><span>{vMTotalMM || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Validated Active Agent</td>
										<td className="text-right bullet "><span>{vMActiveMM || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Activity Ratio</td>
										<td className="text-right bullet "><span>{vMAR || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">MAPR</td>
										<td className="text-right bullet "><span>{vMMAPR || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">MAAPR</td>
										<td className="text-right bullet "><span>{vMMAAPR || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">MA$PR</td>
										<td className="text-right bullet">{MoneyFormat(vMMASPR) || 0}</td>
									</tr>
									<tr>
										<td className="header_table">MAA$PR</td>
										<td className="text-right bullet">{MoneyFormat(vMMAASPR) || 0}</td>
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
										<td className="header_table">Total Man Month</td>
										<td className="text-right bullet "><span>{vYTotalMM || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Validated Active Agent</td>
										<td className="text-right bullet "><span>{vYActiveMM || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">Activity Ratio</td>
										<td className="text-right bullet "><span>{vYAR || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">MAPR</td>
										<td className="text-right bullet "><span>{vYMAPR || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">MAAPR</td>
										<td className="text-right bullet "><span>{vYMAAPR || 0}</span></td>
									</tr>
									<tr>
										<td className="header_table">MA$PR</td>
										<td className="text-right bullet">{MoneyFormat(vYMASPR) || 0}</td>
									</tr>
									<tr>
										<td className="header_table">MAA$PR</td>
										<td className="text-right bullet">{MoneyFormat(vYMAASPR) || 0}</td>
									</tr>
								</tbody>
							</table>
							</div>
						</div>
					</div>
				</div>
				
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
							<td>New Recruit Personal</td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMNRP || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYNRP || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
						</tr>
						<tr>
							<td>New Recruit Group</td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMNRG || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYNRG || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
						</tr>
						<tr>
							<td>New Recruit Active</td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMNRA || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYNRA || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
						</tr>
						<tr>
							<td>Promosi</td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMP || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYP || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
						</tr>
						<tr>
							<td>Demosi</td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMD || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYD || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
						</tr>
						<tr>
							<td>Terminated</td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vMTM || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
							<td className="bullet "><span>{'\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + vYTM || '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + 0}</span></td>
						</tr>
						<tr>
							<td>Total Manpower</td>
							<td className="bullet "><span>{vMEMP || 0}</span></td>
							<td className="bullet "><span>{vYEMP || 0}</span></td>
						</tr>
					</tbody>
				</table>
				</div>
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
							<td>Total Man Month</td>
							<td className="text-right bullet "><span>{vMTotalMM || 0}</span></td>
							<td className="text-right bullet "><span>{vYTotalMM || 0}</span></td>
						</tr>
						<tr>
							<td>Validated Active Agent</td>
							<td className="text-right bullet "><span>{vMActiveMM || 0}</span></td>
							<td className="text-right bullet "><span>{vYActiveMM || 0}</span></td>
						</tr>
						<tr>
							<td>Activity Ratio</td>
							<td className="text-right bullet "><span>{vMAR || 0}</span></td>
							<td className="text-right bullet "><span>{vYAR || 0}</span></td>
						</tr>
						<tr>
							<td>MAPR</td>
							<td className="text-right bullet "><span>{vMMAPR || 0}</span></td>
							<td className="text-right bullet "><span>{vYMAPR || 0}</span></td>
						</tr>
						<tr>
							<td>MAAPR</td>
							<td className="text-right bullet "><span>{vMMAAPR || 0}</span></td>
							<td className="text-right bullet "><span>{vYMAAPR || 0}</span></td>
						</tr>
						<tr>
							<td>MA$PR</td>
							<td className="text-right bullet">{MoneyFormat(vMMASPR) || 0}</td>
							<td className="text-right bullet">{MoneyFormat(vYMASPR) || 0}</td>
						</tr>
						<tr>
							<td>MAA$PR</td>
							<td className="text-right bullet">{MoneyFormat(vMMAASPR) || 0}</td>
							<td className="text-right bullet">{MoneyFormat(vYMAASPR) || 0}</td>
						</tr>
					</tbody>
				</table>
				</div>
			</div>
		</div>
		);
	}
}

export default GroupMonthlyReport;