'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import Pagination from 'react-js-pagination';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import {getMenu} from '../../common_components/helper/user_session';
import {DatePicker, MonthPicker} from '../../common_components/date_picker';
import {COMM_TYPE, GET_COMM_NAME, MIME_TYPE} from '../../common_components/helper/constant';
import {DateFormat, MoneyFormat, DateFormatYMD} from '../../common_components/helper/formatter';
import {getDataSource} from '../../common_components/resources/datasource';
import {load, AjaxDownloadFile} from '../../common_components/helper/url_helper';
import FeatureModal from '../../common_components/modal/feature_modal';
import SubmitModal from '../../common_components/modal/submit_modal';

var FileSaver = require('file-saver');

class training extends React.Component {
	constructor(props){
		super(props);
	}


	render(){
		
		/**
		 * Load Menu Based on Its Module
		 */
		let menu = getMenu('Training Video', 'fa fa-caret-square-o-right');
		let size = window.innerWidth;
		let vid = [];
		if( size >= 992){
			vid.push(
				<div className="embed-responsive embed-responsive-16by9">
					<iframe className='sproutvideo-playlist embed-responsive-item' src='//videos.sproutvideo.com/playlist/3099d8b21ebe/edcab1084eb4cc3a?layout=0&dividercolor=00d3e6' width='924' height='351' frameBorder='0' allowFullScreen ></iframe>
				</div>
			);
		} else {
			vid.push(
				<iframe className='sproutvideo-playlist embed-responsive-item' src='//videos.sproutvideo.com/playlist/3099d8b21ebe/edcab1084eb4cc3a?layout=1&dividercolor=00d3e6' width='100%' height='351' frameBorder='0' allowFullScreen ></iframe>
			);
		}

		return (
			<div className="wrap2">
				<SubmitModal/>
	            {menu}
				<div className="main-wrapper">
					<div className="main">

						<div className="panel panel-default boxShadow">
							<div className="panel-heading textShadow headPanel">
								<h1 className="panel-title"><i className="fa fa-caret-square-o-right"></i> Training Video</h1>
							</div>
							<div className="panel-body">
								<div className="col-sm-12">
									{vid}
								</div>
							</div>
						</div>
					</div>
				</div>
				<FeatureModal/>
				<Footer />
			</div>
		);
	}
}


export default training;
