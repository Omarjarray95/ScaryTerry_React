import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {DashboardConfig} from 'app/main/dashboard/DashboardConfig';
import {AddUsersConfig} from 'app/main/addUsers/AddUsersConfig';
import {AddProjectsConfig} from 'app/main/addProjects/AddProjectsConfig';
import {RecruitmentAppConfig} from 'app/main/recruitment/RecruitmentAppConfig';

const routeConfigs = [
    RecruitmentAppConfig,
    AddUsersConfig,
    AddProjectsConfig,
    DashboardConfig,
    LoginConfig,

];

 const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path     : '/',
        exact:true,
        component: () => <Redirect to="/"/>
    }
];

 export default routes;
