import React, {Component} from 'react';
import {
    AppBar,
    Avatar,
    Button,
    Card,
    CardActions,
    CardContent,
    CardHeader,
    Divider,
    Icon,
    IconButton,
    Input,
    List,
    ListItem,
    ListItemText,
    Paper,
    Toolbar,
    Typography
} from '@material-ui/core';
import moment from 'moment';
import {Link} from 'react-router-dom';
import classNames from 'classnames';
import {FuseAnimate} from '@fuse';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import {withRouter} from 'react-router-dom';
import _ from '@lodash';
import * as Actions from '../store/actions/index';
import MailChip from '../MailChip';

class MailDetails extends Component {

    state = {showDetails: false};

    componentDidMount()
    {
        this.props.getMail(this.props.match.params);
    }

    render()
    {
        const {mail, labels} = this.props;

        if ( !mail )
        {
            return '';
        }

        return (
            <Card className="mb-32 overflow-hidden" key={mail.id}>
                                    <CardHeader
                                        avatar={


                                            mail.user.avatar ? (
                                                <Avatar className="mr-8" alt={mail.from.name} src={mail.from.avatar}/>
                                            ) : (
                                                <Avatar className= "mr-8">
                                                  {mail.user.firstName[0]} {mail.user.lastName[0]}
                                                </Avatar>
                                            )
                                           
                                        }
                                        action={
                                            <IconButton aria-label="more">
                                                <Icon>more_vert</Icon>
                                            </IconButton>
                                        }
                                        title={(
                                            <span>
                                                <Typography className="inline font-medium mr-4" color="primary" paragraph={false}>
                                                <strong>  {mail.user.firstName}  {mail.user.lastName}</strong>
                                                </Typography>
                                                {mail.type === 'mail' && "posted on your timeline"}
                                                {mail.type === 'something' && "shared something with you"}
                                                {mail.type === 'video' && "shared a video with you"}
                                                {mail.type === 'article' && "shared an article with you"}
                                            </span>
                                        )}
                                        subheader={moment( mail.time).fromNow().toString()}
                                    />

                                    <CardContent className="py-0">
                                        {mail.message && (
                                            <Typography component="p" className="mb-16">
                                                {mail.message}
                                            </Typography>
                                        )}

                                        {mail.media && (
                                            <img
                                                src={mail.media.preview}
                                                alt="mail"
                                            />
                                        )}

                                        {mail.article && (
                                            <div className="border-1">
                                                <img className="w-full border-b-1" src={mail.article.media.preview} alt="article"/>
                                                <div className="p-16">
                                                    <Typography variant="subtitle1">{mail.article.title}</Typography>
                                                    <Typography variant="caption">{mail.article.subtitle}</Typography>
                                                    <Typography className="mt-16">{mail.article.excerpt}</Typography>
                                                </div>
                                            </div>
                                        )}
                                    </CardContent>

                                    <CardActions className="" disableActionSpacing>
                                        <Button size="small" aria-label="Add to favorites">
                                            <Icon className="text-16 mr-8" color="action">favorite</Icon>
                                            <Typography className="normal-case">Like</Typography>
                                            <Typography className="normal-case ml-4">({mail.like})</Typography>
                                        </Button>
                                        <Button aria-label="Share">
                                            <Icon className="text-16 mr-8" color="action">share</Icon>
                                            <Typography className="normal-case">Share</Typography>
                                            <Typography className="normal-case ml-4">({mail.share})</Typography>
                                        </Button>
                                    </CardActions>

                                    <AppBar className="card-footer flex flex-column p-16" position="static" color="default" elevation={0}>

                                        {mail.solution && mail.solution.length > 0 && (
                                            <div className="">
                                                <div className="flex items-center">
                                                    <Typography>
                                                        {mail.solution.length} answers
                                                    </Typography>
                                                    <Icon className="text-16 ml-4" color="action">keyboard_arrow_down</Icon>
                                                </div>

                                                <List>
                                                    {mail.solution.map((comment) => (
                                                        <div key={comment._id}>
                                                            <ListItem className="px-0">
                                                            <Avatar className= "mr-8">
                                                  {comment.added_by.firstName[0]} {comment.added_by.lastName[0]}
                                                </Avatar>
                                                                <ListItemText
                                                                    primary={(
                                                                        <div>
                                                                            <Typography className="inline font-medium" color="default" paragraph={false}>
                                                                            <strong>  {mail.user.firstName}  {mail.user.lastName}</strong>
                                                                            </Typography>
                                                                            <Typography className="inline ml-4" variant="caption">
                                                                                {moment( comment.added_at).fromNow().toString()}
                                                                            </Typography>
                                                                        </div>
                                                                    )}
                                                                    secondary={comment.content}
                                                                />
                                                            </ListItem>
                                                            <div className="flex items-center ml-56 mb-8">
                                                                <Link to="#" className="mr-8">Reply</Link>
                                                                <Icon className="text-14 cursor-pointer">flag</Icon>
                                                            </div>
                                                        </div>
                                                    ))}
                                                </List>
                                            </div>
                                        )}

                                        <div className="flex flex-auto">
                                            <Avatar src="assets/images/avatars/profile.jpg"/>
                                            <div className="flex-1 pl-8">
                                                <Paper elevation={0} className="w-full mb-16">
                                                    <Input
                                                        className="p-8 w-full border-1"
                                                        classes={{root: 'text-13'}}
                                                        placeholder="Add a comment.."
                                                        multiline
                                                        rows="6"
                                                        margin="none"
                                                        disableUnderline
                                                    />
                                                </Paper>
                                                <Button className="normal-case" variant="contained" color="primary" size="small">Post Comment</Button>
                                            </div>
                                        </div>
                                    </AppBar>
                                </Card>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getMail: Actions.getMail
    }, dispatch);
}

function mapStateToProps({mailApp})
{
    return {
        mail  : mailApp.mail,
        labels: mailApp.labels
    }
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(MailDetails));
