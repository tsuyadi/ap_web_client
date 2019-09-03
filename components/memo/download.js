'use strict'

import {CheckAgentType,DateFormat, DateFormatExYMD} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import {loadLink, load} from '../../common_components/helper/url_helper';
import Loading from '../../common_components/loading';

import TopMenu from '../../common_components/menu_v2/menu_comission';
import Footer from '../../common_components/footer';

import SubmitModal from '../../common_components/modal/submit_modal';

import {getMenu} from '../../common_components/helper/user_session';

class memo_download extends React.Component {
	constructor(props){
		super(props);
		CekAuth();

		this.state = {
			department_list : {},
			department_category_list : {},
			listMemo : {},
			listForm : {},
			param : {
				department_category : '',
				department : ''
			}
		}

		this.getCombo = this.getCombo.bind(this);
		this.changeHandler = this.changeHandler.bind(this);

	}

	

	componentDidMount(){		
		$('#loading').modal('show');

		this.getCombo();
		loadLink(api_route.memo_list, (response) => {
			this.setState({
				listMemo : response
			});
		});

		loadLink(api_route.form_list, (response) => {
			$('#loading').modal('hide');
			this.setState({
				listForm : response
			});
		});
		
	}

	loadList(type){
		
		$('.load_list').show();

		if(type == 'memo'){
			load(api_route.memo_list, this.state.param
				, (response) => {
					$('.load_list').hide();
					this.setState({
						listMemo : response
					});
				}		
				, (error) => {
					$('.load_list').hide();
					console.dir(error);
					alert("Something error please contact agency support");
				}		
			);
		}else if(type == 'form'){
			load(api_route.form_list, this.state.param
				, (response) => {
					$('.load_list').hide();
					this.setState({
						listForm : response
					});
				}		
				, (error) => {
					$('.load_list').hide();
					console.dir(error);
					alert("Something error please contact agency support");
				}		
			);
		}
	}

	getCombo(){
		
		$.ajax({
			url : api_route.agencyDepartment,
			type : 'GET',
			success : (e, v) => {										
				if(e != null && e.length > 0){
					this.setState({
						department_list : e
					});
				}
			},
			error : (error) => {
				if(err.responseJSON){
					window.location.href = window.location.href.split('#')[0] + '#/';
				}
			}
		});

		$.ajax({
			url : api_route.agencyDepartmentCategory,
			type : 'GET',
			success : (e, v) => {			
				if(e != null && e.length > 0){
					this.setState({
						department_category_list : e
					});
				}
			},
			error : (err) => {
				if(err.responseJSON){
					window.location.href = window.location.href.split('#')[0] + '#/';
				}
			}
		});
	}

	changeHandler(event){
		
		let data_array = {};
		for (let i in this.state.param) {
			if(i==event.target.name){
				data_array[i] = event.target.value
			}
			else{
				data_array[i] = this.state.param[i]
			}
		}
		this.setState({
			param : data_array
		});

	}

	render(){
		
		let menu = getMenu('Memo Download', 'fa fa-book');

		let department_list_cb = [];
		department_list_cb.push(
			<option key={0} value="">select</option>						
		)
		if(this.state.department_list != null && this.state.department_list.length > 0){
			let department_cat = this.state.param.department_category;
			if(department_cat != ''){
				this.state.department_list.map(function(e){
					if(e.department_category == department_cat){
						department_list_cb.push(
							<option key={e.id} value={e.id}>{e.name}</option>						
						)
					}
				});
			}
		}

		let department_cat_list_cb = [];
		department_cat_list_cb.push(
			<option key={0} value="">select</option>						
		)		
		if(this.state.department_category_list != null && this.state.department_category_list.length > 0){
			this.state.department_category_list.map(function(e){				
				department_cat_list_cb.push(
					<option key={e.id} value={e.id}>{e.name}</option>						
				)
			});
		}

		let list_data_memo = [];
		if(this.state.listMemo != null && this.state.listMemo.length > 0){
			this.state.listMemo.map((e) => {
				// // debugger;
				let dateStart = new Date(e.created_at);
				let currentDate = new Date();

				let label = [];
				
				if(dateStart.getDate() == currentDate.getDate()){
					label.push(
						<span className="badge">New</span>
					);
				}
				
				let createDt = DateFormat(e.created_at);

				list_data_memo.push(
					<a href={api_route.baseAPI + e.filename} className="list-group-item">
						<div className="row">
							<div className="col-xs-11" style={{'fontSize':'10px'}}>Created on {createDt}</div>
							<div className="col-xs-1 text-right"><i className="fa fa-download" aria-hidden="true"></i></div>
						</div>
						<div className="row">
							<div className="col-xs-11">{e.name}</div>
							<div className="col-xs-1">{label}</div>
						</div>
					</a>
				);
			})
		}else{
			list_data_memo.push(
				<div className="list-group-item">
					<div className="row">
						<div className="col-xs-11" style={{'fontSize':'10px'}}></div>
						<div className="col-xs-1"></div>
					</div>
					<div className="row">
						<div className="col-xs-12 text-center">File Not Found</div>
					</div>
				</div>
			);
		}

		let list_data_form = [];
		if(this.state.listForm != null && this.state.listForm.length > 0){
			this.state.listForm.map((e) => {
				// // debugger;
				let dateStart = new Date(e.created_at);
				let currentDate = new Date();

				let label = [];
				
				if(dateStart.getDate() == currentDate.getDate()){
					label.push(
						<span className="badge">New</span>
					);
				}
				
				let createDt = DateFormat(e.created_at);

				list_data_form.push(
					<a href={api_route.baseAPI + e.filename} className="list-group-item">
						<div className="row">
							<div className="col-xs-11" style={{'fontSize':'10px'}}>Created on {createDt}</div>
							<div className="col-xs-1 text-right"><i className="fa fa-download" aria-hidden="true"></i></div>
						</div>
						<div className="row">
							<div className="col-xs-11">{e.name}</div>
							<div className="col-xs-1">{label}</div>
						</div>
					</a>
				);
			})
		}else{
			list_data_form.push(
				<div className="list-group-item">
					<div className="row">
						<div className="col-xs-11" style={{'fontSize':'10px'}}></div>
						<div className="col-xs-1"></div>
					</div>
					<div className="row">
						<div className="col-xs-12 text-center">File Not Found</div>
					</div>
				</div>
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
								<div className="col-md-offset-3 col-md-6">
									<div className="row">
										<div className="col-xs-12">
											<div className="tab-mobile">
												<ul className="nav nav-tabs" role="tablist">
													<li role="presentation" className="active"><a href="#memo_list" aria-controls="memo_list" role="tab" data-toggle="tab">List Memo</a></li>
													<li role="presentation"><a href="#form_list" aria-controls="form_list" role="tab" data-toggle="tab">List Form</a></li>
												</ul>
												<div className="tab-content" style={{'border':'1px solid #ddd', 'padding':'15px'}}>
													<div role="tabpanel" className="tab-pane active" id="memo_list">

														<div className="row">
															<div className="col-xs-12">
																<div className="row">
																	<div style={{'padding':'15px'}}>
																		<div className="row">
																			<div className="col-xs-12">
																				<form className="form-horizontal">
																					<div className="form-group">
																						<label className="col-sm-4">Category</label>
																						<div className="col-sm-8">
																							<select className="form-control" id="department_category" name="department_category" onChange={this.changeHandler}>
																								{department_cat_list_cb}
																							</select>
																						</div>
																					</div>
																				</form>
																			</div>
																			<div className="col-xs-12">
																				<form className="form-horizontal">
																					<div className="form-group">
																						<label className="col-sm-4">Department</label>
																						<div className="col-sm-8">
																							<select className="form-control" id="department" name="department" onChange={this.changeHandler}>
																								{department_list_cb}
																							</select>
																						</div>
																					</div>
																				</form>
																			</div>
																			<div className="col-xs-12">
																				<div className="row">
																					<div className="col-sm-offset-9 col-sm-3">
																						<button className="btn btn-primary btn-block" onClick={this.loadList.bind(this, 'memo')} type="button"><i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load_list" ></i> Search</button>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<div className="row">
															<div className="col-xs-12">
																<div className="row">
																	<div  style={{'padding':'15px'}}>
																		<div style={{'borderBottom':'1px solid #eee', 'margin':'10px 0px'}}></div>																		
																		<div className="list-group">	
																			{list_data_memo}
																			{/*}
																			<a href="#" className="list-group-item">Internal Memo SCPS Jan 2016 <span className="badge">New</span></a>
																			<a href="#" className="list-group-item">Internal Memo SCPS Feb 2016</a>
																			<a href="#" className="list-group-item">Internal Memo SCPS Mar 2016</a>
																			<a href="#" className="list-group-item">Internal Memo SCPS Apr 2016</a>
																			<a href="#" className="list-group-item">Internal Memo SCPS May 2016</a>
																			{*/}
																		</div>
																	</div>
																</div>
															</div>
														</div>

													</div>

													<div role="tabpanel" className="tab-pane" id="form_list">

														<div className="row">
															<div className="col-xs-12">
																<div className="row">
																	<div style={{'padding':'15px'}}>
																		<div className="row">
																			<div className="col-xs-12">
																				<form className="form-horizontal">
																					<div className="form-group">
																						<label className="col-sm-4">Category</label>
																						<div className="col-sm-8">
																							<select className="form-control" id="department_category" name="department_category" onChange={this.changeHandler}>
																								{department_cat_list_cb}
																							</select>
																						</div>
																					</div>
																				</form>
																			</div>
																			<div className="col-xs-12">
																				<form className="form-horizontal">
																					<div className="form-group">
																						<label className="col-sm-4">Department</label>
																						<div className="col-sm-8">
																							<select className="form-control" id="department" name="department" onChange={this.changeHandler}>
																								{department_list_cb}
																							</select>
																						</div>
																					</div>
																				</form>
																			</div>
																			<div className="col-xs-12">
																				<div className="row">
																					<div className="col-sm-offset-9 col-sm-3">
																						 <button className="btn btn-primary btn-block" onClick={this.loadList.bind(this, 'form')} type="button"><i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load_list" ></i> Search</button>
																					</div>
																				</div>
																			</div>
																		</div>
																	</div>
																</div>
															</div>
														</div>

														<div className="row">
															<div className="col-xs-12">
																<div className="row">
																	<div  style={{'padding':'15px'}}>
																		<div style={{'borderBottom':'1px solid #eee', 'margin':'10px 0px'}}></div>
																		<div className="list-group">
																			{list_data_form}
																			{/*}
																			<a href="#" className="list-group-item">Internal Memo SCPS Jan 2016 <span className="badge">New</span></a>
																			<a href="#" className="list-group-item">Internal Memo SCPS Feb 2016</a>
																			<a href="#" className="list-group-item">Internal Memo SCPS Mar 2016</a>
																			<a href="#" className="list-group-item">Internal Memo SCPS Apr 2016</a>
																			<a href="#" className="list-group-item">Internal Memo SCPS May 2016</a>
																			{*/}
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

export default memo_download;