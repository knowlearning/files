<template>
  <button @click="uploadNew">Upload New</button>
  <div id="card-container">
    <div
      class="card"
      v-for="{ downloadUrl, type }, id in data.files"
      draggable="true"
      @dragstart="setDragData($event, id)"
    >
      <img
        v-if="type && type.startsWith('image')"
        draggable="false"
        :src="downloadUrl"
      />

      <video controls v-else-if="type && type.startsWith('video')">
        <source :src="downloadUrl" :type="type">
          Your browser does not support the video element.
      </video>

      <audio controls   v-else-if="type && type.startsWith('audio')">
        <source :src="downloadUrl" :type="type">
        Your browser does not support the audio element.
      </audio>

      <div
        class="card-remove-button"
        @click="removeFile(id)"
      >
        &#x274C;
      </div>
      <div
        class="card-copy-button"
        @click="copyToClipboard(id)"
      >
        &#x2398;
      </div>
    </div>
  </div>
</template>

<script setup>
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
        data.files[id] = { downloadUrl: null, type: null }
        data.files[id].downloadUrl = await Agent.download(id).url()
        data.files[id].type = (await Agent.metadata(id)).active_type
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
function copyToClipboard(text) {
    const textarea = document.createElement('textarea');
    textarea.value = text;
    document.body.appendChild(textarea);
    textarea.select();
    document.execCommand('copy');
    document.body.removeChild(textarea);
}

</script>



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
  .card-remove-button,
  .card-copy-button
  {
    opacity: 0.1;
    position: absolute;
    bottom: 4px;
    cursor: pointer;
    animation: 300ms ;
  }
  .card-remove-button {
    right: 8px;
  }
  .card-copy-button {
    right: 32px;
    bottom: -2px;
    font-size: 2rem;
  }
  .card-remove-button:hover,
  .card-copy-button:hover
  {
    opacity: 1;
  }
  video {
    width: 160px;
    height: 120px;
  }
</style>
