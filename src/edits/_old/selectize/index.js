var React = require('react');
var Select = require('react-selectize');
var SimpleSelect = Select.SimpleSelect;
var MultiSelect = Select.MultiSelect;

if (BROWSER) {
   require('react-selectize/src/index.css');
   require('./style.less');
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
   fetchOptions: function(search, callback) {
      const {fetch} = this.props;
      /*self.setState({search: search}, callback);
      if (search.length == 0)
         return;
      if (!!self.req)
         self.req.abort();
      url = "http://api.cdnjs.com/libraries?fields=version,homepage&search=" + search;
      self.req = $.getJSON(url).done(function(result){
         self.setState({libraries: take(50, result.results)}, function(){
            self.refs.select.highlightFirstSelectableOption();
         })
         delete self.req;
      });*/

      fetch(search).then((items) =>{
         console.log(items);
         this.setState({
            options: items.map(item=>{return {label: item.name, value: item.name}})
         });
      }).catch((err)=>console.error(err));
   },
   render: function () {
      const {options, tags, value} = this.props;
      const options2 = this.state.options;

      var items = (options || options2).map(function (item) {
         let {label, name, value} = item;
         let v = value !== undefined && value !== null ? value : 'null';
         return {label: label || name || value, value};
      });

      if(tags){
         return <MultiSelect
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
            onSearchChange={this.fetchOptions.bind(this)}/>
      }
      return (
         <SimpleSelect
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
            onSearchChange={this.fetchOptions.bind(this)}/>
      );
   }
});

module.exports = Component;
