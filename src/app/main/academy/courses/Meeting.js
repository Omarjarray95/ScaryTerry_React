import React, {Component} from 'react';
import {withStyles,Card, CardContent, Divider,Tab, Tabs, Hidden, Icon, IconButton ,  OutlinedInput,
    Typography,
    CardActions,

    Select,
    InputLabel,
    FormControl,
    MenuItem,
    LinearProgress} from '@material-ui/core';

import {FusePageCarded, DemoContent, DemoSidebarContent} from '@fuse';
import Button from '@material-ui/core/Button';
import {FuseCountdown, FuseAnimate} from '@fuse';
import {HorizontalBar,Pie} from 'react-chartjs-2';

import FuseCountup from './FuseCountUp'
import axios from 'axios';
import {List, ListItem, ListItemText} from '@material-ui/core';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Switch from '@material-ui/core/Switch';
import * as Actions from '../store/actions';
import {bindActionCreators} from 'redux';
import connect from 'react-redux/es/connect/connect';
import withReducer from 'app/store/withReducer';
import reducer from '../store/reducers';
import CircularProgress from '@material-ui/core/CircularProgress';
import Video from 'twilio-video';
import TextField from '@material-ui/core/TextField';
import  moment from 'moment';
import { width } from 'window-size';
import _ from 'lodash';
const styles = theme => ({
    layoutRoot: {}
});

class CardedRightSidebarTabbedSample extends Component {
    constructor(props) {
		super();
		this.state = {
            identity: null,
            value: 0,
            checkedItems:new Map(),
			roomName: '',
			roomNameErr: false, // Track error for room name TextField
			previewTracks: null,
			localMediaAvailable: false,
			hasJoinedRoom: false,
            activeRoom: '', // Track the current active room
            started:false,
            ended:false,
            optionsChecked: [],
            fields:new Map(),
            inputs:new Map(),
            buttonid:'',
            ending:null,
            starting:null,
            row:"",
            col:"",
            timenow:false
        };
        this.joinRoom = this.joinRoom.bind(this);
		this.handleRoomNameChange = this.handleRoomNameChange.bind(this);
		this.roomJoined = this.roomJoined.bind(this);
		this.leaveRoom = this.leaveRoom.bind(this);
        this.detachTracks = this.detachTracks.bind(this);
        this.handlestart=this.handlestart.bind(this);
        this.handleStop=this.handleStop.bind(this);
        this.detachParticipantTracks = this.detachParticipantTracks.bind(this);
        this.updateInputsArray=this.updateInputsArray.bind(this)
        this.addanwser=this.addanwser.bind(this);
        this.handleplus=this.handleplus.bind(this);
        this.handleminus=this.handleminus.bind(this);
        this.getdata=this.getdata.bind(this)
        this.getdata2=this.getdata2.bind(this)
    }



    getdata2()
    {



        var data = {
            labels  : [
                'Answered Question',
                'Non answered question'
                
            ],
            datasets: [
                {
                    data                : [],
                    backgroundColor     : [
                        '#FF6384',
                        '#36A2EB'
                    ],
                    hoverBackgroundColor: [
                        '#FF6384',
                        '#36A2EB'
                    ]
                }
            ]
        };
        
        var t1=0;
        var t2=0;
        this.props.meeting.meeting.Questions.map((q)=>
        {
            if((q.Answer!=null)&&(q.Answer!=undefined))
            {
                t1 = t1 + 1 ;
            }
            else
            {
                t2 = t2 + 1;
            }
           
        })



        data.datasets[0].data.push(t1);
        data.datasets[0].data.push(t2);
return data;
    }
    getdata()
    {
        var data = {
            labels  : [],
            datasets: [
                {
                    label               : 'TEAM MEMBERS AND ATTRIBUTED NOTES',
                    backgroundColor     : 'rgba(255,99,132,0.2)',
                    borderColor         : 'rgba(255,99,132,1)',
                    borderWidth         : 1,
                    hoverBackgroundColor: 'rgba(255,99,132,0.4)',
                    hoverBorderColor    : 'rgba(255,99,132,1)',
                    data                : []
                }
            ]
        };
        [this.props.meeting.project.scrumMaster,this.props.meeting.project.productOwner].concat(this.props.meeting.project.developmentTeam).map(row => {

            data.labels.push(row.firstName+" "+row.lastName);
            var result=0;
            this.props.meeting.note.map((r)=>{if(r.attributed_to==row._id){result=result+r.note}});
            data.datasets[0].data.push(result);

          
          
        })
        return data;

    }
     addanwser()
    {         
        axios.get('http://localhost:3001/meetings/answer', {
            params: {
             answer:  this.state.inputs.get(this.state.buttonid),
             id:this.state.buttonid 
            }}).then(results => {
                this.props.getMeeting(this.props.match.params.id);
               
		});


    }
    handleminus=(e,v)=>{
        this.props.minus(this.props.meeting.meeting._id,e,v);
        this.props.getMeeting(this.props.match.params.id);
        console.log(e+" "+v)
    }
    handleplus=(e,v)=>{
       this.props.plus(this.props.meeting.meeting._id,e,v);
       this.props.getMeeting(this.props.match.params.id);
       console.log(e+" "+v)
    }
updateInputsArray(e) {
        //copy the array first
        const item = e.target.name;
        const isChecked =e.target.value
        
        this.setState(p => ({ inputs: p.inputs.set(item,isChecked ) }));
        console.log(this.state.inputs);
        
    }
    changeEvent(event) {
    
    	let checkedArray = this.state.optionsChecked;
        let selectedValue = event.target.value;
        
        if (event.target.checked === true) {
            checkedArray.push(selectedValue);
            this.setState({
              optionsChecked: checkedArray
            });
        this.props.setAttendencee(event.target.value,"present",this.props.meeting.meeting._id);
        	
                        
        } else {
            this.props.setAttendencee(event.target.value,"absent",this.props.meeting.meeting._id);
        	let valueIndex = checkedArray.indexOf(selectedValue);
			checkedArray.splice(valueIndex, 1);
            
            this.setState({
              optionsChecked: checkedArray
            });
            
        }
    
    }
 

    handlestart= () => {
     /*   
        axios.get('/token').then(results => {
			const { identity, token } = results.data;
			this.setState({ identity, token });
        });*/
        this.setState({timenow:true})
        this.props.startMeeting(this.props.meeting.meeting._id);
      
        
        this.props.getMeeting(this.props.match.params.id);
        this.props.socket.compress(false).emit('test', "test" );
this.setState({started:true});
this.setState({value:0});
    }
    
    handleStop= () => {
        this.props.endMeeting(this.props.meeting.meeting._id);
        this.props.getMeeting(this.props.match.params.id);

       this.setState({ended:true})
        this.setState({started:false})
        this.setState({value:6})
    }

    handleRoomNameChange(e) {
		let roomName = e.target.value;
		this.setState({ roomName });
	}

	joinRoom() {

        this.state.roomName=this.props.meeting.project._id
		console.log("Joining room '" + this.state.roomName + "'...");
		let connectOptions = {
			name: this.state.roomName
		};

		if (this.state.previewTracks) {
			connectOptions.tracks = this.state.previewTracks;
		}

		// Join the Room with the token from the server and the
		// LocalParticipant's Tracks.
		Video.connect(this.props.meeting.token, connectOptions).then(this.roomJoined, error => {
			alert('Could not connect to Twilio: ' + error.message);
		});
	}

	attachTracks(tracks, container) {
		tracks.forEach(track => {
			container.appendChild(track.attach());
		});
	}

	// Attaches a track to a specified DOM container
	attachParticipantTracks(participant, container) {
		var tracks = Array.from(participant.tracks.values());
		this.attachTracks(tracks, container);
	}

	detachTracks(tracks) {
		tracks.forEach(track => {
			track.detach().forEach(detachedElement => {
				detachedElement.remove();
			});
		});
	}

	detachParticipantTracks(participant) {
		var tracks = Array.from(participant.tracks.values());
		this.detachTracks(tracks);
	}

	roomJoined(room) {
		// Called when a participant joins a room
		console.log("Joined as '" + this.props.meeting.identity + "'"+this.state.activeRoom);
		this.setState({
			activeRoom: room,
			localMediaAvailable: true,
			hasJoinedRoom: true
		});

		// Attach LocalParticipant's Tracks, if not already attached.

		// Attach the Tracks of the Room's Participants.
		room.participants.forEach(participant => {
			console.log("Already in Room: '" + participant.identity + "'");
			var previewContainer = this.refs.remoteMedia;
			this.attachParticipantTracks(participant, previewContainer);
		});

		// When a Participant joins the Room, log the event.
		room.on('participantConnected', participant => {
			console.log("Joining: '" + participant.identity + "'");
		});

		// When a Participant adds a Track, attach it to the DOM.
		room.on('trackAdded', (track, participant) => {
			console.log(participant.identity + ' added track: ' + track.kind);
			var previewContainer = this.refs.remoteMedia;
			this.attachTracks([track], previewContainer);
		});

		// When a Participant removes a Track, detach it from the DOM.
		room.on('trackRemoved', (track, participant) => {
			this.log(participant.identity + ' removed track: ' + track.kind);
			this.detachTracks([track]);
		});

		// When a Participant leaves the Room, detach its Tracks.
		room.on('participantDisconnected', participant => {
			console.log("Participant '" + participant.identity + "' left the room");
			this.detachParticipantTracks(participant);
		});

		// Once the LocalParticipant leaves the room, detach the Tracks
		// of all Participants, including that of the LocalParticipant.
		room.on('disconnected', () => {
			if (this.state.previewTracks) {
				this.state.previewTracks.forEach(track => {
					track.stop();
				});
			}
			this.detachParticipantTracks(room.localParticipant);
			room.participants.forEach(this.detachParticipantTracks);
			this.state.activeRoom = null;
			this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
		});
	}

	/*componentDidMount() {
		axios.get('/token').then(results => {
			const { identity, token } = results.data;
			this.setState({ identity, token });
		});
	}*/

	leaveRoom() {
		this.state.activeRoom.disconnect();
		this.setState({ hasJoinedRoom: false, localMediaAvailable: false });
	}

    async componentDidMount()
    {   
      await  this.props.getMeeting(this.props.match.params.id);
      this.setState({started:this.props.meeting.meeting.real_time_start!=null})
      this.setState({ended:this.props.meeting.meeting.real_time_end!=null})
        this.setState({optionsChecked:this.props.meeting.meeting.attendance})
        if(this.state.started)
        {   if(this.state.ended)
            {
                this.setState({value:6});
            }
            else
            {
                this.setState({value:0});
            }
            
        }
        else
        {
            this.setState({value:7});
        }
        localStorage.setItem('meeting',this.props.meeting.meeting._id)
    }
    componentDidUpdate()
    {
       // this.props.getMeeting(this.props.match.params.id);
        //this.setState({optionsChecked:this.props.meeting.meeting.attendance})
    }
    handleChange2(e) {
        console.log(e.target.name+" "+ e.target.checked)

      //  console.log(e.target.name);
       
    
    }
    handleChange = (event, value) => {
        this.setState({value});
    };
    
    render()
    {   		let joinOrLeaveRoomButton = this.state.hasJoinedRoom ? (

        <Button style={{marginLeft:"30%"}} style={{marginTop:"20%"}} variant="contained" color="secondary" onClick={this.leaveRoom}>
       Leave Room
                </Button>


    ) : (
       
        <Button style={{marginLeft:"30%"}} style={{marginTop:"20%"}} variant="contained" color="secondary"  onClick={this.joinRoom}>
       Join Room
                </Button>

    );
        const {classes} = this.props;
        const {value} = this.state;

        return (
            <FusePageCarded
                classes={{
                    root   : classes.layoutRoot,
                    toolbar: "p-0"
                }}
                header={
                    <div   ref="remoteMedia" id="remote-media" className="flex flex-row flex-1 " >
                        <div className="flex items-center py-24">
                        
                            <Hidden lgUp>
                                <IconButton
                                    onClick={(ev) => this.pageLayout.toggleRightSidebar()}
                                    aria-label="open left sidebar"
                                >
                                    <Icon>menu</Icon>
                                </IconButton>
                            </Hidden>
                        </div>
                    </div>
                }
                contentToolbar={
                    <Tabs
                        value={value}
                        onChange={this.handleChange}
                        indicatorColor="primary"
                        textColor="primary"
                        variant="scrollable"
                        scrollButtons="off"
                        className="w-full h-64"
                    >
                        <Tab disabled={(!this.state.started)||(this.state.ended)} className="h-64" label="checkin"/>
                        <Tab  disabled={(!this.state.started)||(this.state.ended)}  className="h-64" label="issues"/>
                        <Tab  disabled={(!this.state.started)||(this.state.ended)}  className="h-64" label="questions"/>
                        <Tab  hidden disabled={(!this.state.started)||(this.state.ended)}  className="h-64" label="done"/>
                        <Tab  hidden disabled={(!this.state.started)||(this.state.ended)}  className="h-64" label="todo"/>
                        <Tab  disabled={(!this.state.started)||(this.state.ended)}   className="h-64" label="Team appreciations"/>
                        <Tab  disabled={!this.state.ended} className="h-64" label="summary"/>
                        <Tab  hidden className="h-64" label="hiddenone"/>
                    </Tabs>
                }
                content={
                    <div className="p-24">
                        {value === 0 &&
                        (
                            <div>
                                <h3 className="mb-16"></h3>
                                
                                    {
                                        this.props.meeting.project?
                                        (
                                            <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell></TableCell>
                                                  <TableCell align="right">First Name</TableCell>
                                                  <TableCell align="right">Last Name</TableCell>
                                                  <TableCell align="right">Role</TableCell>
                                                  <TableCell align="right"></TableCell>
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                              <TableRow key="0">
                                                    <TableCell component="th" scope="row">
                                                      scrummaster
                                                    </TableCell>
                                                    <TableCell align="right">{this.props.meeting.project.scrumMaster.firstName}</TableCell>
                                                    <TableCell align="right">{this.props.meeting.project.scrumMaster.lastName}</TableCell>
                                                    <TableCell align="right">SCRUMMASTER</TableCell>
                                                    <TableCell align="right">
                                                            {
                                                                this.props.meeting.project.scrumMaster._id===localStorage.getItem('id')?
                                                                (
                                                                    <Switch
                         
                                                           
                                                                    value={this.props.meeting.project.scrumMaster._id} checked={this.state.optionsChecked.includes(this.props.meeting.project.scrumMaster._id)}    onChange={this.changeEvent.bind(this)}
                                    
                                                                            />
                                                                ):
                                                                (
                                                                    
                                                                    <Switch disabled
                         
                                                           
                                                                    value={this.props.meeting.project.scrumMaster._id} checked={this.props.meeting.meeting.attendance.includes(this.props.meeting.project.scrumMaster._id)}    onChange={this.changeEvent.bind(this)}
                                    
                                                                            />
                                                                )

                                                            }
                                                 
                                                    </TableCell>
                                                  </TableRow>




                                                  <TableRow key="100">
                                                    <TableCell component="th" scope="row">
                                                    product owner
                                                    </TableCell>
                                                    <TableCell align="right">{this.props.meeting.project.productOwner.firstName}</TableCell>
                                                    <TableCell align="right">{this.props.meeting.project.productOwner.lastName}</TableCell>
                                                    <TableCell align="right">PRODUCT OWNER</TableCell>
                                                    <TableCell align="right">
                                                    
                                                    <Switch
                         
                                                           
                                                         value={this.props.meeting.project.productOwner._id} checked={this.state.optionsChecked.includes(this.props.meeting.project.productOwner._id)}    onChange={this.changeEvent.bind(this)}
                         
                                                                 />
                                                    </TableCell>
                                                  </TableRow>


                                                {this.props.meeting.project.developmentTeam.map(row => (
                                                  <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                     dev
                                                    </TableCell>
                                                    <TableCell align="right">{row.firstName}</TableCell>
                                                    <TableCell align="right">{row.lastName}</TableCell>
                                                    <TableCell align="right">DEVELOPER</TableCell>
                                                    <TableCell align="right">
                                                    
                                                    <Switch
                         
                                                         key={row._id}
                                                           value={row._id} checked={this.state.optionsChecked.includes(row._id)} onChange={this.changeEvent.bind(this)}
                          
                                                                     />
                                                    
                                                    </TableCell>
                                                  </TableRow>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </Paper>
                                        ):
                                        (<div>
                                            <CircularProgress color="secondary" />
                                            </div>
                                        )
                                    }







                            </div>
                        )}
                        {value === 1 && (
                            <div>
                                <h3 className="mb-16">Item Two</h3>
                                <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell>Team member</TableCell>
                                                  
                                                </TableRow>

                                              </TableHead>
                                              <TableBody>
                                         


                                              
{
    this.props.meeting.meeting.Impediment.map((i)=>(

        <TableRow>
        <TableCell component="th" scope="row">
        {i.name}
        </TableCell>

        <TableCell align="right">
        
        
      <Typography>{i.content}</Typography>
        
        
        
        </TableCell>
       
      </TableRow>
    ))
}

                                                 
                                        
                                              </TableBody>
                                            </Table>
                                          </Paper>
                            </div>
                        )}
                        {value === 2 && (
                            <div>
                            <h3 className="mb-16"></h3>
                            
                                {   
                                    this.props.meeting.meeting?
                                    (
                                        <Paper className={classes.root}>
                                        <Table className={classes.table}>
                                          <TableHead>
                                            <TableRow>
                                           
                                              <TableCell align="right">QUESTION</TableCell>
                                              <TableCell align="right">ANSWER</TableCell>
                                   
                                            </TableRow>
                                          </TableHead>
                                          <TableBody>
                                       




                                            {this.props.meeting.meeting.Questions.map(row => (
                                              <TableRow key={row.id}>
                                       
                                                <TableCell align="left">{row.Question}</TableCell>
                                  
                                  {
                                      row.Answer==undefined?
                                      (
                                        <div>
                                        <TableCell align="right">   <TextField
  id="outlined-textarea"

 onChange={this.updateInputsArray}
  multiline
  name={row._id}
  key={row._id}
  className={classes.textField}
  margin="normal"
  variant="outlined"
/>
</TableCell>
                                     
<TableCell align="right">                                <Button style={{marginTop:"20%"}} onClick={ async () => { await this.setState({buttonid:row._id}); this.addanwser()}}   key={row._id}  variant="contained" color="secondary" >
                                        ANSWER
                                 </Button>
                                 

                                 </TableCell>
                                 </div>
                                      ):
                                      (
                                        <TableCell align="right"> 
                                                {row.Answer}
                                        </TableCell>
                                      )
                                  }
                              

                                             
                                          
                                              </TableRow>
                                            ))}
                                          </TableBody>
                                        </Table>
                                      </Paper>
                                    ):
                                    (<div>
                                        <CircularProgress color="secondary" />
                                        </div>
                                    )
                                }







                        </div>
                        )}
                        {value === 3 && (
                            <div>
                                <h3 className="mb-16">Item Four</h3>
                                <DemoContent/>
                            </div>
                        )}
                        {value === 4 && (
                            <div>
                                <h3 className="mb-16">Item Five</h3>
                                <DemoContent/>
                            </div>
                        )}
                        {value === 5 && (
                            <div>
                                
                                <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell>Issues associated with this event</TableCell>
                                                  
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                         


                                              


                                                {[this.props.meeting.project.scrumMaster,this.props.meeting.project.productOwner].concat(this.props.meeting.project.developmentTeam).map(row => (
                                                  <TableRow key={row.id}>
                                                    <TableCell component="th" scope="row">
                                                    {row.firstName} {row.lastName}
                                                    </TableCell>
                                 
                                                    <TableCell align="right">
                                                    
                                                    
                                                    
{
     this.props.meeting.criteria.map(col =>(

        <div className="flex flex-row items-center justify-center w-full">       
         {
           _.findIndex(this.props.meeting.note, function(o) { return  (o.note==-1)&&(o.made_by ==localStorage.getItem('id'))&&(o.attributed_to ==row._id)&&(o.criteria ==col._id) })>-1?
            (                                      
        <Button disabled onClick={()=>{this.handleminus(row._id,col._id) }} variant="outlined" size="small" color="primary" className={classes.margin}>
             -
           </Button>
         
            ):(
                <Button  onClick={()=>{this.handleminus(row._id,col._id) }} variant="outlined" size="small" color="primary" className={classes.margin}>
                -
              </Button>

            )}      
            <div className="flex flex-col items-center  justify-center w-full">   <Typography style={{width:"110px",justifyContent:"center"}}>{col.name}</Typography></div>
           {
           _.findIndex(this.props.meeting.note, function(o) { return  (o.note==1)&&(o.made_by ==localStorage.getItem('id'))&&(o.attributed_to ==row._id)&&(o.criteria ==col._id) })>-1?
            (
                <Button disabled onClick={()=>{this.handleplus(row._id,col._id) }} variant="outlined" size="small" color="secondary" className={classes.margin}>
                +
               </Button>            ):
            (
                <Button onClick={()=>{this.handleplus(row._id,col._id) }} variant="outlined" size="small" color="primary" className={classes.margin}>
                +
               </Button>
            )
        }
         
           </div>
     )
     )
}
                                                    
                                                    
                                                    
                                                    </TableCell>
                                                   
                                                  </TableRow>
                                                ))}
                                              </TableBody>
                                            </Table>
                                          </Paper>
                            </div>
                        )}
                        {value === 6 && (
                            <div>
                                <h3 className="mb-16"></h3>
                                <Paper className={classes.root}>
                                            <Table className={classes.table}>
                                              <TableHead>
                                                <TableRow>
                                                  <TableCell>Team member</TableCell>
                                                  
                                                </TableRow>
                                              </TableHead>
                                              <TableBody>
                                         


                                              


                                                  <TableRow>
                                                    <TableCell component="th" scope="row">
                                                            
                                                    </TableCell>
                                 
                                                    <TableCell align="right">
                                                    
                                                    
                                                    <div className="flex flex-col items-center w-full max-w-md">
              
                <HorizontalBar data={this.getdata}/>
            </div>
                                                    
                                                    
                                                    
                                                    </TableCell>
                                                   
                                                  </TableRow>

                                                  <TableRow>
                                                    <TableCell component="th" scope="row">
                                                          
                                                    </TableCell>
                                 
                                                    <TableCell align="right">
                                                    
                                                    
                                                    <div className="flex flex-col items-center w-full max-w-md">
                
                <Pie data={this.getdata2}/>
            </div>
                                                    
                                                    
                                                    
                                                    </TableCell>
                                                   
                                                  </TableRow>

                                                  
                           
                                              </TableBody>
                                            </Table>
                                          </Paper>
                            </div>
                        )}
                         {value === 7 && (
                            <div>
                              
                <div className="u">

<FuseAnimate animation="transition.expandIn">

    <Card className="w-full max-w-384">

        <CardContent className="flex flex-col items-center justify-center p-32 text-center">

            <img className="w-128 m-32" src="assets/images/logos/fuse.svg" alt="logo"/>

            <Typography variant="subtitle1" className="mb-16">
               Your event didn't start yet 
            </Typography>

            <Typography color="textSecondary" className="max-w-288">
               You can add questions to prepare for your meeting so you won't forget about them
            </Typography>
            {
                this.props.meeting?
                (null
               //     <FuseCountdown endDate={new Date(this.props.meeting.meeting.time_start)} className="my-48"/>
                ):
                (
                                null
                )
            }

            

            <Divider className="w-48"/>

            <Typography className="font-bold my-32 w-full">
               You will be notified once the Scrummaster starts the meeting
            </Typography>

        </CardContent>
    </Card>
</FuseAnimate>
</div>
                                
                            </div>
                        )}
                    </div>
                }
                rightSidebarHeader={
<div className="flex flex-1 items-center justify-center" style={{marginTop:"20%"}}>
                 {   this.props.meeting.meeting?
                    (   this.state.ended?
                        (
                            <div></div>
                        ):(
                            this.state.started?
                            (
                                <div className="p-15">
                                {this.state.timenow?
                                (
                                    <FuseCountup daily={false} hours={false} color="white" endDate={Date.now()} className="my-8"/>
                                ):
                                (
                                    <FuseCountup daily={false} hours={false} color="white" endDate={this.props.meeting.meeting.real_time_start} className="my-8"/>
                                )
                                
                                
                                }
                               
                               
                                <Button variant="contained" color="secondary" onClick={this.handleStop}>
                                               END MEETING
                                     </Button>
                                </div>
                            ):
                            (
                                <Button style={{marginTop:"20%"}}  variant="contained" color="secondary" onClick={this.handlestart}>
                                                  START MEETING
                                         </Button>
                            )
                        )
                        
                       
                      
                    ):
                    (
                        <CircularProgress color="secondary" />
                    )
                
                 }
                    
                    </div>
                }
                rightSidebarContent={
                    <div className="p-24" >
                        <h4 style={{marginLeft:"17%"}} >{joinOrLeaveRoomButton}</h4>
                        <br/>
                        <div   ref="remoteMedia" id="remote-media" className="flex flex-col flex-1 " >
                        <div className="flex items-center ">
                       
                     
                        </div>
                    </div>
                    </div>
                }
                onRef={instance => {
                    this.pageLayout = instance;
                }}
            />
        )
    };
}
function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
        getCategories    : Actions.getCategories,
        getCourses       : Actions.getCourses,
        setCategoryFilter: Actions.setCategoryFilter,
        setSearchText    : Actions.setCoursesSearchText,
        getMeeting       : Actions.getMeeting,
        setAttendencee   : Actions.presenceMeeting,
        startMeeting     : Actions.startMeeting,
        endMeeting       : Actions.endMeeting,
        plus             : Actions.plus,
        minus            : Actions.minus
    }, dispatch);
}

function mapStateToProps({academyApp,fuse})
{
    return {
        courses       : academyApp.courses.data,
        searchText    : academyApp.courses.searchText,
        categories    : academyApp.courses.categories,
        categoryFilter: academyApp.courses.categoryFilter,
        meeting       : academyApp.courses.meeting,
        socket    : fuse.socket
    }
}

export default withReducer('academyApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(CardedRightSidebarTabbedSample)));
