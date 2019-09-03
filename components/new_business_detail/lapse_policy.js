'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import {DateFormat, MoneyFormat} from '../../common_components/helper/formatter';
import Loading from '../../common_components/loading';
import SubmitModal from '../../common_components/modal/submit_modal';
import {DatePicker} from '../../common_components/date_picker';
import FeatureModal from '../../common_components/modal/feature_modal';
import {COMM_TYPE, GET_COMM_NAME, MIME_TYPE} from '../../common_components/helper/constant';

var FileSaver = require('file-saver');
const SortType = {
	DESC : 'DESC',
	ASC : 'ASC'
  }
  
class lapse_policy extends React.Component {
	constructor(props){
		super(props);

		var default_agent_code = localStorage.getItem('agent_code');
		this.getData = this.getData.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);

		this.state = {
			data: null,
			filterd_data : null,
			sort : SortType.DESC,
			activeSorting : '',
			param: {
				policy_holder_name:"",
				insured:"",
				agent_name:"",
				agent_code: "",
				agent_status:"",
				display_group:"true",
				effective_date:"",
				lapse_date:"1",
				lapse_date_start:"",
				lapse_date_end:"",
				policy_no:"",
				payment_mode:"",
				export:"",
				branch:"",
				page:"1",
				offset: 20
			},
			total : 0,
			total_data : 0,
			current : 0,
			visiblePages : 3,
			branch_list : null
		}

		this.handlePageChanged = this.handlePageChanged.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.itemSorting = this.itemSorting.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);

	}

	componentDidMount(){
		this.getData();
	}

	getData(){

		var param_date_start = $('[name=lapse_date_start]').val();
		var param_date_end = $('[name=lapse_date_end]').val();

		this.state.param.lapse_date_start = param_date_start;
		this.state.param.lapse_date_end = param_date_end;
		this.state.param.page = '1';
		this.state.param.export = '';

		// $('#loading').modal('show');
		// $.ajax({
		// 	url : api_route.branchList,
		// 	headers: {
		// 		'Authorization':'JWT '+sessionStorage.getItem('token')
		// 	},
		// 	type: 'GET',
		// 	data: [],
		// 	success: (response) => {
		// 		// // debugger;
		// 		$('.load-ape').hide();
		// 		this.setState({
		// 			branch_list : response.content
		// 		});
		// 	},
		// 	error: (err, response) => {
		// 	alert('something happened, please contact administrator');
		// 	if(err.responseJSON){
		// 		//window.location.href = window.location.href.split('#')[0] + '#/';
		// 	}

		// 	}
		// });

		$.ajax({
            url: api_route.lapse_tracking,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param,
            success: (response) => {
			  $('#loading').modal('hide');
			  
			  var num_data = response.content.policy_list || [];
			  var total_page = response.content.total_pages;
              // // debugger di LapsePolicy Ajax
			  //// debugger;
			  this.setState({
              	data : response.content,
				filterd_data: num_data,
				total : total_page
              });
            },
            error: (err, response) => {
              $('#loading').modal('hide');
			  if(err.responseJSON){
				  alert('Session expired, please login');
			  	  window.location.href="/";
              	//window.location.href = window.location.href.split('#')[0] + '#/';
              }else{
				  alert('Please check your connection');
			  }

            }
        });
	}

    itemSorting(e, type){
		console.log('masuk 1');
        e.preventDefault;
        var sort_data = this.state.filterd_data;
        var sort_type = (this.state.activeSorting == '') ? SortType.ASC : (this.state.activeSorting == e) ? (this.state.sort == SortType.ASC) ? SortType.DESC : SortType.ASC : SortType.ASC;
        var sort_data = (this.state.activeSorting == '') ? this._sorting(sort_data, e, SortType.ASC) : 
                            (this.state.activeSorting == e && this.state.sort == SortType.ASC) ? this._sorting(sort_data, e, SortType.DESC) : 
                              this._sorting(sort_data, e, SortType.ASC);
        this.setState({
          filterd_data : sort_data,
          activeSorting : e,
          sort : sort_type
        });
		console.log('masuk 2');
		debugger;
    }

    _sorting(data, content, type){

		console.log('data');
		console.log(data);
        if(content == "policy_number"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.number.toLowerCase();
				var y = b.number.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.number.toLowerCase();
				var y = a.number.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "status"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.status.toLowerCase();
				var y = b.status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.status.toLowerCase();
				var y = a.status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "policy_holder"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.policy_holder.name.toLowerCase();
				var y = b.policy_holder.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.policy_holder.name.toLowerCase();
				var y = a.policy_holder.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "insured"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.lifeassured_set[0].person.name.toLowerCase();
				var y = b.lifeassured_set[0].person.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.lifeassured_set[0].person.name.toLowerCase();
				var y = a.lifeassured_set[0].person.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "policy_effective_date"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.effective_date.toLowerCase();
				var y = b.effective_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.effective_date.toLowerCase();
				var y = a.effective_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content == "lapse_date"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.lapse_date.toLowerCase();
				var y = b.lapse_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.lapse_date.toLowerCase();
				var y = a.lapse_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content == "premium_amount"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.premium_ammount;
				var y = b.premium_ammount;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.premium_ammount;
				var y = a.premium_ammount;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "premium_mode"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.payment_mode.toLowerCase();
				var y = b.payment_mode.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.payment_mode.toLowerCase();
				var y = a.payment_mode.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "agent_name"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.agent.full_name.toLowerCase();
				var y = b.agent.full_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.agent.full_name.toLowerCase();
				var y = a.agent.full_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content =="agent_level"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.agent.user.level.type.toLowerCase();
				var y = b.agent.user.level.type.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.agent.user.level.type.toLowerCase();
				var y = a.agent.user.level.type.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content =="agent_status"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.agent.status.toLowerCase();
				var y = b.agent.status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.agent.status.toLowerCase();
				var y = a.agent.status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content =="phone"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.policy_holder.clientphone_set[1].number.toLowerCase();
				var y = b.policy_holder.clientphone_set[1].number.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.policy_holder.clientphone_set[1].number.toLowerCase();
				var y = a.policy_holder.clientphone_set[1].number.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content =="branch"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.branch;
				var y = b.branch;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.branch;
				var y = a.branch;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content =="last_billing"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.bill_paid_date;
				var y = b.bill_paid_date;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.bill_paid_date;
				var y = a.bill_paid_date;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }
        return data;
    }

    sortIcon(column){
       
        if(column == this.state.activeSorting){
          if(this.state.sort == SortType.ASC){
            return (
              <i className="glyphicon glyphicon-chevron-down"></i>
            );
          }else{
            return(
              <i className="glyphicon glyphicon-chevron-up"></i>
            );
          }
        }else{
          return(
              <i></i>
          );
        }
    }
	

      _onFilterChange(cellDataKey, event){
        // // debugger;
				console.log(event.target.value);
        if(!event.target.value){
          this.setState({
            filterd_data: this.state.data.policy_list
          });
        }

        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.data.policy_list.length;
        var filteredList = [];
				
        for (var index = 0; index < size; index++){
          if(cellDataKey == "policy_number")
            var v = this.state.data.policy_list[index].number;
          else if(cellDataKey == "status")
            var v = this.state.data.policy_list[index].status;
          else if(cellDataKey == "policy_holder")
            var v = this.state.data.policy_list[index].policy_holder.name;
		  else if(cellDataKey == "insured")
			var v = this.state.data.policy_list[index].lifeassured_set[0].person.name;
		  else if(cellDataKey == "policy_effective_date")
			var v = this.state.data.policy_list[index].effective_date;
		  else if(cellDataKey == "lapse_date")
			var v = this.state.data.policy_list[index].lapse_date;
          else if(cellDataKey == "premium_amount")
			var v = this.state.data.policy_list[index].premium_ammount;
          else if(cellDataKey == "premium_mode")
            var v = this.state.data.policy_list[index].payment_mode;
          else if(cellDataKey == "agent_name")
			var v = this.state.data.policy_list[index].agent.full_name;
		  else if(cellDataKey == "agent_level")
			var v = this.state.data.policy_list[index].agent.user.level;
		  else if(cellDataKey == "agent_status")
			var v = this.state.data.policy_list[index].agent.status;
		  else if(cellDataKey == "phone")
			var v = this.state.data.policy_list[index].policy_holder.clientphone_set[1].number;	
		  else if(cellDataKey == "last_billing")
			var v = this.state.data.policy_list[index].bill_paid_date;	
  		  else if(cellDataKey == "branch")
			var v = this.state.data.policy_list[index].branch;				
          if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
            filteredList.push(this.state.data.policy_list[index]);
          }
		  
        }

        var sortIndexes = [];
        var size = filteredList.length;
        for (var index = 0; index < size; index++) {
          sortIndexes.push(index);
        }

        var row_data = filteredList != null ? filteredList : [];
        var total_page = Math.ceil(row_data.length / 10);

        this.setState({
          filterd_data : filteredList,
          total : total_page
        });
				debugger;
      }

	handleChangeData(event){
		let data_array = {};
		for (let i in this.state.param) {
			if(i==event.target.name){
				if(event.target.name == 'display_group'){									
					data_array[i] = event.target.value == 'false' ? 'true' : 'false'
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

	handlePageChanged(newPage){
		
		this.state.param.page = newPage;
		this.state.param.export = '';
		$('#loading').modal('show');
		$.ajax({
			url: api_route.lapse_tracking,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			var num_data = response.content.policy_list || [];
			  var total_page = response.content.total_pages;
              // // debugger di LapsePolicy Ajax
			  //// debugger;
			  this.setState({
              	data : response.content,
				filterd_data: num_data,
				total : total_page
              });
			},
			error: (err, response) => {
			$('#loading').modal('hide');
			// alert('Session expired, please login');
			// window.location.href="/";
			if(err.responseJSON){
				//window.location.href = window.location.href.split('#')[0] + '#/';
			}

			}
		});

	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

		downloadLapse(file){

			this.state.param.export = file;
			let ext = "";
			if(file == 'pdf'){
				ext = ".pdf";
			} else{
				ext = ".xlsx";
			}
			$('#loading').modal('show');
	
			$.ajax({
							url: api_route.lapse_tracking,
							headers: {
							'Authorization':'JWT '+sessionStorage.getItem('token')
					},
							type: 'POST',
				data: this.state.param,	
				dataType: 'binary',			
							// contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
							success: (response) => {
									$('#loading').modal('hide');
					var blob = new Blob([response], {type: MIME_TYPE.XSLX + ";charset=utf-8"});
					FileSaver.saveAs(blob, "Lapse Policy " + localStorage.agent_code + ext);
							},
							error: (err, response) => {
								$('#loading').modal('hide');
					alert("something wrong");
							}
					});
		}
	
	render(){
		let data = this.state.filterd_data;
		let policies = [];

		let listBranch = [];
		
		var branchRole = '';
		if(localStorage.getItem('role')==102){
			branchRole = 'form-group hidden';
		} else {
			branchRole = 'form-group';

		}
		debugger;
		
		if(this.state.data != null && this.state.data.branches && this.state.data.branches.length > 0){
			listBranch.push(
				<option value="">All Branch</option>
			);
			this.state.data.branches.map(function(value, index){
				listBranch.push(
					<option value={value}>{value}</option>
				);
			});
		}

		if(data && data.length > 0)
		{

			let offs = this.state.param.offset;
			let page = this.state.param.page; 
			let num = (page - 1) * offs;

			$.map(data, (value, index) => {
				
				

					let url = "#/newbusiness/policy_info/"+value.id;
					let row = null;
					let insured = "";
						$.map(value.lifeassured_set,(value,index) => {
							insured += value.person == null ? '' : value.person.name + "\n";
						})

					num += 1;

					var phone_number = '';

					try{
						phone_number = value.policy_holder != null ? value.policy_holder.clientphone_set != null ? value.policy_holder.clientphone_set[1].number != null ? value.policy_holder.clientphone_set[1].number : '' :'':'';
					}catch(e){

					}

					row = <tr key={index}>
							<td>{num}</td>
							<td><a href={"#/policy/policy_info/"+value.id}>{value.number}</a></td>
							<td>{value.status}</td>
							<td>{value.policy_holder != null ? value.policy_holder.name != null ? value.policy_holder.name :'' :''}</td>
							<td>{insured}</td>
							<td>{DateFormat(value.effective_date)}</td>
							<td>{DateFormat(value.lapse_date)}</td>
							<td>{MoneyFormat(value.premium_ammount)}</td>
							<td>{value.payment_mode}</td>
							<td>{value.agent== null ? '' : value.agent.full_name == null ? '' : value.agent.full_name}</td>
							<td>{value.agent== null ? '' : value.agent.user == null ? '' : value.agent.user.level == null ? '' : value.agent.user.level.type == null? '' : value.agent.user.level.type}</td>
							<td>{value.agent== null ? '' : value.agent.status == null ? '' : value.agent.status}</td>
							<td>{phone_number}</td>
							<td>{DateFormat(value.bill_paid_date)}</td>
							<td>{value.branch}</td>
						</tr>
					policies.push(row);
				

			});

			
			
		}
		else {
			let row = <tr>
						<td colSpan="15" style={{'text-align':'center'}}>No data.</td>
					</tr>
            policies.push(row);
		}

		let checked = this.state.param.display_group == "true" ? "checked" : "";

		let paging = [];

		let total = 0;
		let current = 0;

		try{
			current = parseInt(this.state.param.page);
		}catch(e){
			current = 0;
		}

		try{
			total = parseInt(this.state.total);
		}catch(e){
			total = 0;
		}

		let start = (current - 5) < 0 ? 0 : (current-5);
		let end = (current + 5) > total ? total : (current+5);

		if(total > 0){
			paging.push(
				<li><a onClick={this.handlePageChanged.bind(this, (current - 1) <= 0 ? 1 : (current - 1))}>Prev</a></li>
			);
			for(var i = start; i < end; i++){
				if(i == (current-1)){
					paging.push(
						<li className="active"><a onClick={this.handlePageChanged.bind(this, (i+1))}>{(i+1)}</a></li>
					);
				}else{
					paging.push(
						<li><a onClick={this.handlePageChanged.bind(this, (i+1))}>{(i+1)}</a></li>
					);
				}
			}
			paging.push(
				<li><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1)) }>Next</a></li>
			);
		}

		return (
		<div className="wrap2">

			<SubmitModal />
    		<TopMenuNewBusinessDetail title="Lapse Policy" opsi="inquiry"  />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li className="active">Lapse Policy</li>
						</ol>
					{/*</div>
					<div className="col-xs-2">
						<ol className="breadcrumb" onClick={this.openMenu} style={{marginBottom: '5px', cursor : 'pointer'}}>
							<li className="active">
								<span className="menuIconSidebar">
									<i className="fa fa-bars"></i>
								</span>
							</li>
						</ol>
					</div>
				</div>*/}

				<div className="main twoColumnMain">

					<LeftMenuInquiry active="2"/>

					<div className="main-content">
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-6">
									<div className="form-horizontal">

										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy No</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="policy_no" name="policy_no" value={this.state.param.policy_no} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy Holder Name</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="policy_holder_name" name="policy_holder_name" value={this.state.param.policy_holder_name} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Name</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="agent_name" name="agent_name" value={this.state.param.agent_name} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Status</label>
											</div>

											<div className="col-sm-6">
													<select className="form-control" id="agent_status" name="agent_status" onChange={this.handleChangeData} >
														<option value="">All Status</option>
														<option value="1">Active</option>
														<option value="2">Terminate</option>
														<option value="3">Resign</option>
														<option value="4">Others</option>
													</select>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Display Group?</label>
											</div>

											<div className="col-md-1 text-left">
											  <div className="checkbox">
												<label>
												  <input type="checkbox" id="display_group" className="form-control" name="display_group" value={this.state.param.display_group} onChange={this.handleChangeData} checked={checked} />
												</label>
											  </div>
											</div>
										</div>

									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-3">
												<label>Payment Mode</label>
											</div>
											<div className="col-sm-7">
												<select className="form-control" id="payment_mode" name="payment_mode" onChange={this.handleChangeData}>
													<option value="">All Mode</option>
													<option value="1">Monthly</option>
													<option value="2">Quarterly</option>
													<option value="3">Half Yearly</option>
													<option value="4">Yearly</option>
													<option value="5">Single</option>
													<option value="6">Other Mode</option>
												</select>
											</div>
										</div>
										<div className="form-group">
											<div className="col-sm-3">
												<label>Insured</label>
											</div>

											<div className="col-sm-7">
												<input type="text" className="form-control" id="insured" name="insured" value={this.state.param.insured} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-3">
												<label>Agent Code</label>
											</div>

											<div className="col-sm-7">
												<input type="text" className="form-control" id="agent_code" name="agent_code" value={this.state.param.agent_code} onChange={this.handleChangeData} />
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-md-3">
												<label>Lapse Date</label>
											</div>

											<div className="col-md-3">
												<DatePicker className="form-control" id="lapse_date_start" name="lapse_date_start" />
											</div>

											<div className="col-md-1">
												<label>to</label>
											</div>
											<div className="col-md-3">
												<DatePicker className="form-control" id="lapse_date_end" name="lapse_date_end" />
											</div>

										</div>
									
										<div className="form-group">
											<div className="col-md-3">
												<label>Branch</label>
											</div>

											<div className="col-md-7">
													<select className="form-control" id="branch" name="branch" onChange={this.handleChangeData} >
														{listBranch}
														{/* <option value="">All Branch</option>
														<option value="1">Active</option>
														<option value="2">Terminate</option>
														<option value="3">Resign</option>
														<option value="4">Others</option> */}
													</select>
											</div>
										</div>

									</div>
								</div>
							</div>

							<div className="col-sm-12">
								<div className="clearfix h25"></div>

								<div className="col-sm-3 pull-right">
									<button className="btn btn-primary btn-block" type="button" onClick={() => this.getData()}><i className="fa fa-search"></i> Search</button>
								</div>
							</div>
						</div>

						<div className="clearfix h25"></div>

						<hr />

						<div className="row">
							<div className="col-sm-12">
								<div>
									<nav aria-label="Page navigation">
										<ul className="pagination">
											{paging}
										</ul>
									</nav>
								</div>
								<div className="scroll-h" style={{'overflow-x':'auto'}}>
									
									<table className="table table-bordered table-striped table-hover text-center table-box">
										<thead>
											<tr>
												<th className="header_table valign-middle text-center">No</th>
												<th style={{'width':'100px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_number")}>Policy No</a></th>
												<th style={{'width':'100px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "status")}>Status</a></th>
												<th style={{'width':'150px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_holder")}>Policy Holder</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "insured")}>Insured</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_effective_date")}>Policy Effective Date</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "lapse_date")}>Lapse Date</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "premium_amount")}>Premium Amount</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "premium_mode")}>Premium Mode</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_name")}>Agent Name</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_level")}>Agent Level</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_status")}>Agent Status</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "phone")}>Mobile Phone</a></th>																						
												<th className="header_table valign-middle text-center" style={{'width' : '120px'}}><a onClick={this.itemSorting.bind(this, "last_billing")}>Last Billing Paid Date</a></th>
												<th className="header_table valign-middle text-center" style={{'width' : '120px'}}><a onClick={this.itemSorting.bind(this, "branch")}>Branch</a></th>
											</tr>
											<tr key="header_list_policy_filter">
												<th className="header_table"></th>
												<th className="header_table"><input type="text" name="policy_number" onChange={this._onFilterChange.bind(this, "policy_number")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="status" onChange={this._onFilterChange.bind(this, "status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_holder" onChange={this._onFilterChange.bind(this, "policy_holder")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="insured" onChange={this._onFilterChange.bind(this, "insured")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_effective_date" onChange={this._onFilterChange.bind(this, "policy_effective_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="lapse_date" onChange={this._onFilterChange.bind(this, "lapse_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="premium_amount" onChange={this._onFilterChange.bind(this, "premium_amount")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="premium_mode" onChange={this._onFilterChange.bind(this, "premium_mode")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_name" onChange={this._onFilterChange.bind(this, "agent_name")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_level" onChange={this._onFilterChange.bind(this, "agent_level")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_status" onChange={this._onFilterChange.bind(this, "agent_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="phone" onChange={this._onFilterChange.bind(this, "phone")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="last_billing" onChange={this._onFilterChange.bind(this, "last_billing")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="branch" onChange={this._onFilterChange.bind(this, "branch")} className="form-control" /></th>
											</tr>
										</thead>
										<tbody>
											{policies}
										</tbody>
										<tfoot>
											<tr>
											{localStorage.getItem('role') == 17 || localStorage.getItem('role') == 18 || localStorage.getItem('role') == 19 || localStorage.getItem('role') == 20 || (localStorage.getItem('role') == 5 && localStorage.getItem('agent_code').charAt(0) == '9') || localStorage.getItem('username')=='user.banca' ? '' : <th colSpan="15"><button style={{marginRight:'10px'}} className="btn btn-primary" onClick={() => this.downloadLapse('excel')}>Export as XLSX</button></th>}
											</tr>
										</tfoot>
									</table>
									
								</div>
								<div>
									<nav aria-label="Page navigation">
										<ul className="pagination">
											{paging}
										</ul>
									</nav>
								</div>
								
							</div>
						</div>
						
						

						<div className="clearfix"></div>

					</div>

					<div className="clearfix"></div>
				</div>
			</div>
			<FeatureModal/>
			<Loading />
			<Footer />

		</div>
		);
	}
}

export default lapse_policy;
