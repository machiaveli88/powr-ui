var React = require('react');
import ReactModal2 from 'react-modal2';
var Media = require('./modal/modal-media');

if(BROWSER){
   require('./image.less');
}

module.exports = React.createClass({
   render: function () {
      var {modal} = this.state;
      var {value, active, updateValue, comment, children} = this.props;

      return (
         <Media {...this.props} />
      );
   }
});
