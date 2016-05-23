var React = require('react');
var ReactDOM = require('react-dom');

var Content = React.createClass({
  render: function() {
    return (
      <div>
        <b>Congratulations whats going on dfasdfsadfsd</b>, you are now ready to implement your client
      </div>
    );
  }
});

ReactDOM.render(<Content />, document.getElementById('content'));
