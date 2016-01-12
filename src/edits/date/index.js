import React, {Component, PropTypes} from "react";
import moment from 'moment';
import MaskedInput from "../masked-input";
import ReactDOM from 'react-dom';

import ShortId from 'shortid';

if(BROWSER){
   require('./classic.less');
   require('./classic.date.less');
   require('./input.less');
}

class DateEdit extends Component {
   constructor(){
      super();
   }
   static defaultProps = {
      style: {}
   }
   componentDidMount(){
      var input = ReactDOM.findDOMNode(this.refs.picker);
      var $input = $(input);
      input.onfocus = ()=>{
         $input.pickadate({
            editable: true,
            format: 'dd.mm.yyyy',
            monthsFull: ['Januar', 'Februar', 'März', 'April', 'Mai', 'Juni', 'Juli', 'August', 'September', 'Oktober', 'November', 'Dezember'],
            monthsShort: ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'],
            weekdaysFull: ['Sonntag', 'Montag', 'Dienstag', 'Mittwoch', 'Donnerstag', 'Freitag', 'Samstag'],
            weekdaysShort: ['So', 'Mo', 'Di', 'Mi', 'Do', 'Fr', 'Sa'],
            showMonthsShort: undefined,
            showWeekdaysFull: undefined,
            today: 'Heute',
            clear: 'Leeren',
            close: 'Schließen',
            labelMonthNext: 'Nächster Monat',
            labelMonthPrev: 'Letzter Monat',
            labelMonthSelect: 'Monat auswählen',
            labelYearSelect: 'Jahr auswählen',
            selectYears: true,
            selectMonths: true,
            onSet: this.changedFromDatepicker.bind(this),
            onOpen: ()=>{
               this.pickerOpened = true;
            },
            onClose: ()=>{
               this.pickerOpened = true;
               if(!this.editFocused){
                  $input.pickadate('picker').stop();
               }
            }
         });
         this.editFocused = true;
      };
      input.onblur = ()=>{
         this.editFocused = false;
         if(!this.pickerOpened){
            $input.pickadate('picker').stop();
         }
      };
   }
   componentWillUnmount(){
      var input = ReactDOM.findDOMNode(this.refs.picker);
      var $input = $(input);
      if($input.pickadate('picker')){
         $input.pickadate('picker').stop();
      }
   }
   /*shouldComponentUpdate(){
    //return false;
    return false;
    }*/
   /*componentWillUpdate(){
    var input = $(React.findDOMNode(this.refs[this.pickerName]));
    input.pickadate().stop();
    //this.datePicker.stop();
    }*/
   /*componentDidUpdate(){
    this.attachPickadate(this.props);
    }*/
   changedFromDatepicker(v) {
      if(this.blockUpdate){
         return;
      }
      this.blockUpdate = true;
      const {updateValue} = this.props;

      var m = moment(v.select);
      var date = m.toDate();
      var formatted = m.format('DD.MM.YYYY');

      updateValue(date);
      this.blockUpdate = false;
   }
   changedFromMasked(v) {
      if(this.blockUpdate){
         return;
      }
      this.blockUpdate = true;
      const {updateValue} = this.props;

      var m = moment(v.target.value, 'DD.MM.YYYY');
      var date = m.toDate();
      var formatted = m.format('DD.MM.YYYY');

      // this.datePicker.set('select', date);
      var input = $(ReactDOM.findDOMNode(this.refs.picker));
      input.pickadate('picker').set('highlight', date)
      // this.datePicker.pickadate(this.pickerName).set('highlight', date);

      updateValue(date);
      this.blockUpdate = false;
   }
   render() {
      const {style, updateValue, value} = this.props;

      let m = moment(value || moment(new Date()).utc().startOf('day'));

      if (SERVER) {
         return null;
      }

      style.position = 'relative';
      return (
         <div style={style}>
            <MaskedInput value={m.format('DD.MM.YYYY')}
                         ref={'picker'}
                         pattern="11.11.1111"
                         placeholder="tt.mm.jjjj"
                         onChange={this.changedFromMasked.bind(this)}/>
         </div>
      );
   }
}

export default DateEdit;
