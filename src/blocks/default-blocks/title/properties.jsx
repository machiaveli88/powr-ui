import React, {Component, PropTypes} from 'react';
import {Check, Select, Input} from 'powr-ui/edits';
import {Dropcap, Size, Position} from '../_properties';

export default function (component) {
    return class Properties extends Component {
        render() {
            const {setProperty, subtitle, mega} = this.props;

            return (
                <div>
                    <Check updateValue={(v)=>setProperty('mega', v)}
                           title={'Größer'}
                           value={mega || component.defaultProps['mega']}/>
                    <Check updateValue={(v)=>setProperty('subtitle', v)}
                           title={'Untertitel'}
                           value={subtitle || component.defaultProps['subtitle']}/>
                </div>
            );
        }
    }
};
