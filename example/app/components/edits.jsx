import React, { Component, PropTypes } from "react";
import Router from "react-router";
import Check from "../../../src/edits/check";
import Input from "../../../src/edits/input";
import MaskedInput from "../../../src/edits/masked-input";
import Select2 from "../../../src/edits/select2";

export default class BlocksExample extends Component {
   constructor() {
      super();
      this.updateValue = this.updateValue.bind(this);
      this.state = {
         blocks: []
      }
   }

   updateValue(blocks) {
      this.setState({blocks});
   }

   render() {
      const {blocks} = this.state;
      return (
         <div>
            <div className="ui divided equal height grid full-h">
               <div className="four wide column full-h sub-sidebar">
               </div>
               <div className="eight wide column full-h sub-sidebar">
                  <div className="ui form">
                     <div className="inline field">
                        <label>True</label>
                        <Check value={true}/>
                     </div>
                     <div className="inline field">
                        <label>False</label>
                        <Check value={false}/>
                     </div>
                     <div className="inline field">
                        <label>True</label>
                        <Check value={{hallo: 'ja'}} defaultValue={false}/>
                     </div>
                     <div className="inline field">
                        <label>True</label>
                        <Check value={null} defaultValue={true}/>
                     </div>
                     <div className="inline field">
                        <label>Input</label>
                        <Input value={null} placeholder="1"/>
                     </div>
                     <div className="inline field">
                        <label>Masked-Input</label>
                        <MaskedInput pattern="1111 *** aaa 1111 1111" value={null}/>
                     </div>
                     <div className="inline field">
                        <label>Select2</label>
                        <Select2 tags={true} options={[{value: 'one', label: 'One'}, {value: 'two', label: 'Two'}]} updateValue={v=>this.setState({select2:v})} value={this.state.select2} />
                     </div>
                  </div>
               </div>
            </div>
         </div>
      );
   }
}
