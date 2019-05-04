import React, {Component} from 'react';
import {Typography} from '@material-ui/core';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import connect from 'react-redux/es/connect/connect';
import * as Actions from '../store/actions';

class BoardListHeader extends Component {

    state = {
        anchorEl   : null,
        renameForm : false,
        renameTitle: this.props.list.name
    };

    handleClick = event => {
        this.setState({anchorEl: event.currentTarget});
    };

    handleClose = () => {
        this.setState({anchorEl: null});
    };

    renameFormToggle = (state) => {
        this.setState({
            renameForm : state,
            renameTitle: this.props.list.name,
            anchorEl   : null
        })
    };

    onRenameTitleChange = (ev) => {
        this.setState({renameTitle: ev.target.value})
    };

    renameTitleSubmit = (ev) => {
        ev.preventDefault();
        if ( !this.canSubmit() )
        {
            this.renameFormToggle(false);
            return;
        }
        this.setState({
            renameForm : false,
            renameTitle: this.state.renameTitle,
            anchorEl   : null
        });
        this.props.renameList(this.props.board.id, this.props.list.id, this.state.renameTitle);
    };

    canSubmit = () => {
        return this.state.renameTitle !== '';
    };

    render()
    {
        const {list, handleProps} = this.props;

        return (
            <div {...handleProps}>
                <div className="flex items-center justify-center h-64 pl-16 pr-8">
                    <div className="flex items-center min-w-0">
                        <Typography className="text-16 font-bold">
                            {list.Title}
                        </Typography>
                    </div>
                </div>

            </div>
        );
    }
}


function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        renameList: Actions.renameList,
        removeList: Actions.removeList
    }, dispatch);
}

function mapStateToProps({scrumboardApp})
{
    return {
        board: scrumboardApp.board
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(BoardListHeader));
