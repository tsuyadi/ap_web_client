'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import Pagination from 'react-js-pagination';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import Pager from 'react-pager';
import {MoneyFormat, DateFormat} from '../../common_components/helper/formatter';

import ModalMessage from '../../common_components/modal/modal_message';

import FeatureModal from '../../common_components/modal/feature_modal';

class main_menu extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data: null,
			param: {
				policy_holder_name:"",
				life_assured:"",
				spaj_status:"",
				agent_name:"",
				agent_code:"",
				agent_level:"",
				agent_status:"",
				spaj_no:"",
				policy_no:"",
				page:1,
				offset:100000,
				activePage:1				
			},
			total : 0,
			current : 0,
			visiblePages : 3
		}

		this.submitIssue = this.submitIssue.bind(this);
		this.clearForm = this.clearForm.bind(this);
        this.openMenu = this.openMenu.bind(this);

	}

	linkTo(url){
		
		window.location.href = api_route.baseOnly + url;
	}

	submitIssue(){
		
		var email = $('[name=email]').val();
		var message = $('[name=message]').val();

		var pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/; 

		$('.email-alert').hide();

		if(email.match(pattern))
		{

			$('.sendissue').show();

			$.ajax({
				url : api_route.issueAPI,
				headers: {
						'Authorization':'JWT '+sessionStorage.getItem('token')
				},
				data: {
					'email':email,
					'message':message
				},
				type: 'POST',
				success: (response) => {
					
					$('.sendissue').hide();
					$('#submitfom').hide();
					$('#inform').show();

				},
				error: (err, response) => {
					$('.sendissue').hide();
					alert('Something wrong happened, please contact our Agency Portal Contact Support');
				}
			});

		}
		else
		{
			$('.email-alert').show();
		}

	}

	clearForm(){
		$('[name=email]').val('');
		$('[name=message]').val('');
	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }
	render(){
		
		let issueForm = [];

		issueForm.push(

			<div id="submitIssueDiv">
				<div id="inform" style={{'display':'none'}} className="form-group">
					<p className="alert alert-success">Thank you, your inquiry has been submitted.</p>
					<button type="button" className="btn btn-danger" data-dismiss="modal" >Close</button>
				</div>
				<div id="submitfom" className="form-group">
					<p>Please submit issues related to your account inaccuracy and system functionalities
					<br/><i>Silahkan isi saran dan pertanyaan anda mengenai data akun dan fungsional sistem</i></p>
					<input type="text" className="form-control" name="email" style={{'margin-bottom':'10px'}} placeholder="Your email" />
					<p className="email-alert text-danger" style={{'display':'none'}}>Please use valid email address</p>
					<textarea className="form-control" style={{'margin-top':'10px'}} id="issueMessage" name="message" placeholder="Submit your Issue here">
					</textarea>
					<button type="submit" className="btn btn-default" style={{'margin-top':'10px', 'margin-right':'10px'}} onClick={this.clearForm}>Clear</button>
					<button type="submit" className="btn btn-primary" style={{'margin-top':'10px'}} onClick={this.submitIssue}>Submit</button> <i style={{"display":"none"}} className="fa fa-spinner fa-pulse fa-fw sendissue" ></i>					
				</div>
				
			</div>

		);

		return (
		<div className="wrap2">

            <TopMenuNewBusinessDetail title="SPAJ Tracking"  />
			<ModalMessage id="submit_ap" title="Submit Issue" message={issueForm} />
			
			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li className="active">SPAJ Tracking</li>
						</ol>
					{/*</div>
					<div className="col-xs-2">
						<ol className="breadcrumb" onClick={this.openMenu} style={{marginBottom: '5px', cursor : 'pointer'}}>
							<li className="active">
								<span className="menuIconSidebar">
									<i className="fa fa-bars"></i>
								</span>
							</li>
						</ol>
					</div>
				</div>*/}
				
				<div className="main twoColumnMain">

					<LeftMenuInquiry active="0"/>	

					<div className="main-content boxShadow">
						<div className="row">
							<div className="col-sm-6">
								<div className="panel panel-default menuLink" onClick={this.linkTo.bind(this, '#/newbusiness/inquiry')}>
									<div className="panel-body" style={{'min-height':'170px'}}>
										<h3>SPAJ Tracking</h3>
										Function of this screen is for Agent to track SPAJ submission
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="panel panel-default menuLink" onClick={this.linkTo.bind(this, '#/policy/list_policies')} >
									<div className="panel-body" style={{'min-height':'170px'}}>
										<h3>Policy Tracking</h3>
										Function of this screen is for Agent to search and see all his personal selling and also his subordinates
									</div>
								</div>
							</div>
						
							<div className="col-sm-6">
								<div className="panel panel-default menuLink" onClick={this.linkTo.bind(this, '#/lapse_policy/')}>
									<div className="panel-body" style={{'min-height':'170px'}}>
										<h3>Lapse Policy</h3>
										Function of this screen is for Agent to monitoring all his personal and subordinate selling that have been in lapse status
									</div>
								</div>
							</div>
							<div className="col-sm-6">
								<div className="panel panel-default menuLink" onClick={this.linkTo.bind(this, '#/premium_due_data/')}>
									<div className="panel-body" style={{'min-height':'170px'}}>
										<h3>Premium Due Date</h3>
										Function of this screen is for Agent to monitoring all his personal and subordinate selling that premium have been due date and status still inforce
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="panel panel-default menuLink" onClick={this.linkTo.bind(this, '#/unit_price/')}>
									<div className="panel-body" style={{'min-height':'170px'}}>
										<h3>Unit Price</h3>
										Function of this screen is for Agent to search and see all fund name's unit price
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="panel panel-default menuLink" onClick={this.linkTo.bind(this, '#/suspense/')}>
									<div className="panel-body" style={{'min-height':'170px'}}>
										<h3>Suspense</h3>
										Function of this screen is for Agent to search and see all policies that has suspense
									</div>
								</div>
							</div>

							<div className="col-sm-6">
								<div className="panel panel-default menuLink" onClick={this.linkTo.bind(this, '#/claim_tracking/')}>
									<div className="panel-body" style={{'min-height':'170px'}}>
										<h3>Claim Tracking</h3>
										Function of this screen is for Agent to track Claim submission
									</div>
								</div>
							</div>
						</div>
					</div>

					<div className="main-content hidden-xs hidden-sm hidden-md hidden-lg">
					
						<div className="row">
							<div className="col-sm-12">
								<ol>
									<li>SPAJ Tracking<br />Function of this screen is for Agent to track SPAJ submission</li>
									<li>Policy Tracking<br />Function of this screen is for Agent to search and see all his personal selling and also his subordinates</li>
									<li>Lapse Policy<br />Function of this screen is for Agent to monitoring all his personal and subordinate selling that have been in lapse status</li>
									<li>Premium Due Date<br />Function of this screen is for Agent to monitoring all his personal and subordinate selling that premium have been due date and status still inforce</li>
									<li>Unit Price<br />Function of this screen is for Agent to search and see all fund name's unit price</li>
									<li>Suspense<br /></li>
									{/* <li>Claim Tracking<br /> Function of this screen is for Agent to track Claim submission</li> */}
								</ol>
							</div>
						</div>

					</div>

					<div className="clearfix"></div>
				</div>
			</div>
			<FeatureModal />
			<Footer />

		</div>
		);
	}
}

export default main_menu;
