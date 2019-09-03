'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuSam from '../../common_components/menu_v2/left_menu_sam';
import Footer from '../../common_components/footer';

import { MoneyFormat, DateFormat, DateFormatYMDx } from '../../common_components/helper/formatter';
import Loading from '../../common_components/loading';
import { DatePicker } from '../../common_components/date_picker';
import Pager from 'react-pager';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import { getSideMenu } from '../../common_components/helper/user_session';
import { getMenu } from '../../common_components/helper/user_session';
import { MIME_TYPE } from '../../common_components/helper/constant';
var FileSaver = require('file-saver');

const SortType = {
	DESC: 'DESC',
	ASC: 'ASC'
}

class free_pa extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			list_agent: null,
			list_source: null,
			filterd_data: null,
			sort: SortType.DESC,
			activeSorting: '',
			param: {
				GroupType: "Personal",
				AgentCode: localStorage.getItem('agent_code'),
				AgentCodeInput: "",
				AgentCodeTextbox: "",
				EffectiveStartDate: "",
				EffectiveEndDate: "",
				Page: "1",
				Sort: [{
					Column: "", "Order": ""
				},
				]
			},
			param_agent_list: {
				agent_code: "",
				agent_name: "",
				agent_level: "",
				agent_status: "",
				page: "1",
				offset: "",
			},
			branch_list: null,
			total: 0,
			total_data: 0,
			current: 0,
			visiblePages: 3,
			mgtRole: [1, 2, 3, 4],
			dashboardRole: [1, 2, 3, 4, 5, 6, 7, 8, 9],
			dashboardMaps: {
				9: 'fc',
				8: 'sm',
				7: 'dm',
				6: 'rm',
				5: 'rd'
			}
		}

		this.getData = this.getData.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		// this.getDataSummary = this.getDataSummary.bind(this);
		this.itemSorting = this.itemSorting.bind(this);
		this._onFilterChange = this._onFilterChange.bind(this);
	}

	downloadFile(file) {

		let ext = "";
		let filename = "";
		if (file == 'pdf') {
			ext = ".pdf";
		} else {
			ext = ".xlsx";
		}

		$('#loading').modal('show');

		$.ajax({
			url: api_route.report_freepa_download,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			type: 'POST',
			dataType: "binary",
			data: JSON.stringify(this.state.param),
			// contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			success: (response) => {
				$('#loading').modal('hide');
				if (localStorage.getItem('role') == 1 || localStorage.getItem('role') == 3 || localStorage.getItem('role') == 4) {
					filename = (this.state.param.AgentCodeInput != "" ? this.state.param.AgentCodeInput : (this.state.param.AgentCodeTextbox != "") ? this.state.param.AgentCodeTextbox : localStorage.getItem('name'))
				} else {
					filename = localStorage.getItem('agent_code');
				}
				var blob = new Blob([response], { type: MIME_TYPE.XSLX + ";charset=utf-8" });
				FileSaver.saveAs(blob, "AMS Free PA Report_" + filename + ext);
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


	componentDidMount() {
		let groupType = null;
		// this.state.param.effective_date_start = "";
		// this.state.param.effective_date_end = "";
		// this.state.param.policy_status_start_date = "";
		// this.state.param.policy_status_end_date = "";
		this.state.param.Page = '1';
		if (localStorage.getItem('role') == 8 || localStorage.getItem('role') == 9 || localStorage.getItem('role') == 13 || localStorage.getItem('role') == 14 || localStorage.getItem('role') == 15 || localStorage.getItem('role') == 16) {
			groupType = { GroupType: "Personal" };
			this.state.param.GroupType = 'Personal'
		} else {
			groupType = { GroupType: "Group" };
			this.state.param.GroupType = 'Group'
		}

		$('#loading').modal('show');
		$.ajax({
			url: api_route.report_freepa,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			type: 'POST',
			dataType: "json",
			data: JSON.stringify(this.state.param),
			success: (response) => {
				console.log('bb');

				$('#loading').modal('hide');
				console.log(response);

				// // debugger di listpre_reg_spaj ajax

				this.setState({
					total_data: response.totalrow,
					total: Math.ceil(response.totalrow / response.offset),
				});
				console.log(this.state)
				$('#free-pa').html(response.result);
			},
			error: (err, response) => {

				$('#loading').modal('hide');
				if (err.responseJSON) {
					alert('Session expired, please login');
					window.location.href = "/";
					//window.location.href = window.location.href.split('#')[0] + '#/';
				} else {
					alert('Please check your connection');
				}

			}
		});
		$.ajax({
			url: api_route.ssrs_agent_name,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'GET',
			data: {},
			success: (response) => {
				$('#loading').modal('hide');
				this.setState({
					list_agent: response.ListAgentNameInput,
				});
			},
			error: (err, response) => {
				$('#loading').modal('hide');
				// alert('Session expired, please login');
				// window.location.href="/";
				if (err.responseJSON) {
					window.location.href = window.location.href.split('#')[0] + '#/';
				}

			}
		});


		// this.getData(e);
		// this.getDataSummary();

	}

	itemSorting(e, type) {
		console.log('masuk 1');
		e.preventDefault;
		var sort_data = this.state.filterd_data;
		var sort_type = (this.state.activeSorting == '') ? SortType.ASC : (this.state.activeSorting == e) ? (this.state.sort == SortType.ASC) ? SortType.DESC : SortType.ASC : SortType.ASC;
		var sort_data = (this.state.activeSorting == '') ? this._sorting(sort_data, e, SortType.ASC) :
			(this.state.activeSorting == e && this.state.sort == SortType.ASC) ? this._sorting(sort_data, e, SortType.DESC) :
				this._sorting(sort_data, e, SortType.ASC);
		this.setState({
			filterd_data: sort_data,
			activeSorting: e,
			sort: sort_type
		});
		console.log('masuk 2');
		debugger;
	}

	_sorting(data, content, type) {

		console.log('data');
		console.log(data);
		if (content == "policy_no") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					return a.number - b.number;
				});
			} else {
				data.sort(function (a, b) {
					return b.number - a.number;
				});
			}
		} else if (content == "product_name") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.product == null ? '' : a.product.name.toLowerCase();
					var y = b.product == null ? '' : b.product.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.product == null ? '' : b.product.name.toLowerCase();
					var y = a.product == null ? '' : a.product.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "policy_status") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.status.toLowerCase();
					var y = b.status.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.status.toLowerCase();
					var y = a.status.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "policy_holder") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.policy_holder == null ? '' : a.policy_holder.name == null ? '' : a.policy_holder.name.toLowerCase();
					var y = b.policy_holder == null ? '' : b.policy_holder.name == null ? '' : b.policy_holder.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.policy_holder == null ? '' : b.policy_holder.name == null ? '' : b.policy_holder.name.toLowerCase();
					var y = a.policy_holder == null ? '' : a.policy_holder.name == null ? '' : a.policy_holder.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "insured") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.lifeassured_set == null ? '' : a.lifeassured_set[0] == null ? '' : a.lifeassured_set[0].person == null ? '' : a.lifeassured_set[0].person.name == null ? '' : a.lifeassured_set[0].person.name.toLowerCase();
					var y = b.lifeassured_set == null ? '' : b.lifeassured_set[0] == null ? '' : b.lifeassured_set[0].person == null ? '' : b.lifeassured_set[0].person.name == null ? '' : b.lifeassured_set[0].person.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.lifeassured_set == null ? '' : b.lifeassured_set[0] == null ? '' : b.lifeassured_set[0].person == null ? '' : b.lifeassured_set[0].person.name == null ? '' : b.lifeassured_set[0].person.name.toLowerCase();
					var y = a.lifeassured_set == null ? '' : a.lifeassured_set[0] == null ? '' : a.lifeassured_set[0].person == null ? '' : a.lifeassured_set[0].person.name == null ? '' : a.lifeassured_set[0].person.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "effective_date") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.effective_date.toLowerCase();
					var y = b.effective_date.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.effective_date.toLowerCase();
					var y = a.effective_date.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "policy_status_date") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.policy_status_date.toLowerCase();
					var y = b.policy_status_date.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.policy_status_date.toLowerCase();
					var y = a.policy_status_date.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "premium") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					return a.total_premium - b.total_premium;
				});
			} else {
				data.sort(function (a, b) {
					return b.total_premium - a.total_premium;
				});
			}
		} else if (content == "payment_mode") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.payment_mode.toLowerCase();
					var y = b.payment_mode.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.payment_mode.toLowerCase();
					var y = a.payment_mode.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "agent_name") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.agent == null ? '' : a.agent.full_name == null ? '' : a.agent.full_name.toLowerCase();
					var y = b.agent == null ? '' : b.agent.full_name == null ? '' : b.agent.full_name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.agent == null ? '' : b.agent.full_name == null ? '' : b.agent.full_name.toLowerCase();
					var y = a.agent == null ? '' : a.agent.full_name == null ? '' : a.agent.full_name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "agent_level") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.agent == null ? '' : a.agent.user == null ? '' : a.agent.user.level == null ? '' : a.agent.user.level.type == null ? '' : a.agent.user.level.type.toLowerCase();
					var y = b.agent == null ? '' : b.agent.user == null ? '' : b.agent.user.level == null ? '' : b.agent.user.level.type == null ? '' : b.agent.user.level.type.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.agent == null ? '' : b.agent.user == null ? '' : b.agent.user.level == null ? '' : b.agent.user.level.type == null ? '' : b.agent.user.level.type.toLowerCase();
					var y = a.agent == null ? '' : a.agent.user == null ? '' : a.agent.user.level == null ? '' : a.agent.user.level.type == null ? '' : a.agent.user.level.type.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "agent_status") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.agent == null ? '' : a.agent.status == null ? '' : a.agent.status.toLowerCase();
					var y = b.agent == null ? '' : b.agent.status == null ? '' : b.agent.status.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.agent == null ? '' : b.agent.status == null ? '' : b.agent.status.toLowerCase();
					var y = a.agent == null ? '' : a.agent.status == null ? '' : a.agent.status.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "agent_branch") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.agent == null ? '' : a.agent.branch == null ? '' : a.agent.branch.name == null ? '' : a.agent.branch.name.toLowerCase();
					var y = b.agent == null ? '' : b.agent.branch == null ? '' : b.agent.branch.name == null ? '' : b.agent.branch.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.agent == null ? '' : b.agent.branch == null ? '' : b.agent.branch.name == null ? '' : b.agent.branch.name.toLowerCase();
					var y = a.agent == null ? '' : a.agent.branch == null ? '' : a.agent.branch.name == null ? '' : a.agent.branch.name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		}
		return data;
	}

	sortIcon(column) {

		if (column == this.state.activeSorting) {
			if (this.state.sort == SortType.ASC) {
				return (
					<i className="glyphicon glyphicon-chevron-down"></i>
				);
			} else {
				return (
					<i className="glyphicon glyphicon-chevron-up"></i>
				);
			}
		} else {
			return (
				<i></i>
			);
		}
	}


	_onFilterChange(cellDataKey, event) {
		// // debugger;

		if (!event.target.value) {
			this.setState({
				filterd_data: this.state.data.policy_list
			});
		}

		var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
		var size = this.state.data.policy_list.length;
		var filteredList = [];

		for (var index = 0; index < size; index++) {
			if (cellDataKey == "policy_no")
				var v = this.state.data.policy_list[index].number;
			else if (cellDataKey == "product_name")
				var v = this.state.data.policy_list[index].product == null ? '' : this.state.data.policy_list[index].product.name == null ? '' : this.state.data.policy_list[index].product.name;
			else if (cellDataKey == "policy_status")
				var v = this.state.data.policy_list[index].status;
			else if (cellDataKey == "policy_holder")
				var v = this.state.data.policy_list[index].policy_holder == null ? '' : this.state.data.policy_list[index].policy_holder == null ? '' : this.state.data.policy_list[index].policy_holder.name == null ? '' : this.state.data.policy_list[index].policy_holder.name;
			else if (cellDataKey == "insured")
				var v = this.state.data.policy_list[index].lifeassured_set == null ? '' : this.state.data.policy_list[index].lifeassured_set[0].person == null ? '' : this.state.data.policy_list[index].lifeassured_set[0].person.name == null ? '' : this.state.data.policy_list[index].lifeassured_set[0].person.name;
			else if (cellDataKey == "effective_date")
				var v = this.state.data.policy_list[index].effective_date;
			else if (cellDataKey == "premium")
				var v = this.state.data.policy_list[index].total_premium;
			else if (cellDataKey == "payment_mode")
				var v = this.state.data.policy_list[index].payment_mode;
			else if (cellDataKey == "agent_name")
				var v = this.state.data.policy_list[index].agent == null ? '' : this.state.data.policy_list[index].agent.full_name == null ? '' : this.state.data.policy_list[index].agent.full_name;
			else if (cellDataKey == "agent_level")
				var v = this.state.data.policy_list[index].agent == null ? '' : this.state.data.policy_list[index].agent.user == null ? '' : this.state.data.policy_list[index].agent.user.level == null ? '' : this.state.data.policy_list[index].agent.user.level.type == null ? '' : this.state.data.policy_list[index].agent.user.level.type;
			else if (cellDataKey == "agent_status")
				var v = this.state.data.policy_list[index].agent == null ? '' : this.state.data.policy_list[index].agent.status == null ? '' : this.state.data.policy_list[index].agent.status;
			else if (cellDataKey == "agent_branch")
				var v = this.state.data.policy_list[index].agent == null ? '' : this.state.data.policy_list[index].agent.branch == null ? '' : this.state.data.policy_list[index].agent.branch.name == null ? '' : this.state.data.policy_list[index].agent.branch.name;
			else if (cellDataKey == "policy_status_date")
				var v = this.state.data.policy_list[index].policy_status_date;

			v = v != null ? v : '';
			if (v.toString().toLowerCase().indexOf(filterBy) !== -1) {
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
			filterd_data: filteredList,
			total: total_page
		});
		debugger;
	}


	getData(param) {

		var c_elements = document.getElementsByName("Column");
		var o_elements = document.getElementsByName("Order");
		var sort = [];
		// var names = '';
		for (var i = 0; i < c_elements.length; i++) {
			if (c_elements[i].value != null && c_elements[i].value != '') {
				sort.push({ Column: c_elements[i].value, Order: o_elements[i].value });
			}
		}
		this.state.param.EffectiveStartDate = DateFormatYMDx(document.getElementById('EffectiveStartDate').value);
		this.state.param.EffectiveEndDate = DateFormatYMDx(document.getElementById('EffectiveEndDate').value);
		this.state.param.AgentCodeInput = document.getElementById('AgentCodeInput').value;
		this.state.param.AgentCodeTextbox = document.getElementById('AgentCodeTextbox').value;
		this.state.param.Sort = [];
		if (sort.length > 0) {
			this.state.param.Sort = sort;
		} else {
			this.state.param.Sort.push({
				Column: "",
				Order: ""
			})
		}
		// this.state.param.Sort = sort; 
		console.log(this.state.param);
		this.state.param.Page = '1';
		if (new Date(this.state.param.EffectiveStartDate) <= new Date(this.state.param.EffectiveEndDate)) {
			$('#loading').modal('show');

			this.state.param.EffectiveStartDate = (this.state.param.EffectiveStartDate == null) ? '' : this.state.param.EffectiveStartDate;
			this.state.param.EffectiveEndDate = (this.state.param.EffectiveEndDate == null) ? '' : this.state.param.EffectiveEndDate;

			$.ajax({
				url: api_route.report_freepa,
				headers: {
					'Authorization': 'JWT ' + sessionStorage.getItem('token'),
					'Content-Type': 'application/json',
					'Accept': 'application/json'
				},
				type: 'POST',
				dataType: "json",
				data: JSON.stringify(this.state.param),
				success: (response) => {

					$('#loading').modal('hide');
					if (response.success == false) {
						alert(response.error.message);
					} else {
						console.log('bb');
						console.log(response);

						// // debugger di listpre_reg_spaj ajax

						this.setState({
							total_data: response.totalrow,
							total: Math.ceil(response.totalrow / response.offset),
						});
						console.log(this.state)
						$('#free-pa').html(response.result);
					}
				},
				error: (err, response) => {

					$('#loading').modal('hide');
					if (err.responseJSON) {
						alert('Session expired, please login');
						window.location.href = "/";
						//window.location.href = window.location.href.split('#')[0] + '#/';
					} else {
						alert('Please check your connection');
					}

				}
			});
		} else {
			alert('Invalid Effective Date Selection');
		}
		// var agent_name = $('[name=agent_name]').val();
		// var agent_code = $('[name=agent_code]').val();
		// var level = $('[name=agent_level]').val();
		// var agent_status = $('[name=agent_status]').val();
		// var status = $('[name=status]').val();

		// debugger;

		// this.state.param.agent_name = agent_name;
		// this.state.param.agent_code = agent_code;
		// this.state.param.level = level;
		// this.state.param.agent_status = agent_status;
		// this.state.param.status = status;
		// this.state.param.page = '1';


	}
	handleChangeData(event) {
		let data_array = {};
		for (let i in this.state.param) {
			if (i == event.target.name) {
				if (event.target.name == 'display_group') {

					data_array[i] = event.target.value == 'false' ? 'true' : 'false'
				} else {
					data_array[i] = event.target.value
				}
			}
			else {
				data_array[i] = this.state.param[i]
			}
		}

		if (event.target.name == 'GroupType') {
			$.ajax({
				url: api_route.ssrs_source,
				headers: {
					'Authorization': 'JWT ' + sessionStorage.getItem('token')
				},
				type: 'GET',
				data: {
					GroupType: event.target.value,
				},
				success: (response) => {
					$('#loading').modal('hide');
					this.setState({
						list_source: response,
					});
				},
				error: (err, response) => {
					$('#loading').modal('hide');
					// alert('Session expired, please login');
					// window.location.href="/";
					if (err.responseJSON) {
						window.location.href = window.location.href.split('#')[0] + '#/';
					}

				}
			});
		}

		this.setState({
			param: data_array
		});
		// console.log(this.state.param_test)
	}

	handlePageChanged(newPage) {

		$('#loading').modal('show');
		// var c_elements = document.getElementsByName("Column");
		// var o_elements = document.getElementsByName("Order");
		// var sort = [];
		// var names = '';
		// for(var i=0; i<c_elements.length; i++) {
		// 		if(c_elements[i].value != null && c_elements[i].value != ''){
		// 			sort.push({Column:c_elements[i].value,Order:o_elements[i].value});
		// 		}
		// }
		// this.state.param.EffectiveStartDate = DateFormatYMDx(document.getElementById('EffectiveStartDate').value); 
		// this.state.param.EffectiveEndDate = DateFormatYMDx(document.getElementById('EffectiveEndDate').value); 

		// this.state.param.Sort = [];
		// if(sort.length > 0){
		// 	this.state.param.Sort = sort;
		// }else{
		// 	this.state.param.Sort.push({
		// 		Column: "prospect_name",
		// 		Order: "asc"
		// 	})
		// }
		console.log(this.state.param);
		this.state.param.Page = newPage;

		$.ajax({
			url: api_route.report_freepa,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token'),
				'Content-Type': 'application/json',
				'Accept': 'application/json'
			},
			type: 'POST',
			dataType: "json",
			data: JSON.stringify(this.state.param),
			success: (response) => {
				console.log('bb');
				console.log(response);

				$('#loading').modal('hide');
				// // debugger di listpre_reg_spaj ajax

				this.setState({
					total_data: response.totalrow,
					total: Math.ceil(response.totalrow / response.offset),
				});
				console.log(this.state)
				$('#free-pa').html(response.result);
			},
			error: (err, response) => {

				$('#loading').modal('hide');
				if (err.responseJSON) {
					alert('Session expired, please login');
					window.location.href = "/";
					//window.location.href = window.location.href.split('#')[0] + '#/';
				} else {
					alert('Please check your connection');
				}

			}
		});
	}


	logout(e) {
		e.preventDefault();
		localStorage.clear();
		var url = window.location.href.split("#");
		window.location.href = url[0];
	}

	render() {
		let data = this.state.data;
		let oc_selling = [];

		let active_agent_list = [];
		let source_list = [];
		console.log(data)
		// let listBranch = [];
		let data_info = "";

		// var branchRole = '';
		// if(localStorage.getItem('role')==102){
		// 	branchRole = 'form-group hidden';
		// } else {
		// 	branchRole = 'form-group';

		// }
		debugger;

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

		if (this.state.list_agent != null && this.state.list_agent.length > 0) {
			// listBranch.push(
			// 	<option value="">All Branch</option>
			// );
			active_agent_list.push(
				<option value="">All</option>
			);
			this.state.list_agent.map(function (value, index) {
				active_agent_list.push(
					<option value={value.AgentCodeInput} key={index}>{value.AgentNameInput}</option>
				);
			});
		}
		console.log(this.state.list_source)

		if (this.state.list_source != null && this.state.list_source.Source && this.state.list_source.Source.length > 0) {
			// listBranch.push(
			// 	<option value="">All Branch</option>
			// );
			source_list.push(
				<option value="">All</option>
			);
			this.state.list_source.Source.map(function (value, index) {
				source_list.push(
					<option value={value} key={index}>{value}</option>
				);
			});
		}

		if (this.state.total_data != null && this.state.total_data > 0) {
			data_info = "   Show " + this.state.total_data + " of " + this.state.total_data;
			// $.map(data, (value, index) => {

			// 	let offs = this.state.param.offset;
			// 	let page = this.state.param.page; 
			// 	let num = (page - 1) * offs;



			// 	// let url = "#/newbusiness/policy_info/"+value.id;
			// 		let row = null;
			// 		// let num = 0;
			// 		// let insured = "";
			// 		// $.map(value.lifeassured_set,(value,index) => {
			// 		// 	insured += value.person.name + "\n";
			// 		// })

			// 		// try{
			// 		// 	insured = value.lifeassured_set == null ? '' : value.lifeassured_set[0] == null ? '' : value.lifeassured_set[0].person == null ? '' : value.lifeassured_set[0].person.name;
			// 		// }catch(e){

			// 		// }

			// 		num += (index+1);

			// 		row = 
			// 		<tr key={index}>
			// 				<td>{num}</td>
			// 				<td>{value.agent_name == null ? '' : value.agent_name == null ? '' : value.agent_name}</td>
			// 				<td>{value.agent_code == null ? '' : value.agent_code == null ? '' : value.agent_code}</td>
			// 				<td>{value.level == null ? '' : value.level == null ? '' : value.level}</td>
			// 				<td>{value.agent_status == null ? '' : value.agent_status == null ? '' : value.agent_status}</td>
			// 				<td>{value.rmb_name == null ? '' : value.rmb_name == null ? '' : value.rmb_name}</td>
			// 				<td>{value.rd_name == null ? '' : value.rd_name == null ? '' : value.rd_name}</td>
			// 				<td>{value.ash_name == null ? '' : value.ash_name == null ? '' : value.ash_name}</td>
			// 				<td>{value.branch == null ? '' : value.branch == null ? '' : value.branch}</td>
			// 				<td>{value.prospect_name == null ? '' : value.prospect_name == null ? '' : value.prospect_name}</td>
			// 				<td>{value.approaching_date == null ? '' : value.approaching_date == null ? '' : DateFormatMMM(value.approaching_date)}</td>
			// 				<td>{value.build_trust_meeting_date == null ? '' : value.build_trust_meeting_date == null ? '' : DateFormatMMM(value.build_trust_meeting_date)}</td>
			// 				<td>{value.discovery_date == null ? '' : value.discovery_date == null ? '' : DateFormatMMM(value.discovery_date)}</td>
			// 				<td>{value.design_presentation_date == null ? '' : value.design_presentation_date == null ? '' : DateFormatMMM(value.design_presentation_date)}</td>
			// 				<td>{value.ask_for_commitment_date == null ? '' : value.ask_for_commitment_date == null ? '' : DateFormatMMM(value.ask_for_commitment_date)}</td>
			// 				<td>{value.waiting_payment_date == null ? '' : value.waiting_payment_date == null ? '' : DateFormatMMM(value.waiting_payment_date)}</td>
			// 				<td>{value.case_submit_date == null ? '' : value.case_submit_date == null ? '' : DateFormatMMM(value.case_submit_date)}</td>
			// 				<td>{value.policy_issued_date == null ? '' : value.policy_issued_date == null ? '' : DateFormatMMM(value.policy_issued_date)}</td>
			// 				<td>{value.policy_delivery_date == null ? '' : value.policy_delivery_date == null ? '' : DateFormatMMM(value.policy_delivery_date)}</td>
			// 				<td>{value.reference_date == null ? '' : value.reference_date == null ? '' : DateFormatMMM(value.reference_date)}</td>
			// 				<td>{value.ape == null ? '' : value.ape == null ? '' : 'Rp. '+MoneyFormat(value.ape)}</td>
			// 				<td>{value.status_case == null ? '' : value.status_case == null ? '' : value.status_case}</td>
			// 			</tr>
			// 		oc_selling.push(row);

			//       });

		} else {
			// let row = <tr>
			// 			<td colSpan="22" style={{'textAlign':'center'}}>No data.</td>
			// 		</tr>
			//       oc_selling.push(row);

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

		try {
			current = parseInt(this.state.param.Page);
		} catch (e) {
			current = 0;
		}

		try {
			total = parseInt(this.state.total);
		} catch (e) {
			total = 0;
		}

		let start = (current - 5) < 0 ? 0 : (current - 5);
		let end = (current + 5) > total ? total : (current + 5);


		if (total > 0) {
			if (current > 1) {
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
			for (var i = start; i < end; i++) {
				if (i == (current - 1)) {
					paging.push(
						<li className="active"><a onClick={this.handlePageChanged.bind(this, (i + 1))}>{(i + 1)}</a></li>
					);
				} else {
					paging.push(
						<li><a onClick={this.handlePageChanged.bind(this, (i + 1))}>{(i + 1)}</a></li>
					);
				}
			}
			if (current < total) {
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1))}>Next</a></li>
				);
				paging.push(
					<li><a onClick={this.handlePageChanged.bind(this, total)}>Last</a></li>
				);

			} else {

				paging.push(
					<li className="disabled"><a onClick={this.handlePageChanged.bind(this, (current + 1) > total ? total : (current + 1))}>Next</a></li>
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
							<div className="col-xs-10" style={{ paddingRight: 0 }}>
								<ol className="breadcrumb" style={{ marginBottom: '5px', marginTop: '55px' }}>
									<li className="active">Report Free PA</li>
								</ol>
							</div>
							<div className="col-xs-2" style={{ paddingLeft: 5 }}>
								<ol className="breadcrumb" onClick={this.openMenu} style={{ marginBottom: '5px', marginTop: '55px', cursor: 'pointer' }}>
									<li className="active">
										<span className="menuIconSidebar">
											<i className="fa fa-bars"></i>
										</span>
									</li>
								</ol>
							</div>
						</div>

						<div className="main twoColumnMain">

							<LeftMenuSam active="2" />

							<div className="main-content boxShadow">

								<div className="row">
									<div className="col-sm-12">

										<div className="col-sm-6">
											<div className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-5">
														<label>Group / Personal</label>
													</div>
													<div className="col-sm-7">
														{localStorage.getItem('role') == 1 || localStorage.getItem('role') == 3 || localStorage.getItem('role') == 4 || localStorage.getItem('role') == 8 || localStorage.getItem('role') == 9 || localStorage.getItem('role') == 13 || localStorage.getItem('role') == 14 || localStorage.getItem('role') == 15 || localStorage.getItem('role') == 16 ?
															(
																<select className="form-control" id="GroupType" name="GroupType" onChange={this.handleChangeData} disabled>
																</select>
															) : (
																<select className="form-control" id="GroupType" name="GroupType" onChange={this.handleChangeData} >
																	<option value="Group">Group</option>
																	<option value="Personal">Personal</option>
																</select>
															)
														}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-5">
														<label>Agent Name</label>
													</div>
													<div className="col-sm-7">
														{localStorage.getItem('role') == 8 || localStorage.getItem('role') == 9 || localStorage.getItem('role') == 13 || localStorage.getItem('role') == 14 || localStorage.getItem('role') == 15 || localStorage.getItem('role') == 16 || this.state.param.GroupType == 'Personal' ?
															(
																<select className="form-control" id="AgentCodeInput" name="AgentCodeInput" onChange={this.handleChangeData} disabled>
																	<option value="" selected></option>
																</select>
															) : (
																<select className="form-control" id="AgentCodeInput" name="AgentCodeInput" onChange={this.handleChangeData}>
																	{active_agent_list}
																</select>
															)
														}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-5">
														<label>Agent Code</label>
													</div>
													<div className="col-sm-7">
														{localStorage.getItem('role') == 8 || localStorage.getItem('role') == 9 || localStorage.getItem('role') == 13 || localStorage.getItem('role') == 14 || localStorage.getItem('role') == 15 || localStorage.getItem('role') == 16 || this.state.param.GroupType == 'Personal' ?
															(
																<input type="text" className="form-control" id="AgentCodeTextbox" name="AgentCodeTextbox" onChange={this.handleChangeData} value="" disabled />
															) : (
																<input type="text" className="form-control" id="AgentCodeTextbox" name="AgentCodeTextbox" onChange={this.handleChangeData} />
															)
														}
													</div>
												</div>
												<div className="form-group">
													<div className="col-sm-5">
														<label>Effective Date</label>
													</div>
													<div className="col-sm-3">
														<DatePicker className="form-control c" id="EffectiveStartDate" name="EffectiveStartDate" onChange={this.handleChangeData} />
													</div>
													<div className="col-sm-1"> to
											</div>
													<div className="col-sm-3">
														<DatePicker className="form-control" id="EffectiveEndDate" name="EffectiveEndDate" onChange={this.handleChangeData} />
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-3">
														<label>Sort By</label>
													</div>
													<div className="col-sm-4">
														<select className="form-control" id="column_1" name="Column" >
															<option value="">-</option>
															<option value="PROSPECT_NAME">Prospect Name</option>
															<option value="GENDER">Gender</option>
															<option value="EFFECTIVE_DATE">Effective Date</option>
															<option value="MATURITY_DATE">Maturity Date</option>
															<option value="AGENT_NAME">Agent Name</option>
															<option value="AGENT_CODE">Agent Code</option>
															<option value="RD_NAME">RD Name</option>
															<option value="BRANCH">Branch</option>
															<option value="ASH_NAME">ASH Name</option>
														</select>
													</div>
													<div className="col-sm-1">
													</div>
													<div className="col-sm-4">
														<select className="form-control" id="order_1" name="Order">
															<option value="">-</option>
															<option value="asc">Ascending</option>
															<option value="desc">Descending</option>
														</select>
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-3">
														<label>Sort By</label>
													</div>
													<div className="col-sm-4">
														<select className="form-control" id="column_1" name="Column" >
															<option value="">-</option>
															<option value="PROSPECT_NAME">Prospect Name</option>
															<option value="GENDER">Gender</option>
															<option value="EFFECTIVE_DATE">Effective Date</option>
															<option value="MATURITY_DATE">Maturity Date</option>
															<option value="AGENT_NAME">Agent Name</option>
															<option value="AGENT_CODE">Agent Code</option>
															<option value="RD_NAME">RD Name</option>
															<option value="BRANCH">Branch</option>
															<option value="ASH_NAME">ASH Name</option>
														</select>
													</div>
													<div className="col-sm-1">
													</div>
													<div className="col-sm-4">
														<select className="form-control" id="order_1" name="Order">
															<option value="">-</option>
															<option value="asc">Ascending</option>
															<option value="desc">Descending</option>
														</select>
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-3">
														<label>Sort By</label>
													</div>
													<div className="col-sm-4">
														<select className="form-control" id="column_1" name="Column" >
															<option value="">-</option>
															<option value="PROSPECT_NAME">Prospect Name</option>
															<option value="GENDER">Gender</option>
															<option value="EFFECTIVE_DATE">Effective Date</option>
															<option value="MATURITY_DATE">Maturity Date</option>
															<option value="AGENT_NAME">Agent Name</option>
															<option value="AGENT_CODE">Agent Code</option>
															<option value="RD_NAME">RD Name</option>
															<option value="BRANCH">Branch</option>
															<option value="ASH_NAME">ASH Name</option>
														</select>
													</div>
													<div className="col-sm-1">
													</div>
													<div className="col-sm-4">
														<select className="form-control" id="order_1" name="Order">
															<option value="">-</option>
															<option value="asc">Ascending</option>
															<option value="desc">Descending</option>
														</select>
													</div>
												</div>

												<div className="form-group">
													<div className="col-sm-3">
														<label>Sort By</label>
													</div>
													<div className="col-sm-4">
														<select className="form-control" id="column_1" name="Column" >
															<option value="">-</option>
															<option value="PROSPECT_NAME">Prospect Name</option>
															<option value="GENDER">Gender</option>
															<option value="EFFECTIVE_DATE">Effective Date</option>
															<option value="MATURITY_DATE">Maturity Date</option>
															<option value="AGENT_NAME">Agent Name</option>
															<option value="AGENT_CODE">Agent Code</option>
															<option value="RD_NAME">RD Name</option>
															<option value="BRANCH">Branch</option>
															<option value="ASH_NAME">ASH Name</option>
														</select>
													</div>
													<div className="col-sm-1">
													</div>
													<div className="col-sm-4">
														<select className="form-control" id="order_1" name="Order">
															<option value="">-</option>
															<option value="asc">Ascending</option>
															<option value="desc">Descending</option>
														</select>
													</div>
												</div>

											</div>
										</div>
									</div>

									<div className="col-sm-12">
										<div className="clearfix h25"></div>
										<div className="col-sm-3 pull-left">
											<label style={{ paddingTop: '20px', paddingBottom: '20px' }}>{data_info}</label>
											{/* 2 of 2 */}
										</div>
										<div className="col-sm-3">
											<button className="btn btn-primary btn-block btn-lg" type="button" onClick={this.getData.bind(this, '0')}><i className="fa fa-search"></i> Search</button>
										</div>
									</div>
								</div>

								<div className="clearfix h25"></div>

								<hr />

								<div className="row">
									<div className="col-sm-12">
										<div className="scroll-h" style={{ 'overflow-x': 'auto' }}>
											<div className="col-sm-12" style={{ verticalAlign: 'middle' }}>
												<div className="col-sm-12">
													<nav aria-label="Page navigation">
														<ul className="pagination">
															{paging}
														</ul>
													</nav>
												</div>
											</div>
											<div className="col-sm-12" id="free-pa">
											</div>
											<div>
												<nav aria-label="Page navigation">
													<ul className="pagination">
														{paging}
													</ul>
												</nav>
											</div>
											<button style={{ marginRight: '10px' }} className="btn btn-primary" onClick={() => this.downloadFile('excel')}>Export as XLSX</button>
										</div>
									</div>
								</div>
								<div className="row">
									<div className="col-sm-12" id="test_html">
									</div>
								</div>
								<div className="clearfix"></div>
							</div>

							<div className="clearfix"></div>
						</div>
					</div>

					<div className="modal fade" id="message" tabIndex="-1" role="dialog" aria-labelledby="modalMessage" aria-hidden="true">
						<div className="modal-dialog">
							<div className="modal-content" style={{ "padding": "0px !important" }}>
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

export default free_pa;
