'use strict'

import React from 'react';
import {getAllUrlParams} from '../../common_components/helper/url_helper';

class LeftMenuClaimTracking extends React.Component {
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
                6:'-o'
            },
            agent_id: null,
            type : getAllUrlParams(window.location.href).type,
            status : getAllUrlParams(window.location.href).status
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
                claim_id: p.claim_id,
                policy_id: p.policy_id
            });
        }
        console.log(this.state.type)
    }

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	render(){
        
		return (
			<div className="sidebar-wrapper">
                <div className="menuSidebar hidden-xs" onClick={this.openMenu}>
                    <span className="menuIconSidebar">
                        <i className="fa fa-bars"></i> CLAIM TRACKING
                    </span>
                </div>

                <div className="sidebar boxShadow">
                    <h3>CLAIM TRACKING</h3>
                    <ul>
                        <li><a href="#/claim_tracking" title="List Policy"> Claim Tracking</a></li>
                        <li><a href={"#/claim_tracking/claim_data/"+this.state.claim_id+"/"+this.state.policy_id+'?type='+this.state.type+'&status='+this.state.status} title="Claim Data"><i className={"fa fa-circle"+this.state.active[0]}></i> Claim Data</a></li>
                        <li><a href={"#/claim_tracking/document/"+this.state.claim_id+"/"+this.state.policy_id+'?type='+this.state.type+'&status='+this.state.status} title="Document"><i className={"fa fa-circle"+this.state.active[1]}></i> Document</a></li>
                        <li><a href={"#/claim_tracking/claim_notes/"+this.state.claim_id+"/"+this.state.policy_id+'?type='+this.state.type+'&status='+this.state.status} title="Claim Notes"><i className={"fa fa-circle"+this.state.active[2]}></i> Claim Notes Inquiry</a></li>
                        { this.state.status == 'approved' ? (<li><a href={"#/claim_tracking/payment_info/"+this.state.claim_id+"/"+this.state.policy_id+'?type='+this.state.type+'&status='+this.state.status} title="Decision and Payment Info"><i className={"fa fa-circle"+this.state.active[3]}></i> Decision and Payment Info</a></li>) : ''}
                        { (this.state.type == 'hns' || this.state.type == 'hsr') ? (<li><a href={"#/claim_tracking/benefit/"+this.state.claim_id+"/"+this.state.policy_id+'?type='+this.state.type+'&status='+this.state.status} title="Benefit"><i className={"fa fa-circle"+this.state.active[4]}></i> Benefit</a></li>) : ''}
                        <li><a href={"#/claim_tracking/policy_info/"+this.state.claim_id+"/"+this.state.policy_id+'?type='+this.state.type+'&status='+this.state.status} title="Policy Info"><i className={"fa fa-circle"+this.state.active[5]}></i> Policy Info</a></li>
                    </ul>
                </div>
            </div>
		);
	}
}
export default LeftMenuClaimTracking;
 