import React, { Component } from 'react';
import {render} from 'react-dom';

import DatasetList  from './components/DatasetList';

class App extends Component {
    render() {
        return (
            <DatasetList />
        )
    }
}

render(<App />, document.getElementById('database-app'));