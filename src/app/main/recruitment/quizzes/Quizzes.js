import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import QuizzesTable from './QuizzesTable';
import reducer from '../store/reducers';

const Quizzes = () => {
    return (
        <FusePageCarded
            classes={{
                content: "flex",
                header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
            }}
            content={
                <QuizzesTable/>
            }
            innerScroll
        />
    );
};

export default withReducer('recruitmentApp', reducer)(Quizzes);
