import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {connect} from 'react-redux';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import ReactTable from "react-table";
import * as Actions from 'app/store/actions/scrum';
import { withStyles } from '@material-ui/core/styles';

const styles = theme => (
    {

    });

class SkillsList extends Component
{

    state = {
    };

    getFilteredArray = (entities) =>
    {
        return Object.keys(entities).map((_id) => entities[_id]);
    };

    componentDidMount()
    {
        this.props.readSkills();
    }

    render()
    {
        const {skills, classes} = this.props;
        const data = this.getFilteredArray(skills);

        if ( !data && data.length === 0 )
        {
            return (
                <div className="flex items-center justify-center h-full">
                    <Typography color="textSecondary" variant="h5">
                        No Skills Found.
                    </Typography>
                </div>
            );
        }

        return (
            <ReactTable
                className="-striped -highlight border-0"
                getTrProps={(state, rowInfo, column) =>
                {
                    return {
                        className: "cursor-pointer"
                    }
                }}
                data={data}
                columns={[
                    {
                        Header    : "Competence",
                        accessor  : "name",
                        filterable: true,
                        className : "font-bold",
                    },
                    {
                        Header    : "Description",
                        accessor  : "description",
                        filterable: true,
                    }
                ]}
                defaultPageSize={5}
                noDataText="No Skills Found."

            />
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        readSkills: Actions.readSkills
    }, dispatch);
}

function mapStateToProps({scrum})
{
    return {
        skills: scrum.skills
    }
}

export default withStyles(styles) (withRouter(connect(mapStateToProps, mapDispatchToProps) (SkillsList)));