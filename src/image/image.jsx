var React = require('react');
var shuffle = require('powr-utils/array/shuffle');
var sortby = require("lodash.sortby");
if (BROWSER) {
   require("./image.less")
}

function hexToRgb(hex) {
   var result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
   return result ? {
      r: parseInt(result[1], 16),
      g: parseInt(result[2], 16),
      b: parseInt(result[3], 16)
   } : null;
};
var standardDeviationCache = {};
function standardDeviation(values) {
   if (standardDeviationCache[values]) {
      return standardDeviationCache[values];
   }
   var avg = average(values);

   var squareDiffs = values.map(function (value) {
      var diff = value - avg;
      var sqrDiff = diff * diff;
      return sqrDiff;
   });

   var avgSquareDiff = average(squareDiffs);

   var stdDev = Math.sqrt(avgSquareDiff);
   standardDeviationCache[values] = stdDev;
   return stdDev;
}
function average(data) {
   var sum = data.reduce(function (sum, value) {
      return sum + value;
   }, 0);

   var avg = sum / data.length;
   return avg;
}

var directions = ["right top", "right bottom", "left bottom", "left top"];
//var browserPrexies = ["","-webkit-", "-moz-", "-o-", "-ms-"];
var browserPrexies = ["-webkit-"];

module.exports = React.createClass({
   getInitialState: function () {
      return {};
   },
   getDefaultProps: function () {
      return {
         name: null,
         item: null,
         minHeight: null,
         height: null,
         width: null,
         style: {},
         radius: false,
         comment: null,
         background: false,
         className: "",
         round: false
      }
   },
   render: function () {
      var {style, height, round, minHeight, width, className, background, children, onClick, comment, radius} = this.props;
      const value = this.props.value || {url: "/img/fakeimg/920x300.png", width: 920, height: 300};

      var s = [];
      var directionsShuffled = directions;//shuffle(directions);
      if (value.colors) {
         var rgbColors = value.colors.map(function (col) {
            return hexToRgb(col);
         });
         for (var j = 0; j < browserPrexies.length; j++) {
            s[j] = "";
            for (var i = 0; i < 4; i++) {
               var color = rgbColors[i];
               if(!color){
                  continue;
               }
               var oppDir = directionsShuffled[i % directionsShuffled.length];
               s[j] += browserPrexies[j] + "linear-gradient(" + oppDir + ", rgba(" +
                  color.r + "," + color.g + "," + color.b + ",0) 0%, rgba(" +
                  color.r + "," + color.g + "," + color.b + "," + (i === 0
                     ? .5 : i === 1
                     ? .5 : i === 2
                     ? .5 : 1) + ") 100%),";
            }
            s[j] = s[j].slice(0, -1);
         }
      }

      let url = null;
      let aspectRatio = 0;
      if(value.params && value.params.height && value.params.width){
         aspectRatio = value.params.height / value.params.width * 100;
      }
      else if(value.height && value.width){
         aspectRatio = value.height / value.width * 100;
      }

      if(round === true){
         style = {...style, borderRadius: '500rem'};
      }
      else{
         style = {...style, borderRadius: 0};
      }

      if(background){
         if(value && value.url && value.params && value.params.cropW !== undefined && value.params.cropH !== undefined){
            url = value.url.replace("upload/", "upload/"
               +"x_"+(value.params.cropX || 0)
               +",y_"+(value.params.cropY || 0)
               +",w_"+value.params.cropW
               +",h_"+value.params.cropH
               +",c_crop/");
         }
         else{
            url = value.url.replace("/image/upload/", "/image/upload/c_fill,q_75,e_vibrance:33/");
         }

         style = {
            ...style,
            height: height + "px",
            paddingTop: "35px",
            marginBottom: "30px",
            background: "url("+url+") no-repeat, " + s.join(",") || "gray",
            backgroundPosition: 'center center',
            backgroundSize: 'auto auto'
         };
         return (
            <div style={style}>
               {children}
            </div>
         );
      }

      if(value && value.url && value.params && value.params.cropW !== undefined && value.params.cropH !== undefined){
         url = value.url.replace("upload/", "upload/"
            +"x_"+(value.params.cropX || 0)
            +",y_"+(value.params.cropY || 0)
            +",w_"+value.params.cropW
            +",h_"+value.params.cropH
            +",c_crop/");
      }
      else{
         url = value.url.replace("/image/upload/", "/image/upload/w_1000,c_fill,q_75,e_vibrance:33/");
      }


      style = {
         ...style,
         width: style.height = '100%',
         background: s.join(",") || "gray"
      };

      let _image = (
         <div style={{...style}}>
            <img src={url} style={{borderRadius: style.borderRadius}}  width="100%"/>
            {children}
         </div>
      );

      if(onClick){
         _image = (
            <a onClick={onClick} className={'content'} href="javascript:;">
               {_image}
            </a>
         );
      }
      else{
         _image = (
            <div className={'content'}>
               {_image}
            </div>
         )
      }

      const _comment = comment || (value ? value.comment : null);
      return (
         <div className="__Image">
            <div className="__Inner">
               {aspectRatio ? <div style={{paddingTop: aspectRatio + '%'}}/> : null}
               {_image}
            </div>
            {!_comment ? null : <p className="comment">{_comment}</p>}
         </div>
      );
   }
});
