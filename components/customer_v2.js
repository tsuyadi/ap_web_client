'use strict'

class CustomerPolicyServicing extends React.Component {
    	constructor(props){
    		super(props);
    	}

    	state = {
    		  claim : 0,
          phs : 0,
    	}

      componentWillReceiveProps = (p) => {
          this.setState({
            claim: p.data.claim != null ? p.data.claim : 0,
            phs: p.data.phs != null ? p.data.phs : 0,
          });
      }

    	render(){
    		return (
            <div className="col-xs-6 responsive3">
              <div className="content">
                <div className="title"><i className="fa fa-users"></i> Customer (Month to Date)</div>
                <div className="entry">
                  <div className="table-responsive">
                    <table className="table table-striped">
                      <tr>
                        <th>Transaction</th>
                        <th>Status</th>
                        <th>Total Policy</th>
                        <th>Total SPAJ</th>
                      </tr>
                      <tr>
                        <td>Claim</td>
                        <td>Pending</td>
                        <td>0</td>
                        <td><button type="button" className="btn btn-primary">View Details</button></td>
                      </tr>
                      <tr>
                        <td>PHS</td>
                        <td>Pending </td>
                        <td>0</td>
                        <td><button type="button" className="btn btn-primary">View Details</button></td>
                      </tr>
                    </table>
                  </div>
                </div>
              </div>
            </div>
    		);
    	}
}

export default CustomerPolicyServicing;