"use strict"

import React from 'react';
import api_route from '../api_route';

class TMInvestModal extends React.Component {

   constructor(props){
		super(props);

        this.state = {
			data: null,
        }
    }

    componentWillReceiveProps = (props) => {
	}


    render()
    {
        let dialogClassname = 'modal-dialog tminvest-modal';
        let dialogLabel = 'tminvest-modalLabel';
        return(
            <div className="modal fade" id="tminvest-modal" tabIndex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true">
			  <div className={dialogClassname} style={{height:'auto', width:'50%'}}>
				<div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                    <div className="modal-header" style={{height: 'auto'}}>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                    </div>
                    <div className="modal-body" style={{fontSize:'16px', 'line-height':'25px'}}>
                        Cara Penggunaan:<br/>
                        1. Download File excel berikut ini  : <u><b><a style={{color:'red'}} href={api_route.baseOnly+"assets/file/InvestPro.xlsm"} target="_self">Download</a></b></u> <br/>
                        2. Buka file excel tersebut, jika ada pertanyaan 
                        "This workbook contains macros. Do you want to disable macros before opening the file?" pilih <b>Enable Macros</b>
                    </div> 
				</div>
			  </div>
			</div>
           
        );
    }

}

export default TMInvestModal;