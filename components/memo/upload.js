'use strict'

import {CheckAgentType,DateFormat} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import Loading from '../../common_components/loading';

import TopMenuRD from '../../common_components/menu_v2/top_menu_rd';
import TopMenu from '../../common_components/menu_v2/top_menu';
import TopMenuFC from '../../common_components/menu_v2/top_menu_fc';
import TopMenuMgt from '../../common_components/menu_v2/top_mgt';

import Footer from '../../common_components/footer';

import SubmitModal from '../../common_components/modal/submit_modal';

import {DatePicker} from '../../common_components/date_picker';

import {getMenu} from '../../common_components/helper/user_session';

import {MandatoryValidation, FileTypeValidation} from '../../common_components/helper/validation';

class memo_upload extends React.Component {
	constructor(props){
		super(props);
		CekAuth();

		this.state = {
			department_list : {},
			department_category_list : {},
			param : {
				type : '',
				department_category : '',
				department : '',
				filename : '',
				effective_date_start : '',
				effective_date_end : '',
				name : ''
			}				
		}

		this.getCombo = this.getCombo.bind(this);
		this.submitUpload = this.submitUpload.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.viewUpload = this.viewUpload.bind(this);
	}
	
	componentDidMount(){
		this.getCombo();
	}

	getCombo(){
		$('#loading').modal('show');
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
				$('#loading').modal('hide');
				if(e != null && e.length > 0){
					this.setState({
						department_category_list : e
					});
				}
			},
			error : (error) => {
				$('#loading').modal('hide');
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
				if(event.target.name == "filename"){
					if(FileTypeValidation(event.target.value)){
						data_array[i] = event.target.value
					}else{
						event.target.value = '';
						data_array[i] = '';
					}
				}else{
					data_array[i] = event.target.value
				}
			}
			else{
				data_array[i] = this.state.param[i]
			}
		}
		this.setState({
			param : data_array
		});

	}

	submitUpload(){

		let effective_date_start = $('[name=effective_date_start]').val();
		let effective_date_end = $('[name=effective_date_end]').val();

		effective_date_start = this.state.param.effective_date_start = effective_date_start.split("-").reverse().join("-");
		effective_date_end = this.state.param.effective_date_end = effective_date_end.split("-").reverse().join("-");

		$('#loading').modal('show');

		var formData = new FormData($('#formupload')[0]);
		formData.append('department_category', this.state.param.department_category);
		formData.append('department', this.state.param.department);
		formData.append('effective_date_start', effective_date_start);
		formData.append('effective_date_end', effective_date_end);

		$.ajax({
			headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
			url: api_route.memo_upload_action,
			data : formData,
			type : 'POST',
			processData: false,
			contentType: false,
			success : (response, e) => {
				$('#loading').modal('hide');
				alert("Memo are sucessfully uploaded !");
				window.location.reload();
			},
			error : (error) => {
				$('#loading').modal('hide');
				if(error.responseJSON){
					alert("Something wrong happened");					
				}
			}
		});

	}

	viewUpload(){

	}

	render(){
		let agent_level = '-';
		if(this.state.agent_profile)
		{
			if($.isNumeric(this.state.user.level.type)){
				agent_level = this.state.userLevel[parseInt(this.state.user.level.type) - 1];
			}
			else
			{
				agent_level = this.state.agent_profile.user.Level.type;	
			}
		}

		let department_list_cb = [];
		department_list_cb.push(
			<option value="">select</option>						
		)
		if(this.state.department_list != null && this.state.department_list.length > 0){
			let department_cat = this.state.param.department_category;
			if(department_cat != ''){
				this.state.department_list.map(function(e){
					if(e.department_category == department_cat){
						department_list_cb.push(
							<option value={e.id}>{e.name}</option>						
						)
					}
				});
			}
		}

		let department_cat_list_cb = [];
		department_cat_list_cb.push(
			<option value="">select</option>						
		)		
		if(this.state.department_category_list != null && this.state.department_category_list.length > 0){
			this.state.department_category_list.map(function(e){				
				department_cat_list_cb.push(
					<option value={e.id}>{e.name}</option>						
				)
			});
		}

		let menu = getMenu('Memo', 'fa fa-book');
		
		return (
			<div className="wrap2">
			{menu}
			<SubmitModal />
			<div className="main-wrapper twoColumnMain">
				<ol className="breadcrumb" style={{marginBottom: '5px'}}>
					<li className="active">Memo</li>
				</ol>
				<div className="main">
					<div className="container-fluid personalData">
						<div className="title"><i className="fa fa-user"></i> Module to Upload Form &amp; Memo</div>
						<div className="row">
							<div className="col-xs-12">
								<div className="row">
									<div className="col-md-offset-3 col-md-6">
										<div className="row">
											<div className="col-xs-12">
												<form className="form-horizontal" id="formupload">
													<div className="form-group">
														<label className="col-sm-4">Type of Document</label>
														<div className="col-sm-8">
															<select className="form-control" id="type" name="type" onChange={this.changeHandler}>
																<option value="">select</option>
																<option value="1">Memo</option>
																<option value="2">Form</option>
															</select>
															<MandatoryValidation parameter={this.state.param} variable="type" customLabel="Document Type" />
														</div>
													</div>
													<div className="form-group">
														<label className="col-sm-4">Name of Document</label>
														<div className="col-sm-8">
															<input type="text" className="form-control" name="name" id="name" onChange={this.changeHandler} />
															<MandatoryValidation parameter={this.state.param} variable="name" customLabel="Document Name" />
														</div>
													</div>
													<div className="form-group">
														<label className="col-sm-4">File ( *.pdf )</label>
														<div className="col-sm-8">
															<input type="file" className="form-control" name="filename" id="filename" onChange={this.changeHandler} />
															<MandatoryValidation parameter={this.state.param} variable="filename" customLabel="File" />
														</div>
													</div>
												</form>
											</div>
											<div className="col-xs-12">
												<form className="form-horizontal">
													
													<div className="form-group">
														<label className="col-sm-4">Effective Date</label>
														<div className="col-sm-8">
															<div className="row">
																<div className="col-sm-6" style={{'margin-bottom':'10px'}}><DatePicker className="form-control" id="effective_date_start" name="effective_date_start" placeholder="from" /></div>
																<div className="col-sm-6"><DatePicker className="form-control" id="effective_date_end" name="effective_date_end" placeholder="to" /></div>
															</div>	
														</div>
													</div>

												</form>
											</div>
											<div className="col-xs-12">
												<form className="form-horizontal">
													<div className="form-group">
														<label className="col-sm-4">Category</label>
														<div className="col-sm-8">
															<select className="form-control" id="department_category" name="department_category" onChange={this.changeHandler}>
																{department_cat_list_cb}																
															</select>
															<MandatoryValidation parameter={this.state.param} variable="department_category" customLabel="Category" />
														</div>
													</div>
													<div className="form-group">
														<label className="col-sm-4">Department</label>
														<div className="col-sm-8">
															<select className="form-control" id="department" name="department" onChange={this.changeHandler} >
																{department_list_cb}																
															</select>
															<MandatoryValidation parameter={this.state.param} variable="department" customLabel="Department" />
														</div>
													</div>													
												</form>
											</div>
											<div className="col-xs-12">
												<div className="row">
													<div className="col-xs-offset-4 col-xs-4 col-sm-offset-8 col-sm-2">
														<a href="#/memo/download">
															<button className="btn btn-primary btn-block" type="button">View</button>
														</a>
													</div>
													<div className="col-xs-4 col-sm-2">
														<button className="btn btn-primary btn-block" type="button" onClick={this.submitUpload}>Upload</button>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								
							</div>
						  </div>
					</div>					
					<Loading />					
				</div>
			</div>
			
			<Footer />
			
		</div>
		);
	}
}

export default memo_upload;