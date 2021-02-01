<template>
  <div class="item-container" @click="state.folded = !steate.folded">
    <div class="title">
      <span class="name">
        {{ item.name }}
      </span>
      <div
        class="fold-btn"
        :class="{
          folded: state.folded,
        }"
      >
        <svg
          class="svg"
          xmlns="http://www.w3.org/2000/svg"
          width="20"
          height="20"
          viewBox="0 0 20 20"
        >
          <path
            class="path animated"
            fill="#777"
            stroke="none"
            stroke-width="0"
          />
        </svg>
      </div>
    </div>
    <div
      class="content"
      :class="{
        folded: state.folded,
      }"
    >
      <div class="type content-item">{{ item.brewery_type }} Brewery</div>
      <div class="content-item">{{ item.country }}</div>
      <div class="content-item">{{ item.website_url }}</div>
    </div>
  </div>
</template>

<script>
import { reactive } from 'vue';
export default {
    name: "Exam2Item",
    props:{
        item: {},

    },
    setup(){
        const state = reactive({
            folded: false,
        })

        return{
            state
        }
    }
}
</script>

<style scoped>
 .item-container {
    align-self: center;
    cursor: pointer;
    margin: 16px;
    padding: 16px;
    min-width: 320px;
    border-radius: 4px;
    border: 1px solid black;
  }

  .title {
    display: flex;
    justify-content: space-between;
  }

  .name {
    font-weight: bold;
    align-self: center;
  }

  .fold-btn {
    margin-left: 16px;
    transform: rotateX(0);
    transition: all 0.4s ease;
  }

  .fold-btn.folded {
    transform: rotateX(180deg);
  }

  .content {
    margin-top: 16px;
    overflow: hidden;
  }

  .content.folded {
    max-height: 0;
  }

  .type {
    text-transform: capitalize;
  }

  .content-item {
    padding: 4px;
  }
</style>