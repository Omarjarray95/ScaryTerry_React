import React, {Component} from 'react';
import {Button, List, ListItem, ListItemText, Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as authActions from 'app/auth/store/actions';
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import Tooltip from "@material-ui/core/Tooltip/Tooltip";
import IconButton from "@material-ui/core/IconButton/IconButton";
import StrongIcon from '@material-ui/icons/AccessibilityNew';
import PhotoIcon from '@material-ui/icons/InsertPhoto';
import DialogTitle from "@material-ui/core/DialogTitle/DialogTitle";
import DialogContent from "@material-ui/core/DialogContent/DialogContent";
import DialogActions from "@material-ui/core/DialogActions/DialogActions";
import Dialog from "@material-ui/core/Dialog/Dialog";
import Paper from "@material-ui/core/Paper/Paper";
import Formsy from "formsy-react";
import InputLabel from "@material-ui/core/InputLabel/InputLabel";
import Select from "@material-ui/core/Select/Select";
import MenuItem from "@material-ui/core/MenuItem/MenuItem";
import FormControl from "@material-ui/core/FormControl/FormControl";
import * as Actions from 'app/store/actions/scrum';
import TextFieldFormsy from "../../../@fuse/components/formsy/TextFieldFormsy";
import TextField from "@material-ui/core/TextField/TextField";
import {showMessage} from "../../store/actions/fuse";
import _ from '@lodash';
import Avatar from "@material-ui/core/Avatar/Avatar";

const styles = theme => (
    {
        chipNotAvailable:
            {
                color: theme.palette.getContrastText(red[500]),
                backgroundColor: red[500],
            },
        chipAvailableSoon:
            {
                color: theme.palette.getContrastText(yellow[500]),
                backgroundColor: yellow[500],
            },
        chipAvailable:
            {
                color: theme.palette.getContrastText(green[500]),
                backgroundColor: green[500],
            },
        chipNotAvailableSoon: {
            margin: theme.spacing.unit,
        },
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            padding: theme.spacing.unit / 2,
            marginBottom: 8
        },
        chip: {
            margin: theme.spacing.unit / 2,
        },
        bigAvatar: {
            marginBottom: 12,
            width: 150,
            height: 150,
        },
        avatar: {
            margin: 10,
        },
        inputFile: {
            width: 0.1,
            height: 0.1,
            opacity: 0,
            overflow: 'hidden',
            position: 'absolute',
            zIndex: -1
        },
        inputFileLabel: {
            fontSize: 14,
            fontWeight: 400,
            color: 'black',
            display: 'inline-block',
            cursor: 'pointer'
        }
    });

const seniorities = [
    {
        value: 'Not Applicable',
        label: 'Not Applicable',
    },
    {
        value: 'Fundamental',
        label: 'Fundamental',
    },
    {
        value: 'Novice',
        label: 'Novice',
    },
    {
        value: 'Intermediate',
        label: 'Intermediate',
    },
    {
        value: 'Advanced',
        label: 'Advanced',
    },
    {
        value: 'Expert',
        label: 'Expert',
    }
];

class UsersList extends Component {

    state = {
        openSkillsDialog: false,
        openPhotoDialog: false,
        image: null,
        skill: "",
        seniority: "",
        years: "",
        skillName: ""
    };

    showMessages = (message, operation) =>
    {
        this.props.showMessage({
            message     : message,
            autoHideDuration: 6000,
            anchorOrigin: {
                vertical  : 'bottom',
                horizontal: 'right'
            },
            variant: operation
        })
    };

    getFilteredArray = (entities) =>
    {
        const arr = Object.keys(entities).map((_id) => entities[_id]);
        return arr;
    };

    handleOpenSkillsDialog = (user) =>
    {
        this.props.readUser(user);
        this.setState({openSkillsDialog: true});
    };

    handleOpenPhotoDialog = (user) =>
    {
        this.props.readUser(user);
        this.setState({openPhotoDialog: true});
    };

    handleCloseSkillsDialog = () =>
    {
        this.props.readUser(null);
        this.setState({openSkillsDialog: false});
    };

    handleClosePhotoDialog = () =>
    {
        this.props.readUser(null);
        this.setState({openPhotoDialog: false, image: null});
    };

    handleResetSkillsDialog = () =>
    {
        this.setState({skill: "", seniority: "", years: "", skillName: ""});
        this.props.skillname.status = true;
    };

    handleResetPhotoDialog = () =>
    {
        if (this.props.managedUser)
        {
            this.setState({image: null});
            this.props.submitDeletePhoto(this.props.managedUser._id);
        }
    };

    validate = () =>
    {
        if (this.state.skill === "")
        {
            if (this.state.skillName === "")
            {
                this.showMessages("You haven't choose a skill to add. Please pick a skill " +
                    "or add it quickly in the field below.", 'error');
                return false;
            }
            else if (!this.props.skillname.status)
            {
                this.showMessages(this.props.skillname.message, 'error');
                return false;
            }
        }

        return true;
    };

    handleSubmitSkills = () =>
    {
        if (this.validate())
        {
            var level = {
                skill: this.state.skill !== "" ? this.state.skill : null,
                seniority: this.state.seniority,
                years: this.state.years,
                name: this.state.skillName
            };

            if (this.props.managedUser)
            {
                this.props.submitAddSkill(level, this.props.managedUser._id);
                this.handleResetSkillsDialog();
            }
        }
    };

    handleSubmitDeleteSkill = (level) =>
    {
        this.props.submitDeleteSkill(level._id);
    };

    handleSkillChange = event =>
    {
        this.setState({skill: event.target.value});
    };

    handleSeniorityChange = event =>
    {
        this.setState({seniority: event.target.value});
    };

    handleYearsOfExperienceChange = event =>
    {
        this.setState({years: event.target.value});
    };

    handleSkillNameChange = event =>
    {
        this.setState({skillName: event.target.value});
        this.props.verifySkillName(event.target.value);
    };

    handleImageChange = event =>
    {
        event.preventDefault();

        let Reader = new FileReader();
        var File = event.target.files[0];

        if (File.type === 'image/png' || File.type === 'image/jpeg' || File.type === 'image/bmp')
        {
            const Data = new FormData();
            Data.append('file', File);

            if (this.props.managedUser)
            {
                Data.append('name', this.props.managedUser.firstName + " " + this.props.managedUser.lastName);
                this.props.submitChangePhoto(Data, this.props.managedUser._id);
                this.setState({image: URL.createObjectURL(event.target.files[0])})
            }
        }
        else
        {
            this.showMessages("You have uploaded a file with a non-supported format, Please choose PNG, JPEG or BMP formats " +
                "for your uploaded image.", 'error');
        }
    };

    componentDidMount()
    {
        this.props.readUsers();
        this.props.readSkills();
    }

    componentWillUpdate(nextProps, nextState)
    {
        if (nextState.openPhotoDialog && (nextState.openPhotoDialog !== this.state.openPhotoDialog))
        {
            if (nextProps.managedUser && (nextProps.managedUser.avatar))
            {
                this.setState({image: "/images/" + nextProps.managedUser.avatar});
            }
        }
        if ((this.props.users !== nextProps.users) && (this.props.managedUser))
        {
            const newManagedUser = _.find(nextProps.users, {_id: this.props.managedUser._id});
            if (newManagedUser !== undefined)
            {
                this.props.readUser(newManagedUser);
            }
        }
    }

    render()
    {
        const {users, skills, managedUser, classes} = this.props;
        const data = this.getFilteredArray(users);

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No Users Found.
                    </Typography>
                </div>
            );
        }

        return (
            <React.Fragment>
                <ReactTable
                    className="-striped -highlight border-0"
                    data={data}
                    columns={[
                        {
                            Header    : "Name",
                            accessor  : "",
                            filterable: true,
                            className : "font-bold",
                            Cell     : row => ((<div className="flex flex-row items-center">
                                    <Avatar
                                        alt="Avatar"
                                        src={row.original.avatar ? process.env.PUBLIC_URL + "/images/" + row.original.avatar :
                                            "/assets/images/avatars/profile.jpg"} className={classes.avatar} />
                                    <Typography>
                                        {row.original.firstName + " " + row.original.lastName}
                                    </Typography>
                                </div>
                                ))
                        },
                        {
                            Header    : "Username",
                            accessor  : "username",
                            filterable: true,
                        },
                        {
                            Header    : "Role",
                            accessor  : "role",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Enterprise",
                            accessor  : "entreprise.name",
                            filterable: true
                        },
                        {
                            Header    : "Availability",
                            accessor  : "availability",
                            filterable: true,
                            className : "flex justify-center",
                            Cell     : row => (
                                (<Chip label={row.value} className={row.value === "Available" ? classes.chipAvailable :
                                    row.value === "Not Available" ? classes.chipNotAvailable :
                                        row.value === "Available Soon" ? classes.chipAvailableSoon : classes.chipNotAvailableSoon} />)
                            ),
                        },
                        {
                            Header    : "Management",
                            accessor  : "",
                            filterable: false,
                            className : "flex flex-row justify-center",
                            Cell     : row => (
                                (<div>
                                        <Tooltip title="Manage Skills">
                                            <IconButton
                                                aria-label="Manage Skills"
                                                onClick={() => this.handleOpenSkillsDialog(row.original)}>
                                                <StrongIcon />
                                            </IconButton>
                                        </Tooltip>
                                        <Tooltip title={"Change " + row.original.firstName + "'s Photo"}>
                                            <IconButton
                                                aria-label={"Change " + row.original.firstName + "'s Photo"}
                                                onClick={() => this.handleOpenPhotoDialog(row.original)}>
                                                <PhotoIcon />
                                            </IconButton>
                                        </Tooltip>
                                    </div>
                                )
                            ),
                        }
                    ]}
                    defaultPageSize={5}
                    noDataText="No Users Found."
                />

                <Dialog
                    open={this.state.openSkillsDialog}
                    onClose={this.handleCloseSkillsDialog}
                    aria-labelledby="Form-Dialog-Skills"
                >
                    <DialogTitle id="Form-Dialog-Skills">Manage Employees Levels & Skills</DialogTitle>
                    <Formsy
                        onValidSubmit={this.handleSubmitSkills}
                    >
                        <DialogContent className="flex flex-col justify-center">
                            {managedUser && (managedUser.skills.length > 0 &&
                                (<Paper className={classes.root}>
                                    {managedUser && (managedUser.skills.map(skill =>
                                    {
                                        return (
                                            <Chip
                                                key={skill._id}
                                                label={skill.skill.name}
                                                className={classes.chip}
                                                onDelete={() => this.handleSubmitDeleteSkill(skill)}
                                            />
                                        );
                                    }))}
                                </Paper>))}

                            <FormControl className="mb-8">
                                <InputLabel htmlFor="skill">Choose The Skill</InputLabel>
                                <Select
                                    value={this.state.skill}
                                    onChange={this.handleSkillChange}
                                    inputProps={{
                                        name: 'skill',
                                        id: 'skill',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Choose The Skill</em>
                                    </MenuItem>
                                    {skills.length > 0 && (skills.map((skill) =>
                                        {
                                            var b = true;
                                            if (managedUser && (managedUser.skills.length > 0))
                                            {
                                                managedUser.skills.map((competence) =>
                                                {
                                                    if (skill._id === competence.skill._id)
                                                    {
                                                        b = false;
                                                    }
                                                });
                                            }
                                            if (b === true)
                                            {
                                                return <MenuItem value={skill._id} key={skill._id}>
                                                    {skill.name}
                                                </MenuItem>
                                            }
                                        }
                                    ))}
                                </Select>
                            </FormControl>

                            <FormControl className="mb-8">
                                <InputLabel htmlFor="seniority">Choose The Seniority</InputLabel>
                                <Select
                                    value={this.state.seniority}
                                    onChange={this.handleSeniorityChange}
                                    inputProps={{
                                        name: 'seniority',
                                        id: 'seniority',
                                    }}
                                >
                                    <MenuItem value="">
                                        <em>Choose The Seniority</em>
                                    </MenuItem>
                                    {seniorities.map((seniority) =>
                                        {
                                            return <MenuItem value={seniority.value} key={seniority.value}>
                                                {seniority.label}
                                            </MenuItem>
                                        }
                                    )}
                                </Select>
                            </FormControl>

                            <TextFieldFormsy
                                label="Years Of Experience"
                                value={this.state.years}
                                onChange={this.handleYearsOfExperienceChange}
                                type="number"
                                name="years"
                                className="mb-8"
                            />

                            <TextField
                                id="skillName"
                                label="Skill Name"
                                type="text"
                                name="skillname"
                                className="mb-8"
                                fullWidth
                                value={this.state.skillName}
                                onChange={this.handleSkillNameChange}
                                helperText={this.props.skillname.status ? '' : this.props.skillname.message}
                                error={!this.props.skillname.status}
                            />
                        </DialogContent>
                        <DialogActions>
                            <Button onClick={this.handleResetSkillsDialog} color="primary">
                                Reset
                            </Button>
                            <Button type="submit" color="primary">
                                Add Skill To User's Competences
                            </Button>
                        </DialogActions>
                    </Formsy>
                </Dialog>

                <Dialog
                    open={this.state.openPhotoDialog}
                    onClose={this.handleClosePhotoDialog}
                    aria-labelledby="Form-Dialog-Photo"
                >
                    <DialogTitle id="Form-Dialog-Skills">Change {managedUser && (managedUser.firstName + "'s")} Photo</DialogTitle>
                    <DialogContent className="flex flex-col items-center">

                        <Avatar alt="Avatar" src={this.state.image ?
                            this.state.image : "/assets/images/avatars/profile.jpg"}
                                className={classes.bigAvatar} />

                        <label htmlFor="file" className={classes.inputFileLabel}>CHOOSE AN IMAGE (PNG, JPEG, BMP, ...)</label>
                        <input align="center" className={classes.inputFile} name="file" id="file" type="file" onChange={(e)=>this.handleImageChange(e)} />

                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleResetPhotoDialog} color="primary">
                            Delete {managedUser && (managedUser.firstName + "'s")} Photo
                        </Button>
                    </DialogActions>
                </Dialog>
            </React.Fragment>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readUsers: authActions.readEmployees,
        readUser: authActions.readUser,
        readSkills: Actions.readSkills,
        verifySkillName: Actions.checkSkillName,
        submitAddSkill: authActions.addSkill,
        submitDeleteSkill: authActions.deleteSkill,
        submitChangePhoto: authActions.uploadImage,
        submitDeletePhoto: authActions.deleteImage,
        showMessage: showMessage
    }, dispatch);
}

function mapStateToProps({auth, scrum})
{
    return {
        users: scrum.employees,
        skills: scrum.skills,
        managedUser: auth.managedUser,
        skillname: scrum.skillname
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (UsersList)));