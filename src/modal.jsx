import React, {Component} from "react";
import Modal from "react-modal2";

export default class ModalComponent extends Component{
   static defaultProps = {
      visible: true,
      blank: true
   }

   constructor(){
      super();
   }

   render() {
      let {children, title, close, save, visible, blank} = this.props;

      if(children && children.length === 1){
         console.log(children);
      }

      const titleComponent = title ? (
         <h1 className="ui left aligned header" style={{margin: 0}}>
            {title}
         </h1>
      ) : null;

      if(!visible){
         return null;
      }

      var inner;
      if(!blank){
         inner = (
            <ModalComponent.Container>
               <ModalComponent.Content>
                  {titleComponent}
                  {children}
               </ModalComponent.Content>
               <ModalComponent.Buttons>
                  {close ? <ModalComponent.Button color="black" onClick={()=>close()}>
                     Abbruch
                     <i className="remove icon"></i>
                  </ModalComponent.Button> : null}
                  {save ? <ModalComponent.Button color="positive" onClick={()=>save()}>
                     Speichern
                     <i className="checkmark icon"></i>
                  </ModalComponent.Button> : null}
               </ModalComponent.Buttons>
            </ModalComponent.Container>
         );
      }
      else{
         inner = children;
      }
      return (
         <Modal onClose={()=>close ? close() : null} closeOnEsc={true} closeOnBackdropClick={true}
            backdropClassName='ui dimmer modals page transition visible active' modalClassName='ui small modal transition visible scrolling'>
            {inner}
         </Modal>
      );
   }
}

ModalComponent.Buttons = function(props){
   return (
      <div className="actions">
         {props.children}
      </div>
   )
}
ModalComponent.Button = function(props){
   return (
      <div className={"ui "+props.color+" deny right labeled icon button"} onClick={props.onClick}>
         {props.title || props.label || props.children}
         {props.icon ? <i className={props.icon + " icon"}></i> : null}
      </div>
   )
}
ModalComponent.Content = function(props){
   return (
      <div className="ui segment basic">
         {props.children}
      </div>
   )
}
ModalComponent.Container = function(props){
   return (
      <div className="ui small test modal transition visible active scrolling modalWithoutBorderInner" style={{minHeight: "200px"}}>
         {props.children}
      </div>
   )
}
