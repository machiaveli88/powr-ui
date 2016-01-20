import React, {Component, PropTypes} from 'react';
import {Check, Select, Input} from '../../../edits';
import {Dropcap, Span, Position} from '../_properties';

export default function(component){
   return class Properties extends Component{
      render(){
         const {setProperty, innerBorder, comment, position, span, dropcap} = this.props;

         return (
            <div>
               <Dropcap {...this.props} defaults={component.defaultProps} value={dropcap}/>
               <p className="small hint-text m-b-20">Position</p>
               <Position {...this.props} defaults={component.defaultProps} value={position}/>
               <p className="small hint-text m-b-20">Größe</p>
               <Span {...this.props} defaults={component.defaultProps} value={span}/>
               <p className="small hint-text m-b-20">Unterschrift</p>
               <Input updateValue={(v)=>setProperty('comment', v)} value={comment || component.defaultProps['comment']}/>
            </div>
         );
      }
   }
};
