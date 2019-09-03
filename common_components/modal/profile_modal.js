"use strict"

import React from 'react';

import api_route from '../../common_components/api_route';

import {CheckAgentType, DateFormat} from '../../common_components/helper/formatter';
import {AGENT_LEVEL} from '../../common_components/helper/constant';

import {load, AjaxDownloadFile} from '../../common_components/helper/url_helper';

import {LoadLabel} from '../../common_components/resources/label';

import AgentProfile from '../../components/dashboard_v2/agent_profile';
import NewBusinessTrackingSummary from '../../components/dashboard_v2/new_business_tracking_summary';
import Production from '../../components/dashboard_v2/production';
import Persistency from '../../components/dashboard_v2/persistency';
import WeeklyBonus from '../../components/dashboard_v2/weekly_bonus';
import YearEndBonus from '../../components/dashboard_v2/year_end_bonus';
import LeaderWeeklyBonus from '../../components/dashboard_v2/LeaderWeeklyBonus';
import GroupMonthlyReport from '../../components/dashboard_v2/group_monthly_report';
import GroupNewBusinessTrackingSummary from '../../components/dashboard_v2/group_new_business_tracking_summary';
import GroupProduction from '../../components/dashboard_v2/group_production';
import GroupPersistency from '../../components/dashboard_v2/group_persistency';

/* Available for SM Only */
import GroupSmOverriding from '../../components/dashboard_v2/group_sm_overriding';
import GroupSmBonusOverriding from '../../components/dashboard_v2/group_sm_bonus_overriding';

/* Available for DM Only */
import GroupOverriding from '../../components/dashboard_v2/group_overriding';
import GroupBonusOverriding from '../../components/dashboard_v2/group_bonus_overriding';

/* Available for RM Only */
import GroupRmOverriding from '../../components/dashboard_v2/group_rm_overriding';
import GroupRmParalllelOverriding from '../../components/dashboard_v2/group_rm_parallel_overriding';
import GroupRmBonusOverriding from '../../components/dashboard_v2/group_rm_bonus_overriding';

/* Available for RD Only */
import GroupRdMIO from '../../components/dashboard_v2/group_rd_mio';
import GroupRdMIB from '../../components/dashboard_v2/group_rd_mib';
import GroupRdMPA from '../../components/dashboard_v2/group_rd_mpa';
import GroupRdTotalIncome from '../../components/dashboard_v2/group_rd_total_income';
import GroupRdComission from '../../components/dashboard_v2/group_rd_comission';

/*
    Author  : Nasrul A Gifari
    Date    : 23 Sep 2016
    Param   : 
        1. id
        2. title
        3. message
 */

class ProfileModal extends React.Component {

    constructor(props)
    {
        super(props);

        this.state = {
            ch_old_password: "",
            ch_new_password: "",
            ch_new_password_conf: "",
            ch_status_s: "",
            ch_status_f: "",
            ch_name: localStorage.getItem('name'),
            ch_last_login: localStorage.getItem('last_login'),
            ch_username: localStorage.getItem('username'),
            status_response : "",
            disabled : "disabled",
            name : null,
            last_login : null,
            agent_profile : null,
            first_name: '-',
            fullname: '-',
            code: '-',
            status:  '-',
            gender: '-',
            birth_date: '-',
            religion: '-',
            marital_status: '-',
            id_number: '-',
            npwp_number: '-',
            ptkp_status: '-',
            bank_account_no: '-',
            bank_name: '-',
            bank_holder_name: '-',
            address: '-',
            phone: '-',
            mobile_phone: '-',
            business_phone: '-',
            email: '-',
            rd: '-',
            rm: '-',
            sm: '-',
            dm: '-',
            recruiter: '-',
            office_name: '-',
            aaji_number: '-',
            aaji_expired_date: '-',
            user : [],
            userLevel: ['Tokio Marine Management','Branch Admin','Senior Regional Sales Head','Regional Sales Head','Regional Director','Regional Manager','District Manager','Sales Manager','Financial Consultant']
        }

    }

    componentWillReceiveProps = (props) => {
        // // debugger;
        // from receiveProps

        // debugger;

        // $.ajax({
        //     url: api_route.agentDashboardv2,
        //     headers: {
        //     'Authorization':'JWT '+sessionStorage.getItem('token')
        //     },
        //     data: { 'agent' : props.productionCode },
        //     type: 'POST',
        //     success: successCallback,
        //     error: errorCallback
        // });

        // debugger;

        let response = props.profileData;

        if(props.profileData != null){
            this.setState({
              	name : props.profileName,
              	last_login : localStorage.getItem('last_login'),
              	agent_profile:response.content.agent_profile,
              	fullname: response.content.user.first_name + ' ' + response.content.user.last_name,
              	first_name: response.content.user.first_name,
              	last_name: response.content.user.last_name,
				code: response.content.agent_profile.code,
				status:  response.content.agent_profile.status,
				gender: response.content.agent_profile.gender,
				birth_date: DateFormat(response.content.agent_profile.birth_date),
				religion: response.content.agent_profile.religion,
				marital_status: response.content.agent_profile.marital_status,
				id_number: response.content.agent_profile.id_number,
				npwp_number: response.content.agent_profile.npwp_number,
				ptkp_status: response.content.agent_profile.ptkp_status,
				// di set kalo null ga tampil
				bank_account_no: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_no : '-'),
				bank_name: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].name : '-'),
				bank_holder_name: (response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_holder_name : '-'),
				address: (response.content.agent_profile.address_set[0] ? response.content.agent_profile.address_set[0].address : '-'),
				mobile_phone: (response.content.agent_profile.phone_set[0] ? response.content.agent_profile.phone_set[0].number : '-'),
				business_phone: (response.content.agent_profile.phone_set[1] ? response.content.agent_profile.phone_set[1].number : '-'),
		  		office_name: (response.content.agent_profile.branch != null ? (response.content.agent_profile.branch.name ? response.content.agent_profile.branch.name : '-') : ''),
				email: response.content.user.email,
				aaji_number: response.content.agent_profile.aaji_number,
				aaji_expired_date: DateFormat(response.content.agent_profile.aaji_expired_date),
              	user:response.content.user,
              	level_user:response.content.user.level.type,
              	level:response.content.user.level.parent,
				// di set kalo null ga tampil
				// rd: response.content.user.level.parent[1] ? response.content.user.level.parent[1].user : '-',
				// rm: response.content.user.level.parent[2] ? response.content.user.level.parent[2].user : '-',
				// dm: response.content.user.level.parent[3] ? response.content.user.level.parent[3].user : '-',
				// sm: response.content.user.level.parent[4] ? response.content.user.level.parent[4].user : '-',

              });
        }

        


    }

    componentDidMount = () => {
        
        
    }


    loadProfile = () => {

        // di PROFILE

        // debugger;

        let agent_level = '-';
		let sm = '-';
		let dm = '-';
		let rm = '-';
		let rd = '-';
		if(this.state.agent_profile)
		{
			if($.isNumeric(this.state.user.level.type)){
				agent_level = this.state.userLevel[parseInt(this.state.user.level.type) - 1];
			}
			else
			{
				agent_level = this.state.agent_profile.user.Level.type;
			}
		}
		if(this.state.level)
		{
			$.map(this.state.level, (value, index) => {
				if(value.type == "Regional Director"){
              			rd = value.user;
				}
				else if(value.type == "District Manager"){
              			dm = value.user;
				}
				else if(value.type == "Sales Manager"){
              			sm = value.user;
				}
				else if(value.type == "Regional Manager"){
              			rm = value.user;
				}
	        }); 		
		}

        return (
            <div className="main">
					<div className="container-fluid personalData boxShadow">
						<div className="title textShadow"><i className="fa fa-user"></i> {LoadLabel('PersonalData')}</div>
						<div className="row">
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('AgentName')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.fullname} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('AgentCode')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.code} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('AgentLevel')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={agent_level} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('AgentStatus')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" value={this.state.status} disabled />
									</div>
								</div>
							</form>
						  </div>
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('Sex')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="sex" value={this.state.gender} disabled />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('Birthdate')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" id="birthdate" name="birth_date" value={this.state.birth_date} disabled={this.state.disabled} onChange={this.handleChangeBirthdate}/>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('Religion')}</label>
									<div className="col-sm-8">
										<select className="form-control" id="religion" name="religion" disabled={this.state.disabled} onChange={this.handleChangeReligion}>
											<option selected={this.state.religion == "Islam" ? "selected" : ""} value="Islam">Islam</option>
											<option selected={this.state.religion == "Kristen" ? "selected" : ""} value="Kristen">Kristen</option>
											<option selected={this.state.religion == "Katholik" ? "selected" : "" || this.state.religion == "Katolik" ? "selected" : ""} value="Katholik">Katholik</option>
											<option selected={this.state.religion == "Hindu" ? "selected" : ""} value="Hindu">Hindu</option>
											<option selected={this.state.religion == "Buddha" ? "selected" : ""} value="Buddha">Buddha</option>
											<option selected={this.state.religion == "Kong Hu Cu" ? "selected" : ""} value="Kong Hu Cu">Kong Hu Cu</option>
											<option selected={this.state.religion == "Lain-lain" ? "selected" : ""} value="Lain-lain">Lain-lain</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('MaritalStatus')}</label>
									<div className="col-sm-8">
										<select className="form-control" id="marital_status" name="marital_status" disabled={this.state.disabled} onChange={this.handleChangeMarital}>
											<option selected={this.state.marital_status == "Belum Menikah" ? "selected" : ""} value="Belum Menikah">Belum Menikah</option>
											<option selected={this.state.marital_status == "Menikah" ? "selected" : ""} value="Menikah">Menikah</option>
											<option selected={this.state.marital_status == "Cerai" ? "selected" : ""} value="Cerai">Cerai</option>
											<option selected={this.state.marital_status == "Lainnya" ? "selected" : ""} value="Lainnya">Lainnya</option>
										</select>
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('IDNo')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="id_number" value={this.state.id_number} disabled={this.state.disabled} onChange={this.handleChangeIdnumber} />
									</div>
								</div>
							</form>
						  </div>
						  <div className="col-xs-4 responsive2">
							<form className="form-horizontal">
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('NPWPNo')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="npwp_number" value={this.state.npwp_number} disabled={this.state.disabled} onChange={this.handleChangeNpwpnumber} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('PTKPStatus')}</label>
									<div className="col-sm-8">
										<select className="form-control" id="ptkp_status" name="ptkp_status" disabled={this.state.disabled} onChange={this.handleChangePtkp}>
											<option selected={this.state.ptkp_status == "Kawin" ? "selected" : ""} value="Kawin">Kawin</option>
											<option selected={this.state.ptkp_status == "Kawin Tidak Punya Anak" ? "selected" : ""} value="Kawin Tidak Punya Anak">Kawin Tidak Punya Anak</option>
											<option selected={this.state.ptkp_status == "Kawin Dengan Anak 1" ? "selected" : ""} value="Kawin Dengan Anak 1">Kawin Dengan Anak 1</option>
											<option selected={this.state.ptkp_status == "Kawin Dengan Anak 2" ? "selected" : ""} value="Kawin Dengan Anak 2">Kawin Dengan Anak 2</option>
											<option selected={this.state.ptkp_status == "Kawin Dengan Anak 3" ? "selected" : ""} value="Kawin Dengan Anak 3">Kawin Dengan Anak 3</option>
											<option selected={this.state.ptkp_status == "Lainnya" ? "selected" : ""} value="Lainnya">Lainnya</option>
										</select>
									</div>
								</div>
								{/*<div className="form-group">
									<label className="col-sm-4">{LoadLabel('BankAccountNo')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="bank_no" value={this.state.bank_account_no} disabled={this.state.disabled} onChange={this.handleChangeBankno} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4">{LoadLabel('BankName')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="bank_name" value={this.state.bank_name} disabled={this.state.disabled} onChange={this.handleChangeBankname} />
									</div>
								</div>
								<div className="form-group">
									<label className="col-sm-4 twoline">{LoadLabel('AccountHolderName')}</label>
									<div className="col-sm-8">
										<input type="text" className="form-control" name="bank_account" value={this.state.bank_holder_name} disabled={this.state.disabled} onChange={this.handleChangeBankholder} />
									</div>
								</div>*/}
							</form>
						  </div>

						  <div className="col-xs-12">
						  	<div className="form-group">
							  	
							  </div>
						  </div>
						</div>
					</div>

					<div className="container-fluid supportData boxShadow">
						<div className="row">
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title textShadow"><i className="fa fa-phone"></i> {LoadLabel('Contact')}</div>
									<div className="col-xs-12">
										<form className="form-horizontal">
											<div className="form-group">
												<label className="col-sm-4 twoline">{LoadLabel('Address')}</label>
												<div className="col-sm-8">
													<textarea className="form-control" rows="2" value={this.state.address} disabled={this.state.disabled} onChange={this.handleChangeAddress}></textarea>
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">{LoadLabel('Phone')}</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.phone} disabled />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">{LoadLabel('MobilePhone')}</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" name="mobile_phone" value={this.state.mobile_phone} disabled={this.state.disabled} onChange={this.handleChangeMobile} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">{LoadLabel('BusinessPhone')}</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" name="fix_phone" value={this.state.business_phone} disabled={this.state.disabled} onChange={this.handleChangeFixphone} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">{LoadLabel('EmailAddress')}</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" name="email" value={this.state.email} disabled={this.state.disabled} onChange={this.handleChangeEmail} />
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title"><i className="fa fa-bar-chart"></i> {LoadLabel('Structure')}</div>
									<div className="col-xs-12">
										<form className="form-horizontal">

										{(this.state.level_user == 9 && sm != '-'
									        ? <div className="form-group">
												<label className="col-sm-4 twoline">SM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={sm} disabled />
												</div>
											</div>
									        : ''
									    )}
										{((this.state.level_user == 9 || this.state.level_user == 8) && dm != '-'
									        ? <div className="form-group">
												<label className="col-sm-4 twoline">DM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={dm} disabled />
												</div>
											</div>
									        : ''
									    )}
										{((this.state.level_user == 9 || this.state.level_user == 8 || this.state.level_user == 7) && rm != '-'
									        ? <div className="form-group">
												<label className="col-sm-4 twoline">RM</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={rm} disabled />
												</div>
											</div>
									        : ''
									    )}
										{((this.state.level_user == 9 || this.state.level_user == 8 || this.state.level_user == 7 || this.state.level_user == 6) && rd != '-'
									        ? <div className="form-group">
												<label className="col-sm-4 twoline">RD</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={rd} disabled />
												</div>
											</div>
									        : ''
									    )}
											{/*<div className="form-group">
												<label className="col-sm-4 twoline">Recruiter</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" value={this.state.recruiter} disabled />
												</div>
											</div>*/}
										</form>
									</div>
								</div>
							</div>
							<div className="col-xs-4 responsive2">
								<div className="row">
									<div className="title"><i className="fa fa-bar-chart"></i> {LoadLabel('AgentStatus')}</div>
									<div className="col-xs-12">
										<form className="form-horizontal">
											<div className="form-group">
												<label className="col-sm-4 twoline">{LoadLabel('OfficeName')}</label>
												<div className="col-sm-8">
													<textarea className="form-control" rows="2" value={this.state.office_name} disabled ></textarea>
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">{LoadLabel('AAJINo')}</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" name="aaji_number" value={this.state.aaji_number} disabled={this.state.disabled} onChange={this.handleChangeAajino} />
												</div>
											</div>
											<div className="form-group">
												<label className="col-sm-4 twoline">{LoadLabel('AAJIExp')}</label>
												<div className="col-sm-8">
													<input type="text" className="form-control" id="AAJI-EX" name="aaji_expired_date" value={this.state.aaji_expired_date} disabled={this.state.disabled} onChange={this.handleChangeAajiexp} />
												</div>
											</div>
										</form>
									</div>
								</div>
							</div>
						</div>
					</div>
				</div>
        );
    }

    componentDidUpdate = () => {

    }

    closeModal = (r) => {
        if(r){
            r.preventDefault();
        }

        this.setState({
            profileData : null
        });

    } 

    render()
    {
        let dialogClassname = 'modal-dialog ' + this.props.id;
        let dialogLabel = this.props.id + 'Label';
        // debugger;
        let profileInfo = [];
        // debugger;
        if(this.props.profileData != null){
            profileInfo.push(this.loadProfile());  
        }else {
            profileInfo.push(
                <div className="text-center">Processing Information</div>
            );
        }

        

        return(
            <div className="modal fade" id="profile-info-modal" tabIndex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true">
			  <div className={dialogClassname}>
				<div className="modal-content zero-padding" style={{'padding':'0px'}}>
                    <div className="modal-header">
                        <button type="button" className="close" data-dismiss="modal" onClick={this.closeModal} >&times;</button>
                        <h4>Agent Profile Information <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw load-group-info"></i></h4>
                    </div>
					<div className="modal-body content-modal-group">
                        {profileInfo}
                    </div>
				</div>
			  </div>
			</div>
        );
    }

}

export default ProfileModal;