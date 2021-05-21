import axios from "axios";
import React, { Component } from "react";
import { Text, TextInput, TouchableOpacity, View } from "react-native";

export class Register extends Component {
  constructor(props) {
    super(props);
    this.state = {
      username: "",
      email: "",
      phone: "",
      address: "",
    };
  }

  Register = () => {
    axios
      .post(`http://192.168.43.232:8080/user/add/`, this.state)
      .then((response) => {
        // console.log(response);
        alert(response.data);
        this.props.navigation.replace("Login");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    // console.log(this.state.address);
    return (
      <View>
        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Name</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.setState({ username: value })} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Email</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.setState({ email: value })} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Phone</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.setState({ phone: value })} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Address</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.setState({ address: value })} />

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            style={{
              backgroundColor: "blue",
              width: 300,
              height: 30,
              alignItems: "center",
              borderRadius: 20,
              marginTop: 10,
            }}
            onPress={() => this.Register()}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Register;
