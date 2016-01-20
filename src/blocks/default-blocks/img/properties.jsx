import React, {Component, PropTypes} from 'react';
import {Input, Check} from '../../../edits';

export default function (component) {
   return class Properties extends Component {
      render() {
         const {setProperty, comment, round} = this.props;

         return (
            <div>
               <Check text={'Rund'} updateValue={(v)=>setProperty('round', v)}
                      value={round || component.defaultProps['round']}/>
               <p className="small hint-text m-b-20">Kommentar</p>
               <Input updateValue={(v)=>setProperty('comment', v)}
                      value={comment || component.defaultProps['comment']}/>
            </div>
         );
      }
   }
};
