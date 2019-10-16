import { createAppContainer } from "react-navigation";
import { createStackNavigator } from "react-navigation-stack";
import ListScreen from "./screens/ListScreen";
import AddScreen from "./screens/AddScreen";
import EditScreen from "./screens/EditScreen";

const AppNavigator = createStackNavigator({
  List: ListScreen,
  Add: AddScreen,
  Edit: EditScreen,
}, {
  initialRouteName: 'List',
});

export default createAppContainer(AppNavigator);
