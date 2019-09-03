'use strict'

import {MoneyFormat,DateFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import {loadLinkCustom} from '../../common_components/helper/url_helper';

class GroupRmBonusOverriding extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null
		}

		this.getBonus = this.getBonus.bind(this);
	}

	componentWillReceiveProps(p){
		this.getBonus();
	}

	getBonus(){
		$('.load-incomecalc').show();
		loadLinkCustom(api_route.bonus_overriding, (response) => {
			$('.load-incomecalc').hide();
			this.setState({
				data : response.specific_data.income_calculation
			});
		}
		, (error) => {
			$('.load-incomecalc').hide();
			console.dir(error);
			alert('Something error happened, please contact agency portal support');			
		});
	}

	render(){
		
		let bo_total_or = this.state.data && this.state.data.bonus_overriding && this.state.data.bonus_overriding.bo_total_or || 0;
		let bo_end_of_month = this.state.data && this.state.data.bonus_overriding && this.state.data.bonus_overriding.end_of_month || '';
		let fyc_wtd = this.state.data && this.state.data.bonus_overriding && this.state.data.bonus_overriding.fyc_wtd || 0;

		let period = this.state.data && this.state.data.bonus_overriding && this.state.data.bonus_overriding.period || null;
		let period_start = period && period.start_date;
		let period_end = period && period.end_date;

		let bo_direct_sm = this.state.data && this.state.data.bonus_overriding && this.state.data.bonus_overriding.bo_direct_sm;
		let bo_direct_dm = this.state.data && this.state.data.bonus_overriding && this.state.data.bonus_overriding.bo_direct_dm;
		let bo_direct_fc_table = this.state.data && this.state.data.bonus_overriding && this.state.data.bonus_overriding.bo_direct_fc_table;
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
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-calculator"></i> Bonus Overriding <i style={{'display':'none'}} className="fa fa-spinner fa-pulse fa-fw load-incomecalc"></i></div>
			<div className="entry">
					<form className="form-horizontal">
						<div className="form-group">
							<label className="col-sm-4 control-label">FYC (weekly to date)</label>
							<div className="col-sm-8">
								<input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyc_wtd)} />
							</div>
						</div>
					</form>
					
					<div className="periode">Period : [{DateFormat(period_start)} - {DateFormat(period_end)}]</div>
				
				<div className="row">
					<div className="col-xs-12">
						<div className="titleTable">Bonus Overriding from Direct FC</div>
						<table className="table table-bordered table-striped table-box">
							<thead>
								<tr>
									<th className="header_table">Total weekly<br />Active Agent</th>
									<th className="header_table">Bonus OR(%)</th>
									<th className="header_table">Total OR Bonus</th>
								</tr>
							</thead>
							<tbody>
								{bo_direct_fc}
							</tbody>
						</table>

						<div className="col-xs-12">
							<label className="col-xs-6">Bonus Overriding from Direct SM:</label>
							<div className="col-xs-6">
								<span className="red">Rp {MoneyFormat(bo_direct_sm)}</span>
							</div>
						</div>
						<div className="col-xs-12">
							<label className="col-xs-6">Bonus Overriding from Direct DM:</label>
							<div className="col-xs-6">
								<span className="red">Rp {MoneyFormat(bo_direct_dm)}</span>
							</div>
						</div>
					</div>

					<div className="col-xs-12">
						
						<div className="titleTable">Accumulated Bonus Overriding</div>
						<table className="table table-bordered table-striped table-box">
							<thead>
								<tr>
									<th className="header_table">Week</th>
									<th className="header_table">Bonus OR Direct FC</th>
									<th className="header_table">Bonus OR Direct SM</th>
									<th className="header_table">Total</th>
								</tr>
							</thead>
							<tbody>
							</tbody>
						</table>
						
					</div>
					
					<div className="clearfix"></div>
				</div>
				
			</div>
			
			<div className="subfooter">
				Tingkat bonus overriding Anda adalah Rp <span className="blink">{MoneyFormat(bo_total_or)}</span>. Batas akhir issued case untuk team anda bulan ini adalah "<span className="blink">{DateFormat(bo_end_of_month)}</span>"
			</div>
		</div>
		);
	}
}

export default GroupRmBonusOverriding;