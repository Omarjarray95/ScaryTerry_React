import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import SkillsList from './SkillsList';

class GetSkills extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <FusePageSimple
                    content={
                        <SkillsList/>
                    }
                    sidebarInner
                    innerScroll
                />
            </React.Fragment>
        )
    };
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
    }, dispatch);
}

function mapStateToProps({})
{
    return {
    }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(GetSkills)));