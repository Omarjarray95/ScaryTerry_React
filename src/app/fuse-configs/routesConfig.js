import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {DashboardConfig} from 'app/main/dashboard/DashboardConfig';
import {AddUsersConfig} from 'app/main/addUsers/AddUsersConfig';
import {TodoAppConfig} from 'app/main/ImpedimentsHub/TodoAppConfig';
const routeConfigs = [
    AddUsersConfig,
    DashboardConfig,
    TodoAppConfig,
    LoginConfig
];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        component: () => <Redirect to="/"/>
    }
];

 export default routes;
