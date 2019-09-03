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
import {MIME_TYPE} from '../../common_components/helper/constant';
import FeatureModal from '../../common_components/modal/feature_modal';
import Pager from 'react-pager';

var FileSaver = require('file-saver');

const SortType = {
	DESC : 'DESC',
	ASC : 'ASC'
  }
  
class premium_due_data extends React.Component {
	constructor(props){
		super(props);

		var default_agent_code = localStorage.getItem('agent_code');

		this.state = {
			data: null,
			filterd_data : null,
			sort : SortType.DESC,
			activeSorting : '',
			param: {
				policy_no:"",
				policy_holder_name:"",
				insured:"",
				branch:"",
				leader_name:"",
				leader_code:"",
				agent_name:"",
				agent_code:"",
				agent_status:"",
				grace_period_start:"",
				grace_period_end:"",
				// product:"",
				display_group:"true",
				effective_date:"",
				policy_effective_date_start:"",
				policy_effective_date_end:"",
				product_name:"",
				payment_mode:"",
				export:"",
				page:"1",
				offset: "10",
				due_date:"1",
				'export':''
			},
			total : 0,
			total_data : 0,
			current : 0,
			visiblePages : 3
		}

		this.handlePageChanged = this.handlePageChanged.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
		this.handleChangeRow = this.handleChangeRow.bind(this);
		this.downloadPremiumDate = this.downloadPremiumDate.bind(this);
        this.openMenu = this.openMenu.bind(this);
        this.itemSorting = this.itemSorting.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);
	}

	componentDidMount(){
		this.getData();
	}

	getData(){

		var param_date_start = $('[name=policy_effective_date_start]').val();
		var param_date_end = $('[name=due_date_end]').val();
		var grace_period_start = $('[name=grace_period_start]').val();
		var grace_period_end = $('[name=grace_period_end]').val();		

		this.state.param.due_date_start = param_date_start;
		this.state.param.due_date_end = param_date_end;
		this.state.param.grace_period_start = grace_period_start;
		this.state.param.grace_period_end = grace_period_end;
		this.state.param.page = '1';
		this.state.param.export = '';

		$('#loading').modal('show');
		$.ajax({
            url: api_route.claim_PremiumDue,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param,
            success: (response) => {
              $('#loading').modal('hide');

			  var num_data = response.content.policy_list || [];
			  var total_page = response.content.total_pages;
              this.setState({
              	  data:response.content,
					filterd_data: num_data,
					// total_data: response.content.total_claim,
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
		  }else if(content == "premium_due_date"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				var x = a.premium_duedate.toLowerCase();
				var y = b.premium_duedate.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.premium_duedate.toLowerCase();
				var y = a.premium_duedate.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
			  });
			}
		  }else if(content == "grace_period"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.grace_period;
				var y = b.grace_period;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.grace_period;
				var y = a.grace_period;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "premium_amount"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.total_premium;
				var y = b.total_premium;
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.total_premium;
				var y = a.total_premium;
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
        }else if(content == "product"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.product.toLowerCase();
				var y = b.product.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.product.toLowerCase();
				var y = a.product.toLowerCase();
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
		  else if(cellDataKey == "premium_due_date")
			var v = this.state.data.policy_list[index].premium_duedate;
		  else if(cellDataKey == "grace_period")
			var v = this.state.data.policy_list[index].grace_period;
          else if(cellDataKey == "premium_amount")
			var v = this.state.data.policy_list[index].total_premium;
          else if(cellDataKey == "premium_mode")
            var v = this.state.data.policy_list[index].payment_mode;
          else if(cellDataKey == "product")
            var v = this.state.data.policy_list[index].product;
          else if(cellDataKey == "agent_name")
			var v = this.state.data.policy_list[index].agent.full_name;
		  else if(cellDataKey == "agent_level")
			var v = this.state.data.policy_list[index].agent.user.level;
		  else if(cellDataKey == "agent_status")
			var v = this.state.data.policy_list[index].agent.status;
          else if(cellDataKey == "phone")
			var v = this.state.data.policy_list[index].policy_holder.clientphone_set[1].number;	
					
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

	handleChangeRow(){
		this.state.param.offset= $('#offset').val();
		this.state.param.page = '1';
		this.state.param.export = '';
		$('#loading').modal('show');

		$.ajax({
            url: api_route.claim_PremiumDue,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param,
            success: (response) => {
              $('#loading').modal('hide');

							var num_data = response.content.policy_list || [];
							var total_page = response.content.total_pages;
										this.setState({
												data:response.content,
								filterd_data: num_data,
								// total_data: response.content.total_claim,
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
	handlePageChanged(newPage){
		
		this.state.param.page = newPage;
		this.state.param.export = '';

		$('#loading').modal('show');
		$.ajax({
			url: api_route.claim_PremiumDue,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			
			var num_data = response.content.policy_list || [];
			var total_page = response.content.total_pages;
			this.setState({
					data:response.content,
					filterd_data: num_data,
					// total_data: response.content.total_claim,
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
	downloadPremiumDate(file){

		this.state.param.export = file;
		let ext = "";
		if(file == 'pdf'){
			ext = ".pdf";
		} else{
			ext = ".xlsx";
		}
		$('#loading').modal('show');

		$.ajax({
						url: api_route.claim_PremiumDue,
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
				FileSaver.saveAs(blob, "premiumDueDate " + localStorage.agent_code + ext);
						},
						error: (err, response) => {
							$('#loading').modal('hide');
				alert("something wrong");
						}
				});
	}

	// downloadPremiumDate(){

	// 	this.state.param.export = 'excel';

	// 	$('#loading').modal('show');

	// 	$.ajax({
  //           url: api_route.claim_PremiumDue,
  //           headers: {
	// 	        'Authorization':'JWT '+sessionStorage.getItem('token')
	// 	    },
  //           type: 'POST',
	// 		data: this.state.param,		
	// 		dataType: 'binary',			
  //           // contentType: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet',
  //           success: (response) => {
  //             	$('#loading').modal('hide');

	// 			var blob = new Blob([response], {type: MIME_TYPE.XSLX + ";charset=utf-8"});
	// 			FileSaver.saveAs(blob, "premiumDueDate" + localStorage.agent_code + ".xlsx");

	// 			// //  var blob = new Blob([response], {type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"});
	// 			//  var blob = new Blob([response], {type: MIME_TYPE.XSLX});
	// 			//  var objectUrl = URL.createObjectURL(blob);
	// 			//  window.open(objectUrl);
  //           },
  //           error: (err, response) => {
  //             $('#loading').modal('hide');
	// 		  alert("something wrong");
	// 		//   if(err.responseJSON){
	// 		// 	  alert('Session expired, please login');
	// 		//   	  window.location.href="/";
  //           //   	//window.location.href = window.location.href.split('#')[0] + '#/';
  //           //   }else{
	// 		// 	  alert('Please check your connection');
	// 		//   }

  //           }
  //       });
	// }

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	render(){
		let data = this.state.filterd_data;
		let policies = [];

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
							insured += value.person== null? '' : value.person.name + "\n";
						})
					{ /* PolicyNo, Policy Status, Policy Holder, Insured, Policy Effective Date, Next Premium Due Date, Premium Amount, Premium Mode, 
						Premium Method, Agent Name, Agent Level, Agent Status, Premium Due Document */ }

					let phone = 'Not Available';

					try
					{
						phone = value.policy_holder != null ? value.policy_holder.clientphone_set != null ? value.policy_holder.clientphone_set[1].number != null ? value.policy_holder.clientphone_set[1].number : '' :'':'';
						//value.policy_holder.clientphone_set[1].number;
					}
					catch(e)
					{

					}

					num += 1;

					row = <tr key={index}>
							<td>{num}</td>
							<td>{value.number}</td>
							<td>{value.status}</td>
							<td>{value.policy_holder== null? '' : value.policy_holder.name == null ? '' : value.policy_holder.name}</td>
							<td>{insured}</td>
							<td>{DateFormat(value.effective_date)}</td>
							<td>{DateFormat(value.premium_duedate)}</td>
							<td>{value.grace_period}</td>				
							<td>{MoneyFormat(value.total_premium)}</td>
							<td>{value.payment_mode}</td>
							<td>{value.product}</td>											
							<td>{value.agent == null ? '' : value.agent.full_name == null ? '' : value.agent.full_name}</td>
							<td>{(value.agent ==null? '' : value.agent.user == null? '' : value.agent.user.level == null ? '' : value.agent.user.level.type == null ? '' :value.agent.user.level.type)}</td>
							<td>{value.agent == null ? '' : value.agent.status == null ? '' : value.agent.status}</td>
							<td>{phone}</td>							
						</tr>
					policies.push(row);

	        });
		}
		else {
			let row = <tr>
						<td colSpan="15" style={{'textAlign':'center'}}>No data.</td>
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
    		<TopMenuNewBusinessDetail title="Premium Due Data"  opsi="spajt" id={this.props.params.spaj_id} />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li className="active">Premium Due Data</li>
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

					<LeftMenuInquiry active="3"/>

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
												<label>Policy Holder Name</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="policy_holder_name" name="policy_holder_name" value={this.state.param.policy_holder_name} onChange={this.handleChangeData} />
											</div>
										</div>

										{<div className="form-group">
											<div className="col-sm-6">
												<label>Leader Name</label>
											</div>

											<div className="col-sm-6">
												<input type="text" className="form-control" id="leader_name" name="leader_name" value={this.state.param.leader_name} onChange={this.handleChangeData} />
											</div>
										</div>}

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
										
										{/* <div className="form-group">
											<div className="col-sm-3">
												<label>Product</label>
											</div>

											<div className="col-sm-7">
												<input type="text" className="form-control" id="product" name="product" value={this.state.param.product} onChange={this.handleChangeData} />
											</div>
										</div> */}
									</div>
								</div>

								<div className="col-sm-6">
									<div className="form-horizontal">
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
												<label>Product Name</label>
											</div>

											<div className="col-sm-7">
												<select className="form-control" id="product_name" name="product_name" onChange={this.handleChangeData}>
													{product_list}
												</select>
												{/* <input type="text" className="form-control" id="product_name" name="product_name" value={this.state.param.product_name} onChange={this.handleChangeData} /> */}
											</div>
										</div>
										{<div className="form-group">
											<div className="col-sm-3">
												<label>Leader Code</label>
											</div>

											<div className="col-sm-7">
												<input type="text" className="form-control" id="leader_code" name="leader_code" value={this.state.param.leader_code} onChange={this.handleChangeData} />
											</div>
										</div>}
										
										<div className="form-group">
											<div className="col-sm-3">
												<label>Agent Code</label>
											</div>

											<div className="col-sm-7">
												<input type="text" className="form-control" id="agent_code" name="agent_code" value={this.state.param.agent_code} onChange={this.handleChangeData} />
											</div>
										</div>

										<div className="form-group">
											
											<div className="col-sm-3">
												<label>Premium Due Date</label>
											</div>

											<div className="col-sm-3">
												<DatePicker className="form-control" id="policy_effective_date_start" name="policy_effective_date_start" />
											</div>

											<div className="col-md-1">
												<label>to</label>
											</div>
											<div className="col-sm-3">
												<DatePicker className="form-control" id="due_date_end" name="due_date_end" />
											</div>

										</div>
										
										<div className="form-group">
											
											<div className="col-sm-3">
												<label>Grace Periode</label>
											</div>

											<div className="col-sm-3">
												<input type="number" className="form-control" id="grace_period_start" name="grace_period_start" />
											</div>

											<div className="col-md-1">
												<label>to</label>
											</div>
											<div className="col-sm-3">
												<input type="number" className="form-control" id="grace_period_end" name="grace_period_end" />
											</div>

										</div>
										<div className="form-group">
											<div className="col-sm-3">
												<label>Display Group?</label>
											</div>

											<div className="col-sm-1 text-left">
											  <div className="checkbox">
												<label>
												  <input type="checkbox" id="display_group" className="form-control" name="display_group" value={this.state.param.display_group} onChange={this.handleChangeData} checked={checked} />
												</label>
											  </div>
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
									<select className="form-control" id="offset" name="offset" onChange={this.handleChangeRow} style={{width:'100px'}}>
										<option value="10">10</option>
										<option value="20">20</option>
										<option value="50">50</option>
									</select>
								</div>
								<div>
									<nav aria-label="Page navigation">
										<ul className="pagination">
											{paging}
										</ul>
									</nav>
								</div>
								<div className="scroll-h" style={{'overflow-x':'auto'}}>
									
									<table className="table table-bordered table-striped table-hover text-center table-box fix-table" style={{'width':'2000px'}}>
										<thead>
											
											<tr>
												<th className="header_table valign-middle text-center">No</th>
												<th style={{'width':'100px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_number")}>Policy No</a></th>
												<th style={{'width':'100px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "status")}>Status</a></th>
												<th style={{'width':'150px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_holder")}>Policy Holder</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "insured")}>Insured</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_effective_date")}>Policy Effective Date</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "premium_due_date")}>Premium Due Date</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "grace_period")}>#Days Grace Period</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "premium_amount")}>Premium Amount</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "premium_mode")}>Premium Mode</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "product")}>Product</a></th>												
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_name")}>Agent Name</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_level")}>Agent Level</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_status")}>Agent Status</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "phone")}>Phone</a></th>												
												{/*<th className="header_table valign-middle text-center">Premium Due Document</th>*/}
											</tr>
											<tr key="header_list_policy_filter">
												<th className="header_table"></th>
												<th className="header_table"><input type="text" name="policy_number" onChange={this._onFilterChange.bind(this, "policy_number")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="status" onChange={this._onFilterChange.bind(this, "status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_holder" onChange={this._onFilterChange.bind(this, "policy_holder")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="insured" onChange={this._onFilterChange.bind(this, "insured")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_effective_date" onChange={this._onFilterChange.bind(this, "policy_effective_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="premium_due_date" onChange={this._onFilterChange.bind(this, "premium_due_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="grace_period" onChange={this._onFilterChange.bind(this, "grace_period")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="premium_amount" onChange={this._onFilterChange.bind(this, "premium_amount")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="premium_mode" onChange={this._onFilterChange.bind(this, "premium_mode")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="product" onChange={this._onFilterChange.bind(this, "product")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_name" onChange={this._onFilterChange.bind(this, "agent_name")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_level" onChange={this._onFilterChange.bind(this, "agent_level")} className="form-control" /></th>
												{/* <th className="header_table"><input type="text" name="agent_status" onChange={this._onFilterChange.bind(this, "agent_status")} className="form-control" /></th> */}
												<th className="header_table"><input type="text" name="agent_status" onChange={this._onFilterChange.bind(this, "agent_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="phone" onChange={this._onFilterChange.bind(this, "phone")} className="form-control" /></th>
												{/* <th className="header_table"><input type="text" name="policy_status_date" onChange={this._onFilterChange.bind(this, "policy_status_date")} className="form-control" /></th> */}
											</tr>
										</thead>
										<tbody>
											{policies}
										</tbody>
										<tfoot>
											<tr>
											{localStorage.getItem('role') == 17 || localStorage.getItem('role') == 18 || localStorage.getItem('role') == 19 || localStorage.getItem('role') == 20 || (localStorage.getItem('role') == 5 && localStorage.getItem('agent_code').charAt(0) == '9') || localStorage.getItem('username')=='user.banca' ? '' : <th colSpan="15"><button style={{marginRight:'10px'}} className="btn btn-primary" onClick={() => this.downloadPremiumDate('excel')}>Export as XLSX</button></th>}
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

export default premium_due_data;
