import React, { Component, PropTypes } from "react";
import AnyButton from "../../../src/any-button";

export default class TooltipExample extends Component {
   constructor() {
      super();
   }

   render() {
      return (
         <div>
            <AnyButton popover={<span>Hi</span>}>Hi</AnyButton>
         </div>
      );
   }
}
