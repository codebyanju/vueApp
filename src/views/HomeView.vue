<script setup>
import { ref, computed, onMounted } from 'vue'
import commonApi from '@/api/commonApi'

const posts = ref([])
const currentPage = ref(1) 
const itemsPerPage = ref(10)

const paginatedPosts = computed(() => {
  const startIndex = Math.max(0, (currentPage.value - 1) * itemsPerPage.value)
  const endIndex = Math.min(posts.value.length, startIndex + itemsPerPage.value)
  return posts.value.slice(startIndex, endIndex)
})

const totalPages = computed(() => {
  return Math.ceil(posts.value.length / itemsPerPage.value)
})

const getPostsData = async () => {
  try {
    const response = await commonApi.getPosts()
    posts.value = response
  } catch (error) {
    console.error('Error fetching posts:', error)
  }
}

const goToPreviousPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const goToNextPage = () => {
  if (currentPage.value < totalPages.value) {
    currentPage.value++
  }
}

onMounted(async () => {
  await getPostsData()
})
</script>

<template>
  <main>
    <h1>Posts (Client-Side Pagination)</h1>
    <table>
      <thead>
        <tr>
          <th>Id</th>
          <th>Message</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="post in paginatedPosts" :key="post.id">
          <td>{{ post.id }}</td>
          <td>{{ post.title }}</td> </tr>
      </tbody>
    </table>
    <div v-if="totalPages > 1">
      <button name="left" type="button" disabled:left="[currentPage.value === 1]" @click="goToPreviousPage">left</button>
      <button name="pageNo" type="button">Page {{ currentPage.value }} of {{ totalPages.value }}</button>
      <button name="right" type="button" disabled:right="[currentPage.value === totalPages.value]" @click="goToNextPage">
        right
      </button>
    </div>
  </main>
</template>

<style scoped>
table {
  border-collapse: collapse;
}
td,
th {
  border: 1px solid black;
  padding: 10px 20px;
}
</style>