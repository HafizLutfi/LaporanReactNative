import axios from "axios";
import React, { Component } from "react";
import { Text, TouchableOpacity, View } from "react-native";
import { TextInput } from "react-native-gesture-handler";
import Icon from "react-native-vector-icons/FontAwesome5";
import { UserAction } from "../redux/Action";
import { connect } from "react-redux";

export class Login extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // username: "",
    };
  }

  VerifyLogin = () => {
    axios
      .get(`http://192.168.43.232:8080/user/login/${this.props.dataUser.username}`)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        if (JSON.stringify(response.data) === "[]") {
          alert("Username salah !");
        } else {
          this.props.navigation.replace("MainMenu");
          alert("Selamat Datang " + this.props.dataUser.username);
        }
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    // console.log(this.props.dataUser.username);
    return (
      <View style={{ alignItems: "center" }}>
        <Icon name="user" style={{ fontSize: 40, marginTop: 20 }} />
        <View>
          <Text style={{ marginTop: 10, fontSize: 20 }}>Username</Text>
          <TextInput style={{ borderWidth: 1, height: 30, width: 300, marginTop: 10, borderRadius: 30, textAlign: "center", backgroundColor: "white" }} onChangeText={(value) => this.props.UserAction("username", value)} />
        </View>
        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            width: 120,
            height: 30,
            alignItems: "center",
            borderRadius: 20,
            marginTop: 10,
          }}
          onPress={() => {
            this.VerifyLogin();
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Sign In</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            backgroundColor: "blue",
            width: 120,
            height: 30,
            alignItems: "center",
            borderRadius: 20,
            marginTop: 10,
          }}
          onPress={() => {
            this.props.navigation.navigate("Register");
          }}
        >
          <Text style={{ fontSize: 20, color: "white" }}>Register</Text>
        </TouchableOpacity>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataUser: state.UserReducer,
  };
};

const mapDispatchToProps = {
  UserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Login);
