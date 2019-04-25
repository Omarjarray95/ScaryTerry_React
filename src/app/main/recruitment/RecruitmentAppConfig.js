import {FuseLoadable} from '@fuse';
import {Redirect} from 'react-router-dom';
import React from 'react';

export const RecruitmentAppConfig = {
    settings: {
        layout: {
            config: {
                footer        : {
                    display: false
                }
            }
        }
    },
    
    routes  : [
        {
            path     : '/recruitments/quiz/add',
            component: FuseLoadable({
                loader: () => import('./quiz/AddQuiz')
            })
        },
        {
            path     : '/recruitments/skills',
            component: FuseLoadable({
                loader: () => import('./skills/Skills')
            })
        },
        {
            path     : '/recruitments/quizzes',
            component: FuseLoadable({
                loader: () => import('./quizzes/Quizzes')
            })
        },
        {
            path     : '/recruitments/joboffer/add',
            component: FuseLoadable({
                loader: () => import('./job-offer/JobOffer')
            })
        },
        {
            path     : '/apps/todo/label/:labelHandle/:todoId?',
            component: FuseLoadable({
                loader: () => import('./job-offers/TodoApp')
            })
        },
        {
            path     : '/apps/todo/filter/:filterHandle/:todoId?',
            component: FuseLoadable({
                loader: () => import('./job-offers/TodoApp')
            })
        },
        {
            path     : '/apps/todo/:folderHandle/:todoId?',
            component: FuseLoadable({
                loader: () => import('./job-offers/TodoApp')
            })
        },
        {
            path     : '/apps/todo',
            component: () => <Redirect to="/apps/todo/all"/>
        },
        {
            path     : '/recruitments/application/:id',
            component: FuseLoadable({
                loader: () => import('./application/submit')
            })
        },
        {
            path     : '/test/:app',
            component: FuseLoadable({
                loader: () => import('./evaluation-test/test')
            })
        }
    ]
};
