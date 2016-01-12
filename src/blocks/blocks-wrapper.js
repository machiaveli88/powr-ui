import React, {Component, PropTypes} from 'react';
import shortId from 'shortid';
import Merge from 'deep-extend';
import ReactDOM from 'react-dom';

import Blocks from './blocks';

let previousActive = null;
class BlocksWrapper extends Component{
   static propTypes = {
      // Blocks
      // page: React.PropTypes.object,
      updateValue: React.PropTypes.func,
      sourceObject: React.PropTypes.object,
      value: React.PropTypes.array,
      library: React.PropTypes.object,
      readOnly: React.PropTypes.bool,
      // DnD
      isDragging: React.PropTypes.bool,
      connectDropTarget: React.PropTypes.func
   }

   static defaultProps = {
      library: {get:()=>null},
      value: [],
      defaultSize: 12,
      containers: false
   }

   constructor(props){
      super();
      this.state = {
         activeBlock: null
      };
      console.log('Constructor');
      this.onClick = this.onClick.bind(this);
   }

   // Handle click to deactivate active block
   componentDidMount() {
      //document.addEventListener('click', this.onClick, true);
   }

   componentWillUnmount() {
      //document.removeEventListener('click', this.onClick, true);
   }

   componentDidUpdate(oldProps) {
      //document.removeEventListener('click', this.onClick, true);
   }

   onClick(ev, t) {
      if ($(ev.target).parents('a').length) {
         return;
      }

      var clickedOutsideBlockList = !ReactDOM.findDOMNode(this.refs['blocklist']) || !ReactDOM.findDOMNode(this.refs['blocklist']).contains(ev.target);
      var clickedOutsideApp = !document.getElementById('app').contains(ev.target);

      console.log('Onclick');
      const {activeBlock} = this.state;
      if (clickedOutsideBlockList && !clickedOutsideApp) {
         if (activeBlock) {
            this.setState({activeBlock: null});
         }
      }
   }

   render() {
      const {activeBlock} = this.state;
      console.log('RERENDERINO', activeBlock);

      const actions = {
         activeBlock,
         activateBlock: this.activateBlock.bind(this),
         setBlockIndex: this.setBlockIndex.bind(this),
         duplicateBlock: this.duplicateBlock.bind(this),
         removeBlock: this.removeBlock.bind(this),
         setBlockProperty: this.setBlockProperty.bind(this),
         addBlock: this.addBlock.bind(this),
         dropBlockHandler: this.dropBlockHandler.bind(this),
         setDragPreview: this.setDragPreview.bind(this)
      };

      return (
         <Blocks ref={'blocklist'} {...this.props} {...this.state} {...actions} blocks={this.props.value||[]} />
      );
   }

   // Actions
   activateBlock(block) {
      const {readOnly} = this.props;
      if(readOnly) return;
      const {activeBlock} = this.state;
      if(!block && activeBlock){
         console.log('Change active block', block);
         this.setState({activeBlock: null});
      }
      else if (!activeBlock || activeBlock.id !== block.id) {
         console.log('Change active block2', block);
         if(previousActive){
            previousActive();
            previousActive = null;
         }
         this.setState({activeBlock: block});
         previousActive = ()=>{
            this.setState({activeBlock: null});
         }
      }
   }
   setBlockProperty(block, patch) {
      const {readOnly} = this.props;
      if(readOnly) return;

      const {updateValue, value: blocks} = this.props;

      const blockCopy = blocks.map(item=> {
         if (item.id === block.id) {
            return Merge(JSON.parse(JSON.stringify(item)), patch);
         }
         else {
            return item
         }
      });

      updateValue(blockCopy);
   }
   setBlockIndex(block, index) {
      const {readOnly} = this.props;
      if(readOnly) return;

      const {updateValue, value: blocks} = this.props;

      const blockCopy = blocks.slice();
      var oldIndex = blockCopy.indexOf(block);
      if(oldIndex === -1){
         oldIndex = blockCopy.indexOf(blockCopy.filter(item=>item.id === block.id)[0])
      }
      blockCopy.splice(oldIndex >= index || oldIndex === -1 ? index : (index-1), 0, blockCopy.splice(oldIndex , 1)[0]);
      updateValue(blockCopy);
   }
   dropBlockHandler(props, monitor){
      if(this.props.readOnly) return;

      // from this
      const {updateValue, value: blocks} = this.props;
      const {dragHoverIndex, dragHoverPosition} = this.state;

      // from arguments
      var _original = monitor.getItem();
      var _block = _original.toolbar ? {type: _original.toolbar} : _original.block;

      // source and destination is same?
      var equal = _original.blocks === blocks;

      // Correct index if too low/high
      let index = dragHoverPosition && dragHoverPosition[0] === 's' ? (dragHoverIndex + 1) : dragHoverIndex;
      if(index > blocks.length){
         index = blocks.length;
      }
      if(index < 0){
         index = 0;
      }

      var oldId = _block.id;
      // Clone block
      var block = {
         value: {},
         ..._block,
         id: shortId.generate()
      };

      // Clone blocks
      let blockCopy = blocks.slice();

      // if dropped on component
      if(dragHoverPosition && dragHoverPosition[0] === 'n' && dragHoverPosition.length > 1){
         var item = blockCopy[index];
         var value = item.value;
         var position = '';
         if(dragHoverPosition === 'nw'){ position = 'l'; }
         if(dragHoverPosition === 'nww'){ position = 'xl'; }
         if(dragHoverPosition === 'ne'){ position = 'r'; }
         if(dragHoverPosition === 'nee'){ position = 'xr'; }
         // text-component => Just push
         if(item.type.toLowerCase() === 'text-component' && item.value && item.value.subblocks){
            item.value.subblocks.push(block);
            item.value.position = position;
            blockCopy[index] = item;
         }
         // text => convert to text-component
         else if (item.type.toLowerCase() === 'text'){
            blockCopy[index] = {
               ...item,
               id: shortId.generate(),
               type: 'text-component',
               value: {
                  ...value,
                  position: position,
                  subblocks: [{...block, size: 13}]
               }
            }
         }
         // else
         else{
            blockCopy[index] = item;
         }
      }
      // if dropped on ground
      else{
         if(index >= blockCopy.length){
            blockCopy.push(block);
         }
         else{
            blockCopy.splice(index, 0, block);
         }
      }

      // TODO Hacky cleanup / convert empty text-components => text
      blockCopy = blockCopy.map(item=>{
         if(item.type && item.type.toLowerCase() === 'text-component'){
            if(!item.value || !item.value.subblocks || item.value.subblocks.length === 0){
               block.size = null;
               return {
                  ...item,
                  id: shortId.generate(),
                  type: 'text'
               }
            }
            else if(item.value && item.value.subblocks && item.value.subblocks.length === 1 && item.value.subblocks[0].id === _block.id){
               block.size = null;
               return {
                  ...item,
                  id: shortId.generate(),
                  type: 'text'
               }
            }
         }
         return item;
      });

      // Remove
      if (oldId && _original.removeBlock) {
         if(equal){
            blockCopy = blockCopy.filter((item)=>item.id !== oldId);
         }
         else{
            _original.removeBlock(oldId);
         }
      }
      updateValue(blockCopy);
   }
   setDragPreview(action, hoverIndex, position) {
      const {readOnly} = this.props;
      if(readOnly) return;

      const {dragHoverIndex, dragHoverPosition} = this.state;
      if(action === 'hover'){
         if(dragHoverIndex === hoverIndex && dragHoverPosition === position){
            return;
         }
         this.setState({dragHoverIndex: hoverIndex, dragHoverPosition: position});
      }
      else{
         this.setState({dragHoverIndex: null, dragHoverPosition: null});
      }
   }
   duplicateBlock(block, index) {
      const {readOnly} = this.props;
      if(readOnly) return;

      const {updateValue, value: blocks} = this.props;

      const blockCopy = blocks.slice();

      blockCopy.splice(index, 0, Merge({}, block, {
         id: shortId.generate()
      }));
      updateValue(blockCopy);
   }
   removeBlock(index) {
      const {readOnly} = this.props;
      if(readOnly) return;

      const {updateValue, value: blocks} = this.props;

      let blockCopy = blocks.slice();

      if(typeof index === 'number'){
         blockCopy.splice(index, 1);
      }
      else if(typeof index === 'string'){
         blockCopy = blockCopy.filter((item)=>item.id !== index);
      }
      else if(index.id){
         blockCopy = blockCopy.filter((item)=>item.id !== index.id);
      }
      updateValue(blockCopy);
   }
   addBlock(block, index) {
      const {readOnly} = this.props;
      if(readOnly) return;

      const {updateValue, value: blocks} = this.props;

      const blockCopy = blocks.slice();

      blockCopy.splice(index, 0, block);
      updateValue(blockCopy);
   }
}

module.exports = BlocksWrapper;
