<template>
  <div class="enter-access-code">
    <img src="/mascotte.png" />
    <span>Access Code</span>
    <input
      placeholder="- - - - -"
      v-model="accessCode"
      @keypress.enter="submitAccessCode"
    />
    <button
      @click="submitAccessCode"
    >Submit</button>
  </div>
</template>

<script>
export default {
  data: () => ({
      accessCode: ''
  }),
  methods: {
    submitAccessCode() {
      const CODE_LIST = [ 'ACCESS' ]
      if (CODE_LIST.includes(this.accessCode)) {
        this.$emit('access')
      }
      else alert( 'invalid access code' )
    }
  }
}
</script>

<style scoped>
.enter-access-code {
  display: flex;
  flex-direction: column;
  align-items: center;
  max-width: 600px;
  margin: auto;
  position: relative;
  padding-top: 32px;
}
input {
  border: 1px solid black;
  padding: 8px;
  font-size: 1.25em;
  text-align: center;
  border-radius: 16px;
  margin: 16px;
}
img {
  width: 128px;
  margin-bottom: 32px;
}
</style>
