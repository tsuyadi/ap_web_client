'use strict'

import React from 'react';
import api_route from '../../common_components/api_route';

class BannerDashboard extends React.Component {

	constructor(props)
	{
		super(props);
		this.state = {
			data : null
		}
	}

	componentWillReceiveProps = (props) => {
	}

	componentDidMount = () => {  
        $.ajax({
            url: api_route.banner,
            headers: {
                'Authorization': 'JWT ' + sessionStorage.getItem('token'),
                'Content-Type':'application/json',
                'Accept':'application/json'
            },
            type: 'GET',
            dataType: "json",
            data: {},
            success: (response) => {
                console.log(response);

                this.setState({
                    data : response,
                });
                console.log(this.state)
                $('#test_html').html(response.result);
            },
            error: (err, response) => {
                
                $('#loading').modal('hide');
                if(err.responseJSON){
                    alert('Session expired, please login');
                    window.location.href="/";
                    //window.location.href = window.location.href.split('#')[0] + '#/';
                }else{
                    alert('Please check your connection');
                }

            }
        });
    }

	render(){
        let banner_list = [];
        let banner_indicator = [];
        if(this.state.data != null && this.state.data.length > 0){
            this.state.data.map((value, index) => {
                if(index == 0){
                    banner_list.push(
                    <div className="item active" style={{height:'550px'}} key={index}>
                        <img className="img-responsive" src={api_route.baseAPI+value.image} alt={value.description} style={{display:'block', margin: 'auto', left:0, right:0, top:0, bottom:0, 'text-align': 'center',height: '550px', width:'100%'}}/>
                    </div>);
                    banner_indicator.push(
                        <li data-target="#carousel-example-generic" data-slide-to={index} class="active"></li>);
                }else{
                    banner_list.push(
                    <div className="item" style={{height:'550px'}} key={index}>
                        <img className="img-responsive" src={api_route.baseAPI+value.image} alt={value.description} style={{display:'block', margin: 'auto', left:0, right:0, top:0, bottom:0, 'text-align': 'center',height: '550px', width:'100%'}}/>
                    </div>);
                    banner_indicator.push(
                        <li data-target="#carousel-example-generic" data-slide-to={index}></li>);
                }
            });
        }
		return (
        <div className="content boxShadow" style={{background:'black',padding:'0px', 'border-radius':0}}>
            <div id="carousel-example-generic" className="carousel slide hidden-xs hidden-sm" data-ride="carousel">
                <ol className="carousel-indicators">
                    {banner_indicator}
                    {/* <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li> */}
                    {/* <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="3"></li> */}
                    {/* <li data-target="#carousel-example-generic" data-slide-to="4"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="5"></li> */}
                </ol>
                <div className="carousel-inner"  style={{padding:'0px',}}>
                    {banner_list}
                    {/* <div className="item active" style={{height:'550px'}}>
                        <img className="img-responsive" src="assets/images/banner/Flash Seat Japan.jpg" alt="" style={{display:'block', margin: 'auto', left:0, right:0, top:0, bottom:0, 'text-align': 'center',height: '550px', width:'100%'}}/>
                    </div>
                    <div className="item">
                        <img className="img-responsive" src="assets/images/banner/hsr.jpg" alt="" style={{display:'block', margin: 'auto', left:0, right:0, top:0, bottom:0, 'text-align': 'center',height: '550px', width:'100%'}}/>
                    </div> */}
                </div>
                <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                </a>
            </div>

            <div id="carousel-example-generic" className="carousel slide hidden-md hidden-lg" data-ride="carousel">
                <ol className="carousel-indicators">
                    {banner_indicator}
                    {/* <li data-target="#carousel-example-generic" data-slide-to="0" class="active"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="1"></li> */}
                    {/* <li data-target="#carousel-example-generic" data-slide-to="2"></li>
                    <li data-target="#carousel-example-generic" data-slide-to="3"></li> */}
                </ol>
                <div className="carousel-inner"  style={{padding:'0px', height: '200px'}}>
                    {banner_list}
                    {/* <div className="item active">
                        <img className="img-responsive" src="assets/images/banner/Flash Seat Japan.jpg" alt="" style={{display:'block', margin: 'auto', left:0, right:0, top:0, bottom:0, 'text-align': 'center'}}/>
                    </div>
                    <div className="item">
                        <img className="img-responsive" src="assets/images/banner/hsr.jpg" alt="" style={{display:'block', margin: 'auto', left:0, right:0, top:0, bottom:0, 'text-align': 'center'}}/>
                    </div> */}
                </div>
                <a className="left carousel-control" href="#carousel-example-generic" data-slide="prev">
                    <span className="glyphicon glyphicon-chevron-left"></span>
                </a>
                <a className="right carousel-control" href="#carousel-example-generic" data-slide="next">
                    <span className="glyphicon glyphicon-chevron-right"></span>
                </a>
            </div>
		</div>
		);
	}
}

export default BannerDashboard;