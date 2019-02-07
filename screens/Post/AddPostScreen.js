import React from 'react';
import { StyleSheet, Text, ListView } from 'react-native';
import { StyleProvider,Container, Content, CheckBox, Body, Left, Right,Header,Title, Form, 
        Input, Item, Button, Icon, ListItem, Textarea, Card, CardItem, Picker, DatePicker } from 'native-base';
import * as firebase from 'firebase';

var data = []

export default class HomeScreen extends React.Component {
  constructor(props) {
    super(props);
    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })
    this.state = {
      listViewData: data,
      newTopic: "",
      newText: "",
      checked: undefined,
      postType: "",
      selected: undefined,
      chosenDate: new Date(),
    }
    this.setDate = this.setDate.bind(this);
  }
  setDate(newDate) {
    this.setState({ chosenDate: newDate });
  }
  onValueChange(value) {
    this.setState({
      selected: value
    });
  }
  componentDidMount() {
    var that = this
    firebase.database().ref('/contacts').on('child_added', function (data) {
      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({ listViewData: newData })
    })
  }
  
  addRow(name, txt, ty, cat, edate) {
    var key = firebase.database().ref('/Posts').push().key
    firebase.database().ref('/Posts').child(key).set({ topicname: name, 
                                                      text: txt,
                                                      Posttype:{
                                                        type: ty,
                                                        eventdate: edate
                                                      } , 
                                                      categoryname: cat,
                                                      })
  }
  setType(check){
    if(check==true){
      this.state.postType="Event"
    }
    else{
      this.state.postType="Post"
      }   
  }
  render() {
    return (
      <Container>
        <Header >
          <Left>
            <Button transparent>
              <Icon name='arrow-back' />
            </Button>
          </Left>
          <Body>
            <Title>Header</Title>
          </Body>
          <Right />
        </Header>

        <Card style={{ marginTop: 20, marginBottom: 20, marginLeft: 10, marginRight: 10,}}>
          <CardItem >
            <Content >
              <Item rounded>
                <Input
                  style={{fontSize: 18,textAlign: 'center'}}
                  onChangeText={(newTopic) => this.setState({ newTopic })}
                  placeholder="Topic name"
                />
              </Item>
              <ListItem onPress={this.setType(this.state.checked) }>
                <CheckBox checked={this.state.checked} 
                          onPress={()=>this.setState({checked: !this.state.checked})}
                          color="#FF3879" />
                  <Body><Text style={{color: '#FF3879', fontSize: 16}}>   Event</Text></Body>
              </ListItem>
              <Text> Event Date:</Text> 
              <DatePicker            
                locale={"en"}
                timeZoneOffsetInMinutes={undefined}
                modalTransparent={false}
                animationType={"fade"}
                androidMode={"default"}
                placeHolderText="Select date"
                textStyle={{ color: "#444FAD" }}
                placeHolderTextStyle={{ color: "#d3d3d3" }}
                onDateChange={this.setDate}
                disabled={false}
                onChangeText={(chosenDate) => this.setState({ chosenDate })}
              />
              <Form>
                <Picker
                  mode="dropdown"
                  iosIcon={<Icon name="arrow-down" />}
                  placeholder="Category"
                  placeholderStyle={{ color: '#FFE3E3' }}
                  placeholderIconColor='#444FAD'
                  style={{ width: undefined }}
                  selectedValue={this.state.selected}
                  onValueChange={this.onValueChange.bind(this)}>
                    <Picker.Item label="sports & fitness" value="sports & fitness" />
                    <Picker.Item label="photography" value="photography" />
                    <Picker.Item label="food & drink" value="food & drink" />
                    <Picker.Item label="travel" value="travel" />
                    <Picker.Item label="technology" value="technology" />
                    <Picker.Item label="healt" value="healt" />
                    <Picker.Item label="learning" value="learning" />
                    <Picker.Item label="language" value="language" />
                    <Picker.Item label="music" value="music" />
                    <Picker.Item label="film" value="film" />
                    <Picker.Item label="book" value="book" />
                    <Picker.Item label="fashion & beauty" value="fashion & beauty" />
                </Picker>
              </Form>
              <Content padder>
                <Form>
                  <Textarea rowSpan={5} bordered placeholder="Textarea" 
                            onChangeText={(newText) => this.setState({ newText })}/>
                  
                </Form>
              </Content>
              <Button rounded  
                      onPress={() => this.addRow(this.state.newTopic, 
                                                this.state.newText, 
                                                this.state.postType,
                                                this.state.selected,
                                                this.state.chosenDate.toString().substr(4, 12),
                                                )} 
                       style={{backgroundColor: '#FF3879', alignSelf: 'flex-end'}}>
                <Text style={{color: 'white', fontSize: 18}}>        Post        </Text>
              </Button>
            </Content>
          </CardItem>
        </Card>
      </Container>  
    );
  } 
}
  
  const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: '#ffff',
      paddingTop: 20,
    },
  });
  