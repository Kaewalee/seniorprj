import React from "react";
import { StyleSheet, Text, ListView, FlatList, View } from "react-native";
import { Container, Content, Input, Item, Button, Icon, ListItem, List, } from "native-base";
import * as firebase from "firebase";

export default class CategoryController extends React.Component {
  static navigationOptions = {
    title: null,
    headerStyle: {
      backgroundColor: "#ffe3e3"
    },
    headerRight: (
      <Icon name="md-mail" 
      style={{marginRight: 15}} />
    )
  };
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      listViewData: [],
      newCategory: ""
    };
  }
  async componentDidMount() {
    var that = this
    firebase.database().ref('/Categories/').on('child_added', function (data) {
        var newData = [...that.state.listViewData]
        newData.push(data)
        that.setState({ listViewData: newData })            
    })
  }
  addCategory(catname){
    var key = firebase.database().ref("/Categories").push().key;
    firebase.database().ref("/Categories").child(key).set({categoryname: catname});
  }
  render() {
    return (
      <Container>
        <Content>
          <Item style={{alignSelf: 'center', borderColor:'transparent', marginTop:10, paddingLeft:20, paddingRight: 20}}>
            <Item  style={{width: 300}}>
              <Input placeholder="Category name"
                onChangeText={newCategory => this.setState({ newCategory })} 
                value={this.state.newCategory}/>
            </Item>
            <Button 
              style={{backgroundColor: '#FF3879', marginTop: 5, marginLeft: 5,width: 50  }}
              onPress={ () => {
                if(this.state.newCategory==""){
                  alert("Categoryname is empty")
                }
                else{
                  this.addCategory( this.state.newCategory );
                this.setState({ newCategory: "" });
                }
              }}>
              <Text style={{marginLeft: 10, color: 'white'}}>Add</Text>
            </Button>
          </Item>
          <List enableEmptySections
            style={{marginLeft: 20, marginRight: 20}}
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
            <ListItem>                  
              <Button iconLeft warning style={{height: 40}}
                onPress={ () => {this.props.navigation.navigate('SubcategoryController', {'categorykey': data.key, 'categoryname': data.val().categoryname} )}}>
                <Icon name='md-create' style={{fontSize: 14}} />
                <Text style={{color: 'white'}}>  Edit  </Text>
              </Button>
              <Text style={{fontSize:16, color: '#444FAD', marginLeft: 10}}>{data.val().categoryname}</Text>
            </ListItem>
            }
            renderRightHiddenRow={() =>
              <Button full danger>
                <Icon name="md-trash" />
              </Button>
            }       
            rightOpenValue={-60}
          />
        </Content>
      </Container>
        )}
}
const styles = StyleSheet.create({
  buttonstyle: {
    marginTop: 20,
    marginLeft: 20,
    marginRight: 20,
    color: "#444FAD"
  },
  textstyle: {
    fontSize: 18,
    color: "#ffffff",
    fontWeight: "bold",
  },
  
});