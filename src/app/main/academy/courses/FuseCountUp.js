import React, {Component} from 'react';
import {Typography, withStyles} from '@material-ui/core';
import PropTypes from 'prop-types';
import moment from 'moment';
import classNames from 'classnames';

const propTypes = {
    endDate   : PropTypes.oneOfType([PropTypes.string, PropTypes.object]).isRequired,
    onComplete: PropTypes.func,
    color: PropTypes.string,
    daily:PropTypes.bool,
    hours:PropTypes.bool
};

const defaultProps = {
    endDate: moment().add(15, 'days'),
    color:"textSecondary",
    daily:true,
    hours:true
};

const styles = theme => ({
    root: {}
});

class FuseCountup extends Component {

    state = {
        endDate  : moment.isMoment(this.props.endDate) ? this.props.endDate : moment(this.props.endDate),
        countdown: {
            days   : '',
            hours  : '',
            minutes: '',
            seconds: ''
        }
    };

    componentDidMount()
    {
        this.tick();
        this.interval = setInterval(() => {
            this.tick()
        }, 1000);
    }

    componentWillUnmount()
    {
        window.clearInterval(this.interval);
    }

    tick()
    {
        const {endDate} = this.state;

        const currDate = moment();
        const diff = currDate.diff(endDate, 'seconds');
        if ( diff < 0 )
        {
            this.complete();
            return;
        }
        const timeLeft = moment.duration(diff, 'seconds');
        this.setState({
            countdown: {
                days   : timeLeft.asDays().toFixed(0),
                hours  : timeLeft.hours(),
                minutes: timeLeft.minutes(),
                seconds: timeLeft.seconds()
            }
        });
    }

    complete()
    {
        window.clearInterval(this.interval);
        if ( this.props.onComplete )
        {
            this.props.onComplete();
        }
    }

    render()
    {
        const {classes} = this.props;
        const {countdown} = this.state;

        return (
            <div className={classNames(classes.root, "flex items-center", this.props.className)}>
            {
                this.props.daily?
                (
                    <div className="flex flex-col items-center justify-center px-12">
                    <Typography style={{color:this.props.color}} variant="h4" className="mb-4">
                        {countdown.days}
                    </Typography>
                    <Typography style={{color:this.props.color}} variant="caption" color="textSecondary">
                        days
                    </Typography>
                </div>
                ):
                (
                    null
                )
            }

            {
                this.props.hours?
                (
                    <div className="flex flex-col items-center justify-center px-12">
                    <Typography style={{color:this.props.color}} variant="h4" className="mb-4">
                        {countdown.hours}
                    </Typography>
                    <Typography style={{color:this.props.color}} variant="caption" color="textSecondary">
                        hours
                    </Typography>
                </div>
                ):
                (
                    null
                )
            }
               
                <div className="flex flex-col items-center justify-center px-12">
                    <Typography style={{color:this.props.color}} variant="h4" className="mb-4">
                        {countdown.minutes}
                    </Typography>
                    <Typography style={{color:this.props.color}} variant="caption" color="textSecondary">
                        minutes
                    </Typography>
                </div>
                <div className="flex flex-col items-center justify-center px-12">
                    <Typography style={{color:this.props.color}} variant="h4" className="mb-4">
                        {countdown.seconds}
                    </Typography>
                    <Typography style={{color:this.props.color}} variant="caption" color="textSecondary">
                        seconds
                    </Typography>
                </div>
            </div>
        );
    }
}

FuseCountup.propTypes = propTypes;
FuseCountup.defaultProps = defaultProps;

export default withStyles(styles)(FuseCountup);
