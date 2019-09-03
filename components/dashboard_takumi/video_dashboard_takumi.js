'use strict'

import React from 'react';

class VideoDashboardTakumi extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			data : null
		}
	}

	componentWillReceiveProps = (props) => {
	}

	componentDidMount = () => {  
    }

	render(){
		return (
		<div style={{background:'black',padding:'0px', 'border-radius':0}}>
			<div className="panel panel-default boxShadow hidden-xs hidden-sm" style={{height:'550px', background:'black', margin:0, padding:0, 'border-radius':0}}>
				<div className="panel-body" style={{height:'550px', background:'black', margin:0, padding:0}}>
					<div className="col-sm-12" style={{height:'550px'}} >
						<div className="embed-responsive embed-responsive-16by9" style={{height:'550px', background:'black', margin:0, padding:0}} >
							<iframe className='sproutvideo-playlist embed-responsive-item' src='https://videos.sproutvideo.com/playlist/7c9ddeb01ef4/5438cb7fcc4a579e?layout=2&amp;continuous=false' frameBorder='0' allowFullScreen style={{height:'100%', margin :'0px'}}></iframe>
						</div>
					</div>
				</div>
			</div>

			<div className="panel panel-default boxShadow hidden-md hidden-lg" style={{height:'200px', background:'black', margin:0, padding:0, 'border-radius':0}}>
				<div className="panel-body" style={{height:'200px', background:'black', margin:0, padding:0}}>
					<div className="col-sm-12" style={{height:'200px'}} >
						<div className="embed-responsive embed-responsive-16by9" style={{height:'200px', background:'black', margin:0, padding:0}} >
							<iframe className='sproutvideo-playlist embed-responsive-item' src='https://videos.sproutvideo.com/playlist/7c9ddeb01ef4/5438cb7fcc4a579e?layout=2&amp;continuous=false' frameBorder='0' allowFullScreen style={{height:'100%', margin :'0px'}}></iframe>
						</div>
					</div>
				</div>
			</div>
		</div>
		);
	}
}

export default VideoDashboardTakumi;