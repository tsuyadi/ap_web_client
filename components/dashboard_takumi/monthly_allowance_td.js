'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';

class MonthlyAllowanceTD extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null,
            effective_ratio : null
		}
	}

	// componentWillMount(){
    //     $.ajax({
	// 		url: api_route.dashboard_takumi+'?group=1',
	// 		headers: {
	// 			'Authorization':'JWT '+sessionStorage.getItem('token')
	// 		},
	// 		data: { 
	// 				'group': '1'
	// 		},
	// 		type: 'POST',
	// 		success: (response) => {
	// 			try{
	// 				this.props.loaded(true);
	// 			}catch(e){}
	// 			this.setState({
	// 				data: response,
    //                 effective_ratio : response.content.effective_ratio,
	// 			});
	// 		},
	// 		error: (err, response) => {
	// 			$('.load-ape').hide();
	// 			if(err.responseJSON){
	// 				// window.location.href = window.location.href.split('#')[0] + '#/';
	// 			}					
	// 		}
	// 	});
	// 	// this.setState({
	//     //     data: p.dataGroup
	//     // });
        
    //     // let effective_ratio = isNaN(p.dataGroup && p.dataGroup.content.effective_ratio ? 0 : p.dataGroup && p.dataGroup.content.effective_ratio);
    //     // console.log("nilai efektif");
    //     // console.log("effektif "+p.dataGroup && p.dataGroup.content.effective_ratio);
    //     // // if(p.data && p.data.content.effective_ratio != null || p.data && p.data.content.effective_ratio != undefined){
    //     // //     monthly_alw = p.data && p.data.content.effective_ratio;
    //     // // }else{
    //     // //     monthly_alw=0;
    //     // // }
	// }

	componentWillReceiveProps(p){
        this.setState({
	        data: p.dataGroup
	    });

		let effective_ratio=0;
        effective_ratio = p.dataGroup && p.dataGroup.content.effective_ratio;

        if(effective_ratio){
            if(effective_ratio <= 25 ){
                return document.getElementById("Teffective_ratio").rows[1].style.border = '5px solid red';
            }else if(effective_ratio > 25 && effective_ratio <= 40){
                return document.getElementById("Teffective_ratio").rows[2].style.border = '5px solid red';
            }else if(effective_ratio > 40 && effective_ratio <= 50){
                return document.getElementById("Teffective_ratio").rows[3].style.border = '5px solid red';
            }else if(effective_ratio > 50 && effective_ratio <= 60){
                return document.getElementById("Teffective_ratio").rows[4].style.border = '5px solid red';
            }else if(effective_ratio > 60){
                return document.getElementById("Teffective_ratio").rows[5].style.border = '5px solid red';
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
                                <table className="table table-striped forbullet table-box table-bordered text-center" id="Teffective_ratio">
                                    <thead>
                                        <tr className="info">
                                            <th className="header_table text-center" style={{width:60 + '%'}}>Effective Ratio</th>
                                            <th className="header_table text-center">Monthly Allowance</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>&le; 25%</td>
                                            <td>0</td>
                                        </tr>
                                        <tr>
                                            <td>&gt; 25% - 40%</td>
                                            <td>{MoneyFormat('30000000')}</td>
                                        </tr>
                                         <tr>
                                            <td>&gt; 40% - 50%</td>
                                            <td>{MoneyFormat('50000000')}</td>
                                        </tr>
										 <tr>
                                            <td>&gt; 50% - 60%</td>
                                            <td>{MoneyFormat('60000000')}</td>
                                        </tr>
                                        <tr>
                                            <td>&gt; 60%</td>
                                            <td>{MoneyFormat('80000000')}</td>
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
export default MonthlyAllowanceTD;