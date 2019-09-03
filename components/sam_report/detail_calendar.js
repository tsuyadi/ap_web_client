'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuSam from '../../common_components/menu_v2/left_menu_sam';
import Footer from '../../common_components/footer';

import {MoneyFormat, DateFormat, DateFormatMMM, DateFormatMonthName} from '../../common_components/helper/formatter';
import Loading from '../../common_components/loading';
import {DatePicker} from '../../common_components/date_picker';
import Pager from 'react-pager';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import {getSideMenu} from '../../common_components/helper/user_session';
import {getMenu} from '../../common_components/helper/user_session';
import {MIME_TYPE} from '../../common_components/helper/constant';
import {getAllUrlParams} from '../../common_components/helper/url_helper';
var FileSaver = require('file-saver');

const SortType = {
  DESC : 'DESC',
  ASC : 'ASC'
}

class detail_calendar extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			filterd_data : null,
			sort : SortType.DESC,
			activeSorting : '',
			param: {
				date : getAllUrlParams(window.location.href).date.substring(0,10), 
				agent_code :  getAllUrlParams(window.location.href).agent,
				agent_name : "",
				agent_level : "",
				agent_status : "",
				status : "",
				export : "",
				page:"1",
				offset:10,
			},
			branch_list: null,
			total : 0,
			total_data : 0,
			current : 0,
			visiblePages : 3,
			mgtRole : [1,2,3,4],
			dashboardRole: [1,2,3,4,5,6,7,8,9],
			dashboardMaps : {
				9:'fc',
				8:'sm',
				7:'dm',
				6:'rm',
				5:'rd'
			}
		}

		this.getData = this.getData.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		this.getDataSummary = this.getDataSummary.bind(this);
        this.itemSorting = this.itemSorting.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
	}

	componentDidMount(){
		
		// this.state.param.effective_date_start = "";
		// this.state.param.effective_date_end = "";
		// this.state.param.policy_status_start_date = "";
		// this.state.param.policy_status_end_date = "";
		this.state.param.page = '1';
		
			
			$.ajax({
				url: api_route.activity_calender,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					console.log(response);
					// var num_data = response.open_recruit || [];
					// var total_page = response.total_pages;
					// // debugger di listdetail_calendar ajax
					// debugger;
					this.setState({
						data: response,
						// filterd_data: num_data,
						// total_data: response.total_recruits,
						// total: total_page
						});
					},
					error: (err, response) => {
						
						if(err.responseJSON){
						alert('Session expired, please login');
						window.location.href="/";
						//window.location.href = window.location.href.split('#')[0] + '#/';
					}else{
						alert('Please check your connection');
					}

				}
			});

		// this.getData(e);
		// this.getDataSummary();
		
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
        if(content == "policy_no"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.number - b.number;
            });
          }else{
            data.sort(function(a, b){
              return b.number - a.number;
            });
          }
        }else if(content == "product_name"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.product==null? '' : a.product.name.toLowerCase();
				var y = b.product==null? '' : b.product.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.product == null ? '' : b.product.name.toLowerCase();
				var y = a.product == null ? '' : a.product.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "policy_status"){
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
				var x = a.policy_holder== null? '' : a.policy_holder.name == null? '' : a.policy_holder.name.toLowerCase();
				var y = b.policy_holder== null? '' : b.policy_holder.name == null? '' : b.policy_holder.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.policy_holder== null ? '' : b.policy_holder.name == null ? '' : b.policy_holder.name.toLowerCase();
				var y = a.policy_holder== null ? '' : a.policy_holder.name == null ? '' : a.policy_holder.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "insured"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.lifeassured_set == null? '' : a.lifeassured_set[0] == null ? '' : a.lifeassured_set[0].person == null ? '' : a.lifeassured_set[0].person.name == null ? '' : a.lifeassured_set[0].person.name.toLowerCase();
				var y = b.lifeassured_set == null? '' : b.lifeassured_set[0] == null ? '' : b.lifeassured_set[0].person == null ? '' : b.lifeassured_set[0].person.name == null ? '' : b.lifeassured_set[0].person.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.lifeassured_set == null? '' : b.lifeassured_set[0] == null ? '' : b.lifeassured_set[0].person == null ? '' : b.lifeassured_set[0].person.name == null ? '' : b.lifeassured_set[0].person.name.toLowerCase();
				var y = a.lifeassured_set == null? '' : a.lifeassured_set[0] == null ? '' : a.lifeassured_set[0].person == null ? '' : a.lifeassured_set[0].person.name == null ? '' : a.lifeassured_set[0].person.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "effective_date"){
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
        }else if(content == "policy_status_date"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.policy_status_date.toLowerCase();
				var y = b.policy_status_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.policy_status_date.toLowerCase();
				var y = a.policy_status_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "premium"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.total_premium - b.total_premium;
            });
          }else{
            data.sort(function(a, b){
              return b.total_premium - a.total_premium;
            });
          }
        }else if(content == "payment_mode"){
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
				var x = a.agent == null? '' : a.agent.full_name == null ? '' : a.agent.full_name.toLowerCase();
				var y = b.agent == null? '' : b.agent.full_name == null ? '' : b.agent.full_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x =  b.agent == null? '' : b.agent.full_name == null ? '' : b.agent.full_name.toLowerCase();
				var y =  a.agent == null? '' : a.agent.full_name == null ? '' : a.agent.full_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content =="agent_level"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.agent == null? '' : a.agent.user == null? '' : a.agent.user.level == null ? '' : a.agent.user.level.type == null? '' : a.agent.user.level.type.toLowerCase();
				var y = b.agent == null? '' : b.agent.user == null? '' : b.agent.user.level == null ? '' :b.agent.user.level.type == null ? '' : b.agent.user.level.type.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.agent == null? '' : b.agent.user == null? '' : b.agent.user.level == null ? '' :b.agent.user.level.type == null ? '' : b.agent.user.level.type.toLowerCase();
				var y = a.agent == null? '' : a.agent.user == null? '' : a.agent.user.level == null ? '' : a.agent.user.level.type == null? '' : a.agent.user.level.type.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "agent_status"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.agent == null ? '' : a.agent.status == null ? '' : a.agent.status.toLowerCase();
				var y = b.agent == null ? '' : b.agent.status == null ? '' : b.agent.status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.agent == null ? '' : b.agent.status == null ? '' : b.agent.status.toLowerCase();
				var y = a.agent == null ? '' : a.agent.status == null ? '' : a.agent.status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "agent_branch"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.agent == null ? '' : a.agent.branch == null ? '': a.agent.branch.name == null ? '' : a.agent.branch.name.toLowerCase();
				var y = b.agent == null ? '' : b.agent.branch == null ? '': b.agent.branch.name == null ? '' : b.agent.branch.name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.agent == null ? '' : b.agent.branch == null ? '': b.agent.branch.name == null ? '' : b.agent.branch.name.toLowerCase();
				var y = a.agent == null ? '' : a.agent.branch == null ? '': a.agent.branch.name == null ? '' : a.agent.branch.name.toLowerCase();
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
		
        if(!event.target.value){
          this.setState({
            filterd_data: this.state.data.policy_list
          });
        }

        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.data.policy_list.length;
        var filteredList = [];
				
        for (var index = 0; index < size; index++){
          if(cellDataKey == "policy_no")
            var v = this.state.data.policy_list[index].number;
          else if(cellDataKey == "product_name")
            var v = this.state.data.policy_list[index].product == null? '' : this.state.data.policy_list[index].product.name == null ? '' : this.state.data.policy_list[index].product.name;
          else if(cellDataKey == "policy_status")
            var v = this.state.data.policy_list[index].status;
          else if(cellDataKey == "policy_holder")
            var v = this.state.data.policy_list[index].policy_holder == null ? '' : this.state.data.policy_list[index].policy_holder == null ? '' : this.state.data.policy_list[index].policy_holder.name == null ? '' : this.state.data.policy_list[index].policy_holder.name;
          else if(cellDataKey == "insured")
            var v = this.state.data.policy_list[index].lifeassured_set == null ? '' : this.state.data.policy_list[index].lifeassured_set[0].person == null ? '' : this.state.data.policy_list[index].lifeassured_set[0].person.name == null ? '' : this.state.data.policy_list[index].lifeassured_set[0].person.name;
          else if(cellDataKey == "effective_date")
            var v = this.state.data.policy_list[index].effective_date;
          else if(cellDataKey == "premium")
            var v = this.state.data.policy_list[index].total_premium;
          else if(cellDataKey == "payment_mode")
            var v = this.state.data.policy_list[index].payment_mode;
          else if(cellDataKey == "agent_name")
            var v = this.state.data.policy_list[index].agent == null ? '' : this.state.data.policy_list[index].agent.full_name == null ? '' : this.state.data.policy_list[index].agent.full_name;
          else if(cellDataKey == "agent_level")
            var v = this.state.data.policy_list[index].agent == null ? '' : this.state.data.policy_list[index].agent.user == null ? '' : this.state.data.policy_list[index].agent.user.level == null? '' : this.state.data.policy_list[index].agent.user.level.type == null ? '' : this.state.data.policy_list[index].agent.user.level.type;
          else if(cellDataKey == "agent_status")
            var v = this.state.data.policy_list[index].agent == null ? '' : this.state.data.policy_list[index].agent.status == null ? '' : this.state.data.policy_list[index].agent.status;
          else if(cellDataKey == "agent_branch")
            var v = this.state.data.policy_list[index].agent == null ? '' : this.state.data.policy_list[index].agent.branch== null ? '' : this.state.data.policy_list[index].agent.branch.name == null ? '' : this.state.data.policy_list[index].agent.branch.name;
					else if(cellDataKey == "policy_status_date")
						var v = this.state.data.policy_list[index].policy_status_date;
						  
          v = v != null ? v : '';
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

	
			downloadRecruit(file){

				this.state.param.export = file;
				let ext = "";
				if(file == 'pdf'){
					ext = ".pdf";
				} else{
					ext = ".xlsx";
				}
		
				$('#loading').modal('show');
		
				$.ajax({
								url: api_route.open_case_recruit,
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
						FileSaver.saveAs(blob, "Open Case Recruit" + localStorage.agent_code + ext);
								},
								error: (err, response) => {
									$('#loading').modal('hide');
						alert("something wrong");
								}
						});
			}
		

	getDataSummary(){

		// // debugger;

		this.state.param.page = '1';

		$.ajax({
			url: api_route.policy_summary,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');

				// // debugger;

				var summary = response.content.summary || [];
				// // debugger di listdetail_calendar ajax
				// // debugger;
				this.setState({
					summary: summary
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

		$('.load-ape').show();

		$.ajax({
				url : api_route.branchList,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'GET',
				data: [],
				success: (response) => {
					// // debugger;
					$('.load-ape').hide();
					this.setState({
						branch_list : response.content
					});
				},
				error: (err, response) => {
				
				if(err.responseJSON){
					alert('something happened, please contact administrator');
					//window.location.href = window.location.href.split('#')[0] + '#/';
				}

				}
			});

	}

	getData(param){

		var agent_name = $('[name=agent_name]').val();
		var agent_code = $('[name=agent_code]').val();
		var level = $('[name=agent_level]').val();
		var agent_status = $('[name=agent_status]').val();
		var status = $('[name=status]').val();

		// debugger;

		this.state.param.agent_name = agent_name;
		this.state.param.agent_code = agent_code;
		this.state.param.level = level;
		this.state.param.agent_status = agent_status;
		this.state.param.status = status;
		this.state.param.page = '1';

		var paramSearch = this.state.param;

		if(param == '0'){

			if(paramSearch.agent_code == "" && paramSearch.agent_name == "" && paramSearch.agent_status == "" 
			&& paramSearch.agent_level == "" && paramSearch.branch == "" && paramSearch.status == ""){

				$('#message').modal('show');

			}else{

				$('#message').modal('hide');
				$('#loading').modal('show');

				// policy/summary

				$('.load-ape').show();
				$.ajax({
					url: api_route.open_case_recruit,
					headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
					},
					type: 'POST',
					data: this.state.param,
					success: (response) => {
					$('#loading').modal('hide');
					var num_data = response.open_recruit || [];
					var total_page = response.total_pages;
					// // debugger di listdetail_calendar ajax
					
						this.setState({
							data: response.open_recruit,
							filterd_data: num_data,
							total_data: response.total_recruits,
							total: total_page
						});
					},
					error: (err, response) => {
					$('#loading').modal('hide');
					// alert('Session expired, please login');
					// window.location.href="/";
					if(err.responseJSON){
						window.location.href = window.location.href.split('#')[0] + '#/';
					}
		
					}
				});

			}

		}else{

			$('#message').modal('hide');


			// policy/summary

			$('.load-ape').show();
			$.ajax({
				url: api_route.open_case_recruit,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
				$('#loading').modal('hide');
				var num_data = response.open_recruit || [];
				var total_page = response.total_pages;
				// // debugger di listdetail_calendar ajax
				
					this.setState({
						data: response.open_recruit,
						filterd_data: num_data,
						total_data: response.total_recruits,
						total: total_page
					});
				},
				error: (err, response) => {
				$('#loading').modal('hide');
				// alert('Session expired, please login');
				// window.location.href="/";
				if(err.responseJSON){
					window.location.href = window.location.href.split('#')[0] + '#/';
				}
	
				}
			});
		}

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
		$('#loading').modal('show');
		// // debugger;
		$.ajax({
			url: api_route.open_case_recruit,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			var num_data = response.open_recruit || [];
			var total_page = response.total_pages;
			// // debugger di listdetail_calendar ajax
			
				this.setState({
					data: response.open_recruit,
					filterd_data: num_data,
					total_data: response.total_recruits,
					total: total_page
				});
			},
			error: (err, response) => {
			$('#loading').modal('hide');
			// alert('Session expired, please login');
			// window.location.href="/";
			if(err.responseJSON){
				window.location.href = window.location.href.split('#')[0] + '#/';
			}

			}
		});

	}

	
	logout(e){
		$.ajax({
			url: api_route.logout,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token'),//logout
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			type: 'POST',
			// dataType: "binary",
			data: {},
			// contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			success: (response) => {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
				var url = window.location.href.split("#");
				window.location.href = url[0];
				
			},
			error: (xhr, status) => {
			  $('#loading').modal('hide');
			  if(xhr.status == '401') {
				e.preventDefault();
				localStorage.clear();
				sessionStorage.clear();
				var url = window.location.href.split("#");
				window.location.href = url[0];
			  }else{
				alert("something wrong");
  
			  }
			}
		});
	}

	render(){
		let data = this.state.data;
		console.log(data);
		let detail_calendar = [];
		// let listBranch = [];
		var data_info = "";
		
		// console.log(data);
		// console.log(data.activity_calendar);
		if(data && data.activity_calendar && data.activity_calendar.length > 0)
		{
			// data_info = "   Show "+data.length+" of "+this.state.total_data;
			$.map(data.activity_calendar, (value, index) => {
					let row = null;
					let num = null;
					num += (index+1);
					
					row = 
					<tr key={index}>
						<td>{num}</td>
						<td>{value.from_time == null ? '' : value.from_time == null ? '' : value.from_time}</td>
						<td>{value.prospect_recruit_name == null ? '' : value.prospect_recruit_name == null ? '' : value.prospect_recruit_name}</td>
						<td>{value.activity_name == null ? '' : value.activity_name == null ? '' : value.activity_name}</td>
						<td>{value.stage == null ? '' : value.stage == null ? '' : value.stage}</td>
						<td>{value.place == null ? '' : value.place == null ? '' : value.place}</td>
					</tr>
					detail_calendar.push(row);

	          });

		} else {
			let row = <tr>
						<td colSpan="6" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            detail_calendar.push(row);

		}
		
		let checked = this.state.param.display_group == "true" ? "checked" : "";


		// // debugger;

		// this.state.summary

		let paging = [];

		// for ($x = 1;  $x <= ($totalpages); $x++) {
		// // if it's a valid page number...
		// if (($x > 0) && ($x <= $totalpages)) {
		// 	//limit for each 5 pages
		// 	if ($x % 5 == 0) { 
		// 	// if we're on current page...
		// 		if ($x == $currentpage) {
		// 			// 'highlight' it but don't make a link
		// 			echo " [<b>$x</b>] ";
		// 		// if not current page...
		// 		} else {
		// 			// make it a link
		// 			echo " <a href='{$_SERVER['PHP_SELF']}?currentpage=$x'>$x</a> ";
		// 		} // end else
		// 	}
		// } // end if 
		// }

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
			if(current > 1){
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, 1)}>First</a></li>
				);
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, (current - 1) < 0 ? 1 : (current - 1))}>Prev</a></li>
				);

			} else {
				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, 1)}>First</a></li>
				);
				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, (current - 1) < 0 ? 1 : (current - 1))}>Prev</a></li>
				);
			}
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
			if(current < total){
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1)) }>Next</a></li>
				);
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, total)}>Last</a></li>
				);

			} else {
				
				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1)) }>Next</a></li>
				);
				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, total)}>Last</a></li>
				);
			}
		}

		
		let menu = getMenu('AMS Report', 'fa fa-bar-chart');
		return (
			<div>
		<div className="wrap2" onClick={this.show}>
			<div id="wrapShadow"></div>
			<SubmitModal />
   		    {/* <TopMenuNewBusinessDetail opsi="inquiry" title="Policy Tracking"  onClick={this.showRight} /> */}
            {menu}
			<div>
				{/*{memoMenu}*/}
			</div>
			<div className="main-wrapper">
				<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>
						<ol className="breadcrumb" style={{marginBottom: '5px', marginTop:'55px'}}>
							<li className="active">Open Case Recruit</li>
						</ol>
					</div>
					<div className="col-xs-2" style={{paddingLeft : 5}}>
						<ol className="breadcrumb" onClick={this.openMenu} style={{marginBottom: '5px', marginTop:'55px', cursor : 'pointer'}}>
							<li className="active">
								<span className="menuIconSidebar">
									<i className="fa fa-bars"></i>
								</span>
							</li>
						</ol>
					</div>
				</div>
				
				<div className="main twoColumnMain">

					<LeftMenuSam active="1"/>

					<div className="main-content boxShadow">

                        <div className="row" style={{margin:'30px 10px'}}>
                            <div className="col-sm-6">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <div className="col-sm-6 bg-info">
                                            <label>Agent Code</label>
                                        </div>
                                        <div className="col-sm-6">
                                        {this.state.data && this.state.data.agent_data ? this.state.data.agent_data.code : '-'}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-6 bg-info">
                                            <label>Agent Name</label>
                                        </div>
                                        <div className="col-sm-6">
                                            {this.state.data && this.state.data.agent_data ? this.state.data.agent_data.full_name : '-'}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-6 bg-info">
                                            <label>Agent Level</label>
                                        </div>
                                        <div className="col-sm-6">
                                            {this.state.data && this.state.data.agent_data ? this.state.data.agent_data.level : '-'}
                                        </div>
                                    </div>
                                    
                                </form>
                            </div>
                            <div className="col-sm-6">
                                <form className="form-horizontal">
                                    <div className="form-group">
                                        <div className="col-sm-6 bg-info">
                                            <label>AMB</label>
                                        </div>
                                        <div className="col-sm-6">
                                            {this.state.data && this.state.data.agent_data && this.state.data.agent_data.amb_name}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-6 bg-info">
                                            <label>RMB</label>
                                        </div>
                                        <div className="col-sm-6">
                                            {this.state.data && this.state.data.agent_data && this.state.data.agent_data.rmb_name}
                                        </div>
                                    </div>
                                    <div className="form-group">
                                        <div className="col-sm-6 bg-info">
                                            <label>TD</label>
                                        </div>
                                        <div className="col-sm-6">
                                            {this.state.data && this.state.data.agent_data && this.state.data.agent_data.rd_name}
                                        </div>
                                    </div>											
                                </form>
                            </div>
                        </div>

						<div className="clearfix h25"></div>

						<hr />

						<div className="row">
							<div className="col-sm-12">
								<div className="text-center" style={{textAlign:'center'}}>
									<h3>Activity List - {DateFormatMonthName(this.state.param.date)}</h3>
								</div>
								<div className="scroll-h" style={{'overflow-x':'auto'}}>
									<table className="table table-bordered table-striped table-hover text-center table-box">
										<thead>
											<tr>
												<th className="header_table valign-middle text-center">No</th>
												<th className="header_table valign-middle text-center">Time</th>
												<th className="header_table valign-middle text-center">Prospect Name</th>
												<th className="header_table valign-middle text-center">Activity</th>
												<th className="header_table valign-middle text-center">Stage</th>
												<th className="header_table valign-middle text-center">Place</th>
											</tr>
										</thead>
										<tbody>
											{detail_calendar}											
										</tbody>
									</table>
								</div>
							</div>
						</div>
						<div className="clearfix"></div>
					</div>

					<div className="clearfix"></div>
				</div>
			</div>

			<div className="modal fade" id="message" tabIndex="-1" role="dialog" aria-labelledby="modalMessage" aria-hidden="true">
				<div className="modal-dialog">
					<div className="modal-content" style={{"padding":"0px !important"}}>
						<div className="modal-header">
							<h4>Confirmation</h4>
						</div>
						<div className="modal-body">
							The filter criteria still empty, do you want to display All ?	
						</div>
						<div className="modal-footer">
							<button type="button" className="btn btn-default" data-dismiss="modal">No</button>
							<button type="button" className="btn btn-primary" onClick={this.getData.bind(this, '1')}>Yes</button>
						</div>
					</div>
				</div>
			</div>

				<Loading />
		    	<SubmitModal />
		    	<FeatureModal />
			</div>
			<div className="clearfix"></div>
			<Footer />

		</div>
		);
	}
}

export default detail_calendar;