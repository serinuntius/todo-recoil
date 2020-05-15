import React from 'react';
import {TaskList} from './Task';

import {
    RecoilRoot,
} from 'recoil';


function App() {
    return (
        <RecoilRoot>
            <TaskList/>
        </RecoilRoot>
    );
}

export default App;
