"use strict"

import React from 'react';
import api_route from '../api_route';
import {DateFormatYMD, DateFormatMMM, MoneyFormat} from '../helper/formatter';
import {DatePicker} from '../../common_components/date_picker';
import {MIME_TYPE} from '../../common_components/helper/constant';
var FileSaver = require('file-saver');
const SortType = {
    DESC : 'DESC',
    ASC : 'ASC'
  }
class RpcModal extends React.Component {

   constructor(props){
		super(props);
        console.log(this.props.data);
        this.state = {
            data : this.props.data,
            data_spc: null,
            param:{
				start_date: "",
				end_date: "",
				status: "",
				page:1,
				offset:"",
            }
        }
            
		this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    downloadModalRecruit(){

        this.state.param.export = 'pdf';

        $('#loading').modal('show');

        $.ajax({
            url: api_route.recruit_activity,
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
                FileSaver.saveAs(blob, "Prospect Card Recruit" + localStorage.agent_code + ".xlsx");
            },
            error: (err, response) => {
                $('#loading').modal('hide');
                alert("something wrong");
            }
        });
    }

	handlePageChanged(newPage){
		
		this.state.param.page = newPage;
		$('#loading').modal('show');
		// // debugger;
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
                    filterd_data: num_data,
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

    componentWillReceiveProps(p){

		// $('#spc-modal').on('show.bs.modal', function(e) {
        //     $('#spc-body tr').remove();
        //     $('#loading').modal('hide');
        //     var date = $(e.relatedTarget).data('id');
        //     $.ajax({
        //         url: api_route.policy_spc,
        //         headers: {
        //             'Authorization':'JWT '+sessionStorage.getItem('token')
        //         },
        //         data: {
        //             'policy_id' : localStorage.getItem('policyid'),
        //             'due_date' : date
        //         },
        //         type: 'POST',
        //         success: (response) => {
        //             $('#loading').modal('hide');
        //             var data = response.failed_due_date;
        //             data.sort(function(a, b){
        //                 var x = a.transaction_date.toLowerCase();
        //                 var y = b.transaction_date.toLowerCase();
        //                 if (x < y) {return -1;}
        //                 if (x > y) {return 1;}
        //                 return 0;
        //             });
                    
        //             var height= ((response.failed_due_date.length * 30) + 20);
        //             height = height +'px';
        //             $('#content-spc').css(height,height);
        //             if(response.failed_due_date.length == 0){
        //                 $('#spc-body').append("<tr><td colSpan='3' style={{'textAlign':'center'}}> No Data.</td></tr>");
        //             }else{
        //                 $.map(data, (value, index) => {
        //                         let row= null;
        //                         row = "<tr key="+index+"> <td>"+DateFormat(value.current_due_date)+"</td><td>"+DateFormat(value.transaction_date)+"</td><td>"+value.description+"</td></tr>";
        //                         $('#spc-body').append(row);
        //                     });
        //             }
        //         },
        //         error: (err, response) => {
        //           $('#loading').modal('hide');
        //           if(err.responseJSON){
        //             window.location.href = window.location.href.split('#')[0] + '#/';
        //           }
        //         }
        //     });
		// });
		
        
        // var date = $('#modallink').attr('data-id');
		// console.log("date" +date);
        // $.ajax({
        //     url: api_route.policy_spc,
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
				  this.setState({
		    		data : p.data,
					// total_data: p.data,
					// total: p.data.total_pages
                  });
                
                  console.log('props');
                  console.log(this.state.data);
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
        let data_rpc= [];
        if(this.state.data && this.state.data.list_activity.length > 0){
            $.map(this.state.data.list_activity, (value, index) => {
                let row = null;
                row = <tr key={index}>
                <td>{DateFormatMMM(value.date)}</td>
                <td>{value.activity}</td>
                <td>{value.status}</td>
                <td>{value.next_step}</td>
                <td>{value.result}</td>
                </tr>
                data_rpc.push(row);
            });

        }else{
            let row = <tr>
                        <td colSpan="5" style={{'textAlign':'center'}}>No data.</td>
                    </tr>
            data_rpc.push(row);
        }

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
			total = parseInt(this.state.data.total_pages);
		}catch(e){
			total = 0;
		}
		// try{
		// 	current = parseInt(this.state.param.page);
		// }catch(e){
		// 	current = 0;
		// }

		// try{
		// 	total = parseInt(this.state.total);
		// }catch(e){
		// 	total = 0;
		// }

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


        return(
            <div className="modal fade rpc-modal" id="rpc-modal" tabIndex="-1" role="dialog" aria-labelledby="rpc-modalLabel" aria-hidden="true">
            <div className="modal-dialog rpc-modal" style={{width:'90%'}}>
              <div  className="modal-content  zero-padding" style={{'padding':'0px'}}>
                  <div className="modal-header" style={{height: 'auto'}}>
                      <button type="button" className="close" data-dismiss="modal" >&times;</button>
                        <h2 className="info-modal-link"  data-toggle="modal">
							{/*{/*<img style={{'width':'80%'}} src="assets/img/i.JPG" alt="i"/>*/}
							Recruit Prospect Card
						</h2>
                  </div>
                  <div className="modal-body" id="content-rpc" style={{maxHeight:'400px', overflowY:'scroll', fontSize:'14px', 'line-height':'25px'}}>
                    <div className="row" style={{margin:'30px 10px'}}>
                        <div className="col-sm-6">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>Prospect Name</label>
                                    </div>
                                    <div className="col-sm-6">
                                        {this.state.data && this.state.data.agent_data && this.state.data.agent_data.prospect_name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>APE</label>
                                    </div>
                                    <div className="col-sm-6">
                                    Rp. {this.state.data && this.state.data.agent_data && MoneyFormat(this.state.data.agent_data.ape)} 
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>Agent Code</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.agent_code}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>Agent Name</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.agent_name}
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>Agent Level</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.level}                                        
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-sm-6">
                            <form className="form-horizontal">
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>AMB/TM Code</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.amb_code}                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>AMB Name</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.amb_name}                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>RMB Code</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.rmb_code}                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>RMB Name</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.rmb_name}                                        
                                    </div>
                                </div>
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>RD/TD Code</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.rd_code}                                        
                                    </div>
                                </div>			
                                <div className="form-group">
                                    <div className="col-sm-6 bg-info">
                                        <label>RD/TD Name</label>
                                    </div>
                                    <div className="col-sm-6">
                                    {this.state.data && this.state.data.agent_data && this.state.data.agent_data.rd_name}                                        
                                    </div>
                                </div>											
                            </form>
                        </div>
                        <hr />
                    </div>

                
                    <div className="row">
                        <div className="col-sm-12">

                            <div className="col-sm-6">
                                <div className="form-horizontal">
                                    <div className="form-group">
                                        <div className="col-sm-6">
                                            <label>Stage</label>
                                        </div>

                                        <div className="col-sm-6">
                                            <select className="form-control" id="policy_status" name="policy_status" onChange={this.handleChangeData}>
                                                <option value="">Approaching</option>
                                                <option value="1">Inforce</option>
                                                <option value="2">Lapse</option>
                                                <option value="3">Terminated</option>
                                                
                                            </select>
                                        </div>
                                    </div>

                                </div>
                            </div>

                            <div className="col-sm-6">
                                <div className="form-horizontal">

                                </div>
                            </div>
                        </div>

                        <div className="col-sm-12">
                            <div className="form-horizontal">
                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="col-sm-6">
                                            <label>Date</label>
                                        </div>

                                        <div className="col-sm-6">
                                            <DatePicker className="form-control" id="policy_effective_date_start" name="policy_effective_date_start" />	
                                        </div>
                                    </div>
                                </div>

                                <div className="col-sm-6">
                                    <div className="form-group">
                                        <div className="col-sm-1">
                                            <label>to</label>
                                        </div>
                                        <div className="col-sm-6">
                                            <DatePicker className="form-control" id="policy_effective_date_end" name="policy_effective_date_end" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        
                        <div className="col-sm-12">
                            <div className="clearfix h25"></div>
                                <div className="col-sm-3 pull-left">
                                        {/* <label style={{paddingTop:'20px', paddingBottom:'20px'}}>{'data_info'}</label> */}
                                </div>
                            <div className="col-sm-3">
                                <button className="btn btn-primary btn-block" type="button"><i className="fa fa-search"></i> Search</button>
                            </div>
                        </div>
                    </div>

                    <div className="clearfix h25"></div>
    
                  <div className="table-responsive" >
                      <table className="table table-bordered table-striped table-hover table-box" id="rpc-table" height="100%">
                          <thead>
                              <tr>
                                  <th className="header_table valign-middle text-center">Date</th>															
                                  <th className="header_table valign-middle text-center">Activity</th>
                                  <th className="header_table valign-middle text-center">Stage</th>
                                  <th className="header_table valign-middle text-center">Purpose/Next Step</th>
                                  <th className="header_table valign-middle text-center">Result</th>
                              </tr>
                          </thead>
                          <tbody id="rpc-body">   
                              {/* <tr>
                                  <td>15-Sep-18</td>															
                                  <td>WA</td>
                                  <td>Approaching</td>
                                  <td>Menanyakan Kabar</td>
                                  <td>Kabar Baik. Sedang Sibuk</td>
                              </tr>  
                              <tr>
                                  <td>17-Sep-18</td>															
                                  <td>Calling</td>
                                  <td>Building Trust</td>
                                  <td>Meminta Janji</td>
                                  <td>Dapat Janji Ketemu @FX Senayan 02.00</td>
                              </tr>   */}
                              {data_rpc}     
                          </tbody>
                            <tfoot>
                                <tr>
                                    <th colSpan="15"><button style={{marginRight:'10px'}} className="btn btn-primary"  onClick={() => this.downloadModalRecruit()}>Download Prospect Card</button><button className="btn btn-primary" >Download M.O.N.E.Y Analysis</button></th>
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
            </div>
          </div>
         
        );
    }

}

export default RpcModal;