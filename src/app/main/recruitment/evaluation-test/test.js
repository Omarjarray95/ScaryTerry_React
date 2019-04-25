import React,{Component} from 'react';
import {FuseAnimate} from '@fuse';
import Code from './code';
import {FuseExample, FuseHighlight, FusePageSimple} from '@fuse';
import {Button, Icon, Typography} from '@material-ui/core';
import {withStyles} from '@material-ui/core/styles/index';
import Quiz from '../quiz/Quiz';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {withRouter} from 'react-router-dom';
/* eslint import/no-webpack-loader-syntax: off */
/* eslint no-unused-vars: off */
const styles = theme => ({
    layoutRoot: {
        '& .description': {
            marginBottom: 16
        }
    }
});

class TestComponent extends Component{
    componentDidMount(){
        this.props.getTest(this.props.match.params.app);
        console.log(this.props.test);
    }
    render(){

        const {classes,test} = this.props;
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
                        <Typography variant="h6">Selection Controls</Typography>
                    </div>
                    <Button
                        className="normal-case"
                        variant="contained"
                        component="a"
                        href="https://material-ui-next.com/demos/selection-controls"
                        target="_blank"
                    >
                        <Icon className="mr-4">link</Icon>
                        Reference
                    </Button>
                </div>
            }
            content={ test && test._code && test._quiz &&(
                <div className="p-24 max-w-2xl mx-auto">

            <Typography className="text-32 mt-32 mb-8" component="h2">Radio Buttons</Typography>
            <Typography className="mb-16" component="div"><a href="https://material.io/design/components/selection-controls.html#radio-buttons">Radio buttons</a>
                allow the user to select one option from a set.
                Use radio buttons when the user needs to see all available options.
                If available options can be collapsed, consider using a dropdown menu because it uses less space.</Typography>
            <Typography className="mb-16" component="div">Radio buttons should have the most commonly used option selected by default.</Typography>
            <Typography className="mb-16" component="div"><code>RadioGroup</code> is a helpful wrapper used to group <code>Radio</code> components that provides an easier
                API, and proper keyboard accessibility to the group.</Typography>
                <FuseAnimate animation="transition.slideRightIn" delay={300}>

            <Typography className="mb-16" component="div">
            { 
                this.props.test._quiz !==undefined ? 
            
            this.props.test._quiz.map(quiz=><Quiz
                className="my-24"
                quiz={quiz}
            /> ):
            <div>Loading ... </div>
        }
            </Typography>
            </FuseAnimate>
           <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Code code={test._code}/>
                {/* <div>HAHAH</div> */}
            </FuseAnimate>
            </div>
            
            )}
        />
        );
    }           
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getTest : Actions.getTest,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    console.log(eCommerceApp.test.data);
    return {
        test: eCommerceApp.test.data
    }
}

export default withReducer('eCommerceApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TestComponent))));