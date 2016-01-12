var React = require('react');
import ReactDOM from 'react-dom';

import {HtmlToText} from 'powr-utils/text';
var MediumEditor = null;
if (BROWSER) {
   MediumEditor = require('react-medium-editor');
   require('medium-editor/dist/css/medium-editor.css');
   require('./style.less');
}

export default React.createClass({
   displayName: 'MediumEditor',

   getDefaultProps() {
      var buttons = ["bold", "italic", "underline",
         {
            name: 'anchor',
            contentDefault: '<i class="linkify icon"></i>'
         }, "h2", "h3", "quote",
         {
            name: 'indent',
            contentDefault: '<i class="indent icon"></i>'
         },
         {
            name: 'outdent',
            contentDefault: '<i class="outdent icon"></i>'
         },
         {
            name: 'justifyLeft',
            contentDefault: '<i class="align left icon"></i>'
         },
         {
            name: 'justifyCenter',
            contentDefault: '<i class="align center icon"></i>'
         },
         {
            name: 'justifyRight',
            contentDefault: '<i class="align right icon"></i>'
         },
         {
            name: 'justifyFull',
            contentDefault: '<i class="align justify icon"></i>'
         }];

      return {
         title: false,
         active: true,
         dropcap: false,
         inline: false,
         value: null,
         hyphenate: true,
         style: {},
         className: '',
         tag: 'div',
         options: {
            autoLink: true,
            imageDragging: false,
            toolbar: {
               buttons
            },
            placeholder: {
               text: 'Klicken zum Bearbeiten'
            },
            paste: {
               cleanPastedHTML: true,
               cleanAttrs: ['style', 'dir'],
               cleanTags: ['label', 'meta']
            },
            anchor: {
               placeholderText: 'Link einfügen oder eingeben',
               targetCheckbox: true,
               targetCheckboxText: 'In neuem Fenster öffnen'
            }
         }
      };
   },

   componentDidMount() {
      const {title, value, inline, options, hyphenate} = this.props;
      if (window.Dropcap) {
         window.Dropcap.layout(document.querySelectorAll('.adobe-dropcap'), 3);
      }
      if (this.refs.hyph && hyphenate) {
         if (typeof Hyphenator !== "undefined") {
            Hyphenator.hyphenate(ReactDOM.findDOMNode(this.refs.hyph), "de");
         }
      }
   },


   componentDidUpdate(prevProps) {
      if (prevProps.active !== this.props.active) {
         this.componentDidMount();
      }
   },

   render() {
      const {style, inline, value, updateValue,
         readOnly, active, dropcap, className, tag} = this.props;

      if (inline) {
         style.display = 'inline-block';
      }
      else {
         style.display = 'block';
      }

      if (BROWSER && updateValue && !readOnly && active) {
         var options = JSON.parse(JSON.stringify(this.props.options));
         if(inline){
            options.toolbar.diffLeft = -10000;
         }
         return (
            <MediumEditor options={options} text={value} onChange={this.change}/>
         )
      }

      var html = value || "";
      if (dropcap) {
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
      return React.createElement(tag, {
         className: className + ' ' + 'hyphenate',
         style: style,
         ref: 'hyph',
         dangerouslySetInnerHTML: {__html: html}
      });
   },

   change(value) {
      const {updateValue, inline} = this.props;
      if (updateValue) {
         if (inline) {
            updateValue(HtmlToText(value));
         }
         else {
            updateValue(value);
         }
      }
   }
});
