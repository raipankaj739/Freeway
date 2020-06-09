import React, { Component } from "react";
import { connect } from "react-redux";
import {
  View,
  Text,
  Dimensions,
  Platform,
  ActivityIndicator,
  SafeAreaView,
} from "react-native";
import {
  Container,
  Button,
  Icon,
  Header,
  Title,
  Left,
  Right,
  Body,
  Thumbnail,
} from "native-base";
import { GiftedChat } from "react-native-gifted-chat";
import { NavigationActions } from "react-navigation";

var { height } = Dimensions.get("window");

const navigateAction = () =>
  NavigationActions.navigate({
    routeName: "ChatList",
  });

class ChatScreen extends Component {
  // intervalID;
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
      conversation: [],
    };
    this.convId = this.props.navigation.state.params.convId;
    this.name = this.props.navigation.state.params.name;
    this.photoURL = this.props.navigation.state.params.photoURL;
    this.partnerID = this.props.navigation.state.params.partnerID;
    this.num = 1;
    this.onSend = this.onSend.bind(this);
  }

  async componentDidUpdate(prevProps, prevState) {}

  async getMessages() {
    return await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/messages/" +
        this.convId,
      {
        method: "GET",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
      }
    )
      .then((response) => response.json())
      .then((result) => {
        this.setState({
          conversation: result,
        });
      })
      .catch((error) => console.log("error:", error));
  }

  async parseMsgResponse() {
    await this.getMessages();
    var msgArray = [];
    for (let i = 0; i < this.state.conversation.length; i++) {
      var dateStr = this.state.conversation[i].datecreated;
      var year = dateStr.substring(0, 4);
      var month = dateStr.substring(5, 7);
      var day = dateStr.substring(8, 10);
      var hr = dateStr.substring(11, 13);
      var min = dateStr.substring(14, 16);
      var sec = dateStr.substring(17, 19);
      var senderID =
        this.state.conversation[i].senderid === this.partnerID
          ? this.partnerID
          : 1;
      const obj = {
        _id: this.state.conversation[i].msg_id,
        text: this.state.conversation[i].content,
        createdAt: new Date(year, month - 1, day, hr, min, sec),
        user: {
          _id: senderID,
          name: this.name,
          avatar: this.photoURL,
        },
      };
      msgArray.push(obj);
    }
    this.setState({
      messages: msgArray,
    });
  }

  async componentDidMount() {
    await this.parseMsgResponse();
  }

  async onSend(messages = []) {
    await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/messages/" +
        this.convId,
      {
        method: "POST",
        credentials: "include",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          content: messages[0].text,
        }),
      }
    ).catch((error) => {
      console.log("error:", error);
    });
    this.parseMsgResponse();
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <SafeAreaView />
        <Header>
          <Left>
            <Button
              transparent
              // onPress={() => this.props.navigation.dispatch(navigateAction())}
              // onPress={() => this.props.navigation.navigate("ChatList")}
              // onPress={() => this.props.navigation.goBack()}
              onPress={() =>
                this.props.navigation.reset({
                  routeName: "ChatList",
                })
              }
            >
              <Thumbnail
                small
                source={require("../../../assets/prev_icon.png")}
              />
            </Button>
          </Left>
          <Body style={{ flex: 3 }}>
            <Title>{this.name}</Title>
          </Body>
          <Right />
        </Header>
        <View style={{ flex: 1 }}>
          <GiftedChat
            messages={this.state.messages}
            onSend={this.onSend}
            user={{
              _id: 1,
            }}
            inverted={true}
          ></GiftedChat>
        </View>
      </Container>
    );
  }
}

export default ChatScreen;
