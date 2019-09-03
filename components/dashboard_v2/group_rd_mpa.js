'use strict'

import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';

class GroupRdMpa extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : null
		}
	}

	componentWillReceiveProps(p) {
		this.setState({
	        data: p.data
	    });
	}

	render(){

		let mpa_total = this.state.data && this.state.data.mpa || 0;

		let mpa_total_res = ( mpa_total >= 15000000 ) ? mpa_total : 15000000;

		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-calculator"></i> Monthly Performance Allowance</div>
			<div className="entry">
				<div className="box-val">
					<div className="row">
						<div className="col-xs-12">
							<input type="text" className="form-control text-right" value={MoneyFormat(mpa_total)} />
							<span className="notesComments">5% x FYC Group</span>
							<div className="clearfix"></div>
						</div>
					</div>
					<div className="row">
						<div style={{'marginTop':'25px', 'marginBottom':'20px'}} className="col-xs-12 text-center">
							<span>OR</span>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12">
							<input type="text" value={MoneyFormat(15000000)} className="form-control text-right" />
							<span className="notesComments">Fixed Amount</span>
							<div className="clearfix"></div>
						</div>
					</div>
				</div>
				<div className="box-summary">
					<form className="form-horizontal">
						<div className="form-group">
							<label className="label-form col-sm-4">Total MPA</label>
							<div className="col-sm-8">
								<input type="text" className="form-control text-right" value={MoneyFormat(mpa_total_res)} />
							</div>
						</div>
					</form>
				</div>
			</div>

			<div className="clearfix"></div>
		</div>
		);
	}
}

export default GroupRdMpa;