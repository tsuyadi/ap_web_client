'use strict'
import api_route from '../../common_components/api_route';
import {MoneyFormat, decimalFormatCeilling} from '../../common_components/helper/formatter';
import Pager from 'react-pager';

const SortType = {
  DESC : 'DESC',
  ASC : 'ASC'
}

class ProductionSummary extends React.Component {
    	constructor(props){
    		super(props);

        this.state = {
            rd_child : [],
            filterd_data : [],
            sort : SortType.DESC,
            activeSorting : '',
            filter_column : '',
            filter_rule : '2',
            filter_number : 0,
            on_filter : false,
            total : 0,
            current : 0,
            visiblePages : 3            
        }

        this.itemSorting = this.itemSorting.bind(this);
        this._onFilterChange = this._onFilterChange.bind(this);

    	}

      componentWillReceiveProps(p){
          var row_data = p.data.specific_data.rd_child != null ? p.data.specific_data.rd_child : [];
          var total_page = Math.ceil(row_data.length / 10);

          this.setState({
            rd_child: p.data.specific_data.rd_child != null ? p.data.specific_data.rd_child : [],
            data: p.data,
            filterd_data : row_data,
            total : total_page
          });
      }

      itemSorting(e, type){
        e.preventDefault;
        var sort_data = this.state.filterd_data;
        var sort_type = (this.state.activeSorting == '') ? SortType.ASC : (this.state.activeSorting == e) ? (this.state.sort == SortType.ASC) ? SortType.DESC : SortType.ASC : SortType.ASC;
        var sort_data = (this.state.activeSorting == '') ? this._sorting(sort_data, e, SortType.ASC) : 
                            (this.state.activeSorting == e && this.state.sort == SortType.ASC) ? this._sorting(sort_data, e, SortType.DESC) : 
                              this._sorting(sort_data, e, SortType.ASC);
        this.setState({
          filterd_data : sort_data,
          activeSorting : e,
          sort : sort_type
        });
      }

      _sorting(data, content, type){
        if(content == "total_annualize"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.total_annualized_premium - b.total_annualized_premium;
            });
          }else{
            data.sort(function(a, b){
              return b.total_annualized_premium - a.total_annualized_premium;
            });
          }
        }else if(content == "case"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.cases - b.cases;
            });
          }else{
            data.sort(function(a, b){
              return b.cases - a.cases;
            });
          }
        }else if(content == "qualify_case"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.qc - b.qc;
            });
          }else{
            data.sort(function(a, b){
              return b.qc - a.qc;
            });
          }
        }else if(content == "active_agent"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.active_agent - b.active_agent;
            });
          }else{
            data.sort(function(a, b){
              return b.active_agent - a.active_agent;
            });
          }
        }else if(content == "reg_agent"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.registered_agent - b.registered_agent;
            });
          }else{
            data.sort(function(a, b){
              return b.registered_agent - a.registered_agent;
            });
          }
        }else if(content == "mapr"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.mapr - b.mapr;
            });
          }else{
            data.sort(function(a, b){
              return b.mapr - a.mapr;
            });
          }
        }else if(content == "maapr"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.maprr - b.maprr;
            });
          }else{
            data.sort(function(a, b){
              return b.maprr - a.maprr;
            });
          }
        }else if(content == "grand_total"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.grand_total_collected_premium - b.grand_total_collected_premium;
            });
          }else{
            data.sort(function(a, b){
              return b.grand_total_collected_premium - a.grand_total_collected_premium;
            });
          }
        }else if(content =="agent_code"){
          if(type == SortType.ASC){
            data.sort(function(a, b){
              return a.rd_agent.code - b.rd_agent.code;
            });
          }else{
            data.sort(function(a, b){
              return b.rd_agent.code - a.rd_agent.code;
            });
          }
        }
        return data;
      }

      handlePageChanged(newPage){
        this.setState({ current : newPage });
      }

      sortIcon(column){
       
        if(column == this.state.activeSorting){
          if(this.state.sort == SortType.ASC){
            return (
              <i className="glyphicon glyphicon-chevron-down"></i>
            );
          }else{
            return(
              <i className="glyphicon glyphicon-chevron-up"></i>
            );
          }
        }else{
          return(
              <i></i>
          );
        }
      }

      _onFilterChange(cellDataKey, event){
        // // debugger;
        if(!event.target.value){
          this.setState({
            filteredData: this.state.rd_child
          });
        }
        var filterBy = event.target.value != null ? event.target.value.toString().toLowerCase() : '';
        var size = this.state.rd_child.length;
        var filteredList = [];
        for (var index = 0; index < size; index++){
          if(cellDataKey == "agent_code")
            var v = this.state.rd_child[index]["rd_agent"]["code"];
          else if(cellDataKey == "partner")
            var v = this.state.rd_child[index]["rd_agent"]["name"];
          else
            var v = this.state.rd_child[index][cellDataKey];          
          v = v != null ? v : '';
          if(v.toString().toLowerCase().indexOf(filterBy) !== -1){
            filteredList.push(this.state.rd_child[index]);
          }
        }

        var sortIndexes = [];
        var size = filteredList.length;
        for (var index = 0; index < size; index++) {
          sortIndexes.push(index);
        }

        var row_data = filteredList != null ? filteredList : [];
        var total_page = Math.ceil(row_data.length / 10);

        this.setState({
          filterd_data : filteredList,
          total : total_page
        });
      }

    	render(){

        var link_reset_css = (this.state.on_filter == false) ? 'btn btn-link hidden' : 'btn btn-link';
        var v_from = (this.state.current * 10);
        var v_to = v_from + 10;
        
        var dataUsed = [];
        var mobileVersion = [];

        
        var nz = 0;
        this.state.filterd_data.map(function(item, x) {
          ++nz;
          if(!(item.rd_agent.code.match(/8.*/) || item.rd_agent.code.match(/6.*/))){
            return;
          } 
          dataUsed.push({
            // agent_code : item.rd_agent.code,
            branch : item.branch || '',
            partner : item.rd_agent.bank_set ? item.rd_agent.bank_set[0].account_holder_name : item.rd_agent.name,
            cases : item.cases,
            total_annualized_premium : item.total_annualized_premium,
            qc : item.qc,
            active_agent : item.active_agent,
            registered_agent : item.registered_agent,
            activity_ratio : item.activity_ratio,
            mapr : item.mapr != null ? decimalFormatCeilling(item.mapr) : 0,
            maapr : item.maapr != null ? decimalFormatCeilling(item.maapr) : 0,
            grand_total_collected_premium : item.grand_total_collected_premium
          });
          {/*
          RD Code, RD Name, Case, Total APE, Qualified Case, Active Agent, Registered Agent, Activity Ratio, MAPR, MAAPR, Total Collected Premium
          */}
          mobileVersion.push(
            <div className="row row-table">
              <div className="col-sm-12">

                {/*
                <div className="row ">
                  <div className="col-xs-3">
                    <div className="col-title">RD Code</div>
                  </div>
                  <div className="col-xs-9">
                    <div className="col-content">{item.rd_agent != null ? item.rd_agent.code : '-'}</div>
                  </div>
                </div>						
                <div className="row ">
                  <div className="col-xs-3">
                    <div className="col-title">RD Name</div>
                  </div>
                  <div className="col-xs-9">
                    <div className="col-content">{item.rd_agent.bank_set != null ? item.rd_agent.bank_set[0].account_holder_name : item.rd_agent.name}</div>
                  </div>
                </div>
                */}

                <div className="row ">
                  <div className="col-xs-3">
                    <div className="col-title">Branch</div>
                  </div>
                  <div className="col-xs-9">
                    <div className="col-content">{item.branch != null ? item.branch : '-'}</div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-xs-3">
                    <div className="col-title">Case</div>
                  </div>
                  <div className="col-xs-9">
                    <div className="col-content">{item.cases != null ? item.cases : '-'}</div>
                  </div>
                </div>
                <div className="row ">
                  <div className="col-xs-3">
                    <div className="col-title">Total APE</div>
                  </div>
                  <div className="col-xs-9">
                    <div className="col-content">{item.total_annualized_premium != null ? MoneyFormat(item.total_annualized_premium) : '0'}</div>
                  </div>
                </div>
                
                <div className="row">
                  <div className="col-sm-12">
                    <div class="panel panel-default">
                      <div id={"collapse" + nz} className="dialog-collapse collapse" role="tabpanel" aria-labelledby={"heading" + item.no}>
                        <div class="panel-body">
                          <div className="row ">
                            <div className="col-xs-3">
                              <div className="col-title">QC</div>
                            </div>
                            <div className="col-xs-9">
                              <div className="col-content">{item.qc != null ? item.qc : '-'}</div>
                            </div>
                          </div>
                          {/*
                           RD Code, RD Name, Case, Total APE, Qualified Case, Active Agent, Registered Agent, Activity Ratio, MAPR, MAAPR, Total Collected Premium
                          */}
                          <div className="row ">
                            <div className="col-xs-3">
                              <div className="col-title">Active Agent</div>
                            </div>
                            <div className="col-xs-9">
                              <div className="col-content">{item.active_agent != null ? item.active_agent : '-'}</div>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-xs-3">
                              <div className="col-title">Registered Agent</div>
                            </div>
                            <div className="col-xs-9">
                              <div className="col-content">{item.registered_agent != null ? item.registered_agent : '-'}</div>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-xs-3">
                              <div className="col-title">Activity Ratio</div>
                            </div>
                            <div className="col-xs-9">
                              <div className="col-content">{item.activity_ratio != null ? item.activity_ratio : '-'} % </div>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-xs-3">
                              <div className="col-title">MAPR</div>
                            </div>
                            <div className="col-xs-9">
                              <div className="col-content">{item.mapr != null ? decimalFormatCeilling(item.mapr) : 0}</div>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-xs-3">
                              <div className="col-title">MAAPR</div>
                            </div>
                            <div className="col-xs-9">
                              <div className="col-content">{item.maapr != null ? decimalFormatCeilling(item.maapr) : 0}</div>
                            </div>
                          </div>
                          <div className="row ">
                            <div className="col-xs-3">
                              <div className="col-title">Total Collected Premium</div>
                            </div>
                            <div className="col-xs-9">
                              <div className="col-content">{item.grand_total_collected_premium != null ? MoneyFormat(item.grand_total_collected_premium) : '0'}</div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="panel-heading" role="tab" id="headingOne">
                        <div className="more-detail">
                          <a className="btn btn-block btn-default" role="button" data-toggle="collapse" data-parent="#accordion" href={"#collapse" + nz} aria-expanded="false" aria-controls={"collapse" + item.no}>
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

    		return (
            <div className="col-xs-12 responsive3">
              <div className="content">
                <div className="title"><i className="fa fa-tasks"></i> Production Summary (Month to Date)</div>
                <div className="entry">
                  <div className="row">
                    <div className="col-md-12">&nbsp;</div>
                  </div>

                  { /* Mobile Version Start */ }
                  <div className="hidden-md hidden-lg">
                    <div className="row row-table-header hidden">
                      <div className="col-sm-12">Filter By :</div>
                      <div className="col-sm-12">
                        <select className="form-control" onChange={this._changeFilterOption}>
                          <option value="">-- SELECT --</option>
                          <option value="branch">Branch</option>
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
                  {/* Mobile Version End */}

                  <div className="table-responsive hidden-sm hidden-xs">
                    <table className="table table-striped table-bordered table-box ">  
                      <thead className="noselect">
                        <tr key="header_productsummary">
                          <th className="text-center header_table"><a onClick={this.itemSorting.bind(this, "branch")}>Branch</a></th>
                          {/*<th className="header_table">RD Name</th>*/}
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "case")}>Case</a> {this.sortIcon("case")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "total_annualize")}>Total APE</a> {this.sortIcon("total_annualize")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "qualify_case")}>Qualified Case</a> {this.sortIcon("qualify_case")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "active_agent")}>Active Agent</a> {this.sortIcon("active_agent")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "reg_agent")}>Registered Agent</a> {this.sortIcon("reg_agent")}</th>
                          <th className="header_table">Activity Ratio(%)</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "mapr")}>MAPR</a> {this.sortIcon("mapr")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "maapr")}>MAAPR</a> {this.sortIcon("maapr")}</th>
                          <th className="header_table"><a onClick={this.itemSorting.bind(this, "grand_total")}>Total Collected Premium</a> {this.sortIcon("grand_total")}</th>
                        </tr>
                        <tr key="header_productsummary_filter">
                          <th className="header_table"><input type="text" name="agent_code" onChange={this._onFilterChange.bind(this, "branch")} className="form-control" /></th>
                          {/*<th className="header_table"><input type="text" name="partner" onChange={this._onFilterChange.bind(this, "partner")} className="form-control" /></th>*/}
                          <th className="header_table"><input type="text" name="cases" onChange={this._onFilterChange.bind(this, "cases")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="total_annualized_premium" onChange={this._onFilterChange.bind(this, "total_annualized_premium")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="qc" onChange={this._onFilterChange.bind(this, "qc")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="active_agent" onChange={this._onFilterChange.bind(this, "active_agent")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="registered_agent" onChange={this._onFilterChange.bind(this, "registered_agent")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="activity_ratio" onChange={this._onFilterChange.bind(this, "activity_ratio")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="mapr" onChange={this._onFilterChange.bind(this, "mapr")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="maapr" onChange={this._onFilterChange.bind(this, "maapr")} className="form-control" /></th>
                          <th className="header_table"><input type="text" name="grand_total_collected_premium" onChange={this._onFilterChange.bind(this, "grand_total_collected_premium")} className="form-control" /></th>
                        </tr>
                      </thead>
                      <tbody>
                        {
                          dataUsed.map(function(item, x) {
                            // if(x >= v_from && x < v_to)
                            // {
                              
                              
                                return (
                                  <tr key={item.branch}>
                                    <td className="text-left">{item.branch}</td>
                                    {/*<td>{item.partner}</td>*/}
                                    <td className="text-right">{item.cases}</td>
                                    <td className="text-right">{MoneyFormat(item.total_annualized_premium)}</td>
                                    <td className="text-right">{item.qc}</td>
                                    <td className="text-right">{item.active_agent}</td>
                                    <td className="text-right">{item.registered_agent}</td>
                                    <td className="text-right">{item.activity_ratio} %</td>
                                    <td className="text-right">{item.mapr}</td>
                                    <td className="text-right">{item.maapr}</td>
                                    <td>{MoneyFormat(item.grand_total_collected_premium)}</td>
                                  </tr>
                                );
                             

                            // }
                          })
                        }
                        
                        <tr key="header_productsummary_paging">
                          <td className="paging-table" colSpan={11}>
                            { /*
                            <Pager total={this.state.total}
                              current={this.state.current}

                              titles={{
                                  first:   'First',
                                  prev:    '\u00AB',
                                  prevSet: '...',
                                  nextSet: '...',
                                  next:    '\u00BB',
                                  last:    'Last'
                              }}

                              visiblePages={this.state.visiblePages}
                              onPageChanged={this.handlePageChanged}/>
                              */ }
                          </td>
                        </tr>

                      </tbody>
                    </table>
                  </div>
                </div>
                {/*
                <a href={this.state.data && api_route.production_report_management+this.state.data.common_data.user_id}>
                <button className="btn btn-warning"><i className="fa fa-download"></i> Download</button>
                </a>
                */}
              </div>
            </div>
    		);
    	}
}

export default ProductionSummary;