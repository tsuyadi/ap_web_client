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

class PreRegModal extends React.Component {
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
				no:'-',
				pre_reg_number:'-',
				pre_reg_submit_date:'-',
				pre_reg_holder:'-',
				pre_reg_insured:'-',
				pre_reg_agent_code:'-',
				pre_reg_agent_name:'-',
				pre_reg_agent_branch:'-',
				pre_reg_distribution_channel:'-',
				pre_reg_status:'-'
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
			console.log("props");
			console.log(p.data);
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
		let tableHead = 
							<tr>
								<th>No</th>
								<th>SPAJ No</th>
								<th>Submit Date</th>
								<th>Policy Holder Name</th>
								<th>Insured Name</th>
								<th>FC / BC Code</th>
								<th>FC / BC Name</th>
								<th>Channel Distribution</th>
								<th>Status</th>
							</tr> ;
		let tableBody = [];
		let dataUsed = [];
		let mobileVersion = [];
		let no = 0;
		this.state.filteredData.map(function(item, index) {
			no = no + 1;
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
					no : index+1,
					spaj_no : item.spaj_no != null ? item.spaj_no : '-',
					pre_reg_date : item.pre_reg_date != null ? DateFormatEx(item.pre_reg_date) : '-',
					owner_name : item.owner_name != null ? item.owner_name : '-',
					insured_name : item.insured_name != null ? item.insured_name : '-',
					agent_code : item.agent_code != null ? item.agent_code : '-',
					agent_code : item.agent_code != null ? item.agent_code : '-',
					agent_name : item.agent_name != null ? item.agent_name : '-',
					agent_branch : item.agent_branch != null ? item.agent_branch : '-',
					channel_distribution : item.channel_distribution != null ? item.channel_distribution : '-',
					status_desc : item.status_desc != null ? item.status_desc : '-',
				});
			}
			else
			{
				dataUsed.push({
					no : no,
					spaj_no : item.spaj_no != null ? item.spaj_no : '-',
					pre_reg_date : item.pre_reg_date != null ? DateFormatEx(item.pre_reg_date) : '-',
					owner_name : item.owner_name != null ? item.owner_name : '-',
					insured_name : item.insured_name != null ? item.insured_name : '-',
					agent_code : item.agent_code != null ? item.agent_code : '-',
					agent_name : item.agent_name != null ? item.agent_name : '-',
					agent_branch : item.agent_branch != null ? item.agent_branch : '-',
					channel_distribution : item.channel_distribution != null ? item.channel_distribution : '-',
					status_desc : item.status_desc != null ? item.status_desc : '-',
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
								<div className="col-content">{item.spaj_no != null ? item.spaj_no : '-'}</div>
							</div>
						</div>
						<div className="row ">
							<div className="col-xs-3">
								<div className="col-title">Submited Date</div>
							</div>
							<div className="col-xs-9">
								<div className="col-content">{item.pre_reg_date != null ? item.pre_reg_date : '-'}</div>
							</div>
						</div>
						<div className="row ">
							<div className="col-xs-3">
								<div className="col-title">Policy Holder Name</div>
							</div>
							<div className="col-xs-9">
								<div className="col-content">{item.owner_name != null ? item.owner_name : '-'}</div>
							</div>
						</div>
						<div className="row ">
							<div className="col-xs-3">
								<div className="col-title">Policy Insured Name</div>
							</div>
							<div className="col-xs-9">
								<div className="col-content">{item.insured_name != null ? item.insured_name : '-'}</div>
							</div>
						</div>
						
						<div className="row">
							<div className="col-sm-12">
								<div class="panel panel-default">
									<div id={"collapse" + item.no} className="dialog-collapse collapse" role="tabpanel" aria-labelledby={"heading" + item.no}>
										<div class="panel-body">
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">FC / BC Code</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.agent_code != null ? item.agent_code : '-'}</div>
												</div>
											</div>
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">FC / BC Name</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.agent_name != null ? item.agent_name : '-'}</div>
												</div>
											</div>
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">FC / BC Branch</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.agent_branch != null ? item.agent_branch : '-'}</div>
												</div>
											</div>
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">Distribution Channel</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.channel_distribution != null ? item.channel_distribution : '-'}</div>
												</div>
											</div>
											<div className="row ">
												<div className="col-xs-3">
													<div className="col-title">Status</div>
												</div>
												<div className="col-xs-9">
													<div className="col-content">{item.status_desc != null ? item.status_desc : '-'}</div>
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
        <div className="modal fade newbusinessSummary" id="pre_reg" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
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
									<option value="spaj_no">SPAJ Number</option>
									<option value="pre_reg_date">Submited Date</option>
									<option value="owner_name">Policy Holder Name</option>
									<option value="insured_name">Policy Insred Name</option>
									<option value="agent_code">FC / BC Code</option>
									<option value="agent_name">FC / BC Name</option>
									<option value="agent_branch">FC / BC Branch</option>
									<option value="channel_distribution">Distribution Channel</option>
									<option value="status_desc">Status</option>
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
              						sortDir={this.state.colSortDirs.spaj_no}
									onFilterChange={this._onFilterChange}
									cellDataKey="spaj_no"
									filter={true}>SPAJ No
									</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].spaj_no}
									</Cell>
								)}
								width={120}
							/>
							<Column 
								header={<SortFilterHeaderCell  
									onSortChange={this._onSortChange}
              						sortDir={this.state.colSortDirs.pre_reg_date}
									cellDataKey="pre_reg_date" 
									onFilterChange={this._onFilterChange} 
									filter={true}>Submited Date</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].pre_reg_date}
									</Cell>
								)}
								width={150}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="owner_name" 
									onSortChange={this._onSortChange}
									sortDir={this.state.colSortDirs.owner_name}
									onFilterChange={this._onFilterChange} 
									filter={true}>Policy Holder Name</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].owner_name}
									</Cell>
								)}
								width={200}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="insured_name" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.insured_name} 
									onFilterChange={this._onFilterChange} 
									width={150} 
									filter={true}>Policy Insured Name</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].insured_name}
									</Cell>
								)}
								flexGrow={1}
								width={200}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="agent_code" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.agent_code} 
									onFilterChange={this._onFilterChange} 
									width={100} 
									filter={true}>FC / BC Code</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].agent_code}
									</Cell>
								)}
								width={150}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="agent_name" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.agent_name} 
									onFilterChange={this._onFilterChange} 
									width={150} 
									filter={true}>FC / BC Name</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].agent_name}
									</Cell>
								)}
								width={120}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="agent_branch" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.agent_branch} 
									onFilterChange={this._onFilterChange} 
									width={200} 
									filter={true}>FC / BC Branch</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].agent_branch}
									</Cell>
								)}
								width={200}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="channel_distribution" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.channel_distribution} 
									onFilterChange={this._onFilterChange} 
									width={100} 
									filter={true}>Distribution Channel</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].channel_distribution}
									</Cell>
								)}
								width={200}
							/>
							<Column 
								header={<SortFilterHeaderCell 
									cellDataKey="status_desc" 
									onSortChange={this._onSortChange} 
									sortDir={this.state.colSortDirs.status_desc} 
									onFilterChange={this._onFilterChange} 
									width={100} 
									filter={true}>Status</SortFilterHeaderCell>}
								cell={({rowIndex, ...props}) =>(
									<Cell {...props}>
										{dataUsed[rowIndex].status_desc}
									</Cell>
								)}
								width={120}
							/>

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

export default PreRegModal;
