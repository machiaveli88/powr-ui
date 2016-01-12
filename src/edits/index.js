var edits = {
   Color: require("./color"),
   Date: require("./date"),
   Time: require("./time"),
   MaskedInput: require("./masked-input"),
   DateRange: require("./date-range"),
   Input: require("./input"),
   Medium: require("./medium"),
   Check: require("./check"),
   SelectButton: require("./select-button"),
   Select: require("./select"),
   Select2: require("./select2"),
   Json: require("./json"),
   Image: require("./image"),
   Gmap: require("./gmap"),
   TimeRange: require("./time-range"),
   CheckGroup: require("./check-group"),
   // Functions
   add: (name, edit)=> {
      edits[name] = edit;
   },
   get: (name)=> {
      if(!name){
         return null;
      }
      for (var key in edits) {
         if (key.toLowerCase() === name.toLowerCase()) {
            return edits[key];
         }
      }
      return null;
   }
};
edits.String = edits.Text =  edits.Input;
edits.Bool = edits.Boolean = edits.Check;
edits.RichText = edits.Medium;
edits.Wysiwyg = edits.Medium;
export default edits;
