import React, {Component, PropTypes} from 'react';
import {Check} from 'powr-ui/edits';

export default class PropertyDropcap extends Component{
   static defaultProps = {
      name: 'dropcap'
   };
   render(){
      const {name, defaults, value, setProperty} = this.props;
      return (
         <div>
            <Check updateValue={(v)=>setProperty(name, v)}
                   title={'Dropcap'}
                   value={value || defaults[name]}
                   info={'  Wird nicht im Bearbeitungsmodus gezeigt.'}/>
         </div>
      );
   }
}
