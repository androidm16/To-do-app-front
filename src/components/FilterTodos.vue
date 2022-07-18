<template>
<div>
    Filter Todos:
    <select @change="filterTodo($event)">
    <option value="50">50</option>
    <option value="40">40</option>
    <option value="30">30</option>
    <option value="20">20</option>
    <option value="10">10</option>
    <option value="5">5</option>
    </select>
</div>
</template>
<script>
import { mapActions } from 'vuex';
export default {
    name: "FilterTodos",
    methods: mapActions(["filterTodo"])
}
</script>
<style scoped>
select {
  margin-top: 20px;
  padding: 6px;
  border: #5C2961 1px solid;
}
</style>