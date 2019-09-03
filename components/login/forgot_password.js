'use strict'

import React from 'react';
import $ from 'jquery';
import api_route from '../../common_components/api_route';
import Loading from '../../common_components/loading';

class forgot_password extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		username: ''
	}

  handleSubmit = (e) => {
    e.preventDefault();
    if(this.state.username == ""){ 
        $(".modal-body").html('Username can not be empty.'); 
        $("#successPopUp").modal('show'); 
    }
    else{
			$('#loading').modal('show');
	    $.ajax({
	        url: api_route.passwordRecovery,
	        data: {'username':this.state.username},
	        dataType: 'JSON',
	        type: 'POST',
	        success: (response) => {
						$('#loading').modal('hide');
	          if(response.status == 'OK')
	          {
				// window.location.href = window.location.href.split('#')[0] + '#/';
							$(".inputWrapper").hide(); 
	            $(".submit_btn").hide(); 

							$(".modal-body").html('Link to reset your password has been send to your tmliadviser email. <br>' + 
																		'Please check your tmliadviser email, if you not received the email please contact <b><u>ap-support@tokiomarine-life.co.id</u></b>.'); 

        			//$(".modal-body").html('Link to reset your password has been send to your tmliadviser email.<br>' + 
							//											'If you are not receieved for the next 3 hours, please contact Tokio Marine Agent Support.'); 

	            $("#successPopUp").modal('show'); 
						}else if(response.status == 'Not OK'){
							$("#user").val('');
	            $(".modal-body").html('Please Input Valid User'); 
	            $("#successPopUp").modal('show'); 
						}
						else{
							$("#user").val('');
	            $(".modal-body").html('Link to reset your password has been send to your tmliadviser email.<br>' + 
																		'Please check your tmliadviser email, if you not received the email please contact <b><u>ap-support@tokiomarine-life.co.id</u></b>.'); 
	            $("#successPopUp").modal('show'); 
	          }
	        },
	        error: (err) => {
						$("#user").val('');
						$('#loading').modal('hide');
	          if(err.status == "500")
						{
							if(err.responseJSON.status == "User matching query does not exist.")
							{
								$(".modal-body").html('If the user is registered a link to reset the password will be sent to the user’s email address'); 
	            	$("#successPopUp").modal('show'); 
							} else if(err.responseJSON.status == "Not OK")
							{
								$(".modal-body").html('Please Input Valid User'); 
	            	$("#successPopUp").modal('show'); 
							}
							else
							{
								$(".modal-body").html("Something went wrong. Please contact Tokio Marine Agent Support."); 
	            	$("#successPopUp").modal('show'); 
							}
						}
	        }
	    });
    }
  }

  handleChangeUsername = (e) => {
    this.setState({username: e.target.value});
  }

	render(){
		return (
			<div className="app app-header-fixed ">
				<div className="container w-xxl w-auto-xs" style={{'padding':'20px','background':'#FFF'}}>
				  <span className="navbar-brand block m-t">Forgot your password?</span>
				  <div id="form" className="m-b-lg">
				    <form name="form" className="form-validation" onSubmit={this.handleSubmit}>
				      <div className="list-group list-group-sm inputWrapper">
				        <div className="list-group-item">
				          <input id="user" type="username" placeholder="username" className="form-control no-border" value={this.state.username} onChange={this.handleChangeUsername} autocomplete="off"/>
				        </div>
				      </div>
				      <a href="#"><button type="button" className="btn btn-md btn-info" style={{float:'right'}}>Back</button></a>
				      <button type="submit" className="btn btn-md btn-info submit_btn" style={{float:'right',margin:'0 25px'}}>Submit</button>
				    </form>
				  </div>
				</div>

					<Loading />

			    <div className="modal fade" id="successPopUp" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true" style={{'padding':'20px'}}>
				  <div className="modal-dialog">
					<div className="modal-content">
				      <div className="modal-header">
				        <button type="button" className="close" data-dismiss="modal">&times;</button>
				        <h4 className="modal-title">Notification</h4>
				      </div>

				      <div className="modal-body">
				        <p>Password Recovery mail has been send to your email. If you did not receive any mail for next three hours, please contact Tokio Marine Agent Support.</p>
				      </div>
						
					</div>
				  </div>
				</div>

			</div>
		);
	}
}

export default forgot_password;
