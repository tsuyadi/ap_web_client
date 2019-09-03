'use strict'

import {CheckAgentType,DateFormat, DateFormatExYMD, srvTime} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import {loadLink, load} from '../../common_components/helper/url_helper';
import Loading from '../../common_components/loading';

import TopMenu from '../../common_components/menu_v2/menu_comission';
import Footer from '../../common_components/footer';

import SubmitModal from '../../common_components/modal/submit_modal';

import {getMenu} from '../../common_components/helper/user_session';

import MemoFormList from './MemoFormList';

import MemoForm from './MemoForm';

import {CATEGORY, TYPE} from '../../common_components/helper/constant';

class memo_input extends React.Component {
	constructor(props){
		super(props);
		CekAuth();

		this.state = {
			data : null,
			folder_name: this.props.params.folder_name,
			prev_menu : ''
		}

		this.getCombo = this.getCombo.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.menuClick = this.menuClick.bind(this);

	}

	componentDidMount(){		
		
	}

	loadList(type){
		
	}

	getCombo(){
		
	}

	changeHandler(event){
		

	}

	menuClick(menu_name){

		let url = '#/memo/folder/' + menu_name;
		window.location.href = api_route.baseOnly + url;
		window.location.reload();
	}

	render(){
		
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
			if(!$('#treenas').hasClass('tree')){
				$('#treenas').treed();
				this.location.reload();
			}	
		});


		let choosen_menu = this.state.folder_name || '';

		let menu = getMenu('Memo Download', 'fa fa-book');

		let department_list_cb = [];
		
		let department_cat_list_cb = [];
		
		let list_data_memo = [];
		
		let list_data_form = [];
		
		let list_menu = [];

		let buttonBack = [];

		let buttonList = [];

		let list_event = '0';

		let prev_menu = '';

		let memo_form = [];

		let titleMenu = 'E-Library';

		let category = null;

		switch(choosen_menu){
			case 'contest' :
				list_event = '1';
				prev_menu = 'contest';
				titleMenu = 'Add Memo Contest';
				memo_form.push(<MemoForm type={TYPE.MEMO} cat_id={CATEGORY.CONTEST} />);
				break;
			case 'non_contest' :
				list_event = '1';
				prev_menu = 'non_contest';
				titleMenu = 'Add Memo Non Contest';
				memo_form.push(<MemoForm type={TYPE.MEMO} cat_id={CATEGORY.NON_CONTEST} />);
				break;
			case 'agency_services':
				list_event = '1';
				prev_menu = 'agency_services';
				titleMenu = 'Add Form Agency Services';
				memo_form.push(<MemoForm type={TYPE.FORM} cat_id={CATEGORY.AGENCY_SERVICES} />);
				break;
			case 'new_business' :
				list_event = '1';
				prev_menu = 'new_business';
				titleMenu = 'Add Form New Business';
				memo_form.push(<MemoForm type={TYPE.FORM} cat_id={CATEGORY.NEW_BUSINESS} />);
				break;
			case 'after_sales_service' :
				list_event = '1';
				prev_menu = 'after_sales_service'
				titleMenu = 'Add Form After Sales Services';
				memo_form.push(<MemoForm type={TYPE.FORM} cat_id={CATEGORY.AFTER_SALES_SERVICES} />);
				break;			
			default :
				list_event = '0';
				prev_menu = undefined;
				memo_form.push(
					<div className="panel-body">
						<div className="row">
							<h1>404 Page Not Found.</h1>
						</div>
					</div>
				);
				break;
		}

		if(list_event == '1'){
			buttonList.push(
				<div className="box-link next-nav" data-toggle="tooltip" data-placement="top" title="List"><i className="fa fa-list"></i></div>
			);
		}

		if(prev_menu != undefined){
			buttonBack.push(
				<div onClick={this.menuClick.bind(this, prev_menu)} className="box-link prev-nav"><i className="fa fa-arrow-circle-left"></i></div>
			);
		}

		return (
			<div className="wrap2">

			{/* Start Top Menu Section */}
			{menu}
			{/* End Top Menu Section */}
			<SubmitModal />
			<div className="main-wrapper twoColumnMain">
				<div className="main">
					
					<div className="row">
						<div className="col-xs-12">
							<div className="row">
								<div className="col-lg-3 col-xs-4">
									<div className="panel panel-default">
										<div className="panel-body" style={{'minHeight':'80vh'}}>
											<ul id="treenas">
												<li><a href="#">Form</a>
													<ul>
														<li><a onClick={this.menuClick.bind(this, 'agency_services')}><i className="fa fa-users"></i> Agency Services</a></li>
														<li>Client Services
															<ul>
																<li><a onClick={this.menuClick.bind(this, 'new_business')}><i className="fa fa-briefcase"></i> New Business</a></li>
																<li><a onClick={this.menuClick.bind(this, 'after_sales_service')}><i className="fa fa-hand-grab-o"></i> After Sales Services</a></li>
															</ul>
														</li>
													</ul>
												</li>
												<li>Memo
													<ul>
														<li><a onClick={this.menuClick.bind(this, 'contest')}><i className="fa fa-trophy"></i> Contest</a></li>
														<li><a onClick={this.menuClick.bind(this, 'non_contest')}><i className="fa fa-trophy text-danger"></i> Non Contest</a></li>
													</ul>
												</li>
											</ul>
										</div>
									</div>
								</div>
								<div className="col-lg-9 col-xs-8">
									<div className="panel panel-default">
										<div className="panel-heading" style={{'backgroundColor':'#0096A9', 'color':'#FFF', 'fontWeight':'bold', 'overflow':'hidden'}}>
											<div className="panel-title">
												<div className="row">
													<div className="col-xs-2 col-sm-1">
														{buttonBack}
													</div>
													<div className="col-xs-8 col-sm-10">{titleMenu}</div>
													{/*}														
													<div className="col-xs-2 col-sm-1">
														{buttonList}
													</div>
													*/}
												</div>
											</div>
										</div>
										{ memo_form }
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

export default memo_input;