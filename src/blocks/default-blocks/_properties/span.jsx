import React, {Component, PropTypes} from 'react';
import {Select} from '../../../edits';

export default class PropertySpan extends Component{
   static defaultProps = {
      name: 'span'
   };
   render(){
      const {name, defaults, value, setProperty} = this.props;
      return (
         <div>
            <Select updateValue={(v)=>setProperty(name, v)}
                    value={value || defaults[name]}
                    title='Breite'
                    options={{
                     '1/3': 2,
                     '1/2': 3,
                     '2/3': 4
                    }}/>
         </div>
      );
   }
}
