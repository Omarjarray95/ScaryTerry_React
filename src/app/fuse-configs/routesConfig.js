import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {DashboardConfig} from 'app/main/dashboard/DashboardConfig';
import {AddUsersConfig} from 'app/main/addUsers/AddUsersConfig';
import {AddProjectsConfig} from 'app/main/addProjects/AddProjectsConfig';
import {GetProjectsConfig} from 'app/main/getProjects/GetProjectsConfig';
import {GetProjectConfig} from 'app/main/getProject/GetProjectConfig';
import {ShowProductBacklogConfig} from 'app/main/showProductBacklog/ShowProductBacklogConfig';
import {ShowSprintBacklogConfig} from 'app/main/showSprintBacklog/ShowSprintBacklogConfig';

const routeConfigs = [
    AddUsersConfig,
    AddProjectsConfig,
    GetProjectsConfig,
    GetProjectConfig,
    ShowProductBacklogConfig,
    ShowSprintBacklogConfig,
    DashboardConfig,
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
