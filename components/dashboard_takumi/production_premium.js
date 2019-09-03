'use strict'
import api_route from '../../common_components/api_route';

import {decimalFormat} from '../../common_components/helper/formatter';
import {MoneyFormat} from '../../common_components/helper/formatter';

class PremiumCase extends React.Component {
	constructor(props){
		super(props);
	this.state = {
			data : null
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
					data: response,
					//data : response.takumi_dashboard_group 
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
    
	componentDidMount = () => {
		$('[data-toggle="tooltip"]').tooltip();
	}

	render(){
		var ape_wtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.ape_wtd);
        var ape_mtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.ape_mtd);
        var ape_ytd =  this.state.data && this.state.data.takumi_dashboard_personal.ape_ytd != null ? this.state.data && this.state.data.takumi_dashboard_personal.ape_ytd : 0;
        // var ap_wtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.ap_wtd);
        // var ap_mtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.ap_mtd);
        // var ap_ytd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.ap_ytd);
        var fyp_wtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.fyp_wtd);
        var fyp_mtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.fyp_mtd);
        var fyp_ytd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.fyp_ytd);

        ape_wtd = isNaN(ape_wtd) || ape_wtd == 0 ? 0 : MoneyFormat(ape_wtd);
        ape_mtd = isNaN(ape_mtd) || ape_mtd == 0 ? 0 : MoneyFormat(ape_mtd);
        ape_ytd = isNaN(ape_ytd) || ape_ytd == 0 ? 0 : MoneyFormat(ape_ytd);
        // ap_wtd = isNaN(ap_wtd) || ap_wtd == 0 ? 0 : MoneyFormat(ap_wtd);
        // ap_mtd = isNaN(ap_mtd) || ap_mtd == 0 ? 0 : MoneyFormat(ap_mtd);
        // ap_ytd = isNaN(ap_ytd) || ap_ytd == 0 ? 0 : MoneyFormat(ap_ytd);
        fyp_wtd = isNaN(fyp_wtd) || fyp_wtd == 0 ? 0 : MoneyFormat(fyp_wtd);
        fyp_mtd = isNaN(fyp_mtd) || fyp_mtd == 0 ? 0 : MoneyFormat(fyp_mtd);
        fyp_ytd = isNaN(fyp_ytd) || fyp_ytd == 0 ? 0 : MoneyFormat(fyp_ytd);

        var ec_submit_wtd =  this.state.data && this.state.data.takumi_dashboard_personal.ec_submit_wtd;
        var ec_submit_mtd =  this.state.data && this.state.data.takumi_dashboard_personal.ec_submit_mtd;
        var ec_submit_m6 =  this.state.data && this.state.data.takumi_dashboard_personal.ec_submit_six_previous_month;
        var ec_submit_ytd =  this.state.data && this.state.data.takumi_dashboard_personal.ec_submit_ytd;
        var ec_issued_wtd =  this.state.data && this.state.data.takumi_dashboard_personal.ec_issued_wtd;
        var ec_issued_mtd =  this.state.data && this.state.data.takumi_dashboard_personal.ec_issued_mtd;
        var ec_issued_m6 =  this.state.data && this.state.data.takumi_dashboard_personal.ec_issued_six_previous_month;
        var ec_issued_ytd =  this.state.data && this.state.data.takumi_dashboard_personal.ec_issued_ytd;

        ec_submit_wtd = isNaN(ec_submit_wtd) || ec_submit_wtd == 0 ? 0 : ec_submit_wtd;
        ec_submit_mtd = isNaN(ec_submit_mtd) || ec_submit_mtd == 0 ? 0 : ec_submit_mtd;
        ec_submit_m6 = isNaN(ec_submit_m6) || ec_submit_m6 == 0 ? 0 : ec_submit_m6;
        ec_submit_ytd = isNaN(ec_submit_ytd) || ec_submit_ytd == 0 ? 0 : ec_submit_ytd;
        ec_issued_wtd = isNaN(ec_issued_wtd) || ec_issued_wtd == 0 ? 0 : ec_issued_wtd;
        ec_issued_mtd = isNaN(ec_issued_mtd) || ec_issued_mtd == 0 ? 0 : ec_issued_mtd;
        ec_issued_m6 = isNaN(ec_issued_m6) || ec_issued_m6 == 0 ? 0 : ec_issued_m6;
        ec_issued_ytd = isNaN(ec_issued_ytd) || ec_issued_ytd == 0 ? 0 : ec_issued_ytd;


        var fyc_wtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.fyc_wtd);
        var fyc_mtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.fyc_mtd);
        var fyc_ytd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.fyc_ytd);
        var syc_wtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.syc_wtd);
        var syc_mtd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.syc_mtd);
        var syc_ytd =  parseInt(this.state.data && this.state.data.takumi_dashboard_personal.syc_ytd);

        fyc_wtd = isNaN(fyc_wtd) || fyc_wtd == 0 ? 0 : MoneyFormat(fyc_wtd);
        fyc_mtd = isNaN(fyc_mtd) || fyc_mtd == 0 ? 0 : MoneyFormat(fyc_mtd);
        fyc_ytd = isNaN(fyc_ytd) || fyc_ytd == 0 ? 0 : MoneyFormat(fyc_ytd);
        syc_wtd = isNaN(syc_wtd) || syc_wtd == 0 ? 0 : MoneyFormat(syc_wtd);
        syc_mtd = isNaN(syc_mtd) || syc_mtd == 0 ? 0 : MoneyFormat(syc_mtd);
        syc_ytd = isNaN(syc_ytd) || syc_ytd == 0 ? 0 : MoneyFormat(syc_ytd);
		return (
            <div className="entry">
            <div className="col-lg-4">
                <div className="content content-prod boxShadow" style={{height: '350px'}}>
                    <div className="title textShadow"><i className="fa fa-user"></i> Premium </div>
                    <div className="box-summary" style={{height : '88%'}}>
                        <div className="tab-mobile hidden-md hidden-lg">
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active"><a href="#production_group_wtd" aria-controls="wtd" role="tab" data-toggle="tab">WTD</a></li>
                                <li role="presentation"><a href="#production_group_mtd" aria-controls="mtd" role="tab" data-toggle="tab">MTD</a></li>
                                <li role="presentation"><a href="#production_group_ytd" aria-controls="ytd" role="tab" data-toggle="tab">YTD</a></li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="production_group_wtd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">WTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">APE</td>
                                                <td className="text-right">{ape_wtd}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className="header_table ">AP</td>
                                                <td className="text-right">{ap_wtd}</td>
                                            </tr> */}
                                            <tr>
                                                <td className="header_table ">FYP</td>
                                                <td className="text-right">{fyp_wtd}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className="header_table ">AAP</td>
                                                <td className="text-right">{aap_wtd}</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="production_group_mtd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">MTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">APE</td>
                                                <td className="text-right">{ape_mtd}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className="header_table ">AP</td>
                                                <td className="text-right">{ap_mtd}</td>
                                            </tr> */}
                                            <tr>
                                                <td className="header_table ">FYP</td>
                                                <td className="text-right">{fyp_mtd}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className="header_table ">AAP</td>
                                                <td className="text-right">{aap_mtd}</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="production_group_ytd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table ">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">YTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">APE</td>
                                                <td className="text-right">{ape_ytd}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className="header_table ">AP</td>
                                                <td className="text-right">{ap_ytd}</td>
                                            </tr> */}
                                            <tr>
                                                <td className="header_table ">FYP</td>
                                                <td className="text-right">{fyp_ytd}</td>
                                            </tr>
                                            {/* <tr>
                                                <td className="header_table ">AAP</td>
                                                <td className="text-right">{aap_ytd}</td>
                                            </tr> */}
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{'overflowX':'auto'}}>
                            <table className="table table-responsive table-box cpadding hidden-sm hidden-xs">
                                <thead>
                                    <tr className="info">
                                        <th className="header_table "></th>
                                        <th className="header_table text-center">WTD</th>
                                        <th className="header_table text-center">MTD</th>
                                        <th className="header_table text-center">YTD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="header_table info">APE</td>
                                        <td className="ct_table text-right">{ape_wtd}</td>
                                        <td className="ct_table text-right">{ape_mtd}</td>
                                        <td className="ct_table text-right">{ape_ytd}</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="header_table info">AP</td>
                                        <td className="ct_table text-right">{ap_wtd}</td>
                                        <td className="ct_table text-right">{ap_mtd}</td>
                                        <td className="ct_table text-right">{ap_ytd}</td>
                                    </tr> */}
                                    <tr>
                                        <td className="header_table info">FYP</td>
                                        <td className="ct_table text-right">{fyp_wtd}</td>
                                        <td className="ct_table text-right">{fyp_mtd}</td>
                                        <td className="ct_table text-right">{fyp_ytd}</td>
                                    </tr>
                                    {/* <tr>
                                        <td className="header_table info">AAP</td>
                                        <td className="ct_table text-right">{aap_wtd}</td>
                                        <td className="ct_table text-right">{aap_mtd}</td>
                                        <td className="ct_table text-right">{aap_ytd}</td>
                                    </tr> */}
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="clearfix h25"></div>
            </div>

        {/* Kolom 2 */}

            <div className="col-lg-4">
                <div className="content content-prod boxShadow" style={{height: '350px'}}>
                    <div className="title textShadow"><i className="fa fa-user"></i> Case </div>
                    <div className="box-summary" style={{height : '88%'}}>
                        <div className="tab-mobile hidden-md hidden-lg">
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active"><a href="#c_wtd" aria-controls="c_wtd" role="tab" data-toggle="tab">WTD</a></li>
                                <li role="presentation"><a href="#c_mtd" aria-controls="c_mtd" role="tab" data-toggle="tab">MTD</a></li>
                                <li role="presentation"><a href="#c_m6" aria-controls="c_m6" role="tab" data-toggle="tab">Last 6 Month</a></li>
                                <li role="presentation"><a href="#c_ytd" aria-controls="c_ytd" role="tab" data-toggle="tab">YTD</a></li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="c_wtd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">WTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">EC Submit</td>
                                                <td className="text-right">{ec_submit_wtd}</td>
                                            </tr>
                                            <tr>
                                                <td className="header_table ">EC Issued</td>
                                                <td className="text-right">{ec_issued_wtd}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="c_mtd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">MTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">EC Submit</td>
                                                <td className="text-right">{ec_submit_mtd}</td>
                                            </tr>
                                            <tr>
                                                <td className="header_table ">EC Issued</td>
                                                <td className="text-right">{ec_issued_mtd}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="c_m6">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">Last 6 Month</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">EC Submit</td>
                                                <td className="text-right">{ec_submit_m6}</td>
                                            </tr>
                                            <tr>
                                                <td className="header_table ">EC Issued</td>
                                                <td className="text-right">{ec_issued_m6}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="c_ytd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">YTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">EC Submit</td>
                                                <td className="text-right">{ec_submit_ytd}</td>
                                            </tr>
                                            <tr>
                                                <td className="header_table ">EC Issued</td>
                                                <td className="text-right">{ec_issued_ytd}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div style={{'overflowX':'auto'}}>
                            <table className="table table-responsive table-box cpadding hidden-sm hidden-xs">
                                <thead>
                                    <tr className="info">
                                        <th className="header_table "></th>
                                        <th className="header_table text-center">WTD</th>
                                        <th className="header_table text-center">MTD</th>
                                        <th className="header_table text-center">Last 6 Month</th>
                                        <th className="header_table text-center">YTD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="header_table info">EC Submit</td>
                                        <td className="ct_table text-right">{ec_submit_wtd}</td>
                                        <td className="ct_table text-right">{ec_submit_mtd}</td>
                                        <td className="ct_table text-right">{ec_submit_m6}</td>
                                        <td className="ct_table text-right">{ec_submit_ytd}</td>
                                    </tr>
                                    <tr>
                                        <td className="header_table info">EC Issued</td>
                                        <td className="ct_table text-right">{ec_issued_wtd}</td>
                                        <td className="ct_table text-right">{ec_issued_mtd}</td>
                                        <td className="ct_table text-right">{ec_issued_m6}</td>
                                        <td className="ct_table text-right">{ec_issued_ytd}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="clearfix h25"></div>
            </div>

        {/* Kolom 3 */}
            <div className="col-lg-4">
                <div className="content content-prod boxShadow" style={{height: '350px'}}>
                    <div className="title textShadow"><i className="fa fa-user"></i> Commission </div>
                    <div className="box-summary" style={{height : '88%'}}>
                        <div className="tab-mobile hidden-md hidden-lg">
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active"><a href="#com_wtd" aria-controls="com_wtd" role="tab" data-toggle="tab">WTD</a></li>
                                <li role="presentation"><a href="#com_mtd" aria-controls="com_mtd" role="tab" data-toggle="tab">MTD</a></li>
                                <li role="presentation"><a href="#com_ytd" aria-controls="com_ytd" role="tab" data-toggle="tab">YTD</a></li>
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="com_wtd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">WTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">FYC</td>
                                                <td className="text-right">{fyc_wtd}</td>
                                            </tr>
                                            <tr>
                                                <td className="header_table ">SYC</td>
                                                <td className="text-right">{syc_wtd}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="com_mtd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">MTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">FYC</td>
                                                <td className="text-right">{fyc_mtd}</td>
                                            </tr>
                                            <tr>
                                                <td className="header_table ">SYC</td>
                                                <td className="text-right">{syc_mtd}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="com_ytd">
                                    <div style={{'overflowX':'auto'}}>
                                    <table className="table table-striped cpadding">
                                        <thead>
                                            <tr className="header_table ">
                                                <th style={{width:10 + 'px'}}></th>
                                                <th className="text-center">YTD</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            <tr>
                                                <td className="header_table ">FYC</td>
                                                <td className="text-right">{fyc_ytd}</td>
                                            </tr>
                                            <tr>
                                                <td className="header_table ">SYC</td>
                                                <td className="text-right">{syc_ytd}</td>
                                            </tr>
                                        </tbody>
                                    </table>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div style={{'overflowX':'auto'}}>
                            <table className="table table-responsive table-box cpadding hidden-sm hidden-xs">
                                <thead>
                                    <tr className="info">
                                        <th className="header_table "></th>
                                        <th className="header_table text-center">WTD</th>
                                        <th className="header_table text-center">MTD</th>
                                        <th className="header_table text-center">YTD</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td className="header_table info">FYC</td>
                                        <td className="ct_table text-right">{fyc_wtd}</td>
                                        <td className="ct_table text-right">{fyc_mtd}</td>
                                        <td className="ct_table text-right">{fyc_ytd}</td>
                                    </tr>
                                    <tr>
                                        <td className="header_table info">SYC</td>
                                        <td className="ct_table text-right">{syc_wtd}</td>
                                        <td className="ct_table text-right">{syc_mtd}</td>
                                        <td className="ct_table text-right">{syc_ytd}</td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                    </div>
                </div>
                <div className="clearfix h25"></div>
            </div>
        </div>

        );
	}
}

export default PremiumCase;