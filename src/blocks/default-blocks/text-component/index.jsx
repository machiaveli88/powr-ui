import React, {Component, PropTypes} from 'react';
import Lorem from 'powr-utils/lorem';
import Properties from './properties';
import Blocks from '../../index';
import {Medium} from '../../../edits';

if(BROWSER){
   require('./component.less');
}

class TextComponentBlock extends Component{
   static title = 'Text & Komponente';
   static category = 'Text';
   static icon = 'newspaper';
   static propertyEdits = Properties(TextComponentBlock);
   static allowBlocks = true;

   static defaultProps = {
      // Values
      text: '<p style="text-align: justify;">' + Lorem(2) + '</p>',
      // Properties
      position: 'left',
      dropcap: false,
      span: 2,
      comment: null,
      subblocks: []
   };

   render(){
      const {position, span, dropcap, imageCircle, update, image, text, comment, subblocks} = this.props;
      const isLeft = position.indexOf('l') >= 0;

      var style = {
         float: isLeft ? 'left' : 'right',
         paddingTop: '6px'
      }
      if (isLeft) {
         style.paddingLeft = '0';
      }
      else {
         style.paddingRight = '0';
      }
      if (position === 'xl') {
         style.marginLeft = '-60px';
      }
      else if (position === 'xr') {
         style.marginRight = '-60px';
      }

      return (
         <div className='p text-block' style={{marginBottom: '30px'}}>
            <div className={'col-md-' + (span*2)} style={style}>
               <Blocks {...this.props} embedded={span*2} edits={this.props.edits} value={subblocks} updateValue={(value)=>update('subblocks', value)}
                       containers={false} defaults={{size: 12}}/>
            </div>
            <Medium {...this.props} inline={false} value={text} updateValue={(value)=>update("text", value)}/>
         </div>
      );
   }
}

export default TextComponentBlock;

