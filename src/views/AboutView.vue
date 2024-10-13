<template>
  <main>
    <h1>Posts (Server-Side Pagination)</h1>

    <!-- Loading Indicator -->
    <div v-if="isLoading">Loading posts...</div>

    <!-- Posts Table -->
    <table v-else>
      <thead>
        <tr>
          <th>Id</th>
          <th>Title</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in posts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td>
        </tr>
      </tbody>
    </table>

    <!-- Pagination Controls -->
    <div v-if="totalPages > 1" class="pagination">
      <button @click="goToPreviousPage" :disabled="currentPage === 1">Previous</button>
      <span>Page {{ currentPage }} of {{ totalPages }}</span>
      <button @click="goToNextPage" :disabled="currentPage === totalPages">Next</button>
    </div>
  </main>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import commonApi from '@/api/commonApi'

const posts = ref([])
const currentPage = ref(1)
const itemsPerPage = ref(10)  
const totalPosts = ref(0)
const isLoading = ref(false)

const totalPages = computed(() => Math.ceil(totalPosts.value / itemsPerPage.value))

const getPaginatedPostsData = async () => {
  isLoading.value = true
  try {
    const response = await commonApi.getMyPosts(currentPage.value, itemsPerPage.value)
    posts.value = response.posts  // Assign fetched posts to the posts array
    totalPosts.value = response.totalPosts  // Set total number of posts
  } catch (error) {
    console.error('Error fetching paginated posts:', error)
  } finally {
    isLoading.value = false
  }
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
    getPaginatedPostsData()
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
    getPaginatedPostsData()
  }
}

onMounted(() => {
  getPaginatedPostsData()
})
</script>

<style scoped>
table {
  border-collapse: collapse;
  width: 100%;
}
th, td {
  border: 1px solid black;
  padding: 10px;
}
.pagination {
  margin-top: 20px;
  display: flex;
  justify-content: center;
  align-items: center;
}
button {
  margin: 0 10px;
  padding: 5px 10px;
}
</style>
