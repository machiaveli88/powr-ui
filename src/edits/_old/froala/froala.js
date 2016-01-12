var React = require('react');
var Mixin = require("powr-utils/mixins/editor-mixin");
var lorem = require("powr-utils/lorem");
import ReactDOM from 'react-dom';

var meta = {
   title: "Froala-Editor",
   namespace: "Default.Basic",
   category: "Text",
   flags: ["Text"],
   properties: {
      text: {type: React.PropTypes.string, edit: "text", title: "Text", isValue: true},
      dropcap: {
         type: React.PropTypes.bool,
         edit: "check",
         title: "Dropcap",
         info: "Wird nicht im Bearbeitungsmodus angezeigt."
      }
      //inline: {type: React.PropTypes.bool, edit: "check", title: "Inline" },
   }
};
var Component = React.createClass({
   statics: meta,
   getDefaultProps: function () {
      return {
         active: true,
         dropcap: false,
         inline: false,
         title: false,
         value: null
      }
   },
   updateValue: function (value) {
      this._value = value;
      this.props.updateValue(value);
   },
   attach: function () {
      const {title, value, dropcap, inline} = this.props;
      if (this.refs.hyph) {
         if (typeof Hyphenator !== "undefined") {
            if (window && window.Dropcap && dropcap) {
               window.Dropcap.layout(document.querySelectorAll('.adobe-dropcap'), 3);
            }
            Hyphenator.hyphenate(ReactDOM.findDOMNode(this.refs.hyph), "de");
         }
         /*$(this.refs.hyph.getDOMNode()).html(function (i, html)
          {
          return html;
          //return html.replace(/^[^a-zA-Z]*([a-zA-Z])/g, '<span class="dropcap">$1</span>');
          });*/
      }
      else if (this.refs.edit) {
         if (this.froala) return;
         if (typeof $ === "undefined") return;
         var config = {
            inlineMode: inline,
            countCharacters: false,
            placeholder: " ",
            imageUploadURL: null,
            //paragraphy: !this.props.title,
            multiLine: !title,
            plainPaste: title
         }
         if (title) {
            //config.allowedTags = ["strong", "span", "p"];
         }
         var froala = $(ReactDOM.findDOMNode(this.refs.edit)).editable(config);

         $(ReactDOM.findDOMNode(this.refs.edit)).editable('setHTML', value || "", false);

         setTimeout(function () {
            froala.on('editable.contentChanged', function (e) {
               var returnedHtml = froala.editable('getHTML');
               if (title) {
                  returnedHtml = replaceAll(returnedHtml, "<p", "<div");
               }
               if (value !== returnedHtml) {
                  this.updateValue(returnedHtml);
               }
            }.bind(this));
         }.bind(this), 100);

         this.froala = $(ReactDOM.findDOMNode(this.refs.edit));
      }
   },
   detach: function () {
      if (this.froala) {
         this.froala.editable('destroy');
         this.froala = null;
      }
   },
   componentWillUpdate: function () {
      this.detach();
   },
   componentDidUpdate: function () {
      this.attach();
   },
   componentDidMount: function () {
      this.attach();
   },
   componentWillUnmount: function () {
      this.detach();
   },
   shouldComponentUpdate: function (newProps, newState) {
      if (newProps.value !== this._value || newProps.readOnly !== this.props.readOnly || newProps.active !== this.props.active) {
         this._value = newProps.value;
         return true;
      }
      return false;
   },

   render: function () {
      if (typeof window !== 'undefined' && typeof $ !== "undefined" && this.props.updateValue && !this.props.readOnly && this.props.active)// && this.props.active
      {
         return (<div ref='edit'/>);
      }
      var html = this.props.value || "";
      //var html = this.props.value.replace(/^[^a-zA-Z'"<]*([a-zA-Z])/g, '<span class="big-cap">$1</span>');

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
      return (<div dangerouslySetInnerHTML={{__html: html}} className="hyphenate" ref='hyph'/>);
   }
});
function replaceAll(str, find, replace) {
   return str.replace(new RegExp(find, 'g'), replace);
}

module.exports = Mixin(Component);
