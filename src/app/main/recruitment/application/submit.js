import React, { Component } from 'react';
import {Button,Typography} from '@material-ui/core';
import {TextFieldFormsy} from '@fuse';
import {FormsyFile} from '@fuse';
import Formsy from 'formsy-react';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from 'app/store/withReducer';
import * as Actions from '../store/actions';
import reducer from '../store/reducers';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import { lang } from 'moment';
/* eslint import/no-webpack-loader-syntax: off */



class SubmitApplication extends Component {
    state = {
        canSubmit: false,
        // data:this.props.jobOffer,
    };
    componentWillMount(){
        this.props.getOffer(this.props.match.params).then(data=>{
            this.setState({data:this.props.jobOffer,});
        });
        // this.setState({data:this.props.jobOffer})
    }
    // componentDidUpdate(prevProps, prevState)
    // {
    //     if ( !_.isEqual(this.props.jobOffer, prevProps.jobOffer) )
    //     {
    //         console.log(this.props.jobOffer);
    //         this.setState({data:this.props.jobOffer})
    //     }
    // }
    disableButton = () => {
        this.setState({canSubmit: false});
    };

    enableButton = () => {
        this.setState({canSubmit: true});
    };
    onSubmit = (model) => {
        model.offer = this.props.match.params.id;
        // model.applier = '5ca6f9a4a993a71790a7fc11';
        model.resume = this.state.resume;
        console.log(model);
        console.log("Hello");
        this.props.saveApplication(model);
    };
    saveFile = (e) =>{
            this.setState({resume:e.target.files[0]})
        }
    render(){
        const {canSubmit,data} = this.state; 
        return (
            // <Input type="file" name="resume" id="select-multiple-chip" />
            <div className="max-w-sm">
                {console.log(data)}
                <Typography className="h2 mb-24">
                    <div>
                    { data!==undefined ?
                        <div>
                            If you want to join us and you are patient to work as {data._job!==null ? data._job.title : "a Developer"}
                            and you have these skills 
                            <ul>
                            {data.requirements.map(skill=><li>{skill.name}</li>)}
                            </ul> Just apply by adding your cv and email just Above .
                        </div> : 
                        <div>Loading ... </div>
                        }
                        </div>
                    </Typography>
                <Formsy
                    onValidSubmit={this.onSubmit}
                    onValid={this.enableButton}
                    onInvalid={this.disableButton}
                    ref={(form) => this.form = form}
                    className="flex flex-col justify-center"
                >
                {/* <TextFieldFormsy
                    className="my-16"
                    type="file"
                    name="resume"
                    required
                    variant="outlined"
                /> */}
                <FormsyFile
                className="my-16"
                type="file"
                name="resume"
                required
                variant="outlined"
                onChange={this.saveFile}/>
                
                <TextFieldFormsy
                    className="my-16"
                    type="text"
                    name="applier"
                    label="your email"
                    validations={{
                        minLength: 4
                    }}
                    validationErrors={{
                        minLength: 'Min character length is 4'
                    }}
                    required
                    variant="outlined"
                />
            <Button
                type="submit"
                variant="contained"
                color="primary"
                className="mx-auto my-16"
                aria-label="LOG IN"
                disabled={!canSubmit}
            >
                Can submit
            </Button>
            </Formsy>

        </div>
        );
}
};

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        saveApplication: Actions.saveApplication,
        getOffer : Actions.getOffer,
    }, dispatch);
}

function mapStateToProps({eCommerceApp})
{
    console.log("Map " + eCommerceApp.offer.data);
    return {
        jobOffer:eCommerceApp.offer.data,
    }
}

export default withReducer('eCommerceApp', reducer)(withRouter(connect(mapStateToProps, mapDispatchToProps)(SubmitApplication)));
