<template>
  <div>
    <PaginatedListView :articles="articles" :pageSize="pageSize" :currentUser="currentUser" />
  </div>
</template>

<script>
import PaginatedListView from '@/components/PaginatedListView.vue'

export default {
  name: 'ListView',
  components: {
    PaginatedListView
  },
  props: {
    articles: Array,
    pageSize: Number,
    currentUser: Object,
  },
}
</script>

<style>

</style>