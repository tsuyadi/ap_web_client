'use strict'

import {UserLevelMap} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import {CheckAgentType,DateFormat} from '../../common_components/helper/formatter';

class AgentProfile extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		data : null,
		name : '',
		fullname: '',
		first_name: '',
		last_name: '',
		code: '',
		aaji_number: '',
		aaji_expired_date: '',
		level_user:'',
	}

	componentDidMount = () => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.profile,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
            	console.log(response);
              	$('#loading').modal('hide');
             	 this.setState({
					name : localStorage.getItem('name'),
					fullname: response.content.user.first_name + ' ' + response.content.user.last_name,
					first_name: response.content.user.first_name,
					last_name: response.content.user.last_name,
					code: response.content.agent_profile.code,
					aaji_number: response.content.agent_profile.aaji_number,
					aaji_license_date: DateFormat(response.content.agent_profile.aaji_license_date),
					level_user:response.content.user.level.type,
              });
            },
            error: (err, response) => {
			$('#loading').modal('hide');
              if(err.responseJSON){
				  if(err.responseJSON.detail){
					if(err.responseJSON.detail == "Signature has expired."){
						alert(err.responseJSON.detail);
						window.location.href = window.location.href.split('#')[0] + '#/';
					}else{
						alert(err.responseJSON.detail);
					}
				  }else{
					alert('Opps, something wrong happened !');
				  }				  
              }
            }
        });
	}

	render(){
		//role == 11 ? agent_level = "Personal Selling Director" :  role== 12 ? agent_level = "Group Selling Manager" : role ==13 ? agent_level = "Takumi Consultant" : agent_level = agent_level;
		let level = this.state.level_user;
		level == '13' ? level = 'Takumi Consultant' : level == '12' ? level ='Takumi Manager' : level=='11' ? level ='Takumi Director' : level=='15' ? level ='Executive Takumi Consultant' : level=='16' ? level ='Senior Takumi Consultant' : '';
		
		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-user"></i> Agent Profile</div>
			<div className="box-summary">
				<div className="entry">
					<form className="form-horizontal">
						<div className="form-group">
							<label className="col-sm-4 control-label">Agent Name</label>
							<div className="col-sm-8">
								<input type="text" className="form-control" placeholder="-" disabled value={this.state.fullname} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-4 control-label">Agent Code</label>
							<div className="col-sm-8">
								<input type="text" className="form-control" placeholder="-" disabled value={this.state.code} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-4 control-label">Agent Level</label>
							<div className="col-sm-8">
								<input type="text" className="form-control" placeholder="-" disabled value={level} />
							</div>
						</div>
						<div className="form-group">
							<label className="col-sm-4 control-label">AAJI License Date</label>
							<div className="col-sm-8">
								<input type="text" className="form-control" placeholder="-" disabled value={this.state.aaji_license_date} />
							</div>
						</div>
					</form>
					
					<div className="more">
						<span><a href="#/profile" title="View More...">View More...</a></span>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default AgentProfile;