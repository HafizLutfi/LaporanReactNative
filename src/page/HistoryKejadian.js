import axios from "axios";
import React, { Component } from "react";
import { FlatList, SafeAreaView, StatusBar, Text, View, Image, Touchable } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import { LaporanAction, UserAction } from "../redux/Action";
import { connect } from "react-redux";

export class HistoryKejadian extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
    };
  }

  componentDidMount() {
    this.laporanKu();
    this.laporanSemua();
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

  renderItem = ({ item }) => (
    <View style={{ flexDirection: "row", marginTop: 10, borderRadius: 1, backgroundColor: "white", marginLeft: 5 }}>
      <View>
        <View style={{ flexDirection: "row" }}>
          <Text>Status :</Text>
          <Text>{item.kejadian}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Tanggal Kejadian :</Text>
          <Text>{item.time}</Text>
        </View>
        <View style={{ flexDirection: "row" }}>
          <Text>Alamat :</Text>
          <Text>{item.alamat}</Text>
        </View>
      </View>
      <View>
        <Image source={{ uri: item.gambar }} style={{ height: 60, width: 60, marginLeft: 25 }} />
      </View>
    </View>
  );

  render() {
    // console.log(this.state.data);
    return (
      <SafeAreaView style={{ alignItems: "center" }}>
        <View style={{ flexDirection: "row", alignItems: "center", height: 40 }}>
          <TouchableOpacity
            style={{ alignItems: "center", borderRadius: 20, marginLeft: 20, marginRight: 20 }}
            onPress={() => {
              this.laporanSemua();
            }}
          >
            <Text style={{ fontSize: 20 }}>Semua Laporan</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={{ alignItems: "center", borderRadius: 20, marginLeft: 20, marginRight: 20 }}
            onPress={() => {
              this.laporanKu();
            }}
          >
            <Text style={{ fontSize: 20 }}>Laporan Saya</Text>
          </TouchableOpacity>
        </View>
        <FlatList data={this.state.data} renderItem={this.renderItem} keyExtractor={(item) => item.id.toString()} />
      </SafeAreaView>
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

export default connect(mapStateToProps, mapDispatchToProps)(HistoryKejadian);
