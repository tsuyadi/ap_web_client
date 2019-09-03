'use strict'

import {MoneyFormat, DateFormat, DateFormatCustom} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import {loadLinkCustom} from '../../common_components/helper/url_helper';

class GroupRmOverriding extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : null
		}

		this.getOverriding = this.getOverriding.bind(this);
	}

	componentWillReceiveProps(p){
		this.getOverriding();
	}

	getOverriding(){
		$('.load-incomecalc').show();
		loadLinkCustom(api_route.bonus_overriding, (response) => {
			$('.load-incomecalc').hide();
			// // debugger;
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

		let fyc_group = this.state.data && this.state.data.overriding && this.state.data.overriding.wtd_data && this.state.data.overriding.wtd_data.fyc_group;
		let syc_group = this.state.data && this.state.data.overriding && this.state.data.overriding.wtd_data && this.state.data.overriding.wtd_data.syc_group;
		let direct_fc = this.state.data && this.state.data.overriding && this.state.data.overriding.direct_fc;
		let direct_sm = this.state.data && this.state.data.overriding && this.state.data.overriding.direct_sm;
		let direct_dm = this.state.data && this.state.data.overriding && this.state.data.overriding.direct_dm;
		let total_or =  this.state.data && this.state.data.overriding && this.state.data.overriding.total_or;
		let end_date =  this.state.data && this.state.data.overriding && this.state.data.overriding.end_of_week && this.state.data.overriding.end_of_week.end_date;

		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-calculator"></i> Overriding (OR) <i style={{'display':'none'}} className="fa fa-spinner fa-pulse fa-fw load-incomecalc"></i></div>
			<div className="entry">
				<form className="form-horizontal overriding">
					
					<div className="row">
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-xs-5">FYC_Group(WTD)</label>
								<div className="col-xs-7">
									<input type="text" className="form-control" placeholder="-" value={MoneyFormat(fyc_group)} />
								</div>
							</div>
						</div>
						<div className="col-sm-6">
							<div className="form-group">
								<label className="col-xs-5">SYC_Group(WTD)</label>
								<div className="col-xs-7">
									<input type="text" className="form-control" placeholder="-"  value={MoneyFormat(syc_group)} />
								</div>
							</div>
						</div>
					</div>

					<div className="form-group total">
						<label className="col-xs-5">Direct FC:</label>
						<div className="col-xs-7">
							<input type="text" className="form-control" value={MoneyFormat(direct_fc)} />
						</div>
					</div>

					<div className="form-group total">
						<label className="col-xs-5">Direct SM:</label>
						<div className="col-xs-7">
							<input type="text" className="form-control" value={MoneyFormat(direct_sm)} />
						</div>
					</div>

					<div className="form-group total">
						<label className="col-xs-5">Direct DM:</label>
						<div className="col-xs-7">
							<input type="text" className="form-control" value={MoneyFormat(direct_dm)} />
						</div>
					</div>

				</form>
			</div>

			<div className="clearfix"></div>

			<div className="subfooter">
				Tingkat overriding mingguan Anda adalah Rp <span className="blink">{MoneyFormat(total_or)}</span>. Batas akhir issued case untuk team anda minggu ini adalah "<span className="blink">{DateFormatCustom(end_date, -1)}</span>"
			</div>
		</div>
		);
	}
}

export default GroupRmOverriding;