import React, {Component, PropTypes} from 'react';
import {Check, Input} from '../../../edits';

export default function(component){
   return class Properties extends Component{
      render(){
         const {setProperty, visual, autoplay, url} = this.props;

         return (
            <div>
               <p className="small hint-text m-b-20">Youtube Video-URL</p>
               <Input updateValue={(v)=>setProperty('url', v)}
                      value={url || component.defaultProps['url']}/>
               <Check updateValue={(v)=>setProperty('autoplay', v)}
                      title={'Automatisch abspielen'}
                      value={autoplay || component.defaultProps['autoplay']}/>
               <Check updateValue={(v)=>setProperty('visual', v)}
                      title={'Mega Player'}
                      value={visual || component.defaultProps['visual']}/>
            </div>
         );
      }
   }
};
