import React, {Component} from 'react';
import {
    withStyles,
    Button,
    Card,
    CardContent,
    OutlinedInput,
    Icon,
    TextField,
    Typography,
    CardActions,
    Divider,
    Select,
    InputLabel,
    FormControl,
    MenuItem,
    LinearProgress
} from '@material-ui/core';
import axios from 'axios';

import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import moment from 'moment';
import CircularProgress from '@material-ui/core/CircularProgress';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormLabel from '@material-ui/core/FormLabel';
import {FuseAnimate, FuseAnimateGroup,FuseCountdown,FuseMessage} from '@fuse';
import withReducer from 'app/store/withReducer';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import classNames from 'classnames';
import _ from '@lodash';
import {Link} from 'react-router-dom';
import * as Actions from '../store/actions';
import {showMessage} from '../../../store/actions/fuse/message.actions'
import reducer from '../store/reducers';
import FuseCountup from './FuseCountUp'
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';

const styles = theme => ({
    header    : {
        background: 'linear-gradient(to right, ' + theme.palette.primary.dark + ' 0%, ' + theme.palette.primary.main + ' 100%)',
        color     : theme.palette.getContrastText(theme.palette.primary.main)
    },
    headerIcon: {
        position     : 'absolute',
        top          : -64,
        left         : 0,
        opacity      : .04,
        fontSize     : 512,
        width        : 512,
        height       : 512,
        pointerEvents: 'none'
    }
});

class Courses extends Component {
    constructor(props) {
        super(props);
        this.state = {
            data: this.props.courses,
            open: false,
            open2:false,
            dialogcolor:"",
            dialogtitlecolor:"",
            currentprojecttitle:"",
            currentmeetingdate:"",
            selectproject:"",
            selectedsprint:"",
            nextmeeting:'',
            SP:true,
            currentmeeting:"",
            value:"",
            datevalue:null,
            question:"",
            currentQuestions:[]
        };
       // this.setInputState = this.setInputState.bind(this);
       this.selectprojectonclick=this.selectprojectonclick.bind(this)
       this.handlequestionchange=this.handlequestionchange.bind(this);
      }
    

   async componentDidMount()
    {
        await this.props.getCategories();
        await this.props.getCourses();
        await this.getnextmeeting();
    }
    handlequestionchange= (e) =>{
        this.setState({question:e.target.value})
    }
    componentDidUpdate(prevProps, prevState)
    {
        if ( !_.isEqual(this.props.courses, prevProps.courses) ||
            !_.isEqual(this.props.searchText, prevProps.searchText) ||
            !_.isEqual(this.props.categoryFilter, prevProps.categoryFilter)
        )
        {
            const data = this.getFilteredArray(this.props.courses, this.props.searchText, this.props.categoryFilter);
            this.setState({data})
        }
    }
    handlesubmitmeeting = () =>{
        this.setState({ open2: false });
        axios.get('http://localhost:3001/meetings/bbaddmeeting', {
            params: {
              start: new Date(this.state.datevalue).toISOString(),
              sprint:this.state.selectedsprint,
              name:this.state.value 
            }}).then(results => {
                
               
                this.props.getCourses();
		});
    }
    handleClickOpen = () => {
        this.setState({ open: true });
      };
    
      handleClose = () => {
        this.setState({ open: false });
      };
      handlequestion= () => {
        this.setState({ open: false });
        showMessage({
            message     : 'Question successfully added',//text or html
            autoHideDuration: 6000,//ms
            anchorOrigin: {
                vertical  : 'top',//top bottom
                horizontal: 'right'//left center right
            },
            variant: 'success'//success error info warning null
        })
        axios.get('http://localhost:3001/meetings/addquestion', {
            params: {
              event:this.state.currentmeeting,
              user: localStorage.getItem('id'),
              content:this.state.question
            }}).then(results => {
                
                this.state.question=""
                this.props.getCourses();

		});

      };
      handleClickOpen2 = () => {
        this.setState({ open2: true });
      };
    
      handleClose2 = () => {
        this.setState({ open2: false });
      };
    getFilteredArray = (data, searchText, categoryFilter) => {
        if ( searchText.length === 0 && categoryFilter === "all" )
        {
            return data;
        }

        return _.filter(data, item => {
            if ( categoryFilter !== "all" && item.category !== categoryFilter )
            {
                return false;
            }
            return item.title.toLowerCase().includes(searchText.toLowerCase())
        });
    };

    buttonStatus = (course) => {
        switch ( course.activeStep )
        {
            case course.totalSteps:
                return "COMPLETED";
            case 0:
                return "START";
            default:
                return "CONTINUE";
        }
    };
    getnextmeeting()
    {  // var s=null;
       
 
           this.state.nextmeeting=this.state.data.find(x=>moment(x.start)>=moment()).start;
           console.log(this.state.nextmeeting);
    
    }
    selectprojectonclick=(event)=>{
        this.props.getSprints(event.target.value);
        this.setState({selectproject: event.target.value});
       
    }
    handleChange=(event)=>{
        //this.props.getSprints(event.target.value);
        this.setState({value: event.target.value});
       
    }
    handledateChange=(event)=>{
        //this.props.getSprints(event.target.value);
        this.setState({datevalue: event.target.value});
       
    }
    selectsprintonclick=(event)=>{
        //this.props.getSprints(event.target.value);
        this.setState({selectedsprint: event.target.value});
       
    }
    render()
    {
        const {classes, setSearchText, searchText, categories, categoryFilter, setCategoryFilter, theme} = this.props;

        const {data} = this.state;

        return (
            <div className="w-full">

<Dialog
          open={this.state.open2}
          onClose={this.handleClose2}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className='flex flex-col items-center justify-center text-center' id="form-dialog-title">Schedule meeting</DialogTitle>
          <DialogContent className='flex flex-col items-center justify-center text-center' >
            <DialogContentText className="my-12"  >
             
            </DialogContentText>
            <FormControl style={{marginTop:"10%"}} className="my-12"  className='flex flex-col items-center justify-center text-center' className="flex w-full sm:w-320 mx-" variant="outlined">
                            <InputLabel  htmlFor="category-label-placeholder">
                            Projects
                            </InputLabel>
                            <Select
                                value={this.state.selectproject}
                                onChange={this.selectprojectonclick}
                                input={
                                    <OutlinedInput
                                        labelWidth={("category".length * 9)}
                                        name="category"
                                        id="category-label-placeholder"
                                    />
                                }
                            >
                                <MenuItem disabled  value="all">
                                    <em>Choose a project</em>
                                </MenuItem>

                                {categories.filter(x=>x.scrumMaster===localStorage.getItem('id')).map(category => (
                                    <MenuItem value={category.value} key={category.id}>{category.label}</MenuItem>
                                ))}
                                            
                            </Select>
                        </FormControl>
                        {   this.state.selectproject.length>5?
                        (
                            this.props.sprints.length?
                            (   
                                <FormControl style={{marginTop:"5%"}} className="my-12"  className='flex flex-col items-center justify-center text-center' className="flex w-full sm:w-320 mx-" variant="outlined">
                                <InputLabel  htmlFor="category-label-placeholder">
                                Sprints
                                </InputLabel>
                                <Select
                                    value={this.state.selectedsprint}
                                    onChange={this.selectsprintonclick}
                                    input={
                                        <OutlinedInput
                                            labelWidth={("category".length * 9)}
                                            name="category"
                                            id="category-label-placeholder"
                                        />
                                    }
                                >
                                    <MenuItem disabled  value="all">
                                        <em>Specify the sprint</em>
                                    </MenuItem>
    
                                    {this.props.sprints.map(category => (
                                        <MenuItem value={category._id} key={category._id}>{category.goal}</MenuItem>
                                    ))}
                                                
                                </Select>
                            </FormControl>  
                            ):(<div style={{marginTop:"10%"}}>
 <Typography>No sprints attributed to this project.</Typography>
  <Typography>Please proceed to add a sprint to your project before scheduling a meeting</Typography>
                            </div>
                                   
                            )
                        ):
                        (
                            null
                        )

                        }

                    {
                        this.state.selectedsprint?
                        (
                            <div>
                                                        <FormControl   component="fieldset" className={classes.formControl}>
          <FormLabel component="legend">Meeting type</FormLabel>
          <RadioGroup
            aria-label="Gender"
            name="gender1"
            className={classes.group}
            value={this.state.value}
            onChange={this.handleChange}
          >
            <FormControlLabel value="SP" control={<Radio />} label="Sprint planning" />
            <FormControlLabel value="DM" control={<Radio />} label="Daily meeting" />
            <FormControlLabel value="REVIEW" control={<Radio />} label="Sprint Review" />
            <FormControlLabel value="RETRO" control={<Radio />} label="Retrospective" />

          </RadioGroup>
        </FormControl>
        
<form className={classes.container} noValidate>
      <TextField

        id="datetime-local"
        label="Meeting date"
        type="datetime-local"
        
        value={this.state.datevalue}
        className={classes.textField}
        onChange={(event) => this.setState({datevalue: event.target.value})}
        InputLabelProps={{
          shrink: true,
        }}
      />
    </form>
                            </div>
                        ):
                        (
                            null
                        )
                    }

        
           {this.state.value}
           {this.state.datevalue}
         
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleClose2} color="primary">
            Cancel
            </Button>
            <Button disabled={!this.state.datevalue} onClick={this.handlesubmitmeeting} color="primary">
              Schedule
            </Button>
          </DialogActions>
        </Dialog>

        <Dialog
          open={this.state.open}
          onClose={this.handleClose}
          aria-labelledby="form-dialog-title"
        >
          <DialogTitle className='flex flex-col items-center justify-center text-center' style={{backgroundColor:this.state.dialogcolor}} id="form-dialog-title">
          <Typography  style={{color:this.state.dialogtitlecolor }} variant="title" >{this.state.currentprojecttitle} : Sprint Full Name</Typography>
        </DialogTitle>
        <Divider></Divider>
          <DialogContent  className='flex flex-col items-center justify-center text-center'  >
            <DialogContentText  className='flex flex-col items-center justify-center text-center' >
            {

                moment(this.state.currentmeetingdate)>moment()?
                (<div>
                    <Typography variant="h5"  className="my-12" >Meeting in :  </Typography>
                    <FuseCountdown  endDate={this.state.currentmeetingdate} className="my-12"/>
                </div>
                )
                :
                (
                      <div>
                    <Typography variant="h5"  className="my-12" >The meeting is late by :  </Typography>
                    <FuseCountup color="red" endDate={this.state.currentmeetingdate} className="my-12"/>
                     </div>
                )
            }
               
           

            <br></br>
            <div className='flex flex-col items-center justify-center text-center' >
            <Typography variant='body2' >You can leave your question or any remark to make about this sprint down here to talk about during the meeting.</Typography>
</div>

            </DialogContentText>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Question"
              type="email"
              fullWidth
              value={this.state.question}
              onChange={this.handlequestionchange}
            />
          </DialogContent>
          <DialogActions>

            <Link to={'meeting/'+this.state.currentmeeting} onClick={this.logout}>Meeting page</Link>
            <Button onClick={this.handlequestion} color="primary">
              Add
            </Button>
          </DialogActions>
        </Dialog>
                <div className={classNames(classes.header, "relative overflow-hidden flex flex-col items-center justify-center text-center p-16 sm:p-24 h-200 sm:h-288")}>

                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Typography color="inherit" className="text-24 sm:text-40 font-light">
                            WELCOME TO YOUR MEETING BOARD
                        </Typography>
                        
                    </FuseAnimate>
                    {   this.props.courses[0]!==undefined?
                    (
                        this.props.courses.find(x=>moment(new Date(x.start))>moment())?
                        ( 
                        
                        
                        <div><FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                        <Typography color="inherit" className="text-24 sm:text-35 font-light">
                          TODAY'S MEETING AT:
                        </Typography>
                        
                    </FuseAnimate>
                    <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
              
                                <FuseCountdown color="white" endDate={ this.props.courses.sort(function(o){ return moment(new Date(o.start)) }).reverse().find(x=>moment(new Date(x.start))>moment()).start} className="my-20"/>
                     
                                </FuseAnimate></div>
                        ):
                        (   
                            <FuseAnimate animation="transition.slideUpIn" duration={400} delay={100}>
                            <Typography color="inherit" className="text-24 sm:text-35 font-light">
                              NO MEETINGS TODAY 
                              
                             
                            
                            </Typography>
                            
                        </FuseAnimate>

                   

)
                    ):
                    (
                                null
                    )

                        
}

                    <Icon className={classes.headerIcon}>school</Icon>
                </div>

                <div className="max-w-2xl w-full mx-auto px-8 sm:px-16 py-24">
                    <div className="flex flex-col sm:flex-row items-center justify-between py-24">
                        <TextField
                            label="Search for a course"
                            placeholder="Enter a keyword..."
                            className="flex w-full sm:w-320 mb-16 sm:mb-0 mx-16"
                            value={searchText}
                            inputProps={{
                                'aria-label': 'Search'
                            }}
                            onChange={setSearchText}
                            variant="outlined"
                            InputLabelProps={{
                                shrink: true
                            }}
                        />
                        <FormControl className="flex w-full sm:w-320 mx-16" variant="outlined">
                            <InputLabel htmlFor="category-label-placeholder">
                            Projects
                            </InputLabel>
                            <Select
                                value={categoryFilter}
                                onChange={setCategoryFilter}
                                input={
                                    <OutlinedInput
                                        labelWidth={("category".length * 9)}
                                        name="category"
                                        id="category-label-placeholder"
                                    />
                                }
                            >
                                <MenuItem value="all">
                                    <em>All</em>
                                </MenuItem>

                                {categories.map(category => (
                                    <MenuItem value={category.value} key={category.id}>{category.label}</MenuItem>
                                ))}
                            </Select>
                        </FormControl>
                    </div>
                    <FuseAnimateGroup
                        enter={{
                            animation: "transition.slideUpBigIn"
                        }}
                        className="flex flex-wrap py-24"
                    >
                        {data.length === 0 && (
                            <div className="flex flex-1 items-center justify-center">
                                <div style={{flexGrow:1,marginTop:'20%'}}>
                                    <LinearProgress />
                                    <br />
                                    <LinearProgress color="secondary" />
                                    </div>
                            </div>
                        )}



                            {
                                data.length?
                                (
                                    <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key="999">
                                    <Card elevation={1} className="flex flex-col justify-center h-256">
                                        <div
                                            className="flex flex-no-shrink items-center justify-center px-24 h-64"
                                            style={{
                                                background: "#32CD32",
                                                color     : "white"
                                            }}
                                        >
                                            <Typography className="font-medium truncate" color="inherit">SCHEDULE MEETING</Typography>
                                            
                                        </div>
                                        <CardContent className="flex flex-col flex-auto items-center justify-center">
                                        <Icon style={{color:"limegreen"}} className="text-40 mr-20" color="inherit"> library_add</Icon>

                                        </CardContent>
                                        <Divider/>
                                        <CardActions className="justify-center">
                                        <Button
                                                    onClick={this.handleClickOpen2}
                                                      
                                                    >
                                                   SCHEDULE
                                                    </Button>  
                                            
                                        </CardActions>
                        
                                    </Card>
                                </div>
                                ):
                                (
                                    null
                                )

                                

                            

                         
                                }
                        {data.map((course) => {
                            console.log(categories);
                            const category = categories.find(_cat => _cat.value === course.project._id);
                            return (
                                <div className="w-full pb-24 sm:w-1/2 lg:w-1/3 sm:p-16" key={course.id}>
                                    <Card elevation={1} className="flex flex-col h-256">
                                        <div
                                            className="flex flex-no-shrink items-center justify-between px-24 h-64"
                                            style={{
                                                background: category.color,
                                                color     : theme.palette.getContrastText(category.color)
                                            }}
                                        >
                                            <Typography className="font-medium truncate" color="inherit">{category.label}</Typography>
                                            {
                                                    course.real_time_start?(    <div className="flex items-center justify-center opacity-75">
                                                <Icon className="text-20 mr-8" color="inherit">access_time</Icon>
                                            
                                                        <div className="text-16 whitespace-no-wrap">{course.length} min</div>   
                                                 
                                                
                                            </div>
                                            ):
                                            (
                                             <Typography style={{ color     : theme.palette.getContrastText(category.color)}} variant="h4">-</Typography>
                                            )
                                        }
                                        </div>
                                        <CardContent className="flex flex-col flex-auto items-center justify-center">
                                            <Typography className="text-center text-16 font-400">{course.sprint.goal}</Typography>
                                            <Typography className="text-center text-13 font-600 mt-4" color="textSecondary">{moment(course.start).format('LLLL')}</Typography>
                                        </CardContent>
                                        <Divider/>
                                        <CardActions className="justify-center">
                                        {   true?
                                        (
                                            course.real_time_start?
                                            (
                                                course.real_time_end?
                                                (
                                                    <Button
                                                    onClick={() => {this.setState({currentQuestions:course.question});this.setState({currentprojecttitle:course.project.title});this.setState({currentmeeting:course.id});this.setState({currentmeetingdate:course.start});this.handleClickOpen();this.setState({dialogcolor:category.color});this.setState({dialogtitlecolor:theme.palette.getContrastText(category.color)}) }}
                                                      
                                                    >
                                                     SUMMARY
                                                    </Button>      
                                                ):
                                                (
                                                    <Button
                                                    onClick={() => {this.setState({currentQuestions:course.question});this.setState({currentprojecttitle:course.project.title});this.setState({currentmeeting:course.id});this.setState({currentmeetingdate:course.start});this.handleClickOpen();this.setState({dialogcolor:category.color});this.setState({dialogtitlecolor:theme.palette.getContrastText(category.color)}) }}
                                                      
                                                    >
                                                      JOIN
                                                    </Button>  
                                                )
                                            )
                                            :
                                            (
                                                <Button
                                                onClick={() => {this.setState({currentQuestions:course.question});this.setState({currentprojecttitle:course.project.title});this.setState({currentmeeting:course.id});this.setState({currentmeetingdate:course.start});this.handleClickOpen();this.setState({dialogcolor:category.color});this.setState({dialogtitlecolor:theme.palette.getContrastText(category.color)}) }}
                                                  
                                                >
                                                  START
                                                </Button>   
                                            )
                                        ):
                                        (
                                            course.real_time_start?
                                            (
                                                course.real_time_end?
                                                (
                                                    <Button
                                                    onClick={() => {this.setState({currentQuestions:course.question});this.setState({currentprojecttitle:course.project.title});this.setState({currentmeeting:course.id});this.setState({currentmeetingdate:course.start});this.handleClickOpen();this.setState({dialogcolor:category.color});this.setState({dialogtitlecolor:theme.palette.getContrastText(category.color)}) }}
                                                      
                                                    >
                                                     SUMMARY
                                                    </Button>      
                                                ):
                                                (
                                                    <Button
                                                    onClick={() => {this.setState({currentQuestions:course.question});this.setState({currentprojecttitle:course.project.title});this.setState({currentmeeting:course.id});this.setState({currentmeetingdate:course.start});this.handleClickOpen();this.setState({dialogcolor:category.color});this.setState({dialogtitlecolor:theme.palette.getContrastText(category.color)}) }}
                                                      
                                                    >
                                                      JOIN
                                                    </Button>  
                                                )
                                            )
                                            :
                                            (
                                                <Button
                                                onClick={() => {this.setState({currentQuestions:course.question});this.setState({currentprojecttitle:course.project.title});this.setState({currentmeeting:course.id});this.setState({currentmeetingdate:course.start});this.handleClickOpen();this.setState({dialogcolor:category.color});this.setState({dialogtitlecolor:theme.palette.getContrastText(category.color)}) }}
                                                  
                                                >
                                                  DETAILS
                                                </Button>   
                                            ) 
                                        )
                                          
                                        }
                                            
                                        </CardActions>
                                        <LinearProgress
                                            className="w-full"
                                            variant="determinate"
                                            value={course.activeStep * 100 / course.totalSteps}
                                            color="secondary"
                                        />
                                    </Card>
                                </div>
                            )
                        })}
                    </FuseAnimateGroup>
                </div>

            </div>
        );
    }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCategories    : Actions.getCategories,
        getCourses       : Actions.getCourses,
        setCategoryFilter: Actions.setCategoryFilter,
        setSearchText    : Actions.setCoursesSearchText,
        getSprints       : Actions.getSprints,
        showMessage      : showMessage
    }, dispatch);
}

function mapStateToProps({academyApp})
{
    return {
        courses       : academyApp.courses.data,
        searchText    : academyApp.courses.searchText,
        categories    : academyApp.courses.categories,
        categoryFilter: academyApp.courses.categoryFilter,
        sprints       : academyApp.courses.sprints
    }
}

export default withReducer('academyApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(Courses)));
