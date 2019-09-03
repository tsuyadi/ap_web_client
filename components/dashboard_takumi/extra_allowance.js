'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';

class ExtraAllowance extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null
		}
	}


	componentWillReceiveProps(p){
		// debugger;
		this.setState({
	        data: p.data
	    });
	}

	render(){
		var monthly_bonus =  parseInt(this.state.data && this.state.data.content.monthly_bonus);
        var yearly_bonus =  parseInt(this.state.data && this.state.data.content.yearly_bonus);
        var acc_monthly_allowance =  parseInt(this.state.data && this.state.data.content.acc_monthly_allowance);
		let acc_extra_allowance = parseInt(this.state.data && this.state.data.content.acc_extra_allowance);
		let acc_monthly_allowance_deficit = parseInt(this.state.data && this.state.data.content.acc_monthly_allowance_deficit);
		let extra_allowance = parseInt(this.state.data && this.state.data.content.extra_allowance);
		let commission_mtd = parseInt(this.state.data && this.state.data.content.fyc_mtd);

		commission_mtd = commission_mtd == null || commission_mtd == 0 ? 0 : MoneyFormat(commission_mtd);
        monthly_bonus = monthly_bonus == null || monthly_bonus == 0 ? 0 : MoneyFormat(monthly_bonus);
        yearly_bonus = yearly_bonus == null || yearly_bonus == 0 ? 0 : MoneyFormat(yearly_bonus);
        acc_monthly_allowance = acc_monthly_allowance == null || acc_monthly_allowance == 0 ? 0 : MoneyFormat(acc_monthly_allowance);
		acc_extra_allowance = acc_extra_allowance == null || acc_extra_allowance == 0 ? 0 : MoneyFormat(acc_extra_allowance);
		acc_monthly_allowance_deficit = acc_monthly_allowance_deficit == null || acc_monthly_allowance_deficit == 0 ? 0 : MoneyFormat(acc_monthly_allowance_deficit);
		extra_allowance = extra_allowance == null || extra_allowance == 0 ? 0 : MoneyFormat(extra_allowance);
		return (
			<div className="wrapContent boxShadow">
				<div className="subtitle textShadow"><i className="fa fa-user"></i> Extra Allowance (Tunjangan Bulanan)</div>
				<div className="entry">
					<div className="box-summary">
						<form className="form-horizontal">
							<div className="form-group">
								<div className="col-sm-4">
									<input type="text" className="form-control" value="Commision (MTD)" disabled/>
								</div>
								<div className="col-sm-2">
									<input type="text" className="form-control" value={commission_mtd} disabled/>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" value="Accumulation Monthly Allowance (YTD)" disabled/>
								</div>
								<div className="col-sm-2">
									<input type="text" className="form-control" value={acc_extra_allowance} disabled/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-4">
									<input type="text" className="form-control" value="Monthly Bonus (MTD)" disabled/>
								</div>
								<div className="col-sm-2">
									<input type="text" className="form-control" value={monthly_bonus} disabled/>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" value="Accumulation Extra Allowance (YTD)" disabled/>
								</div>
								<div className="col-sm-2">
									<input type="text" className="form-control" value={acc_extra_allowance} disabled/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-4">
									<input type="text" className="form-control" value="Yearly Bonus (YTD)" disabled/>
								</div>
								<div className="col-sm-2">
									<input type="text" className="form-control" value={yearly_bonus} disabled/>
								</div>
								<div className="col-sm-4">
									<input type="text" className="form-control" value="Accumulation Of Monthly Allowance Deficit (YTD)" disabled/>
								</div>
								<div className="col-sm-2">
									<input type="text" className="form-control" value={acc_monthly_allowance_deficit} disabled/>
								</div>
							</div>

							<div className="form-group" style={{width:'50%', margin:'0 auto', display:'table'}}>
									<label className="control-label">Extra Allowance (MTD)</label><br/>
									<input type="text" className="form-control" value={extra_allowance} disabled/>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default ExtraAllowance;