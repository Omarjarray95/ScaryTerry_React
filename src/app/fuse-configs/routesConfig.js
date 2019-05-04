import React from 'react';
import {Redirect} from 'react-router-dom';
import {FuseUtils} from '@fuse/index';
import {LoginConfig} from 'app/main/login/LoginConfig';
import {DashboardConfig} from 'app/main/dashboard/DashboardConfig';
import {AddUsersConfig} from 'app/main/addUsers/AddUsersConfig';
import {TodoAppConfig} from 'app/main/ImpedimentsHub/TodoAppConfig';
import { CalendarAppConfig } from '../main/calendar/CalendarAppConfig';
import {MailAppConfig} from '../main/IssuesHUB/MailAppConfig';
import {AcademyAppConfig} from '../main/academy/AcademyAppConfig';

const routeConfigs = [
    AddUsersConfig,
    DashboardConfig,
    TodoAppConfig,
    CalendarAppConfig,
    MailAppConfig,
    AcademyAppConfig,
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
