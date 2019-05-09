import React from 'react';
import {FusePageCarded} from '@fuse';
import withReducer from 'app/store/withReducer';
import SkillsTable from './SkillsTable';
import SkillsHeader from './SkillsHeader';
import reducer from '../store/reducers';

const Skills = () => {
    return (
        <React.Fragment>
            <FusePageCarded
                classes={{
                    content: "flex",
                    header : "min-h-72 h-72 sm:h-136 sm:min-h-136"
                }}
                header={
                    <SkillsHeader/>
                }
                content={
                    <SkillsTable/>
                }
                innerScroll
            />
        </React.Fragment>
    );
};

export default withReducer('recruitmentApp', reducer)(Skills);
