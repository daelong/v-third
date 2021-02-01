<template>
    <div>
        <table>
            <thead>
                <th></th>
               <th
                  v-for="col in state.columns"
                  :key="col.key"
                  class="column"
                  :class="state.sortBy === col.key ? state.orderBy : null"
                  @click="onSortData(col.key)"
                >
                  {{ col.text }}
                </th>
                <button @click="state.addVisible = !state.addVisible">add</button>
            </thead>
             <tbody>
            <tr
              v-for="item in state.indexedItem"
              :key="item.id"
              class="row"
              @click="onModalItem(item)"
            >
              <td>{{ item.index + 1 }}</td>
              <td>{{ item.name }}</td>
              <td>{{ item.brewery_type }}</td>
              <td>{{ item.country }}</td>
              <td><a href="">{{ item.website_url }}</a></td>
            </tr>
          </tbody>
        </table>
        <exam-6-modal v-if="state.visible" :item="state.selectedItem"  :visible="state.visible" @changeVisible="offModalItem"/>
        <exam-6-input v-if="state.addVisible" :visible="state.addVisible" @submit="addItem" @close="closeInput"/>
    </div>
</template>

<script>
import API from '@/assets/scripts/api';
import { reactive, onMounted, computed } from 'vue';
import Exam6Modal from './Exam6Modal.vue';
import Exam6Input from './Exam6Input.vue';

export default {
    name:"Exam6",
    components:{
        Exam6Modal,
        Exam6Input,
    },
   setup(){
       const state = reactive({
           items: [],
           columns: [
              {
                key: 'name',
                text: 'Name',
              },
              {
                key: 'brewery_type',
                text: 'Type',
              },
              {
                key: 'country',
                text: 'Country',
              },
              {
                key: 'website_url',
                text: 'Site',
              },
           ],
           selectedItem: {},
           visible: false,
           addVisible: false,
           sortBy: null,
           orderBy: null,
           sortData: computed(() => state.items.slice().sort((a, b) => {
                if( state.sortBy && state.orderBy ){
                    let nameA = a[state.sortBy];
                    let nameB = b[state.sortBy];
                    if(state.orderBy === 'up'){
                        if (nameA < nameB) {
                        return -1;
                        }
                        if (nameA > nameB) {
                          return 1;
                        }            
                        return 0;
                    }else if(state.orderBy === 'down'){
                        if (nameA < nameB) {
                        return 1;
                        }
                        if (nameA > nameB) {
                          return -1;
                        }            
                        return 0;
                    }
                    }else{
                        return 0;
                    }
            })),
          indexedItem: computed(() => state.sortData.map((item, index) => ({ ...item, index }))),
       })

       onMounted(() => {
           fetchData();
       })
       let res = null;
       const fetchData = async () => {
           try{
            res = await API.fetchBreweries();
            state.items = res.data.map( data => {
                return {
                  ...data,
                  visible: true
                  }
                })
            }catch(error){
                console.log(error);
            }
       }

       const onModalItem = (item) => {
            state.selectedItem = item;
            state.visible = !state.visible;
       }
       const offModalItem = (modalVisible) => {
           state.visible = modalVisible;
       }
        const onAddInput = () => {
            state.addVisible = !state.addVisible;
        }
        const addItem = (item, addVisible) => {
          state.addVisible = addVisible;
          state.items.push(item);
        }
        const closeInput = (addVisible) => {
          state.addVisible = addVisible;
        }
        const onSortData = (key) => {
        if(state.sortBy !== key){
          state.sortBy = key;
          state.orderBy = 'up';
        }else if(state.orderBy === 'up'){
            state.orderBy = 'down';
          }else if(state.orderBy === 'down'){
            state.orderBy = null;
            state.sortBy = null;
          }
        }

       return{
           state,
           onModalItem,
           offModalItem,
           onAddInput,
           addItem,
           onSortData,
           closeInput
       }
   }
}
</script>

<style scoped>
table{
    width: 100%;
}
.row {
    cursor: pointer;
    border: solid 0;
  }

  .row.odd {
    background: #c7ecee;
  }

  .row td {
    border: 0;
    padding: 8px;
  }

  .row:hover {
    background: #c7ecee;
  }
  .up:after{
        content:" \2191";
    }
  .down:after{
      content:" \2193";
  }
</style>