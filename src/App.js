import React from 'react';
import AppRouter from './components/appRouter';
import AppLoading from './components/appLoading';
import store from './models';
import {Provider} from 'mobx-react';

class App extends React.Component {
    render() {
        return (
            <Provider {...store}>
                <div>
                    <AppRouter/>
                    <AppLoading loading={false}/>
                </div>
            </Provider>
        );
    }
}

export default App;
