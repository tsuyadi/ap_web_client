'use strict'

import {PropTypes} from 'react';

import {MoneyFormat, decimalFormatCeilling} from '../../common_components/helper/formatter';
import api_route from '../../common_components/api_route';

import {ResponsiveContainer, PieChart, BarChart, Bar, XAxis, YAxis, CartesianGrid, Pie, Sector, Cell, Tooltip, Legend} from 'recharts';

var Highcharts = require('highcharts');

// Load module after Highcharts is loaded
require('highcharts/modules/exporting')(Highcharts);

const CustomTooltip  = React.createClass({
  propTypes: {
    type: PropTypes.string,
    payload: PropTypes.array,
    label: PropTypes.string,
  },

  render() {
    const { active } = this.props;

    if (active) {
      const { payload, label } = this.props;
      return (
		  <div class="recharts-tooltip-wrapper" style={{pointerEvents: 'none',  display: 'block', position: 'absolute',  top: '0px', transform: 'translate(30px, 0.042px)'}}>
			<div class="recharts-default-tooltip" style={{margin:0, padding:'10px', backgroundColor:'#fff', border:'1px solid #ccc', whiteSpace:'nowrap'}}>
				<p class="recharts-tooltip-label" style={{margin:0}} ></p>
				<ul class="recharts-tooltip-item-list" style={{padding:0, margin:0}} >
					<li class="recharts-tooltip-item" style={{display:'block', paddingTop:'4px', paddingBottom:'4px', color:'#000'}}>
						<span class="recharts-tooltip-item-name">{payload[0].name}</span>
						<span class="recharts-tooltip-item-separator"> : </span>
						<span class="recharts-tooltip-item-value">{MoneyFormat(payload[0].value)}</span>
						<span class="recharts-tooltip-item-unit" ></span>
					</li>
				</ul>
			</div>
		</div>
      );
    }

    return null;
  }
});

class ProductionGraph extends React.Component {
	constructor(props){
		super(props);
		this.state = {
			data : null,
			dataProductInfo : null,
			activeIndexCase : 0,
			activeIndexApe : 0,
			dataProductionByBranch : null,
			activeIndexBranchCase : 0,
			activeIndexBranchApe : 0,
			dataProductionByType : null,
			activeIndexTypeCase : 0,
			activeIndexTypeApe : 0,
			activeButton : 1
		};

		this.onPieEnterCase = this.onPieEnterCase.bind(this);
		this.onPieEnterApe = this.onPieEnterApe.bind(this);
		this.onPieEnterBranchCase = this.onPieEnterBranchCase.bind(this);
		this.onPieEnterBranchApe = this.onPieEnterBranchApe.bind(this);
		this.onPieEnterTypeCase = this.onPieEnterTypeCase.bind(this);
		this.onPieEnterTypeApe = this.onPieEnterTypeApe.bind(this);
		this.changeStatePeriod = this.changeStatePeriod.bind(this);
	}

	componentWillReceiveProps(p){
		// // debugger;
		this.setState({
	        data: p.data.specific_data.rd_child,
			dataProductInfo: p.dataProductInfo,
			dataProductionByBranch: p.dataProductionByBranch,
			dataProductionByType: p.dataProductionByType,
	    });

	}

	onPieEnterCase(data, index) {
		this.setState({
		activeIndexCase: index,
		});
	}

	onPieEnterApe(data, index) {
		this.setState({
		activeIndexApe: index,
		});
	}

	onPieEnterBranchCase(data, index) {
		this.setState({
		activeIndexBranchCase: index,
		});
	}

	onPieEnterBranchApe(data, index) {
		this.setState({
		activeIndexBranchApe: index,
		});
	}

	onPieEnterTypeCase(data, index) {
		this.setState({
		activeIndexTypeCase: index,
		});
	}

	onPieEnterTypeApe(data, index) {
		this.setState({
		activeIndexTypeApe: index,
		});
	}

	downloadReport(url){
		if(url != '' && url != null){
			// // debugger;
			window.location.href=url;
		}
	}

	getProductList = (array, nameList) => {

		var result = [];

		// var production_summary_s = [];
		// production_summary_s = production_summary.uniqueObjects(['agent_code']);

		for(var iName = 0; iName < nameList.length; iName++){
			var vName = nameList[iName];
			for(var nIndex = 0; nIndex < array[vName].length; nIndex++){
				result.push(array[vName][nIndex].product_name);
			}
		}
		// // debugger;
		return result.uniqueWords();

	}

	getProductDetail = (array, nameList, productList) => {

		var result = [];

		/*
			{
				name: 'John',
				data: [5, 3, 4, 7, 2]
			}
		 */

		 for(var nProd = 0; nProd < productList.length; nProd++){

			var nameProd = productList[nProd];
			var dataProd = [];

			for(var iName = 0; iName < nameList.length; iName++){
				var vName = nameList[iName];
				var vData = array[vName];

				if(vData.length > 0){
					// // debugger;
					for(var nIndex = 0; nIndex < vData.length; nIndex++){
						if(vData[nIndex].product_name === nameProd){
							dataProd.push(vData[nIndex].total_product);
							break;
						}else{
							// // debugger;
							if(nIndex == (vData.length - 1)){
								// // debugger;
								dataProd.push(0);
							}
						}
					}

				}else{

					dataProd.push(0);

				}

			}

			result.push(
				{name : nameProd, data : dataProd}
			);

		 }

		 return result;


	}

	componentDidUpdate = () => {

		// // debugger;

		var cat = this.state.dataProductInfo;

		var categories = [];

		for ( var prop in cat ) {
			if(prop != undefined){
				// // debugger;
				if(cat[prop] && cat[prop].length > 0){
					categories.push(prop);
				}
			}
		}

		var production_result = this.getProductList(cat, categories);

		var series_var = this.getProductDetail(cat, categories, production_result);

		Highcharts.setOptions({
			lang: {
				thousandsSep: ","
			}
		});
		// debugger;
		// production_Graph

		Highcharts.chart('graph_stacked', {
			chart: {
				type: 'column',
				spacingBottom: 50
			},
			colors: ['#2f7ed8', 'green' /*'#0d233a'*/, 'gray' /*'#8bbc21'*/, '#910000', 'red', '#1aadce', 'pink' /*'#492970'*/, '#f28f43', '#a6c96a', 'yellow', '#c42525',  'black' /*'#1866d3'*/, 'khaki', '#77a1e5'],
			title: {
				text: 'Product Info based on Month to Date'
			},
			xAxis: {
				categories: categories
			},
			yAxis: {
				min: 0,
				title: {
					text: 'Total Cases'
				},
				stackLabels: {
					enabled: true,
					style: {
						fontWeight: 'bold',
						color: (Highcharts.theme && Highcharts.theme.textColor) || 'gray'
					}
				}
			},
			legend: {
				align: 'center',
				margin : 10,
				x: -30,
				verticalAlign: 'bottom',
				// y: 25,
				y: 40,
				// floating: true,
				backgroundColor: (Highcharts.theme && Highcharts.theme.background2) || 'white',
				borderColor: '#CCC',
				borderWidth: 1,
				shadow: false
			},
			tooltip: {
				headerFormat: '<b>{point.x}</b><br/>',
				pointFormat: '{series.name}: {point.y}<br/>Total: {point.stackTotal}'
			},
			exporting: {
				sourceWidth: 1500,
				sourceHeight: 1200,
			},
			plotOptions: {
				column: {
					animation: false,
					stacking: 'normal',
					dataLabels: {
						enabled: true,
						color: (Highcharts.theme && Highcharts.theme.dataLabelsColor) || 'white',
						formatter:function(){
							if(this.y > 0) return this.y;
						}
					}
				}
			},
			series : series_var
			// series: [{
			// 	name: 'John',
			// 	data: [5, 3, 4, 7, 2]
			// }, {
			// 	name: 'Jane',
			// 	data: [2, 2, 3, 2, 1]
			// }, {
			// 	name: 'Joe',
			// 	data: [3, 4, 4, 2, 5]
			// }]
		});
	}

	changeStatePeriod(e){
        
        this.props.changePeriod(e);
		this.state.activeButton = e;
		// debugger;
      }

	// changeStatePerioda = (e) => {
    //     this.props.changePeriod(e);
	// 	this.state.activeButton = e;
    // }
	render(){

		var production_summary_data = this.state.data;
		var production_by_branch = this.state.dataProductionByBranch;
		var production_by_type = this.state.dataProductionByType;

		var production_case = [];
		var production_case_name = [];
		var production_case_value = [];

		var production_ape = [];
		var production_ape_name = [];
		var production_ape_value = [];
		
		var production_ape_legend = [];

		var production_summary = [];

		var production_branch = [];
		var temp_production_branch = [];
		var production_branch_ape = [];
		var temp_production_branch_ape = [];
		var production_type = [];

		var nz = 0;

		if(production_by_branch != null && production_by_branch.length > 0){
			production_by_branch.map((item, x) => {
				temp_production_branch.push({
					active_agent: item.active_agent,
					total_ape: item.total_ape,
					maprr: item.maprr,
					registered_agent: item.registered_agent,
					rider_attachment_ratio: item.rider_attachment_ratio,
					case: item.case,
					average_policy_size: item.average_policy_size,
					qualified_case: item.qualified_case,
					activity_ration: item.activity_ration,
					total_collected_premium: item.total_collected_premium,
					mapr: item.mapr,
					branch: item.branch
				});
				temp_production_branch_ape.push({
					active_agent: item.active_agent,
					total_ape: item.total_ape,
					maprr: item.maprr,
					registered_agent: item.registered_agent,
					rider_attachment_ratio: item.rider_attachment_ratio,
					case: item.case,
					average_policy_size: item.average_policy_size,
					qualified_case: item.qualified_case,
					activity_ration: item.activity_ration,
					total_collected_premium: item.total_collected_premium,
					mapr: item.mapr,
					branch: item.branch
				});
			});
		}

		if(production_by_type != null && production_by_type.length > 0){
			production_by_type.map((item, x) => {
				production_type.push({
					active_agent: item.active_agent,
					total_ape: item.total_ape,
					qualified_case: item.qualified_case,
					registered_agent: item.registered_agent,
					rider_attachment_ratio: item.rider_attachment_ratio,
					case: item.case,
					activity_ratio: item.activity_ratio,
					average_policy_size: item.average_policy_size,
					maprr: item.maprr,
					total_collected_premium: item.total_collected_premium,
					mapr: item.mapr,
					agency_type: item.agency_type
				});
			});
		}

		if(production_summary_data != null && production_summary_data.length > 0){
			production_summary_data.map(function(item, x) {
				++nz;
				if(!(item.rd_agent.code.match(/8.*/) || item.rd_agent.code.match(/6.*/))){
					return;
				}
				production_summary.push({
					agent_code : item.rd_agent.code,
					partner : item.rd_agent.bank_set ? item.rd_agent.bank_set[0].account_holder_name : item.rd_agent.name,
					cases : item.cases,
					total_annualized_premium : item.total_annualized_premium,
					qc : item.qc,
					active_agent : item.active_agent,
					registered_agent : item.registered_agent,
					activity_ratio : item.activity_ratio,
					mapr : item.mapr != null ? decimalFormatCeilling(item.mapr) : 0,
					maapr : item.maapr != null ? decimalFormatCeilling(item.maapr) : 0,
					grand_total_collected_premium : item.grand_total_collected_premium,
					average_policy : item.average_policy != null ? item.average_policy : 0,
					rider_ratio : item.rider_ratio != null ? item.rider_ratio : 0
				});
			});
		}

		var production_branch_case_graph = [];
		var production_branch_case_graph_name = [];
		var production_branch_case_graph_value = [];

		var production_branch_ape_graph = [];
		var production_branch_ape_graph_name = [];
		var production_branch_ape_graph_value = [];

		var production_type_case_graph = [];
		var production_type_ape_graph = [];

		var production_summary_s = [];
		var production_summary_s_ape = [];
		var temp_production_summary_s = [];
		var temp_production_summary_s_ape = [];

		temp_production_summary_s = production_summary.uniqueObjects(['agent_code']);
		temp_production_summary_s_ape = production_summary.uniqueObjects(['agent_code']);
		production_summary_s = temp_production_summary_s.sort(function(a, b){return b.cases - a.cases;});
		production_summary_s_ape = temp_production_summary_s_ape.sort(function(a, b){return b.total_annualized_premium - a.total_annualized_premium;});

		production_summary_s.map((detail) => {
			if(detail.cases != null || detail.cases > 0){
				// console.log(detail.cases);
				production_case.push({
					name : detail.agent_code + ' ' + detail.partner,
					value :  detail.cases
				});
				production_case_name.push(
					detail.agent_code + ' ' + detail.partner,
					// value : detail.cases
				);
				production_case_value.push(
					// detail.agent_code + ' ' + detail.partner,
					detail.cases
				);
				production_ape_legend.push({
					name : detail.agent_code + ' ' + detail.partner,
					value : MoneyFormat(detail.total_annualized_premium)
				});
			}
		});

		production_summary_s_ape.map((detail) => {
			
			if(detail.total_annualized_premium != null || detail.total_annualized_premium > 0){
				// console.log(detail.total_annualized_premium);
				production_ape.push({
					name : detail.agent_code + ' ' + detail.partner,
					value : detail.total_annualized_premium
				});
				production_ape_name.push(
					detail.agent_code + ' ' + detail.partner,
					// value : detail.total_annualized_premium
				);
				production_ape_value.push(
					// name : detail.agent_code + ' ' + detail.partner,
					detail.total_annualized_premium/1000000
				);
			}
		});

		production_branch = temp_production_branch.sort(function(a, b){return b.case - a.case;});
		production_branch.map((detail) => {
			if(detail.case != null || detail.case > 0){
				// console.log(detail.case);
				production_branch_case_graph.push({
					name : detail.branch,
					value : detail.case
				});
				production_branch_case_graph_name.push(
					detail.branch,
					// value : detail.case
				);
				production_branch_case_graph_value.push(
					// name : detail.branch,
					detail.case
				);
			}
		});

		production_branch_ape = temp_production_branch_ape.sort(function(a, b){return b.total_ape - a.total_ape;});
		production_branch_ape.map((detail) => {
			if(detail.total_ape != null || detail.total_ape > 0){
				// console.log(detail.total_ape);
				production_branch_ape_graph.push({
					name : detail.branch,
					value : detail.total_ape
				});
				production_branch_ape_graph_name.push(
					detail.branch,
					// value : detail.total_ape
				);
				production_branch_ape_graph_value.push(
					// name : detail.branch,
					detail.total_ape/1000000
				);
			}
		});

		production_type.map((detail) => {
			production_type_case_graph.push({
				name : detail.agency_type,
				value : detail.case
			});

			production_type_ape_graph.push({
				name : detail.agency_type,
				value : detail.total_ape
			});
		});
		var chart = [];
		
		if(production_case.length > 0)
		{
			if(production_case[this.state.activeIndexCase].value == null){						
				for(var check = 0; check < production_case.length; check++ ){
					if(production_case[check].value != null && production_case[check].value > 0){
						this.state.activeIndexCase = check;
						break;
					}
				}
			}
			Highcharts.chart('rd_case', {
				chart: {
					type: 'bar'
				},
				title: {
					text: 'Based on Case'
				},
				xAxis: {
					categories: production_case_name,
					title: {
						text: null
					},
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Total Case'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: ' case'
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'center',
					verticalAlign: 'bottom',
					x: -120,
					y: 20,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				},
				credits: {
					enabled: false
				},
				series: [{
					name: 'Total Case',
					data:  production_case_value
				}]
			});
			// chart.push(
				{/*<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterCase}>
						<Pie
							activeIndex={this.state.activeIndexCase}
							activeShape={renderActiveShape}
							data={production_case}
							innerRadius={60}
							outerRadius={100}
							isAnimationActive={false}
							fill="#07b03d">
							{
								production_case.map((entry, index) => <Cell fill={COLORS[index]} />)
							}
						</Pie>
						<Tooltip/>
						<Legend verticalAlign="bottom"/>
					</PieChart>*/}
					{/*<BarChart style={{width:100 + '%', height:600 + 'px'}} data={production_case} layout="vertical" margin={{top: 5, right: 30, left: 20, bottom: 5}}>
						<XAxis type="number"/>
						<YAxis type="category" dataKey="name" hide/>
						<CartesianGrid strokeDasharray="3 3"/>
						<Tooltip/>
						<Legend />*/}
							{/*{
								production_case.map((entry, index) => <Bar dataKey={entry.value} fill={COLORS[index]} />)
							}*/}
						{/*<Bar dataKey='total case' fill="#0096A9" style={{height:25 + 'px'}} />
					</BarChart>*/}
				{/*</ResponsiveContainer>*/}
			// );
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}
		
		if(production_ape.length > 0)
		{
			// debugger;
			if(production_ape[this.state.activeIndexApe].value == null){						
				for(var check = 0; check < production_ape.length; check++ ){
					if(production_ape[check].value != null && production_ape[check].value > 0){
						this.state.activeIndexApe = check;
						break;
					}
				}
			}
			Highcharts.chart('rd_ape', {
				chart: {
					type: 'bar'
				},
				lang : {
					thousandsSep : ','
				},
				title: {
					text: 'Based on APE'
				},
				xAxis: {
					categories: production_ape_name,
					title: {
						text: null
					},
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Total APE (Million)'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: ' Million (APE)'
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true,
							formatter: function () {
								return Highcharts.numberFormat(this.y,2);
							}
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'center',
					verticalAlign: 'bottom',
					x: -120,
					y: 20,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				},
				credits: {
					enabled: false
				},
				series: [{
					name: 'Total APE',
					data:  production_ape_value
				}]
			});
			// chart.push(
				{/*<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterApe}>
						<Pie
							activeIndex={this.state.activeIndexApe}
							activeShape={renderActiveShape}
							data={production_ape}
							innerRadius={60}
							outerRadius={100}
							isAnimationActive={false}
							fill="#186fd3">
							{
								production_ape.map((entry, index) => <Cell fill={COLORS[index]} />)
							}
						</Pie>
						<Tooltip content={<CustomTooltip/>} />*/}
						{/*<Legend verticalAlign="bottom"/>*/}
					{/*</PieChart>
				</ResponsiveContainer>*/}
			// );
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}
		
		if(production_branch_case_graph.length > 0)
		{
			// debugger;
			if(production_branch_case_graph[this.state.activeIndexBranchCase].value == null){	
				// debugger;		
				for(var check = 0; check < production_branch_case_graph.length; check++ ){
					// debugger;
					if(production_branch_case_graph[check].value != null && production_branch_case_graph[check].value > 0){
						// debugger;
						this.state.activeIndexBranchCase = check;
						break;
					}
				}
			}
			Highcharts.chart('branch_case', {
				chart: {
					type: 'bar'
				},
				title: {
					text: 'Based on Case'
				},
				xAxis: {
					categories: production_branch_case_graph_name,
					title: {
						text: null
					},
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Total Case'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: ' case'
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'center',
					verticalAlign: 'bottom',
					x: -120,
					y: 20,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				},
				credits: {
					enabled: false
				},
				series: [{
					name: 'Total Case',
					data:  production_branch_case_graph_value
				}]
			});
			// chart.push(
				{/*<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterBranchCase}>
						<Pie
							activeIndex={this.state.activeIndexBranchCase}
							activeShape={renderActiveShape}
							data={production_branch_case_graph}
							innerRadius={60}
							outerRadius={100}
							isAnimationActive={false}
							fill="#186fd3">
							{
								production_branch_case_graph.map((entry, index) => <Cell fill={COLORS[index]} />)
							}
						</Pie>
						<Tooltip content={<CustomTooltip/>} />*/}
						{/*<Legend verticalAlign="bottom"/>*/}
					{/*</PieChart>
				</ResponsiveContainer>*/}
			// );
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}

		if(production_branch_ape_graph.length > 0)
		{
			if(production_branch_ape_graph[this.state.activeIndexBranchApe].value == null){			
				for(var check = 0; check < production_branch_ape_graph.length; check++ ){
					if(production_branch_ape_graph[check].value != null && production_branch_ape_graph[check].value > 0){
						this.state.activeIndexBranchApe = check;
						break;
					}
				}
			}
			Highcharts.chart('branch_ape', {
				chart: {
					type: 'bar'
				},
				lang : {
					thousandsSep : ','
				},
				title: {
					text: 'Based on APE'
				},
				xAxis: {
					categories: production_branch_ape_graph_name,
					title: {
						text: null
					},
				},
				yAxis: {
					min: 0,
					title: {
						text: 'Total APE (Million)'
					},
					labels: {
						overflow: 'justify'
					}
				},
				tooltip: {
					valueSuffix: ' Million (APE)'
				},
				plotOptions: {
					bar: {
						dataLabels: {
							enabled: true,
							formatter: function () {
								return Highcharts.numberFormat(this.y,2);
							}
						}
					}
				},
				legend: {
					layout: 'vertical',
					align: 'center',
					verticalAlign: 'bottom',
					x: -120,
					y: 20,
					floating: true,
					borderWidth: 1,
					backgroundColor: ((Highcharts.theme && Highcharts.theme.legendBackgroundColor) || '#FFFFFF'),
					shadow: true
				},
				credits: {
					enabled: false
				},
				series: [{
					name: 'Total APE',
					data:  production_branch_ape_graph_value
				}]
			});
			// chart.push(
				{/*<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterBranchApe}>
						<Pie
							activeIndex={this.state.activeIndexBranchApe}
							activeShape={renderActiveShape}
							data={production_branch_ape_graph}
							innerRadius={60}
							outerRadius={100}
							isAnimationActive={false}
							fill="#186fd3">
							{
								production_branch_ape_graph.map((entry, index) => <Cell fill={COLORS[index]} />)
							}
						</Pie>
						<Tooltip content={<CustomTooltip/>} />*/}
						{/*<Legend verticalAlign="bottom"/>*/}
					{/*</PieChart>
				</ResponsiveContainer>*/}
			// );
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}


		if(production_type_case_graph.length > 0)
		{
			if(production_type_case_graph[this.state.activeIndexTypeCase].value == null){			
				for(var check = 0; check < production_type_case_graph.length; check++ ){
					if(production_type_case_graph[check].value != null && production_type_case_graph[check].value > 0){
						this.state.activeIndexTypeCase = check;
						break;
					}
				}
			}
			chart.push(
				<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterTypeCase}>
						<Pie
							activeIndex={this.state.activeIndexTypeCase}
							activeShape={renderActiveShape}
							data={production_type_case_graph}
							innerRadius={60}
							outerRadius={100}
							isAnimationActive={false}
							fill="#186fd3">
							{
								production_type_case_graph.map((entry, index) => <Cell fill={COLORS[index]} />)
							}
						</Pie>
						<Tooltip content={<CustomTooltip/>} />
						{/*<Legend verticalAlign="bottom"/>*/}
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}

		if(production_type_ape_graph.length > 0)
		{
			if(production_type_ape_graph[this.state.activeIndexTypeApe].value == null){
				for(var check = 0; check < production_type_ape_graph.length; check++ ){
					if(production_type_ape_graph[check].value != null && production_type_ape_graph[check].value > 0){
						this.state.activeIndexTypeApe = check;
						break;
					}
				}
			}
			chart.push(
				<ResponsiveContainer>
					<PieChart onMouseEnter={this.onPieEnterTypeApe}>
						<Pie
							activeIndex={this.state.activeIndexTypeApe}
							activeShape={renderActiveShape}
							data={production_type_ape_graph}
							innerRadius={60}
							outerRadius={100}
							isAnimationActive={false}
							fill="#186fd3">
							{
								production_type_ape_graph.map((entry, index) => <Cell fill={COLORS[index]} />)
							}
						</Pie>
						<Tooltip content={<CustomTooltip/>} />
						{/*<Legend verticalAlign="bottom"/>*/}
					</PieChart>
				</ResponsiveContainer>
			);
		}
		else
		{
			chart.push(
				<div className="text-center nodatafound-circle">0</div>
			);
		}

		var detail_graph = [];

		// if(localStorage.getItem('role') == '1')
		if(true)
		{
			detail_graph.push(

				<div>
					<div className="row">
						<div className="col-xs-12 ">
							<h3 className="text-center">Information By Branch</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-offset-2 col-lg-4">
							<h4 className="text-center">Based on Case</h4>
							<div style={{width:100 + '%', height:100 + '%'}}>
								{chart[2]}
							</div>
						</div>
						<div className="col-lg-4">
							<h4 className="text-center">Based on APE</h4>
							<div style={{width:100 + '%', height:300 + 'px'}}>
								{chart[3]}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-xs-12 ">
							<h3 className="text-center">Information By Blue/Gold</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-offset-2 col-lg-4">
							<h4 className="text-center">Based on Case</h4>
							<div style={{width:100 + '%', height:300 + 'px'}}>
								{chart[4]}
							</div>
						</div>
						<div className="col-lg-4">
							<h4 className="text-center">Based on APE</h4>
							<div style={{width:100 + '%', height:300 + 'px'}}>
								{chart[5]}
							</div>
						</div>
					</div>
				</div>

			);
		}

		var MTDButton = "";
		var YTDButton = "";
		if(this.state.activeButton == 1){
			MTDButton = "btn btn-primary";
			YTDButton = "btn btn-default";
			// debugger;
		} else {
			MTDButton = "btn btn-default";
			YTDButton = "btn btn-primary";
			// debugger;
		}

		return (
        <div className="content content-prod boxShadow">
			<div className="title textShadow"><i className="fa fa-tasks"></i> Production</div>
			<div className="row">
				<div className="col-sm-1 col-xs-2">
					<label style={{marginLeft : 10}}>Period</label>
				</div>
				<div className="col-xs-9 col-sm-10 text-left">                    
					{/*<select id="option" name="option" className="form-control" onChange={this.changeStatePeriod}>
					<option value="1">MTD</option>
					<option value="2">YTD</option>
					</select>*/}
					<div className="btn-group" role="group" aria-label="...">
						<button type="button" className={MTDButton} onClick={this.changeStatePeriod.bind(this,'1')}>MTD</button>
						<button type="button" className={YTDButton} onClick={this.changeStatePeriod.bind(this,'2')}>YTD</button>
					</div>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 ">
					<h3 className="text-center">Information By RD</h3>
				</div>
			</div>
			<div className="row">
				<div className="col-xs-12 col-sm-12 col-lg-6">
					{/*<h4 className="text-center">Based on Case</h4>*/}
					<div style={{width:100 + '%', height:800 + 'px'}}>
						{/*{chart[0]}*/}
						<div id="rd_case" style={{width:100 + '%', height:100 + '%'}}></div>
					</div>
				</div>
				<div className="col-xs-12 col-sm-12 col-lg-6">
					{/*<h4 className="text-center">Based on APE</h4>*/}
					<div style={{width:100 + '%', height:800 + 'px'}}>
						<div id="rd_ape" style={{width:100 + '%', height:100 + '%'}}></div>
						{/*{chart[1]}*/}
					</div>
				</div>
			</div>
			
			{/*{detail_graph}*/}
					<div className="row">
						<div className="col-xs-12 ">
							<h3 className="text-center">Information By Branch</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-xs-12 col-sm-12 col-lg-6">
							{/*<h4 className="text-center">Based on Case</h4>*/}
							<div style={{width:100 + '%', height:800 + 'px'}}>
								<div id="branch_case" style={{width:100 + '%', height:100 + '%'}}></div>
								{/*{chart[2]}*/}
							</div>
						</div>
						<div className="col-xs-12 col-sm-12 col-lg-6">
							{/*<h4 className="text-center">Based on APE</h4>*/}
							<div style={{width:100 + '%', height:800 + 'px'}}>
								<div id="branch_ape" style={{width:100 + '%', height:100 + '%'}}></div>
								{/*{chart[3]}*/}
							</div>
						</div>
					</div>

					<div className="row">
						<div className="col-xs-12 ">
							<h3 className="text-center">Information By Blue/Gold</h3>
						</div>
					</div>
					<div className="row">
						<div className="col-lg-offset-2 col-lg-4">
							<h4 className="text-center">Based on Case</h4>
							<div style={{width:100 + '%', height:300 + 'px'}}>
								{chart[0]}
							</div>
						</div>
						<div className="col-lg-4">
							<h4 className="text-center">Based on APE</h4>
							<div style={{width:100 + '%', height:300 + 'px'}}>
								{chart[1]}
							</div>
						</div>
					</div>
					<hr />	
			<div className="row">
				
				<div className="col-xs-12">
					<div style={{'overflowX':'auto', 'border':'1px solid #ddd'}}>
						<div id="graph_stacked" style={{minWidth:'310px', minHeight:'1000px', margin:'100 auto'}} ></div>
					</div>
				</div>
			</div>

		</div>
		);
	}
}

{/* Additional Configuration Starts Here  style="min-width: 310px; height: 400px; margin: 0 auto"*/}

const COLORS = ['blue', 'gold', 'red', 'pink', 'silver', 'green', 'tortoise', 'orange', 'purple', 'gray', 'magenta', '#666', '#999', '#333', '#3366CC',  '#DC3912',  '#FF9900',  '#109618', '#990099', '#3B3EAC', '#0099C6', '#DD4477', '#66AA00',   '#B82E2E', '#316395', '#994499', '#22AA99', '#AAAA11', '#6633CC', '#E67300', '#8B0707', '#329262', '#5574A6', '#3B3EAC'];

const data_production = [{name: 'Group A', value: 400}, {name: 'Group B', value: 300},
                  {name: 'Group C', value: 300}, {name: 'Group D', value: 200}];

const renderActiveShape = (props) => {
  const RADIAN = Math.PI / 180;
  const { cx, cy, midAngle, innerRadius, outerRadius, startAngle, endAngle,
    fill, payload, percent, value } = props;
  const sin = Math.sin(-RADIAN * midAngle);
  const cos = Math.cos(-RADIAN * midAngle);
  const sx = cx + (outerRadius + 10) * cos;
  const sy = cy + (outerRadius + 10) * sin;
  const mx = cx + (outerRadius + 30) * cos;
  const my = cy + (outerRadius + 30) * sin;
  const ex = mx + (cos >= 0 ? 1 : -1) * 22;
  const ey = my;
  const textAnchor = cos >= 0 ? 'start' : 'end';

  return (
    <g>
      <text className="payload_name" x={cx} y={40} dy={-10} textAnchor="middle" fill={fill}>{payload.name}</text>
	  <text x={cx} y={cy} dy={10} textAnchor="middle" fill="#0096A9">{`${MoneyFormat(value)}`}</text>
      <Sector
        cx={cx}
        cy={cy}
        innerRadius={innerRadius}
        outerRadius={outerRadius}
        startAngle={startAngle}
        endAngle={endAngle}
        fill={fill}
      />
      <Sector
        cx={cx}
        cy={cy}
        startAngle={startAngle}
        endAngle={endAngle}
        innerRadius={outerRadius + 6}
        outerRadius={outerRadius + 10}
        fill={fill}
      />
    </g>
  );
};




{/* Additional Configuration Ends Here */}



export default ProductionGraph;