
import React from 'react';

export class DatePicker extends React.Component {
  componentDidMount() {
    $(this.refs.input).datepicker({
        dateFormat: 'dd-mm-yy'
    });
  }

  componentWillUnmount() {
    $(this.refs.input).datepicker('destroy');
  }

  render() {
    const props = this.props;
    return <input ref="input" type="text" {...props} />
  }
}