import React from "react";
import { StyleSheet, Text, ListView, FlatList, View } from "react-native";
import { Container, Content, Input, Item, Button, Icon, ListItem, List, Label} from "native-base";
import * as firebase from "firebase";

export default class SubcategoryController extends React.Component {
    static navigationOptions = ({ navigation }) => {
        return {
            title: navigation.state.params.categoryname,
            headerStyle: {
                backgroundColor: '#ffe3e3',
            },  
            headerTitleStyle: {
                color: '#444FAD',
            },
        };
      };
  constructor(props){
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      listViewData: [],
      newSubcategory: "",
      categorykey: "",
      categoryname: ""
    };
  }
  async componentDidMount() {
    await this.setState({categorykey: this.props.navigation.state.params.categorykey,
        categoryname: this.props.navigation.state.params.categoryname})
    var that = this
    firebase.database().ref('/Categories/'+this.state.categorykey+'/Subcategories').on('child_added', function (data) {
        var newData = [...that.state.listViewData]
        newData.push(data)
        that.setState({ listViewData: newData })            
    })
  }
  addCategory(subcatname){
    var key = firebase.database().ref('/Categories/'+this.state.categorykey+'/Subcategories').push().key;
    firebase.database().ref('/Categories/'+this.state.categorykey+'/Subcategories').child(key).set({subcategoryname: subcatname});
  }
  render() {
    return (
      <Container>
        <Content>
        <Item style={{alignSelf: 'center', borderColor:'transparent', marginTop:10, paddingLeft:20, paddingRight: 20}}>
            <Item style={{width: 300}}>
              <Input placeholder={this.state.categoryname}
                onChangeText={categoryname => this.setState({ categoryname })} 
                value={this.state.categoryname}/>
            </Item>
            <Button  
              style={{backgroundColor: '#FF3879', marginTop: 5, marginLeft: 5 , width: 50}}>
              <Text style={{marginLeft: 10, color: 'white'}}> Edit</Text>
            </Button>
          </Item>

          <Item style={{alignSelf: 'center', borderColor:'transparent', marginTop:10, paddingLeft:20, paddingRight: 20}}>
            <Item  style={{width: 300}}>
              <Input placeholder="Subcategory name"
                onChangeText={newSubcategory => this.setState({ newSubcategory })} 
                value={this.state.newSubcategory}/>
            </Item>
            <Button  
              style={{backgroundColor: '#FF3879', marginTop: 5, marginLeft: 5 , width: 50}}
              onPress={ () => {
                
                if(this.state.newSubcategory==""){
                    alert("Subcategoryname is empty")
                }
                else{
                    this.addCategory( this.state.newSubcategory );
                    this.setState({ newSubcategory: "" });
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
              <Button iconLeft warning style={{height: 40}}>
                <Icon name='md-create' style={{fontSize: 14}} />
                <Text style={{color: 'white'}}>  Edit  </Text>
              </Button>
              <Text style={{fontSize:16, color: '#444FAD', marginLeft: 10}}>{data.val().subcategoryname}</Text>
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