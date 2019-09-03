'use strict'

import React from 'react';
import ReactDOM from 'react-dom';
import login from './login/login';
import login_test from './login/login_test';
import forgot_password from './login/forgot_password';
import change_password from './login/change_password';

import dashboard_default from './dashboard_v2/dashboard';

import dashboard_rp from './dashboard_v2/fc';
import dashboard_ap from './dashboard_v2/fc';
import dashboard_fc from './dashboard_v2/fc';
import dashboard_ab from './dashboard_v2/dm';
import dashboard_rb from './dashboard_v2/rm';
import dashboard_rd from './dashboard_v2/rd';
import dashboard_banca from './dashboard_v2/dashboard_banca';
import dashboard_sm_trial from './dashboard_v2/sm_v2';

import management from './management/index_v2';
import admin from './admin/index';

import profile from './profile/index';
import profile_update from './profile/index_detail';
import update_password from './profile/update_password';

import report from './report/production_report';
import comission from './report/comission_slip';
import comission_production from './report/comission_slip_production';
import report_management from './report/report_management';

//NEW BUSINESS
import main_menu from './new_business_detail/main_menu';
import newbusiness_inquiry from './new_business_detail/new_business_inquiry';
import newbusiness_policy_info from './new_business_detail/policy_info';
import newbusiness_policy_holder_info from './new_business_detail/policy_holder_info';
import newbusiness_life_assured_info from './new_business_detail/life_assured_info';
import newbusiness_support_document from './new_business_detail/support_document';
import newbusiness_refund_premium from './new_business_detail/refund_premium';
import unit_price from './new_business_detail/unit_price';
import suspense from './new_business_detail/suspense';
//NEW BUSINESS END

//takumi
import dashboard_takumi_tc from './dashboard_takumi/dashboard_takumi_tc';
import dashboard_takumi_ps from './dashboard_takumi/dashboard_takumi_ps';
import dashboard_takumi_gs from './dashboard_takumi/dashboard_takumi_gs';
import takumi_commission from './my_commission/takumi_commission';
import autodebit from './new_business_detail/autodebit';

//training
import training from './training/training_video';
//POLICY
import policy_info from './policy/policy_info';
import policy_holder_info from './policy/policy_holder_info';
import list_policies from './policy/list_policies';
import insured_info from './policy/insured_info';
import investment from './policy/investment';
import premium_payment_information from './policy/premium_payment_information';
import policy_benefit_payment from './policy/policy_benefit_payment';
import investment_transaction_report from './policy/investment_transaction_report';
import policy_support_document from './policy/support_document';
import annual_investment_transaction_report from './policy/annual_investment_transaction_report';
//POLICY END

import lapse_policy from './new_business_detail/lapse_policy';
import premium_due_data from './new_business_detail/premium_due_data';
import { Router, Route, hashHistory } from 'react-router';

//PRE REG
import spaj_pre_reg from './pre_registration/spaj_pre_reg';
import pre_reg_list from './pre_registration/pre_reg_list';


//CLAIM
import claim_inquiry from './claim/claim_inquiry';
import claim_detail from './claim/policy_info';
import claim_policy_info from './claim/policy_info';
import claim_policy_holder_info from './claim/policy_holder_info';
import claim_life_assured from './claim/life_assured';

//MEMO
import memo_upload from './memo/memo_input';
import memo_download from './memo/download';
import memo_folder from './memo/memo_folder';
import memo_container from './memo/memo_container';
import memo_container_empty from './memo/memo_container_empty';

//MY COMMISSION
import my_commission from './my_commission/commission_v2';

import group_info_tree from './group_info/tree';
import group_info_index from './group_info/index';

//TM Connect Page
import tm_connect_main from './tm_connect/main';

//CLAIM TRACKING
import claim from './claim_tracking/claim';
import claim_data from './claim_tracking/claim_data';
import _document from './claim_tracking/document';
import benefit from './claim_tracking/benefit';
import claim_notes from './claim_tracking/claim_notes';
import payment_info from './claim_tracking/payment_info';
import ct_policy_info from './claim_tracking/policy_info';

// Google Analytics
import ReactGA from 'react-ga';

// CPP
import cpp from './core_producer/cpp';
import cpp_leader from './core_producer/leader';
// import smft from './smft/smft';
// import smft_leader from './smft/leader';

//AMS Report
import oc_selling from './sam_report/oc_selling';
import oc_recruit from './sam_report/oc_recruit';
import sales_prospect from './sam_report/sales_prospect_card';
import recruit_prospect from './sam_report/recruit_prospect_card';
import detail_activity from './sam_report/detail_activity';
import detail_agent from './sam_report/detail_agent';
import detail_calendar from './sam_report/detail_calendar';
import prospect_movement from './sam_report/prospect_movement';
import effectivity_ratio from './sam_report/effectivity_ratio';
import ams_dashboard from './sam_report/dashboard';
import free_pa from './sam_report/free_pa';
import utilization_report from './sam_report/utilization_report';

//idle
import Idle from './idle';

// React Google Analytics Initialize

ReactGA.initialize('UA-81290046-1');

function logPageView(){
  if(localStorage.length > 0)
  {
    var dt = new Date();
    var hashUrl = window.location.hash;
    if(hashUrl != undefined)
    {
      hashUrl = hashUrl.split('?_k')[0];
    }
    ReactGA.set({ 
        page : window.location.pathname
      , userId : localStorage.agent_code
      , dimension1 : localStorage.agent_code
      , dimension2 : dt.getHours() + ':' + dt.getMinutes() + ':' + dt.getSeconds()
      , dimension3 : hashUrl
    });
  }
  else
  {
    ReactGA.set({ page : window.location.pathname});
  }
  
  ReactGA.pageview(window.location.pathname);
}


// Initialize End

// Dashboard Menu

let dashboard = dashboard_default;

let dashboardRole = [5,6,7,8,9,1,3,4,2,201,202,203,204,205,10,11,12,13,14,15,16,17,18,19,20];
let dashboardMaps = {  
  14:dashboard_ap,
  9:dashboard_fc,
  8:dashboard_rp,
  7:dashboard_ab,
  6:dashboard_rb,
  5:dashboard_rd,
  // 9:dashboard_fc,
  // 8:dashboard_sm,
  // 7:dashboard_dm,
  // 6:dashboard_rm,
  // 5:dashboard_rd,
  1:management,
  3:management,
  4:management,
  2:admin,
  // 201:admin,
  // 202:admin,
  // 203:admin,
  // 204:admin,
  // 205:admin,
  //10:dept_dashboard,
  11: dashboard_takumi_ps, 
  12: dashboard_takumi_ps,
  13: dashboard_takumi_tc,
  15: dashboard_takumi_tc,
  16: dashboard_takumi_tc,
  17: dashboard_banca,
  18: dashboard_banca,
  19: dashboard_banca,
  20: dashboard_banca
};



if(localStorage.length > 0)
{
  let role = parseInt(localStorage.userrole);
  if(dashboardRole.indexOf(role) != -1){
    dashboard = dashboardMaps[role];
  }
}


// Dashboard Menu End

ReactDOM.render((
  <div>
    <Idle />
    <Router history={hashHistory} onUpdate={logPageView}>
      
      <Route path="/" component={login} />
      {/*<Route path="/7357u5463" component={login_test} />*/}
      <Route path="/disini" component={login_test} />
      <Route path="/forgot_password" component={forgot_password} />
      <Route path="/reset/:username/:user_token" component={change_password} />
      <Route path="/forgot_password" component={forgot_password} />

      <Route path="/dashboard" component={dashboard} />
      <Route path="/sm/trial" component={dashboard_sm_trial} />

      {/* Takumi*/}
      <Route path="/dashboard_takumi_tc" component={dashboard_takumi_tc} />
      <Route path="/dashboard_takumi_ps" component={dashboard_takumi_ps} />
      <Route path="/dashboard_takumi_gs" component={dashboard_takumi_gs} />
      <Route path="/takumi_commission" component={takumi_commission} />
      <Route path="/autodebit" component={autodebit} />
      {/*Takumi*/}

      {/*
      <Route path="/dashboard_fc" component={dashboard_fc} />
      <Route path="/dashboard_dm" component={dashboard_dm} />
      <Route path="/dashboard_rm" component={dashboard_rm} />
      <Route path="/dashboard_sm" component={dashboard_sm} />
      <Route path="/dashboard_rd" component={dashboard_rd} />
      */ }
      
      <Route path="/training" component={training} />
      <Route path="/management" component={management} />
      <Route path="/admin" component={admin} />
      <Route path="/profile" component={profile} />
      <Route path="/update_password" component={update_password} />
      {/*
      <Route path="/update_profile" component={profile_update} />
      */}
      <Route path="/report" component={report} />
      <Route path="/comission" component={comission} />
      <Route path="/comission_production" component={comission_production} />
      <Route path="/report_management" component={report_management} />
      <Route path="/sam_report/oc_selling" component={oc_selling} />
      <Route path="/sam_report/oc_recruit" component={oc_recruit} />
      <Route path="/sam_report/detail_activity" component={detail_activity} />
      <Route path="/sam_report/detail_agent" component={detail_agent} />
      <Route path="/sam_report/sales_prospect" component={sales_prospect} />
      <Route path="/sam_report/recruit_prospect" component={recruit_prospect} />
      <Route path="/sam_report/detail_calendar" component={detail_calendar} />

      
      <Route path="/ams_report/prospect_movement" component={prospect_movement} />
      <Route path="/ams_report/effectivity_ratio" component={effectivity_ratio} />
      <Route path="/ams_report/dashboard" component={ams_dashboard} />
      <Route path="/ams_report/free_pa" component={free_pa} />
      <Route path="/ams_report/utilization_report" component={utilization_report} />


      <Route path="/newbusiness" component={main_menu} />
      <Route path="/newbusiness/inquiry" component={newbusiness_inquiry} />
      <Route path="/newbusiness/policy_info/:spaj_id" component={newbusiness_policy_info} />
      <Route path="/newbusiness/policy_holder_info/:spaj_id" component={newbusiness_policy_holder_info} />
      <Route path="/newbusiness/life_assured_info/:spaj_id" component={newbusiness_life_assured_info} />
      <Route path="/newbusiness/support_document/:spaj_id/:index" component={newbusiness_support_document} />
      <Route path="/newbusiness/support_document/:spaj_id" component={newbusiness_support_document} />
      <Route path="/newbusiness/refund_premium/:spaj_id" component={newbusiness_refund_premium} />
      <Route path="/unit_price" component={unit_price} />
      <Route path="/suspense" component={suspense} />

      <Route path="/policy/policy_info/:policy_id" component={policy_info} />
      <Route path="/policy/policy_holder_info/:policy_id" component={policy_holder_info} />
      <Route path="/policy/list_policies" component={list_policies} />
      <Route path="/policy/insured_info/:policy_id" component={insured_info} />
      <Route path="/policy/investment/:policy_id" component={investment} />
      <Route path="/policy/premium_payment_information/:policy_id" component={premium_payment_information} />
      <Route path="/policy/policy_benefit_payment/:policy_id" component={policy_benefit_payment} />
      <Route path="/policy/investment_transaction_report/:policy_id" component={investment_transaction_report} />
      <Route path="/policy/support_document/:policy_id/:index" component={policy_support_document} />
      <Route path="/policy/support_document/:policy_id" component={policy_support_document} />
      <Route path="/policy/annual_investment_transaction_report/:policy_id" component={annual_investment_transaction_report} />

      <Route path="/pre_registration" component={spaj_pre_reg} />
      <Route path="/pre_reg_list" component={pre_reg_list} />
      <Route path="/pre_registration/:pre_reg_id" component={spaj_pre_reg} />

      <Route path="/lapse_policy" component={lapse_policy} />
      <Route path="/premium_due_data" component={premium_due_data} />
      
      <Route path="/claim_tracking" component={claim} />
      <Route path="/claim_tracking/claim_data/:claim_id/:policy_id" component={claim_data} />
      <Route path="/claim_tracking/document/:claim_id/:policy_id" component={_document} />
      <Route path="/claim_tracking/benefit/:claim_id/:policy_id" component={benefit} />
      <Route path="/claim_tracking/claim_notes/:claim_id/:policy_id" component={claim_notes} />
      <Route path="/claim_tracking/payment_info/:claim_id/:policy_id" component={payment_info} />
      <Route path="/claim_tracking/policy_info/:claim_id/:policy_id" component={ct_policy_info} />
      
      <Route path="/claim" component={claim_inquiry} />
      <Route path="/claim/claim_detail" component={claim_detail} />
      {/* <Route path="/claim/policy_info" component={claim_policy_info} /> */}
      <Route path="/claim/policy_holder_info" component={claim_policy_holder_info} />
      <Route path="/claim/life_assured_info" component={claim_life_assured} />

      <Route path="/memo/add" component={memo_upload} />
      <Route path="/memo/add/:folder_name" component={memo_upload} />
      <Route path="/memo/download" component={memo_download} />
      <Route path="/memo/folder" component={memo_container_empty} />
      <Route path="/memo/folder/:folder_name" component={memo_container} />

      <Route path="/my_commission" component={my_commission} />

      <Route path="/group_info/tree" component={group_info_tree} />
      <Route path="/group_info" component={group_info_index} />

      <Route path="/tm_connect" component={tm_connect_main} />

      <Route path="/cpp" component={cpp} />
      <Route path="/cpp_leader" component={cpp_leader} />
      {/*<Route path="/smft" component={smft} />
      <Route path="/smft_leader" component={smft_leader} />*/}
    </Router>
  </div>
),document.getElementById('container'));
