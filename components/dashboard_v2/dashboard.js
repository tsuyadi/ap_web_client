"use strict"

import React from 'react';
import CekAuth from '../../common_components/helper/cek_auth';

class dashboard_default extends React.Component {

    constructor(props){
		super(props);
		
	}

    componentWillMount = () => {
		CekAuth();
	}

    render(){
        window.location.reload();
        return(
            <div></div>
        );
    }

}

export default dashboard_default;