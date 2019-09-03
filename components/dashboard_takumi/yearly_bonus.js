'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';

class YearlyBonus extends React.Component {
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
        let cap_mtd= response.takumi_dashboard_personal.ec_issued_ytd;
        if(cap_mtd <= 35){
            $('.tr_1').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
        }else if(cap_mtd > 35 && cap_mtd <= 47){
            $('.tr_2').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
        }else if(cap_mtd > 47 && cap_mtd <= 59){
            $('.tr_3').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
        }else if(cap_mtd > 59 && cap_mtd <= 99){
            $('.tr_4').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
        }else if(cap_mtd > 99){
            $('.tr_5').css({'fontSize':'16px', 'color':'red', 'fontStyle':'italic', 'font-weight':'bold',"text-decoration": "underline"});
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
    
    componentDidMount(){
        
    }

	render(){
		var yearly_bonus =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.yearly_bonus);
        yearly_bonus = isNaN(yearly_bonus) ? 0 : MoneyFormat(yearly_bonus);

		return (
			<div className="wrapContent boxShadow">
			    <div className="subtitle textShadow"><i className="fa fa-user"></i> Yearly Bonus</div>
                <div className="entry">
                    <div className="box-summary">
                        <div className="row">
							<div className="col-sm-1"></div>
                            <div className="col-sm-10">
                                <table className="table table-responsive text-center" id="myTableYearly">
                                    <thead>
                                        <tr className="info">
                                            <th className="header_table text-center" style={{width:70 + '%'}}>EC Issued (YTD)</th>
                                            <th className="header_table text-center">% * FYC</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr className="tr_1">
                                            <td className="header_table">&le; 35</td>
                                            <td className="ct_table">0%</td>
                                        </tr>
                                        <tr className="tr_2">
                                            <td className="header_table">&gt; 35 - 47</td>
                                            <td className="ct_table">20%</td>
                                        </tr>
                                        <tr className="tr_3">
                                            <td className="header_table">&gt; 47 - 59</td>
                                            <td className="ct_table">35%</td>
                                        </tr>
                                        <tr className="tr_4">
                                            <td className="header_table">&gt; 59 - 99</td>
                                            <td className="ct_table">65%</td>
                                        </tr>
                                        <tr className="tr_5">
                                            <td className="header_table">&gt; 99</td>
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
								<div className="entry" style={{'padding':'10px'}}>
									<span>Yearly Bonus</span>
									<input type="text" className="form-control" value={yearly_bonus} disabled/>
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
export default YearlyBonus;