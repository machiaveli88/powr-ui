var React = require('react');
import ReactDOM from 'react-dom';

var ShowOnHover = require('powr-utils/mixins/show-on-hover');
var NotyOnHover = require('powr-utils/mixins/noty-on-hover');

var SortableMixin = {};
if(typeof window !== 'undefined'){
    SortableMixin = require('powr-utils/mixins/react-sortable');
}

var drag = false;
var Uploader = React.createClass({
    mixins: [SortableMixin],
    sortableOptions: { ref: "list", model: "items", group: "upload_files" },

    getDefaultProps: function() {
        return {
            context: "default",
            persist: true,
            folder: null,
            protected: "protected",
            preview: "preview",
            image: "original"
        };
    },

    getInitialState: function () {
        return {
            items: this.props.value || [],
            itemsInProgress: {},
            dragging: false,
            acceptedTypes: {
                'image/png': true,
                'image/jpeg': true,
                'image/gif': true
            }
        };
    },

    // http://html5demos.com/dnd-upload#view-source
    readfiles: function(files) {
        var upload = function(file, index, self){
            var formData = new FormData();
            formData.append('file', file);
            var xhr = new XMLHttpRequest();
            if(self.props.folder){
                xhr.open('POST', '/upload/' + self.props.context + "/" + self.props.folder + "?persist=" + self.props.persist);
            }
            else{
                xhr.open('POST', '/upload/' + self.props.context + "?persist=" + self.props.persist);
            }
            xhr.onreadystatechange = function() {
                if (xhr.readyState == 4) {
                    var arr = self.state.items;
                    arr.push(JSON.parse(xhr.responseText));
                    self.setState({items: arr});
                    self.onChanged();
                }
            }
            xhr.onload = function(e) {
                var arr = self.state.itemsInProgress;
                delete arr[index];
                self.setState({itemsInProgress: arr});
                //self.setState({progress: null});
            };
            if ("upload" in new XMLHttpRequest) {
                xhr.upload.onprogress = function (event) {
                    if (event.lengthComputable) {
                        var complete = (event.loaded / event.total * 100 | 0);
                        //self.setState({progress: complete});
                        var arr = self.state.itemsInProgress;
                        arr[index].progress = complete;
                        self.setState({itemsInProgress: arr});
                    }
                }
            }

            var arr = self.state.itemsInProgress;
            arr[index] = {
                progress: 0
            }
            self.setState({itemsInProgress: arr});

            xhr.send(formData);
        }
        if (!!window.FormData) {
            for (var i = 0; i < files.length; i++) {
                upload(files[i], i, this);
            }
        }
    },

    componentDidMount: function(){
        if(typeof window !== 'undefined'){
            var holder = this.refs.dropzone;

            var self = this;
            // Can Drag & Drop?
            if ('draggable' in document.createElement('span')) {
                holder.ondragover = function (e) {
                    //if(e.srcElement.nodeName === "DIV") return;
                    console.log(e);
                    self.setState({dragging: true}); return false;
                };
                holder.ondragend = function (e) {
                    //if(e.srcElement.nodeName === "DIV") return;
                    self.setState({dragging: false});
                    return false;
                };
                holder.ondragleave = function (e) {
                    self.setState({dragging: false});
                    return false;
                };
                holder.ondrop = function (e) {
                    //if(e.srcElement.nodeName === "DIV") return;
                    self.setState({dragging: false});
                    e.preventDefault();
                    self.readfiles(e.dataTransfer.files);
                    if(self.filesDropped){
                        self.filesDropped(e.dataTransfer.files);
                    }
                }
            }
            if(this.refs.input){
                var fileupload = ReactDOM.findDOMNode(this.refs.input);
                fileupload.onchange = function () {
                    self.readfiles(this.files);
                };
            }
        }
    },
    componentWillReceiveProps: function(newProps){
        this.setState({items: newProps.value || []});
    },
    componentWillUnmount: function(){
    },
    onChanged: function(e){
        this.props.updateValue(this.state.items);
    },
    handleSort: function(e){
        this.onChanged();
        return false;
    },
    deleteFile: function(index){
        var arr = this.state.items.slice();
        arr.splice(index, 1);
        /*this.setState({
            items: arr
        });*/

        this.props.updateValue(arr);
    },

    /*a.btn.btn-xs.btn-default(ng-click='deleteImage(file)', href='javascript:void(0);')
     i.fa.fa-trash-o
     a.btn.btn-xs.btn-default(href='{{getThumb(file.link)}}', target="_blank")
     i.fa.fa-eye
     a.btn.btn-xs.btn-default(href='{{getThumb(file.link)}}', target="_blank", download="{{file.name}}")
     i.fa.fa-download*/
    render: function () {
        var self = this;
        var style = {overflow:"auto"};
        if(this.state.dragging){
            style.border = "2px dashed gray";
        }
        return (
            <div ref="dropzone" style={style}>
                <div ref="list">
                    {this.state.items.map(function(item, index){
                        console.log(item);
                        var file = "/dl/" + item.context + "/" + item[self.props.image];
						if(self.props.folder){
							file = "/dl/" + item.context + "/" + self.props.folder + "/" + item[self.props.image];
						}
                        return (
                            <div className="col-md-2" key={item.link}>
                                <ShowOnHover>
                                    <div style={{ position: "absolute", left: "10px", top: "0px", zIndex:"1000" }} className="btn-group">
                                        <NotyOnHover onClick={()=>self.deleteFile(index)} text="&lt;i class=&quot;icon-pencil&quot;/&gt; Klicken zum &lt;strong&gt;löschen&lt;/strong&gt;." className="btn btn-xs btn-default">
                                            <i className="fa fa-trash-o"></i>
                                        </NotyOnHover>
                                        <NotyOnHover onClick={()=>{}} text="&lt;i class=&quot;icon-comments&quot;/&gt; Klicken um im Browser zu &lt;strong&gt;sehen&lt;/strong&gt;" className="btn btn-xs btn-default">
                                            <a href={file + "?type=pdf"} target="_blank"><i className="fa fa-eye" /></a>
                                        </NotyOnHover>
                                        <NotyOnHover text="&lt;i class=&quot;icon-filter&quot;/&gt; Klicken zum &lt;strong&gt;herunterladen&lt;/strong&gt;." className="btn btn-xs btn-default">
                                            <a href={file} target="_blank" download={item.name}><i className="fa fa-download" /></a>
                                        </NotyOnHover>
                                    </div>
                                </ShowOnHover>
                                <div style={{minWidth: "100px"}} ng-show="!file.progress || file.progress == 100" className="image">
                                    <img src={file + "?type=img&w=100&h=100&q=75"} alt="" title="" width="100" height="100" />
                                </div>
                            </div>
                        );
                    })}
                </div>
                {Object.keys(this.state.itemsInProgress).map(function(i){
                    var item = self.state.itemsInProgress[i];
                    return (
                        <div className="col-md-2" key={i}>
                            <div style={{width:"100%",textAlign:"center"}}>
                                <span>{item.progress}</span>
                            </div>
                        </div>
                    );
                })}
                <div className="col-md-2" ref="uploader">
                    <a onClick={(e)=>{$(self.refs.input).trigger('click');}} href='javascript:void(0)'>
                        <div ng-show="file.progress &amp;&amp; file.progress != 100" style={{display:"table",width: "100%"}}>
                            <div style={{display: "table-cell", verticalAlign: "middle"}} className="spinner">
                                <i className="fa fa-file-o" />
                            </div>
                        </div>
                        <div style={{width:"100%",textAlign:"center"}} ng-show="file.progress &amp;&amp; file.progress &lt; 99" className="div">
                            <span>{this.state.dragging ? "Jetzt fallen lassen" : "Drag & Drop oder klicken für upload"}</span>
                        </div>
                    </a>
                </div>
                <input type="file" ref="input" style={{ display:"block", height:0, width:0 }} multiple />
            </div>
        );
    }
});

module.exports = Uploader;
