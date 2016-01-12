import React, {Component, PropTypes} from "react";
import Date from "../date";
import Time from "../time";
import Check from "../check";
import Select from "../select";
import Elessar from "../time-range";
//import DatePicker from ereact-datepicker";
import moment from "moment";


class DateMultiEdit extends Component {
   constructor(props){
      super();

      const {end, start} = props;
      var mode = 0;
      if(end && mode === 0){
         if(moment(start).format('DD.MM.YYYY') === moment(end).format('DD.MM.YYYY')){
            mode = 1;
         }
         else {
            mode = 2;
         }
      }
      this.state = {
         mode
      };
   }
   static defaultProps = {
      type: "text",
      placeholder: null,
      onChange: null,
      required: false,
      start: null,
      end: null
   }
   setMode(mode){
      console.log('Set mode');
      const {updateStart, updateEnd, start} = this.props;
      this.setState({mode: mode});
      if(mode === 2){
         updateEnd(moment(start).startOf('day').add(1, 'day').toDate());
      }
      else{
         updateEnd(null);
      }
   }
   updateStart(value){
      const {updateStart, updateBoth, start, end} = this.props;
      const {mode} = this.state;
      console.log('updateStart');
      if(mode === 0){
         console.log('mode 0', moment(value).startOf('day').format('DD.MM.YYYY'));
         updateStart(moment(value).startOf('day').toDate());
      }
      else if(mode === 1){
         const difference = moment(end).diff(moment(start));
         const duration = moment.duration(difference);
         console.log('mode 1');
         updateBoth(moment(value).toDate(), moment(value).add(duration.asMinutes(), 'minutes').toDate());
      }
      else if(mode === 2){
         var day = moment(value);
         if(moment(end).startOf('day') <= moment(day).startOf('day')){
            console.log('mode 2 too small', moment(end).startOf('day').format('DD.MM.YYYY'), day.format('DD.MM.YYYY'));
            updateBoth(day.toDate(), moment(day).startOf('day').add(1, 'day'));
         }
         else{
            console.log('mode 2 not too small', moment(end).startOf('day').format('DD.MM.YYYY'), day.format('DD.MM.YYYY'));
            updateStart(day.toDate());
         }
      }
   }
   updateEnd(value){
      const {updateEnd, updateBoth, start, end} = this.props;
      var day = moment(value).startOf('day');
      console.log('updateEnd');
      if(moment(value).startOf('day') <= moment(start).startOf('day')){
         console.log('too small', moment(value).startOf('day').format('DD.MM.YYYY'), moment(start).startOf('day').format('DD.MM.YYYY'))
         updateEnd(moment(start).add(1, 'day').toDate());
      }
      else{
         console.log('not too small', moment(value).startOf('day').format('DD.MM.YYYY'), moment(start).startOf('day').format('DD.MM.YYYY'))
         updateEnd(moment(value).toDate());
      }
   }
   updateTime(value){
      console.log('Update time');
      const {updateBoth, start} = this.props;
      var startFormatted = moment(start).utc().format('DD.MM.YYYY');
      var newStart = moment(startFormatted + ' ' + value.split('-')[0], 'DD.MM.YYYY HH:mm').utc().toDate();
      var newEnd = moment(startFormatted + ' ' + value.split('-')[1], 'DD.MM.YYYY HH:mm').utc().toDate();
      updateBoth(newStart, newEnd);
   }
   render() {
      if (SERVER) {
         return null;
      }
      const {placeholder, description, start, end, required, type, updateStart, updateEnd} = this.props;
      const {mode} = this.state;

      const modes = [{
         name: 'Einfach, kein Ende',
         value: 0
      },{
         name: 'Zeitraum, 1 Tag',
         value: 1
      },{
         name: 'Zeitraum, länger',
         value: 2
      }];

      var elessar = !end ? null : moment(start).utc().format('HH:mm') + '-' + moment(end).utc().format('HH:mm');
      return (
         <div>
            <Date value={start} updateValue={this.updateStart.bind(this)} style={{display: 'inline-block', width: '100px'}}/>
            {mode === 2 ? <Time value={start} updateValue={this.updateStart.bind(this)} style={{display: 'inline-block', marginLeft: '10px', width: '75px'}}/> : null}
            {mode === 2 ? <Date value={end} updateValue={this.updateEnd.bind(this)} style={{display: 'inline-block', marginLeft: '10px', width: '100px'}}/> : null}
            {mode === 2 ? <Time value={end} updateValue={this.updateEnd.bind(this)} style={{display: 'inline-block', marginLeft: '10px', width: '75px'}}/> : null}
            <Select options={modes} value={mode} updateValue={(mode)=>this.setMode(mode)} style={{display: 'inline-block', marginLeft: '10px', width: '150px', position: 'relative', top: '-1px'}}/>
            {mode === 1 ? <div><p></p><Elessar times={1} updateValue={this.updateTime.bind(this)} value={elessar} /></div> : null}
         </div>
      );
   }
}

export default DateMultiEdit;
