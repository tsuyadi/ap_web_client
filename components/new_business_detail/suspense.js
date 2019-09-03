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
class suspense extends React.Component {
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
				display_group:"true",
				payment_receive_date_start:"",
				payment_receive_date_end:"",
				effective_date_start:"",
				effective_date_end:"",
				next_premium_date_start:"",
				next_premium_date_end:"",
				policy_status :"",
				product_name:"",
				payment_mode:"",
				export:"",
				page:"1",
				offset: "",
				'export':''
			},
			total : 0,
			current : 0,
			visiblePages : 3
		}

		this.handlePageChanged = this.handlePageChanged.bind(this);
		this.handleChangeData = this.handleChangeData.bind(this);
        this.openMenu = this.openMenu.bind(this);
		this._onFilterChange = this._onFilterChange.bind(this);
		this.downloadSuspense = this.downloadSuspense.bind(this);
		this.itemSorting = this.itemSorting.bind(this);
	}

	componentDidMount(){
		this.getData();
	}

	getData(){

		// var payment_receive_date_start = $('[name=payment_receive_date_start]').val();
		// var payment_receive_date_end = $('[name=payment_receive_date_end]').val();
		var effective_date_start = $('[name=effective_date_start]').val();
		var effective_date_end = $('[name=effective_date_end]').val();
		var next_premium_date_start = $('[name=next_premium_date_start]').val();
		var next_premium_date_end = $('[name=next_premium_date_end]').val();

		// this.state.param.payment_receive_date_start = payment_receive_date_start;
		// this.state.param.payment_receive_date_end = payment_receive_date_end;
		this.state.param.next_premium_date_start = next_premium_date_start;
		this.state.param.next_premium_date_end = next_premium_date_end;
		this.state.param.effective_date_start = effective_date_start;
		this.state.param.effective_date_end = effective_date_end;
		this.state.param.page = '1';
		this.state.param.export = '';

		$('#loading').modal('show');
		$.ajax({
            url: api_route.policy_suspense,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data: this.state.param,
            success: (response) => {
              $('#loading').modal('hide');

			  var num_data = response.content.suspense_list || [];
			  var total_page = response.content.total_pages;
              this.setState({
				filterd_data: num_data,
              	  data:response.content,
				  total : total_page
			  });
			//   if(localStorage.getItem('role')== 11 || localStorage.getItem('role')== 12 || localStorage.getItem('role')== 13 || localStorage.getItem('role')== 15 || localStorage.getItem('role')== 16){
			// 	var tabel = document.getElementById('suspenseTable');
			// 	var allRows = tabel.rows;
			// 	for (var i=0; i< allRows.length; i++) {
			// 		if (allRows[i].cells.length > 1) {
			// 		 allRows[i].deleteCell(20);
			// 		 allRows[i].deleteCell(20);
			// 		}
			// 	   }
			// }
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
		$.ajax({
			url: api_route.policy_suspense,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			data: this.state.param,
			success: (response) => {
			$('#loading').modal('hide');
			var num_data = response.content.suspense_list || [];
			var total_page = response.content.total_pages;
			// // debugger di listpolicies ajax

				this.setState({
					data: response.content,
					filterd_data: num_data,
					total: total_page
				});

				// if(localStorage.getItem('role')== 11 || localStorage.getItem('role')== 12 || localStorage.getItem('role')== 13 || localStorage.getItem('role')== 15 || localStorage.getItem('role')== 16){
				// 	var tabel = document.getElementById('suspenseTable');
				// 	var allRows = tabel.rows;
				// 	for (var i=0; i< allRows.length; i++) {
				// 		if (allRows[i].cells.length > 1) {
				// 		 allRows[i].deleteCell(20);
				// 		 allRows[i].deleteCell(20);
				// 		}
				// 	   }
				// }
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
    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }


    itemSorting(e, type){
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
    }

    _sorting(data, content, type){
        if(content == "policy_no"){
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
        }else if(content == "spaj_no"){
			if(type == SortType.ASC){
				data.sort(function(a, b){
					var x = a.spaj_number.toLowerCase();
					var y = b.spaj_number.toLowerCase();
					if (x < y) {return -1;}
					if (x > y) {return 1;}
					return 0;
				});
			  }else{
				data.sort(function(a, b){
					var x = b.spaj_number.toLowerCase();
					var y = a.spaj_number.toLowerCase();
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
        }else if(content == "policy_status"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.policy_status.toLowerCase();
				var y = b.policy_status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.policy_status.toLowerCase();
				var y = a.policy_status.toLowerCase();
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
		  }else if(content == "due_date"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				  var x = a.next_premium_due_date != null ? a.next_premium_due_date.toLowerCase() : '';
				  var y = b.next_premium_due_date != null ? b.next_premium_due_date.toLowerCase() : '';
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}else{
			  data.sort(function(a, b){
				var x = b.next_premium_due_date != null ? b.next_premium_due_date.toLowerCase() : '';
				var y = a.next_premium_due_date != null ? a.next_premium_due_date.toLowerCase() : '';
				if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}
		  }
		  else if(content == "product"){
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
        }else if(content == "installment_premium"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				return a.installment_premium - b.installment_premium;
			  });
			}else{
			  data.sort(function(a, b){
				return b.installment_premium - a.installment_premium;
			  });
			}
		  }else if(content == "payment_frequency"){
			if(type == SortType.ASC){
				data.sort(function(a, b){
					var x = a.payment_frequency.toLowerCase();
					var y = b.payment_frequency.toLowerCase();
					if (x < y) {return -1;}
					if (x > y) {return 1;}
					return 0;
				});
			  }else{
				data.sort(function(a, b){
					var x = b.payment_frequency.toLowerCase();
					var y = a.payment_frequency.toLowerCase();
					if (x < y) {return -1;}
					if (x > y) {return 1;}
					return 0;
				});
			  }
		  }else if(content == "payment_receive_date"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.payment_receive_date.toLowerCase();
				var y = b.payment_receive_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.payment_receive_date.toLowerCase();
				var y = a.payment_receive_date.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "suspense_amount"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.suspense_amount - b.suspense_amount;
            });
          }else{
            data.sort(function(a, b){
              return b.suspense_amount - a.suspense_amount;
            });
          }
        }else if(content == "currency"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				if(a.currency != undefined || b.currency != undefined){
					return a.currency - b.currency;
				}
			  });
			}else{
			  data.sort(function(a, b){
				if(a.currency != undefined || b.currency != undefined){
					return b.currency - a.currency;
				}
			  });
			}
		  }else if(content == "branch"){
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
        }else if(content == "producer_code"){
			if(type == SortType.ASC){
				data.sort(function(a, b){
				  return a.producer_code - b.producer_code;
				});
			  }else{
				data.sort(function(a, b){
				  return b.producer_code - a.producer_code;
				});
			  }
        }else if(content =="producer_name"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.producer_name.toLowerCase();
				var y = b.producer_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.producer_name.toLowerCase();
				var y = a.producer_name.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "producer_status"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
				var x = a.producer_status.toLowerCase();
				var y = b.producer_status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }else{
            data.sort(function(a, b){
				var x = b.producer_status.toLowerCase();
				var y = a.producer_status.toLowerCase();
				if (x < y) {return -1;}
				if (x > y) {return 1;}
				return 0;
            });
          }
        }else if(content == "amb"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				  var x = a.amb_name.toLowerCase();
				  var y = b.amb_name.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}else{
			  data.sort(function(a, b){
				  var x = b.amb_name.toLowerCase();
				  var y = a.amb_name.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}
		  }
		  else if(content == "amb_status"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				  var x = a.amb_status.toLowerCase();
				  var y = b.amb_status.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}else{
			  data.sort(function(a, b){
				  var x = b.amb_status.toLowerCase();
				  var y = a.amb_status.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}
		  }else if(content == "rmb"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				  var x = a.rmb_name.toLowerCase();
				  var y = b.rmb_name.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}else{
			  data.sort(function(a, b){
				  var x = b.rmb_name.toLowerCase();
				  var y = a.rmb_name.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}
		  }else if(content == "rmb_status"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				  var x = a.rmb_status.toLowerCase();
				  var y = b.rmb_status.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}else{
			  data.sort(function(a, b){
				  var x = b.rmb_status.toLowerCase();
				  var y = a.rmb_status.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}
		  }else if(content == "rd"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				  var x = a.rd_name.toLowerCase();
				  var y = b.rd_name.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}else{
			  data.sort(function(a, b){
				  var x = b.rd_name.toLowerCase();
				  var y = a.rd_name.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}
		  }else if(content == "rd_status"){
			if(type == SortType.ASC){
			  data.sort(function(a, b){
				  var x = a.rd_status.toLowerCase();
				  var y = b.rd_status.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}else{
			  data.sort(function(a, b){
				  var x = b.rd_status.toLowerCase();
				  var y = a.rd_status.toLowerCase();
				  if (x < y) {return -1;}
				  if (x > y) {return 1;}
				  return 0;
			  });
			}
		  }else if(content == "policy_holder_mobile"){
			if(type == SortType.ASC){
				data.sort(function(a, b){
					var x = a.policy_holder_mobile_number.toLowerCase();
					var y = b.policy_holder_mobile_number.toLowerCase();
					if (x < y) {return -1;}
					if (x > y) {return 1;}
					return 0;
				});
			  }else{
				data.sort(function(a, b){
					var x = b.policy_holder_mobile_number.toLowerCase();
					var y = a.policy_holder_mobile_number.toLowerCase();
					if (x < y) {return -1;}
					if (x > y) {return 1;}
					return 0;
				});
			  }
		  }else if(content == "agent_mobile"){
			if(type == SortType.ASC){
				data.sort(function(a, b){
					var x = a.agent_mobile_number.toLowerCase();
					var y = b.agent_mobile_number.toLowerCase();
					if (x < y) {return -1;}
					if (x > y) {return 1;}
					return 0;
				});
			  }else{
				data.sort(function(a, b){
					var x = b.agent_mobile_number.toLowerCase();
					var y = a.agent_mobile_number.toLowerCase();
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
        if(!event.target.value){
          this.setState({
            filterd_data: this.state.data.suspense_list
          });
        }

        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.data.suspense_list.length;
        var filteredList = [];

        for (var index = 0; index < size; index++){
          if(cellDataKey == "policy_no")
            var v = this.state.data.suspense_list[index].policy_number;
          else if(cellDataKey == "spaj_no")
            var v = this.state.data.suspense_list[index].spaj_number;
          else if(cellDataKey == "policy_holder")
            var v = this.state.data.suspense_list[index].policy_holder_name;
          else if(cellDataKey == "insured")
            var v = this.state.data.suspense_list[index].insured_name;
          else if(cellDataKey == "policy_status")
            var v = this.state.data.suspense_list[index].policy_status;
          else if(cellDataKey == "effective_date")
            var v = this.state.data.suspense_list[index].effective_date == null ? '' : DateFormat(this.state.data.suspense_list[index].effective_date);
          else if(cellDataKey == "due_date")
            var v = this.state.data.suspense_list[index].next_premium_due_date == null ? '' : DateFormat(this.state.data.suspense_list[index].next_premium_due_date);
          else if(cellDataKey == "product")
            var v = this.state.data.suspense_list[index].product;
          else if(cellDataKey == "installment_premium")
            var v = this.state.data.suspense_list[index].installment_premium;
          else if(cellDataKey == "payment_frequency")
            var v = this.state.data.suspense_list[index].payment_frequency;
          else if(cellDataKey == "payment_receive_date")
            var v = this.state.data.suspense_list[index].payment_receive_date == null ? '' : DateFormat(this.state.data.suspense_list[index].payment_receive_date);
          else if(cellDataKey == "suspense_amount")
			var v = this.state.data.suspense_list[index].suspense_amount;
			else if(cellDataKey == "currency")
			var v = this.state.data.suspense_list[index].currency == undefined || this.state.data.suspense_list[index].currency == null? '' : this.state.data.suspense_list[index].currency;
		else if(cellDataKey == "branch")
			var v = this.state.data.suspense_list[index].branch;
		else if(cellDataKey == "producer_code")
            var v = this.state.data.suspense_list[index].producer_code;
          else if(cellDataKey == "producer_name")
            var v = this.state.data.suspense_list[index].producer_name;
          else if(cellDataKey == "producer_status")
            var v = this.state.data.suspense_list[index].producer_status;
          else if(cellDataKey == "amb")
            var v = this.state.data.suspense_list[index].amb_name;
          else if(cellDataKey == "amb_status")
            var v = this.state.data.suspense_list[index].amb_status;
          else if(cellDataKey == "rmb")
            var v = this.state.data.suspense_list[index].rmb_name;
          else if(cellDataKey == "rmb_status")
            var v = this.state.data.suspense_list[index].rmb_status;
          else if(cellDataKey == "rd")
            var v = this.state.data.suspense_list[index].rd_name;
          else if(cellDataKey == "rd_status")
            var v = this.state.data.suspense_list[index].rd_status;
          else if(cellDataKey == "policy_holder_mobile")
            var v = this.state.data.suspense_list[index].policy_holder_mobile_number;
          else if(cellDataKey == "agent_mobile")
            var v = this.state.data.suspense_list[index].agent_mobile_number== 0 ? '' : this.state.data.suspense_list[index].agent_mobile_number ;

			v = v != null ? v : '';
          if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
            filteredList.push(this.state.data.suspense_list[index]);
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
          filterd_data : filteredList,
          // total : total_page
        });
				debugger;
    }
		downloadSuspense(file){

			this.state.param.export = file;
			let ext = "";
			if(file == 'pdf'){
				ext = ".pdf";
			} else{
				ext = ".xls";
			}
			$('#loading').modal('show');

			$.ajax({
							url: api_route.policy_suspense,
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
					FileSaver.saveAs(blob, "Suspense " + localStorage.agent_code + ext);
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
		let cols = "26";

		let listBranch = [];

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

		if(localStorage.getItem('role')== 11 || localStorage.getItem('role')== 12 || localStorage.getItem('role')== 13 || localStorage.getItem('role')== 15 || localStorage.getItem('role')== 16){
			cols = "24";
		}

		if(data && data.length > 0)
		{

			let offs = this.state.param.offset;
			let page = this.state.param.page;
			let num = (page - 1) * offs;
			$.map(data, (value, index) => {

					//let url = "#/newbusiness/policy_info/"+value.id;
					let row = null;
					num += 1;
					if(localStorage.getItem('role')== 11 || localStorage.getItem('role')== 12 || localStorage.getItem('role')== 13 || localStorage.getItem('role')== 15 || localStorage.getItem('role')== 16){
					row = <tr key={index}>
							<td>{num}</td>
							<td>{value.policy_number}</td>
							<td>{value.spaj_number}</td>
							<td>{value.policy_holder_name}</td>
							<td>{value.insured_name}</td>
							<td>{value.policy_status}</td>
							<td>{value.effective_date == null || value.effective_date == '-' ? '' : DateFormat(value.effective_date)}</td>
							<td>{value.next_premium_due_date == null ? '' : DateFormat(value.next_premium_due_date)}</td>
							<td>{value.product}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.installment_premium)}</td>
							<td>{value.payment_frequency}</td>
							{/* <td>{value.payment_receive_date == null ? '' : DateFormat(value.payment_receive_date)}</td> */}
							<td style={{textAlign:'right'}}>{MoneyFormat(value.suspense_amount)}</td>
							<td style={{textAlign:'right'}}>{value.currency == undefined || value.currency == null ? '0' : value.currency}</td>
							<td>{value.branch}</td>
							<td>{value.producer_code}</td>
							<td>{value.producer_name}</td>
							<td>{value.producer_status}</td>
							{/* <td>{value.amb_name}</td>
							<td>{value.amb_status}</td>							 */}
							<td>{value.rmb_name}</td>
							<td>{value.rmb_status}</td>
							<td>{value.rd_name}</td>
							<td>{value.rd_status}</td>
							<td>{value.policy_holder_mobile_number}</td>
							<td>{value.agent_mobile_number == 0 ? '' : value.agent_mobile_number}</td>
						</tr>
					}else{
						row = <tr key={index}>
							<td>{num}</td>
							<td>{value.policy_number}</td>
							<td>{value.spaj_number}</td>
							<td>{value.policy_holder_name}</td>
							<td>{value.insured_name}</td>
							<td>{value.policy_status}</td>
							<td>{value.effective_date == null || value.effective_date == '-' ? '' : DateFormat(value.effective_date)}</td>
							<td>{value.next_premium_due_date == null ? '' : DateFormat(value.next_premium_due_date)}</td>
							<td>{value.product}</td>
							<td style={{textAlign:'right'}}>{MoneyFormat(value.installment_premium)}</td>
							<td>{value.payment_frequency}</td>
							{/* <td>{value.payment_receive_date == null ? '' : DateFormat(value.payment_receive_date)}</td> */}
							<td style={{textAlign:'right'}}>{MoneyFormat(value.suspense_amount)}</td>
							<td style={{textAlign:'right'}}>{value.currency == undefined || value.currency == null ? '0' : value.currency}</td>
							<td>{value.branch}</td>
							<td>{value.producer_code}</td>
							<td>{value.producer_name}</td>
							<td>{value.producer_status}</td>
							<td>{value.amb_name}</td>
							<td>{value.amb_status}</td>
							<td>{value.rmb_name}</td>
							<td>{value.rmb_status}</td>
							<td>{value.rd_name}</td>
							<td>{value.rd_status}</td>
							<td>{value.policy_holder_mobile_number}</td>
							<td>{value.agent_mobile_number == 0 ? '' : value.agent_mobile_number}</td>
						</tr>
					}
					policies.push(row);

	        });
		}
		else {
			let row = <tr>
						<td colSpan={cols} style={{'textAlign':'center'}}>No data.</td>
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
    		<TopMenuNewBusinessDetail title="Suspense"  opsi="spajt" id={this.props.params.spaj_id} />

			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li className="active">Suspense</li>
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

					<LeftMenuInquiry active="5"/>

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
												</select>
												{/* <input type="text" className="form-control" id="status" name="status"  /> */}
											</div>
										</div>
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
												<label>Branch</label>
											</div>
											<div className="col-sm-7">
												<select className="form-control" id="branch" name="branch" value={this.state.param.branch} onChange={this.handleChangeData}>
													{listBranch}
												</select>
											</div>
										</div>

										{/* <div className="form-group">

											<div className="col-sm-3">
												<label>Payment Receive Date</label>
											</div>

											<div className="col-sm-3">
												<DatePicker className="form-control" id="payment_receive_date_start" name="payment_receive_date_start" />
											</div>

											<div className="col-md-1">
												<label>to</label>
											</div>
											<div className="col-sm-3">
												<DatePicker className="form-control" id="payment_receive_date_end" name="payment_receive_date_end" />
											</div>

										</div> */}

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
												<DatePicker className="form-control" id="effective_date_start" name="effective_date_start" />
											</div>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<div className="col-sm-1">
												<label>to</label>
											</div>
											<div className="col-sm-6">
												<DatePicker className="form-control" id="effective_date_end" name="effective_date_end" />
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
												<label>Next Premium Due Date</label>
											</div>

											<div className="col-sm-6">
												<DatePicker className="form-control" id="next_premium_date_start" name="next_premium_date_start" />
											</div>
										</div>
									</div>

									<div className="col-sm-6">
										<div className="form-group">
											<div className="col-sm-1">
												<label>to</label>
											</div>
											<div className="col-sm-6">
												<DatePicker className="form-control" id="next_premium_date_end" name="next_premium_date_end" />
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
											<input type="checkbox" id="display_group" className="form-control" name="display_group" value={this.state.param.display_group} onChange={this.handleChangeData} checked={checked} />
										</label>
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
									<nav aria-label="Page navigation">
										<ul className="pagination">
											{paging}
										</ul>
									</nav>
								</div>
								<div className="scroll-h" style={{'overflow-x':'auto'}}>

									<table className="table table-bordered table-striped table-hover text-center table-box fix-table" style={{'padding':'0px'}} id="suspenseTable">
									{localStorage.getItem('role')== 11 || localStorage.getItem('role')== 12 || localStorage.getItem('role')== 13 || localStorage.getItem('role')== 15 || localStorage.getItem('role')== 16 ?
										<thead>
											<tr>
											<th className="header_table valign-middle text-center">No</th>
											<th style={{'width':'100px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_no")}>Policy Number</a></th>
											<th style={{'width':'100px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "spaj_no")}>Spaj Number</a></th>
											<th style={{'width':'150px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_holder")}>Policy Holder Name</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "insured")}>Life Insured Name</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_status")}>Policy Status</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "effective_date")}>Policy Effective</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "due_date")}>Next Premium Due Date</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "product")}>Product</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "installment_premium")}>Installment Premium</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "payment_frequency")}>Payment Frequency</a></th>
											{/* <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "payment_receive_date")}>Payment Receive Date</a></th> */}
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "suspense_amount")}>Suspense Amount</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "currency")}>Currency</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "branch")}>Branch</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "producer_code")}>Producer Code</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "producer_name")}>Producer Name</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "producer_status")}>Producer Status</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rmb")}>TM</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rmb_status")}>TM Status</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rd")}>TD</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rd_status")}>TD Status</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_holder_mobile")}>Policy Holder Mobile</a></th>
											<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_mobile")}>Agent Mobile</a></th>
											{/*<th className="header_table valign-middle text-center">Premium Due Document</th>*/}
										</tr>
										<tr key="header_list_policy_filter">
												<th className="header_table"></th>
												<th className="header_table"><input type="text" name="policy_no" onChange={this._onFilterChange.bind(this, "policy_no")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="spaj_no" onChange={this._onFilterChange.bind(this, "spaj_no")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_holder" onChange={this._onFilterChange.bind(this, "policy_holder")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="insured" onChange={this._onFilterChange.bind(this, "insured")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_status" onChange={this._onFilterChange.bind(this, "policy_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="effective_date" onChange={this._onFilterChange.bind(this, "effective_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="due_date" onChange={this._onFilterChange.bind(this, "due_date")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="product" onChange={this._onFilterChange.bind(this, "product")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="installment_premium" onChange={this._onFilterChange.bind(this, "installment_premium")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="payment_frequency" onChange={this._onFilterChange.bind(this, "payment_frequency")} className="form-control" /></th>
												{/* <th className="header_table"><input type="text" name="payment_receive_date" onChange={this._onFilterChange.bind(this, "payment_receive_date")} className="form-control" /></th> */}
												<th className="header_table"><input type="text" name="suspense_amount" onChange={this._onFilterChange.bind(this, "suspense_amount")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="currency" onChange={this._onFilterChange.bind(this, "currency")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="branch" onChange={this._onFilterChange.bind(this, "branch")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="producer_code" onChange={this._onFilterChange.bind(this, "producer_code")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="producer_name" onChange={this._onFilterChange.bind(this, "producer_name")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="producer_status" onChange={this._onFilterChange.bind(this, "producer_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="rmb" onChange={this._onFilterChange.bind(this, "rmb")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="rmb_status" onChange={this._onFilterChange.bind(this, "rmb_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="rd" onChange={this._onFilterChange.bind(this, "rd")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="rd_status" onChange={this._onFilterChange.bind(this, "rd_status")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="policy_holder_mobile" onChange={this._onFilterChange.bind(this, "policy_holder_mobile")} className="form-control" /></th>
												<th className="header_table"><input type="text" name="agent_mobile" onChange={this._onFilterChange.bind(this, "agent_mobile")} className="form-control" /></th>
											</tr>
										</thead>
										:
										<thead>
										<tr>
												<th className="header_table valign-middle text-center">No</th>
												<th style={{'width':'100px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_no")}>Policy Number</a></th>
												<th style={{'width':'100px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "spaj_no")}>Spaj Number</a></th>
												<th style={{'width':'150px'}} className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_holder")}>Policy Holder Name</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "insured")}>Life Insured Name</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_status")}>Policy Status</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "effective_date")}>Policy Effective</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "due_date")}>Next Premium Due Date</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "product")}>Product</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "installment_premium")}>Installment Premium</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "payment_frequency")}>Payment Frequency</a></th>
												{/* <th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "payment_receive_date")}>Payment Receive Date</a></th> */}
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "suspense_amount")}>Suspense Amount</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "currency")}>Currency</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "branch")}>Branch</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "producer_code")}>Producer Code</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "producer_name")}>Producer Name</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "producer_status")}>Producer Status</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "amb")}>AMB</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "amb_status")}>AMB Status</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rmb")}>RMB</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rmb_status")}>RMB Status</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rd")}>RD</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "rd_status")}>RD Status</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "policy_holder_mobile")}>Policy Holder Mobile</a></th>
												<th className="header_table valign-middle text-center"><a onClick={this.itemSorting.bind(this, "agent_mobile")}>Agent Mobile</a></th>
												{/*<th className="header_table valign-middle text-center">Premium Due Document</th>*/}
											</tr>
										<tr key="header_list_policy_filter">
										<th className="header_table"></th>
										<th className="header_table"><input type="text" name="policy_no" onChange={this._onFilterChange.bind(this, "policy_no")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="spaj_no" onChange={this._onFilterChange.bind(this, "spaj_no")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="policy_holder" onChange={this._onFilterChange.bind(this, "policy_holder")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="insured" onChange={this._onFilterChange.bind(this, "insured")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="policy_status" onChange={this._onFilterChange.bind(this, "policy_status")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="effective_date" onChange={this._onFilterChange.bind(this, "effective_date")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="due_date" onChange={this._onFilterChange.bind(this, "due_date")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="product" onChange={this._onFilterChange.bind(this, "product")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="installment_premium" onChange={this._onFilterChange.bind(this, "installment_premium")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="payment_frequency" onChange={this._onFilterChange.bind(this, "payment_frequency")} className="form-control" /></th>
										{/* <th className="header_table"><input type="text" name="payment_receive_date" onChange={this._onFilterChange.bind(this, "payment_receive_date")} className="form-control" /></th> */}
										<th className="header_table"><input type="text" name="suspense_amount" onChange={this._onFilterChange.bind(this, "suspense_amount")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="currency" onChange={this._onFilterChange.bind(this, "currency")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="branch" onChange={this._onFilterChange.bind(this, "branch")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="producer_code" onChange={this._onFilterChange.bind(this, "producer_code")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="producer_name" onChange={this._onFilterChange.bind(this, "producer_name")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="producer_status" onChange={this._onFilterChange.bind(this, "producer_status")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="amb" onChange={this._onFilterChange.bind(this, "amb")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="amb_status" onChange={this._onFilterChange.bind(this, "amb_status")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="rmb" onChange={this._onFilterChange.bind(this, "rmb")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="rmb_status" onChange={this._onFilterChange.bind(this, "rmb_status")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="rd" onChange={this._onFilterChange.bind(this, "rd")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="rd_status" onChange={this._onFilterChange.bind(this, "rd_status")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="policy_holder_mobile" onChange={this._onFilterChange.bind(this, "policy_holder_mobile")} className="form-control" /></th>
										<th className="header_table"><input type="text" name="agent_mobile" onChange={this._onFilterChange.bind(this, "agent_mobile")} className="form-control" /></th>

									</tr>
										</thead>
										}
										<tfoot>
											<tr>
												{localStorage.getItem('role') == 17 || localStorage.getItem('role') == 18 || localStorage.getItem('role') == 19 || localStorage.getItem('role') == 20 || (localStorage.getItem('role') == 5 && localStorage.getItem('agent_code').charAt(0) == '9') || localStorage.getItem('username')=='user.banca' ? '' : <th colSpan={cols}><button style={{marginRight:'10px'}} className="btn btn-primary" onClick={() => this.downloadSuspense('excel')}>Export as XLSX</button></th>}
											</tr>
										</tfoot>
										<tbody>
											{policies}
										</tbody>
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

export default suspense;
