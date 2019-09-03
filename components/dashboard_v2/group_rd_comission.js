'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';

class GroupRdComission extends React.Component {
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
			<div className="entry">		
				<div className="row">
					<div className="clearfix"></div>
				</div>		
				<div className="row" style={{'paddingTop':'25px'}}>
					<div className="col-md-6">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="label-form col-sm-4">FYC_Parallel ( MTD )</label>
								<div className="col-sm-8">
									<input type="text text-right" className="form-control" value={MoneyFormat(fyc_parallel_mtd)} />
								</div>
							</div>
							<div className="form-group">
								<label className="label-form col-sm-4">SYC_Parallel ( MTD )</label>
								<div className="col-sm-8">
									<input type="text text-right" className="form-control" value={MoneyFormat(syc_parallel_mtd)} />
								</div>
							</div>
						</form>
					</div>
					<div className="col-md-6">
						<form className="form-horizontal">
							<div className="form-group">
								<label className="label-form col-sm-4">FYC_Group ( MTD )</label>
								<div className="col-sm-8">
									<input type="text text-right" className="form-control" value={MoneyFormat(fyc_group_mtd)} />
								</div>
							</div>
							<div className="form-group">
								<label className="label-form col-sm-4">SYC_Group ( MTD )</label>
								<div className="col-sm-8">
									<input type="text text-right" className="form-control" value={MoneyFormat(syc_group_mtd)} />
								</div>
							</div>
						</form>
					</div>
				</div>
			</div>

			<div className="clearfix"></div>
		</div>
		);
	}
}

export default GroupRdComission;