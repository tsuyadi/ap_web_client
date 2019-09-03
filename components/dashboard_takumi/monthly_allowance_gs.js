'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';

class MonthlyAllowanceGs extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null
		}
	}

	componentWillReceiveProps(p){
		this.setState({
	        data: p.dataGroup
	    });

        let effective_ratio = p.dataGroup && p.dataGroup.content.effective_ratio;
        if(effective_ratio){
            if(effective_ratio <= 30){
                return document.getElementById("tableMonthly").rows[1].style.border = '5px solid red';
            }else if(effective_ratio > 30 && effective_ratio <= 40){
                return document.getElementById("tableMonthly").rows[2].style.border = '5px solid red';
            }else if(effective_ratio > 40 && effective_ratio <= 50){
                return document.getElementById("tableMonthly").rows[3].style.border = '5px solid red';
            }else if(effective_ratio > 50 && effective_ratio <= 65){
                return document.getElementById("tableMonthly").rows[4].style.border = '5px solid red';
            }else if(effective_ratio > 65){
                return document.getElementById("tableMonthly").rows[5].style.border = '5px solid red';
            }
        }
	}
	
	render(){

		var monthly_alw =  this.state.data && this.state.data.content.monthly_allowance_mtd;
        monthly_alw= isNaN(monthly_alw) || monthly_alw == 0 ? 0 : MoneyFormat(monthly_alw);
		return (
            
			<div className="wrapContent boxShadow">
			    <div className="subtitle textShadow"><i className="fa fa-user"></i> Monthly Allowance (Tunjangan Bulanan)</div>
                <div className="entry">
                    <div className="box-summary">
                        <div className="row">
							<div className="col-sm-1"></div>
                            <div className="col-sm-10">
                                <table className="table table-striped forbullet table-box table-bordered text-center" id="tableMonthly">
                                    <thead>
                                        <tr className="info">
                                            <th className="header_table text-center" style={{width:60 + '%'}}>Effective Ratio</th>
                                            <th className="header_table text-center">Monthly Allowance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>&le; 30%</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>&gt; 30% - 40%</td>
                                            <td>{MoneyFormat('15000000')}</td>
                                        </tr>
                                         <tr>
                                            <td>&gt; 40% - 50%</td>
                                            <td>{MoneyFormat('20000000')}</td>
                                        </tr>
										 <tr>
                                            <td>&gt; 50% - 65%</td>
                                            <td>{MoneyFormat('25000000')}</td>
                                        </tr>
                                        <tr>
                                            <td>&gt; 65%</td>
                                            <td>{MoneyFormat('30000000')}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
							<div className="col-sm-1"></div>
						</div>
						<div className="clearfix h25"></div>
						<div className="row">
							<div className="col-sm-12">
								<div className="entry">
									<span>Monthly Allowance</span>
									<input type="text" className="form-control" value={monthly_alw} disabled/>
								</div>
							</div>
						</div>   
                    </div>
                </div> 
            </div>
		);
}
}
export default MonthlyAllowanceGs;