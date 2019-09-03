'use strict'

import api_route from '../../common_components/api_route';
//import NewBusinessModal from '../../common_components/modal/new_business_group';
import {MoneyFormat} from '../../common_components/helper/formatter';

class Overriding extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null,
			modalVal : [{
						"no":'-',
						"spaj_number":'-',
						"spaj_policy_no":'-',
						"spaj_holder":'-',
						"spaj_status":'-',
						"spaj_notes":'-'
					}],
			statusSPAJ : null,
			dataApe : null,
			agent:null
		},
		this.getDataAPE = this.getDataAPE.bind(this);
	}

	getDataAPE(){
		// debugger;

		var param = [];

		if(this.props.disabled == "true"){
			param = {
				agent : this.props.param_agent
			};
		}else{
			param = [];
		}

		$('.load-ape-group').show();
		$.ajax({
			url: api_route.agentApeDashboard,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data: param,
			// processData: false,
			// contentType: false,
			type: 'POST',
			success: (response) => {
				// debugger;
				$('.load-ape-group').hide();
				try{
					this.props.loaded(true);
				}catch(e){}
				this.setState({
					dataApe:response,
					data: response,
					agent:this.props.param_agent && this.props.param_agent
				});
			},
			error: (err, response) => {
				$('.load-ape-group').hide();
				if(err.responseJSON){
					// debugger;
					// window.location.href = window.location.href.split('#')[0] + '#/';
				}					
			}
		});
	}

	_data(status, period, group, obj) {
		// debugger;
		if(obj){
			obj.preventDefault();
		}

		this.setState({
			statusSPAJ: status
		});

		$.ajax({
            url: api_route.new_business,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {
		    	'status':status,
		    	'period':period,
		    	'group':group
		    },
            type: 'POST',
            success: (response) => {

				

              if(response.length > 0) {
              	this.setState({
	              	modalVal:response
	              });
              } else {
              	this.setState({
              		modalVal:[{
								 'no':'-',
								 'spaj_number':'-',
								 'spaj_submit_date':'-',
								 'spaj_policy_no':'-',
								 'spaj_holder':'-',
								 'spaj_status':'-',
								 'spaj_status_date':'-',
								 'spaj_agent_name':'-',
								 'spaj_agent_code':'-',
								 'spaj_notes':'-'
							   }]
                });
              }
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
    }

	componentWillReceiveProps = (p) => {
		
		this.getDataAPE();

	}

	render(){

		// debugger;

		if(this.state.agent != this.props.param_agent){
			this.getDataAPE();
		}

		$('.header_table').tooltip();

		var toggleProp = "";

		if(this.props.disabled == "true"){
			toggleProp="";
		}else{
			toggleProp="modal";
		}

		return (
        <div className="entry">
            <div className="content content-prod boxShadow">
                <div className="title textShadow"><i className="fa fa-user"></i> Overriding</div>
                {/* Part that just showed on Mobile Only */}
                <div className="tab-mobile hidden-md hidden-lg">
                    <ul className="nav nav-tabs" role="tablist">
                        <li role="presentation" className="active"><a href="#year1" aria-controls="yr1" role="tab" data-toggle="tab">Overriding Year - 1</a></li>
                        <li role="presentation"><a href="#year2" aria-controls="yr2" role="tab" data-toggle="tab">Overriding Year - 2</a></li>
                    </ul>
                    <div className="tab-content">
                        <div role="tabpanel" className="tab-pane active" id="year1">
                            <div style={{'overflowX':'auto', 'border':'0px'}}>
                            <table className="table table-responsive">
                                <tbody>
                                    <tr>
                                        <td>Personal Selling</td>
                                        <td><input type="text" className="form-control" value="65.000.000,00" disabled/></td>
                                    </tr>
                                    <tr>
                                        <td>Group Selling</td>
                                        <td><input type="text" className="form-control" value="65.000.000,00" disabled/></td>
                                    </tr>
                                </tbody>
                            </table>
                        </div>
                        </div>
                        <div role="tabpanel" className="tab-pane" id="year2">
                            <div style={{'overflowX':'auto', 'border':'0px'}}>
                            <table className="table table-responsive" style={{'border':'0px'}}>
                                <tbody>
                                    <tr>
                                        <td>Personal Selling</td>
                                        <td><input type="text" className="form-control" value="44.000.000,00" disabled/></td>
                                    </tr>
                                    <tr>
                                        <td>Group Selling</td>
                                        <td><input type="text" className="form-control" value="44.000.000,00" disabled/></td>
                                    </tr>
                                </tbody>
                            </table>
                            </div>
                        </div>
                    </div>
                </div>
                {/* End Part */}
                <div style={{'overflowX':'auto', 'border':'0px'}}>
                    <table className="table table-responsive hidden-sm hidden-xs" style={{ 'border':'0px'}}>
                        <thead>
                            <tr className="info">
                                <th className="header_table text-center" colSpan={2}>Overriding Year - 1</th>
                                <th className="header_table text-center" colSpan={2}>Overriding Year - 2</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td>Personal Selling</td>
                                <td><input type="text" className="form-control" value="65.000.000,00" disabled/></td>
                                <td>Personal Selling</td>
                                <td><input type="text" className="form-control" value="44.000.000,00" disabled/></td>
                            </tr>
                            <tr>
                                <td>Group Selling</td>
                                <td><input type="text" className="form-control" value="65.000.000,00" disabled/></td>
                                <td>Group Selling</td>
                                <td><input type="text" className="form-control" value="65.000.000,00" disabled/></td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>
		</div>
        
		);
	}
}

export default Overriding;
