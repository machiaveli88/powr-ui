import React from 'react';
import {Route} from 'react-router';
import Container from './containers/container';
import Default from './containers/default';
import Edits from './components/edits';
import Blocks from './components/blocks';
import Tooltip from './components/tooltip';
import Modal from './components/modal';

export default function(handler){
   return (
      <Route component={Container}>
         <Route path="/" component={Default}></Route>
         <Route path="/edits" component={Edits}></Route>
         <Route path="/blocks" component={Blocks}></Route>
         <Route path="/tooltip" component={Tooltip}></Route>
         <Route path="/modal" component={Modal}></Route>
      </Route>
   )
}
