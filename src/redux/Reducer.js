import { combineReducers } from "redux";

const LaporanGlobal = {
  nama: "",
  kejadian: "",
  alamat: "",
  keterangan: "",
  gambar: "",
  latitude: 0.0,
  longitude: 0.0,
  time: "",
  username: "",
};

const UserGlobal = {
  username: "",
  email: "",
  phone: "",
  address: "",
};

const LaporanReducer = (state = LaporanGlobal, action) => {
  if (action.type === "SET_LAPORAN") {
    return {
      ...state,
      [action.tipeInput]: action.valueInput,
    };
  }
  return state;
};

const UserReducer = (state = UserGlobal, action) => {
  if (action.type === "SET_USER") {
    return {
      ...state,
      [action.tipeInput]: action.valueInput,
    };
  }
  return state;
};

const Reducer = combineReducers({
  LaporanReducer,
  UserReducer,
});

export default Reducer;
