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
class ReturnModal extends React.Component {

   constructor(props){
		super(props);

        this.state = {
            data : this.props.data,
            data_return: null,
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
        // $('#claim_payment_modal').modal('hide');
    }
    
    render()
    {
        //this.getData();
        let data_return= [];
        if(this.state.data && this.state.data.payment_claims && this.state.data.payment_claims.return_details && this.state.data.payment_claims.return_details.length > 0){
            $.map(this.state.data.payment_claims.return_details, (value, index) => {
                let row = [];
				let num = 0;
                num += (index+1);
                row = <tr key={index}>
                            <td>{num}</td>
                            <td>{value.claim__number != null? value.claim__number : '' }</td>
                            <td>{value.decision_notes != null? value.decision_notes : '' }</td>
                        </tr>
            data_return.push(row);
            });
        }else{
            let row = <tr>
                        <td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
                    </tr>
            data_return.push(row);
        }

        return(
            <div className="modal fade return-modal" id="return_modal" tabIndex="-1" role="dialog" aria-labelledby="return-modalLabel" aria-hidden="true">
            <div className="modal-dialog return-modal" style={{width:'90%'}}>
              <div  className="modal-content  zero-padding" style={{'padding':'0px'}}>
                  <div className="modal-header" style={{height: 'auto'}}>
                      <button type="button" className="close" data-dismiss="modal" >&times;</button>
                        <h2 className="info-modal-link"  data-toggle="modal">
							{/*{/*<img style={{'width':'80%'}} src="assets/img/i.JPG" alt="i"/>*/}
							Detail Return
						</h2>
                  </div>
                  <div className="modal-body" id="content-return" style={{maxHeight:'400px', overflowY:'scroll', fontSize:'14px', 'line-height':'25px'}}>
                    <div className="row" style={{margin:'30px 10px'}}>
                        <div className="col-sm-12">
                            <div className="scroll-h">
                                <table className="table table-bordered table-striped table-hover table-box table-responsive">
                                    <thead>
                                        <tr>
                                            <th className="header_table">No</th>
                                            <th className="header_table">Claim Reg No</th>
                                            <th className="header_table">Notes</th>
                                        </tr>
                                    </thead>
                                   <tbody>
                                   {data_return}            
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

export default ReturnModal;