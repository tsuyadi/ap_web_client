'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuSam from '../../common_components/menu_v2/left_menu_sam';
import Footer from '../../common_components/footer';

import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';
import Loading from '../../common_components/loading';
import {DatePicker} from '../../common_components/date_picker';
import Pager from 'react-pager';
import MaintenanceAlert from '../../common_components/alert/MaintenanceAlert';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';
import {getSideMenu} from '../../common_components/helper/user_session';
import {getMenu} from '../../common_components/helper/user_session';

const SortType = {
  DESC : 'DESC',
  ASC : 'ASC'
}

class detail_activity extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			filterd_data : null,
			sort : SortType.DESC,
			activeSorting : '',
			param: {
				agent_code : "",
				agent_name : "",
				agent_level : "",
				agent_status : "",
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

		// this.getData = this.getData.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		// this.getDataSummary = this.getDataSummary.bind(this);
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
				url: api_route.active_agent_list,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
					console.log(response);
					var num_data = response.list_active_agent || [];
					var total_page = response.total_pages;
				// // debugger di listactive_agent_list ajax
				// debugger;
					this.setState({
						data: response.list_active_agent,
						filterd_data: num_data,
						total_data: response.total_agent,
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
		// console.log('masuk 2');
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
            filterd_data: this.state.data
          });
        }

        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.data.length;
        var filteredList = [];
				
        for (var index = 0; index < size; index++){
          if(cellDataKey == "agent_code")
					var v = this.state.data[index] == null ? '' : this.state.data[index].code == null ? '' : this.state.data[index].code;
					else if(cellDataKey == "agent_name")
					var v = this.state.data[index] == null ? '' : this.state.data[index].full_name == null ? '' : this.state.data[index].full_name;
					else if(cellDataKey == "agent_level")
            var v = this.state.data[index] == null ? '' : this.state.data[index].level == null ? '' : this.state.data[index].level;
          else if(cellDataKey == "agent_status")
            var v = this.state.data[index] == null ? '' : this.state.data[index].agent_status == null ? '' : this.state.data[index].agent_status;
					else if(cellDataKey == "amb_tm")
						var v = this.state.data[index] == null ? '' : this.state.data[index].amb_name == null ? '' : this.state.data[index].amb_name;    			
					else if(cellDataKey == "rmb")
            var v = this.state.data[index] == null ? '' : this.state.data[index].rmb_name == null ? '' : this.state.data[index].rmb_name;	  
					else if(cellDataKey == "rd_td")
            var v = this.state.data[index] == null ? '' : this.state.data[index].rd_name == null ? '' : this.state.data[index].rd_name;
					
						v = v != null ? v : '';
          if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
            filteredList.push(this.state.data[index]);
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


	getData(param){
		var agent_name = $('[name=agent_name]').val();
		var agent_code = $('[name=agent_code]').val();
		var level = $('[name=agent_level]').val();
		var agent_status = $('[name=agent_status]').val();

		// debugger;

		this.state.param.agent_name = agent_name;
		this.state.param.agent_code = agent_code;
		this.state.param.level = level;
		this.state.param.agent_status = agent_status;
		this.state.param.page = '1';

		var paramSearch = this.state.param;

		if(param == '0'){

			if(paramSearch.agent_code == "" && paramSearch.agent_name == "" && paramSearch.agent_status == "" 
			&& paramSearch.level == ""  ){


				$('#message').modal('show');

			}else{

				$('#message').modal('hide');
				$('#loading').modal('show');

				// policy/summary

				$('.load-ape').show();
				
		$.ajax({
			url: api_route.active_agent_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
				var num_data = response.list_active_agent || [];
				var total_page = response.total_pages;
			// // debugger di listactive_agent_list ajax
			// debugger;
				this.setState({
					data: response.list_active_agent,
					filterd_data: num_data,
					total_data: response.total_agent,
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
				url: api_route.active_agent_list,
				headers: {
					'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				type: 'POST',
				data: this.state.param,
				success: (response) => {
				$('#loading').modal('hide');
					var num_data = response.list_active_agent || [];
					var total_page = response.total_pages;
				// // debugger di listactive_agent_list ajax
				// debugger;
					this.setState({
						data: response.list_active_agent,
						filterd_data: num_data,
						total_data: response.total_agent,
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
			url: api_route.active_agent_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
				var num_data = response.list_active_agent || [];
				var total_page = response.total_pages;
			// // debugger di listactive_agent_list ajax
			// debugger;
				this.setState({
					data: response.list_active_agent,
					filterd_data: num_data,
					total_data: response.total_agent,
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
		let active_agent_list = [];
		let listBranch = [];
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

		if(data != null && data.length > 0)
		{
			data_info = "   Show "+data.length+" of "+this.state.total_data;
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

					num += (index+1);
					
					row =
					 
							<tr key={index}>
								<td>{num}</td>
								<td><a href={"#/sam_report/detail_agent?agent="+value.code}>{value.code == null ? '' : value.code == null ? '' : value.code}</a></td>
								<td>{value.full_name == null ? '' : value.full_name == null ? '' : value.full_name}</td>
								<td>{value.level == null ? '' : value.level == null ? '' : value.level}</td>
								<td>{value.agent_status == null ? '' : value.agent_status == null ? '' : value.agent_status}</td>
								<td>{value.amb_name == null ? '' : value.amb_name == null ? '' : value.amb_name}</td>
								<td>{value.rmb_name == null ? '' : value.rmb_name == null ? '' : value.rmb_name}</td>
								<td>{value.rd_name == null ? '' : value.rd_name == null ? '' : value.rd_name}</td>
							</tr>
					active_agent_list.push(row);

	          });

		} else {
			let row = <tr>
						<td colSpan="14" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            active_agent_list.push(row);

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

		let total = 1;
		let current = 1;

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
				</div>
				
				<div className="main twoColumnMain">

					<LeftMenuSam active="3" />

					<div className="main-content boxShadow">

						<div className="row">
							<div className="col-sm-12">

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
												<label>Agent Level</label>
											</div>

											<div className="col-sm-6">
												<select className="form-control" id="agent_level" name="agent_level" onChange={this.handleChangeData} >
													<option value="">All</option>
													<option value="5">RD</option>
													<option value="6">RMB</option>
													<option value="7">AMB</option>
													<option value="14">AMP</option>
													<option value="8">RMP</option>
													<option value="9">FC</option>
													<option value="11">TD</option>
													<option value="12">TM</option>
													<option value="13">TC</option>
													<option value="15">ETC</option>
													<option value="16">STC</option>
												</select>
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
								<div className="clearfix h25"></div>
									<div className="col-sm-3 pull-left">
										<label style={{paddingTop:'20px', paddingBottom:'20px'}}>{data_info}</label>
										{/* Show 2 of 2 */}
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
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_code")}>Agent Code</a> {this.sortIcon("agent_code")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_name")}>Agent Name</a> {this.sortIcon("agent_name")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_level")}>Agent Level</a> {this.sortIcon("agent_level")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_status")}>Agent Status</a> {this.sortIcon("agent_status")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "amb_tm")}>AMB/TM</a> {this.sortIcon("amb_tm")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rmb")}>RMB</a> {this.sortIcon("rmb")}</th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rd_td")}>RD/TD</a> {this.sortIcon("rd_td")}</th>
											</tr>
											<tr key="header_list_policy_filter">
												<th className="header_table"></th>
												<th className="header_table"><input type="text" name="agent_code" onChange={this._onFilterChange.bind(this, "agent_code")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_name" onChange={this._onFilterChange.bind(this, "agent_name")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_level" onChange={this._onFilterChange.bind(this, "agent_level")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_status" onChange={this._onFilterChange.bind(this, "agent_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="amb_tm" onChange={this._onFilterChange.bind(this, "amb_tm")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="rmb" onChange={this._onFilterChange.bind(this, "rmb")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="rd_td" onChange={this._onFilterChange.bind(this, "rd_td")} className="form-control" /></th>
											</tr>
										</thead>
										<tbody>
                        {active_agent_list}												
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

export default detail_activity;
