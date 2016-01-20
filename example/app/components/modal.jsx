import React, { Component, PropTypes } from "react";
import Modal from "../../../src/modal";
import Lorem from "powr-utils/lorem";

export default class ModalExample extends Component {
   constructor() {
      super();
      this.state = {
         modal: false
      };
   }

   render() {
      const {modal} = this.state;
      return (
         <div>
            <Modal title={'Example'} visible={modal} save={()=>this.setState({modal: false})} close={()=>this.setState({modal: false})}>
               <p>{Lorem(2)}</p>
            </Modal>
            <a onClick={()=>this.setState({modal: true})}>Show modal</a>
         </div>
      );
   }
}
