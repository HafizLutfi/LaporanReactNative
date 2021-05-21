export function LaporanAction(tipe, value) {
  return { type: "SET_LAPORAN", tipeInput: tipe, valueInput: value };
}

export function UserAction(tipe, value) {
  return { type: "SET_USER", tipeInput: tipe, valueInput: value };
}
