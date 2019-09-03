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
              <div className="panel panel-default">
                <div className="panel-heading">
                  Customer Policy Servicing (Month to Date)
                </div>
                <table className="table table-striped m-b-none">
                  <thead>
                    <tr>
                      <th>Transaction</th>
                      <th>Status</th>
                      <th>Total Policy</th>
                    </tr>
                  </thead>
                  <tbody>
                    <tr>
                      <td>Claim</td>
                      <td>Pending</td>
                      <td>
                        {this.state.claim}
                        <a className="btn btn-info" style={{float:'right'}}>View Details</a>
                      </td>
                    </tr>
                    <tr>
                      <td>PHS</td>
                      <td>Pending</td>
                      <td>
                        {this.state.phs}
                        <a className="btn btn-info" style={{float:'right'}}>View Details</a>
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
    		);
    	}
}

export default CustomerPolicyServicing;