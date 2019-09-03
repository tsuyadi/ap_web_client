'use strict'

import React from 'react';

class LeftMenuPolicy extends React.Component {
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
            6:'-o',
            7:'-o'
        },
        policy_id: null
    }

    componentDidMount = () => {
        let p = this.props;
        if(p.active != null)
        {   let active_list = this.state.active;
            active_list[parseInt(p.active)] = '';
            this.setState({
                active: active_list,
                policy_id: p.policy_id
            });
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
                        <i className="fa fa-bars"></i> Policy
                    </span>
                </div>

                <div className="sidebar boxShadow">
                    <h2>Policy Detail</h2>
                    <ul>
                        <li><a href="#/policy/list_policies" title="List Policy"> Policy Tracking</a></li>
                        <li><a href={"#/policy/policy_info/"+this.state.policy_id} title="Policy Info"><i className={"fa fa-circle"+this.state.active[0]}></i> Policy Info</a></li>
                        <li><a href={"#/policy/premium_payment_information/"+this.state.policy_id} title="Policy Premium Payment"><i className={"fa fa-circle"+this.state.active[5]}></i> Premium Payment Information</a></li>
                        <li><a href={"#/policy/policy_holder_info/"+this.state.policy_id} title="Policy Holder Info"><i className={"fa fa-circle"+this.state.active[1]}></i> Policy Holder Info</a></li>
                        <li><a href={"#/policy/insured_info/"+this.state.policy_id} title="Insured Info"><i className={"fa fa-circle"+this.state.active[3]}></i> Insured Info</a></li>
                        <li><a href={"#/policy/investment/"+this.state.policy_id} title="Policy Investment"><i className={"fa fa-circle"+this.state.active[4]}></i> Investment</a></li>
                        <li><a href={"#/policy/support_document/"+this.state.policy_id} title="Document"><i className={"fa fa-circle"+this.state.active[9]}></i> Document</a></li>
                    </ul>
                </div>
            </div>
		);
	}
}

export default LeftMenuPolicy;
