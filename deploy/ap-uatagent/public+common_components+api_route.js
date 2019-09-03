const base_api = "http://api-apuat2.tokiomarine-life.co.id/";

const api_route = {
    // Login and Token Related
    authToken: base_api+'auth/token/',
    refreshToken: base_api+'auth/refresh/',
    verifyToken: base_api+'auth/verify',
    passwordRecovery: base_api+'pass/recovery/',
    passwordReset: base_api+'pass/reset/',

    // Dashboard Related
    agentDashboard: base_api+'agencies/agent/dashboard/',
    agentDashboardv2: base_api+'agencies/agent/dashboard/v2/',
    agentDashboardSM: base_api+'agencies/agent/dashboard/sm/',
    agentDashboardDM: base_api+'agencies/agent/dashboard/dm/',
    agentDashboardRD: base_api+'agencies/agent/dashboard/rd/',
    agentDashboardRM: base_api+'agencies/agent/dashboard/rm/',
    managementDashboard: base_api+'agencies/management/dashboard/',
    branchDashboard: base_api+'agencies/branch/dashboard/',
    profile: base_api+'agencies/agent/profile/',
    new_business: base_api+'agencies/popup/spaj/',
    production_report_agent: base_api+'report/agent/',
    production_report_management: base_api+'report/',
    comissionSlip: base_api+'agencies/agent/statement/commission/'
};

export default api_route;
