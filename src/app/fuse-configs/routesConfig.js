import React from 'react';

import { AnalyticsDashboardAppConfig } from 'app/main/dashboards/analytics/AnalyticsDashboardAppConfig';
import { Redirect } from 'react-router-dom';
import { FuseUtils } from '@fuse/index';
import { LoginConfig } from 'app/main/login/LoginConfig';
import { DashboardConfig } from 'app/main/dashboard/DashboardConfig';
import { AddUsersConfig } from 'app/main/addUsers/AddUsersConfig';
import { GetUsersConfig } from 'app/main/getUsers/GetUsersConfig';
import { AddSkillsConfig } from 'app/main/addSkills/AddSkillsConfig';
import { GetSkillsConfig } from 'app/main/getSkills/GetSkillsConfig';
import { AddProjectsConfig } from 'app/main/addProjects/AddProjectsConfig';
import { GetProjectsConfig } from 'app/main/getProjects/GetProjectsConfig';
import { GetProjectConfig } from 'app/main/getProject/GetProjectConfig';
import { ShowProductBacklogConfig } from 'app/main/showProductBacklog/ShowProductBacklogConfig';
import { ShowSprintBacklogConfig } from 'app/main/showSprintBacklog/ShowSprintBacklogConfig';
import { TodoAppConfig } from 'app/main/ImpedimentsHub/TodoAppConfig';
import { CalendarAppConfig } from '../main/calendar/CalendarAppConfig';
import { MailAppConfig } from '../main/IssuesHUB/MailAppConfig';
import { AcademyAppConfig } from '../main/academy/AcademyAppConfig';


const routeConfigs = [
    AddUsersConfig,
    AddProjectsConfig,
    AddSkillsConfig,
    GetUsersConfig,
    GetProjectsConfig,
    GetSkillsConfig,
    GetProjectConfig,
    ShowProductBacklogConfig,
    ShowSprintBacklogConfig,
    DashboardConfig,
    AnalyticsDashboardAppConfig,
    TodoAppConfig,
    CalendarAppConfig,
    MailAppConfig,
    AcademyAppConfig,
    LoginConfig
];

const routes = [
    ...FuseUtils.generateRoutesFromConfigs(routeConfigs),
    {
        path: '/',
        component: () => <Redirect to="/" />
    }
];

export default routes;
