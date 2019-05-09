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
import _ from 'lodash';
import {FormsyFile} from '@fuse';
import Formsy from 'formsy-react';
import {MenuItem} from '@material-ui/core';
import {SelectFormsy} from '@fuse';
import { Input, Paper} from '@material-ui/core';
import {Link} from 'react-router-dom';

/* eslint import/no-webpack-loader-syntax: off */
/* eslint no-unused-vars: off */
const styles = theme => ({
    layoutRoot: {
        '& .description': {
            marginBottom: 16
        }
    }
});

const langs = [
    { "id": 4, "name": "C (gcc 7.2.0)" },
    { "id": 5, "name": "C (gcc 6.4.0)" },
    { "id": 6, "name": "C (gcc 6.3.0)" },
    { "id": 7, "name": "C (gcc 5.4.0)" },
    { "id": 8, "name": "C (gcc 4.9.4)" },
    { "id": 9, "name": "C (gcc 4.8.5)" },
    { "id": 10, "name": "C++ (g++ 7.2.0)" },
    { "id": 11, "name": "C++ (g++ 6.4.0)" },
    { "id": 12, "name": "C++ (g++ 6.3.0)" },
    { "id": 13, "name": "C++ (g++ 5.4.0)" },
    { "id": 14, "name": "C++ (g++ 4.9.4)" },
    { "id": 15, "name": "C++ (g++ 4.8.5)" },
    { "id": 16, "name": "C# (mono 5.4.0.167)" },
    { "id": 17, "name": "C# (mono 5.2.0.224)" },
    { "id": 18, "name": "Clojure (1.8.0)" },
    { "id": 19, "name": "Crystal (0.23.1)" },
    { "id": 20, "name": "Elixir (1.5.1)" },
    { "id": 21, "name": "Erlang (OTP 20.0)" },
    { "id": 22, "name": "Go (1.9)" },
    { "id": 23, "name": "Haskell (ghc 8.2.1)" },
    { "id": 24, "name": "Haskell (ghc 8.0.2)" },
    { "id": 25, "name": "Insect (5.0.0)" },
    { "id": 26, "name": "Java (OpenJDK 9 with Eclipse OpenJ9)" },
    { "id": 27, "name": "Java (OpenJDK 8)" },
    { "id": 28, "name": "Java (OpenJDK 7)" },
    { "id": 29, "name": "JavaScript (nodejs 8.5.0)" },
    { "id": 30, "name": "JavaScript (nodejs 7.10.1)" },
    { "id": 31, "name": "OCaml (4.05.0)" },
    { "id": 32, "name": "Octave (4.2.0)" },
    { "id": 33, "name": "Pascal (fpc 3.0.0)" },
    { "id": 34, "name": "Python (3.6.0)" },
    { "id": 35, "name": "Python (3.5.3)" },
    { "id": 36, "name": "Python (2.7.9)" },
    { "id": 37, "name": "Python (2.6.9)" },
    { "id": 38, "name": "Ruby (2.4.0)" },
    { "id": 39, "name": "Ruby (2.3.3)" },
    { "id": 40, "name": "Ruby (2.2.6)" },
    { "id": 41, "name": "Ruby (2.1.9)" },
    { "id": 42, "name": "Rust (1.20.0)" },
];

class TestComponent extends Component{
    state = {
        quiz_response : [],
        code : null,
    }
    onChangeQuizHandler = (quiz) =>{
        let quiz_response = JSON.parse(JSON.stringify(this.state.quiz_response));
        // if(_.find(quiz_response,{id:quiz._id})){
        //     _.find(quiz_response,{id:quiz._id})
        // }
        if(_.find(quiz_response,{id:quiz.id})===undefined){
            quiz_response.push(quiz);
        }else{
            quiz_response[_.findIndex(quiz_response,{ id:quiz.id })].response = quiz.response; 
        }
        this.setState({quiz_response,},function () {
            console.log(this.state.quiz_response);
        });
    }
    componentDidMount(){
        this.props.getTest(this.props.match.params.app);
        this.props.validateTest(this.props.match.params.app);
    }
    onSubmit = (model) => {
        model.code = this.state.code;
        model.id = this.props.test._id;
        model.results = this.state.quiz_response;
        console.log(model);
        console.log("Hello");
        this.props.saveTest(model);
    };
    saveFile = (e) =>{
            this.setState({code:e.target.files[0]})
        }
    render(){

        const {classes,test,result} = this.props;
        return (
            <div>
              
            {test.code &&  (
                
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
            (result && this.props.test._quiz !==undefined) ? 
            
            this.props.test._quiz.map(quiz=>{
                const response= _.find(this.props.test.quiz_response,response=>response.id===quiz._id);
                const res = _.find(result,res=>res.id===quiz._id);
                return <Quiz
                    className="my-24"
                    quiz={quiz}
                    result={res}
                    response= {response}
                    quizHandler={this.onChangeQuizHandler}
                />}
             ):
            <div>Loading ... </div>
        }
            </Typography>
            </FuseAnimate>
           <FuseAnimate animation="transition.slideRightIn" delay={300}>
                <Code code={test._code}/>
                {/* <div>HAHAH</div> */}
            </FuseAnimate>
            <Formsy
                    onValidSubmit={this.onSubmit}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center"
                >
                  <Typography className="mb-16" component="div">Select<code> The language</code> you are attempted to solve with the problem </Typography>
                 <SelectFormsy
                        className="my-16"
                        name="lang"
                        label=""
                        variant="outlined"
                        required
                    >
                    {langs.map(lang=><MenuItem value={lang.name}>{lang.name}</MenuItem>)}
                    </SelectFormsy>
            <FormsyFile
                className="my-8"
                type="file"
                name="code"
                required
                variant="outlined"
                onChange={this.saveFile}/>
                <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mx-auto my-16"
                aria-label="LOG IN"
                
            >
                Submit
            </Button>
            </Formsy>
            </div>
            
            )}
        />
       )}
        </div>
        );
    }           
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getTest : Actions.getTest,
        saveTest:Actions.saveTest,
        validateTest:Actions.validateTest,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    console.log(eCommerceApp.test.data);
    return {
        test: eCommerceApp.test.data,
        result: eCommerceApp.test.result,
    }
}

export default withReducer('eCommerceApp', reducer)(withStyles(styles, {withTheme: true})(withRouter(connect(mapStateToProps, mapDispatchToProps)(TestComponent))));