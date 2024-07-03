<template>
    <button @click="upload">Upload</button>
    <div id="card-container">
        <div v-for="info, id in data.files" class="card-outer">
            <span @click="updateName(id)">{{ info.name }}</span>
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
        data.uploadedFiles = state // ref to sync uuids to KL run-state
    })

async function upload() {
    const id = await Agent.upload({ browser: true, validate })
    if (!id) alert('file not uploaded, likely too large')
    if (id) {
        data.uploadedFiles[id] = {} // add uuid to KL run-state
        const url = await Agent.download(id).url()
        const { active_type, name } = await Agent.metadata(id)
        data.files[id] = { url, name, type: active_type }

    }
    else console.log('No file selected....')
}

async function updateName(id) {
    const newName = prompt('Enter New Name')?.trim()
    if (newName) {
        const x = await Agent.metadata(id)
        x.name = newName
        data.files[id].name = newName
    }
}

function removeFile(id) {
    delete data.files[id] // remove local
    delete data.uploadedFiles[id] // remove from KL run-state
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
    cursor: pointer;
}
.card-outer span:hover {
    color: blue;
}
</style>
