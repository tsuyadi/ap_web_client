'use strict'

import {MoneyFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, Pie, Sector, Cell} from 'recharts';

class ExtraAllowanceGs extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null,
            dataGroup : null
		}

	}

	componentWillReceiveProps(p){
		this.setState({
	        data: p.data,
            dataGroup : p.dataGroup,
	    });
	}

	componentDidMount(){
		this.setState({
	        data: this.props.data,
            dataGroup : this.props.dataGroup
	    });
	}
	render(){
        let personal = {
			m_bonus : (this.state.data && this.state.data.content.monthly_bonus != null ? this.state.data.content.monthly_bonus : 0 ) == 0 ? 0 : MoneyFormat(this.state.data.content.monthly_bonus), 
			y_bonus :  (this.state.data && this.state.data.content.yearly_bonus != null ? this.state.data.content.yearly_bonus : 0) == 0 ? 0 : MoneyFormat(this.state.data.content.yearly_bonus), 
			overriding :(this.state.data && this.state.data.content.overriding != null ? this.state.data.content.overriding : 0) == 0 ? 0 : MoneyFormat(this.state.data.content.overriding),
			p_overriding : (this.state.data && this.state.data.content.total_parallel_overriding != null ? this.state.data.content.total_parallel_overriding : 0) == 0 ? 0 : MoneyFormat(this.state.data.content.total_parallel_overriding),
			comission :  (this.state.data && this.state.data.content.fyc_mtd != null ? this.state.data.content.fyc_mtd : 0) == 0 ? 0 : MoneyFormat(this.state.data.content.fyc_mtd), 
			acc_m_allowance :  (this.state.data && this.state.data.content.acc_monthly_allowance != null ? this.state.data.content.acc_monthly_allowance : 0) == 0 ? 0 : MoneyFormat(this.state.data.content.acc_monthly_allowance), 
			acc_e_allowance :  (this.state.data && this.state.data.content.acc_extra_allowance != null ? this.state.data.content.acc_extra_allowance: 0) == 0 ? 0 : MoneyFormat(this.state.data.content.acc_extra_allowance),
            acc_m_allowance_def :  (this.state.data && this.state.data.content.acc_monthly_allowance_deficit != null ? this.state.data.content.acc_monthly_allowance_deficit : 0) == 0 ? 0 : MoneyFormat(this.state.data.content.acc_monthly_allowance_deficit)
		};
        let group = {
			m_bonus : (this.state.dataGroup && this.state.dataGroup.content.monthly_bonus != null ? this.state.dataGroup.content.monthly_bonus : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.monthly_bonus), 
			y_bonus :  (this.state.dataGroup && this.state.dataGroup.content.yearly_bonus != null ? this.state.dataGroup.content.yearly_bonus : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.yearly_bonus), 
			overriding : (this.state.dataGroup && this.state.dataGroup.content.overriding != null ? this.state.dataGroup.content.overriding : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.overriding),  
			p_overriding : (this.state.dataGroup && this.state.dataGroup.content.total_parallel_overriding != null ? this.state.dataGroup.content.total_parallel_overriding : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.total_parallel_overriding), 
			comission :  (this.state.dataGroup && this.state.dataGroup.content.fyc_mtd != null ? this.state.dataGroup.content.fyc_mtd : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.fyc_mtd), 
			acc_m_allowance :  (this.state.dataGroup && this.state.dataGroup.content.acc_monthly_allowance != null ? this.state.dataGroup.content.acc_monthly_allowance : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.acc_monthly_allowance), 
			acc_e_allowance :  (this.state.dataGroup && this.state.dataGroup.content.acc_extra_allowance != null ? this.state.dataGroup.content.acc_extra_allowance : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.acc_extra_allowance),
            acc_m_allowance_def :  (this.state.dataGroup && this.state.dataGroup.content.acc_monthly_allowance_deficit != null ? this.state.dataGroup.content.acc_monthly_allowance_deficit : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.acc_monthly_allowance_deficit),
            extra_allowance :  (this.state.dataGroup && this.state.dataGroup.content.extra_allowance != null ? this.state.dataGroup.content.extra_allowance : 0) == 0 ? 0 : MoneyFormat(this.state.dataGroup.content.extra_allowance)
        };
		return (
			<div className="wrapContent boxShadow">
			    <div className="subtitle textShadow"><i className="fa fa-user"></i> Extra Allowance (Tunjangan Ekstra)</div>
                <div className="entry">
                    <div className="box-summary">
                        <div className="row"> 
                            <div className="col-md-12 hidden-xs hidden-sm">
                                <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped forbullet table-box table-bordered">
                                        <thead>
                                            <tr className="info">
                                                <th className="header_table text-center"></th>
                                                <th className="header_table text-center">Personal Selling</th>
                                                <th className="header_table text-center">Group Selling</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td>Monthly Bonus (MTD)</td>
                                                <td className="text-center">{personal.m_bonus}</td>
                                                <td className="text-center">{group.m_bonus}</td>
                                            </tr>
                                            <tr>
                                                <td>Yearly Bonus (YTD)</td>
                                                <td className="text-center">{personal.y_bonus}</td>
                                                <td className="text-center">{group.y_bonus}</td>
                                            </tr>
                                            <tr>
                                                <td>Overriding (MTD)</td>
                                                <td className="text-center">{personal.overriding}</td>
                                                <td className="text-center">{group.overriding}</td>
                                            </tr>
                                            <tr>
                                                <td>Parallel Overriding (MTD)</td>
                                                <td className="text-center">{personal.p_overriding}</td>
                                                <td className="text-center">{group.p_overriding}</td>
                                            </tr>
                                            <tr>
                                                <td>Comission (MTD)</td>
                                                <td className="text-center">{personal.comission}</td>
                                                <td className="text-center">{group.comission}</td>
                                            </tr>
                                            <tr>
                                                <td>Acc Monthly Allowance (YTD)</td>
                                                <td className="text-center">{personal.acc_m_allowance}</td>
                                                <td className="text-center">{group.acc_m_allowance}</td>
                                            </tr>
                                            <tr>
                                                <td>Acc Variable Income (YTD)</td>
                                                <td className="text-center">{personal.acc_e_allowance}</td>
                                                <td className="text-center">{group.acc_e_allowance}</td>
                                            </tr>
                                            <tr>
                                                <td>Acc Monthly Allowance Deficit (YTD)</td>
                                                <td className="text-center">{personal.acc_m_allowance_def}</td>
                                                <td className="text-center">{group.acc_m_allowance_def}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    <br/>
                                    <span>Extra Allowance</span>
                                    <input type="text" className="form-control" value={group.extra_allowance} disabled/>
                                </div>
                            </div>
                        </div>

                        <div className="col-md-6  hidden-md hidden-lg">
                            <div className="entry">
                                <div className="tab-mobile hidden-md hidden-lg">
                                    <ul className="nav nav-tabs" role="tablist">
                                        <li role="presentation" className="active"><a href="#ps" aria-controls="ps" role="tab" data-toggle="tab">Personal Selling</a> </li>
                                        <li role="presentation"><a href="#gs" aria-controls="gs" role="tab" data-toggle="tab">Group Selling</a> </li>
                                    </ul>
                                    <div className="tab-content">														
                                        <div role="tabpanel" className="tab-pane active" id="ps">
                                        <div style={{'overflowX':'auto'}}>
                                            <table className="table table-striped forbullet table-box table-bordered">
                                                <tbody>												
                                                    <tr>
                                                    <td>Monthly Bonus (MTD)</td>
                                                    <td className="text-center">{personal.m_bonus}</td>
                                                </tr>
                                                <tr>
                                                    <td>Yearly Bonus (YTD)</td>
                                                    <td className="text-center">{personal.y_bonus}</td>
                                                </tr>
                                                <tr>
                                                    <td>Overriding (MTD)</td>
                                                    <td className="text-center">{personal.overriding}</td>
                                                </tr>
                                                <tr>
                                                    <td>Parallel Overriding (MTD)</td>
                                                    <td className="text-center">{personal.p_overriding}</td>
                                                </tr>
                                                <tr>
                                                    <td>Commission (MTD)</td>
                                                    <td className="text-center">{personal.comission}</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc Monthly Allowance (YTD)</td>
                                                    <td className="text-center">{personal.acc_m_allowance}</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc Extra Allowance (YTD)</td>
                                                    <td className="text-center">{personal.acc_e_allowance}</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc Monthly Allowance Deficit (YTD)</td>
                                                    <td className="text-center">{personal.acc_m_allowance_def}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>
                                        <div role="tabpanel" className="tab-pane" id="gs">
                                        <div style={{'overflowX':'auto'}}>
                                            <table className="table table-striped forbullet table-box table-bordered">
                                                <tbody>												
                                                <tr>
                                                    <td>Monthly Bonus (MTD)</td>
                                                    <td className="text-center">{group.m_bonus}</td>
                                                </tr>
                                                <tr>
                                                    <td>Yearly Bonus (YTD)</td>
                                                    <td className="text-center">{group.y_bonus}</td>
                                                </tr>
                                                <tr>
                                                    <td>Overriding (MTD)</td>
                                                    <td className="text-center">{group.overriding}</td>
                                                </tr>
                                                <tr>
                                                    <td>Parallel Overriding (MTD)</td>
                                                    <td className="text-center">{group.p_overriding}</td>
                                                </tr>
                                                <tr>
                                                    <td>Commission (MTD)</td>
                                                    <td className="text-center">{group.comission}</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc Monthly Allowance (YTD)</td>
                                                    <td className="text-center">{group.acc_m_allowance}</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc Extra Allowance (YTD)</td>
                                                    <td className="text-center">{group.acc_e_allowance}</td>
                                                </tr>
                                                <tr>
                                                    <td>Acc Monthly Allowance Deficit (YTD)</td>
                                                    <td className="text-center">{group.acc_m_allowance_def}</td>
                                                </tr>
                                                </tbody>
                                            </table>
                                        </div>
                                        </div>
                                    </div>	
                                </div>
                                <br/>
                                <div className="entry">
                                    <span>Extra Allowance</span>
                                    <input type="text" className="form-control" value={group.extra_allowance} disabled/>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
		);
}
}
export default ExtraAllowanceGs;