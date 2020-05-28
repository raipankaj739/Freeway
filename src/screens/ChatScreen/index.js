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

var { height } = Dimensions.get("window");

class ChatScreen extends Component {
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

    this.onSend = this.onSend.bind(this);
  }

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

  async componentDidMount() {
    await this.getMessages();
    console.log(this.state.conversation);
    var msgArray = [];
    for (let i = 0; i < this.state.conversation.length; i++) {
      console.log(this.state.conversation[i]);
      var dateStr = this.state.conversation[i].datecreated;
      var year = dateStr.substring(0, 4);
      var month = dateStr.substring(5, 7);
      var day = dateStr.substring(8, 10);
      var hr = dateStr.substring(11, 13);
      var min = dateStr.substring(14, 16);
      var sec = dateStr.substring(17, 19);
      console.log(year, month, day, hr, min, sec);
      var senderID =
        this.state.conversation[i].senderid === this.partnerID
          ? this.partnerID
          : 1;
      const obj = {
        _id: this.state.conversation[i].msg_id,
        text: this.state.conversation[i].content,
        createdAt: new Date(year, month, day, hr, min, sec),
        user: {
          _id: senderID,
          name: this.name,
          avatar: this.photoURL,
        },
      };
      msgArray.push(obj);
    }

    this.setState((previousState) => {
      return {
        messages: GiftedChat.append(previousState.messages, msgArray),
      };
    });

    // this.setState({
    //   messages: [
    //     {
    //       _id: 2,
    //       text: "hello",
    //       createdAt: new Date(2018, 12, 10, 10, 10),
    //       user: {
    //         _id: this.partnerID,
    //         name: this.name,
    //         avatar: this.photoURL,
    //       },
    //     },
    //     {
    //       _id: 3,
    //       text: "hello0000000",
    //       createdAt: new Date(2019, 12, 10, 10, 10),
    //       user: {
    //         _id: 1,
    //         name: this.name,
    //         avatar: this.photoURL,
    //       },
    //     },
    //     {
    //       _id: 1,
    //       text: "there",
    //       createdAt: new Date(2020, 12, 10, 10, 10),
    //       user: {
    //         _id: this.partnerID,
    //         name: this.name,
    //         avatar: this.photoURL,
    //       },
    //     },
    //   ],
    // });
  }

  onSend(messages = []) {
    this.setState((previousState) => ({
      messages: GiftedChat.append(previousState.messages, messages),
    }));

    return fetch(
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
    )
      .then((response) => response.text())
      .then((result) => {
        console.log(result);
        this.setState({
          isLoading: false,
          swipeResponse: result,
        });
      })
      .catch((error) => {
        console.log("error:", error);
      });
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <SafeAreaView />
        <Header>
          <Left>
            <Button transparent onPress={() => this.props.navigation.goBack()}>
              <Icon name="ios-arrow-back" />
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

export default connect()(ChatScreen);
