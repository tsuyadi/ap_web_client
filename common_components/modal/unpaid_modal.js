"use strict"

import React from 'react';
import api_route from '../api_route';
import {DateFormatYMD, DateFormat} from '../helper/formatter';
const SortType = {
    DESC : 'DESC',
    ASC : 'ASC'
  }
class UnpaidModal extends React.Component {

   constructor(props){
		super(props);

        this.state = {
            data : null,
            data_unpaid: null
            }
    }
    componentWillReceiveProps(p){
		$('#unpaid-modal').on('show.bs.modal', function(e) {
            $('#unpaid-body tr').remove();
            $('#loading').modal('hide');
            var date = $(e.relatedTarget).data('id');
            $.ajax({
                url: api_route.policy_unpaid,
                headers: {
                    'Authorization':'JWT '+sessionStorage.getItem('token')
                },
                data: {
                    'policy_id' : localStorage.getItem('policyid'),
                    'due_date' : date
                },
                type: 'POST',
                success: (response) => {
                    $('#loading').modal('hide');
                    var data = response.failed_due_date;
                    data.sort(function(a, b){
                        var x = a.transaction_date.toLowerCase();
                        var y = b.transaction_date.toLowerCase();
                        if (x < y) {return -1;}
                        if (x > y) {return 1;}
                        return 0;
                    });
                    
                    var height= ((response.failed_due_date.length * 30) + 20);
                    height = height +'px';
                    $('#content-unpaid').css(height,height);
                    if(response.failed_due_date.length == 0){
                        $('#unpaid-body').append("<tr><td colSpan='3' style={{'textAlign':'center'}}> No Data.</td></tr>");
                    }else{
                        $.map(data, (value, index) => {
                                let row= null;
                                row = "<tr key="+index+"> <td>"+DateFormat(value.current_due_date)+"</td><td>"+DateFormat(value.transaction_date)+"</td><td>"+value.description+"</td></tr>";
                                $('#unpaid-body').append(row);
                            });
                    }
                },
                error: (err, response) => {
                  $('#loading').modal('hide');
                  if(err.responseJSON){
                    window.location.href = window.location.href.split('#')[0] + '#/';
                  }
                }
            });
		});
		
        
        // var date = $('#modallink').attr('data-id');
		// console.log("date" +date);
        // $.ajax({
        //     url: api_route.policy_unpaid,
        //     headers: {
		//         'Authorization':'JWT '+sessionStorage.getItem('token')
		//     },
		//     data: {
		// 		'policy_id' : localStorage.getItem('policyid'),
		// 		'due_date' : date
		// 	},
        //     type: 'POST',
        //     success: (response) => {
			
        //   		$('#loading').modal('hide');
		// 		  this.setState({
		//     		data : response,
        //           });
                

        //     },
        //     error: (err, response) => {
        //       $('#loading').modal('hide');
        //       if(err.responseJSON){
        //     	window.location.href = window.location.href.split('#')[0] + '#/';
        //       }
        //     }
        // });
    }
    
    render()
    {
        //this.getData();
        let data_unpaid= [];
				if(this.state.data && this.state.data.length > 0){
					$.map(this.state.data.failed_due_date, (value, index) => {
						let row = null;
						row = <tr key={index}>
						<td>{value.current_due_date}</td>
						<td>{value.transaction_date}</td>
						<td>{value.description}</td>
						</tr>
						data_unpaid.push(row);
					});

				}else{
					let row = <tr>
								<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
							</tr>
					data_unpaid.push(row);
				}

        return(
            <div className="modal fade unpaid-modal" id="unpaid-modal" tabIndex="-1" role="dialog" aria-labelledby="unpaid-modalLabel" aria-hidden="true">
            <div className="modal-dialog unpaid-modal" style={{width:'50%'}}>
              <div  className="modal-content  zero-padding" style={{'padding':'0px'}}>
                  <div className="modal-header" style={{height: 'auto'}}>
                      <button type="button" className="close" data-dismiss="modal" >&times;</button>
                  </div>
                  <div className="modal-body" id="content-unpaid" style={{fontSize:'14px', 'line-height':'25px'}}>
                  <div className="table-responsive" >
                      <table className="table table-bordered table-striped table-hover table-box" id="unpaid-table" height="100%">
                          <thead>
                              <tr>
                                  <th className="header_table ">Premium Due Date</th>															
                                  <th className="header_table ">Autodebet Date</th>
                                  <th className="header_table ">Remarks</th>
                              </tr>
                          </thead>
                          <tbody id="unpaid-body">     
                              {/* {data_unpaid}      */}
                          </tbody>
                      </table>
                  </div>
                  </div> 
              </div>
            </div>
          </div>
         
        );
    }

}

export default UnpaidModal;