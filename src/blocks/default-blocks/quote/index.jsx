import React, {Component, PropTypes} from 'react';
import {Medium} from '../../../edits';
import Lorem from 'powr-utils/lorem';
import Properties from './properties';

if(BROWSER){
   require('./style.less');
}
class QuoteBlock extends Component{
   static title = 'Zitat';
   static category = 'Text';
   static icon = 'quote left';
   static propertyEdits = Properties(QuoteBlock);

   static defaultProps = {
      // Values
      text: '<p style="text-align: justify;">' + Lorem(5, 'words') + '</p>',
      // Properties
      size: 'md'
   };

   render(){
      const {size, update, text, person} = this.props;

      let _quote = <Medium {...this.props} hyphenate={false} dropcap={false} value={text} inline={true} updateValue={(value)=>update("text", value)} title={true}/>;
      if(size === 'xl'){
         _quote = <h1>{_quote}</h1>;
      }
      else if(size === 'lg'){
         _quote = <h2>{_quote}</h2>;
      }
      else if(size === 'md'){
         _quote = <h3>{_quote}</h3>;
      }
      else if(size === 'sm'){
         _quote = <h4>{_quote}</h4>;
      }
      else if(size === 'xs'){
         _quote = <h5>{_quote}</h5>;
      }
      return (
         <blockquote className="blockquote">
            {_quote}
            {person ? <p className="comment"> - {person}</p> : null}
         </blockquote>
      );
   }
}

export default QuoteBlock;
