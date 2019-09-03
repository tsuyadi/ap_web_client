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
import spaj_pre_reg from './spaj_pre_reg';
var FileSaver = require('file-saver');

const SortType = {
	DESC: 'DESC',
	ASC: 'ASC'
}

class pre_reg_list extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			data: null,
			filterd_data: null,
			sort: SortType.DESC,
			activeSorting: '',
			param: {
                page: 1,
                offset: 10,
                userid: "",
                spaj_no: "",
                spaj_no2: "",
                owner_name: "",
                owner_name2: "",
                insured_name: "",
                insured_name2: "",
                agent_code: "",
                agent_code2: "",
                agent_name: "",
                agent_name2: "",
                agent_branch: "",
                agent_branch2: "",
                channel_distribution: "",
                channel_distribution2: "",
                status: "",
                status2: "",
                pre_reg_date_start: "",
                pre_reg_date_end: "",
                pre_reg_date: "",
                sort_by: "-status__name"
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
		this.getDataStatus = this.getDataStatus.bind(this);
		this.resetFilter = this.resetFilter.bind(this);
		this.itemSorting = this.itemSorting.bind(this);
		this._onFilterChange = this._onFilterChange.bind(this);
	}

	componentDidMount() {

		this.getData('0');
		this.getDataStatus();

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

	resetFilter() {
		$("#filter :input").val("");
		this.setState({
			param: {
                page: 1,
                offset: 10,
                userid: "",
                spaj_no: "",
                spaj_no2: "",
                owner_name: "",
                owner_name2: "",
                insured_name: "",
                insured_name2: "",
                agent_code: "",
                agent_code2: "",
                agent_name: "",
                agent_name2: "",
                agent_branch: "",
                agent_branch2: "",
                channel_distribution: "",
                channel_distribution2: "",
                status: "",
                status2: "",
                pre_reg_date_start: "",
                pre_reg_date_end: "",
                pre_reg_date: "",
                sort_by: "-status__name"
			},
		});
	}
	_sorting(data, content, type) {

		if (content == "spaj_no") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.spaj_no.toLowerCase();
					var y = b.spaj_no.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.spaj_no.toLowerCase();
					var y = a.spaj_no.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "owner_name") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.owner_name.toLowerCase();
					var y = b.owner_name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.owner_name.toLowerCase();
					var y = a.owner_name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "insured_name") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.insured_name.toLowerCase();
					var y = b.insured_name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.insured_name.toLowerCase();
					var y = a.insured_name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "pre_reg_date") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.pre_reg_date.toLowerCase();
					var y = b.pre_reg_date.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.pre_reg_date.toLowerCase();
					var y = a.pre_reg_date.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "agent_code") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.agent_code.toLowerCase();
					var y = b.agent_code.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.agent_code.toLowerCase();
					var y = a.agent_code.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "agent_name") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.agent_name.toLowerCase();
					var y = b.agent_name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.agent_name.toLowerCase();
					var y = a.agent_name.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "agent_branch") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.agent_branch.toLowerCase();
					var y = b.agent_branch.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.agent_branch.toLowerCase();
					var y = a.agent_branch.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "channel_distribution") {
			if (type == SortType.ASC) {
				data.sort(function (a, b) {
					var x = a.channel_distribution.toLowerCase();
					var y = b.channel_distribution.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			} else {
				data.sort(function (a, b) {
					var x = b.channel_distribution.toLowerCase();
					var y = a.channel_distribution.toLowerCase();
					if (x < y) { return -1; }
					if (x > y) { return 1; }
					return 0;
				});
			}
		} else if (content == "status") {
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
				filterd_data: this.state.data
			});
		}
		
		var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
		var size = this.state.data.length;
		var filteredList = [];
		var filter, table, tbody, tr, td, txtValue;
		var filter1, td1,txtValue1;
		var filter2, td2,txtValue2;
		var filter3, td3,txtValue3;
		var filter4, td4,txtValue4;
		var filter5, td5,txtValue5;
		var filter6, td6,txtValue6;
		var filter7, td7,txtValue7;
		var filter8, td8,txtValue8;
		filter = document.getElementById("filter_spaj_no").value.toLowerCase();
		filter1 = document.getElementById("filter_pre_reg_date").value.toUpperCase();
		filter2 = document.getElementById("filter_owner_name").value.toUpperCase();
		filter3 = document.getElementById("filter_insured_name").value.toUpperCase();
		filter4 = document.getElementById("filter_agent_code").value.toUpperCase();
		filter5 = document.getElementById("filter_agent_name").value.toUpperCase();
		filter6 = document.getElementById("filter_agent_branch").value.toUpperCase();
		filter7 = document.getElementById("filter_channel_distribution").value.toUpperCase();
		filter8 = document.getElementById("filter_status").value.toUpperCase();
		table = document.getElementById("pre_reg_table");
		// tbody = table.getElementsByTagName("tbody")[0];
		tr = table.getElementsByTagName("tr");
		let no = 0;
		for (var index = 2; index < size+2; index++) {
			td = tr[index].getElementsByTagName("td")[1];
    		td1 = tr[index].getElementsByTagName("td")[2];
    		td2 = tr[index].getElementsByTagName("td")[3];
    		td3 = tr[index].getElementsByTagName("td")[4];
    		td4 = tr[index].getElementsByTagName("td")[5];
    		td5 = tr[index].getElementsByTagName("td")[6];
    		td6 = tr[index].getElementsByTagName("td")[7];
    		td7 = tr[index].getElementsByTagName("td")[8];
			td8 = tr[index].getElementsByTagName("td")[9];
			if (td ) {
				txtValue = td.textContent || td.innerText;
				txtValue1 = td1.textContent || td1.innerText;
				txtValue2 = td2.textContent || td2.innerText;
				txtValue3 = td3.textContent || td3.innerText;
				txtValue4 = td4.textContent || td4.innerText;
				txtValue5 = td5.textContent || td5.innerText;
				txtValue6 = td6.textContent || td6.innerText;
				txtValue7 = td7.textContent || td7.innerText;
				txtValue8 = td8.textContent || td8.innerText;
				if (txtValue.toLowerCase().indexOf(filter) !== -1 &&
					txtValue1.toUpperCase().indexOf(filter1) > -1 &&
					txtValue2.toUpperCase().indexOf(filter2) > -1 &&
					txtValue3.toUpperCase().indexOf(filter3) > -1 &&
					txtValue4.toUpperCase().indexOf(filter4) > -1 &&
					txtValue5.toUpperCase().indexOf(filter5) > -1 &&
					txtValue6.toUpperCase().indexOf(filter6) > -1 &&
					txtValue7.toUpperCase().indexOf(filter7) > -1 &&
					txtValue8.toUpperCase().indexOf(filter8) > -1
					) {
					no = no +1;
					tr[index].getElementsByTagName("td")[0].innerText = no;
					tr[index].getElementsByTagName("td")[0].textContent = no;
				  	tr[index].style.display = "";
				} else {
				  tr[index].style.display = "none";
				}
			}  
		}

		var sortIndexes = [];
		var size = filteredList.length;
		for (var index = 0; index < size; index++) {
			sortIndexes.push(index);
		}

		// var row_data = filteredList != null ? filteredList : [];
		// var total_page = Math.ceil(row_data.length / 10);

		this.setState({
			// filterd_data: filteredList,
			// total: total_page
		});
		debugger;
	}

	getDataStatus() {

		$('.load-ape').show();

		$.ajax({
			url: api_route.pre_reg_status,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'GET',
			data: [],
			success: (response) => {
				// // debugger;
				$('.load-ape').hide();
				this.setState({
					status_list: response
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

	getData(param) {

		
		var pre_reg_date_start = $('[name=pre_reg_date_start]').val();
		var pre_reg_date_end = $('[name=pre_reg_date_end]').val();
		var status = $('[name=status]').val();
		// debugger;
        this.state.param.userid = localStorage.getItem('username')
		this.state.param.pre_reg_date_start = pre_reg_date_start;
		this.state.param.pre_reg_date_end = pre_reg_date_end;
		this.state.param.status = status;
		this.state.param.page = '1';

		var paramSearch = this.state.param;

		if (param == '0') {

            $('#loading').modal('show');

            $.ajax({
                url: api_route.pre_reg_spaj_list,
                headers: {
                    'Authorization': 'JWT ' + sessionStorage.getItem('token')
                },
                type: 'POST',
                data: this.state.param,
                success: (response) => {
                    $('#loading').modal('hide');
                    console.log("pre reg list")
                    console.log(response);
                    var num_data = response.spaj || [];
                    var total_page = response.total_pages;
                    // // debugger di listpre_reg_spaj ajax

                    this.setState({
                        data: response.spaj,
                        filterd_data: num_data,
                        total_data: response.total_rows,
						total: total_page,
						start : response.start_index,
						end : response.end_index,
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
		} else {

			$('#message').modal('hide');


			// policy/summary

			$('.load-ape').show();
			
            $.ajax({
                url: api_route.pre_reg_spaj_list,
                headers: {
                    'Authorization': 'JWT ' + sessionStorage.getItem('token')
                },
                type: 'POST',
                data: this.state.param,
                success: (response) => {
                    $('#loading').modal('hide');
                    console.log("pre reg list")
                    console.log(response);
                    var num_data = response.spaj || [];
                    var total_page = response.total_pages;
                    // // debugger di listpre_reg_spaj ajax

                    this.setState({
                        data: response.spaj,
                        filterd_data: num_data,
                        total_data: response.total_rows,
                        total: total_page,
						start : response.start_index,
						end : response.end_index,
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
			url: api_route.pre_reg_spaj_list,
			headers: {
				'Authorization': 'JWT ' + sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
				$('#loading').modal('hide');
				console.log("pre reg list")
				console.log(response);
				var num_data = response.spaj || [];
				var total_page = response.total_pages;
				// // debugger di listpre_reg_spaj ajax

				this.setState({
					data: response.spaj,
					filterd_data: num_data,
					total_data: response.total_rows,
					total: total_page,
					start : response.start_index,
					end : response.end_index,
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
		let pre_reg_spaj = [];
		let list_status = [];
		var data_info = "";

		// var branchRole = '';
		// if(localStorage.getItem('role')==102){
		// 	branchRole = 'form-group hidden';
		// } else {
		// 	branchRole = 'form-group';

		// }
		// debugger;

		if(this.state.status_list != null && this.state.status_list.length > 0){
			// listBranch.push(
			// 	<option value="">All Branch</option>
			// );
				list_status.push(
						<option value="">All</option>
				);
			this.state.status_list.map(function(value, index){
				list_status.push(
					<option value={value.id}>{value.name}</option>
				);
			});
		}

		if (data != null && data.length > 0) {
			data_info = "   Show " + data.length + " of " + this.state.total_data;
			$.map(data, (value, index) => {

				let offs = this.state.param.offset;
				let page = this.state.param.page;
				let num = (page - 1) * offs;



				// let url = "#/newbusiness/policy_info/"+value.id;
				let row = null;
				// let insured = "";
				// $.map(value.lifeassured_set,(value,index) => {
				// 	insured += value.person.name + "\n";
				// })

				// try{
				// 	insured = value.lifeassured_set == null ? '' : value.lifeassured_set[0] == null ? '' : value.lifeassured_set[0].person == null ? '' : value.lifeassured_set[0].person.name;
				// }catch(e){

				// }

				num += (index + 1);

				row =
					<tr key={index}>
						<td>{num}</td>
						<td><a href={"#/pre_registration/"+value.id}>{value.spaj_no == null ? '' : value.spaj_no == null ? '' : value.spaj_no}</a></td>
						<td>{value.pre_reg_date == null ? '' : value.pre_reg_date == null ? '' : value.pre_reg_date}</td>
						<td>{value.owner_name == null ? '' : value.owner_name == null ? '' : value.owner_name}</td>
						<td>{value.insured_name == null ? '' : value.insured_name == null ? '' : value.insured_name}</td>
						<td>{value.agent_code == null ? '' : value.agent_code == null ? '' : value.agent_code}</td>
						<td>{value.agent_name == null ? '' : value.agent_name == null ? '' : value.agent_name}</td>
						<td>{value.agent_branch == null ? '' : value.agent_branch == null ? '' : value.agent_branch}</td>
						<td>{value.channel_distribution == null ? '' : value.channel_distribution == null ? '' : value.channel_distribution}</td>
						<td>{value.status_desc == null ? '' : value.status_desc == null ? '' : value.status_desc}</td>
					</tr>
				pre_reg_spaj.push(row);
			});

		} else {
			let row = <tr>
				<td colSpan="10" style={{ 'textAlign': 'center' }}>No data.</td>
			</tr>
			pre_reg_spaj.push(row);

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
        let create_button = "";
        if(localStorage.getItem('role') == 5 || localStorage.getItem('role') == 6 || localStorage.getItem('role') == 7 || localStorage.getItem('role') == 9 || localStorage.getItem('role') == 999){
            create_button = <a href="#/pre_registration"><button type="button" className="btn btn-primary">Create</button></a>            
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

							<LeftMenuPreReg active="1" />

							<div className="main-content boxShadow">

								<div className="row">
									<div className="col-sm-12">
										<div className="topWidget">
											<div className="row">
												<div className="col-xs-12 responsive12">
													<div className="content boxShadow">
														<div className="title textShadow">
															<i className="fa fa-search"></i> Filter
														</div>
														<div className="entry" id="filter">
															<div className="col-sm-6">
																<div className="form-horizontal">
																	<div className="form-group">
																		<div className="col-sm-6">
																			<label>SPAJ No</label>
																		</div>
																		<div className="col-sm-6">
																			<input type="text" className="form-control" id="spaj_no" name="spaj_no" value={this.state.param.spaj_no} onChange={this.handleChangeData}  />
																		</div>
																	</div>
                                                                    
																	<div className="form-group">
																		<div className="col-sm-6">
																			<label>Policy Holder Name</label>
																		</div>

																		<div className="col-sm-6">
																			<input type="text" className="form-control" id="owner_name" name="owner_name" value={this.state.param.owner_name} onChange={this.handleChangeData}  />
																		</div>
																	</div>
                                                                    
																	<div className="form-group">
																		<div className="col-sm-6">
																			<label>Insured Name</label>
																		</div>

																		<div className="col-sm-6">
																			<input type="text" className="form-control" id="insured_name" name="insured_name" value={this.state.param.insured_name} onChange={this.handleChangeData}  />
																		</div>
																	</div>
                                                                    
																	<div className="form-group">
																		<div className="col-sm-6">
																			<label>Status</label>
																		</div>

																		<div className="col-sm-6">
                                                                            <select className="form-control" id="status" name="status">
                                                                                {list_status}
                                                                            </select>
																		</div>
																	</div>
																	<div className="form-group">
																	
																	</div>
																</div>
                                                                
															</div>

															<div className="col-sm-6">
																<div className="form-horizontal">
																	<div className="form-group">
																		<div className="col-sm-5">
																			<label>Submited Date</label>
																		</div>
																		<div className="col-sm-3">
											                            	<DatePicker className="form-control c" id="pre_reg_date_start" name="pre_reg_date_start" onChange={this.handleChangeData}  />
																		</div>
																		<div className="col-sm-1"> -
																		</div>
																		<div className="col-sm-3">
											                            	<DatePicker className="form-control" id="pre_reg_date_end" name="pre_reg_date_end" onChange={this.handleChangeData}  />
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="col-sm-5">
																			<label>FC / BC Code</label>
																		</div>
																		<div className="col-sm-7">
																			<input type="text" className="form-control" id="agent_code" name="agent_code" value={this.state.param.agent_code} onChange={this.handleChangeData}  />
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="col-sm-5">
																			<label>FC / BC Name</label>
																		</div>

																		<div className="col-sm-7">
																			<input type="text" className="form-control" id="agent_name" name="agent_name" value={this.state.param.agent_name} onChange={this.handleChangeData}  />
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="col-sm-5">
																			<label>FC / BC Branch Name</label>
																		</div>
																		<div className="col-sm-7">
																			<input type="text" className="form-control" id="agent_branch" name="agent_branch" value={this.state.param.agent_branch} onChange={this.handleChangeData}  />
																		</div>
																	</div>
																	<div className="form-group">
																		<div className="col-sm-5">
																			<label>Distribution Channel</label>
																		</div>
																		<div className="col-sm-7">
																			<input type="text" className="form-control" id="channel_distribution" name="channel_distribution" value={this.state.param.channel_distribution} onChange={this.handleChangeData}  />
																		</div>
																	</div>
																</div>
															</div>
                                                            
														</div>
                                                        <div className="col-md-12">
                                                            <div className="col-md-6 text-left">
                                                                {create_button}
                                                            </div>
                                                            <div className="col-md-6 text-right">
									                            <button className="btn btn-primary " type="button" onClick={this.getData.bind(this, '0')} style={{marginRight:"15px"}}><i className="fa fa-search"></i> Search</button>
                                                                <button type="button" className="btn btn-primary" onClick={this.resetFilter.bind(this)}>Reset</button>
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
                                                    <i className="fa fa-user"></i> Pre Register                                                </div>
                                                <div className="entry">
                                                <div className="row">
                                                    <div className="col-sm-12">
                                                        <div className="scroll-h" style={{'overflow-x':'auto'}}>
                                                            <div className="col-sm-12"  style={{verticalAlign:'middle'}}>
																<div className="col-sm-3" style={{margin:'20px 0px', lineHeight:'40px'}}>
																	Showing  {this.state.start && this.state.start } to {this.state.end && this.state.end} of {this.state.total_data && this.state.total_data}
																</div>
                                                                <div className="col-sm-9">
																	<nav aria-label="Page navigation">
                                                                        <ul className="pagination">
                                                                            {paging}
                                                                        </ul>
                                                                    </nav>
                                                                </div>
                                                            </div>
                                                            <table className="table table-bordered table-striped table-hover text-center table-box" id="pre_reg_table">
                                                                <thead>
                                                                    <tr>
                                                                        <th className="header_table valign-middle text-center">No</th>
                                                                        <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "spaj_no")}>SPAJ No</a> {this.sortIcon("spaj_no")}</th>
                                                                        <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "pre_reg_date")}>Submit Date</a> {this.sortIcon("pre_reg_date")}</th>
                                                                        <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "owner_name")}>Policy Holder Name</a> {this.sortIcon("owner_name")}</th>
                                                                        <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "insured_name")}>Insured Name</a> {this.sortIcon("insured_name")}</th>
                                                                        <th className="header_table valign-middle text-center" style={{'width' : '120px'}}><a onClick={this.itemSorting.bind(this, "agent_code")}>FC / BC Code</a> {this.sortIcon("agent_code")}</th>
                                                                        <th className="header_table valign-middle text-center" style={{'width' : '100px'}}><a onClick={this.itemSorting.bind(this, "agent_name")}>FC / BC Name</a> {this.sortIcon("agent_name")}</th>
                                                                        <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_branch")}>FC / BC Branch Name</a> {this.sortIcon("agent_branch")}</th>
                                                                        {/*<th className="header_table valign-middle text-center">Payment Method</th>*/}
                                                                        <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "channel_distribution")}>Channel Distribution</a> {this.sortIcon("channel_distribution")}</th>
                                                                        <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "status")}>Status</a> {this.sortIcon("status")}</th>
                                                                    </tr>
                                                                    <tr key="header_list_policy_filter">
                                                                        <th className="header_table"></th>
                                                                        <th className="header_table"><input type="text" id="filter_spaj_no" name="spaj_no" onKeyUp={this._onFilterChange.bind(this, "spaj_no")} className="form-control" /></th>
                                                                        <th className="header_table"><input type="text" id="filter_pre_reg_date" name="pre_reg_date" onKeyUp={this._onFilterChange.bind(this, "pre_reg_date")} className="form-control" /></th>
                                                                        <th className="header_table"><input type="text" id="filter_owner_name" name="owner_name" onKeyUp={this._onFilterChange.bind(this, "owner_name")} className="form-control" /></th>
                                                                        <th className="header_table"><input type="text" id="filter_insured_name" name="insured_name" onKeyUp={this._onFilterChange.bind(this, "insured_name")} className="form-control" /></th>
                                                                        <th className="header_table"><input type="text" id="filter_agent_code" name="agent_code" onKeyUp={this._onFilterChange.bind(this, "agent_code")} className="form-control" /></th>
                                                                        <th className="header_table"><input type="text" id="filter_agent_name" name="agent_name" onKeyUp={this._onFilterChange.bind(this, "agent_name")} className="form-control" /></th>
                                                                        <th className="header_table"><input type="text" id="filter_agent_branch" name="agent_branch" onKeyUp={this._onFilterChange.bind(this, "agent_branch")} className="form-control" /></th>
                                                                        <th className="header_table"><input type="text" id="filter_channel_distribution" name="channel_distribution" onKeyUp={this._onFilterChange.bind(this, "channel_distribution")} className="form-control" /></th>
                                                                        <th className="header_table"><input type="text" id="filter_status" name="status" onKeyUp={this._onFilterChange.bind(this, "status")} className="form-control" /></th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
															        {pre_reg_spaj}							
                                                                </tbody>
                                                            </table>
                                                            <div className="col-sm-12">
																<div className="col-sm-3" style={{margin:'20px 0px', lineHeight:'40px'}}>
																	Showing  {this.state.start && this.state.start } to {this.state.end && this.state.end} of {this.state.total_data && this.state.total_data}
																</div>
																<div className="col-sm-9" style={{margin:'20px 0px', lineHeight:'40px'}}>
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
								<div className="clearfix"></div>
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

export default pre_reg_list;