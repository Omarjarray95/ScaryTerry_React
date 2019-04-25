import React, {Component} from 'react';
import {FusePageSimple} from '@fuse';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import ContactsList from './ContactsList';

class GetProjects extends Component
{
    render()
    {
        return (
            <React.Fragment>
                <FusePageSimple
                    content={
                        <ContactsList/>
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

function mapStateToProps({contactsApp})
{
    return {
    }
}

export default (withRouter(connect(mapStateToProps, mapDispatchToProps)(GetProjects)));
