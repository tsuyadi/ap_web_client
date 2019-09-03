'use strict'

import React from 'react';

class LeftMenuPolicy extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            active : {
                0:'-o',
                1:'-o',
                2:'-o',
                3:'-o',
                4:'-o',
                5:'-o',
                6:'-o',
            },
            policy_id: null
        }
        this.openMenu = this.openMenu.bind(this);
	}

    componentDidMount(){
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
                        <i className="fa fa-bars"></i> Inquiry
                    </span>
                </div>

                <div className="sidebar boxShadow">
                    <h2>Inquiry</h2>
                    <ul>
                        <li><a href="#/newbusiness/inquiry" title="SPAJ Tacking"><i className={"fa fa-circle"+this.state.active[0]}></i> SPAJ Tracking</a></li>
                        <li><a href="#/policy/list_policies" title="List Policy"><i className={"fa fa-circle"+this.state.active[1]}></i> Policy Tracking</a></li>
                        <li><a href="#/lapse_policy/" title="Lapse Policy"><i className={"fa fa-circle"+this.state.active[2]}></i> Lapse Policy</a></li>
                        <li><a href="#/premium_due_data/" title="Premium Due Data"><i className={"fa fa-circle"+this.state.active[3]}></i> Premium Due Date</a></li>
                        <li><a href="#/suspense/" title="Suspense"><i className={"fa fa-circle"+this.state.active[5]}></i> Suspense</a></li>
                        <li><a href="#/unit_price/" title="Unit Price"><i className={"fa fa-circle"+this.state.active[4]}></i> Unit Price</a></li>
                        <li><a href="#/claim_tracking/" title="Claim Tracking"><i className={"fa fa-circle"+this.state.active[6]}></i> Claim Tracking</a></li>
                    </ul>
                </div>
            </div>
		);
	}
}
export default LeftMenuPolicy;
