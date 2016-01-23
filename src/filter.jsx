import React, {Component} from "react";

import Select from "./edits/select";
import Select2 from "./edits/select2";

if (BROWSER) {
   require("./filter.less");
}

class FilterComponent extends Component {

   render() {
      var testDaten = [
         {
            name: "Aufenthalt",
            type: "DateRange"
         }, {
            name: "Abflugstag",
            type: "Date"
         }, {
            name: "Hotel",
            type: "Text"
         }, {
            name: "Preis",
            type: "Integer"
         }
      ];

      return (
         <FilterGruppe data={testDaten} name="" level={0} number={0}/>
      );
   }
}

class FilterGruppe extends Component {
   constructor() {
      super();
      this.state = {
         or: false,
         childs: []
      }
   }

   getColor() {
      var colors = [
         "red",
         "orange",
         "yellow",
         "olive",
         "green",
         "teal",
         "blue",
         "violet",
         "purple",
         "pink"
      ];

      var colorNumber = this.props.level;

      while (colorNumber > colors.length) {
         colorNumber -= colors.length;
      }
      return colors[colorNumber];
   }

   addGroup() {
      this.setState({childs: [...this.state.childs, {type: "group"}]})
   }

   addRule() {
      this.setState({childs: [...this.state.childs, {type: "rule"}]})
   }

   render() {
      var groupName = this.props.name + String.fromCharCode(65 + this.props.number);

      return (
         <div className={"ui fluid " + this.getColor() + " card filterGroup"}>

            <div className="extra content">
               <a className={"ui left floated " + this.getColor() + " label "}>Gruppe #{groupName}</a>
               <div className={"ui mini " + this.getColor() + " right floated buttons"}>
                  <button className={"ui button" + (this.state.or ? "" : " active")}
                          onClick={()=>this.setState({or: false})}>UND
                  </button>
                  <button className={"ui button" + (!this.state.or ? "" : " active")}
                          onClick={()=>this.setState({or: true})}>ODER
                  </button>
               </div>
            </div>
            {this.state.childs.map(function (item, index) {
               if (item.type === "group") {
                  return <FilterGruppe data={this.props.data} name={groupName} number={index}
                                       level={this.props.level + 1} key={index}/>
               }

               if (item.type === "rule") {
                  return <FilterRegel data={this.props.data} name={groupName} number={index} key={index}/>
               }

               return null;
            }.bind(this))}
            <div className="extra content">
               <div className={"ui mini " + this.getColor() + " right floated buttons"}>
                  <button className="ui button" onClick={()=>this.addRule()}>Neue Regel</button>
                  <button className="ui button" onClick={()=>this.addGroup()}>Neue Gruppe</button>
               </div>
            </div>
         </div>
      );
   }
}

class FilterRegel extends Component {
   constructor() {
      super();
      this.state = {}
   }

   getByType() {
      // Operator
      var operator_standart = [
         {
            name: "ist"
         }, {
            name: "größer als"
         }, {
            name: "kleiner als"
         }
      ];

      // Types
      var type = {};

      type.Date = [
         {
            name: "Tag",
            nextElement: operator_standart
         }, {
            name: "Woche",
            nextElement: operator_standart
         }, {
            name: "Monat",
            nextElement: operator_standart
         }
      ];

      type.DateRange = [
         {
            name: "Länge",
            nextElement: operator_standart
         },
         ...type.Date
      ];


      /*
       ,
       operator: [
       {
       name: "ist gleich"
       }, {
       name: "größer gleich"
       }, {
       name: "kleiner gleich"
       }
       ],
       selector: [
       {
       name: "Datum",
       editor: "DatePicker"
       },
       {
       name: "Vor...",
       editor: "Input",
       unit: [
       {
       name: "Millisekunden",
       factor: 1
       }, {
       name: "Sekunden",
       factor: 1000
       }, {
       name: "Minuten",
       factor: 60000
       }, {
       name: "Stunden",
       factor: 3600000
       }, {
       name: "Tage",
       factor: 25200000
       }, {
       name: "Wochen",
       factor: 176400000
       }
       ]
       },
       ] */

      return type;
   };

   //console.log(this.getByType()["Date"]);

   render() {
      var test = this.state.select ?
         <FilterInput data={this.getByType()[this.state.select]}/> : null;

      return (
         <div className="content filterRule">
            <div className="header">Regel #{this.props.name + (this.props.number + 1)}</div>
            <div className="description">
               <Select updateValue={v=>this.setState({select:v})} value={this.state.select}
                       options={[...this.props.data.map(field=>({value: field.type, label: field.name}))]}/>
               {test}
            </div>
         </div>
      );
   }
}

class FilterInput extends Component {
   constructor() {
      super();
      this.state = {}
   }

   render() {
      console.log(this.props.data);

      var test = this.props.data[this.state.value] ?
         <FilterInput data={this.props.data[this.state.value]}/> : null;

      return (
         <div>
            <Select updateValue={v=>this.setState({value:v})} value={this.state.value}
                    options={[...this.props.data.map(field=>({value: field.name, label: field.name}))]}/>
            {test}
         </div>
      );
   }
}

export default FilterComponent;
