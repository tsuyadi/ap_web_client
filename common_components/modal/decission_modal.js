"use strict"

import React from 'react';
import api_route from '../api_route';
import {DateFormatYMD, DateFormatMMM, DateFormat, MoneyFormat} from '../helper/formatter';
import {DatePicker} from '../../common_components/date_picker';
import {MIME_TYPE} from '../../common_components/helper/constant';
var FileSaver = require('file-saver');
const SortType = {
    DESC : 'DESC',
    ASC : 'ASC'
  }
class DecisionModal extends React.Component {

   constructor(props){
		super(props);

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

		// this.handlePageChanged = this.handlePageChanged.bind(this);
    }

    componentWillReceiveProps(p){

				  this.setState({
		    		data : p.data,
                  });

                  console.log('props');
                  console.log(this.state.data);

    }

    render()
    {
        //this.getData();
        let data_spc= [];
        let approve = 0;
        let reject = 0;
        //let exgratia = 0;
        let paid_approve = 0;
        let paid_reject = 0;
        //let paid_exgratia = 0;
        let total_decision = 0;
        let total_paid = 0;
        if(this.state.data && this.state.data.decision_claims && this.state.data.decision_claims.detail_status && this.state.data.decision_claims.detail_status.length > 0){
            $.map(this.state.data.decision_claims.detail_status, (value, index) => {
                if(value.status == "Approved"){
                    approve = value.total;
                    paid_approve = value.approved_paid;
                } else if(value.status == "Reject"){
                    reject = value.total;
                    paid_reject = value.rejected_paid;
                }
            });
            total_decision = this.state.data.decision_claims.total_decision;
            total_paid = this.state.data.decision_claims.total_paid;
        }else{
            let row = <tr>
                        <td colSpan="5" style={{'textAlign':'center'}}>No data.</td>
                    </tr>
            data_spc.push(row);
        }

        return(
            <div className="modal fade spc-modal" id="decission_modal" tabIndex="-1" role="dialog" aria-labelledby="spc-modalLabel" aria-hidden="true">
            <div className="modal-dialog spc-modal" style={{width:'90%'}}>
              <div  className="modal-content  zero-padding" style={{'padding':'0px'}}>
                  <div className="modal-header" style={{height: 'auto'}}>
                      <button type="button" className="close" data-dismiss="modal" >&times;</button>
                        <h2 className="info-modal-link"  data-toggle="modal">
							{/*{/*<img style={{'width':'80%'}} src="assets/img/i.JPG" alt="i"/>*/}
							Detail Decision
						</h2>
                  </div>
                  <div className="modal-body" id="content-rpc" style={{maxHeight:'400px', overflowY:'scroll', fontSize:'14px', 'line-height':'25px'}}>
                    <div className="row" style={{margin:'30px 10px'}}>
                        <div className="col-sm-12">
                            <div className="scroll-h">
                                <table className="table table-bordered table-striped table-hover table-box table-responsive">
                                    <thead>
                                        <tr>
                                            <th className="header_table">Status</th>
                                            <th className="header_table"># Cases</th>
                                            <th className="header_table">Paid</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Approve</td>
                                            {/* <td>{this.state.decission != null && this.state.decission.inforce_policy.total_claim}</td> */}
                                            {/* <td>{this.state.data && this.state.data.decision_claims && this.state.data.decision_claims.approve ? this.state.data.decision_claims.approve.number : 0 }</td> */}
                                            <td>{approve}</td>
                                            <td>{paid_approve}</td>
                                        </tr>
                                        <tr>
                                            <td>Reject</td>
                                            <td>{reject}</td>
                                            <td>{paid_reject}</td>
                                            {/* <td>{this.state.data && this.state.data.decision_claims && this.state.data.decision_claims.reject ? this.state.data.decision_claims.reject.number : 0 }</td> */}
                                        </tr>

                                        <tr>
                                            <td><b>Total</b></td>
                                            <td>{total_decision}</td>
                                            <td>{total_paid}</td>
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
          </div>

        );
    }

}

export default DecisionModal;
