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
import TakumiCommissionDetail from './takumi_commission_detail';

class takumi_commission extends React.Component {
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
		if(role == 13 || role == 15 || role == 16){
			this.setState({
				menu_folder : 'menu_1',
				title : 'My Personal Commission',
				status : 'weekly_calculation',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
					4:'-o'
				},
			})
		}else if(role == 11 || role == 12){
			this.setState({
				menu_folder : 'menu_2',
				title : 'My Personal Commission',
				status : 'personal_monthly_bonus',
				active :  {
					0:'',
					1:'-o',
				},
			})
		}
	}
	
	handleChangeData(e){
		$('li').removeClass("active");
		var role = localStorage.getItem('role');
		if(e.target.value == 'personal' && (role == 13 || role == 15 || role == 16)){
			this.setState({
				menu_folder : 'menu_1',
				status : 'weekly_calculation',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
					4:'-o'
				},
				title : 'My Personal Commission'
			})
		}else if(e.target.value == 'personal' && (role == 11 || role == 12)){
			this.setState({
				menu_folder : 'menu_2',
				status : 'personal_monthly_bonus',
				active :  {
					0:'',
					1:'-o',
				},
				title : 'My Personal Commission'
			})
		}else if(e.target.value == 'group' && (role == 11 || role == 12)){
			this.setState({
				menu_folder : 'menu_3',
				status : 'group_monthly_bonus',
				active :  {
					0:'',
					1:'-o',
					2:'-o',
					3:'-o',
				},
				title : 'My Group Commission'
			})
		}else if(e.target.value == 'clear'){
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
					<li ><a onClick={this.menuClick.bind(this, "weekly_calculation", 0)}><i className={"fa fa-circle"+this.state.active[0]}></i> Weekly Calculation</a></li>
					<li ><a onClick={this.menuClick.bind(this, "agent_", 1)}><i className={"fa fa-circle"+this.state.active[1]}></i> Agent get Agent</a></li>
					<li ><a onClick={this.menuClick.bind(this, "bonus_stc_etc", 2)}><i className={"fa fa-circle"+this.state.active[2]}></i> Bonus STC, ETC</a></li>
					<li ><a onClick={this.menuClick.bind(this, "personal_monthly_bonus", 3)}><i className={"fa fa-circle"+this.state.active[3]}></i> Monthly Bonus</a></li>
					<li ><a onClick={this.menuClick.bind(this, "personal_yearly_bonus", 4)}><i className={"fa fa-circle"+this.state.active[4]}></i> Yearly Bonus</a></li>
				</ul>
				);
				navsidemenuxs.push(
				<ul id="simple">
					<li id="weekly_calculation"><a onClick={this.menuClick.bind(this, "weekly_calculation")}> Weekly Calculation</a></li>
					<li id="agent_"><a onClick={this.menuClick.bind(this, "agent_")}> Agent get Agent</a></li>
					<li id="bonus_stc_etc"><a onClick={this.menuClick.bind(this, "bonus_stc_etc")}> Bonus STC, ETC</a></li>
					<li id="personal_monthly_bonus"><a onClick={this.menuClick.bind(this, "personal_monthly_bonus")}> Monthly Bonus</a></li>
					<li id="personal_yearly_bonus"><a onClick={this.menuClick.bind(this, "personal_yearly_bonus")}> Yearly Bonus</a></li>
				</ul>
				);
				break;
			case 'menu_2' :
				navsidemenu.push(
				<ul>
                    <li ><a onClick={this.menuClick.bind(this, "personal_monthly_bonus", 0)}><i className={"fa fa-circle"+this.state.active[0]}></i> Monthly Bonus</a></li>
                    <li ><a onClick={this.menuClick.bind(this, "personal_yearly_bonus", 1)}><i className={"fa fa-circle"+this.state.active[1]}></i> Yearly Bonus</a></li>
				</ul>
				);
				navsidemenuxs.push(
				<ul id="simple">
                    <li id="personal_monthly_bonus"><a onClick={this.menuClick.bind(this, "personal_monthly_bonus")}> Monthly Bonus</a></li>
                    <li id="personal_yearly_bonus"><a onClick={this.menuClick.bind(this, "personal_yearly_bonus")}> Yearly Bonus</a></li>
				</ul>
				);
				break;
			case 'menu_3' :
				navsidemenu.push(
                <ul>
                    <li ><a onClick={this.menuClick.bind(this, "group_monthly_bonus", 0)}><i className={"fa fa-circle"+this.state.active[0]}></i> Monthly Bonus</a></li>
                    <li ><a onClick={this.menuClick.bind(this, "group_yearly_bonus", 1)}><i className={"fa fa-circle"+this.state.active[1]}></i> Yearly Bonus</a></li>
                    <li ><a onClick={this.menuClick.bind(this, "overriding", 2)}><i className={"fa fa-circle"+this.state.active[2]}></i> Overriding</a></li>
                    <li ><a onClick={this.menuClick.bind(this, "parallel_overriding", 3)}><i className={"fa fa-circle"+this.state.active[3]}></i> Paralle Overiding</a></li>
                </ul>
				);
				navsidemenuxs.push(
                <ul id="simple">
                    <li id="group_monthly_bonus"><a onClick={this.menuClick.bind(this, "group_monthly_bonus")}> Monthly Bonus</a></li>
                    <li id="group_yearly_bonus"><a onClick={this.menuClick.bind(this, "group_yearly_bonus")}> Yearly Bonus</a></li>
                    <li id="overriding"><a onClick={this.menuClick.bind(this, "overriding")}> Overriding</a></li>
                    <li id="parallel_overriding"><a onClick={this.menuClick.bind(this, "parallel_overriding")}> Paralle Overiding</a></li>
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
			list_menu.push(<TakumiCommissionDetail menu ={choosen_menu} menu_folder={this.state.menu_folder}/>);
			switch(this.state.status){
				case 'weekly_calculation' :
					subTitleMenu = 'Weekly Calculation';
					break;
				case 'agent_' :
					subTitleMenu = 'Agent Get Agent';
					break;
                case 'bonus_stc_etc' :
                    subTitleMenu = 'Bonus STC, ETC';
                    break;
				case 'personal_monthly_bonus' :
					subTitleMenu = 'Personal Monthly Bonus';
					break;
				case 'personal_yearly_bonus' :
					subTitleMenu = 'Personal Yearly Bonus';
					break;
				case 'group_monthly_bonus' :
					subTitleMenu = 'Group Monthly Bonus';
					break;
				case 'group_yearly_bonus' :
					subTitleMenu = 'Group Yearly Bonus';
					break;
				case 'overriding' :
					subTitleMenu = 'Overriding';
                    break;
                case 'parallel_overriding' :
					subTitleMenu = 'Parallel Overriding';
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
											{localStorage.getItem('role') == 11 || localStorage.getItem('role') == 12 ?
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
							{localStorage.getItem('role') == 11 || localStorage.getItem('role') == 12 ?
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

export default takumi_commission;