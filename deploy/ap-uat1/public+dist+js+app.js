/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _reactDom = __webpack_require__(2);

	var _reactDom2 = _interopRequireDefault(_reactDom);

	var _login = __webpack_require__(3);

	var _login2 = _interopRequireDefault(_login);

	var _change_password = __webpack_require__(6);

	var _change_password2 = _interopRequireDefault(_change_password);

	var _index = __webpack_require__(7);

	var _index2 = _interopRequireDefault(_index);

	var _fc = __webpack_require__(28);

	var _fc2 = _interopRequireDefault(_fc);

	var _dm = __webpack_require__(37);

	var _dm2 = _interopRequireDefault(_dm);

	var _rm = __webpack_require__(46);

	var _rm2 = _interopRequireDefault(_rm);

	var _sm = __webpack_require__(50);

	var _sm2 = _interopRequireDefault(_sm);

	var _rd = __webpack_require__(53);

	var _rd2 = _interopRequireDefault(_rd);

	var _index_v = __webpack_require__(55);

	var _index_v2 = _interopRequireDefault(_index_v);

	var _index3 = __webpack_require__(61);

	var _index4 = _interopRequireDefault(_index3);

	var _index5 = __webpack_require__(65);

	var _index6 = _interopRequireDefault(_index5);

	var _index_detail = __webpack_require__(67);

	var _index_detail2 = _interopRequireDefault(_index_detail);

	var _production_report = __webpack_require__(68);

	var _production_report2 = _interopRequireDefault(_production_report);

	var _comission_slip = __webpack_require__(70);

	var _comission_slip2 = _interopRequireDefault(_comission_slip);

	var _reactRouter = __webpack_require__(72);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	/*
	import dashboardsm from './dashboard/indexsm';
	import dashboardrd from './dashboard/indexrd';
	import dashboardrm from './dashboard/indexrm';
	import dashboarddm from './dashboard/indexdm';
	<Route path="/dashboardsm" component={dashboardsm} />
	<Route path="/dashboardrm" component={dashboardrm} />
	<Route path="/dashboardrd" component={dashboardrd} />
	<Route path="/dashboarddm" component={dashboarddm} />
	*/

	_reactDom2.default.render(_react2.default.createElement(
	  _reactRouter.Router,
	  { history: _reactRouter.hashHistory },
	  _react2.default.createElement(_reactRouter.Route, { path: '/', component: _login2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/chpass', component: _change_password2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/dashboard_fc', component: _fc2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/dashboard_dm', component: _dm2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/dashboard_rm', component: _rm2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/dashboard_sm', component: _sm2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/dashboard_rd', component: _rd2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/management', component: _index_v2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/admin', component: _index4.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/profile', component: _index6.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/update_profile', component: _index_detail2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/report', component: _production_report2.default }),
	  _react2.default.createElement(_reactRouter.Route, { path: '/comission', component: _comission_slip2.default })
	), document.getElementById('container'));

/***/ },
/* 1 */
/***/ function(module, exports) {

	module.exports = React;

/***/ },
/* 2 */
/***/ function(module, exports) {

	module.exports = ReactDOM;

/***/ },
/* 3 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var login = function (_React$Component) {
		_inherits(login, _React$Component);

		function login(props) {
			_classCallCheck(this, login);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(login).call(this, props));

			_this.state = {
				username: "",
				password: "",
				status: "",
				islogin: false,
				dashboardRole: [5, 6, 7, 8, 9],
				managementRole: [1, 3, 4],
				adminRole: [2],
				dashboardMaps: [],
				usertype: "mo"
			};

			_this.componentDidMount = function () {
				_this.state.dashboardMaps[9] = "fc";
				_this.state.dashboardMaps[8] = "sm";
				_this.state.dashboardMaps[7] = "dm";
				_this.state.dashboardMaps[6] = "rm";
				_this.state.dashboardMaps[5] = "rd";
			};

			_this.handleSubmit = function (e) {
				e.preventDefault();
				_this.setState({ status: "" });
				var formData = new FormData();
				formData.append('username', _this.state.username);
				formData.append('password', _this.state.password);
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.authToken,
					data: formData,
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						$('#loading').modal('hide');
						console.log(response);
						if (response.status == "OK") {
							localStorage.setItem('token', response.token);
							localStorage.setItem('role', response.role);
							localStorage.setItem('tokenLastActivity', Date.now());
							localStorage.setItem('userrole', response.role);

							// buat agent
							if (_this.state.dashboardRole.indexOf(response.role) != -1) {
								window.location.href = window.location.href.split('#')[0] + '#/dashboard_' + _this.state.dashboardMaps[response.role];
							}

							// buat management
							else if (_this.state.managementRole.indexOf(response.role) != -1) {
									window.location.href = window.location.href.split('#')[0] + '#/management';
								}

								// buat admin
								else if (_this.state.adminRole.indexOf(response.role) != -1) {
										window.location.href = window.location.href.split('#')[0] + '#/admin';
									}
						} else {
							_this.setState({ status: response.status });
						}
					},
					error: function error(err, response) {
						$('#loading').modal('hide');
						if (err.responseJSON) {
							_this.setState({ status: err.responseJSON.status });
						}
					}
				});
			};

			_this.handleChangeUsername = function (e) {
				_this.setState({ username: e.target.value });
			};

			_this.handleChangePassword = function (e) {
				_this.setState({ password: e.target.value });
			};

			localStorage.clear();
			return _this;
		}

		_createClass(login, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'wrap2' },
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'formLogin' },
								React.createElement(
									'div',
									{ className: 'headerForm' },
									React.createElement(
										'div',
										{ className: 'logo' },
										React.createElement(
											'a',
											{ href: '#' },
											React.createElement('img', { src: 'assets/img/logo.png', width: '190', height: '64', alt: 'TOKIO MARINE' })
										)
									),
									React.createElement(
										'div',
										{ className: 'welcomeLogo' },
										'Selamat Datang di Agency Portal Tokio Marine Life Insurance Indonesia'
									)
								),
								React.createElement(
									'form',
									{ className: 'form-horizontal', onSubmit: this.handleSubmit },
									React.createElement(
										'div',
										{ classNameName: 'text-danger wrapper text-center' },
										this.state.status
									),
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ 'for': 'inputEmail3' },
											'Username'
										),
										React.createElement(
											'div',
											{ className: 'iconForm' },
											React.createElement('input', { type: 'text', className: 'form-control', id: 'inputEmail3', placeholder: 'Username', value: this.state.username, onChange: this.handleChangeUsername }),
											React.createElement('i', { className: 'fa fa-user' })
										),
										React.createElement('div', { className: 'clearfix h15' }),
										React.createElement(
											'label',
											{ 'for': 'inputPassword3' },
											'Password'
										),
										React.createElement(
											'div',
											{ className: 'iconForm' },
											React.createElement('input', { type: 'password', className: 'form-control', id: 'inputPassword3', placeholder: 'Password', value: this.state.password, onChange: this.handleChangePassword }),
											React.createElement('i', { className: 'fa fa-lock' })
										)
									),
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'div',
											{ className: 'col-sm-6' },
											React.createElement('div', { className: 'remember' })
										),
										React.createElement(
											'div',
											{ className: 'col-sm-6' },
											React.createElement(
												'button',
												{ type: 'submit', className: 'btn btn-primary btn-block', 'data-toggle': 'modal', 'data-target': '#loading' },
												'Sign in'
											)
										)
									)
								)
							)
						)
					),
					React.createElement(_loading2.default, null)
				);
			}
		}]);

		return login;
	}(React.Component);

	exports.default = login;

/***/ },
/* 4 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});
	var base_api = "http://api-apuat.tokiomarine-life.co.id/";

	var api_route = {
	    // Login and Token Related
	    authToken: base_api + 'auth/token/',
	    refreshToken: base_api + 'auth/refresh/',
	    verifyToken: base_api + 'auth/verify',
	    passwordRecovery: base_api + 'pass/recovery/',
	    passwordReset: base_api + 'pass/reset/',

	    // Dashboard Related
	    agentDashboard: base_api + 'agencies/agent/dashboard/',
	    agentDashboardv2: base_api + 'agencies/agent/dashboard/v2/',
	    agentDashboardSM: base_api + 'agencies/agent/dashboard/sm/',
	    agentDashboardDM: base_api + 'agencies/agent/dashboard/dm/',
	    agentDashboardRD: base_api + 'agencies/agent/dashboard/rd/',
	    agentDashboardRM: base_api + 'agencies/agent/dashboard/rm/',
	    managementDashboard: base_api + 'agencies/management/dashboard/',
	    branchDashboard: base_api + 'agencies/branch/dashboard/',
	    profile: base_api + 'agencies/agent/profile/',
	    new_business: base_api + 'agencies/popup/spaj/',
	    production_report_agent: base_api + 'report/agent/',
	    production_report_management: base_api + 'report/',
	    comissionSlip: base_api + 'agencies/agent/statement/commission/'
	};

	exports.default = api_route;

/***/ },
/* 5 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Loading = function (_React$Component) {
		_inherits(Loading, _React$Component);

		function Loading(props) {
			_classCallCheck(this, Loading);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Loading).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(Loading, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"div",
					{ className: "modal fade", id: "loading", tabindex: "-1", role: "dialog", "aria-labelledby": "myModalLabel" },
					React.createElement(
						"div",
						{ className: "modal-dialog" },
						React.createElement(
							"div",
							{ className: "modal-content loading" },
							React.createElement("i", { className: "fa fa-spinner fa-pulse" })
						)
					)
				);
			}
		}]);

		return Loading;
	}(React.Component);

	exports.default = Loading;

/***/ },
/* 6 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var change_password = function (_React$Component) {
		_inherits(change_password, _React$Component);

		function change_password(props) {
			_classCallCheck(this, change_password);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(change_password).call(this, props));

			_this.state = {
				password: "",
				confpassword: ""
			};
			return _this;
		}

		_createClass(change_password, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'app app-header-fixed ' },
					React.createElement(
						'div',
						{ className: 'container w-xxl w-auto-xs', style: { "padding": "20px", "background": "#FFF" } },
						React.createElement(
							'a',
							{ href: true, className: 'navbar-brand block m-t' },
							'Create Password'
						),
						React.createElement(
							'div',
							{ className: 'm-b-lg' },
							React.createElement(
								'form',
								{ name: 'form', className: 'form-validation', onSubmit: this.handleSubmit },
								React.createElement(
									'div',
									{ className: 'text-danger wrapper text-center' },
									this.state.status
								),
								React.createElement(
									'div',
									{ className: 'list-group list-group-sm' },
									React.createElement(
										'div',
										{ className: 'list-group-item' },
										React.createElement('input', { type: 'password', placeholder: 'New Password', className: 'form-control no-border', value: this.state.password, onChange: this.handleChangePassword })
									)
								),
								React.createElement(
									'div',
									{ className: 'list-group list-group-sm' },
									React.createElement(
										'div',
										{ className: 'list-group-item' },
										React.createElement('input', { type: 'password', placeholder: 'Confirm New Password', className: 'form-control no-border', value: this.state.confpassword, onChange: this.handleChangeConfpassword })
									)
								),
								React.createElement(
									'a',
									{ href: '#' },
									React.createElement(
										'button',
										{ type: 'button', className: 'btn btn-md btn-info', style: { float: "right" } },
										'Cancel'
									)
								),
								React.createElement(
									'button',
									{ type: 'submit', className: 'btn btn-md btn-info', style: { float: "right", margin: "0 25px" } },
									'Submit'
								)
							)
						)
					)
				);
			}
		}]);

		return change_password;
	}(React.Component);

	exports.default = change_password;

/***/ },
/* 7 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _top_menu = __webpack_require__(9);

	var _top_menu2 = _interopRequireDefault(_top_menu);

	var _menu_fc = __webpack_require__(10);

	var _menu_fc2 = _interopRequireDefault(_menu_fc);

	var _menu_rd = __webpack_require__(11);

	var _menu_rd2 = _interopRequireDefault(_menu_rd);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _mini_profile = __webpack_require__(13);

	var _mini_profile2 = _interopRequireDefault(_mini_profile);

	var _application_summary = __webpack_require__(14);

	var _application_summary2 = _interopRequireDefault(_application_summary);

	var _customer_policy_servicing = __webpack_require__(15);

	var _customer_policy_servicing2 = _interopRequireDefault(_customer_policy_servicing);

	var _commission_table = __webpack_require__(16);

	var _commission_table2 = _interopRequireDefault(_commission_table);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	//import LeftMenu from '../../common_components/menu/left_menu';


	var dashboard = function (_React$Component) {
		_inherits(dashboard, _React$Component);

		function dashboard(props) {
			_classCallCheck(this, dashboard);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(dashboard).call(this, props));

			_this.componentWillMount = function () {
				(0, _cek_auth2.default)();
			};

			_this.componentDidMount = function () {
				NProgress.start();
				$.ajax({
					url: _api_route2.default.agentDashboard,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						NProgress.done();
						_this.setState({ data: response });
					},
					error: function error(err, response) {
						NProgress.done();
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			_this.state = {
				data: null
			};
			return _this;
		}

		_createClass(dashboard, [{
			key: 'render',
			value: function render() {
				var If = React.createClass({
					displayName: 'If',

					render: function render() {
						if (this.props.renderPartial) {
							return React.createElement(
								'div',
								null,
								this.props.children
							);
						} else {
							return false;
						}
					}
				});
				var sideMenu = null;
				var role = localStorage.getItem("role");
				if (role == 9) {
					sideMenu = React.createElement(_menu_fc2.default, null);
				} else {
					sideMenu = React.createElement(_menu_rd2.default, null);
				}
				console.log(this.state.data);
				return React.createElement(
					'div',
					{ className: 'app app-header-fixed ' },
					React.createElement(_top_menu2.default, null),
					sideMenu,
					React.createElement(
						'div',
						{ id: 'content', className: 'app-content', role: 'main', style: { minHeight: "750px" } },
						React.createElement(
							'div',
							{ className: 'app-content-body ' },
							React.createElement(
								'div',
								{ className: 'hbox hbox-auto-xs hbox-auto-sm', 'ng-init': ' app.settings.asideFolded = false; app.settings.asideDock = false; ' },
								React.createElement(
									'div',
									{ className: 'col' },
									React.createElement(
										'div',
										{ className: 'bg-light lter b-b wrapper-md' },
										React.createElement(
											'div',
											{ className: 'row', style: { paddingLeft: "10px" } },
											'Dashboard Agent'
										)
									),
									React.createElement(
										'div',
										{ className: 'wrapper-md', 'ng-controller': 'FlotChartDemoCtrl' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-md-6', style: { marginTop: "0px" } },
												React.createElement(_mini_profile2.default, { data: this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-md-6', style: { position: "inherit !important" } },
												React.createElement(_application_summary2.default, { data: this.state.data })
											)
										),
										React.createElement(
											'div',
											{ className: 'panel wrapper', style: { padding: "15px 15px 0 0" } },
											React.createElement(_commission_table2.default, { data: this.state.data }),
											React.createElement(
												'div',
												{ className: 'row', style: { padding: "15px" } },
												'Additional Notes:',
												React.createElement('br', null),
												'1. Perhitungan diatas tidak final',
												React.createElement('br', null),
												'2. Perhitungan diatas belum dipotong pajak'
											)
										)
									)
								)
							)
						)
					),
					React.createElement(_footer2.default, null)
				);
			}
		}]);

		return dashboard;
	}(React.Component);

	exports.default = dashboard;

/***/ },
/* 8 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Footer = function (_React$Component) {
		_inherits(Footer, _React$Component);

		function Footer(props) {
			_classCallCheck(this, Footer);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Footer).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(Footer, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"div",
					{ className: "footer-wrapper" },
					React.createElement(
						"div",
						{ className: "footer" },
						React.createElement("div", { className: "disclaimer" }),
						React.createElement(
							"div",
							{ className: "copyright" },
							"© 2016 TMLI Agency Portal - Powered by TMLI"
						)
					)
				);
			}
		}]);

		return Footer;
	}(React.Component);

	exports.default = Footer;

/***/ },
/* 9 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TopMenu = function (_React$Component) {
		_inherits(TopMenu, _React$Component);

		function TopMenu(props) {
			_classCallCheck(this, TopMenu);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TopMenu).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(TopMenu, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"header",
					{ id: "header", className: "app-header navbar", role: "menu" },
					React.createElement(
						"div",
						{ className: "collapse pos-rlt navbar-collapse box-shadow bg-info", style: { marginLeft: "0", paddingLeft: "200px" } },
						React.createElement(
							"div",
							{ className: "nav navbar-nav hidden-xs" },
							React.createElement(
								"a",
								{ href: "#", className: "btn no-shadow navbar-btn", "ui-toggle-className": "show" },
								"Branch Office"
							)
						),
						React.createElement(
							"div",
							{ className: "nav navbar-nav navbar-right" },
							React.createElement(
								"div",
								{ className: "nav navbar-nav hidden-xs" },
								React.createElement(
									"a",
									{ href: "#", className: "btn no-shadow navbar-btn", "ui-toggle-className": "show" },
									"Log Out"
								)
							)
						)
					)
				);
			}
		}]);

		return TopMenu;
	}(React.Component);

	exports.default = TopMenu;

/***/ },
/* 10 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuFc = function (_React$Component) {
		_inherits(MenuFc, _React$Component);

		function MenuFc(props) {
			_classCallCheck(this, MenuFc);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuFc).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(MenuFc, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"aside",
					{ id: "aside", className: "app-aside hidden-xs bg-light" },
					React.createElement(
						"div",
						{ className: "aside-wrap" },
						React.createElement(
							"div",
							{ className: "navi-wrap" },
							React.createElement(
								"nav",
								{ "ui-nav": true, className: "navi clearfix" },
								React.createElement(
									"ul",
									{ className: "nav" },
									React.createElement(
										"li",
										{ className: "hidden-folded padder m-t m-b-sm text-muted text-xs" },
										React.createElement(
											"span",
											null,
											"Navigation"
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/profile", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Profile"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Inquiry"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"My Commission"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Reporting"
											)
										)
									),
									React.createElement("li", { className: "line dk" })
								)
							)
						)
					)
				);
			}
		}]);

		return MenuFc;
	}(React.Component);

	exports.default = MenuFc;

/***/ },
/* 11 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuRd = function (_React$Component) {
		_inherits(MenuRd, _React$Component);

		function MenuRd(props) {
			_classCallCheck(this, MenuRd);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuRd).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(MenuRd, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"aside",
					{ id: "aside", className: "app-aside hidden-xs bg-light" },
					React.createElement(
						"div",
						{ className: "aside-wrap" },
						React.createElement(
							"div",
							{ className: "navi-wrap" },
							React.createElement(
								"nav",
								{ "ui-nav": true, className: "navi clearfix" },
								React.createElement(
									"ul",
									{ className: "nav" },
									React.createElement(
										"li",
										{ className: "hidden-folded padder m-t m-b-sm text-muted text-xs" },
										React.createElement(
											"span",
											null,
											"Navigation"
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/profile", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Profile"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/profile", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Group Info"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/profile", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Family Tree"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Inquiry"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"My Commission"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Reporting"
											)
										)
									),
									React.createElement("li", { className: "line dk" })
								)
							)
						)
					)
				);
			}
		}]);

		return MenuRd;
	}(React.Component);

	exports.default = MenuRd;

/***/ },
/* 12 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	exports.default = CekAuth;

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function refreshToken() {
	  $.ajax({
	    beforeSend: function beforeSend(xhrObj) {
	      xhrObj.setRequestHeader("Content-Type", "application/json");
	      xhrObj.setRequestHeader("Accept", "application/json");
	    },
	    url: _api_route2.default.refreshToken,
	    data: { "token": sessionStorage.getItem('token') },
	    dataType: "json",
	    contentType: "application/json",
	    type: 'POST',
	    success: function success(response) {
	      if (response.status == "OK") {
	        localStorage.setItem('token', response.token);
	        localStorage.setItem('tokenLastActivity', Date.now());
	        console.log(response);
	      } else {
	        console.log(response);
	      }
	    },
	    error: function error(err, response) {
	      if (err.responseJSON) {
	        console.log(response);
	      }
	    }
	  });
	}

	// for dev only
	function relogin() {
	  var _this = this;

	  var formData = new FormData();
	  formData.append('username', "devtest");
	  formData.append('password', "devtest");
	  $.ajax({
	    url: _api_route2.default.authToken,
	    data: formData,
	    processData: false,
	    contentType: false,
	    type: 'POST',
	    success: function success(response) {
	      if (response.status == "OK") {
	        localStorage.setItem('token', response.token);
	        localStorage.setItem('tokenLastActivity', Date.now());
	      } else {
	        _this.setState({ status: response.status });
	      }
	    },
	    error: function error(err, response) {
	      if (err.responseJSON) {
	        _this.setState({ status: err.responseJSON.status });
	      }
	    }
	  });
	}

	function CekAuth() {
	  if (!sessionStorage.getItem('token')) {
	    //if no token then redirect to login page
	    window.location.href = window.location.href.split('#')[0] + '#/';
	  } else {
	    /*=========================================================
	    / Todo cek time diff to update token expiry or delete token
	    /========================================================*/

	    //update tokenLastActivity
	    // refreshToken();
	    //relogin();
	    localStorage.setItem('tokenLastActivity', Date.now());
	  }
	}

/***/ },
/* 13 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MiniProfile = function (_React$Component) {
	  _inherits(MiniProfile, _React$Component);

	  function MiniProfile(props) {
	    _classCallCheck(this, MiniProfile);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MiniProfile).call(this, props));

	    _this.state = {
	      agent_name: null,
	      agent_code: null,
	      agent_level: null,
	      agent_status: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          agent_name: p.data.common_data.name,
	          agent_code: p.data.common_data.code,
	          agent_level: p.data.common_data.level,
	          agent_status: p.data.common_data.agent_data.status
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(MiniProfile, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "panel no-border col-md-12", style: { float: "left", padding: "20px", width: "100%" } },
	        React.createElement(
	          "div",
	          { className: "col-md-4" },
	          React.createElement(
	            "div",
	            { style: { textAlign: "center", paddingBottom: "10px" } },
	            "My Profile"
	          ),
	          React.createElement(
	            "div",
	            null,
	            React.createElement("img", { src: "http://placehold.it/140x200", width: "140px", height: "200px" })
	          )
	        ),
	        React.createElement(
	          "div",
	          { className: "col-md-8" },
	          React.createElement(
	            "div",
	            { style: { paddingBottom: "10px" } },
	            " "
	          ),
	          React.createElement(
	            "div",
	            { className: "row", style: { paddingBottom: "10px" } },
	            React.createElement(
	              "div",
	              { className: "col-md-4" },
	              "Agent Name :"
	            ),
	            React.createElement(
	              "div",
	              { className: "col-md-8" },
	              React.createElement("input", { type: "text", value: this.state.agent_name, style: { width: "100%" }, disabled: true })
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "row", style: { paddingBottom: "10px" } },
	            React.createElement(
	              "div",
	              { className: "col-md-4" },
	              "Agent Code :"
	            ),
	            React.createElement(
	              "div",
	              { className: "col-md-8" },
	              React.createElement("input", { type: "text", value: this.state.agent_code, style: { width: "100%" }, disabled: true })
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "row", style: { paddingBottom: "10px" } },
	            React.createElement(
	              "div",
	              { className: "col-md-4" },
	              "Agent Level :"
	            ),
	            React.createElement(
	              "div",
	              { className: "col-md-8" },
	              React.createElement("input", { type: "text", value: this.state.agent_level, style: { width: "100%" }, disabled: true })
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "row", style: { paddingBottom: "10px" } },
	            React.createElement(
	              "div",
	              { className: "col-md-4" },
	              "Agent Status :"
	            ),
	            React.createElement(
	              "div",
	              { className: "col-md-8" },
	              React.createElement("input", { type: "text", value: this.state.agent_status, style: { width: "100%" }, disabled: true })
	            )
	          ),
	          React.createElement(
	            "div",
	            { className: "row", style: { paddingBottom: "10px" } },
	            React.createElement(
	              "div",
	              { className: "col-md-4" },
	              " "
	            ),
	            React.createElement(
	              "div",
	              { className: "col-md-8", style: { textAlign: "right" } },
	              React.createElement(
	                "a",
	                { href: "#" },
	                "View More ..."
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return MiniProfile;
	}(React.Component);

	exports.default = MiniProfile;

/***/ },
/* 14 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ApplicationSummary = function (_React$Component) {
	  _inherits(ApplicationSummary, _React$Component);

	  function ApplicationSummary(props) {
	    _classCallCheck(this, ApplicationSummary);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ApplicationSummary).call(this, props));

	    _this.state = {
	      submit: null,
	      inforce: null,
	      waiting: null,
	      pending: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          submit: p.data.common_data.spaj_summary.submit,
	          inforce: p.data.common_data.spaj_summary.inforce,
	          waiting: p.data.common_data.spaj_summary.entry_queue,
	          pending: p.data.common_data.spaj_summary.pending
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(ApplicationSummary, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "panel panel-default" },
	        React.createElement(
	          "div",
	          { className: "panel-heading" },
	          "Application"
	        ),
	        React.createElement(
	          "table",
	          { className: "table table-striped m-b-none" },
	          React.createElement(
	            "thead",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "th",
	                null,
	                "Status SPAJ"
	              ),
	              React.createElement(
	                "th",
	                null,
	                "Total SPAJ"
	              )
	            )
	          ),
	          React.createElement(
	            "tbody",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                React.createElement(
	                  "div",
	                  { className: "m-t-xs m-b-none" },
	                  "Submit"
	                )
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.submit
	              )
	            ),
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                React.createElement(
	                  "div",
	                  { className: "m-t-xs m-b-none" },
	                  "Inforce"
	                )
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.inforce
	              )
	            ),
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                React.createElement(
	                  "div",
	                  { className: "m-t-xs m-b-none" },
	                  "Waiting for Data Entry"
	                )
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.waiting
	              )
	            ),
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                React.createElement(
	                  "div",
	                  { className: "m-t-xs m-b-none" },
	                  "Pending"
	                )
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.pending,
	                React.createElement(
	                  "a",
	                  { href: "#", style: { float: "right" } },
	                  "View Details ..."
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return ApplicationSummary;
	}(React.Component);

	exports.default = ApplicationSummary;

/***/ },
/* 15 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CustomerPolicyServicing = function (_React$Component) {
	  _inherits(CustomerPolicyServicing, _React$Component);

	  function CustomerPolicyServicing(props) {
	    _classCallCheck(this, CustomerPolicyServicing);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomerPolicyServicing).call(this, props));

	    _this.state = {};
	    return _this;
	  }

	  _createClass(CustomerPolicyServicing, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "panel panel-default" },
	        React.createElement(
	          "div",
	          { className: "panel-heading" },
	          "Customer Policy Servicing"
	        ),
	        React.createElement(
	          "table",
	          { className: "table table-striped m-b-none" },
	          React.createElement(
	            "thead",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "th",
	                null,
	                "Transaction"
	              ),
	              React.createElement(
	                "th",
	                null,
	                "Status"
	              ),
	              React.createElement(
	                "th",
	                null,
	                "Total Policy"
	              )
	            )
	          ),
	          React.createElement(
	            "tbody",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                React.createElement(
	                  "div",
	                  { className: "m-t-xs m-b-none" },
	                  "Claim"
	                )
	              ),
	              React.createElement(
	                "td",
	                null,
	                "Pending"
	              ),
	              React.createElement(
	                "td",
	                null,
	                "25 ",
	                React.createElement(
	                  "a",
	                  { href: "#", style: { float: "right" } },
	                  "View Details ..."
	                )
	              )
	            ),
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                React.createElement(
	                  "div",
	                  { className: "m-t-xs m-b-none" },
	                  "Policy Holder Services"
	                )
	              ),
	              React.createElement(
	                "td",
	                null,
	                "Pending"
	              ),
	              React.createElement(
	                "td",
	                null,
	                "50 ",
	                React.createElement(
	                  "a",
	                  { href: "#", style: { float: "right" } },
	                  "View Details ..."
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return CustomerPolicyServicing;
	}(React.Component);

	exports.default = CustomerPolicyServicing;

/***/ },
/* 16 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _commission_fc = __webpack_require__(17);

	var _commission_fc2 = _interopRequireDefault(_commission_fc);

	var _commission_sm = __webpack_require__(21);

	var _commission_sm2 = _interopRequireDefault(_commission_sm);

	var _commission_rd = __webpack_require__(25);

	var _commission_rd2 = _interopRequireDefault(_commission_rd);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CommissionTable = function (_React$Component) {
	  _inherits(CommissionTable, _React$Component);

	  function CommissionTable(props) {
	    _classCallCheck(this, CommissionTable);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommissionTable).call(this, props));

	    _this.state = {
	      data: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      _this.setState({
	        data: p.data
	      });
	    };

	    return _this;
	  }

	  _createClass(CommissionTable, [{
	    key: 'render',
	    value: function render() {
	      var content = null;
	      var level = localStorage.getItem("role");
	      console.log(this.state.data);
	      if (level == 9) {
	        content = React.createElement(_commission_fc2.default, { data: this.state.data });
	      } else if (level == 6 || level == 7 || level == 8) {
	        content = React.createElement(_commission_sm2.default, { data: this.state.data });
	      } else if (level == 5) {
	        content = React.createElement(_commission_rd2.default, { data: this.state.data });
	      }

	      return React.createElement(
	        'div',
	        null,
	        content
	      );
	    }
	  }]);

	  return CommissionTable;
	}(React.Component);

	exports.default = CommissionTable;

/***/ },
/* 17 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _basic_commission_fc = __webpack_require__(19);

	var _basic_commission_fc2 = _interopRequireDefault(_basic_commission_fc);

	var _basic_commission_fc3 = __webpack_require__(20);

	var _basic_commission_fc4 = _interopRequireDefault(_basic_commission_fc3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CommissionFc = function (_React$Component) {
	  _inherits(CommissionFc, _React$Component);

	  function CommissionFc(props) {
	    _classCallCheck(this, CommissionFc);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommissionFc).call(this, props));

	    _this.state = {
	      data: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          data: p.data
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(CommissionFc, [{
	    key: 'render',
	    value: function render() {

	      var weekly_qc_bonus = [];
	      if (this.state.data) {
	        $.map(this.state.data.specific_data.weekly_qc_bonus_table, function (value, index) {
	          var row = null;
	          if (index == 0) {
	            row = React.createElement(
	              'tr',
	              { style: { color: "red" } },
	              React.createElement(
	                'td',
	                null,
	                value.total_qc
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.percentage
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.bonus
	              )
	            );
	          } else {
	            row = React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'td',
	                null,
	                value.total_qc
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.percentage
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.bonus
	              )
	            );
	          }
	          weekly_qc_bonus.push(row);
	        });
	      }

	      var weekly_fyc_bonus = [];
	      if (this.state.data) {
	        $.map(this.state.data.specific_data.weekly_fyc_bonus_table, function (value, index) {
	          var row = null;
	          if (index == 0) {
	            row = React.createElement(
	              'tr',
	              { style: { color: "red" } },
	              React.createElement(
	                'td',
	                null,
	                value.total_fyc
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.percentage
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.bonus
	              )
	            );
	          } else {
	            row = React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'td',
	                null,
	                value.total_fyc
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.percentage
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.bonus
	              )
	            );
	          }
	          weekly_fyc_bonus.push(row);
	        });
	      }

	      var yebo_qc_bonus = [];
	      if (this.state.data) {
	        $.map(this.state.data.specific_data.yebo_qc_bonus_table, function (value, index) {
	          var row = null;
	          if (index == 0) {
	            row = React.createElement(
	              'tr',
	              { style: { color: "red" } },
	              React.createElement(
	                'td',
	                null,
	                value.total_qc
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.percentage
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.bonus
	              )
	            );
	          } else {
	            row = React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'td',
	                null,
	                value.total_qc
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.percentage
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.bonus
	              )
	            );
	          }
	          yebo_qc_bonus.push(row);
	        });
	      }

	      var yebo_fyc_bonus = [];
	      if (this.state.data) {
	        $.map(this.state.data.specific_data.yebo_fyc_bonus_table, function (value, index) {
	          var row = null;
	          if (index == 0) {
	            row = React.createElement(
	              'tr',
	              { style: { color: "red" } },
	              React.createElement(
	                'td',
	                null,
	                value.total_qc
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.percentage
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.bonus
	              )
	            );
	          } else {
	            row = React.createElement(
	              'tr',
	              null,
	              React.createElement(
	                'td',
	                null,
	                value.total_qc
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.percentage
	              ),
	              React.createElement(
	                'td',
	                null,
	                value.bonus
	              )
	            );
	          }
	          yebo_fyc_bonus.push(row);
	        });
	      }

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'row', style: { marginLeft: "0px" } },
	          React.createElement(_basic_commission_fc4.default, { data: this.props.data }),
	          React.createElement(
	            'div',
	            { className: 'col-md-6 b-r b-light no-border-xs', style: { textAlign: "center", paddingLeft: "5px" } },
	            'My weekly bonus per today:',
	            React.createElement(
	              'div',
	              { className: 'row' },
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement(
	                  'div',
	                  { className: 'panel panel-default' },
	                  React.createElement(
	                    'div',
	                    { className: 'panel-heading' },
	                    'Based on QC'
	                  ),
	                  React.createElement(
	                    'table',
	                    { className: 'table table-striped m-b-none' },
	                    React.createElement(
	                      'thead',
	                      null,
	                      React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                          'th',
	                          null,
	                          'Total 12 Rolling week QC'
	                        ),
	                        React.createElement(
	                          'th',
	                          null,
	                          '%'
	                        ),
	                        React.createElement(
	                          'th',
	                          null,
	                          'Bonus'
	                        )
	                      )
	                    ),
	                    React.createElement(
	                      'tbody',
	                      null,
	                      weekly_qc_bonus
	                    )
	                  )
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement(
	                  'div',
	                  { className: 'panel panel-default' },
	                  React.createElement(
	                    'div',
	                    { className: 'panel-heading' },
	                    'Based on FYC'
	                  ),
	                  React.createElement(
	                    'table',
	                    { className: 'table table-striped m-b-none' },
	                    React.createElement(
	                      'thead',
	                      null,
	                      React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                          'th',
	                          null,
	                          'Total 12 Rolling week FYC'
	                        ),
	                        React.createElement(
	                          'th',
	                          null,
	                          '%'
	                        ),
	                        React.createElement(
	                          'th',
	                          null,
	                          'Bonus'
	                        )
	                      )
	                    ),
	                    React.createElement(
	                      'tbody',
	                      null,
	                      weekly_fyc_bonus
	                    )
	                  )
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-6', style: { textAlign: "center", paddingLeft: "5px" } },
	            'My year end bonus per today:',
	            React.createElement(
	              'div',
	              { className: 'row' },
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement(
	                  'div',
	                  { className: 'panel panel-default' },
	                  React.createElement(
	                    'div',
	                    { className: 'panel-heading' },
	                    'Based on QC'
	                  ),
	                  React.createElement(
	                    'table',
	                    { className: 'table table-striped m-b-none' },
	                    React.createElement(
	                      'thead',
	                      null,
	                      React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                          'th',
	                          null,
	                          'Total QC (year to date)'
	                        ),
	                        React.createElement(
	                          'th',
	                          null,
	                          '%'
	                        ),
	                        React.createElement(
	                          'th',
	                          null,
	                          'Year End Bonus'
	                        )
	                      )
	                    ),
	                    React.createElement(
	                      'tbody',
	                      null,
	                      yebo_qc_bonus
	                    )
	                  )
	                )
	              ),
	              React.createElement(
	                'div',
	                { className: 'col-md-6' },
	                React.createElement(
	                  'div',
	                  { className: 'panel panel-default' },
	                  React.createElement(
	                    'div',
	                    { className: 'panel-heading' },
	                    'Based on FYC'
	                  ),
	                  React.createElement(
	                    'table',
	                    { className: 'table table-striped m-b-none' },
	                    React.createElement(
	                      'thead',
	                      null,
	                      React.createElement(
	                        'tr',
	                        null,
	                        React.createElement(
	                          'th',
	                          null,
	                          'Total FYC (year to date)'
	                        ),
	                        React.createElement(
	                          'th',
	                          null,
	                          '%'
	                        ),
	                        React.createElement(
	                          'th',
	                          null,
	                          'Year End Bonus'
	                        )
	                      )
	                    ),
	                    React.createElement(
	                      'tbody',
	                      null,
	                      yebo_fyc_bonus
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return CommissionFc;
	}(React.Component);

	exports.default = CommissionFc;

/***/ },
/* 18 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	      value: true
	});
	exports.MoneyFormat = MoneyFormat;
	exports.decimalFormat = decimalFormat;
	exports.DateFormat = DateFormat;
	exports.UserLevelMap = UserLevelMap;
	exports.CheckAgentType = CheckAgentType;
	function MoneyFormat(number) {
	      number = parseFloat(number);
	      return number != null ? number.toString().replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,") : null;
	}

	function decimalFormat(number) {
	      console.log(number);
	      if (number == '-') {
	            number = 0;
	      }
	      number = parseFloat(number);

	      return number != null && number > 0 ? number.toFixed(2) : number;
	}

	function DateFormat(p_date) {
	      if (p_date) {
	            var new_date = new Date(p_date);
	            var dd = new_date.getDate();
	            var mm = new_date.getMonth() + 1; //January is 0!
	            var yyyy = new_date.getFullYear();
	            if (dd < 10) {
	                  dd = '0' + dd;
	            }
	            if (mm < 10) {
	                  mm = '0' + mm;
	            }

	            return dd + '-' + mm + '-' + yyyy;
	      } else {
	            return null;
	      }
	}

	function UserLevelMap(id) {
	      var userList = ["Tokio Marine Management", "Branch Admin", "Senior Regional Sales Head", "Regional Sales Head", "Regional Director", "Regional Manager", "District Manager", "Sales Manager", "Financial Consultant"];
	      return userList[id - 1];
	}

	function CheckAgentType(code) {
	      switch (parseInt(code.charAt(0))) {
	            case 8:
	                  return "MO";
	                  break;
	            case 6:
	                  return "SO";
	                  break;
	            case 9:
	                  return "BA";
	                  break;

	      }
	}

/***/ },
/* 19 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BasicCommissionFc1 = function (_React$Component) {
	  _inherits(BasicCommissionFc1, _React$Component);

	  function BasicCommissionFc1(props) {
	    _classCallCheck(this, BasicCommissionFc1);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BasicCommissionFc1).call(this, props));

	    _this.state = {
	      basic_commission: null,
	      fyc: null,
	      ecp1: null,
	      ecp2: null,
	      qc: null,
	      acp1: null,
	      acp2: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          basic_commission: p.data.common_data.basic_comission,
	          fyc: p.data.common_data.fyc_rolling,
	          ecp1: p.data.common_data.ecp1,
	          ecp2: p.data.common_data.ecp2,
	          qc: p.data.common_data.qc_rolling,
	          acp1: p.data.common_data.acp1,
	          acp2: p.data.common_data.acp2
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(BasicCommissionFc1, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'span',
	        null,
	        React.createElement(
	          'div',
	          { className: 'row', style: { paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4 col-md-offset-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'Basic Commission'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.basic_commission), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row col-md-10 col-md-offset-1', style: { paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'FYC'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyc), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'ECP (1)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.ecp1), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'ECP (2)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.ecp2), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row col-md-10 col-md-offset-1', style: { paddingBottom: "5px", borderBottom: "thin solid #000000" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'QC'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: this.state.qc, disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'ACP (1)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.acp1), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'ACP (2)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.acp2), disabled: true })
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return BasicCommissionFc1;
	}(React.Component);

	exports.default = BasicCommissionFc1;

/***/ },
/* 20 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BasicCommissionFc1 = function (_React$Component) {
	  _inherits(BasicCommissionFc1, _React$Component);

	  function BasicCommissionFc1(props) {
	    _classCallCheck(this, BasicCommissionFc1);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BasicCommissionFc1).call(this, props));

	    _this.state = {
	      basic_commission: null,
	      fyc_weekly_to_date: null,

	      fyc_rolling: null,
	      qc_rolling: null,
	      fyc_year: null,
	      qc_year: null,

	      fyp_month: null,
	      afyp_month: null,
	      fyp_year: null,
	      afyp_year: null,

	      ecp1: null,
	      ecp2: null,
	      acp1: null,
	      acp2: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          basic_commission: p.data.common_data.basic_comission,
	          fyc_weekly_to_date: p.data.common_data.fyc_weekly_to_date,

	          fyc_rolling: p.data.common_data.fyc_rolling,
	          qc_rolling: p.data.common_data.qc_rolling,
	          fyc_year: p.data.common_data.fyc_year,
	          qc_year: p.data.common_data.qc_year,

	          fyp_month: p.data.common_data.fyp_month,
	          afyp_month: p.data.common_data.afyp_month,
	          fyp_year: p.data.common_data.fyp_year,
	          afyp_year: p.data.common_data.afyp_year,

	          ecp1: p.data.common_data.ecp1,
	          ecp2: p.data.common_data.ecp2,
	          acp1: p.data.common_data.acp1,
	          acp2: p.data.common_data.acp2
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(BasicCommissionFc1, [{
	    key: 'render',
	    value: function render() {

	      return React.createElement(
	        'div',
	        null,
	        React.createElement(
	          'div',
	          { className: 'row col-md-12', style: { paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4 col-md-offset-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'FYC (Weekly to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyc_weekly_to_date), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row col-md-12', style: { paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'FYC (12 rolling week)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyc_rolling), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'FYP (Month to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyp_month), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'ECP (1)(Month to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.ecp1), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row col-md-12', style: { paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'QC (12 rolling week)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.qc_rolling), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'AFYP (Month to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.afyp_month), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'ACP (1)(Month to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.acp1), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row col-md-12', style: { paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'FYC (Year to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyc_year), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'FYP (Year to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyp_year), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'ECP (2)(Month to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.ecp2), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row col-md-12', style: { paddingBottom: "5px", borderBottom: "thin solid #000000" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'QC (Year to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: this.state.qc_year, disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'AFYP (Year to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.afyp_year), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              'ACP (2)(Month to date)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.acp2), disabled: true })
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return BasicCommissionFc1;
	}(React.Component);

	exports.default = BasicCommissionFc1;

/***/ },
/* 21 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _basic_commission_fc = __webpack_require__(19);

	var _basic_commission_fc2 = _interopRequireDefault(_basic_commission_fc);

	var _basic_commission_fc3 = __webpack_require__(20);

	var _basic_commission_fc4 = _interopRequireDefault(_basic_commission_fc3);

	var _monthly_overriding_sm = __webpack_require__(22);

	var _monthly_overriding_sm2 = _interopRequireDefault(_monthly_overriding_sm);

	var _monthly_overriding_rm = __webpack_require__(23);

	var _monthly_overriding_rm2 = _interopRequireDefault(_monthly_overriding_rm);

	var _monthly_overriding_dm = __webpack_require__(24);

	var _monthly_overriding_dm2 = _interopRequireDefault(_monthly_overriding_dm);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CommissionSm = function (_React$Component) {
	  _inherits(CommissionSm, _React$Component);

	  function CommissionSm(props) {
	    _classCallCheck(this, CommissionSm);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommissionSm).call(this, props));

	    _this.state = {
	      data: null,
	      or: null,
	      fc_or: null,
	      fc: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          data: p.data,
	          or: p.data.specific_data.overriding_bonus.or,
	          fc_or: p.data.specific_data.overriding_bonus.fc_or,
	          fc: p.data.specific_data.overriding_detail.fc
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(CommissionSm, [{
	    key: 'render',
	    value: function render() {
	      var role = localStorage.getItem("role");
	      var tabel = [];
	      if (role == 8) {
	        tabel.push(React.createElement(_monthly_overriding_rm2.default, { data: this.state.data }));
	        tabel.push(React.createElement(_monthly_overriding_dm2.default, { data: this.state.data }));
	      } else if (role == 6) {
	        tabel.push(React.createElement(_monthly_overriding_sm2.default, { data: this.state.data }));
	        tabel.push(React.createElement(_monthly_overriding_dm2.default, { data: this.state.data }));
	      } else if (role == 7) {
	        tabel.push(React.createElement(_monthly_overriding_sm2.default, { data: this.state.data }));
	        tabel.push(React.createElement(_monthly_overriding_rm2.default, { data: this.state.data }));
	      }
	      return React.createElement(
	        'div',
	        { className: 'row', style: { marginLeft: "0px", textAlign: "center" } },
	        React.createElement(_basic_commission_fc4.default, { data: this.props.data }),
	        React.createElement(
	          'div',
	          { className: 'row', style: { paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4 col-md-offset-4', style: { color: "red", padding: "20px" } },
	            'My Monthly Overriding Bonus : Rp. ',
	            (0, _formatter.MoneyFormat)(this.state.or)
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row', style: { paddingBottom: "5px", marginRight: "0px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-4' },
	            React.createElement(
	              'div',
	              { className: 'row', style: { paddingBottom: "15px" } },
	              'Total OR bonus based on FC productivity (month to date):',
	              React.createElement('br', null),
	              React.createElement(
	                'span',
	                { style: { color: "red" } },
	                'Rp. ',
	                (0, _formatter.MoneyFormat)(this.state.fc_or)
	              )
	            ),
	            React.createElement(
	              'div',
	              { className: 'panel panel-default' },
	              React.createElement(
	                'div',
	                { className: 'panel-heading' },
	                'Overriding bonus Based on FC productivity (weekly):'
	              ),
	              React.createElement(
	                'table',
	                { className: 'table table-striped m-b-none' },
	                React.createElement(
	                  'thead',
	                  null,
	                  React.createElement(
	                    'tr',
	                    null,
	                    React.createElement(
	                      'th',
	                      { style: { textAlign: "center" } },
	                      'Total weekly Active Agent'
	                    ),
	                    React.createElement(
	                      'th',
	                      { style: { textAlign: "center" } },
	                      'Total OR Bonus'
	                    )
	                  )
	                ),
	                React.createElement(
	                  'tbody',
	                  null,
	                  React.createElement(
	                    'tr',
	                    null,
	                    React.createElement(
	                      'td',
	                      null,
	                      React.createElement(
	                        'div',
	                        { className: 'm-t-xs m-b-none' },
	                        this.state.fc != null && this.state.fc.active_agent
	                      )
	                    ),
	                    React.createElement(
	                      'td',
	                      null,
	                      this.state.fc != null && (0, _formatter.MoneyFormat)(this.state.fc.total_or_bonus)
	                    )
	                  )
	                )
	              )
	            )
	          ),
	          tabel
	        )
	      );
	    }
	  }]);

	  return CommissionSm;
	}(React.Component);

	exports.default = CommissionSm;

/***/ },
/* 22 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MonthlyOverridingSm = function (_React$Component) {
	  _inherits(MonthlyOverridingSm, _React$Component);

	  function MonthlyOverridingSm(props) {
	    _classCallCheck(this, MonthlyOverridingSm);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MonthlyOverridingSm).call(this, props));

	    _this.state = {
	      data: null,
	      sm_or: null,
	      sm: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          data: p.data,
	          sm_or: p.data.specific_data.overriding_bonus.sm_or,
	          sm: p.data.specific_data.overriding_detail.sm
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(MonthlyOverridingSm, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'col-md-4' },
	        React.createElement(
	          'div',
	          { className: 'row', style: { paddingBottom: "15px" } },
	          'Monthly Overriding bonus based on SM',
	          React.createElement('br', null),
	          'productivity : ',
	          React.createElement(
	            'span',
	            { style: { color: "red" } },
	            'Rp. ',
	            (0, _formatter.MoneyFormat)(this.state.sm_or)
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'panel panel-default' },
	          React.createElement(
	            'div',
	            { className: 'panel-heading' },
	            'SM Overriding Bonus (month to date):'
	          ),
	          React.createElement(
	            'table',
	            { className: 'table table-striped m-b-none' },
	            React.createElement(
	              'thead',
	              null,
	              React.createElement(
	                'tr',
	                null,
	                React.createElement(
	                  'th',
	                  { style: { textAlign: "center" } },
	                  'Level'
	                ),
	                React.createElement(
	                  'th',
	                  { style: { textAlign: "center" } },
	                  'Total OR Bonus'
	                )
	              )
	            ),
	            React.createElement(
	              'tbody',
	              null,
	              React.createElement(
	                'tr',
	                null,
	                React.createElement(
	                  'td',
	                  null,
	                  React.createElement(
	                    'div',
	                    { className: 'm-t-xs m-b-none' },
	                    'SM'
	                  )
	                ),
	                React.createElement(
	                  'td',
	                  null,
	                  this.state.sm != null && (0, _formatter.MoneyFormat)(this.state.sm.total_or_bonus)
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return MonthlyOverridingSm;
	}(React.Component);

	exports.default = MonthlyOverridingSm;

/***/ },
/* 23 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MonthlyOverridingRm = function (_React$Component) {
	  _inherits(MonthlyOverridingRm, _React$Component);

	  function MonthlyOverridingRm(props) {
	    _classCallCheck(this, MonthlyOverridingRm);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MonthlyOverridingRm).call(this, props));

	    _this.state = {
	      data: null,
	      rm_or: null,
	      rm: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          data: p.data,
	          rm_or: p.data.specific_data.overriding_bonus.rm_or,
	          rm: p.data.specific_data.overriding_detail.rm
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(MonthlyOverridingRm, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'col-md-4' },
	        React.createElement(
	          'div',
	          { className: 'row', style: { paddingBottom: "15px" } },
	          'Monthly Overriding bonus based on RM',
	          React.createElement('br', null),
	          'productivity : ',
	          React.createElement(
	            'span',
	            { style: { color: "red" } },
	            'Rp. ',
	            (0, _formatter.MoneyFormat)(this.state.rm_or)
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'panel panel-default' },
	          React.createElement(
	            'div',
	            { className: 'panel-heading' },
	            'RM Overriding Bonus (month to date):'
	          ),
	          React.createElement(
	            'table',
	            { className: 'table table-striped m-b-none' },
	            React.createElement(
	              'thead',
	              null,
	              React.createElement(
	                'tr',
	                null,
	                React.createElement(
	                  'th',
	                  { style: { textAlign: "center" } },
	                  'Level'
	                ),
	                React.createElement(
	                  'th',
	                  { style: { textAlign: "center" } },
	                  'Total OR Bonus'
	                )
	              )
	            ),
	            React.createElement(
	              'tbody',
	              null,
	              React.createElement(
	                'tr',
	                null,
	                React.createElement(
	                  'td',
	                  null,
	                  React.createElement(
	                    'div',
	                    { className: 'm-t-xs m-b-none' },
	                    'RM'
	                  )
	                ),
	                React.createElement(
	                  'td',
	                  null,
	                  this.state.rm != null && (0, _formatter.MoneyFormat)(this.state.rm.total_or_bonus)
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return MonthlyOverridingRm;
	}(React.Component);

	exports.default = MonthlyOverridingRm;

/***/ },
/* 24 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MonthlyOverridingDm = function (_React$Component) {
	  _inherits(MonthlyOverridingDm, _React$Component);

	  function MonthlyOverridingDm(props) {
	    _classCallCheck(this, MonthlyOverridingDm);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MonthlyOverridingDm).call(this, props));

	    _this.state = {
	      data: null,
	      dm_or: null,
	      dm: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          data: p.data,
	          dm_or: p.data.specific_data.overriding_bonus.dm_or,
	          dm: p.data.specific_data.overriding_detail.dm
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(MonthlyOverridingDm, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'col-md-4' },
	        React.createElement(
	          'div',
	          { className: 'row', style: { paddingBottom: "15px" } },
	          'Monthly Overriding bonus based on DM',
	          React.createElement('br', null),
	          'productivity : ',
	          React.createElement(
	            'span',
	            { style: { color: "red" } },
	            'Rp. ',
	            (0, _formatter.MoneyFormat)(this.state.dm_or)
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'panel panel-default' },
	          React.createElement(
	            'div',
	            { className: 'panel-heading' },
	            'DM Overriding Bonus (month to date):'
	          ),
	          React.createElement(
	            'table',
	            { className: 'table table-striped m-b-none' },
	            React.createElement(
	              'thead',
	              null,
	              React.createElement(
	                'tr',
	                null,
	                React.createElement(
	                  'th',
	                  { style: { textAlign: "center" } },
	                  'Level'
	                ),
	                React.createElement(
	                  'th',
	                  { style: { textAlign: "center" } },
	                  'Total OR Bonus'
	                )
	              )
	            ),
	            React.createElement(
	              'tbody',
	              null,
	              React.createElement(
	                'tr',
	                null,
	                React.createElement(
	                  'td',
	                  null,
	                  React.createElement(
	                    'div',
	                    { className: 'm-t-xs m-b-none' },
	                    'DM'
	                  )
	                ),
	                React.createElement(
	                  'td',
	                  null,
	                  this.state.dm != null && (0, _formatter.MoneyFormat)(this.state.dm.total_or_bonus)
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return MonthlyOverridingDm;
	}(React.Component);

	exports.default = MonthlyOverridingDm;

/***/ },
/* 25 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	    value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _basic_commission_rd = __webpack_require__(26);

	var _basic_commission_rd2 = _interopRequireDefault(_basic_commission_rd);

	var _basic_commission_rd3 = __webpack_require__(27);

	var _basic_commission_rd4 = _interopRequireDefault(_basic_commission_rd3);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CommissionRm = function (_React$Component) {
	    _inherits(CommissionRm, _React$Component);

	    function CommissionRm(props) {
	        _classCallCheck(this, CommissionRm);

	        var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CommissionRm).call(this, props));

	        _this.state = {
	            data: null,
	            mpa: null,
	            mio: null,
	            mib: null
	        };

	        _this.componentWillReceiveProps = function (p) {
	            if (p.data != null) {
	                _this.setState({
	                    data: p.data,
	                    mpa: p.data.specific_data.mpa,
	                    mio: p.data.specific_data.mio,
	                    mib: p.data.specific_data.mib
	                });
	            }
	        };

	        return _this;
	    }

	    _createClass(CommissionRm, [{
	        key: 'render',
	        value: function render() {
	            return React.createElement(
	                'div',
	                { className: 'row', style: { marginLeft: "0px" } },
	                React.createElement(_basic_commission_rd4.default, { data: this.props.data }),
	                React.createElement(
	                    'div',
	                    { className: 'row', style: { paddingBottom: "5px", marginRight: "0px", textAlign: "center", color: "red" } },
	                    React.createElement(
	                        'div',
	                        { className: 'col-md-4' },
	                        React.createElement(
	                            'div',
	                            { className: 'row', style: { paddingBottom: "15px" } },
	                            'MPA : Rp. ',
	                            (0, _formatter.MoneyFormat)(this.state.mpa)
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'col-md-4' },
	                        React.createElement(
	                            'div',
	                            { className: 'row', style: { paddingBottom: "15px" } },
	                            'MIO : Rp. ',
	                            (0, _formatter.MoneyFormat)(this.state.mio),
	                            React.createElement('br', null),
	                            '*calculated using temporary P1 & P2'
	                        )
	                    ),
	                    React.createElement(
	                        'div',
	                        { className: 'col-md-4' },
	                        React.createElement(
	                            'div',
	                            { className: 'row', style: { paddingBottom: "15px" } },
	                            'MIB : Rp. ',
	                            (0, _formatter.MoneyFormat)(this.state.mib)
	                        )
	                    )
	                )
	            );
	        }
	    }]);

	    return CommissionRm;
	}(React.Component);

	exports.default = CommissionRm;

/***/ },
/* 26 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BasicCommissionRd1 = function (_React$Component) {
	  _inherits(BasicCommissionRd1, _React$Component);

	  function BasicCommissionRd1(props) {
	    _classCallCheck(this, BasicCommissionRd1);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BasicCommissionRd1).call(this, props));

	    _this.state = {
	      fyc_direct: null,
	      fyc_parallel: null,
	      syc_direct: null,
	      syc_parallel: null,
	      ecp1: null,
	      ecp2: null,
	      acp1: null,
	      acp2: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          fyc_direct: null,
	          fyc_parallel: null,
	          syc_direct: p.data.specific_data.syc_direct,
	          syc_parallel: p.data.specific_data.syc_parallel,
	          ecp1: p.data.common_data.ecp1,
	          ecp2: p.data.common_data.ecp2,
	          acp1: p.data.common_data.acp1,
	          acp2: p.data.common_data.acp2
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(BasicCommissionRd1, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'span',
	        null,
	        React.createElement(
	          'div',
	          { className: 'row', style: { float: "left", width: "100%", paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'FYC Direct Group'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyc_direct), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'SYC Direct Group'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.syc_direct), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'ECP (1)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.ecp1), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'ECP (2)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.ecp2), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row', style: { float: "left", width: "100%", paddingBottom: "5px", borderBottom: "thin solid #000000", marginBottom: "20px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'FYC Parallel'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyc_parallel), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'SYC Parallel'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.syc_parallel), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'ACP (1)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.acp1), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'ACP (2)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.acp2), disabled: true })
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return BasicCommissionRd1;
	}(React.Component);

	exports.default = BasicCommissionRd1;

/***/ },
/* 27 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var BasicCommissionRd2 = function (_React$Component) {
	  _inherits(BasicCommissionRd2, _React$Component);

	  function BasicCommissionRd2(props) {
	    _classCallCheck(this, BasicCommissionRd2);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(BasicCommissionRd2).call(this, props));

	    _this.state = {
	      fyc_direct: null,
	      fyc_parallel: null,
	      syc_direct: null,
	      syc_parallel: null,
	      fyp_direct: null,
	      afyp_direct: null,
	      ecp1: null,
	      ecp2: null,
	      acp1: null,
	      acp2: null
	    };

	    _this.componentWillReceiveProps = function (p) {
	      if (p.data != null) {
	        _this.setState({
	          fyc_direct: p.data.common_data.fyc_rolling,
	          fyc_parallel: p.data.specific_data.fyc_parallel,
	          syc_direct: p.data.specific_data.syc_direct,
	          syc_parallel: p.data.specific_data.syc_parallel,
	          fyp_direct: p.data.common_data.fyp_month,
	          afyp_direct: p.data.common_data.afyp_month,
	          ecp1: p.data.common_data.ecp1,
	          ecp2: p.data.common_data.ecp2,
	          acp1: p.data.common_data.acp1,
	          acp2: p.data.common_data.acp2
	        });
	      }
	    };

	    return _this;
	  }

	  _createClass(BasicCommissionRd2, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { style: { float: "left" } },
	        React.createElement(
	          'div',
	          { className: 'row', style: { float: "left", width: "100%", paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'FYC Direct Group'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyc_direct), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'SYC Direct Group'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.syc_direct), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'ECP (1)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.ecp1), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'ECP (2)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.ecp2), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row', style: { float: "left", width: "100%", paddingBottom: "5px" } },
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'FYC Parallel'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyc_parallel), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'SYC Parallel'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.syc_parallel), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'ACP (1)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.acp1), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'ACP (2)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.acp2), disabled: true })
	            )
	          )
	        ),
	        React.createElement(
	          'div',
	          { className: 'row', style: { float: "left", width: "100%", paddingBottom: "5px" } },
	          React.createElement('div', { className: 'col-md-3' }),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'FYP (Direct Group)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.fyp_direct), disabled: true })
	            )
	          ),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            React.createElement(
	              'div',
	              { className: 'col-md-5' },
	              'AFYP (Direct Group)'
	            ),
	            React.createElement(
	              'div',
	              { className: 'col-md-6' },
	              React.createElement('input', { type: 'text', value: (0, _formatter.MoneyFormat)(this.state.afyp_direct), disabled: true })
	            )
	          ),
	          React.createElement('div', { className: 'col-md-3' })
	        ),
	        React.createElement(
	          'div',
	          { className: 'row', style: { float: "left", width: "100%", paddingBottom: "5px" } },
	          React.createElement('div', { className: 'col-md-3' }),
	          React.createElement('div', { className: 'col-md-3' }),
	          React.createElement('div', { className: 'col-md-3' }),
	          React.createElement(
	            'div',
	            { className: 'col-md-3' },
	            'Note: All Data is month to date'
	          )
	        ),
	        React.createElement('div', { className: 'row', style: { paddingBottom: "5px", borderBottom: "thin solid #000000", marginBottom: "20px", width: "98%", marginLeft: "1%" } })
	      );
	    }
	  }]);

	  return BasicCommissionRd2;
	}(React.Component);

	exports.default = BasicCommissionRd2;

/***/ },
/* 28 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	var _top_menu_fc = __webpack_require__(29);

	var _top_menu_fc2 = _interopRequireDefault(_top_menu_fc);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _agent_profile = __webpack_require__(30);

	var _agent_profile2 = _interopRequireDefault(_agent_profile);

	var _new_business_tracking_summary = __webpack_require__(31);

	var _new_business_tracking_summary2 = _interopRequireDefault(_new_business_tracking_summary);

	var _production = __webpack_require__(33);

	var _production2 = _interopRequireDefault(_production);

	var _persistency = __webpack_require__(34);

	var _persistency2 = _interopRequireDefault(_persistency);

	var _weekly_bonus = __webpack_require__(35);

	var _weekly_bonus2 = _interopRequireDefault(_weekly_bonus);

	var _year_end_bonus = __webpack_require__(36);

	var _year_end_bonus2 = _interopRequireDefault(_year_end_bonus);

	var _new_business = __webpack_require__(32);

	var _new_business2 = _interopRequireDefault(_new_business);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }
	// Modal


	var dashboard_fc = function (_React$Component) {
		_inherits(dashboard_fc, _React$Component);

		function dashboard_fc(props) {
			_classCallCheck(this, dashboard_fc);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(dashboard_fc).call(this, props));

			_this.componentWillMount = function () {
				(0, _cek_auth2.default)();
			};

			_this.componentDidMount = function () {
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.agentDashboardv2,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						$('#loading').modal('hide');

						// set local storage
						localStorage.setItem('name', response.name);
						localStorage.setItem('last_login', response.last_login);

						_this.setState({
							data: response,
							agentType: (0, _formatter.CheckAgentType)(response.agent_data.code)
						});
					},
					error: function error(err, response) {
						$('#loading').modal('hide');
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			_this.state = {
				data: null,
				agentType: "MO"
			};
			return _this;
		}

		_createClass(dashboard_fc, [{
			key: 'render',
			value: function render() {

				var weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : null;
				var weekly_qc_commission = [];
				if (weekly_qc_commission_table) {
					$.map(weekly_qc_commission_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ className: 'red', key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ className: 'down' },
									React.createElement('i', { className: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus,
									React.createElement('i', { className: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ className: 'down' },
									React.createElement('i', { className: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus
								)
							);
						}
						weekly_qc_commission.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrap2' },
					React.createElement(_top_menu_fc2.default, { username: this.state.data && this.state.data.name, lastlogin: this.state.data && this.state.data.last_login }),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'topWidget' },
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(
										'div',
										{ className: 'col-xs-6 responsive3' },
										React.createElement(_agent_profile2.default, { data: this.state.data && this.state.data })
									),
									React.createElement(
										'div',
										{ className: 'col-xs-6 responsive3' },
										React.createElement(_new_business_tracking_summary2.default, { data: this.state.data && this.state.data })
									)
								),
								React.createElement('div', { className: 'clearfix h25' }),
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(
										'div',
										{ className: 'col-xs-6 responsive3' },
										React.createElement(_production2.default, { data: this.state.data && this.state.data })
									),
									React.createElement(
										'div',
										{ className: 'col-xs-6 responsive3' },
										this.state.agentType == "MO" ? React.createElement(_persistency2.default, { data: this.state.data && this.state.data }) : ""
									)
								),
								React.createElement('div', { className: 'clearfix h25' }),
								this.state.agentType == "MO" ? React.createElement(
									'div',
									{ className: 'bottomWidget' },
									React.createElement(
										'div',
										{ className: 'title' },
										'Income Calculation'
									),
									React.createElement(
										'div',
										{ className: 'content' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-12 responsive3' },
												React.createElement(_weekly_bonus2.default, { data: this.state.data && this.state.data })
											),
											React.createElement('div', { className: 'clearfix h25' }),
											React.createElement(
												'div',
												{ className: 'col-xs-12 responsive3' },
												React.createElement(_year_end_bonus2.default, { data: this.state.data && this.state.data })
											)
										)
									)
								) : ""
							)
						)
					),
					React.createElement(_footer2.default, null),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'weeklyBonus', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'thead',
											null,
											React.createElement(
												'tr',
												null,
												React.createElement(
													'th',
													null,
													'Total 12 rolling week QC'
												),
												React.createElement(
													'th',
													null,
													'% of FYC'
												),
												React.createElement(
													'th',
													null,
													'Total Bonus'
												)
											)
										),
										React.createElement(
											'tbody',
											null,
											weekly_qc_commission
										)
									)
								)
							)
						)
					),
					React.createElement(_loading2.default, null)
				);
			}
		}]);

		return dashboard_fc;
	}(React.Component);

	exports.default = dashboard_fc;

/***/ },
/* 29 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TopMenuFc = function (_React$Component) {
		_inherits(TopMenuFc, _React$Component);

		function TopMenuFc(props) {
			_classCallCheck(this, TopMenuFc);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TopMenuFc).call(this, props));

			_this.state = {
				username: localStorage.getItem('name'),
				lastlogin: localStorage.getItem('last_login'),
				dashboardRole: [5, 6, 7, 8, 9],
				dashboardMaps: {
					9: "fc",
					8: "sm",
					7: "dm",
					6: "rm",
					5: "rd"
				}
			};

			_this.componentDidMount = function () {
				_this.state.dashboardMaps[9] = "fc";
				_this.state.dashboardMaps[8] = "sm";
				_this.state.dashboardMaps[7] = "dm";
				_this.state.dashboardMaps[6] = "rm";
				_this.state.dashboardMaps[5] = "rd";
			};

			_this.componentWillReceiveProps = function (p) {
				if (p.username != null) {
					_this.setState({
						username: p.username,
						lastlogin: p.lastlogin
					});
				}
			};

			return _this;
		}

		_createClass(TopMenuFc, [{
			key: 'render',
			value: function render() {
				var last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0, 10)) : null;
				var formated_last_login = null;
				if (last_login) {
					var dd = last_login.getDate();
					var mm = last_login.getMonth() + 1; //January is 0!
					var yyyy = last_login.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = dd + '-' + mm + '-' + yyyy;
				}

				var dashboardUrl = null;
				if (this.state.dashboardRole.indexOf(localStorage.getItem('userrole')) != -1) {
					dashboardUrl = 'dashboard_' + this.state.dashboardMaps[response.role];
				}

				return React.createElement(
					'div',
					{ className: 'header-wrapper' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'logo' },
							React.createElement(
								'a',
								{ href: '#' },
								React.createElement('img', { src: 'assets/img/logo.png', width: '190', height: '64', alt: 'TOKIO MARINE' })
							)
						),
						React.createElement(
							'div',
							{ className: 'afterLogo' },
							React.createElement(
								'div',
								{ className: 'afterTop' },
								React.createElement(
									'div',
									{ className: 'left' },
									'Welcome, ',
									this.state.username
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement(
										'ul',
										null,
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: "#/" + dashboardUrl, title: 'Dashboard' },
												React.createElement('i', { className: 'fa fa-cogs' }),
												' Dashboard'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/profile', title: 'Profile' },
												React.createElement('i', { className: 'fa fa-user' }),
												' Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/comission', title: 'Comission' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Comission Report'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#', title: 'Log Out' },
												React.createElement('i', { className: 'fa fa-sign-out' }),
												' Log Out'
											)
										)
									)
								),
								React.createElement('div', { className: 'clearfix' })
							),
							React.createElement(
								'div',
								{ className: 'afterBottom' },
								React.createElement(
									'div',
									{ className: 'left' },
									React.createElement(
										'ul',
										{ className: 'nav nav-tabs', role: 'tablist' },
										React.createElement(
											'li',
											{ role: 'presentation', className: 'active' },
											React.createElement(
												'a',
												{ href: '#personalselling', 'aria-controls': 'personalselling', role: 'tab', 'data-toggle': 'tab' },
												'Personal Selling '
											)
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement('i', { className: 'fa fa-clock-o' }),
									React.createElement(
										'span',
										null,
										'(Last login: ',
										formated_last_login,
										')'
									)
								),
								React.createElement('div', { className: 'clearfix' })
							)
						)
					)
				);
			}
		}]);

		return TopMenuFc;
	}(React.Component);

	exports.default = TopMenuFc;

/***/ },
/* 30 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var AgentProfile = function (_React$Component) {
		_inherits(AgentProfile, _React$Component);

		function AgentProfile(props) {
			_classCallCheck(this, AgentProfile);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(AgentProfile).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(AgentProfile, [{
			key: 'render',
			value: function render() {
				var aaji_expired_date = this.state.data ? this.state.data.agent_data.aaji_expired_date : null;
				var aaji_license_date = null;
				if (aaji_expired_date != null) {
					aaji_expired_date = new Date(aaji_expired_date);
					aaji_expired_date.setFullYear(aaji_expired_date.getFullYear() - 2);

					var dd = aaji_expired_date.getDate();
					var mm = aaji_expired_date.getMonth() + 1; //January is 0!

					var yyyy = aaji_expired_date.getFullYear();
					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					/* aaji_license_date = yyyy+'-'+mm+'-'+dd;*/
					aaji_license_date = dd + '-' + mm + '-' + yyyy;
				}

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('i', { className: 'fa fa-user' }),
						' Agent Profile'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'form',
							{ className: 'form-horizontal' },
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-sm-4 control-label' },
									'Agent Name'
								),
								React.createElement(
									'div',
									{ className: 'col-sm-8' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', disabled: true, value: this.state.data && this.state.data.name })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-sm-4 control-label' },
									'Agent Code'
								),
								React.createElement(
									'div',
									{ className: 'col-sm-8' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', disabled: true, value: this.state.data && this.state.data.agent_data.code })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-sm-4 control-label' },
									'Agent Level'
								),
								React.createElement(
									'div',
									{ className: 'col-sm-8' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', disabled: true, value: this.state.data && (0, _formatter.UserLevelMap)(this.state.data.level) })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-sm-4 control-label' },
									'AAJI License Date'
								),
								React.createElement(
									'div',
									{ className: 'col-sm-8' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', disabled: true, value: aaji_license_date })
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'more' },
							React.createElement(
								'span',
								null,
								React.createElement(
									'a',
									{ href: '#/profile', title: 'View More...' },
									'View More...'
								)
							)
						)
					)
				);
			}
		}]);

		return AgentProfile;
	}(React.Component);

	exports.default = AgentProfile;

/***/ },
/* 31 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _new_business = __webpack_require__(32);

	var _new_business2 = _interopRequireDefault(_new_business);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewBusinessTrackingSummary = function (_React$Component) {
		_inherits(NewBusinessTrackingSummary, _React$Component);

		function NewBusinessTrackingSummary(props) {
			_classCallCheck(this, NewBusinessTrackingSummary);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewBusinessTrackingSummary).call(this, props));

			_this.state = {
				data: null,
				modalVal: [{
					"no": '-',
					"spaj_number": '-',
					"spaj_policy_no": '-',
					"spaj_holder": '-',
					"spaj_status": '-',
					"spaj_notes": '-'
				}]
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(NewBusinessTrackingSummary, [{
			key: '_data',
			value: function _data(status, period, group) {
				var _this2 = this;

				$.ajax({
					url: _api_route2.default.new_business,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: {
						"status": status,
						"period": period,
						"group": group
					},
					type: 'POST',
					success: function success(response) {
						if (response.length > 0) {
							_this2.setState({
								modalVal: response
							});
						} else {
							_this2.setState({
								modalVal: [{
									"no": '-',
									"spaj_number": '-',
									"spaj_policy_no": '-',
									"spaj_holder": '-',
									"spaj_status": '-',
									"spaj_notes": '-'
								}]
							});
						}
					},
					error: function error(err, response) {
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'content newbusiness' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('i', { className: 'fa fa-newspaper-o' }),
						' New Business Tracking Summary'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'table',
							{ className: 'table table-striped' },
							React.createElement(
								'thead',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement('th', null),
									React.createElement(
										'th',
										{ className: 'bullet' },
										'MTD'
									),
									React.createElement(
										'th',
										{ className: 'bullet' },
										'YTD'
									)
								)
							),
							React.createElement(
								'tbody',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'Submit'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "submitted", "mtd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && this.state.data.spaj.mtd.personal.submit
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "submitted", "ytd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && this.state.data.spaj.ytd.personal.submit
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Issued'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "issued", "mtd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.issued
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "issued", "ytd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.issued
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Pending'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "pending", "mtd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.pending
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "pending", "ytd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.pending
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Declined'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "declined", "mtd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.declined
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "declined", "ytd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.declined
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Withdrawn'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "withdrawn", "mtd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.withdrawn
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "withdrawn", "ytd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.withdrawn
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Postponed'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "postponed", "mtd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.postponed
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness', onClick: this._data.bind(this, "postponed", "ytd", 0) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.postponed
											)
										)
									)
								)
							)
						)
					),
					React.createElement(_new_business2.default, { data: this.state.modalVal && this.state.modalVal })
				);
			}
		}]);

		return NewBusinessTrackingSummary;
	}(React.Component);

	exports.default = NewBusinessTrackingSummary;

/***/ },
/* 32 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewBusinessModal = function (_React$Component) {
		_inherits(NewBusinessModal, _React$Component);

		function NewBusinessModal(props) {
			_classCallCheck(this, NewBusinessModal);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewBusinessModal).call(this, props));

			_this.state = {
				data: [{
					"no": '-',
					"spaj_number": '-',
					"spaj_policy_no": '-',
					"spaj_holder": '-',
					"spaj_status": '-',
					"spaj_notes": '-'
				}]
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(NewBusinessModal, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'modal fade', id: 'newbusiness', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
					React.createElement(
						'div',
						{ className: 'modal-dialog' },
						React.createElement(
							'div',
							{ className: 'modal-content' },
							React.createElement(
								'div',
								{ className: 'table-responsive' },
								React.createElement(
									'table',
									{ className: 'table table-bordered table-hover' },
									React.createElement(
										'tr',
										null,
										React.createElement(
											'th',
											null,
											'NO'
										),
										React.createElement(
											'th',
											null,
											'NO SPAJ'
										),
										React.createElement(
											'th',
											null,
											'NO POLICY'
										),
										React.createElement(
											'th',
											null,
											'POLICY HOLDER'
										),
										React.createElement(
											'th',
											null,
											'STATUS'
										),
										React.createElement(
											'th',
											null,
											'ALASAN'
										)
									),
									React.createElement(
										'tbody',
										null,
										this.state.data.map(function (item) {
											return React.createElement(
												'tr',
												null,
												React.createElement(
													'td',
													null,
													item.no != null ? item.no : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_number != null ? item.spaj_number : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_policy_no != null ? item.spaj_policy_no : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_holder != null ? item.spaj_holder : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_status != null ? item.spaj_status : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_notes != null ? item.spaj_notes : '-'
												)
											);
										})
									)
								)
							)
						)
					)
				);
			}
		}]);

		return NewBusinessModal;
	}(React.Component);

	exports.default = NewBusinessModal;

/***/ },
/* 33 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Production = function (_React$Component) {
		_inherits(Production, _React$Component);

		function Production(props) {
			_classCallCheck(this, Production);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Production).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(Production, [{
			key: 'render',
			value: function render() {

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('i', { className: 'fa fa-tasks' }),
						' Production (Rupiah)'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'table',
							{ className: 'table table-striped' },
							React.createElement(
								'thead',
								null,
								React.createElement(
									'tr',
									{ className: 'info' },
									React.createElement('th', null),
									React.createElement(
										'th',
										null,
										'WTD'
									),
									React.createElement(
										'th',
										null,
										'MTD'
									),
									React.createElement(
										'th',
										null,
										'YTD'
									)
								)
							),
							React.createElement(
								'tbody',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ className: 'info' },
										'FYP'
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyp.wtd.fyp_personal_weekly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyp.mtd.fyp_personal_monthly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyp.ytd.fyp_personal_yearly_to_date)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ className: 'info' },
										'FYC'
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyc.wtd.fyc_personal_weekly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyc.mtd.fyc_personal_monthly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyc.ytd.fyc_personal_yearly_to_date)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ className: 'info' },
										'AFYP'
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyp.wtd.afyp_personal_weekly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyp.mtd.afyp_personal_monthly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyp.ytd.afyp_personal_yearly_to_date)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ className: 'info' },
										'AFYC'
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyc.wtd.afyc_personal_weekly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyc.mtd.afyc_personal_monthly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyc.ytd.afyc_personal_yearly_to_date)
									)
								)
							)
						),
						React.createElement(
							'a',
							{ href: this.state.data && _api_route2.default.production_report_agent + this.state.data.agent_data.id },
							React.createElement(
								'button',
								{ className: 'btn btn-warning' },
								React.createElement('i', { className: 'fa fa-download' }),
								' Download Production report'
							)
						)
					)
				);
			}
		}]);

		return Production;
	}(React.Component);

	exports.default = Production;

/***/ },
/* 34 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Persistency = function (_React$Component) {
		_inherits(Persistency, _React$Component);

		function Persistency(props) {
			_classCallCheck(this, Persistency);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Persistency).call(this, props));

			_this.state = {
				data: null,
				modal_title: null,
				modal_ecp: null,
				modal_acp: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			_this.handleShowModal = function (p) {
				if (p == 1) {
					var ecp = _this.state.data.persistency.personal_p1.ecp_p1;
					var acp = _this.state.data.persistency.personal_p1.acp_p1;
					_this.setState({
						modal_title: "Personal Persistency P1",
						modal_ecp: (0, _formatter.MoneyFormat)(ecp),
						modal_acp: (0, _formatter.MoneyFormat)(acp)
					});
				} else {
					var ecp = _this.state.data.persistency.personal_p2.ecp_p2;
					var acp = _this.state.data.persistency.personal_p2.acp_p2;
					_this.setState({
						modal_title: "Personal Persistency P2",
						modal_ecp: (0, _formatter.MoneyFormat)(ecp),
						modal_acp: (0, _formatter.MoneyFormat)(acp)
					});
				}
				$("#persistency").modal("show");
			};

			return _this;
		}

		_createClass(Persistency, [{
			key: 'render',
			value: function render() {
				var p2 = this.state.data && (0, _formatter.decimalFormat)(this.state.data.persistency.personal_p2.p2);

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('i', { className: 'fa fa-percent' }),
						' Persistency'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'div',
							{ className: 'persistency' },
							React.createElement(
								'div',
								{ className: 'row' },
								React.createElement(
									'div',
									{ className: 'col-xs-6' },
									React.createElement(
										'div',
										{ className: 'titlePersistency' },
										'P1'
									),
									React.createElement(
										'div',
										{ className: 'percentPersistency' },
										React.createElement(
											'div',
											{ className: "c100 orange p" + (this.state.data && (0, _formatter.decimalFormat)(this.state.data.persistency.personal_p1.p1)) },
											React.createElement(
												'span',
												null,
												this.state.data && (0, _formatter.decimalFormat)(this.state.data.persistency.personal_p1.p1),
												'%'
											),
											React.createElement(
												'div',
												{ className: 'slice' },
												React.createElement('div', { className: 'bar' }),
												React.createElement('div', { className: 'fill' })
											)
										),
										React.createElement('div', { className: 'clearfix' })
									),
									React.createElement(
										'div',
										{ className: 'buttonPersistency' },
										React.createElement(
											'a',
											{ onClick: this.handleShowModal.bind(this, 1) },
											'view details'
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'col-xs-6' },
									React.createElement(
										'div',
										{ className: 'titlePersistency' },
										'P2'
									),
									React.createElement(
										'div',
										{ className: 'percentPersistency' },
										React.createElement(
											'div',
											{ className: "c100 green p" + (this.state.data && (0, _formatter.decimalFormat)(this.state.data.persistency.personal_p2.p2)) },
											React.createElement(
												'span',
												null,
												p2 != "-" && p2 + "%" || p2
											),
											React.createElement(
												'div',
												{ className: 'slice' },
												React.createElement('div', { className: 'bar' }),
												React.createElement('div', { className: 'fill' })
											)
										),
										React.createElement('div', { className: 'clearfix' })
									),
									React.createElement(
										'div',
										{ className: 'buttonPersistency' },
										React.createElement(
											'a',
											{ onClick: this.handleShowModal.bind(this, 2) },
											'view details'
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'persistency', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												{ colSpan: '2' },
												this.state.modal_title
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'ECP'
											),
											React.createElement(
												'td',
												null,
												this.state.modal_ecp
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'ACP'
											),
											React.createElement(
												'td',
												null,
												this.state.modal_acp
											)
										)
									)
								)
							)
						)
					)
				);
			}
		}]);

		return Persistency;
	}(React.Component);

	exports.default = Persistency;

/***/ },
/* 35 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var WeeklyBonus = function (_React$Component) {
		_inherits(WeeklyBonus, _React$Component);

		function WeeklyBonus(props) {
			_classCallCheck(this, WeeklyBonus);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(WeeklyBonus).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(WeeklyBonus, [{
			key: 'render',
			value: function render() {

				var weekly_fyc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_fyc_commission_table : null;
				var weekly_fyc_commission = [];
				if (weekly_fyc_commission_table) {
					$.map(weekly_fyc_commission_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ className: 'red', key: index },
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_fyc)
								),
								React.createElement(
									'td',
									null,
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.bonus),
									React.createElement('i', { className: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_fyc)
								),
								React.createElement(
									'td',
									null,
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.bonus)
								)
							);
						}
						weekly_fyc_commission.push(row);
					});
				}

				var weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : null;
				var weekly_qc_commission = [];
				if (weekly_qc_commission_table) {
					$.map(weekly_qc_commission_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ className: 'red', key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									null,
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.bonus),
									React.createElement('i', { className: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									null,
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.bonus)
								)
							);
						}
						weekly_qc_commission.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calendar-check-o' }),
						' Weekly Bonus'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-xs-4 responsive1' },
								React.createElement(
									'form',
									{ className: 'form-horizontal' },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-6 control-label' },
											'FYC (WTD)'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-6' },
											React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', disabled: true, value: this.state.data && (0, _formatter.MoneyFormat)(this.state.data.income_calculation.weekly_bonus.personal_week_to_date_fyc) })
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-4 responsive1' },
								React.createElement(
									'form',
									{ className: 'form-horizontal' },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-4 control-label' },
											'FYC (12 rolling week)'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-4' },
											React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', disabled: true, value: this.state.data && (0, _formatter.MoneyFormat)(this.state.data.income_calculation.weekly_bonus.personal_rolling_fyc) })
										),
										React.createElement(
											'div',
											{ className: 'col-sm-4' },
											React.createElement('a', { href: '#', 'data-toggle': 'modal', 'data-target': '#weeklyBonus' })
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-4 responsive1' },
								React.createElement(
									'form',
									{ className: 'form-horizontal' },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-4 control-label' },
											'QC (12 rolling week)'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-4' },
											React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', disabled: true, value: this.state.data && this.state.data.income_calculation.weekly_bonus.personal_rolling_qc })
										),
										React.createElement(
											'div',
											{ className: 'col-sm-4' },
											React.createElement('a', { href: '#', 'data-toggle': 'modal', 'data-target': '#weeklyBonus' })
										)
									)
								)
							),
							React.createElement('div', { className: 'clearfix' })
						),
						React.createElement('div', { className: 'clearfix h15' }),
						React.createElement(
							'div',
							{ className: 'note' },
							'Bonus Anda berdasarkan Pencapaian saat ini adalah Rp ',
							this.state.data && (0, _formatter.MoneyFormat)(this.state.data.income_calculation.weekly_bonus.total_weekly_bonus)
						),
						React.createElement('div', { className: 'clearfix h15' }),
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-xs-5 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable' },
									'Validation based on QC'
								),
								React.createElement(
									'table',
									{ className: 'table table-bordered table-striped' },
									React.createElement(
										'thead',
										null,
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												null,
												'Total 12',
												React.createElement('br', null),
												'rolling week',
												React.createElement('br', null),
												'QC'
											),
											React.createElement(
												'th',
												null,
												'% of FYC'
											),
											React.createElement(
												'th',
												null,
												'Total Bonus'
											)
										)
									),
									React.createElement(
										'tbody',
										null,
										weekly_qc_commission
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-2 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable', style: { color: "red" } },
									React.createElement(
										'b',
										null,
										'OR'
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-5 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable' },
									'Validation based on FYC'
								),
								React.createElement(
									'table',
									{ className: 'table table-bordered table-striped' },
									React.createElement(
										'thead',
										null,
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												null,
												'Total 12',
												React.createElement('br', null),
												'rolling week',
												React.createElement('br', null),
												'FYC'
											),
											React.createElement(
												'th',
												null,
												'% of FYC'
											),
											React.createElement(
												'th',
												null,
												'Total Bonus'
											)
										)
									),
									React.createElement(
										'tbody',
										null,
										weekly_fyc_commission
									)
								)
							),
							React.createElement('div', { className: 'clearfix' })
						)
					),
					React.createElement('div', { className: 'clearfix' }),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat bonus mingguan Anda adalah Rp ',
						this.state.data && (0, _formatter.MoneyFormat)(this.state.data.income_calculation.weekly_bonus.total_weekly_bonus),
						'. Batas akhir issued case minggu ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && (0, _formatter.DateFormat)(this.state.data.income_calculation.weekly_bonus.weekly_end_date)
						),
						'"'
					)
				);
			}
		}]);

		return WeeklyBonus;
	}(React.Component);

	exports.default = WeeklyBonus;

/***/ },
/* 36 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var YearEndBonus = function (_React$Component) {
		_inherits(YearEndBonus, _React$Component);

		function YearEndBonus(props) {
			_classCallCheck(this, YearEndBonus);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(YearEndBonus).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(YearEndBonus, [{
			key: 'render',
			value: function render() {

				var yebo_fyc_bonus_table = this.state.data ? this.state.data.income_calculation.yebo.yebo_fyc_bonus_table : null;
				var yebo_fyc_bonus = [];
				if (yebo_fyc_bonus_table) {
					$.map(yebo_fyc_bonus_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ className: 'red' },
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_fyc)
								),
								React.createElement(
									'td',
									null,
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.bonus),
									React.createElement('i', { className: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_fyc)
								),
								React.createElement(
									'td',
									null,
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.bonus)
								)
							);
						}
						yebo_fyc_bonus.push(row);
					});
				}

				var yebo_qc_bonus_table = this.state.data ? this.state.data.income_calculation.yebo.yebo_qc_bonus_table : null;
				var yebo_qc_bonus = [];
				if (yebo_qc_bonus_table) {
					$.map(yebo_qc_bonus_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ className: 'red' },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									null,
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.bonus),
									React.createElement('i', { className: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									null,
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.bonus)
								)
							);
						}
						yebo_qc_bonus.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calendar-check-o' }),
						' Year End Bonus'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-xs-4 responsive1' },
								React.createElement(
									'form',
									{ className: 'form-horizontal' },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-5 control-label two-line' },
											'Total Weekly Bonus (YTD)'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-7' },
											React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: this.state.data && (0, _formatter.MoneyFormat)(this.state.data.income_calculation.yebo.total_weekly_bonus) })
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-4 responsive1' },
								React.createElement(
									'form',
									{ className: 'form-horizontal' },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-5 control-label' },
											'FYC (YTD)'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-7' },
											React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: this.state.data && (0, _formatter.MoneyFormat)(this.state.data.production.fyc.ytd.fyc_personal_yearly_to_date) })
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-4 responsive1' },
								React.createElement(
									'form',
									{ className: 'form-horizontal' },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-5 control-label' },
											'QC (YTD)'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-7' },
											React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: this.state.data && (0, _formatter.MoneyFormat)(this.state.data.production.qc.ytd.qc_personal_yearly_to_date) })
										)
									)
								)
							),
							React.createElement('div', { className: 'clearfix' })
						),
						React.createElement('div', { className: 'clearfix h15' }),
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-xs-5 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable' },
									'Validation based on QC'
								),
								React.createElement(
									'table',
									{ className: 'table table-bordered table-striped' },
									React.createElement(
										'thead',
										null,
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												null,
												'Total QC'
											),
											React.createElement(
												'th',
												null,
												'% of Total',
												React.createElement('br', null),
												'Weekly Bonus'
											),
											React.createElement(
												'th',
												null,
												'Year End Bonus'
											)
										)
									),
									React.createElement(
										'tbody',
										null,
										yebo_qc_bonus
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-2 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable', style: { color: "red" } },
									React.createElement(
										'b',
										null,
										'OR'
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-5 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable' },
									'Validation based on FYC'
								),
								React.createElement(
									'table',
									{ className: 'table table-bordered table-striped' },
									React.createElement(
										'thead',
										null,
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												null,
												'Total FYC'
											),
											React.createElement(
												'th',
												null,
												'% of Total Weekly',
												React.createElement('br', null),
												'Bonus'
											),
											React.createElement(
												'th',
												null,
												'Year End Bonus'
											)
										)
									),
									React.createElement(
										'tbody',
										null,
										yebo_fyc_bonus
									)
								)
							),
							React.createElement('div', { className: 'clearfix' })
						)
					),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat bonus akhir tahun Anda adalah Rp ',
						this.state.data && (0, _formatter.MoneyFormat)(this.state.data.income_calculation.yebo.total_weekly_bonus),
						'. Batas akhir issued case tahun ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && (0, _formatter.DateFormat)(this.state.data.income_calculation.yebo.yebo_end_date)
						),
						'"'
					)
				);
			}
		}]);

		return YearEndBonus;
	}(React.Component);

	exports.default = YearEndBonus;

/***/ },
/* 37 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	var _top_menu = __webpack_require__(38);

	var _top_menu2 = _interopRequireDefault(_top_menu);

	var _agent_profile = __webpack_require__(30);

	var _agent_profile2 = _interopRequireDefault(_agent_profile);

	var _new_business_tracking_summary = __webpack_require__(31);

	var _new_business_tracking_summary2 = _interopRequireDefault(_new_business_tracking_summary);

	var _production = __webpack_require__(33);

	var _production2 = _interopRequireDefault(_production);

	var _persistency = __webpack_require__(34);

	var _persistency2 = _interopRequireDefault(_persistency);

	var _weekly_bonus = __webpack_require__(35);

	var _weekly_bonus2 = _interopRequireDefault(_weekly_bonus);

	var _year_end_bonus = __webpack_require__(36);

	var _year_end_bonus2 = _interopRequireDefault(_year_end_bonus);

	var _group_monthly_report = __webpack_require__(39);

	var _group_monthly_report2 = _interopRequireDefault(_group_monthly_report);

	var _group_new_business_tracking_summary = __webpack_require__(40);

	var _group_new_business_tracking_summary2 = _interopRequireDefault(_group_new_business_tracking_summary);

	var _group_production = __webpack_require__(42);

	var _group_production2 = _interopRequireDefault(_group_production);

	var _group_persistency = __webpack_require__(43);

	var _group_persistency2 = _interopRequireDefault(_group_persistency);

	var _group_overriding = __webpack_require__(44);

	var _group_overriding2 = _interopRequireDefault(_group_overriding);

	var _group_bonus_overriding = __webpack_require__(45);

	var _group_bonus_overriding2 = _interopRequireDefault(_group_bonus_overriding);

	var _new_business = __webpack_require__(32);

	var _new_business2 = _interopRequireDefault(_new_business);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Helper


	// Layout

	// Personal Component

	// Group Component

	// Modal


	var dashboard_dm = function (_React$Component) {
		_inherits(dashboard_dm, _React$Component);

		function dashboard_dm(props) {
			_classCallCheck(this, dashboard_dm);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(dashboard_dm).call(this, props));

			_this.componentWillMount = function () {
				(0, _cek_auth2.default)();
			};

			_this.componentDidMount = function () {
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.agentDashboardv2,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						$('#loading').modal('hide');

						// set local storage
						localStorage.setItem('name', response.name);
						localStorage.setItem('last_login', response.last_login);

						_this.setState({
							data: response,
							agentType: (0, _formatter.CheckAgentType)(response.agent_data.code)
						});
					},
					error: function error(err, response) {
						$('#loading').modal('hide');
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			_this.state = {
				data: null,
				agentType: "MO"
			};
			return _this;
		}

		_createClass(dashboard_dm, [{
			key: 'render',
			value: function render() {

				var weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : null;
				var weekly_qc_commission = [];
				if (weekly_qc_commission_table) {
					$.map(weekly_qc_commission_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ classNameName: 'red', key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ classNameName: 'down' },
									React.createElement('i', { classNameName: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus,
									React.createElement('i', { classNameName: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ classNameName: 'down' },
									React.createElement('i', { classNameName: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus
								)
							);
						}
						weekly_qc_commission.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrap2' },
					React.createElement(_top_menu2.default, { username: this.state.data && this.state.data.name, lastlogin: this.state.data && this.state.data.last_login }),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'tab-content' },
								React.createElement(
									'div',
									{ role: 'tabpanel', className: 'tab-pane active', id: 'personalselling' },
									React.createElement(
										'div',
										{ className: 'topWidget' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_agent_profile2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_new_business_tracking_summary2.default, { data: this.state.data && this.state.data })
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_production2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_persistency2.default, { data: this.state.data && this.state.data }) : ""
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										this.state.agentType == "MO" ? React.createElement(
											'div',
											{ className: 'bottomWidget' },
											React.createElement(
												'div',
												{ className: 'title' },
												'Income Calculation'
											),
											React.createElement(
												'div',
												{ className: 'content' },
												React.createElement(
													'div',
													{ className: 'row' },
													React.createElement(
														'div',
														{ className: 'col-xs-12 responsive3' },
														React.createElement(_weekly_bonus2.default, { data: this.state.data && this.state.data })
													),
													React.createElement('div', { className: 'clearfix h25' }),
													React.createElement(
														'div',
														{ className: 'col-xs-12 responsive3' },
														React.createElement(_year_end_bonus2.default, { data: this.state.data && this.state.data })
													)
												)
											)
										) : ""
									)
								),
								React.createElement(
									'div',
									{ role: 'tabpanel', className: 'tab-pane', id: 'groupselling' },
									React.createElement(
										'div',
										{ className: 'topWidget' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_monthly_report2.default, { data: this.state.data && this.state.data }) : React.createElement(_group_production2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_group_new_business_tracking_summary2.default, { data: this.state.data && this.state.data })
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_production2.default, { data: this.state.data && this.state.data }) : ""
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_persistency2.default, { data: this.state.data && this.state.data }) : ""
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										this.state.agentType == "MO" && this.state.agentType == "SO" ? React.createElement(
											'div',
											{ className: 'bottomWidget' },
											React.createElement(
												'div',
												{ className: 'title' },
												'Income Calculation'
											),
											React.createElement(
												'div',
												{ className: 'content' },
												React.createElement(
													'div',
													{ className: 'row' },
													React.createElement(
														'div',
														{ className: 'col-xs-5 responsive3' },
														React.createElement(_group_overriding2.default, { data: this.state.data && this.state.data })
													),
													React.createElement(
														'div',
														{ className: 'col-xs-7 responsive3' },
														React.createElement(_group_bonus_overriding2.default, { data: this.state.data && this.state.data })
													)
												)
											)
										) : ""
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'footer-wrapper' },
						React.createElement(
							'div',
							{ className: 'footer' },
							React.createElement('div', { className: 'disclaimer' }),
							React.createElement(
								'div',
								{ className: 'copyright' },
								'© 2011 TMLI Agency Portal - Powered by TMLI'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'persistency', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												{ colspan: '2' },
												'Persistency Personal'
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'1'
											),
											React.createElement(
												'td',
												null,
												'No SPAJ'
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'2'
											),
											React.createElement(
												'td',
												null,
												'No Policy (Jika sudah terbentuk)'
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'weeklyBonus', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'thead',
											null,
											React.createElement(
												'tr',
												null,
												React.createElement(
													'th',
													null,
													'Total 12 rolling week QC'
												),
												React.createElement(
													'th',
													null,
													'% of FYC'
												),
												React.createElement(
													'th',
													null,
													'Total Bonus'
												)
											)
										),
										React.createElement(
											'tbody',
											null,
											weekly_qc_commission
										)
									)
								)
							)
						)
					),
					React.createElement(_loading2.default, null)
				);
			}
		}]);

		return dashboard_dm;
	}(React.Component);

	exports.default = dashboard_dm;

/***/ },
/* 38 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TopMenu = function (_React$Component) {
		_inherits(TopMenu, _React$Component);

		function TopMenu(props) {
			_classCallCheck(this, TopMenu);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TopMenu).call(this, props));

			_this.state = {
				username: localStorage.getItem('name'),
				lastlogin: localStorage.getItem('last_login'),
				dashboardRole: [5, 6, 7, 8, 9],
				dashboardMaps: {
					9: "fc",
					8: "sm",
					7: "dm",
					6: "rm",
					5: "rd"
				}
			};

			_this.componentDidMount = function () {
				_this.state.dashboardMaps[9] = "fc";
				_this.state.dashboardMaps[8] = "sm";
				_this.state.dashboardMaps[7] = "dm";
				_this.state.dashboardMaps[6] = "rm";
				_this.state.dashboardMaps[5] = "rd";
			};

			_this.componentWillReceiveProps = function (p) {
				if (p.username != null) {
					_this.setState({
						username: p.username,
						lastlogin: p.lastlogin
					});
				}
			};

			return _this;
		}

		_createClass(TopMenu, [{
			key: 'render',
			value: function render() {
				var last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0, 10)) : null;
				var formated_last_login = null;
				if (last_login) {
					var dd = last_login.getDate();
					var mm = last_login.getMonth() + 1; //January is 0!
					var yyyy = last_login.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = dd + '-' + mm + '-' + yyyy;
				}

				var dashboardUrl = null;
				if (this.state.dashboardRole.indexOf(localStorage.getItem('userrole')) != -1) {
					dashboardUrl = 'dashboard_' + this.state.dashboardMaps[response.role];
				}

				return React.createElement(
					'div',
					{ className: 'header-wrapper' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'logo' },
							React.createElement(
								'a',
								{ href: '#' },
								React.createElement('img', { src: 'assets/img/logo.png', width: '190', height: '64', alt: 'TOKIO MARINE' })
							)
						),
						React.createElement(
							'div',
							{ className: 'afterLogo' },
							React.createElement(
								'div',
								{ className: 'afterTop' },
								React.createElement(
									'div',
									{ className: 'left' },
									'Welcome, ',
									this.state.username
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement(
										'ul',
										null,
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: "#/" + dashboardUrl, title: 'Dashboard' },
												React.createElement('i', { className: 'fa fa-cogs' }),
												' Dashboard'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/profile', title: 'Profile' },
												React.createElement('i', { className: 'fa fa-user' }),
												' Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/comission', title: 'Comission' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Comission Report'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#', title: 'Log Out' },
												React.createElement('i', { className: 'fa fa-sign-out' }),
												' Log Out'
											)
										)
									)
								),
								React.createElement('div', { className: 'clearfix' })
							),
							React.createElement(
								'div',
								{ className: 'afterBottom' },
								React.createElement(
									'div',
									{ className: 'left' },
									React.createElement(
										'ul',
										{ className: 'nav nav-tabs', role: 'tablist' },
										React.createElement(
											'li',
											{ role: 'presentation', className: 'active' },
											React.createElement(
												'a',
												{ href: '#personalselling', 'aria-controls': 'personalselling', role: 'tab', 'data-toggle': 'tab' },
												'Personal Selling '
											)
										),
										React.createElement(
											'li',
											{ role: 'presentation' },
											React.createElement(
												'a',
												{ href: '#groupselling', 'aria-controls': 'groupselling', role: 'tab', 'data-toggle': 'tab' },
												'Group Selling'
											)
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement('i', { className: 'fa fa-clock-o' }),
									React.createElement(
										'span',
										null,
										'(Last login: ',
										formated_last_login,
										')'
									)
								),
								React.createElement('div', { className: 'clearfix' })
							)
						)
					)
				);
			}
		}]);

		return TopMenu;
	}(React.Component);

	exports.default = TopMenu;

/***/ },
/* 39 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupMonthlyReport = function (_React$Component) {
		_inherits(GroupMonthlyReport, _React$Component);

		function GroupMonthlyReport(props) {
			_classCallCheck(this, GroupMonthlyReport);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupMonthlyReport).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupMonthlyReport, [{
			key: 'render',
			value: function render() {

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('i', { className: 'fa fa-search-plus' }),
						'[',
						this.state.data && this.state.data.specific_data.monthly_report.month_period,
						'] Report'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'table',
							{ className: 'table table-striped forbullet' },
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'Active Agent'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'span',
										null,
										this.state.data && this.state.data.specific_data.monthly_report.active_agent
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'New Recruit'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'span',
										null,
										this.state.data && this.state.data.specific_data.monthly_report.new_recruit || 0
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'MAPR'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'span',
										null,
										this.state.data && (0, _formatter.decimalFormat)(this.state.data.specific_data.monthly_report.mapr)
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'MAAPR'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'span',
										null,
										this.state.data && this.state.data.specific_data.monthly_report.maapr
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'Activity Ratio'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'span',
										null,
										this.state.data && this.state.data.specific_data.monthly_report.activity_ratio
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'Total MP'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'span',
										null,
										this.state.data && this.state.data.specific_data.monthly_report.total_mp
									)
								)
							)
						)
					)
				);
			}
		}]);

		return GroupMonthlyReport;
	}(React.Component);

	exports.default = GroupMonthlyReport;

/***/ },
/* 40 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _new_business_group = __webpack_require__(41);

	var _new_business_group2 = _interopRequireDefault(_new_business_group);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupNewBusinessTrackingSummary = function (_React$Component) {
		_inherits(GroupNewBusinessTrackingSummary, _React$Component);

		function GroupNewBusinessTrackingSummary(props) {
			_classCallCheck(this, GroupNewBusinessTrackingSummary);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupNewBusinessTrackingSummary).call(this, props));

			_this.state = {
				data: null,
				modalVal: [{
					"no": '-',
					"spaj_number": '-',
					"spaj_policy_no": '-',
					"spaj_holder": '-',
					"spaj_status": '-',
					"spaj_notes": '-'
				}]
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupNewBusinessTrackingSummary, [{
			key: '_data',
			value: function _data(status, period, group) {
				var _this2 = this;

				$.ajax({
					url: _api_route2.default.new_business,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: {
						"status": status,
						"period": period,
						"group": group
					},
					type: 'POST',
					success: function success(response) {
						if (response.length > 0) {
							_this2.setState({
								modalVal: response
							});
						} else {
							_this2.setState({
								modalVal: [{
									"no": '-',
									"spaj_number": '-',
									"spaj_policy_no": '-',
									"spaj_holder": '-',
									"spaj_status": '-',
									"spaj_notes": '-'
								}]
							});
						}
					},
					error: function error(err, response) {
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			}
		}, {
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'content newbusiness' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('i', { className: 'fa fa-newspaper-o' }),
						' New Business Tracking Summary'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'table',
							{ className: 'table table-striped' },
							React.createElement(
								'thead',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement('th', null),
									React.createElement(
										'th',
										{ className: 'bullet' },
										'MTD'
									),
									React.createElement(
										'th',
										{ className: 'bullet' },
										'YTD'
									)
								)
							),
							React.createElement(
								'tbody',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'Submit'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "submitted", "mtd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && this.state.data.spaj.mtd.group.submit
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "submitted", "ytd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && this.state.data.spaj.ytd.group.submit
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Issued'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "issued", "mtd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.issued
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "issued", "ytd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.issued
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Pending'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "pending", "mtd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.pending
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "pending", "ytd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.pending
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Declined'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "declined", "mtd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.declined
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "declined", "ytd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.declined
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Withdrawn'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "withdrawn", "mtd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.withdrawn
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "withdrawn", "ytd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.withdrawn
											)
										)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										null,
										'  Postponed'
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "postponed", "mtd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.group.postponed
											)
										)
									),
									React.createElement(
										'td',
										{ className: 'bullet' },
										React.createElement(
											'a',
											{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusinessgroup', onClick: this._data.bind(this, "postponed", "ytd", 1) },
											React.createElement(
												'span',
												null,
												this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.group.postponed
											)
										)
									)
								)
							)
						)
					),
					React.createElement(_new_business_group2.default, { data: this.state.modalVal && this.state.modalVal })
				);
			}
		}]);

		return GroupNewBusinessTrackingSummary;
	}(React.Component);

	exports.default = GroupNewBusinessTrackingSummary;

/***/ },
/* 41 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var NewBusinessModal = function (_React$Component) {
		_inherits(NewBusinessModal, _React$Component);

		function NewBusinessModal(props) {
			_classCallCheck(this, NewBusinessModal);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(NewBusinessModal).call(this, props));

			_this.state = {
				data: [{
					"no": '-',
					"spaj_number": '-',
					"spaj_policy_no": '-',
					"spaj_holder": '-',
					"spaj_status": '-',
					"spaj_notes": '-'
				}]
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(NewBusinessModal, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'modal fade', id: 'newbusinessgroup', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
					React.createElement(
						'div',
						{ className: 'modal-dialog' },
						React.createElement(
							'div',
							{ className: 'modal-content' },
							React.createElement(
								'div',
								{ className: 'table-responsive' },
								React.createElement(
									'table',
									{ className: 'table table-bordered table-hover' },
									React.createElement(
										'tr',
										null,
										React.createElement(
											'th',
											null,
											'NO'
										),
										React.createElement(
											'th',
											null,
											'NO SPAJ'
										),
										React.createElement(
											'th',
											null,
											'NO POLICY'
										),
										React.createElement(
											'th',
											null,
											'POLICY HOLDER'
										),
										React.createElement(
											'th',
											null,
											'STATUS'
										),
										React.createElement(
											'th',
											null,
											'ALASAN'
										)
									),
									React.createElement(
										'tbody',
										null,
										this.state.data.map(function (item) {
											return React.createElement(
												'tr',
												null,
												React.createElement(
													'td',
													null,
													item.no != null ? item.no : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_number != null ? item.spaj_number : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_policy_no != null ? item.spaj_policy_no : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_holder != null ? item.spaj_holder : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_status != null ? item.spaj_status : '-'
												),
												React.createElement(
													'td',
													null,
													item.spaj_notes != null ? item.spaj_notes : '-'
												)
											);
										})
									)
								)
							)
						)
					)
				);
			}
		}]);

		return NewBusinessModal;
	}(React.Component);

	exports.default = NewBusinessModal;

/***/ },
/* 42 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupProduction = function (_React$Component) {
		_inherits(GroupProduction, _React$Component);

		function GroupProduction(props) {
			_classCallCheck(this, GroupProduction);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupProduction).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			_this.componentDidMount = function () {
				_this.setState({
					data: _this.props.data
				});
			};

			return _this;
		}

		_createClass(GroupProduction, [{
			key: 'render',
			value: function render() {

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('i', { className: 'fa fa-tasks' }),
						' Production (Rp)'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'table',
							{ className: 'table table-striped' },
							React.createElement(
								'thead',
								null,
								React.createElement(
									'tr',
									{ className: 'info' },
									React.createElement('th', null),
									React.createElement(
										'th',
										null,
										'WTD'
									),
									React.createElement(
										'th',
										null,
										'MTD'
									),
									React.createElement(
										'th',
										null,
										'YTD'
									)
								)
							),
							React.createElement(
								'tbody',
								null,
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ className: 'info' },
										'FYP'
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyp.wtd.fyp_group_weekly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyp.mtd.fyp_group_monthly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyp.ytd.fyp_group_yearly_to_date)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ className: 'info' },
										'FYC'
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyc.wtd.fyc_group_weekly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyc.mtd.fyc_group_monthly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.fyc.ytd.fyc_group_yearly_to_date)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ className: 'info' },
										'AFYP'
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyp.wtd.afyp_group_weekly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyp.mtd.afyp_group_monthly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyp.ytd.afyp_group_yearly_to_date)
									)
								),
								React.createElement(
									'tr',
									null,
									React.createElement(
										'td',
										{ className: 'info' },
										'AFYC'
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyc.wtd.afyc_group_weekly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyc.mtd.afyc_group_monthly_to_date)
									),
									React.createElement(
										'td',
										null,
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.production.afyc.ytd.afyc_group_yearly_to_date)
									)
								)
							)
						),
						React.createElement(
							'a',
							{ href: this.state.data && _api_route2.default.production_report_management },
							React.createElement(
								'button',
								{ className: 'btn btn-warning' },
								React.createElement('i', { className: 'fa fa-download' }),
								' Download Production report'
							)
						)
					)
				);
			}
		}]);

		return GroupProduction;
	}(React.Component);

	exports.default = GroupProduction;

/***/ },
/* 43 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupPersistency = function (_React$Component) {
		_inherits(GroupPersistency, _React$Component);

		function GroupPersistency(props) {
			_classCallCheck(this, GroupPersistency);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupPersistency).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			_this.handleShowModal = function (p) {
				if (p == 1) {
					var ecp = _this.state.data.specific_data.group_persistency.group_p1.ecp_p1;
					var acp = _this.state.data.specific_data.group_persistency.group_p1.acp_p1;
					_this.setState({
						modal_title: "Group Persistency P1",
						modal_ecp: (0, _formatter.MoneyFormat)(ecp),
						modal_acp: (0, _formatter.MoneyFormat)(acp)
					});
				} else {
					var ecp = _this.state.data.specific_data.group_persistency.group_p2.ecp_p2;
					var acp = _this.state.data.specific_data.group_persistency.group_p2.acp_p2;
					_this.setState({
						modal_title: "Group Persistency P2",
						modal_ecp: (0, _formatter.MoneyFormat)(ecp),
						modal_acp: (0, _formatter.MoneyFormat)(acp)
					});
				}
				$("#group_persistency").modal("show");
			};

			return _this;
		}

		_createClass(GroupPersistency, [{
			key: 'render',
			value: function render() {

				return React.createElement(
					'div',
					{ className: 'content' },
					React.createElement(
						'div',
						{ className: 'title' },
						React.createElement('i', { className: 'fa fa-percent' }),
						' Persistency'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'div',
							{ className: 'persistency' },
							React.createElement(
								'div',
								{ className: 'row' },
								React.createElement(
									'div',
									{ className: 'col-xs-6' },
									React.createElement(
										'div',
										{ className: 'titlePersistency' },
										'P1'
									),
									React.createElement(
										'div',
										{ className: 'percentPersistency' },
										React.createElement(
											'div',
											{ className: "c100 orange p" + (this.state.data && (0, _formatter.decimalFormat)(this.state.data.specific_data.group_persistency.group_p1.p1)) },
											React.createElement(
												'span',
												null,
												this.state.data && (0, _formatter.decimalFormat)(this.state.data.specific_data.group_persistency.group_p1.p1),
												'%'
											),
											React.createElement(
												'div',
												{ className: 'slice' },
												React.createElement('div', { className: 'bar' }),
												React.createElement('div', { className: 'fill' })
											)
										),
										React.createElement('div', { className: 'clearfix' })
									),
									React.createElement(
										'div',
										{ className: 'buttonPersistency' },
										React.createElement(
											'a',
											{ onClick: this.handleShowModal.bind(this, 1) },
											'view details'
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'col-xs-6' },
									React.createElement(
										'div',
										{ className: 'titlePersistency' },
										'P2'
									),
									React.createElement(
										'div',
										{ className: 'percentPersistency' },
										React.createElement(
											'div',
											{ className: "c100 green p" + (this.state.data && (0, _formatter.decimalFormat)(this.state.data.specific_data.group_persistency.group_p2.p2)) },
											React.createElement(
												'span',
												null,
												this.state.data && (0, _formatter.decimalFormat)(this.state.data.specific_data.group_persistency.group_p2.p2),
												'%'
											),
											React.createElement(
												'div',
												{ className: 'slice' },
												React.createElement('div', { className: 'bar' }),
												React.createElement('div', { className: 'fill' })
											)
										),
										React.createElement('div', { className: 'clearfix' })
									),
									React.createElement(
										'div',
										{ className: 'buttonPersistency' },
										React.createElement(
											'a',
											{ onClick: this.handleShowModal.bind(this, 2) },
											'view details'
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'group_persistency', tabIndex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												{ colSpan: '2' },
												this.state.modal_title
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'ECP'
											),
											React.createElement(
												'td',
												null,
												this.state.modal_ecp
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'ACP'
											),
											React.createElement(
												'td',
												null,
												this.state.modal_acp
											)
										)
									)
								)
							)
						)
					)
				);
			}
		}]);

		return GroupPersistency;
	}(React.Component);

	exports.default = GroupPersistency;

/***/ },
/* 44 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupOverriding = function (_React$Component) {
		_inherits(GroupOverriding, _React$Component);

		function GroupOverriding(props) {
			_classCallCheck(this, GroupOverriding);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupOverriding).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupOverriding, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calculator' }),
						' Overriding (OR)'
					),
					React.createElement(
						'div',
						{ className: 'col-xs-5 entry' },
						React.createElement(
							'form',
							{ className: 'form-horizontal overriding' },
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'FYC_Group(WTD)'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: (0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.wtd_data.fyc_group_wtd) })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'SYC_Group(WTD)'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: (0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.wtd_data.syc_group_wtd) })
								)
							)
						)
					),
					React.createElement('div', { className: 'clearfix' }),
					React.createElement(
						'div',
						{ className: 'col-xs-6 form-group total' },
						React.createElement(
							'label',
							{ className: 'col-xs-5' },
							'Direct FC:'
						),
						React.createElement(
							'div',
							{ className: 'col-xs-7' },
							React.createElement(
								'span',
								{ className: 'red' },
								'Rp ',
								(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.direct_fc)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'col-xs-6 form-group total' },
						React.createElement(
							'label',
							{ className: 'col-xs-5' },
							'Direct SM:'
						),
						React.createElement(
							'div',
							{ className: 'col-xs-7' },
							React.createElement(
								'span',
								{ className: 'red' },
								'Rp ',
								(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.direct_sm)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat overriding mingguan Anda adalah Rp ',
						(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.total_or),
						'. Batas akhir issued case minggu ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && this.state.data.specific_data.income_calculation.overriding.end_of_week
						),
						'"'
					)
				);
			}
		}]);

		return GroupOverriding;
	}(React.Component);

	exports.default = GroupOverriding;

/***/ },
/* 45 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupBonusOverriding = function (_React$Component) {
		_inherits(GroupBonusOverriding, _React$Component);

		function GroupBonusOverriding(props) {
			_classCallCheck(this, GroupBonusOverriding);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupBonusOverriding).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupBonusOverriding, [{
			key: 'render',
			value: function render() {
				var bo_direct_fc_table = this.state.data ? this.state.data.specific_data.income_calculation.bonus_overriding.bo_direct_fc_table : null;
				var bo_direct_fc = [];
				if (bo_direct_fc_table) {
					$.map(bo_direct_fc_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ key: index, className: 'red' },
								React.createElement(
									'td',
									null,
									value.active_agent
								),
								React.createElement(
									'td',
									null,
									React.createElement('i', { className: 'fa fa-angle-right' }),
									' ',
									value.bonus_or
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_or_bonus)
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.active_agent
								),
								React.createElement(
									'td',
									null,
									React.createElement('i', { className: 'fa fa-angle-right' }),
									' ',
									value.bonus_or
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_or_bonus)
								)
							);
						}
						bo_direct_fc.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calculator' }),
						' Bonus Overriding [Month - Year]'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'div',
							{ className: 'col-xs-6' },
							React.createElement(
								'form',
								{ className: 'form-horizontal' },
								React.createElement(
									'div',
									{ className: 'form-group' },
									React.createElement(
										'label',
										{ className: 'col-sm-4 control-label' },
										'FYC (weekly to date)'
									),
									React.createElement(
										'div',
										{ className: 'col-sm-8' },
										React.createElement('input', { type: 'email', className: 'form-control', placeholder: '-', value: this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.fyc_wtd })
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'periode' },
								'Period : [',
								this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.period.start_date.substring(0, 10),
								' - ',
								this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.period.end_date.substring(0, 10),
								']'
							)
						),
						React.createElement('div', { className: 'clearfix' }),
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-xs-5 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable' },
									'Bonus Overriding from Direct FC'
								),
								React.createElement(
									'table',
									{ className: 'table table-bordered table-striped' },
									React.createElement(
										'thead',
										null,
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												null,
												'Total weekly',
												React.createElement('br', null),
												'Active Agent'
											),
											React.createElement(
												'th',
												null,
												'Bonus OR(%)'
											),
											React.createElement(
												'th',
												null,
												'Total OR Bonus'
											)
										)
									),
									React.createElement(
										'tbody',
										null,
										bo_direct_fc
									)
								),
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'Bonus Overriding from Direct SM:'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement(
										'span',
										{ className: 'red' },
										'Rp ',
										this.state.data && (0, _formatter.MoneyFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.bo_direct_sm)
									)
								)
							),
							React.createElement('div', { className: 'col-xs-7 responsive2' }),
							React.createElement('div', { className: 'clearfix' })
						)
					),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat bonus mingguan Anda adalah Rp ',
						this.state.data && (0, _formatter.MoneyFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.bo_total_or),
						'. Batas akhir issued case minggu ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.end_of_month.substring(0, 10)
						),
						'"'
					)
				);
			}
		}]);

		return GroupBonusOverriding;
	}(React.Component);

	exports.default = GroupBonusOverriding;

/***/ },
/* 46 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	var _top_menu = __webpack_require__(38);

	var _top_menu2 = _interopRequireDefault(_top_menu);

	var _agent_profile = __webpack_require__(30);

	var _agent_profile2 = _interopRequireDefault(_agent_profile);

	var _new_business_tracking_summary = __webpack_require__(31);

	var _new_business_tracking_summary2 = _interopRequireDefault(_new_business_tracking_summary);

	var _production = __webpack_require__(33);

	var _production2 = _interopRequireDefault(_production);

	var _persistency = __webpack_require__(34);

	var _persistency2 = _interopRequireDefault(_persistency);

	var _weekly_bonus = __webpack_require__(35);

	var _weekly_bonus2 = _interopRequireDefault(_weekly_bonus);

	var _year_end_bonus = __webpack_require__(36);

	var _year_end_bonus2 = _interopRequireDefault(_year_end_bonus);

	var _group_monthly_report = __webpack_require__(39);

	var _group_monthly_report2 = _interopRequireDefault(_group_monthly_report);

	var _group_new_business_tracking_summary = __webpack_require__(40);

	var _group_new_business_tracking_summary2 = _interopRequireDefault(_group_new_business_tracking_summary);

	var _group_production = __webpack_require__(42);

	var _group_production2 = _interopRequireDefault(_group_production);

	var _group_persistency = __webpack_require__(43);

	var _group_persistency2 = _interopRequireDefault(_group_persistency);

	var _group_rm_overriding = __webpack_require__(47);

	var _group_rm_overriding2 = _interopRequireDefault(_group_rm_overriding);

	var _group_rm_parallel_overriding = __webpack_require__(48);

	var _group_rm_parallel_overriding2 = _interopRequireDefault(_group_rm_parallel_overriding);

	var _group_rm_bonus_overriding = __webpack_require__(49);

	var _group_rm_bonus_overriding2 = _interopRequireDefault(_group_rm_bonus_overriding);

	var _new_business = __webpack_require__(32);

	var _new_business2 = _interopRequireDefault(_new_business);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Helper

	// Layout

	// Personal Component

	// Group Component

	// Modal


	var dashboard_rm = function (_React$Component) {
		_inherits(dashboard_rm, _React$Component);

		function dashboard_rm(props) {
			_classCallCheck(this, dashboard_rm);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(dashboard_rm).call(this, props));

			_this.componentWillMount = function () {
				(0, _cek_auth2.default)();
			};

			_this.componentDidMount = function () {
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.agentDashboardv2,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						$('#loading').modal('hide');

						// set local storage
						localStorage.setItem('name', response.name);
						localStorage.setItem('last_login', response.last_login);

						_this.setState({
							data: response,
							agentType: (0, _formatter.CheckAgentType)(response.agent_data.code)
						});
					},
					error: function error(err, response) {
						$('#loading').modal('hide');
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			_this.state = {
				data: null,
				agentType: "MO"
			};
			return _this;
		}

		_createClass(dashboard_rm, [{
			key: 'render',
			value: function render() {

				var weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : null;
				var weekly_qc_commission = [];
				if (weekly_qc_commission_table) {
					$.map(weekly_qc_commission_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ classNameName: 'red', key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ classNameName: 'down' },
									React.createElement('i', { classNameName: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus,
									React.createElement('i', { classNameName: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ classNameName: 'down' },
									React.createElement('i', { classNameName: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus
								)
							);
						}
						weekly_qc_commission.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrap2' },
					React.createElement(_top_menu2.default, { username: this.state.data && this.state.data.name, lastlogin: this.state.data && this.state.data.last_login }),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'tab-content' },
								React.createElement(
									'div',
									{ role: 'tabpanel', className: 'tab-pane active', id: 'personalselling' },
									React.createElement(
										'div',
										{ className: 'topWidget' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_agent_profile2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_new_business_tracking_summary2.default, { data: this.state.data && this.state.data })
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_production2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_persistency2.default, { data: this.state.data && this.state.data }) : ""
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										this.state.agentType == "MO" ? React.createElement(
											'div',
											{ className: 'bottomWidget' },
											React.createElement(
												'div',
												{ className: 'title' },
												'Income Calculation'
											),
											React.createElement(
												'div',
												{ className: 'content' },
												React.createElement(
													'div',
													{ className: 'row' },
													React.createElement(
														'div',
														{ className: 'col-xs-12 responsive3' },
														React.createElement(_weekly_bonus2.default, { data: this.state.data && this.state.data })
													),
													React.createElement('div', { className: 'clearfix h25' }),
													React.createElement(
														'div',
														{ className: 'col-xs-12 responsive3' },
														React.createElement(_year_end_bonus2.default, { data: this.state.data && this.state.data })
													)
												)
											)
										) : ""
									)
								),
								React.createElement(
									'div',
									{ role: 'tabpanel', className: 'tab-pane', id: 'groupselling' },
									React.createElement(
										'div',
										{ className: 'topWidget' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_monthly_report2.default, { data: this.state.data && this.state.data }) : React.createElement(_group_production2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_group_new_business_tracking_summary2.default, { data: this.state.data && this.state.data })
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_production2.default, { data: this.state.data && this.state.data }) : ""
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_persistency2.default, { data: this.state.data && this.state.data }) : ""
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										this.state.agentType == "MO" && this.state.agentType == "SO" ? React.createElement(
											'div',
											{ className: 'bottomWidget' },
											React.createElement(
												'div',
												{ className: 'title' },
												'Income Calculation'
											),
											React.createElement(
												'div',
												{ className: 'content' },
												React.createElement(
													'div',
													{ className: 'row' },
													React.createElement(
														'div',
														{ className: 'col-xs-5 responsive3' },
														React.createElement(GroupSmOverriding, { data: this.state.data && this.state.data })
													),
													React.createElement(
														'div',
														{ className: 'col-xs-7 responsive3' },
														React.createElement(GroupSmBonusOverriding, { data: this.state.data && this.state.data })
													)
												)
											)
										) : ""
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'footer-wrapper' },
						React.createElement(
							'div',
							{ className: 'footer' },
							React.createElement('div', { className: 'disclaimer' }),
							React.createElement(
								'div',
								{ className: 'copyright' },
								'© 2011 TMLI Agency Portal - Powered by TMLI'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'persistency', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												{ colspan: '2' },
												'Persistency Personal'
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'1'
											),
											React.createElement(
												'td',
												null,
												'No SPAJ'
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'2'
											),
											React.createElement(
												'td',
												null,
												'No Policy (Jika sudah terbentuk)'
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'weeklyBonus', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'thead',
											null,
											React.createElement(
												'tr',
												null,
												React.createElement(
													'th',
													null,
													'Total 12 rolling week QC'
												),
												React.createElement(
													'th',
													null,
													'% of FYC'
												),
												React.createElement(
													'th',
													null,
													'Total Bonus'
												)
											)
										),
										React.createElement(
											'tbody',
											null,
											weekly_qc_commission
										)
									)
								)
							)
						)
					),
					React.createElement(_loading2.default, null)
				);
			}
		}]);

		return dashboard_rm;
	}(React.Component);

	exports.default = dashboard_rm;

/***/ },
/* 47 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupRmOverriding = function (_React$Component) {
		_inherits(GroupRmOverriding, _React$Component);

		function GroupRmOverriding(props) {
			_classCallCheck(this, GroupRmOverriding);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupRmOverriding).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupRmOverriding, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calculator' }),
						' Overriding (OR)'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'form',
							{ className: 'form-horizontal overriding' },
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'FYC_Group(WTD)'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: (0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.wtd_data.fyc_group_wtd) })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'SYC_Group(WTD)'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: (0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.wtd_data.syc_group_wtd) })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group total' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'Direct FC:'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement(
										'span',
										{ className: 'red' },
										'Rp ',
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.direct_fc)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group total' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'Direct SM:'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement(
										'span',
										{ className: 'red' },
										'Rp ',
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.direct_sm)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group total' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'Direct DM:'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement(
										'span',
										{ className: 'red' },
										'Rp ',
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.direct_dm)
									)
								)
							)
						)
					),
					React.createElement('div', { className: 'clearfix' }),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat overriding mingguan Anda adalah Rp ',
						(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.total_or),
						'. Batas akhir issued case minggu ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && this.state.data.specific_data.income_calculation.overriding.end_of_week
						),
						'"'
					)
				);
			}
		}]);

		return GroupRmOverriding;
	}(React.Component);

	exports.default = GroupRmOverriding;

/***/ },
/* 48 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupRmParallelOverriding = function (_React$Component) {
		_inherits(GroupRmParallelOverriding, _React$Component);

		function GroupRmParallelOverriding(props) {
			_classCallCheck(this, GroupRmParallelOverriding);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupRmParallelOverriding).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupRmParallelOverriding, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calculator' }),
						' Parallel Overriding '
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'form',
							{ className: 'form-horizontal overriding' },
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'FYC_Group(MTD)'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement('input', { type: 'email', className: 'form-control', placeholder: '-', value: (0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.wtd_data.fyc_group_wtd) })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'SYC_Group(MTD)'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement('input', { type: 'email', className: 'form-control', placeholder: '-', value: (0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.wtd_data.syc_group_wtd) })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group total' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'Parallel OR G1:'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement(
										'span',
										{ className: 'red' },
										'Rp ',
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.direct_fc)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat overriding mingguan Anda adalah Rp ',
						(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.total_or),
						'. Batas akhir issued case minggu ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && this.state.data.specific_data.income_calculation.overriding.end_of_week
						),
						'"'
					)
				);
			}
		}]);

		return GroupRmParallelOverriding;
	}(React.Component);

	exports.default = GroupRmParallelOverriding;

/***/ },
/* 49 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupRmBonusOverriding = function (_React$Component) {
		_inherits(GroupRmBonusOverriding, _React$Component);

		function GroupRmBonusOverriding(props) {
			_classCallCheck(this, GroupRmBonusOverriding);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupRmBonusOverriding).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupRmBonusOverriding, [{
			key: 'render',
			value: function render() {
				var bo_direct_fc_table = this.state.data ? this.state.data.specific_data.income_calculation.bonus_overriding.bo_direct_fc_table : null;
				var bo_direct_fc = [];
				if (bo_direct_fc_table) {
					$.map(bo_direct_fc_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ key: index, className: 'red' },
								React.createElement(
									'td',
									null,
									value.active_agent
								),
								React.createElement(
									'td',
									null,
									React.createElement('i', { className: 'fa fa-angle-right' }),
									' ',
									value.bonus_or
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_or_bonus)
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.active_agent
								),
								React.createElement(
									'td',
									null,
									React.createElement('i', { className: 'fa fa-angle-right' }),
									' ',
									value.bonus_or
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_or_bonus)
								)
							);
						}
						bo_direct_fc.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calculator' }),
						' Bonus Overriding '
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'form',
							{ className: 'form-horizontal' },
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-sm-4 control-label' },
									'FYC (weekly to date)'
								),
								React.createElement(
									'div',
									{ className: 'col-sm-8' },
									React.createElement('input', { type: 'email', className: 'form-control', placeholder: '-', value: this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.fyc_wtd })
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'periode' },
							'Period : [',
							this.state.data && (0, _formatter.DateFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.period.start_date.substring(0, 10)),
							' - ',
							this.state.data && (0, _formatter.DateFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.period.end_date.substring(0, 10)),
							']'
						),
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-xs-5 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable' },
									'Bonus Overriding from Direct FC'
								),
								React.createElement(
									'table',
									{ className: 'table table-bordered table-striped' },
									React.createElement(
										'thead',
										null,
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												null,
												'Total weekly',
												React.createElement('br', null),
												'Active Agent'
											),
											React.createElement(
												'th',
												null,
												'Bonus OR(%)'
											),
											React.createElement(
												'th',
												null,
												'Total OR Bonus'
											)
										)
									),
									React.createElement(
										'tbody',
										null,
										bo_direct_fc
									)
								),
								React.createElement(
									'div',
									{ className: 'col-xs-12 responsive2' },
									React.createElement(
										'label',
										{ className: 'col-xs-6' },
										'Bonus Overriding from Direct SM:'
									),
									React.createElement(
										'div',
										{ className: 'col-xs-6' },
										React.createElement(
											'span',
											{ className: 'red' },
											'Rp ',
											this.state.data && (0, _formatter.MoneyFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.bo_direct_sm)
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'col-xs-12 responsive2' },
									React.createElement(
										'label',
										{ className: 'col-xs-6' },
										'Bonus Overriding from Direct DM:'
									),
									React.createElement(
										'div',
										{ className: 'col-xs-6' },
										React.createElement(
											'span',
											{ className: 'red' },
											'Rp ',
											this.state.data && (0, _formatter.MoneyFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.bo_direct_dm)
										)
									)
								)
							),
							React.createElement('div', { className: 'col-xs-7 responsive2' }),
							React.createElement('div', { className: 'clearfix' })
						)
					),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat bonus mingguan Anda adalah Rp ',
						this.state.data && (0, _formatter.MoneyFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.bo_total_or),
						'. Batas akhir issued case minggu ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.end_of_month.substring(0, 10)
						),
						'"'
					)
				);
			}
		}]);

		return GroupRmBonusOverriding;
	}(React.Component);

	exports.default = GroupRmBonusOverriding;

/***/ },
/* 50 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	var _top_menu = __webpack_require__(38);

	var _top_menu2 = _interopRequireDefault(_top_menu);

	var _agent_profile = __webpack_require__(30);

	var _agent_profile2 = _interopRequireDefault(_agent_profile);

	var _new_business_tracking_summary = __webpack_require__(31);

	var _new_business_tracking_summary2 = _interopRequireDefault(_new_business_tracking_summary);

	var _production = __webpack_require__(33);

	var _production2 = _interopRequireDefault(_production);

	var _persistency = __webpack_require__(34);

	var _persistency2 = _interopRequireDefault(_persistency);

	var _weekly_bonus = __webpack_require__(35);

	var _weekly_bonus2 = _interopRequireDefault(_weekly_bonus);

	var _year_end_bonus = __webpack_require__(36);

	var _year_end_bonus2 = _interopRequireDefault(_year_end_bonus);

	var _group_monthly_report = __webpack_require__(39);

	var _group_monthly_report2 = _interopRequireDefault(_group_monthly_report);

	var _group_new_business_tracking_summary = __webpack_require__(40);

	var _group_new_business_tracking_summary2 = _interopRequireDefault(_group_new_business_tracking_summary);

	var _group_production = __webpack_require__(42);

	var _group_production2 = _interopRequireDefault(_group_production);

	var _group_persistency = __webpack_require__(43);

	var _group_persistency2 = _interopRequireDefault(_group_persistency);

	var _group_sm_overriding = __webpack_require__(51);

	var _group_sm_overriding2 = _interopRequireDefault(_group_sm_overriding);

	var _group_sm_bonus_overriding = __webpack_require__(52);

	var _group_sm_bonus_overriding2 = _interopRequireDefault(_group_sm_bonus_overriding);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Helper

	// Layout

	// Personal Component

	// Group Component


	// Modal
	// import NewBusinessModal from '../../common_components/modal/new_business';

	var dashboard_sm = function (_React$Component) {
		_inherits(dashboard_sm, _React$Component);

		function dashboard_sm(props) {
			_classCallCheck(this, dashboard_sm);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(dashboard_sm).call(this, props));

			_this.componentWillMount = function () {
				(0, _cek_auth2.default)();
			};

			_this.componentDidMount = function () {
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.agentDashboardv2,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						console.log(response);
						$('#loading').modal('hide');

						// set local storage
						localStorage.setItem('name', response.name);
						localStorage.setItem('last_login', response.last_login);

						_this.setState({
							data: response,
							agentType: (0, _formatter.CheckAgentType)(response.agent_data.code)
						});
					},
					error: function error(err, response) {
						$('#loading').modal('hide');
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			_this.state = {
				data: null,
				agentType: "MO"
			};
			return _this;
		}

		_createClass(dashboard_sm, [{
			key: 'render',
			value: function render() {
				var weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : null;
				var weekly_qc_commission = [];
				if (weekly_qc_commission_table) {
					$.map(weekly_qc_commission_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ classNameName: 'red', key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ classNameName: 'down' },
									React.createElement('i', { classNameName: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus,
									React.createElement('i', { classNameName: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ classNameName: 'down' },
									React.createElement('i', { classNameName: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus
								)
							);
						}
						weekly_qc_commission.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrap2' },
					React.createElement(_top_menu2.default, { username: this.state.data && this.state.data.name, lastlogin: this.state.data && this.state.data.last_login }),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'tab-content' },
								React.createElement(
									'div',
									{ role: 'tabpanel', className: 'tab-pane active', id: 'personalselling' },
									React.createElement(
										'div',
										{ className: 'topWidget' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_agent_profile2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_new_business_tracking_summary2.default, { data: this.state.data && this.state.data })
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_production2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_persistency2.default, { data: this.state.data && this.state.data }) : ""
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										this.state.agentType == "MO" ? React.createElement(
											'div',
											{ className: 'bottomWidget' },
											React.createElement(
												'div',
												{ className: 'title' },
												'Income Calculation'
											),
											React.createElement(
												'div',
												{ className: 'content' },
												React.createElement(
													'div',
													{ className: 'row' },
													React.createElement(
														'div',
														{ className: 'col-xs-12 responsive3' },
														React.createElement(_weekly_bonus2.default, { data: this.state.data && this.state.data })
													),
													React.createElement('div', { className: 'clearfix h25' }),
													React.createElement(
														'div',
														{ className: 'col-xs-12 responsive3' },
														React.createElement(_year_end_bonus2.default, { data: this.state.data && this.state.data })
													)
												)
											)
										) : ""
									)
								),
								React.createElement(
									'div',
									{ role: 'tabpanel', className: 'tab-pane', id: 'groupselling' },
									React.createElement(
										'div',
										{ className: 'topWidget' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_monthly_report2.default, { data: this.state.data && this.state.data }) : React.createElement(_group_production2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_group_new_business_tracking_summary2.default, { data: this.state.data && this.state.data })
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_production2.default, { data: this.state.data && this.state.data }) : ""
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_persistency2.default, { data: this.state.data && this.state.data }) : ""
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										this.state.agentType == "MO" && this.state.agentType == "SO" ? React.createElement(
											'div',
											{ className: 'bottomWidget' },
											React.createElement(
												'div',
												{ className: 'title' },
												'Income Calculation'
											),
											React.createElement(
												'div',
												{ className: 'content' },
												React.createElement(
													'div',
													{ className: 'row' },
													React.createElement(
														'div',
														{ className: 'col-xs-5 responsive3' },
														React.createElement(_group_sm_overriding2.default, { data: this.state.data && this.state.data })
													),
													React.createElement(
														'div',
														{ className: 'col-xs-7 responsive3' },
														React.createElement(_group_sm_bonus_overriding2.default, { data: this.state.data && this.state.data })
													)
												)
											)
										) : ""
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'footer-wrapper' },
						React.createElement(
							'div',
							{ className: 'footer' },
							React.createElement('div', { className: 'disclaimer' }),
							React.createElement(
								'div',
								{ className: 'copyright' },
								'© 2011 TMLI Agency Portal - Powered by TMLI'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'persistency', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												{ colspan: '2' },
												'Persistency Personal'
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'1'
											),
											React.createElement(
												'td',
												null,
												'No SPAJ'
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'2'
											),
											React.createElement(
												'td',
												null,
												'No Policy (Jika sudah terbentuk)'
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'weeklyBonus', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'thead',
											null,
											React.createElement(
												'tr',
												null,
												React.createElement(
													'th',
													null,
													'Total 12 rolling week QC'
												),
												React.createElement(
													'th',
													null,
													'% of FYC'
												),
												React.createElement(
													'th',
													null,
													'Total Bonus'
												)
											)
										),
										React.createElement(
											'tbody',
											null,
											weekly_qc_commission
										)
									)
								)
							)
						)
					),
					React.createElement(_loading2.default, null)
				);
			}
		}]);

		return dashboard_sm;
	}(React.Component);

	exports.default = dashboard_sm;


	var NewBusiness = React.createClass({
		displayName: 'NewBusiness',

		render: function render() {
			return React.createElement(
				'div',
				{ className: 'content newbusiness' },
				React.createElement(
					'div',
					{ className: 'title' },
					React.createElement('i', { className: 'fa fa-newspaper-o' }),
					' New Business Tracking Summary'
				),
				React.createElement(
					'div',
					{ className: 'entry' },
					React.createElement(
						'table',
						{ className: 'table table-striped' },
						React.createElement(
							'thead',
							null,
							React.createElement(
								'tr',
								null,
								React.createElement('th', null),
								React.createElement(
									'th',
									{ className: 'bullet' },
									'MTD'
								),
								React.createElement(
									'th',
									{ className: 'bullet' },
									'YTD'
								)
							)
						),
						React.createElement(
							'tbody',
							null,
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'Submit'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && this.state.data.spaj.mtd.personal.submit
										)
									)
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && this.state.data.spaj.ytd.personal.submit
										)
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'  Issued'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.issued
										)
									)
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.issued
										)
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'  Pending'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.pending
										)
									)
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.pending
										)
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'  Declined'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.declined
										)
									)
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.declined
										)
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'  Withdrawn'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.withdrawn
										)
									)
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.withdrawn
										)
									)
								)
							),
							React.createElement(
								'tr',
								null,
								React.createElement(
									'td',
									null,
									'  Postponed'
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.mtd.personal.postponed
										)
									)
								),
								React.createElement(
									'td',
									{ className: 'bullet' },
									React.createElement(
										'a',
										{ href: '#', 'data-toggle': 'modal', 'data-target': '#newbusiness' },
										React.createElement(
											'span',
											null,
											this.state.data && '\xa0\xa0\xa0\xa0\xa0\xa0\xa0\xa0' + this.state.data.spaj.ytd.personal.postponed
										)
									)
								)
							)
						)
					)
				)
			);
		}
	});

/***/ },
/* 51 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupSmOverriding = function (_React$Component) {
		_inherits(GroupSmOverriding, _React$Component);

		function GroupSmOverriding(props) {
			_classCallCheck(this, GroupSmOverriding);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupSmOverriding).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupSmOverriding, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calculator' }),
						' Overriding (OR)'
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'form',
							{ className: 'form-horizontal overriding' },
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'FYC_Group(WTD)'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: (0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.wtd_data.fyc_group_wtd) })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'SYC_Group(WTD)'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement('input', { type: 'text', className: 'form-control', placeholder: '-', value: (0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.wtd_data.syc_group_wtd) })
								)
							),
							React.createElement(
								'div',
								{ className: 'form-group total' },
								React.createElement(
									'label',
									{ className: 'col-xs-5' },
									'Direct FC:'
								),
								React.createElement(
									'div',
									{ className: 'col-xs-7' },
									React.createElement(
										'span',
										{ className: 'red' },
										'Rp ',
										(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.direct_fc)
									)
								)
							)
						)
					),
					React.createElement('div', { className: 'clearfix' }),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat overriding mingguan Anda adalah Rp ',
						(0, _formatter.MoneyFormat)(this.state.data && this.state.data.specific_data.income_calculation.overriding.total_or),
						'. Batas akhir issued case minggu ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && this.state.data.specific_data.income_calculation.overriding.end_of_week
						),
						'"'
					)
				);
			}
		}]);

		return GroupSmOverriding;
	}(React.Component);

	exports.default = GroupSmOverriding;

/***/ },
/* 52 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var GroupSmBonusOverriding = function (_React$Component) {
		_inherits(GroupSmBonusOverriding, _React$Component);

		function GroupSmBonusOverriding(props) {
			_classCallCheck(this, GroupSmBonusOverriding);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(GroupSmBonusOverriding).call(this, props));

			_this.state = {
				data: null
			};

			_this.componentWillReceiveProps = function (p) {
				_this.setState({
					data: p.data
				});
			};

			return _this;
		}

		_createClass(GroupSmBonusOverriding, [{
			key: 'render',
			value: function render() {
				var bo_direct_fc_table = this.state.data ? this.state.data.specific_data.income_calculation.bonus_overriding.bo_direct_fc_table : null;
				var bo_direct_fc = [];
				if (bo_direct_fc_table) {
					$.map(bo_direct_fc_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ key: index, className: 'red' },
								React.createElement(
									'td',
									null,
									value.active_agent
								),
								React.createElement(
									'td',
									null,
									React.createElement('i', { className: 'fa fa-angle-right' }),
									' ',
									value.bonus_or
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_or_bonus)
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.active_agent
								),
								React.createElement(
									'td',
									null,
									React.createElement('i', { className: 'fa fa-angle-right' }),
									' ',
									value.bonus_or
								),
								React.createElement(
									'td',
									null,
									(0, _formatter.MoneyFormat)(value.total_or_bonus)
								)
							);
						}
						bo_direct_fc.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrapContent' },
					React.createElement(
						'div',
						{ className: 'subtitle' },
						React.createElement('i', { className: 'fa fa-calculator' }),
						' Bonus Overriding '
					),
					React.createElement(
						'div',
						{ className: 'entry' },
						React.createElement(
							'form',
							{ className: 'form-horizontal' },
							React.createElement(
								'div',
								{ className: 'form-group' },
								React.createElement(
									'label',
									{ className: 'col-sm-4 control-label' },
									'FYC (weekly to date)'
								),
								React.createElement(
									'div',
									{ className: 'col-sm-8' },
									React.createElement('input', { type: 'email', className: 'form-control', placeholder: '-', value: this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.fyc_wtd })
								)
							)
						),
						React.createElement(
							'div',
							{ className: 'periode' },
							'Period : [',
							this.state.data && (0, _formatter.DateFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.period.start_date.substring(0, 10)),
							' - ',
							this.state.data && (0, _formatter.DateFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.period.end_date.substring(0, 10)),
							']'
						),
						React.createElement(
							'div',
							{ className: 'row' },
							React.createElement(
								'div',
								{ className: 'col-xs-5 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable' },
									'Bonus Overriding from Direct FC'
								),
								React.createElement(
									'table',
									{ className: 'table table-bordered table-striped' },
									React.createElement(
										'thead',
										null,
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												null,
												'Total weekly',
												React.createElement('br', null),
												'Active Agent'
											),
											React.createElement(
												'th',
												null,
												'Bonus OR(%)'
											),
											React.createElement(
												'th',
												null,
												'Total OR Bonus'
											)
										)
									),
									React.createElement(
										'tbody',
										null,
										bo_direct_fc
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'col-xs-7 responsive2' },
								React.createElement(
									'div',
									{ className: 'titleTable' },
									'Accumulated Bonus Overriding'
								),
								React.createElement(
									'table',
									{ className: 'table table-bordered table-striped' },
									React.createElement(
										'thead',
										null,
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												null,
												'Week'
											),
											React.createElement(
												'th',
												null,
												'Bonus Overriding'
											)
										)
									),
									React.createElement('tbody', null)
								)
							),
							React.createElement('div', { className: 'clearfix' })
						)
					),
					React.createElement(
						'div',
						{ className: 'noteRed' },
						'Tingkat bonus mingguan Anda adalah Rp ',
						this.state.data && (0, _formatter.MoneyFormat)(this.state.data.specific_data.income_calculation.bonus_overriding.bo_total_or),
						'. Batas akhir issued case minggu ini adalah "',
						React.createElement(
							'span',
							{ className: 'blink' },
							this.state.data && this.state.data.specific_data.income_calculation.bonus_overriding.end_of_month.substring(0, 10)
						),
						'"'
					)
				);
			}
		}]);

		return GroupSmBonusOverriding;
	}(React.Component);

	exports.default = GroupSmBonusOverriding;

/***/ },
/* 53 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	var _top_menu_rd = __webpack_require__(54);

	var _top_menu_rd2 = _interopRequireDefault(_top_menu_rd);

	var _agent_profile = __webpack_require__(30);

	var _agent_profile2 = _interopRequireDefault(_agent_profile);

	var _new_business_tracking_summary = __webpack_require__(31);

	var _new_business_tracking_summary2 = _interopRequireDefault(_new_business_tracking_summary);

	var _group_monthly_report = __webpack_require__(39);

	var _group_monthly_report2 = _interopRequireDefault(_group_monthly_report);

	var _group_new_business_tracking_summary = __webpack_require__(40);

	var _group_new_business_tracking_summary2 = _interopRequireDefault(_group_new_business_tracking_summary);

	var _group_production = __webpack_require__(42);

	var _group_production2 = _interopRequireDefault(_group_production);

	var _group_persistency = __webpack_require__(43);

	var _group_persistency2 = _interopRequireDefault(_group_persistency);

	var _new_business = __webpack_require__(32);

	var _new_business2 = _interopRequireDefault(_new_business);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	// Helper

	// Layout

	// Personal Component

	// Group Component

	// Modal


	var dashboard_rd = function (_React$Component) {
		_inherits(dashboard_rd, _React$Component);

		function dashboard_rd(props) {
			_classCallCheck(this, dashboard_rd);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(dashboard_rd).call(this, props));

			_this.componentWillMount = function () {
				(0, _cek_auth2.default)();
			};

			_this.componentDidMount = function () {
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.agentDashboardv2,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						$('#loading').modal('hide');

						// set local storage
						localStorage.setItem('name', response.name);
						localStorage.setItem('last_login', response.last_login);

						_this.setState({
							data: response,
							agentType: (0, _formatter.CheckAgentType)(response.agent_data.code)
						});
					},
					error: function error(err, response) {
						$('#loading').modal('hide');
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			_this.state = {
				data: null,
				agentType: "MO"
			};
			return _this;
		}

		_createClass(dashboard_rd, [{
			key: 'render',
			value: function render() {

				var weekly_qc_commission_table = this.state.data ? this.state.data.income_calculation.weekly_bonus.weekly_qc_commission_table : null;
				var weekly_qc_commission = [];
				if (weekly_qc_commission_table) {
					$.map(weekly_qc_commission_table, function (value, index) {
						var row = null;
						if (index == 0) {
							row = React.createElement(
								'tr',
								{ classNameName: 'red', key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ classNameName: 'down' },
									React.createElement('i', { classNameName: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus,
									React.createElement('i', { classNameName: 'fa fa-arrow-left' })
								)
							);
						} else {
							row = React.createElement(
								'tr',
								{ key: index },
								React.createElement(
									'td',
									null,
									value.total_qc
								),
								React.createElement(
									'td',
									{ classNameName: 'down' },
									React.createElement('i', { classNameName: 'fa fa-level-down' }),
									' ',
									value.percentage
								),
								React.createElement(
									'td',
									null,
									value.bonus
								)
							);
						}
						weekly_qc_commission.push(row);
					});
				}

				return React.createElement(
					'div',
					{ className: 'wrap2' },
					React.createElement(_top_menu_rd2.default, { username: this.state.data && this.state.data.name, lastlogin: this.state.data && this.state.data.last_login }),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'tab-content' },
								React.createElement(
									'div',
									{ role: 'tabpanel', className: 'tab-pane active', id: 'groupselling' },
									React.createElement(
										'div',
										{ className: 'topWidget' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_monthly_report2.default, { data: this.state.data && this.state.data }) : React.createElement(_group_production2.default, { data: this.state.data && this.state.data })
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												React.createElement(_group_new_business_tracking_summary2.default, { data: this.state.data && this.state.data })
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_production2.default, { data: this.state.data && this.state.data }) : ""
											),
											React.createElement(
												'div',
												{ className: 'col-xs-6 responsive3' },
												this.state.agentType == "MO" ? React.createElement(_group_persistency2.default, { data: this.state.data && this.state.data }) : ""
											)
										),
										React.createElement('div', { className: 'clearfix h25' }),
										this.state.agentType == "MO" && this.state.agentType == "SO" ? React.createElement(
											'div',
											{ className: 'bottomWidget' },
											React.createElement(
												'div',
												{ className: 'title' },
												'Income Calculation'
											),
											React.createElement(
												'div',
												{ className: 'content' },
												React.createElement('div', { className: 'row' })
											)
										) : ""
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'footer-wrapper' },
						React.createElement(
							'div',
							{ className: 'footer' },
							React.createElement('div', { className: 'disclaimer' }),
							React.createElement(
								'div',
								{ className: 'copyright' },
								'© 2016 TMLI Agency Portal - Powered by TMLI'
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'persistency', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'tr',
											null,
											React.createElement(
												'th',
												{ colspan: '2' },
												'Persistency Personal'
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'1'
											),
											React.createElement(
												'td',
												null,
												'No SPAJ'
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'2'
											),
											React.createElement(
												'td',
												null,
												'No Policy (Jika sudah terbentuk)'
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'modal fade', id: 'weeklyBonus', tabindex: '-1', role: 'dialog', 'aria-labelledby': 'myModalLabel', 'aria-hidden': 'true' },
						React.createElement(
							'div',
							{ className: 'modal-dialog' },
							React.createElement(
								'div',
								{ className: 'modal-content' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered table-hover' },
										React.createElement(
											'thead',
											null,
											React.createElement(
												'tr',
												null,
												React.createElement(
													'th',
													null,
													'Total 12 rolling week QC'
												),
												React.createElement(
													'th',
													null,
													'% of FYC'
												),
												React.createElement(
													'th',
													null,
													'Total Bonus'
												)
											)
										),
										React.createElement(
											'tbody',
											null,
											weekly_qc_commission
										)
									)
								)
							)
						)
					),
					React.createElement(_loading2.default, null)
				);
			}
		}]);

		return dashboard_rd;
	}(React.Component);

	exports.default = dashboard_rd;

/***/ },
/* 54 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TopMenuRd = function (_React$Component) {
		_inherits(TopMenuRd, _React$Component);

		function TopMenuRd(props) {
			_classCallCheck(this, TopMenuRd);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TopMenuRd).call(this, props));

			_this.state = {
				username: localStorage.getItem('name'),
				lastlogin: localStorage.getItem('last_login'),
				dashboardRole: [5, 6, 7, 8, 9],
				dashboardMaps: {
					9: "fc",
					8: "sm",
					7: "dm",
					6: "rm",
					5: "rd"
				}
			};

			_this.componentDidMount = function () {
				_this.state.dashboardMaps[9] = "fc";
				_this.state.dashboardMaps[8] = "sm";
				_this.state.dashboardMaps[7] = "dm";
				_this.state.dashboardMaps[6] = "rm";
				_this.state.dashboardMaps[5] = "rd";
			};

			_this.componentWillReceiveProps = function (p) {
				if (p.username != null) {
					_this.setState({
						username: p.username,
						lastlogin: p.lastlogin
					});
				}
				console.log(p);
			};

			return _this;
		}

		_createClass(TopMenuRd, [{
			key: 'render',
			value: function render() {
				var last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0, 10)) : null;
				var formated_last_login = null;
				if (last_login) {
					var dd = last_login.getDate();
					var mm = last_login.getMonth() + 1; //January is 0!
					var yyyy = last_login.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = dd + '-' + mm + '-' + yyyy;
				}

				var dashboardUrl = null;
				if (this.state.dashboardRole.indexOf(localStorage.getItem('userrole')) != -1) {
					dashboardUrl = 'dashboard_' + this.state.dashboardMaps[response.role];
				}

				return React.createElement(
					'div',
					{ className: 'header-wrapper' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'logo' },
							React.createElement(
								'a',
								{ href: '#' },
								React.createElement('img', { src: 'assets/img/logo.png', width: '190', height: '64', alt: 'TOKIO MARINE' })
							)
						),
						React.createElement(
							'div',
							{ className: 'afterLogo' },
							React.createElement(
								'div',
								{ className: 'afterTop' },
								React.createElement(
									'div',
									{ className: 'left' },
									'Welcome, ',
									this.state.username
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement(
										'ul',
										null,
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: "#/" + dashboardUrl, title: 'Dashboard' },
												React.createElement('i', { className: 'fa fa-cogs' }),
												' Dashboard'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/profile', title: 'Profile' },
												React.createElement('i', { className: 'fa fa-user' }),
												' Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/comission', title: 'Comission' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Comission Report'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#', title: 'Log Out' },
												React.createElement('i', { className: 'fa fa-sign-out' }),
												' Log Out'
											)
										)
									)
								),
								React.createElement('div', { className: 'clearfix' })
							),
							React.createElement(
								'div',
								{ className: 'afterBottom' },
								React.createElement(
									'div',
									{ className: 'left' },
									React.createElement(
										'ul',
										{ className: 'nav nav-tabs', role: 'tablist' },
										React.createElement(
											'li',
											{ role: 'presentation' },
											React.createElement(
												'a',
												{ href: '#groupselling', 'aria-controls': 'groupselling', role: 'tab', 'data-toggle': 'tab' },
												'Group Selling'
											)
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement('i', { className: 'fa fa-clock-o' }),
									React.createElement(
										'span',
										null,
										'(Last login: ',
										formated_last_login,
										')'
									)
								),
								React.createElement('div', { className: 'clearfix' })
							)
						)
					)
				);
			}
		}]);

		return TopMenuRd;
	}(React.Component);

	exports.default = TopMenuRd;

/***/ },
/* 55 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _top_mgt = __webpack_require__(56);

	var _top_mgt2 = _interopRequireDefault(_top_mgt);

	var _menu_management = __webpack_require__(57);

	var _menu_management2 = _interopRequireDefault(_menu_management);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _production_summary_v = __webpack_require__(58);

	var _production_summary_v2 = _interopRequireDefault(_production_summary_v);

	var _application_v = __webpack_require__(59);

	var _application_v2 = _interopRequireDefault(_application_v);

	var _customer_v = __webpack_require__(60);

	var _customer_v2 = _interopRequireDefault(_customer_v);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Management = function (_React$Component) {
		_inherits(Management, _React$Component);

		function Management(props) {
			_classCallCheck(this, Management);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Management).call(this, props));

			_this.componentDidMount = function () {
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.managementDashboard,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						$('#loading').modal('hide');
						_this.setState({ data: response });
					},
					error: function error(err, response) {
						$('#loading').modal('hide');
						if (err.responseJSON) {}
					}
				});
			};

			_this.state = {
				data: null
			};

			(0, _cek_auth2.default)();
			return _this;
		}

		_createClass(Management, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'outer-wrapper' },
					React.createElement(
						'div',
						{ className: 'wrap2' },
						React.createElement(_top_mgt2.default, { username: this.state.data && this.state.data.common_data.name, lastlogin: this.state.data && this.state.data.last_login })
					),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'fluitWidget' },
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(_production_summary_v2.default, { data: this.state.data })
								)
							),
							React.createElement('div', { className: 'clearfix h25' }),
							React.createElement(
								'div',
								{ className: 'fluitWidget' },
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(_application_v2.default, { data: this.state.data != null ? this.state.data.specific_data.spaj : {} }),
									React.createElement(_customer_v2.default, { data: { claim: 25, phs: 50 } })
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'footer-wrapper' },
						React.createElement(
							'div',
							{ className: 'footer' },
							React.createElement('div', { className: 'disclaimer' }),
							React.createElement(
								'div',
								{ className: 'copyright' },
								'© 2011 TMLI Agency Portal - Powered by TMLI'
							)
						)
					),
					React.createElement(_loading2.default, null)
				);
			}
		}]);

		return Management;
	}(React.Component);

	exports.default = Management;

/***/ },
/* 56 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TopMenu = function (_React$Component) {
		_inherits(TopMenu, _React$Component);

		function TopMenu(props) {
			_classCallCheck(this, TopMenu);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TopMenu).call(this, props));

			_this.state = {
				username: localStorage.getItem('name'),
				lastlogin: localStorage.getItem('last_login'),
				dashboardRole: [5, 6, 7, 8, 9],
				dashboardMaps: {
					9: "fc",
					8: "sm",
					7: "dm",
					6: "rm",
					5: "rd"
				}
			};

			_this.componentDidMount = function () {
				_this.state.dashboardMaps[9] = "fc";
				_this.state.dashboardMaps[8] = "sm";
				_this.state.dashboardMaps[7] = "dm";
				_this.state.dashboardMaps[6] = "rm";
				_this.state.dashboardMaps[5] = "rd";
			};

			_this.componentWillReceiveProps = function (p) {
				if (p.username != null) {
					_this.setState({
						username: p.username,
						lastlogin: p.lastlogin
					});
				}
			};

			return _this;
		}

		_createClass(TopMenu, [{
			key: 'render',
			value: function render() {
				var last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0, 10)) : null;
				var formated_last_login = null;
				if (last_login) {
					var dd = last_login.getDate();
					var mm = last_login.getMonth() + 1; //January is 0!
					var yyyy = last_login.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = dd + '-' + mm + '-' + yyyy;
				} else {
					var currentdate = new Date();
					var dd = currentdate.getDate();
					var mm = currentdate.getMonth() + 1; //January is 0!
					var yyyy = currentdate.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = dd + '-' + mm + '-' + yyyy;
				}

				var dashboardUrl = null;
				if (this.state.dashboardRole.indexOf(parseInt(localStorage.getItem('userrole'))) != -1) {
					dashboardUrl = 'dashboard_' + this.state.dashboardMaps[localStorage.getItem('userrole')];
				}

				return React.createElement(
					'div',
					{ className: 'header-wrapper' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'logo' },
							React.createElement(
								'a',
								{ href: '#' },
								React.createElement('img', { src: 'assets/img/logo.png', width: '190', height: '64', alt: 'TOKIO MARINE' })
							)
						),
						React.createElement(
							'div',
							{ className: 'afterLogo' },
							React.createElement(
								'div',
								{ className: 'afterTop' },
								React.createElement(
									'div',
									{ className: 'left' },
									'Welcome, ',
									this.state.username
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement(
										'ul',
										null,
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: "#/" + dashboardUrl, title: 'Dashboard' },
												React.createElement('i', { className: 'fa fa-cogs' }),
												' Dashboard'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/profile', title: 'Profile' },
												React.createElement('i', { className: 'fa fa-user' }),
												' Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/comission', title: 'Comission' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Comission Report'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#', title: 'Log Out' },
												React.createElement('i', { className: 'fa fa-sign-out' }),
												' Log Out'
											)
										)
									)
								),
								React.createElement('div', { className: 'clearfix' })
							),
							React.createElement(
								'div',
								{ className: 'afterBottom' },
								React.createElement(
									'div',
									{ className: 'left' },
									React.createElement(
										'ul',
										{ className: 'nav nav-tabs staticPage' },
										React.createElement(
											'span',
											{ className: 'titleStaticPage' },
											React.createElement('i', { className: 'fa fa-lock' }),
											' Management Dashboard'
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement('i', { className: 'fa fa-clock-o' }),
									React.createElement(
										'span',
										null,
										'(Last login: ',
										formated_last_login,
										')'
									)
								),
								React.createElement('div', { className: 'clearfix' })
							)
						)
					)
				);
			}
		}]);

		return TopMenu;
	}(React.Component);

	exports.default = TopMenu;

/***/ },
/* 57 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuManagement = function (_React$Component) {
		_inherits(MenuManagement, _React$Component);

		function MenuManagement(props) {
			_classCallCheck(this, MenuManagement);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuManagement).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(MenuManagement, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"aside",
					{ id: "aside", className: "app-aside hidden-xs bg-light" },
					React.createElement(
						"div",
						{ className: "aside-wrap" },
						React.createElement(
							"div",
							{ className: "navi-wrap" },
							React.createElement(
								"nav",
								{ "ui-nav": true, className: "navi clearfix" },
								React.createElement(
									"ul",
									{ className: "nav" },
									React.createElement(
										"li",
										{ className: "hidden-folded padder m-t m-b-sm text-muted text-xs" },
										React.createElement(
											"span",
											null,
											"Navigation"
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/profile", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Profile"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/profile", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Group Info"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/profile", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Family Tree"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/management", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Inquiry"
											)
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/management", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Reporting"
											)
										)
									),
									React.createElement("li", { className: "line dk" })
								)
							)
						)
					)
				);
			}
		}]);

		return MenuManagement;
	}(React.Component);

	exports.default = MenuManagement;

/***/ },
/* 58 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ProductionSummary = function (_React$Component) {
	  _inherits(ProductionSummary, _React$Component);

	  function ProductionSummary(props) {
	    _classCallCheck(this, ProductionSummary);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductionSummary).call(this, props));

	    _this.state = {
	      rd_child: []
	    };

	    _this.componentWillReceiveProps = function (p) {
	      _this.setState({
	        rd_child: p.data.specific_data.rd_child != null ? p.data.specific_data.rd_child : []
	      });
	    };

	    _this.handleDownload = function () {
	      $.ajax({
	        url: api_route.production_report_management,
	        headers: {
	          'Authorization': 'JWT ' + sessionStorage.getItem('token')
	        },
	        data: [],
	        processData: false,
	        contentType: false,
	        type: 'POST',
	        success: function success(response) {
	          $('#loading').modal('hide');
	        },
	        error: function error(err, response) {
	          $('#loading').modal('hide');
	        }
	      });
	    };

	    return _this;
	  }

	  _createClass(ProductionSummary, [{
	    key: 'render',
	    value: function render() {
	      return React.createElement(
	        'div',
	        { className: 'col-xs-12 responsive3' },
	        React.createElement(
	          'div',
	          { className: 'content' },
	          React.createElement(
	            'div',
	            { className: 'title' },
	            React.createElement('i', { className: 'fa fa-tasks' }),
	            ' Production Summary (Month to Date)'
	          ),
	          React.createElement(
	            'div',
	            { className: 'entry' },
	            React.createElement(
	              'div',
	              { className: 'table-responsive' },
	              React.createElement(
	                'table',
	                { className: 'table table-striped table-bordered' },
	                React.createElement(
	                  'tbody',
	                  null,
	                  React.createElement(
	                    'tr',
	                    null,
	                    React.createElement(
	                      'th',
	                      null,
	                      'Partner'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'Case'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'Total Annualized Premium'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'Qualified Case'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'Active Agent'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'Registered Agent'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'Activity Ratio(%)'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'MAPR'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'MAPPR'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'Grand Total Collected Premium'
	                    )
	                  )
	                ),
	                React.createElement(
	                  'tbody',
	                  null,
	                  this.state.rd_child.map(function (item) {
	                    return React.createElement(
	                      'tr',
	                      { key: item.rd_agent.code },
	                      React.createElement(
	                        'td',
	                        null,
	                        item.rd_agent.bank_set ? item.rd_agent.bank_set[0].account_holder_name : item.rd_agent.name
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.cases
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.total_annualized_premium
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.qc
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.active_agent
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.registered_agent
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.activity_ratio
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.mapr != null ? item.mapr : 0
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.maprr != null ? item.maprr : 0
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.grand_total_collected_premium
	                      )
	                    );
	                  })
	                )
	              )
	            )
	          ),
	          React.createElement(
	            'a',
	            { onClick: this.handleDownload.bind() },
	            React.createElement(
	              'button',
	              { className: 'btn btn-warning' },
	              React.createElement('i', { className: 'fa fa-download' }),
	              ' Download'
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return ProductionSummary;
	}(React.Component);

	exports.default = ProductionSummary;

/***/ },
/* 59 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Application = function (_React$Component) {
	  _inherits(Application, _React$Component);

	  function Application(props) {
	    _classCallCheck(this, Application);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Application).call(this, props));

	    _this.state = {
	      temp: [],
	      spaj: []
	    };

	    _this.componentWillReceiveProps = function (p) {
	      console.log(p);
	      _this.setState({
	        temp: p.data.month_to_date.personal != null ? p.data.month_to_date.personal : {}
	      });
	    };

	    return _this;
	  }

	  _createClass(Application, [{
	    key: 'render',
	    value: function render() {
	      if (this.state.temp) {
	        var i = 0;
	        for (var key in this.state.temp) {
	          if (this.state.temp.hasOwnProperty(key)) {
	            this.state.spaj[i] = { 'key': key, 'value': this.state.temp[key] };
	            i++;
	          }
	        }
	      }

	      return React.createElement(
	        'div',
	        { className: 'col-xs-6 responsive3' },
	        React.createElement(
	          'div',
	          { className: 'content' },
	          React.createElement(
	            'div',
	            { className: 'title' },
	            React.createElement('i', { className: 'fa fa-cogs' }),
	            ' Application (Month to Date)'
	          ),
	          React.createElement(
	            'div',
	            { className: 'entry' },
	            React.createElement(
	              'div',
	              { className: 'table-responsive' },
	              React.createElement(
	                'table',
	                { className: 'table table-striped' },
	                React.createElement(
	                  'tbody',
	                  null,
	                  React.createElement(
	                    'tr',
	                    null,
	                    React.createElement(
	                      'th',
	                      null,
	                      'Status SPAJ'
	                    ),
	                    React.createElement(
	                      'th',
	                      null,
	                      'Total SPAJ'
	                    ),
	                    React.createElement('th', null)
	                  )
	                ),
	                React.createElement(
	                  'tbody',
	                  null,
	                  this.state.spaj.map(function (item) {
	                    return React.createElement(
	                      'tr',
	                      null,
	                      React.createElement(
	                        'td',
	                        null,
	                        item.key.charAt(0).toUpperCase() + item.key.substr(1).toLowerCase()
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        item.value
	                      ),
	                      React.createElement(
	                        'td',
	                        null,
	                        React.createElement(
	                          'button',
	                          { type: 'button', className: 'btn btn-primary' },
	                          'View Details'
	                        )
	                      )
	                    );
	                  })
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Application;
	}(React.Component);

	exports.default = Application;

/***/ },
/* 60 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CustomerPolicyServicing = function (_React$Component) {
	  _inherits(CustomerPolicyServicing, _React$Component);

	  function CustomerPolicyServicing(props) {
	    _classCallCheck(this, CustomerPolicyServicing);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomerPolicyServicing).call(this, props));

	    _this.state = {
	      claim: 0,
	      phs: 0
	    };

	    _this.componentWillReceiveProps = function (p) {
	      console.log(p.data);
	      _this.setState({
	        claim: p.data.claim != null ? p.data.claim : 0,
	        phs: p.data.phs != null ? p.data.phs : 0
	      });
	    };

	    return _this;
	  }

	  _createClass(CustomerPolicyServicing, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "col-xs-6 responsive3" },
	        React.createElement(
	          "div",
	          { className: "content" },
	          React.createElement(
	            "div",
	            { className: "title" },
	            React.createElement("i", { className: "fa fa-users" }),
	            " Customer (Month to Date)"
	          ),
	          React.createElement(
	            "div",
	            { className: "entry" },
	            React.createElement(
	              "div",
	              { className: "table-responsive" },
	              React.createElement(
	                "table",
	                { className: "table table-striped" },
	                React.createElement(
	                  "tr",
	                  null,
	                  React.createElement(
	                    "th",
	                    null,
	                    "Transaction"
	                  ),
	                  React.createElement(
	                    "th",
	                    null,
	                    "Status"
	                  ),
	                  React.createElement(
	                    "th",
	                    null,
	                    "Total Policy"
	                  ),
	                  React.createElement(
	                    "th",
	                    null,
	                    "Total SPAJ"
	                  )
	                ),
	                React.createElement(
	                  "tr",
	                  null,
	                  React.createElement(
	                    "td",
	                    null,
	                    "Claim"
	                  ),
	                  React.createElement(
	                    "td",
	                    null,
	                    "Pending"
	                  ),
	                  React.createElement(
	                    "td",
	                    null,
	                    "0"
	                  ),
	                  React.createElement(
	                    "td",
	                    null,
	                    React.createElement(
	                      "button",
	                      { type: "button", className: "btn btn-primary" },
	                      "View Details"
	                    )
	                  )
	                ),
	                React.createElement(
	                  "tr",
	                  null,
	                  React.createElement(
	                    "td",
	                    null,
	                    "PHS"
	                  ),
	                  React.createElement(
	                    "td",
	                    null,
	                    "Pending "
	                  ),
	                  React.createElement(
	                    "td",
	                    null,
	                    "0"
	                  ),
	                  React.createElement(
	                    "td",
	                    null,
	                    React.createElement(
	                      "button",
	                      { type: "button", className: "btn btn-primary" },
	                      "View Details"
	                    )
	                  )
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return CustomerPolicyServicing;
	}(React.Component);

	exports.default = CustomerPolicyServicing;

/***/ },
/* 61 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _top_menu = __webpack_require__(9);

	var _top_menu2 = _interopRequireDefault(_top_menu);

	var _menu_branch_admin = __webpack_require__(62);

	var _menu_branch_admin2 = _interopRequireDefault(_menu_branch_admin);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _application = __webpack_require__(63);

	var _application2 = _interopRequireDefault(_application);

	var _customer_policy_servicing = __webpack_require__(64);

	var _customer_policy_servicing2 = _interopRequireDefault(_customer_policy_servicing);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Admin = function (_React$Component) {
		_inherits(Admin, _React$Component);

		function Admin(props) {
			_classCallCheck(this, Admin);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Admin).call(this, props));

			_this.componentDidMount = function () {
				NProgress.start();
				$.ajax({
					url: _api_route2.default.branchDashboard,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						NProgress.done();
						_this.setState({ data: response });
					},
					error: function error(err, response) {
						NProgress.done();
						if (err.responseJSON) {}
					}
				});
			};

			_this.state = {
				data: null
			};

			(0, _cek_auth2.default)();
			return _this;
		}

		_createClass(Admin, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'app app-header-fixed ' },
					React.createElement(_top_menu2.default, null),
					React.createElement(_menu_branch_admin2.default, null),
					React.createElement(
						'div',
						{ id: 'content', className: 'app-content', role: 'main' },
						React.createElement(
							'div',
							{ className: 'app-content-body ' },
							React.createElement(
								'div',
								{ className: 'hbox hbox-auto-xs hbox-auto-sm', 'ng-init': ' app.settings.asideFolded = false; app.settings.asideDock = false; ' },
								React.createElement(
									'div',
									{ className: 'col' },
									React.createElement(
										'div',
										{ className: 'bg-light lter b-b wrapper-md' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'col-md-12' },
												React.createElement(
													'h3',
													{ style: { margin: 0 } },
													'Admin Dashboard'
												)
											)
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'wrapper-md', 'ng-controller': 'FlotChartDemoCtrl' },
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(
										'div',
										{ className: 'col-md-12', style: { marginTop: "0px" } },
										React.createElement(_application2.default, { data: this.state.data != null ? this.state.data.specific_data.spaj : {} })
									)
								),
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(
										'div',
										{ className: 'col-md-12' },
										React.createElement(_customer_policy_servicing2.default, { data: this.state.data != null ? this.state.data.specific_data : {} })
									)
								)
							)
						)
					),
					React.createElement(_footer2.default, null)
				);
			}
		}]);

		return Admin;
	}(React.Component);

	exports.default = Admin;

/***/ },
/* 62 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuBranchAdmin = function (_React$Component) {
		_inherits(MenuBranchAdmin, _React$Component);

		function MenuBranchAdmin(props) {
			_classCallCheck(this, MenuBranchAdmin);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuBranchAdmin).call(this, props));

			_this.state = {};
			return _this;
		}

		_createClass(MenuBranchAdmin, [{
			key: "render",
			value: function render() {
				return React.createElement(
					"aside",
					{ id: "aside", className: "app-aside hidden-xs bg-light" },
					React.createElement(
						"div",
						{ className: "aside-wrap" },
						React.createElement(
							"div",
							{ className: "navi-wrap" },
							React.createElement(
								"nav",
								{ "ui-nav": true, className: "navi clearfix" },
								React.createElement(
									"ul",
									{ className: "nav" },
									React.createElement(
										"li",
										{ className: "hidden-folded padder m-t m-b-sm text-muted text-xs" },
										React.createElement(
											"span",
											null,
											"Navigation"
										)
									),
									React.createElement(
										"li",
										null,
										React.createElement(
											"a",
											{ href: "#/admin", className: "auto" },
											React.createElement("i", { className: "glyphicon glyphicon-stats icon text-primary-dker" }),
											React.createElement(
												"span",
												null,
												"Inquiry"
											)
										)
									),
									React.createElement("li", { className: "line dk" })
								)
							)
						)
					)
				);
			}
		}]);

		return MenuBranchAdmin;
	}(React.Component);

	exports.default = MenuBranchAdmin;

/***/ },
/* 63 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var Application = function (_React$Component) {
	  _inherits(Application, _React$Component);

	  function Application(props) {
	    _classCallCheck(this, Application);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(Application).call(this, props));

	    _this.state = {
	      spaj: []
	    };

	    _this.componentWillReceiveProps = function (p) {
	      _this.setState({
	        spaj: p.data != null ? p.data : {}
	      });
	    };

	    return _this;
	  }

	  _createClass(Application, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "panel panel-default" },
	        React.createElement(
	          "div",
	          { className: "panel-heading" },
	          "Application (Month to Date)"
	        ),
	        React.createElement(
	          "table",
	          { className: "table table-striped m-b-none" },
	          React.createElement(
	            "thead",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "th",
	                null,
	                "Status SPAJ"
	              ),
	              React.createElement(
	                "th",
	                null,
	                "Total SPAJ"
	              )
	            )
	          ),
	          React.createElement(
	            "tbody",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                "Submit"
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.spaj.submit,
	                React.createElement(
	                  "a",
	                  { className: "btn btn-info", style: { float: "right" } },
	                  "View Details"
	                )
	              )
	            ),
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                "Inforce"
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.spaj.inforce,
	                React.createElement(
	                  "a",
	                  { className: "btn btn-info", style: { float: "right" } },
	                  "View Details"
	                )
	              )
	            ),
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                "Waiting for Data Entry"
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.spaj.entry_queue,
	                React.createElement(
	                  "a",
	                  { className: "btn btn-info", style: { float: "right" } },
	                  "View Details"
	                )
	              )
	            ),
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                "Pending"
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.spaj.pending,
	                React.createElement(
	                  "a",
	                  { className: "btn btn-info", style: { float: "right" } },
	                  "View Details"
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return Application;
	}(React.Component);

	exports.default = Application;

/***/ },
/* 64 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var CustomerPolicyServicing = function (_React$Component) {
	  _inherits(CustomerPolicyServicing, _React$Component);

	  function CustomerPolicyServicing(props) {
	    _classCallCheck(this, CustomerPolicyServicing);

	    var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(CustomerPolicyServicing).call(this, props));

	    _this.state = {
	      claim: 0,
	      phs: 0
	    };

	    _this.componentWillReceiveProps = function (p) {
	      console.log(p.data);
	      _this.setState({
	        claim: p.data.claim != null ? p.data.claim : 0,
	        phs: p.data.phs != null ? p.data.phs : 0
	      });
	    };

	    return _this;
	  }

	  _createClass(CustomerPolicyServicing, [{
	    key: "render",
	    value: function render() {
	      return React.createElement(
	        "div",
	        { className: "panel panel-default" },
	        React.createElement(
	          "div",
	          { className: "panel-heading" },
	          "Customer Policy Servicing (Month to Date)"
	        ),
	        React.createElement(
	          "table",
	          { className: "table table-striped m-b-none" },
	          React.createElement(
	            "thead",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "th",
	                null,
	                "Transaction"
	              ),
	              React.createElement(
	                "th",
	                null,
	                "Status"
	              ),
	              React.createElement(
	                "th",
	                null,
	                "Total Policy"
	              )
	            )
	          ),
	          React.createElement(
	            "tbody",
	            null,
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                "Claim"
	              ),
	              React.createElement(
	                "td",
	                null,
	                "Pending"
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.claim,
	                React.createElement(
	                  "a",
	                  { className: "btn btn-info", style: { float: "right" } },
	                  "View Details"
	                )
	              )
	            ),
	            React.createElement(
	              "tr",
	              null,
	              React.createElement(
	                "td",
	                null,
	                "PHS"
	              ),
	              React.createElement(
	                "td",
	                null,
	                "Pending"
	              ),
	              React.createElement(
	                "td",
	                null,
	                this.state.phs,
	                React.createElement(
	                  "a",
	                  { className: "btn btn-info", style: { float: "right" } },
	                  "View Details"
	                )
	              )
	            )
	          )
	        )
	      );
	    }
	  }]);

	  return CustomerPolicyServicing;
	}(React.Component);

	exports.default = CustomerPolicyServicing;

/***/ },
/* 65 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _top_menu_profile = __webpack_require__(66);

	var _top_menu_profile2 = _interopRequireDefault(_top_menu_profile);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var profile = function (_React$Component) {
		_inherits(profile, _React$Component);

		function profile(props) {
			_classCallCheck(this, profile);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(profile).call(this, props));

			_this.componentWillMount = function () {
				(0, _cek_auth2.default)();
			};

			_this.state = {
				name: null,
				last_login: null,
				agent_profile: null,
				first_name: "-",
				fullname: "-",
				code: "-",
				status: "-",
				gender: "-",
				birth_date: "-",
				religion: "-",
				marital_status: "-",
				id_number: "-",
				npwp_number: "-",
				ptkp_status: "-",
				bank_account_no: "-",
				bank_name: "-",
				bank_holder_name: "-",
				address: "-",
				phone: "-",
				mobile_phone: "-",
				business_phone: "-",
				email: "-",
				rd: "-",
				rm: "-",
				sm: "-",
				dm: "-",
				recruiter: "-",
				office_name: "-",
				aaji_number: "-",
				aaji_expired_date: "-",
				user: [],
				userLevel: ["Tokio Marine Management", "Branch Admin", "Senior Regional Sales Head", "Regional Sales Head", "Regional Director", "Regional Manager", "District Manager", "Sales Manager", "Financial Consultant"]
			};

			_this.componentDidMount = function () {
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.profile,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						$('#loading').modal('hide');
						_this.setState({
							name: localStorage.getItem("name"),
							last_login: localStorage.getItem("last_login"),
							agent_profile: response.content.agent_profile,
							fullname: response.content.user.first_name + ' ' + response.content.user.last_name,
							first_name: response.content.user.first_name,
							code: response.content.agent_profile.code,
							status: response.content.agent_profile.status,
							gender: response.content.agent_profile.gender,
							birth_date: (0, _formatter.DateFormat)(response.content.agent_profile.birth_date),
							religion: response.content.agent_profile.religion,
							marital_status: response.content.agent_profile.marital_status,
							id_number: response.content.agent_profile.id_number,
							npwp_number: response.content.agent_profile.npwp_number,
							ptkp_status: response.content.agent_profile.ptkp_status,

							// di set kalo null ga tampil
							bank_account_no: response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_no : '-',
							bank_name: response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].name : '-',
							bank_holder_name: response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_holder_name : '-',
							address: response.content.agent_profile.address_set[0] ? response.content.agent_profile.address_set[0].address : '-',
							mobile_phone: response.content.agent_profile.phone_set[0] ? response.content.agent_profile.phone_set[0].number : '-',
							business_phone: response.content.agent_profile.phone_set[1] ? response.content.agent_profile.phone_set[1].number : '-',

							email: response.content.user.email,
							aaji_number: response.content.agent_profile.aaji_number,
							aaji_expired_date: (0, _formatter.DateFormat)(response.content.agent_profile.aaji_expired_date),
							user: response.content.user,
							level_user: response.content.user.level.type,
							level: response.content.user.level.parent,

							// di set kalo null ga tampil
							rd: response.content.user.level.parent[1] ? response.content.user.level.parent[1].user : '-',
							rm: response.content.user.level.parent[2] ? response.content.user.level.parent[2].user : '-',
							sm: response.content.user.level.parent[3] ? response.content.user.level.parent[3].user : '-',
							dm: response.content.user.level.parent[4] ? response.content.user.level.parent[4].user : '-'

						});
					},
					error: function error(err, response) {
						$('#loading').modal('hide');
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			return _this;
		}

		_createClass(profile, [{
			key: 'render',
			value: function render() {
				var agent_level = "-";
				if (this.state.agent_profile) {
					if ($.isNumeric(this.state.user.level.type)) {
						agent_level = this.state.userLevel[parseInt(this.state.user.level.type) - 1];
					} else {
						agent_level = this.state.agent_profile.user.Level.type;
					}
				}

				return React.createElement(
					'div',
					{ className: 'wrap2' },
					React.createElement(_top_menu_profile2.default, { username: this.state.name, lastlogin: this.state.last_login }),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'container-fluid personalData' },
								React.createElement(
									'div',
									{ className: 'title' },
									React.createElement('i', { className: 'fa fa-user' }),
									' Personal Data'
								),
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'form',
											{ className: 'form-horizontal' },
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Agent Name'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.fullname, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Agent Code'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.code, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Agent Level'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: agent_level, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Agent Status'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.status, disabled: true })
												)
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'form',
											{ className: 'form-horizontal' },
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Sex'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', id: 'sex', value: this.state.gender, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Birthdate'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.birth_date, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Religion'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', id: 'religion', value: this.state.religion, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Marital Status'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', id: 'marital_status', value: this.state.marital_status, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'ID No.'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.id_number, disabled: true })
												)
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'form',
											{ className: 'form-horizontal' },
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'NPWP No.'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.npwp_number, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'PTKP Status'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.ptkp_status, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Bank Account No.'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.bank_account_no, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Bank Name'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.bank_name, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4 twoline' },
													'Account Holder Name'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.bank_holder_name, disabled: true })
												)
											)
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'container-fluid supportData' },
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'title' },
												React.createElement('i', { className: 'fa fa-phone' }),
												' Contact'
											),
											React.createElement(
												'div',
												{ className: 'col-xs-12' },
												React.createElement(
													'form',
													{ className: 'form-horizontal' },
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Address'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('textarea', { className: 'form-control', rows: '2', value: this.state.address, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Phone'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.phone, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Mobile Phone'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.mobile_phone, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Business Phone'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.business_phone, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Email Address'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.email, disabled: true })
														)
													)
												)
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'title' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Structure'
											),
											React.createElement(
												'div',
												{ className: 'col-xs-12' },
												React.createElement(
													'form',
													{ className: 'form-horizontal' },
													this.state.level_user == 9 ? React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'SM'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.sm, disabled: true })
														)
													) : "",
													this.state.level_user == 9 || this.state.level_user == 8 ? React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'DM'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.dm, disabled: true })
														)
													) : "",
													this.state.level_user == 9 || this.state.level_user == 8 || this.state.level_user == 7 ? React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'RM'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.rm, disabled: true })
														)
													) : "",
													this.state.level_user == 9 || this.state.level_user == 8 || this.state.level_user == 7 || this.state.level_user == 6 ? React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'RD'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.rd, disabled: true })
														)
													) : "",
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Recruiter'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.recruiter, disabled: true })
														)
													)
												)
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'title' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Agent Status'
											),
											React.createElement(
												'div',
												{ className: 'col-xs-12' },
												React.createElement(
													'form',
													{ className: 'form-horizontal' },
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'AAJI No.'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.aaji_number, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'AAJI Expired'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', id: 'AAJI-EX', value: this.state.aaji_expired_date, disabled: true })
														)
													)
												)
											)
										)
									)
								)
							)
						),
						React.createElement(_loading2.default, null)
					),
					React.createElement(_footer2.default, null)
				);
			}
		}]);

		return profile;
	}(React.Component);

	exports.default = profile;

/***/ },
/* 66 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var TopMenuProfile = function (_React$Component) {
		_inherits(TopMenuProfile, _React$Component);

		function TopMenuProfile(props) {
			_classCallCheck(this, TopMenuProfile);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(TopMenuProfile).call(this, props));

			_this.state = {
				username: localStorage.getItem('name'),
				lastlogin: localStorage.getItem('last_login'),
				dashboardRole: [5, 6, 7, 8, 9],
				dashboardMaps: {
					9: "fc",
					8: "sm",
					7: "dm",
					6: "rm",
					5: "rd"
				}
			};

			_this.componentDidMount = function () {
				_this.state.dashboardMaps[9] = "fc";
				_this.state.dashboardMaps[8] = "sm";
				_this.state.dashboardMaps[7] = "dm";
				_this.state.dashboardMaps[6] = "rm";
				_this.state.dashboardMaps[5] = "rd";
			};

			_this.componentWillReceiveProps = function (p) {
				if (p.username != null) {
					_this.setState({
						username: p.username,
						lastlogin: p.lastlogin
					});
				}
			};

			return _this;
		}

		_createClass(TopMenuProfile, [{
			key: 'render',
			value: function render() {
				var last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0, 10)) : null;
				var formated_last_login = null;
				if (last_login) {
					var dd = last_login.getDate();
					var mm = last_login.getMonth() + 1; //January is 0!
					var yyyy = last_login.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = dd + '-' + mm + '-' + yyyy;
				}

				var dashboardUrl = null;
				if (this.state.dashboardRole.indexOf(parseInt(localStorage.getItem('userrole'))) != -1) {
					dashboardUrl = 'dashboard_' + this.state.dashboardMaps[localStorage.getItem('userrole')];
				}

				return React.createElement(
					'div',
					{ className: 'header-wrapper' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'logo' },
							React.createElement(
								'a',
								{ href: '#' },
								React.createElement('img', { src: 'assets/img/logo.png', width: '190', height: '64', alt: 'TOKIO MARINE' })
							)
						),
						React.createElement(
							'div',
							{ className: 'afterLogo' },
							React.createElement(
								'div',
								{ className: 'afterTop' },
								React.createElement(
									'div',
									{ className: 'left' },
									'Welcome, ',
									this.state.username
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement(
										'ul',
										null,
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: "#/" + dashboardUrl, title: 'Dashboard' },
												React.createElement('i', { className: 'fa fa-cogs' }),
												' Dashboard'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/profile', title: 'Profile' },
												React.createElement('i', { className: 'fa fa-user' }),
												' Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/comission', title: 'Comission' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Comission Report'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#', title: 'Log Out' },
												React.createElement('i', { className: 'fa fa-sign-out' }),
												' Log Out'
											)
										)
									)
								),
								React.createElement('div', { className: 'clearfix' })
							),
							React.createElement(
								'div',
								{ className: 'afterBottom' },
								React.createElement(
									'div',
									{ className: 'left' },
									React.createElement(
										'ul',
										{ className: 'nav nav-tabs staticPage' },
										React.createElement(
											'span',
											{ className: 'titleStaticPage' },
											React.createElement('i', { className: 'fa fa-picture-o' }),
											' My Profile'
										)
									)
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement('i', { className: 'fa fa-clock-o' }),
									React.createElement(
										'span',
										null,
										'(Last login: ',
										formated_last_login,
										')'
									)
								),
								React.createElement('div', { className: 'clearfix' })
							)
						)
					)
				);
			}
		}]);

		return TopMenuProfile;
	}(React.Component);

	exports.default = TopMenuProfile;

/***/ },
/* 67 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _formatter = __webpack_require__(18);

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	var _loading = __webpack_require__(5);

	var _loading2 = _interopRequireDefault(_loading);

	var _top_menu = __webpack_require__(38);

	var _top_menu2 = _interopRequireDefault(_top_menu);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var profile_update = function (_React$Component) {
		_inherits(profile_update, _React$Component);

		function profile_update(props) {
			_classCallCheck(this, profile_update);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(profile_update).call(this, props));

			_this.state = {
				agent_profile: null,
				first_name: "-",
				code: "-",
				status: "-",
				gender: "-",
				birth_date: "-",
				religion: "-",
				marital_status: "-",
				id_number: "-",
				npwp_number: "-",
				ptkp_status: "-",
				bank_account_no: "-",
				bank_name: "-",
				bank_holder_name: "-",
				address: "-",
				phone: "-",
				mobile_phone: "-",
				business_phone: "-",
				email: "-",
				rd: "-",
				rm: "-",
				sm: "-",
				dm: "-",
				recruiter: "-",
				office_name: "-",
				aaji_number: "-",
				aaji_expired_date: "-",
				user: [],
				userLevel: ["Tokio Marine Management", "Branch Admin", "Senior Regional Sales Head", "Regional Sales Head", "Regional Director", "Regional Manager", "District Manager", "Sales Manager", "Financial Consultant"]
			};

			_this.componentDidMount = function () {
				NProgress.start();
				$.ajax({
					url: _api_route2.default.profile,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						NProgress.done();
						_this.setState({
							agent_profile: response.content.agent_profile,
							first_name: response.content.user.first_name,
							code: response.content.agent_profile.code,
							status: response.content.agent_profile.status,
							gender: response.content.agent_profile.gender,
							birth_date: (0, _formatter.DateFormat)(response.content.agent_profile.birth_date),
							religion: response.content.agent_profile.religion,
							marital_status: response.content.agent_profile.marital_status,
							id_number: response.content.agent_profile.id_number,
							npwp_number: response.content.agent_profile.npwp_number,
							ptkp_status: response.content.agent_profile.ptkp_status,

							// di set kalo null ga tampil
							bank_account_no: response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_no : '-',
							bank_name: response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].name : '-',
							bank_holder_name: response.content.agent_profile.bank_set[0] ? response.content.agent_profile.bank_set[0].account_holder_name : '-',
							address: response.content.agent_profile.address_set[0] ? response.content.agent_profile.address_set[0].address : '-',
							mobile_phone: response.content.agent_profile.phone_set[0] ? response.content.agent_profile.phone_set[0].number : '-',
							business_phone: response.content.agent_profile.phone_set[1] ? response.content.agent_profile.phone_set[1].number : '-',

							email: response.content.user.email,
							aaji_number: response.content.agent_profile.aaji_number,
							aaji_expired_date: (0, _formatter.DateFormat)(response.content.agent_profile.aaji_expired_date),
							user: response.content.user,
							level: response.content.user.level.parent,

							// di set kalo null ga tampil
							rd: response.content.user.level.parent[1] ? response.content.user.level.parent[1].user : '-',
							rm: response.content.user.level.parent[2] ? response.content.user.level.parent[2].user : '-',
							sm: response.content.user.level.parent[3] ? response.content.user.level.parent[4].user : '-',
							dm: response.content.user.level.parent[4] ? response.content.user.level.parent[3].user : '-'
						});
					},
					error: function error(err, response) {
						NProgress.done();
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			(0, _cek_auth2.default)();
			return _this;
		}

		_createClass(profile_update, [{
			key: 'render',
			value: function render() {
				var agent_level = "-";
				if (this.state.agent_profile) {
					if ($.isNumeric(this.state.user.level.type)) {
						agent_level = this.state.userLevel[parseInt(this.state.user.level.type) - 1];
					} else {
						agent_level = this.state.agent_profile.user.Level.type;
					}
				}

				return React.createElement(
					'div',
					{ className: 'wrap2' },
					React.createElement(_top_menu2.default, { username: this.state.data && this.state.data.name, lastlogin: this.state.data && this.state.data.last_login }),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'container-fluid personalData' },
								React.createElement(
									'div',
									{ className: 'title' },
									React.createElement('i', { className: 'fa fa-user' }),
									' Personal Data'
								),
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'form',
											{ className: 'form-horizontal' },
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Agent Name'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.first_name, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Agent Code'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.code, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Agent Level'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: agent_level, disabled: true })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Agent Status'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.status, disabled: true })
												)
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'form',
											{ className: 'form-horizontal' },
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Sex'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', id: 'sex', value: this.state.gender })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Birthdate'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.birth_date })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Religion'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', id: 'religion', value: this.state.religion })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Marital Status'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', id: 'marital_status', value: this.state.marital_status })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'ID No.'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.id_number })
												)
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'form',
											{ className: 'form-horizontal' },
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'NPWP No.'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.npwp_number })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'PTKP Status'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.ptkp_status })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Bank Account No.'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.bank_account_no })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4' },
													'Bank Name'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.bank_name })
												)
											),
											React.createElement(
												'div',
												{ className: 'form-group' },
												React.createElement(
													'label',
													{ className: 'col-sm-4 twoline' },
													'Account Holder Name'
												),
												React.createElement(
													'div',
													{ className: 'col-sm-8' },
													React.createElement('input', { type: 'text', className: 'form-control', value: this.state.bank_holder_name })
												)
											)
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'container-fluid supportData' },
								React.createElement(
									'div',
									{ className: 'row' },
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'title' },
												React.createElement('i', { className: 'fa fa-phone' }),
												' Contact'
											),
											React.createElement(
												'div',
												{ className: 'col-xs-12' },
												React.createElement(
													'form',
													{ className: 'form-horizontal' },
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Address'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('textarea', { className: 'form-control', rows: '2', value: this.state.address })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Phone'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.phone })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Mobile Phone'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.mobile_phone })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Business Phone'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.business_phone })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Email Address'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.email })
														)
													)
												)
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'title' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Status'
											),
											React.createElement(
												'div',
												{ className: 'col-xs-12' },
												React.createElement(
													'form',
													{ className: 'form-horizontal' },
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'RD'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.rd, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'RM'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.rm, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'SM'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.sm, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'DM'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.dm, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Recruiter'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.recruiter, disabled: true })
														)
													)
												)
											)
										)
									),
									React.createElement(
										'div',
										{ className: 'col-xs-4 responsive2' },
										React.createElement(
											'div',
											{ className: 'row' },
											React.createElement(
												'div',
												{ className: 'title' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Agent Status'
											),
											React.createElement(
												'div',
												{ className: 'col-xs-12' },
												React.createElement(
													'form',
													{ className: 'form-horizontal' },
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'Office Name'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('textarea', { className: 'form-control', rows: '2', value: this.state.office_name, disabled: true })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'AAJI No.'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', value: this.state.aaji_number })
														)
													),
													React.createElement(
														'div',
														{ className: 'form-group' },
														React.createElement(
															'label',
															{ className: 'col-sm-4 twoline' },
															'AAJI Expired'
														),
														React.createElement(
															'div',
															{ className: 'col-sm-8' },
															React.createElement('input', { type: 'text', className: 'form-control', id: 'AAJI-EX', value: this.state.aaji_expired_date })
														)
													)
												)
											)
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'buttonAction' },
								React.createElement(
									'button',
									{ type: 'button', className: 'btn btn-primary' },
									React.createElement('i', { className: 'fa fa-check' }),
									' Update Profile'
								)
							)
						)
					),
					React.createElement(_footer2.default, null)
				);
			}
		}]);

		return profile_update;
	}(React.Component);

	exports.default = profile_update;

/***/ },
/* 68 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _menu_report = __webpack_require__(69);

	var _menu_report2 = _interopRequireDefault(_menu_report);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ProductionReport = function (_React$Component) {
		_inherits(ProductionReport, _React$Component);

		function ProductionReport(props) {
			_classCallCheck(this, ProductionReport);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ProductionReport).call(this, props));

			_this.componentDidMount = function () {
				NProgress.start();
				$.ajax({
					url: _api_route2.default.managementDashboard,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: [],
					processData: false,
					contentType: false,
					type: 'POST',
					success: function success(response) {
						NProgress.done();
						_this.setState({ data: response });
					},
					error: function error(err, response) {
						NProgress.done();
						if (err.responseJSON) {}
					}
				});
			};

			_this.state = {
				data: null
			};

			(0, _cek_auth2.default)();
			return _this;
		}

		_createClass(ProductionReport, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'outer-wrapper' },
					React.createElement(
						'div',
						{ className: 'wrap2' },
						React.createElement(_menu_report2.default, { username: this.state.data && this.state.data.common_data.name, lastlogin: this.state.data && this.state.data.last_login })
					),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'formSearch' },
								React.createElement(
									'form',
									{ className: 'form-horizontal' },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-6' },
											'Commision Statement Period'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-2' },
											React.createElement(
												'select',
												{ className: 'form-control' },
												React.createElement(
													'option',
													{ selected: true },
													'Year'
												),
												React.createElement(
													'option',
													null,
													'2016'
												),
												React.createElement(
													'option',
													null,
													'2015'
												)
											)
										),
										React.createElement(
											'div',
											{ className: 'col-sm-2' },
											React.createElement(
												'select',
												{ className: 'form-control' },
												React.createElement(
													'option',
													{ selected: true },
													'Month'
												),
												React.createElement(
													'option',
													null,
													'March'
												),
												React.createElement(
													'option',
													null,
													'April'
												)
											)
										),
										React.createElement(
											'div',
											{ className: 'col-sm-2' },
											React.createElement(
												'button',
												{ className: 'btn btn-primary', type: 'button' },
												React.createElement('i', { className: 'fa fa-search' }),
												' Search'
											)
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'tableResult' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered' },
										React.createElement(
											'tr',
											{ className: 'info' },
											React.createElement(
												'th',
												null,
												'No.'
											),
											React.createElement(
												'th',
												null,
												'Commision Slip'
											),
											React.createElement('th', null)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'1'
											),
											React.createElement(
												'td',
												null,
												'Agentcode_201603_07'
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'button',
													{ className: 'btn btn-warning', type: 'button' },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'2'
											),
											React.createElement(
												'td',
												null,
												'Agentcode_201603_15'
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'button',
													{ className: 'btn btn-warning', type: 'button' },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'3'
											),
											React.createElement(
												'td',
												null,
												'Agentcode_201603_21'
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'button',
													{ className: 'btn btn-warning', type: 'button' },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'4'
											),
											React.createElement(
												'td',
												null,
												'Agentcode_201603_28'
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'button',
													{ className: 'btn btn-warning', type: 'button' },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'5'
											),
											React.createElement(
												'td',
												null,
												'Agentcode_201603_07'
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'button',
													{ className: 'btn btn-warning', type: 'button' },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'6'
											),
											React.createElement(
												'td',
												null,
												'Agentcode_201603_15'
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'button',
													{ className: 'btn btn-warning', type: 'button' },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'7'
											),
											React.createElement(
												'td',
												null,
												'Agentcode_201603_21'
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'button',
													{ className: 'btn btn-warning', type: 'button' },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										),
										React.createElement(
											'tr',
											null,
											React.createElement(
												'td',
												null,
												'8'
											),
											React.createElement(
												'td',
												null,
												'Agentcode_201603_28'
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'button',
													{ className: 'btn btn-warning', type: 'button' },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'footer-wrapper' },
						React.createElement(
							'div',
							{ className: 'footer' },
							React.createElement('div', { className: 'disclaimer' }),
							React.createElement(
								'div',
								{ className: 'copyright' },
								'© 2011 TMLI Agency Portal - Powered by TMLI'
							)
						)
					)
				);
			}
		}]);

		return ProductionReport;
	}(React.Component);

	exports.default = ProductionReport;

/***/ },
/* 69 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuReport = function (_React$Component) {
		_inherits(MenuReport, _React$Component);

		function MenuReport(props) {
			_classCallCheck(this, MenuReport);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuReport).call(this, props));

			_this.state = {
				username: localStorage.getItem('name'),
				lastlogin: localStorage.getItem('last_login'),
				dashboardRole: [5, 6, 7, 8, 9],
				dashboardMaps: {
					9: "fc",
					8: "sm",
					7: "dm",
					6: "rm",
					5: "rd"
				}
			};

			_this.componentDidMount = function () {
				_this.state.dashboardMaps[9] = "fc";
				_this.state.dashboardMaps[8] = "sm";
				_this.state.dashboardMaps[7] = "dm";
				_this.state.dashboardMaps[6] = "rm";
				_this.state.dashboardMaps[5] = "rd";
			};

			_this.componentWillReceiveProps = function (p) {
				if (p.username != null) {
					_this.setState({
						username: p.username,
						lastlogin: p.lastlogin
					});
				}
			};

			return _this;
		}

		_createClass(MenuReport, [{
			key: 'render',
			value: function render() {
				var last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0, 10)) : null;
				var formated_last_login = null;
				if (last_login) {
					var dd = last_login.getDate();
					var mm = last_login.getMonth() + 1; //January is 0!
					var yyyy = last_login.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = dd + '-' + mm + '-' + yyyy;
				} else {
					var currentdate = new Date();
					var dd = currentdate.getDate();
					var mm = currentdate.getMonth() + 1; //January is 0!
					var yyyy = currentdate.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = yyyy + '-' + mm + '-' + dd;
				}

				var dashboardUrl = null;
				if (this.state.dashboardRole.indexOf(parseInt(localStorage.getItem('userrole'))) != -1) {
					dashboardUrl = 'dashboard_' + this.state.dashboardMaps[localStorage.getItem('userrole')];
				}

				return React.createElement(
					'div',
					{ className: 'header-wrapper' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'logo' },
							React.createElement(
								'a',
								{ href: '#' },
								React.createElement('img', { src: 'assets/img/logo.png', width: '190', height: '64', alt: 'TOKIO MARINE' })
							)
						),
						React.createElement(
							'div',
							{ className: 'afterLogo' },
							React.createElement(
								'div',
								{ className: 'afterTop' },
								React.createElement(
									'div',
									{ className: 'left' },
									'Welcome, ',
									this.state.username
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement(
										'ul',
										null,
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: "#/" + dashboardUrl, title: 'Dashboard' },
												React.createElement('i', { className: 'fa fa-cogs' }),
												' Dashboard'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/profile', title: 'Profile' },
												React.createElement('i', { className: 'fa fa-user' }),
												' Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/comission', title: 'Comission' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Comission Report'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#', title: 'Log Out' },
												React.createElement('i', { className: 'fa fa-sign-out' }),
												' Log Out'
											)
										)
									)
								),
								React.createElement('div', { className: 'clearfix' })
							),
							React.createElement(
								'div',
								{ className: 'afterBottom' },
								React.createElement('div', { className: 'left' }),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement('i', { className: 'fa fa-clock-o' }),
									React.createElement(
										'span',
										null,
										'(Last login: ',
										formated_last_login,
										')'
									)
								),
								React.createElement('div', { className: 'clearfix' })
							)
						)
					)
				);
			}
		}]);

		return MenuReport;
	}(React.Component);

	exports.default = MenuReport;

/***/ },
/* 70 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	var _api_route = __webpack_require__(4);

	var _api_route2 = _interopRequireDefault(_api_route);

	var _footer = __webpack_require__(8);

	var _footer2 = _interopRequireDefault(_footer);

	var _menu_comission = __webpack_require__(71);

	var _menu_comission2 = _interopRequireDefault(_menu_comission);

	var _cek_auth = __webpack_require__(12);

	var _cek_auth2 = _interopRequireDefault(_cek_auth);

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var ComissionSlip = function (_React$Component) {
		_inherits(ComissionSlip, _React$Component);

		function ComissionSlip(props) {
			_classCallCheck(this, ComissionSlip);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(ComissionSlip).call(this, props));

			_this.state = {
				data: { "commission_statement_url": null },
				month: "",
				year: "",
				user: { "name": localStorage.getItem('name'), "last_login": localStorage.getItem('last_login') }
			};

			_this.handleSubmit = function (e) {
				e.preventDefault();
				$('#loading').modal('show');
				$.ajax({
					url: _api_route2.default.comissionSlip,
					headers: {
						'Authorization': 'JWT ' + sessionStorage.getItem('token')
					},
					data: {
						"year": _this.state.year,
						"month": parseInt(_this.state.month) < 10 ? "0" + _this.state.month : _this.state.month
					},
					type: 'POST',
					success: function success(response) {
						$('#loading').modal('hide');
						_this.setState({ data: response });
					},
					error: function error(err, response) {
						_this.setState({ data: response });
						console.log('error');
						$('#loading').modal('hide');
						if (err.responseJSON) {
							window.location.href = window.location.href.split('#')[0] + '#/';
						}
					}
				});
			};

			_this.handleChangeMonth = function (e) {
				_this.setState({ month: e.target.value });
			};

			_this.handleChangeYear = function (e) {
				_this.setState({ year: e.target.value });
			};

			(0, _cek_auth2.default)();
			return _this;
		}

		_createClass(ComissionSlip, [{
			key: 'render',
			value: function render() {
				return React.createElement(
					'div',
					{ className: 'outer-wrapper' },
					React.createElement(
						'div',
						{ className: 'wrap2' },
						React.createElement(_menu_comission2.default, { username: this.state.user && this.state.user.name, lastlogin: this.state.user && this.state.user.last_login })
					),
					React.createElement(
						'div',
						{ className: 'main-wrapper' },
						React.createElement(
							'div',
							{ className: 'main' },
							React.createElement(
								'div',
								{ className: 'formSearch' },
								React.createElement(
									'form',
									{ className: 'form-horizontal', onSubmit: this.handleSubmit },
									React.createElement(
										'div',
										{ className: 'form-group' },
										React.createElement(
											'label',
											{ className: 'col-sm-6' },
											'Commision Report Period'
										),
										React.createElement(
											'div',
											{ className: 'col-sm-2' },
											React.createElement(
												'select',
												{ name: 'commission-year', className: 'form-control', onChange: this.handleChangeYear },
												React.createElement(
													'option',
													{ selected: this.state.year == "" ? "selected" : "" },
													'Year'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 2016 ? "selected" : "", value: '2016' },
													'2016'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 2015 ? "selected" : "", value: '2015' },
													'2015'
												)
											)
										),
										React.createElement(
											'div',
											{ className: 'col-sm-2' },
											React.createElement(
												'select',
												{ name: 'commission-month', className: 'form-control', onChange: this.handleChangeMonth },
												React.createElement(
													'option',
													{ selected: this.state.year == "" ? "selected" : "" },
													'Month'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 1 ? "selected" : "", value: '1' },
													'January'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 2 ? "selected" : "", value: '2' },
													'February'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 3 ? "selected" : "", value: '3' },
													'March'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 4 ? "selected" : "", value: '4' },
													'April'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 5 ? "selected" : "", value: '5' },
													'May'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 6 ? "selected" : "", value: '6' },
													'June'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 7 ? "selected" : "", value: '7' },
													'July'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 8 ? "selected" : "", value: '8' },
													'August'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 9 ? "selected" : "", value: '9' },
													'September'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 10 ? "selected" : "", value: '10' },
													'October'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 11 ? "selected" : "", value: '11' },
													'November'
												),
												React.createElement(
													'option',
													{ selected: this.state.year == 12 ? "selected" : "", value: '11' },
													'December'
												)
											)
										),
										React.createElement(
											'div',
											{ className: 'col-sm-2' },
											React.createElement(
												'button',
												{ className: 'btn btn-primary', type: 'submit' },
												React.createElement('i', { className: 'fa fa-search' }),
												' Search'
											)
										)
									)
								)
							),
							React.createElement(
								'div',
								{ className: 'tableResult' },
								React.createElement(
									'div',
									{ className: 'table-responsive' },
									React.createElement(
										'table',
										{ className: 'table table-bordered' },
										React.createElement(
											'tr',
											{ className: 'info' },
											React.createElement(
												'th',
												null,
												'No.'
											),
											React.createElement(
												'th',
												null,
												'Commision Slip'
											),
											React.createElement('th', null)
										),
										React.createElement(
											'tr',
											{ style: this.state.data.commission_statement_url != null ? { display: '' } : { display: 'none' } },
											React.createElement(
												'td',
												null,
												'1'
											),
											React.createElement(
												'td',
												null,
												this.state.data.commission_statement_url != null ? this.state.data.commission_statement_url.substring(54) : ""
											),
											React.createElement(
												'td',
												null,
												React.createElement(
													'a',
													{ className: 'btn btn-warning', target: '_blank', href: this.state.data.commission_statement_url },
													React.createElement('i', { className: 'fa fa-download' }),
													' Download'
												)
											)
										),
										React.createElement(
											'tr',
											{ style: this.state.data.commission_statement_url == null ? { display: '' } : { display: 'none' } },
											React.createElement(
												'td',
												{ colSpan: '3', style: { "text-align": "center" } },
												'Commission Statement untuk periode yang Anda cari tidak tersedia.'
											)
										)
									)
								)
							)
						)
					),
					React.createElement(
						'div',
						{ className: 'footer-wrapper' },
						React.createElement(
							'div',
							{ className: 'footer' },
							React.createElement('div', { className: 'disclaimer' }),
							React.createElement(
								'div',
								{ className: 'copyright' },
								'© 2016 TMLI Agency Portal - Powered by TMLI'
							)
						)
					)
				);
			}
		}]);

		return ComissionSlip;
	}(React.Component);

	exports.default = ComissionSlip;

/***/ },
/* 71 */
/***/ function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
		value: true
	});

	var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

	function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

	function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var MenuComission = function (_React$Component) {
		_inherits(MenuComission, _React$Component);

		function MenuComission(props) {
			_classCallCheck(this, MenuComission);

			var _this = _possibleConstructorReturn(this, Object.getPrototypeOf(MenuComission).call(this, props));

			_this.state = {
				username: localStorage.getItem('name'),
				lastlogin: localStorage.getItem('last_login'),
				dashboardRole: [5, 6, 7, 8, 9],
				dashboardMaps: {
					9: "fc",
					8: "sm",
					7: "dm",
					6: "rm",
					5: "rd"
				}
			};

			_this.componentDidMount = function () {
				_this.state.dashboardMaps[9] = "fc";
				_this.state.dashboardMaps[8] = "sm";
				_this.state.dashboardMaps[7] = "dm";
				_this.state.dashboardMaps[6] = "rm";
				_this.state.dashboardMaps[5] = "rd";
			};

			_this.componentWillReceiveProps = function (p) {
				if (p.username != null) {
					_this.setState({
						username: p.username,
						lastlogin: p.lastlogin
					});
				}
			};

			return _this;
		}

		_createClass(MenuComission, [{
			key: 'render',
			value: function render() {

				var last_login = this.state.lastlogin ? new Date(this.state.lastlogin.substring(0, 10)) : null;
				var formated_last_login = null;
				if (last_login) {
					var dd = last_login.getDate();
					var mm = last_login.getMonth() + 1; //January is 0!
					var yyyy = last_login.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = dd + '-' + mm + '-' + yyyy;
				} else {
					var currentdate = new Date();
					var dd = currentdate.getDate();
					var mm = currentdate.getMonth() + 1; //January is 0!
					var yyyy = currentdate.getFullYear();

					if (dd < 10) {
						dd = '0' + dd;
					}
					if (mm < 10) {
						mm = '0' + mm;
					}
					formated_last_login = yyyy + '-' + mm + '-' + dd;
				}

				var dashboardUrl = null;
				if (this.state.dashboardRole.indexOf(parseInt(localStorage.getItem('userrole'))) != -1) {
					dashboardUrl = 'dashboard_' + this.state.dashboardMaps[localStorage.getItem('userrole')];
				}

				return React.createElement(
					'div',
					{ className: 'header-wrapper' },
					React.createElement(
						'div',
						{ className: 'header' },
						React.createElement(
							'div',
							{ className: 'logo' },
							React.createElement(
								'a',
								{ href: '#' },
								React.createElement('img', { src: 'assets/img/logo.png', width: '190', height: '64', alt: 'TOKIO MARINE' })
							)
						),
						React.createElement(
							'div',
							{ className: 'afterLogo' },
							React.createElement(
								'div',
								{ className: 'afterTop' },
								React.createElement(
									'div',
									{ className: 'left' },
									'Welcome, ',
									this.state.username
								),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement(
										'ul',
										null,
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: "#/" + dashboardUrl, title: 'Dashboard' },
												React.createElement('i', { className: 'fa fa-cogs' }),
												' Dashboard'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/profile', title: 'Profile' },
												React.createElement('i', { className: 'fa fa-user' }),
												' Profile'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#/comission', title: 'Comission' },
												React.createElement('i', { className: 'fa fa-bar-chart' }),
												' Comission Report'
											)
										),
										React.createElement(
											'li',
											null,
											React.createElement(
												'a',
												{ href: '#', title: 'Log Out' },
												React.createElement('i', { className: 'fa fa-sign-out' }),
												' Log Out'
											)
										)
									)
								),
								React.createElement('div', { className: 'clearfix' })
							),
							React.createElement(
								'div',
								{ className: 'afterBottom' },
								React.createElement('div', { className: 'left' }),
								React.createElement(
									'div',
									{ className: 'right' },
									React.createElement('i', { className: 'fa fa-clock-o' }),
									React.createElement(
										'span',
										null,
										'(Last login: ',
										formated_last_login,
										')'
									)
								),
								React.createElement('div', { className: 'clearfix' })
							)
						)
					)
				);
			}
		}]);

		return MenuComission;
	}(React.Component);

	exports.default = MenuComission;

/***/ },
/* 72 */
/***/ function(module, exports, __webpack_require__) {

	/* components */
	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Router2 = __webpack_require__(73);

	var _Router3 = _interopRequireDefault(_Router2);

	exports.Router = _Router3['default'];

	var _Link2 = __webpack_require__(108);

	var _Link3 = _interopRequireDefault(_Link2);

	exports.Link = _Link3['default'];

	var _IndexLink2 = __webpack_require__(109);

	var _IndexLink3 = _interopRequireDefault(_IndexLink2);

	exports.IndexLink = _IndexLink3['default'];

	/* components (configuration) */

	var _IndexRedirect2 = __webpack_require__(110);

	var _IndexRedirect3 = _interopRequireDefault(_IndexRedirect2);

	exports.IndexRedirect = _IndexRedirect3['default'];

	var _IndexRoute2 = __webpack_require__(112);

	var _IndexRoute3 = _interopRequireDefault(_IndexRoute2);

	exports.IndexRoute = _IndexRoute3['default'];

	var _Redirect2 = __webpack_require__(111);

	var _Redirect3 = _interopRequireDefault(_Redirect2);

	exports.Redirect = _Redirect3['default'];

	var _Route2 = __webpack_require__(113);

	var _Route3 = _interopRequireDefault(_Route2);

	exports.Route = _Route3['default'];

	/* mixins */

	var _History2 = __webpack_require__(114);

	var _History3 = _interopRequireDefault(_History2);

	exports.History = _History3['default'];

	var _Lifecycle2 = __webpack_require__(115);

	var _Lifecycle3 = _interopRequireDefault(_Lifecycle2);

	exports.Lifecycle = _Lifecycle3['default'];

	var _RouteContext2 = __webpack_require__(116);

	var _RouteContext3 = _interopRequireDefault(_RouteContext2);

	exports.RouteContext = _RouteContext3['default'];

	/* utils */

	var _useRoutes2 = __webpack_require__(97);

	var _useRoutes3 = _interopRequireDefault(_useRoutes2);

	exports.useRoutes = _useRoutes3['default'];

	var _RouteUtils = __webpack_require__(93);

	exports.createRoutes = _RouteUtils.createRoutes;

	var _RoutingContext2 = __webpack_require__(94);

	var _RoutingContext3 = _interopRequireDefault(_RoutingContext2);

	exports.RoutingContext = _RoutingContext3['default'];

	var _PropTypes2 = __webpack_require__(107);

	var _PropTypes3 = _interopRequireDefault(_PropTypes2);

	exports.PropTypes = _PropTypes3['default'];

	var _match2 = __webpack_require__(117);

	var _match3 = _interopRequireDefault(_match2);

	exports.match = _match3['default'];

	var _Router4 = _interopRequireDefault(_Router2);

	exports['default'] = _Router4['default'];

/***/ },
/* 73 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _historyLibCreateHashHistory = __webpack_require__(76);

	var _historyLibCreateHashHistory2 = _interopRequireDefault(_historyLibCreateHashHistory);

	var _RouteUtils = __webpack_require__(93);

	var _RoutingContext = __webpack_require__(94);

	var _RoutingContext2 = _interopRequireDefault(_RoutingContext);

	var _useRoutes = __webpack_require__(97);

	var _useRoutes2 = _interopRequireDefault(_useRoutes);

	var _PropTypes = __webpack_require__(107);

	var _React$PropTypes = _react2['default'].PropTypes;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <Router> is a high-level API for automatically setting up
	 * a router that renders a <RoutingContext> with all the props
	 * it needs each time the URL changes.
	 */

	var Router = (function (_Component) {
	  _inherits(Router, _Component);

	  function Router(props, context) {
	    _classCallCheck(this, Router);

	    _Component.call(this, props, context);

	    this.state = {
	      location: null,
	      routes: null,
	      params: null,
	      components: null
	    };
	  }

	  Router.prototype.handleError = function handleError(error) {
	    if (this.props.onError) {
	      this.props.onError.call(this, error);
	    } else {
	      // Throw errors by default so we don't silently swallow them!
	      throw error; // This error probably occurred in getChildRoutes or getComponents.
	    }
	  };

	  Router.prototype.componentWillMount = function componentWillMount() {
	    var _this = this;

	    var _props = this.props;
	    var history = _props.history;
	    var children = _props.children;
	    var routes = _props.routes;
	    var parseQueryString = _props.parseQueryString;
	    var stringifyQuery = _props.stringifyQuery;

	    var createHistory = history ? function () {
	      return history;
	    } : _historyLibCreateHashHistory2['default'];

	    this.history = _useRoutes2['default'](createHistory)({
	      routes: _RouteUtils.createRoutes(routes || children),
	      parseQueryString: parseQueryString,
	      stringifyQuery: stringifyQuery
	    });

	    this._unlisten = this.history.listen(function (error, state) {
	      if (error) {
	        _this.handleError(error);
	      } else {
	        _this.setState(state, _this.props.onUpdate);
	      }
	    });
	  };

	  /* istanbul ignore next: sanity check */

	  Router.prototype.componentWillReceiveProps = function componentWillReceiveProps(nextProps) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](nextProps.history === this.props.history, 'You cannot change <Router history>; it will be ignored') : undefined;

	    process.env.NODE_ENV !== 'production' ? _warning2['default']((nextProps.routes || nextProps.children) === (this.props.routes || this.props.children), 'You cannot change <Router routes>; it will be ignored') : undefined;
	  };

	  Router.prototype.componentWillUnmount = function componentWillUnmount() {
	    if (this._unlisten) this._unlisten();
	  };

	  Router.prototype.render = function render() {
	    var _state = this.state;
	    var location = _state.location;
	    var routes = _state.routes;
	    var params = _state.params;
	    var components = _state.components;
	    var _props2 = this.props;
	    var RoutingContext = _props2.RoutingContext;
	    var createElement = _props2.createElement;

	    var props = _objectWithoutProperties(_props2, ['RoutingContext', 'createElement']);

	    if (location == null) return null; // Async match

	    // Only forward non-Router-specific props to routing context, as those are
	    // the only ones that might be custom routing context props.
	    Object.keys(Router.propTypes).forEach(function (propType) {
	      return delete props[propType];
	    });

	    return _react2['default'].createElement(RoutingContext, _extends({}, props, {
	      history: this.history,
	      createElement: createElement,
	      location: location,
	      routes: routes,
	      params: params,
	      components: components
	    }));
	  };

	  return Router;
	})(_react.Component);

	Router.propTypes = {
	  history: object,
	  children: _PropTypes.routes,
	  routes: _PropTypes.routes, // alias for children
	  RoutingContext: func.isRequired,
	  createElement: func,
	  onError: func,
	  onUpdate: func,
	  parseQueryString: func,
	  stringifyQuery: func
	};

	Router.defaultProps = {
	  RoutingContext: _RoutingContext2['default']
	};

	exports['default'] = Router;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 74 */
/***/ function(module, exports) {

	// shim for using process in browser

	var process = module.exports = {};
	var queue = [];
	var draining = false;
	var currentQueue;
	var queueIndex = -1;

	function cleanUpNextTick() {
	    draining = false;
	    if (currentQueue.length) {
	        queue = currentQueue.concat(queue);
	    } else {
	        queueIndex = -1;
	    }
	    if (queue.length) {
	        drainQueue();
	    }
	}

	function drainQueue() {
	    if (draining) {
	        return;
	    }
	    var timeout = setTimeout(cleanUpNextTick);
	    draining = true;

	    var len = queue.length;
	    while(len) {
	        currentQueue = queue;
	        queue = [];
	        while (++queueIndex < len) {
	            if (currentQueue) {
	                currentQueue[queueIndex].run();
	            }
	        }
	        queueIndex = -1;
	        len = queue.length;
	    }
	    currentQueue = null;
	    draining = false;
	    clearTimeout(timeout);
	}

	process.nextTick = function (fun) {
	    var args = new Array(arguments.length - 1);
	    if (arguments.length > 1) {
	        for (var i = 1; i < arguments.length; i++) {
	            args[i - 1] = arguments[i];
	        }
	    }
	    queue.push(new Item(fun, args));
	    if (queue.length === 1 && !draining) {
	        setTimeout(drainQueue, 0);
	    }
	};

	// v8 likes predictible objects
	function Item(fun, array) {
	    this.fun = fun;
	    this.array = array;
	}
	Item.prototype.run = function () {
	    this.fun.apply(null, this.array);
	};
	process.title = 'browser';
	process.browser = true;
	process.env = {};
	process.argv = [];
	process.version = ''; // empty string to avoid regexp issues
	process.versions = {};

	function noop() {}

	process.on = noop;
	process.addListener = noop;
	process.once = noop;
	process.off = noop;
	process.removeListener = noop;
	process.removeAllListeners = noop;
	process.emit = noop;

	process.binding = function (name) {
	    throw new Error('process.binding is not supported');
	};

	process.cwd = function () { return '/' };
	process.chdir = function (dir) {
	    throw new Error('process.chdir is not supported');
	};
	process.umask = function() { return 0; };


/***/ },
/* 75 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2014-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Similar to invariant but only logs a warning if the condition is not met.
	 * This can be used to log issues in development environments in critical
	 * paths. Removing the logging code for production environments will keep the
	 * same logic and follow the same code paths.
	 */

	var warning = function() {};

	if (process.env.NODE_ENV !== 'production') {
	  warning = function(condition, format, args) {
	    var len = arguments.length;
	    args = new Array(len > 2 ? len - 2 : 0);
	    for (var key = 2; key < len; key++) {
	      args[key - 2] = arguments[key];
	    }
	    if (format === undefined) {
	      throw new Error(
	        '`warning(condition, format, ...args)` requires a warning ' +
	        'message argument'
	      );
	    }

	    if (format.length < 10 || (/^[s\W]*$/).test(format)) {
	      throw new Error(
	        'The warning format should be able to uniquely identify this ' +
	        'warning. Please, use a more descriptive format than: ' + format
	      );
	    }

	    if (!condition) {
	      var argIndex = 0;
	      var message = 'Warning: ' +
	        format.replace(/%s/g, function() {
	          return args[argIndex++];
	        });
	      if (typeof console !== 'undefined') {
	        console.error(message);
	      }
	      try {
	        // This error was thrown as a convenience so that you can use this stack
	        // to find the callsite that caused this warning to fire.
	        throw new Error(message);
	      } catch(x) {}
	    }
	  };
	}

	module.exports = warning;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 76 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(78);

	var _ExecutionEnvironment = __webpack_require__(79);

	var _DOMUtils = __webpack_require__(80);

	var _DOMStateStorage = __webpack_require__(81);

	var _createDOMHistory = __webpack_require__(82);

	var _createDOMHistory2 = _interopRequireDefault(_createDOMHistory);

	var _parsePath = __webpack_require__(89);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function isAbsolutePath(path) {
	  return typeof path === 'string' && path.charAt(0) === '/';
	}

	function ensureSlash() {
	  var path = _DOMUtils.getHashPath();

	  if (isAbsolutePath(path)) return true;

	  _DOMUtils.replaceHashPath('/' + path);

	  return false;
	}

	function addQueryStringValueToPath(path, key, value) {
	  return path + (path.indexOf('?') === -1 ? '?' : '&') + (key + '=' + value);
	}

	function stripQueryStringValueFromPath(path, key) {
	  return path.replace(new RegExp('[?&]?' + key + '=[a-zA-Z0-9]+'), '');
	}

	function getQueryStringValueFromPath(path, key) {
	  var match = path.match(new RegExp('\\?.*?\\b' + key + '=(.+?)\\b'));
	  return match && match[1];
	}

	var DefaultQueryKey = '_k';

	function createHashHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Hash history needs a DOM') : _invariant2['default'](false) : undefined;

	  var queryKey = options.queryKey;

	  if (queryKey === undefined || !!queryKey) queryKey = typeof queryKey === 'string' ? queryKey : DefaultQueryKey;

	  function getCurrentLocation() {
	    var path = _DOMUtils.getHashPath();

	    var key = undefined,
	        state = undefined;
	    if (queryKey) {
	      key = getQueryStringValueFromPath(path, queryKey);
	      path = stripQueryStringValueFromPath(path, queryKey);

	      if (key) {
	        state = _DOMStateStorage.readState(key);
	      } else {
	        state = null;
	        key = history.createKey();
	        _DOMUtils.replaceHashPath(addQueryStringValueToPath(path, queryKey, key));
	      }
	    } else {
	      key = state = null;
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function startHashChangeListener(_ref) {
	    var transitionTo = _ref.transitionTo;

	    function hashChangeListener() {
	      if (!ensureSlash()) return; // Always make sure hashes are preceeded with a /.

	      transitionTo(getCurrentLocation());
	    }

	    ensureSlash();
	    _DOMUtils.addEventListener(window, 'hashchange', hashChangeListener);

	    return function () {
	      _DOMUtils.removeEventListener(window, 'hashchange', hashChangeListener);
	    };
	  }

	  function finishTransition(location) {
	    var basename = location.basename;
	    var pathname = location.pathname;
	    var search = location.search;
	    var state = location.state;
	    var action = location.action;
	    var key = location.key;

	    if (action === _Actions.POP) return; // Nothing to do.

	    var path = (basename || '') + pathname + search;

	    if (queryKey) {
	      path = addQueryStringValueToPath(path, queryKey, key);
	      _DOMStateStorage.saveState(key, state);
	    } else {
	      // Drop key and state.
	      location.key = location.state = null;
	    }

	    var currentHash = _DOMUtils.getHashPath();

	    if (action === _Actions.PUSH) {
	      if (currentHash !== path) {
	        window.location.hash = path;
	      } else {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'You cannot PUSH the same path using hash history') : undefined;
	      }
	    } else if (currentHash !== path) {
	      // REPLACE
	      _DOMUtils.replaceHashPath(path);
	    }
	  }

	  var history = _createDOMHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: _DOMStateStorage.saveState
	  }));

	  var listenerCount = 0,
	      stopHashChangeListener = undefined;

	  function listenBefore(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listenBefore(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function listen(listener) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    var unlisten = history.listen(listener);

	    return function () {
	      unlisten();

	      if (--listenerCount === 0) stopHashChangeListener();
	    };
	  }

	  function push(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.push(location);
	  }

	  function replace(location) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || location.state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replace(location);
	  }

	  var goIsSupportedWithoutReload = _DOMUtils.supportsGoWithoutReloadUsingHash();

	  function go(n) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](goIsSupportedWithoutReload, 'Hash history go(n) causes a full page reload in this browser') : undefined;

	    history.go(n);
	  }

	  function createHref(path) {
	    return '#' + history.createHref(path);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (++listenerCount === 1) stopHashChangeListener = startHashChangeListener(history);

	    history.registerTransitionHook(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    history.unregisterTransitionHook(hook);

	    if (--listenerCount === 0) stopHashChangeListener();
	  }

	  // deprecated
	  function pushState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.pushState(state, path);
	  }

	  // deprecated
	  function replaceState(state, path) {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](queryKey || state == null, 'You cannot use state without a queryKey it will be dropped') : undefined;

	    history.replaceState(state, path);
	  }

	  return _extends({}, history, {
	    listenBefore: listenBefore,
	    listen: listen,
	    push: push,
	    replace: replace,
	    go: go,
	    createHref: createHref,

	    registerTransitionHook: registerTransitionHook, // deprecated - warning is in createHistory
	    unregisterTransitionHook: unregisterTransitionHook, // deprecated - warning is in createHistory
	    pushState: pushState, // deprecated - warning is in createHistory
	    replaceState: replaceState // deprecated - warning is in createHistory
	  });
	}

	exports['default'] = createHashHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 77 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/**
	 * Copyright 2013-2015, Facebook, Inc.
	 * All rights reserved.
	 *
	 * This source code is licensed under the BSD-style license found in the
	 * LICENSE file in the root directory of this source tree. An additional grant
	 * of patent rights can be found in the PATENTS file in the same directory.
	 */

	'use strict';

	/**
	 * Use invariant() to assert state which your program assumes to be true.
	 *
	 * Provide sprintf-style format (only %s is supported) and arguments
	 * to provide information about what broke and what you were
	 * expecting.
	 *
	 * The invariant message will be stripped in production, but the invariant
	 * will remain to ensure logic does not differ in production.
	 */

	var invariant = function(condition, format, a, b, c, d, e, f) {
	  if (process.env.NODE_ENV !== 'production') {
	    if (format === undefined) {
	      throw new Error('invariant requires an error message argument');
	    }
	  }

	  if (!condition) {
	    var error;
	    if (format === undefined) {
	      error = new Error(
	        'Minified exception occurred; use the non-minified dev environment ' +
	        'for the full error message and additional helpful warnings.'
	      );
	    } else {
	      var args = [a, b, c, d, e, f];
	      var argIndex = 0;
	      error = new Error(
	        format.replace(/%s/g, function() { return args[argIndex++]; })
	      );
	      error.name = 'Invariant Violation';
	    }

	    error.framesToPop = 1; // we don't care about invariant's own frame
	    throw error;
	  }
	};

	module.exports = invariant;

	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 78 */
/***/ function(module, exports) {

	/**
	 * Indicates that navigation was caused by a call to history.push.
	 */
	'use strict';

	exports.__esModule = true;
	var PUSH = 'PUSH';

	exports.PUSH = PUSH;
	/**
	 * Indicates that navigation was caused by a call to history.replace.
	 */
	var REPLACE = 'REPLACE';

	exports.REPLACE = REPLACE;
	/**
	 * Indicates that navigation was caused by some other action such
	 * as using a browser's back/forward buttons and/or manually manipulating
	 * the URL in a browser's location bar. This is the default.
	 *
	 * See https://developer.mozilla.org/en-US/docs/Web/API/WindowEventHandlers/onpopstate
	 * for more information.
	 */
	var POP = 'POP';

	exports.POP = POP;
	exports['default'] = {
	  PUSH: PUSH,
	  REPLACE: REPLACE,
	  POP: POP
	};

/***/ },
/* 79 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	var canUseDOM = !!(typeof window !== 'undefined' && window.document && window.document.createElement);
	exports.canUseDOM = canUseDOM;

/***/ },
/* 80 */
/***/ function(module, exports) {

	'use strict';

	exports.__esModule = true;
	exports.addEventListener = addEventListener;
	exports.removeEventListener = removeEventListener;
	exports.getHashPath = getHashPath;
	exports.replaceHashPath = replaceHashPath;
	exports.getWindowPath = getWindowPath;
	exports.go = go;
	exports.getUserConfirmation = getUserConfirmation;
	exports.supportsHistory = supportsHistory;
	exports.supportsGoWithoutReloadUsingHash = supportsGoWithoutReloadUsingHash;

	function addEventListener(node, event, listener) {
	  if (node.addEventListener) {
	    node.addEventListener(event, listener, false);
	  } else {
	    node.attachEvent('on' + event, listener);
	  }
	}

	function removeEventListener(node, event, listener) {
	  if (node.removeEventListener) {
	    node.removeEventListener(event, listener, false);
	  } else {
	    node.detachEvent('on' + event, listener);
	  }
	}

	function getHashPath() {
	  // We can't use window.location.hash here because it's not
	  // consistent across browsers - Firefox will pre-decode it!
	  return window.location.href.split('#')[1] || '';
	}

	function replaceHashPath(path) {
	  window.location.replace(window.location.pathname + window.location.search + '#' + path);
	}

	function getWindowPath() {
	  return window.location.pathname + window.location.search + window.location.hash;
	}

	function go(n) {
	  if (n) window.history.go(n);
	}

	function getUserConfirmation(message, callback) {
	  callback(window.confirm(message));
	}

	/**
	 * Returns true if the HTML5 history API is supported. Taken from Modernizr.
	 *
	 * https://github.com/Modernizr/Modernizr/blob/master/LICENSE
	 * https://github.com/Modernizr/Modernizr/blob/master/feature-detects/history.js
	 * changed to avoid false negatives for Windows Phones: https://github.com/rackt/react-router/issues/586
	 */

	function supportsHistory() {
	  var ua = navigator.userAgent;
	  if ((ua.indexOf('Android 2.') !== -1 || ua.indexOf('Android 4.0') !== -1) && ua.indexOf('Mobile Safari') !== -1 && ua.indexOf('Chrome') === -1 && ua.indexOf('Windows Phone') === -1) {
	    return false;
	  }
	  // FIXME: Work around our browser history not working correctly on Chrome
	  // iOS: https://github.com/rackt/react-router/issues/2565
	  if (ua.indexOf('CriOS') !== -1) {
	    return false;
	  }
	  return window.history && 'pushState' in window.history;
	}

	/**
	 * Returns false if using go(n) with hash history causes a full page reload.
	 */

	function supportsGoWithoutReloadUsingHash() {
	  var ua = navigator.userAgent;
	  return ua.indexOf('Firefox') === -1;
	}

/***/ },
/* 81 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {/*eslint-disable no-empty */
	'use strict';

	exports.__esModule = true;
	exports.saveState = saveState;
	exports.readState = readState;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var KeyPrefix = '@@History/';
	var QuotaExceededError = 'QuotaExceededError';
	var SecurityError = 'SecurityError';

	function createKey(key) {
	  return KeyPrefix + key;
	}

	function saveState(key, state) {
	  try {
	    window.sessionStorage.setItem(createKey(key), JSON.stringify(state));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available due to security settings') : undefined;

	      return;
	    }

	    if (error.name === QuotaExceededError && window.sessionStorage.length === 0) {
	      // Safari "private mode" throws QuotaExceededError.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to save state; sessionStorage is not available in Safari private mode') : undefined;

	      return;
	    }

	    throw error;
	  }
	}

	function readState(key) {
	  var json = undefined;
	  try {
	    json = window.sessionStorage.getItem(createKey(key));
	  } catch (error) {
	    if (error.name === SecurityError) {
	      // Blocking cookies in Chrome/Firefox/Safari throws SecurityError on any
	      // attempt to access window.sessionStorage.
	      process.env.NODE_ENV !== 'production' ? _warning2['default'](false, '[history] Unable to read state; sessionStorage is not available due to security settings') : undefined;

	      return null;
	    }
	  }

	  if (json) {
	    try {
	      return JSON.parse(json);
	    } catch (error) {
	      // Ignore invalid JSON.
	    }
	  }

	  return null;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 82 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _ExecutionEnvironment = __webpack_require__(79);

	var _DOMUtils = __webpack_require__(80);

	var _createHistory = __webpack_require__(83);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	function createDOMHistory(options) {
	  var history = _createHistory2['default'](_extends({
	    getUserConfirmation: _DOMUtils.getUserConfirmation
	  }, options, {
	    go: _DOMUtils.go
	  }));

	  function listen(listener) {
	    !_ExecutionEnvironment.canUseDOM ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'DOM history needs a DOM') : _invariant2['default'](false) : undefined;

	    return history.listen(listener);
	  }

	  return _extends({}, history, {
	    listen: listen
	  });
	}

	exports['default'] = createDOMHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 83 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _deepEqual = __webpack_require__(84);

	var _deepEqual2 = _interopRequireDefault(_deepEqual);

	var _AsyncUtils = __webpack_require__(87);

	var _Actions = __webpack_require__(78);

	var _createLocation2 = __webpack_require__(88);

	var _createLocation3 = _interopRequireDefault(_createLocation2);

	var _runTransitionHook = __webpack_require__(91);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _parsePath = __webpack_require__(89);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(92);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function createRandomKey(length) {
	  return Math.random().toString(36).substr(2, length);
	}

	function locationsAreEqual(a, b) {
	  return a.pathname === b.pathname && a.search === b.search &&
	  //a.action === b.action && // Different action !== location change.
	  a.key === b.key && _deepEqual2['default'](a.state, b.state);
	}

	var DefaultKeyLength = 6;

	function createHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	  var getCurrentLocation = options.getCurrentLocation;
	  var finishTransition = options.finishTransition;
	  var saveState = options.saveState;
	  var go = options.go;
	  var keyLength = options.keyLength;
	  var getUserConfirmation = options.getUserConfirmation;

	  if (typeof keyLength !== 'number') keyLength = DefaultKeyLength;

	  var transitionHooks = [];

	  function listenBefore(hook) {
	    transitionHooks.push(hook);

	    return function () {
	      transitionHooks = transitionHooks.filter(function (item) {
	        return item !== hook;
	      });
	    };
	  }

	  var allKeys = [];
	  var changeListeners = [];
	  var location = undefined;

	  function getCurrent() {
	    if (pendingLocation && pendingLocation.action === _Actions.POP) {
	      return allKeys.indexOf(pendingLocation.key);
	    } else if (location) {
	      return allKeys.indexOf(location.key);
	    } else {
	      return -1;
	    }
	  }

	  function updateLocation(newLocation) {
	    var current = getCurrent();

	    location = newLocation;

	    if (location.action === _Actions.PUSH) {
	      allKeys = [].concat(allKeys.slice(0, current + 1), [location.key]);
	    } else if (location.action === _Actions.REPLACE) {
	      allKeys[current] = location.key;
	    }

	    changeListeners.forEach(function (listener) {
	      listener(location);
	    });
	  }

	  function listen(listener) {
	    changeListeners.push(listener);

	    if (location) {
	      listener(location);
	    } else {
	      var _location = getCurrentLocation();
	      allKeys = [_location.key];
	      updateLocation(_location);
	    }

	    return function () {
	      changeListeners = changeListeners.filter(function (item) {
	        return item !== listener;
	      });
	    };
	  }

	  function confirmTransitionTo(location, callback) {
	    _AsyncUtils.loopAsync(transitionHooks.length, function (index, next, done) {
	      _runTransitionHook2['default'](transitionHooks[index], location, function (result) {
	        if (result != null) {
	          done(result);
	        } else {
	          next();
	        }
	      });
	    }, function (message) {
	      if (getUserConfirmation && typeof message === 'string') {
	        getUserConfirmation(message, function (ok) {
	          callback(ok !== false);
	        });
	      } else {
	        callback(message !== false);
	      }
	    });
	  }

	  var pendingLocation = undefined;

	  function transitionTo(nextLocation) {
	    if (location && locationsAreEqual(location, nextLocation)) return; // Nothing to do.

	    pendingLocation = nextLocation;

	    confirmTransitionTo(nextLocation, function (ok) {
	      if (pendingLocation !== nextLocation) return; // Transition was interrupted.

	      if (ok) {
	        // treat PUSH to current path like REPLACE to be consistent with browsers
	        if (nextLocation.action === _Actions.PUSH) {
	          var prevPath = createPath(location);
	          var nextPath = createPath(nextLocation);

	          if (nextPath === prevPath) nextLocation.action = _Actions.REPLACE;
	        }

	        if (finishTransition(nextLocation) !== false) updateLocation(nextLocation);
	      } else if (location && nextLocation.action === _Actions.POP) {
	        var prevIndex = allKeys.indexOf(location.key);
	        var nextIndex = allKeys.indexOf(nextLocation.key);

	        if (prevIndex !== -1 && nextIndex !== -1) go(prevIndex - nextIndex); // Restore the URL.
	      }
	    });
	  }

	  function push(location) {
	    transitionTo(createLocation(location, _Actions.PUSH, createKey()));
	  }

	  function replace(location) {
	    transitionTo(createLocation(location, _Actions.REPLACE, createKey()));
	  }

	  function goBack() {
	    go(-1);
	  }

	  function goForward() {
	    go(1);
	  }

	  function createKey() {
	    return createRandomKey(keyLength);
	  }

	  function createPath(location) {
	    if (location == null || typeof location === 'string') return location;

	    var pathname = location.pathname;
	    var search = location.search;
	    var hash = location.hash;

	    var result = pathname;

	    if (search) result += search;

	    if (hash) result += hash;

	    return result;
	  }

	  function createHref(location) {
	    return createPath(location);
	  }

	  function createLocation(location, action) {
	    var key = arguments.length <= 2 || arguments[2] === undefined ? createKey() : arguments[2];

	    if (typeof action === 'object') {
	      //warning(
	      //  false,
	      //  'The state (2nd) argument to history.createLocation is deprecated; use a ' +
	      //  'location descriptor instead'
	      //)

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      location = _extends({}, location, { state: action });

	      action = key;
	      key = arguments[3] || createKey();
	    }

	    return _createLocation3['default'](location, action, key);
	  }

	  // deprecated
	  function setState(state) {
	    if (location) {
	      updateLocationState(location, state);
	      updateLocation(location);
	    } else {
	      updateLocationState(getCurrentLocation(), state);
	    }
	  }

	  function updateLocationState(location, state) {
	    location.state = _extends({}, location.state, state);
	    saveState(location.key, location.state);
	  }

	  // deprecated
	  function registerTransitionHook(hook) {
	    if (transitionHooks.indexOf(hook) === -1) transitionHooks.push(hook);
	  }

	  // deprecated
	  function unregisterTransitionHook(hook) {
	    transitionHooks = transitionHooks.filter(function (item) {
	      return item !== hook;
	    });
	  }

	  // deprecated
	  function pushState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);

	    push(_extends({ state: state }, path));
	  }

	  // deprecated
	  function replaceState(state, path) {
	    if (typeof path === 'string') path = _parsePath2['default'](path);

	    replace(_extends({ state: state }, path));
	  }

	  return {
	    listenBefore: listenBefore,
	    listen: listen,
	    transitionTo: transitionTo,
	    push: push,
	    replace: replace,
	    go: go,
	    goBack: goBack,
	    goForward: goForward,
	    createKey: createKey,
	    createPath: createPath,
	    createHref: createHref,
	    createLocation: createLocation,

	    setState: _deprecate2['default'](setState, 'setState is deprecated; use location.key to save state instead'),
	    registerTransitionHook: _deprecate2['default'](registerTransitionHook, 'registerTransitionHook is deprecated; use listenBefore instead'),
	    unregisterTransitionHook: _deprecate2['default'](unregisterTransitionHook, 'unregisterTransitionHook is deprecated; use the callback returned from listenBefore instead'),
	    pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	    replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	  };
	}

	exports['default'] = createHistory;
	module.exports = exports['default'];

/***/ },
/* 84 */
/***/ function(module, exports, __webpack_require__) {

	var pSlice = Array.prototype.slice;
	var objectKeys = __webpack_require__(85);
	var isArguments = __webpack_require__(86);

	var deepEqual = module.exports = function (actual, expected, opts) {
	  if (!opts) opts = {};
	  // 7.1. All identical values are equivalent, as determined by ===.
	  if (actual === expected) {
	    return true;

	  } else if (actual instanceof Date && expected instanceof Date) {
	    return actual.getTime() === expected.getTime();

	  // 7.3. Other pairs that do not both pass typeof value == 'object',
	  // equivalence is determined by ==.
	  } else if (!actual || !expected || typeof actual != 'object' && typeof expected != 'object') {
	    return opts.strict ? actual === expected : actual == expected;

	  // 7.4. For all other Object pairs, including Array objects, equivalence is
	  // determined by having the same number of owned properties (as verified
	  // with Object.prototype.hasOwnProperty.call), the same set of keys
	  // (although not necessarily the same order), equivalent values for every
	  // corresponding key, and an identical 'prototype' property. Note: this
	  // accounts for both named and indexed properties on Arrays.
	  } else {
	    return objEquiv(actual, expected, opts);
	  }
	}

	function isUndefinedOrNull(value) {
	  return value === null || value === undefined;
	}

	function isBuffer (x) {
	  if (!x || typeof x !== 'object' || typeof x.length !== 'number') return false;
	  if (typeof x.copy !== 'function' || typeof x.slice !== 'function') {
	    return false;
	  }
	  if (x.length > 0 && typeof x[0] !== 'number') return false;
	  return true;
	}

	function objEquiv(a, b, opts) {
	  var i, key;
	  if (isUndefinedOrNull(a) || isUndefinedOrNull(b))
	    return false;
	  // an identical 'prototype' property.
	  if (a.prototype !== b.prototype) return false;
	  //~~~I've managed to break Object.keys through screwy arguments passing.
	  //   Converting to array solves the problem.
	  if (isArguments(a)) {
	    if (!isArguments(b)) {
	      return false;
	    }
	    a = pSlice.call(a);
	    b = pSlice.call(b);
	    return deepEqual(a, b, opts);
	  }
	  if (isBuffer(a)) {
	    if (!isBuffer(b)) {
	      return false;
	    }
	    if (a.length !== b.length) return false;
	    for (i = 0; i < a.length; i++) {
	      if (a[i] !== b[i]) return false;
	    }
	    return true;
	  }
	  try {
	    var ka = objectKeys(a),
	        kb = objectKeys(b);
	  } catch (e) {//happens when one is a string literal and the other isn't
	    return false;
	  }
	  // having the same number of owned properties (keys incorporates
	  // hasOwnProperty)
	  if (ka.length != kb.length)
	    return false;
	  //the same set of keys (although not necessarily the same order),
	  ka.sort();
	  kb.sort();
	  //~~~cheap key test
	  for (i = ka.length - 1; i >= 0; i--) {
	    if (ka[i] != kb[i])
	      return false;
	  }
	  //equivalent values for every corresponding key, and
	  //~~~possibly expensive deep test
	  for (i = ka.length - 1; i >= 0; i--) {
	    key = ka[i];
	    if (!deepEqual(a[key], b[key], opts)) return false;
	  }
	  return typeof a === typeof b;
	}


/***/ },
/* 85 */
/***/ function(module, exports) {

	exports = module.exports = typeof Object.keys === 'function'
	  ? Object.keys : shim;

	exports.shim = shim;
	function shim (obj) {
	  var keys = [];
	  for (var key in obj) keys.push(key);
	  return keys;
	}


/***/ },
/* 86 */
/***/ function(module, exports) {

	var supportsArgumentsClass = (function(){
	  return Object.prototype.toString.call(arguments)
	})() == '[object Arguments]';

	exports = module.exports = supportsArgumentsClass ? supported : unsupported;

	exports.supported = supported;
	function supported(object) {
	  return Object.prototype.toString.call(object) == '[object Arguments]';
	};

	exports.unsupported = unsupported;
	function unsupported(object){
	  return object &&
	    typeof object == 'object' &&
	    typeof object.length == 'number' &&
	    Object.prototype.hasOwnProperty.call(object, 'callee') &&
	    !Object.prototype.propertyIsEnumerable.call(object, 'callee') ||
	    false;
	};


/***/ },
/* 87 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0;
	  var isDone = false;

	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) return;

	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }

	  next();
	}

/***/ },
/* 88 */
/***/ function(module, exports, __webpack_require__) {

	//import warning from 'warning'
	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _Actions = __webpack_require__(78);

	var _parsePath = __webpack_require__(89);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function createLocation() {
	  var location = arguments.length <= 0 || arguments[0] === undefined ? '/' : arguments[0];
	  var action = arguments.length <= 1 || arguments[1] === undefined ? _Actions.POP : arguments[1];
	  var key = arguments.length <= 2 || arguments[2] === undefined ? null : arguments[2];

	  var _fourthArg = arguments.length <= 3 || arguments[3] === undefined ? null : arguments[3];

	  if (typeof location === 'string') location = _parsePath2['default'](location);

	  if (typeof action === 'object') {
	    //warning(
	    //  false,
	    //  'The state (2nd) argument to createLocation is deprecated; use a ' +
	    //  'location descriptor instead'
	    //)

	    location = _extends({}, location, { state: action });

	    action = key || _Actions.POP;
	    key = _fourthArg;
	  }

	  var pathname = location.pathname || '/';
	  var search = location.search || '';
	  var hash = location.hash || '';
	  var state = location.state || null;

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash,
	    state: state,
	    action: action,
	    key: key
	  };
	}

	exports['default'] = createLocation;
	module.exports = exports['default'];

/***/ },
/* 89 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _extractPath = __webpack_require__(90);

	var _extractPath2 = _interopRequireDefault(_extractPath);

	function parsePath(path) {
	  var pathname = _extractPath2['default'](path);
	  var search = '';
	  var hash = '';

	  process.env.NODE_ENV !== 'production' ? _warning2['default'](path === pathname, 'A path must be pathname + search + hash only, not a fully qualified URL like "%s"', path) : undefined;

	  var hashIndex = pathname.indexOf('#');
	  if (hashIndex !== -1) {
	    hash = pathname.substring(hashIndex);
	    pathname = pathname.substring(0, hashIndex);
	  }

	  var searchIndex = pathname.indexOf('?');
	  if (searchIndex !== -1) {
	    search = pathname.substring(searchIndex);
	    pathname = pathname.substring(0, searchIndex);
	  }

	  if (pathname === '') pathname = '/';

	  return {
	    pathname: pathname,
	    search: search,
	    hash: hash
	  };
	}

	exports['default'] = parsePath;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 90 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	function extractPath(string) {
	  var match = string.match(/^https?:\/\/[^\/]*/);

	  if (match == null) return string;

	  return string.substring(match[0].length);
	}

	exports["default"] = extractPath;
	module.exports = exports["default"];

/***/ },
/* 91 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	function runTransitionHook(hook, location, callback) {
	  var result = hook(location, callback);

	  if (hook.length < 2) {
	    // Assume the hook runs synchronously and automatically
	    // call the callback with the return value.
	    callback(result);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](result === undefined, 'You should not "return" in a transition hook with a callback argument; call the callback instead') : undefined;
	  }
	}

	exports['default'] = runTransitionHook;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 92 */
/***/ function(module, exports) {

	//import warning from 'warning'

	"use strict";

	exports.__esModule = true;
	function deprecate(fn) {
	  return fn;
	  //return function () {
	  //  warning(false, '[history] ' + message)
	  //  return fn.apply(this, arguments)
	  //}
	}

	exports["default"] = deprecate;
	module.exports = exports["default"];

/***/ },
/* 93 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	exports.isReactChildren = isReactChildren;
	exports.createRouteFromReactElement = createRouteFromReactElement;
	exports.createRoutesFromReactChildren = createRoutesFromReactChildren;
	exports.createRoutes = createRoutes;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	function isValidChild(object) {
	  return object == null || _react2['default'].isValidElement(object);
	}

	function isReactChildren(object) {
	  return isValidChild(object) || Array.isArray(object) && object.every(isValidChild);
	}

	function checkPropTypes(componentName, propTypes, props) {
	  componentName = componentName || 'UnknownComponent';

	  for (var propName in propTypes) {
	    if (propTypes.hasOwnProperty(propName)) {
	      var error = propTypes[propName](props, propName, componentName);

	      /* istanbul ignore if: error logging */
	      if (error instanceof Error) process.env.NODE_ENV !== 'production' ? _warning2['default'](false, error.message) : undefined;
	    }
	  }
	}

	function createRoute(defaultProps, props) {
	  return _extends({}, defaultProps, props);
	}

	function createRouteFromReactElement(element) {
	  var type = element.type;
	  var route = createRoute(type.defaultProps, element.props);

	  if (type.propTypes) checkPropTypes(type.displayName || type.name, type.propTypes, route);

	  if (route.children) {
	    var childRoutes = createRoutesFromReactChildren(route.children, route);

	    if (childRoutes.length) route.childRoutes = childRoutes;

	    delete route.children;
	  }

	  return route;
	}

	/**
	 * Creates and returns a routes object from the given ReactChildren. JSX
	 * provides a convenient way to visualize how routes in the hierarchy are
	 * nested.
	 *
	 *   import { Route, createRoutesFromReactChildren } from 'react-router'
	 *
	 *   const routes = createRoutesFromReactChildren(
	 *     <Route component={App}>
	 *       <Route path="home" component={Dashboard}/>
	 *       <Route path="news" component={NewsFeed}/>
	 *     </Route>
	 *   )
	 *
	 * Note: This method is automatically used when you provide <Route> children
	 * to a <Router> component.
	 */

	function createRoutesFromReactChildren(children, parentRoute) {
	  var routes = [];

	  _react2['default'].Children.forEach(children, function (element) {
	    if (_react2['default'].isValidElement(element)) {
	      // Component classes may have a static create* method.
	      if (element.type.createRouteFromReactElement) {
	        var route = element.type.createRouteFromReactElement(element, parentRoute);

	        if (route) routes.push(route);
	      } else {
	        routes.push(createRouteFromReactElement(element));
	      }
	    }
	  });

	  return routes;
	}

	/**
	 * Creates and returns an array of routes from the given object which
	 * may be a JSX route, a plain object route, or an array of either.
	 */

	function createRoutes(routes) {
	  if (isReactChildren(routes)) {
	    routes = createRoutesFromReactChildren(routes);
	  } else if (routes && !Array.isArray(routes)) {
	    routes = [routes];
	  }

	  return routes;
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 94 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _RouteUtils = __webpack_require__(93);

	var _getRouteParams = __webpack_require__(95);

	var _getRouteParams2 = _interopRequireDefault(_getRouteParams);

	var _React$PropTypes = _react2['default'].PropTypes;
	var array = _React$PropTypes.array;
	var func = _React$PropTypes.func;
	var object = _React$PropTypes.object;

	/**
	 * A <RoutingContext> renders the component tree for a given router state
	 * and sets the history object and the current location in context.
	 */

	var RoutingContext = (function (_Component) {
	  _inherits(RoutingContext, _Component);

	  function RoutingContext() {
	    _classCallCheck(this, RoutingContext);

	    _Component.apply(this, arguments);
	  }

	  RoutingContext.prototype.getChildContext = function getChildContext() {
	    var _props = this.props;
	    var history = _props.history;
	    var location = _props.location;

	    return { history: history, location: location };
	  };

	  RoutingContext.prototype.createElement = function createElement(component, props) {
	    return component == null ? null : this.props.createElement(component, props);
	  };

	  RoutingContext.prototype.render = function render() {
	    var _this = this;

	    var _props2 = this.props;
	    var history = _props2.history;
	    var location = _props2.location;
	    var routes = _props2.routes;
	    var params = _props2.params;
	    var components = _props2.components;

	    var element = null;

	    if (components) {
	      element = components.reduceRight(function (element, components, index) {
	        if (components == null) return element; // Don't create new children; use the grandchildren.

	        var route = routes[index];
	        var routeParams = _getRouteParams2['default'](route, params);
	        var props = {
	          history: history,
	          location: location,
	          params: params,
	          route: route,
	          routeParams: routeParams,
	          routes: routes
	        };

	        if (_RouteUtils.isReactChildren(element)) {
	          props.children = element;
	        } else if (element) {
	          for (var prop in element) {
	            if (element.hasOwnProperty(prop)) props[prop] = element[prop];
	          }
	        }

	        if (typeof components === 'object') {
	          var elements = {};

	          for (var key in components) {
	            if (components.hasOwnProperty(key)) {
	              // Pass through the key as a prop to createElement to allow
	              // custom createElement functions to know which named component
	              // they're rendering, for e.g. matching up to fetched data.
	              elements[key] = _this.createElement(components[key], _extends({
	                key: key }, props));
	            }
	          }

	          return elements;
	        }

	        return _this.createElement(components, props);
	      }, element);
	    }

	    !(element === null || element === false || _react2['default'].isValidElement(element)) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'The root route must render a single element') : _invariant2['default'](false) : undefined;

	    return element;
	  };

	  return RoutingContext;
	})(_react.Component);

	RoutingContext.propTypes = {
	  history: object.isRequired,
	  createElement: func.isRequired,
	  location: object.isRequired,
	  routes: array.isRequired,
	  params: object.isRequired,
	  components: array.isRequired
	};

	RoutingContext.defaultProps = {
	  createElement: _react2['default'].createElement
	};

	RoutingContext.childContextTypes = {
	  history: object.isRequired,
	  location: object.isRequired
	};

	exports['default'] = RoutingContext;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 95 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(96);

	/**
	 * Extracts an object of params the given route cares about from
	 * the given params object.
	 */
	function getRouteParams(route, params) {
	  var routeParams = {};

	  if (!route.path) return routeParams;

	  var paramNames = _PatternUtils.getParamNames(route.path);

	  for (var p in params) {
	    if (params.hasOwnProperty(p) && paramNames.indexOf(p) !== -1) routeParams[p] = params[p];
	  }return routeParams;
	}

	exports['default'] = getRouteParams;
	module.exports = exports['default'];

/***/ },
/* 96 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;
	exports.compilePattern = compilePattern;
	exports.matchPattern = matchPattern;
	exports.getParamNames = getParamNames;
	exports.getParams = getParams;
	exports.formatPattern = formatPattern;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	function escapeRegExp(string) {
	  return string.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
	}

	function escapeSource(string) {
	  return escapeRegExp(string).replace(/\/+/g, '/+');
	}

	function _compilePattern(pattern) {
	  var regexpSource = '';
	  var paramNames = [];
	  var tokens = [];

	  var match = undefined,
	      lastIndex = 0,
	      matcher = /:([a-zA-Z_$][a-zA-Z0-9_$]*)|\*\*|\*|\(|\)/g;
	  while (match = matcher.exec(pattern)) {
	    if (match.index !== lastIndex) {
	      tokens.push(pattern.slice(lastIndex, match.index));
	      regexpSource += escapeSource(pattern.slice(lastIndex, match.index));
	    }

	    if (match[1]) {
	      regexpSource += '([^/?#]+)';
	      paramNames.push(match[1]);
	    } else if (match[0] === '**') {
	      regexpSource += '([\\s\\S]*)';
	      paramNames.push('splat');
	    } else if (match[0] === '*') {
	      regexpSource += '([\\s\\S]*?)';
	      paramNames.push('splat');
	    } else if (match[0] === '(') {
	      regexpSource += '(?:';
	    } else if (match[0] === ')') {
	      regexpSource += ')?';
	    }

	    tokens.push(match[0]);

	    lastIndex = matcher.lastIndex;
	  }

	  if (lastIndex !== pattern.length) {
	    tokens.push(pattern.slice(lastIndex, pattern.length));
	    regexpSource += escapeSource(pattern.slice(lastIndex, pattern.length));
	  }

	  return {
	    pattern: pattern,
	    regexpSource: regexpSource,
	    paramNames: paramNames,
	    tokens: tokens
	  };
	}

	var CompiledPatternsCache = {};

	function compilePattern(pattern) {
	  if (!(pattern in CompiledPatternsCache)) CompiledPatternsCache[pattern] = _compilePattern(pattern);

	  return CompiledPatternsCache[pattern];
	}

	/**
	 * Attempts to match a pattern on the given pathname. Patterns may use
	 * the following special characters:
	 *
	 * - :paramName     Matches a URL segment up to the next /, ?, or #. The
	 *                  captured string is considered a "param"
	 * - ()             Wraps a segment of the URL that is optional
	 * - *              Consumes (non-greedy) all characters up to the next
	 *                  character in the pattern, or to the end of the URL if
	 *                  there is none
	 * - **             Consumes (greedy) all characters up to the next character
	 *                  in the pattern, or to the end of the URL if there is none
	 *
	 * The return value is an object with the following properties:
	 *
	 * - remainingPathname
	 * - paramNames
	 * - paramValues
	 */

	function matchPattern(pattern, pathname) {
	  // Make leading slashes consistent between pattern and pathname.
	  if (pattern.charAt(0) !== '/') {
	    pattern = '/' + pattern;
	  }
	  if (pathname.charAt(0) !== '/') {
	    pathname = '/' + pathname;
	  }

	  var _compilePattern2 = compilePattern(pattern);

	  var regexpSource = _compilePattern2.regexpSource;
	  var paramNames = _compilePattern2.paramNames;
	  var tokens = _compilePattern2.tokens;

	  regexpSource += '/*'; // Capture path separators

	  // Special-case patterns like '*' for catch-all routes.
	  var captureRemaining = tokens[tokens.length - 1] !== '*';

	  if (captureRemaining) {
	    // This will match newlines in the remaining path.
	    regexpSource += '([\\s\\S]*?)';
	  }

	  var match = pathname.match(new RegExp('^' + regexpSource + '$', 'i'));

	  var remainingPathname = undefined,
	      paramValues = undefined;
	  if (match != null) {
	    if (captureRemaining) {
	      remainingPathname = match.pop();
	      var matchedPath = match[0].substr(0, match[0].length - remainingPathname.length);

	      // If we didn't match the entire pathname, then make sure that the match
	      // we did get ends at a path separator (potentially the one we added
	      // above at the beginning of the path, if the actual match was empty).
	      if (remainingPathname && matchedPath.charAt(matchedPath.length - 1) !== '/') {
	        return {
	          remainingPathname: null,
	          paramNames: paramNames,
	          paramValues: null
	        };
	      }
	    } else {
	      // If this matched at all, then the match was the entire pathname.
	      remainingPathname = '';
	    }

	    paramValues = match.slice(1).map(function (v) {
	      return v != null ? decodeURIComponent(v) : v;
	    });
	  } else {
	    remainingPathname = paramValues = null;
	  }

	  return {
	    remainingPathname: remainingPathname,
	    paramNames: paramNames,
	    paramValues: paramValues
	  };
	}

	function getParamNames(pattern) {
	  return compilePattern(pattern).paramNames;
	}

	function getParams(pattern, pathname) {
	  var _matchPattern = matchPattern(pattern, pathname);

	  var paramNames = _matchPattern.paramNames;
	  var paramValues = _matchPattern.paramValues;

	  if (paramValues != null) {
	    return paramNames.reduce(function (memo, paramName, index) {
	      memo[paramName] = paramValues[index];
	      return memo;
	    }, {});
	  }

	  return null;
	}

	/**
	 * Returns a version of the given pattern with params interpolated. Throws
	 * if there is a dynamic segment of the pattern for which there is no param.
	 */

	function formatPattern(pattern, params) {
	  params = params || {};

	  var _compilePattern3 = compilePattern(pattern);

	  var tokens = _compilePattern3.tokens;

	  var parenCount = 0,
	      pathname = '',
	      splatIndex = 0;

	  var token = undefined,
	      paramName = undefined,
	      paramValue = undefined;
	  for (var i = 0, len = tokens.length; i < len; ++i) {
	    token = tokens[i];

	    if (token === '*' || token === '**') {
	      paramValue = Array.isArray(params.splat) ? params.splat[splatIndex++] : params.splat;

	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Missing splat #%s for path "%s"', splatIndex, pattern) : _invariant2['default'](false) : undefined;

	      if (paramValue != null) pathname += encodeURI(paramValue);
	    } else if (token === '(') {
	      parenCount += 1;
	    } else if (token === ')') {
	      parenCount -= 1;
	    } else if (token.charAt(0) === ':') {
	      paramName = token.substring(1);
	      paramValue = params[paramName];

	      !(paramValue != null || parenCount > 0) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Missing "%s" parameter for path "%s"', paramName, pattern) : _invariant2['default'](false) : undefined;

	      if (paramValue != null) pathname += encodeURIComponent(paramValue);
	    } else {
	      pathname += token;
	    }
	  }

	  return pathname.replace(/\/+/g, '/');
	}
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 97 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _historyLibActions = __webpack_require__(78);

	var _historyLibUseQueries = __webpack_require__(98);

	var _historyLibUseQueries2 = _interopRequireDefault(_historyLibUseQueries);

	var _computeChangedRoutes2 = __webpack_require__(101);

	var _computeChangedRoutes3 = _interopRequireDefault(_computeChangedRoutes2);

	var _TransitionUtils = __webpack_require__(102);

	var _isActive2 = __webpack_require__(104);

	var _isActive3 = _interopRequireDefault(_isActive2);

	var _getComponents = __webpack_require__(105);

	var _getComponents2 = _interopRequireDefault(_getComponents);

	var _matchRoutes = __webpack_require__(106);

	var _matchRoutes2 = _interopRequireDefault(_matchRoutes);

	function hasAnyProperties(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p)) return true;
	  }return false;
	}

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know about routing.
	 *
	 * Enhances history objects with the following methods:
	 *
	 * - listen((error, nextState) => {})
	 * - listenBeforeLeavingRoute(route, (nextLocation) => {})
	 * - match(location, (error, redirectLocation, nextState) => {})
	 * - isActive(pathname, query, indexOnly=false)
	 */
	function useRoutes(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var routes = options.routes;

	    var historyOptions = _objectWithoutProperties(options, ['routes']);

	    var history = _historyLibUseQueries2['default'](createHistory)(historyOptions);
	    var state = {};

	    function isActive(pathname, query) {
	      var indexOnly = arguments.length <= 2 || arguments[2] === undefined ? false : arguments[2];

	      return _isActive3['default'](pathname, query, indexOnly, state.location, state.routes, state.params);
	    }

	    function createLocationFromRedirectInfo(_ref) {
	      var pathname = _ref.pathname;
	      var query = _ref.query;
	      var state = _ref.state;

	      return history.createLocation(history.createPath(pathname, query), state, _historyLibActions.REPLACE);
	    }

	    var partialNextState = undefined;

	    function match(location, callback) {
	      if (partialNextState && partialNextState.location === location) {
	        // Continue from where we left off.
	        finishMatch(partialNextState, callback);
	      } else {
	        _matchRoutes2['default'](routes, location, function (error, nextState) {
	          if (error) {
	            callback(error);
	          } else if (nextState) {
	            finishMatch(_extends({}, nextState, { location: location }), callback);
	          } else {
	            callback();
	          }
	        });
	      }
	    }

	    function finishMatch(nextState, callback) {
	      var _computeChangedRoutes = _computeChangedRoutes3['default'](state, nextState);

	      var leaveRoutes = _computeChangedRoutes.leaveRoutes;
	      var enterRoutes = _computeChangedRoutes.enterRoutes;

	      _TransitionUtils.runLeaveHooks(leaveRoutes);

	      _TransitionUtils.runEnterHooks(enterRoutes, nextState, function (error, redirectInfo) {
	        if (error) {
	          callback(error);
	        } else if (redirectInfo) {
	          callback(null, createLocationFromRedirectInfo(redirectInfo));
	        } else {
	          // TODO: Fetch components after state is updated.
	          _getComponents2['default'](nextState, function (error, components) {
	            if (error) {
	              callback(error);
	            } else {
	              // TODO: Make match a pure function and have some other API
	              // for "match and update state".
	              callback(null, null, state = _extends({}, nextState, { components: components }));
	            }
	          });
	        }
	      });
	    }

	    var RouteGuid = 1;

	    function getRouteID(route) {
	      return route.__id__ || (route.__id__ = RouteGuid++);
	    }

	    var RouteHooks = {};

	    function getRouteHooksForRoutes(routes) {
	      return routes.reduce(function (hooks, route) {
	        hooks.push.apply(hooks, RouteHooks[getRouteID(route)]);
	        return hooks;
	      }, []);
	    }

	    function transitionHook(location, callback) {
	      _matchRoutes2['default'](routes, location, function (error, nextState) {
	        if (nextState == null) {
	          // TODO: We didn't actually match anything, but hang
	          // onto error/nextState so we don't have to matchRoutes
	          // again in the listen callback.
	          callback();
	          return;
	        }

	        // Cache some state here so we don't have to
	        // matchRoutes() again in the listen callback.
	        partialNextState = _extends({}, nextState, { location: location });

	        var hooks = getRouteHooksForRoutes(_computeChangedRoutes3['default'](state, partialNextState).leaveRoutes);

	        var result = undefined;
	        for (var i = 0, len = hooks.length; result == null && i < len; ++i) {
	          // Passing the location arg here indicates to
	          // the user that this is a transition hook.
	          result = hooks[i](location);
	        }

	        callback(result);
	      });
	    }

	    function beforeUnloadHook() {
	      // Synchronously check to see if any route hooks want
	      // to prevent the current window/tab from closing.
	      if (state.routes) {
	        var hooks = getRouteHooksForRoutes(state.routes);

	        var message = undefined;
	        for (var i = 0, len = hooks.length; typeof message !== 'string' && i < len; ++i) {
	          // Passing no args indicates to the user that this is a
	          // beforeunload hook. We don't know the next location.
	          message = hooks[i]();
	        }

	        return message;
	      }
	    }

	    var unlistenBefore = undefined,
	        unlistenBeforeUnload = undefined;

	    /**
	     * Registers the given hook function to run before leaving the given route.
	     *
	     * During a normal transition, the hook function receives the next location
	     * as its only argument and must return either a) a prompt message to show
	     * the user, to make sure they want to leave the page or b) false, to prevent
	     * the transition.
	     *
	     * During the beforeunload event (in browsers) the hook receives no arguments.
	     * In this case it must return a prompt message to prevent the transition.
	     *
	     * Returns a function that may be used to unbind the listener.
	     */
	    function listenBeforeLeavingRoute(route, hook) {
	      // TODO: Warn if they register for a route that isn't currently
	      // active. They're probably doing something wrong, like re-creating
	      // route objects on every location change.
	      var routeID = getRouteID(route);
	      var hooks = RouteHooks[routeID];

	      if (hooks == null) {
	        var thereWereNoRouteHooks = !hasAnyProperties(RouteHooks);

	        hooks = RouteHooks[routeID] = [hook];

	        if (thereWereNoRouteHooks) {
	          // setup transition & beforeunload hooks
	          unlistenBefore = history.listenBefore(transitionHook);

	          if (history.listenBeforeUnload) unlistenBeforeUnload = history.listenBeforeUnload(beforeUnloadHook);
	        }
	      } else if (hooks.indexOf(hook) === -1) {
	        hooks.push(hook);
	      }

	      return function () {
	        var hooks = RouteHooks[routeID];

	        if (hooks != null) {
	          var newHooks = hooks.filter(function (item) {
	            return item !== hook;
	          });

	          if (newHooks.length === 0) {
	            delete RouteHooks[routeID];

	            if (!hasAnyProperties(RouteHooks)) {
	              // teardown transition & beforeunload hooks
	              if (unlistenBefore) {
	                unlistenBefore();
	                unlistenBefore = null;
	              }

	              if (unlistenBeforeUnload) {
	                unlistenBeforeUnload();
	                unlistenBeforeUnload = null;
	              }
	            }
	          } else {
	            RouteHooks[routeID] = newHooks;
	          }
	        }
	      };
	    }

	    /**
	     * This is the API for stateful environments. As the location
	     * changes, we update state and call the listener. We can also
	     * gracefully handle errors and redirects.
	     */
	    function listen(listener) {
	      // TODO: Only use a single history listener. Otherwise we'll
	      // end up with multiple concurrent calls to match.
	      return history.listen(function (location) {
	        if (state.location === location) {
	          listener(null, state);
	        } else {
	          match(location, function (error, redirectLocation, nextState) {
	            if (error) {
	              listener(error);
	            } else if (redirectLocation) {
	              history.transitionTo(redirectLocation);
	            } else if (nextState) {
	              listener(null, nextState);
	            } else {
	              process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Location "%s" did not match any routes', location.pathname + location.search + location.hash) : undefined;
	            }
	          });
	        }
	      });
	    }

	    return _extends({}, history, {
	      isActive: isActive,
	      match: match,
	      listenBeforeLeavingRoute: listenBeforeLeavingRoute,
	      listen: listen
	    });
	  };
	}

	exports['default'] = useRoutes;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 98 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _queryString = __webpack_require__(99);

	var _runTransitionHook = __webpack_require__(91);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _parsePath = __webpack_require__(89);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(92);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	var SEARCH_BASE_KEY = '$searchBase';

	function defaultStringifyQuery(query) {
	  return _queryString.stringify(query).replace(/%20/g, '+');
	}

	var defaultParseQueryString = _queryString.parse;

	function isNestedObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p) && typeof object[p] === 'object' && !Array.isArray(object[p]) && object[p] !== null) return true;
	  }return false;
	}

	/**
	 * Returns a new createHistory function that may be used to create
	 * history objects that know how to handle URL queries.
	 */
	function useQueries(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var stringifyQuery = options.stringifyQuery;
	    var parseQueryString = options.parseQueryString;

	    var historyOptions = _objectWithoutProperties(options, ['stringifyQuery', 'parseQueryString']);

	    var history = createHistory(historyOptions);

	    if (typeof stringifyQuery !== 'function') stringifyQuery = defaultStringifyQuery;

	    if (typeof parseQueryString !== 'function') parseQueryString = defaultParseQueryString;

	    function addQuery(location) {
	      if (location.query == null) {
	        var search = location.search;

	        location.query = parseQueryString(search.substring(1));
	        location[SEARCH_BASE_KEY] = { search: search, searchBase: '' };
	      }

	      // TODO: Instead of all the book-keeping here, this should just strip the
	      // stringified query from the search.

	      return location;
	    }

	    function appendQuery(location, query) {
	      var _extends2;

	      var queryString = undefined;
	      if (!query || (queryString = stringifyQuery(query)) === '') return location;

	      process.env.NODE_ENV !== 'production' ? _warning2['default'](stringifyQuery !== defaultStringifyQuery || !isNestedObject(query), 'useQueries does not stringify nested query objects by default; ' + 'use a custom stringifyQuery function') : undefined;

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      var searchBaseSpec = location[SEARCH_BASE_KEY];
	      var searchBase = undefined;
	      if (searchBaseSpec && location.search === searchBaseSpec.search) {
	        searchBase = searchBaseSpec.searchBase;
	      } else {
	        searchBase = location.search || '';
	      }

	      var search = searchBase + (searchBase ? '&' : '?') + queryString;

	      return _extends({}, location, (_extends2 = {
	        search: search
	      }, _extends2[SEARCH_BASE_KEY] = { search: search, searchBase: searchBase }, _extends2));
	    }

	    // Override all read methods with query-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addQuery(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addQuery(location));
	      });
	    }

	    // Override all write methods with query-aware versions.
	    function push(location) {
	      history.push(appendQuery(location, location.query));
	    }

	    function replace(location) {
	      history.replace(appendQuery(location, location.query));
	    }

	    function createPath(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createPath is deprecated; use a location descriptor instead'
	      //)
	      return history.createPath(appendQuery(location, query || location.query));
	    }

	    function createHref(location, query) {
	      //warning(
	      //  !query,
	      //  'the query argument to createHref is deprecated; use a location descriptor instead'
	      //)
	      return history.createHref(appendQuery(location, query || location.query));
	    }

	    function createLocation() {
	      return addQuery(history.createLocation.apply(history, arguments));
	    }

	    // deprecated
	    function pushState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      push(_extends({ state: state }, path, { query: query }));
	    }

	    // deprecated
	    function replaceState(state, path, query) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      replace(_extends({ state: state }, path, { query: query }));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useQueries;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 99 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';
	var strictUriEncode = __webpack_require__(100);

	exports.extract = function (str) {
		return str.split('?')[1] || '';
	};

	exports.parse = function (str) {
		if (typeof str !== 'string') {
			return {};
		}

		str = str.trim().replace(/^(\?|#|&)/, '');

		if (!str) {
			return {};
		}

		return str.split('&').reduce(function (ret, param) {
			var parts = param.replace(/\+/g, ' ').split('=');
			// Firefox (pre 40) decodes `%3D` to `=`
			// https://github.com/sindresorhus/query-string/pull/37
			var key = parts.shift();
			var val = parts.length > 0 ? parts.join('=') : undefined;

			key = decodeURIComponent(key);

			// missing `=` should be `null`:
			// http://w3.org/TR/2012/WD-url-20120524/#collect-url-parameters
			val = val === undefined ? null : decodeURIComponent(val);

			if (!ret.hasOwnProperty(key)) {
				ret[key] = val;
			} else if (Array.isArray(ret[key])) {
				ret[key].push(val);
			} else {
				ret[key] = [ret[key], val];
			}

			return ret;
		}, {});
	};

	exports.stringify = function (obj) {
		return obj ? Object.keys(obj).sort().map(function (key) {
			var val = obj[key];

			if (val === undefined) {
				return '';
			}

			if (val === null) {
				return key;
			}

			if (Array.isArray(val)) {
				return val.sort().map(function (val2) {
					return strictUriEncode(key) + '=' + strictUriEncode(val2);
				}).join('&');
			}

			return strictUriEncode(key) + '=' + strictUriEncode(val);
		}).filter(function (x) {
			return x.length > 0;
		}).join('&') : '';
	};


/***/ },
/* 100 */
/***/ function(module, exports) {

	'use strict';
	module.exports = function (str) {
		return encodeURIComponent(str).replace(/[!'()*]/g, function (c) {
			return '%' + c.charCodeAt(0).toString(16).toUpperCase();
		});
	};


/***/ },
/* 101 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(96);

	function routeParamsChanged(route, prevState, nextState) {
	  if (!route.path) return false;

	  var paramNames = _PatternUtils.getParamNames(route.path);

	  return paramNames.some(function (paramName) {
	    return prevState.params[paramName] !== nextState.params[paramName];
	  });
	}

	/**
	 * Returns an object of { leaveRoutes, enterRoutes } determined by
	 * the change from prevState to nextState. We leave routes if either
	 * 1) they are not in the next state or 2) they are in the next state
	 * but their params have changed (i.e. /users/123 => /users/456).
	 *
	 * leaveRoutes are ordered starting at the leaf route of the tree
	 * we're leaving up to the common parent route. enterRoutes are ordered
	 * from the top of the tree we're entering down to the leaf route.
	 */
	function computeChangedRoutes(prevState, nextState) {
	  var prevRoutes = prevState && prevState.routes;
	  var nextRoutes = nextState.routes;

	  var leaveRoutes = undefined,
	      enterRoutes = undefined;
	  if (prevRoutes) {
	    leaveRoutes = prevRoutes.filter(function (route) {
	      return nextRoutes.indexOf(route) === -1 || routeParamsChanged(route, prevState, nextState);
	    });

	    // onLeave hooks start at the leaf route.
	    leaveRoutes.reverse();

	    enterRoutes = nextRoutes.filter(function (route) {
	      return prevRoutes.indexOf(route) === -1 || leaveRoutes.indexOf(route) !== -1;
	    });
	  } else {
	    leaveRoutes = [];
	    enterRoutes = nextRoutes;
	  }

	  return {
	    leaveRoutes: leaveRoutes,
	    enterRoutes: enterRoutes
	  };
	}

	exports['default'] = computeChangedRoutes;
	module.exports = exports['default'];

/***/ },
/* 102 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.runEnterHooks = runEnterHooks;
	exports.runLeaveHooks = runLeaveHooks;

	var _AsyncUtils = __webpack_require__(103);

	function createEnterHook(hook, route) {
	  return function (a, b, callback) {
	    hook.apply(route, arguments);

	    if (hook.length < 3) {
	      // Assume hook executes synchronously and
	      // automatically call the callback.
	      callback();
	    }
	  };
	}

	function getEnterHooks(routes) {
	  return routes.reduce(function (hooks, route) {
	    if (route.onEnter) hooks.push(createEnterHook(route.onEnter, route));

	    return hooks;
	  }, []);
	}

	/**
	 * Runs all onEnter hooks in the given array of routes in order
	 * with onEnter(nextState, replaceState, callback) and calls
	 * callback(error, redirectInfo) when finished. The first hook
	 * to use replaceState short-circuits the loop.
	 *
	 * If a hook needs to run asynchronously, it may use the callback
	 * function. However, doing so will cause the transition to pause,
	 * which could lead to a non-responsive UI if the hook is slow.
	 */

	function runEnterHooks(routes, nextState, callback) {
	  var hooks = getEnterHooks(routes);

	  if (!hooks.length) {
	    callback();
	    return;
	  }

	  var redirectInfo = undefined;
	  function replaceState(state, pathname, query) {
	    redirectInfo = { pathname: pathname, query: query, state: state };
	  }

	  _AsyncUtils.loopAsync(hooks.length, function (index, next, done) {
	    hooks[index](nextState, replaceState, function (error) {
	      if (error || redirectInfo) {
	        done(error, redirectInfo); // No need to continue.
	      } else {
	          next();
	        }
	    });
	  }, callback);
	}

	/**
	 * Runs all onLeave hooks in the given array of routes in order.
	 */

	function runLeaveHooks(routes) {
	  for (var i = 0, len = routes.length; i < len; ++i) {
	    if (routes[i].onLeave) routes[i].onLeave.call(routes[i]);
	  }
	}

/***/ },
/* 103 */
/***/ function(module, exports) {

	"use strict";

	exports.__esModule = true;
	exports.loopAsync = loopAsync;
	exports.mapAsync = mapAsync;

	function loopAsync(turns, work, callback) {
	  var currentTurn = 0,
	      isDone = false;

	  function done() {
	    isDone = true;
	    callback.apply(this, arguments);
	  }

	  function next() {
	    if (isDone) return;

	    if (currentTurn < turns) {
	      work.call(this, currentTurn++, next, done);
	    } else {
	      done.apply(this, arguments);
	    }
	  }

	  next();
	}

	function mapAsync(array, work, callback) {
	  var length = array.length;
	  var values = [];

	  if (length === 0) return callback(null, values);

	  var isDone = false,
	      doneCount = 0;

	  function done(index, error, value) {
	    if (isDone) return;

	    if (error) {
	      isDone = true;
	      callback(error);
	    } else {
	      values[index] = value;

	      isDone = ++doneCount === length;

	      if (isDone) callback(null, values);
	    }
	  }

	  array.forEach(function (item, index) {
	    work(item, index, function (error, value) {
	      done(index, error, value);
	    });
	  });
	}

/***/ },
/* 104 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PatternUtils = __webpack_require__(96);

	function deepEqual(a, b) {
	  if (a == b) return true;

	  if (a == null || b == null) return false;

	  if (Array.isArray(a)) {
	    return Array.isArray(b) && a.length === b.length && a.every(function (item, index) {
	      return deepEqual(item, b[index]);
	    });
	  }

	  if (typeof a === 'object') {
	    for (var p in a) {
	      if (!a.hasOwnProperty(p)) {
	        continue;
	      }

	      if (a[p] === undefined) {
	        if (b[p] !== undefined) {
	          return false;
	        }
	      } else if (!b.hasOwnProperty(p)) {
	        return false;
	      } else if (!deepEqual(a[p], b[p])) {
	        return false;
	      }
	    }

	    return true;
	  }

	  return String(a) === String(b);
	}

	function paramsAreActive(paramNames, paramValues, activeParams) {
	  // FIXME: This doesn't work on repeated params in activeParams.
	  return paramNames.every(function (paramName, index) {
	    return String(paramValues[index]) === String(activeParams[paramName]);
	  });
	}

	function getMatchingRouteIndex(pathname, activeRoutes, activeParams) {
	  var remainingPathname = pathname,
	      paramNames = [],
	      paramValues = [];

	  for (var i = 0, len = activeRoutes.length; i < len; ++i) {
	    var route = activeRoutes[i];
	    var pattern = route.path || '';

	    if (pattern.charAt(0) === '/') {
	      remainingPathname = pathname;
	      paramNames = [];
	      paramValues = [];
	    }

	    if (remainingPathname !== null) {
	      var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
	      remainingPathname = matched.remainingPathname;
	      paramNames = [].concat(paramNames, matched.paramNames);
	      paramValues = [].concat(paramValues, matched.paramValues);
	    }

	    if (remainingPathname === '' && route.path && paramsAreActive(paramNames, paramValues, activeParams)) return i;
	  }

	  return null;
	}

	/**
	 * Returns true if the given pathname matches the active routes
	 * and params.
	 */
	function routeIsActive(pathname, routes, params, indexOnly) {
	  var i = getMatchingRouteIndex(pathname, routes, params);

	  if (i === null) {
	    // No match.
	    return false;
	  } else if (!indexOnly) {
	    // Any match is good enough.
	    return true;
	  }

	  // If any remaining routes past the match index have paths, then we can't
	  // be on the index route.
	  return routes.slice(i + 1).every(function (route) {
	    return !route.path;
	  });
	}

	/**
	 * Returns true if all key/value pairs in the given query are
	 * currently active.
	 */
	function queryIsActive(query, activeQuery) {
	  if (activeQuery == null) return query == null;

	  if (query == null) return true;

	  return deepEqual(query, activeQuery);
	}

	/**
	 * Returns true if a <Link> to the given pathname/query combination is
	 * currently active.
	 */
	function isActive(pathname, query, indexOnly, location, routes, params) {
	  if (location == null) return false;

	  if (!routeIsActive(pathname, routes, params, indexOnly)) return false;

	  return queryIsActive(query, location.query);
	}

	exports['default'] = isActive;
	module.exports = exports['default'];

/***/ },
/* 105 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _AsyncUtils = __webpack_require__(103);

	function getComponentsForRoute(location, route, callback) {
	  if (route.component || route.components) {
	    callback(null, route.component || route.components);
	  } else if (route.getComponent) {
	    route.getComponent(location, callback);
	  } else if (route.getComponents) {
	    route.getComponents(location, callback);
	  } else {
	    callback();
	  }
	}

	/**
	 * Asynchronously fetches all components needed for the given router
	 * state and calls callback(error, components) when finished.
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getComponents method.
	 */
	function getComponents(nextState, callback) {
	  _AsyncUtils.mapAsync(nextState.routes, function (route, index, callback) {
	    getComponentsForRoute(nextState.location, route, callback);
	  }, callback);
	}

	exports['default'] = getComponents;
	module.exports = exports['default'];

/***/ },
/* 106 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _AsyncUtils = __webpack_require__(103);

	var _PatternUtils = __webpack_require__(96);

	var _RouteUtils = __webpack_require__(93);

	function getChildRoutes(route, location, callback) {
	  if (route.childRoutes) {
	    callback(null, route.childRoutes);
	  } else if (route.getChildRoutes) {
	    route.getChildRoutes(location, function (error, childRoutes) {
	      callback(error, !error && _RouteUtils.createRoutes(childRoutes));
	    });
	  } else {
	    callback();
	  }
	}

	function getIndexRoute(route, location, callback) {
	  if (route.indexRoute) {
	    callback(null, route.indexRoute);
	  } else if (route.getIndexRoute) {
	    route.getIndexRoute(location, function (error, indexRoute) {
	      callback(error, !error && _RouteUtils.createRoutes(indexRoute)[0]);
	    });
	  } else if (route.childRoutes) {
	    (function () {
	      var pathless = route.childRoutes.filter(function (obj) {
	        return !obj.hasOwnProperty('path');
	      });

	      _AsyncUtils.loopAsync(pathless.length, function (index, next, done) {
	        getIndexRoute(pathless[index], location, function (error, indexRoute) {
	          if (error || indexRoute) {
	            var routes = [pathless[index]].concat(Array.isArray(indexRoute) ? indexRoute : [indexRoute]);
	            done(error, routes);
	          } else {
	            next();
	          }
	        });
	      }, function (err, routes) {
	        callback(null, routes);
	      });
	    })();
	  } else {
	    callback();
	  }
	}

	function assignParams(params, paramNames, paramValues) {
	  return paramNames.reduce(function (params, paramName, index) {
	    var paramValue = paramValues && paramValues[index];

	    if (Array.isArray(params[paramName])) {
	      params[paramName].push(paramValue);
	    } else if (paramName in params) {
	      params[paramName] = [params[paramName], paramValue];
	    } else {
	      params[paramName] = paramValue;
	    }

	    return params;
	  }, params);
	}

	function createParams(paramNames, paramValues) {
	  return assignParams({}, paramNames, paramValues);
	}

	function matchRouteDeep(route, location, remainingPathname, paramNames, paramValues, callback) {
	  var pattern = route.path || '';

	  if (pattern.charAt(0) === '/') {
	    remainingPathname = location.pathname;
	    paramNames = [];
	    paramValues = [];
	  }

	  if (remainingPathname !== null) {
	    var matched = _PatternUtils.matchPattern(pattern, remainingPathname);
	    remainingPathname = matched.remainingPathname;
	    paramNames = [].concat(paramNames, matched.paramNames);
	    paramValues = [].concat(paramValues, matched.paramValues);

	    if (remainingPathname === '' && route.path) {
	      var _ret2 = (function () {
	        var match = {
	          routes: [route],
	          params: createParams(paramNames, paramValues)
	        };

	        getIndexRoute(route, location, function (error, indexRoute) {
	          if (error) {
	            callback(error);
	          } else {
	            if (Array.isArray(indexRoute)) {
	              var _match$routes;

	              process.env.NODE_ENV !== 'production' ? _warning2['default'](indexRoute.every(function (route) {
	                return !route.path;
	              }), 'Index routes should not have paths') : undefined;
	              (_match$routes = match.routes).push.apply(_match$routes, indexRoute);
	            } else if (indexRoute) {
	              process.env.NODE_ENV !== 'production' ? _warning2['default'](!indexRoute.path, 'Index routes should not have paths') : undefined;
	              match.routes.push(indexRoute);
	            }

	            callback(null, match);
	          }
	        });
	        return {
	          v: undefined
	        };
	      })();

	      if (typeof _ret2 === 'object') return _ret2.v;
	    }
	  }

	  if (remainingPathname != null || route.childRoutes) {
	    // Either a) this route matched at least some of the path or b)
	    // we don't have to load this route's children asynchronously. In
	    // either case continue checking for matches in the subtree.
	    getChildRoutes(route, location, function (error, childRoutes) {
	      if (error) {
	        callback(error);
	      } else if (childRoutes) {
	        // Check the child routes to see if any of them match.
	        matchRoutes(childRoutes, location, function (error, match) {
	          if (error) {
	            callback(error);
	          } else if (match) {
	            // A child route matched! Augment the match and pass it up the stack.
	            match.routes.unshift(route);
	            callback(null, match);
	          } else {
	            callback();
	          }
	        }, remainingPathname, paramNames, paramValues);
	      } else {
	        callback();
	      }
	    });
	  } else {
	    callback();
	  }
	}

	/**
	 * Asynchronously matches the given location to a set of routes and calls
	 * callback(error, state) when finished. The state object will have the
	 * following properties:
	 *
	 * - routes       An array of routes that matched, in hierarchical order
	 * - params       An object of URL parameters
	 *
	 * Note: This operation may finish synchronously if no routes have an
	 * asynchronous getChildRoutes method.
	 */
	function matchRoutes(routes, location, callback) {
	  var remainingPathname = arguments.length <= 3 || arguments[3] === undefined ? location.pathname : arguments[3];
	  var paramNames = arguments.length <= 4 || arguments[4] === undefined ? [] : arguments[4];
	  var paramValues = arguments.length <= 5 || arguments[5] === undefined ? [] : arguments[5];
	  return (function () {
	    _AsyncUtils.loopAsync(routes.length, function (index, next, done) {
	      matchRouteDeep(routes[index], location, remainingPathname, paramNames, paramValues, function (error, match) {
	        if (error || match) {
	          done(error, match);
	        } else {
	          next();
	        }
	      });
	    }, callback);
	  })();
	}

	exports['default'] = matchRoutes;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 107 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;
	exports.falsy = falsy;

	var _react = __webpack_require__(1);

	var func = _react.PropTypes.func;
	var object = _react.PropTypes.object;
	var arrayOf = _react.PropTypes.arrayOf;
	var oneOfType = _react.PropTypes.oneOfType;
	var element = _react.PropTypes.element;
	var shape = _react.PropTypes.shape;
	var string = _react.PropTypes.string;

	function falsy(props, propName, componentName) {
	  if (props[propName]) return new Error('<' + componentName + '> should not have a "' + propName + '" prop');
	}

	var history = shape({
	  listen: func.isRequired,
	  pushState: func.isRequired,
	  replaceState: func.isRequired,
	  go: func.isRequired
	});

	exports.history = history;
	var location = shape({
	  pathname: string.isRequired,
	  search: string.isRequired,
	  state: object,
	  action: string.isRequired,
	  key: string
	});

	exports.location = location;
	var component = oneOfType([func, string]);
	exports.component = component;
	var components = oneOfType([component, object]);
	exports.components = components;
	var route = oneOfType([object, element]);
	exports.route = route;
	var routes = oneOfType([route, arrayOf(route)]);

	exports.routes = routes;
	exports['default'] = {
	  falsy: falsy,
	  history: history,
	  location: location,
	  component: component,
	  components: components,
	  route: route
	};

/***/ },
/* 108 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _React$PropTypes = _react2['default'].PropTypes;
	var bool = _React$PropTypes.bool;
	var object = _React$PropTypes.object;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;

	function isLeftClickEvent(event) {
	  return event.button === 0;
	}

	function isModifiedEvent(event) {
	  return !!(event.metaKey || event.altKey || event.ctrlKey || event.shiftKey);
	}

	function isEmptyObject(object) {
	  for (var p in object) {
	    if (object.hasOwnProperty(p)) return false;
	  }return true;
	}

	/**
	 * A <Link> is used to create an <a> element that links to a route.
	 * When that route is active, the link gets the value of its
	 * `activeClassName` prop
	 *
	 * For example, assuming you have the following route:
	 *
	 *   <Route path="/posts/:postID" component={Post} />
	 *
	 * You could use the following component to link to that route:
	 *
	 *   <Link to={`/posts/${post.id}`} />
	 *
	 * Links may pass along location state and/or query string parameters
	 * in the state/query props, respectively.
	 *
	 *   <Link ... query={{ show: true }} state={{ the: 'state' }} />
	 */

	var Link = (function (_Component) {
	  _inherits(Link, _Component);

	  function Link() {
	    _classCallCheck(this, Link);

	    _Component.apply(this, arguments);
	  }

	  Link.prototype.handleClick = function handleClick(event) {
	    var allowTransition = true;

	    if (this.props.onClick) this.props.onClick(event);

	    if (isModifiedEvent(event) || !isLeftClickEvent(event)) return;

	    if (event.defaultPrevented === true) allowTransition = false;

	    // If target prop is set (e.g. to "_blank") let browser handle link.
	    /* istanbul ignore if: untestable with Karma */
	    if (this.props.target) {
	      if (!allowTransition) event.preventDefault();

	      return;
	    }

	    event.preventDefault();

	    if (allowTransition) {
	      var _props = this.props;
	      var state = _props.state;
	      var to = _props.to;
	      var query = _props.query;
	      var hash = _props.hash;

	      if (hash) to += hash;

	      this.context.history.pushState(state, to, query);
	    }
	  };

	  Link.prototype.render = function render() {
	    var _this = this;

	    var _props2 = this.props;
	    var to = _props2.to;
	    var query = _props2.query;
	    var hash = _props2.hash;
	    var state = _props2.state;
	    var activeClassName = _props2.activeClassName;
	    var activeStyle = _props2.activeStyle;
	    var onlyActiveOnIndex = _props2.onlyActiveOnIndex;

	    var props = _objectWithoutProperties(_props2, ['to', 'query', 'hash', 'state', 'activeClassName', 'activeStyle', 'onlyActiveOnIndex']);

	    // Manually override onClick.
	    props.onClick = function (e) {
	      return _this.handleClick(e);
	    };

	    // Ignore if rendered outside the context of history, simplifies unit testing.
	    var history = this.context.history;

	    if (history) {
	      props.href = history.createHref(to, query);

	      if (hash) props.href += hash;

	      if (activeClassName || activeStyle != null && !isEmptyObject(activeStyle)) {
	        if (history.isActive(to, query, onlyActiveOnIndex)) {
	          if (activeClassName) props.className += props.className === '' ? activeClassName : ' ' + activeClassName;

	          if (activeStyle) props.style = _extends({}, props.style, activeStyle);
	        }
	      }
	    }

	    return _react2['default'].createElement('a', props);
	  };

	  return Link;
	})(_react.Component);

	Link.contextTypes = {
	  history: object
	};

	Link.propTypes = {
	  to: string.isRequired,
	  query: object,
	  hash: string,
	  state: object,
	  activeStyle: object,
	  activeClassName: string,
	  onlyActiveOnIndex: bool.isRequired,
	  onClick: func
	};

	Link.defaultProps = {
	  onlyActiveOnIndex: false,
	  className: '',
	  style: {}
	};

	exports['default'] = Link;
	module.exports = exports['default'];

/***/ },
/* 109 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Link = __webpack_require__(108);

	var _Link2 = _interopRequireDefault(_Link);

	/**
	 * An <IndexLink> is used to link to an <IndexRoute>.
	 */

	var IndexLink = (function (_Component) {
	  _inherits(IndexLink, _Component);

	  function IndexLink() {
	    _classCallCheck(this, IndexLink);

	    _Component.apply(this, arguments);
	  }

	  IndexLink.prototype.render = function render() {
	    return _react2['default'].createElement(_Link2['default'], _extends({}, this.props, { onlyActiveOnIndex: true }));
	  };

	  return IndexLink;
	})(_react.Component);

	exports['default'] = IndexLink;
	module.exports = exports['default'];

/***/ },
/* 110 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _Redirect = __webpack_require__(111);

	var _Redirect2 = _interopRequireDefault(_Redirect);

	var _PropTypes = __webpack_require__(107);

	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * An <IndexRedirect> is used to redirect from an indexRoute.
	 */

	var IndexRedirect = (function (_Component) {
	  _inherits(IndexRedirect, _Component);

	  function IndexRedirect() {
	    _classCallCheck(this, IndexRedirect);

	    _Component.apply(this, arguments);
	  }

	  /* istanbul ignore next: sanity check */

	  IndexRedirect.prototype.render = function render() {
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<IndexRedirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };

	  return IndexRedirect;
	})(_react.Component);

	IndexRedirect.propTypes = {
	  to: string.isRequired,
	  query: object,
	  state: object,
	  onEnter: _PropTypes.falsy,
	  children: _PropTypes.falsy
	};

	IndexRedirect.createRouteFromReactElement = function (element, parentRoute) {
	  /* istanbul ignore else: sanity check */
	  if (parentRoute) {
	    parentRoute.indexRoute = _Redirect2['default'].createRouteFromReactElement(element);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'An <IndexRedirect> does not make sense at the root of your route config') : undefined;
	  }
	};

	exports['default'] = IndexRedirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 111 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _RouteUtils = __webpack_require__(93);

	var _PatternUtils = __webpack_require__(96);

	var _PropTypes = __webpack_require__(107);

	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var object = _React$PropTypes.object;

	/**
	 * A <Redirect> is used to declare another URL path a client should
	 * be sent to when they request a given URL.
	 *
	 * Redirects are placed alongside routes in the route configuration
	 * and are traversed in the same manner.
	 */

	var Redirect = (function (_Component) {
	  _inherits(Redirect, _Component);

	  function Redirect() {
	    _classCallCheck(this, Redirect);

	    _Component.apply(this, arguments);
	  }

	  /* istanbul ignore next: sanity check */

	  Redirect.prototype.render = function render() {
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<Redirect> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };

	  return Redirect;
	})(_react.Component);

	Redirect.createRouteFromReactElement = function (element) {
	  var route = _RouteUtils.createRouteFromReactElement(element);

	  if (route.from) route.path = route.from;

	  route.onEnter = function (nextState, replaceState) {
	    var location = nextState.location;
	    var params = nextState.params;

	    var pathname = undefined;
	    if (route.to.charAt(0) === '/') {
	      pathname = _PatternUtils.formatPattern(route.to, params);
	    } else if (!route.to) {
	      pathname = location.pathname;
	    } else {
	      var routeIndex = nextState.routes.indexOf(route);
	      var parentPattern = Redirect.getRoutePattern(nextState.routes, routeIndex - 1);
	      var pattern = parentPattern.replace(/\/*$/, '/') + route.to;
	      pathname = _PatternUtils.formatPattern(pattern, params);
	    }

	    replaceState(route.state || location.state, pathname, route.query || location.query);
	  };

	  return route;
	};

	Redirect.getRoutePattern = function (routes, routeIndex) {
	  var parentPattern = '';

	  for (var i = routeIndex; i >= 0; i--) {
	    var route = routes[i];
	    var pattern = route.path || '';
	    parentPattern = pattern.replace(/\/*$/, '/') + parentPattern;

	    if (pattern.indexOf('/') === 0) break;
	  }

	  return '/' + parentPattern;
	};

	Redirect.propTypes = {
	  path: string,
	  from: string, // Alias for path
	  to: string.isRequired,
	  query: object,
	  state: object,
	  onEnter: _PropTypes.falsy,
	  children: _PropTypes.falsy
	};

	exports['default'] = Redirect;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 112 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _RouteUtils = __webpack_require__(93);

	var _PropTypes = __webpack_require__(107);

	var func = _react2['default'].PropTypes.func;

	/**
	 * An <IndexRoute> is used to specify its parent's <Route indexRoute> in
	 * a JSX route config.
	 */

	var IndexRoute = (function (_Component) {
	  _inherits(IndexRoute, _Component);

	  function IndexRoute() {
	    _classCallCheck(this, IndexRoute);

	    _Component.apply(this, arguments);
	  }

	  /* istanbul ignore next: sanity check */

	  IndexRoute.prototype.render = function render() {
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<IndexRoute> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };

	  return IndexRoute;
	})(_react.Component);

	IndexRoute.propTypes = {
	  path: _PropTypes.falsy,
	  component: _PropTypes.component,
	  components: _PropTypes.components,
	  getComponent: func,
	  getComponents: func
	};

	IndexRoute.createRouteFromReactElement = function (element, parentRoute) {
	  /* istanbul ignore else: sanity check */
	  if (parentRoute) {
	    parentRoute.indexRoute = _RouteUtils.createRouteFromReactElement(element);
	  } else {
	    process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'An <IndexRoute> does not make sense at the root of your route config') : undefined;
	  }
	};

	exports['default'] = IndexRoute;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 113 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError('Cannot call a class as a function'); } }

	function _inherits(subClass, superClass) { if (typeof superClass !== 'function' && superClass !== null) { throw new TypeError('Super expression must either be null or a function, not ' + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _RouteUtils = __webpack_require__(93);

	var _PropTypes = __webpack_require__(107);

	var _React$PropTypes = _react2['default'].PropTypes;
	var string = _React$PropTypes.string;
	var func = _React$PropTypes.func;

	/**
	 * A <Route> is used to declare which components are rendered to the
	 * page when the URL matches a given pattern.
	 *
	 * Routes are arranged in a nested tree structure. When a new URL is
	 * requested, the tree is searched depth-first to find a route whose
	 * path matches the URL.  When one is found, all routes in the tree
	 * that lead to it are considered "active" and their components are
	 * rendered into the DOM, nested in the same order as in the tree.
	 */

	var Route = (function (_Component) {
	  _inherits(Route, _Component);

	  function Route() {
	    _classCallCheck(this, Route);

	    _Component.apply(this, arguments);
	  }

	  /* istanbul ignore next: sanity check */

	  Route.prototype.render = function render() {
	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, '<Route> elements are for router configuration only and should not be rendered') : _invariant2['default'](false) : undefined;
	  };

	  return Route;
	})(_react.Component);

	Route.createRouteFromReactElement = _RouteUtils.createRouteFromReactElement;

	Route.propTypes = {
	  path: string,
	  component: _PropTypes.component,
	  components: _PropTypes.components,
	  getComponent: func,
	  getComponents: func
	};

	exports['default'] = Route;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 114 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _PropTypes = __webpack_require__(107);

	/**
	 * A mixin that adds the "history" instance variable to components.
	 */
	var History = {

	  contextTypes: {
	    history: _PropTypes.history
	  },

	  componentWillMount: function componentWillMount() {
	    this.history = this.context.history;
	  }

	};

	exports['default'] = History;
	module.exports = exports['default'];

/***/ },
/* 115 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var object = _react2['default'].PropTypes.object;

	/**
	 * The Lifecycle mixin adds the routerWillLeave lifecycle method to a
	 * component that may be used to cancel a transition or prompt the user
	 * for confirmation.
	 *
	 * On standard transitions, routerWillLeave receives a single argument: the
	 * location we're transitioning to. To cancel the transition, return false.
	 * To prompt the user for confirmation, return a prompt message (string).
	 *
	 * During the beforeunload event (assuming you're using the useBeforeUnload
	 * history enhancer), routerWillLeave does not receive a location object
	 * because it isn't possible for us to know the location we're transitioning
	 * to. In this case routerWillLeave must return a prompt message to prevent
	 * the user from closing the window/tab.
	 */
	var Lifecycle = {

	  contextTypes: {
	    history: object.isRequired,
	    // Nested children receive the route as context, either
	    // set by the route component using the RouteContext mixin
	    // or by some other ancestor.
	    route: object
	  },

	  propTypes: {
	    // Route components receive the route object as a prop.
	    route: object
	  },

	  componentDidMount: function componentDidMount() {
	    !this.routerWillLeave ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'The Lifecycle mixin requires you to define a routerWillLeave method') : _invariant2['default'](false) : undefined;

	    var route = this.props.route || this.context.route;

	    !route ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'The Lifecycle mixin must be used on either a) a <Route component> or ' + 'b) a descendant of a <Route component> that uses the RouteContext mixin') : _invariant2['default'](false) : undefined;

	    this._unlistenBeforeLeavingRoute = this.context.history.listenBeforeLeavingRoute(route, this.routerWillLeave);
	  },

	  componentWillUnmount: function componentWillUnmount() {
	    if (this._unlistenBeforeLeavingRoute) this._unlistenBeforeLeavingRoute();
	  }

	};

	exports['default'] = Lifecycle;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 116 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _react = __webpack_require__(1);

	var _react2 = _interopRequireDefault(_react);

	var object = _react2['default'].PropTypes.object;

	/**
	 * The RouteContext mixin provides a convenient way for route
	 * components to set the route in context. This is needed for
	 * routes that render elements that want to use the Lifecycle
	 * mixin to prevent transitions.
	 */
	var RouteContext = {

	  propTypes: {
	    route: object.isRequired
	  },

	  childContextTypes: {
	    route: object.isRequired
	  },

	  getChildContext: function getChildContext() {
	    return {
	      route: this.props.route
	    };
	  }

	};

	exports['default'] = RouteContext;
	module.exports = exports['default'];

/***/ },
/* 117 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _historyLibCreateMemoryHistory = __webpack_require__(118);

	var _historyLibCreateMemoryHistory2 = _interopRequireDefault(_historyLibCreateMemoryHistory);

	var _historyLibUseBasename = __webpack_require__(119);

	var _historyLibUseBasename2 = _interopRequireDefault(_historyLibUseBasename);

	var _RouteUtils = __webpack_require__(93);

	var _useRoutes = __webpack_require__(97);

	var _useRoutes2 = _interopRequireDefault(_useRoutes);

	var createHistory = _useRoutes2['default'](_historyLibUseBasename2['default'](_historyLibCreateMemoryHistory2['default']));

	/**
	 * A high-level API to be used for server-side rendering.
	 *
	 * This function matches a location to a set of routes and calls
	 * callback(error, redirectLocation, renderProps) when finished.
	 *
	 * Note: You probably don't want to use this in a browser. Use
	 * the history.listen API instead.
	 */
	function match(_ref, callback) {
	  var routes = _ref.routes;
	  var location = _ref.location;
	  var parseQueryString = _ref.parseQueryString;
	  var stringifyQuery = _ref.stringifyQuery;
	  var basename = _ref.basename;

	  !location ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'match needs a location') : _invariant2['default'](false) : undefined;

	  var history = createHistory({
	    routes: _RouteUtils.createRoutes(routes),
	    parseQueryString: parseQueryString,
	    stringifyQuery: stringifyQuery,
	    basename: basename
	  });

	  // Allow match({ location: '/the/path', ... })
	  if (typeof location === 'string') location = history.createLocation(location);

	  history.match(location, function (error, redirectLocation, nextState) {
	    callback(error, redirectLocation, nextState && _extends({}, nextState, { history: history }));
	  });
	}

	exports['default'] = match;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 118 */
/***/ function(module, exports, __webpack_require__) {

	/* WEBPACK VAR INJECTION */(function(process) {'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	var _warning = __webpack_require__(75);

	var _warning2 = _interopRequireDefault(_warning);

	var _invariant = __webpack_require__(77);

	var _invariant2 = _interopRequireDefault(_invariant);

	var _Actions = __webpack_require__(78);

	var _createHistory = __webpack_require__(83);

	var _createHistory2 = _interopRequireDefault(_createHistory);

	var _parsePath = __webpack_require__(89);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	function createStateStorage(entries) {
	  return entries.filter(function (entry) {
	    return entry.state;
	  }).reduce(function (memo, entry) {
	    memo[entry.key] = entry.state;
	    return memo;
	  }, {});
	}

	function createMemoryHistory() {
	  var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];

	  if (Array.isArray(options)) {
	    options = { entries: options };
	  } else if (typeof options === 'string') {
	    options = { entries: [options] };
	  }

	  var history = _createHistory2['default'](_extends({}, options, {
	    getCurrentLocation: getCurrentLocation,
	    finishTransition: finishTransition,
	    saveState: saveState,
	    go: go
	  }));

	  var _options = options;
	  var entries = _options.entries;
	  var current = _options.current;

	  if (typeof entries === 'string') {
	    entries = [entries];
	  } else if (!Array.isArray(entries)) {
	    entries = ['/'];
	  }

	  entries = entries.map(function (entry) {
	    var key = history.createKey();

	    if (typeof entry === 'string') return { pathname: entry, key: key };

	    if (typeof entry === 'object' && entry) return _extends({}, entry, { key: key });

	     true ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Unable to create history entry from %s', entry) : _invariant2['default'](false) : undefined;
	  });

	  if (current == null) {
	    current = entries.length - 1;
	  } else {
	    !(current >= 0 && current < entries.length) ? process.env.NODE_ENV !== 'production' ? _invariant2['default'](false, 'Current index must be >= 0 and < %s, was %s', entries.length, current) : _invariant2['default'](false) : undefined;
	  }

	  var storage = createStateStorage(entries);

	  function saveState(key, state) {
	    storage[key] = state;
	  }

	  function readState(key) {
	    return storage[key];
	  }

	  function getCurrentLocation() {
	    var entry = entries[current];
	    var key = entry.key;
	    var basename = entry.basename;
	    var pathname = entry.pathname;
	    var search = entry.search;

	    var path = (basename || '') + pathname + (search || '');

	    var state = undefined;
	    if (key) {
	      state = readState(key);
	    } else {
	      state = null;
	      key = history.createKey();
	      entry.key = key;
	    }

	    var location = _parsePath2['default'](path);

	    return history.createLocation(_extends({}, location, { state: state }), undefined, key);
	  }

	  function canGo(n) {
	    var index = current + n;
	    return index >= 0 && index < entries.length;
	  }

	  function go(n) {
	    if (n) {
	      if (!canGo(n)) {
	        process.env.NODE_ENV !== 'production' ? _warning2['default'](false, 'Cannot go(%s) there is not enough history', n) : undefined;
	        return;
	      }

	      current += n;

	      var currentLocation = getCurrentLocation();

	      // change action to POP
	      history.transitionTo(_extends({}, currentLocation, { action: _Actions.POP }));
	    }
	  }

	  function finishTransition(location) {
	    switch (location.action) {
	      case _Actions.PUSH:
	        current += 1;

	        // if we are not on the top of stack
	        // remove rest and push new
	        if (current < entries.length) entries.splice(current);

	        entries.push(location);
	        saveState(location.key, location.state);
	        break;
	      case _Actions.REPLACE:
	        entries[current] = location;
	        saveState(location.key, location.state);
	        break;
	    }
	  }

	  return history;
	}

	exports['default'] = createMemoryHistory;
	module.exports = exports['default'];
	/* WEBPACK VAR INJECTION */}.call(exports, __webpack_require__(74)))

/***/ },
/* 119 */
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	exports.__esModule = true;

	var _extends = Object.assign || function (target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i]; for (var key in source) { if (Object.prototype.hasOwnProperty.call(source, key)) { target[key] = source[key]; } } } return target; };

	function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { 'default': obj }; }

	function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

	var _ExecutionEnvironment = __webpack_require__(79);

	var _runTransitionHook = __webpack_require__(91);

	var _runTransitionHook2 = _interopRequireDefault(_runTransitionHook);

	var _extractPath = __webpack_require__(90);

	var _extractPath2 = _interopRequireDefault(_extractPath);

	var _parsePath = __webpack_require__(89);

	var _parsePath2 = _interopRequireDefault(_parsePath);

	var _deprecate = __webpack_require__(92);

	var _deprecate2 = _interopRequireDefault(_deprecate);

	function useBasename(createHistory) {
	  return function () {
	    var options = arguments.length <= 0 || arguments[0] === undefined ? {} : arguments[0];
	    var basename = options.basename;

	    var historyOptions = _objectWithoutProperties(options, ['basename']);

	    var history = createHistory(historyOptions);

	    // Automatically use the value of <base href> in HTML
	    // documents as basename if it's not explicitly given.
	    if (basename == null && _ExecutionEnvironment.canUseDOM) {
	      var base = document.getElementsByTagName('base')[0];

	      if (base) basename = _extractPath2['default'](base.href);
	    }

	    function addBasename(location) {
	      if (basename && location.basename == null) {
	        if (location.pathname.indexOf(basename) === 0) {
	          location.pathname = location.pathname.substring(basename.length);
	          location.basename = basename;

	          if (location.pathname === '') location.pathname = '/';
	        } else {
	          location.basename = '';
	        }
	      }

	      return location;
	    }

	    function prependBasename(location) {
	      if (!basename) return location;

	      if (typeof location === 'string') location = _parsePath2['default'](location);

	      var pname = location.pathname;
	      var normalizedBasename = basename.slice(-1) === '/' ? basename : basename + '/';
	      var normalizedPathname = pname.charAt(0) === '/' ? pname.slice(1) : pname;
	      var pathname = normalizedBasename + normalizedPathname;

	      return _extends({}, location, {
	        pathname: pathname
	      });
	    }

	    // Override all read methods with basename-aware versions.
	    function listenBefore(hook) {
	      return history.listenBefore(function (location, callback) {
	        _runTransitionHook2['default'](hook, addBasename(location), callback);
	      });
	    }

	    function listen(listener) {
	      return history.listen(function (location) {
	        listener(addBasename(location));
	      });
	    }

	    // Override all write methods with basename-aware versions.
	    function push(location) {
	      history.push(prependBasename(location));
	    }

	    function replace(location) {
	      history.replace(prependBasename(location));
	    }

	    function createPath(location) {
	      return history.createPath(prependBasename(location));
	    }

	    function createHref(location) {
	      return history.createHref(prependBasename(location));
	    }

	    function createLocation() {
	      return addBasename(history.createLocation.apply(history, arguments));
	    }

	    // deprecated
	    function pushState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      push(_extends({ state: state }, path));
	    }

	    // deprecated
	    function replaceState(state, path) {
	      if (typeof path === 'string') path = _parsePath2['default'](path);

	      replace(_extends({ state: state }, path));
	    }

	    return _extends({}, history, {
	      listenBefore: listenBefore,
	      listen: listen,
	      push: push,
	      replace: replace,
	      createPath: createPath,
	      createHref: createHref,
	      createLocation: createLocation,

	      pushState: _deprecate2['default'](pushState, 'pushState is deprecated; use push instead'),
	      replaceState: _deprecate2['default'](replaceState, 'replaceState is deprecated; use replace instead')
	    });
	  };
	}

	exports['default'] = useBasename;
	module.exports = exports['default'];

/***/ }
/******/ ]);
