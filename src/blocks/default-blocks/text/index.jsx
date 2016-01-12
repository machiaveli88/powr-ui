import React, {Component, PropTypes} from 'react';
import {Medium} from 'powr-ui/edits';
import Lorem from 'powr-utils/lorem';
import Properties from './properties';

if(BROWSER){
   require('./component.less');
}

class TextBlock extends Component{
   static title = 'Text';
   static category = 'Text';
   static icon = 'align left';
   static propertyEdits = Properties(TextBlock);
   static allowBlocks = true;

   static defaultProps = {
      text: '<p style="text-align: justify;">' + Lorem(2) + '</p>',
      dropcap: false
   };

   render(){
      const {text, update} = this.props;
      return (
         <div className="p text-block" /*style={{marginBottom: '30px'}}*/>
            <Medium {...this.props} inline={false} value={text} updateValue={(value)=>update("text", value)}/>
         </div>
      );
   }
};

export default TextBlock;
