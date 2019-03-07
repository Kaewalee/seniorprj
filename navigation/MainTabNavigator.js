import React, { Component } from "react";
import { createAppContainer, createStackNavigator } from "react-navigation";

import AddPostScreen from "./../screens/Post/AddPostScreen";
import PostListScreen from "./../screens/Post/PostListScreen";
import PostDetailsScreen from "./../screens/Post/PostDetailsScreen";
import CategoriesListScreen from "./../screens/Post/CategoriesListScreen";
import SubcategoriesListScreen from "../screens/Post/SubcategoriesListScreen";
import CategoryController from "../screens/admin/CategoryController"
import SubcategoryController from "../screens/admin/SubcategoryController"


export const Navigator = new createStackNavigator(
  {
    AddPostScreen: { screen: AddPostScreen },
    PostListScreen: { screen: PostListScreen },
    PostDetailsScreen: { screen: PostDetailsScreen },
    CategoriesListScreen: { screen: CategoriesListScreen },
    SubcategoriesListScreen: { screen: SubcategoriesListScreen },
    CategoryController: {screen: CategoryController},
    SubcategoryController: {screen: SubcategoryController},
  
  },
  {
    initialRouteName: "CategoriesListScreen"
  }
);

const AppConatiner = createAppContainer(Navigator);

class StackNavigator extends Component {
  render() {
    return <AppConatiner />;
  }
}

export default StackNavigator;
