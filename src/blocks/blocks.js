import React, {Component, PropTypes} from 'react';
import {DropTarget} from 'react-dnd';
import Block from './block';

if(BROWSER){
   require('./styles/blocks.less');
}

class BlockList extends Component{
   static defaultProps = {
      blocks: []
   }
   static propTypes = {
      // Blocks
      // page: React.PropTypes.object,
      updateValue: React.PropTypes.func,
      sourceObject: React.PropTypes.object,
      blocks: React.PropTypes.array,
      edits: React.PropTypes.object,
      readOnly: React.PropTypes.bool,
      // DnD
      isOver: React.PropTypes.bool,
      connectDropTarget: React.PropTypes.func
   }

   constructor(){
      super();
      this.state = {
         activeBlock: null
      };
   }

   render() {
      const {isOver, connectDropTarget, readOnly, blocks, activeBlock, dragHoverIndex, embedded} = this.props;
      let _blocks = (blocks||[]).map((block, index) => {
         const isActive = !readOnly && activeBlock && activeBlock.id === block.id;
         return (
            <Block {...this.props}
               block={block}
               index={index}
               key={block.id}
               isActive={isActive}/>
         );
      });
      if(_blocks.length === 0){
         _blocks = readOnly ? null : <p key="null-block" className="blocks-empty">Blöcke hierher ziehen</p>;
      }

      var classNames = ['block-list'];
      if(embedded){
         classNames.push('block-list-embedded')
      }
      else {
         classNames.push('block-list-root')
      }
      let dragOverElement = null;
      if(dragHoverIndex === -1 && isOver){
         dragOverElement = <div className="drag-preview"></div>
         //classNames.push('drag-over');
      }

      var render = (
         <div className={classNames.join(' ')}>
            {dragOverElement}
            {_blocks}
         </div>
      );

      return readOnly ? render : connectDropTarget(render);
   }
}

// Enable drag&drop on background
export default DropTarget('blocks-block', {
   // Drop
   drop: function (props, monitor) {
      // Ignore shallow
      if (!monitor.isOver({shallow: true})) {
         return;
      }
      return props.dropBlockHandler(props, monitor);
   },
   // Hover
   hover(props, monitor, component) {
      const {setDragPreview} = props;

      // Ignore shallow
      if (!monitor.isOver({shallow: true})) {
         return;
      }

      // Set drag preview
      return setDragPreview('hover', -1);
   }
}, (connect, monitor)=>({
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver({shallow: true})
}))(BlockList);


/*import React, {Component, PropTypes} from 'react';
 import ReactDOM from 'react-dom';
 import Block from './block';

 var dragula = require('react-dragula');

 if(BROWSER){
 require('./styles/blocks.less');
 require('react-dragula/dist/dragula.css');
 }

 export default class BlockList extends Component{
 static defaultProps = {
 blocks: []
 }
 static propTypes = {
 // Blocks
 // page: React.PropTypes.object,
 updateValue: React.PropTypes.func,
 sourceObject: React.PropTypes.object,
 blocks: React.PropTypes.array,
 edits: React.PropTypes.object,
 readOnly: React.PropTypes.bool,
 // DnD
 isOver: React.PropTypes.bool,
 connectDropTarget: React.PropTypes.func
 }

 constructor(){
 super();
 this.state = {
 activeBlock: null
 };
 }

 componentDidMount () {
 var container = ReactDOM.findDOMNode(this.refs.container);
 this.drake = dragula([container], {
 moves: function (el, source, handle, sibling) {
 return true;
 },
 accepts: function (el, target, source, sibling) {
 return true;
 },
 direction: 'vertical',             // Y axis is considered when determining where an element would be dropped
 copy: false,                       // elements are moved by default, not copied
 copySortSource: false,             // elements in copy-source containers can be reordered
 revertOnSpill: false,              // spilling will put the element back where it was dragged from, if this is true
 removeOnSpill: false,              // spilling will `.remove` the element, if this is true
 ignoreInputTextSelection: true     // allows users to select input text, see details below
 });
 this.drake.on('drop', (el, target, source, sibling)=>{
 console.log(el, target, source, sibling);
 });
 }

 componentDidUpdate () {
 this.componentDidMount();
 }

 componentWillUpdate () {
 this.componentWillUnmount();
 }

 componentWillUnmount(){
 this.drake.destroy();
 }

 render() {
 const {isOver, connectDropTarget, readOnly, blocks, activeBlock, embedded} = this.props;
 let _blocks = blocks.map((block, index) => {
 const isActive = !readOnly && activeBlock && activeBlock.id === block.id;
 return (
 <Block {...this.props}
 block={block}
 index={index}
 key={block.id}
 isActive={isActive}/>
 );
 });
 if(_blocks.length === 0){
 _blocks = <p key="null-block" className="blocks-empty">Blöcke hierher ziehen</p>;
 }

 var classNames = ['block-list'];
 if(embedded){
 classNames.push('block-list-embedded')
 }
 else {
 classNames.push('block-list-root')
 }

 return (
 <div ref="container" className={classNames.join(' ')}>
 {_blocks}
 </div>
 );
 }
 }
 */
