import React, {Component, PropTypes} from 'react';
import {Check, Select, Input} from 'powr-ui/edits';
import {Dropcap, Position, Size} from '../_properties';

export default function(component){
   return class Properties extends Component{
      render(){
         const {setProperty, person, position, size, dropcap} = this.props;

         return (
            <div>
               <p className="small hint-text m-b-20">Größe</p>
               <Size {...this.props} defaults={component.defaultProps} value={size}/>
               <p className="small hint-text m-b-20">Quelle</p>
               <Input updateValue={(v)=>setProperty('person', v)} value={person || component.defaultProps['person']}/>
            </div>
         );
      }
   }
};
