'use strict'

import {MoneyFormat,DateFormat} from '../../common_components/helper/formatter';

class YearEndBonus extends React.Component {
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

		if(persen == 100){
			return 'Selamat! Anda berhasil mencapai rate bonus maximum 100% untuk Year End Bonus Anda. Tingkatkan terus jumlah Weekly Bonus untuk mendapatkan nilai YEBO semaksimal mungkin. Note : Weekly Bonus yang diperhitungkan untuk Year End Bonus adalah Weekly Bonus yang terhitung sampai dengan 31 Desember';
		}else if(persen == 60){
			return 'Anda sudah berhasil mencapai rate bonus 60% untuk Year End Bonus Anda. Tingkatkan terus jumlah QC / FYC anda untuk medapatkan rate bonus maksimum 100%. Note : Weekly Bonus yang diperhitungkan untuk Year End Bonus adalah Weekly Bonus yang terhitung sampai dengan 31 Desember';
		}else if(persen == 30){
			return 'Anda sudah berhasil mencapai rate 30% untuk Year End Bonus Anda. Tingkatkan terus jumlah QC / FYC anda untuk medapatkan rate maksimum 100%. Note : Weekly Bonus yang diperhitungkan untuk Year End Bonus adalah Weekly Bonus yang terhitung sampai dengan 31 Desember';
		}else if(persen == 0){
			return 'Jumlah produksi anda sampai saat ini belum mencapai rate bonus minimal untuk perhitungan Year End Bonus. Tingkatkan jumlah QC/FYC anda untuk mendapatkan Year End Bonus sampai dengan 100%. Note : Year End Bonus  akan dihitung berdasarkan rate bonus yang tercapai * weekly bonus  yang terhitung sampai dengan 31 Desember';
		}
	}

	render(){

		if(this.state.data == undefined && this.state.data == null){
			if(this.props.data != undefined && this.props.data != null){
				this.state.data = this.props.data;
			}
		}

		let yebo_fyc_bonus_table = this.state.data ? this.state.data.income_calculation.yebo.yebo_fyc_bonus_table : [];
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

		let yebo_qc_bonus_table = this.state.data ? this.state.data.income_calculation.yebo.yebo_qc_bonus_table : [];
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

		var yebo_msg = '';
		var yebo_fyc = 0;
		var yebo_qc = 0;

		if(yebo_fyc_bonus_table.length > 0){
			if(yebo_qc_bonus_table.length > 0){
				yebo_fyc = parseFloat(yebo_fyc_bonus_table[0].percentage.replace('%', ''));
				yebo_qc = parseFloat(yebo_qc_bonus_table[0].percentage.replace('%', ''));
				yebo_msg = this.loadMessage((yebo_fyc > yebo_qc) ? yebo_fyc : yebo_qc);
			}else{
				yebo_fyc = parseFloat(yebo_fyc_bonus_table[0].percentage.replace('%', ''));
				yebo_msg = this.loadMessage(yebo_fyc);
			}
		}else{
			if(yebo_qc_bonus_table.length > 0){
				yebo_qc = parseFloat(yebo_qc_bonus_table[0].percentage.replace('%', ''));
				yebo_msg = this.loadMessage(yebo_qc);
			}
		}

		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-calendar-check-o"></i> Year End Bonus</div>
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
				{yebo_msg}
			</div>
		</div>
		);
	}
}

export default YearEndBonus;