import React, { Component } from "react";
import { Text, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";

export class MainMenu extends Component {
  constructor(props) {
    super(props);
    this.state = {
      count: 0,
    };
  }

  countPress = () => {
    this.setState({
      count: this.state.count + 1,
    });
  };

  render() {
    // console.log(this.state.count);
    if (this.state.count === 3) {
      this.props.navigation.replace("camera");
    }
    return (
      <View>
        <View style={{ flexDirection: "row", marginTop: 40, justifyContent: "center" }}>
          <TouchableOpacity
            style={{ backgroundColor: "white", height: 100, width: 100, marginLeft: 20, marginRight: 20, justifyContent: "center" }}
            onPress={() => {
              this.props.navigation.navigate("camera");
            }}
          >
            <Icon name="file-alt" style={{ fontSize: 40, textAlign: "center" }} />
            <Text style={{ textAlign: "center" }}>Laporan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "white", height: 100, width: 100, marginLeft: 20, marginRight: 20, justifyContent: "center" }}
            onPress={() => {
              this.props.navigation.navigate("HistoryKejadian");
            }}
          >
            <Icon name="history" style={{ fontSize: 40, textAlign: "center" }} />
            <Text style={{ textAlign: "center" }}>History Laporan</Text>
          </TouchableOpacity>
        </View>
        <View style={{ flexDirection: "row", marginTop: 40, justifyContent: "center" }}>
          <TouchableOpacity
            style={{ backgroundColor: "white", height: 100, width: 100, marginLeft: 20, marginRight: 20, justifyContent: "center" }}
            onPress={() => {
              this.props.navigation.navigate("MapKejadian");
            }}
          >
            <Icon name="map-marked-alt" style={{ fontSize: 40, textAlign: "center" }} />
            <Text style={{ textAlign: "center" }}>Map Kejadian</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ backgroundColor: "white", height: 100, width: 100, marginLeft: 20, marginRight: 20, justifyContent: "center" }}
            onPress={() => {
              this.props.navigation.replace("Login");
            }}
          >
            <Icon name="sign-out-alt" style={{ fontSize: 40, textAlign: "center" }} />
            <Text style={{ textAlign: "center" }}>Sign Out</Text>
          </TouchableOpacity>
        </View>
        <View style={{ marginTop: 40, justifyContent: "center", alignItems: "center" }}>
          <TouchableOpacity style={{ justifyContent: "center", height: 250, width: 250 }} onPress={() => this.countPress()}>
            <Icon name="exclamation-circle" style={{ textAlign: "center", fontSize: 200 }} />
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default MainMenu;
