"use strict"

import React from 'react';
import api_route from '../api_route';
import {DateFormatYMD, DateFormatMMM, DateFormat, MoneyFormat} from '../helper/formatter';
import {DatePicker} from '../../common_components/date_picker';
import {MIME_TYPE} from '../../common_components/helper/constant';
import ReturnModal from '../../common_components/modal/return_modal';
var FileSaver = require('file-saver');
const SortType = {
    DESC : 'DESC',
    ASC : 'ASC'
  }
class StatusClaimModal extends React.Component {

   constructor(props){
		super(props);

        this.state = {
            data : this.props.data,
            data_claim: null,
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
        let data_claim= [];
        let waiting = 0;
        let _return = 0;
        let paid = 0;
        if(this.state.data && this.state.data.payment_claims && this.state.data.payment_claims.detail_status && this.state.data.payment_claims.detail_status.length > 0){
            $.map(this.state.data.payment_claims.detail_status, (value, index) => {
                if(value.status == "Wait For Payment"){
                    waiting = value.total;
                } else if(value.status == "Paid"){
                    paid = value.total;
                } else if(value.status == "Return"){
                    _return = value.total;
                }
            });

        }else{
            let row = <tr>
                        <td colSpan="2" style={{'textAlign':'center'}}>No data.</td>
                    </tr>
            data_claim.push(row);
        }

        return(
            <div className="modal fade claim-modal" id="claim_payment_modal" tabIndex="-1" role="dialog" aria-labelledby="claim-modalLabel" aria-hidden="true">
            <div className="modal-dialog claim-modal" style={{width:'90%'}}>
              <div  className="modal-content  zero-padding" style={{'padding':'0px'}}>
                  <div className="modal-header" style={{height: 'auto'}}>
                      <button type="button" className="close" data-dismiss="modal" >&times;</button>
                        <h2 className="info-modal-link"  data-toggle="modal">
							{/*{/*<img style={{'width':'80%'}} src="assets/img/i.JPG" alt="i"/>*/}
							Detail Claim Payment Status
						</h2>
                  </div>
                  <div className="modal-body" id="content-claim" style={{maxHeight:'400px', overflowY:'scroll', fontSize:'14px', 'line-height':'25px'}}>
                    <div className="row" style={{margin:'30px 10px'}}>
                        <div className="col-sm-12">
                            <div className="scroll-h">
                                <table className="table table-bordered table-striped table-hover table-box table-responsive">
                                    <thead>
                                        <tr>
                                            <th className="header_table">Status</th>
                                            <th className="header_table"># Cases</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        <tr>
                                            <td>Waiting for Payment</td>
                                            {/* <td>{this.state.decission != null && this.state.decission.inforce_policy.total_claim}</td> */}
                                            {/* <td>{this.state.data && this.state.data.decision_claims && this.state.data.decision_claims.approve ? this.state.data.decision_claims.approve.number : 0 }</td> */}
                                            <td>{waiting}</td>
                                        </tr>
                                        <tr>
                                            <td>Paid</td>
                                            <td>{paid}</td>
                                            {/* <td>{this.state.data && this.state.data.decision_claims && this.state.data.decision_claims.reject ? this.state.data.decision_claims.reject.number : 0 }</td> */}
                                        </tr>
                                        <tr>
                                            <td>Return</td>
                                            <td><a data-toggle="modal" href="#return_modal">{_return}</a></td>
                                            {/* <td>{this.state.data && this.state.data.decision_claims && this.state.data.decision_claims.exgratia ? this.state.data.decision_claims.exgratia.number : 0 }</td> */}
                                        </tr>
                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                  </div>
              </div>
            </div>
		    	<ReturnModal data={this.state.data}/>
          </div>

        );
    }

}

export default StatusClaimModal;
