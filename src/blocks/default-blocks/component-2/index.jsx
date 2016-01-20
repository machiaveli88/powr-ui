import React, {Component, PropTypes} from 'react';
import Lorem from 'powr-utils/lorem';
import Properties from './properties';
import Blocks from '../../index';

if(BROWSER){
   require('./component.less');
}

class TextComponentBlock extends Component{
   static title = '2-Spalten';
   static category = 'Kontainer';
   static icon = 'block layout';
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
      const {position, span, dropcap, imageCircle, update, image, text, comment, subblocks, subblocks2} = this.props;

      return (
         <div style={{marginLeft: "-15px", marginRight: "-15px"}} className="p row">
            <div className="col-sm-6">
               <Blocks {...this.props} embedded={true} value={subblocks} updateValue={(value)=>update('subblocks', value)}
                       containers={false} defaults={{size: 12}}/>
            </div>
            <div className="col-sm-6">
               <Blocks {...this.props} embedded={true} value={subblocks2} updateValue={(value)=>update('subblocks2', value)}
                       containers={false} defaults={{size: 12}}/>
            </div>
            <div style={{clear:"both"}} />
         </div>
      );
   }
}

export default TextComponentBlock;

