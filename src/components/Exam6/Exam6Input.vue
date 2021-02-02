<template>
     <div name="Exam6Input" class="modal-back" v-if="state.visible">
        <div class="modal">
            <div class="modal-top">
                <button @click="changeVisible()">x</button>
            </div>
            <div class="modal-body" v-for="input in state.inputList" :key="input.name">
                <div class="modal-body-name">{{input.name}}:</div>
                <div>
                    <input v-if="input.type === 'text'" type="text" v-model="state.formValues[input.name]">
                    <select v-else name="" id="" v-model="state.formValues[input.name]">
                        <option v-for="option in input.options" :key="option" :value="option" >{{option}}</option>
                    </select>
                </div>
            </div>
            <div class="btn">
                <button @click="submit()">complete</button>
            </div>
        </div>
    </div>
</template>

<script>
import country from '@/assets/scripts/country';
import { onMounted, reactive, computed } from 'vue';
export default {
    name:"Exam6Input",
    props:{
        visible: Boolean,
    },
    setup(props, { emit }){
        const state = reactive({
            visible: Boolean,
            countries: computed(() => country.map(country => country.name)),
            inputList: [
                {
                    name: 'name',
                    type: 'text'
                },
                {
                    name: 'brewery_type',
                    type: 'select',
                    options: [
                        'micro',
                        'contract',
                        'brewpub',
                        'regional',
                        'planning',
                        'proprietor',
                    ]
                },
                {
                    name: 'country',
                    type: 'select',
                    options: computed(() => state.countries),
                },
                {
                    name: 'state',
                    type: 'text',
                },
                {
                    name: 'city',
                    type: 'text',
                },
                {
                    name: 'phone',
                    type: 'text',
                },
                {
                    name: 'website_url',
                    type: 'text',
                }
            ],
            formValues: {
                name: null,
                brewery_type: null,
                country: null,
                state: null,
                city: null,
                phone: null,
                website_ur: null,
            },
        })
        onMounted(() => {
            state.visible = props.visible;
        })
        const changeVisible = () => {
            state.visible = !state.visible;
            emit('close', state.visible);
        }
        const submit = () => {
            if(state.formValues.name && state.formValues.brewery_type ){
                state.visible = !state.visible;
                emit('submit', state.formValues, state.visible);
            }else{
                alert('name, brewery_type을 꼭 입력하세요');
            }
        }
        return{
            state,
            submit,
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
    padding-top: 20px;
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
.modal-body{
    display: flex;
    flex-direction: row;
    padding-top: 10px;
}
.modal-body-name{
    padding-left: 20px;
    width: 20%;
}
.modal-top{
    display: flex;
    justify-content: flex-end;
}
.modal-top button{
    margin-right: 10px;
}
.btn{
    width: 70%;
    display: flex;
    justify-content: flex-end;
}
</style>