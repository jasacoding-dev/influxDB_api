import { createRouter, createWebHistory } from 'vue-router';
import BucketList from '@/components/BucketList.vue';
import AddBucket from '@/components/AddBucket.vue';
import EditBucket from '@/components/EditBucket.vue';

// Buat router instance
const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'BucketList',
      component: BucketList
    },
    {
      path: '/add-bucket',
      name: 'AddBucket',
      component: AddBucket
    },
    {
      path: '/edit-bucket/:id',
      name: 'EditBucket',
      component: EditBucket,
      props: true
    }
  ]
});

export default router;