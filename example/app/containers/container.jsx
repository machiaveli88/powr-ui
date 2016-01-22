import React, { Component, PropTypes } from "react";
import {Meta} from "powr-utils/meta";
import {Link} from "react-router";

export default class Container extends Component {
   render() {
      return (
         <div>
            <Meta styles={['/css/semantic.min.css']}/>
            <ul>
               <li>
                  <Link to="/">Hello</Link>
               </li>
               <li>
                  <Link to="/edits">Edits</Link>
               </li>
               <li>
                  <Link to="/blocks">Blocks</Link>
               </li>
               <li>
                  <Link to="/tooltip">Tooltip</Link>
               </li>
               <li>
                  <Link to="/modal">Modal</Link>
               </li>
            </ul>
            <br/>
            {this.props.children}
         </div>
      );
   }
}
