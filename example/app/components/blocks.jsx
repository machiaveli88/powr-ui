import React, { Component, PropTypes } from "react";
import Router from "react-router";
import Blocks from "../../../src/blocks";
import BlockEdits from "../../../src/blocks/default-blocks";

export default class BlocksExample extends Component {
   constructor(){
      super();
      this.updateValue = this.updateValue.bind(this);
      this.state = {
         blocks: []
      }
   }
   updateValue(blocks){
      this.setState({blocks});
   }
   render() {
      const {blocks} = this.state;
      return (
         <div>
            <div className="ui divided equal height grid full-h" style={{margin: 0}}>
               <div className="four wide column full-h sub-sidebar" style={{padding: 0, backgroundColor: '#F6F7F9'}}>
                  <div className="ui basic segment full-h">
                     <Blocks.LibraryView library={BlockEdits}/>
                  </div>
               </div>
               <div className="eight wide column full-h sub-sidebar" style={{padding: 0, backgroundColor: '#F6F7F9'}}>
                  <div className="ui basic segment full-h">
                     <Blocks library={BlockEdits} value={this.state.blocks} updateValue={this.updateValue}/>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
