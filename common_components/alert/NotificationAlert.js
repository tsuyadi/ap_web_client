'use strict'
import api_route from '../../common_components/api_route';
import NotifModal from '../../common_components/modal/notif_modal';

class NotificationAlert extends React.Component {

    constructor(){
        super();
        this.state = {
			data: null,
            isi: null
        }
        this.close = this.close.bind(this);
        $('body').css('padding-right', '0px');
    }

    componentDidMount(){
        var closed = localStorage.getItem('notifClosed');
            //$('#notif-maintenance').addClass('animated bounceInDown');

        $('#loading').modal('show');
		$.ajax({
            url: api_route.notification,
            headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
            type: 'GET',
            success: (response) => {
                $('.header-wrapper').css('top', '50px');
				$('#loading').modal('hide');
				this.setState({data:response});
                if(response.length == 0){
                    $('.header-wrapper').css('top', '0px');
                    $('#runningText').remove();
                }
			  
            },
            error: (err, response) => {
              $('#loading').modal('hide');
               $('.header-wrapper').css('top', '0px');
                $('#runningText').remove();
              if(err.responseJSON){
              	window.location.href = window.location.href.split('#')[0] + '#/';
              }
            }
        });

    }

    close(){

       // $('#notif-maintenance').addClass('animated fadeOutUp');
        $('.header-wrapper').css('top', '0px');
        $('body').css('margin-top', '70px')
        localStorage.setItem('notifClosed', 'true');

    }

    tampil(isi) {
         this.state = {
             isi: isi
         }
        //  console.log("konten" + isi);
        //  localStorage.setItem('isi', isi);
        //  $("#modalnotif").attr('data', isi);
    }
    
    render(){
        var divNotif = [];
        var row = null;
        var data = null;
        var isi, judul;
        if(this.state.data || this.state.data != []){
            data = this.state.data;
            $.map(data, (value, index) => {
                judul = value.title;
                if(index+1 < data.length){
                    judul = judul.concat(' ||');
                }
                isi = value.content;
                row = <a style={{textAlign:'left', marginRight:'10', fontSize: '18', fontWeight: 'bold', color:'white'}} data-toggle='modal' data-target='#notif-modal' onClick={this.tampil.bind(this, isi)}  data-id={isi}>{judul}</a>
                divNotif.push(row);
            });
        }
        return (
            <div id="runningText" style={{paddingBottom:'50px'}}>
                <div id="notif-maintenance" className="alert text-center" style={{height:'50px'}}>
                    <marquee scrolldelay="100">{divNotif}</marquee>
                </div>
                <NotifModal/>
                {/*<NotifModal data={localStorage.getItem('isi')} id="modalnotif" />*/}
            </div>
        );
    }

}


export default NotificationAlert;