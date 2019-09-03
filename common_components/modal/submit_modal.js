"use strict"

import React from 'react';

import api_route from '../../common_components/api_route';
/*
    Author  : Nasrul A Gifari
    Date    : 23 Sep 2016
    Param   : 
        1. id
        2. title
        3. message
 */

class SubmitModal extends React.Component {

    constructor()
    {
        super();

        this.submitIssue = this.submitIssue.bind(this);
        this.clearForm = this.clearForm.bind(this);
    }

    submitIssue(){
		
		var email = $('[name=email]').val();
		var message = $('[name=message]').val();

		var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 

		$('.email-alert').hide();

		if(email.match(pattern))
		{

			$('.sendissue').show();

			$.ajax({
				url : api_route.issueAPI,
				headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				data: {
					'email':email,
					'message':message
				},
				type: 'POST',
				success: (response) => {
					
					$('.sendissue').hide();
					$('#submitfom').hide();
					$('#inform').show();

				},
				error: (err, response) => {
					$('.sendissue').hide();
					alert('Something wrong happened, please contact our Agency Portal Contact Support');
				}
			});

		}
		else
		{
			$('.email-alert').show();
		}

	}

	clearForm(){
		$('[name=email]').val('');
		$('[name=message]').val('');
	}

    render()
    {
        let dialogClassname = 'modal-dialog submit_ap';
        let dialogLabel = 'submit_apLabel';
        return(
            <div className="modal fade" id="submit_ap" tabindex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true">
			  <div className={dialogClassname}>
				<div className="modal-content zero-padding" style={{'padding':'0px'}}>
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h4>Submit Issue</h4>
                    </div>
					<div className="modal-body">
                        <div id="submitIssueDiv">
                            <div id="inform" style={{'display':'none'}} className="form-group">
                                <p className="alert alert-success">Thank you, your inquiry has been submitted.</p>
                                <button type="button" className="btn btn-danger" data-dismiss="modal" >Close</button>
                            </div>
                            <div id="submitfom" className="form-group">
                                <p>Please submit issues related to your account inaccuracy and system functionalities
                                <br/><i>Silahkan isi saran dan pertanyaan anda mengenai data akun dan fungsional sistem</i></p>
                                <input type="text" className="form-control" name="email" style={{'margin-bottom':'10px'}} placeholder="Your email" />
                                <p className="email-alert text-danger" style={{'display':'none'}}>Please use valid email address</p>
                                <textarea className="form-control" style={{'margin-top':'10px'}} id="issueMessage" name="message" placeholder="Submit your Issue here">
                                </textarea>
                                <button type="submit" className="btn btn-default" style={{'margin-top':'10px', 'margin-right':'10px'}} onClick={this.clearForm}>Clear</button>
                                <button type="submit" className="btn btn-primary" style={{'margin-top':'10px'}} onClick={this.submitIssue}>Submit</button> <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw sendissue" ></i>					
                            </div>
                            
                        </div>
                    </div>
				</div>
			  </div>
			</div>
        );
    }

}

export default SubmitModal;