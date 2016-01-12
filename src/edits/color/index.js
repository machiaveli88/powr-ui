import React from "react";

export default React.createClass({
   getDefaultProps: function () {
      return {}
   },
   changed: function (e) {
      const {updateValue} = this.props;
      updateValue(e.target.value);
   },
   render: function () {
      const {lines, placeholder, description, value, required, type, icon} = this.props;

      const input = <input type="color"
                           placeholder={placeholder || description}
                           onChange={this.changed}
                           value={value}
                           required={required}/>;
      if (icon) {
         return (
            <div className="ui icon input">
               <i className={icon + " icon"}></i>
               {input}
            </div>
         )
      }
      return input;
   }
});
