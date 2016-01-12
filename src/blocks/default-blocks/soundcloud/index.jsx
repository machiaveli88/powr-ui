import React, {Component, PropTypes} from 'react';
import Properties from './properties';

class SoundcloudBlock extends Component {
   static title = 'Soundcloud';
   static icon = 'soundcloud';
   static category = 'Media';
   static propertyEdits = Properties(SoundcloudBlock);

   static defaultProps = {
      url: 'https://soundcloud.com/friedbikinis/above-the-fog',
      autoplay: false,
      width: "100%",
      height: "450px",
      hideRelated: false,
      showComments: true,
      showUser: true,
      showReposts: false,
      visual: false,
      color: "ff5500"
   };
   render() {
      const {url, width, height, autoplay, hideRelated,
         showComments, showUser, showReposts, visual, color} = this.props;

      var src = `https://w.soundcloud.com/player/`
         + `?url=${url}`
         + `&auto_play=${autoplay}`
         + `&hide_related=${hideRelated}`
         + `&show_comments=${showComments}`
         + `&show_user=${showUser}`
         + `&show_reposts=${showReposts}`
         + `&visual=${visual}`
         + `&color=${color}`;

      return (
         <iframe
            width={width}
            height={visual ? height : "auto"}
            scrolling="no"
            frameBorder="no"
            src={src}/>
      );
   }
};

export default SoundcloudBlock;
