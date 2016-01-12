import React, {Component, PropTypes} from 'react';
import {Input} from 'powr-ui/edits';
import Helpers from './helpers';

class GmapSearchEdit extends Component {
   static defaultProps = {
      value: ''
   };

   constructor() {
      super();
      this.helpers = Helpers();
      this.state = {};
   }

   render() {
      return (
         <Input icon="circular search" updateValue={this.onChange.bind(this)} value={this.props.value ? this.props.value.address : ""}/>
      );
   }

   onChange(e){
      const {updateValue} = this.props;
      this.helpers.search(e).then((address)=>{
         updateValue(address);
      });
   }
};

export default GmapSearchEdit;
