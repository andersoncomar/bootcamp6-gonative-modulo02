import { createAppContainer, createStackNavigator } from "react-navigation";

import { colors } from "./styles";

import Main from "~/pages/Main";
import Issues from "~/pages/Issues";

const Routes = createAppContainer(
  createStackNavigator(
    {
      Main,
      Issues
    },
    {
      defaultNavigationOptions: {
        headerTintColor: colors.darker,
        headerBackTitle: null
      }
    }
  )
);

export default Routes;
