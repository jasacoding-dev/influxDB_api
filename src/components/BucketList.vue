<template>
  <div>
    <h1>Bucket List</h1>
    <table>
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="bucket in buckets" :key="bucket.id">
          <td>{{ bucket.id }}</td>
          <td>{{ bucket.name }}</td>
          <td>{{ bucket.description }}</td>
          <td>{{ bucket.status }}</td>
          <td>
            <button @click="editBucket(bucket.id)">Edit</button>
            <button @click="deleteBucket(bucket.id)">Delete</button>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script>
import influxdb from '../api/influxdb';

export default {
  data() {
    return {
      buckets: []
    };
  },
  created() {
    this.fetchBuckets();
  },
  methods: {
    fetchBuckets() {
      influxdb.getBuckets().then(response => {
        this.buckets = response.data.buckets;
      });
    },
    editBucket(id) {
        // Contoh: Navigasi ke halaman edit
        this.$router.push({ name: 'EditBucket', params: { id } });
    },
    deleteBucket(id) {
      if (confirm('Are you sure you want to delete this bucket?')) {
        influxdb.deleteBucket(id).then(() => {
          this.fetchBuckets();
          alert('Bucket deleted successfully');
        });
      }
    }
  }
};
</script>

<style scoped>
table {
  width: 100%;
  border-collapse: collapse;
}
th, td {
  padding: 8px;
  text-align: left;
  border-bottom: 1px solid #ddd;
}
</style>