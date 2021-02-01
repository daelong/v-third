<template>
    <div name="Exam1">
        <ul class="list-unstyled">
          <li v-for="item in state.items" :key="item.id">
            <div class="item-container">
              <div class="title">
                <span class="name">
                  {{ item.name }}
                </span>
                <button class="close-btn" @click="item.visible = !item.visible">x</button>
              </div>
              <div class="info">
                <div class="type info-item">{{ item.brewery_type }} Brewery</div>
                <div class="info-item">{{ item.country }}</div>
                <div class="info-item">{{ item.website_url }}</div>
              </div>
            </div>
          </li>
        </ul>
    </div>
</template>

<script>
import API from '@/assets/scripts/api';
import { onMounted, reactive, computed } from 'vue'

export default {
    name: "Exam1",
    components: {   
    },
    setup(){
        const state = reactive({
         datalist: [],
         items: computed(() => state.datalist.filter((item) => item.visible))
        })

        let response = [];
        onMounted(() => {
            fetchData();
        })
        const fetchData = async () => {
            try{
            response = await API.fetchBreweries();
            state.datalist = response.data.map((data) =>{
                   return {
                       ...data,
                       visible: true,
                   }
                }
              );
            }catch(error){
                console.log(error);
            }
        }

        return {
          state,
        }
    }
}
</script>

<style scoped>
 .list-unstyled {
    list-style: none;
    margin-left: 0;
    padding-left: 0;
  }

  .item-container {
    float: left;
    margin: 16px;
    padding: 16px;
    min-width: 320px;
    min-height: 120px;
    border-radius: 4px;
    border: 1px solid black;
  }

  .title {
    display: flex;
    justify-content: space-between;
    margin-bottom: 16px;
  }

  .name {
    font-weight: bold;
    align-self: center;
  }

  .close-btn {
    cursor: pointer;
  }

  .type {
    text-transform: capitalize;
  }

  .info-item {
    padding: 4px;
  }

  .btn-container {
    width: 100%;
    text-align: end;
  }
</style>