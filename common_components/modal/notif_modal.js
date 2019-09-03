"use strict"

import React from 'react';

/*
    Author  : Nasrul A Gifari
    Date    : 23 Sep 2016
    Param   : 
        1. id
        2. title
        3. message
 */

class NotifModal extends React.Component {

   constructor(props){
		super(props);

        this.state = {
			data: null,
        }
    }

    componentWillReceiveProps = (props) => {
        $('#notif-modal').on('show.bs.modal', function(e) {
            var rowid = $(e.relatedTarget).data('id');
            $('#idisi').text(rowid);
        });
	}


    render()
    {
        let dialogClassname = 'modal-dialog notif-modal';
        let dialogLabel = 'notif-modalLabel';
        return(
            <div className="modal fade" id="notif-modal" tabIndex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true">
			  <div className={dialogClassname} style={{height:'auto', width:'70%'}}>
				<div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                    <div className="modal-header" style={{height: 'auto'}}>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <p style={{fontWeight:'bold', color:'black', fontSize: '14px'}} id="idisi"></p>
                    </div>
				</div>
			  </div>
			</div>
           
        );
    }

}

export default NotifModal;