import React, {PureComponent} from 'react';
import {Card, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import DemoFrame from './DemoFrame';

const propTypes = {
    component      : PropTypes.func,
    raw            : PropTypes.string,
    currentTabIndex: PropTypes.number
};

const defaultProps = {
    currentTabIndex: 0
};

const styles = theme => ({
    root: {}
});

class FuseExample extends PureComponent {

    render()
    {
        const {className, component: Component, iframe} = this.props;
        return (
            <Card className={className}>
                <div className="flex justify-center">
                    <div className="flex flex-1">
                        {Component && (
                            iframe ? (
                                <DemoFrame>
                                    <Component/>
                                </DemoFrame>
                            ) : (
                                <div className="p-4 flex flex-1 justify-center">
                                    <Component/>
                                </div>
                            )
                        )}
                    </div>
                </div>
            </Card>
        )
    }
}

FuseExample.propTypes = propTypes;
FuseExample.defaultProps = defaultProps;

export default withStyles(styles)(FuseExample);
