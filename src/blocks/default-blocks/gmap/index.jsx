import React, {Component, PropTypes} from 'react';
import Properties from './properties';
import {Gmap} from '../../../edits';

class GmapBlock extends Component {
   static title = 'Google Maps';
   static category = 'Mehr';
   static icon = 'map';
   static propertyEdits = Properties(GmapBlock);

   static defaultProps = {
      address: null,
      small: false
   };

   render() {
      const {address, small} = this.props;
      const height = !small ? '400px' : '150px';
      return (
         <div style={{height: height}}>
            <Gmap value={address} updateValue={(value)=>console.log(value)} fill={true}/>
         </div>
      );
   }
};

export default GmapBlock;

