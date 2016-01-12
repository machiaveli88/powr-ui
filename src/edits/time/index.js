import React, {Component, PropTypes} from "react";
import moment from 'moment';
import MaskedInput from "../masked-input";
import ReactDOM from 'react-dom';

import ShortId from 'shortid';

if(BROWSER){
   require('./classic.time.less');
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
         $input.pickatime({
            editable: true,
            format: 'HH:i',
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
                  $input.pickatime('picker').stop();
               }
            }
         });
         this.editFocused = true;
      };
      input.onblur = ()=>{
         this.editFocused = false;
         if(!this.pickerOpened){
            $input.pickatime('picker').stop();
         }
      };
   }
   componentWillUnmount(){
      var input = ReactDOM.findDOMNode(this.refs.picker);
      var $input = $(input);
      if($input.pickatime('picker')){
         $input.pickatime('picker').stop();
      }
   }
   /*shouldComponentUpdate(){
      //return false;
      return false;
   }*/
   /*componentWillUpdate(){
      var input = $(React.findDOMNode(this.refs[this.pickerName]));
      input.pickatime().stop();
      //this.datePicker.stop();
   }*/
   /*componentDidUpdate(){
      this.attachpickatime(this.props);
   }*/
   changedFromDatepicker(v) {
      if(this.blockUpdate){
         return;
      }
      this.blockUpdate = true;
      const {updateValue, value} = this.props;

      var m = moment(value).startOf('day').add(v.select, 'minutes');
      var date = m.toDate();

      updateValue(date);
      this.blockUpdate = false;
   }
   changedFromMasked(v) {
      if(this.blockUpdate){
         return;
      }
      this.blockUpdate = true;
      console.log(v);
      const {updateValue, value} = this.props;

      var m = moment(v.target.value, 'DD.MM.YYYY');
      var date = m.toDate();
      var formatted = m.format('DD.MM.YYYY');

      // this.datePicker.set('select', date);
      var input = $(ReactDOM.findDOMNode(this.refs.picker));
      input.pickatime('picker').set('highlight', date)
      // this.datePicker.pickatime(this.pickerName).set('highlight', date);

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
            <MaskedInput value={m.format('HH:mm')}
                      ref={'picker'}
                      pattern="11:11"
                      placeholder="ss:mm"
                      onChange={this.changedFromMasked.bind(this)}/>
         </div>
      );
   }
}

export default DateEdit;
