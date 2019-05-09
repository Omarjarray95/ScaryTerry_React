import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from 'app/store/actions/scrum';
import moment from "moment";
import red from "@material-ui/core/colors/red";
import yellow from "@material-ui/core/colors/yellow";
import green from "@material-ui/core/colors/green";
import Chip from '@material-ui/core/Chip';
import { withStyles } from '@material-ui/core/styles';
import history from '../../../history';

const styles = theme => (
    {
        chipPending:
        {
            color: theme.palette.getContrastText(red[500]),
            backgroundColor: red[500],
        },
        chipInProgress:
        {
            color: theme.palette.getContrastText(yellow[500]),
            backgroundColor: yellow[500],
        },
        chipDone:
        {
            color: theme.palette.getContrastText(green[500]),
            backgroundColor: green[500],
        },
        chip: {
            margin: theme.spacing.unit,
        }
    });

class ProjectsList extends Component {

    state = {
    };

    getFilteredArray = (entities) =>
    {
        const arr = Object.keys(entities).map((_id) => entities[_id]);
        arr.map((project) =>
            (
                project.creationDate = moment(project.creationDate).format("YYYY-MM-DD").toString()
            ));
        return arr;
    };

    componentDidMount()
    {
        this.props.readProjects();
    }

    render()
    {
        const {projects, classes} = this.props;
        const data = this.getFilteredArray(projects);

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No Projects Found.
                    </Typography>
                </div>
            );
        }

        return (
                <ReactTable
                    className="-striped -highlight border-0"
                    getTrProps={(state, rowInfo, column) => {
                        return {
                            className: "cursor-pointer",
                            onClick  : (e, handleOriginal) => {
                                if ( rowInfo )
                                {
                                    history.push('/projects/get/' + rowInfo.original._id);
                                }
                            }
                        }
                    }}
                    data={data}
                    columns={[
                        {
                            Header    : "Project Title",
                            accessor  : "title",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Client",
                            accessor  : "entreprise.name",
                            filterable: true,
                        },
                        {
                            Header    : "Program",
                            accessor  : "program.name",
                            filterable: true,
                        },
                        {
                            Header    : "Created At",
                            accessor  : "creationDate",
                            filterable: true,
                            className : "font-bold"
                        },
                        {
                            Header    : "Status",
                            accessor  : "state",
                            filterable: true,
                            Cell     : row => (
                                (<Chip label={row.value} className={row.value === "Pending" ? classes.chipPending :
                                row.value === "In Progress" ? classes.chipInProgress :
                                row.value === "Done" ? classes.Done : classes.chip} />)
                        ),
                        }
                    ]}
                    defaultPageSize={10}
                    noDataText="No Projects Found."
                />
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readProjects: Actions.readProjects
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        projects: scrum.projects
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (ProjectsList)));
