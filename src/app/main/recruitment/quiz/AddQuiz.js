import React, { Component } from 'react';
import {Button, Icon, Typography} from '@material-ui/core';
import {FuseExample, FusePageSimple} from '@fuse';
import Forms from './Forms';
import {FuseAnimate} from '@fuse';
import {Link, withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {withStyles} from '@material-ui/core';

/* eslint import/no-webpack-loader-syntax: off */

class FormsyDoc extends Component {
    componentDidMount()
    {
        console.log(this.props.skills);
        this.props.getSkills();
        this.setState({data:this.props.skills})
      }
    render(){
    const {classes, saveProduct} = this.props;

    return (
        
        <FusePageSimple
            header={
                <div className="flex flex-1 items-center justify-between p-24">
                    <div className="flex flex-col">
                        <div className="flex items-center mb-16">
                            <Icon className="text-18" color="action">home</Icon>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Recruitments</Typography>
                            <Icon className="text-16" color="action">chevron_right</Icon>
                            <Typography color="textSecondary">Quiz</Typography>
                        </div>
                        <Typography variant="h6">ADD QUIZ</Typography>
                    </div>
                </div>
            }
            content={
                <div className="p-24 max-w-2xl">

                    <Typography className="mb-16" component="p">
                        <code>Quiz</code> is so important for the quality of our recruitments.
                    </Typography>

                    <Typography className="mb-16" component="p">
                        So please try to pick carefully the Quiz you want to add.
                    </Typography>

                    <hr/>

                    <Typography className="text-32 mt-32 mb-8" component="h2">QUIZ</Typography>

                    {/* <FuseExample
                        className="mb-64"
                        component={require('./examples/SimpleFormExample.js').default}
                        raw={require('!raw-loader!./examples/SimpleFormExample.js')}
                    /> */}
                    <FuseAnimate animation="transition.slideRightIn" delay={300}>
            
                    <div className="mb-64">
                        <Forms skills={this.props.skills}/>
                    </div>
                    </FuseAnimate>
                    {/* <Typography className="text-32 mt-32 mb-8" component="h2">Demos</Typography>

                    <ul>
                        <li className="mb-8">
                            <Link to="/login">Login page</Link>
                        </li>
                    </ul> */}
                </div>
            }
        />
    );
}
};
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        saveProduct: Actions.saveQuiz,
        getSkills: Actions.getSkills,

    }, dispatch);
}

function mapStateToProps({recruitmentApp})
{
    return {
        skills:recruitmentApp.skills.data,
        product: recruitmentApp.product
    }
}

export default withReducer('recruitmentApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(FormsyDoc)));
