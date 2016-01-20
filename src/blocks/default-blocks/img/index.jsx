import React, {Component, PropTypes} from 'react';
import Properties from './properties';
import {Image} from '../../../edits';

class ImgBlock extends Component {
   static title = 'Bild';
   static icon = 'camera retro';
   static category = 'Bild';
   static propertyEdits = Properties(ImgBlock);
   static defaultProps = {
      image: {url: '/img/fakeimg/920x300.png', width: 920, height: 300},
      imageSize: 'normal',
      round: false,
      comment: null
   };

   render() {
      const {image, update} = this.props;
      return (
         <Image {...this.props} value={image} updateValue={(v)=>update('image', v)} imageWidth={12}/>
      );
   }
}

export default ImgBlock;
