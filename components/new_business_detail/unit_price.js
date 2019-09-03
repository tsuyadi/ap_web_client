'use strict'

import api_route from '../../common_components/api_route';
import React from 'react';
import TopMenuNewBusinessDetail from '../../common_components/menu_v2/top_menu_new_business_detail';
import LeftMenuInquiry from '../../common_components/menu_v2/left_menu_inquiry';
import Footer from '../../common_components/footer';
import {DateFormat, MoneyFormatUnit, DateddMMMYYYY, DateFormatMMM} from '../../common_components/helper/formatter';
import Loading from '../../common_components/loading';
import SubmitModal from '../../common_components/modal/submit_modal';
import {DatePicker} from '../../common_components/date_picker';
import {MIME_TYPE} from '../../common_components/helper/constant';
import FeatureModal from '../../common_components/modal/feature_modal';
import Pager from 'react-pager';

var FileSaver = require('file-saver');

class unit_price extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data: null,
			date_val : ''
		}
        this.openMenu = this.openMenu.bind(this);
	}

	componentDidMount(){
		this.getData();
	}

	getData(){
		var price_date = $('[name=price_date]').val();
		$.ajax({
            url: api_route.unit_price,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'POST',
			data : {'price_date' : price_date},
            success: (response) => {
				this.setState({
					data:response,
					date_val : price_date
				});
            },
            error: (err, response) => {
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });
	}
    openMenu(){
        $(".sidebar,.sidebar2").toggleClass("active");
    }

	render(){
		let data = this.state.data && this.state.data;
		let unitprice = [];
		let date_val = this.state.data && this.state.data.price_date;
		// if(this.state.date_val != '' || this.state.date_val != null){
		// 	date_val = DateddMMMYYYY(this.state.date_val);
		// }
		if(data && data.unit_link_price.length > 0)
		{
			let row = null;
			$.map(data.unit_link_price, (value, index) => {
					row = <tr key={index}>
							<td>{value.fund_desc}</td>
							<td>{value.currency}</td>	
							<td style={{textAlign:'right'}}>{MoneyFormatUnit(value.unit_price)}</td>					
						</tr>
					unitprice.push(row);
	        });
		}
		else {
			let row = <tr>
						<td colSpan="3" style={{'textAlign':'center'}}>No data.</td>
					</tr>
            unitprice.push(row);
		}
		return (
		<div className="wrap2">
			<SubmitModal />
    		<TopMenuNewBusinessDetail title="Unit Price"  opsi="inquiry" id=""/>

			<div className="main-wrapper">
                <ol className="breadcrumb" style={{marginBottom: '5px'}}>
                    <li className="active">Unit Price</li>
                </ol>
				<div className="main twoColumnMain">
					<LeftMenuInquiry active="4"/>
					<div className="main-content">
						<div className="row">
							<div className="col-sm-12">
                            <h1>Unit Price</h1>
                            <br/>
								<div className="col-sm-6">
									<div className="form-horizontal">
										<div className="form-group">
											<div className="col-sm-4">
												<h4>Unit Price Date</h4>
											</div>

											<div className="col-sm-5">
                                                <DatePicker className="form-control" id="price_date" name="price_date" />
                                            </div>

                                            <div className="col-sm-3">
                                                <button className="btn btn-primary btn-block" type="button" onClick={() => this.getData()} style={{width:'200px'}}><i className="fa fa-search"></i> Search</button>
                                            </div>
										</div>
                                    </div>
								</div>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-12">
								<h4 style={{marginLeft :'15px'}}>Unit Price as per : <b>  {DateFormatMMM(date_val)} </b></h4>
							</div>
						</div>
						<div className="row">
							<div className="col-sm-1"/>
							<div className="col-sm-10">
								<div>
									<nav aria-label="Page navigation">
										<ul className="pagination">
											{/*{paging}*/}
										</ul>
									</nav>
								</div>
								<div className="scroll-h" style={{'overflow-x':'auto'}}>
									
									<table className="table table-bordered table-striped table-hover text-center table-box fix-table">
										<thead>
											
											<tr>
												<th style={{'width':'50%'}} className="header_table valign-middle text-center">Fund Name</th>
												<th style={{'width':'20%'}} className="header_table valign-middle text-center">Currency</th>
												<th style={{'width':'30%'}} className="header_table valign-middle text-center">Unit Price</th>
											</tr>
										</thead>
										<tbody>
											{unitprice}
										</tbody>
									</table>
									
								</div>
								<div>
									<nav aria-label="Page navigation">
										<ul className="pagination">
											{/*{paging}*/}
										</ul>
									</nav>
								</div>
							</div>
							<div className="col-sm-1"/>
						</div>

						<div className="clearfix"></div>

					</div>

					<div className="clearfix"></div>
				</div>
			</div>
			<FeatureModal/>
			<Loading />
			<Footer />

		</div>
		);
	}
}

export default unit_price;
