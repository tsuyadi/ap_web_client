'use strict'

import api_route from '../../common_components/api_route';

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

class LeaderPotentialAAModal extends React.Component {
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

			total : 20,
			current : 1,
			visiblePages : 3
			
		}

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
		
		let tableBody = [];
		let dataUsed = [];
		let mobileVersion = [];
		
		/** Modif Starts Here */
		
		if(this.state.filteredData != null){
			this.state.filteredData.map(function(item) {

					dataUsed.push({
						agent_code : item.agent_code != null ? item.agent_code : '-',
						agent_name : item.agent_name != null ? item.agent_name : '-'
					});

					mobileVersion.push(
						<div className="row row-table">
							<div className="col-sm-12">
								<div className="row ">
									<div className="col-xs-5">
										<div className="col-title">Agent Code</div>
									</div>
									<div className="col-xs-7">
										<div className="col-content">{item.agent_code != null ? item.agent_code : '-'}</div>
									</div>
								</div>						
								<div className="row ">
									<div className="col-xs-5">
										<div className="col-title">Agent Name</div>
									</div>
									<div className="col-xs-7">
										<div className="col-content">{item.agent_name != null ? item.agent_name : '-'}</div>
									</div>
								</div>
								
							</div>
						</div>
					);

        });
		}

		return (
        <div className="modal fade" id="potential_aa" tabIndex="-1" role="dialog" aria-labelledby="myModalLabel" aria-hidden="true">
			  <div className="modal-dialog">
				<div className="modal-content" style={{'width':'30vw'}}>
					<div className="modal-header">
						<button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>
						<h4 className="modal-title">Potential AA</h4>
					</div>
					<div className="hidden-md hidden-lg">
						<div className="row row-table-header">
							<div className="col-sm-12">Filter By :</div>
							<div className="col-sm-12">
								<select className="form-control" onChange={this._changeFilterOption}>
									<option value="">-- SELECT --</option>
									<option value="agent_code">Agent Code</option>
									<option value="agent_name">Agent Name</option>
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

					<div className="hidden-sm hidden-xs">
						<table className="table table-striped table-box ">  
                      <thead className="noselect">
                        {/* agent_code, agent_name */}
												<tr key="columnname">
                          <th className="header_table" style={{'width' : '150px'}}><a onClick={this.itemSorting.bind(this, "agent_code")}>Agent Code</a> {this.sortIcon("agent_code")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "agent_name")}>Agent Name</a> {this.sortIcon("agent_name")}</th>
                        </tr>
                        <tr key="columnfilter">
                          <th className="header_table"><input type="text" name="agent_code" onChange={this._onFilterChange.bind(this, "agent_code")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="agent_name" onChange={this._onFilterChange.bind(this, "agent_name")} className="form-control" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          dataUsed.map(function(item, x) {
                            return (
                                <tr key={item.no}>
                                  <td className="text-left column_table">{item.agent_code}</td>
                                  <td className="column_table">{item.agent_name}</td>
                                </tr>
                              );
                          })
                        }
                      </tbody>
                    </table>

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

export default LeaderPotentialAAModal;
