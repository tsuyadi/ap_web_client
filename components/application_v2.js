'use strict'

class Application extends React.Component {
    	constructor(props){
    		super(props);
    	}

    	state = {
          temp : [],
          spaj : []
    	}

      componentWillReceiveProps = (p) => {
        this.setState({
          temp: p.data.month_to_date.personal != null ? p.data.month_to_date.personal : {},
        });
      }

    	render(){
        if(this.state.temp)
        {
          let i = 0;
          for (let key in this.state.temp) {
            if (this.state.temp.hasOwnProperty(key)) {
              this.state.spaj[i] = { 'key':key, 'value':this.state.temp[key] }
              i++;
            }
          }
        }
        
    		return (
          <div className="col-xs-6 responsive3">
            <div className="content">
              <div className="title"><i className="fa fa-cogs"></i> Application (Month to Date)</div>
              <div className="entry">
                <div className="table-responsive">
                  <table className="table table-striped">
                    <tbody>
                      <tr>
                        <th>Status SPAJ</th>
                        <th>Total SPAJ</th>
                        <th></th>
                      </tr>
                    </tbody>
                    <tbody>
                      {
                        this.state.spaj.map(function(item) {
                          return (
                            <tr>
                              <td>{item.key.charAt(0).toUpperCase() + item.key.substr(1).toLowerCase()}</td>
                              <td>{item.value}</td>
                              <td><button type="button" className="btn btn-primary">View Details</button></td>
                            </tr>
                          );
                        })
                      }
                    </tbody>

                    {/*<tr>
                      <td>Submit</td>
                      <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#tablePopUp">View Details</button></td>
                    </tr>
                    <tr>
                      <td>Inforce</td>
                      <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#tablePopUp">View Details</button></td>
                    </tr>
                    <tr>
                      <td>Waiting for Data Entry</td>
                      <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#tablePopUp">View Details</button></td>
                    </tr>
                    <tr>
                      <td>Pending</td>
                      <td><button type="button" className="btn btn-primary" data-toggle="modal" data-target="#tablePopUp">View Details</button></td>
                    </tr>*/}
                  </table>
                </div>
              </div>
            </div>
          </div>
    		);
    	}
}

export default Application;