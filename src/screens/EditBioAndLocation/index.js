import React, { Component } from "react";
import { View, TextInput, Image, Platform } from "react-native";
import {
  Container,
  Content,
  Text,
  List,
  ListItem,
  Body,
  Grid,
  Row,
  Icon,
  Button,
} from "native-base";
import styles from "./styles";
import { NavigationActions } from "react-navigation";

var Dimensions = require("Dimensions");
var { width, height } = Dimensions.get("window");

const navigateAction = (bio, location) =>
  NavigationActions.navigate({
    routeName: "Profile",
    params: { bioText: bio, locationText: location },
  });

class SetBioAndLocation extends Component {
  constructor(props) {
    super(props);
    this.state = {
      bio: "",
      location: "",
      newTaskResponse: null,
    };
    this.handleTask = (text) => {
      this.setState({ taskDesc: text });
    };
  }

  render() {
    return (
      <Container style={{ backgroundColor: "#FFF" }}>
        <Content style={{ marginTop: Platform.OS === "ios" ? 0 : undefined }}>
          <TextInput
            style={styles.input}
            underlineColorAndroid="transparent"
            placeholder="Enter your new bio"
            placeholderTextColor="#9a73ef"
            autoCapitalize="none"
            onChangeText={this.handleTask}
          ></TextInput>
        </Content>
        <View>
          <Grid style={styles.bottomPillsView}>
            <Row style={styles.bottomRowStyle}>
              <Button
                danger
                style={styles.bottomRoundedPillsBtn}
                onPress={() => this.props.navigation.navigate("Profile")}
              >
                <Icon
                  active
                  name="md-done-all"
                  style={styles.bottomRoundedPillsCloseIcon}
                />
              </Button>
            </Row>
          </Grid>
        </View>
      </Container>
    );
  }
}

export default SetBioAndLocation;
