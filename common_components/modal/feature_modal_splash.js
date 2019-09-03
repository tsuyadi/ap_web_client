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

class FeatureModalSplash extends React.Component {

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
        let dialogClassname = 'modal-dialog feature-modal-splash';
        let dialogLabel = 'feature-modal-splashLabel';
        return(
            <div className="modal fade" id="feature-modal-splash" tabIndex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true">
			  <div className={dialogClassname} style={{height:'552px'}}>
				<div className="modal-content  zero-padding" style={{'padding':'0px', height: '100%'}}>
                    <div className="modal-header" style={{height: '81px'}}>
                        <button type="button" className="close" data-dismiss="modal">&times;</button>
                        <h2 class="modal-title" style={{marginTop: '15px', marginBottom: '15px'}}>
							{/*<img style={{'width':'80%'}} src="assets/img/i.JPG" alt="i"/>*/}
							What's New
						</h2>
                    </div>
					<div className="modal-body" style={{height: '390px', overflowY:'auto'}}>
                        <div id="featureModalDiv" className="text-left">        													
							<img src="assets/img/July_C.JPG" alt="July_C"/>
							{/*<img src="assets/img/July_B.JPG" alt="July_B"/>*/}
							{/*<img src="assets/img/June_C.JPG" alt="June_C"/> 
							<img src="assets/img/June_D.JPG" alt="June_D"/>
							<img src="assets/img/June_E.JPG" alt="June_E"/>*/}
							{/*<img src="assets/img/June_F.JPG" alt="June_F"/>
							<img src="assets/img/June_G.JPG" alt="June_G"/>
							<img src="assets/img/June_H.JPG" alt="June_H"/>*/}
							{/*<img src="assets/img/June_I.JPG" alt="June_I"/>*/}
                            
                        </div>
                    </div>
					<div className="modal-footer" style={{height: '81px'}}>
						<button type="button" className="btn btn-primary btn-lg" data-dismiss="modal">Got it!</button>
					</div>
				</div>
			  </div>
			</div>
        );
    }

}

export default FeatureModalSplash;