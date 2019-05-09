import React from 'react';
import {
    TableHead,
    TableSortLabel,
    TableCell,
    TableRow,
    Checkbox,
    Tooltip,
    IconButton,
    Icon,
    Menu,
    MenuList,
    MenuItem,
    ListItemIcon,
    ListItemText,
    withStyles
} from '@material-ui/core';
import classNames from 'classnames';

const rows = [
   
    {
        id            : 'Question',
        align         : 'left',
        disablePadding: false,
        label         : 'Question',
        sort          : true
    },
    {
        id            : 'Wrong Answers',
        align         : 'left',
        disablePadding: false,
        label         : 'Wrong Answers',
        sort          : true
    },
    {
        id            : 'Correct Answer',
        align         : 'right',
        disablePadding: false,
        label         : 'Correct Answer',
        sort          : true
    },
    {
        id            : 'Skills',
        align         : 'right',
        disablePadding: false,
        label         : 'Skills',
        sort          : true
    },
    // {
    //     id            : 'active',
    //     align         : 'right',
    //     disablePadding: false,
    //     label         : 'Active',
    //     sort          : true
    // }
];

const styles = theme => ({
    actionsButtonWrapper: {
        background: theme.palette.background.paper
    }
});

class QuizzesTableHead extends React.Component {
    state = {
        selectedProductsMenu: null
    };

    createSortHandler = property => event => {

        this.props.onRequestSort(event, property);
    };

    openSelectedProductsMenu = (event) => {
        this.setState({selectedProductsMenu: event.currentTarget});
    };

    closeSelectedProductsMenu = () => {
        this.setState({selectedProductsMenu: null});
    };

    render()
    {
        const {onSelectAllClick, order, orderBy, numSelected, rowCount, classes} = this.props;
        const {selectedProductsMenu} = this.state;

        return (
            <TableHead>
                <TableRow className="h-64">
                   
                    {rows.map(row => {
                        return (
                            <TableCell
                                key={row.id}
                                align={row.align}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.sort && (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.align === "right" ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                )}
                            </TableCell>
                        );
                    }, this)}
                </TableRow>
            </TableHead>
        );
    }
}

export default withStyles(styles, {withTheme: true})(QuizzesTableHead);
