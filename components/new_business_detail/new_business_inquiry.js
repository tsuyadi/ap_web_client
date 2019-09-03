'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import Pagination from 'react-js-pagination';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import Pager from 'react-pager';
import Loading from '../../common_components/loading';
import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';

import ModalMessage from '../../common_components/modal/modal_message';

import FeatureModal from '../../common_components/modal/feature_modal';

import {COMM_TYPE, GET_COMM_NAME, MIME_TYPE} from '../../common_components/helper/constant';
import {DatePicker} from '../../common_components/date_picker';
var FileSaver = require('file-saver');

const SortType = {
	DESC : 'DESC',
	ASC : 'ASC'
  }
  
class new_business_inquiry extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			filterd_data : null,
			sort : SortType.DESC,
			activeSorting : '',
			param: {
				policy_holder_name:"",
				life_assured:"",
				spaj_status:"",
				agent_name:"",
				agent_code:"",
				agent_level:"",
				agent_status:"",
				spaj_no:"",
				policy_no:"",
				spaj_status_start_date :"",
				spaj_status_end_date:"",
				spaj_receive_start_date:"",
				spaj_receive_end_date:"",
				spaj_payment_mode:"",
				export:"",
				branch : "",
				page:1,
				offset:20,
				activePage:1				
			},
			total : 0,
			current : 0,
			visiblePages : 3,
			branch_list:null
		}

		this.getData = this.getData.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);

		this.submitIssue = this.submitIssue.bind(this);
		this.clearForm = this.clearForm.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.itemSorting = this.itemSorting.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
	}

	componentDidMount(){
		this.getData();
	}

	getData(){
		$('#loading').modal('show');
		var spaj_status_start_date = $('[name=spaj_status_start_date]').val();
		var spaj_status_end_date = $('[name=spaj_status_end_date]').val();
		var spaj_receive_start_date = $('[name=spaj_receive_start_date]').val();
		var spaj_receive_end_date = $('[name=spaj_receive_end_date]').val();
    	// console.log(this.state.param);
    	// return false;
		this.state.param.spaj_status_start_date = spaj_status_start_date;
		this.state.param.spaj_status_end_date = spaj_status_end_date;
		this.state.param.spaj_receive_start_date = spaj_receive_start_date;
		this.state.param.spaj_receive_end_date = spaj_receive_end_date;
		this.state.param.page = 1;
		this.state.param.export = '';
		
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
            url: api_route.spaj_list,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param,
            success: (response) => {
			  // console.log(response);
              $('#loading').modal('hide');

			//   var num_data = response.content.spaj_list || [];
			//   var total_page = Math.ceil(num_data.length / 10);
            //   this.setState({
            //   	data: response.content.spaj_list,
			// 	total: total_page
            //   });

				var num_data = response.content.spaj_list || [];
				var total_page = response.content.total_pages;
				// // debugger di listpolicies ajax
				
				this.setState({
					data: response.content,
					filterd_data: num_data,
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

	// handlePageChange(p) {
	// 	// set page
	// 	this.state.param.page 		= p;
	// 	this.state.param.activePage = p;

	// 	// get new data
	// 	this.getData();
  	// }

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
        if(content == "spaj_number"){
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
        }else if(content == "policy_holder"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.policy_holder_name.toLowerCase();
				var y = b.policy_holder_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.policy_holder_name.toLowerCase();
				var y = a.policy_holder_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "insured"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.insured_name.toLowerCase();
				var y = b.insured_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.insured_name.toLowerCase();
				var y = a.insured_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "receive_date"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.submit_date.toLowerCase();
				var y = b.submit_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.submit_date.toLowerCase();
				var y = a.submit_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content == "premium_mode"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.policy.payment_mode.toLowerCase();
				var y = b.policy.payment_mode.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.policy.payment_mode.toLowerCase();
				var y = a.policy.payment_mode.toLowerCase();
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
		  }else if(content =="spaj_status"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.status;
				var y = b.status;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.status;
				var y = a.status;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content =="pending_notes"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.notes;
				var y = b.notes;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.notes;
				var y = a.notes;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content =="status_date"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.status_date;
				var y = b.status_date;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.status_date;
				var y = a.status_date;
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
            filterd_data: this.state.data.spaj_list
          });
        }

        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.data.spaj_list.length;
        var filteredList = [];
				
        for (var index = 0; index < size; index++){
          if(cellDataKey == "spaj_number")
            var v = this.state.data.spaj_list[index].number;
          else if(cellDataKey == "policy_holder")
            var v = this.state.data.spaj_list[index].policy_holder_name;
		  else if(cellDataKey == "insured")
			var v = this.state.data.spaj_list[index].insured_name;
		  else if(cellDataKey == "receive_date")
			var v = this.state.data.spaj_list[index].submit_date;
          else if(cellDataKey == "premium_mode")
            var v = this.state.data.spaj_list[index].policy.payment_mode;
          else if(cellDataKey == "agent_name")
			var v = this.state.data.spaj_list[index].agent.full_name;
		  else if(cellDataKey == "agent_level")
			var v = this.state.data.spaj_list[index].agent.user.level.type;
		  else if(cellDataKey == "agent_status")
			var v = this.state.data.spaj_list[index].agent.status;
		  else if(cellDataKey == "spaj_status")
			var v = this.state.data.spaj_list[index].status;	
		  else if(cellDataKey == "pending_notes")
			var v = this.state.data.spaj_list[index].notes;	
  		  else if(cellDataKey == "status_date")
			var v = this.state.data.spaj_list[index].status_date;	
  		  else if(cellDataKey == "branch")
			var v = this.state.data.spaj_list[index].branch;				
          if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
            filteredList.push(this.state.data.spaj_list[index]);
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

	handlePageChanged(newPage){
		
		this.state.param.page = newPage;
		this.state.param.export = '';
		$('#loading').modal('show');
		// // debugger;
		$.ajax({
			url: api_route.spaj_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
				$('#loading').modal('hide');
				// // debugger;
				var num_data = response.content.spaj_list || [];
				var total_page = response.content.total_pages;
				// // debugger di listpolicies ajax
				
				this.setState({
					data: response.content,
					filterd_data: num_data,
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

	handleChangeData(e){
		// console.log(e);
		let data_array = {};
		for (let i in this.state.param) {
			if(i==e.target.name){
				data_array[i] = e.target.value
			}
			else{
				data_array[i] = this.state.param[i]
			}
		}
		// console.log(data_array);
		this.setState({
			param : data_array
		});
	}

	submitIssue(){
		
		var email = $('[name=email]').val();
		var message = $('[name=message]').val();

		var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 

		$('.email-alert').hide();

		if(email.match(pattern))
		{

			$('.sendissue').show();

			$.ajax({
				url : api_route.issueAPI,
				headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				data: {
					'email':email,
					'message':message
				},
				type: 'POST',
				success: (response) => {
					
					$('.sendissue').hide();
					$('#submitfom').hide();
					$('#inform').show();

				},
				error: (err, response) => {
					$('.sendissue').hide();
					alert('Something wrong happened, please contact our Agency Portal Contact Support');
				}
			});

		}
		else
		{
			$('.email-alert').show();
		}

	}

	clearForm(){
		$('[name=email]').val('');
		$('[name=message]').val('');
	}

	exportSPAJ = (param) => {
		
		this.state.param.export = '';
		param.preventDefault();

		$.ajax({
			url : api_route.spaj_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data : {
				'policy_holder_name':this.state.param.policy_holder_name,
				'life_assured':this.state.param.life_assured,
				'spaj_status':this.state.param.spaj_status,
				'agent_name':this.state.param.agent_name,
				'agent_code':this.state.param.agent_code,
				'agent_level':this.state.param.agent_level,
				'agent_status':this.state.param.agent_status,
				'spaj_no':this.state.param.spaj_no,
				'policy_no':this.state.param.policy_no,
				'spaj_status_start_date' :this.state.param.spaj_status_start_date,
				'spaj_status_end_date':this.state.param.spaj_status_end_date,
				'branch' : this.state.param.branch,
				'page':this.state.param.page,
				'offset':this.state.param.offset,
				'activePage':this.state.param.activePage,
				'download-excel':'download-excel'
			},
			dataType: 'binary',
			type : 'POST',		
			success: (response) => {				
				var blob = new Blob([response], {type: MIME_TYPE.XSLX + ";charset=utf-8"});
				FileSaver.saveAs(blob, "SPAJ_Tracking_" + localStorage.agent_code + ".xlsx");
            },
		});

	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
		}
		
		downloadSpaj(file){

			this.state.param.export = file;
			let ext = "";
			if(file == 'pdf'){
				ext = ".pdf";
			} else{
				ext = ".xlsx";
			}
			$('#loading').modal('show');
	
			$.ajax({
							url: api_route.spaj_list,
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
					FileSaver.saveAs(blob, "SPAJ Tracking" + localStorage.agent_code + ext);
							},
							error: (err, response) => {
								$('#loading').modal('hide');
					alert("something wrong");
							}
					});
		}
	
	render(){

		let data 		= this.state.filterd_data;
		let activePage 	= this.state.param.activePage;
		let totalRows 	= data!=null ? data.length : 0;
		let policies 	= [];

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

					let notes = value.notes != null ? value.notes : '-';
					
					notes = notes.replace(/\[NB\]/gi,'<br>[NB]');
					notes = notes.replace(/\[REC\]/gi,'<br>[REC]');
					
					var xs = 0;
					let clean_notes = notes.split("<br>").map(function(item) {
						++xs;
						if(xs != 0)
						{
							return (
								<span>
									{item}
									<br/>
									<br/>
								</span>
							)
						}
					});

					let url = "#/newbusiness/policy_info/"+value.id;
					let row = null;
					let life_assured = "";
					if(value.policy != null){
						$.map(value.policy.lifeassured_set,(value,index) => {
							life_assured += value.person.name + "\n";
						})
					}
					
					let policy_holder_name = value.policy_holder_name; // (value.policy != null) ? value.policy.policy_holder.name : '';
					let insured = value.insured_name;
					let policy_payment_mode = value.policy != null ? value.policy.payment_mode != null ? value.policy.payment_mode :'' : '';

					num += 1;

					row = <tr key={index}>
								<td>{num}</td>
								<td style={{width:'150px'}}><a href={url}>{value.number}</a></td>
								<td style={{width:'150px'}}>{policy_holder_name}</td>
								<td>{insured}</td>
								<td>{DateFormat(value.submit_date)}</td>
								<td>{policy_payment_mode}</td>
								<td style={{width:'150px'}}>{value.agent != null ? value.agent.full_name != null ? value.agent.full_name :'' : ''}</td>
								<td>{value.agent!= null ? value.agent.user != null ? value.agent.user.level != null? value.agent.user.level.type !=null? value.agent.user.level.type : '' : '' : '' : ''}</td>
								<td>{value.agent!=null ? value.agent.status != null ? value.agent.status : '' : ''}</td>
								<td>{value.status}</td>
								<td>{clean_notes}</td>
								<td>{value.status_date != null ? DateFormat(value.status_date) : ''}</td>
								<td>{value.branch !=null ? value.branch : ''}</td>
							</tr>
					policies.push(row);
			
				
	        });
		}
		else {
			let row = <tr>
						<td colSpan="13" style={{'text-align':'center'}}>No data.</td>
					</tr>
            policies.push(row);
		}

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

		let issueForm = [];

		issueForm.push(

			<div id="submitIssueDiv">
				<div id="inform" style={{'display':'none'}} className="form-group">
					<p className="alert alert-success">Thank you, your inquiry has been submitted.</p>
					<button type="button" className="btn btn-danger" data-dismiss="modal" >Close</button>
				</div>
				<div id="submitfom" className="form-group">
					<p>Please submit issues related to your account inaccuracy and system functionalities
					<br/><i>Silahkan isi saran dan pertanyaan anda mengenai data akun dan fungsional sistem</i></p>
					<input type="text" className="form-control" name="email" style={{'margin-bottom':'10px'}} placeholder="Your email" />
					<p className="email-alert text-danger" style={{'display':'none'}}>Please use valid email address</p>
					<textarea className="form-control" style={{'margin-top':'10px'}} id="issueMessage" name="message" placeholder="Submit your Issue here">
					</textarea>
					<button type="submit" className="btn btn-default" style={{'margin-top':'10px', 'margin-right':'10px'}} onClick={this.clearForm}>Clear</button>
					<button type="submit" className="btn btn-primary" style={{'margin-top':'10px'}} onClick={this.submitIssue}>Submit</button> <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw sendissue" ></i>					
				</div>
				
			</div>

		);

		return (
		<div className="wrap2">

            <TopMenuNewBusinessDetail opsi="inquiry" title="SPAJ Tracking" />
			<ModalMessage id="submit_ap" title="Submit Issue" message={issueForm} />
			<FeatureModal />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li className="active">SPAJ Tracking</li>
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

					<LeftMenuInquiry active="0"/>

					<div className="main-content boxShadow">
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-6">
									<form className="form-horizontal">

                    					<div className="form-group">
											<div className="col-sm-6">
												<label>SPAJ No</label>
											</div>
											<div className="col-sm-6">
												<input type="text" className="form-control" id="spaj_no" name="spaj_no" value={this.state.param.spaj_no} onChange={this.handleChangeData}/>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Policy Holder Name</label>
											</div>
											<div className="col-sm-6">
												<input type="text" className="form-control" id="policy_holder_name" name="policy_holder_name" value={this.state.param.policy_holder_name} onChange={this.handleChangeData}/>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Insured</label>
											</div>
											<div className="col-sm-6">
												<input type="text" className="form-control" id="life_assured" name="life_assured" value={this.state.param.life_assured} onChange={this.handleChangeData}/>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>SPAJ Status</label>
											</div>
											<div className="col-sm-6">
												<select className="form-control" id="spaj_status" name="spaj_status" onChange={this.handleChangeData}>
													<option value="">All Status</option>																
													<option value="3">Submit</option>									
													<option value="7">Underwriting Approved</option>
													<option value="4">Follow-Up</option>
													<option value="5">Waiting for Underwriting</option>
												</select>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>SPAJ Status Date</label>
											</div>
											<div className="col-sm-6" style={{padding:'0px'}}>
												<div className="form-horizontal" style={{margin:'0px'}}>
													<div className="col-sm-5">
														<DatePicker className="form-control" id="spaj_status_start_date" name="spaj_status_start_date" />	
													</div>
													<div className="col-sm-1">
														<label>to</label>
													</div>
													<div className="col-sm-5">
														<DatePicker className="form-control" id="spaj_status_end_date" name="spaj_status_end_date" />	
													</div>
												</div>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Receive Date</label>
											</div>
											<div className="col-sm-6" style={{padding:'0px'}}>
												<div className="form-horizontal" style={{margin:'0px'}}>
													<div className="col-sm-5">
														<DatePicker className="form-control" id="spaj_receive_start_date" name="spaj_receive_start_date" />	
													</div>
													<div className="col-sm-1">
														<label>to</label>
													</div>
													<div className="col-sm-5">
														<DatePicker className="form-control" id="spaj_receive_end_date" name="spaj_receive_end_date" />	
													</div>
												</div>
											</div>
										</div>
										{/* <div className="col-sm-12">
											<div className="form-horizontal">
												<div className="col-sm-6">
													<div className="form-group">
														<div className="col-sm-6">
															<label>SPAJ Status Date</label>
														</div>

														<div className="col-sm-6">
															<DatePicker className="form-control" id="spaj_status_start_date" name="spaj_status_start_date" />	
														</div>
													</div>
												</div>

												<div className="col-sm-6">
													<div className="form-group">
														<div className="col-sm-1">
															<label>to</label>
														</div>
														<div className="col-sm-6">
														<DatePicker className="form-control" id="spaj_status_end_date" name="spaj_status_end_date" />	
														</div>
													</div>
												</div>
											</div>
										</div> */}

									</form>
								</div>

								<div className="col-sm-6">
									<form className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Name</label>
											</div>
											<div className="col-sm-6">
												<input type="text" className="form-control" id="agent_name" name="agent_name" value={this.state.param.agent_name} onChange={this.handleChangeData}/>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Code</label>
											</div>
											<div className="col-sm-6">
												<input type="text" className="form-control" id="agent_code" name="agent_code" value={this.state.param.agent_code} onChange={this.handleChangeData}/>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Level</label>
											</div>
											<div className="col-sm-6">
												<select className="form-control" id="agent_level" name="agent_level" onChange={this.handleChangeData}>
													<option value="">All Level</option>
													<option value="5">RD</option>
													<option value="6">RMB</option>
													<option value="7">AMB</option>
													<option value="8">RMP</option>
													<option value="14">AMP</option>
													<option value="9">FC</option>
												</select>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Agent Status</label>
											</div>
											<div className="col-sm-6">
												<select className="form-control" id="agent_status" name="agent_status" onChange={this.handleChangeData}>
													<option value="">All Status</option>
													<option value="1">Active</option>
													<option value="2">Terminate</option>
													<option value="3">Resign</option>
													<option value="4">Other Agent Status</option>
												</select>
											</div>
										</div>

										<div className="form-group">
											<div className="col-sm-6">
												<label>Branch</label>
											</div>
											<div className="col-sm-6">
												<select className="form-control" id="branch" name="branch" value={this.state.param.branch} onChange={this.handleChangeData}>
													{listBranch}
												</select>
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6">
												<label>Payment Mode</label>
											</div>
											<div className="col-sm-6">
												<select className="form-control" id="spaj_payment_mode" name="spaj_payment_mode" onChange={this.handleChangeData}>
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

									</form>
								</div>
							</div>
						</div>

						<div className="col-sm-12">

							<div className="pull-right">
								<button className="btn btn-primary btn-block" type="button" onClick={() => this.getData()}>Search</button>
								<div className="clearfix h25"></div>
							</div>
						</div>

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
									<table className="table table-bordered table-striped table-hover table-box">
										<thead>
											<tr>
												<th className="header_table">No</th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "spaj_number")}>SPAJ No</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "policy_holder")}>Policy Holder</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "insured")}>Insured</a></th>
												<th className="header_table" style={{width:100 + 'px'}}><a onClick={this.itemSorting.bind(this, "receive_date")}>Receive Date</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "premium_mode")}>Payment Mode</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "agent_name")}>Agent Name</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "agent_level")}>Agent Level</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "agent_status")}>Agent Status</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "spaj_status")}>SPAJ Status</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "pending_notes")}>Pending Notes</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "status_date")}>SPAJ Status Date</a></th>
												<th className="header_table"><a onClick={this.itemSorting.bind(this, "branch")}>Branch</a></th>
											</tr>
											<tr key="header_list_policy_filter">
												<th className="header_table"></th>
												<th className="header_table"><input type="text" name="spaj_number" onChange={this._onFilterChange.bind(this, "spaj_number")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_holder" onChange={this._onFilterChange.bind(this, "policy_holder")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="insured" onChange={this._onFilterChange.bind(this, "insured")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="receive_date" onChange={this._onFilterChange.bind(this, "receive_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="premium_mode" onChange={this._onFilterChange.bind(this, "premium_mode")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_name" onChange={this._onFilterChange.bind(this, "agent_name")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_level" onChange={this._onFilterChange.bind(this, "agent_level")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_status" onChange={this._onFilterChange.bind(this, "agent_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="spaj_status" onChange={this._onFilterChange.bind(this, "spaj_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="pending_notes" onChange={this._onFilterChange.bind(this, "pending_notes")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="status_date" onChange={this._onFilterChange.bind(this, "status_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="branch" onChange={this._onFilterChange.bind(this, "branch")} className="form-control" /></th>
											</tr>
										</thead>
										<tbody>
											{policies}
										</tbody>
										<tfoot>
											<tr>
												{localStorage.getItem('role') == 17 || localStorage.getItem('role') == 18 || localStorage.getItem('role') == 19 || localStorage.getItem('role') == 20 || (localStorage.getItem('role') == 5 && localStorage.getItem('agent_code').charAt(0) == '9') || localStorage.getItem('username')=='user.banca' ? '' : <th colSpan="13"><button style={{marginRight:'10px'}} className="btn btn-primary" onClick={() => this.downloadSpaj('excel')}>Export as XLSX</button></th>}
											</tr>
										</tfoot>
									</table>
									</div>
								{/* <div className="export-action">
									<button className="btn btn-primary" onClick={this.exportSPAJ}>Export</button>
								</div> */}
							</div>
						</div>

					</div>

					<div className="clearfix"></div>
				</div>
			</div>
			<Loading />
			<Footer />

		</div>
		);
	}
}

export default new_business_inquiry;
