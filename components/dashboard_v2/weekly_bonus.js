'use strict'

import {MoneyFormat,DateFormat} from '../../common_components/helper/formatter';

class WeeklyBonus extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null
		}

		this.loadMessage = this.loadMessage.bind(this);
	}

	componentWillReceiveProps(p){
		this.setState({
	        data: p.data
	    });
	}

	loadMessage(persen){
		
		try{
			persen = parseFloat(persen);
		}catch(e){
			persen = 0;
		}

		if(persen == 60){
			return 'Selamat! Anda berhasil mencapai rate bonus maximum 60% untuk Weekly Bonus Anda minggu ini. Tingkatkan terus jumlah FYC untuk mendapatkan Weekly Bonus semaksimal mungkin. Note : hari Jumat adalah batas waktu untuk issue polis dalam seminggu';
		}else if(persen == 40){
			return 'Anda sudah berhasil mencapai rate bonus 40% untuk Weekly Bonus Anda. Tingkatkan terus jumlah QC / FYC anda untuk medapatkan rate maksimum 60%. Note : hari Jumat adalah batas waktu untuk issue polis dalam seminggu';
		}else if(persen == 20){
			return 'Anda sudah berhasil mencapai rate bonus 20% untuk Weekly Bonus Anda. Tingkatkan terus jumlah QC / FYC anda untuk medapatkan rate maksimum 60%. Note : hari Jumat adalah batas waktu untuk issue polis dalam seminggu';
		}else if(persen == 0){
			return 'Jumlah produksi anda sampai saat ini belum mencapai rate bonus minimal untuk perhitungan Weekly Bonus. Tingkatkan jumlah QC/FYC anda untuk mendapatkan Weekly Bonus 60%. Note : hari Jumat adalah batas waktu untuk issue polis dalam seminggu';
		}
	}

	render(){

		if(this.state.data == undefined && this.state.data == null){
			if(this.props.data != undefined && this.props.data != null){
				this.state.data = this.props.data;
			}
		}

		let weekly_fyc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_fyc_commission_table : [];
		let weekly_fyc_commission = [];
		if(weekly_fyc_commission_table)
		{
			$.map(weekly_fyc_commission_table, (value, index) => {
	            let row = null;
	            if(index == 0){
	              row = <tr className="red" key={index}><td className="text-right ct_table">{MoneyFormat(value.total_fyc)}</td><td className="ct_table text-right"> {value.percentage}</td><td className="ct_table text-right">{MoneyFormat(value.bonus)}<i className="fa fa-arrow-left"></i></td></tr>
	            }else{
	              row = <tr key={index}><td className="text-right ct_table">{MoneyFormat(value.total_fyc)}</td><td className="ct_table text-right"> {value.percentage}</td><td className="ct_table text-right">{MoneyFormat(value.bonus)}</td></tr>
	            }
	            weekly_fyc_commission.push(row);
	          }); 		
		}

		let weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : [];
		let weekly_qc_commission = [];
		if(weekly_qc_commission_table)
		{
			$.map(weekly_qc_commission_table, (value, index) => {
	            let row = null;
	            if(index == 0){
	              row = <tr className="red" key={index}><td className="ct_table">{value.total_qc}</td><td className="ct_table text-right"> {value.percentage}</td><td className="ct_table text-right">{MoneyFormat(value.bonus)}<i className="fa fa-arrow-left"></i></td></tr>
	            }else{
	              row = <tr key={index}><td className="ct_table">{value.total_qc}</td><td className="ct_table text-right"> {value.percentage}</td><td className="ct_table text-right">{MoneyFormat(value.bonus)}</td></tr>
	            }
	            weekly_qc_commission.push(row);
	          }); 		
		}

		var webo_msg = '';
		var webo_fyc = 0;
		var webo_qc = 0;

		if(weekly_fyc_commission_table.length > 0){
			if(weekly_qc_commission_table.length > 0){
				webo_fyc = parseFloat(weekly_fyc_commission_table[0].percentage.replace('%', ''));
				webo_qc = parseFloat(weekly_qc_commission_table[0].percentage[0].replace('%', ''));
				webo_msg = this.loadMessage((webo_fyc > webo_qc) ? webo_fyc : webo_qc);
			}else{
				webo_fyc = parseFloat(weekly_fyc_commission_table[0].percentage.replace('%', ''));
				webo_msg = this.loadMessage(webo_fyc);
			}
		}else{
			if(weekly_qc_commission_table.length > 0){
				webo_qc = parseFloat(weekly_qc_commission_table[0].percentage[0].replace('%', ''));
				webo_msg = this.loadMessage(webo_qc);
			}
		}

		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-calendar-check-o"></i> Weekly Bonus - New Business</div>
			<div className="entry">
				<div className="row">
					<div className="col-xs-4 responsive1">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-5 control-label">FYC New Business (WTD)</label>
								<div className="col-sm-7">
									<input type="text" className="form-control" placeholder="-" value={this.state.data && MoneyFormat(this.state.data.income_calculation.weekly_bonus.personal_week_to_date_fyc) } />
								</div>
							</div>
						</form>
					</div>
					<div className="col-xs-4 responsive1">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-5 control-label">FYC (12 rolling week)</label>
								<div className="col-sm-7">
									<input type="text" className="form-control" placeholder="-" value={this.state.data && MoneyFormat(this.state.data.income_calculation.weekly_bonus.personal_rolling_fyc) } />
								</div>
								<div className="col-sm-4">
									<a href="#" data-toggle="modal" data-target="#weeklyBonus"></a>
								</div>
							</div>
						</form>
					</div>
					<div className="col-xs-4 responsive1">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="col-sm-5 control-label">QC (12 rolling week)</label>
								<div className="col-sm-7">
									<input type="text" className="form-control" placeholder="-" value={this.state.data &&  this.state.data.income_calculation.weekly_bonus.personal_rolling_qc } />
								</div>
								<div className="col-sm-4">
									<a href="#" data-toggle="modal" data-target="#weeklyBonus"></a>
								</div>
							</div>
						</form>
					</div>
					<div className="clearfix"></div>
				</div>
				
				<div className="clearfix h15"></div>
				
				<div className="note">
					Bonus Anda minggu ini berdasarkan pencapaian New Business adalah Rp {this.state.data &&  MoneyFormat(this.state.data.income_calculation.weekly_bonus.total_weekly_bonus)}
				</div>
				
				<div className="clearfix h15"></div>
				
				<div className="row">
					<div className="col-xs-5 responsive2">
						<div className="titleTable">Validation based on QC</div>
						<table className="table table-responsive table-box cpadding">
							<thead>
								<tr>
									<th className="header_table ">Total 12<br/>rolling week<br/>QC</th>
									<th className="header_table ">% of FYC</th>
									<th className="header_table ">Total Bonus</th>
								</tr>
							</thead>
							<tbody>
								{weekly_qc_commission}
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
									<th className="header_table">Total 12<br/>rolling week<br/>FYC</th>
									<th className="header_table">% of FYC</th>
									<th className="header_table">Total Bonus</th>
								</tr>
							</thead>
							<tbody>
								{weekly_fyc_commission}
							</tbody>
						</table>
					</div>
					<div className="clearfix"></div>
				</div>
				
			</div>
			<div className="clearfix"></div>
			
			<div className="noteRed">
				{webo_msg}
			</div>
		</div>
		);
	}
}
export default WeeklyBonus;