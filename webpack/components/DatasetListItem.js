import React, { Component } from 'react';

function DatasetListItem (props) {
    var dataset = props.dataset;
    
    const source = dataset.source.map((source) =>
        <span key={source} className={
            props.sources.indexOf(source) >= 0 ? 
                "label label-default label-warning" :
                "label label-default"
        }>{source}</span>
    )
    
    const file_type = dataset.file_type.map((file_type) =>
        <span key={file_type} className={
            props.file_types.indexOf(file_type) >= 0 ? 
                "label label-default label-warning" :
                "label label-default"
        }>{file_type}</span>
    )
    
    const data_type_tag = dataset.data_type_tag.map((data_type_tag) =>
        <span key={data_type_tag} className={
            props.data_type_tags.indexOf(data_type_tag) >= 0 ? 
                "label label-default label-warning" :
                "label label-default"
        }>{data_type_tag}</span>
    )
    
    return (
        <div className="row">
            <div className="col-md-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <h3 className="panel-title">
                            <a href="/view/#">{dataset.name}</a>
                        </h3>
                    </div>
                    <div className="panel-body">
                        <p>{dataset.description}</p>

                        <a className="btn btn-default">More &raquo;</a>

                        <table className="table table-condensed">
                            <tbody>
                                <tr>
                                    <td>Download</td>
                                    <td>{dataset.url}</td>
                                </tr>
                                <tr>
                                    <td>Source</td>
                                    <td>
                                        {source}
                                    </td>
                                </tr>
                                <tr>
                                    <td>File types</td>
                                    <td>
                                        {file_type}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Data Types</td>
                                    <td>
                                        {data_type_tag}
                                    </td>
                                </tr>

                                <tr>
                                    <td>Data Packages</td>
                                    <td>
                                        {dataset.associated_data_packages}
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default DatasetListItem;