'use strict'
import api_route from '../../common_components/api_route';
import {MoneyFormat,decimalFormat} from '../../common_components/helper/formatter';
import {PieChart, Pie, Sector, Cell, ResponsiveContainer } from 'recharts';

class IssuranceRatio extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : null,
			activeIndexPG1 : 0,
		}
		this.handleShowModal = this.handleShowModal.bind(this);
		this.onPieEnterPG1 = this.onPieEnterPG1.bind(this);
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
			let ec_submit = this.state.data && this.state.data.takumi_dashboard_personal.ec_submit_three_month_rolling_back;
			let ec_issued = this.state.data && this.state.data.takumi_dashboard_personal.ec_issued_two_month_rolling_back;

			this.setState({
				modal_title: 'Issuance Persistency',
				modal_ec_issued: MoneyFormat(ec_issued),
				modal_ec_submit: MoneyFormat(ec_submit)
			});
		}
		$('#issurance').modal('show');
	}

	onPieEnterPG1(data, index){
		this.setState({
			activeIndexPG1: index,
		});
	}

	render(){
		let ec_issued = this.state.data && this.state.data.takumi_dashboard_personal.ec_issued_ytd != null ? this.state.data.takumi_dashboard_personal.ec_issued_two_month_rolling_back  : 0;
		let ec_submit = this.state.data && this.state.data.takumi_dashboard_personal.ec_submit_ytd!= null ? this.state.data.takumi_dashboard_personal.ec_submit_three_month_rolling_back : 0;

		ec_issued = ec_issued != 0 ? MoneyFormat(ec_issued) : 0;
		ec_submit = ec_submit != 0 ? MoneyFormat(ec_submit) : 0;

		var pg1 = ec_issued==0 && ec_submit==0? 100 : (this.state.data && this.state.data.takumi_dashboard_personal.issuance_ratio > 100 ? 100 : this.state.data && this.state.data.takumi_dashboard_personal.issuance_ratio);

		var data_pg1 = [];
		var chart_pg1 = [];
	
		pg1 != null && pg1 != '-' ? data_pg1.push({ name : 'Issuance Ratio', value : (pg1/100)  }) : data_pg1 = [];
		pg1 != null && pg1 != '-' ? data_pg1.push({ name : '', value : 1-(pg1/100)  }) : data_pg1 = [];

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
				<div className="text-center nodatafound-circle">Issuance Ratio 0.00 %</div>
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
			<div className="title textShadow"><i className="fa fa-percent"></i> Issuance Ratio</div>
			<div className="box-summary">
				<div className="entry">
					<div className="persistency">
						<div className="row">
						<div className="col-md-12">
								<div className="percentPersistency" style={{width:100 + '%', height:200 + 'px'}}>
									{chart_pg1}
									<div className="clearfix"></div>
								</div>
								<div className="buttonPersistency hidden">
									<a onClick={this.handleShowModal.bind(this,1)}>view details</a>
								</div>
							</div>
							
							<div>
								<div className="col-xs-12">
									<div className="entry">
										<table className="table table-responsive table-box cpadding">
											<thead>
												<tr className="info">
													<th className="header_table">&nbsp;</th>
													<th className="header_table text-center">&nbsp;</th>
												</tr>
											</thead>
											<tbody>
												<tr>
													<td className="header_table">EC Submit (3 Month Rolling Back)</td>
													<td className="ct_table text-right" style={{width:50 + '%'}}>{ec_submit}</td>
												</tr>
												<tr>
													<td className="header_table">EC Issued (2 Month Rolling Back)</td>
													<td className="ct_table text-right" style={{width:50 + '%'}}>{ec_issued}</td>
												</tr>
											</tbody>
										</table>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>

				<div className="modal fade" id="issurance" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content">
						<div className="table-responsive">
							<div style={{'overflowX':'auto'}}>
							<table className="table table-bordered table-hover">
								<tr>
									<th colSpan="2">{this.state.modal_title}</th>
								</tr>
								<tr>
									<td>EC Submit (3 Month Rolling Back)</td>
									<td className="text-right">{this.state.modal_ec_submit}</td>
								</tr>
								<tr>
									<td>EC Issued (2 Month Rolling Back)</td>
									<td className="text-right">{this.state.modal_ec_issued}</td>
								</tr>
							</table>
						</div>
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

export default IssuranceRatio;