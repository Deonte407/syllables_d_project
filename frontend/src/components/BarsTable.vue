<template>
  <div >
    <div class="bg-dark header">
      MC Dictionary
    </div>
    <div class="container" style="margin-top: 1rem">
      <div class="input-group">
        <div class="input-group-prepend">
          <button @click="addLyric" class="btn btn-outline-secondary">Add Lyrics</button>
        </div>
        <textarea class="form-control" rows="4" v-model="lyric" aria-label="With textarea"></textarea>
      </div>

      <v-client-table :data="tableData" :columns="columns" />
    </div>
  </div>
</template>

<script>

function lookupEnding (txt) {
}

export default {
  data () {
    return {
      lyric: '',
      columns: ['text', 'ending'],
      tableData: [
        { text: 'Hi', ending: '2' }
      ]
    }
  },

  methods: {
    async addLyric () {
      this.tableData.push({
        text: this.lyric,
        ending: await lookupEnding(this.lyric)
      })

      this.lyric = ''
    }
  }
}
</script>

<style>
.header {
  font-size: 22pt;
  padding: 1rem;
  text-align: left;
  font-family: Arial;
  font-weight: bold;
  font-style: italic;
}
</style>
