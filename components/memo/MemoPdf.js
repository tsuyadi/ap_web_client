
import {TYPE} from '../../common_components/helper/constant';
import api_route from '../../common_components/api_route';
import {loadLink, load, actionDelete} from '../../common_components/helper/url_helper';

class MemoPdf extends React.Component {

    constructor(props){
        super(props);
        
        this.state = {
            category_id : props.cat_id,
            type : props.type,
            src : props.src,

        }

    }

    componentDidMount(){
        
    }

    componentWillReceiveProps(props){
        this.setState({
            category_id : props.cat_id,
            type : props.type,
            src : props.src,
        });
    }


    render(){
        
        let pdf = [];
        console.log(this.state.src);
        pdf.push(<iframe key={this.state.src}  src ={this.state.src} width='90%' height="1000px" allowfullscreen webkitallowfullscreen style={{display:'block', margin: 'auto', left:0, right:0, top:0, bottom:0, 'text-align': 'center'}}></iframe>);
        if(this.state.src == api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/ProductSummary.pdf"){
            pdf.push(<iframe key={api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/RiderSummary.pdf"}  src ={api_route.baseOnly + "assets/ViewerJS/#"+ api_route.baseOnly + "assets/file/RiderSummary.pdf"} width='90%' height="1000px" allowfullscreen webkitallowfullscreen style={{display:'block', margin: 'auto', left:0, right:0, top:'15px', bottom:0, 'text-align': 'center',}}></iframe>);

        }
        return (
            <div className="panel-body boxShadow">
                <div className="row loadresult">
                    <div className="col-xs-12">                        
                        {pdf}
                    </div>
                </div>
            </div>
        );
    }

}

export default MemoPdf;