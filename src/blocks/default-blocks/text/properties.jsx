import React, {Component, PropTypes} from 'react';
import {Check} from '../../../edits';
import {Dropcap} from '../_properties';

export default function(component){
   return class Properties extends Component{
      render(){
         const {setProperty, dropcap} = this.props;
         return (
            <div>
               <Dropcap {...this.props} name={'dropcap'} defaults={component.defaultProps} value={dropcap}/>
            </div>
         );
      }
   }
};
