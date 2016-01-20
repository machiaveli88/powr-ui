import React, {Component, PropTypes} from 'react';
import {Input, Check} from '../../../edits';

export default function (component) {
    return class Properties extends Component {
        render() {
            const {setProperty, title} = this.props;

            return (
                <div>
                    <p className="small hint-text m-b-20">Titel</p>
                    <Input updateValue={(v)=>setProperty('title', v)}
                           value={title || component.defaultProps['title']}/>
                </div>
            );
        }
    }
};
