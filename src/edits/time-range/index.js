var React = require('react');
import ReactDOM from 'react-dom';

if(BROWSER){
   require('./elessar.less');
   require('./elessar-theme.less');
}
var prevValue;
var Component = React.createClass({
    getDefaultProps: function(){
        return {
            times: Infinity,
            output: "string",
            start: 7,
            steps: 30,
            end: 21
        }
    },
    updateValue: function(value){
        this.value = value;
        this.props.updateValue(value);
    },
    append: function(props){
        const {multi, output, start, end, steps, times, value} = props;

        var self = this;
        var tstart = 0;
        var tend = (end - start) * (60/steps);

        var r = new RangeBar({
            values: [], // array of value pairs; each pair is the min and max of the range it creates
            readonly: false, // whether this bar is read-only
            min: tstart, // value at start of bar
            max: tend, // value at end of bar
            label: function (a) {
                return a[0] + "-" + a[1];
            },
            valueFormat: function (a) {
                var real = start + a / (60 / steps);
                var zahl = Math.floor(real);
                var rest = 60 * (real - zahl);
                return ("0" + zahl.toString()).slice(-2) + ":" + ("0" + rest.toString()).slice(-2);
            }, // formats a value on the bar for output
            valueParse: function (a) {
                return a;
            }, // parses an output value for the bar
            snap: 1, // clamps range ends to multiples of this value (in bar units)
            minSize: 1, // smallest allowed range (in bar units)
            maxRanges: times, // maximum number of ranges allowed on the bar
            /*bgMarks: {
             count: 0, // number of value labels to write in the background of the bar
             //interval: Infinity, // provide instead of count to specify the space between labels
             label: function(a){
             //return ("0" + a.toString()).slice(-2) + ":00";
             return ("0" + (a/2).toString()).slice(-2) + ":00";
             } // string or function to write as the text of a label. functions are called with normalised values.
             },*/
            bgLabels: end - start,
            indicator: null, // pass a function(RangeBar, Indicator, Function?) Value to calculate where to put a current indicator, calling the function whenever you want the position to be recalculated
            allowDelete: true, // set to true to enable double-middle-click-to-delete
            deleteTimeout: 5000, // maximum time in ms between middle clicks
            vertical: false, // if true the rangebar is aligned vertically, and given the class elessar-vertical
            bounds: null, // a function that provides an upper or lower bound when a range is being dragged. call with the range that is being moved, should return an object with an upper or lower key
            htmlLabel: true, // if true, range labels are written as html
            barClass: 'progress',
            rangeClass: 'bar'
        });

        this.range = r;
        $(ReactDOM.findDOMNode(this.refs.edit)).append(r.$el);

        r.on('change', function(ev, ranges) {
            var str = JSON.stringify(ranges);
            if(str !== prevValue){
                prevValue = str ;
                if(output === "string"){
                    self.updateValue(ranges.map((range)=>{
                        return range.join("-");
                    }).join(","));
                }
                else{
                    self.updateValue(ranges);
                }
            }
        });
        if(value){
            var v;
            //console.log(val);
            if(output === "string"){
                v = value.split(",").map(function(item){
                    var ret = item.split("-").map(function(item){
                        var zahlen = item.split(':');
                        var zahl = parseInt(zahlen[0]);
                        var rest = parseInt(zahlen[1]) / 60;
                        //return parseInt(item);
                        return (zahl + rest - start) * (60/steps);
                    });
                    return ret;
                });
            }
            else{
                v = value.map(function(item){
                    if(item.isArray) return item;
                    else if(item.indexOf(',') >= 0){
                        var ret = item.split(",").map(function(item){
                            var zahlen = item.split(':');
                            var zahl = parseInt(zahlen[0]);
                            var rest = parseInt(zahlen[1]) / 60;
                            //return parseInt(item);
                            return (zahl + rest - start) * (60/steps);
                        });
                        return ret;
                    }
                    else if(item.indexOf('-') >= 0){
                        var ret = item.split("-").map(function(item){
                            var zahlen = item.split(':');
                            var zahl = parseInt(zahlen[0]);
                            var rest = parseInt(zahlen[1]) / 60;
                            //return parseInt(item);
                            return (zahl + rest - start) * (60/steps);
                        });
                        return ret;
                    }
                    else return [item];
                });
            }
            //console.log(val);
            r.setVal(v);
        }
    },
    componentDidMount: function(){
        this.append(this.props);
    },

    componentWillReceiveProps: function(newProps){
        if(this.value !== newProps.value){
            this.value = newProps.value;
            this.range.$el.remove()
            this.append(newProps);
        }
        //if(newProps.model && newProps.model !== $(this.refs.edit.getDOMNode()).redactor('code.get'))
         //   $(this.refs.edit.getDOMNode()).redactor('code.set', newProps.model.text || newProps.model);
    },

    componentWillUnmount: function(){
        this.range.$el.remove();
    },

    render: function () {
        return (
            <div ref='edit' style={{height: "34px"}} />
        );
    }
});

module.exports = Component;
