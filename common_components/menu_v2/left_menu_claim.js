'use strict'

import React from 'react';

class LeftMenuClaim extends React.Component {
	constructor(props){
		super(props);
	}

    state = {
        active : {
            0:'-o',
            1:'-o',
            2:'-o',
            3:'-o',
            4:'-o',
            5:'-o',
            6:'-o'
        },
        policy_id: null
    }

    componentWillReceiveProps = (p) => {
        if(p.active != null)
        {
            this.state.active[p.active]     = ''; //Set active menu
            this.state.policy_id            = p.policy_id; //Set POLICY ID
        }
    }


    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }
	render(){

		return (
			<div className="sidebar-wrapper">
                <div className="menuSidebar hidden-xs" onClick={this.openMenu}>
                    <span className="menuIconSidebar">
                        <i className="fa fa-bars"></i> Claim
                    </span>
                </div>

                <div className="sidebar">
                    <h2>Claim Info</h2>
                    <ul>
                        <li><a href="#/claim/claim_detail" title="Claim Detail"><i className={"fa fa-circle"+this.state.active[0]}></i> Claim Detail</a></li>
                        <li><a href="#/claim/policy_info" title="Policy Info"><i className={"fa fa-circle"+this.state.active[0]}></i> Policy Info</a></li>
                        <li><a href="#/claim/policy_holder_info" title="Policy Holder Info"><i className={"fa fa-circle"+this.state.active[0]}></i> Policy Holder Info</a></li>
                        <li><a href="#/claim/life_assured_info" title="Life Assured Info"><i className={"fa fa-circle"+this.state.active[0]}></i> Life Assured Info</a></li>
                    </ul>
                </div>
            </div>
		);
	}
}

export default LeftMenuClaim;
