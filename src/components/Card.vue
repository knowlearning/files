<template>
    <div
        class="card"
        draggable="true"
        @dragstart="setDragData($event, props.id)"
    >
        <img
            v-if="info.type && info.type.startsWith('image')"
            draggable="false"
            :src="info.url"
        />

        <video controls v-else-if="info.type && info.type.startsWith('video')">
            <source :src="info.url" :type="info.type">
                Your browser does not support the video element.
        </video>

        <audio controls   v-else-if="info.type && info.type.startsWith('audio')">
            <source :src="info.url" :type="info.type">
            Your browser does not support the audio element.
        </audio>

        <div
            class="card-remove-button"
            @click="emits('remove',id)"
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
</template>

<script setup>
import { reactive } from 'vue'
const emits = defineEmits(['remove'])
const props = defineProps(['id', 'info'])
const info = reactive(props.info)

function setDragData(event, id) {
    event.dataTransfer.setData('text/plain', id)
    event.dataTransfer.setData('text/uri-list', id)
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
.card {
    position: relative;
    background: #f9f9f9;
    width: 200px;
    height: 150px;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    border-radius: 4px;
    box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
}
.card:hover {
    cursor: grab;
}
.card>img {
    max-width: 90%;
    max-height: 90%;
}
.card-remove-button,
.card-copy-button {
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
.card-copy-button:hover {
    opacity: 1;
}
video {
    width: 200px;
    height: 150px;
}
audio {
    width: 200px;
}
</style>