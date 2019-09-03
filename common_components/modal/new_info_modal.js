"use strict"

import React from 'react';

/*
    Author  : Nasrul A Gifari
    Date    : 23 Sep 2016
    Param   : 
        1. id
        2. title
        3. message
 */

class NewInfoModal extends React.Component {

    constructor()
    {
        super();
        this.close = this.close.bind(this);
    }

    componentDidMount(){
        $('body').css('padding-right', '0px');
    }

    close(){
        $('body').css('padding-right', '0px');
    }

    render()
    {
        let dialogClassname = 'modal-dialog info-modal';
        let dialogLabel = 'info-modalLabel';
        return(
            <div className="modal fade" id="info-modal" tabIndex="-1" role="dialog" aria-labelledby={dialogLabel} aria-hidden="true">
			  <div className={dialogClassname} style={{height:'auto', width :'1000px'}}>
				<div className="modal-content  zero-padding" style={{'padding':'5px', width: '1000px'}}>
                    <button type="button" className="close" data-dismiss="modal" style={{width:'30px'}} onClick={this.close}>&times;</button>
                    <div className="modal-header" style={{height: '70px', paddingTop:'10px'}}>  
                        
                        <h1 className="info-modal-link animated infinite flash"  data-toggle="modal" style={{color:'red', marginTop:'5px'}}>
							{/*{/*<img style={{'width':'80%'}} src="assets/img/i.JPG" alt="i"/>*/}
							Info
						</h1>
                    </div>
                    {/*<div className="modal-body">
                        <div id="infoModalDiv" className="text-left">
                            <img src="assets/images/password_info.png" alt="new_info" style={{width:'100%'}}/>
                        </div>
                    </div>
                    <hr style={{margin:'0px', size: '200'}}/>*/}
					<div className="modal-body">
                        <div id="infoModalDiv" className="text-left" style={{display:'none'}}>
                        <p style={{fontSize:'18px',padding:'10px 10px 10px 20px',color: 'black',fontWeight: 600}}>
                        Atas nama seluruh manajemen dan karyawan PT Tokio Marine Life Insurance Indonesia, kami turut prihatin terhadap peristiwa bencana alam yang baru terjadi di Palu, Donggala, dan sekitarnya. Kami menghimbau serta mengajak seluruh agen agar dapat berpartisipasi untuk menghubungi para Nasabahnya yang berlokasi di daerah bencana.
                        </p> 
                        <p style={{fontSize:'18px',padding:'10px 10px 10px 20px',color: 'black',fontWeight: 600}}>
                        Sebagai ungkapan rasa simpati kami kepada para Nasabah, mulai tanggal 3-5 Oktober 2018, kami dari kantor pusat akan menghubungi langsung melalui telepon untuk Nasabah yang berlokasi di Sulawesi Tengah serta mengirimkan SMS kepada para Nasabah yang berlokasi di Sulawesi.
                        </p> 

                            {/* <img src="assets/images/tm_conn2.png" alt="new_info" style={{width:'100%'}}/> */}
                        </div>
                    </div>
                    <hr style={{margin:'0px', size: '100', display:'none'}}/>
					<div className="modal-body">
                        <div id="infoModalDiv" className="text-left">
                        <p style={{fontSize:'18px',padding:'10px 10px 10px 20px',color: 'black',fontWeight: 600}}>
                            <b style={{color:'red'}}>Untuk Pengguna aplikasi TMConnect :</b><br />
                            <ul style={{fontSize:'18px',padding:'0px 30px 10px 50px',color: 'black',fontWeight: 600}}> 
                                <li><b style={{color:'red'}}>Per 1 Juli 2019</b>, Aplikasi  TM Connect Web sudah tidak bisa digunakan, yang berlaku hanya Aplikasi TM Connect Client.</li>
                                <li>Minimum IOS untuk dapat menggunakan aplikasi TMConnect Client (iPad) adalah IOS versi 10.3.3 dan maximum IOS untuk dapat menggunakan aplikasi TMConnect Client (iPad) adalah IOS versi 12.1.3</li>
                                <li> Mohon untuk tidak melakukan upgrade IOS di device Anda yang terinstall aplikasi TMConnect Client sampai ada pemberitahuan resmi dari TMLI.</li>
                            </ul>
                        </p> 
                        <p style={{fontSize:'18px',padding:'10px 10px 10px 20px',color: 'black',fontWeight: 600}}><b style={{color:'red'}}>AMS Android</b> sudah dapat didownload melalui Play Store dan <b style={{color:'red'}}>AMS iOs</b> sudah dapat
didownload melalui Apple Store dengan nama Activity Management System. Download User Guide
nya pada menu E-Library Agency Portal.</p> 

                            {/* <img src="assets/images/tm_conn2.png" alt="new_info" style={{width:'100%'}}/> */}
                        </div>
                    </div>
                    {/* <hr style={{margin:'0px', size: '100'}}/> */}
                   <div className="modal-header" style={{height: '70px', paddingTop:'10px', display:'none'}}>  
                        <h1 className="info-modal-link animated infinite flash"  data-toggle="modal" style={{color:'red', marginTop:'3px'}}>
							{/*{/*<img style={{'width':'80%'}} src="assets/img/i.JPG" alt="i"/>*/}
							Kabar Gembira !
						</h1>
                    </div>
					<div className="modal-body" style={{display:'none'}}>
                        <div id="infoModalDiv" className="text-left">
                            <ol style={{color:'red', textIndent:'15px', fontWeight:600, fontSize:'18px',margin:'10px 10px 10px 20px'}}>
                                <li style={{color:'black', marginBottom:'25px'}}><p><b style={{color:'red', paddingLeft:'15px'}}>BEBAS BIAYA</b> - <b style={{color:'#0096A9'}}>Efektif tanggal 7 May 2018</b>, TMLI sudah menghapuskan biaya kartu kredit <b  style={{color:'#0096A9'}}>untuk semua produk kecuali Produk TM Link Wealth Enchancement dan Pembayaran Top Up Tunggal</b> (ad-hoc/single top-up).</p></li>
                                <li style={{color:'black', marginBottom:'25px'}}><p><b style={{color:'red', paddingLeft:'15px'}}>DOKU</b> - TMLI bekerjasama dengan Doku (<i>Payment Agregator</i>), menyediakan tambahan layanan pembayaran bagi para nasabah yang ingin membayarkan premi lanjutan dengan menggunakan Kartu Kredit secara <i>on-line</i>.<br />Nasabah cukup meng-klik <i>link</i> (tautan) yang dikirimkan melalui SMS atau email billing.</p></li>
                               
                            </ol>  
							{/* <img src="assets/images/new_info2.jpg" alt="new_info2" style={{width:'100%'}}/> */}
                        </div>
                    </div>
				</div>
			  </div>
			</div>
        );
    }

}

export default NewInfoModal;