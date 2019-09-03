'use strict'
import {MoneyFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';

class MonthlyBonusGs extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null,
		}

	}

    componentWillMount () {
		$.ajax({
            url: api_route.dashboard_takumi,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            processData: false,
            takumi_dashboard_groupType: false,
            type: 'POST',
            success: (response) => {
              	$('#loading').modal('hide');
				this.setState({
					data:response,
				});
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
              
            }
        });
    }
    
	render(){
		var monthly_bonus = 0;
		var monthly_bonus_percentage =  0 ;
		var acc_tc =  0;
		var acc_tm =  0;
		var acc_td =  0;
		var acc_stc = 0;
		var acc_etc = 0;

		if(this.state.data && this.state.data.takumi_dashboard_group != null || this.state.data && this.state.data.takumi_dashboard_group != undefined){
			monthly_bonus =  this.state.data && this.state.data.takumi_dashboard_group.monthly_bonus;
			monthly_bonus_percentage =  this.state.data && this.state.data.takumi_dashboard_group.percentage_monthly_bonus;
			acc_tc =  this.state.data && this.state.data.takumi_dashboard_group.acc_tc_monthly_bonus;
			acc_tm =  this.state.data && this.state.data.takumi_dashboard_group.acc_tm_monthly_bonus;
			acc_td =  this.state.data && this.state.data.takumi_dashboard_group.acc_td_monthly_bonus;
			acc_stc =  this.state.data && this.state.data.takumi_dashboard_group.acc_stc_monthly_bonus;
			acc_etc =  this.state.data && this.state.data.takumi_dashboard_group.acc_etc_monthly_bonus;

			monthly_bonus = isNaN(monthly_bonus) || monthly_bonus == 0  ? 0 : MoneyFormat(monthly_bonus);
			monthly_bonus_percentage = isNaN(monthly_bonus_percentage) || monthly_bonus_percentage == 0  ? 0 : monthly_bonus_percentage;
			acc_tc = isNaN(acc_tc) || acc_tc == 0 ? 0 : MoneyFormat(acc_tc);
			acc_tm = isNaN(acc_tm) || acc_tm == 0 ? 0 : MoneyFormat(acc_tm);
			acc_td = isNaN(acc_td) || acc_td == 0 ? 0 : MoneyFormat(acc_td);
			acc_stc = isNaN(acc_stc) || acc_stc == 0 ? 0 : MoneyFormat(acc_stc);
			acc_etc = isNaN(acc_etc) || acc_etc == 0 ? 0 : MoneyFormat(acc_etc);
		}

		return (
			<div className="wraptakumi_dashboard_group boxShadow">
				<div className="subtitle textShadow"><i className="fa fa-user"></i> Monthly Bonus</div>
				<div className="entry">
					<div className="box-summary">
						<form className="form-horizontal">
							<div className="form-group">
								<div className="col-sm-3">% Monthly Bonus </div>
								<div className="col-sm-9"><input type="text" className="form-control" value={monthly_bonus_percentage} style={{width:'80px'}} disabled/></div>
							</div>

							<div className="form-group">
								<div className="col-sm-6">Acc TC Monthly Bonus (MTD)</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_tc} disabled/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-6">Acc STC Monthly Bonus (MTD)</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_stc} disabled/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-6">Acc ETC Monthly Bonus (MTD)</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_etc} disabled/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-6">Acc TM Monthly Bonus - Personal Selling</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_tm} disabled/>
								</div>
							</div>

                            <div className="form-group">
								<div className="col-sm-6">Acc TD Monthly Bonus - Personal Selling</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_td} disabled/>
								</div>
							</div>

							<div className="form-group" style={{width:'50%', margin:'0 auto', display:'table'}}>
									<label className="control-label">Monthly Bonus</label><br/>
									<input type="text" className="form-control" value={monthly_bonus} disabled/>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default MonthlyBonusGs;