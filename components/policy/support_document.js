'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuPolicy from '../../common_components/menu_v2/left_menu_policy';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';

class policy_support_document extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			policy_id: this.props.params.policy_id,
			data: null,
			doc: this.props.params.index,
			docPath: null
		}

		this.getData = this.getData.bind(this);
        this.openMenu = this.openMenu.bind(this);
	}
	componentWillMount = () => {
		CekAuth();
	}

	componentDidMount = () => {
		this.getData();
	}

	getData(){
		
		debugger;
		$('#loading').modal('show');
		$.ajax({
            url: api_route.policy_support,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {policy_id:this.state.policy_id},
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');

			  let documentPath = [];
			  let docArray = Object.values(response.policy_support_document);
			  if(docArray != null && docArray.length > 0){

				docArray.map((obj, ix) => {
					let token = '?token='+sessionStorage.getItem('token');
					let source_document = api_route.baseOnly + "assets/ViewerJS/#" + api_route.baseAPI + obj.substr(1)+token;

					documentPath.push(
						<iframe src = {source_document} width='724' height='1024' allowfullscreen webkitallowfullscreen type="application/pdf"></iframe>
					);
				});

			  }
			  
			  if(this.props.params.index == null){
				  window.location.href = window.location.href + '/' + 0;
			  }
			  
				this.setState({
				  data:response,
				  docPath: documentPath
				});
            },
            error: (err, response) => {
              $('#loading').modal('hide');
              if(err.responseJSON){
            	window.location.href = window.location.href.split('#')[0] + '#/policy/policy_info/' + this.props.params.policy_id;
              }
            }
        });
	}
	changeDoc = (obj) => {
		// debugger;

		let url = window.location.href;
		let urlSplitted = url.split('support_document/')[0];

		let urlRefresh = urlSplitted + 'support_document/' + this.props.params.policy_id + '/' + obj.target.value;

		window.location.href=urlRefresh;
		location.reload();

	} 

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	render(){
		debugger;
		var docs = this.state.data ? Object.values(this.state.data.policy_support_document) : [];
		let docsname = this.state.data ?  Object.keys(this.state.data.policy_support_document) : [];
		let pagination = [];
		if(docs.length > 0)
		{
			for (let i = 0; i < docs.length; i++)
			{
				let row = <li><a className={ this.state.active_doc == i ? 'active' : '' } onClick={ () => this.changeDoc(i)} > {i+1 }</a></li>
	            pagination.push(row);
	        }
		} else {
			docs = [];
		}
		
		let source_document = "";

		// if(this.state.data && this.state.data.policy_support_document && this.state.data.policy_support_document.length > 0){
		// 	let doc = this.state.data.policy_support_document;
		// 	source_document = api_route.baseOnly + "assets/ViewerJS/#" + doc[0].replace("api-agent", "api-apuat");
		// 	// // debugger;
		// }else{
		// 	source_document = api_route.baseOnly + "assets/ViewerJS/#" + docs;
		// }		

		let comboSupportDocument = [];

		if(docsname != undefined && docsname.length > 0)
		{
			// debugger;
			docsname.map((obj, indx) => {

				let text = "";
				try
				{
					// text = obj.split('/')[6] + ' ' + (indx + 1);
					text = obj;
				}
				catch(e)
				{
					text = obj;
				}

				if(indx == this.props.params.index){
					comboSupportDocument.push(
						<option value={indx} selected>{text}</option>
					);
				}else{
					comboSupportDocument.push(
						<option value={indx}>{text}</option>
					);
				}
			});
		}

		let iframe = [];

		iframe.push(
			<iframe src = {source_document} width='724' height='1024' allowfullscreen webkitallowfullscreen></iframe>
		);

		return (
		<div className="wrap2">
			<SubmitModal />
			<FeatureModal />
            <TopMenuNewBusinessDetail opsi="policyt" title="Document" id={this.props.params.policy_id} />
            
			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/policy/">Policy Tracking</a></li>
							<li className="active">Document</li>
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
							
					<LeftMenuPolicy active="7" policy_id={this.state.policy_id} />
					
					<div className="main-content boxShadow">
						<div className="row">
							<div className="col-sm-12">
								<div className="boxHeader">
									<div className="row">
										<div className="col-sm-6">
											<div className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6">
														<label>Policy No</label>
													</div>
													<div className="col-sm-6">
														<input type="text" className="form-control" id="policy_no" name="policy_no" value={localStorage.getItem('policy_no')} />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6">
														<label>Policy Holder</label>
													</div>
													<div className="col-sm-6">
														<input type="text" className="form-control" id="policy_no" name="policy_no" value={localStorage.getItem('policy_holder')} />
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6">
														<label>Insured</label>
													</div>
													<div className="col-sm-6">
														<input type="text" className="form-control" id="insured" name="insured" value={localStorage.getItem('insured')} />
													</div>
												</div>
											</div>
										</div>
									</div>
									<div className="row">
										<div className="col-sm-6">
											<div className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6">
														<label>Agent Name</label>
													</div>
													<div className="col-sm-6">
														<input type="text" className="form-control" id="agent_name" name="agent_name" value={localStorage.getItem('agent_name')} />
													</div>
												</div>
											</div>
										</div>
										<div className="col-sm-6">
											<div className="form-horizontal">
												<div className="form-group">
													<div className="col-sm-6">
														<label>Agent Code</label>
													</div>
													<div className="col-sm-6">
														<input type="text" className="form-control" id="agent_code" name="agent_code" value={localStorage.getItem('agent_code')} />
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
								<div className="boxBody">
									<div id="block1" className="scrollable-doc">
										<div className="row">	
											<div className="col-xs-12">
												<select className="form-control" name="docPath" onChange={this.changeDoc}>
													{comboSupportDocument}
												</select>
											</div>				
											<div className="col-xs-12">&nbsp;</div>				
											<div className="doc-viewer text-center">
												{this.state.docPath != null && this.state.docPath[this.props.params.index]}
											</div>
										</div>
									</div>
								</div>
							</div>
						</div>
					</div>
				
					<div className="clearfix"></div>
				</div>
			</div>

			
			<Footer />

		</div>
		);
	}
}

export default policy_support_document;