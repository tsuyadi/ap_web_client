'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';

class MonthlyAllowance extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null,
			status : '',
			checked : false,
			ck_training : false,
		}
	}


	componentWillReceiveProps(p){
		// debugger;
		this.setState({
	        data: p.data,
			status : 'development',
			checked : p.data && p.data.content.license == true ? 'checked': '',
			ck_training : p.data && p.data.content.training == true ? 'checked' : '',
	    });
		// var license = p.data && p.data.content.license;
		//var training = p.data && p.data.content.training;
		
		// if(license == true){
		// 	return document.getElementById("license").checked = "checked";
		// }
		// if(training == true || p.data && p.data.content.training == true){
		// 	console.log(training);
		// 	return document.getElementById("training").checked = "checked";
		// }
	}

	componentDidMount(){
		// debugger;
		this.setState({
	        data: this.props.data,
			status : 'development',
			checked : this.props.data && this.props.data.content.license == true ? 'checked': '',
			ck_training : this.props.data && this.props.data.content.training == true ? 'checked' : '' 
	    });
	}

	render(){
		let license = this.state.data && this.state.data.content.license == true ? "Yes" : "No";
		let training = this.state.data && this.state.data.content.training == true ? "Yes" : "No";;
		let efektif = this.state.data && this.state.data.content.effective;
		//let development = efektif == false ? true : false;
		let masa = this.state.data && this.state.data.content.probation_status;
		let probation = this.state.data && this.state.data.content.probation;
		probation = probation == false ? "Probation" : " - ";

		var ec_submit_wtd =  parseInt(this.state.data && this.state.data.content.ec_submit_wtd);
        var ec_submit_mtd =  parseInt(this.state.data && this.state.data.content.ec_submit_mtd);
        var ec_submit_ytd =  parseInt(this.state.data && this.state.data.content.ec_submit_ytd);
		let efektif_day = parseInt(this.state.data && this.state.data.content.effective_days);
		let monthly_allowance_wtd = parseInt(this.state.data && this.state.data.content.monthly_allowance_wtd);
		let monthly_allowance_mtd = parseInt(this.state.data && this.state.data.content.monthly_allowance_mtd);
		
        ec_submit_wtd = isNaN(ec_submit_wtd) ? 0 : ec_submit_wtd;
        ec_submit_mtd = isNaN(ec_submit_mtd) ? 0 : ec_submit_mtd;
        ec_submit_ytd = isNaN(ec_submit_ytd) ? 0 : ec_submit_ytd;
		efektif_day = isNaN(efektif_day) ? 0 : efektif_day;
		monthly_allowance_wtd = isNaN(monthly_allowance_wtd) || monthly_allowance_wtd == 0 ? 0 : MoneyFormat(monthly_allowance_wtd);
		monthly_allowance_mtd = isNaN(monthly_allowance_mtd) || monthly_allowance_mtd == 0 ? 0 : MoneyFormat(monthly_allowance_mtd);
		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-user"></i> Monthly Allowance</div>
			<div className="entry">
				<div className="box-summary">
					<form className="form-inline" style={{width:'100%'}}>
						<div className="form-group" style={{width:'100%'}}>
								<p className="text-center">Anda dalam masa &nbsp;
								<input type="text" className="form-control text-center" value={masa} disabled/>
								, berikut adalah pencapaian Anda :</p>
						</div>
						<div className="clearfix h25"></div>
						<div className="form-group">
							<input type="text" className="form-control" value="EC Submit (WTD)" style={{marginRight:'20px'}} disabled/>
							<input type="text" className="form-control" value={ec_submit_wtd} style={{marginRight:'35px'}} disabled/>
							<input type="text" className="form-control" value={"AAJI License"}  style={{marginRight:'20px'}}disabled/>
							{/*<input type="text" className="form-control" value={license} style={{width:'50px'}} disabled/>*/}
							<div className="checkbox">
								<label>
									<input type="checkbox" id="license" className="form-control" name="license" value={license} disabled style={{width:'35px'}} checked={this.state.checked}/>
								</label>
							</div>
						</div>
						<div className="clearfix h25"></div>
						<div className="form-group">
							<input type="text" className="form-control" value="EC Submit (MTD)" style={{marginRight:'20px'}} disabled/>
							<input type="text" className="form-control" value={ec_submit_mtd} style={{marginRight:'35px'}} disabled/>
							<input type="text" className="form-control" value="Training"  style={{marginRight:'20px'}}disabled/>
							<div className="checkbox">
								<label>
									<input type="checkbox" id="training" className="form-control" name="training" value={training} disabled style={{width:'35px'}} checked={this.state.ck_training}/>
								</label>
							</div>
						</div>
						<div className="clearfix h25"></div>
						<div className="form-group">
								<input type="text" className="form-control" value="EC Submit (YTD)" style={{marginRight:'20px'}} disabled/>
								<input type="text" className="form-control" value={ec_submit_ytd} style={{marginRight:'35px'}} disabled/>
						</div>
						<div className="clearfix h25"></div>
						{(masa == 'Effective' || masa == 'extended'?
							<div className="form-group" style={{width:'100%'}}>
								<p className="text-center">Berikut adalah Tunjangan Bulanan Anda bulan ini : </p>
							</div>
								:
							<div className="form-group text-center" style={{width:'100%'}}>
								Berdasarkan pencapaian Anda maka status Anda adalah &nbsp;
								<input type="text" className="form-control text-center" value={probation} style={{width:'100px',margin:0}} disabled/>
									&nbsp; ,Anda masih memiliki waktu &nbsp;
								<input type="text" className="form-control text-center" value={efektif_day} style={{width:'80px',margin:0}} disabled/>
									&nbsp; hari untuk menjadi efektif TC. Berikut adalah Tunjangan Bulanan Anda bulan ini : 
							</div>
						)}
						<div className="clearfix h25"></div>
						{(masa== 'Effective' || masa == 'Development'?
							<div className="form-group" style={{width:'50%', margin:'0 auto', display:'table'}}>
								<span>Monthly Allowance (WTD) </span><br/>
								<input type="text" className="form-control" value={monthly_allowance_wtd} style={{width:'100%'}} disabled/>
								<br/>
								<span>Monthly Allowance (MTD) </span><br/>
								<input type="text" className="form-control" value={monthly_allowance_mtd} style={{width:'100%'}} disabled/>
							</div>
							:
							''
						)}
					</form>
				</div>
			</div>
		</div>
		);
	}
}

export default MonthlyAllowance;