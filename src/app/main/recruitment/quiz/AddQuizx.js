import React from 'react';
import {FuseExample, FuseHighlight, FusePageSimple} from '@fuse';
import {Button, Icon, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import reducer from '../store/reducers';
import connect from 'react-redux/es/connect/connect';
import {Link, withRouter} from 'react-router-dom';
import withReducer from 'app/store/withReducer';
import {bindActionCreators} from 'redux';
import HorizontalLinearAlternativeLabelStepper from './HorizentalLinearAlternativeLabelStepper';

/* eslint import/no-webpack-loader-syntax: off */
/* eslint no-unused-vars: off */
const styles = theme => ({
    layoutRoot: {
        '& .description': {
            marginBottom: 16
        }
    }
});

function Steppers({classes})
{
    return (

        <FusePageSimple
            classes={{
                root: classes.layoutRoot
            }}
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-16">
                            <Icon className="text-18" color="action">home</Icon>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Components</Typography>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Material UI Elements</Typography>
                        </div>
                        <Typography variant="h6">Add Quiz</Typography>
                    </div>
                    {/* Show all the Quizs */}
                    <Button
                        className="normal-case"
                        variant="contained"
                        component="a"
                        href="https://material-ui-next.com/demos/steppers"
                        target="_blank"
                    >
                        <Icon className="mr-4">link</Icon>
                        Show All
                    </Button>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl mx-auto">
                    <Typography className="text-44 mt-32 mb-8" component="h1">Add Quiz</Typography>
                    <Typography className="description">Steppers convey progress through numbered steps.</Typography>

                    <Typography className="mb-16" component="div"><a href="https://material.io/archive/guidelines/components/steppers.html">Steppers</a> display progress through a
                        sequence of logical and numbered steps. They may also be used for navigation.
                        Steppers may display a transient feedback message after a step is saved.</Typography>
                    <Typography className="mb-16" component="div"><strong>Types of Steps</strong></Typography>
                    <ul>
                        <li>Editable</li>
                        <li>Non-editable</li>
                        <li>Mobile</li>
                        <li>Optional</li>
                    </ul>
                    <Typography className="mb-16" component="div"><strong>Types of Steppers</strong></Typography>
                    <ul>
                        <li>Horizontal</li>
                        <li>Vertical</li>
                        <li>Linear</li>
                        <li>Non-linear</li>
                    </ul>
                    <blockquote>
                        <Typography className="mb-16" component="div"><strong>Note:</strong> Steppers are no longer documented in the Material Design documentation.</Typography>
                    </blockquote>
                    
                    <Typography className="text-32 mt-32 mb-8" component="h2">Horizontal Linear - Alternative Label</Typography>
                    <Typography className="mb-16" component="div">Labels can be placed below the step icon by setting the <code>alternativeLabel</code> property on
                        the <code>Stepper</code> component.</Typography>
                    {/* <Typography className="mb-16" component="div"><FuseExample
                        className="my-24"
                        iframe={false}
                        component={require('app/main/components/material-ui/material-ui-examples/steppers/HorizontalLinearAlternativeLabelStepper.js').default}
                        raw={require('!raw-loader!app/main/components/material-ui/material-ui-examples/steppers/HorizontalLinearAlternativeLabelStepper.js')}
                    /></Typography> */}
                    <Typography className="mb-16" component="div">
                    <HorizontalLinearAlternativeLabelStepper 
                        className="my-24"
                        iframe={false}/>
                    </Typography>

                </div>
            }
        />

    );
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
       
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    return {
        order: eCommerceApp.order
    }
}

// export default withReducer('eCommerceApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Steppers)));

// export default withReducer('eCommerceApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(Steppers)))(withStyles(styles, {withTheme: true})(Steppers));
export default withReducer('eCommerceApp',reducer)(withStyles(styles, {withTheme: true})(Steppers));
