import React from "react";
import { createMaterialTopTabNavigator } from "react-navigation";
import { Icon, Header, FooterTab, Button, Thumbnail } from "native-base";
import { SafeAreaView } from "react-native";
import Profile from "../Profile";
import PhotoCard from "../PhotoCard";
import ChatList from "../ChatList";
import styles from "./styles";
import Volunteer from "../Volunteer";

const HomeTabNavigation = createMaterialTopTabNavigator(
  {
    Profile: { screen: Profile },
    PhotoCard: { screen: PhotoCard },
    Volunteer: { screen: Volunteer },
    ChatList: { screen: ChatList },
  },
  {
    tabBarPosition: "top",
    initialRouteName: "PhotoCard",
    lazy: true,
    tabBarComponent: (props) => {
      return (
        <SafeAreaView>
          <Header>
            <FooterTab>
              <Button onPress={() => props.navigation.navigate("Profile")}>
                <Thumbnail
                  small
                  source={
                    props.navigation.state.index === 0
                      ? require("../../../assets/profile_icon_active.png")
                      : require("../../../assets/profile_icon_inactive.png")
                  }
                />
              </Button>

              <Button onPress={() => props.navigation.navigate("PhotoCard")}>
                <Thumbnail
                  small
                  source={
                    props.navigation.state.index === 1
                      ? require("../../../assets/pin_icon_active.png")
                      : require("../../../assets/pin_icon_inactive.png")
                  }
                />
              </Button>

              <Button onPress={() => props.navigation.navigate("Volunteer")}>
                <Thumbnail
                  small
                  source={
                    props.navigation.state.index === 2
                      ? require("../../../assets/vol_icon_active.png")
                      : require("../../../assets/vol_icon_inactive.png")
                  }
                />
              </Button>

              <Button onPress={() => props.navigation.navigate("ChatList")}>
                <Thumbnail
                  small
                  source={
                    props.navigation.state.index === 3
                      ? require("../../../assets/chat_icon_active.png")
                      : require("../../../assets/chat_icon_inactive.png")
                  }
                />
                {/* <Icon
                  name="md-chatboxes"
                  style={
                    props.navigation.state.index === 3
                      ? styles.activeIcon
                      : styles.inActiveIcon
                  }
                /> */}
              </Button>
            </FooterTab>
          </Header>
        </SafeAreaView>
      );
    },
  }
);

export default HomeTabNavigation;
