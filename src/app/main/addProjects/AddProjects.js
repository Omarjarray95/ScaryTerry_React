import React, {Component} from 'react';
import {Typography, withStyles} from '@material-ui/core';
import {FuseExample, FusePageSimple} from '@fuse';
/* eslint import/no-webpack-loader-syntax: off */

const styles = theme => ({
    layoutRoot: {}
});

class AddProjects extends Component {

    render()
    {
        return (
            <FusePageSimple
                content={<div className="p-24 max-w-2xl">
                    <Typography className="text-32 mt-8 mb-8" component="h2" align={"center"}>Add New Project</Typography>
                    <FuseExample
                        className="mb-64"
                        component={require('./AddProjectsForm.js').default}
                        raw={require('!raw-loader!./AddProjectsForm.js')}
                    />
                </div>}
            />
        );
    }
}

export default withStyles(styles, {withTheme: true})(AddProjects);