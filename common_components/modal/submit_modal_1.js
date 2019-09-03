'use strict'

import api_route from '../../common_components/api_route';

class SubmitModal extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
        <div className="modal fade" id="submit_modal" tabindex="-1" role="dialog" aria-labelledby="mySubmitModal" aria-hidden="true">
					<div className="modal-dialog">
						<div className="modal-content">
							<div className="modal-header">
								<h3>Submit Ticket</h3>
							</div>
							<div className="modal-body">
								<form>
									<div className="form-group">
										<label for="agent_code">Message</label>
										<input type="text" className="form-control" id="problem" placeholder="Message " />
									</div>
								</form>
							</div>
							<div className="modal-footer">
								<button type="button" className="btn btn-default" data-dismiss="modal">Close</button>
        						<button type="button" className="btn btn-primary">Submit Ticket</button>
							</div>
						</div>
					</div>
				</div>
		);
	}
}

export default SubmitModal;