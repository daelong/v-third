<template>
    <div name="Exam6Modal" class="modal-back" v-if="state.visible">
        <div class="modal">
            <div class="modal-top">
                <div>name : {{state.item.name}}</div>
                <button @click="changeVisible()">x</button>
            </div>
            <div class="modal-body">
                <div>brewery_type: {{state.item.brewery_type}}</div>
                <div>country: {{state.item.country}}</div>
                <div>state: {{state.item.state}}</div>
                <div>city: {{state.item.city}}</div>
                <div>phone: {{state.item.phone}}</div>
                <div>website_url: <a href="">{{state.item.website_url}}</a></div>
            </div>
        </div>
    </div>
</template>

<script>
import country from '@/assets/scripts/country';
import { onMounted, reactive } from 'vue';

export default {
    name:"Exam6Modal",
    props:{
        item: {},
        visible: Boolean,
    },
    setup(props, {emit}){
        const state = reactive({
            countrys: country,
            item: {},
            visible: Boolean,
        })
        onMounted(() => {
            state.item = props.item;
            state.visible = props.visible;
        })
        const changeVisible = () => {
            state.visible = !state.visible;
            emit('changeVisible', state.visible);
        }
        return{
            state,
            changeVisible
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
    padding-bottom: 5px;
    display:flex;
    flex-direction: row;
    justify-content: space-between;
    border-bottom: 1px solid black;
}
</style>