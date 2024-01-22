<script setup>
import { ref, reactive } from 'vue'

defineProps({
  msg: String,
})

const data = reactive({
  files: {}
})

Agent
  .state('uploaded-files')
  .then(state => {
    Object
      .keys(state)
      .forEach(async id => {
        data.files[id] = { downloadUrl: null }
        data.files[id].downloadUrl = await Agent.download(id).url()
      })
    data.uploadedFiles = state
  })

async function uploadNew() {
  const id = await Agent.upload({ browser: true })

  if (id) {
    data.uploadedFiles[id] = {}
    data.files[id] = { downloadUrl: null }
    data.files[id].downloadUrl = await Agent.download(id).url()
  }
  else console.log('No file selected....')
}

function setDragData(event, id) {
  event.dataTransfer.setData('text/plain', id)
  event.dataTransfer.setData('text/uri-list', id)
}

function removeFile(id) {
  delete data.files[id]
  delete data.uploadedFiles[id]
}

const count = ref(0)
</script>

<template>
  <button @click="uploadNew">Upload New</button>
  <div id="card-container">
    <div
      class="card"
      v-for="{ downloadUrl }, id in data.files"
      draggable="true"
      @dragstart="setDragData($event, id)"
    >
      <img
        draggable="false"
        :src="downloadUrl"
      />
      <div
        class="card-remove-button"
        @click="removeFile(id)"
      >
        &#x274C;
      </div>
    </div>
  </div>
</template>

<style scoped>
  #card-container
  {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
  }
  .card
  {
    position: relative;
    background: #f9f9f9;
    width: 200px;
    height: 120px;
    margin: 16px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  }
  .card:hover
  {
    cursor: grab;
  }
  .card>img
  {
    max-width: 90%;
    max-height: 90%;
  }
  .card-remove-button
  {
    opacity: 0.1;
    position: absolute;
    bottom: 4px;
    right: 8px;
    cursor: pointer;
    animation: 300ms ;
  }
  .card-remove-button:hover
  {
    opacity: 1;
  }
</style>
