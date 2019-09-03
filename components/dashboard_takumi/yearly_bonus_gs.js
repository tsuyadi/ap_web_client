'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';

class YearlyBonusGs extends React.Component {
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
		var yearly_bonus = 0;
		var yearly_bonus_percentage =  0 ;
		var acc_tc =  0;
		var acc_tm =  0;
		var acc_td =  0;
		var acc_stc = 0;
		var acc_etc = 0;

		if(this.state.data && this.state.data.takumi_dashboard_group != null || this.state.data && this.state.data.takumi_dashboard_group != undefined){
			yearly_bonus =  this.state.data && this.state.data.takumi_dashboard_group.yearly_bonus;
			yearly_bonus_percentage =  this.state.data && this.state.data.takumi_dashboard_group.percentage_yearly_bonus;
			acc_tc =  this.state.data && this.state.data.takumi_dashboard_group.acc_tc_yearly_bonus;
			acc_tm =  this.state.data && this.state.data.takumi_dashboard_group.acc_tm_yearly_bonus;
			acc_td =  this.state.data && this.state.data.takumi_dashboard_group.acc_td_yearly_bonus;
			acc_stc =  this.state.data && this.state.data.takumi_dashboard_group.acc_stc_yearly_bonus;
			acc_etc =  this.state.data && this.state.data.takumi_dashboard_group.acc_etc_yearly_bonus;

			yearly_bonus = isNaN(yearly_bonus) || yearly_bonus == 0  ? 0 : MoneyFormat(yearly_bonus);
			yearly_bonus_percentage = isNaN(yearly_bonus_percentage) || yearly_bonus_percentage == 0  ? 0 : yearly_bonus_percentage;
			acc_tc = isNaN(acc_tc) || acc_tc == 0 ? 0 : MoneyFormat(acc_tc);
			acc_tm = isNaN(acc_tm) || acc_tm == 0 ? 0 : MoneyFormat(acc_tm);
			acc_td = isNaN(acc_td) || acc_td == 0 ? 0 : MoneyFormat(acc_td);
			acc_stc = isNaN(acc_stc) || acc_stc == 0 ? 0 : MoneyFormat(acc_stc);
			acc_etc = isNaN(acc_etc) || acc_etc == 0 ? 0 : MoneyFormat(acc_etc);
		}

		return (
			<div className="wrapContent boxShadow">
				<div className="subtitle textShadow"><i className="fa fa-user"></i> Yearly Bonus</div>
				<div className="entry">
					<div className="box-summary">
						<form className="form-horizontal">
							<div className="form-group">
								<div className="col-sm-3">% Yearly Bonus </div>
								<div className="col-sm-9"><input type="text" className="form-control" value={yearly_bonus_percentage} style={{width:'80px'}} disabled/></div>
							</div>

							<div className="form-group">
								<div className="col-sm-6">Acc TC Yearly Bonus (MTD)</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_tc} disabled/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-6">Acc STC Yearly Bonus (MTD)</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_stc} disabled/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-6">Acc ETC Yearly Bonus (MTD)</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_etc} disabled/>
								</div>
							</div>

							<div className="form-group">
								<div className="col-sm-6">Acc TM Yearly Bonus - Personal Selling</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_tm} disabled/>
								</div>
							</div>

                            <div className="form-group">
								<div className="col-sm-6">Acc TD Yearly Bonus - Personal Selling</div>
								<div className="col-sm-6">
									<input type="text" className="form-control" value={acc_td} disabled/>
								</div>
							</div>

							<div className="form-group" style={{width:'50%', margin:'0 auto', display:'table'}}>
								<label className="control-label">Yearly Bonus</label><br/>
								<input type="text" className="form-control" value={yearly_bonus} disabled/>
							</div>
						</form>
					</div>
				</div>
			</div>
		);
	}
}

export default YearlyBonusGs;