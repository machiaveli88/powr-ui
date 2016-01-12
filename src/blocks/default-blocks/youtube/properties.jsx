import React, {Component, PropTypes} from 'react';
import {Check, Input} from 'powr-ui/edits';

export default function(component){
   return class Properties extends Component{
      render(){
         const {setProperty, loop, autoplay, url} = this.props;

         return (
            <div>
               <p className="small hint-text m-b-20">Youtube Video-URL</p>
               <Input updateValue={(v)=>setProperty('url', v)}
                      value={url || component.defaultProps['url']}/>
               <Check updateValue={(v)=>setProperty('autoplay', v)}
                      title={'Automatisch abspielen'}
                      value={autoplay || component.defaultProps['autoplay']}/>
               <Check updateValue={(v)=>setProperty('loop', v)}
                      title={'Wiederholen'}
                      value={loop || component.defaultProps['loop']}/>
            </div>
         );
      }
   }
};
