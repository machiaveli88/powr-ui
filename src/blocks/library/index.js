import React, {Component, PropTypes} from 'react';
var Block = require('./library-item');
var sortby = require('lodash.sortby');
import ReactDOM from 'react-dom';

export default class BlockLibrary extends Component{
   static contextTypes = {
      blocks: React.PropTypes.object
   }


   static defaultProps = {
      library: null
   }
   constructor() {
      super();
      this.state = {
         search: null
      };
   }
   componentDidMount(){
      //ReactDOM.findDOMNode(this.refs.input).focus();
   }
   render() {
      var {search} = this.state;

      var edits = this.props.edits || this.props.library || this.context.blocks || {get:()=>null};
      var blocks = [];

      sortby(Object.keys(edits), key=>key).forEach(key => {
         const block = edits[key];
         var cats = !block.category ? [] : block.category.split(",");

         if(!search || !block.title || block.title.toLowerCase().indexOf(search.toLowerCase() ) >= 0){
            cats.forEach(cat=> {
               const b = {
                  name: key,
                  block
               };
               var i = blocks.filter(x=>x.name===cat);
               if (i.length > 0) {
                  i[0].children.push(b)
               }
               else {
                  blocks.push({
                     name: cat,
                     children: [b]
                  });
               }
            })
         }
      });
      blocks = sortby(blocks, item=>item.name);

      return (
         <div>
            {/*<div className="ui text menu no-spacing-top">
               <div className="item" style={{width:'100%'}}>
                  <div className="ui transparent icon input">
                     <Input ref={"input"} value={search} updateValue={(search)=>this.setState({search})} placeholder={"Filter ..."}/>
                     <i className="search link icon"></i>
                  </div>
               </div>
            </div>*/}
            <h4 className="ui header">
               <div className="sub header">
                  Komponenten auf die Seite ziehen.
               </div>
            </h4>
            {blocks.map(x=>
               <div key={x.name}>
                  <h5 className="ui sub disabled header" style={{marginTop: '15px'}}>
                     {x.name}
                  </h5>
                  <div className="ui list">
                     {x.children.map(y=>
                        <Block {...this.props} key={x.name + "-" + y.name} blockName={y.name} block={y.block}/>
                     )}
                  </div>
               </div>
            )}
         </div>
      );
   }
}
