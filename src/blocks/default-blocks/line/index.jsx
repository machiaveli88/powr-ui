import React, {Component, PropTypes} from 'react';
import Properties from './properties';

/*var Mixin = require("powr-utils/mixins/editor-mixin");

 var meta = {
 tag: "etc",
 title: "Linie",
 icon: "minus",
 namespace: "Default.Frontend",
 category: "Text",
 flags: ["Text"],
 dependencies: [],
 properties: {
 }
 };

 var Component = React.createClass({
 statics: meta,
 render: function () {
 return (
 <h4 className="ui horizontal divider header">Trenner{this.props.title}</h4>
 );
 }
 });

 module.exports = Mixin(Component);*/


class LineBlock extends Component {
    static title = 'Linie';
    static icon = 'minus';
    static category = 'Text';
    static propertyEdits = Properties(LineBlock);
    static defaultProps = {
        comment: "&nbsp;"
    };

    render() {
        const {title} = this.props;

        if (title) {
            return (
                <h4 className="ui horizontal divider header" style={{margin: "1em 0"}}>{title}</h4>
            );
        } else {
            return (
                <div className="ui divider" />
            );
        }
    }
}

export default LineBlock;

