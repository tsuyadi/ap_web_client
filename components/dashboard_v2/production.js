'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';

class Production extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : null,
			activeIndexWeek : 0,
			activeIndexMonth : 0,
			activeIndexYear : 0	
		};

		this.onPieEnterWTD = this.onPieEnterWTD.bind(this);
		this.onPieEnterMTD = this.onPieEnterMTD.bind(this);
		this.onPieEnterYTD = this.onPieEnterYTD.bind(this);
	}

	componentWillReceiveProps(p){
		this.setState({
	        data: p.data
	    });
	}

	onPieEnterWTD(data, index) {
		this.setState({
		activeIndexWeek: index,
		});
	}

	onPieEnterMTD(data, index) {
		this.setState({
		activeIndexMonth: index,
		});
	}

	onPieEnterYTD(data, index) {
		this.setState({
		activeIndexYear: index,
		});
	}

	downloadReport(url){
		if(url != '' && url != null){
			// // debugger;
			window.location.href=url;
		}
	}

	render(){

		if(this.state.data == undefined && this.state.data == null){
			if(this.props.data != undefined && this.props.data != null){
				this.state.data = this.props.data;
			}
		}

		var weekly_fyp =  parseInt(this.state.data && this.state.data.production.fyp.wtd.fyp_personal_weekly_to_date);
		var weekly_fyc = parseInt(this.state.data && this.state.data.production.fyc.wtd.fyc_personal_weekly_to_date);
		var weekly_fyap = parseInt(this.state.data && this.state.data.production.afyp.wtd.afyp_personal_weekly_to_date);
		var weekly_fyac = parseInt(this.state.data && this.state.data.production.afyc.wtd.afyc_personal_weekly_to_date);

		var monthly_fyp = parseInt(this.state.data && this.state.data.production.fyp.mtd.fyp_personal_monthly_to_date);
		var monthly_fyc = parseInt(this.state.data && this.state.data.production.fyc.mtd.fyc_personal_monthly_to_date);
		var monthly_fyap = parseInt(this.state.data && this.state.data.production.afyp.mtd.afyp_personal_monthly_to_date);
		var monthly_fyac = parseInt(this.state.data && this.state.data.production.afyc.mtd.afyc_personal_monthly_to_date);

		var yearly_fyp = parseInt(this.state.data && this.state.data.production.fyp.ytd.fyp_personal_yearly_to_date);
		var yearly_fyc = parseInt(this.state.data && this.state.data.production.fyc.ytd.fyc_personal_yearly_to_date);
		var yearly_fyap = parseInt(this.state.data && this.state.data.production.afyp.ytd.afyp_personal_yearly_to_date);
		var yearly_fyac = parseInt(this.state.data && this.state.data.production.afyc.ytd.afyc_personal_yearly_to_date);
		
		weekly_fyp = isNaN(weekly_fyp) ? 0 : weekly_fyp;
		weekly_fyc = isNaN(weekly_fyc) ? 0 : weekly_fyc;
		weekly_fyap = isNaN(weekly_fyap) ? 0 : weekly_fyap;
		weekly_fyac = isNaN(weekly_fyac) ? 0 : weekly_fyac;

		monthly_fyp = isNaN(monthly_fyp) ? 0 : monthly_fyp;
		monthly_fyc = isNaN(monthly_fyc) ? 0 : monthly_fyc;
		monthly_fyap = isNaN(monthly_fyap) ? 0 : monthly_fyap;
		monthly_fyac = isNaN(monthly_fyac) ? 0 : monthly_fyac;

		yearly_fyp = isNaN(yearly_fyp) ? 0 : yearly_fyp;
		yearly_fyc = isNaN(yearly_fyc) ? 0 : yearly_fyc;
		yearly_fyap = isNaN(yearly_fyap) ? 0 : yearly_fyap;
		yearly_fyac = isNaN(yearly_fyac) ? 0 : yearly_fyac;

		var data_production_wtd = [{name: 'FYP', value: weekly_fyp}, {name: 'FYC', value: weekly_fyc},
                  {name: 'FYAP', value: weekly_fyap}, {name: 'FYAC', value: weekly_fyac}];

		var data_production_mtd = [{name: 'FYP', value: monthly_fyp}, {name: 'FYC', value: monthly_fyc},
                  {name: 'FYAP', value: monthly_fyap}, {name: 'FYAC', value: monthly_fyac}];

		var data_production_ytd = [{name: 'FYP', value: yearly_fyp}, {name: 'FYC', value: yearly_fyc},
                  {name: 'FYAP', value: yearly_fyap}, {name: 'FYAC', value: yearly_fyac}];
		
		var chart = [];
		if(weekly_fyp != 0 && weekly_fyc != 0 && weekly_fyap != 0 && weekly_fyac != 0)
		{
			chart.push(
				<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterWTD}>
						<Pie 
							activeIndex={this.state.activeIndexWeek}
							activeShape={renderActiveShape} 
							data={data_production_wtd} 
							innerRadius={60}
							outerRadius={80} 
							fill="#07b03d">
							{
								data_production_wtd.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}

		if(monthly_fyp != 0 && monthly_fyc != 0 && monthly_fyap != 0 && monthly_fyac != 0)
		{
			chart.push(
				<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterMTD}>
						<Pie 
							activeIndex={this.state.activeIndexMonth}
							activeShape={renderActiveShape} 
							data={data_production_mtd} 
							innerRadius={60}
							outerRadius={80} 
							fill="#186fd3">
							{
								data_production_mtd.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}

		if(yearly_fyp != 0 && yearly_fyc != 0 && yearly_fyap != 0 && yearly_fyac != 0)
		{
			chart.push(
				<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterYTD}>
						<Pie 
							activeIndex={this.state.activeIndexYear}
							activeShape={renderActiveShape} 
							data={data_production_ytd} 
							innerRadius={60}
							outerRadius={80} 
							fill="#8884d8">
							{
								data_production_ytd.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}

		var production_report = [];

		if(this.props.disabled=="true"){
			production_report.push('');
		}else{
			production_report.push(''
			);
			{/*<a href="#/comission_production">
                	<button className="btn btn-warning"><i className="fa fa-download"></i> Download Production report</button>
                </a>*/}
		}

		return (
        <div className="content content-prod boxShadow">
			<div className="title textShadow"><i className="fa fa-tasks"></i> Production (Rp)</div>
			<div className="row hidden">
				<div className="col-lg-4">
					<h4 className="text-center">WTD</h4>
					<div style={{width:100 + '%', height:200 + 'px'}}>
						{chart[0]}
					</div>
				</div>
				<div className="col-lg-4">
					<h4 className="text-center">MTD</h4>
					<div style={{width:100 + '%', height:200 + 'px'}}>
						{chart[1]}
					</div>
				</div>
				<div className="col-lg-4">
					<h4 className="text-center">YTD</h4>
					<div style={{width:100 + '%', height:200 + 'px'}}>
						{chart[2]}
					</div>
				</div>
			</div>
			<div className="entry">
				{/* Part that just showed on Mobile Only */}
				<div className="tab-mobile hidden-md hidden-lg">
					<ul className="nav nav-tabs" role="tablist">
						<li role="presentation" className="active"><a href="#production_wtd" aria-controls="wtd" role="tab" data-toggle="tab">WTD</a></li>
						<li role="presentation"><a href="#production_mtd" aria-controls="mtd" role="tab" data-toggle="tab">MTD</a></li>
						<li role="presentation"><a href="#production_ytd" aria-controls="ytd" role="tab" data-toggle="tab">YTD</a></li>
					</ul>
					<div className="tab-content">
						<div role="tabpanel" className="tab-pane active" id="production_wtd">
							<table className="table table-striped cpadding">
								<thead>
									<tr className="header_table">
										<th style={{width:10 + 'px'}}></th>
										<th className=" text-center">WTD</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="header_table">FYP</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.fyp.wtd.fyp_personal_weekly_to_date)}</td>
									</tr>
									<tr>
										<td className="header_table">FYC</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.fyc.wtd.fyc_personal_weekly_to_date)}</td>
									</tr>
									{/*<tr>
										<td className="header_table">FYAP</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.afyp.wtd.afyp_personal_weekly_to_date)}</td>
									</tr>*/}
									{/*<tr>
										<td className="header_table">FYAC</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.afyc.wtd.afyc_personal_weekly_to_date)}</td>
									</tr>*/}
								</tbody>
							</table>
							
						</div>
						<div role="tabpanel" className="tab-pane" id="production_mtd">
							<table className="table table-striped cpadding">
								<thead>
									<tr className="header_table">
										<th style={{width:10 + 'px'}}></th>
										<th className=" text-center">MTD</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="header_table">FYP</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.fyp.mtd.fyp_personal_monthly_to_date)}</td>
									</tr>
									<tr>
										<td className="header_table">FYC</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.fyc.mtd.fyc_personal_monthly_to_date)}</td>
									</tr>
									{/*<tr>
										<td className="header_table">FYAP</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.afyp.mtd.afyp_personal_monthly_to_date)}</td>
									</tr>*/}
									{/*<tr>
										<td className="header_table">FYAC</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.afyc.mtd.afyc_personal_monthly_to_date)}</td>
									</tr>*/}
								</tbody>
							</table>
							
						</div>
						<div role="tabpanel" className="tab-pane" id="production_ytd">
							<table className="table table-striped cpadding">
								<thead>
									<tr className="header_table">
										<th style={{width:10 + 'px'}}></th>
										<th className=" text-center">YTD</th>
									</tr>
								</thead>
								<tbody>
									<tr>
										<td className="header_table">FYP</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.fyp.ytd.fyp_personal_yearly_to_date)}</td>
									</tr>
									<tr>
										<td className="header_table">FYC</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.fyc.ytd.fyc_personal_yearly_to_date)}</td>
									</tr>
									{/*<tr>
										<td className="header_table">FYAP</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.afyp.ytd.afyp_personal_yearly_to_date)}</td>
									</tr>*/}
									{/*<tr>
										<td className="header_table">FYAC</td>
										<td className=" text-right">{MoneyFormat(this.state.data && this.state.data.production.afyc.ytd.afyc_personal_yearly_to_date)}</td>
									</tr>*/}
								</tbody>
							</table>
							
						</div>
					</div>
				</div>
				{/* End Part */}
				<table className="table table-responsive table-box cpadding hidden-sm hidden-xs">
					<thead>
						<tr className="info">
							<th className="header_table "></th>
							<th className="header_table text-center">WTD</th>
							<th className="header_table text-center">MTD</th>
							<th className="header_table text-center">YTD</th>
						</tr>
					</thead>
					<tbody>
						<tr>
							<td className="header_table left-box">FYP</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.fyp.wtd.fyp_personal_weekly_to_date)}</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.fyp.mtd.fyp_personal_monthly_to_date)}</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.fyp.ytd.fyp_personal_yearly_to_date)}</td>
						</tr>
						<tr>
							<td className="header_table left-box">FYC</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.fyc.wtd.fyc_personal_weekly_to_date)}</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.fyc.mtd.fyc_personal_monthly_to_date)}</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.fyc.ytd.fyc_personal_yearly_to_date)}</td>
						</tr>
						{/*<tr>
							<td className="header_table left-box">FYAP</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.afyp.wtd.afyp_personal_weekly_to_date)}</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.afyp.mtd.afyp_personal_monthly_to_date)}</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.afyp.ytd.afyp_personal_yearly_to_date)}</td>
						</tr>*/}
						{/*<tr>
							<td className="header_table left-box">FYAC</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.afyc.wtd.afyc_personal_weekly_to_date)}</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.afyc.mtd.afyc_personal_monthly_to_date)}</td>
							<td className="ct_table text-right">{MoneyFormat(this.state.data && this.state.data.production.afyc.ytd.afyc_personal_yearly_to_date)}</td>
						</tr>*/}
					</tbody>
				</table>
				{(localStorage.getItem('role') == 9 ?
					<h4>Jumlah VC anda dalam 4 bulan terakhir (Current Month) = <u className="animatednotice infinite flash">{this.state.data && this.state.data.production.qc.mtd.qc_personal_monthly_to_date}</u></h4>
					:''
				)}
				<h5 style={{fontStyle:'italic'}}>*Data FYP dan FYC diatas dihitung berdasarkan pembayaran premi tahun pertama saat polis di-issued dan renewal yang terjadi selama periode WTD, MTD dan YTD.</h5>
                {production_report}

				<div className="btn-group hidden">
					<button type="button" className="btn btn-warning" onClick={this.downloadReport.bind(this,this.state.data && api_route.production_report_agentpersonal+this.state.data.agent_data.id)}><i className="fa fa-download"></i> Download Production Report</button>
					<button type="button" className="btn btn-warning dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
						<span className="caret"></span>
						<span className="sr-only">Toggle Dropdown</span>
					</button>
					<ul className="dropdown-menu">
						<li><a onClick={this.downloadReport.bind(this,this.state.data && api_route.production_report_agentpersonal+this.state.data.agent_data.id)}>2017</a></li>
						<li><a onClick={this.downloadReport.bind(this,this.state.data && api_route.production_report_agentpersonal+this.state.data.agent_data.id + '?year=2016')}>2016</a></li>
					</ul>
				</div>

			</div>
		</div>
		);
	}
}

{/* Additional Configuration Starts Here */}

const COLORS = ['#1866d3', '#18d346', '#eff00e', '#f0720e'];

const data_production = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];
                   
const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text x={cx} y={cy} dy={-10} textAnchor="middle" fill={fill}>{payload.name}</text>
	  <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#0096A9">{`${MoneyFormat(value)}`}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};

{/* Additional Configuration Ends Here */}

export default Production;