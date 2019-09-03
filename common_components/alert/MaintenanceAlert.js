'use strict'

class MaintenanceAlert extends React.Component {

    constructor(){
        super();

        this.close = this.close.bind(this);
    }

    componentDidMount(){

        // // debugger;

        var closed = localStorage.getItem('notifClosed');
        
        if(closed == "false"){
            $('.header-wrapper').css('top', '50px');
            //$('body').css('margin-top', '125px');
            $('#notif-maintenance').addClass('animated bounceInDown');
        }else{
            $('#notif-maintenance').hide();
            $('#main-notif').css('margin-bottom', '0px');
        }

    }

    close(){

        $('#notif-maintenance').addClass('animated fadeOutUp');
        $('.header-wrapper').css('top', '0px');
        $('body').css('margin-top', '80px');
        localStorage.setItem('notifClosed', 'true');
        $('#main-notif').css('margin-bottom', '0px');
    }

    render(){
        return (
            <div style={{marginBottom:'50px', display:'none'}} id="main-notif">
            <div id="notif-maintenance" className="alert alert-danger alert-dismissible text-center">
                <button type="button" className="close" aria-label="Close" onClick={this.close}>
                    <span aria-hidden="true">&times;</span>
                </button>  
                    {/* <p className="animatednotice infinite flash">Segera ubah password Anda menjadi 10 digit sebelum <u>12 Aug 2018</u></p> */}
                    <p className="animatednotice infinite flash">Agency Portal will be Under Maintenance on  <b><u>10 April 2019 10:00 pm</u></b> until <b><u>11 April 2019 12:00 pm</u></b></p>
            </div>
            </div>
        );
    }

}


export default MaintenanceAlert;