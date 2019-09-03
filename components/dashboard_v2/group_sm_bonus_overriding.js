'use strict'

import {MoneyFormat,DateFormat} from '../../common_components/helper/formatter';

class GroupSmBonusOverriding extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		data : null
	}

	componentWillReceiveProps = (p) => {
		this.setState({
	        data: p.data
	    });
	}

	render(){
		let bo_direct_fc_table = this.state.data ? this.state.data.specific_data.income_calculation.bonus_overriding.bo_direct_fc_table : null;
		let bo_direct_fc = [];
		if(bo_direct_fc_table)
		{
			$.map(bo_direct_fc_table, (value, index) => {
	            let row = null;
	            if(index == 0){
	              row = <tr key={index} className="red"><td>{value.active_agent}</td><td><i className="fa fa-angle-right"></i> {value.bonus_or}</td><td>{MoneyFormat(value.total_or_bonus)}</td></tr>
	            }else{
	              row = <tr key={index}><td>{value.active_agent}</td><td><i className="fa fa-angle-right"></i> {value.bonus_or}</td><td>{MoneyFormat(value.total_or_bonus)}</td></tr>
	            }
	            bo_direct_fc.push(row);
	          }); 		
		}

		return (
        <div className="wrapContent">
			<div className="subtitle"><i className="fa fa-calculator"></i> Bonus Overriding </div>
			<div className="entry">
					<form className="form-horizontal">
						<div className="form-group">
							<label className="col-sm-4 control-label">FYC (weekly to date)</label>
							<div className="col-sm-8">
								<input type="email" className="form-control" placeholder="-" value={this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.fyc_wtd} />
							</div>
						</div>
					</form>
					
					<div className="periode">Period : [{this.state.data && DateFormat(this.state.data.specific_data.income_calculation.bonus_overriding.period.start_date.substring(0,10))} - {this.state.data && DateFormat(this.state.data.specific_data.income_calculation.bonus_overriding.period.end_date.substring(0,10))}]</div>
				
				<div className="row">
					<div className="col-xs-5 responsive2">
						<div className="titleTable">Bonus Overriding from Direct FC</div>
						<table className="table table-bordered table-striped">
							<thead>
								<tr>
									<th>Total weekly<br />Active Agent</th>
									<th>Bonus OR(%)</th>
									<th>Total OR Bonus</th>
								</tr>
							</thead>
							<tbody>
								{bo_direct_fc}
							</tbody>
						</table>
					</div>

					<div className="col-xs-7 responsive2">
						<div className="titleTable">Accumulated Bonus Overriding</div>
						<table className="table table-bordered table-striped">
							<thead>
								<tr>
									<th>Week</th>
									<th>Bonus Overriding</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
					</div>
					
					<div className="clearfix"></div>
				</div>
				
			</div>
			
			<div className="noteRed">
				Tingkat bonus mingguan Anda adalah Rp {this.state.data && MoneyFormat(this.state.data.specific_data.income_calculation.bonus_overriding.bo_total_or)}. Batas akhir issued case minggu ini adalah "<span className="blink">{this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.end_of_month.substring(0,10)}</span>"
			</div>
		</div>
		);
	}
}

export default GroupSmBonusOverriding;