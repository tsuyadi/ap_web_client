'use strict'
import api_route from '../../common_components/api_route';
import {UserLevelMap, MoneyFormat} from '../../common_components/helper/formatter';

class Overriding extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : null,
		}
    }
    
	componentWillMount(){
		$.ajax({
			url: api_route.dashboard_takumi,
			headers: {
				'Authorization':'JWT '+sessionStorage.getItem('token')
			},
			data: [],
			processData: false,
			contentType: false,
			type: 'POST',
			success: (response) => {
				$('#loading').modal('hide');              

				this.setState({
					data: response,
					//data : response.takumi_dashboard_group 
				});
			},
			error: (err, response) => {
			$('#loading').modal('hide');
			if(err.responseJSON){
				window.location.href = window.location.href.split('#')[0] + '#/';
			}
			
			}
		});
    }
    
	render(){
        
        // if(this.state.data == undefined && this.state.data == null){
		// 	if(this.props.data != undefined && this.props.data != null){
        //         this.state.data = this.props.data;
		// 	}
        // }

        var ov_personal_selling1 = this.state.data && this.state.data.takumi_dashboard_personal.overriding_selling_year1;
        var ov_personal_selling2 = this.state.data && this.state.data.takumi_dashboard_personal.overriding_selling_year2;
        var ov_personal_selling3 = this.state.data && this.state.data.takumi_dashboard_personal.overriding_selling_year3;
        var ov_group_selling1 = this.state.data && this.state.data.takumi_dashboard_group.overriding_selling_year1;
        var ov_group_selling2 = this.state.data && this.state.data.takumi_dashboard_group.overriding_selling_year2;
        var ov_group_selling3 = this.state.data && this.state.data.takumi_dashboard_group.overriding_selling_year3;
        var overriding = this.state.data && this.state.data.takumi_dashboard_group.overriding;

        ov_personal_selling1 = isNaN(ov_personal_selling1) || ov_personal_selling1 == 0 ? 0 : MoneyFormat(ov_personal_selling1);
        ov_personal_selling2 = isNaN(ov_personal_selling2) || ov_personal_selling2 == 0 ? 0 : MoneyFormat(ov_personal_selling2);
        ov_personal_selling3 = isNaN(ov_personal_selling3) || ov_personal_selling3 == 0 ? 0 : MoneyFormat(ov_personal_selling3);
        ov_group_selling1 = isNaN(ov_group_selling1) || ov_group_selling1 == 0 ? 0 : MoneyFormat(ov_group_selling1);
        ov_group_selling2 = isNaN(ov_group_selling2) || ov_group_selling2 == 0 ? 0 : MoneyFormat(ov_group_selling2);
        ov_group_selling3 = isNaN(ov_group_selling3) || ov_group_selling3 == 0 ? 0 : MoneyFormat(ov_group_selling3);
        overriding = isNaN(overriding) || overriding == 0 ? 0 : MoneyFormat(overriding);

		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-user"></i> Overriding</div>
			<div className="box-summary">
                <div className="entry">
                    <div className="row">
                        <div className="col-sm-4" style={{borderRight:'2px solid'}}>
                            <form className="form-horizontal">
                                <span>Overriding Year - 1<br/></span>
                                <div className="form-group">
                                    <label className="col-sm-5 control-label">Personal Selling</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" placeholder="-" disabled value={ov_personal_selling1} />
                                    </div> 
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-5 control-label">Group Selling</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" placeholder="-" disabled value={ov_group_selling1} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-sm-4" style={{borderRight:'2px solid'}}>
                            <form className="form-horizontal">
                                <span>Overriding Year - 2 <br/></span>
                                
                                <div className="form-group">
                                    <label className="col-sm-5 control-label">Personal Selling</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" placeholder="-" disabled value={ov_personal_selling2} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-5 control-label">Group Selling</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" placeholder="-" disabled value={ov_group_selling2} />
                                    </div>
                                </div>
                            </form>
                        </div>

                        <div className="col-sm-4">
                            <form className="form-horizontal">
                                <span>Overriding Year - 3 <br/></span>
                                
                                <div className="form-group">
                                    <label className="col-sm-5 control-label">Personal Selling</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" placeholder="-" disabled value={ov_personal_selling3} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-5 control-label">Group Selling</label>
                                    <div className="col-sm-7">
                                        <input type="text" className="form-control" placeholder="-" disabled value={ov_group_selling3} />
                                    </div>
                                </div>
                            </form>
                        </div>
                    </div>
                    
                    <br/>
                    <div className="row">
                        <div className="col-sm-12">
                            <span>Overriding</span>
                            <input type="text" className="form-control" value={overriding} disabled/>
                        </div>
                    </div>
                </div>
			</div>
		</div>
		);
	}
}

export default Overriding;