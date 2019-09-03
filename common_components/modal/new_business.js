'use strict'

import React from 'react';

import api_route from '../../common_components/api_route';

import {DateFormat, DateFormatEx} from '../../common_components/helper/formatter';

import {Table, Column, Cell} from 'fixed-data-table';

import Pager from 'react-pager';

{/** Configure Sorting Begin */}

var SortTypes = {
	ASC : 'ASC',
	DESC : 'DESC',
}

function reverseSortDirection(sortDir) {
  return sortDir === SortTypes.DESC ? SortTypes.ASC : SortTypes.DESC;
}

{/** Configure Sorting End */}

class NewBusinessModal extends React.Component {
	constructor(props){
		super(props);

		this._defaultSortIndexes = [];
		this._onFilterChange = this._onFilterChange.bind(this);
		this._onSortChange = this._onSortChange.bind(this);
		this.handlePageChanged = this.handlePageChanged.bind(this);
		this._dataList = {};
		this._onMobileFilter = this._onMobileFilter.bind(this);
		this._changeFilterOption = this._changeFilterOption.bind(this);
		
		this.state = {
			data : [{
					'no':'-',
					'spaj_number':'-',
					'spaj_submit_date':'-',
					'spaj_policy_no':'-',
					'spaj_holder':'-',
					'spaj_status':'-',
					'spaj_status_date':'-',
					'spaj_agent_name':'-',
					'spaj_agent_code':'-',
					'spaj_notes':'-'
				}],
			filteredData : [],
			colSortDirs : {},
			sortedDataList : new DataListWrapper(this._defaultSortIndexes, []),

			total : 20,
			current : 1,
			visiblePages : 3
		}

		var size = this.state.data.length;
		for (var index = 0; index < size; index++) {
			this._defaultSortIndexes.push(index);
		}

	}

	componentWillReceiveProps(p){

		this._dataList = new DataListWrapper(this._defaultSortIndexes, p.data);
		
		if(this._defaultSortIndexes.length > 0){
			this._defaultSortIndexes = [];
		}

		var size = p.data.length;
		for (var index = 0; index < size; index++) {
			this._defaultSortIndexes.push(index);
		}

		$('.filter-input').each(function(e, t){ $(t).val(''); });

		this.setState({
	        data: p.data,
			filteredData : p.data,
			sortedDataList : new DataListWrapper(this._defaultSortIndexes, p.data)
	    
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

		var sortIndexes = [];
		var size = filteredList.length;
		for (var index = 0; index < size; index++) {
			sortIndexes.push(index);
		}

		this.setState({
			sortedDataList: new DataListWrapper(sortIndexes, filteredList),
			filteredData : filteredList
		});
	}

	_onSortChange(columnKey, sortDir) {
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
		if (sortVal !== 0 && sortDir === SortTypes.ASC) {
			sortVal = sortVal * -1;
		}

		return sortVal;
		});
		this.setState({
			filteredData: sorted,
			colSortDirs: {
				[columnKey]: sortDir,
			},
		});
	}

	handlePageChanged(){

	}

	_changeFilterOption(e){
		$('.m-filter').val('');
		this.setState({
			filteredData: this.state.data,
			filterBy : e.target.value
		});
	}

	_onMobileFilter(e){
		if(!e.target.value){
			this.setState({
				filteredData: this.state.data,
				sortedDataList: new DataListWrapper(this._defaultSortIndexes, this.state.data)
			});
		}
		var cellDataKey = this.state.filterBy;
		var filterBy = e.target.value != null ? e.target.value.toString().toLowerCase() : '';
		var size = this.state.data.length;
		var filteredList = [];
		for (var index = 0; index < size; index++){
			var v = this.state.data[index][cellDataKey];
			v = v != null ? v : '';
			if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
				filteredList.push(this.state.data[index]);
			}
		}

		var sortIndexes = [];
		var size = filteredList.length;
		for (var index = 0; index < size; index++) {
			sortIndexes.push(index);
		}

		this.setState({
			sortedDataList: new DataListWrapper(sortIndexes, filteredList),
			filteredData : filteredList
		});
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

		{/*
		this.state.data.map(function(item) {
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

        }.bind(this));
		*/}

		/** Modif Starts Here */

		this.state.filteredData.map(function(item) {
			
			if(this.props.statusSPAJ == 'pending')
			{
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
				
				dataUsed.push({
					no : item.no != null ? item.no : '-',
					spaj_submit_date : item.spaj_submit_date != null ? DateFormatEx(item.spaj_submit_date) : '-',
					spaj_number : item.spaj_number != null ? item.spaj_number : '-',
					spaj_policy_no : item.spaj_policy_no != null ? item.spaj_policy_no : '-',
					spaj_holder : item.spaj_holder != null ? item.spaj_holder : '-',
					spaj_status : item.spaj_status != null ? item.spaj_status : '-',
					spaj_status_date : item.spaj_status_date != null ? DateFormatEx(item.spaj_status_date) : '-',
					spaj_agent_name : item.spaj_agent_name != null ? item.spaj_agent_name : '-',
					spaj_agent_code : item.spaj_agent_code != null ? item.spaj_agent_code : '-',
					spaj_notes : clean_notes
				});
			}
			else
			{
				dataUsed.push({
					no : item.no != null ? item.no : '-',
					spaj_submit_date : item.spaj_submit_date != null ? DateFormatEx(item.spaj_submit_date) : '-',
					spaj_number : item.spaj_number != null ? item.spaj_number : '-',
					spaj_policy_no : item.spaj_policy_no != null ? item.spaj_policy_no : '-',
					spaj_holder : item.spaj_holder != null ? item.spaj_holder : '-',
					spaj_status : item.spaj_status != null ? item.spaj_status : '-',
					spaj_status_date : item.spaj_status_date != null ? DateFormatEx(item.spaj_status_date) : '-',
					spaj_agent_name : item.spaj_agent_name != null ? item.spaj_agent_name : '-',
					spaj_agent_code : item.spaj_agent_code != null ? item.spaj_agent_code : '-',
				});

			}

			mobileVersion.push(
				<div className="row row-table">
					<div className="col-sm-12">
						<div className="row ">
							<div className="col-xs-3">
								<div className="col-title">No</div>
							</div>
							<div className="col-xs-9">
								<div className="col-content">{item.no != null ? item.no : '-'}</div>
							</div>
						</div>						
						<div className="row ">
							<div className="col-xs-3">
								<div className="col-title">No SPAJ</div>
							</div>
							<div className="col-xs-9">
								<div className="col-content">{item.spaj_number != null ? item.spaj_number : '-'}</div>
							</div>
						</div>
						<div className="row ">
							<div className="col-xs-3">
								<div className="col-title">No Policy</div>
							</div>
							<div className="col-xs-9">
								<div className="col-content">{item.spaj_policy_no != null ? item.spaj_policy_no : '-'}</div>
							</div>
						</div>
						<div className="row ">
							<div className="col-xs-3">
								<div className="col-title">Policy Holder</div>
							</div>
							<div className="col-xs-9">
								<div className="col-content">{item.spaj_holder != null ? item.spaj_holder : '-'}</div>
							</div>
						</div>
						
						<div className="row">
							<div className="col-sm-12">
								<div class="panel panel-default">
									<div id={"collapse" + item.no} className="dialog-collapse collapse" role="tabpanel" aria-labelledby={"heading" + item.no}>
										<div class="panel-body">
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">Submit Date</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.spaj_submit_date != null ? DateFormatEx(item.spaj_submit_date) : '-'}</div>
												</div>
											</div>
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">Status</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.spaj_status != null ? item.spaj_status : '-'}</div>
												</div>
											</div>
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">Status Date</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.spaj_status_date != null ? DateFormatEx(item.spaj_status_date) : '-'}</div>
												</div>
											</div>
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">Agent Name</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.spaj_agent_name != null ? item.spaj_agent_name : '-'}</div>
												</div>
											</div>
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">Agent Code</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.spaj_agent_code != null ? item.spaj_agent_code : '-'}</div>
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

		let twidth = this.props.statusSPAJ == 'pending' ? 1600 : 1200;

		return (
        <div className="modal fade newbusinessSummary" id="newbusiness" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog newbusiness">
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

						<Table
						height={80+((dataUsed.length+1) * 30)}
						width={twidth}
						rowsCount={dataUsed.length}
						rowHeight={30}
						headerHeight={80}>
							<Column 
								header={<SortFilterHeaderCell 
									onSortChange={this._onSortChange}
              						sortDir={this.state.colSortDirs.no}
									onFilterChange={this._onFilterChange}
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
								header={<SortFilterHeaderCell 
									onSortChange={this._onSortChange}
              						sortDir={this.state.colSortDirs.spaj_submit_date}
									onFilterChange={this._onFilterChange}
									cellDataKey="spaj_submit_date"
									filter={true}>Submit Date
									</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_submit_date}
									</Cell>
								)}
								width={120}
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
								header={<SortFilterHeaderCell 
									cellDataKey="spaj_holder" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.spaj_holder} 
									onFilterChange={this._onFilterChange} 
									width={150} 
									filter={true}>Policy Holder</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_holder}
									</Cell>
								)}
								flexGrow={1}
								width={150}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="spaj_status" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.spaj_status} 
									onFilterChange={this._onFilterChange} 
									width={100} 
									filter={true}>Status</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_status}
									</Cell>
								)}
								width={100}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="spaj_status_date" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.spaj_status_date} 
									onFilterChange={this._onFilterChange} 
									width={100} 
									filter={true}>Status Date</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_status_date}
									</Cell>
								)}
								width={120}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="spaj_agent_name" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.spaj_agent_name} 
									onFilterChange={this._onFilterChange} 
									width={200} 
									filter={true}>Agent Name</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_agent_name}
									</Cell>
								)}
								width={200}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="spaj_agent_code" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.spaj_agent_code} 
									onFilterChange={this._onFilterChange} 
									width={100} 
									filter={true}>Agent Code</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_agent_code}
									</Cell>
								)}
								width={120}
							/>

							{
								this.props.statusSPAJ == 'pending' ? 
								<Column 
									header={<SortFilterHeaderCell cellDataKey="spaj_notes" onSortChange={this._onSortChange} sortDir={this.state.colSortDirs.spaj_notes} onFilterChange={this._onFilterChange} width={100} filter={false}>SPAJ Notes</SortFilterHeaderCell>}
									cell={({rowIndex, ...props}) =>(
										<Cell {...props}>
											{dataUsed[rowIndex].spaj_notes}
										</Cell>
									)}
									width={100}
								/>
								:
								''
							}

						</Table>

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
	var classHide = "form-control filter-input input-sm " + ((this.props.filter == true) ? '' : 'hidden');
	var cellDataKey = this.props.cellDataKey;
    var {sortDir, ...props} = this.props;
	return (
      <Cell width={this.props.width}>
        <a onClick={this._onSortChange}>{this.props.children} {sortDir ? (sortDir === SortTypes.DESC ? '↑' : '↓') : ''}</a>
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

export default NewBusinessModal;
