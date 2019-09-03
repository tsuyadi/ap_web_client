"use strict"

import React from 'react';
import api_route from '../../common_components/api_route';
import {PasswordValidation} from '../../common_components/helper/validation';
/*
    Author  : Nasrul A Gifari
    Date    : 23 Sep 2016
    Param   : 
        1. id
        2. title
        3. message
 */

class ChangePassword extends React.Component {

    constructor(props)
    {
        super();
        let token = props.token == undefined ? '' : props.token;

        this.state = {
            oldpass: '',
            password: '',
            confpassword: '',
            user_token: token,
        }
        this.handleSubmit = this.handleSubmit.bind(this); 
    }

    

	handleSubmit (e){
		e.preventDefault();
		var error = 0;
		if(this.state.password == "" || this.state.confpassword == ""){
			alert("Fill all field");
			error = 1;
		}
		else if(this.state.password != this.state.confpassword){
			alert("New Password and Confirm New Password should be the same");
			error = 1;
		}
		else if(error == 0){

            if(PasswordValidation(this.state.password)){
                $('#firstTimeLogin').modal('hide');
                $('#loading').modal('show');
                $.ajax({
                    url: api_route.passwordReset,
                    headers: {
                        'Authorization':'JWT '+ sessionStorage.getItem('token'),
                        'Content-Type':'application/json',
                        'Accept':'application/json'
                    },
                    data: JSON.stringify({
                        // 'old_password': this.state.oldpass,
                        "new_password": this.state.password
                        // 'username' : localStorage.getItem('username')
                    }),
                    dataType: "json",
                    contentType: "application/json",
                    type: 'POST',
                    success: (response) => {
                        if(response.status == 'OK')
                        {
                            alert('Success change password');
                            window.location.reload();
                        }else{
                            alert('Failed to change password');
                        }
                    },
                    error: (err, response) => {
                        $('.m-b-lg').hide();
                    }
                });
            }
   
		}
	}

    handleChangeOld = (e) => {
        this.setState({
            oldpass : e.target.value
        });
    }

	handleChangeNew = (e) => {
		this.setState({password: e.target.value});
	}

	handleChangeConf = (e) => {
		this.setState({confpassword: e.target.value});
	}

    render()
    {
        let dialogClassname = 'modal-dialog changePassword';
        let dialogLabel = 'changePasswordLabel';
        return(
            <div className="modal fade" id="firstTimeLogin" tabIndex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true" data-backdrop="static" data-keyboard="false" >
			  <div className={dialogClassname}>
				<div className="modal-content zero-padding" style={{'padding':'0px'}}>
                    <div className="modal-header">
                        <h4>Change Password</h4>
                    </div>
					<div className="modal-body">
                        <div className="alert alert-info">
                            The password must contain at least 10 character in length with alphanumeric and special character combination.<br />
                            <i>Kata kunci harus terdiri atas 10 karakter dengan kombinasi huruf, angka dan karakter khusus.</i><br />
                            Example: <b> p@s5word123</b>
                        </div>
                        <form name="form" className="form-validation">
                            <div className="text-danger wrapper text-center">
                                {this.state.status}
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <input type="password" placeholder="New Password" className="form-control no-border" value={this.state.password} onChange={this.handleChangeNew} />
                                </div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">&nbsp;</div>
                            </div>
                            <div className="row">
                                <div className="col-xs-12">
                                    <input type="password" placeholder="Confirm New Password" className="form-control no-border" value={this.state.confpassword} onChange={this.handleChangeConf}/>
                                </div>
                            </div>
                        </form>
                    </div>
                    <div className="modal-footer">
                        <button type="submit" className="btn btn-primary" onClick={this.handleSubmit}>Change Password</button>
                    </div>
				</div>
			  </div>
			</div>
        );
    }

}

export default ChangePassword;