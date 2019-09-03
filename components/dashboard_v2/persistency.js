'use strict'

import {MoneyFormat,decimalFormat} from '../../common_components/helper/formatter';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

class Persistency extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null,
			modal_title : null,
			modal_ecp : null,
			modal_acp : null,
			activeIndexP1 : 0,
			activeIndexP2 : 0
		}

		this.handleShowModal = this.handleShowModal.bind(this);
	}

	

	componentWillReceiveProps(p){
		this.setState({
	        data: p.data
	    });
	}

	handleShowModal(p){
		if(p == 1 )
		{
			let ecp = this.state.data.persistency.personal_p1.ecp_p1;
			let acp = this.state.data.persistency.personal_p1.acp_p1;
			this.setState({
				modal_title: 'Personal Persistency P1',
				modal_ecp: MoneyFormat(ecp),
				modal_acp: MoneyFormat(acp)
			});
		}
		else
		{
			let ecp = this.state.data.persistency.personal_p2.ecp_p2;
			let acp = this.state.data.persistency.personal_p2.acp_p2;
			this.setState({
				modal_title: 'Personal Persistency P2',
				modal_ecp: MoneyFormat(ecp),
				modal_acp: MoneyFormat(acp)
			});
		}
		$('#persistency').modal('show');
	}

	onPieEnterP1(data, index){
		this.setState({
			activeIndexP1: index,
		});
	}

	onPieEnterP2(data, index){
		this.setState({
			activeIndexP2: index,
		});
	}

	render(){

		if(this.state.data == undefined && this.state.data == null){
			if(this.props.data != undefined && this.props.data != null){
				this.state.data = this.props.data;
			}
		}

		/*
		var data = {
				label: 'somethingA',
				values: [{x: 'SomethingA', y: 10}, {x: 'SomethingB', y: 4}, {x: 'SomethingC', y: 3}]
		};
		var sort = null;*/ // d3.ascending, d3.descending, func(a,b) { return a - b; }, etc...

		var p1 = this.state.data && this.state.data.persistency.personal_p1.p1;
		var p2 = this.state.data && this.state.data.persistency.personal_p2.p2;

		var data_p1 = [];
		var data_p2 = [];

		var chart_p1 = [];
		var chart_p2 = [];

		p1 != null && p1 != '-' ? data_p1.push({ name : 'P1 Persistency', value : (p1/100)  }) : data_p1 = [];
		p1 != null && p1 != '-' ? data_p1.push({ name : '', value : 1-(p1/100)  }) : data_p1 = [];

		p2 != null && p2 != '-' ? data_p2.push({ name : 'P2 Persistency', value : (p2/100)  }) : data_p2 = [];
		p2 != null && p2 != '-' ? data_p2.push({ name : '', value : 1-(p2/100)  }) : data_p2 = [];

		const COLORS = ['#0096a9', '#c10424'];

		if(data_p1.length > 0)
		{
			chart_p1.push(
				<ResponsiveContainer>
					{/*<PieChart onMouseEnter={this.onPieEnterP1}>*/}
					<PieChart>
						<Pie 
							activeIndex={this.state.activeIndexP1}
							activeShape={renderActiveShape} 
							data={data_p1} 
							innerRadius={60}
							outerRadius={80} 
							fill="#07b03d">
							{
								data_p1.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart_p1.push(
				<div className="text-center nodatafound-circle">0.00 %</div>
			);
		}

		if(data_p2.length > 0)
		{
			chart_p2.push(
				<ResponsiveContainer>
					{/*<PieChart onMouseEnter={this.onPieEnterP2}>*/}
					<PieChart>
						<Pie 
							activeIndex={this.state.activeIndexP2}
							activeShape={renderActiveShape} 
							data={data_p2} 
							innerRadius={60}
							outerRadius={80} 
							fill="#07b03d">
							{
								data_p2.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
							}
						</Pie>
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart_p2.push(
				<div className="text-center nodatafound-circle">0.00 %</div>
			);
		}

		{/* Persistency Information */}

		let ecp_p1 = this.state.data != null ? this.state.data.persistency.personal_p1.ecp_p1 : 0;
		let acp_p1 = this.state.data != null ? this.state.data.persistency.personal_p1.acp_p1 : 0;
		ecp_p1 = MoneyFormat(ecp_p1);
		acp_p1 = MoneyFormat(acp_p1);

		let ecp_p2 = this.state.data != null ? this.state.data.persistency.personal_p2.ecp_p2 : 0;
		let acp_p2 = this.state.data != null ? this.state.data.persistency.personal_p2.acp_p2 : 0;
		ecp_p2 = MoneyFormat(ecp_p2);
		acp_p2 = MoneyFormat(acp_p2);

		{/* End Persistency Information */}

		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-percent"></i> Persistency</div>
			<div className="entry">
				<div className="persistency">
					<div className="row">
						<div className="col-md-6">
							<div className="titlePersistency">
								P1
							</div>
							<div className="percentPersistency" style={{width:100 + '%', height:200 + 'px'}}>
								{chart_p1}
								<div className="clearfix"></div>
							</div>
							<div className="buttonPersistency hidden">
								<a onClick={this.handleShowModal.bind(this,1)}>view details</a>
							</div>
						</div>
						
						<div className="col-md-6">
							<div className="titlePersistency">
								P2
							</div>
							<div className="percentPersistency" style={{width:100 + '%', height:200 + 'px'}}>
								{chart_p2}
								<div className="clearfix"></div>
							</div>
							
							<div className="buttonPersistency hidden">
								<a onClick={this.handleShowModal.bind(this,2)}>view details</a>
							</div>
						</div>

						<div>
							<div className="col-xs-12">
								<div className="entry">
									<table className="table table-responsive table-box cpadding">
										<thead>
											<tr>
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

						{/*
							<div className="col-xs-6">
								<div className="titlePersistency">
									Custom
								</div>
								<div className="percentPersistency">
									<PieChart
										data={data}
										margin={{top: 10, bottom: 10, left: 100, right: 100}}
										sort={sort}
										/>
								</div>
							</div>
						 */}
						 { /*
						<div className="col-xs-6">
							<div className="titlePersistency">
								P2
							</div>
							<div className="percentPersistency">
								<div className={'c100 green p' +(this.state.data && decimalFormat(this.state.data.persistency.personal_p2.p2))}>
								  <span>{p2 != '-' && p2+'%' || p2}</span>
								  <div className="slice">
									<div className="bar"></div>
									<div className="fill"></div>
								  </div>
								</div>
								
								<div className="clearfix"></div>
							</div>
							<div className="buttonPersistency">
								<a onClick={this.handleShowModal.bind(this,2)}>view details</a>
							</div>
						</div>

						<div className="col-xs-6">
							<PieChart width={800} height={400} onMouseEnter={this.onPieEnter}>
								<Pie
								data={datax} 
								cx={100} 
								cy={100} 
								labelLine={false}
								label={renderCustomizedLabel}
								outerRadius={80} 
								fill="#8884d8"
								>
									{
									datax.map((entry, index) => <Cell fill={COLORS[index % COLORS.length]}/>)
								}
								</Pie>
							</PieChart>
						</div>

						*/}

					</div>
				</div>

			</div>

			<div className="modal fade" id="persistency" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content">
					<div className="table-responsive">
						<table className="table table-responsive table-box ">
							<tr>
								<th className="header_table " colSpan="2">{this.state.modal_title}</th>
							</tr>
							<tr>
								<td className="header_table ">ECP</td>
								<td className="text-right">{this.state.modal_ecp}</td>
							</tr>
							<tr>
								<td className="header_table ">ACP</td>
								<td className="text-right">{this.state.modal_acp}</td>
							</tr>
						</table>
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

export default Persistency;