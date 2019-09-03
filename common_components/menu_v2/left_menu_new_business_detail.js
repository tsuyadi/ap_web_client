'use strict'

import React from 'react';

class LeftMenuNewBusinessDetail extends React.Component {
	constructor(props){
		super(props);
	}

    state = {
        active : {
            0:'-o',
            1:'-o',
            2:'-o',
            3:'-o',
            4:'-o'
        },
        spaj_id: null
    }

    componentDidMount = () => {
        let p = this.props;
        if(p.active != null)
        {   let active_list = this.state.active;
            active_list[parseInt(p.active)] = '';
            this.setState({
                active: active_list,
                spaj_id: p.spaj_id
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
                        <i className="fa fa-bars"></i> SPAJ
                    </span>
                </div>

                <div className="sidebar boxShadow">
                    <h2>SPAJ Detail</h2>
                    <ul>
                        <li><a href={"#/newbusiness/inquiry"} title="Inquiry"> SPAJ Tracking</a></li>
                        <li><a href={"#/newbusiness/policy_info/"+this.state.spaj_id} title="Policy Holder Info"><i className={"fa fa-circle"+this.state.active[0]}></i> SPAJ Info</a></li>
                        <li><a href={"#/newbusiness/policy_holder_info/"+this.state.spaj_id} title="Policy Holder Info"><i className={"fa fa-circle"+this.state.active[1]}></i> Policy Holder Info</a></li>
                        <li><a href={"#/newbusiness/life_assured_info/"+this.state.spaj_id} title="Life Assured Info"><i className={"fa fa-circle"+this.state.active[2]}></i> Insured Info</a></li>
                        <li><a href={"#/newbusiness/support_document/"+this.state.spaj_id} title="Document"><i className={"fa fa-circle"+this.state.active[3]}></i> Document</a></li>
                    </ul>
                </div>
            </div>
		);
	}
}

export default LeftMenuNewBusinessDetail;
