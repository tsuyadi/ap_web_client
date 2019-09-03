
import {TYPE} from '../../common_components/helper/constant';
import api_route from '../../common_components/api_route';
import {loadLink, load, actionDelete} from '../../common_components/helper/url_helper';

class MemoFormList extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            category_id : props.cat_id,
            type : props.type,
            param: {
                name : ''
            },
            list : null
        }

        this.loadData = this.loadData.bind(this);
        this.searchData = this.searchData.bind(this);
        this.changeHandler = this.changeHandler.bind(this);
        this.remove = this.remove.bind(this);
        this.download = this.download.bind(this);
        this._onSortChange = this._onSortChange.bind(this);

    }

    componentDidMount(){
        this.loadData();
    }

    componentWillReceiveProps(props){
        this.state = {
            category_id : props.cat_id,
            type : props.type,
            param: {
                name : ''
            },
            list : null
        }
        this.searchData();
    }

    loadData(){
        // // debugger;
        // let uri = this.state.type == TYPE.FORM ? api_route.form_list : this.state.type == TYPE.MEMO ? api_route.memo_list : api_route.training_list;
        let uri = "";
        if(this.state.type == TYPE.FORM){
            uri = api_route.form_list;
        } else if(this.state.type == TYPE.MEMO){
            uri = api_route.memo_list;
        } else if(this.state.type == TYPE.TRAINING){
            uri = api_route.training_list;
        }else if(this.state.type == TYPE.HOSPITAL_PROVIDER){
            uri = api_route.hospitalprovider_list;
        }else if(this.state.type == TYPE.MEDICAL_TABLE){
            uri = api_route.medicaltable_list;
        }else if(this.state.type == TYPE.SALES_ILUSTRATION){
            uri = api_route.salesilustration_list;
        }else if(this.state.type == TYPE.USER_GUIDE_AMS){
            uri = api_route.user_guide_ams;
        }else if(this.state.type == TYPE.FUND_FACT){
            uri = api_route.fund_fact;
        }else if(this.state.type == TYPE.TMC){
            uri = api_route.tmc;
        }else{
            uri = api_route.guidance_list;
        }
        $('.loadresult').hide();
        $('.loadpr').show();
        
        load(uri
        , {
            'department_category' : this.state.category_id
        }
        , (response)=>{
            $('.loadresult').show();
            $('.loadpr').hide();
            this.setState({
                list : response
            });
        }
        , (error)=>{
            $('.loadresult').show();
            $('.loadpr').hide();
            console.error(error);
        });

    }

    searchData(){
        // let uri = this.state.type == TYPE.FORM ? api_route.form_list : api_route.memo_list;
        // let uri = this.state.type == TYPE.FORM ? api_route.form_list : this.state.type == TYPE.MEMO ? api_route.memo_list : api_route.training_list;
        let uri = "";
        if(this.state.type == TYPE.FORM){
            uri = api_route.form_list;
        } else if(this.state.type == TYPE.MEMO){
            uri = api_route.memo_list;
        } else if(this.state.type == TYPE.TRAINING){
            uri = api_route.training_list;
        }else if(this.state.type == TYPE.HOSPITAL_PROVIDER){
            uri = api_route.hospitalprovider_list;
        }else if(this.state.type == TYPE.MEDICAL_TABLE){
            uri = api_route.medicaltable_list;
        }else if(this.state.type == TYPE.SALES_ILUSTRATION){
            uri = api_route.salesilustration_list;
        }else if(this.state.type == TYPE.USER_GUIDE_AMS){
            uri = api_route.user_guide_ams;
        }else if(this.state.type == TYPE.FUND_FACT){
            uri = api_route.fund_fact;
        }else if(this.state.type == TYPE.TMC){
            uri = api_route.tmc;
        }
        else{
            uri = api_route.guidance_list;
        }
        if(this.state.name != ''){

            $('.loadresult').hide();
            $('.loadpr').show();

            load(uri
            , {
                'department_category' : this.state.category_id,
                'name' : this.state.param.name
            }
            , (response) => {
                $('.loadresult').show();
                $('.loadpr').hide();
                this.setState({
                    list : response
                });
            }
            , (error) => {
                $('.loadresult').show();
                $('.loadpr').hide();
                console.error(error);
            });
        }else{
            this.loadData();
        }
        
    }

    changeHandler(event){
		
		let data_array = {};
		for (let i in this.state.param) {
			if(i==event.target.name){
				data_array[i] = event.target.value
			}
			else{
				data_array[i] = this.state.param[i]
			}
		}

		// this.setState({
		// 	param : data_array
		// });

        this.state.param = data_array;

        this.searchData();

	}
    
    remove(id){

        let uri = api_route.memo_upload_action;

        let msg = this.state.type == TYPE.FORM ? "Form" : "Memo";

        if(id != ''){
            actionDelete(uri, id, (response) => {
                alert("File are sucessfully deleted ! ");
                this.searchData();
            }, (error) => {
                alert("failed");
            })
        }

    }

    download(url){
        window.location.href=url;
    }

    _onSortChange(list, column) {
        
		var sorted = list;
		
        if (sorted == null) return sorted;

		sorted.sort((indexA, indexB) => {
            var valueA = indexA[column];
            var valueB = indexB[column];
            var sortVal = 0;
            if (valueA > valueB) {
                sortVal = 1;
            }
            if (valueA < valueB) {
                sortVal = -1;
            }
            
            if (sortVal === 0) {
                sortVal = sortVal * -1;
            }

            return sortVal;
		});

		return sorted;
	}

    render(){
        let token = '?token='+sessionStorage.getItem('token');
        $(function () {
			$('[data-toggle="tooltip"]').tooltip();
		});
        
        let list_result = [];

        if(this.state.type == "2"){
           if(this.state.list != null && this.state.list != undefined){
                this.state.list = this._onSortChange(this.state.list, "name");
           }
        }

        if(this.state.list != null && this.state.list != undefined && this.state.list.length > 0){
            this.state.list.map((e, t) => {

                let deleteAction = [];
                console.log(localStorage.role);
                console.log(this.state.type);
                if(localStorage.role == '3' || localStorage.role == "4" || localStorage.role == "2" || localStorage.role == "1" || (localStorage.role == "201" && this.state.type == TYPE.TRAINING) || (localStorage.role == "202" && this.state.type == TYPE.HOSPITAL_PROVIDER) || (localStorage.role == "202" && this.state.type == TYPE.MEDICAL_TABLE) || (localStorage.role == "203" && this.state.type == TYPE.SALES_ILUSTRATION) || ((localStorage.role == "204" || localStorage.role == "205") && this.state.type == TYPE.BUKU_PEDOMAN) || (localStorage.role == "206" && this.state.type == TYPE.USER_GUIDE_AMS) || (localStorage.role == "206" && this.state.type == TYPE.TMC) || (localStorage.role == "207" && this.state.type == TYPE.FUND_FACT) ||  localStorage.username == "user.banca"){
                    deleteAction.push(
                        <div onClick={this.remove.bind(this, e.id)} className="col-xs-offset-2 col-xs-1 text-right text-danger"><i className="fa fa-trash" aria-hidden="true"></i></div>
                    );
                }

                list_result.push(
                    <a className="list-group-item" id={e.id}>
                        <div className="row">
                            <div className="col-xs-11" style={{'fontSize':'10px'}}>Created on {e.created_at}</div>
                            <div className="col-xs-1 text-right text-primary" data-toggle="tooltip" data-placement="top" title="Download" onClick={this.download.bind(this, api_route.baseAPI + e.filename+token)}><i className="fa fa-download" aria-hidden="true"></i></div>
                        </div>
                        <div className="row">
                            <div className="col-xs-9">{e.name}</div>
                            {deleteAction}
                            {/*<div className="col-xs-3 text-right">New Business</div>*/}
                        </div>
                    </a>
                );
            });
        }else{
            list_result.push(
                <a className="list-group-item">
                    <div className="row">
                        <div className="col-xs-12 text-center" style={{'fontWeight':'bold'}}>Not Found</div>
                    </div>
                </a>
            );
        }

        return (
            <div className="panel-body boxShadow">
                <div className="row">
                    <div className="col-xs-10 col-sm-11" >
                        <input type="text" placeholder="search by name" className="form-control" name="name" onChange={this.changeHandler} />															
                    </div>
                    <div className="col-xs-2 col-sm-1" style={{'paddingLeft':'0px'}}>
                        <button className="btn btn-default" data-toggle="tooltip" data-placement="top" title="Search" onClick={this.searchData} ><i className="fa fa-search"></i></button>
                    </div>
                </div>
                <div className="row">&nbsp;</div>
                <div className="row loadpr">
                    <div className="col-xs-12 text-center">
                        <i className="fa fa-spinner fa-pulse fa-2x fa-fw"></i>
                        <span className="sr-only">Loading...</span>
                    </div>
                </div>
                <div className="row loadresult">
                    <div className="col-xs-12">                        
                        {list_result}
                    </div>
                </div>
            </div>
        );
    }

}

export default MemoFormList;