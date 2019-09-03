'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';

import {MoneyFormat, DateFormatMMM, DateFormat} from '../../common_components/helper/formatter';
import Loading from '../../common_components/loading';
import {DatePicker} from '../../common_components/date_picker';
import Pager from 'react-pager';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import DecissionModal from '../../common_components/modal/decission_modal';
import StatusClaimModal from '../../common_components/modal/status_claim_modal';
import {getSideMenu} from '../../common_components/helper/user_session';
import {MIME_TYPE} from '../../common_components/helper/constant';

var FileSaver = require('file-saver');
const SortType = {
  DESC : 'DESC',
  ASC : 'ASC'
}

class claim extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			filterd_data : null,
			sort : SortType.DESC,
			activeSorting : '',
			param: {
				policy_no:"",
				claim_no:"",
				policy_holder_name:"",
				insured:"",
				branch:"",
				agent_name:"",
				agent_code:"",
				agent_status:"",
				claim_payment_status:"",
				claim_type:"",
				submission_start_date:"",
				submission_end_date:"",
				export:"",
				page:"",
				offset:10,
				status : ""
			},
			branch_list: null,
			decision_list: null,
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

		this.state.param.page = '1';
		this.state.param.export = '';

		$('#loading').modal('show');
			$.ajax({
				url: api_route.claim_tracking,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					
					$('#loading').modal('hide');
					console.log(response);
				var num_data = response.content.claim_list || [];
				var total_page = response.content.total_pages;
				// // debugger di listclaim ajax
				// debugger;
				this.setState({
					data: response.content,
					filterd_data: num_data,
					total_data: response.content.total_claim,
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

			// $.ajax({
			// 	url : api_route.claim_detail,
			// 	headers: {
			// 		'Authorization':'JWT '+sessionStorage.getItem('token')
			// 	},
			// 	type: 'POST',
			// 	data: [],
			// 	success: (response) => {
			// 		// // debugger;
			// 		// $('.load-ape').hide();
			// 		console.log(response);
			// 		this.setState({
			// 			decision_list : response.content.decision
			// 		});
			// 	},
			// 	error: (err, response) => {

			// 	if(err.responseJSON){
			// 		alert('something happened, please contact administrator');
			// 		//window.location.href = window.location.href.split('#')[0] + '#/';
			// 	}

			// 	}
			// });

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
        if(content == "submission_date"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
							var x = a.submission_date.toLowerCase();
							var y = b.submission_date.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }else{
            data.sort(function(a, b){
							var x = b.submission_date.toLowerCase();
							var y = a.submission_date.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }
        }else if(content == "incomplete"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
							var x = a.incomplete.toLowerCase();
							var y = b.incomplete.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }else{
            data.sort(function(a, b){
							var x = b.incomplete.toLowerCase();
							var y = a.incomplete.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }
        }else if(content == "completed"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
							var x = a.completed.toLowerCase();
							var y = b.completed.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }else{
            data.sort(function(a, b){
							var x = b.completed.toLowerCase();
							var y = a.completed.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }
        }else if(content == "number"){
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
		  }else if(content == "approve_amount"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
							  var x = a.approve_amount.toLowerCase();
							  var y = b.approve_amount.toLowerCase();
							  if (x < y) {return -1;}
							  if (x > y) {return 1;}
							  return 0;
			  });
			}else{
			  data.sort(function(a, b){
							  var x = b.approve_amount.toLowerCase();
							  var y = a.approve_amount.toLowerCase();
							  if (x < y) {return -1;}
							  if (x > y) {return 1;}
							  return 0;
			  });
			}
		  }else if(content == "status_date"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
							var x = a.status_date.toLowerCase();
							var y = b.status_date.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }else{
            data.sort(function(a, b){
							var x = b.status_date.toLowerCase();
							var y = a.status_date.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }
        }else if(content == "policy_number"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
							var x = a.policy_number.toLowerCase();
							var y = b.policy_number.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }else{
            data.sort(function(a, b){
							var x = b.policy_number.toLowerCase();
							var y = a.policy_number.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }
        }else if(content == "policy_holder"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
							var x = a.policy_holder.toLowerCase();
							var y = b.policy_holder.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }else{
            data.sort(function(a, b){
							var x = b.policy_holder.toLowerCase();
							var y = a.policy_holder.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }
        }else if(content == "insured"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
							var x = a.insured.toLowerCase();
							var y = b.insured.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }else{
            data.sort(function(a, b){
							var x = b.insured.toLowerCase();
							var y = a.insured.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }
        }else if(content == "agent_name"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
							var x = a.agent_name.toLowerCase();
							var y = b.agent_name.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }else{
            data.sort(function(a, b){
							var x = b.agent_name.toLowerCase();
							var y = a.agent_name.toLowerCase();
							if (x < y) {return -1;}
							if (x > y) {return 1;}
							return 0;
            });
          }
        }else if(content =="branch"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
							  var x = a.branch.toLowerCase();
							  var y = b.branch.toLowerCase();
							  if (x < y) {return -1;}
							  if (x > y) {return 1;}
							  return 0;
			  });
			}else{
			  data.sort(function(a, b){
							  var x = b.branch.toLowerCase();
							  var y = a.branch.toLowerCase();
							  if (x < y) {return -1;}
							  if (x > y) {return 1;}
							  return 0;
			  });
			}
		  }else if(content =="type"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
							  var x = a.type.toLowerCase();
							  var y = b.type.toLowerCase();
							  if (x < y) {return -1;}
							  if (x > y) {return 1;}
							  return 0;
			  });
			}else{
			  data.sort(function(a, b){
							  var x = b.type.toLowerCase();
							  var y = a.type.toLowerCase();
							  if (x < y) {return -1;}
							  if (x > y) {return 1;}
							  return 0;
			  });
			}
		  }else if(content =="incomplete_documents"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
							  var x = a.incomplete_documents.toLowerCase();
							  var y = b.incomplete_documents.toLowerCase();
							  if (x < y) {return -1;}
							  if (x > y) {return 1;}
							  return 0;
			  });
			}else{
			  data.sort(function(a, b){
							  var x = b.incomplete_documents.toLowerCase();
							  var y = a.incomplete_documents.toLowerCase();
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
            filterd_data: this.state.data.claim_list
          });
        }

        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.data.claim_list.length;
        var filteredList = [];

        for (var index = 0; index < size; index++){
          if(cellDataKey == "submission_date")
            var v = this.state.data.claim_list[index].submission_date;
          else if(cellDataKey == "incomplete")
            var v = this.state.data.claim_list[index].incomplete;
          else if(cellDataKey == "completed")
            var v = this.state.data.claim_list[index].completed;
		  else if(cellDataKey == "number")
			var v = this.state.data.claim_list[index].number;
		  else if(cellDataKey == "type")
			var v = this.state.data.claim_list[index].type;
		  else if(cellDataKey == "status")
			var v = this.state.data.claim_list[index].status;
		  else if(cellDataKey == "approve_amount")
			var v = this.state.data.claim_list[index].approve_amount;
	  	  else if(cellDataKey == "claim_payment_status")
			var v = this.state.data.claim_list[index].claim_payment_status;
		  else if(cellDataKey == "payment_status_date")
			var v = this.state.data.claim_list[index].payment_status_date;
          else if(cellDataKey == "status_date")
			var v = this.state.data.claim_list[index].status_date;
          else if(cellDataKey == "policy_number")
            var v = this.state.data.claim_list[index].policy_number;
          else if(cellDataKey == "policy_holder")
            var v = this.state.data.claim_list[index].policy_holder;
          else if(cellDataKey == "insured")
			var v = this.state.data.claim_list[index].insured;
		  else if(cellDataKey == "incomplete_documents")
			var v = this.state.data.claim_list[index].incomplete_documents;
		  else if(cellDataKey == "agent_name")
			var v = this.state.data.claim_list[index].agent_name;
          else if(cellDataKey == "branch")
			var v = this.state.data.claim_list[index].branch;

          if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
            filteredList.push(this.state.data.claim_list[index]);
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
		this.state.param.export = '';

		$.ajax({
			url: api_route.claim_tracking,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
				console.log(response);
			var num_data = response.content.claim_list || [];
			var total_page = response.content.total_pages;
			// // debugger di listclaim ajax
			// debugger;
			this.setState({
				data: response.content,
				filterd_data: num_data,
				total_data: response.content.total_claim,
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

		this.state.param.page = '1';
		this.state.param.export = '';

		var submission_start_date = $('[name=submission_date_start]').val();
		var submission_end_date = $('[name=submission_date_end]').val();
		this.state.param.submission_start_date = submission_start_date;
		this.state.param.submission_end_date = submission_end_date;
		var paramSearch = this.state.param;

		if(param == '0'){
			if(paramSearch.policy_no == "" && paramSearch.policy_holder_name == ""
			&& paramSearch.insured == "" && paramSearch.branch == "" && paramSearch.agent_name == ""
			&& paramSearch.agent_code == "" && paramSearch.agent_status == ""
			&& paramSearch.claim_no == "" && paramSearch.claim_type == "" && submission_end_date=="" && submission_start_date== ""){

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

			// $('.load-ape').show();
			// $.ajax({
			// 	url : api_route.claim_detail,
			// 	headers: {
			// 		'Authorization':'JWT '+sessionStorage.getItem('token')
			// 	},
			// 	type: 'GET',
			// 	data: [],
			// 	success: (response) => {
			// 		// // debugger;
			// 		console.log(response);
			// 		// $('.load-ape').hide();
			// 		this.setState({
			// 			decision_list : response.content.decision
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
				url: api_route.claim_tracking,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					$('#loading').modal('hide');
					console.log(response);
				var num_data = response.content.claim_list || [];
				var total_page = response.content.total_pages;
				// // debugger di listclaim ajax
				// debugger;
				this.setState({
					data: response.content,
					filterd_data: num_data,
					total_data: response.content.total_claim,
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

			// $('.load-ape').show();
			// $.ajax({
			// 	url : api_route.claim_detail,
			// 	headers: {
			// 		'Authorization':'JWT '+sessionStorage.getItem('token')
			// 	},
			// 	type: 'GET',
			// 	data: [],
			// 	success: (response) => {
			// 		// // debugger;
			// 		console.log(response);
			// 		// $('.load-ape').hide();
			// 		this.setState({
			// 			decision_list : response.content.decision
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
				url: api_route.claim_tracking,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					console.log(response);
					$('#loading').modal('hide');
				var num_data = response.content.claim_list || [];
				var total_page = response.content.total_pages;
				// // debugger di listclaim ajax
				// debugger;
				this.setState({
					data: response.content,
					filterd_data: num_data,
					total_data: response.content.total_claim,
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
			url: api_route.claim_tracking,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
				$('#loading').modal('hide');
				console.log(response);
			var num_data = response.content.claim_list || [];
			var total_page = response.content.total_pages;
			// // debugger di listclaim ajax
			// debugger;
			this.setState({
				data: response.content,
				filterd_data: num_data,
				total_data: response.content.total_claim,
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
	downloadClaim(file){

		this.state.param.export = file;
		let ext = "";
		if(file == 'pdf'){
			ext = ".pdf";
		} else{
			ext = ".xlsx";
		}
		$('#loading').modal('show');

		$.ajax({
            url: api_route.claim_tracking,
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
				FileSaver.saveAs(blob, "Claim Tracking" + localStorage.agent_code + ext);
            },
            error: (err, response) => {
              $('#loading').modal('hide');
			  alert("something wrong");
            }
        });
	}

	render(){
		let data = this.state.filterd_data;
		let claim = [];
		let listBranch = [];
		var data_info = "";
		let incomplete_docs = [];
		let detail_submit = [];
		let row2 = [];

		var branchRole = '';
		if(localStorage.getItem('role')==102){
			branchRole = 'form-group hidden';
		} else {
			branchRole = 'form-group';

		}
		debugger;
		if(this.state.data && this.state.data.summary && this.state.data.summary.submit_claims && this.state.data.summary.submit_claims.detail_status.length > 0){
			$.map(this.state.data.summary.submit_claims.detail_status, (value, index) => {
                    
				row2 = <tr key={index}>
					<td>{value.status}</td>
					<td>{value.total}</td>						
				</tr>
				detail_submit.push(row2);
			});
		}else{
			let row2 = <tr>
					<td colSpan="2" style={{'textAlign':'center'}}>No data.</td>
				</tr>
			detail_submit.push(row2);
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
			// data_info = "   Show 0 of 0";
			$.map(data, (value, index) => {

				let offs = this.state.param.offset;
				let page = this.state.param.page;
				let num = (page - 1) * offs;
				console.log(value.incomplete_documents);
				let incomplete_doc = [];
				if(value.incomplete_documents != null && value.incomplete_documents.length > 0)
				{
					value.incomplete_documents.map(function(doc, index){
						console.log(doc);
						incomplete_doc.push(
							<li>{doc}</li>
						);
					});
					incomplete_docs.push(incomplete_doc);
				}else{
					incomplete_docs.push(incomplete_doc);
				}
				// let url = "#/newbusiness/policy_info/"+value.id;
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
					console.log(incomplete_docs);
					row = <tr key={index}>
								<td>{num}</td>
								<td>{value.policy_number != null? value.policy_number : '' }</td>
								<td><a href={"#/claim_tracking/claim_data/"+value.id+"/"+value.policy+'?type='+value.type+'&status='+value.status}>{value.number != null? value.number : '' }</a></td>
								<td>{value.type != null? value.type : '' }</td>
								<td>{value.policy_holder != null? value.policy_holder : '' }</td>
								{/*<td>{value.payment_method}</td>*/}
								<td>{value.insured != null? value.insured : '' }</td>
								<td>{value.submission_date != null? DateFormatMMM(value.submission_date) : "-"}</td>
								<td>{value.status != null? value.status : '' }</td>
								<td>{value.status_date != null? DateFormatMMM(value.status_date) : "-"}</td>
								<td>{value.approve_amount != null? MoneyFormat(value.approve_amount) : '' }</td>
								<td>{value.payment_status != null? value.payment_status : '' }</td>
								<td>{value.payment_status_date != null && value.payment_status_date != '-' ? DateFormatMMM(value.payment_status_date) : '-' }</td>
								<td>{value.incomplete != null && value.incomplete != "-"?  value.incomplete+ " days" : "-"}</td>
								{/*<td>{value.number}</td>*/}
								<td style={{textAlign:'left'}}>{incomplete_doc != null? <ul>{incomplete_docs[index]}</ul> : "-"}</td>
								{/*<td>{value.agent == null ? '' : value.agent.user.level.type}</td>*/}
								<td>{value.agent_name != null? value.agent_name : '' }</td>
								{/* <td>{value.agent == null ? '' : value.agent.status == null ? '' : value.agent.status}</td> */}
								<td>{value.branch == null ? '' : value.branch}</td>
								{/* <td>{value.policy_status_date == null ? '' : DateFormatMMM(value.policy_status_date)}</td> */}
							</tr>
					claim.push(row);

	          });

		} else {
			let row = <tr>
						<td colSpan="16" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            claim.push(row);

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
   		 <TopMenuNewBusinessDetail opsi="inquiry" title="Claim Tracking"  onClick={this.showRight} />

			<div>
				{/*{memoMenu}*/}
			</div>
			<div className="main-wrapper">
				<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>
						<ol className="breadcrumb" style={{marginBottom: '5px', marginTop:'55px'}}>
							<li className="active">Claim Tracking</li>
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

					<LeftMenuInquiry active="6" />

					<div className="main-content boxShadow">

						<div className="row">
							<div className="col-sm-12">
								<h3>Summary Claim</h3>

								<div className="scroll-h">
									<table className="table table-bordered table-striped table-hover table-box table-responsive">
										<thead>
											<tr>
												<th className="header_table">Status</th>
												<th className="header_table"># Cases</th>
											</tr>
										</thead>
										<tbody>
											<tr>
												<td>Submit</td>
												{/* <td>{this.state.summary != null && this.state.summary.inforce_policy.total_claim}</td> */}
												<td><a title="detail" data-toggle='modal' data-target='#submit-claim-modal' >{this.state.data && this.state.data.summary && this.state.data.summary.submit_claims ? this.state.data.summary.submit_claims.number : 0 }</a></td>
											</tr>
											<tr>
												<td>Incomplete Document</td>
												<td>{this.state.data && this.state.data.summary && this.state.data.summary.incomplete_claims ? this.state.data.summary.incomplete_claims.number : 0 }</td>
											</tr>
											<tr>
												<td>Expired</td>
												<td>{this.state.data && this.state.data.summary && this.state.data.summary.expired_claims ? this.state.data.summary.expired_claims.number : 0 }</td>
											</tr>
											<tr>
												<td>In Progress</td>
												<td>{this.state.data && this.state.data.summary && this.state.data.summary.in_progress_claims ? this.state.data.summary.in_progress_claims.number : 0 }</td>
											</tr>
											<tr>
												<td>Decision</td>
												<td><a data-toggle="modal" href="#decission_modal">{this.state.data && this.state.data.summary && this.state.data.summary.decision_claims ? this.state.data.summary.decision_claims.number : 0 }</a></td>
											</tr>
											<tr>
												<td>Payment Status</td>
												<td><a data-toggle="modal" href="#claim_payment_modal">{this.state.data && this.state.data.summary && this.state.data.summary.payment_claims ? this.state.data.summary.payment_claims.number : 0 }</a></td>
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
												<label>Claim No</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="claim_no" name="claim_no" value={this.state.param.claim_no} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Claim Status</label>
											</div>
											<div className="col-sm-6">
													<select className="form-control" id="status" name="status" onChange={this.handleChangeData} >
														<option value="">All Status</option>
														<option value="1">Submit</option>
														<option value="2">Incomplete Document</option>
														<option value="3">Expired</option>
														<option value="4">Claim In Progress</option>
														<option value="5">Decision</option>
														{/* <option value="9">Paid</option> */}
													</select>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Claim Payment Status</label>
											</div>
											<div className="col-sm-6">
													<select className="form-control" id="claim_payment_status" name="claim_payment_status" onChange={this.handleChangeData} >
														<option value="">All Type</option>
														<option value="1">Waiting for Payment</option>
														<option value="3">Paid</option>
														<option value="4">Return</option>
													</select>
											</div>
										</div>
										<div className="form-group">
											<div className="col-sm-6">
												<label>Claim Type</label>
											</div>
											<div className="col-sm-6">
													<select className="form-control" id="claim_type" name="claim_type" onChange={this.handleChangeData} >
														<option value="">All Type</option>
														<option value="1">Death Claim</option>
														<option value="2">HNS</option>
														<option value="3">HSR</option>
														<option value="4">HCP</option>
													</select>
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
									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-horizontal">

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
									</div>
								</div>
							</div>
							<div className="col-sm-12">
								<div className="form-horizontal">
									<div className="col-sm-6">
										<div className="form-group">
											<div className="col-sm-6">
												<label>Submission Date</label>
											</div>
											<div className="col-sm-6">
												<DatePicker className="form-control" id="submission_date_start" name="submission_date_start" />
											</div>
										</div>
									</div>
									<div className="col-sm-6">
										<div className="form-group">
											<div className="col-sm-1">
												<label>to</label>
											</div>
											<div className="col-sm-6">
												<DatePicker className="form-control" id="submission_date_end" name="submission_date_end" />
											</div>
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
									<button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.getData.bind(this)}><i className="fa fa-search"></i> Search</button>
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
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_number")}>Policy No</a> {this.sortIcon("policy_number")}</th>
												<th className="header_table valign-middle text-center" style={{width:'300px'}}><a onClick={this.itemSorting.bind(this, "number")}>Claim No</a> {this.sortIcon("number")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "type")}>Claim Type</a> {this.sortIcon("type")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_holder")}>Policy Holder</a> {this.sortIcon("policy_holder")}</th>
												{/*<th className="header_table valign-middle text-center">Payment Method</th>*/}
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "insured")}>Insured</a> {this.sortIcon("insured")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "submission_date")}>Submission Date</a> {this.sortIcon("submission_date")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "status")}>Status</a> {this.sortIcon("status")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "status_date")}>Status Date</a> {this.sortIcon("status_date")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "approve_amount")}>Amount Approved</a> {this.sortIcon("approve_amount")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "claim_payment_status")}>Claim Payment Status</a> {this.sortIcon("claim_payment_status")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "payment_status_date")}>Payment Status Date</a> {this.sortIcon("payment_status_date")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "incomplete")}>Doc Incomplete Age</a> {this.sortIcon("incomplete")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "incomplete_documents")}>Incompleted Doc</a> {this.sortIcon("incomplete_documents")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_name")}>Agent Name</a> {this.sortIcon("agent_name")}</th>
												{/* <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_status")}>Status</a> {this.sortIcon("agent_status")}</th> */}
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "branch")}>Branch</a> {this.sortIcon("branch")}</th>
												{/* <th className="header_table valign-middle text-center" style={{'width' : '120px'}}><a onClick={this.itemSorting.bind(this, "completed_date")}>Policy Status Date</a> {this.sortIcon("completed_date")}</th> */}
											</tr>
											<tr key="header_list_policy_filter">
												<th className="header_table"></th>
												<th className="header_table"><input type="text" name="policy_number" onChange={this._onFilterChange.bind(this, "policy_number")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="number" onChange={this._onFilterChange.bind(this, "number")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="type" onChange={this._onFilterChange.bind(this, "type")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_holder" onChange={this._onFilterChange.bind(this, "policy_holder")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="insured" onChange={this._onFilterChange.bind(this, "insured")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="submission_date" onChange={this._onFilterChange.bind(this, "submission_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="status" onChange={this._onFilterChange.bind(this, "status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="status_date" onChange={this._onFilterChange.bind(this, "status_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="approve_amount" onChange={this._onFilterChange.bind(this, "approve_amount")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="claim_payment_status" onChange={this._onFilterChange.bind(this, "claim_payment_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="payment_status_date" onChange={this._onFilterChange.bind(this, "payment_status_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="incomplete" onChange={this._onFilterChange.bind(this, "incomplete")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="incomplete_documents" onChange={this._onFilterChange.bind(this, "incomplete_documents")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_name" onChange={this._onFilterChange.bind(this, "agent_name")} className="form-control" /></th>
												{/* <th className="header_table"><input type="text" name="agent_status" onChange={this._onFilterChange.bind(this, "agent_status")} className="form-control" /></th> */}
												<th className="header_table"><input type="text" name="branch" onChange={this._onFilterChange.bind(this, "branch")} className="form-control" /></th>
												{/* <th className="header_table"><input type="text" name="policy_status_date" onChange={this._onFilterChange.bind(this, "policy_status_date")} className="form-control" /></th> */}
											</tr>
										</thead>
										<tbody>
										{/* <tr>
											<td colSpan="12" style={{'textAlign':'center'}}>No data.</td>
										</tr> */}
											{claim}
										</tbody>
										<tfoot>
											<tr>
												{localStorage.getItem('role') == 17 || localStorage.getItem('role') == 18 || localStorage.getItem('role') == 19 || localStorage.getItem('role') == 20 || (localStorage.getItem('role') == 5 && localStorage.getItem('agent_code').charAt(0) == '9') || localStorage.getItem('username')=='user.banca' ? '' : <th colSpan="16"><button style={{marginRight:'10px'}} className="btn btn-primary" onClick={() => this.downloadClaim('excel')}>Export as XLSX</button></th>}
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

			<div className="modal fade" id="submit-claim-modal" tabIndex="-1" role="dialog" aria-labelledby="vc-modalLabel" aria-hidden="true" style={{marginTop:'100px'}}>
				<div className="modal-dialog ec-modal" style={{height:'auto', width:'50%'}}>
					<div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
						<div className="modal-header" style={{height: 'auto'}}>
							<button type="button" className="close" data-dismiss="modal">&times;</button>
							<h3 style={{fontWeight:'bold', textAlign:'center'}}>Detail Submit</h3>
						</div>
						<div className="modal-body content-modal-group" style={{overflowY:'auto', maxHeight:'250px'}}>
							<table className="table table-bordered table-striped table-hover table-box table-responsive">
								<thead>
									<tr>
										<th className="header_table">Status</th>
										<th className="header_table"># Cases</th>
									</tr>
								</thead>
								<tbody>
									{detail_submit}
								</tbody>
								<tfoot>
									<tr>
										<td>Total</td>
										<td>{this.state.data && this.state.data.summary && this.state.data.summary.submit_claims ? this.state.data.summary.submit_claims.number : 0 }</td>
									</tr>
								</tfoot>
							</table>
						</div>
					</div>
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
		    	<DecissionModal data={this.state.data && this.state.data.summary}/>
		    	<StatusClaimModal data={this.state.data && this.state.data.summary}/>
			</div>
			<div className="clearfix"></div>
			<Footer />

		</div>
		);
	}
}

export default claim;
