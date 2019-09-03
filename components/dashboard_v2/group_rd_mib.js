'use strict'

import {MoneyFormat, capitalize} from '../../common_components/helper/formatter';

class GroupRdMib extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null
		}
	}


	componentWillReceiveProps(p){
		// // debugger;
		this.setState({
	        data: p.data
	    });
	}

	render(){

		let mib = this.state.data && this.state.data.mib && this.state.data.mib.mib
		let mib_list = this.state.data && this.state.data.mib && this.state.data.mib.rm_bonus || [];

		let mib_detail = [];

		if(mib_list.length > 0){

			// capitalize
			
			mib_list.sort(function(a, b){ return b.rm_bonus - a.rm_bonus });

			mib_list.map((e) => {
				mib_detail.push(
					<div className="form-group" key={e.rm_name}>
						<label className="label-form col-sm-4">{capitalize(e.rm_name)}</label>
						<div className="col-sm-8">
							<input type="text" className="form-control text-right" value={MoneyFormat(e.rm_bonus)} />
						</div>
					</div>
				);
			});
		}

		return (
        <div className="wrapContent boxShadow">
			<div className="subtitle textShadow"><i className="fa fa-calculator"></i> Monthly Incentive Bonus</div>
			<div className="entry">
				<div className="box-val">
					<form className="form-horizontal" style={{'paddingTop':'10px'}}>
						{mib_detail}					
					</form>
				</div>
				<div className="box-summary">
					<form className="form-horizontal">
						<div className="form-group">
							<label className="label-form col-sm-4">Total MIB</label>
							<div className="col-sm-8">
								<input type="text" className="form-control text-right capitalize" value={MoneyFormat(mib)} />
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

export default GroupRdMib;