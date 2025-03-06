<template>
  <div class="container mt-5">
    <h1 class="mb-4 text-center">Bucket List</h1>
    <div class="card shadow-sm">
      <div class="card-header bg-primary text-white">
        <h5 class="card-title mb-0">Buckets</h5>
      </div>
      <div class="card-body">
        <div class="table-responsive">
          <table class="table table-hover">
            <thead>
              <tr>
                <th scope="col">ID</th>
                <th scope="col">Name</th>
                <th scope="col">Description</th>
                <th scope="col">Actions</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="bucket in buckets" :key="bucket.id">
                <td>{{ bucket.id }}</td>
                <td>{{ bucket.name }}</td>
                <td>{{ bucket.description }}</td>
                <td>
                  <button class="btn btn-sm btn-primary me-2" @click="editBucket(bucket.id)">
                    <i class="fas fa-edit"></i> Edit
                  </button>
                  <button class="btn btn-sm btn-danger" @click="deleteBucket(bucket.id)">
                    <i class="fas fa-trash"></i> Delete
                  </button>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <router-link to="/add-bucket" class="btn btn-success mt-3">
          <i class="fas fa-plus"></i> Add New Bucket
        </router-link>
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
      this.$router.push({ name: 'EditBucket', params: { id } });
    },
    deleteBucket(id) {
      Swal.fire({
        title: 'Are you sure?',
        text: 'You won\'t be able to revert this!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Yes, delete it!'
      }).then((result) => {
        if (result.isConfirmed) {
          influxdb.deleteBucket(id)
            .then(() => {
              Swal.fire({
                icon: 'success',
                title: 'Deleted!',
                text: 'Bucket has been deleted.',
                confirmButtonText: 'OK'
              });
              this.fetchBuckets();
            })
            .catch(error => {
              console.error('Error deleting bucket:', error);
              Swal.fire({
                icon: 'error',
                title: 'Oops...',
                text: 'Failed to delete bucket. Please try again.',
                confirmButtonText: 'OK'
              });
            });
        }
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

.table th, .table td {
  vertical-align: middle;
}

.table-hover tbody tr:hover {
  background-color: rgba(0, 123, 255, 0.05);
}

.btn-sm {
  padding: 0.25rem 0.5rem;
  font-size: 0.875rem;
}

.badge {
  font-size: 0.875rem;
  padding: 0.5rem 0.75rem;
  border-radius: 0.375rem;
}

.bg-success {
  background-color: #28a745 !important;
}

.bg-danger {
  background-color: #dc3545 !important;
}

.text-center {
  text-align: center;
}

.shadow-sm {
  box-shadow: 0 0.125rem 0.25rem rgba(0, 0, 0, 0.075);
}
</style>