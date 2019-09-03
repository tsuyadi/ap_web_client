
export function PasswordValidation(password){

    //var regEx = /^(?=.*[A-Za-z])(?=.*\d)(?=.*[$@$!%*#?&])[A-Za-z\d$@$!%*#?&]{8,}$/;
    var regEx = /^(?=.*[a-zA-Z0-9-_\.])(?=.*[$@$!%*#?&])[A-Za-z0-9-_\.$@$!%*#?&]{10,}$/;

    if(!regEx.exec(password)){
        alert("Please use at least 10 alphanumeric character with symbol");
        return false;
    }
    return true;

}

export function FileTypeValidation(text){
    var re = /(\.pdf)$/i;
    var rePPT = /(\.ppt)$/i;
    var rePPTX = /(\.pptx)$/i;
    if(!re.exec(text) && !rePPT.exec(text) && !rePPTX.exec(text))
    {
        alert("File type is not supported!");
        return false;
    }
    return true;
}

export class MandatoryValidation extends React.Component {
    constructor(){
        super();
    }

    render(){
        
        let parameter = this.props.parameter;
        let variable = this.props.variable;
        let customLabel = this.props.customLabel;

        let label = '';
        if(customLabel == ''){
            label = variable;
        }else{
            label = customLabel;
        }
        
        if(parameter[variable] != ''){
            return <div className="row"></div>;
        }else{
            return (
                <div className="row">
                    <div className="col-xs-12">
                        <p className="text-danger"><i className="fa fa-exclamation-circle"></i> {label} are Mandatory</p>
                    </div>
                </div>
            );
        }

    }
}
