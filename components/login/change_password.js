'use strict'

import api_route from '../../common_components/api_route';

class change_password extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		password: '',
		confpassword: '',
		user_token: this.props.params.user_token,
	}

	handleSubmit = (e) => {
		e.preventDefault();
		var error = 0;
		var pass = this.state.password;
		if(this.state.password == "" || this.state.confpassword == ""){
			alert("Fill all field");
			error = 1;
		}
		else if(pass.length < 10){
			alert('Your Password is too short');
			error = 1;
		}else if(pass.length >= 125){
			alert('Your Password is too long');
			error = 1;
		}
		else if(this.state.password != this.state.confpassword){
			alert("New Password and Confirm New Password should be the same");
			error = 1;
		}
		else if(error == 0){
			$('#loading').modal('show');
			$.ajax({
	            url: api_route.passwordReset,
	            headers: {
			        'Authorization':'JWT '+this.state.user_token,
			        'Content-Type':'application/json',
			        'Accept':'application/json'
			    },
			    data: JSON.stringify({
			    	"new_password": this.state.password
			    }),
			    dataType: "json",
	            contentType: "application/json",
	            type: 'POST',
	            success: (response) => {
			          if(response.status == 'OK')
			          {
			            $('.navbar-brand').html("Success change password. Continue <a href='#/'>Login</a>.");
			            $('.m-b-lg').hide();
			          }else{
			            $('.navbar-brand').html("Failed change password. Retry <a href='#/forgot_password'>Forgot Password</a>.");
			            $('.m-b-lg').hide();
			          }
	            },
	            error: (err, response) => {
		            $('.navbar-brand').html("Failed change password. Retry <a href='#/forgot_password'>Forgot Password</a>.");
		            $('.m-b-lg').hide();
	            }
	        });
		}
	}

	handleChangeNew = (e) => {
		this.setState({password: e.target.value});
	}

	handleChangeConf = (e) => {
		this.setState({confpassword: e.target.value});
	}

	render(){
		return (
			<div className="app app-header-fixed ">
				<div className="container w-xxl w-auto-xs" style={{'padding':'20px','background':'#FFF'}}>
				  <div className="navbar-brand block m-t">Create Password</div>
				  <div className="m-b-lg">
				    <form name="form" className="form-validation" onSubmit={this.handleSubmit}>
				      <div className="text-danger wrapper text-center">
				      	{this.state.status}
				      </div>
				      <div className="list-group list-group-sm">
				        <div className="list-group-item">
				          <input type="password" placeholder="New Password" className="form-control no-border" value={this.state.password} onChange={this.handleChangeNew} />
				        </div>
				      </div>
				      <div className="list-group list-group-sm">
				        <div className="list-group-item">
				           <input type="password" placeholder="Confirm New Password" className="form-control no-border" value={this.state.confpassword} onChange={this.handleChangeConf}/>
				        </div>
				      </div>
			      	  <a href="#/"><button type="button" className="btn btn-md btn-info" style={{float:'right'}}>Cancel</button></a>
				      <button type="submit" className="btn btn-md btn-info" style={{float:'right',margin:'0 25px'}}>Submit</button>
				    </form>
				  </div>
				</div>
			</div>
		);
	}
}

export default change_password;