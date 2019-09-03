'use strict'

import React from 'react';

class Loading extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div className="modal fade" id="loading" tabindex="-1" data-backdrop="static" data-keyboard="false" role="dialog" aria-labelledby="myModalLabel">
				<div className="modal-dialog">
					<div className="modal-content loading">
						<i className="fa fa-spinner fa-pulse"></i>
					</div>
				</div>
			</div>
		);
	}
}

export default Loading;


