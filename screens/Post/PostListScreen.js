import React from 'react';
import { StyleSheet, Text, View, StatusBar, ListView } from 'react-native';
import { Container, Content, Header, Form, Input, Item, Button, Label, Icon, List, ListItem } from 'native-base';
import * as firebase from 'firebase';

var data = []

export default class PostListScreen extends React.Component {
  // static navigationOptions = {
  //   header: null,
  // };

  constructor(props) {
    super(props);

    this.ds = new ListView.DataSource({ rowHasChanged: (r1, r2) => r1 !== r2 })

    this.state = {
      listViewData: data,
      newContact: ""
    }
  }
  componentDidMount() {
    var that = this
    firebase.database().ref('/Posts').on('child_added', function (data) {
      var newData = [...that.state.listViewData]
      newData.push(data)
      that.setState({ listViewData: newData })
    })
  }

  

  async deleteRow(secId, rowId, rowMap, data) {

    await firebase.database().ref('Posts/' + data.key).set(null)

    rowMap[`${secId}${rowId}`].props.closeRow();
    var newData = [...this.state.listViewData];
    newData.splice(rowId, 1)
    this.setState({ listViewData: newData });

  }

  showInformation() {
  }
  render() {
    return (
      <Container style={styles.container}>
        
        <Content>
          <List
            enableEmptySections
            dataSource={this.ds.cloneWithRows(this.state.listViewData)}
            renderRow={data =>
              <ListItem>
                <Text style={{fontSize:17}}> {data.val().topicname}</Text>
              </ListItem>
            }
            
            renderRightHiddenRow={(data, secId, rowId, rowMap) =>
              <Button full >
                <Icon name="information-circle" />
              </Button>

            }
            rightOpenValue={-75}

          />

        </Content>
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

