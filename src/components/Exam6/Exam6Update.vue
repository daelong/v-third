<template>
    <div name="Exam6Update" class="modal-back" v-if="state.visible">
        <div class="modal">
            <div class="modal-top">
                <div><input type="text" v-model="state.updatedItem.name"></div>
                <button @click="close()">x</button>
            </div>
            <div class="modal-body">
                <div class="modal-body-box"><div class="modal-body-update">brewery_type: </div>
                    <select name="" id="" v-model="state.updatedItem.brewery_type">
                        <option v-for="option in state.typeOptions" :key="option" :value="option" >{{option}}</option>
                    </select>
                </div>
                <div class="modal-body-box">
                    <div class="modal-body-update">country: </div>
                     <select name="" id="" v-model="state.updatedItem.country">
                        <option v-for="option in state.countryOptions" :key="option" :value="option" >{{option}}</option>
                    </select>
                </div>
                <div class="modal-body-box"><div class="modal-body-update">state: </div><input type="text" v-model="state.updatedItem.state"></div>
                <div class="modal-body-box"><div class="modal-body-update">city: </div><input type="text" v-model="state.updatedItem.city"></div>
                <div class="modal-body-box"><div class="modal-body-update">phone: </div><input type="text" v-model="state.updatedItem.phone"></div>
                <div class="modal-body-box"><div class="modal-body-update">website_url: </div><input type="text" v-model="state.updatedItem.website_url"></div>
                <div class="btn"><button @click="submit()">complete</button></div>
            </div>
        </div>
    </div>
</template>

<script>
import country from '@/assets/scripts/country';
import { onMounted, reactive, computed } from 'vue';

export default {
    name:"Exam6Update",
    props:{
        item: {},
        visible: Boolean,
        index: Number,
    },
    setup(props, {emit}){
        const state = reactive({
            item: {},
            updatedItem: {},
            visible: Boolean,
            index: 0,
            typeOptions: [
                      'micro',
                      'contract',
                      'brewpub',
                      'regional',
                      'planning',
                      'proprietor',
            ],
            countries: computed(() => country.map(country => country.name)),
            countryOptions: computed(() => state.countries),

        })
        onMounted(() => {
            state.item = props.item;
            state.index = props.index;
            state.updatedItem = { ...state.item};
            state.visible = props.visible;
        })
        const changeVisible = () => {
            state.visible = !state.visible;
            emit('close', state.visible);
        }
        const submit = () => {
            if(state.updatedItem.name && state.updatedItem.brewery_type ){
                state.visible = !state.visible;
                emit('submit', state.updatedItem, state.index, state.visible);
            }else{
                alert('name, brewery_type을 꼭 입력하세요');
            }
        }
        const close = () => {
            state.visible = !state.visible;
            emit('close', state.visible);
        }
        return{
            state,
            changeVisible,
            submit,
            close
        }
    }
}
</script>

<style scoped>
.modal-back{
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
    bottom: 0;
    z-index: 30;
    background: rgba(0, 0, 0, 0.25);
    display: flex;
    justify-content: center;
    align-items: center;
}
.modal{
    position: fixed;
    padding-top: 30px;
    width: 50%;
    height: 40%;
    background: white;
    display: flex;
    flex-direction:column;
}
.modal-top{
    padding: 0 10px 5px 20px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid black;
}
.modal-body{
    padding: 20px 0 0 20px;
    display: flex;
    flex-direction: column;
}
.modal-body .modal-body-box {
    padding-top: 10px;
    display: flex;
    flex-direction: row;
}
.modal-body .modal-body-box .modal-body-update{
    width: 20%;
}
.btn{
    width: 70%;
    display: flex;
    justify-content: flex-end;
}
</style>