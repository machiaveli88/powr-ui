import React, {Component, PropTypes} from 'react';
import BuildUrl from './helpers';
import Properties from './properties';

if (BROWSER) {
   require("./component.less");
}

class YoutubeBlock extends Component {
   static title = 'Youtube';
   static icon = 'youtube';
   static category = 'Media';
   static propertyEdits = Properties(YoutubeBlock);

   static defaultProps = {
      loop: false,
      autoplay: false,
      url: 'https://www.youtube.com/embed/YrddaP6ml1M',
      color: null,
      controls: 1, // 0: Keine Controls, sofort laden; 1: Controls, sofort laden; 2: Controls, sp�ter laden
   }

   render() {
      const { url, autoplay, loop, controls } = this.props;
      let src = url.replace("watch?v=", "embed/").replace("youtu.be/", "youtube.com/embed/");
      src = BuildUrl(src, {
         fs: 1,
         autoplay: autoplay ? 1 : 0,
         controls: controls,
         loop: loop ? 1 : 0,
         modestbranding: 1,
         rel: 0,
         showinfo: 0,
         theme: "light",
         hl: "de"
      });

      return (
         <div className="youtube-component">
            <iframe width="561" height="349" src={src} frameBorder="0" allowFullScreen />
         </div>
      );
   }
}

export default YoutubeBlock;
