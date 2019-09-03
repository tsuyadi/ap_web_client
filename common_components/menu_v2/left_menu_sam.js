'use strict'

import React from 'react';

class LeftMenuSam extends React.Component {
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
            sales_dd : '',
            style_sales:'',
            class_sales:'',
            agent_id: null
        }
        this.openMenu = this.openMenu.bind(this);
	}

    componentDidMount(){
        let p = this.props;
        
        if(p.active != null)
        {  
            let active_list = this.state.active;
            active_list[parseInt(p.active)] = '';
            this.setState({
                active: active_list,
                agent_id: p.agent_id
            });
        }else{
            this.state.active[5] = '';
        }
    }

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }
    
    openMenuSales(){
        if(this.state.sales_dd == 0){
            this.setState({
                sales_dd : 1
            })
        } else {
            this.setState({
                sales_dd : 0
            })
        }
    }

	render(){
        let style_sales = null;
        let class_sales = null;
        if(this.state.sales_dd == 1 || this.props.active == 3 || this.props.active == 4 || this.props.active == 5){
            style_sales = {
                paddingLeft:'25px',
            }
            class_sales = 'fa fa-circle'
        }else{
            style_sales = {
                paddingLeft:'25px',
                display: 'none'
            }
            class_sales = 'fa fa-circle-o'
        }
		return (
			<div className="sidebar-wrapper">
                <div className="menuSidebar hidden-xs" onClick={this.openMenu}>
                    <span className="menuIconSidebar">
                        <i className="fa fa-bars"></i> AMS REPORT
                    </span>
                </div>

                <div className="sidebar boxShadow">
                    <h3>AMS Report</h3>
                    <ul>
                        <li><a href="#/ams_report/dashboard?uri=ams_dashboard" title="Dashboard"><i className={"fa fa-circle"+this.state.active[0]}></i> Dashboard</a></li>
                        { (localStorage.getItem('role') == 14 || localStorage.getItem('role') == 8 || localStorage.getItem('role') == 9 || localStorage.getItem('role') == 13 || localStorage.getItem('role') == 15 || localStorage.getItem('role') == 16) ? '' : (<li><a href="#/ams_report/utilization_report" title="Dashboard"><i className={"fa fa-circle"+this.state.active[1]}></i> AMS Utilization Report</a></li>)}
                        <li><a href="#/ams_report/free_pa" title="Free PA"><i className={"fa fa-circle"+this.state.active[2]}></i> AMS Free PA</a></li>
                        {/* <li><a href="#/sam_report/oc_selling" title="Open Case Selling"><i className={"fa fa-circle"+this.state.active[0]}></i> Open Case Sales</a></li> */}
                        {/* <li><a href="#/sam_report/oc_recruit" title="Open Case Recruit"><i className={"fa fa-circle"+this.state.active[1]}></i> Open Case Recruit</a></li> */}
                        <li style={{cursor:'pointer'}} onClick={this.openMenuSales.bind(this)}><i className={class_sales}></i>Sales Activity Report</li>
                        <li style={style_sales}><a href="#/sam_report/detail_activity" title="Detail Activity"><i className={"fa fa-circle"+this.state.active[3]}></i> Detail Activity Inquiry</a></li>
                        {/* <li><a href="#/premium_due_data/" title="Premium Due Data"><i className={"fa fa-circle"+this.state.active[3]}></i> Premium Due Date</a></li> */}
                        {/* <li><a href="#/unit_price/" title="Unit Price"><i className={"fa fa-circle"+this.state.active[4]}></i> Unit Price</a></li> */}
                        {/*<li className="hidden"><a href="#/claim/" title="Claim"><i className={"fa fa-circle"+this.state.active[4]}></i> Claim</a></li>*/}
                        <li style={style_sales}><a href="#/ams_report/prospect_movement" title="Prospect Movement"><i className={"fa fa-circle"+this.state.active[4]}></i> Prospect Movement</a></li>
                        <li style={style_sales}><a href="#/ams_report/effectivity_ratio" title="Effectivity Ratio"><i className={"fa fa-circle"+this.state.active[5]}></i> Effectivity Ratio</a></li>
                    </ul>
                </div>
            </div>
		);
	}
}
export default LeftMenuSam;
 