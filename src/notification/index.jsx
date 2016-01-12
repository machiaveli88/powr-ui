import React, {Component, PropTypes} from "react";
import ReactCSSTransitionGroup from 'react-addons-css-transition-group';

var NotificationItem = require('./notification-item');
import List from "powr-utils/array/list";
var ShortId = require('shortid');

if(BROWSER){
   require("./notification.less");
}

export default class Notification extends Component {
   static propTypes = {
      children: PropTypes.element
   }
   static contextTypes = {
      actions: PropTypes.object.isRequired
   }
   constructor(){
      super();
      this.state = {
         notifications: []
      }
   }
   componentDidMount(){
      window.addNotification = function(notification){
         var state = this.state;
         const newData = state.notifications.slice();
         if (!notification.id) {
            notification.id = ShortId.generate();
         }
         newData.push(notification);
         this.setState({
            notifications: newData
         });
      }.bind(this);
      window.removeNotification = function(notification){
         var state = this.state;
         const newData = List.removeItemById(state.notifications.slice(), notification.id);
         this.setState({
            notifications: newData
         });
      }.bind(this);
   }

   shouldComponentUpdate(props, state){
      if(this.state.notifications.length !== state.notifications.length){
         return true;
      }
      return false;
   }

   removeNotification(notification){
      window.removeNotification(notification);
   }

   render() {
      const { notifications } = this.state;

      const n = notifications.map((notification)=>{
         return (
            <NotificationItem
               key={notification.id}
               onRemove={this.removeNotification.bind(this)}
               {...notification}
            />
         );
      });

      return (
         <div className="notifications-wrapper">
            <div className="notifications-br">
               <ReactCSSTransitionGroup transitionName="anim-slide-left-right" transitionEnterTimeout={500} transitionLeaveTimeout={300}>
                  {n}
               </ReactCSSTransitionGroup>
            </div>
         </div>
      );
   }
}

