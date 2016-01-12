import React, {Component} from "react";
import ShortId from "shortid";
import {Link} from "react-router";
var Tooltip = require('rc-tooltip');

export default class AnyButton extends Component{
   static defaultProps = {
      color: "default",
      onClick: null,
      icon: "cog",
      size: "lg",
      rounded: true,
      bottom: false,
      row: 1,
      show: false
   }

   constructor(){
      super();
      this.state = {shortId: ShortId.generate()};
   }

   componentDidMount() {
      const {show} = this.props;
      const {popover} = this.refs;

      if (show && popover) {
         popover.show();
      }
   }

   render() {
      const {color, onClick, icon, rounded, size, link, params, row, bottom, tooltip, popover, popoverTitle,children} = this.props;

      let i = icon ? (
         <i className={"icon " + icon}/>
      ) : null;

      var classes = "ui label";
      if (color) {
         classes += " " + color;
      }

      var style = {
         position: "fixed",
         zIndex: 20,
         right: "20px",
         [bottom ? "bottom" : "top"]: (30 * row + 10) + "px"
      }

      let e;
      if (link) {
         e = (
            <Link className={classes} params={params} to={link} style={style}>
               {i}
               {tooltip}
            </Link>
         );
      }
      else {
         e = (
            <a className={classes} onClick={onClick} style={style}>
               {i}
               {tooltip}
            </a>
         );
      }

      if(popover){
         return (
            <Tooltip overlayClassName="ui popup left center visible"
                     placement={"left"}
                     destroyTooltipOnHide={true}
                     trigger={['hover']}
                     align={{offset:[-4, 0]}}
                     mouseLeaveDelay={0.03}
                     mouseEnterDelay={0}
                     overlay={popover}>
               {e}
            </Tooltip>
         );
      }
      else{
         return e;
      }
   }
}
