import React, {Component, PropTypes} from 'react';

class EmptyBlock extends Component{
   static defaultProps = {
   };

   render(){
      const {block, update} = this.props;
      return (
         <pre><strong>Could not find Component:</strong> {block.type}<br/></pre>
      );
   }
};

export default EmptyBlock;
