import React, { Component } from "react";
import { Text, TextInput, View } from "react-native";
import { TouchableOpacity } from "react-native-gesture-handler";
import RNPickerSelect from "react-native-picker-select";
import Icon from "react-native-vector-icons/FontAwesome5";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import * as Permissions from "expo-permissions";

export class Laporan extends Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  render() {
    return (
      <View>
        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Nama Kejadian</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.setState({ username: value })} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Kejadian</Text>
        <RNPickerSelect
          pickerProps={{ style: { height: 40, overflow: "scroll", borderWidth: 1, width: 350, marginLeft: 20, backgroundColor: "white" } }}
          onValueChange={(value) => console.log(value)}
          items={[
            { label: "Pemerkosaan", value: "Pemerkosaan" },
            { label: "Perampokan", value: "Perampokan" },
            { label: "Bencana", value: "Bencana" },
            { label: "Pembunuhan", value: "Pembunuhan" },
          ]}
        />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Phone</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.setState({ phone: value })} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Alamat</Text>
        <TextInput style={{ borderWidth: 1, height: 30, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.setState({ address: value })} />

        <Text style={{ marginTop: 10, fontSize: 20, marginLeft: 20 }}>Keterangan</Text>
        <TextInput multiline={true} style={{ borderWidth: 1, height: 90, marginTop: 10, backgroundColor: "white", width: 350, marginLeft: 20, fontSize: 18, paddingLeft: 5 }} onChangeText={(value) => this.setState({ address: value })} />

        <View style={{ alignItems: "center" }}>
          <TouchableOpacity>
            <Icon name="camera" style={{ fontSize: 100 }} />
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
            onPress={() => this.Register()}
          >
            <Text style={{ fontSize: 20, color: "white" }}>Register</Text>
          </TouchableOpacity>
        </View>
      </View>
    );
  }
}

export default Laporan;
