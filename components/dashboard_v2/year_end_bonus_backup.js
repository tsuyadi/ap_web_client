'use strict'

import {MoneyFormat,DateFormat} from '../../common_components/helper/formatter';

class YearEndBonus extends React.Component {
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
		//
		let yebo_fyc_bonus_table = this.state.data ? this.state.data.income_calculation.yebo.yebo_fyc_bonus_table : null;
		let yebo_fyc_bonus = [];
		if(yebo_fyc_bonus_table)
		{
			$.map(yebo_fyc_bonus_table, (value, index) => {
	            let row = null;
	            if(index == 0){
	              row = <tr className="red"><td className="ct_table text-right">{MoneyFormat(value.total_fyc)}</td><td className="ct_table text-right"> {value.percentage}</td><td className="ct_table text-right">{MoneyFormat(value.bonus)}<i className="fa fa-arrow-left"></i></td></tr>
	            }else{
	              row = <tr><td className="ct_table text-right">{MoneyFormat(value.total_fyc)}</td><td className="ct_table text-right"> {value.percentage}</td><td className="ct_table text-right">{MoneyFormat(value.bonus)}</td></tr>
	            }
	            yebo_fyc_bonus.push(row);
	          }); 		
		}

		let yebo_qc_bonus_table = this.state.data ? this.state.data.income_calculation.yebo.yebo_qc_bonus_table : null;
		let yebo_qc_bonus = [];
		if(yebo_qc_bonus_table)
		{
			$.map(yebo_qc_bonus_table, (value, index) => {
	            let row = null;
	            if(index == 0){
	              row = <tr className="red"><td className="ct_table">{value.total_qc}</td><td className="ct_table text-right"> {value.percentage}</td><td className="ct_table text-right">{MoneyFormat(value.bonus)}<i className="fa fa-arrow-left"></i></td></tr>
	            }else{
	              row = <tr><td className="ct_table">{value.total_qc}</td><td className="ct_table text-right"> {value.percentage}</td><td className="ct_table text-right">{MoneyFormat(value.bonus)}</td></tr>
	            }
	            yebo_qc_bonus.push(row);
	          }); 		
		}

		return (
        <div className="wrapContent">
			<div className="subtitle"><i className="fa fa-calendar-check-o"></i> Year End Bonus</div>
			<div className="entry">
				<div className="row">
					<div className="col-xs-4 responsive1">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-5 control-label two-line">Total Weekly Bonus (YTD)</label>
								<div className="col-sm-7">
									<input type="text" className="form-control" placeholder="-" value={this.state.data && MoneyFormat(this.state.data.income_calculation.yebo.total_weekly_bonus) }/>
								</div>
							</div>
						</form>
					</div>
					<div className="col-xs-4 responsive1">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-5 control-label">FYC (YTD)</label>
								<div className="col-sm-7">
									<input type="text" className="form-control" placeholder="-" value={this.state.data && MoneyFormat(this.state.data.production.fyc.ytd.fyc_personal_yearly_to_date) }/>
								</div>
							</div>
						</form>
					</div>
					<div className="col-xs-4 responsive1">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-5 control-label">QC (YTD)</label>
								<div className="col-sm-7">
									<input type="text" className="form-control" placeholder="-" value={this.state.data && MoneyFormat(this.state.data.production.qc.ytd.qc_personal_yearly_to_date) } />
								</div>
							</div>
						</form>
					</div>
					<div className="clearfix"></div>
				</div>
				
				<div className="clearfix h15"></div>
				<div className="row">
					<div className="col-xs-5 responsive2">
						<div className="titleTable">Validation based on QC</div>
						<table className="table table-responsive table-box ">
							<thead>
								<tr>
									<th className="header_table ">Total QC</th>
									<th className="header_table ">% of Total<br/>Weekly Bonus</th>
									<th className="header_table ">Year End Bonus</th>
								</tr>
							</thead>
							<tbody>
								{yebo_qc_bonus}
							</tbody>
						</table>
					</div>
					<div className="col-xs-2 responsive2 or_area">
						<div className="titleTable or_word" style={{color:'red'}}><b>OR</b></div>
					</div>
					<div className="col-xs-5 responsive2">
						<div className="titleTable">Validation based on FYC</div>
				<table className="table table-responsive table-box ">
					<thead>	
						<tr>
							<th className="header_table ">Total FYC</th>
							<th className="header_table ">% of Total Weekly<br/>Bonus</th>
							<th className="header_table ">Year End Bonus</th>
						</tr>
					</thead>
					<tbody>
						{yebo_fyc_bonus}
					</tbody>
				</table>
					</div>
					<div className="clearfix"></div>
				</div>
				
			</div>
			<div className="noteRed">
				Tingkat bonus akhir tahun Anda adalah Rp {this.state.data && MoneyFormat(this.state.data.income_calculation.yebo.total_yebo_bonus) }. Batas akhir issued case tahun ini adalah "<span className="blink">{this.state.data && DateFormat(this.state.data.income_calculation.yebo.yebo_end_date) }</span>"
			</div>
		</div>
		);
	}
}

export default YearEndBonus;