'use strict'

import React from 'react';

class Footer extends React.Component {
	constructor(props){
		super(props);
	}

	render(){
		return (
			<div>
				<div className="clearfix"><br/></div>
			<div className="footer-wrapper">
				<div className="footer">
					<div className="disclaimer">
						
					</div>
					
					<div className="copyright">
						&copy; 2017 TMLI Agency Portal - Powered by TMLI - Best View using Chrome, Firefox and IE 11
					</div>
				</div>
			</div>
			</div>
		);
	}
}

export default Footer;
