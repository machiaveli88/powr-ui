import React, {Component, PropTypes} from 'react';
import {Select} from 'powr-ui/edits';

export default class PropertySize extends Component{
   static defaultProps = {
      name: 'size',
      sizes: ['xs', 'sm', 'md', 'lg', 'xl']
   };
   render(){
      const {name, defaults, value, setProperty, sizes} = this.props;
      const _sizes = {};
      if(sizes.indexOf('xs') >= 0){
         _sizes['Sehr klein'] = 'xs';
      } if(sizes.indexOf('sm') !== -1){
         _sizes['Klein'] = 'sm';
      } if(sizes.indexOf('md') !== -1){
         _sizes['Mittel'] = 'md';
      } if(sizes.indexOf('lg') !== -1){
         _sizes['Groß'] = 'lg';
      } if(sizes.indexOf('xl') !== -1){
         _sizes['Sehr groß'] = 'xl';
      }

      return (
         <div>
            <Select updateValue={(v)=>setProperty(name, v)}
                    value={value || defaults[name]}
                    title='Größe'
                    options={_sizes}/>
         </div>
      );
   }
}
