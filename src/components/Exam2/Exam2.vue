<template>
    <Exam2Item  v-for="item in state.items" :item="item" :key="item.id" />
</template>

<script>
import API from '@/assets/scripts/api';
import Exam2Item from './Exam2Item';
import { onMounted, onUnmounted, reactive } from 'vue';

export default {
    components:{
        Exam2Item
    },
    setup(){
        const state = reactive({
            loading: false,
            page: 1,
            items: [],
        })
        
        onMounted(() => {
            window.addEventListener('scroll', state.onScroll);
            fetchData(1);
        })
        onUnmounted(() => {
            window.removeEventListener('scroll', state.onScroll);
        })      

        const fetchData = async (page) => {
          try {
            if (!state.loading) {
              state.loading = true;
              state.response = await API.fetchBreweries(page);
              state.page = page;
              state.items = [...state.items, ...state.response.data];
            }
          } catch (error) {
            console.log(error);
          } finally {
            state.loading = false;
          }
        };

        const onScroll= () => {
            const docEl = document.documentElement;
            const top = docEl.scrollTop;
            const scrollHeight = docEl.scrollHeight;
            const clientHeight = docEl.clientHeight;
            console.log(top, scrollHeight, scrollHeight - top, clientHeight);

            if (scrollHeight - top === clientHeight) {
              console.log('fetch');
              // scrolled to bottom
                fetchData(state.page + 1);
            }
        }
      return {
          state,
          onScroll,
      }
    },

}
</script>

<style scoped>
.exam2 {
    display: flex;
    flex-direction: column;
    overflow: auto;
  }
</style>