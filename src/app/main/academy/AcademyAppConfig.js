import React from 'react';
import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';

export const AcademyAppConfig = {
    settings: {
        layout: {}
    },
    routes  : [
        {
            path     : '/apps/academy/courses/:courseId/:courseHandle?',
            component: FuseLoadable({
                loader: () => import('./course/Course')
            })
        },
        {
            path     : '/meetings',
            component: FuseLoadable({
                loader: () => import('./courses/Courses')
            })
        },        {
            path     : '/meeting/:id',
            component: FuseLoadable({
                loader: () => import('./courses/Meeting')
            })
        },
        {
            path     : '/apps/academy',
            component: () => <Redirect to="/apps/academy/courses"/>
        }
    ]
};
