'use strict'

import {CheckAgentType,DateFormat, DateFormatExYMD, srvTime} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import {loadLink, load} from '../../common_components/helper/url_helper';
import Loading from '../../common_components/loading';

import TopMenu from '../../common_components/menu_v2/menu_comission';
import Footer from '../../common_components/footer';

import SubmitModal from '../../common_components/modal/submit_modal';

import {getMenu} from '../../common_components/helper/user_session';

import {CATEGORY, TYPE} from '../../common_components/helper/constant';

import MemoFormList from '../memo/MemoFormList';
import MemoForm from '../memo/MemoForm';

import FeatureModal from '../../common_components/modal/feature_modal';
import CommissionDetail from './commission_detail';

class commission_v2 extends React.Component {
	constructor(props){
		super(props);
		CekAuth();

		this.state = {
			title : '',
			status : '' ,
            active : {
                0:'-o',
                1:'-o',
                2:'-o',
                3:'-o',
                4:'-o'
            },
			menu_folder : ''
		}
		this.handleChangeData = this.handleChangeData.bind(this);
		// this.menuClick = this.menuClick.bind(this);
        // this.openMenu = this.openMenu.bind(this);
	}

	componentWillMount(){
		var role = localStorage.getItem('role');
		if(role == 9 || role == 8 || role == 14){
			this.setState({
				menu_folder : 'menu_1',
				title : 'My Personal Commission',
				status : 'weekly_bonus',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
					4:'-o'
				},
			})
		}else if(role == 7 || role == 6 || role== 5){
			this.setState({
				menu_folder : 'menu_2',
				title : 'My Personal Commission',
				status : 'weekly_bonus',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
					4:'-o'
				},
			})
		}
	}
	
	handleChangeData(e){
		$('li').removeClass("active");
		var role = localStorage.getItem('role');
		if(e.target.value == 'personal' && (role == 9 || role == 8 || role == 14)){
			this.setState({
				menu_folder : 'menu_1',
				status : 'weekly_bonus',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
					4:'-o'
				},
				title : 'My Personal Commission'
			})
		}else if(e.target.value == 'personal' && (role == 7 || role == 6 || role== 5)){
			this.setState({
				menu_folder : 'menu_2',
				status : 'weekly_bonus',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
					4:'-o'
				},
				title : 'My Personal Commission'
			})
		}else if(e.target.value == 'group' && (role == 7 || role == 6)){
			this.setState({
				menu_folder : 'menu_3',
				status : 'overriding_group',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
					4:'-o'
				},
				title : 'My Group Commission'
			})
		}else if(e.target.value == 'group' && (role == 5)){
			this.setState({
				menu_folder : 'menu_4',
				status : 'mpa_mio_mib',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
					4:'-o'
				},
				title : 'My Group Commission'
			})
		} else if(e.target.value == 'clear'){
			this.setState({
				menu_folder : 'menu_5',
				title : 'Select Category'
			})
		}
	}

	menuClick = (menu_name, active) =>{
        
        let active_list = ['-o','-o','-o','-o','-o'];
        active_list[parseInt(active)] = '';
		this.setState({
			status : menu_name,
            active: active_list,
        });
        // console.log("masuk" + this.state);
        // this.props.menu(this.state.menu); 
        // console.log(this.state);
		$('li').removeClass("active");
		$('#'+menu_name).addClass("active");
	}
	// menuClick(menu_name){
	// 	this.setState({
	// 		status : menu_name
	// 	})
	// 	$('li').removeClass("active");
	// 	$('#'+menu_name).addClass("active");
	// }

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
        console.log(this.state.active);
    }


	render(){
		
		$(document).ready(function(){
			$('ul li a').click(function(){
				$('li a').removeClass("active");
				$(this).addClass("active");
			});
		});
		let choosen_menu = this.state.status && this.state.status;
		let sidemenu = this.state.menu_folder;
		let menu = getMenu('My Commission', 'fa fa-dollar');
		let titleMenu = '';
		let subTitleMenu = '';
		let list_menu = [];
		let list_menu_ = [];
		let navsidemenu = [];
		let navsidemenuxs = [];
		switch(sidemenu){
			case 'menu_1' :
				navsidemenu.push(
				<ul>
					<li ><a onClick={this.menuClick.bind(this, "weekly_bonus", 0)}><i className={"fa fa-circle"+this.state.active[0]}></i> Weekly Bonus</a></li>
					<li ><a onClick={this.menuClick.bind(this, "yearly_bonus", 1)}><i className={"fa fa-circle"+this.state.active[1]}></i> Yearly Bonus</a></li>
					<li ><a onClick={this.menuClick.bind(this, "agent_", 2)}><i className={"fa fa-circle"+this.state.active[2]}></i> Agent get Agent</a></li>
					<li ><a onClick={this.menuClick.bind(this, "persistency", 3)}><i className={"fa fa-circle"+this.state.active[3]}></i> Persistency</a></li>
					<li ><a onClick={this.menuClick.bind(this, "overriding", 4)}><i className={"fa fa-circle"+this.state.active[4]}></i> Overriding</a></li>
				</ul>
				);
				navsidemenuxs.push(
				<ul id="simple">
					<li id="weekly_bonus"><a onClick={this.menuClick.bind(this, "weekly_bonus")}> Weekly Bonus</a></li>
					<li id="yearly_bonus"><a onClick={this.menuClick.bind(this, "yearly_bonus")}> Yearly Bonus</a></li>
					<li id="agent_"><a onClick={this.menuClick.bind(this, "agent_")}> Agent get Agent</a></li>
					<li id="persistency"><a onClick={this.menuClick.bind(this, "persistency")}> Persistency</a></li>
					<li id="overriding"><a onClick={this.menuClick.bind(this, "overriding")}> Overriding</a></li>
				</ul>
				);
				break;
			case 'menu_2' :
				navsidemenu.push(
				<ul>
				<li ><a onClick={this.menuClick.bind(this, "weekly_bonus", 0)}><i className={"fa fa-circle"+this.state.active[0]}></i> Weekly Bonus</a></li>
					<li ><a onClick={this.menuClick.bind(this, "yearly_bonus", 1)}><i className={"fa fa-circle"+this.state.active[1]}></i> Yearly Bonus</a></li>
					<li ><a onClick={this.menuClick.bind(this, "persistency", 2)}><i className={"fa fa-circle"+this.state.active[2]}></i> Persistency</a></li>
					<li style={localStorage.getItem('role') != 5 ? {display:'none'} : {}}><a onClick={this.menuClick.bind(this, "overriding_rd", 3)}> <i className={"fa fa-circle"+this.state.active[3]}></i>Overriding Penjualan Pribadi</a></li>
				</ul>
				);
				navsidemenuxs.push(
				<ul id="simple">
					<li id="weekly_bonus"><a onClick={this.menuClick.bind(this, "weekly_bonus")}> Weekly Bonus</a></li>
					<li id="yearly_bonus"><a onClick={this.menuClick.bind(this, "yearly_bonus")}> Yearly Bonus</a></li>
					<li id="persistency"><a onClick={this.menuClick.bind(this, "persistency")}> Persistency</a></li>
					<li id="overriding_rd" style={localStorage.getItem('role') != 5 ? {display:'none'} : {}}><a onClick={this.menuClick.bind(this, "overriding_rd")}> Overriding Penjualan Pribadi</a></li>
				</ul>
				);
				break;
			case 'menu_3' :
				navsidemenu.push(
				<ul>
				<li ><a onClick={this.menuClick.bind(this, "overriding_group", 0)}><i className={"fa fa-circle"+this.state.active[0]}></i> Overriding</a></li>
					<li ><a onClick={this.menuClick.bind(this, "bonus_overriding", 1)}><i className={"fa fa-circle"+this.state.active[1]}></i> Bonus Overriding</a></li>
					<li style={localStorage.getItem('role') == 6 ? {} : {display:'none'}}><a onClick={this.menuClick.bind(this, "parallel_overriding", 2)}><i className={"fa fa-circle"+this.state.active[2]}></i> Parallel Overriding</a></li>
				</ul>
				);
				navsidemenuxs.push(
				<ul id="simple">
					<li id="overriding_group"><a onClick={this.menuClick.bind(this, "overriding_group")}> Overriding</a></li>
					<li id="bonus_overriding"><a onClick={this.menuClick.bind(this, "bonus_overriding")}> Bonus Overriding</a></li>
					<li id="parallel_overriding" style={localStorage.getItem('role') == 6 ? {} : {display:'none'}}><a onClick={this.menuClick.bind(this, "parallel_overriding")}> Parallel Overriding</a></li>
				</ul>
				);
				break;
			case 'menu_4' :
				navsidemenu.push(
				<ul>
				<li ><a onClick={this.menuClick.bind(this, "mpa_mio_mib", 0)}><i className={"fa fa-circle"+this.state.active[0]}></i> MPA, MIO, MIB</a></li>
					<li ><a onClick={this.menuClick.bind(this, "quarterly_bonus", 1)}><i className={"fa fa-circle"+this.state.active[1]}></i> Quarterly Bonus</a></li>
					<li ><a onClick={this.menuClick.bind(this, "yearly_bonus_rd", 2)}><i className={"fa fa-circle"+this.state.active[2]}></i> Yearly Bonus</a></li>
				</ul>
				);
				navsidemenuxs.push(
				<ul id="simple">
					<li id="mpa_mio_mib"><a onClick={this.menuClick.bind(this, "mpa_mio_mib")}> MPA, MIO, MIB</a></li>
					<li id="quarterly_bonus"><a onClick={this.menuClick.bind(this, "quarterly_bonus")}> Quarterly Bonus</a></li>
					<li id="yearly_bonus_rd"><a onClick={this.menuClick.bind(this, "yearly_bonus_rd")}> Yearly Bonus</a></li>
				</ul>
				);
				break;
			case 'menu_5' :
				navsidemenu.push('');
				break;
			default :
				navsidemenu.push('');
				break;
		}
		if(this.state.title){
			titleMenu = (this.state.title == '') ? 'Select Sub-Category '+this.state.title : this.state.title;
		}
		if(this.state.status && this.state.status){
			list_menu.push(<CommissionDetail menu ={choosen_menu} menu_folder={this.state.menu_folder}/>);
			switch(this.state.status){
				case 'weekly_bonus' :
					subTitleMenu = 'Weekly Bonus';
					break;
				case 'yearly_bonus' :
					subTitleMenu = 'Yearly Bonus '+new Date().getFullYear();
					break;
				case 'agent_' :
					subTitleMenu = 'Agent Get Agent';
					break;
				case 'persistency' :
					subTitleMenu = 'Persistency';
					break;
				case 'overriding' :
					subTitleMenu = 'AMP / RMP Overriding';
					break;
				case 'overriding_group' :
					subTitleMenu = 'Overriding';
					break;
				case 'bonus_overriding' :
					subTitleMenu = 'Bonus Overriding';
					break;
				case 'parallel_overriding' :
					subTitleMenu = 'Parallel Overriding';
					break;
				case 'mpa_mio_mib' :
					subTitleMenu = 'MPA, MIO, MIB';
					break;
				case 'overriding_rd' :
					subTitleMenu = 'Overriding Penjualan Pribadi';
					break;
				case 'quarterly_bonus' :
					subTitleMenu = 'Quarterly Bonus';
					break;
				case 'yearly_bonus_rd' :
					subTitleMenu = 'Yearly Bonus';
					break;
				case 'rd_compasation' :
					subTitleMenu = 'RD Compasation';
					break;
				case '' :
					subTitleMenu = 'Select Sub-Category '+titleMenu;
					break;
				default :
					subTitleMenu = 'Select Sub-Category '+titleMenu;
					// list_menu.push('');
					break;
			}
		}else{ list_menu.push(''); }
		list_menu_ = list_menu;

		return (
			<div className="wrap2">
			{menu}
			<FeatureModal />
			<SubmitModal />
			<div className="main-wrapper ">
					<ol className="breadcrumb" style={{marginBottom: '5px', marginTop:'55px'}}>
						<li className="active">My Commission</li>
					</ol> 
					
					<div className="row visible-xs">
						<div className="col-xs-12">
							<div className="panel panel-default">
								<div className="panel-body" id="panelMemo">
									<form>
										<select className="form-control" id="spaj_status" name="spaj_status" onChange={this.handleChangeData} style={{fontSize:'20px', height:'50px'}}>
											<option value="personal">Personal</option>									
											{localStorage.getItem('role') == 5 || localStorage.getItem('role') == 6 || localStorage.getItem('role') == 7 ?
												<option value="group">Group</option> :''
											}
										</select>
									</form>
									<br/>
									<div id="menu-side"> {navsidemenuxs}</div>
									
								</div>
							</div>
						</div>
					</div>
				<div className="main twoColumnMain">
				
					<div className="sidebar boxShadow">
						{/* <h2>Inquiry</h2> */}
						<select className="form-control" id="spaj_status" name="spaj_status" onChange={this.handleChangeData} style={{fontSize:'20px', height:'50px'}}>
							<option value="personal">Personal</option>									
							{localStorage.getItem('role') == 5 || localStorage.getItem('role') == 6 || localStorage.getItem('role') == 7 ?
								<option value="group">Group</option> :''
							}
						</select>
						{navsidemenu}
					</div>
					<div className="main-content boxShadow" style={{paddingTop:'0px'}}>
						<div style={{textAlign:'center'}}><h3>{titleMenu}</h3></div>
						<div className="row">
						
							<div className="col-sm-12">
							<div className="panel panel-default">
								<div className="panel-heading" style={{'backgroundColor':'#0096A9', 'color':'#FFF', 'fontWeight':'bold', 'overflow':'hidden'}}>
									<div className="panel-title">
										<div className="row">
											<div className="col-xs-10 col-sm-11"> {subTitleMenu}</div>
										</div>
									</div>
								</div>

								<div className="panel-body boxShadow" id="konten"> 
									<div className="row loadresult">
										<div className="col-xs-12">  
											{list_menu_}
										</div>
									</div>
								</div>
							</div>
							</div>
						</div>
					</div>				
				</div>
			</div>
			
			<Footer />
			
		</div>
		);
	}
}

export default commission_v2;