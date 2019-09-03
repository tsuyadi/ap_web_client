'use strict'

import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import {loadLinkCustom} from '../../common_components/helper/url_helper';

class GroupRmParallelOverriding extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null
		}

		this.getBonus = this.getBonus.bind(this);
	}

	componentWillReceiveProps(p) {
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

		// this.state.data

		let parallel_or = this.state.data && this.state.data.parallel_overriding;
		let end_month = parallel_or && parallel_or.end_month || 0;
		let fyc_parallel = parallel_or && parallel_or.fyc_parallel || 0;
		let parallel_or_g1 = parallel_or && parallel_or.parallel_or_g1 || 0;
		let parallel_or_g2 = parallel_or && parallel_or.parallel_or_g2 || 0;
		let syc_parallel = parallel_or && parallel_or.syc_parallel || 0;

		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-calculator"></i> Parallel Overriding </div>
			<div className="entry">
				<form className="form-horizontal overriding">
					<div className="form-group">
						<label className="col-xs-5">FYC_Group(MTD)</label>
						<div className="col-xs-7">
							<input type="email" className="form-control" placeholder="-" value={MoneyFormat(fyc_parallel)} />
						</div>
					</div>
					
					<div className="form-group">
						<label className="col-xs-5">SYC_Group(MTD)</label>
						<div className="col-xs-7">
							<input type="email" className="form-control" placeholder="-"  value={MoneyFormat(syc_parallel)} />
						</div>
					</div>

					<div className="form-group total">
						<label className="col-xs-5">Parallel OR G1:</label>
						<div className="col-xs-7">
							<span className="red">Rp {MoneyFormat(parallel_or_g1)}</span>
						</div>
					</div>
				</form>
			</div>

			<div className="subfooter">
				Tingkat parallel overriding Anda adalah Rp <span className="blink">{MoneyFormat(1000)}</span>. Batas akhir issued case untuk team anda bulan ini adalah "<span className="blink">{DateFormat(end_month)}</span>"
			</div>
		</div>
		);
	}
}

export default GroupRmParallelOverriding;