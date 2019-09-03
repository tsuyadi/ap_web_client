
export const TYPE = {
    MEMO : '1',
	FORM : '2',
	TRAINING : '3',
	HOSPITAL_PROVIDER : '4',
	MEDICAL_TABLE : '5',
	SALES_ILUSTRATION : '6',
	BUKU_PEDOMAN : '7',
	USER_GUIDE_AMS : '8',
	FUND_FACT : '9',
	TMC : '10',
}

export const COMMON = {
	TM_CONNECT_KEY : 'TMC0nn3ct'
}

export const CATEGORY = {
	'CONTEST' : 3,
	'NON_CONTEST' : 4,
	'AGENCY_SERVICES' : 5,
	'NEW_BUSINESS' : 6,
	'AFTER_SALES_SERVICES' : 7,
	'TRAINER': 8,
	'LEADERSHIP': 9,
	'MOTIVATION': 10,
	'PRODUCTS': 11,
	'SELLING_SKILLS': 12,
	'TIPS': 13,
	'PRODUCTS_RIDERS_SUMMARY': 14,
	'SALES_TOOLS': 15,
	'HANDLING_OBJECTION': 16,
	'TM_CONNECT_CONTEST': 17,
	'HOSPITAL_PROVIDER': 18,
	'MEDICAL_TABLE': 19,
	'SALES_ILUSTRATION': 20,
	'KODE_ETIK_KEAGENAN': 21,
	'HAK_KEWAJIBAN_PEMASAR' : 22,
	'MATRIKS_KEDISIPLINAN_PEMASAR' : 23, 
	'INFORMASI_KANTOR_PEMASARAN' : 24,
	'VISI_MISI_PERUSAHAAN' : 25, 
	'KEBIJAKAN_PROSEDUR' : 26, 
	'FASILITAS_MDRT' : 27, 
	'USER_GUIDE_AMS' : 28,
	'FUND_FACT' : 29,
	'PANDUAN_TMC' : 30,
	'QNA' : 31,
};

export const AGENT_LEVEL = {
	'AMP' : 14,
	'FC' : 9,
	'RMP' : 8,
	'AMB' : 7,
	'RMB' : 6,
	'RD' : 5
}

export const MIME_TYPE = {
	CSV : 'text/csv',
	CSV_APPLICATION : 'application/csv',
	XSLX : 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
}

export const COMM_TYPE = {
	BASIC_COMISSION : '1',  // OKAY
	BASIC_OR : '2',  // OKAY
	NEW_WEEKLY_BONUS : '3',
	WEEKLY_BONUS : '4',  // OKAY
	FC_GET_FC : '5',  // OKAY
	YEAR_BONUS : '6', // OKAY
	BONUS_OR : '7',
	RM_PARALLEL : '8',
	MPA : '9', // OKAY
	MIO : '10', // OKAY
	MIB : '11', // OKAY
	PERSISTENCY_BONUS : '13',  // OKAY
	RD_QB : '14',
	RD_YEAR_BONUS : '15'	
}

export function GET_COMM_NAME(Type){
	switch(Type){
		case COMM_TYPE.BASIC_COMISSION :
			return "Basic Comission";
		case COMM_TYPE.BASIC_OR :
			return "Basic OR";
		case COMM_TYPE.NEW_WEEKLY_BONUS :
			return "New Weekly Bonus";
		case COMM_TYPE.WEEKLY_BONUS :
			return "Weekly Bonus";
		case COMM_TYPE.FC_GET_FC :
			return "FC Get FC";
		case COMM_TYPE.YEAR_BONUS :
			return "Year Bonus";
		case COMM_TYPE.BONUS_OR :
			return "Bonus OR";
		case COMM_TYPE.RM_PARALLEL :
			return "RM Parallel";
		case COMM_TYPE.MPA :
			return "MPA";
		case COMM_TYPE.MIO :
			return "MIO";
		case COMM_TYPE.MIB :
			return "MIB";
		case COMM_TYPE.PERSISTENCY_BONUS :
			return "Persistency Bonus"
		case COMM_TYPE.RD_QB :
			return "RD QB";
		case COMM_TYPE.RD_YEAR_BONUS :
			return "RD Year Bonus";		
		default :
			return "";
	}
}

export const PROD_TYPE = {
	QC_REPORT : '1',
	AFYP_PERSONAL : '21',
	AFYP_GROUP : '22',
	AFYC_PERSONAL : '31',
	AFYC_GROUP : '32',
	FYP_PERSONAL : '41',
	FYP_GROUP : '42',
	SYP_PERSONAL : '51',
	SYP_GROUP : '52',
	TYP : '6',
	NYP : '7',
	FYC_PERSONAL : '81',
	FYC_GROUP : '82',
	SYC_PERSONAL : '91',
	SYC_GROUP : '92',
	TYC : '10',
	NYC : '11',
	QC_COMPENSATION_PERSONAL : '121',
	QC_COMPENSATION_GROUP : '122',
	ACTIVE_AGENT : '201',
	NEW_RECRUIT : '202',
	FYC_PARALLEL : '98',
	SYC_PARALLEL : '99'
}

export function GET_PROD_NAME(Type){
	switch(Type){
		case PROD_TYPE.QC_REPORT :
			return "QC Report";
		case PROD_TYPE.AFYP_PERSONAL :
			return "AFYP Personal";
		case PROD_TYPE.AFYP_GROUP :
			return "AFYP Group";
		case PROD_TYPE.AFYC_PERSONAL :
			return "AFYC Personal";
		case PROD_TYPE.AFYC_GROUP :
			return "AFYC Group";
		case PROD_TYPE.FYP_PERSONAL :
			return "FYP Personal";
		case PROD_TYPE.FYP_GROUP :
			return "FYP Group";
		case PROD_TYPE.SYP_PERSONAL :
			return "SYP Personal";
		case PROD_TYPE.SYP_GROUP :
			return "SYP Group";
		case PROD_TYPE.TYP :
			return "TYP";
		case PROD_TYPE.NYP :
			return "NYP";
		case PROD_TYPE.FYC_PERSONAL :
			return "FYC Personal";
		case PROD_TYPE.FYC_GROUP :
			return "FYC Group";
		case PROD_TYPE.SYC_PERSONAL :
			return "SYC Personal";
		case PROD_TYPE.SYC_GROUP :
			return "SYC Group";
		case PROD_TYPE.TYC :
			return "TYC";
		case PROD_TYPE.NYC :
			return "NYC";
		case PROD_TYPE.QC_COMPENSATION_PERSONAL :
			return "QC Personal";
		case PROD_TYPE.QC_COMPENSATION_GROUP :
			return "QC Group"
		case PROD_TYPE.ACTIVE_AGENT :
			return "Active Agent";
		case PROD_TYPE.NEW_RECRUIT :
			return "New Recruit";
		case PROD_TYPE.SYC_PARALLEL : 
			return "SYC Parallel";
		case PROD_TYPE.FYC_PARALLEL :
			return "FYC Parallel";
		default :
			return "";
	}
}