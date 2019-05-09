import React, {Component} from 'react'
import {Launcher} from 'react-chat-window'
import axios from 'axios/index'
import io from 'socket.io-client';
import * as Actions from 'app/store/actions';
import {withRouter} from 'react-router-dom';
import {bindActionCreators} from 'redux';
import {connect} from 'react-redux';
class Demo extends Component {


    constructor(props) {
        super();
        this.state = {
          messageList: [
          ],
          newMessagesCount: 0,
          isOpen: false,
          unreadMessages:[
           
          ]
        };
        this.socket = io('http://localhost:3001');
        this.socket.compress(false).emit('new participant', {name:localStorage.getItem('name'),uid:localStorage.getItem('id')} );
        props.setSocket(this.socket);
            }
      
//API PART
async df_text_query(text){

  const res = await axios.post('http://localhost:3001/chatbot/api/df_text_query',{text:text,user:localStorage.getItem('id')})
    //const res = await axios.post('http://localhost:5000/api/df_text_query',{text:text})
    //https://chatbotbackend.serveo.net/ 
for (let msg of res.data.fulfillmentMessages)
{
    this._sendMessage(msg.text.text[0])    

}
}

async df_event_query(event){
           const res = await axios.post('http://localhost:3001/chatbot/api/df_event_query',{event});
  //https://chatbotbackend.serveo.net/ 
        // const res = await axios.post('http://localhost:5000/api/df_event_query',{event});
    for (let msg of res.data.fulfillmentMessages)
    {   console.log(msg.text.text[0]);
        this._sendMessage(msg.text.text[0])    
    }
}
//

      componentDidMount(){

        this.df_event_query('Welcome');

       /* this.setState({
            newMessagesCount: this.state.unreadMessages.length
          })
                     */    
        
                    if (localStorage.getItem("scrummaster") === null) {
                      this.socket.on('Hello', (data)=> {
                        if(data.scrummaster){
                            localStorage.setItem('scrummaster',true)
                        }
                        else
                        {
                            localStorage.setItem('scrummaster',false)
                        }

                          localStorage.setItem('curentSprint',data.actualsprint)

                        
                         });
                    }

           //newAnswer
           this.socket.on('newAnswer', (data)=> {
            this._sendMessage(data);
             });
    }




      _onMessageWasSent(message) {
          console.log(message.data.text);
          this.df_text_query(message.data.text);
        this.setState({
          messageList: [...this.state.messageList, message]
        })
        console.log("sending a message");
      }
    
      _onFilesSelected(fileList) {
        const objectURL = window.URL.createObjectURL(fileList[0]);
        this.setState({
          messageList: [...this.state.messageList, {
            type: 'file', author: "me",
            data: {
              url: objectURL,
              fileName: fileList[0].name
            }
          }]
        })
      }
    
      _sendMessage(text) {
        console.log("receiving");

        if (text.length > 0) {
          const newMessagesCount = this.state.isOpen ? this.state.newMessagesCount : this.state.newMessagesCount + 1
          this.setState({
            newMessagesCount: newMessagesCount,
            messageList: [...this.state.messageList, {
              author: 'them',
              type: 'text',
              data: { text }
            }]
          })
        }
      }
    
      _handleClick() {
        this.setState({
          isOpen: !this.state.isOpen,
          newMessagesCount: 0
                })
      }
      
  render() {
    return (
    
    
    <div>
        {/* <TestArea
        onMessage={this._sendMessage.bind(this)}
      /> */}
      <Launcher
        agentProfile={{
          teamName: 'LEON',
          imageUrl: 'https://a.slack-edge.com/66f9/img/avatars-teams/ava_0001-34.png'
        }}
        onMessageWasSent={this._onMessageWasSent.bind(this)}
        onFilesSelected={this._onFilesSelected.bind(this)}
        messageList={this.state.messageList}
        newMessagesCount={this.state.newMessagesCount}
        handleClick={this._handleClick.bind(this)}
        isOpen={this.state.isOpen}
        showEmoji
      />
    </div>)
  }
}

function mapDispatchToProps(dispatch)
{
    return bindActionCreators({
      setSocket : Actions.setSocket
    }, dispatch);
}

function mapStateToProps({fuse})
{
    return {
    }
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Demo));