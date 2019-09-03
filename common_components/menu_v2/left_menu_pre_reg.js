'use strict'

import React from 'react';

class LeftMenuPreReg extends React.Component {
	constructor(props){
		super(props);
        this.state = {
            active : {
                0:'-o',
                1:'-o',
                2:'-o',
                3:'-o',
                4:'-o'
            },
            agent_id: null
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
                agent_id: p.agent_id
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
                        <i className="fa fa-bars"></i> Pre Reg
                    </span>
                </div>

                <div className="sidebar boxShadow">
                    <h3>Pre Registration</h3>
                    <ul>
                        <li><a href="#/pre/oc_selling" title="SPAJ Pre-Registration"><i className={"fa fa-circle"+this.state.active[0]}></i> SPAJ Pre-Registration</a></li>
                        {/* <li><a href="#/sam_report/oc_recruit" title="Open Case Recruit"><i className={"fa fa-circle"+this.state.active[1]}></i> Open Case Recruit</a></li> */}
                        {/* <li><a href="#/sam_report/detail_activity" title="Detail Activity"><i className={"fa fa-circle"+this.state.active[1]}></i> Menu 2</a></li>
                        <li><a href="#/sam_report/detail_activity" title="Detail Activity"><i className={"fa fa-circle"+this.state.active[2]}></i> Menu 3</a></li> */}
                        {/* <li><a href="#/premium_due_data/" title="Premium Due Data"><i className={"fa fa-circle"+this.state.active[3]}></i> Premium Due Date</a></li> */}
                        {/* <li><a href="#/unit_price/" title="Unit Price"><i className={"fa fa-circle"+this.state.active[4]}></i> Unit Price</a></li> */}
                        {/*<li className="hidden"><a href="#/claim/" title="Claim"><i className={"fa fa-circle"+this.state.active[4]}></i> Claim</a></li>*/}
                    </ul>
                </div>
            </div>
		);
	}
}
export default LeftMenuPreReg;
 