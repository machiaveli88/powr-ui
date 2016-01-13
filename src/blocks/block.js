var React = require('react');
var {DragSource, DropTarget} = require('react-dnd');
var EmptyBlock = require("./empty/block-empty");
var interpolate = require("powr-utils/interpolate");

var Toolbar = require('./toolbar');

import ReactDOM from 'react-dom';
import DndPosition from './helpers/drag-drop-position';

if (BROWSER) {
   require('./styles/block.less');
}

var Component = React.createClass({
   propTypes: {
      // Blocks
      library: React.PropTypes.object,
      activeBlock: React.PropTypes.object,
      activateBlock: React.PropTypes.func,
      readOnly: React.PropTypes.bool,
      // DnD
      connectDropTarget: React.PropTypes.func
   },

   shouldComponentUpdate(newProps){
      if(!!newProps.readOnly === !this.props.readOnly){
         return true;
      }
      else if(!!newProps.isActive === !this.props.isActive){
         return true;
      }
      else if(newProps.block.type !== this.props.block.type){
         return true;
      }
      else if(newProps.block.size !== this.props.block.size){
         return true;
      }
      else if(newProps.dragHoverPosition !== this.props.dragHoverPosition){
         return true;
      }
      else if(newProps.dragHoverIndex !== this.props.dragHoverIndex){
         return true;
      }
      else if(!!newProps.isOver === !this.props.isOver){
         return true;
      }
      else if(JSON.stringify(newProps.block.value) !== JSON.stringify(this.props.block.value)){
         return true;
      }
      return false;
   },

   render: function () {
      const {
         index,
         user,
         block,
         library,
         isActive,
         readOnly,
         defaultSize,
         containers,
         dragHoverPosition,
         dragHoverIndex,
         // DnD
         isOver,
         connectDragSource,
         connectDropTarget,
         // Actions
         activateBlock,
         setBlockProperty
         } = this.props;

      const draggingOver = dragHoverIndex === index && isOver ? true : null;

      // Get Block Element
      var Editor = library.get(block.type) || EmptyBlock;

      const blockClasses = ['cryo-block'];
      if (isActive) {
         blockClasses.push('active-block');
      }
      var size = !block.size ? defaultSize : block.size;
      if (size <= 12) {
         var offset = 12 - size;
         blockClasses.push('col-lg-' + size);
         blockClasses.push('col-md-' + size);
         if (offset) {
            blockClasses.push('col-lg-offset-' + (offset / 2));
            blockClasses.push('col-md-offset-' + (offset / 2));
         }
      }
      var setToolbarProps = (props)=>{
         this.__toolbarProps = props;
      }

      // Compose final element
      var element = (
         <div onClick={(e)=>{activateBlock(block);e.stopPropagation();}} className={blockClasses.join(' ')}>
            {(!readOnly && !isActive) ? <a className="ui right corner label mini">&nbsp;</a> : null}
            {draggingOver ? <div className={'drag-preview drag-' + dragHoverPosition} /> : null}
            {isActive ? connectDragSource(<div><Toolbar {...this.props} additionalProps={this.__toolbarProps}/></div>) : null}
            <Editor ref={"block"} {...this.props} active={isActive} {...block.value} setToolbarProps={setToolbarProps}
                    update={(property, value)=>{setBlockProperty(block, {value: {[property]: value}})}}/>
         </div>
      );

      if (size <= 12 && containers) {
         var offset = 12 - size;
         blockClasses.push('col-lg-' + size);
         if (offset) {
            blockClasses.push('col-lg-offset-' + (offset / 2));
         }

         element = (
            <div className="container block-container" onClick={()=>activateBlock(null)}>
               <div className="bs-row">
                  {element}
               </div>
            </div>
         );
      }
      else {
         element = (
            <div className="block-container" onClick={()=>activateBlock(null)}>
               {element}
            </div>
         );
      }

      if (isActive || readOnly) {
         return element;
      }
      return connectDropTarget(connectDragSource(element));
   }
});

var drop = {
   events: {
      drop: function (props, monitor) {
         // Ignore shallow
         if (!monitor.isOver({shallow: true})) {
            return;
         }
         return props.dropBlockHandler(props, monitor);
      },
      hover(props, monitor, component) {
         // Ignore shallow
         if (!monitor.isOver({shallow: true})) {
            return;
         }

         const {setDragPreview, library} = props;
         var original = monitor.getItem();

         if (original.block && props.block && original.block.id === props.block.id) {
            return;
         }

         const ownIndex = typeof props.index === "function" ? props.index() : props.index;
         const allowBlocks = (library.get(props.block.type) || EmptyBlock).allowBlocks;

         return setDragPreview('hover', ownIndex, DndPosition(props, monitor, component, allowBlocks));
      }
   },
   connect: function (connect, monitor) {
      return {
         connectDropTarget: connect.dropTarget(),
         isOver: monitor.isOver({shallow: true})
      }
   }
};

var drag = {
   events: {
      beginDrag(props) {
         return props;
      }
   },
   connect: function (connect, monitor) {
      return {
         connectDragSource: connect.dragSource(),
         connectDragPreview: connect.dragPreview()
      }
   }
};

export default DragSource("blocks-block", drag.events, drag.connect)(
   DropTarget("blocks-block", drop.events, drop.connect)(Component)
);
