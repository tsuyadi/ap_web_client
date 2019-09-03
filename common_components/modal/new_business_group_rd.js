'use strict'

import api_route from '../../common_components/api_route';

class NewBusinessModal extends React.Component {
	constructor(props){
		super(props);
	}

	state = {
		data : [{
				 'no':'-',
				 'spaj_number':'-',
				 'spaj_policy_no':'-',
				 'spaj_holder':'-',
				 'spaj_status':'-',
				 'spaj_notes':'-'
			   }]
	}

	componentWillReceiveProps = (p) => {
		this.setState({
	        data: p.data
	    });
	}

	render(){
		return (
        <div className="modal fade" id="newbusinessgroup" tabindex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content">
					<div className="table-responsive">
						<table className="table table-bordered table-hover">
							<tr>
								<th>NO</th>
								<th>NO SPAJ</th>
								<th>NO POLICY</th>
								<th>POLICY HOLDER</th>
								<th>STATUS</th>
								<th>ALASAN</th>
							</tr>
							<tbody>
							{
								this.state.data.map(function(item) {
		                          return (
		                            <tr>
		                              {/*<td>{item.no != null ? item.no : '-'}</td>*/}
		                              <td>1</td>
		                              <td>{item.spaj_number != null ? item.spaj_number : '-'}</td>
		                              <td>{item.spaj_policy_no != null ? item.spaj_policy_no : '-'}</td>
		                              <td>{item.spaj_holder != null ? item.spaj_holder : '-'}</td>
		                              <td>{item.spaj_status != null ? item.spaj_status : '-'}</td>
		                              <td>{item.spaj_notes != null ? item.spaj_notes : '-'}</td>
		                            </tr>
		                          );
		                        }.bind(this))
		                    }
							</tbody>
						</table>
					</div>
				</div>
			  </div>
			</div>
		);
	}
}

export default NewBusinessModal;