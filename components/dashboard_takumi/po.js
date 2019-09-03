'use strict'

import api_route from '../../common_components/api_route';
//import NewBusinessModal from '../../common_components/modal/new_business_group';
import {MoneyFormat} from '../../common_components/helper/formatter';

class ParallelOverriding extends React.Component {
	constructor(props){
		super(props);

		this.state = {
			data : null,
		}
	}

	componentWillMount(){
		$.ajax({
            url: api_route.parallel_or,
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
					data:response.parallel_takumi,
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
		let data = this.state.data && this.state.data;
		let po = this.state.data && this.state.data[0] == null ? 0 : this.state.data && this.state.data[0].parallel_or;
		po= isNaN(po) || po == 0 ? 0 : MoneyFormat(po);
		let parallel_overriding = [];
		let po_fyc=[], po_syc=[], po_p1=[], po_p2=[];

		if(data && data.length > 0){
			$.map(data, (value, index) => {
				let gen = 'G'+ value.generation;
				let fyc = value.fyc == 0 ? 0 : MoneyFormat(value.fyc);
				let syc = value.syc == 0 ? 0 : MoneyFormat(value.syc);
				let p1 = value.p1 == '0%' ? '0%' : parseInt(value.p1) +"%";
				let p2 = value.p2 == '0%' ? '0%' : parseInt(value.p2) +"%";

				let row = null;
				row = <tr style={{border:'0px',width:'100%', height:'70px'}} key={index}>
							<td>{value.agent_full_name + ' - ' + gen}</td>
							<td style={{padding:'5px'}}><input type="text" className="form-control" value={fyc} disabled/></td>
							<td style={{padding:'5px'}}><input type="text" className="form-control" value={syc} disabled/></td>
							<td style={{padding:'5px'}}><input type="text" className="form-control" style={{width:'95%'}} value={p1} disabled/></td>
							<td style={{padding:'5px'}}><input type="text" className="form-control" style={{width:'95%'}} value={p2} disabled/></td>
						</tr>
							parallel_overriding.push(row);
				
				// let rowfyc = null;
				// rowfyc = <tr style={{border:'0px',width:'100%', height:'70px'}} key={index}>
				// 			<td>{value.agent_name + ' - ' + gen}</td>
				// 			<td style={{padding:'5px'}}><input type="text" className="form-control" value={fyc} disabled/></td>
				// 		</tr>
				// po_fyc.push(rowfyc);

				// let rowsyc = null;
				// rowsyc = <tr style={{border:'0px',width:'100%', height:'70px'}} key={index}>
				// 			<td>{value.agent_name + ' - ' + gen}</td>
				// 			<td style={{padding:'5px'}}><input type="text" className="form-control" value={syc} disabled/></td>
				// 		</tr>
				// po_syc.push(rowsyc);

				// let rowp1 = null;
				// rowp1 = <tr style={{border:'0px',width:'100%', height:'70px'}} key={index}>
				// 			<td>{value.agent_name + ' - ' + gen}</td>
				// 			<td style={{padding:'5px'}}><input type="text" className="form-control" value={p1} disabled/></td>
				// 		</tr>
				// po_p1.push(rowp1);

				// let rowp2 = null;
				// rowp2 = <tr style={{border:'0px',width:'100%', height:'70px'}} key={index}>
				// 			<td>{value.agent_name + ' - ' + gen}</td>
				// 			<td style={{padding:'5px'}}><input type="text" className="form-control" value={p2} disabled/></td>
				// 		</tr>
				// po_p2.push(rowp2);
			});
		}
		else {
			let row =<tr style={{border:'0px',height:'100px'}}>
						<td colSpan="5" style={{'text-align':'center'}}>No data.</td>
					</tr>
            parallel_overriding.push(row);
	}
		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-user"></i> Parallel Overriding</div>
                <div className="box-summary">
					<div className="row">
						<div className="col-md-12">
							<div className="entry">
								<div style={{'overflowX':'auto'}}>
									<div className="box-val" style={{height:'200px'}}>
										<table style={{border:'0px', textSize:'12px', height:'100%', width:'100%'}}>
											<thead style={{fontSize:'12pt'}}>
												<tr style={{border:'0px', width:'100%', height :'30px'}}>
													<th style={{"width":"20%",textAlign:'center'}}>&nbsp;</th>
													<th style={{"width":"25%",textAlign:'center'}}>FYC (MTD)</th>
													<th style={{"width":"25%",textAlign:'center'}}>SYC (MTD)</th>
													<th style={{"width":"15%",textAlign:'center'}}>P1 (MTD)</th>
													<th style={{"width":"15%",textAlign:'center'}}>P2 (MTD)</th>
												</tr>
											</thead>
											<tbody style={{fontSize:'12pt'}}>						
												{parallel_overriding}
											</tbody>
										</table>
									</div>
								</div>
									<br/>
									<span>Parallel Overriding</span>
									<input type="text" className="form-control" value={po} disabled/>
							</div>
						</div>
						{/* <div className="col-md-6  hidden-md hidden-lg">
							<div className="entry">
								<div className="tab-mobile hidden-md hidden-lg">
									<ul className="nav nav-tabs" role="tablist" style={{fontSize:'13pt'}}>
										<li role="presentation" className="active"><a href="#fyc" aria-controls="fyc" role="tab" data-toggle="tab">FYC (MTD)</a> </li>
										<li role="presentation"><a href="#syc" aria-controls="syc" role="tab" data-toggle="tab">SYC (MTD)</a> </li>
										<li role="presentation"><a href="#p1" aria-controls="p1" role="tab" data-toggle="tab">P1 (MTD)</a> </li>
										<li role="presentation"><a href="#p2" aria-controls="p2" role="tab" data-toggle="tab">P2 (MTD)</a> </li>
									</ul>
									<div className="tab-content">														
										<div role="tabpanel" className="tab-pane active" id="fyc">
										<div style={{'overflowX':'auto'}}>
											<div className="box-val" style={{height:'200px'}}>
											<table className="table cpadding" style={{fontSize:'12pt'}}>
												<tbody>												
													{po_fyc}
												</tbody>
											</table>
											</div>
										</div>
										</div>
										<div role="tabpanel" className="tab-pane" id="syc">
										<div style={{'overflowX':'auto'}}>
											<div className="box-val" style={{height:'200px'}}>
											<table className="table cpadding" style={{fontSize:'12pt'}}>
												<tbody>												
													{po_syc}
												</tbody>
											</table>
											</div>
										</div>
										</div>
										<div role="tabpanel" className="tab-pane" id="p1">
										<div style={{'overflowX':'auto'}}>
											<div className="box-val" style={{height:'200px'}}>
											<table className="table cpadding" style={{fontSize:'12pt'}}>
												<tbody>												
													{po_p1}
												</tbody>
											</table>
											</div>
										</div>
										</div>
										<div role="tabpanel" className="tab-pane" id="p2">
										<div style={{'overflowX':'auto'}}>
											<div className="box-val" style={{height:'200px'}}>
											<table className="table cpadding" style={{fontSize:'12pt'}}>
												<tbody>												
													{po_p2}
												</tbody>
											</table>
											</div>
										</div>
										</div>
									</div>	
								</div>
								<br/>
								<span>Parallel Overriding</span>
								<input type="text" className="form-control" value={po} disabled/>
							</div>
						</div>*/}
		</div>
					
				</div>
		</div>
		);
	}
}

export default ParallelOverriding;
