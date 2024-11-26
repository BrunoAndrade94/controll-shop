const rota = "http://172.17.10.134:4000/locals";

const GetLocalAll = `${rota}/get`;
const GetLocalDescription = `${rota}/get/?search=`;

export default {
  GetLocalAll,
  GetLocalDescription,
};
