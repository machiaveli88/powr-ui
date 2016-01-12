import React from "react";
import ShortId from "shortid";

export default React.createClass({
   getDefaultProps: function () {
      return {
         yes: "Ja",
         no: "Nein",
         info: null,
         style: {},
         disabled: false
      }
   },

   onChecked: function (e) {
      var {updateValue, value} = this.props;

      var v;
      if (typeof e === 'undefined') {
         v = !value;
      }
      else {
         v = e.target.checked;
      }
      //console.log('Changed', v);

      updateValue(v);
   },

   render: function () {
      const {value, text, label, title, info, description, yes, no, style, disabled} = this.props;

      var checked = value === true || false;
      var word = (text || title || label)
         ? (text || title || label)
         : (checked ? yes : no)
      + (description ? (" - " + description) : "");
      var infoLabel = info && checked
         ? <span style={{color: "red", fontStyle: "italic", fontSize: "80%"}}>{info}</span>
         : null;

      var id = ShortId.generate();
      return (
         <div className="ui checkbox" style={style} onClick={()=>this.onChecked()}>
            <input type="checkbox" onChange={()=>{}} value={checked} checked={checked} disabled={disabled}/>
            <label>{word}</label>
            {infoLabel}
         </div>
      );
   }
});
