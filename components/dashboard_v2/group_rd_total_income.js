'use strict'

import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';

class GroupRdTotalIncome extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : null
		}
	}

	componentWillReceiveProps(p){
		this.setState({
	        data: p.data
	    });
	}

	render(){

		let total_income = this.state.data && this.state.data.total_income && this.state.data.total_income.total_income;
		let last_production_day = this.state.data && this.state.data.total_income && this.state.data.total_income.last_production_day;

		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow text-center"><i className="fa fa-calculator"></i> Total Income Sampai Hari Ini</div>
			<div className="entry" style={{'height':'5vh'}}>
				<form className="form-horizontal overriding">					
					<div className="form-group total">
						<div className="col-xs-12 h2" style={{'textAlign':'center'}}>
							<span className="red">Rp {MoneyFormat(total_income)}</span>
						</div>
					</div>
				</form>
			</div>

			<div className="clearfix"></div>

			<div className="subfooter">
				Total Income Anda adalah Rp {MoneyFormat(total_income)}. Batas akhir issued case untuk team anda bulan ini adalah "<span className="blink" style={{'color':'red'}}>{DateFormat(last_production_day)}</span>"				
			</div>
		</div>
		);
	}
}

export default GroupRdTotalIncome;