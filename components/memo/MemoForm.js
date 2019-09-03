
import {DatePicker} from '../../common_components/date_picker';

import {MandatoryValidation, FileTypeValidation} from '../../common_components/helper/validation';

import api_route from '../../common_components/api_route';

import Loading from '../../common_components/loading';

class MemoForm extends React.Component {

    constructor(p){
        super(p);
        this.state = {
            param : {
                type : p.type,
                department_category : p.cat_id,
                name : '',
                filename : '',
                effective_date_start : '',
                effective_date_end : ''
            },
            cat_id : p.cat_id,
            type : p.type            
        }

        this.changeHandler = this.changeHandler.bind(this);
        this.submitUpload = this.submitUpload.bind(this);
    }

    changeHandler(event){
		
		let data_array = {};
		for (let i in this.state.param) {
			if(i==event.target.name){
				if(event.target.name == "filename"){
					if(FileTypeValidation(event.target.value)){
						data_array[i] = event.target.value
					}else{
						event.target.value = '';
						data_array[i] = '';
					}
				}else{
					data_array[i] = event.target.value
				}
			}
			else{
				data_array[i] = this.state.param[i]
			}
		}
		this.setState({
			param : data_array
		});

	}

    submitUpload(){

        let effective_date_start = $('[name=effective_date_start]').val();
		let effective_date_end = $('[name=effective_date_end]').val();

		effective_date_start = this.state.param.effective_date_start = effective_date_start.split("-").reverse().join("-");
		effective_date_end = this.state.param.effective_date_end = effective_date_end.split("-").reverse().join("-");

        $('#loading').modal('show');

		var formData = new FormData($('#formupload')[0]);
        formData.append('type', this.state.param.type);
		formData.append('department_category', this.state.param.department_category);
		formData.append('effective_date_start', effective_date_start);
		formData.append('effective_date_end', effective_date_end);

		$.ajax({
			headers: {
		        'Authorization':'JWT '+sessionStorage.getItem('token')
		    },
			url: api_route.memo_upload_action,
			data : formData,
			type : 'POST',
			processData: false,
			contentType: false,
			success : (response, e) => {
				$('#loading').modal('hide');
				alert("File are sucessfully uploaded !");
                $('[name=effective_date_start]').val('');
		        $('[name=effective_date_end]').val('');
		        $('[name=name]').val('');
		        $('[name=filename]').val('');
				this.setState({
                    param : {
                        type : this.state.type,
                        department_category : this.state.cat_id,
                        name : '',
                        filename : '',
                        effective_date_start : '',
                        effective_date_end : ''
                    }
                });
			},
			error : (error) => {
				$('#loading').modal('hide');
				if(error.responseJSON){
					alert("Something wrong happened");					
				}
			}
		});

    }

    render(){
        return (
            <div className="panel-body boxShadow">
                <div className="col-xs-12">
                    <div className="row">
                        <div className="col-xs-12">
                            <form className="form-horizontal" id="formupload">                                
                                <div className="form-group">
                                    <label className="col-sm-4">Name of Document</label>
                                    <div className="col-sm-8">
                                        <input type="text" className="form-control" name="name" id="name" onChange={this.changeHandler} />
                                    </div>
                                </div>
                                <div className="form-group">
                                    <label className="col-sm-4">File <span>( *.pdf, *.ppt, *.pptx )</span></label>
                                    <div className="col-sm-8">
                                        <input type="file" className="form-control" name="filename" id="filename" onChange={this.changeHandler} />
                                        <label style={{color:'red'}}>*Format nama file yang akan diupload harus tanpa spasi<br />
Contoh nama file : FormPeserta2019
</label>
                                    </div>
                                </div>
                            </form>
                        </div>
                        <div className="col-xs-12">
                            <form className="form-horizontal">
                                
                                <div className="form-group">
                                    <label className="col-sm-4">Effective Date</label>
                                    <div className="col-sm-8">
                                        <div className="row">
                                            <div className="col-sm-6" style={{'margin-bottom':'10px'}}><DatePicker className="form-control" id="effective_date_start" name="effective_date_start" placeholder="from" /></div>
                                            <div className="col-sm-6"><DatePicker className="form-control" id="effective_date_end" name="effective_date_end" placeholder="to" /></div>
                                        </div>	
                                    </div>
                                </div>

                            </form>
                        </div>
                        <div className="col-xs-12">
                            <div className="row">                                
                                <div className="col-xs-offset-8 col-xs-4 col-sm-offset-10 col-sm-2">
                                    <button className="btn btn-primary btn-block" type="button" onClick={this.submitUpload}>Upload</button>
                                </div>
                            </div>
                        </div>
                    </div>
                    
                </div>  
                <Loading />             
            </div>
        );
    }

}

export default MemoForm;