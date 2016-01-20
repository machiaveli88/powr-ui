import React, {Component} from "react";
import Modal from "react-modal2";

export default class ModalComponent extends Component{
   static defaultProps = {
      visible: true
   }

   constructor(){
      super();
   }

   render() {
      const {children, title, close, save, visible} = this.props;

      const titleComponent = title ? (
         <h1 className="ui left aligned header" style={{margin: 0}}>
            {title}
         </h1>
      ) : null;

      if(!visible){
         return null;
      }
      return (
         <Modal
            onClose={()=>close ? close() : null}
            closeOnEsc={true}
            closeOnBackdropClick={true}
            backdropClassName='ui dimmer modals page transition visible active'
            modalClassName='ui small modal transition visible scrolling'>
            <div className="ui small test modal transition visible active scrolling modalWithoutBorderInner" style={{minHeight: "200px"}}>
               <div className="ui segment basic">
                  {titleComponent}
                  {children}
               </div>
               <div className="actions">
                  {close ? <div className="ui black deny right labeled icon button" onClick={()=>close()}>
                     Abbruch
                     <i className="remove icon"></i>
                  </div> : null}
                  {save ? <div className="ui positive right labeled icon button" onClick={()=>save()}>
                     Speichern
                     <i className="checkmark icon"></i>
                  </div> : null}
               </div>
            </div>
         </Modal>
      );
   }
}
