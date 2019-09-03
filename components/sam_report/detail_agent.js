'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuSam from '../../common_components/menu_v2/left_menu_sam';
import Footer from '../../common_components/footer';
import {getAllUrlParams} from '../../common_components/helper/url_helper';
import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';
import Loading from '../../common_components/loading';
import {DatePicker} from '../../common_components/date_picker';
import Pager from 'react-pager';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import SubmitModal from '../../common_components/modal/submit_modal';
import SpcModal from '../../common_components/modal/spc_modal';
import RpcModal from '../../common_components/modal/rpc_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import {getSideMenu} from '../../common_components/helper/user_session';
import {getMenu} from '../../common_components/helper/user_session';
// import BigCalendar from 'react-big-calendar';
// import globalize from 'globalize';

const SortType = {
  DESC : 'DESC',
  ASC : 'ASC'
}

class detail_agent extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			filterd_data : null,
			sort : SortType.DESC,
			activeSorting : '',
			param: {
				agent_code: getAllUrlParams(window.location.href).agent, 
				prospect_name: "",
				stage: "",
				status: "",
				page:"1",
				offset:"10",
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
		this.getTabSelling = this.getTabSelling.bind(this);
		this.getTabRecruit = this.getTabRecruit.bind(this);
		this.getModalSelling = this.getModalSelling.bind(this);
		this.getModalRecruit = this.getModalRecruit.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		// this.getDataSummary = this.getDataSummary.bind(this);
        this.itemSorting = this.itemSorting.bind(this);
        this._onFilterChangeRecruit = this._onFilterChangeRecruit.bind(this);
        this._onFilterChangeSelling = this._onFilterChangeSelling.bind(this);
	}

	componentDidMount(){
		
		// this.state.param.effective_date_start = "";
		// this.state.param.effective_date_end = "";
		// this.state.param.policy_status_start_date = "";
		// this.state.param.policy_status_end_date = "";
		this.state.param.page = '1';
		
			$.ajax({
				url: api_route.activity_number,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					console.log(response);
					// var num_data = response.content.policy_list || [];
					// var total_page = response.content.total_pages;
					// // debugger di listpolicies ajax
					// debugger;
					this.setState({
						data: response,
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
	getTabCalendar(param){
		
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
				// var num_data = response.content.policy_list || [];
				// var total_page = response.content.total_pages;
				// // debugger di listpolicies ajax
				// debugger;
				// this.setState({
				// 	data: response.content,
				// 	filterd_data: num_data,
				// 	total_data: response.content.total_policy,
				// 	total: total_page
				// });
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
			// $('#calendar').empty();
			// $('#calendar').fullCalendar({
			// 	themeSystem: 'bootstrap3',

			// 	header: {
			// 	left: 'title',
			// 	right: 'today prev,next',
			// 	},
			// 	eventClick: function(eventObj) {
			// 		  window.location ="#/sam_report/detail_calendar?agent=80000005&id=1";
			  
			// 		  return false; // prevents browser from following link in current tab.
			// 	  },
			// 	defaultDate: '2018-12-12',
			// 	editable: false,
				
			// 	eventLimit: true, // allow "more" link when too many events
			// 	events: [
			// 	{
			// 	title: 'All Day Event',
			// 	start: '2018-12-01',
			// 	// url: '2018-12-01'
			// 	},
				
			// 	]
			// 	});

			// 	$(".fc-header-left").css('border', 'none');
			// 	$(".fc-header-center").css('border', 'none');
			// 	$(".fc-header-right").css({"border": "none", "vertical-align": "middle", "text-align" : "right"});
				
			// 	$(".fc-button").css('padding', '10px');
		
	}
	getTabSelling(param){

		var prospect_name = $('[id=prospect_name_selling]').val();
		var status = $('[name=selling_stage').val();
		
		// debugger;

		this.state.param.prospect_name = prospect_name;
		this.state.param.status = status;
		this.state.param.page = '1';

		var paramSearch = this.state.param;

		if(param == '0'){
			$('#message').modal('hide');
			$('#loading').modal('show');

			// policy/summary

			$('.load-ape').show();
			$.ajax({
				url: api_route.selling_card,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
				$('#loading').modal('hide');
				console.log(response);
				var num_data = response.selling_card || [];
				var total_page = response.total_pages;
				// debugger di listoc_recruit ajax
				
					this.setState({
						data: response,
						selling: response,
						filterd_data: num_data,
						tab: 0,
						total_data: response.total_selling,
						total: total_page,
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

		}else{

			$('#message').modal('hide');


			// policy/summary

			$('.load-ape').show();
			$.ajax({
				url: api_route.selling_card,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					$('#loading').modal('hide');
					console.log(response);
					var num_data = response.selling_card || [];
					var total_page = response.total_pages;
					// debugger di listoc_recruit ajax
					
					this.setState({
						data: response,
						selling: response,
						filterd_data: num_data,
						tab:0,
						total_data: response.total_selling,
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

	
	getModalSelling(param, id){

		var prospect_name = $('[name=prospect_name_selling_modal]').val();
		var status = $('[name=status_selling_modal]').val();
		
		// debugger;
		console.log('id '+id);
		this.state.param.selling_card_id = id;
		this.state.param.prospect_name = prospect_name;
		this.state.param.status = status;
		this.state.param.page = '';
		this.state.param.start_date = '';
		this.state.param.end_date = '';
		this.state.param.export = '';

		var paramSearch = this.state.param;

		if(param == '0'){


			$('#message').modal('hide');
			$('#loading').modal('show');

			$.ajax({
				url: api_route.selling_activity,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					$('#loading').modal('hide');
					console.log(response);
					var num_data = response.list_activity || [];
					var total_page = response.total_pages;
				// debugger di listoc_selling ajax
				
					this.setState({
						data: response,
						selling_activity: response,
						// filterd_data: num_data,
						tab: 1,
						total_data: response.total_activities,
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

		}else{

			$('#message').modal('hide');


			// policy/summary

			$('.load-ape').show();
			$.ajax({
				url: api_route.selling_activity,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					$('#loading').modal('hide');
					console.log(response);
					var num_data = response.list_activity || [];
					var total_page = response.total_pages;
				// debugger di listoc_selling ajax
				
					this.setState({
						// data: response,
						selling_activity: response,
						// filterd_data: num_data,
						tab: 1,
						total_data: response.total_activities,
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


	getTabRecruit(param){

		var prospect_name = $('[id=prospect_name_recruit]').val();
		var status = $('[name=status_recruit]').val();
		
		// debugger;

		this.state.param.prospect_name = prospect_name;
		this.state.param.status = status;
		this.state.param.page = '';

		var paramSearch = this.state.param;

		if(param == '0'){

			if(paramSearch.prospect_name == "" && paramSearch.status == ""){

				$('#message').modal('show');

			}else{

				$('#message').modal('hide');
				$('#loading').modal('show');

				// policy/summary

				$('.load-ape').show();
				$.ajax({
					url: api_route.recruit_card,
					headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
					},
					type: 'POST',
					data: this.state.param,
					success: (response) => {
					$('#loading').modal('hide');
					console.log(response);
					var num_data = response.recruit_card || [];
					var total_page = response.total_pages;
					// debugger di listoc_recruit ajax
					
						this.setState({
							data: response,
							recruit: response,
							filterd_data: num_data,
							tab: 1,
							total_data: response.total_recruit,
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
				url: api_route.recruit_card,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					$('#loading').modal('hide');
					console.log(response);
					var num_data = response.recruit_card || [];
					var total_page = response.total_pages;
					// debugger di listoc_recruit ajax
					
					this.setState({
						data: response,
						recruit: response,
						filterd_data: num_data,
						tab: 1,
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

	
	getModalRecruit(param, id){

		var prospect_name = $('[name=prospect_name_recruit_modal]').val();
		var status = $('[name=status_recruit_modal]').val();
		
		// debugger;

		this.state.param.recruit_card_id = id;
		this.state.param.prospect_name = prospect_name;
		this.state.param.status = status;
		this.state.param.page = '';
		this.state.param.start_date = '';
		this.state.param.end_date = '';
		this.state.param.export = '';

		var paramSearch = this.state.param;

		if(param == '0'){


			$('#message').modal('hide');
			$('#loading').modal('show');

			$.ajax({
				url: api_route.recruit_activity,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					$('#loading').modal('hide');
					console.log(response);
					var num_data = response.list_activity || [];
					var total_page = response.total_pages;
				// debugger di listoc_recruit ajax
				
					this.setState({
						data: response,
						recruit_activity: response,
						// filterd_data: num_data,
						tab: 1,
						total_data: response.total_activities,
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

		}else{

			$('#message').modal('hide');


			// policy/summary

			$('.load-ape').show();
			$.ajax({
				url: api_route.recruit_activity,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					$('#loading').modal('hide');
					console.log(response);
					var num_data = response.list_activity || [];
					var total_page = response.total_pages;
				// debugger di listoc_recruit ajax
				
					this.setState({
						// data: response,
						recruit_activity: response,
						// filterd_data: num_data,
						tab: 1,
						total_data: response.total_activities,
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
	
	getData(param){
		var prospect_name = $('[name=prospect_name]').val();
		var status = $('[name=status]').val();
		
		// debugger;

		this.state.param.prospect_name = prospect_name;
		this.state.param.status = status;
		this.state.param.page = '1';

		var paramSearch = this.state.param;


		if(param == '0'){
			if(paramSearch.prospect_name == "" && paramSearch.status == ""){

	// 		if(paramSearch.policy_no == "" && paramSearch.policy_holder_name == "" 
	// 		&& paramSearch.insured == "" && paramSearch.branch == "" && paramSearch.agent_name == ""
	// 		&& paramSearch.agent_code == "" && paramSearch.agent_status == "" && param_date_start == ""
	// 		&& param_date_end == "" && paramSearch.policy_status == "" && paramSearch.spaj_no == "" && policy_status_end_date=="" && policy_status_start_date== ""){

				$('#message').modal('show');

			}else{

				$('#message').modal('hide');
				$('#loading').modal('show');

	// 			// policy/summary

				$('.load-ape').show();
				var url_tab = (this.state.tab == 0) ? api_route.selling_card : api_route.recruit_card;
				$.ajax({
					url: url_tab,
					headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
					},
					type: 'POST',
					data: this.state.param,
					success: (response) => {
						$('#loading').modal('hide');
						var num_data = ((this.state.tab == 0) ? response.selling_card : response.recruit_card) || [] ;
						var total_page = response.total_pages;
					// // debugger di listpolicies ajax
					
						this.setState({
							data: response,
							filterd_data: num_data,
							tab: this.state.tab,
							total_data: ((this.state.tab == 0) ? response.total_selling : response.total_recruit),
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


	// 		// policy/summary

			$('.load-ape').show();
			var url_tab = (this.state.tab == 0) ? api_route.selling_card : api_route.recruit_card;
				$.ajax({
					url: url_tab,
					headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
					},
					type: 'POST',
					data: this.state.param,
					success: (response) => {
						$('#loading').modal('hide');
						var num_data = ((this.state.tab == 0) ? response.selling_card : response.recruit_card) || [] ;
						var total_page = response.total_pages;
					// // debugger di listpolicies ajax
					
						this.setState({
							data: response,
							filterd_data: num_data,
							tab: this.state.tab,
							total_data: ((this.state.tab == 0) ? response.total_selling : response.total_recruit),
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
	
	

	_onFilterChangeSelling(cellDataKey, event){
        // // debugger;
		
        if(!event.target.value){
          this.setState({
            filterd_data: this.state.data.selling_card
          });
        }

        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.data.selling_card.length;
        var filteredList = [];
				
        for (var index = 0; index < size; index++){
          if(cellDataKey == "prospect_name")
		  var v = this.state.data.selling_card[index] == null ? '' : this.state.data.selling_card[index].prospect_name == null ? '' : this.state.data.selling_card[index].prospect_name;
		  else if(cellDataKey == "status_stage")
		  var v = this.state.data.selling_card[index] == null ? '' : this.state.data.selling_card[index].stage == null ? '' : this.state.data.selling_card[index].stage;
          
		  
          v = v != null ? v : '';
          if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
            filteredList.push(this.state.data.selling_card[index]);
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

      _onFilterChangeRecruit(cellDataKey, event){
        // // debugger;
		
        if(!event.target.value){
          this.setState({
            filterd_data: this.state.data.recruit_card
          });
        }

        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.data.recruit_card.length;
        var filteredList = [];
				
        for (var index = 0; index < size; index++){
          if(cellDataKey == "prospect_name")
		  var v = this.state.data.recruit_card[index] == null ? '' : this.state.data.recruit_card[index].prospect_name == null ? '' : this.state.data.recruit_card[index].prospect_name;
		  else if(cellDataKey == "status_stage")
		  var v = this.state.data.recruit_card[index] == null ? '' : this.state.data.recruit_card[index].stage == null ? '' : this.state.data.recruit_card[index].stage;
          
		  
          v = v != null ? v : '';
          if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
            filteredList.push(this.state.data.recruit_card[index]);
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


	// getDataSummary(){

	// 	// // debugger;

	// 	this.state.param.page = '1';

	// 	$.ajax({
	// 		url: api_route.policy_summary,
	// 		headers: {
	// 			'Authorization':'JWT '+sessionStorage.getItem('token')
	// 		},
	// 		type: 'POST',
	// 		data: this.state.param,
	// 		success: (response) => {
	// 		$('#loading').modal('hide');

	// 			// // debugger;

	// 			var summary = response.content.summary || [];
	// 			// // debugger di listpolicies ajax
	// 			// // debugger;
	// 			this.setState({
	// 				summary: summary
	// 			});
	// 		},
	// 		error: (err, response) => {

	// 			$('#loading').modal('hide');
	// 			if(err.responseJSON){
	// 				alert('Session expired, please login');
	// 				window.location.href="/";
	// 				//window.location.href = window.location.href.split('#')[0] + '#/';
	// 			}else{
	// 				alert('Please check your connection');
	// 			}

	// 		}
	// 	});

	// 	$('.load-ape').show();

	// 	$.ajax({
	// 			url : api_route.branchList,
	// 			headers: {
	// 				'Authorization':'JWT '+sessionStorage.getItem('token')
	// 			},
	// 			type: 'GET',
	// 			data: [],
	// 			success: (response) => {
	// 				// // debugger;
	// 				$('.load-ape').hide();
	// 				this.setState({
	// 					branch_list : response.content
	// 				});
	// 			},
	// 			error: (err, response) => {
				
	// 			if(err.responseJSON){
	// 				alert('something happened, please contact administrator');
	// 				//window.location.href = window.location.href.split('#')[0] + '#/';
	// 			}

	// 			}
	// 		});

	// }

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
		var url_tab = (this.state.tab == 0) ? api_route.selling_card : api_route.recruit_card;
		$.ajax({
			url: url_tab,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			var num_data = ((this.state.tab == 0) ? response.selling_card : response.recruit_card) || [] ;
			var total_page = response.total_pages;
			// // debugger di listpolicies ajax
			
				this.setState({
					data: response,
					filterd_data: num_data,
					tab: this.state.tab,
					// total_data: response.total_policy,
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
		let data = this.state.filterd_data;
		let selling = this.state.selling;
		let recruit = this.state.recruit;
		console.log(this.state)
		let agent = [];
		// let listBranch = [];
		var data_info = "";
		
		// var branchRole = '';
		// if(localStorage.getItem('role')==102){
		// 	branchRole = 'form-group hidden';
		// } else {
		// 	branchRole = 'form-group';

		// }
		// debugger;

		// if(this.state.branch_list != null && this.state.branch_list.length > 0){
		// 	listBranch.push(
		// 		<option value="">All Branch</option>
		// 	);
		// 	this.state.branch_list.map(function(value, index){
		// 		listBranch.push(
		// 			<option value={value.origin_id}>{value.name}</option>
		// 		);
		// 	});
		// }
		let list_event = [];
		let event = null;
		if(this.state.data && this.state.data.activity_number){
		let activity = this.state.data && this.state.data.activity_number;
		for(var i = 0; i < activity.length; i++){
			event = {
						title: activity[i].number+' event',
						start: activity[i].activity_date,
						url : "#/sam_report/detail_calendar?date="+activity[i].activity_date+"&agent="+getAllUrlParams(window.location.href).agent
			}
			list_event.push(event);
		}
		console.log(list_event);
		$('#calendar').empty();
		$('#calendar').fullCalendar({
			themeSystem: 'bootstrap3',

			header: {
			left: 'title',
			right: 'today prev,next',
			},
			eventClick: function(event) {
				if (event.url) {
					window.location = event.url;
					return false;
				  }
			  },
			defaultDate: '2018-12-12',
			editable: false,
			
			eventLimit: true, // allow "more" link when too many events
			events: list_event
			});

			$(".fc-header-left").css('border', 'none');
			$(".fc-header-center").css('border', 'none');
			$(".fc-header-right").css({"border": "none", "vertical-align": "middle", "text-align" : "right"});
			
			$(".fc-button").css('padding', '10px');
		}
		if(data != null && data.length > 0)
		{
			data_info = "   Show "+data.length+" of "+this.state.total_data;
			$.map(data, (value, index) => {
	            
				let offs = this.state.param.offset;
				let page = (this.state.param.page != '') ? this.state.param.page : 1 ; 
				let num = (page - 1) * offs;



		// 		// let url = "#/newbusiness/policy_info/"+value.id;
					let row = null;
		// 			// let insured = "";
		// 			// $.map(value.lifeassured_set,(value,index) => {
		// 			// 	insured += value.person.name + "\n";
		// 			// })

		// 			// try{
		// 			// 	insured = value.lifeassured_set == null ? '' : value.lifeassured_set[0] == null ? '' : value.lifeassured_set[0].person == null ? '' : value.lifeassured_set[0].person.name;
		// 			// }catch(e){

		// 			// }

					num += (index+1);
					
					row = <tr key={index}>
								<td>{num}</td>
								<td><a href={this.state.tab == 0 ? "#/sam_report/sales_prospect?agent="+value.agent_code+"&id="+value.id+"&contact_id="+value.contact_id : "#/sam_report/recruit_prospect?agent="+value.agent_code+"&id="+value.id+"&contact_id="+value.contact_id}>{value.prospect_name}</a></td>
								<td>{value.stage == null ? '-' : value.stage}</td>
								{/*<td>{value.number}</td>
								{/* <td>{value.status}</td>
								<td>{value.policy_holder==null ? '' : value.policy_holder.name == null? '' : value.policy_holder.name}</td>
								<td>{insured}</td>
								<td>{DateFormat(value.effective_date)}</td>
								<td>{MoneyFormat(value.total_premium)}</td>
								<td>{value.payment_mode}</td> */}
								{/*<td>{value.payment_method}</td>*/}
								{/* <td>{value.agent == null ? '' : value.agent.full_name == null ? '' : value.agent.full_name}</td> */}
								{/*<td>{value.agent == null ? '' : value.agent.user.level.type}</td>*/}
								{/* <td>{value.agent!= null ? value.agent.user != null ? value.agent.user.level != null? value.agent.user.level.type != null? value.agent.user.level.type : ''  : '' : '' : ''}</td>
								<td>{value.agent == null ? '' : value.agent.status == null ? '' : value.agent.status}</td>
								<td>{value.agent == null ? '' : value.agent.branch == null? '' : value.agent.branch.name == null ? '' : value.agent.branch.name}</td>
								<td>{value.policy_status_date == null ? '' : DateFormat(value.policy_status_date)}</td> */} */}
							</tr>
					agent.push(row);

	          });

		} else {
			let row = <tr>
						<td colSpan="14" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            agent.push(row);

		}
		
		// let checked = this.state.param.display_group == "true" ? "checked" : "";


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
				{/* <div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>
						<ol className="breadcrumb" style={{marginBottom: '5px', marginTop:'55px'}}>
							<li className="active">Open Case Selling</li>
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
				</div> */}
				
				<div className="main twoColumnMain">

					<LeftMenuSam active="2" />

					<div className="main-content boxShadow">

						<div className="row">
							<div className="col-sm-12">
                            <div className="tab-mobile">
                            {/* {tablist_name} */}
                            <ul className="nav nav-tabs" role="tablist">
                                <li role="presentation" className="active"><a onClick={this.getTabCalendar.bind(this, 0)} href="#calendar_tab" aria-controls="calendar_tab" role="tab" data-toggle="tab">Calendar</a></li>
                                <li role="presentation"><a onClick={this.getTabSelling.bind(this, 0)} href="#sp_card" aria-controls="sp_card" role="tab" data-toggle="tab">Sales Prospect Card</a></li>
                                {/* <li role="presentation"><a onClick={this.getTabRecruit.bind(this, 0)} href="#rp_card" aria-controls="rp_card" role="tab" data-toggle="tab">Recruit Prospect Card</a></li> */}
                            </ul>
                            <div className="tab-content">
                                <div role="tabpanel" className="tab-pane active" id="calendar_tab">								
                                    <div className="main boxShadow" tyle={{height:'700px'}}>
                                        <ol className="breadcrumb" style={{marginBottom: '5px'}}>
                                            <li className="active">Calendar</li>
                                        </ol>
                                    </div>
                                    <div className="boxShadow">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="boxHeader">
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
																		{this.state.data && this.state.data.agent_data ? this.state.data.agent_data.amb_name : '-'}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="col-sm-6 bg-info">
                                                                        <label>RMB</label>
                                                                    </div>
                                                                    <div className="col-sm-6">
																		{this.state.data && this.state.data.agent_data ? this.state.data.agent_data.rmb_name : '-'}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="col-sm-6 bg-info">
                                                                        <label>TD</label>
                                                                    </div>
                                                                    <div className="col-sm-6">
																		{this.state.data && this.state.data.agent_data ? this.state.data.agent_data.rd_name : '-'}
                                                                    </div>
                                                                </div>											
                                                            </form>
                                                        </div>
                                                        <hr />
														
														<div id='calendar'></div>
														{/* <div class="container theme-showcase">
														<h1>Calendar</h1>
															<div id="holder" class="row" ></div>
														</div> */}
													</div>
                                                </div>	
                                            </div>
                                        </div>
                                    </div>
                                    
                                </div>
                                <div role="tabpanel" className="tab-pane" id="sp_card">
                                    <div className="main boxShadow" tyle={{height:'700px'}}>
                                        <ol className="breadcrumb" style={{marginBottom: '5px'}}>
                                            <li className="active">Sales Prospect Card</li>
                                        </ol>
                                    </div>
                                    <div className="boxShadow">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="boxHeader">
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
                                                        <hr />
                                                        <div className="col-sm-12">
                                                            <div className="col-sm-6">
                                                                <div className="form-horizontal">
                                                                    <div className="form-group">
                                                                        <div className="col-sm-6">
                                                                            <label>Prospect Name</label>
                                                                        </div>

                                                                        <div className="col-sm-6">
                                                                            <input type="text" className="form-control" id="prospect_name_selling" name="prospect_name" value={this.state.param.prospect_name} onChange={this.handleChangeData} />
                                                                        </div>
                                                                    </div>

                                                                    <div className="form-group">
                                                                        <div className="col-sm-6">
                                                                            <label>Stage</label>
                                                                        </div>

																		<div className="col-sm-6">
																			<select className="form-control" id="selling_stage" name="stage" onChange={this.handleChangeData} >
																				<option value="">All</option>
																				<option value="Approaching">Approaching</option>
																				<option value="Build Trust Meeting">Build Trust Meeting</option>
																				<option value="Discovery (M.O.N.E.Y & Agreement)">Discovery (M.O.N.E.Y & Agreement)</option>
																				<option value="Design & Presentation">Design & Presentation</option>
																				<option value="Ask for Commitmen">Ask for Commitmen</option>
																				<option value="Waiting For Payment">Waiting For Payment</option>
																				<option value="Case Submited">Case Submited</option>
																				<option value="Polis Issued">Polis Issued</option>
																				<option value="Policy Delivery">Policy Delivery</option>
																				<option value="Ask for Reference">Ask for Reference</option>
																			</select>
																		</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12">
                                                               <div className="clearfix h25"></div>
                                                                    <div className="col-sm-3 pull-left">
                                                                        <label style={{paddingTop:'20px', paddingBottom:'20px'}}>{data_info}</label>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.getData.bind(this, '0')}><i className="fa fa-search"></i> Search</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="clearfix h25"></div>
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
                                                                                    <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "prospect_name")}>Prospect Name</a> {this.sortIcon("prospect_name")}</th>
                                                                                    <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "status_stage")}>Stage</a> {this.sortIcon("status_stage")}</th>
                                                                                </tr>
                                                                                <tr key="header_list_policy_filter">
                                                                                    <th className="header_table"></th>
                                                                                    <th className="header_table"><input type="text" name="prospect_name" onChange={this._onFilterChangeSelling.bind(this, "prospect_name")} className="form-control" /></th>
                                                                                    <th className="header_table"><input type="text" name="status_stage" onChange={this._onFilterChangeSelling.bind(this, "status_stage")} className="form-control" /></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {agent}												
                                                                            </tbody>
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
                                                    </div>
                                                </div>	
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div role="tabpanel" className="tab-pane" id="rp_card">
                                    <div className="main boxShadow" tyle={{height:'700px'}}>
                                        <ol className="breadcrumb" style={{marginBottom: '5px'}}>
                                            <li className="active">Recruit Prospect Card</li>
                                        </ol>
                                    </div>
                                    <div className="boxShadow">
                                        <div className="row">
                                            <div className="col-sm-12">
                                                <div className="boxHeader">
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
																		{this.state.data && this.state.data.agent_data ? this.state.data.agent_data.amb_name : '-'}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="col-sm-6 bg-info">
                                                                        <label>RMB</label>
                                                                    </div>
                                                                    <div className="col-sm-6">
																		{this.state.data && this.state.data.agent_data ? this.state.data.agent_data.rmb_name : '-'}
                                                                    </div>
                                                                </div>
                                                                <div className="form-group">
                                                                    <div className="col-sm-6 bg-info">
                                                                        <label>TD</label>
                                                                    </div>
                                                                    <div className="col-sm-6">
																		{this.state.data && this.state.data.agent_data ? this.state.data.agent_data.rd_name : '-'}
                                                                    </div>
                                                                </div>											
                                                            </form>
                                                        </div>
                                                        <hr />
                                                        <div className="col-sm-12">
                                                            <div className="col-sm-6">
                                                                <div className="form-horizontal">
                                                                    <div className="form-group">
                                                                        <div className="col-sm-6">
                                                                            <label>Prospect Name</label>
                                                                        </div>
                                                                        <div className="col-sm-6">
                                                                            <input type="text" className="form-control" id="prospect_name_recruit" name="prospect_name" value={this.state.param.prospect_name} onChange={this.handleChangeData} />
                                                                        </div>
                                                                    </div>
                                                                    <div className="form-group">
                                                                        <div className="col-sm-6">
                                                                            <label>Stage</label>
                                                                        </div>
																		<div className="col-sm-6">
																			<select className="form-control" id="recruit_stage" name="stage" onChange={this.handleChangeData} >
																				<option value="">All</option>
																				<option value="Approaching">Approaching</option>
																				<option value="Build Trust">Build Trust</option>
																				<option value="3 Magic Question / TOD">3 Magic Question / TOD</option>
																				<option value="Initial Interview">Initial Interview</option>
																				<option value="Initial Assessment">Initial Assessment</option>
																				<option value="In-depth Interview">In-depth Interview</option>
																				<option value="Job Sampling / Reference Check / VIP Discussion">Job Sampling / Reference Check / VIP Discussion</option>
																				<option value="Register Form (RF) & Contract">Register Form (RF) & Contract</option>
																				<option value="Offering Letter (OL)">Offering Letter (OL)</option>
																				<option value="AAJI License">AAJI License</option>
																				<option value="Training Fast">Training Fast</option>
																			</select>
																		</div>
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div className="col-sm-12">
                                                                <div className="clearfix h25"></div>
                                                                    <div className="col-sm-3 pull-left">
                                                                        <label style={{paddingTop:'20px', paddingBottom:'20px'}}>{data_info}</label>
                                                                    </div>
                                                                    <div className="col-sm-3">
                                                                        <button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.getData.bind(this, '0')}><i className="fa fa-search"></i> Search</button>
                                                                    </div>
                                                                </div>
                                                            </div>

                                                            <div className="clearfix h25"></div>
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
                                                                                    <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "prospect_name")}>Prospect Name</a> {this.sortIcon("prospect_name")}</th>
                                                                                    <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "status_stage")}>Stage</a> {this.sortIcon("status_stage")}</th>
                                                                                </tr>
                                                                                <tr key="header_list_policy_filter">
                                                                                    <th className="header_table"></th>
                                                                                    <th className="header_table"><input type="text" name="prospect_name" onChange={this._onFilterChangeRecruit.bind(this, "prospect_name")} className="form-control" /></th>
                                                                                    <th className="header_table"><input type="text" name="status_stage" onChange={this._onFilterChangeRecruit.bind(this, "status_stage")} className="form-control" /></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody>
                                                                                {agent}												
                                                                            </tbody>
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
							<button type="button" className="btn btn-primary" onClick={this.getTabSelling.bind(this, '1')}>Yes</button>
						</div>
					</div>
				</div>
			</div>

				<Loading />
		    	<SubmitModal />
		    	<SpcModal data={this.state.selling_activity} />
		    	<RpcModal data={this.state.recruit_activity}/>
		    	<FeatureModal />
			</div>
			<div className="clearfix"></div>
			<Footer />

		</div>
		);
	}
}

export default detail_agent;