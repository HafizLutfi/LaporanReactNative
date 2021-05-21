import React, { Component } from "react";
import { Text, View } from "react-native";
import * as ImagePicker from "expo-image-picker";
import { Camera } from "expo-camera";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import { TouchableOpacity } from "react-native-gesture-handler";

export default class camera extends Component {
  constructor(props) {
    super(props);
    this.state = {
      hasPermission: null,
      type: Camera.Constants.Type.back,
      photo: "",
    };
  }

  async componentDidMount() {
    let { status } = await Camera.requestPermissionsAsync();
    this.setState({ hasPermission: status === "granted" });
    this.getPermissionAsync();
  }

  handleCameraType = () => {
    const { cameraType } = this.state;

    this.setState({ cameraType: cameraType === Camera.Constants.Type.back ? Camera.Constants.Type.front : Camera.Constants.Type.back });
  };

  takePicture = () => {
    console.log("pencet");
    if (this.camera) {
      this.camera.takePictureAsync({ onPictureSaved: this.onPictureSaved });
    }
  };

  onPictureSaved = (photo) => {
    // console.log(photo);
    this.setState({ photo: photo.uri });

    this.props.navigation.replace("Laporan", this.state.photo);
  };

  getPermissionAsync = async () => {
    if (Platform.OS === "android") {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }
  };

  pickImage = async () => {
    let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
    });
    // console.log(result.uri);
    this.setState({ photo: result.uri });
    this.props.navigation.replace("Laporan", this.state.photo);
  };

  render() {
    console.log(this.state.photo);
    const { hasPermission } = this.state;
    if (hasPermission === null) {
      return <View />;
    } else if (hasPermission === false) {
      return <Text>No access to camera</Text>;
    } else {
      return (
        <View style={{ flex: 1 }}>
          <Camera
            style={{ flex: 1 }}
            type={this.state.cameraType}
            ref={(ref) => {
              this.camera = ref;
            }}
          />

          <View style={{ height: 60, flexDirection: "row", justifyContent: "center" }}>
            <View>
              <TouchableOpacity style={{ alignItems: "center", marginTop: 10, marginLeft: 40, marginRight: 40 }}>
                <Icon
                  name="image-multiple"
                  style={{ fontSize: 40 }}
                  onPress={() => {
                    this.pickImage();
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{ alignItems: "center", marginTop: 10, marginLeft: 40, marginRight: 40 }}>
                <Icon
                  name="camera"
                  style={{ fontSize: 40 }}
                  onPress={() => {
                    this.takePicture();
                  }}
                />
              </TouchableOpacity>
            </View>
            <View>
              <TouchableOpacity style={{ alignItems: "center", marginTop: 10, marginLeft: 40, marginRight: 40 }}>
                <Icon
                  name="camera-switch"
                  style={{ fontSize: 40 }}
                  onPress={() => {
                    this.handleCameraType();
                  }}
                />
              </TouchableOpacity>
            </View>
          </View>
        </View>
      );
    }
  }
}
