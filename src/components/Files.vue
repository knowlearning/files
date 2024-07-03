<template>
    <button @click="uploadNew">Upload New</button>
    <div id="card-container">
        <Card
            v-for="info, id in data.files"
            :info="info"
            :id="id"
            @remove="removeFile"
        />
    </div>
</template>

<script setup>
import Card from './Card.vue'
import { reactive } from 'vue'

const data = reactive({
    files: {}
})

Agent
    .state('uploaded-files')
    .then(state => {
        Object
            .keys(state)
            .forEach(async id => {
                const url = await Agent.download(id).url()
                const { active_type, name } = await Agent.metadata(id)
                data.files[id] = { url, name, type: active_type}
            })
    })

async function uploadNew() {
    const id = await Agent.upload({ browser: true })
    if (id) {
        const url = await Agent.download(id).url()
        const { active_type, name } = await Agent.metadata(id)
        data.files[id] = { url, name, type: active_type}
    }
    else console.log('No file selected....')
}

function removeFile(id) {
    delete data.files[id]
}

</script>

<style scoped>
#card-container
{
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
}
</style>
