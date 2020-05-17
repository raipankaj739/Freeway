import React, { Component } from "react";
import {
  Image,
  ImageBackground,
  View,
  ActivityIndicator,
  Alert,
} from "react-native";
import {
  Container,
  Text,
  Card,
  CardItem,
  DeckSwiper,
  Grid,
  Row,
  Icon,
  Button,
  Right,
  Body,
} from "native-base";
import commonColor from "../../theme/variables/commonColor";
import styles from "./styles";
import data from "./data";
import { NavigationActions } from "react-navigation";

const navigateAction = (name, photourl, bio) =>
  NavigationActions.navigate({
    routeName: "PhotoCardDetails",
    params: { name: name, photoURL: photourl, userBio: bio },
  });

class PhotoCard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      direction: null,
      opac: 0,
      isLoading: true,
      dataSource: null,
      num: 1,
    };
    this._deckSwiper = null;
  }

  async componentDidMount() {
    return await fetch(
      "http://freeway.eastus.cloudapp.azure.com:8000/api/feed/p/655d2c7a-bccb-4afc-908f-012e5ec65c85",
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
          isLoading: false,
          dataSource: result,
        });
      })
      .catch((error) => console.log("error:", error));
  }

  render() {
    console.log("==============================", this.state.num++);
    if (this.state.isLoading) {
      return (
        <View>
          <ActivityIndicator />
        </View>
      );
    } else {
      const navigation = this.props.navigation;
      return (
        <Container style={styles.wrapper}>
          <View style={styles.deckswiperView}>
            <DeckSwiper
              activeOpacity={1}
              dataSource={this.state.dataSource}
              ref={(c) => (this._deckSwiper = c)}
              onSwiping={(dir, opa) =>
                this.setState({ direction: dir, opac: opa })
              }
              renderTop={(item) => (
                <Card activeOpacity={1} style={{ borderRadius: 10 }}>
                  <CardItem
                    button
                    style={styles.deckswiperImageCarditem}
                    activeOpacity={1}
                    cardBody
                    onPress={() =>
                      navigation.dispatch(
                        navigateAction(item.name, item.photourl, item.bio)
                      )
                    }
                  >
                    <ImageBackground
                      style={styles.cardMain}
                      source={{ uri: item.photourl }}
                    >
                      {this.state.direction === "left"}
                      {this.state.direction === "right"}
                    </ImageBackground>
                  </CardItem>

                  <CardItem
                    button
                    activeOpacity={1}
                    style={styles.deckswiperDetailsCarditem}
                  >
                    <Body>
                      <Text style={styles.text}>{item.name}</Text>
                    </Body>
                    <Right>
                      <Icon name="md-star" style={styles.iconRight}>
                        <Text style={styles.subtextRight}> {item.rating}</Text>
                      </Icon>
                    </Right>
                  </CardItem>
                </Card>
              )}
              renderBottom={(item) => (
                <Card style={{ borderRadius: 10 }}>
                  <CardItem
                    style={{
                      borderTopLeftRadius: 10,
                      overflow: "hidden",
                      borderTopRightRadius: 10,
                    }}
                    cardBody
                  >
                    <Image
                      style={styles.cardMain}
                      source={{ uri: item.photourl }}
                    />
                  </CardItem>
                  <CardItem>
                    <Body>
                      <Text style={styles.text}>{item.name}</Text>
                    </Body>
                    <Right>
                      <Icon name="md-star" style={styles.iconRight}>
                        <Text style={styles.text}>{item.rating}</Text>
                      </Icon>
                    </Right>
                  </CardItem>
                </Card>
              )}
            />
          </View>
          <Grid style={styles.bottomGrid}>
            <Row style={styles.bottomRowStyle}>
              <Button
                style={styles.bottomRoundedPills}
                onPress={() => this._deckSwiper._root.swipeLeft()}
              >
                <Icon
                  name="md-close"
                  style={{
                    color: commonColor.brandDanger,
                    fontSize: 40,
                    lineHeight: 40,
                  }}
                />
              </Button>
              <Button
                style={styles.bottomRoundedPills}
                onPress={() => this._deckSwiper._root.swipeRight()}
              >
                <Icon
                  name="md-heart"
                  style={{
                    color: commonColor.brandSuccess,
                    fontSize: 35,
                    lineHeight: 40,
                    marginLeft: 2,
                    marginRight: 2,
                  }}
                />
              </Button>
            </Row>
          </Grid>
        </Container>
      );
    }
  }
}

export default PhotoCard;
