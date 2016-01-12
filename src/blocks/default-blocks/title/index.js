import React, {Component, PropTypes} from 'react';
import {Medium, Image} from 'powr-ui/edits';
import Lorem from 'powr-utils/lorem';
import Properties from './properties';

class TitleBlock extends Component{
   static title = 'Titel';
   static icon = 'minus';
   static category = 'Text';
   static propertyEdits = Properties(TitleBlock);

   static defaultProps = {
      // Values
      text: '<p>' + Lorem(4, 'words') + '</p>',
      text2: '<p style="text-align: justify;">' + Lorem(10, 'words') + '</p>',
      mega: false,
      subtitle: false
   };

   render(){
      const {text, text2, subtitle, update, active} = this.props;
      var self = this;
      var style2 = {};
      if (this.props.mega) {
         style2.fontSize = "60px";
      }
      return (
         <h2 className="ui header" /*style={{marginBottom: '20px'}}*/>
            <div className="content">
               <Medium value={text} inline={true} dropcap={false} active={active} updateValue={(value)=>update("text", value)} title={true}/>
               {subtitle ? <div className="sub header">
                  <Medium dropcap={false} inline={true} value={text2} active={active} updateValue={(value)=>update("text2", value)} title={false}/>
               </div> : null}
            </div>
         </h2>
      );
   }
}

export default TitleBlock;

