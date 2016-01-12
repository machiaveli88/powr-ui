import React, {Component, PropTypes} from 'react';
import {Gmap, Check, Input} from 'powr-ui/edits';

export default function(component){
   return class Properties extends Component{
      constructor() {
         super();
         this.helpers = Gmap.helpers();
         this.state = {};
      }
      onChange(e){
         const {setProperty} = this.props;
         this.setState({
            searchText: e
         });
         this.helpers.search(e).then((address)=>{
            setProperty('address', {...address});
         });
         //updateValue={(v)=>setProperty('address', v)}
      }
      render(){
         const {setProperty, address, small} = this.props;
         const {searchText} = this.state;
         const SearchEditor = Gmap.searchEditor;
         return (
            <div>
               <Check updateValue={(v)=>setProperty('small', v)}
                      title={'Schmal'}
                      value={small || component.defaultProps['small']}/>
               <p className="small hint-text m-b-20">Adresse</p>
               <Input placeholder="Neue Adresse suchen ..." value={searchText} updateValue={this.onChange.bind(this)}/>
               <br/>
               <pre>{address && address.address ? address.address : component.defaultProps['address']}</pre>
            </div>
         );
      }
   }
};
