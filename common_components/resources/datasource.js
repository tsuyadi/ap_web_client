
import {COMM_TYPE, PROD_TYPE} from '../helper/constant'

const DataSource = [
    {
        'NAME' : 'DS_COMMTYPE_9',
        'VALUE' : [
            {value : COMM_TYPE.BASIC_COMISSION, text : 'Basic Comission'},
            {value : COMM_TYPE.WEEKLY_BONUS, text : 'Weekly Bonus'},
            {value : COMM_TYPE.PERSISTENCY_BONUS, text : 'Persistency Bonus'},
            {value : COMM_TYPE.FC_GET_FC, text : 'Get Agent Bonus'},
            {value : COMM_TYPE.YEAR_BONUS, text : 'Year End Bonus'}
        ]
    },
    {
        'NAME' : 'DS_COMMTYPE_8',
        'VALUE' : [
            {value : COMM_TYPE.BASIC_COMISSION, text : 'Basic Comission'},
            {value : COMM_TYPE.WEEKLY_BONUS, text : 'Weekly Bonus'},
            {value : COMM_TYPE.PERSISTENCY_BONUS, text : 'Persistency Bonus'},    
            {value : COMM_TYPE.YEAR_BONUS, text : 'Year End Bonus'},
            {value : COMM_TYPE.BASIC_OR, text : 'Basic Overriding'},
            {value : COMM_TYPE.BONUS_OR, text : 'Bonus Overriding'}
        ]
    },
    {
        'NAME' : 'DS_COMMTYPE_7',
        'VALUE' : [
            {value : COMM_TYPE.BASIC_COMISSION, text : 'Basic Comission'},
            {value : COMM_TYPE.WEEKLY_BONUS, text : 'Weekly Bonus'},
            {value : COMM_TYPE.PERSISTENCY_BONUS, text : 'Persistency Bonus'},    
            {value : COMM_TYPE.YEAR_BONUS, text : 'Year End Bonus'},
            {value : COMM_TYPE.BASIC_OR, text : 'Basic Overriding'},
            {value : COMM_TYPE.BONUS_OR, text : 'Bonus Overriding'}
        ]
    },
    {
        'NAME' : 'DS_COMMTYPE_6',
        'VALUE' : [
            {value : COMM_TYPE.BASIC_COMISSION, text : 'Basic Comission'},
            {value : COMM_TYPE.WEEKLY_BONUS, text : 'Weekly Bonus'},
            {value : COMM_TYPE.PERSISTENCY_BONUS, text : 'Persistency Bonus'},    
            {value : COMM_TYPE.YEAR_BONUS, text : 'Year End Bonus'},
            {value : COMM_TYPE.BASIC_OR, text : 'Basic Overriding'},
            {value : COMM_TYPE.BONUS_OR, text : 'Bonus Overriding'},
            {value : COMM_TYPE.RM_PARALLEL, text : 'RM Parallel Overriding'}
        ]
    },
    {
        'NAME' : 'DS_COMMTYPE_5',
        'VALUE' : [
            {value : COMM_TYPE.MPA, text : 'MPA'},
            {value : COMM_TYPE.MIB, text : 'MIB'},
            {value : COMM_TYPE.MIO, text : 'MIO'}
        ]
    },
    {
        'NAME' : 'DS_PRODTYPE_9',
        'VALUE' : [
            {value : PROD_TYPE.AFYC_PERSONAL, text : 'AFYC Personal'},
            {value : PROD_TYPE.AFYP_PERSONAL, text : 'AFYP Personal'},
            {value : PROD_TYPE.FYC_PERSONAL, text : 'FYC Personal'},
            {value : PROD_TYPE.FYP_PERSONAL, text : 'FYP Personal'},
            {value : PROD_TYPE.QC_COMPENSATION_PERSONAL, text : 'QC Personal'},
            {value : PROD_TYPE.SYC_PERSONAL, text : 'SYC Personal'}            
        ]
    },
    {
        'NAME' : 'DS_PRODTYPE_8',
        'VALUE' : [
            {value : PROD_TYPE.ACTIVE_AGENT, text : 'Active Agent'},
            {value : PROD_TYPE.AFYP_PERSONAL, text : 'AFYP Personal'},
            {value : PROD_TYPE.AFYP_GROUP, text : 'AFYP Group'},
            {value : PROD_TYPE.AFYC_PERSONAL, text : 'AFYC Personal'},
            {value : PROD_TYPE.AFYC_GROUP, text : 'AFYC Group'},
            {value : PROD_TYPE.FYC_PERSONAL, text : 'FYC Personal'},
            {value : PROD_TYPE.FYC_GROUP, text : 'FYC Group'},
            {value : PROD_TYPE.FYP_PERSONAL, text : 'FYP Personal'},
            {value : PROD_TYPE.FYP_GROUP, text : 'FYP Group'},
            {value : PROD_TYPE.NEW_RECRUIT, text : 'New Recruit'},
            {value : PROD_TYPE.QC_COMPENSATION_PERSONAL, text : 'QC Personal'},
            {value : PROD_TYPE.QC_COMPENSATION_GROUP, text : 'QC Group'},
            {value : PROD_TYPE.SYC_PERSONAL, text : 'SYC Personal'},
            {value : PROD_TYPE.SYC_GROUP, text : 'SYC Group'}            
        ]
    },
    {
        'NAME' : 'DS_PRODTYPE_7',
        'VALUE' : [
            {value : PROD_TYPE.ACTIVE_AGENT, text : 'Active Agent'},
            {value : PROD_TYPE.AFYP_PERSONAL, text : 'AFYP Personal'},
            {value : PROD_TYPE.AFYP_GROUP, text : 'AFYP Group'},
            {value : PROD_TYPE.AFYC_PERSONAL, text : 'AFYC Personal'},
            {value : PROD_TYPE.AFYC_GROUP, text : 'AFYC Group'},
            {value : PROD_TYPE.FYC_PERSONAL, text : 'FYC Personal'},
            {value : PROD_TYPE.FYC_GROUP, text : 'FYC Group'},
            {value : PROD_TYPE.FYP_PERSONAL, text : 'FYP Personal'},
            {value : PROD_TYPE.FYP_GROUP, text : 'FYP Group'},
            {value : PROD_TYPE.NEW_RECRUIT, text : 'New Recruit'},
            {value : PROD_TYPE.QC_COMPENSATION_PERSONAL, text : 'QC Personal'},
            {value : PROD_TYPE.QC_COMPENSATION_GROUP, text : 'QC Group'},
            {value : PROD_TYPE.SYC_PERSONAL, text : 'SYC Personal'},
            {value : PROD_TYPE.SYC_GROUP, text : 'SYC Group'} 
        ]
    },
    {
        'NAME' : 'DS_PRODTYPE_6',
        'VALUE' : [
            {value : PROD_TYPE.ACTIVE_AGENT, text : 'Active Agent'},
            {value : PROD_TYPE.AFYP_PERSONAL, text : 'AFYP Personal'},
            {value : PROD_TYPE.AFYP_GROUP, text : 'AFYP Group'},
            {value : PROD_TYPE.AFYC_PERSONAL, text : 'AFYC Personal'},
            {value : PROD_TYPE.AFYC_GROUP, text : 'AFYC Group'},
            {value : PROD_TYPE.FYC_PERSONAL, text : 'FYC Personal'},
            {value : PROD_TYPE.FYC_GROUP, text : 'FYC Group'},
            {value : PROD_TYPE.FYP_PERSONAL, text : 'FYP Personal'},
            {value : PROD_TYPE.FYP_GROUP, text : 'FYP Group'},
            {value : PROD_TYPE.NEW_RECRUIT, text : 'New Recruit'},
            {value : PROD_TYPE.QC_COMPENSATION_PERSONAL, text : 'QC Personal'},
            {value : PROD_TYPE.QC_COMPENSATION_GROUP, text : 'QC Group'},
            {value : PROD_TYPE.SYC_PERSONAL, text : 'SYC Personal'},
            {value : PROD_TYPE.SYC_GROUP, text : 'SYC Group'} 
        ]
    },
    {
        'NAME' : 'DS_PRODTYPE_5',
        'VALUE' : [
            {value : PROD_TYPE.AFYC_PERSONAL, text : 'AFYC Personal'},
            {value : PROD_TYPE.AFYC_GROUP, text : 'AFYC Group'},
            {value : PROD_TYPE.AFYP_PERSONAL, text : 'AFYP Personal'},
            {value : PROD_TYPE.AFYP_GROUP, text : 'AFYP Group'},
            {value : PROD_TYPE.FYC_PERSONAL, text : 'FYC Personal'},
            {value : PROD_TYPE.FYC_GROUP, text : 'FYC Group'},
            {value : PROD_TYPE.FYP_PERSONAL, text : 'FYP Personal'},
            {value : PROD_TYPE.FYP_GROUP, text : 'FYP Group'},            
            {value : PROD_TYPE.SYC_PERSONAL, text : 'SYC Personal'},
            {value : PROD_TYPE.SYC_GROUP, text : 'SYC Group'},
            {value : PROD_TYPE.FYC_PARALLEL, text : 'FYC Parallel'},
            {value : PROD_TYPE.SYC_PARALLEL, text : 'SYC Parallel'}
        ]
    }
];

export function getDataSource(datasourcename){

    var listSources = null;

    DataSource.forEach((details)=>{
        if(details.NAME == datasourcename){
            listSources = details.VALUE;
        }
    });

    return listSources;

}