var React = require('react');
var Select = require('react-select');

if (BROWSER) {
   require('./select2.less');
}

var Component = React.createClass({
   getInitialState: function () {
      return {};
   },
   getDefaultProps: function () {
      return {options: [], tags: false};
   },
   changed: function (val) {
      const {updateValue} = this.props;
      updateValue(val);
   },
   fetchOptions: function(fetch) {
      return (input, callback) => {
         fetch.then((items) =>{
            if(this.isMounted()){
               callback(null, {
                  options: items.map(item=>{return {label: item.name, value: item.name}}),
                  complete: true
               });
            }
         }).catch((err)=>console.error(err));
      }
   },
   render: function () {
      const {options, tags, value, fetch} = this.props;

      const getOptions = fetch ? this.fetchOptions(fetch) : null;
      var items = options.map(function (item) {
         let {label, name, value} = item;
         let v = value !== undefined && value !== null ? value : 'null';
         return {label: label || name || value, value};
      });
      if(tags){
         return <Select
            placeholder={'Klicken zum Suchen ...'}
            clearValueText={'Leeren'}
            clearAllText={'Alle löschen'}
            noResultsText={'Keine Ergebnisse'}
            searchPromptText={'Tippen und "Enter" zum Hinzufügen'}
            addLabelText={'"{label}" hinzufügen ...'}
            value={value ? value.join(',') : ''}
            delimiter=','
            multi={true}
            allowCreate={true}
            options={options}
            onChange={(val)=>{this.changed(val ? val.split(',') : [])}}
            asyncOptions={getOptions}/>
      }
      return (
         <Select
            multi={true}
            placeholder={'Klicken zum Suchen ...'}
            clearValueText={'Leeren'}
            clearAllText={'Alle löschen'}
            noResultsText={'Keine Ergebnisse'}
            searchPromptText={'Tippen und "Enter" zum Hinzufügen'}
            addLabelText={'"{label}" hinzufügen ...'}
            onChange={this.changed}
            value={value || ''}
            name='form-field-name'
            options={items}
            asyncOptions={getOptions}/>
      );
   }
});

module.exports = Component;
