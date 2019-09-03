'use strict'

import React from 'react';

import {UserLevelMap} from '../../common_components/helper/formatter';

class AgentProfile extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			data : null
		}
	}

	
	// receiving an updates
	componentWillReceiveProps = (props) => {
		// debugger;
		this.setState({
	        data: props.data
	    });
	}

	componentDidMount = () => {

        
    }

	render()
	{

		if(this.state.data == undefined && this.state.data == null){
			if(this.props.data != undefined && this.props.data != null){
				this.state.data = this.props.data;
			}
		}

		let aaji_license_date = this.state.data ? this.state.data.agent_data.aaji_license_date : null;
		if(aaji_license_date != null)
		{
			aaji_license_date = new Date(aaji_license_date);
			aaji_license_date.setFullYear(aaji_license_date.getFullYear());	

			let dd = aaji_license_date.getDate();
			let mm = aaji_license_date.getMonth()+1; //January is 0!

			let yyyy = aaji_license_date.getFullYear();
			if(dd<10){dd='0'+dd} 
			if(mm<10){mm='0'+mm} 
			/* aaji_license_date = yyyy+'-'+mm+'-'+dd;*/
			aaji_license_date = dd+'-'+mm+'-'+yyyy;
		}

		let aaji_expired_date = this.state.data ? this.state.data.agent_data.aaji_expired_date : null;
		let msg_exp=[];
		if(aaji_expired_date != null)
		{
			var cur_time = new Date();
			var hari = 24*60*60*1000;
			var aaji_expired_date2 = new Date(aaji_expired_date);
			aaji_expired_date = new Date(aaji_expired_date);
			aaji_expired_date.setFullYear(aaji_expired_date.getFullYear());	

			let dd = aaji_expired_date.getDate();
			let mm = aaji_expired_date.getMonth()+1; //January is 0!

			let yyyy = aaji_expired_date.getFullYear();
			if(dd<10){dd='0'+dd} 
			if(mm<10){mm='0'+mm} 
			/* aaji_license_date = yyyy+'-'+mm+'-'+dd;*/
			aaji_expired_date = dd+'-'+mm+'-'+yyyy;

			var total_hari = Math.round(Math.round((aaji_expired_date2.getTime() - cur_time.getTime()) / hari))/30;
			if(total_hari >0 && total_hari <= 3){
				msg_exp.push(
					<p style={{color:'red', margin: '5px', fontSize : '14px'}}>Lisensi AAJI anda akan kadualuarsa pada tanggal <b className="animatednotice infinite flash" style={{fontSize : '14px'}}>{aaji_expired_date}</b>, segera proses perpanjangan.
					</p>
				)
			}else if(total_hari <= 0){
				msg_exp.push(
					<p style={{color:'red', margin: '5px', fontSize : '14px'}}>Saat ini lisensi AAJI <b className="animatednotice infinite flash" style={{fontSize : '14px'}}>Sudah Kadualuarsa</b>, anda tidak dapat melakukan penjualan. Segera perpanjang lisensi anda.
					</p>
				)
			}
		}

		let contract_date = this.state.data ? this.state.data.agent_data.contract_date : null;
		let msg_contract= [];
		if(contract_date != null)
		{
			contract_date = new Date(contract_date);
			contract_date.setFullYear(contract_date.getFullYear());	

			let dd = contract_date.getDate();
			let mm = contract_date.getMonth()+1; //January is 0!

			let yyyy = contract_date.getFullYear();
			if(dd<10){dd='0'+dd} 
			if(mm<10){mm='0'+mm} 
			/* aaji_license_date = yyyy+'-'+mm+'-'+dd;*/
			contract_date = dd+'-'+mm+'-'+yyyy;
		}else{
			msg_contract.push(
				<p style={{color:'red', margin: '5px', fontSize : '14px'}}>Anda belum menandatangani <b className="animatednotice infinite flash" style={{fontSize : '14px'}}>Kontrak Keagenan</b>.</p>
			);
		}

		let fast_date = this.state.data ? this.state.data.agent_data.fast_date : null;
		let msg_fast= [];
		if(fast_date != null)
		{
			fast_date = new Date(fast_date);
			fast_date.setFullYear(fast_date.getFullYear());	

			let dd = fast_date.getDate();
			let mm = fast_date.getMonth()+1; //January is 0!

			let yyyy = fast_date.getFullYear();
			if(dd<10){dd='0'+dd} 
			if(mm<10){mm='0'+mm} 
			/* aaji_license_date = yyyy+'-'+mm+'-'+dd;*/
			fast_date = dd+'-'+mm+'-'+yyyy;
		}else{
			msg_fast.push(
				<p style={{color:'red', margin: '5px', fontSize : '14px'}}>Anda belum mengikuti <b className="animatednotice infinite flash" style={{fontSize : '14px'}}>Fast Start Training</b>, segera hubungi Tim Trainer.</p>
			);
		}
		// debugger;
		var link_more = [];

		if(this.props.disabled == "true"){
			link_more.push(
				<div className="more">				
				</div>
			);
		}else{
			link_more.push(
				<div className="more">
					<span><a href="#/profile" title="View More...">View More...</a></span>
				</div>
			);
		}

		return (
        <div className="content boxShadow">
			<div className="title textShadow"><i className="fa fa-user"></i> Agent Profile</div>
			<div className="entry">
				<form className="form-horizontal">
					<div className="form-group">
						<label className="col-sm-4 control-label">Agent Name</label>
						<div className="col-sm-8">
							<input type="text" className="form-control" placeholder="-" disabled value={this.state.data && this.state.data.name} />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label">Agent Code</label>
						<div className="col-sm-8">
							<input type="text" className="form-control" placeholder="-" disabled value={this.state.data && this.state.data.agent_data.code} />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label">Agent Level</label>
						<div className="col-sm-8">
							<input type="text" className="form-control" placeholder="-" disabled value={this.state.data && UserLevelMap(this.state.data.level)} />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label">AAJI License Date</label>
						<div className="col-sm-8">
							<input type="text" className="form-control" placeholder="-" disabled value={aaji_license_date} />
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label">AAJI Expired Date</label>
						<div className="col-sm-8">
							<input type="text" className="form-control" placeholder="-" disabled value={aaji_expired_date} />
							{msg_exp}
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label">Fast Start Date</label>
						<div className="col-sm-8">
							<input type="text" className="form-control" placeholder="-" disabled value={fast_date}/>
							{msg_fast}
						</div>
					</div>
					<div className="form-group">
						<label className="col-sm-4 control-label">Contract Date </label>
						<div className="col-sm-8">
							<input type="text" className="form-control" placeholder="-" disabled value={contract_date}/>
							{msg_contract}
						</div>
						
					</div>
				</form>
				
				{link_more}
				
			</div>
		</div>
		);
	}
}

export default AgentProfile;