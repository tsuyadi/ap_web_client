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

import MemoFormList from './MemoFormList';
import MemoForm from './MemoForm';
import MemoPdf from './MemoPdf';

import FeatureModal from '../../common_components/modal/feature_modal';
import TMInvestModal from '../../common_components/modal/tminvest_modal';

class memo_folder extends React.Component {
	constructor(props){
		super(props);
		CekAuth();

		this.state = {
			folder_name: this.props.params.folder_name,
			prev_menu : '',
			pdf_src : ''
		}

		this.getCombo = this.getCombo.bind(this);
		this.changeHandler = this.changeHandler.bind(this);
		this.menuClick = this.menuClick.bind(this);
		this.inputClick = this.inputClick.bind(this);

	}

	

	componentDidMount(){		
		$.ajax({
			url: api_route.training_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			success: (response) => {
				console.log('training list');
				console.log(response);
			},
			error: (err, response) => {
				
				if(err.responseJSON){
					alert('Session expired, please login');
					window.location.href="/";
					//window.location.href = window.location.href.split('#')[0] + '#/';
				}else{
					alert('Please check your connection');
				}

			}
		});	
		$.ajax({
			url: api_route.hospitalprovider_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			success: (response) => {
				console.log('hospitalprovider_list');
				console.log(response);
			},
			error: (err, response) => {
				
				if(err.responseJSON){
					alert('Session expired, please login');
					window.location.href="/";
					//window.location.href = window.location.href.split('#')[0] + '#/';
				}else{
					alert('Please check your connection');
				}

			}
		});
		$.ajax({
			url: api_route.medicaltable_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			success: (response) => {
				console.log('medicaltable_list');
				console.log(response);
			},
			error: (err, response) => {
				
				if(err.responseJSON){
					alert('Session expired, please login');
					window.location.href="/";
					//window.location.href = window.location.href.split('#')[0] + '#/';
				}else{
					alert('Please check your connection');
				}

			}
		});

		$.ajax({
			url: api_route.salesilustration_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			success: (response) => {
				console.log('salesilustration_list');
				console.log(response);
			},
			error: (err, response) => {
				
				if(err.responseJSON){
					alert('Session expired, please login');
					window.location.href="/";
					//window.location.href = window.location.href.split('#')[0] + '#/';
				}else{
					alert('Please check your connection');
				}

			}
		});

		$.ajax({
			url: api_route.guidance_list,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			type: 'POST',
			success: (response) => {
				console.log('guidance_list');
				console.log(response);
			},
			error: (err, response) => {
				
				if(err.responseJSON){
					alert('Session expired, please login');
					window.location.href="/";
					//window.location.href = window.location.href.split('#')[0] + '#/';
				}else{
					alert('Please check your connection');
				}

			}
		});
	}

	loadList(type){
		
	}

	getCombo(){
		
	}

	changeHandler(event){
		

	}

	menuClick(menu_name){
		// let url = '#/memo/folder/' + menu_name;
		// window.location.href = api_route.baseOnly + url;
		// window.location.reload();
		// // debugger;
		var src ='';
		if(menu_name == 'hospital'){
			src =  api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/hospital_provider.pdf";
		}else if(menu_name == 'medical'){
			// src =  "assets/file/MedicalTable.pdf";
			src =  api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/MedicalTable.pdf";
		}else  if(menu_name =='leadership'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/Leadership.pdf";
		}else if(menu_name =='motivation'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/Motivasi.pdf";
		}else if(menu_name =='products'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/Product.pdf";
		}else if(menu_name =='selling skills'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/Selling_Skills.pdf";
		}else if(menu_name =='tips'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/Tips.pdf";
		}else if(menu_name =='pr_summary'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/ProductSummary.pdf";
		}else if(menu_name =='handling_object'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/HandlingObjection.pdf";
		}else if(menu_name =='sales_tools'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/SalesTools.pdf";
		}else if(menu_name =='tmc_contest'){
			src = api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/TMConnectContest.pdf";
		}
		this.setState({
			folder_name : menu_name,
			pdf_src : src
		})

	}

	inputClick(menu_name){
		this.setState({
			folder_name : menu_name
		})
	}

	render(){
		console.log(this.state.pdf_src);
		$(function () {
			// $('[data-toggle="tooltip"]').tooltip();
			if(!$('#treenas').hasClass('tree')){
				$('#treenas').treed();
				this.location.reload();
			}			
		});

		// // debugger;
		let choosen_menu = this.state.folder_name || '';
		let menu_type = '';
		let pdf = this.state.pdf_src || '';
		let menu = getMenu('E-Library', 'fa fa-book');
		
		let department_list_cb = [];
		
		let department_cat_list_cb = [];
		
		let list_data_memo = [];
		
		let list_data_form = [];
		
		let list_menu = [];

		let buttonBack = [];

		let buttonAdd = [];

		let addEvent = '0';

		let prev_menu = '';

		let titleMenu = 'E-Library';

		let isDefault = false;

		let list_menu_ = [];

		switch(choosen_menu){
			case 'hospital' :
				addEvent = '1';
				prev_menu = undefined;
				menu_type = TYPE.HOSPITAL_PROVIDER;
				titleMenu = 'Hospital Provider';
				list_menu.push(<MemoFormList type={TYPE.HOSPITAL_PROVIDER} cat_id={CATEGORY.HOSPITAL_PROVIDER} />);
				break;
			case 'input_hospital' :
				addEvent = '0';
				prev_menu = undefined;
				menu_type = TYPE.HOSPITAL_PROVIDER;
				titleMenu = 'Hospital Provider';
				list_menu.push(<MemoForm type={TYPE.HOSPITAL_PROVIDER} cat_id={CATEGORY.HOSPITAL_PROVIDER} />);
				break;
			case 'medical' :
				addEvent = '1';
				prev_menu = undefined;
				menu_type = TYPE.MEDICAL_TABLE;
				titleMenu = 'Medical Table';
				list_menu.push(<MemoFormList type={TYPE.MEDICAL_TABLE} cat_id={CATEGORY.MEDICAL_TABLE} />);
				break;
			case 'input_medical' :
				addEvent = '0';
				prev_menu = undefined;
				menu_type = TYPE.MEDICAL_TABLE;
				titleMenu = 'Medical Table';
				list_menu.push(<MemoForm type={TYPE.MEDICAL_TABLE} cat_id={CATEGORY.MEDICAL_TABLE} />);
				break;
			case 'sales_ilustration' :
				addEvent = '1';
				prev_menu = undefined;
				menu_type = TYPE.SALES_ILUSTRATION;
				titleMenu = 'Sales Ilustratiom TM Invest Pro';
				list_menu.push(<MemoFormList type={TYPE.SALES_ILUSTRATION} cat_id={CATEGORY.SALES_ILUSTRATION} />);
				break;
			case 'input_sales_ilustration' :
				addEvent = '0';
				prev_menu = undefined;
				menu_type = TYPE.SALES_ILUSTRATION;
				titleMenu = 'Sales Ilustratiom TM Invest Pro';
				list_menu.push(<MemoForm type={TYPE.SALES_ILUSTRATION} cat_id={CATEGORY.SALES_ILUSTRATION} />);
				break;
			case 'leadership' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Leadership';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.LEADERSHIP} />);
				// list_menu.push(<MemoPdf type={TYPE.MEMO} cat_id={CATEGORY.TRAINER} src={this.state.pdf_src} />);
				break;
			case 'input_leadership' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Leadership';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.LEADERSHIP} />);
				// list_menu.push(<MemoPdf type={TYPE.MEMO} cat_id={CATEGORY.TRAINER} src={this.state.pdf_src} />);
				break;
			case 'motivation' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Motivation';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.MOTIVATION} />);
				break;
			case 'input_motivation' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Motivation';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.MOTIVATION} />);
				break;
			case 'selling skills' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Selling Skills';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.SELLING_SKILLS} />);
				break;
			case 'input_selling skills' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Selling Skills';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.SELLING_SKILLS} />);
				break;
			case 'tips' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Tips';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.TIPS} />);
				break;
			case 'input_tips' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Tips';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.TIPS} />);
				break;
			case 'products' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Products';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.PRODUCTS} />);
				break;
			case 'input_products' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Do You Know → Products';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.PRODUCTS} />);
				break;
			case 'pr_summary' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Products & Riders Summary';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.PRODUCTS_RIDERS_SUMMARY} />);
				break;
			case 'input_pr_summary' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Products & Riders Summary';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.PRODUCTS_RIDERS_SUMMARY} />);
				break;
			case 'sales_tools' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Sales Tools';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.SALES_TOOLS} />);
				break;
			case 'input_sales_tools' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Sales Tools';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.SALES_TOOLS} />);
				break;
			case 'handling_object' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Handling Objection';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.HANDLING_OBJECTION} />);
				break;
			case 'input_handling_object' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → Handling Objection';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.HANDLING_OBJECTION} />);
				break;
			case 'tmc_contest' :
				addEvent = '1';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → TM Connect Contest';
				list_menu.push(<MemoFormList type={TYPE.TRAINING} cat_id={CATEGORY.TM_CONNECT_CONTEST} />);
				break;
			case 'input_tmc_contest' :
				addEvent = '0';
				prev_menu = 'Training';
				menu_type = TYPE.TRAINING;
				titleMenu = 'Training → TM Connect Contest';
				list_menu.push(<MemoForm type={TYPE.TRAINING} cat_id={CATEGORY.TM_CONNECT_CONTEST} />);
				break;
			case 'trainer' :
				addEvent = '1';
				prev_menu = undefined;
				menu_type = TYPE.MEMO;
				titleMenu = 'Training & Development';
				list_menu.push(<MemoFormList type={TYPE.MEMO} cat_id={CATEGORY.TRAINER} />);
				break;
			case 'input_trainer' :
				addEvent = '0';
				prev_menu = 'list_trainer';
				menu_type = TYPE.MEMO;
				titleMenu = 'Training & Development';
				list_menu.push(<MemoForm type={TYPE.MEMO} cat_id={CATEGORY.TRAINER} />);
				break;
			case 'contest' :
				addEvent = '1';
				prev_menu = 'memo';
				menu_type = TYPE.MEMO;
				titleMenu = 'Memo → Contest';
				list_menu.push(<MemoFormList type={TYPE.MEMO} cat_id={CATEGORY.CONTEST} />);
				break;
			case 'input_contest' :
				addEvent = '0';
				prev_menu = 'memo';
				menu_type = TYPE.MEMO;
				titleMenu = 'Memo → Contest';
				list_menu.push(<MemoForm type={TYPE.MEMO} cat_id={CATEGORY.CONTEST} />);
				break;
			case 'non_contest' :
				addEvent = '1';
				prev_menu = 'memo';
				menu_type = TYPE.MEMO;
				titleMenu = 'Memo → Non Contest';
				list_menu.push(<MemoFormList type={TYPE.MEMO} cat_id={CATEGORY.NON_CONTEST} />);
				break;
			case 'input_non_contest' :
				addEvent = '0';
				prev_menu = 'memo';
				menu_type = TYPE.MEMO;
				titleMenu = 'Memo → Non Contest';
				list_menu.push(<MemoForm type={TYPE.MEMO} cat_id={CATEGORY.NON_CONTEST} />);
				break;
			case 'agency_services':
				addEvent = '1';
				prev_menu = 'form';
				menu_type = TYPE.FORM;
				titleMenu = 'Form → Agency Services';
				list_menu.push(<MemoFormList type={TYPE.FORM} cat_id={CATEGORY.AGENCY_SERVICES} />);
				break;
			case 'input_agency_services':
				addEvent = '0';
				prev_menu = 'form';
				menu_type = TYPE.FORM;
				titleMenu = 'Form → Agency Services';
				list_menu.push(<MemoForm type={TYPE.FORM} cat_id={CATEGORY.AGENCY_SERVICES} />);
				break;
			case 'new_business' :
				addEvent = '1';
				prev_menu = 'client_services';
				menu_type = TYPE.FORM;
				titleMenu = 'Form → Client Services → New Business';
				list_menu.push(<MemoFormList type={TYPE.FORM} cat_id={CATEGORY.NEW_BUSINESS} />);
				break;
			case 'input_new_business' :
				addEvent = '0';
				prev_menu = 'client_services';
				menu_type = TYPE.FORM;
				titleMenu = 'Form → Client Services → New Business';
				list_menu.push(<MemoForm type={TYPE.FORM} cat_id={CATEGORY.NEW_BUSINESS} />);
				break;
			case 'after_sales_service' :
				addEvent = '1';
				prev_menu = 'client_services';
				menu_type = TYPE.FORM;
				titleMenu = 'Form → Client Services → After Sales Services';
				list_menu.push(<MemoFormList type={TYPE.FORM} cat_id={CATEGORY.AFTER_SALES_SERVICES} />);
				break;
			case 'kode_etik' :
				addEvent = '1';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Kode Etik Keagenan';
				list_menu.push(<MemoFormList type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.KODE_ETIK_KEAGENAN} />);
				break;
			case 'input_kode_etik' :
				addEvent = '0';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Kode Etik Keagenan';
				list_menu.push(<MemoForm type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.KODE_ETIK_KEAGENAN} />);
				break;	
			case 'hak_kewajiban_pemasar' :
				addEvent = '1';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Hak & Kewajiban Tenaga Pemasar';
				list_menu.push(<MemoFormList type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.HAK_KEWAJIBAN_PEMASAR} />);
				break;	
			case 'input_hak_kewajiban_pemasar' :
				addEvent = '0';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Hak & Kewajiban Tenaga Pemasar';
				list_menu.push(<MemoForm type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.HAK_KEWAJIBAN_PEMASAR} />);
				break;	
			case 'matriks_kedisiplinan_pemasar' :
				addEvent = '1';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Matriks Kedisiplinan Tenaga Pemasar ';
				list_menu.push(<MemoFormList type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.MATRIKS_KEDISIPLINAN_PEMASAR} />);
				break;
			case 'input_matriks_kedisiplinan_pemasar' :
				addEvent = '0';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Matriks Kedisiplinan Tenaga Pemasar ';
				list_menu.push(<MemoForm type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.MATRIKS_KEDISIPLINAN_PEMASAR} />);
				break;
			case 'informasi_kantor_pemasaran' :
				addEvent = '1';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Informasi kantor pemasaran ';
				list_menu.push(<MemoFormList type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.INFORMASI_KANTOR_PEMASARAN} />);
				break;
			case 'input_informasi_kantor_pemasaran' :
				addEvent = '0';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Informasi kantor pemasaran ';
				list_menu.push(<MemoForm type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.INFORMASI_KANTOR_PEMASARAN} />);
				break;	
			case 'visi_misi_perusahaan' :
				addEvent = '1';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Visi & Misi Perusahaan, dengan Nilai-nilai Keagenan';
				list_menu.push(<MemoFormList type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.VISI_MISI_PERUSAHAAN} />);
				break;	
			case 'input_visi_misi_perusahaan' :
				addEvent = '0';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Visi & Misi Perusahaan, dengan Nilai-nilai Keagenan';
				list_menu.push(<MemoForm type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.VISI_MISI_PERUSAHAAN} />);
				break;	
			case 'kebijakan_prosedur_logo' :
				addEvent = '1';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Kebijakan dan Prosedur Logo Perusahaan';
				list_menu.push(<MemoFormList type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.KEBIJAKAN_PROSEDUR} />);
				break;	
			case 'input_kebijakan_prosedur_logo' :
				addEvent = '0';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Kebijakan dan Prosedur Logo Perusahaan';
				list_menu.push(<MemoForm type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.KEBIJAKAN_PROSEDUR} />);
				break;	
			case 'fasilitas_mdrt' :
				addEvent = '1';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Fasilitas MDRT';
				list_menu.push(<MemoFormList type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.FASILITAS_MDRT} />);
				break;
			case 'input_fasilitas_mdrt' :
				addEvent = '0';
				prev_menu = 'Buku Pedoman Tenaga Pemasar';
				menu_type = TYPE.BUKU_PEDOMAN;
				titleMenu = 'Buku Pedoman Tenaga Pemasar → Fasilitas MDRT';
				list_menu.push(<MemoForm type={TYPE.BUKU_PEDOMAN} cat_id={CATEGORY.FASILITAS_MDRT} />);
				break;
			
			case 'user_guide_ams' :
				addEvent = '1';
				prev_menu = undefined;
				menu_type = TYPE.USER_GUIDE_AMS;
				titleMenu = 'User Guide AMS';
				list_menu.push(<MemoFormList type={TYPE.USER_GUIDE_AMS} cat_id={CATEGORY.USER_GUIDE_AMS} />);
				break;
			case 'input_user_guide_ams' :
				addEvent = '0';
				prev_menu = undefined;
				menu_type = TYPE.USER_GUIDE_AMS;
				titleMenu = 'User Guide AMS';
				list_menu.push(<MemoForm type={TYPE.USER_GUIDE_AMS} cat_id={CATEGORY.USER_GUIDE_AMS} />);
				break;
			
			case 'fund_fact' :
				addEvent = '1';
				prev_menu = undefined;
				menu_type = TYPE.FUND_FACT;
				titleMenu = 'Fund Fact Sheet';
				list_menu.push(<MemoFormList type={TYPE.FUND_FACT} cat_id={CATEGORY.FUND_FACT} />);
				break;
			case 'input_fund_fact' :
				addEvent = '0';
				prev_menu = undefined;
				menu_type = TYPE.FUND_FACT;
				titleMenu = 'Fund Fact Sheet';
				list_menu.push(<MemoForm type={TYPE.FUND_FACT} cat_id={CATEGORY.FUND_FACT} />);
				break;
				
			case 'panduan_tmc' :
				addEvent = '1';
				prev_menu = undefined;
				menu_type = TYPE.TMC;
				titleMenu = 'Panduan TM Connect';
				list_menu.push(<MemoFormList type={TYPE.TMC} cat_id={CATEGORY.PANDUAN_TMC} />);
				break;
			case 'input_panduan_tmc' :
				addEvent = '0';
				prev_menu = undefined;
				menu_type = TYPE.TMC;
				titleMenu = 'Panduan TM Connect';
				list_menu.push(<MemoForm type={TYPE.TMC} cat_id={CATEGORY.PANDUAN_TMC} />);
				break;
				
			case 'qna' :
				addEvent = '1';
				prev_menu = undefined;
				menu_type = TYPE.TMC;
				titleMenu = 'Q & A';
				list_menu.push(<MemoFormList type={TYPE.TMC} cat_id={CATEGORY.QNA} />);
				break;
			case 'input_qna' :
				addEvent = '0';
				prev_menu = undefined;
				menu_type = TYPE.TMC;
				titleMenu = 'Q & A';
				list_menu.push(<MemoForm type={TYPE.TMC} cat_id={CATEGORY.QNA} />);
				break;
			default :
				isDefault = true;
				addEvent = '0';
				prev_menu = undefined;
				list_menu.push(
					<div className="text-center" style={{'fontSize':'18px', 'paddingTop':'20vh', 'fontWeight':'bold'}}>
						Please Choose Memo / Form Category
					</div>					
				);
				break;
		}
		if(addEvent == '1'){
			if(localStorage.role == "1" || localStorage.role == "2" || localStorage.role == "3" || localStorage.role == "4" || localStorage.role == "10" || localStorage.role == "11" || localStorage.role == "12" || localStorage.role == "13" || (localStorage.role == "201" && menu_type == TYPE.TRAINING) || (localStorage.role == "202" && menu_type == TYPE.HOSPITAL_PROVIDER) || (localStorage.role == "202" && menu_type == TYPE.MEDICAL_TABLE) || (localStorage.role == "203" && menu_type == TYPE.SALES_ILUSTRATION) || ((localStorage.role == "204" || localStorage.role == "205") && menu_type == TYPE.BUKU_PEDOMAN) || (localStorage.role == "206" && menu_type == TYPE.USER_GUIDE_AMS) || (localStorage.role == "206" && menu_type == TYPE.TMC) || (localStorage.role == "207" && menu_type == TYPE.FUND_FACT) || localStorage.username == "user.banca"){
				buttonAdd.push(
					<div onClick={this.inputClick.bind(this, "input_" + choosen_menu)} className="box-link next-nav" data-toggle="tooltip" data-placement="top"><i className="fa fa-plus"></i></div>
				);
			}
		}

		if(prev_menu != undefined){
			buttonBack.push(
				<div onClick={this.menuClick.bind(this, prev_menu)} className="box-link prev-nav"><i className="fa fa-arrow-circle-left"></i></div>
			);
		}

		if(!isDefault){
			list_menu_.push(
				<div className="col-lg-9 col-xs-12">
					<div className="panel panel-default">
						<div className="panel-heading" style={{'backgroundColor':'#0096A9', 'color':'#FFF', 'fontWeight':'bold', 'overflow':'hidden'}}>
							<div className="panel-title">
								<div className="row">
									<div className="col-xs-10 col-sm-11">{titleMenu}</div>															
									<div className="col-xs-2 col-sm-1">
										{buttonAdd}
									</div>
								</div>
							</div>
						</div>

						{list_menu}

					</div>					
				</div>
			);
		}else{
			list_menu_ = list_menu;
		}

		let username = localStorage.getItem('name');
		let lastLogin = localStorage.getItem('last_login');
		let lastUpdate = localStorage.getItem('last_update');
		let memoMenu = [];
		if(localStorage.getItem('role') == 17 || localStorage.getItem('role') == 18 || localStorage.getItem('role') == 19 || localStorage.getItem('role') == 20 || localStorage.username == "user.banca"){
			memoMenu.push(
				<ul id="treenas">
					<li><a href="#">Form</a>
						<ul>
							<li><a onClick={this.menuClick.bind(this, 'agency_services')}><i className="fa fa-users"></i> Agency Services</a></li>
							<li>Client Services
								<ul>
									<li><a onClick={this.menuClick.bind(this, 'new_business')}><i className="fa fa-briefcase"></i> New Business</a></li>
									<li><a onClick={this.menuClick.bind(this, 'after_sales_service')}><i className="fa fa-hand-grab-o"></i> After Sales Services</a></li>
								</ul>
							</li>
						</ul>
					</li>
					<li>Memo
						<ul>
							<li><a onClick={this.menuClick.bind(this, 'contest')}><i className="fa fa-trophy"></i> Contest</a></li>
							<li><a onClick={this.menuClick.bind(this, 'non_contest')}><i className="fa fa-trophy text-danger"></i> Non Contest</a></li>
						</ul>
					</li>
					{/* <li><a onClick={this.menuClick.bind(this, 'trainer')}><i className="fa fa-user"></i> Training</a></li> */}
					<li><a href="#">Training</a>
						<ul>
							<li>Do You Know
								<ul>
									<li><a onClick={this.menuClick.bind(this, 'leadership')}><i className="fa fa-users"></i> Leadership</a></li>
									<li><a onClick={this.menuClick.bind(this, 'motivation')}><i className="fa fa-users"></i> Motivation</a></li>
									<li><a onClick={this.menuClick.bind(this, 'products')}><i className="fa fa-users"></i> Products</a></li>
									<li><a onClick={this.menuClick.bind(this, 'selling skills')}><i className="fa fa-users"></i> Selling Skills</a></li>
									<li><a onClick={this.menuClick.bind(this, 'tips')}><i className="fa fa-users"></i> Tips</a></li>
								</ul>
							</li>

							<li><a onClick={this.menuClick.bind(this, 'pr_summary')}><i className="fa fa-user"></i> Products & Riders Summary </a></li>
							<li><a onClick={this.menuClick.bind(this, 'sales_tools')}><i className="fa fa-user"></i> Sales Tools </a></li>
							<li><a onClick={this.menuClick.bind(this, 'handling_object')}><i className="fa fa-user"></i> Handling Objection </a></li>
							<li><a onClick={this.menuClick.bind(this, 'tmc_contest')}><i className="fa fa-user"></i> TM Connect Contest </a></li>
						</ul>
					</li>
					<li><a onClick={this.menuClick.bind(this, 'hospital')}><i className="fa fa-hospital-o"></i> Hospital Provider</a></li>
					<li><a onClick={this.menuClick.bind(this, 'medical')}><i className="fa fa-hospital-o"></i> Medical Table</a></li>
					{/* <li><a onClick={this.menuClick.bind(this, 'sales_ilustration')}><i className="fa fa-user"></i>Sales Ilustratiom TM Invest Pro</a></li> */}
					
					<li>Buku Pedoman Tenaga Pemasar
						<ul>
							<li><a onClick={this.menuClick.bind(this, 'kode_etik')}><i className="fa fa-user"></i> Kode Etik Keagenan</a></li>
							<li><a onClick={this.menuClick.bind(this, 'hak_kewajiban_pemasar')}><i className="fa fa-user"></i> Hak & Kewajiban Tenaga Pemasar</a></li>
							<li><a onClick={this.menuClick.bind(this, 'matriks_kedisiplinan_pemasar')}><i className="fa fa-user"></i> Matriks Kedisiplinan Tenaga Pemasar </a></li>
							<li><a onClick={this.menuClick.bind(this, 'informasi_kantor_pemasaran')}><i className="fa fa-user"></i> Informasi kantor pemasaran</a></li>
							<li><a onClick={this.menuClick.bind(this, 'visi_misi_perusahaan')}><i className="fa fa-user"></i> Visi & Misi Perusahaan dengan Nilai-nilai Keagenan </a></li>
							<li><a onClick={this.menuClick.bind(this, 'kebijakan_prosedur_logo')}><i className="fa fa-user"></i> Kebijakan dan Prosedur Logo Perusahaan </a></li>
							<li><a onClick={this.menuClick.bind(this, 'fasilitas_mdrt')}><i className="fa fa-user"></i> Fasilitas MDRT</a></li>
						</ul>
					</li>
					<li><a onClick={this.menuClick.bind(this, 'user_guide_ams')}><i className="fa fa-user"></i>User Guide AMS </a></li>
					<li><a onClick={this.menuClick.bind(this, 'fund_fact')}><i className="fa fa-user"></i>Fund Fact Sheet </a></li>
				</ul>
			)
		}else{
			memoMenu.push(
				<ul id="treenas">
					<li><a href="#">Form</a>
						<ul>
							<li><a onClick={this.menuClick.bind(this, 'agency_services')}><i className="fa fa-users"></i> Agency Services</a></li>
							<li>Client Services
								<ul>
									<li><a onClick={this.menuClick.bind(this, 'new_business')}><i className="fa fa-briefcase"></i> New Business</a></li>
									<li><a onClick={this.menuClick.bind(this, 'after_sales_service')}><i className="fa fa-hand-grab-o"></i> After Sales Services</a></li>
								</ul>
							</li>
						</ul>
					</li>
					<li>Memo
						<ul>
							<li><a onClick={this.menuClick.bind(this, 'contest')}><i className="fa fa-trophy"></i> Contest</a></li>
							<li><a onClick={this.menuClick.bind(this, 'non_contest')}><i className="fa fa-trophy text-danger"></i> Non Contest</a></li>
						</ul>
					</li>
					{/* <li><a onClick={this.menuClick.bind(this, 'trainer')}><i className="fa fa-user"></i> Training</a></li> */}
					<li><a href="#">Training</a>
						<ul>
							<li>Do You Know
								<ul>
									<li><a onClick={this.menuClick.bind(this, 'leadership')}><i className="fa fa-users"></i> Leadership</a></li>
									<li><a onClick={this.menuClick.bind(this, 'motivation')}><i className="fa fa-users"></i> Motivation</a></li>
									<li><a onClick={this.menuClick.bind(this, 'products')}><i className="fa fa-users"></i> Products</a></li>
									<li><a onClick={this.menuClick.bind(this, 'selling skills')}><i className="fa fa-users"></i> Selling Skills</a></li>
									<li><a onClick={this.menuClick.bind(this, 'tips')}><i className="fa fa-users"></i> Tips</a></li>
								</ul>
							</li>

							<li><a onClick={this.menuClick.bind(this, 'pr_summary')}><i className="fa fa-user"></i> Products & Riders Summary </a></li>
							<li><a onClick={this.menuClick.bind(this, 'sales_tools')}><i className="fa fa-user"></i> Sales Tools </a></li>
							<li><a onClick={this.menuClick.bind(this, 'handling_object')}><i className="fa fa-user"></i> Handling Objection </a></li>
							<li><a onClick={this.menuClick.bind(this, 'tmc_contest')}><i className="fa fa-user"></i> TM Connect Contest </a></li>
						</ul>
					</li>
					<li><a onClick={this.menuClick.bind(this, 'hospital')}><i className="fa fa-hospital-o"></i> Hospital Provider</a></li>
					<li><a onClick={this.menuClick.bind(this, 'medical')}><i className="fa fa-hospital-o"></i> Medical Table</a></li>
					{/* <li><a onClick={this.menuClick.bind(this, 'sales_ilustration')}><i className="fa fa-user"></i>Sales Ilustratiom TM Invest Pro</a></li> */}
					
					<li>Buku Pedoman Tenaga Pemasar
						<ul>
							<li><a onClick={this.menuClick.bind(this, 'kode_etik')}><i className="fa fa-user"></i> Kode Etik Keagenan</a></li>
							<li><a onClick={this.menuClick.bind(this, 'hak_kewajiban_pemasar')}><i className="fa fa-user"></i> Hak & Kewajiban Tenaga Pemasar</a></li>
							<li><a onClick={this.menuClick.bind(this, 'matriks_kedisiplinan_pemasar')}><i className="fa fa-user"></i> Matriks Kedisiplinan Tenaga Pemasar </a></li>
							<li><a onClick={this.menuClick.bind(this, 'informasi_kantor_pemasaran')}><i className="fa fa-user"></i> Informasi kantor pemasaran</a></li>
							<li><a onClick={this.menuClick.bind(this, 'visi_misi_perusahaan')}><i className="fa fa-user"></i> Visi & Misi Perusahaan dengan Nilai-nilai Keagenan </a></li>
							<li><a onClick={this.menuClick.bind(this, 'kebijakan_prosedur_logo')}><i className="fa fa-user"></i> Kebijakan dan Prosedur Logo Perusahaan </a></li>
							<li><a onClick={this.menuClick.bind(this, 'fasilitas_mdrt')}><i className="fa fa-user"></i> Fasilitas MDRT</a></li>
						</ul>
					</li>
					<li><a onClick={this.menuClick.bind(this, 'user_guide_ams')}><i className="fa fa-user"></i>User Guide AMS </a></li>
					<li><a onClick={this.menuClick.bind(this, 'fund_fact')}><i className="fa fa-user"></i>Fund Fact Sheet </a></li>
					<li>TMC
						<ul>
							<li><a onClick={this.menuClick.bind(this, 'panduan_tmc')}><i className="fa fa-user"></i> Panduan TM Connect</a></li>
							<li><a onClick={this.menuClick.bind(this, 'qna')}><i className="fa fa-user"></i> Q & A</a></li>
						</ul>
					</li>
				</ul>
			)
		}
		return (
			<div className="wrap2">

			{/* Start Top Menu Section */}
			{menu}
			{/* End Top Menu Section */}
			<FeatureModal />
			<SubmitModal />
			<div className="main-wrapper twoColumnMain">
					<ol className="breadcrumb" style={{marginBottom: '5px', marginTop:'55px'}}>
						<li className="active">E-Library</li>
					</ol>
				<div className="main">
					
					<div className="row">
						<div className="col-xs-12">
							<div className="row">
								<div className="col-lg-3 col-xs-12">
									<div className="panel panel-default">
										<div className="panel-body" id="panelMemo">
											{memoMenu}
										</div>
									</div>
								</div>
								{list_menu_}								
							</div>
						</div>
						<TMInvestModal/>
					</div>
										
				</div>
			</div>
			
			<Footer />
			
		</div>
		);
	}
}

export default memo_folder;