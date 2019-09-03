'use strict'

import api_route from '../../common_components/api_route';

//import TableSorter from 'react-table-sorter';

import {Table, Column, Cell} from 'fixed-data-table';

import Pager from 'react-pager';

{/** Configure Sorting Begin */}

var SortType = {
	ASC : 'ASC',
	DESC : 'DESC',
}

function reverseSortDirection(sortDir) {
  return sortDir === SortType.DESC ? SortType.ASC : SortType.DESC;
}

{/** Configure Sorting End */}

class ManagementApplicationModal extends React.Component {
	constructor(props){
		super(props);
		this._defaultSortIndexes = [];
		this._onFilterChange = this._onFilterChange.bind(this);
		this._onSortChange = this._onSortChange.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		this._dataList = {};
		this.itemSorting = this.itemSorting.bind(this);
        this.sortIcon = this.sortIcon.bind(this);
		
		this.state = {
			data : [],
			filteredData : [],
			colSortDirs : {},
			// sortedDataList : new DataListWrapper(this._defaultSortIndexes, []),

			total : 20,
			current : 1,
			visiblePages : 3
			
		}

		/*
		var size = this.state.data.length;
		for (var index = 0; index < size; index++) {
			this._defaultSortIndexes.push(index);
		}*/

	}

	componentWillReceiveProps(p) {

		var size = p.data && p.data.length || 0;

		$('.filter-input').each(function(e, t){ $(t).val(''); });

		this.setState({
	        data: p.data,
			filteredData : p.data
	    });
		
	}

	
	_onFilterChange(cellDataKey, event){
		if(!event.target.value){
			this.setState({
				filteredData: this.state.data,
				sortedDataList: new DataListWrapper(this._defaultSortIndexes, this.state.data)
			});
		}
		var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
		var size = this.state.data.length;
		var filteredList = [];
		for (var index = 0; index < size; index++){
			var v = this.state.data[index][cellDataKey];
			v = v != null ? v : '';
			if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
				filteredList.push(this.state.data[index]);
			}
		}

		/*
		var sortIndexes = [];
		var size = filteredList.length;
		for (var index = 0; index < size; index++) {
			sortIndexes.push(index);
		}*/

		this.setState({
			filteredData : filteredList
		});
	}

	sortIcon(column){
       
        if(column == this.state.activeSorting){
          if(this.state.colSortDirs[column] == SortType.ASC){
            return (
              '↓'
            );
          }else{
            return(
              '↑' 
            );
          }
        }else{
          return(
              <i></i>
          );
        }
      }

	itemSorting(cellDataKey) {

		this._onSortChange( cellDataKey, this.state.colSortDirs[cellDataKey] ? reverseSortDirection(this.state.colSortDirs[cellDataKey]) : SortType.DESC );

	}

	  

	/*
	_onSortChange(columnKey, sortDir) {
		var sortIndexes = this._defaultSortIndexes.slice();
		
		sortIndexes.sort((indexA, indexB) => {
		var valueA = this._dataList.getObjectAt(indexA)[columnKey];
		var valueB = this._dataList.getObjectAt(indexA)[columnKey];
		var sortVal = 0;
		if (valueA > valueB) {
			sortVal = 1;
		}
		if (valueA < valueB) {
			sortVal = -1;
		}
		if (sortVal !== 0 && sortDir === SortTypes.ASC) {
			sortVal = sortVal * -1;
		}

		return sortVal;
		});
		this.setState({
		//sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
			sortedDataList: new DataListWrapper(sortIndexes, this._dataList),
			colSortDirs: {
				[columnKey]: sortDir,
			},
		});
	}*/

	_onSortChange(columnKey, sortDir) {
		// di OnSortChange
		// // debugger;
		var sorted = this.state.filteredData;
		
		sorted.sort((indexA, indexB) => {
		var valueA = indexA[columnKey];
		var valueB = indexB[columnKey];
		var sortVal = 0;
		if (valueA > valueB) {
			sortVal = 1;
		}
		if (valueA < valueB) {
			sortVal = -1;
		}
		if (sortVal !== 0 && sortDir === SortType.ASC) {
			sortVal = sortVal * -1;
		}

		return sortVal;
		});
		this.setState({
			activeSorting : columnKey,
			filteredData: sorted,
			colSortDirs: {
				[columnKey]: sortDir,
			},
		});
	}

	handlePageChanged(){

	}

	render(){
		
		let tableHead = this.props.statusSPAJ == 'pending' ?
							<tr>
								<th>NO</th>
								<th>SUBMIT DATE</th>
								<th>NO SPAJ</th>
								<th>NO POLICY</th>
								<th>POLICY HOLDER</th>
								<th>STATUS</th>
								<th>STATUS DATE</th>
								<th>AGENT NAME</th>
								<th>AGENT CODE</th>
								<th>ALASAN</th>
							</tr>
							:
							<tr>
								<th>NO</th>
								<th>SUBMIT DATE</th>
								<th>NO SPAJ</th>
								<th>NO POLICY</th>
								<th>POLICY HOLDER</th>
								<th>STATUS</th>
								<th>STATUS DATE</th>
								<th>AGENT NAME</th>
								<th>AGENT CODE</th>
							</tr> ;
		let tableBody = [];
		let dataUsed = [];
		let mobileVersion = [];
		
		
		/* Disabled Temporarily
		this.state.sortedDataList._data.map(function(item) {
			let status_hover = "";
			let spaj_status = item.spaj_status != null ? item.spaj_status : '-';

			if(spaj_status.match(/Inforce/i)){ status_hover = "Polis aktif"; }
			if(spaj_status.match(/Waiting for underwriting/i)){ status_hover = "SPAJ dalam antrian underwriting"; }
			if(spaj_status.match(/Follow Up/i)){ status_hover = "Membutuhkan dokumen tambahan"; }
			if(spaj_status.match(/Follow-up and its reason/i)){ status_hover = "Membutuhkan dokumen tambahan"; }
			if(spaj_status.match(/Follow-up, its reason and received date/i)){ status_hover = "Membutuhkan dokumen tambahan"; }
			if(spaj_status.match(/Underwriting approved/i)){ status_hover = "SPAJ sudah disetujui oleh Underwriting"; }
			if(spaj_status.match(/Declined/i)){ status_hover = "SPAJ ditolak"; }
			if(spaj_status.match(/Withdrawn/i)){ status_hover = "SPAJ dibatalkan oleh Nasabah"; }
			if(spaj_status.match(/Postponed/i)){ status_hover = "SPAJ ditunda"; }
			if(spaj_status.match(/Not Taken Up/i)){ status_hover = "SPAJ kadaluarsa"; }
			if(spaj_status.match(/Received/i)){ status_hover = "Polis aktif dan sudah diterima Nasabah"; }

			let notes = item.spaj_notes != null ? item.spaj_notes : '-';
			let notes_br = notes.replace(/\[NB\]/g,"<br>*[NB]");
			let clean_notes = notes_br.split("<br>").map(function(item) {
			  return (
			    <span>
				    {item}
				    <br/>
			    </span>
			  )
			});
          	let row = this.props.statusSPAJ == 'pending' ?
            <tr>
              <td>{item.no != null ? item.no : '-'}</td>
              <td>{item.spaj_submit_date != null ? item.spaj_submit_date : '-'}</td>
              <td>{item.spaj_number != null ? item.spaj_number : '-'}</td>
              <td>{item.spaj_policy_no != null ? item.spaj_policy_no : '-'}</td>
              <td>{item.spaj_holder != null ? item.spaj_holder : '-'}</td>
              <td><span title={status_hover}>{item.spaj_status != null ? item.spaj_status : '-'}</span></td>
              <td>{item.spaj_status_date != null ? item.spaj_status_date : '-'}</td>
              <td>{item.spaj_agent_name != null ? item.spaj_agent_name : '-'}</td>
              <td>{item.spaj_agent_code != null ? item.spaj_agent_code : '-'}</td>
              <td>{clean_notes}</td>
            </tr>
            :
            <tr>
              <td>{item.no != null ? item.no : '-'}</td>
              <td>{item.spaj_submit_date != null ? item.spaj_submit_date : '-'}</td>
              <td>{item.spaj_number != null ? item.spaj_number : '-'}</td>
              <td>{item.spaj_policy_no != null ? item.spaj_policy_no : '-'}</td>
              <td>{item.spaj_holder != null ? item.spaj_holder : '-'}</td>
              <td><span title={status_hover}>{item.spaj_status != null ? item.spaj_status : '-'}</span></td>
              <td>{item.spaj_status_date != null ? item.spaj_status_date : '-'}</td>
              <td>{item.spaj_agent_name != null ? item.spaj_agent_name : '-'}</td>
              <td>{item.spaj_agent_code != null ? item.spaj_agent_code : '-'}</td>
            </tr> ;

            tableBody.push(row);
			dataUsed.push({
				no : item.no != null ? item.no : '-',
				spaj_submit_date : item.spaj_submit_date != null ? item.spaj_submit_date : '-',
				spaj_number : item.spaj_number != null ? item.spaj_number : '-',
				spaj_policy_no : item.spaj_policy_no != null ? item.spaj_policy_no : '-',
				spaj_holder : item.spaj_holder != null ? item.spaj_holder : '-',
				spaj_status : item.spaj_status != null ? item.spaj_status : '-',
				spaj_status_date : item.spaj_status_date != null ? item.spaj_status_date : '-',
				spaj_agent_name : item.spaj_agent_name != null ? item.spaj_agent_name : '-',
				spaj_agent_code : item.spaj_agent_code != null ? item.spaj_agent_code : '-',
			});

        }.bind(this));
		*/

		/** Modif Starts Here */
		
		if(this.state.filteredData != undefined && this.state.filteredData.length > 0){
			this.state.filteredData.map(function(item) {

						dataUsed.push({
							no : item.no != null ? item.no : '-',
							spaj_submit_date : item.spaj_submit_date != null ? item.spaj_submit_date : '-',
							spaj_number : item.spaj_number != null ? item.spaj_number : '-',
							spaj_policy_no : item.spaj_policy_no != null ? item.spaj_policy_no : '-',
							spaj_holder : item.spaj_holder != null ? item.spaj_holder : '-',
							spaj_status : item.spaj_status != null ? item.spaj_status : '-',
							spaj_status_date : item.spaj_status_date != null ? item.spaj_status_date : '-',
							spaj_agent_name : item.spaj_agent_name != null ? item.spaj_agent_name : '-',
							spaj_agent_code : item.spaj_agent_code != null ? item.spaj_agent_code : '-',
							spaj_notes : item.spaj_notes != null ? item.spaj_notes : '-'
						});

						mobileVersion.push(
							<div className="row row-table">
								<div className="col-sm-12">
									<div className="row ">
										<div className="col-xs-5">
											<div className="col-title">No</div>
										</div>
										<div className="col-xs-7">
											<div className="col-content">{item.no != null ? item.no : '-'}</div>
										</div>
									</div>						
									<div className="row ">
										<div className="col-xs-5">
											<div className="col-title">No SPAJ</div>
										</div>
										<div className="col-xs-7">
											<div className="col-content">{item.spaj_number != null ? item.spaj_number : '-'}</div>
										</div>
									</div>
									<div className="row ">
										<div className="col-xs-5">
											<div className="col-title">No Policy</div>
										</div>
										<div className="col-xs-7">
											<div className="col-content">{item.spaj_policy_no != null ? item.spaj_policy_no : '-'}</div>
										</div>
									</div>
									<div className="row ">
										<div className="col-xs-5">
											<div className="col-title">Policy Holder</div>
										</div>
										<div className="col-xs-7">
											<div className="col-content">{item.spaj_holder != null ? item.spaj_holder : '-'}</div>
										</div>
									</div>
									
									<div className="row">
										<div className="col-sm-12">
											<div class="panel panel-default">
												<div id={"collapse" + item.no} className="dialog-collapse collapse" role="tabpanel" aria-labelledby={"heading" + item.no}>
													<div class="panel-body">
														<div className="row ">
															<div className="col-xs-5">
																<div className="col-title">Submit Date</div>
															</div>
															<div className="col-xs-7">
																<div className="col-content">{item.spaj_submit_date != null ? item.spaj_submit_date : '-'}</div>
															</div>
														</div>
														<div className="row ">
															<div className="col-xs-5">
																<div className="col-title">Status</div>
															</div>
															<div className="col-xs-7">
																<div className="col-content">{item.spaj_status != null ? item.spaj_status : '-'}</div>
															</div>
														</div>
														<div className="row ">
															<div className="col-xs-5">
																<div className="col-title">Status Date</div>
															</div>
															<div className="col-xs-7">
																<div className="col-content">{item.spaj_policy_no != null ? item.spaj_policy_no : '-'}</div>
															</div>
														</div>
														<div className="row ">
															<div className="col-xs-5">
																<div className="col-title">Agent Name</div>
															</div>
															<div className="col-xs-7">
																<div className="col-content">{item.spaj_agent_name != null ? item.spaj_agent_name : '-'}</div>
															</div>
														</div>
														<div className="row ">
															<div className="col-xs-5">
																<div className="col-title">Agent Code</div>
															</div>
															<div className="col-xs-7">
																<div className="col-content">{item.spaj_agent_code != null ? item.spaj_agent_code : '-'}</div>
															</div>
														</div>
														<div className="row ">
															<div className="col-xs-5">
																<div className="col-title">Reason</div>
															</div>
															<div className="col-xs-7">
																<div className="col-content">{item.spaj_notes != null ? item.spaj_notes : '-'}</div>
															</div>
														</div>
													</div>
												</div>
												<div class="panel-heading" role="tab" id="headingOne">
													<div className="more-detail">
														<a className="btn btn-block btn-default" role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse" + item.no} aria-expanded="false" aria-controls={"collapse" + item.no}>
															Detail
														</a>
													</div>
												</div>
											</div>
										</div>
									</div>
								</div>
							</div>
						);

			}.bind(this));
		}

		{/*
		
		var sdl = this.state.sortedDataList;
		if(sdl._data.length > 1){
			for(var x = 0; x < sdl.getSize(); x++)
			{
				
				dataUsed.push({
					no : sdl.getObjectAt(x)["no"] != null ? sdl.getObjectAt(x)["no"] : '-',
					spaj_submit_date : sdl.getObjectAt(x)["spaj_submit_date"] != null ? sdl.getObjectAt(x)["spaj_submit_date"] : '-',
					spaj_number : sdl.getObjectAt(x)["spaj_number"] != null ? sdl.getObjectAt(x)["spaj_number"] : '-',
					spaj_policy_no : sdl.getObjectAt(x)["spaj_policy_no"] != null ? sdl.getObjectAt(x)["spaj_policy_no"] : '-',
					spaj_holder : sdl.getObjectAt(x)["spaj_holder"] != null ? sdl.getObjectAt(x)["spaj_holder"] : '-',
					spaj_status : sdl.getObjectAt(x)["spaj_status"] != null ? sdl.getObjectAt(x)["spaj_status"] : '-',
					spaj_status_date : sdl.getObjectAt(x)["spaj_status_date"] != null ? sdl.getObjectAt(x)["spaj_status_date"] : '-',
					spaj_agent_name : sdl.getObjectAt(x)["spaj_agent_name"] != null ? sdl.getObjectAt(x)["spaj_agent_name"] : '-',
					spaj_agent_code : sdl.getObjectAt(x)["spaj_agent_code"] != null ? sdl.getObjectAt(x)["spaj_agent_code"] : '-',
				});
			}
		}*/}

		/** Modif End Here */

		/*
		var config = {
			sort : {
				column : "no", order : "asc"
			},
			columns : {
				no : { name : "No", filterText : "", defaultSortOrder : "desc" },
				spaj_submit_date : { name : "Submit Date", filterText : "", defaultSortOrder : "desc" },
				spaj_number : { name : "Np SPAJ", filterText : "", defaultSortOrder : "desc" },
				spaj_policy_no : { name : "No Policy", filterText : "", defaultSortOrder : "desc" },
				spaj_holder : { name : "Policy Holder", filterText : "", defaultSortOrder : "desc" },
				spaj_status : { name : "Status", filterText : "", defaultSortOrder : "desc" },
				spaj_status_date : { name : "Status Date", filterText : "", defaultSortOrder : "desc" },
				spaj_agent_name : { name : "Agent Name", filterText : "", defaultSortOrder : "desc" },
				spaj_agent_code : { name : "Agent Code", filterText : "", defaultSortOrder : "desc" }
			}
		};
		*/

		return (
        <div className="modal fade newbusinessSummary" id="management_application_modal" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog newbusiness_management">
				<div className="modal-content">
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 className="modal-title">New Business Tracking Summary</h4>
					</div>
					<div className="hidden-md hidden-lg">
						<div className="row row-table-header">
							<div className="col-sm-12">Filter By :</div>
							<div className="col-sm-12">
								<select className="form-control" onChange={this._changeFilterOption}>
									<option value="">-- SELECT --</option>
									<option value="spaj_number">No SPAJ</option>
									<option value="spaj_policy_no">No Policy</option>
									<option value="spaj_holder">SPAJ Holder</option>
									<option value="spaj_status">SPAJ Status</option>
									<option value="spaj_status_date">SPAJ Status Date</option>
									<option value="spaj_agent_name">SPAJ Agent Name</option>
									<option value="spaj_agent_code">SPAJ Agent Code</option>
								</select>
							</div>
							<div className="col-sm-12">
								<input type="text" className="form-control m-filter" onChange={this._onMobileFilter} placeholder="search .." />
							</div>
						</div>
						<div className="table-responsive-mobile ">
							{mobileVersion}
						</div>
					</div>

					<div className="table-responsive hidden-sm hidden-xs">
						<table className="table table-striped table-box ">  
                      <thead className="noselect">
                        {/* no, spaj_submit_date, spaj_number, spaj_policy_no, spaj_holder, spaj_status, spaj_status_date, spaj_agent_name, spaj_agent_code */}
						<tr key="columnname">
                          <th className="header_table" style={{width : '50px'}}><a onClick={this.itemSorting.bind(this, "no")}>No</a>  {this.sortIcon("no")}</th>
                          <th className="header_table" style={{width : '200px'}}><a onClick={this.itemSorting.bind(this, "spaj_submit_date")}>SPAJ Submit Date</a> {this.sortIcon("spaj_submit_date")}</th>
                          <th className="header_table" style={{width : '200px'}}><a onClick={this.itemSorting.bind(this, "spaj_number")}>SPAJ Number</a> {this.sortIcon("spaj_number")}</th>
                          <th className="header_table" style={{width : '200px'}}><a onClick={this.itemSorting.bind(this, "spaj_policy_no")}>Policy Number</a> {this.sortIcon("spaj_policy_no")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "spaj_holder")}>SPAJ Holder</a> {this.sortIcon("spaj_holder")}</th>
                          <th className="header_table" style={{width : '200px'}}><a onClick={this.itemSorting.bind(this, "spaj_status")}>SPAJ Status</a> {this.sortIcon("spaj_status")}</th>
                          <th className="header_table" style={{width : '200px'}}><a onClick={this.itemSorting.bind(this, "spaj_status_date")}>SPAJ Status Date</a> {this.sortIcon("spaj_status_date")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "spaj_agent_name")}>SPAJ Agent Name</a> {this.sortIcon("spaj_agent_name")}</th>
                          <th className="header_table" style={{width : '200px'}}><a onClick={this.itemSorting.bind(this, "spaj_agent_code")}>SPAJ Agent Code</a> {this.sortIcon("spaj_agent_code")}</th>
						  <th className="header_table" style={{width : '300px', 'font-weight':'bold', 'text-align':'text-left'}}>Reason</th>
                        </tr>
                        <tr key="columnfilter">
                          <th className="header_table"></th>
                          <th className="header_table"><input type="text" name="spaj_submit_date" onChange={this._onFilterChange.bind(this, "spaj_submit_date")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="spaj_number" onChange={this._onFilterChange.bind(this, "spaj_number")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="spaj_policy_no" onChange={this._onFilterChange.bind(this, "spaj_policy_no")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="spaj_holder" onChange={this._onFilterChange.bind(this, "spaj_holder")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="spaj_status" onChange={this._onFilterChange.bind(this, "spaj_status")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="spaj_status_date" onChange={this._onFilterChange.bind(this, "spaj_status_date")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="spaj_agent_name" onChange={this._onFilterChange.bind(this, "spaj_agent_name")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="spaj_agent_code" onChange={this._onFilterChange.bind(this, "spaj_agent_code")} className="form-control" /></th>
						  <th className="header_table"></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          dataUsed.map(function(item, x) {
                            return (
                                <tr key={item.no}>
								  <td className="column_table">{item.no}</td>
                                  <td className="text-left column_table">{item.spaj_submit_date}</td>
                                  <td className="column_table">{item.spaj_number}</td>
                                  <td className="column_table">{item.spaj_policy_no}</td>
                                  <td className="text-left column_table">{item.spaj_holder}</td>
                                  <td className="text-left column_table">{item.spaj_status}</td>
                                  <td className="text-left column_table">{item.spaj_status_date}</td>
                                  <td className="text-left column_table">{item.spaj_agent_name}</td>
                                  <td className="text-left column_table">{item.spaj_agent_code}</td>
								  <td className="column_table" style={{'text-align':'left !important'}}>{item.spaj_notes}</td>
                                </tr>
                              );
                          })
                        }
                      </tbody>
                    </table>

						{/*}
						<TableSorter data={dataUsed} config={config} headerRepeat="0" />
						
						<table className="table table-bordered table-hover">
							{tableHead}
							<tbody>
							{tableBody}
							</tbody>
						</table>
						*/}

						{/* Fixed Data Table Configuration Start */}

						{/*	
						<Table
						height={60+((dataUsed.length+1) * 30)}
						width={1100}
						rowsCount={dataUsed.length}
						rowHeight={30}
						headerHeight={80}>
							<Column 
								header={<SortFilterHeaderCell onFilterChange={this._onFilterChange}
									cellDataKey="no"
									filter={false}>No
									</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].no}
									</Cell>
								)}
								width={50}
							/>
							<Column 
								header={<SortFilterHeaderCell onFilterChange={this._onFilterChange}
									cellDataKey="spaj_submit_date"
									filter={true}>Submit Date
									</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_submit_date}
									</Cell>
								)}
								width={100}
							/>
							<Column 
								header={<SortFilterHeaderCell  
									onSortChange={this._onSortChange}
              						sortDir={this.state.colSortDirs.spaj_number}
									cellDataKey="spaj_number" 
									onFilterChange={this._onFilterChange} 
									filter={true}>No SPAJ</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_number}
									</Cell>
								)}
								width={150}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="spaj_policy_no" 
									onSortChange={this._onSortChange}
									sortDir={this.state.colSortDirs.spaj_policy_no}
									onFilterChange={this._onFilterChange} 
									filter={true}>No Policy</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_policy_no}
									</Cell>
								)}
								width={100}
							/>
							<Column 
								header={<SortFilterHeaderCell cellDataKey="spaj_holder" onSortChange={this._onSortChange} sortDir={this.state.colSortDirs.spaj_holder} onFilterChange={this._onFilterChange} width={150} filter={true}>Policy Holder</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_holder}
									</Cell>
								)}
								flexGrow={1}
								width={150}
							/>
							<Column 
								header={<SortFilterHeaderCell cellDataKey="spaj_status" onSortChange={this._onSortChange} sortDir={this.state.colSortDirs.spaj_status} onFilterChange={this._onFilterChange} width={100} filter={true}>Status</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_status}
									</Cell>
								)}
								width={100}
							/>
							<Column 
								header={<SortFilterHeaderCell cellDataKey="spaj_status_date" onSortChange={this._onSortChange} sortDir={this.state.colSortDirs.spaj_status_date} onFilterChange={this._onFilterChange} width={100} filter={true}>Status Date</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_status_date}
									</Cell>
								)}
								width={100}
							/>
							<Column 
								header={<SortFilterHeaderCell cellDataKey="spaj_agent_name" onSortChange={this._onSortChange} sortDir={this.state.colSortDirs.spaj_agent_name} onFilterChange={this._onFilterChange} width={200} filter={true}>Agent Name</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_agent_name}
									</Cell>
								)}
								width={200}
							/>
							<Column 
								header={<SortFilterHeaderCell cellDataKey="spaj_agent_code" onSortChange={this._onSortChange} sortDir={this.state.colSortDirs.spaj_agent_code} onFilterChange={this._onFilterChange} width={100} filter={true}>Agent Code</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_agent_code}
									</Cell>
								)}
								width={100}
							/>
						</Table>
						*/}

						{/* Fixed Data Table Configuration End */}

					</div>
				</div>
			  </div>
			</div>
		);
	}
}


class SortFilterHeaderCell extends React.Component {
  constructor(props) {
    super(props);
	this._onSortChange = this._onSortChange.bind(this);
  }

  render() {
    //var {sortDir, children, ...props} = this.props;
	var classHide = "form-control input-sm " + ((this.props.filter == true) ? '' : 'hidden');
	var cellDataKey = this.props.cellDataKey;
    var {sortDir, ...props} = this.props;
	return (
      <Cell width={this.props.width}>
        <a onClick={this._onSortChange}>{this.props.children} {sortDir ? (sortDir === SortTypes.DESC ? '' : '') : ''}</a>
		<div className="table-header-filter row">
			<div className="col-sm-12">
				<input onChange={this.props.onFilterChange.bind(this, cellDataKey)} className={classHide} style={{width:100+'%'}}/>
			</div>
		</div>
      </Cell>
    );
  }

  _onSortChange(e) {
    e.preventDefault();
	
    if (this.props.onSortChange) {
      this.props.onSortChange(
        this.props.cellDataKey,
        this.props.sortDir ?
          reverseSortDirection(this.props.sortDir) :
          SortTypes.DESC
      );
    }
  }
}

class DataListWrapper {
  constructor(indexMap, data) {
    this._indexMap = indexMap;
    this._data = data;
  }

  getSize() {
    return this._indexMap.length;
  }

  getObjectAt(index) {
    return this._data[this._indexMap[index]];
  }

  getList(){
	  return this._data || this._indexMap;
  }
}

export default ManagementApplicationModal;
