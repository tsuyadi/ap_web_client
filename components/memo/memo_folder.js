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

import {CATEGORY, TYPE} from '../../common_components/helper/constant';

import MemoFormList from './MemoFormList';



class memo_folder extends React.Component {
	constructor(props){
		super(props);
		CekAuth();

		this.state = {
			folder_name: this.props.params.folder_name,
			prev_menu : ''
		}

		this.getCombo = this.getCombo.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.menuClick = this.menuClick.bind(this);
		this.inputClick = this.inputClick.bind(this);

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

	inputClick(menu_name){
		let url = '#/memo/add/' + menu_name;
		window.location.href = api_route.baseOnly + url;
		window.location.reload();
	}

	render(){
	
		$(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});


		let choosen_menu = this.state.folder_name || '';

		let menu = getMenu('Memo / Form', 'fa fa-book');

		let department_list_cb = [];
		
		let department_cat_list_cb = [];
		
		let list_data_memo = [];
		
		let list_data_form = [];
		
		let list_menu = [];

		let buttonBack = [];

		let buttonAdd = [];

		let addEvent = '0';

		let prev_menu = '';

		let titleMenu = 'Memo / Form';

		switch(choosen_menu){
			case 'contest' :
				addEvent = '1';
				prev_menu = 'memo';
				titleMenu = 'Memo :: Contest';
				list_menu.push(<MemoFormList type={TYPE.MEMO} cat_id={CATEGORY.CONTEST} />);
				break;
			case 'non_contest' :
				addEvent = '1';
				prev_menu = 'memo';
				titleMenu = 'Memo :: Non Contest';
				list_menu.push(<MemoFormList type={TYPE.MEMO} cat_id={CATEGORY.NON_CONTEST} />);
				break;
			case 'agency_services':
				addEvent = '1';
				prev_menu = 'form';
				titleMenu = 'Form :: Agency Services';
				list_menu.push(<MemoFormList type={TYPE.FORM} cat_id={CATEGORY.AGENCY_SERVICES} />);
				break;
			case 'new_business' :
				addEvent = '1';
				prev_menu = 'client_services';
				titleMenu = 'Form :: Client Services :: New Business';
				list_menu.push(<MemoFormList type={TYPE.FORM} cat_id={CATEGORY.NEW_BUSINESS} />);
				break;
			case 'after_sales_service' :
				addEvent = '1';
				prev_menu = 'client_services';
				titleMenu = 'Form :: Client Services :: After Sales Services';
				list_menu.push(<MemoFormList type={TYPE.FORM} cat_id={CATEGORY.AFTER_SALES_SERVICES} />);
				break;
			case 'client_services' :
				addEvent = '0';
				prev_menu = 'form'
				titleMenu = 'Form :: Client Services';
				list_menu.push(
					<div className="panel-body">
						<div className="row">
							<a onClick={this.menuClick.bind(this, 'new_business')}>
								<div className="col-sm-4 cardmenu">
									<div className="panel panel-default">
										<div className="panel-body text-center"  style={{'height':'80px'}}><i className="fa fa-briefcase fa-2x"></i><br />NEW BUSINESS</div>
									</div>
								</div>
							</a>
							<a onClick={this.menuClick.bind(this, 'after_sales_service')}>
								<div className="col-sm-4 cardmenu">
									<div className="panel panel-default">
										<div className="panel-body text-center"  style={{'height':'80px'}}><i className="fa fa-hand-grab-o fa-2x"></i><br />AFTER SALES SERVICES</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				);
				break;
			case 'form' :
				addEvent = '0';
				titleMenu = 'Form';
				list_menu.push(
					<div className="panel-body">
						<div className="row">
							<a onClick={this.menuClick.bind(this, 'agency_services')}>
								<div className="col-sm-4 cardmenu">
									<div className="panel panel-default">
										<div className="panel-body text-center"  style={{'height':'80px'}}><i className="fa fa-users fa-2x"></i><br />AGENCY SERVICES</div>
									</div>
								</div>
							</a>
							<a onClick={this.menuClick.bind(this, 'client_services')}>
								<div className="col-sm-4 cardmenu">
									<div className="panel panel-default">
										<div className="panel-body text-center"  style={{'height':'80px'}}><i className="fa fa-user fa-2x"></i><br />CLIENT SERVICES</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				);
				break;
			case 'memo' :
				addEvent = '0';
				titleMenu = 'Memo';
				list_menu.push(
					<div className="panel-body">
						<div className="row">
							<a onClick={this.menuClick.bind(this, 'contest')}>
								<div className="col-sm-4 cardmenu">
									<div className="panel panel-default">
										<div className="panel-body text-center"  style={{'height':'80px'}}><i className="fa fa-trophy fa-2x"></i><br />CONTEST</div>
									</div>
								</div>
							</a>
							<a onClick={this.menuClick.bind(this, 'non_contest')}>
								<div className="col-sm-4 cardmenu">
									<div className="panel panel-default">
										<div className="panel-body text-center"  style={{'height':'80px'}}>
											<span className="fa-stack fa-lg">
												<i className="fa fa-trophy fa-stack-1x text-danger"></i>
												<i className="fa fa-ban fa-stack-2x"></i>
											</span><br/>
											NON CONTEST
										</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				);
				break;
			default :
				addEvent = '0';
				prev_menu = undefined;
				list_menu.push(
					<div className="panel-body">
						<div className="row">
							<a onClick={this.menuClick.bind(this, 'form')}>
								<div className="col-sm-4 cardmenu">
									<div className="panel panel-default">
										<div className="panel-body text-center"  style={{'height':'80px'}}><i className="fa fa-file-text-o fa-2x"></i><br /> FORM</div>
									</div>
								</div>
							</a>
							<a onClick={this.menuClick.bind(this, 'memo')}>
								<div className="col-sm-4 cardmenu">
									<div className="panel panel-default">
										<div className="panel-body text-center"  style={{'height':'80px'}}><i className="fa fa-book fa-2x"></i><br /> MEMO</div>
									</div>
								</div>
							</a>
						</div>
					</div>
				);
				break;
		}

		if(addEvent == '1'){
			if(localStorage.role == "1" || localStorage.role == "2" || localStorage.role == "3" || localStorage.role == "4" || localStorage.role == "10" || localStorage.username == "user.banca"){
				buttonAdd.push(
					<div onClick={this.inputClick.bind(this, choosen_menu)} className="box-link next-nav" data-toggle="tooltip" data-placement="top" title="Create"><i className="fa fa-plus"></i></div>
				);
			}
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
								<div className="col-xs-12">
									<div className="panel panel-default">
										<div className="panel-heading" style={{'backgroundColor':'#0096A9', 'color':'#FFF', 'fontWeight':'bold', 'overflow':'hidden'}}>
											<div className="panel-title">
												<div className="row">
													<div className="col-xs-2 col-sm-1">
														{buttonBack}
													</div>
													<div className="col-xs-8 col-sm-10">{titleMenu}</div>															
													<div className="col-xs-2 col-sm-1">
														{buttonAdd}
													</div>
												</div>
											</div>
										</div>

										{list_menu}

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

export default memo_folder;