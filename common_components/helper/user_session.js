
import TopMenuRD    from '../menu_v2/top_menu_rd';
import TopMenu      from '../menu_v2/top_menu';
import TopMenuFC    from '../menu_v2/top_menu_fc';
import TopMenuMgt   from '../menu_v2/top_mgt';
import TopMenuDepartment from '../menu_v2/top_department';
import TopMenuTakumi    from '../menu_v2/top_menu_takumi';
import TopMenuProfile   from '../menu_v2/top_menu_profile';
import TopMenuCustom from '../menu_v2/top_menu_custom';

function changeLanguage(lang){
    localStorage.setItem('LANG', lang);
    location.reload();
}

export function getDashboardMenu(){

    var role = '';
    var username = '';
    var last_login = '';
    var last_update = '';

    var className = "";

    var comp = [];
    var RoleConst = {
        AP : '14',
        FC : '9',
        RP :'8',
        AB :'7',
        RB :'6',
        RD :'5',
        RSH : '1',
        MGT : '3',
        BRANCH : '4',
        ADMIN : '2',
        TRAINING_DEPT : '201',
        CLAIM_DEPT : '202',
        ACTUARY_DEPT : '203',
        MARKETING_DEPT : '204',
        LEGAL_DEPT : '205',
        TAKUMI_TC : '13',
        TAKUMI_GS : '12',
        TAKUMI_PS : '11',
        TAKUMI_ETC : '15',
        TAKUMI_STC : '16',
        RBM : '17',
        EBC : '18',
        SBC : '19',
        BC : '20',
    }

    try{    

        role = localStorage.getItem('role');
        name = localStorage.getItem('name');
        last_login = localStorage.getItem('last_login');        
        last_update = localStorage.getItem('last_update');
        
        switch(role){
            case RoleConst.FC :
                return (
                    <TopMenuFC username={name} lastlogin={last_login} lastUpdate={last_update} />
                );
            case RoleConst.RP :
                return (
                    <TopMenuFC username={name} lastlogin={last_login} lastUpdate={last_update} />
                );
            case RoleConst.AP :
                return (
                    <TopMenuFC username={name} lastlogin={last_login} lastUpdate={last_update} />
                );
            case RoleConst.AB :
            case RoleConst.RB :
            case RoleConst.RBM :
            case RoleConst.EBC :
            case RoleConst.SBC :
            case RoleConst.BC :
                return (
                    <TopMenu username={name} lastlogin={last_login} lastUpdate={last_update} />
                );
            case RoleConst.RD :
                return (
                    <TopMenuRD username={name} lastlogin={last_login} lastUpdate={last_update} />
                );
            case RoleConst.TAKUMI_PS :
            case RoleConst.TAKUMI_GS :
            case RoleConst.TAKUMI_TC :
            case RoleConst.TAKUMI_ETC :
            case RoleConst.TAKUMI_STC :
                return (
                    <TopMenuTakumi username={name} lastlogin={last_login} lastUpdate={last_update} />
                );
            //  case RoleConst.TAKUMI_TC :
            //     return (
            //         <TopMenuTakumi username={name} lastlogin={last_login} lastUpdate={last_update} />
            //     );
            // case RoleConst.TAKUMI_GS :
            //     return (
            //         <TopMenuTakumi username={name} lastlogin={last_login} lastUpdate={last_update} />
            //     );
            // case RoleConst.TAKUMI_PS :
            //     return (
            //         <TopMenuTakumi username={name} lastlogin={last_login} lastUpdate={last_update} />
            //     );
            default :
                window.location.href="#/";
                break;
        }

    }catch(e){
        console.log(e);
    }

    return '';

}

export function getMenu(menuName, faclass){

    var role = '';
    var username = '';
    var last_login = '';
    var last_update = '';

    var className = "";

    var comp = [];
    var RoleConst = {
        DEPT : '10',
        AP : '14',
        FC : '9',
        RP :'8',
        AB :'7',
        RB :'6',
        RD :'5',
        RSH : '1',
        MGT : '3',
        BRANCH : '4',
        ADMIN : '2',
        TRAINING_DEPT : '201',
        CLAIM_DEPT : '202',
        ACTUARY_DEPT : '203',
        MARKETING_DEPT : '204',
        LEGAL_DEPT : '205',
        BP_DEPT : '206',
        INVESTMENT_DEPT : '207',
        TAKUMI_TC : '13',
        TAKUMI_GS : '12',
        TAKUMI_PS : '11',
        TAKUMI_ETC : '15',
        TAKUMI_STC : '16',
        RBM : '17',
        EBC : '18',
        SBC : '19',
        BC : '20',
        PA : '999',
    }

    try{    

        role = localStorage.getItem('role');
        name = localStorage.getItem('name');
        last_login = localStorage.getItem('last_login');   
        last_update = localStorage.getItem('last_update');

        if(faclass == "" || faclass == undefined){
            className = "fa fa-picture-o";
        }else{
            className = faclass;
        }

        var header = (
            <span className="titleStaticPage"><i className={className}></i> {menuName}</span>
        );

        switch(role)
        {
            case RoleConst.ADMIN :
            case RoleConst.BRANCH :
            case RoleConst.RSH :
            case RoleConst.MGT :
                return (
                    <TopMenuMgt username={name} lastlogin={last_login} header = {header} eventLang={changeLanguage} last_update={last_update}  />
                );
            case RoleConst.TRAINING_DEPT :
            case RoleConst.CLAIM_DEPT :
            case RoleConst.ACTUARY_DEPT :
            case RoleConst.MARKETING_DEPT :
            case RoleConst.LEGAL_DEPT :
            case RoleConst.BP_DEPT : 
            case RoleConst.INVESTMENT_DEPT : 
            case RoleConst.DEPT : 
                name = localStorage.getItem('username');
                return (
                    <TopMenuDepartment username={name} lastlogin={last_login} header={header} eventLang={changeLanguage} last_update={last_update}  />
                );
            // case RoleConst.TAKUMI_PS :
            // case RoleConst.TAKUMI_GS :
            // case RoleConst.TAKUMI_TC :
            // case RoleConst.TAKUMI_ETC :
            // case RoleConst.TAKUMI_STC :
            //     return (
            //         <TopMenuTakumi username={name} lastlogin={last_login} lastUpdate={last_update} />
            //     );
            default :
                return (
                    <TopMenuCustom username={name} lastlogin={last_login} header = {header} eventLang={changeLanguage} last_update={last_update}  />
                );
        }


    }catch(e){
        console.log(e);
    }

    return '';

}