'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';
import {decimalFormat} from '../../common_components/helper/formatter';

class GroupRdMio extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null
		}
	}

	

	componentWillReceiveProps(p){
		console.log(p);
		this.setState({
	        data: p.data
	    });
	}

	render(){
		let mio = this.state.data && this.state.data.mio;
		let fyc_parallel_mtd = mio && mio.fyc_parallel_mtd;
		let total_mio = mio && mio.mio;
		let mio_paralel = mio && mio.mio_parallel;
		let syc_group_mtd = mio && mio.syc_group_mtd;
		let fyc_group_mtd = mio && mio.fyc_group_mtd;
		let mio_group = mio && mio.mio_group;
		let syc_parallel_mtd = mio && mio.syc_parallel_mtd;
		
		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-calculator"></i> Monthly Incentive Overriding</div>
			<div className="entry">
				<div className="box-val">
					<div className="row">
						<div className="form-group total col-xs-12">
							<label className="col-xs-5">Parallel:</label>
							<div className="col-xs-7">
								<input type="text" className="form-control text-right" value={MoneyFormat(mio_paralel)} />
							</div>
						</div>
					</div>
					<div className="row">
						<div className="form-group total col-xs-12">
							<label className="col-xs-5">Group:</label>
							<div className="col-xs-7">
								<input type="text" className="form-control text-right" value={MoneyFormat(mio_group)} />
							</div>
						</div>
					</div>
				</div>
				<div className="box-summary">
					<form className="form-horizontal">
						<div className="form-group">
							<label className="label-form col-sm-4">Total MIO</label>
							<div className="col-sm-8">
								<input type="text" className="form-control text-right" value={MoneyFormat(total_mio)} />
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

export default GroupRdMio;