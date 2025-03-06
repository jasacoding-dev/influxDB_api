import axios from 'axios';

const API_URL = 'http://staging.inamas.id:8086/api/v2';
const ORG_ID = 'd43faa4e22638d1b'; // Variabel ini digunakan
const TOKEN = 'GtxTX6uT4DPKK6-oUV8WK0mJyuvzCKDE4UxSsLZFaevam0FdWH8BneHJr6nAhqIuYizctjNHoSbsr2Fqx8TMpg==';

const headers = {
  'Authorization': `Token ${TOKEN}`,
  'Content-Type': 'application/json',
  'Accept': 'application/json'
};

export default {
  getBuckets() {
    return axios.get(`${API_URL}/buckets?orgID=${ORG_ID}`, { headers }); // Menggunakan ORG_ID
  },
  createBucket(data) {
    data.orgID = ORG_ID; // Menambahkan ORG_ID ke data yang dikirim
    return axios.post(`${API_URL}/buckets`, data, { headers });
  },
  getBucket(id) {
    return axios.get(`${API_URL}/buckets/${id}?orgID=${ORG_ID}`, { headers }); // Menggunakan ORG_ID
  },
  updateBucket(id, data) {
    data.orgID = ORG_ID; // Menambahkan ORG_ID ke data yang dikirim
    return axios.patch(`${API_URL}/buckets/${id}`, data, { headers });
  },
  deleteBucket(id) {
    return axios.delete(`${API_URL}/buckets/${id}?orgID=${ORG_ID}`, { headers }); // Menggunakan ORG_ID
  }
};