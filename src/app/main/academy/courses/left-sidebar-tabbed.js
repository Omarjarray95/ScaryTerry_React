import React, {Component} from 'react';
import {withStyles, Tab, Tabs, Hidden, Icon, IconButton, Typography} from '@material-ui/core';
import {FusePageCarded, DemoContent, DemoSidebarContent} from '@fuse';
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

const styles = theme => ({
    layoutRoot: {},
    root: {
        width: '100%',
        marginTop: theme.spacing.unit * 3,
        overflowX: 'auto',
      },
      table: {
        minWidth: 700,
      },
});

class CardedRightSidebarTabbedSample extends Component {

    state = {
        value: 0,
         persons: null,
         checkedItems:new Map(),
         presence: []
        }
       
      
       // 
       handleChange2(e) {
           console.log(e.target.name);
           var i=this.state.value;
           this.setState({
           presence: [...i, e.target.name]
          })
       /* const item = e.target.name;
        const isChecked = e.target.checked;
        var joined = this.state.presence.concat(item);
        this.setState({presence: joined })
        this.setState(prevState => ({ checkedItems: prevState.checkedItems.set(item, isChecked) }));*/
      }
    handleChange = (event, value) => {
        this.setState({value});
    };
    componentDidMount() {
        this.props.getMeeting(this.props.match.params.id);
    // this.setState({checkedItems:new Map()})
      axios.get(`http://localhost:3001/meetings/findapi/`+this.props.match.params.id)
        .then(res => {

          //  this.setState(prevState => ({ checkedItems: prevState.checkedItems.set("5c913b531c9d44000018162b", true) }))
          const persons = res.data;
          this.setState({ persons });
          
        })  
        
    
    }
    render()
    {
        const {classes} = this.props;
        const {value} = this.state;
        let id = 0;
       
        return (
            <FusePageCarded
                classes={{
                    root   : classes.layoutRoot,
                    toolbar: "p-0"
                }}
                header={
                    <div className="flex flex-col flex-1">
                        <div className="flex items-center py-24">
                            <div className="flex-1"><h4>Header</h4></div>
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
                        <Tab className="h-64" label="Check-in"/>
                        <Tab className="h-64" label="Done Tasks"/>
                        <Tab className="h-64" label="To Do"/>
                        <Tab className="h-64" label="Questions"/>
                        <Tab className="h-64" label="Impediments"/>
                       
                        <Tab className="h-64" label="encourage team member"/>
                        <Tab className="h-64" label="summary"/>
                    </Tabs>
                }
                content={
                    <div className="p-24">
                        {value === 0 &&
                        (
                            <div>
                                <h3 className="mb-16">Item One</h3>
                      {
                          this.state.persons?
                          (
                            <Paper className={classes.root}>
                            <Table className={classes.table}>
                              <TableHead>
                                <TableRow>
                                  <TableCell></TableCell>
                                  <TableCell align="right">First Name</TableCell>
                                  <TableCell align="right">Last Name</TableCell>
                                  <TableCell align="right">Role</TableCell>
                                  <TableCell align="right">Protein (g)</TableCell>
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
                                    
                                    <Switch
         

         name={this.props.meeting.project.scrumMaster._id}  onChange={this.handleChange2}
         
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
         

          name={row._id} checked={this.state.checkedItems.get(row._id)} onChange={this.handleChange2}
          
        />
                                    
                                    </TableCell>
                                  </TableRow>
                                ))}
                              </TableBody>
                            </Table>
                          </Paper>
                          ):
                          (
                              null
                          )
                      }
                               

                            </div>
                        )}
                        {value === 1 && (
                            <div>
                                <h3 className="mb-16">Item Two</h3>
                                <DemoContent/>
                            </div>
                        )}
                        {value === 2 && (
                            <div>
                                <h3 className="mb-16">Item Three</h3>
                                <DemoContent/>
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
                                <h3 className="mb-16">Item Six</h3>
                                <DemoContent/>
                            </div>
                        )}
                        {value === 6 && (
                            <div>
                                <h3 className="mb-16">Item Seven</h3>
                                <DemoContent/>
                            </div>
                        )}
                    </div>
                }
                rightSidebarHeader={
                    <div style={{marginTop:'30%',marginLeft:'20%'}} className="p-25">
                    
                    <FuseCountup daily={false} hours={false} color="white" endDate='05-05-2019' className="my-40"/>
                    </div>
                }
                rightSidebarContent={
                    <div className="p-24">
                        <h4>Sidebar Content</h4>
                        <br/>
                        <div>
                          {
                            this.state.persons!=null?
                            (
                        <List dense={true}>
                         <Typography style={{opacity:"0.4"}} variant="subheading">DEVELOPMENT TEAM</Typography>
                {
                  this.state.persons.project.developmentTeam.map(x=>
                    
                    <ListItem button>
                           <ListItemText
                                     primary={x.firstName+" "+x.lastName}
                              />
                    </ListItem>
                    
                    
                    )
                    
                }
                       
                       <Typography  style={{opacity:"0.4"}} variant="subheading">SCRUMMASTER</Typography>
                    <ListItem button>
                           <ListItemText
                                     primary={this.props.meeting.project.scrumMaster.firstName+" "+this.props.meeting.project.scrumMaster.lastName}
                              />
                    </ListItem>
                    <Typography style={{opacity:"0.4"}} variant="subheading">PRODUCT OWNER</Typography>
                    <ListItem button>
                           <ListItemText
                                     primary={this.state.persons.project.productOwner.firstName+" "+this.state.persons.project.productOwner.lastName}
                              />
                    </ListItem>
             
                
            </List>
                            ):
                            (
                              null
                            )
                          }
            
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
        getMeeting       : Actions.getMeeting
    }, dispatch);
}

function mapStateToProps({academyApp})
{
    return {
        courses       : academyApp.courses.data,
        searchText    : academyApp.courses.searchText,
        categories    : academyApp.courses.categories,
        categoryFilter: academyApp.courses.categoryFilter,
        meeting       : academyApp.courses.meeting
    }
}

    export default withReducer('academyApp', reducer)(withStyles(styles, {withTheme: true})(connect(mapStateToProps, mapDispatchToProps)(CardedRightSidebarTabbedSample)));
