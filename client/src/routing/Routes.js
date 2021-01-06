import React from 'react';
import { Route, Switch } from 'react-router-dom';

import PrivateRoute from '../routing/PrivateRoute';

import Alert from '../components/layout/alert/Alert';
import Login from '../components/auth/login/Login';
import Register from '../components/auth/register/Register';
import Dashboard from '../components/dashboard/Dashboard';
import Profile from '../components/profile/Profile';
import CreateProfile from '../components/profile/create-profile/CreateProfile';
import EditProfile from '../components/profile/edit-profile/EditProfile';
import Members from '../components/members/Members';
import MembersSearch from '../components/members/members-search/MembersSearch';
import NotFound from '../components/layout/notfound/NotFound';
import Lists from '../components/lists/Lists';
import Messages from '../components/messages/Messages';
import Thread from '../components/messages/thread/Thread';

const Routes = () => {
  return (
    <div className='container'>
      <Alert />
      <Switch>
        <Route exact path='/login' component={Login} />
        <Route exact path='/register' component={Register} />
        <PrivateRoute exact path='/dashboard' component={Dashboard} />
        <PrivateRoute exact path='/profile/:user_id' component={Profile} />
        <PrivateRoute exact path='/profile' component={Profile} />
        <PrivateRoute exact path='/create-profile' component={CreateProfile} />
        <PrivateRoute exact path='/edit-profile' component={EditProfile} />
        <PrivateRoute exact path='/members' component={Members} />
        <PrivateRoute exact path='/members/search' component={MembersSearch} />
        <PrivateRoute exact path='/lists' component={Lists} />
        <PrivateRoute exact path='/messages' component={Messages} />
        <PrivateRoute
          exact
          path='/messages/thread/:user_id'
          component={Thread}
        />
        <Route component={NotFound} />
      </Switch>
    </div>
  );
};

export default Routes;
