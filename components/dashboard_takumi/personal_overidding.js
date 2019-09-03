'use strict'

import {UserLevelMap} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import {CheckAgentType,DateFormat} from '../../common_components/helper/formatter';

class PersonalOveridding extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		data : null
	}
	componentWillMount () {
		$.ajax({
            url: api_route.dashboard_takumi,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: [],
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
              	$('#loading').modal('hide');
				this.setState({
					data:response,
				});
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
              
            }
        });
	}

	render(){
		//role == 11 ? agent_level = "Personal Selling Director" :  role== 12 ? agent_level = "Group Selling Manager" : role ==13 ? agent_level = "Takumi Consultant" : agent_level = agent_level;
		let level = localStorage.getItem('role');
		level=='15' ? level ='ETC' : level=='16' ? level ='STC' : '';
		
		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-user"></i> Overidding</div>
			<div className="box-summary">
				<div className="entry">
					<form className="form-horizontal">
						<div className="form-group">
							<label className="col-sm-4 control-label">Overidding <b>{level}</b></label>
							<div className="col-sm-8">
								<input type="text" className="form-control" placeholder="-" disabled value={this.state.data && this.state.data.takumi_dashboard_personal.overriding} />
							</div>
						</div>
					</form>
					
				</div>
			</div>
		</div>
		);
	}
}

export default PersonalOveridding;