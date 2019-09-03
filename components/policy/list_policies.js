'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';

import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';
import Loading from '../../common_components/loading';
import {DatePicker} from '../../common_components/date_picker';
import Pager from 'react-pager';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import {getSideMenu} from '../../common_components/helper/user_session';
import {COMM_TYPE, GET_COMM_NAME, MIME_TYPE} from '../../common_components/helper/constant';

var FileSaver = require('file-saver');
const SortType = {
  DESC : 'DESC',
  ASC : 'ASC'
}

class list_policies extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			filterd_data : null,
			sort : SortType.DESC,
			activeSorting : '',
			param: {
				policy_no:"",
				spaj_no:"",
				policy_holder_name:"",
				insured:"",
				branch:"",
				agent_name:"",
				agent_code:"",
				agent_status:"",
				display_group:"true",
				effective_date:"1",
				policy_effective_date_start:"",
				policy_effective_date_end:"",
				product_name:"",
				payment_mode:"",
				export:"",
				page:"1",
				offset:20,
				policy_status:""
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
		
		this.state.param.effective_date_start = "";
		this.state.param.effective_date_end = "";
		this.state.param.policy_status_start_date = "";
		this.state.param.policy_status_end_date = "";
		this.state.param.page = '1';
		this.state.param.export = '';
		
			
			$.ajax({
				url: api_route.policy_list,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					
				var num_data = response.content.policy_list || [];
				var total_page = response.content.total_pages;
				// // debugger di listpolicies ajax
				// debugger;
				this.setState({
					data: response.content,
					filterd_data: num_data,
					total_data: response.content.total_policy,
					total: total_page
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
		this.getDataSummary();
		
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
				// // debugger di listpolicies ajax
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

		// $('.load-ape').show();

		// $.ajax({
		// 		url : api_route.branchList,
		// 		headers: {
		// 			'Authorization':'JWT '+sessionStorage.getItem('token')
		// 		},
		// 		type: 'GET',
		// 		data: [],
		// 		success: (response) => {
		// 			// // debugger;
		// 			$('.load-ape').hide();
		// 			this.setState({
		// 				branch_list : response.content
		// 			});
		// 		},
		// 		error: (err, response) => {
				
		// 		if(err.responseJSON){
		// 			alert('something happened, please contact administrator');
		// 			//window.location.href = window.location.href.split('#')[0] + '#/';
		// 		}

		// 		}
		// 	});

	}

	getData(param){

		var param_date_start = $('[name=policy_effective_date_start]').val();
		var param_date_end = $('[name=policy_effective_date_end]').val();
		var policy_status_start_date = $('[name=policy_status_start_date]').val();
		var policy_status_end_date = $('[name=policy_status_end_date]').val();

		// debugger;

		this.state.param.effective_date_start = param_date_start;
		this.state.param.effective_date_end = param_date_end;
		this.state.param.policy_status_start_date = policy_status_start_date;
		this.state.param.policy_status_end_date = policy_status_end_date;
		this.state.param.page = '1';
		this.state.param.export = '';

		var paramSearch = this.state.param;

		if(param == '0'){

			if(paramSearch.policy_no == "" && paramSearch.policy_holder_name == "" 
			&& paramSearch.insured == "" && paramSearch.branch == "" && paramSearch.agent_name == ""
			&& paramSearch.agent_code == "" && paramSearch.agent_status == "" && param_date_start == ""
			&& param_date_end == "" && paramSearch.policy_status == "" && paramSearch.spaj_no == "" && policy_status_end_date=="" && policy_status_start_date== ""){

				$('#message').modal('show');

			}else{

				$('#message').modal('hide');
				$('#loading').modal('show');

				// policy/summary

				// $('.load-ape').show();
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
					url: api_route.policy_list,
					headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
					},
					type: 'POST',
					data: this.state.param,
					success: (response) => {

						// // debugger;

						$('#loading').modal('hide');
						var num_data = response.content.policy_list || [];
						var total_page = response.content.total_pages;
						// // debugger di listpolicies ajax
						// debugger;
						this.setState({
							data: response.content,
							filterd_data: num_data,
							total_data: response.content.total_policy,
							total: total_page
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

		}else{

			$('#message').modal('hide');


			// policy/summary

			// $('.load-ape').show();
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
				url: api_route.policy_list,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
				$('#loading').modal('hide');
				var num_data = response.content.policy_list || [];
				var total_page = response.content.total_pages;
				// // debugger di listpolicies ajax
				// debugger;
				this.setState({
					data: response.content,
					filterd_data: num_data,
					total_data: response.content.total_policy,
					total: total_page
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
		// // debugger;
		$.ajax({
			url: api_route.policy_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			var num_data = response.content.policy_list || [];
			var total_page = response.content.total_pages;
			// // debugger di listpolicies ajax
			
				this.setState({
					data: response.content,
					filterd_data: num_data,
					total_data: response.content.total_policy,
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
	downloadPolicy(file){

		this.state.param.export = file;
		let ext = "";
		if(file == 'pdf'){
			ext = ".pdf";
		} else{
			ext = ".xlsx";
		}
		$('#loading').modal('show');

		$.ajax({
						url: api_route.policy_list,
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
				FileSaver.saveAs(blob, "Policy Tracking" + localStorage.agent_code + ext);
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
		var data_info = "";
		
		var branchRole = '';
		if(localStorage.getItem('role')==102){
			branchRole = 'form-group hidden';
		} else {
			branchRole = 'form-group';

		}
		debugger;
		let product_list = [];
		
		if(this.state.data != null && this.state.data.products && this.state.data.products.length > 0){
			// listBranch.push(
			// 	<option value="">All Branch</option>
			// );
			product_list.push(
					<option value="">All</option>
			);
			this.state.data.products.map(function(value, index){
				product_list.push(
					<option value={value} key={index}>{value}</option>
				);
			});
		}

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

		if(data != null && data.length > 0)
		{
			data_info = "   Show "+data.length+" of "+this.state.total_data;
			$.map(data, (value, index) => {
	            
				let offs = this.state.param.offset;
				let page = this.state.param.page; 
				let num = (page - 1) * offs;



				let url = "#/newbusiness/policy_info/"+value.id;
					let row = null;
					let insured = "";
					// $.map(value.lifeassured_set,(value,index) => {
					// 	insured += value.person.name + "\n";
					// })

					try{
						insured = value.lifeassured_set == null ? '' : value.lifeassured_set[0] == null ? '' : value.lifeassured_set[0].person == null ? '' : value.lifeassured_set[0].person.name;
					}catch(e){

					}

					num += (index+1);
					
					row = <tr key={index}>
								<td>{num}</td>
								<td><a href={"#/policy/policy_info/"+value.id}>{value.number}</a></td>
								<td>{value.product == null ? '' : value.product.name == null ? '' : value.product.name}</td>
								{/*<td>{value.number}</td>*/}
								<td>{value.status}</td>
								<td>{value.policy_holder==null ? '' : value.policy_holder.name == null? '' : value.policy_holder.name}</td>
								<td>{insured}</td>
								<td>{DateFormat(value.effective_date)}</td>
								<td>{MoneyFormat(value.total_premium)}</td>
								<td>{value.payment_mode}</td>
								{/*<td>{value.payment_method}</td>*/}
								<td>{value.agent == null ? '' : value.agent.full_name == null ? '' : value.agent.full_name}</td>
								{/*<td>{value.agent == null ? '' : value.agent.user.level.type}</td>*/}
								<td>{value.agent!= null ? value.agent.user != null ? value.agent.user.level != null? value.agent.user.level.type != null? value.agent.user.level.type : ''  : '' : '' : ''}</td>
								<td>{value.agent == null ? '' : value.agent.status == null ? '' : value.agent.status}</td>
								<td>{value.agent == null ? '' : value.agent.branch == null? '' : value.agent.branch.name == null ? '' : value.agent.branch.name}</td>
								<td>{value.policy_status_date == null ? '' : DateFormat(value.policy_status_date)}</td>
							</tr>
					policies.push(row);

	          });

		} else {
			let row = <tr>
						<td colSpan="14" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            policies.push(row);

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

		
		return (
			<div>
		<div className="wrap2" onClick={this.show}>
			<div id="wrapShadow"></div>
			<SubmitModal />
   		 <TopMenuNewBusinessDetail opsi="inquiry" title="Policy Tracking"  onClick={this.showRight} />

			<div>
				{/*{memoMenu}*/}
			</div>
			<div className="main-wrapper">
				<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>
						<ol className="breadcrumb" style={{marginBottom: '5px', marginTop:'55px'}}>
							<li className="active">Policy Tracking</li>
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

					<LeftMenuInquiry active="1" />

					<div className="main-content boxShadow">

						<div className="row">
							<div className="col-sm-12">
								<h3>Summary</h3>

								<div className="scroll-h">
									<table className="table table-bordered table-striped table-hover table-box table-responsive">
										<thead>
											<tr>
												<th className="header_table"></th>
												<th className="header_table">Total Policy</th>
												<th className="header_table">Total Premium</th>
												<th className="header_table">Annualized</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Policy Inforce</td>
												<td>{this.state.summary != null && this.state.summary.inforce_policy.total_policies}</td>
												<td style={{'textAlign':'right'}}>{this.state.summary != null && MoneyFormat(this.state.summary.inforce_policy.total_premium)}</td>
												<td style={{'textAlign':'right'}}>{this.state.summary != null && MoneyFormat(this.state.summary.inforce_policy.annualized)}</td>
											</tr>
											<tr>
												<td>Policy Lapse</td>
												<td>{this.state.summary != null && this.state.summary.lapse_policy.total_policies}</td>
												<td style={{'textAlign':'right'}}>{this.state.summary != null && MoneyFormat(this.state.summary.lapse_policy.total_premium)}</td>
												<td style={{'textAlign':'right'}}>{this.state.summary != null && MoneyFormat(this.state.summary.lapse_policy.annualized)}</td>
											</tr>
											<tr>
												<td>Policy Terminated</td>
												<td>{this.state.summary != null && this.state.summary.terminated_policy.total_policies}</td>
												<td style={{'textAlign':'right'}}>{this.state.summary != null && MoneyFormat(this.state.summary.terminated_policy.total_premium)}</td>
												<td style={{'textAlign':'right'}}>{this.state.summary != null && MoneyFormat(this.state.summary.terminated_policy.annualized)}</td>
											</tr>
										</tbody>
									</table>
								</div>
							</div>
						</div>

						<hr />

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
												<label>Product Name</label>
											</div>
											<div className="col-sm-6">
												<select className="form-control" id="product_name" name="product_name" onChange={this.handleChangeData}>
													{product_list}
												</select>
											{/* <input type="text" className="form-control" id="product_name" name="product_name" value={this.state.param.product_name} onChange={this.handleChangeData} /> */}
											</div>
										</div>
										<div className="form-group">
											<div className="col-sm-6">
												<label>SPAJ No</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="spaj_no" name="spaj_no" value={this.state.param.spaj_no} onChange={this.handleChangeData} />
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
												<label>Insured</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="insured" name="insured" value={this.state.param.insured} onChange={this.handleChangeData} />
											</div>
										</div>
										<div className="form-group">
											<div className="col-sm-6">
												<label>Payment Mode</label>
											</div>
											<div className="col-sm-6">
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
											<div className="col-sm-6">
												<label>Policy Status</label>
											</div>

											<div className="col-sm-6">
												<select className="form-control" id="policy_status" name="policy_status" onChange={this.handleChangeData}>
													<option value="">All</option>
													<option value="1">Inforce</option>
													<option value="2">Lapse</option>
													<option value="3">Terminated</option>
													{/*<option value="4">Expiry</option>
													<option value="5">Matured</option>
													<option value="7">Cancelled</option>
													<option value="8">Declined</option>
													<option value="9">Paid Up</option>
													<option value="10">Surrender</option>
													<option value="12">Withdrawn</option>
													<option value="13">Registered Death</option>
													<option value="15">PH Reinstatement Pending</option>
													<option value="16">Not Taken Up</option>
													<option value="17">Pending Renewal</option>
													<option value="19">Postponed</option>*/}
												</select>
												{/* <input type="text" className="form-control" id="status" name="status"  /> */}
											</div>
										</div>

									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-horizontal">

										<div className={branchRole}>
											<div className="col-sm-6">
												<label>Branch</label><i style={{"display":"none", 'float':'right'}} className="fa fa-spinner fa-pulse fa-fw load-ape" ></i>
											</div>

											<div className="col-sm-6">												
												<select className="form-control" id="branch" name="branch" value={this.state.param.branch} onChange={this.handleChangeData}>
													{listBranch}
												</select>
												{/* <input type="text" className="form-control" id="branch" name="branch" value={this.state.param.branch} onChange={this.handleChangeData} /> */}
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
												<label>Agent Code</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="agent_code" name="agent_code" value={this.state.param.agent_code} onChange={this.handleChangeData} />
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

									</div>
								</div>
							</div>

							<div className="col-sm-12">
								<div className="form-horizontal">
									<div className="col-sm-6">
										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy Effective Date</label>
											</div>

											<div className="col-sm-6">
												<DatePicker className="form-control" id="policy_effective_date_start" name="policy_effective_date_start" />	
											</div>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<div className="col-sm-1">
												<label>to</label>
											</div>
											<div className="col-sm-6">
												<DatePicker className="form-control" id="policy_effective_date_end" name="policy_effective_date_end" />
											</div>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-12">
								<div className="form-horizontal">
									<div className="col-sm-6">
										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy Status Date</label>
											</div>

											<div className="col-sm-6">
												<DatePicker className="form-control" id="policy_status_start_date" name="policy_status_start_date" />	
											</div>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<div className="col-sm-1">
												<label>to</label>
											</div>
											<div className="col-sm-6">
												<DatePicker className="form-control" id="policy_status_end_date" name="policy_status_end_date" />
											</div>
										</div>
									</div>
								</div>
							</div>
							
							<div className="col-sm-12">
								<div className="form-group">
									<div className="col-sm-3">
										<label>Display Group?</label>
									</div>

									<div className="col-sm-1 text-left">
										<div className="checkbox">
										<label>
											<input type="checkbox" id="display_group" name="display_group" className="form-control" value={this.state.param.display_group} checked={checked} onChange={this.handleChangeData} />
										</label>
										</div>
									</div>
								</div>
							</div>

							<div className="col-sm-12">
								<div className="clearfix h25"></div>
									<div className="col-sm-3 pull-left">
											<label style={{paddingTop:'20px', paddingBottom:'20px'}}>{data_info}</label>
									</div>
								<div className="col-sm-3 pull-right">
									<button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.getData.bind(this, '0')}><i className="fa fa-search"></i> Search</button>
								</div>
							</div>
						</div>

						<div className="clearfix h25"></div>

						<hr />

						<div className="row">
							<div className="col-sm-12">
								<div className="scroll-h" style={{'overflow-x':'auto'}}>
									<div className="col-sm-12"  style={{verticalAlign:'middle'}}>
										<div className="col-sm-12">
											<nav aria-label="Page navigation">
												<ul className="pagination">
													{paging}
												</ul>
											</nav>
										</div>
									</div>
									<table className="table table-bordered table-striped table-hover text-center table-box">
										<thead>
											<tr>
												<th className="header_table valign-middle text-center">No</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_no")}>Policy No</a> {this.sortIcon("policy_no")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "product_name")}>Product Name</a> {this.sortIcon("product_name")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_status")}>Policy Status</a> {this.sortIcon("policy_status")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_holder")}>Policy Holder</a> {this.sortIcon("policy_holder")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "insured")}>Insured</a> {this.sortIcon("insured")}</th>
												<th className="header_table valign-middle text-center" style={{'width' : '120px'}}><a onClick={this.itemSorting.bind(this, "effective_date")}>Policy Effective Date</a> {this.sortIcon("effective_date")}</th>
												<th className="header_table valign-middle text-center" style={{'width' : '100px'}}><a onClick={this.itemSorting.bind(this, "premium")}>Premium</a> {this.sortIcon("premium")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "payment_mode")}>Payment Mode</a> {this.sortIcon("payment_mode")}</th>
												{/*<th className="header_table valign-middle text-center">Payment Method</th>*/}
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_name")}>Agent Name</a> {this.sortIcon("agent_name")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_level")}>Level</a> {this.sortIcon("agent_level")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_status")}>Status</a> {this.sortIcon("agent_status")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_branch")}>Branch</a> {this.sortIcon("agent_branch")}</th>
												<th className="header_table valign-middle text-center" style={{'width' : '120px'}}><a onClick={this.itemSorting.bind(this, "policy_status_date")}>Policy Status Date</a> {this.sortIcon("policy_status_date")}</th>
											</tr>
											<tr key="header_list_policy_filter">
												<th className="header_table"></th>
												<th className="header_table"><input type="text" name="policy_no" onChange={this._onFilterChange.bind(this, "policy_no")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="product_name" onChange={this._onFilterChange.bind(this, "product_name")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_status" onChange={this._onFilterChange.bind(this, "policy_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_holder" onChange={this._onFilterChange.bind(this, "policy_holder")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="insured" onChange={this._onFilterChange.bind(this, "insured")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="effective_date" onChange={this._onFilterChange.bind(this, "effective_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="premium" onChange={this._onFilterChange.bind(this, "premium")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="payment_mode" onChange={this._onFilterChange.bind(this, "payment_mode")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_name" onChange={this._onFilterChange.bind(this, "agent_name")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_level" onChange={this._onFilterChange.bind(this, "agent_level")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_status" onChange={this._onFilterChange.bind(this, "agent_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_branch" onChange={this._onFilterChange.bind(this, "agent_branch")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_status_date" onChange={this._onFilterChange.bind(this, "policy_status_date")} className="form-control" /></th>
											</tr>
										</thead>
										<tbody>
											{policies}											
										</tbody>
										<tfoot>
											<tr>
												<th colSpan="14"><button style={{marginRight:'10px'}} className="btn btn-primary" onClick={() => this.downloadPolicy('excel')}>Export as XLSX</button></th>
											</tr>
										</tfoot>
									</table>
									<div>
										<nav aria-label="Page navigation">
											<ul className="pagination">
												{paging}
											</ul>
										</nav>
									</div>
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

export default list_policies;