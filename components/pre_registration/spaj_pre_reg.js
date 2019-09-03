'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuPreReg from '../../common_components/menu_v2/left_menu_pre_reg';
import Footer from '../../common_components/footer';

import { MoneyFormat, DateFormat, DateFormatMMM } from '../../common_components/helper/formatter';
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

class spaj_pre_reg extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			bank_staff_list:null,
			pre_reg: null,
			payment_freq: null,
			payment_method: null,
			pre_reg_doc:null,
			spaj:null,
			pre_reg_log:null,
			filterd_data: null,
			sort: SortType.DESC,
			activeSorting: '',
			param: {
				create : {
						spaj : {
							id: null,
							spaj_no: null,
							owner_name: null,
							insured_name: null,
							payor_name: null,
							email: "",
							hp: "",
							payment_freq: null,
							payment_method: "",
							cif: null,
							agent_id: localStorage.getItem("agent_id"),
							bank_staff_id: null,
							reg_premi: null,
							reg_top_up: null,
							single_topup: null,
							bank_account: null,
							product: null,
							createduser: localStorage.getItem("agent_code"),
							channel_distribution: "Agency",
							status : null
					},
					message: "MAKER SUBMITTED-NEW",
					doc : [
							{
								file_code: 1,
								status_doc: "INCOMPLETE"
							},
							{
								file_code: 2,
								status_doc: "INCOMPLETE"
							},
							{
								file_code: 3,
								status_doc: "INCOMPLETE"
							},
							{
								file_code: 4,
								status_doc: "INCOMPLETE"
							},
							{
								file_code: 5,
								status_doc: "INCOMPLETE"
							},
							{
								file_code: 6,
								status_doc: "INCOMPLETE"
							}
					]
				}
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
		this.setBankStaff = this.setBankStaff.bind(this);
		this.getAgentDetail = this.getAgentDetail.bind(this);
		this.getPaymentFreq = this.getPaymentFreq.bind(this);
		this.getPaymentMethod = this.getPaymentMethod.bind(this);
		this.getPreRegDoc = this.getPreRegDoc.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		this.getDataSummary = this.getDataSummary.bind(this);
		this.itemSorting = this.itemSorting.bind(this);
		this._onFilterChange = this._onFilterChange.bind(this);
		this.setDocModal = this.setDocModal.bind(this);
		this.updateDoc = this.updateDoc.bind(this);
	}

	componentDidMount() {
		// $("#siteID").select2();
		if(this.props.params.pre_reg_id){
			this.getData(this.props.params.pre_reg_id);
			this.getPaymentMethod();
			this.getPaymentFreq();
		}else{
			// this.getDataSummary();
			document.getElementById("pre_registration_date").value =  DateFormat(Date());
			this.getPaymentFreq();
			this.getPreRegDoc();
			this.getPaymentMethod();
			this.getAgentDetail();
		}
	}

	setDocModal(el) {
		console.log(el.target);
		var id = el.target.dataset.id;
		var doc_id = el.target.dataset.doc;
		var status = el.target.dataset.status;
		var name = el.target.dataset.name;

		if(id){
			// this.state.spaj.bank_staff.agent_name = document.getElementById(id).dataset.name;
			document.getElementById("doc_name_m").value = name;
			document.getElementById("doc_status_m").value= status;
			
		document.getElementById("update_doc_button").dataset.id = el.target.dataset.id;
		document.getElementById("update_doc_button").dataset.doc = el.target.dataset.doc;
		document.getElementById("update_doc_button").dataset.status = el.target.dataset.status;
		document.getElementById("update_doc_button").dataset.user = el.target.dataset.user;

			return true;
		}
	}

	setBankStaff() {
		var id = document.getElementById("bank_staff_code").value;

		if(document.getElementById(id).dataset){
			console.log(document.getElementById(id).dataset.name);
			// this.state.spaj.bank_staff.agent_name = document.getElementById(id).dataset.name;
			document.getElementById("bank_staff_name").value = document.getElementById(id).dataset.name;
			document.getElementById("bank_staff_name").dataset.id = document.getElementById(id).dataset.id;
		}
	}
	payorAsHolder() {
		var holder = document.getElementById("owner_name").value;
		document.getElementById("payor_name").value = holder;
		if(document.getElementById("checkbox-payor").checked == true){
			document.getElementById("payor_name").disabled = true;
		}else{
			document.getElementById("payor_name").disabled = false;
		}
	}
	insuredAsHolder() {
		var holder = document.getElementById("owner_name").value;
		document.getElementById("insured_name").value = holder;
		if(document.getElementById("checkbox-insured").checked == true){
			document.getElementById("insured_name").disabled = true;
		}else{
			document.getElementById("insured_name").disabled = false;

		}
	}
	createSpaj(status) {
		$('.load-ape').show();
		
		if(this.state.param && this.state.param.create && this.state.param.create.spaj){
			this.state.param.create.spaj.spaj_no = document.getElementById("spaj_no").value;
			this.state.param.create.spaj.agent_id = document.getElementById("agent_code").dataset.id;
			this.state.param.create.spaj.owner_name = document.getElementById("owner_name").value;
			this.state.param.create.spaj.insured_name = document.getElementById("insured_name").value;
			this.state.param.create.spaj.payor_name = document.getElementById("payor_name").value;
			this.state.param.create.spaj.email = document.getElementById("email").value;
			this.state.param.create.spaj.hp = document.getElementById("hp").value;
			this.state.param.create.spaj.payment_freq = document.getElementById("payment_freq").value;
			this.state.param.create.spaj.payment_method = document.getElementById("payment_method").value;
			this.state.param.create.spaj.bank_staff_id = document.getElementById("bank_staff_name").dataset.id;
			this.state.param.create.spaj.status = status;	
		}
		if(this.props.params.pre_reg_id){
			if(this.state.param && this.state.param.create && this.state.param.create.spaj){
				this.state.param.create.spaj.id = this.props.params.pre_reg_id;
			}
			console.log(this.state.param.create);
			$.ajax({
				url: api_route.pre_reg_spaj_update,
				headers: {
					'Authorization': 'JWT ' + sessionStorage.getItem('token'),
					'Content-Type':'application/json',
					'Accept':'application/json'
				},
				type: 'POST',
				dataType: "json",
				data: JSON.stringify(this.state.param.create),
				success: (response) => {
					// // debugger;
					$('.load-ape').hide();
					alert(response.detail);
					window.location.href = window.location.href.split('#')[0] + '#/pre_reg_list';
				},
				error: function(jqXHR) {
					alert(JSON.parse(jqXHR.responseText).detail);
				  }
				// error: (err, response) => {
				// 	alert("Error with response: "+response.detail+ " "+err.detail);
				// 	if (response == undefined || response == "error" || response == "parsererror") {

                //         alert("Error with response: "+response.detail+ " "+err.detail);
                //     } else if (response != 'success'){
                //         alert("Error with response: "+response.detail+ " "+err.detail);
           		// 	}
				// 	if (err.responseJSON) {
				// 		alert('something happened, please contact administrator');
				// 		window.location.href = window.location.href.split('#')[0] + '#/';
				// 	}
				// 	alert("Error with response: "+response.detail+ " "+err.detail);

	
				// }
			});
		}else{
			$.ajax({
				url: api_route.pre_reg_spaj_create,
				headers: {
					'Authorization': 'JWT ' + sessionStorage.getItem('token'),
					'Content-Type':'application/json',
					'Accept':'application/json'
				},
				type: 'POST',
				dataType: "json",
				data: JSON.stringify(this.state.param.create),
				success: (response) => {
					// // debugger;
					$('.load-ape').hide();
					alert(response.detail);
					window.location.href = window.location.href.split('#')[0] + '#/pre_reg_list';
				},
				error: function(jqXHR) {
					alert(JSON.parse(jqXHR.responseText).detail);
				  }
				// error: (err, response) => {
				// 	alert("Error with response: "+response.detail+ " "+err.detail);
				// 	if (response == undefined || response == "error" || response == "parsererror") {

                //         alert("Error with response: "+response.detail+ " "+err.detail);
                //     } else if (response != 'success'){
                //         alert("Error with response: "+response.detail+ " "+err.detail);
           		// 	}
				// 	if (err.responseJSON) {
				// 		alert('something happened, please contact administrator');
				// 		window.location.href = window.location.href.split('#')[0] + '#/';
				// 	}
				// 	alert("Error with response: "+response.detail+ " "+err.detail);

				// }
			});
		}

	}
	getSuggest(e) {

		$('.load-ape').show();
		console.log(document.getElementById("bank_staff_code").value);
		var key = document.getElementById("bank_staff_code").value;
		if(this.props.params.pre_reg_id){
			this.state.spaj.bank_staff.agent_code = document.getElementById("bank_staff_code").value;
		}
		$.ajax({
			url: api_route.pre_reg__agent_filter,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'POST',
			data: {
				key : key,
				bank_staff : localStorage.getItem('role') == '999' ? false : true,
				page : 1,
				offset : 10,
			}
				,
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				console.log(response);
				this.setState({
					bank_staff_list: response.agent
				});

			},
			error: (err, response) => {

				if (err.responseJSON) {
					alert('something happened, please contact administrator');
					window.location.href = window.location.href.split('#')[0] + '#/';
				}

			}
		});

	}

	updateDoc(el) {

		$('.load-ape').show();
		var key = document.getElementById("bank_staff_code").value;
		var doc = this.state.pre_reg_doc;
		var id = document.getElementById("update_doc_button").dataset.id;
		var doc_id = document.getElementById("update_doc_button").dataset.doc;
		var doc_status = document.getElementById("update_doc_button").dataset.status;
		var doc_user = document.getElementById("update_doc_button").dataset.user;
		var doc_notes = document.getElementById("doc_note_m").value;
		var pre_reg = this.props.params.pre_reg_id;
		var param = {
			doc :{
				id: parseInt(id),
				pre_reg: parseInt(pre_reg),
				file_code: parseInt(doc_id),
				createduser: doc_user,
				notes: doc_notes,
				status_doc : doc_status,
				flag : "update"
			}
		};
		$.ajax({
			url: api_route.pre_reg_doc_info,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token'),
				'Content-Type':'application/json',
				'Accept':'application/json'
			},
			type: 'POST',
			data: JSON.stringify(param),
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				alert(response.detail)

			},
			error: function(jqXHR) {
				alert(JSON.parse(jqXHR.responseText).detail);
			}
		});

	}
	getPaymentMethod() {

		$('.load-ape').show();

		$.ajax({
			url: api_route.pre_reg_paymethod,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'GET',
			data: [],
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				this.setState({
					payment_method: response
				});
			},
			error: (err, response) => {

				if (err.responseJSON) {
					alert('something happened, please contact administrator');
					//window.location.href = window.location.href.split('#')[0] + '#/';
				}

			}
		});

	}
	getPreRegDoc() {

		$('.load-ape').show();
		var doc_type = "";
		if(this.state.pre_reg == null || this.state.pre_reg == ''){
			doc_type = 'mandatory';
		}

		$.ajax({
			url: api_route.pre_reg_doc+doc_type,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'GET',
			data: [],
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				this.setState({
					pre_reg_doc: response
				});
			},
			error: (err, response) => {

				if (err.responseJSON) {
					alert('something happened, please contact administrator');
					window.location.href = window.location.href.split('#')[0] + '#/';
				}

			}
		});

	}

	getPaymentFreq() {

		$('.load-ape').show();

		$.ajax({
			url: api_route.pre_reg_payfreq,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'GET',
			data: [],
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				this.setState({
					payment_freq: response
				});
			},
			error: (err, response) => {

				if (err.responseJSON) {
					alert('something happened, please contact administrator');
					window.location.href = window.location.href.split('#')[0] + '#/';
				}

			}
		});

	}

	getAgentDetail() {

		$('.load-ape').show();

		$.ajax({
			url: api_route.pre_reg_agent_detail+"/"+localStorage.getItem('agent_code'),
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'GET',
			data: [],
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				console.log(response);
				console.log('detail');
				this.setState({
					agent_detail: response,

				});
				if(this.state.agent_detail.distribution_channel != 'Bancassurance'){
					document.getElementById('bank_staff_code').disabled = true;
				} else {
					document.getElementById('bank_staff_code').disabled = false;

				}
			},
			error: (err, response) => {

				if (err.responseJSON) {
					alert('something happened, please contact administrator');
					window.location.href = window.location.href.split('#')[0] + '#/';
				}

			}
		});

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


	downloadRecruit(file) {

		this.state.param.export = file;
		let ext = "";
		if (file == 'pdf') {
			ext = ".pdf";
		} else {
			ext = ".xlsx";
		}

		$('#loading').modal('show');

		$.ajax({
			url: api_route.open_case_recruit,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			dataType: 'binary',
			// contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
			success: (response) => {
				$('#loading').modal('hide');
				var blob = new Blob([response], { type: MIME_TYPE.XSLX + ";charset=utf-8" });
				FileSaver.saveAs(blob, "Open Case Recruit" + localStorage.agent_code + ext);
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


	getDataSummary() {

		// // debugger;

		this.state.param.page = '1';

		$.ajax({
			url: api_route.policy_summary,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
				$('#loading').modal('hide');

				// // debugger;

				var summary = response.content.summary || [];
				// // debugger di listoc_recruit ajax
				// // debugger;
				this.setState({
					summary: summary
				});
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

		$('.load-ape').show();

		$.ajax({
			url: api_route.branchList,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'GET',
			data: [],
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				this.setState({
					branch_list: response.content
				});
			},
			error: (err, response) => {

				if (err.responseJSON) {
					alert('something happened, please contact administrator');
					//window.location.href = window.location.href.split('#')[0] + '#/';
				}

			}
		});

	}

	getData(pre_reg_id) {
		$('#loading').modal('show');
		$('.load-ape').show();
		$.ajax({
			url: api_route.pre_reg_spaj_detail+pre_reg_id,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'GET',
			data: this.state.param,
			success: (response) => {
				$('#loading').modal('hide');
				this.setState({
					spaj : response.spaj,
					agent_detail : response.spaj.agent,
					pre_reg_doc : response.doc,
					pre_reg_log : response.log,
				
				});
				
				this.state.param.create.spaj.cif = response.spaj.cif,
				this.state.param.create.spaj.reg_premi = response.spaj.reg_premi,
				this.state.param.create.spaj.reg_topup = response.spaj.reg_topup,
				this.state.param.create.spaj.single_topup = response.spaj.single_topup,
				this.state.param.create.spaj.bank_account = response.spaj.bank_account,
				this.state.param.create.spaj.product = response.spaj.product,
				document.getElementById("pre_registration_date").value =  DateFormat(this.state.spaj.pre_reg_date);
				document.getElementById("spaj_no").value = this.state.spaj.spaj_no;
				document.getElementById("owner_name").value = this.state.spaj.owner_name;
				document.getElementById("payor_name").value = this.state.spaj.payor_name;
				document.getElementById("insured_name").value = this.state.spaj.insured_name;
				document.getElementById("email").value = this.state.spaj.email;
				document.getElementById("hp").value = this.state.spaj.hp;
				document.getElementById("bank_staff_name").value = this.state.spaj.bank_staff.agent_name;
				console.log(this.state);
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
		this.setState({
			param: data_array
		});
	}

	handlePageChanged(newPage) {

		this.state.param.page = newPage;
		$('#loading').modal('show');
		// // debugger;
		$.ajax({
			url: api_route.open_case_recruit,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
				$('#loading').modal('hide');
				var num_data = response.open_recruit || [];
				var total_page = response.total_pages;
				// // debugger di listoc_recruit ajax

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
				if (err.responseJSON) {
					window.location.href = window.location.href.split('#')[0] + '#/';
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
		let data = this.state.filterd_data;
		console.log(data);
		let spaj = this.state.spaj;
		let oc_recruit = [];
		let payment_freq = [];
		let payment_method = [];
		let doc_list = [];
		let bank_staff_option = [];
		let doc_type = "";
		let log = [];
		// let listBranch = [];
		var data_info = "";

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
		if(this.state.pre_reg == null || this.state.pre_reg == ''){
			doc_type = 'MANDATORY';
		}

		if(this.state.payment_freq != null && this.state.payment_freq.length > 0){
			// listBranch.push(
			// 	<option value="">All Branch</option>
			// );
			this.state.payment_freq.map(function(value, index){
				if(spaj && spaj.payment_freq == value.id){
					payment_freq.push(
						<option value={value.id} selected>{value.name}</option>
					);
				}else{
					payment_freq.push(
						<option value={value.id}>{value.name}</option>
					);
				}
			});
		}
		
		if(this.state.bank_staff_list != null && this.state.bank_staff_list.length > 0){
			// listBranch.push(
			// 	<option value="">All Branch</option>
			// );
			this.state.bank_staff_list.map(function(value, index){
				bank_staff_option.push(
					<option value={value.agent_code} id={value.agent_code} data-id={value.id} data-name={value.agent_name}>{value.agent_name} ({value.status_terminate}) </option>

				);
			});
		}
		
		if(this.state.payment_method != null && this.state.payment_method.length > 0){
			// listBranch.push(
			// 	<option value="">All Branch</option>
			// );
			this.state.payment_method.map(function(value, index){
				
				if(spaj && spaj.payment_method == value.pay_method_code){
					payment_method.push(
						<option value={value.pay_method_code} selected>{value.pay_method_desc}</option>
					);
				}else{
					payment_method.push(
						<option value={value.pay_method_code}>{value.pay_method_desc}</option>
					);
				}
			});
		}

		if(this.state.pre_reg_log != null && this.state.pre_reg_log.length > 0){
			// listBranch.push(
			// 	<option value="">All Branch</option>
			// );
			this.state.pre_reg_log.map(function(value, index){
				log.push(
					<label>{value.datetime}: {value.message}.</label>
				);
			});
		}
		
		if (this.state.pre_reg_doc != null && this.state.pre_reg_doc.length > 0) {
			
			if(this.props.params.pre_reg_id){
				$.map(this.state.pre_reg_doc, (value, index) => {
					let num_doc = 0;
					let row = null;
					num_doc += (index + 1);
					row =
						<tr key={index}>
							<td>{num_doc}</td>
							<td>{value.file_detail.doc_name == null ? '' : value.file_detail.doc_name == null ? '' : value.file_detail.doc_name}</td>
							<td>{value.file_detail.doc_type == null ? '' : value.file_detail.doc_type == null ? '' : value.file_detail.doc_type}</td>
							<td>{value.status_doc == null ? '' : value.status_doc == null ? '' : value.status_doc}</td>
							<td>{value.notes == null ? '' : value.notes == null ? '' : value.notes}</td>
							<td>{value.status_doc == 'INCOMPLETE' ? <button type="button"  className="btn btn-primary" id={'buton_doc_modal'+value.id}  data-id={value.id} data-name={value.file_detail.doc_name} data-user={value.createduser} data-status={value.status_doc} data-doc={value.file_detail.id} data-status={value.status_doc} data-toggle="modal" data-target="#doc-modal" onClick={this.setDocModal.bind(this)}>Edit</button> : ''}</td>
						</tr>
					doc_list.push(row);
	
				});
			}else{
				$.map(this.state.pre_reg_doc, (value, index) => {
					let num_doc = 0;
					let row = null;
					num_doc += (index + 1);
					row =
						<tr key={index}>
							<td>{num_doc}</td>
							<td>{value.doc_name == null ? '' : value.doc_name == null ? '' : value.doc_name}</td>
							<td>{value.doc_type == null ? '' : value.doc_type == null ? '' : value.doc_type}</td>
							<td>{value.doc_status == null ? '' : value.doc_status == null ? '' : value.doc_status}</td>
							<td>{value.doc_notes == null ? '' : value.doc_notes == null ? '' : value.doc_notes}</td>
							<td>{value.status_doc == 'INCOMPLETE' ? <button type="button"  className="btn btn-primary" id="buton_doc_modal"  data-id={value.id} data-name={value.file_detail.doc_name} data-status={value.status_doc} data-toggle="modal" data-target="#doc-modal" onClick={this.setDocModal}>Edit</button> : ''}</td>
						</tr>
					doc_list.push(row);
				});
			}
			

		} else {
			let row = <tr>
				<td colSpan="6" style={{ 'textAlign': 'center' }}>No data.</td>
			</tr>
			doc_list.push(row);

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
			current = parseInt(this.state.param.page);
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

		let save_button = "";
		let submit_button = "";
        if(localStorage.getItem('role') == 5 || localStorage.getItem('role') == 6 || localStorage.getItem('role') == 7 || localStorage.getItem('role') == 9){
			
			save_button = <button type="button" className="btn btn-primary" onClick={this.createSpaj.bind(this, '1')} style={{marginRight:"15px"}}>Save</button>
			submit_button = <button type="button" className="btn btn-primary" onClick={this.createSpaj.bind(this, '2')} >Submit</button>											
			if(this.props.params.pre_reg_id && this.state.spaj && (this.state.spaj.status != 1 && this.state.spaj.status != 3 && this.state.spaj.status != 4)){
				save_button = "";
				submit_button = "";
			}
			
		}


		let menu = getMenu('SPAJ Pre Registration', 'fa fa-bar-chart');
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
									<li className="active">SPAJ Pre Registration</li>
								</ol>
							</div>
							<div className="col-xs-2" style={{ paddingLeft: 5 }}>
								<ol className="breadcrumb" style={{ marginBottom: '5px', marginTop: '55px', cursor: 'pointer' }}>
									<li className="active">
										<span className="menuIconSidebar">
											<i className="fa fa-bars"></i> {this.props.params.pre_reg_id == null ? "NEW" : this.props.params.pre_reg_id}
										</span>
									</li>
								</ol>
							</div>
						</div>

						<div className="main twoColumnMain">

							<LeftMenuPreReg active="0" />

							<div className="main-content boxShadow">

								<div className="row">
									<div className="col-sm-12">

										<h3>SPAJ Pre-Registration</h3>

										<div className="topWidget">
											<div className="row">
												<div className="col-xs-12 responsive12">
													<div className="content boxShadow">
														<div className="title textShadow">
															<i className="fa fa-user"></i> Personal Information
														</div>
														<div className="entry">
															<div className="col-sm-6">
																<div className="form-horizontal">
																	<div className="form-group">
																		<div className="col-sm-6">
																			<label>SPAJ No</label>
																		</div>
																		<div className="col-sm-6">
																			<input type="text" className="form-control" id="spaj_no" name="spaj_no" />
																		</div>
																	</div>
																</div>
															</div>

															<div className="col-sm-6">
																<div className="form-horizontal">
																	<div className="form-group">
																		<div className="col-sm-6">
																			<label>Pre Registration Date</label>
																		</div>

																		<div className="col-sm-6">
																			<input type="text" className="form-control" id="pre_registration_date" name="pre_registration_date" disabled />
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
								<div className="row" style={{marginTop:"30px"}}>
									<div className="topWidget">
										{/* <div className="row"> */}
											<div className="col-xs-12 responsive12">
												<div className="content boxShadow">
													<div className="title textShadow">
														<i className="fa fa-user"></i> Financial Consultant Information
													</div>
													<div className="entry">
														<div className="col-sm-6">
															<div className="form-horizontal">
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>FC/ BC Code</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="agent_code" name="agent_code" value={this.state.agent_detail && this.state.agent_detail.agent_code}  data-id={this.state.agent_detail && this.state.agent_detail.id} disabled/>
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>FC/ BC Status</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="status" name="status" value={this.state.agent_detail && this.state.agent_detail.status_terminate} disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>License Status</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="status" name="status" value={this.state.agent_detail && this.state.agent_detail.status} disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>AMB Name</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="rm_name" name="rm_name" value={this.state.agent_detail && this.state.agent_detail.dm_name} disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>RD Name</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="rd_name" name="rd_name" value={this.state.agent_detail && this.state.agent_detail.rd_name} disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>Bank Staff Code</label>
																	</div>
																	<div className="col-sm-6">
																		<div className="row-fluid">
																			<input type="text" className="form-control" id="bank_staff_code" name="bank_staff_code"  value={this.state.spaj && this.state.spaj.bank_staff && this.state.spaj.bank_staff.agent_code} onInput={this.getSuggest.bind(this)} list="datalist1" onChange={this.setBankStaff.bind(this)}/>
																				<datalist id="datalist1">
																					{bank_staff_option}
																				</datalist>																	
																			{/* <select name="siteID" id="siteID" className="abcd" style={{width:'100%'}} onKeyUp={}>
																			{}
																			</select> */}
																		</div>
																		{/* <input type="text" className="form-control" id="bank_staff_code" name="bank_staff_code" value={this.state.agent_detail && this.state.agent_detail.bank_staff_code} /> */}
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>Distribution Channel</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="distribution_channel" name="distribution_channel" value={this.state.agent_detail && this.state.agent_detail.distribution_channel} disabled />
																	</div>
																</div>
															</div>
														</div>
														<div className="col-sm-6">
															<div className="form-horizontal">
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>FC/ BC Name</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="agent_name" name="agent_name" value={this.state.agent_detail && this.state.agent_detail.agent_name} disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>MDRT Status</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="mdrt_status" name="mdrt_status" value={this.state.agent_detail && this.state.agent_detail.mdrt_status} disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>License Type</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="status_license_type" name="status_license_type" value={this.state.agent_detail && this.state.agent_detail.status_license_type} disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>RMB/RBM Name</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="rm_name" name="rm_name" value={this.state.agent_detail && this.state.agent_detail.rm_name} disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>FC Branch Name</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="agent_branch" name="agent_branch" value={this.state.agent_detail && this.state.agent_detail.agent_branch_name} disabled/>
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>Bank Staff Name</label>
																	</div>
																	<div className="col-sm-6">
																		<input type="text" className="form-control" id="bank_staff_name" name="bank_staff_name" disabled />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label></label>
																	</div>
																	<div className="col-sm-6">
																	</div>
																</div>
															</div>
														</div>
													{/* </div> */}
												</div>
											</div>
										</div>
									</div>
								</div>
								
								<div className="clearfix"></div>
								<div className="row" style={{marginTop:"30px"}}>
									<div className="topWidget">
										<div className="col-xs-12 responsive12">
											<div className="content boxShadow">
												<div className="title textShadow">
													<i className="fa fa-user"></i> Detail Information
												</div>
												<div className="entry">
													<div className="col-sm-12">
														<div className="col-sm-6">
															<div className="form-horizontal">
																<div className="form-group">
																	<div className="col-sm-12">
																		<label>Policyholder Name</label>
																		<input type="text" className="form-control" id="owner_name" name="owner_name"  />
																	</div>
																</div>
																
																<div className="form-group">
																	<div className="col-sm-12">
																		<div className="col-sm-5"><label>Payor Name</label></div>
																		<div className="col-sm-2"><input type="checkbox" id="checkbox-payor" onClick={this.payorAsHolder.bind(this)}/></div>
																		<div className="col-sm-5"><label>as Policyholder</label></div>
																		<input type="text" className="form-control" id="payor_name" name="payor_name"  />
																	</div>
																</div>
															</div>
														</div>

														<div className="col-sm-6">
															<div className="form-horizontal">
																<div className="form-group">
																	<div className="col-sm-12">
																		<div className="col-sm-5"><label>Insured Name</label></div>
																		<div className="col-sm-2"><input type="checkbox" id="checkbox-insured" onClick={this.insuredAsHolder.bind(this)}/></div>
																		<div className="col-sm-5"><label>as Policyholder</label></div>
																		<input type="text" className="form-control" id="insured_name" name="insured_name" />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-12">
																		<label></label>
																	</div>
																	<div className="col-sm-12">
																	<label></label>
																	</div>
																</div>
															</div>
															
														</div>
													</div>
													<div className="col-sm-12">
														<div className="col-sm-6">
															<div className="form-horizontal">
																
																<div className="form-group">
																	<div className="col-sm-12">
																		<label>Email</label>
																		<input type="text" className="form-control" id="email" name="email" />
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">

																		<label>Payment Frequency</label>
																	</div>
																	<div className="col-sm-6">
																		<select className="form-control" id="payment_freq" name="payment_freq">		
																			<option value="">Please select one</option>
																			{payment_freq}
																		</select>
																	</div>
																</div>
															</div>
														</div>

														<div className="col-sm-6">
															<div className="form-horizontal">
																
																<div className="form-group">
																	<div className="col-sm-12">
																		<label>Handphone No</label>
																		<input type="text" className="form-control" id="hp" name="hp" placeholder="6281000000000"/>
																	</div>
																</div>
																<div className="form-group">
																	<div className="col-sm-6">
																		<label>Payment Method</label>
																	</div>
																	<div className="col-sm-6">
																		<select className="form-control" id="payment_method" name="payment_method">
																			<option value="">Please select one</option>
																			{payment_method}
																		</select>
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
								<div className="row" style={{marginTop:"30px"}}>
									<div className="topWidget">
										<div className="col-xs-12 responsive12">
											<div className="content boxShadow">
												<div className="title textShadow">
													<i className="fa fa-user"></i> Document Information
												</div>
												
												<div className="scroll-h" style={{ 'overflow-x': 'auto' }}>
													<div className="entry" style={{ verticalAlign: 'middle' }}>
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
																<th className="header_table valign-middle text-center">Document Name</th>
																<th className="header_table valign-middle text-center">Document Type</th>
																<th className="header_table valign-middle text-center">Status</th>
																<th className="header_table valign-middle text-center">Notes</th>
																<th className="header_table valign-middle text-center"></th>															
															</tr>
														</thead>
														<tbody>
															{doc_list}
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
								<div className="clearfix"></div>
								
								<div className="row" style={{marginTop:"30px"}}>
									<div className="col-sm-12">
										<div className="topWidget">
											<div className="row">
												<div className="col-xs-12 responsive12">
													<div className="content boxShadow">
														<div className="title textShadow">
															<i className="fa fa-user"></i> Checker Feedback
														</div>
														<div className="entry">
															<div className="col-sm-6">
																<div className="form-horizontal">
																	<div className="form-group">
																		<div className="col-sm-12">
																			{log}
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
								<div className="row" style={{marginTop:"30px"}}>
									<div className="col-sm-12">
										<div className="col-md-6 text-left">
											<a href="#/pre_reg_list"><button className="btn btn-primary " type="button" >Back</button></a>
										</div>
										<div className="col-md-6 text-right">
											{save_button}
											{submit_button}
										</div>
									</div>
								</div>
							</div>

							<div className="clearfix"></div>
						</div>
					</div >

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
					<div className="modal fade" id="doc-modal" role="dialog">
						<div className="modal-dialog">
							<div className="modal-content">
								<div className="modal-header">
									<button type="button" className="close" data-dismiss="modal">&times;</button>
									<h4 className="modal-title">Update Document</h4>
								</div>
								<div className="modal-body">
									<form className="form-horizontal">
										<div className="form-group">
												<label className="col-sm-5 responsive3">Document Name</label>
												<div className="col-sm-7 responsive3">
														<input type="text" id="doc_name_m" className="form-control" disabled/>
												</div>
										</div>
										<div className="form-group">
												<label className="col-sm-5 responsive3">Status</label>
												<div className="col-sm-7 responsive3">
														<input type="text" id="doc_status_m" className="form-control" disabled/>
												</div>
										</div>
										<div className="form-group">
												<label className="col-sm-5 responsive3">Notes</label>
												<div className="col-sm-7 responsive3">
														<input type="text" id="doc_note_m" className="form-control"/>
												</div>
										</div>
								</form>
								</div>
								<div className="modal-footer">
									<button id="update_doc_button" type="button" className="btn btn-default" data-dismiss="modal" onClick={this.updateDoc.bind(this)}>Update</button>
									<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
								</div>
							</div>
						</div>
					</div>
					<Loading />
					<SubmitModal />
					<FeatureModal />
				</div >
				<div className="clearfix"></div>
				<Footer />

			</div >
		);
	}
}

export default spaj_pre_reg;