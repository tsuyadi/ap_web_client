'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';
import CekAuth from '../../common_components/helper/cek_auth';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuNewBusinessDetail from '../../common_components/menu_v2/left_menu_new_business_detail';
import Footer from '../../common_components/footer';
import Loading from '../../common_components/loading';
import SubmitModal from '../../common_components/modal/submit_modal';
import FeatureModal from '../../common_components/modal/feature_modal';

class newbusiness_support_document extends React.Component {
	constructor(props){
		super(props);
        this.openMenu = this.openMenu.bind(this);
	}

	componentWillMount = () => {
		CekAuth();
	}

	componentDidMount = () => {
		$('#loading').modal('show');
		$.ajax({
            url: api_route.spaj_support,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
		    data: {spaj_id:this.state.spaj_id},
            type: 'POST',
            success: (response) => {
              $('#loading').modal('hide');

			  let documentPath = [];
			//   var reverseDoc = response.spaj_support_document.reverse(); //reverse
			//   let docArray = reverseDoc && reverseDoc.length > 0 && reverseDoc;
			
			  let docArray =  Object.values(response.spaj_support_document);
			  
			  if(docArray != null && docArray.length > 0){

				docArray.map((obj, ix) => {
					let token = '?token='+sessionStorage.getItem('token');
					let source_document = api_route.baseOnly + "assets/ViewerJS/#" + api_route.baseAPI + obj.substr(1)+token;
					console.log(source_document);
					documentPath.push(
						<iframe src = {source_document} width='98%' height='1024' allowfullscreen webkitallowfullscreen></iframe>
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

		let urlRefresh = urlSplitted + 'support_document/' + this.props.params.spaj_id + '/' + obj.target.value;

		window.location.href=urlRefresh;
		location.reload();

	} 

	state = {
		spaj_id: this.props.params.spaj_id,
		data: null,
		doc: this.props.params.index
	}

    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }
	render(){		

		// debugger;

		let docs = this.state.data ? Object.values(this.state.data.spaj_support_document) : [];
		let docsname = this.state.data ? Object.keys(this.state.data.spaj_support_document) : [];
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
		// // debugger;
		// if(this.state.data && this.state.data.spaj_support_document && this.state.data.spaj_support_document.length > 0){
		// 	let doc = this.state.data.spaj_support_document;
		// 	source_document = api_route.baseOnly + "assets/ViewerJS/#" + this.state.doc.replace("api-agent", "api-apuat");
		// 	// // debugger;
		// }
		
		// // debugger;

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
			<iframe src = {source_document} width='98%' height='1024' allowfullscreen webkitallowfullscreen></iframe>
		);

		return (
		<div className="wrap2">
			<SubmitModal />
			<FeatureModal />
            <TopMenuNewBusinessDetail opsi="spajt" title="Document" id={this.props.params.spaj_id} />
            
			<div className="main-wrapper">
				{/*<div className="row">
					<div className="col-xs-10" style={{paddingRight : 0}}>*/}
						<ol className="breadcrumb" style={{marginBottom: '5px'}}>
							<li><a href="#/newbusiness/">SPAJ Tracking</a></li>
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
							
					<LeftMenuNewBusinessDetail active="3" spaj_id={this.props.params.spaj_id} />
					
				
			  
			  
			  

					<div className="main-content">
						<div className="row">
							<div className="col-sm-12">
								<div className="col-sm-6">
									<form className="form-horizontal">
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>SPAJ No</label>
											</div>
											
											<div className="col-sm-6">
												{localStorage.getItem('spaj_no')}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Policy Holder</label>
											</div>
											
											<div className="col-sm-6">
												{"-"}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Agent Name</label>
											</div>
											
											<div className="col-sm-6">
												{localStorage.getItem('agent_name')}
											</div>
										</div>
										
									</form>
								</div>
								
								<div className="col-sm-6">
									<form className="form-horizontal">
									
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Policy No</label>
											</div>
											
											<div className="col-sm-6">
												{localStorage.getItem('policy_no')}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Life Assured</label>
											</div>
											
											<div className="col-sm-6">
												{localStorage.getItem('life_assured')}
											</div>
										</div>
										
										<div className="form-group">
											<div className="col-sm-6 bg-info">
												<label>Agent Code</label>
											</div>
											
											<div className="col-sm-6">
												{localStorage.getItem('agent_code')}
											</div>
										</div>
									
									</form>
								</div>

							</div>
						</div>
						
						<hr />
		
						
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
				
					<div className="clearfix"></div>
				</div>
			</div>

			
			<Footer />

		</div>
		);
	}
}

export default newbusiness_support_document;