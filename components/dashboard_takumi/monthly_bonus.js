'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';

class MonthlyBonus extends React.Component {
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
            contentType: false,
            type: 'POST',
            success: (response) => {
              	$('#loading').modal('hide');
				this.setState({
					data:response,
                });
            if(response.takumi_dashboard_personal.cap_mtd != null){
            if(response.takumi_dashboard_personal.cap_mtd <= 24000000){
                $('.tr1_1').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
            }else if(response.takumi_dashboard_personal.cap_mtd > 24000000 && response.takumi_dashboard_personal.cap_mtd <= 35000000){
                $('.tr1_2').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
            }else if(response.takumi_dashboard_personal.cap_mtd > 35000000 && response.takumi_dashboard_personal.cap_mtd <= 50000000){
                $('.tr1_3').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
            }else if(response.takumi_dashboard_personal.cap_mtd > 35000000 && response.takumi_dashboard_personal.cap_mtd <= 50000000){
                $('.tr1_4').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
            }else if(response.takumi_dashboard_personal.cap_mtd > 50000000 && response.takumi_dashboard_personal.cap_mtd <= 70000000){
                $('.tr1_5').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
            }else if(response.takumi_dashboard_personal.cap_mtd > 70000000 && response.takumi_dashboard_personal.cap_mtd <= 120000000){
                $('.tr1_6').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
            }else if(response.takumi_dashboard_personal.cap_mtd > 120000000){
                $('.tr1_7').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
            }
        }
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
              
            }
        });

        
        
    }
    
    componentWillReceiveProps(p){
        
    }
    componentDidMount(){
        
    }
	render(){
        var monthly_bonus =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.monthly_bonus);
        monthly_bonus = isNaN(monthly_bonus) ? 0 : MoneyFormat(monthly_bonus);
		return (
			<div className="wrapContent boxShadow">
			    <div className="subtitle textShadow"><i className="fa fa-user"></i> Monthly Bonus</div>
                <div className="entry">
                    <div className="box-summary">
                        <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-sm-10">
                                <table className="table table-responsive text-center" id="myTable">
                                    <thead>
                                        <tr className="info">
                                            <th className="header_table text-center" style={{width:70 + '%'}}>CAP (MTD)</th>
                                            <th className="header_table text-center">% * FYC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="tr1_1">
                                            <td className="header_table">&le; {MoneyFormat(24000000)}</td>
                                            <td className="ct_table">0%</td>
                                        </tr>
                                        <tr className="tr1_2">
                                            <td className="header_table">&gt; {MoneyFormat(24000000)} - {MoneyFormat(35000000)}</td>
                                            <td className="ct_table">10%</td>
                                        </tr>
                                        <tr className="tr1_3">
                                            <td className="header_table">&gt; {MoneyFormat(35000000)} - {MoneyFormat(50000000)}</td>
                                            <td className="ct_table">25%</td>
                                        </tr>
                                        <tr className="tr1_4">
                                            <td className="header_table">&gt; {MoneyFormat(50000000)} - {MoneyFormat(70000000)}</td>
                                            <td className="ct_table">40%</td>
                                        </tr>
                                        <tr className="tr1_5">
                                            <td className="header_table">&gt; {MoneyFormat(70000000)} - {MoneyFormat(120000000)}</td>
                                            <td className="ct_table">70%</td>
                                        </tr>
                                        <tr className="tr1_6">
                                            <td className="header_table">&gt; {MoneyFormat(120000000)}</td>
                                            <td className="ct_table">100%</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                            <div className="col-sm-1"></div>
                        </div>

                        <div className="row">
                            <div className="col-sm-1"></div>
                            <div className="col-sm-10">
                                <div className="entry">
                                    <span>Monthly Bonus</span>
                                    <input type="text" className="form-control" value={monthly_bonus} disabled/>
                                </div>
                            </div>
                            <div className="col-sm-1"></div>
                        </div>
                    </div>
                </div> 
            </div>
		);
}
}
export default MonthlyBonus;