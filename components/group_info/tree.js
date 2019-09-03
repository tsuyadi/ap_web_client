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

import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';

var FileSaver = require('file-saver');

class group_info_tree extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			groupInfoList: null,
			param : {
				groupInfo : {
					group : false
				}			
			}
		}
	}

	changeHandler = (tipe_param, changes) => {

		let data_array = this.state.param;
		for (let i in this.state.param) {
			if(i==tipe_param){				
				for(let n in this.state.param[i]){
					if(n==changes.target.name){
						data_array[i][n] = changes.target.value
					}
					else{
						data_array[i][n] = this.state.param[i][n];
					}
				}
			}			
		}
		// console.log(data_array);
		this.setState({
			param : data_array
		});


	}

	componentDidMount = () => {
		
		$('.load-tree').show();

		$.ajax({
			url : api_route.agent_tree,
			headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            type: 'POST',
            success: (response) => {
					
				$('.load-tree').hide();
				$('.btnExport').show();
				
				var datasource = response;
				// console.log('datasource')
				// console.log(datasource)
				// console.log(datasource.length)
				
				$('#chart-container').orgchart({
					'data' : datasource,
					// 'verticalDepth': 3, // From the 3th level of orgchart, nodes will be aligned vertically.
  					'depth': 3,
					'nodeTitle' : 'level',
					'nodeContent': 'title',
					// 'direction': 'l2r',
					// 'zoom': true,
					'exportButton': false,
					'exportFilename': 'ChartAgent' + localStorage.getItem('agent_code')
				});


			},
			error: (response) => {
				$('.load-tree').hide();
				if(response){

				}
			}
			
		});

		
	}

	exportTree = (response) => {
		if(response){
			response.preventDefault();
		}
		$('.oc-export-btn').trigger('click');
		
	}


	render(){
		
		/**
		 * Load Menu Based on Its Module
		 */
		let menu = getMenu('Tree');
		
		return (
			<div className="wrap2">
				<SubmitModal />
				<FeatureModal />
	            {menu}

				<div className="main-wrapper">
					<ol className="breadcrumb" style={{marginBottom: '5px'}}>
						 <li className="active">Tree</li>
					</ol>

					<div className="main">

						<div className="panel panel-default boxShadow">
							<div className="panel-heading textShadow headPanel">
								<h1 className="panel-title"><i className="fa fa-group"></i> Group Family Tree</h1>
							</div>
							<div className="panel-body">
								<div id="block1">
									<div className="row">
										<div className="col-xs-12 text-center">
											<i style={{"display":"none"}} className="fa fa-2x fa-spinner fa-pulse fa-fw load-tree"></i>
										</div>
									</div>
									<div className="row hidden">
										<div className="col-xs-12">
											<a href={api_route.agent_tree_report+'?uid='+localStorage.getItem('agent_id')} style={{marginRight:'20px'}}>
												<button className="btn btn-primary btnExport" >Download</button>
											</a>	
											<a href={api_route.agent_tree_report+'?uid='+localStorage.getItem('agent_id')+'&summary=1'}>
												<button className="btn btn-primary btnExport" >Download Summary</button>
											</a>											
										</div>
									</div>
									<div className="row">
										<div style={{'overflow':'auto'}}>
											<div id="chart-container"></div>
										</div>
									</div>									
								</div>
							</div>
						</div>

						

					</div>

				</div>

				<Footer />

			</div>
		);
	}
}

export default group_info_tree;
