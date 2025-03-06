<template>
  <div class="container mt-5">
    <h1 class="mb-4">{{ isEdit ? 'Edit Bucket' : 'Create Bucket' }}</h1>
    <form @submit.prevent="submitForm" class="card p-4 shadow-sm">
      <div class="form-group">
        <label for="name">Name:</label>
        <input type="text" id="name" v-model="form.name" class="form-control" required>
      </div>
      <div class="form-group">
        <label for="description">Description:</label>
        <input type="text" id="description" v-model="form.description" class="form-control">
      </div>
      <div class="form-group">
        <label for="status">Status:</label>
        <select id="status" v-model="form.status" class="form-control">
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>
      <button type="submit" class="btn btn-primary">
        <i class="fas fa-save"></i> {{ isEdit ? 'Update' : 'Create' }}
      </button>
      <router-link to="/" class="btn btn-secondary ml-2">
        <i class="fas fa-arrow-left"></i> Back
      </router-link>
    </form>
  </div>
</template>

<script>
import influxdb from '../api/influxdb';

export default {
  props: {
    bucketId: {
      type: String,
      default: null
    }
  },
  data() {
    return {
      form: {
        name: '',
        description: '',
        status: 'active'
      },
      isEdit: false
    };
  },
  created() {
    if (this.bucketId) {
      this.isEdit = true;
      this.fetchBucket();
    }
  },
  methods: {
    fetchBucket() {
      influxdb.getBucket(this.bucketId).then(response => {
        this.form = response.data;
      });
    },
    submitForm() {
      if (this.isEdit) {
        influxdb.updateBucket(this.bucketId, this.form).then(() => {
          alert('Bucket updated successfully');
          this.$router.push('/');
        });
      } else {
        influxdb.createBucket(this.form).then(() => {
          alert('Bucket created successfully');
          this.$router.push('/');
        });
      }
    }
  }
};
</script>

<style scoped>
.card {
  max-width: 600px;
  margin: 0 auto;
}
.form-group {
  margin-bottom: 1.5rem;
}
</style>