<template>
  <ul>
    <li
      v-for="item in 5"
      :key="item"
      @click="
        $router.push({
          name: 'test-page-detail',
          params: {
            id: item
          }
        })
      "
    >
      {{ item }}
    </li>
  </ul>
</template>

<script lang="ts"></script>

<style lang="scss"></style>
