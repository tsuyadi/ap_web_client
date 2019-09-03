"use strict"


import api_route from '../../common_components/api_route';
import React from 'react';
import Pagination from 'react-js-pagination';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import {getMenu} from '../../common_components/helper/user_session';
import {DatePicker, MonthPicker} from '../../common_components/date_picker';
import {COMM_TYPE, GET_COMM_NAME, MIME_TYPE, GET_PROD_NAME, PROD_TYPE, COMMON} from '../../common_components/helper/constant';
import {DateFormat, MoneyFormat, DateFormatYMD} from '../../common_components/helper/formatter';
import {getDataSource} from '../../common_components/resources/datasource';
import {load, AjaxDownloadFile} from '../../common_components/helper/url_helper';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';

class tm_connect_main extends React.Component {

    constructor(props){
        super(props);
    }

    state = {
        tm_connect_pass : null
    }

    componentDidMount = () => {
        
        $('.password-result').hide();

    }

    getPassword = (req) => {

        if(req != null) {
            req.preventDefault();
        }

        $('.password-result').hide();

        $.ajax({
            url : api_route.tm_connect_get_password,
            data : {
                strAgentId : localStorage.getItem('agent_code'),
                key : COMMON.TM_CONNECT_KEY
            },
            success : (response) => {
                
                // success response
                
                $('.password-result').show();

                this.setState({
                    tm_connect_pass : response.childNodes[0].textContent
                });

            },
            error : (response) => {
                
                alert('Error happened while requesting a password');
                // error response
            }
        });
    }

    render = () => {

        /**
		 * Load Menu Based on Its Module
		 */
		let menu = getMenu('TMConnect', 'fa fa-mobile');

        return (
            <div className="wrap2">

	            {menu}
                <SubmitModal />

				<div className="main-wrapper">
					<ol className="breadcrumb" style={{marginBottom: '5px'}}>
						 <li className="active">TMConnect</li>
					</ol>

					<div className="main">

						<div className="panel panel-default boxShadow">
							<div className="panel-heading textShadow headPanel">
								<h1 className="panel-title"><i className="fa fa-mobile"></i> TMConnect</h1>
							</div>
							<div className="panel-body">
								<div id="block1">
									<div className="row">
                                        <div className="col-xs-12">
                                            
                                            <div className="row">
                                                <div className="col-sm-12 text-center">
                                                    <div className="col-md-12">
                                                    <img src="assets/img/tm_ipad.png" />
                                                    </div>
                                                    <div className="col-md-12">
                                                    <a  href="https://tmconnect.tokiomarine-life.co.id/anvoaiwenvwae0v-wevjhweivnawuen12j3n12m%20asjkdfna%20sdjf%20123.html">TMConnect Client iPad</a><br />                                                                                                            
                                                    </div>
                                                </div>
                                                {/* <div className="col-sm-6 text-center">
                                                    <div className="col-md-12">
                                                    <img src="assets/img/tm_pc.png" style={{marginTop:'60px'}} /><br />
                                                    </div>
                                                    <div className="col-md-12">
                                                    <a href="https://tmconnect.tokiomarine-life.co.id:8443">TMConnect Web</a>
                                                    </div>
                                                </div> */}
                                                {/* <div className="col-sm-4 text-center">
                                                    <div className="col-md-12">
                                                    <img src="assets/img/iphonex.jpg" style={{marginTop:'60px',height:'200px'}} />
                                                    </div>
                                                    <div className="col-md-12">
                                                    <a href="itms-services://?action=download-manifest&url=https://api-agent.tokiomarine-life.co.id/media/manifest.plist">AMS for iPhone</a>
                                                    </div>
                                                    <div className="col-md-12">
                                                    <a href={"assets/file/AMS-UserGuide.pdf"}>AMS User Guide</a>
                                                    </div>
                                                <br />
                                                </div> */}
                                            </div>
                                            
                                            <div className="row">
                                                <div className="col-xs-12">&nbsp;</div>
                                            </div>
                                            <div className="row">
                                                <div className="col-sm-12 text-center">
                                                    <button className="btn btn-primary btn-lg" onClick={this.getPassword}>TMConnect Password Request</button>
                                                </div>
                                                <div className="col-sm-12 text-center">
                                                    <div className="password-result">
                                                        Password Information : 
                                                        <div className="alert alert-warning">
                                                            <b>{this.state.tm_connect_pass}</b>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>										
									</div>
								</div>
							</div>
						</div>
						
					</div>

				</div>
                <FeatureModal />
				<Footer />

			</div>
        );
    }

}

export default tm_connect_main;