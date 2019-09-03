'use strict'

/*import $ from 'jQuery';  
import api_route from '../../common_components/api_route';

function refreshToken(){
    $.ajax({
            beforeSend: function(xhrObj){
                xhrObj.setRequestHeader('Content-Type','application/json');
                xhrObj.setRequestHeader('Accept','application/json');
            },
            url: api_route.refreshToken,
            data: {'token':sessionStorage.getItem('token')},
            dataType: 'json',
            contentType: 'application/json',
            type: 'POST',
            success: (response) => {
              if(response.status == 'OK')
              {
                sessionStorage.setItem('token', response.token);
                localStorage.setItem('tokenLastActivity', Date.now());
                console.log(response);
              }
              else
              {
                console.log(response);
              }
            },
            error: (err, response) => {
              if(err.responseJSON){
                console.log(response);
              }
              
            }
        });
}


// for dev only

function relogin(){
        let formData = new FormData();
        formData.append('username', 'devtest');
        formData.append('password', 'devtest');
        $.ajax({
            url: api_route.authToken,
            data: formData,
            processData: false,
            contentType: false,
            type: 'POST',
            success: (response) => {
              if(response.status == 'OK')
              {
                sessionStorage.setItem('token', response.token);
                localStorage.setItem('tokenLastActivity', Date.now());
              }
              else
              {
                this.setState({status: response.status});
              }
            },
            error: (err, response) => {
              if(err.responseJSON){
                this.setState({status: err.responseJSON.status});   
              }
              
            }
        });
}
*/


export default function CekAuth() {
        if(!sessionStorage.getItem('token'))
        {
        //if no token then redirect to login page
          window.location.href = window.location.href.split('#')[0] + '#/';
        }
        else
        {
        /*=========================================================
        / Todo cek time diff to update token expiry or delete token
        /========================================================*/	
        //update tokenLastActivity
        //refreshToken(); 
        //relogin();
          localStorage.setItem('tokenLastActivity', Date.now());
        }
    }