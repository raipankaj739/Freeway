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
import { GiftedChat, Actions, Bubble, Send } from "react-native-gifted-chat";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";

var { height } = Dimensions.get("window");

class ChatScreen extends Component {
  constructor(props) {
    super(props);
    this.state = {
      messages: [],
    };
    this.convId = this.props.navigation.state.params.convId;
    this.name = this.props.navigation.state.params.name;
    this.photoURL = this.props.navigation.state.params.photoURL;
    this.lastMsg = this.props.navigation.state.params.lastMsg;

    this.onSend = this.onSend.bind(this);
  }

  componentDidMount() {
    this.setState({
      messages: [
        {
          _id: 1,
          text: this.lastMsg,
          createdAt: new Date(),
          user: {
            _id: 2,
            name: this.name,
            avatar: this.photoURL,
          },
        },
      ],
    });
    // return fetch(
    //   "http://freeway.eastus.cloudapp.azure.com:8000/api/messages/" +
    //     this.convId,
    //   {
    //     method: "GET",
    //     credentials: "include",
    //     headers: {
    //       Accept: "application/json",
    //       "Content-Type": "application/json",
    //     },
    //   }
    // )
    //   .then((response) => response.json())
    //   .then((result) => {
    //     this.setState({
    //       messages: result,
    //     });
    //   })
    //   .catch((error) => this.setState({ isLoading: false }));
  }

  onSend(messages = []) {
    console.log(messages[0].text);
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
          ></GiftedChat>
        </View>
      </Container>
    );
  }
}

export default connect()(ChatScreen);
