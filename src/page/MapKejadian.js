import axios from "axios";
import React, { Component } from "react";
import { View, Dimensions, Text } from "react-native";
import MapView from "react-native-maps";
import { LaporanAction, UserAction } from "../redux/Action";
import { connect } from "react-redux";
import { TouchableOpacity } from "react-native-gesture-handler";
import * as Location from "expo-location";

export class MapKejadian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.laporanKu();
    this.laporanSemua();
    this.getLocation();
  }

  laporanSemua = () => {
    axios
      .get(`http://192.168.43.232:8080/laporan/`)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const data = response.data;
        this.setState({ data: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

  laporanKu = () => {
    axios
      .get(`http://192.168.43.232:8080/laporan/find/${this.props.dataUser.username}`)
      .then((response) => {
        // console.log(JSON.stringify(response.data));
        const data = response.data;
        this.setState({ data: data });
      })
      .catch(function (error) {
        console.log(error);
      });
  };

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
  };

  render() {
    // console.log(this.state.data);
    return (
      <View style={{ flex: 1, backgroundColor: "#fff", alignItems: "center", justifyContent: "center" }}>
        <MapView
          style={{ width: Dimensions.get("window").width, height: Dimensions.get("window").height }}
          initialRegion={{
            latitude: this.props.dataLaporan.latitude,
            longitude: this.props.dataLaporan.longitude,
            latitudeDelta: 0.0122,
            longitudeDelta: 0.0421,
          }}
        >
          {this.state.data.map((val, index) => {
            return (
              <MapView.Marker
                coordinate={{
                  latitude: val.latitude,
                  longitude: val.longitude,
                }}
                key={index}
                title={val.nama}
              />
            );
          })}
        </MapView>
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

export default connect(mapStateToProps, mapDispatchToProps)(MapKejadian);
