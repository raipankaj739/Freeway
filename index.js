import { AppRegistry, Platform } from "react-native";
// import { registerRootComponent } from "expo";
import App from "./App";

AppRegistry.registerComponent("freeway", () => App);
// registerRootComponent(App);

if (Platform.OS === "web") {
  const rootTag =
    document.getElementById("root") || document.getElementById("main");
  AppRegistry.runApplication("freeway", { rootTag });
}
