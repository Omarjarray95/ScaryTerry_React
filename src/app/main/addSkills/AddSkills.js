import React, {Component} from 'react';
import {Typography, withStyles} from '@material-ui/core';
import {FuseExample, FusePageSimple} from '@fuse';
/* eslint import/no-webpack-loader-syntax: off */

const styles = theme => ({
    layoutRoot: {}
});

class AddSkills extends Component {

    render()
    {
        return (
            <FusePageSimple
                content={<div className="p-8 min-w-full flex flex-col items-center">
                    <Typography className="text-32 mt-8 mb-8" component="h2">Add New Skill</Typography>
                    <FuseExample
                        component={require('./AddSkillsForm.js').default}
                        raw={require('!raw-loader!./AddSkillsForm.js')}
                    />
                </div>}
            />
        );
    }
}

export default withStyles(styles, {withTheme: true})(AddSkills);