'use strict'

import api_route from '../../common_components/api_route';
import {MoneyFormat,decimalFormat} from '../../common_components/helper/formatter';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

class GroupPersistency extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : null,
			activeIndexPG1 : 0,
			activeIndexPG2 : 0
		}
		this.handleShowModal = this.handleShowModal.bind(this);
		this.onPieEnterPG1 = this.onPieEnterPG1.bind(this);
		this.onPieEnterPG2 = this.onPieEnterPG2.bind(this);
	}

	componentWillMount () {
		$.ajax({
            url: api_route.dashboard_takumi,
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
					data:response,
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

	handleShowModal(p){
		if(p == 1 )
		{
			let ecp = this.state.data && this.state.data.takumi_dashboard_group.ecp_p1;
			let acp = this.state.data && this.state.data.takumi_dashboard_group.acp_p1;
			this.setState({
				modal_title: 'Personal Persistency P1',
				modal_ecp: MoneyFormat(ecp),
				modal_acp: MoneyFormat(acp)
			});
		}
		else
		{
			let ecp = this.state.data && this.state.data.takumi_dashboard_group.ecp_p2;
			let acp = this.state.data && this.state.data.takumi_dashboard_group.acp_p2;
			this.setState({
				modal_title: 'Personal Persistency P2',
				modal_ecp: MoneyFormat(ecp),
				modal_acp: MoneyFormat(acp)
			});
		}
		$('#personal_persistency').modal('show');
	}

	onPieEnterPG1(data, index){
		this.setState({
			activeIndexPG1: index,
		});
	}

	onPieEnterPG2(data, index){
		this.setState({
			activeIndexPG2: index,
		});
	}
	
	render(){
		let ecp_p1 = this.state.data && this.state.data.takumi_dashboard_group.ecp_p1 != null ? this.state.data.takumi_dashboard_group.ecp_p1 : 0;
		let acp_p1 = this.state.data && this.state.data.takumi_dashboard_group.acp_p1 != null ? this.state.data.takumi_dashboard_group.acp_p1 : 0;
		ecp_p1 = ecp_p1 != 0 ? MoneyFormat(ecp_p1) :0;
		acp_p1 =  acp_p1 != 0 ? MoneyFormat(acp_p1) :0;

		let ecp_p2 = this.state.data && this.state.data.takumi_dashboard_group.ecp_p2 != null ? this.state.data.takumi_dashboard_group.ecp_p2 : 0;
		let acp_p2 = this.state.data && this.state.data.takumi_dashboard_group.acp_p2 != null ? this.state.data.takumi_dashboard_group.acp_p2 : 0;
		ecp_p2 = ecp_p2 != 0 ? MoneyFormat(ecp_p2) :0;
		acp_p2 = acp_p2 != 0 ? MoneyFormat(acp_p2) :0;
		
		var pg1 = ecp_p1 == 0 && acp_p1 == 0 ? 100 : this.state.data && this.state.data.takumi_dashboard_group.persistence_p1;
		var pg2 = ecp_p2 == 0 && acp_p2 == 0 ? 100 : this.state.data && this.state.data.takumi_dashboard_group.persistence_p2;

		var data_pg1 = [];
		var data_pg2 = [];

		var chart_pg1 = [];
		var chart_pg2 = [];
	
		pg1 != null && pg1 != '-' ? data_pg1.push({ name : 'P1 Persistency', value : (pg1/100)  }) : data_pg1 = [];
		pg1 != null && pg1 != '-' ? data_pg1.push({ name : '', value : 1-(pg1/100)  }) : data_pg1 = [];

		pg2 != null && pg2 != '-' ? data_pg2.push({ name : 'P2 Persistency', value : (pg2/100)  }) : data_pg2 = [];
		pg2 != null && pg2 != '-' ? data_pg2.push({ name : '', value : 1-(pg2/100)  }) : data_pg2 = [];

		const COLORS = ['#0096a9', '#c10424'];

		if(data_pg1.length > 0)
		{
			chart_pg1.push(
				<ResponsiveContainer>
					<PieChart>
						<Pie 
							activeIndex={this.state.activeIndexPG1}
							activeShape={renderActiveShape} 
							data={data_pg1} 
							innerRadius={60}
							outerRadius={80} 
							fill="#07b03d">
							{
								data_pg1.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart_pg1.push(
				<div className="text-center nodatafound-circle">0.00 %</div>
			);
		}

		if(data_pg2.length > 0)
		{
			chart_pg2.push(
				<ResponsiveContainer>
					<PieChart>
						<Pie 
							activeIndex={this.state.activeIndexPG2}
							activeShape={renderActiveShape} 
							data={data_pg2} 
							innerRadius={60}
							outerRadius={80} 
							fill="#07b03d">
							{
								data_pg2.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart_pg2.push(
				<div className="text-center nodatafound-circle">0.00 %</div>
			);
		}

		const RADIAN = Math.PI / 180;                    
		const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
			const radius = innerRadius + (outerRadius - innerRadius) * .2;
			const x  = cx + radius * Math.cos(-midAngle * RADIAN);
			const y = cy  + radius * Math.sin(-midAngle * RADIAN);
			
			return (
				<text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} 	dominantBaseline="central">
					{`${(percent * 100).toFixed(2)}%`}
				</text>
			);
		};

		{/* Persistency Information */}

		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-percent"></i> Persistency</div>
			<div className="box-summary">
				<div className="persistency">
					<div className="row">
					<div className="col-md-6">
							<div className="percentPersistency" style={{width:100 + '%', height:200 + 'px'}}>
								{chart_pg1}
								<div className="clearfix"></div>
							</div>
							<div className="buttonPersistency hidden">
								<a onClick={this.handleShowModal.bind(this,1)}>view details</a>
							</div>
						</div>
						
						<div className="col-md-6">
							<div className="percentPersistency" style={{width:100 + '%', height:200 + 'px'}}>
								{chart_pg2}
								<div className="clearfix"></div>
							</div>
							<div className="buttonPersistency hidden">
								<a onClick={this.handleShowModal.bind(this,2)}>view details</a>
							</div>
						</div>

						<div>
							<div className="col-xs-12">
								<div className="entry">
								<div style={{'overflowX':'auto'}}>
									<table className="table table-responsive table-box cpadding">
										<thead>
											<tr className="info">
												<th className="header_table"></th>
												<th className="header_table text-center">P1</th>
												<th className="header_table text-center">P2</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td className="header_table">ECP</td>
												<td className="ct_table text-right" style={{width:50 + '%'}}>{ecp_p1}</td>
												<td className="ct_table text-right" style={{width:50 + '%'}}>{ecp_p2}</td>
											</tr>
											<tr>
												<td className="header_table">ACP</td>
												<td className="ct_table text-right" style={{width:50 + '%'}}>{acp_p1}</td>
												<td className="ct_table text-right" style={{width:50 + '%'}}>{acp_p2}</td>
											</tr>
										</tbody>
									</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
			</div>

			<div className="modal fade" id="group_persistency" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content">
					<div className="table-responsive">
						<div style={{'overflowX':'auto'}}>
						<table className="table table-bordered table-hover">
							<tr>
								<th colSpan="2">{this.state.modal_title}</th>
							</tr>
							<tr>
								<td>ECP</td>
								<td className="text-right">{this.state.modal_ecp}</td>
							</tr>
							<tr>
								<td>ACP</td>
								<td className="text-right">{this.state.modal_acp}</td>
							</tr>
						</table>
						</div>
					</div>
				</div>
			  </div>
			</div>

		</div>
		);
	}
}

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
	  <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#0096A9">{`${(value * 100).toFixed(2)} %`}</text>
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
        innerRadius={outerRadius}
        outerRadius={outerRadius}
        fill={fill}
      />
    </g>
  );
};

export default GroupPersistency;