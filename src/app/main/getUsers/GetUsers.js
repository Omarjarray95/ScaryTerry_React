import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import UsersList from './UsersList';

class GetUsers extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <FusePageSimple
                    content={
                        <UsersList/>
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

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(GetUsers)));