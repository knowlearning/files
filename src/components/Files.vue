<template>
    <button @click="upload">Upload</button>
    <div id="card-container">
        <div v-for="info, id in data.files" class="card-outer">
            <span>{{ info.name }}</span>
            <Card
                :info="info"
                :id="id"
                @remove="removeFile"
            />
        </div>
    </div>
</template>

<script setup>
import Card from './Card.vue'
import { reactive } from 'vue'
import validate from '../helpers/validateUpload.js'

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

async function upload() {
    const id = await Agent.upload({ browser: true, validate })
    if (!id) alert('file not uploaded, likely too large')
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
.card-outer {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    margin: 12px;
}
.card-outer span {
    font-size: 0.8rem;
    margin-bottom: 2px;
}
</style>
