import React, { Component } from "react";
import { Text, TextInput, View, Image } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome5";
import { LaporanAction, UserAction } from "../redux/Action";
import { connect } from "react-redux";
import * as Location from "expo-location";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";
import axios from "axios";

export class Laporan extends Component {
  constructor(props) {
    super(props);
    this.state = {
      // nama: "",
      // kejadian: "",
      // alamat: "",
      // keterangan: "",
      // gambar: "",
      // latitude: 0.0,
      // longitude: 0.0,
      // time: "",
    };
  }

  componentDidMount() {
    setInterval(() => {
      this.props.LaporanAction("time", new Date().toLocaleString());
    }, 1000);
    this.getLocation();
    console.log(this.props.dataUser.username);
  }

  getLocation = async () => {
    let { status } = await Location.requestForegroundPermissionsAsync();
    if (status !== "granted") {
      setErrorMsg("Permission to access location was denied");
      return;
    }

    let location = await Location.getCurrentPositionAsync({});
    // console.log(JSON.stringify(location));

    this.props.LaporanAction("latitude", location.coords.latitude);
    this.props.LaporanAction("longitude", location.coords.longitude);

    //add username
    this.props.LaporanAction("username", this.props.dataUser.username);
  };

  LaporkanKejadian = () => {
    axios
      .post(`http://192.168.43.232:8080/laporan/add/`, this.props.dataLaporan)
      .then((response) => {
        alert(response.data);
        this.props.navigation.replace("MainMenu");
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  render() {
    // console.log(JSON.stringify(this.props));
    // console.log(this.props.dataLaporan.longitude);
    return (
      <View>
        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Nama Kejadian</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.props.LaporanAction("nama", value)} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Kejadian</Text>
        <RNPickerSelect
          pickerProps={{ style: { height: 40, overflow: "scroll", borderWidth: 1, width: 350, marginLeft: 20, backgroundColor: "white" } }}
          onValueChange={(value) => this.props.LaporanAction("kejadian", value)}
          items={[
            { label: "Pemerkosaan", value: "Pemerkosaan" },
            { label: "Perampokan", value: "Perampokan" },
            { label: "Bencana", value: "Bencana" },
            { label: "Pembunuhan", value: "Pembunuhan" },
          ]}
        />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Phone</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.props.LaporanAction("phone", value)} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Alamat</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.props.LaporanAction("alamat", value)} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Keterangan</Text>
        <TextInput
          multiline={true}
          style={{ borderWidth: 1, height: 90, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }}
          onChangeText={(value) => this.props.LaporanAction("keterangan", value)}
        />

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity
            onPress={() => {
              this.props.navigation.navigate("camera");
            }}
          >
            <Image source={{ uri: this.props.dataLaporan.gambar }} style={{ width: 200, height: 200, marginTop: 10 }} />
          </TouchableOpacity>
        </View>

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
            onPress={() => this.LaporkanKejadian()}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Laporkan</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    dataLaporan: state.LaporanReducer,
    dataUser: state.UserReducer,
  };
};

const mapDispatchToProps = {
  LaporanAction,
  UserAction,
};

export default connect(mapStateToProps, mapDispatchToProps)(Laporan);
