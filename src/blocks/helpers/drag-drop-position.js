import ReactDOM from 'react-dom';

export default function(props, monitor, component, allowEastWest){
   const boundingRect = ReactDOM.findDOMNode(component).getBoundingClientRect();
   const clientOffset = monitor.getClientOffset();
   const ownMiddleY = (boundingRect.bottom - boundingRect.top) / 2;
   const ownMiddleX = (boundingRect.right - boundingRect.left) / 2;
   const offsetY = clientOffset.y - boundingRect.top;
   const offsetX = clientOffset.x - boundingRect.left;
   var position = '';

   if(allowEastWest){
      if (offsetX / ownMiddleX < 0.75 || offsetX / ownMiddleX > 1.25) {
         position = offsetX < ownMiddleX ? 'w' : 'e';
         if (offsetX / ownMiddleX < 0.25 || offsetX / ownMiddleX > 1.75) {
            position += offsetX < ownMiddleX ? 'w' : 'e';
         }
      }
   }

   if (offsetY < ownMiddleY) {
      return 'n' + position;
   }
   if (offsetY > ownMiddleY) {
      return 's' + position;
   }
   return null;
}
