import React, {Component} from 'react';
import {Typography, withStyles} from '@material-ui/core';
import {FuseExample, FusePageSimple} from '@fuse';
/* eslint import/no-webpack-loader-syntax: off */

const styles = theme => ({
    layoutRoot: {}
});

class AddUsers extends Component {

    render()
    {
        return (
            <FusePageSimple
                content={<div className="p-24 max-w-2xl">
                    <Typography className="text-32 mt-8 mb-8" component="h2" align={"center"}>Add New User</Typography>
                    <FuseExample
                        className="mb-64"
                        component={require('./AddUsersForm.js').default}
                        raw={require('!raw-loader!./AddUsersForm.js')}
                    />
                </div>}
            />
        );
    }
}

export default withStyles(styles, {withTheme: true})(AddUsers);