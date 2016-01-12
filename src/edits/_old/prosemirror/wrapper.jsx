var React = require('react');
import ReactDOM from 'react-dom';

import {HtmlToText} from 'powr-utils/text';
var ProseMirror = require('./component');

export default React.createClass({
   displayName: 'ProseMirrorWrapper',

   getDefaultProps() {
      return {
         title: false,
         active: true,
         dropcap: false,
         inline: false,
         value: null,
         style: {},
         className: '',
         tag: 'div',
         options: { }
      };
   },

   componentDidMount() {
      const {title, value, inline, options} = this.props;
      if (window.Dropcap) {
         window.Dropcap.layout(document.querySelectorAll('.adobe-dropcap'), 3);
      }
      if (this.refs.hyph) {
         if (typeof Hyphenator !== "undefined") {
            Hyphenator.hyphenate(ReactDOM.findDOMNode(this.refs.hyph), "de");
         }
      }
   },


   componentDidUpdate(prevProps) {
      if(prevProps.active !== this.props.active){
         this.componentDidMount();
      }
   },

   render() {
      const {style, inline, value} = this.props;
      if(inline) {
         style.display = 'inline-block';
      }
      else{
         style.display = 'block';
      }
      if (typeof window !== 'undefined' && typeof $ !== "undefined" && this.props.updateValue && !this.props.readOnly && this.props.active)// && this.props.active
      {
         return (
            <ProseMirror
               value={value}
               onChange={this.change}
            />
         )
      }
      var html = value || "";
      if (this.props.dropcap) {
         for (var i = 0; i < html.length; i++) {
            if (html[i] === "<") {
               i = html.indexOf(">", i);
               continue;
            }
            if (html[i] !== "&" && html[i] !== "\"" && html[i] !== "'") {
               html = html.substring(0, i) + "<span class='adobe-dropcap'>" + html[i] + "</span>" + html.substring(i + 1);
               break;
            }
         }
      }
      return React.createElement(this.props.tag, {
         className: this.props.className + ' ' + 'hyphenate',
         style: style,
         ref: 'hyph',
         dangerouslySetInnerHTML: {__html: html}
      });
   },

   change(value) {
      console.log(value, this.props.updateValue);
      if(this.props.updateValue) {
         if(this.props.inline){
            this.props.updateValue(HtmlToText(value));
         }
         else{
            this.props.updateValue(value);
         }
      }
   }
});
