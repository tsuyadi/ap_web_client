
// const base_api = "http://api-apdev.tokiomarine-life.co.id/";
//  const base_api = 'http://api-apuat.tokiomarine-life.co.id/';
// const base_api = 'http://api-'+window.location.hostname+'/';
const base_api = 'https://api-apuat2.tokiomarine-life.co.id/';
// const base_api = 'http://192.168.1.99/';
// const base_api = 'https://api-agent.tokiomarine-life.co.id/';

// const host_uri = 'http://localhost:88/apuat/';
//const host_uri = 'http://localhost/ap_web_client/';
// const host_uri = 'http://localhost:88/apdev/';
// const host_uri = 'http://apuat.tokiomarine-life.co.id/';
// const host_uri = 'http://apdev.tokiomarine-life.co.id/';
const host_uri = 'https://apuat2.tokiomarine-life.co.id/';
// const host_uri = 'https://agent.tokiomarine-life.co.id/';

const api_route = {
    // Login and Token Related
    baseOnly: host_uri,
    baseAPI: base_api,

    notification : base_api + 'notifications/',
    logout : base_api + 'logout/',
    unit_price : base_api + 'policies/unit_price_history/',
    banner : base_api + 'agencies/image/',
    //takumi
    dashboard_takumi : base_api + '/takumi/takumi_dashboard/',
    //profile_takumi: base_api+'profile/',
    manpower : base_api + '/takumi/takumi_manpower/',
    parallel_or : base_api + '/takumi/takumi_parallel/',
    //end takumi

    agencyDepartment: base_api + 'agencies/department',
    agencyDepartmentCategory: base_api + 'agencies/department_category',
    memo_upload_action: base_api + 'agencies/file/list/',
    memo_list: base_api + 'agencies/memo/list/',
    form_list: base_api + 'agencies/form/list/',
    training_list: base_api + 'agencies/training/list/',
    hospitalprovider_list: base_api + 'agencies/hospitalprovider/list/',
    medicaltable_list: base_api + 'agencies/medicaltable/list/',
    salesilustration_list: base_api + 'agencies/salesilustration/list/',
    guidance_list: base_api + 'agencies/guidance/list/',
    user_guide_ams: base_api + 'agencies/guideams/list/',
    fund_fact: base_api + 'agencies/fundfactsheet/list/',
    tmc: base_api + 'agencies/guidetmc/list/',

    branchList: base_api + 'agencies/branch/list/',
    issueAPI: base_api + 'support/',

    // authToken: base_api+'auth/token/',
    authToken: base_api+'auth/token_new/',
    refreshToken: base_api+'auth/refresh/',
    verifyToken: base_api+'auth/verify',
    passwordRecovery: base_api+'pass/recovery/',
    passwordReset: base_api+'pass/reset/',
    passwordChange: base_api+'pass/change/',
    emailChange: base_api+'agencies/emailchange/',

    // Dashboard Related
    agentDashboard: base_api+'agencies/agent/dashboard/',
    agentApeDashboard: base_api+'agencies/agent/dashboard/ape/',
    agentDashboardv2: base_api+'agencies/agent/dashboard/v2/',
    agentDashboardSM: base_api+'agencies/agent/dashboard/sm/',
    agentDashboardDM: base_api+'agencies/agent/dashboard/dm/',
    agentDashboardRD: base_api+'agencies/agent/dashboard/rd/',
    agentDashboardRM: base_api+'agencies/agent/dashboard/rm/',
    managementDashboard: base_api+'agencies/management/dashboard/',
    branchDashboard: base_api+'agencies/branch/dashboard/',
    profile: base_api+'agencies/agent/profile/',
    changeProfile: base_api+'agencies/agent/update/',
    new_business: base_api+'agencies/popup/spaj/',
    production_report_agent: base_api+'report/agent/',
    production_report_rd: base_api+'report/rd/',
    production_report_agentpersonal: base_api+'report/agentpersonal/',
    production_report_management: base_api+'report/branch_reporting/',
    production_report_location: base_api+'report/branch_reporting/',
    commission_report: base_api+'report/commission_report/',
    comissionSlip: base_api+'agencies/agent/statement/commission/',
    collected_premium_report : base_api+'report/collected_premium_report/',
    production_by_branch : base_api+'agencies/management/production_by_branch/',
    new_recruit_report_management: base_api+'agencies/management/new_recruit_reporting/',
    movement_report_management: base_api+'agencies/management/movement_mtd_reporting/', // movement report
    // Pre Reg
    pre_reg__agent_filter : base_api+'preregistration/agent/filter/',
    pre_reg_agent_detail : base_api+'preregistration/agent/detail/',
    pre_reg_product : base_api+'preregistration/product/',
    pre_reg_doc : base_api+'preregistration/document/',
    pre_reg_payfreq : base_api+'preregistration/paymentfreq/',
    pre_reg_paymethod : base_api+'preregistration/paymentmethod/',
    pre_reg_status : base_api+'preregistration/status/',
    pre_reg_spaj_list : base_api+'preregistration/spaj/list/',
    pre_reg_spaj_create : base_api+'preregistration/spaj/create/',
    pre_reg_spaj_update : base_api+'preregistration/spaj/update/',
    pre_reg_spaj_detail : base_api+'preregistration/spaj/detail/',
    pre_reg_doc_info : base_api+'preregistration/documentinfo/',
    pre_reg_summary : base_api+'preregistration/summary/',
    pre_reg_log : base_api+'preregistration/loginfo/',
    // Agent Group Info
    agent_group_info: base_api+'agencies/agent/groupinfo/',
    agent_tree: base_api+'agencies/agent/tree/',
    agent_tree_report: base_api+'report/tree_report/',

    // SPAJ Related
    spaj_policyAssured: base_api+'policies/spaj/insured/',
    spaj_policyInfo: base_api+'policies/spaj/info/',
    spaj_policyHolder: base_api+'policies/spaj/holder/',
    spaj_refundPremium: base_api+'policies/spaj/refund/',
    spaj_support: base_api+'policies/spaj/document_support/',
    spaj_list: base_api+'policies/spaj/list/',

    // Policies Related
    policy_list: base_api+'policies/policy/list/',
    policy_summary: base_api+'policies/policy/summary/',
    policy_info: base_api+'policies/policy/info/',
    policy_holder_info: base_api+'policies/policy/holder/',
    insured_info: base_api+'policies/policy/insured/',
    policy_investment: base_api+'policies/policy/investment/',
    policy_unit_link: base_api+'/policies/policy/unit_link_transaction/',
    policy_premiumPayment: base_api+'policies/policy/payment/',
    policy_benefitPayment: base_api+'policies/policy/benefit/',
    policy_support: base_api+'policies/policy/document_support/',
    policy_investment_transaction_report: base_api+'policies/policy/investment_transaction_report/',
    policy_annual_investment_transaction_report: base_api+'policies/policy/annual_investment_transaction_report/',
    policy_unpaid : base_api+'policies/policy/failed_payment/',
    policy_suspense : base_api+'policies/policy/suspense/',
    // Claim
    claim_tracking: base_api+'claim/list/',
    claim_detail: base_api+'claim/detail/',
    incomplete_document: base_api+'claim/incomplete_document/',
    document: base_api+'claim/document/',
    benefit: base_api+'claim/benefit/',
    note: base_api+'claim/note/',
    payment_info: base_api+'claim/payment_info/',
    claim_PremiumDue: base_api+'policies/policy/due_date/',
    lapse_tracking: base_api+'policies/policy/lapse/',

    // memo
    // memo_upload: base_api+'policies/claim/list/',
    // memo_download: base_api+'policies/policy/due_date/',

    // bonus overriding
    bonus_overriding: base_api + 'bonus/overriding/',
    bonus_mib: base_api + 'bonus/mib/',
    bonus_leaderbonus: base_api + 'bonus/leader_bonus/',
    bonus_comission: base_api + 'bonus/agent_basic_commission/',
    bonus_rollingweek: base_api + 'bonus/rolling_week/',
    bonus_component: base_api + 'bonus/agent_commission_component/',
    bonus_collected: base_api + 'bonus/collected_premium/',

	// tm_connect_get_password : 'http://192.168.1.119/TMLI_WebService/AgentWS.asmx/GetAgentPassword',
	tm_connect_get_password : 'https://tmconnect.tokiomarine-life.co.id/TMLI_WebService/AgentWS.asmx/GetAgentPassword',

    new_recruit_agent: base_api + 'agencies/agent/new_recruit/',
    fyc_syc_parallel: base_api + 'bonus/fyc_syc_parallel/',

    product_info_summary : base_api + 'report/product_info_summary/',
    //CPP
    core_procedure_program : base_api + 'program/cpp/',

    //SAM
    open_case_selling : base_api + 'sam/open_case_selling/',
    open_case_recruit : base_api + 'sam/open_case_recruit/',
    active_agent_list : base_api + 'sam/active_agent_list/',
    selling_card : base_api + 'sam/selling_card/',
    selling_activity : base_api + 'sam/selling_activity/',
    recruit_card : base_api + 'sam/recruit_card/',
    recruit_activity : base_api + 'sam/recruit_activity/',
    activity_calender : base_api + 'sam/activity_calender/',
    activity_number : base_api + 'sam/activity_number/',
    money_analysis_report : base_api + 'sam/money_analysis_report/',

    //SSRS
    prospect_movement : base_api + 'ssrs/prospect_movement/',
    effectivity_ratio : base_api + 'ssrs/effectivity_ratio/',
    download_prospect_movement : base_api + 'ssrs/prospect_movement_download/',
    download_effectivity_ratio : base_api + 'ssrs/effectivity_ratio_download/',
    ssrs_source : base_api + 'ssrs/source/',
    ssrs_agent_name : base_api + 'ssrs/agent_name/',
    dashboard : base_api + 'ssrs/dashboard/',
    // dashboard_added : base_api + 'ssrs/dashboard_added/',
    // dashboard_completed : base_api + 'ssrs/dashboard_completed/',
    // dashboard_prospect_information : base_api + 'ssrs/dashboard_prospect_information/',
    // dashboard_opencase_progress : base_api + 'ssrs/dashboard_opencase_progress/',
    report_freepa : base_api + 'ssrs/report_freepa/',
    report_freepa_download : base_api + 'ssrs/report_freepa_download/',
    report_ams_utilization : base_api + 'ssrs/report_ams_utilization/',
    report_ams_utilization_download : base_api + 'ssrs/report_ams_utilization_download/',
    
    //my personal commission new
    new_weekly_bonus : base_api + 'newbonus/new_weekly_bonus/',
    rolling_weekly_bonus : base_api + 'newbonus/rolling_weekly_bonus/',
    persistence : base_api + 'newbonus/persistence/',
    overriding : base_api + 'newbonus/overriding_bonus/',
    yearly_bonus : base_api + 'newbonus/yearly_bonus/',
    agent_get : base_api + 'newbonus/agent_get_agent_personal/',
    overriding_group : base_api + 'newbonus/overriding_group/',
    overriding_bonus_group : base_api + 'newbonus/overriding_bonus_group/',
    overriding_parallel_group : base_api + 'newbonus/overriding_parallel_group/',
    monthly_incentive_bonus_rd : base_api + 'newbonus/monthly_incentive_bonus_rd/',
    quarterly_bonus_rd : base_api + 'newbonus/quarterly_bonus_rd/',
    yearly_bonus_rd : base_api + 'newbonus/yearly_bonus_rd/',
    overriding_personal_rd : base_api + 'newbonus/overriding_personal_rd/',
    parallel_overriding_rd : base_api + 'newbonus/parallel_overriding_rd/',
    // my commision takumi
    takumi_weekly_calculation : base_api + 'takumi_commission/weekly_calculation/',
    takumi_agent_get : base_api + 'takumi_commission/agent_get_agent/',
    takumi_stc_etc_bonus : base_api + 'takumi_commission/stc_etc_bonus/',
    takumi_monthly_bonus_personal : base_api + 'takumi_commission/monthly_bonus_personal/',
    takumi_monthly_bonus_group : base_api + 'takumi_commission/monthly_bonus_group/',
    takumi_yearly_bonus_personal : base_api + 'takumi_commission/yearly_bonus_personal/',
    takumi_yearly_bonus_group : base_api + 'takumi_commission/yearly_bonus_group/',
    takumi_overriding : base_api + 'takumi_commission/overriding/',
    takumi_parallel_overriding : base_api + 'takumi_commission/parallel_overriding/',

    takumi_report_production : base_api + 'takumi/takumi_report/',
    takumi_report_production_branch : base_api + 'takumi/takumi_branch_reporting/',
};

export default api_route;
