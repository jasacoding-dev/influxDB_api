<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Add New Bucket</h1>
    <div class="card shadow-sm mx-auto" style="max-width: 600px;">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">Bucket Details</h5>
      </div>
      <div class="card-body">
        <form @submit.prevent="submitForm">
          <div class="mb-3">
            <label for="name" class="form-label">Name:</label>
            <input type="text" id="name" v-model="form.name" class="form-control" required>
          </div>
          <div class="mb-3">
            <label for="description" class="form-label">Description:</label>
            <textarea id="description" v-model="form.description" class="form-control" rows="3"></textarea>
          </div>
          <div class="d-grid gap-2">
            <button type="submit" class="btn btn-primary">
              <i class="fas fa-save"></i> Create Bucket
            </button>
            <router-link to="/" class="btn btn-secondary">
              <i class="fas fa-times"></i> Cancel
            </router-link>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>
import influxdb from '../api/influxdb';
import Swal from 'sweetalert2'; // Impor SweetAlert2

export default {
  data() {
    return {
      form: {
        name: '',
        description: '',
      }
    };
  },
  methods: {
    submitForm() {
      influxdb.createBucket(this.form)
        .then(() => {
          // Notifikasi sukses
          Swal.fire({
            icon: 'success',
            title: 'Success!',
            text: 'Bucket created successfully.',
            confirmButtonText: 'OK'
          }).then(() => {
            this.$router.push('/'); // Redirect ke halaman utama
          });
        })
        .catch(error => {
          console.error('Error creating bucket:', error);
          // Notifikasi error
          Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Failed to create bucket. Please try again.',
            confirmButtonText: 'OK'
          });
        });
    }
  }
};
</script>

<style scoped>
.card {
  border: none;
  border-radius: 10px;
  overflow: hidden;
}

.card-header {
  border-radius: 10px 10px 0 0;
}

.form-label {
  font-weight: 500;
}

.form-control, .form-select {
  border-radius: 5px;
}

.btn {
  border-radius: 5px;
}

.d-grid {
  display: grid;
  gap: 10px;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>