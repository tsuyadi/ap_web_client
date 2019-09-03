'use strict'

import LeaderPotentialAAModal from '../../common_components/modal/leader_weekly_potential_aa_modal';
import LeaderActualBonus from '../../common_components/modal/leader_weekly_actual_bonus';

import api_route from '../../common_components/api_route';

import {loadLink, load, actionDelete} from '../../common_components/helper/url_helper';

import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';

class LeaderWeeklyBonus extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            list : null,
            actual_bonus : null,
            potential_aa : null
        }

        this.getData = this.getData.bind(this);
        this.openActualBonus = this.openActualBonus.bind(this);
        this.openPotentialAA = this.openPotentialAA.bind(this);
        
    }

    componentDidMount(){
        this.getData();
    }

    openActualBonus(data){
        this.props.setLeaderBonusValue(null, data);
        this.setState({
            actual_bonus : data
        });
    }

    openPotentialAA(data){
        this.props.setLeaderBonusValue(data, null);
        this.setState({
            potential_aa : data
        });
    }

    getData(){
        // // debugger;
        load(api_route.bonus_leaderbonus
        , {}
        , (response)=>{
            this.setState({
                list : response
            });
        }
        , (error)=>{
            console.error(error);
        });

    }

    render(){

        let listLeaderWeekly = [];

        let listMonthlyAggregate = [];

        let firstMonth = '';
        let secondMonth = '';

        let dateVersion = ''; 

        let firstMonthValue = 0;
        let secondMonthValue = 0;

        if(this.state.list != null && this.state.list.length > 0){
            
            var count = 0;

            if(this.state.list[0].actual_monthly_aggregate != null){
                // this.state.list[0].actual_monthly_aggregate.map((response, num) => {

                //     count = count + 1;

                //     listMonthlyAggregate.push(
                //         <tr>
                //             <td className="ct_table">{(count)}</td>
                //             <td className="ct_table">{response.month}</td>
                //             <td className="ct_table text-right">{MoneyFormat(response.actual_bonus)}</td>
                //         </tr>
                //     );

                // });

                for(var x = this.state.list[0].actual_monthly_aggregate.length; x>=1; x--){
                    
                    count = count + 1;
                    
                    var response = this.state.list[0].actual_monthly_aggregate[x-1];

                    listMonthlyAggregate.push(
                        <tr>
                            <td className="ct_table">{(count)}</td>
                            <td className="ct_table">{response.month}</td>
                            <td className="ct_table text-right">{MoneyFormat(response.actual_bonus)}</td>
                        </tr>
                    );

                }
            }

            if(this.state.list != null){

                this.state.list.map((response) => {
                
                    dateVersion = new Date(response.period_start);

                    firstMonthValue = response.get_last_one_month_fyc_agregate_sr;
                    secondMonthValue = response.get_last_two_month_fyc_agregate_sr;

                    if(response.source == "DIRECT LEADER"){
                        listLeaderWeekly.push(
                            <tr>
                                <td className="ct_table text-center">{DateFormat(response.period_start) + ' - ' + DateFormat(response.period_end)}</td>
                                <td className="ct_table text-right disabled">{''}</td>
                                <td className="ct_table text-center">{response.source}</td>
                                <td className="ct_table text-center disabled">{''}</td>
                                <td className="ct_table text-right">{MoneyFormat(response.actual_bonus)}</td>
                                <td className="ct_table text-center"><a className="modal-link" data-toggle="modal" data-target="#potential_aa" onClick={this.openPotentialAA.bind(this, response.potential_active_agent_sr)}>{response.potential_active_agent}</a></td>
                                <td className="ct_table text-right">{MoneyFormat(response.potential_bonus)}</td>
                            </tr>
                        );
                    }else{
                        listLeaderWeekly.push(
                            <tr>
                                <td className="ct_table text-center">{DateFormat(response.period_start) + ' - ' + DateFormat(response.period_end)}</td>
                                <td className="ct_table text-right">{MoneyFormat(response.fyc_wtd)}</td>
                                <td className="ct_table text-center">{response.source}</td>
                                <td className="ct_table text-center">{response.actual_agent}</td>
                                <td className="ct_table text-right"><a className="modal-link" data-toggle="modal" data-target="#actual_bonus" onClick={this.openActualBonus.bind(this, response.actual_bonus_sr)}>{MoneyFormat(response.actual_bonus)}</a></td>
                                <td className="ct_table text-center"><a className="modal-link" data-toggle="modal" data-target="#potential_aa" onClick={this.openPotentialAA.bind(this, response.potential_active_agent_sr)}>{response.potential_active_agent}</a></td>
                                <td className="ct_table text-right">{MoneyFormat(response.potential_bonus)}</td>
                            </tr>
                        );
                    }
                    
                });

            }


        }else{

            listLeaderWeekly.push(
                 <tr>
                    <td className="ct_table text-center" colSpan={7}>Not Found</td>
                </tr>
            );

        }

        return (

            <div className="wrapContent boxShadow">
                <div className="subtitle textShadow">Leader Weekly Bonus <i style={{'display':'none'}} className="fa fa-spinner fa-pulse fa-fw load-incomecalc"></i></div>
                <div className="entry">
                  <div className="row">
                        <div className="col-xs-12">
                            <div style={{'overflowX':'auto'}}>
                            <table className="table table-striped table-box" >
                                <thead>
                                    <tr>
                                        <th className="header_table text-center" style={{'fontWeight':'bold', 'width':'200px'}}>Period</th>
                                        <th className="header_table text-center" style={{'fontWeight':'bold', 'width':'100px'}}>FYC WTD</th>
                                        <th className="header_table text-center" style={{'fontWeight':'bold', 'width':'200px'}}>Source</th>
                                        <th className="header_table text-center" style={{'fontWeight':'bold', 'width':'80px'}}>AA Based Issuance</th>
                                        <th className="header_table text-center" style={{'fontWeight':'bold', 'width':'100px'}}>Actual Bonus</th>
                                        <th className="header_table text-center" style={{'fontWeight':'bold', 'width':'80px'}}>Potential AA</th>
                                        <th className="header_table text-center" style={{'fontWeight':'bold', 'width':'100px'}}>Potential Bonus</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {listLeaderWeekly}
                                </tbody>
                            </table>
                            </div>                     
                        </div>
                    </div>
                  <div className="row">
                    <div className="col-md-6">
                        <div className="description">
                            <table>
                                <tbody>
                                    <tr><td style={{'verticalAlign':'top'}}>1. </td><td style={{'verticalAlign':'top', 'width':'150px'}}>Actual Active Agent</td><td style={{'verticalAlign':'top'}}>: </td><td> Agent who submit minimal 1 QC in one week period (Monday to Sunday) and this submission should be issued at least at the end of next month.</td></tr>
                                    <tr><td style={{'verticalAlign':'top'}}>2. </td><td style={{'verticalAlign':'top', 'width':'150px'}}>Potential Active Agent</td><td style={{'verticalAlign':'top'}}>: </td><td> Agent who submit minimal 1 QC in the running week.</td></tr>
                                    <tr><td style={{'verticalAlign':'top'}}>3. </td><td style={{'verticalAlign':'top', 'width':'150px'}}>FYC WTD</td><td style={{'verticalAlign':'top'}}>: </td><td> FYC Group of leader for one week period where submission happen.</td></tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                    <div className="col-md-6">
                        <div className="row">
                            <div className="col-xs-12">
                                <div style={{'height':'30vh', 'overflow-y':'scroll', 'borderBottom':'1px solid #ddd', 'borderLeft':'1px solid #ddd'}}>
                                    <table className="table table-striped table-box">
                                        <thead>
                                            <tr>
                                                <th className="header_table text-center" colSpan="3" style={{'fontWeight':'bold'}}>Leader Weekly Bonus YTD</th>
                                            </tr>
                                            <tr>
                                                <th className="header_table text-center" style={{'fontWeight':'bold','width':'50px'}}>No</th>
                                                <th className="header_table text-center" style={{'fontWeight':'bold','width':'130px'}}>Month</th>
                                                <th className="header_table text-center" style={{'fontWeight':'bold'}}>Actual Leader Weekly Bonus</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {listMonthlyAggregate}                           
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                  </div>
  
                </div>
                
            </div>
        );
    }

}

export default LeaderWeeklyBonus;