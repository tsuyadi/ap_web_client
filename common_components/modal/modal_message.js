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

class ModalMessage extends React.Component {

    constructor()
    {
        super();
    }

    render()
    {
        let dialogClassname = 'modal-dialog ' + this.props.id;
        let dialogLabel = this.props.id + 'Label';
        return(
            <div className="modal fade" id={this.props.id} tabindex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true">
			  <div className={dialogClassname}>
				<div className="modal-content zero-padding">
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4>{this.props.title}</h4>
                    </div>
					<div className="modal-body">
                        {this.props.message}
                    </div>
				</div>
			  </div>
			</div>
        );
    }

}

export default ModalMessage;