var React = require('react');
var ReactDOM = require('react-dom');
//var NewModal = require('./modal/modal');
import ReactModal2 from 'react-modal2';

if(BROWSER){
   require('./image.less');
}

module.exports = React.createClass({
   getInitialState: function () {
      return {modal: false}
   },
   getDefaultProps: function() {
      return {
         imageWidth: 12,
         context: "default",
         round: false,
         innerBorder: false,
         comment: null,
         value: {url: '/img/fakeimg/920x300.png', width: 920, height: 300},
         hoverBackground: false,
         showModal: ()=>{}
      };
   },
   componentDidMount(){
      $(ReactDOM.findDOMNode(this)).dimmer({
         on: 'hover'
      });
   },
   showModal: function(){
      this.setState({modal: true});
   },
   closeModal: function(value){
      var {updateValue} = this.props;
      //updateValue(null);
      this.setState({modal: false});
      updateValue(value);
   },
   render: function () {
      var {modal} = this.state;
      var {value, active, updateValue, comment, children, uploader} = this.props;
      let _modal = null;
      if(modal){
         //_modal = <NewModal {...this.props} save={this.closeModal} close={()=>this.setState({modal:false})}/>;
      }

      //console.log(value);
      return (
         <div className="blurring dimmable image" style={{width: '100%', height:'auto'}}>
            <div className="ui dimmer">
               <div className="content">
                  <div className="center">
                     <div className="ui inverted button" onClick={this.showModal}>Bild wählen</div>
                  </div>
               </div>
            </div>
            <img src={value.url} width="100%" height="auto" />
            {modal && uploader ?
               <ReactModal2
                  onClose={()=>this.setState({modal:false})}
                  closeOnEsc={true}
                  closeOnBackdropClick={true}
                  backdropClassName='ui dimmer modals page transition visible active'
                  modalClassName='ui small test modal transition visible scrolling'>
                  {uploader}
               </ReactModal2> : null
            }
         </div>
      );
   }
});
