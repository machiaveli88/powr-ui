import React, {Component, PropTypes} from 'react';
import {Select} from 'powr-ui/edits';

export default class PropertyPosition extends Component{
   static defaultProps = {
      name: 'position',
      positions: ['xl', 'l', 'r', 'xr'],
      extreme: true
   };
   render(){
      const {name, defaults, value, setProperty, extreme} = this.props;
      const options = {
         'Weit links': 'xl',
         'Links': 'l',
         'Rechts': 'r',
         'Weit rechts': 'xr'
      };
      if(!extreme){
         delete options['Weit links'];
         delete options['Weit rechts'];
      }
      return (
         <div>
            <Select updateValue={(v)=>setProperty(name, v)}
                    value={value || defaults[name]}
                    title='Position'
                    options={options}/>
         </div>
      );
   }
}
