import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ListScreen from "./screens/ListScreen";
import AddScreen from "./screens/AddScreen";

const AppNavigator = createStackNavigator({
  List: ListScreen,
  Add: AddScreen,
}, {
  initialRouteName: 'List',
});

export default createAppContainer(AppNavigator);
