import React, { Component } from 'react';

import DatasetListItem from './DatasetListItem';


function Filter (props) {
    const value = props.value;
    const clicked = props.tests.indexOf(value) >= 0;
    
    var className = 'label label-default ';
    if (clicked)
        className += 'label-warning';
    
    return (
        <li onClick={props.onClick}><span className={className}>{value}</span></li>
    )
}

class DatasetList extends React.Component {
    constructor (props) {
        super(props);
        this.state = {
            sources: [],
            file_types: [],
            data_type_tags: [],
            name: ""
        }
    }
    
    handleClickDataTypeTag (o) {
        var list = this.state.data_type_tags;
        if (list.indexOf(o) >= 0) {
            list.splice(list.indexOf(o), 1);
        } else {
            list.push(o);
        }
        this.setState({data_type_tags: list});
    }
    
    handleClickFileType (o) {
        var list = this.state.file_types;
        if (list.indexOf(o) >= 0) {
            list.splice(list.indexOf(o), 1);
        } else {
            list.push(o);
        }
        this.setState({file_types: list});
    }
    
    handleClickSource (o) {
        var sources = this.state.sources;
        if (sources.indexOf(o) >= 0) {
            sources.splice(sources.indexOf(o), 1);
        } else {
            sources.push(o);
        }
        this.setState({sources: sources});
    }
    
    handleClearFilters () {
        this.setState({
            sources: [],
            file_types: [],
            data_type_tags: [],
            name: ""
        });
    }
    
    handleNameKeyUp (e) {
        this.setState({
            name: e.target.value
        });
    }
    
    render () {
        var db = window.db;
        const sourcesList = db.sources.map((o) =>
            <Filter onClick={this.handleClickSource.bind(this, o)} key={o} value={o} tests={this.state.sources} />
        )
        
        const fileTypeList = db.file_types.map((o) =>
            <Filter onClick={this.handleClickFileType.bind(this, o)} key={o} value={o} tests={this.state.file_types} />
        )
        
        const dataTypeList = db.data_type_tags.map((o) =>
            <Filter onClick={this.handleClickDataTypeTag.bind(this, o)} key={o} value={o} tests={this.state.data_type_tags} />
        )
        
        var data = db.data;
        
        if (this.state.sources.length > 0) {
            data = db.data.filter((o) =>
                this.state.sources.filter((selected) =>
                    o.source.indexOf(selected) !== -1
                ).length > 0
            )
        }
        
        if (this.state.file_types.length > 0) {
            data = db.data.filter((o) =>
                this.state.file_types.filter((selected) =>
                    o.file_type.indexOf(selected) !== -1
                ).length > 0
            )
        }
        
        if (this.state.data_type_tags.length > 0) {
            data = db.data.filter((o) =>
                this.state.data_type_tags.filter((selected) =>
                    o.data_type_tag.indexOf(selected) !== -1
                ).length > 0
            )
        }
        
        if (this.state.name.length > 0) {
            data = db.data.filter((o) =>
                // how to: advanced search regardless of word order
                // turn dataset name into array
                // turn search name into array
                // filter datasets for list intersection (must contain all search names)
                o.name.toLowerCase().search(this.state.name.toLowerCase()) >= 0 ||
                o.description.toLowerCase().search(this.state.name.toLowerCase()) >= 0
            )
        }
        
        const datasetItems = data.map((dataset) =>
            <DatasetListItem key={dataset.name} dataset={dataset} sources={this.state.sources}
                file_types={this.state.file_types} data_type_tags={this.state.data_type_tags} />
        )
        
        const showing = data.length;
        const total = db.data.length;
        return (
            <div>
                <div className="page-header">
                    <h2>
                        Search for a dataset 
                        <small>Showing <span className="label label-default">{showing}</span> of <span className="label label-default">{total}</span></small></h2>
                </div>
                
                <div className="row">
                    <div className="col-md-8">
                    {datasetItems}
                    </div>
                
                    <div className="col-md-4">
                        <h4>Dataset name:</h4>
                        <input type="text" value={this.state.name} onChange={(e) => this.handleNameKeyUp(e)} />
                        
                        <h4>Available Sources:</h4>
                
                        <ul className="search">
                            {sourcesList}
                        </ul>
                
                        <h4>File Types</h4>
                
                        <ul className="search">
                            {fileTypeList}
                        </ul>
                
                        <h4>Data Types</h4>
                
                        <ul className="search">
                            {dataTypeList}
                        </ul>
                        
                        <button className="btn" onClick={(e) => this.handleClearFilters(e)}>Clear Filters</button>
                    </div>
                </div>
            </div>
        )
    }
}

export default DatasetList;