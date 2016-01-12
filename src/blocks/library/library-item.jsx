import React, {Component, PropTypes} from 'react';
var {DragSource} = require('react-dnd');

class BlockLibraryItem extends Component{
   constructor(){
      super();
      this.state = {
         images: false
      }
   }
   render() {
      const { connectDragSource, block } = this.props;
      const { images } = this.state;

      let style = {
         position: "relative",
         display: "block",
         width: "100%",
         marginBottom: "20px"
      };

      var icons = block.icon && Array.isArray(block.icon)
         ? block.icon.map(item=><i key={item} className={"icon " + (item || "")} style={{marginLeft:"8px"}}></i>)
         : <i className={"icon " + (block.icon || "")}></i>;

      return connectDragSource(
         <div className="item" style={{cursor: "move"}}>
            {icons}
            <div className="content">
               <div className="header">{block.title}</div>
               <div className="description">{block.category}</div>
            </div>
         </div>
      );
   }
}

var drag = {
   events: {
      beginDrag(props) {
         return {
            fromToolbar: true,
            block: {
               type: props.blockName,
               data: props.collection ? {
                  collection: props.collection,
                  mappings: props.mappings
               } : null
            }
         };
      }
   },
   connect: function (connect, monitor) {
      return {
         connectDragSource: connect.dragSource()
      }
   }
};

export default DragSource("blocks-block", drag.events, drag.connect)(BlockLibraryItem);
