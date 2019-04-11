import React from 'react';
import {BrowserRouter as Router, Route, Switch, Redirect} from 'react-router-dom';
import routes from '../config/routes';
import AuthRoute from '../components/authRoute';
import { inject, observer } from 'mobx-react';

@inject('permission', 'userInfo')
@observer
class AppRouter extends React.Component {
    render() {
        const {permissionPageList} = this.props.permission;
        const {role} = this.props.userInfo;
        return (
            <Router>
                <Switch>
                    {
                        routes.map(({path, component}, index) => <AuthRoute path={path} component={component} key={index} auth={permissionPageList.indexOf(path) > -1}/>)
                    }
                    <Route render={({location}) => {
                        return location.pathname === '/' ? <Redirect to={role === 1 ? '/project' : '/finance'}/> : <Redirect to="/404"/>
                    }}/>
                </Switch>
            </Router>
        );
    }
}

export default AppRouter;