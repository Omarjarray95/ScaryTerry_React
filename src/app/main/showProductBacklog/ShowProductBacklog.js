import React, {Component} from 'react';
import {withStyles, ExpansionPanel, ExpansionPanelDetails, ExpansionPanelSummary, Icon, Typography} from '@material-ui/core';
import {FuseAnimateGroup} from '@fuse';
import classNames from 'classnames';
import {bindActionCreators} from "redux";
import connect from "react-redux/es/connect/connect";
import * as Actions from 'app/store/actions/scrum';
import {withRouter} from "react-router-dom";
import TextFieldFormsy from "../../../@fuse/components/formsy/TextFieldFormsy";
import Formsy from "formsy-react";
import Grid from "@material-ui/core/Grid/Grid";
import SelectFormsy from "../../../@fuse/components/formsy/SelectFormsy";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import Button from "@material-ui/core/Button/Button";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import DeleteIcon from '@material-ui/icons/Delete';

const styles = theme => ({
    header: {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.primary.contrastText,
        height    : 320
    },
    panel : {
        margin         : 0,
        borderWidth    : '1px 1px 0 1px',
        borderStyle    : 'solid',
        borderColor    : theme.palette.divider,
        '&:first-child': {
            borderRadius: '16px 16px 0 0'
        },
        '&:last-child' : {
            borderRadius: '0 0 16px 16px',
            borderWidth : '0 1px 1px 1px'
        }
    },
    textField: {
        backgroundColor: theme.palette.common.white,
        marginTop: 8,
        borderRadius: 4,
    },
    heading: {
        fontSize: theme.typography.pxToRem(15),
        fontWeight: 'bold',
    },
});

const categories = [
    {
        value: 'Feature',
        name: 'Feature'
    },
    {
        value: 'Function',
        name: 'Function'
    },
    {
        value: 'Requirement',
        name: 'Requirement'
    },
    {
        value: 'Enhacement',
        name: 'Enhacement'
    },
    {
        value: 'Fix',
        name: 'Fix'
    }];

class ShowProductBacklog extends Component {

    constructor(props)
    {
        super(props);

        this.state = {
            disabled: true,
            title: "",
            description: "",
            priority: "",
            category: ""
        };

        this.handleTitleChange = this.handleTitleChange.bind(this);
        this.handleDescriptionChange = this.handleDescriptionChange.bind(this);
        this.handlePriorityChange = this.handlePriorityChange.bind(this);
        this.handleCategoryChange = this.handleCategoryChange.bind(this);
        this.handleEnableSubmitItem = this.handleEnableSubmitItem.bind(this);
        this.handleDisableSubmitItem = this.handleDisableSubmitItem.bind(this);
        this.handleDeleteItem = this.handleDeleteItem.bind(this);
        this.reset = this.reset.bind(this);
        this.onSubmit = this.onSubmit.bind(this);
    }

    componentDidMount()
    {
        this.props.readProductBacklog(this.props.match.params.id);
    }

    toogleExpansion = panel => (event, expanded) => {
        this.setState({
            expanded: expanded ? panel : false
        });
    };

    handleTitleChange = event =>
    {
        this.setState({title: event.target.value});
    };

    handleDescriptionChange = event =>
    {
        this.setState({description: event.target.value});
    };

    handlePriorityChange = event =>
    {
        this.setState({priority: event.target.value});
    };

    handleDeleteItem = (item) =>
    {
        this.props.submitDeleteItem(item, this.props.match.params.id);
    };

    handleCategoryChange = event =>
    {
        this.setState({category: event.target.value});
    };

    reset = () =>
    {
        this.setState({title: "", description: "", priority: "", category: ""});
    };

    onSubmit = () =>
    {
        var item = {
            title: this.state.title,
            description: this.state.description,
            priority: this.state.priority,
            category: this.state.category
        };

        this.props.submitItem(item, this.props.match.params.id);
        this.reset();
    };

    handleEnableSubmitItem = () =>
    {
        this.setState({disabled: false});
    };

    handleDisableSubmitItem = () =>
    {
        this.setState({disabled: true});
    };

    render()
    {
        const {classes, productBacklog} = this.props;
        const {expanded, disabled} = this.state;

        return (
            <div className="w-full">

                <ExpansionPanel>
                    <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
                        <Typography className={classes.heading}>Add Items To The Product Backlog</Typography>
                    </ExpansionPanelSummary>
                    <ExpansionPanelDetails>
                        <div className="flex flex-col items-center text-center w-full">
                            <div className="w-2/3">
                                <Formsy
                                    onValidSubmit={this.onSubmit}
                                    onValid={this.handleEnableSubmitItem}
                                    onInvalid={this.handleDisableSubmitItem}
                                >
                                    <TextFieldFormsy
                                        id="title"
                                        label="Title"
                                        type="text"
                                        name="title"
                                        className={classes.textField}
                                        variant="filled"
                                        fullWidth
                                        value={this.state.title}
                                        onChange={this.handleTitleChange}
                                        required
                                    />

                                    <TextFieldFormsy
                                        multiline
                                        rows="4"
                                        id="description"
                                        label="Description"
                                        type="text"
                                        name="description"
                                        className={classes.textField}
                                        variant="filled"
                                        fullWidth
                                        value={this.state.description}
                                        onChange={this.handleDescriptionChange}
                                        required
                                    />

                                    <Grid container justify="space-between" direction="row">
                                        <TextFieldFormsy
                                            label="Priority"
                                            value={this.state.priority}
                                            onChange={this.handlePriorityChange}
                                            type="number"
                                            name="priority"
                                            className={classNames(classes.textField, "w-1/3")}
                                            variant="filled"
                                            required
                                        />
                                        <SelectFormsy
                                            className="w-1/3 bg-white mt-8 rounded-4"
                                            name="category"
                                            label="Item Category"
                                            value={this.state.category}
                                            onChange={this.handleCategoryChange}
                                            variant="filled"
                                            required
                                        >
                                            <MenuItem value="">
                                                <em>Category</em>
                                            </MenuItem>
                                            {categories.map(category => (
                                                <MenuItem key={category.value} value={category.value}>{category.name}</MenuItem>
                                            ))}
                                        </SelectFormsy>
                                    </Grid>

                                    <Grid container justify="center" direction="row">
                                        <Button onClick={this.reset} color="default" variant="contained" className="m-8">
                                            Reset
                                        </Button>
                                        <Button
                                            className="m-8"
                                            color="default"
                                            type="submit"
                                            variant="contained"
                                            disabled={disabled}>
                                            Add Item
                                        </Button>
                                    </Grid>
                                </Formsy>
                            </div>
                        </div>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <div className="max-w-xl w-full mx-auto px-16 sm:px-24 py-24 sm:py-32">
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                    >
                        {productBacklog.items.length > 0 && (productBacklog.items.map((item) => (
                            <ExpansionPanel className={classes.panel} key={item._id} expanded={expanded === item._id}
                                            onChange={this.toogleExpansion(item._id)} elevation={0}>

                                <ExpansionPanelSummary expandIcon={<Icon>expand_more</Icon>}>
                                    <div className="w-full flex flex-row justify-between">
                                        <div className="flex items-center">
                                            <Icon className="mr-8" color="action">bookmark</Icon>
                                            <Typography className="">{item.title}</Typography>
                                        </div>
                                        <div className="flex items-center">
                                            <Typography className="font-bold">Priority:</Typography>
                                            <Typography className="">{item.priority}</Typography>
                                        </div>
                                        <div className="flex items-center">
                                            <Typography className="">{item.category}</Typography>
                                        </div>
                                    </div>
                                </ExpansionPanelSummary>

                                <ExpansionPanelDetails>
                                    <div>
                                        <Typography className="">{item.description}</Typography>
                                        <Button
                                            color="default"
                                            className="mt-8"
                                            onClick={() => this.handleDeleteItem(item._id)}
                                            variant="contained">
                                            Delete
                                            <DeleteIcon />
                                        </Button>
                                    </div>
                                </ExpansionPanelDetails>
                            </ExpansionPanel>
                        )))}
                    </FuseAnimateGroup>
                </div>
            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readProductBacklog: Actions.getProductBacklog,
        submitItem: Actions.addItem,
        submitDeleteItem: Actions.deleteItem
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        productBacklog: scrum.productBacklog
    }
}

export default withStyles(styles, {withTheme: true}) (withRouter(connect(mapStateToProps, mapDispatchToProps) (ShowProductBacklog)));