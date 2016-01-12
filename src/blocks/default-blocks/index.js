var obj = {
   "Line": require("./line"),
   "Title": require("./title"),
   "Text": require("./text"),
   "Component-2": require("./component-2"),
   "Component-3": require("./component-3"),
   "Gmap": require("./gmap"),
   "Soundcloud": require("./soundcloud"),
   "Youtube": require("./youtube"),
   "Text-Component": require("./text-component"),
   "Quote": require("./quote")
};

obj.get = function (name) {
   if(!name){
      return null;
   }
   var item = obj[name];
   if(item){
      return item;
   }
   for(var key in obj){
      const edit = obj[key];
      if(edit.title && edit.title.toLowerCase() === name.toLowerCase()
         || key.toLowerCase() === name.toLowerCase()){
         return edit;
      }
   }
   return null;
}

obj.add = function (name, edit) {
   if(!edit){
      Object.keys(name).forEach(function(item){
         obj[item] = name[item];
      });
   }
   else{
      obj[name] = edit;
   }
}

module.exports = obj;
