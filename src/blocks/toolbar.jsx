import React, {Component, PropTypes} from 'react';
import ReactDOM from 'react-dom';
var _ = require('underscore');

var sizes = {
   13: 'Nahtlos',
   12: 'Voll',
   10: 'Standart Größe',
   8: '2/3 Größe',
   6: '1/2 Größe',
   4: '1/3 Größe',
   2: 'Winzig'
};
if (BROWSER) {
   require("./toolbar.less");
}


export default class BlockToolbar extends Component{
   render(){
      var {
         index,
         block,
         blocks,
         embedded,
         library,
         isActive,
         containers,
         setBlockProperty,
         setBlockIndex,
         removeBlock,
         duplicateBlock
      } = this.props;

      if(block.size && block.size <= 6){
         embedded = true;
      }
      let type;
      let editAsOptions = [];
      Object.keys(library).forEach(function(key){
         if(library[key] && library[key].title){
            if(key.toLowerCase() === block.type.toLowerCase()
               || (library[key].title && library[key].title.toLowerCase() === block.type.toLowerCase())){
               type = key;
            }
            editAsOptions.push({
               name: library[key].title,
               value: key
            });
         }
      });
      editAsOptions = _.sortBy(editAsOptions, item=>item.name);

      var edit = library[type];
      var items;
      if(edit && edit.propertyEdits){
         // new from class
         items = (
            <div className="field">
               <edit.propertyEdits {...this.props} {...block.value} setProperty={function(property, value){
                  setBlockProperty(block, {value: {[property]: value}});
               }} />
            </div>
         )
      }

      return (
         <div>
            <div className="block-list-component btn-toolbar-top">
               <a href="javascript:;" className="ui label simple dropdown" onClick={(ev)=>{ev.stopPropagation();}}>
                  <i className={"icon chevron down" + (embedded ? ' no-spacing' : '')}/>
                  {!embedded && library[type] ? library[type].title : null}
                  <div className="menu">
                     {editAsOptions.map(edit=>
                        <div key={edit.value} className="item" onClick={val=>setBlockProperty(block, {type: edit.value})}>
                           {type === edit.value ? <i className="check icon"></i> : null}
                           {edit.name}
                        </div>
                     )}
                  </div>
               </a>
               <a href="javascript:;" className="ui label simple dropdown" onClick={(ev)=>{ev.stopPropagation();}}>
                  <i className={"icon resize horizontal" + (embedded ? ' no-spacing' : '')}/>
                  {!embedded ? (sizes[block.size+''] || sizes['10']) : null}
                  <div className="menu">
                     {Object.keys(sizes).reverse().map(key=>
                        <div key={key} className="item" onClick={val=>setBlockProperty(block, {size: key === '10' ? null : parseInt(key)})}>
                           {(block.size+'') === key || (!block.size && key === '10') ? <i className="check icon"></i> : null}
                           {sizes[key]}
                        </div>
                     )}
                  </div>
               </a>
               <a href="javascript:;" className="ui label simple dropdown" onClick={(ev)=>{ev.stopPropagation();}}>
                  <i className={"icon ellipsis horizontal" + (embedded ? ' no-spacing' : '')}/>
                  {!embedded ? 'Mehr' : null}
                  <div className="menu" style={{padding:'10px', width:'300px'}}>
                     <div className="ui form">
                        {items}
                     </div>
                  </div>
               </a>
               <a href="javascript:;" className="ui label" onClick={(ev)=>{ev.stopPropagation();duplicateBlock(block, index)}}>
                  <i className="icon copy no-spacing"/>
               </a>
               <a href="javascript:;" className="ui red label" onClick={(ev)=>{ev.stopPropagation();removeBlock(index)}}>
                  <i className="icon trash no-spacing"/>
               </a>
            </div>
            <div className="block-list-component btn-toolbar-top-right">
               <div href="javascript:;" className="ui label drag-handle" style={{cursor:"move"}} onClick={(ev)=>{ev.stopPropagation();}}>
                  <i className={"icon move" + (embedded ? ' no-spacing' : '')}/>
                  {!embedded ? 'Bewegen' : null}
               </div>
               {index !== 0 ? <a href="javascript:;" className="ui label drag-handle" onClick={()=>{setBlockIndex(block, index-1);}}>
                  <i className="icon arrow up no-spacing"/>
               </a> : null}
               {index !== (blocks.length-1) ? <a href="javascript:;" className="ui label drag-handle" onClick={()=>{setBlockIndex(block, index+2);}}>
                  <i className="icon arrow down no-spacing"/>
               </a> : null}
            </div>
         </div>
      )
   }
};
