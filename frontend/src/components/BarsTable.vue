<template>
  <div >
    <div class="bg-dark header">
      MC Dictionary
    </div>
    <div class="container" style="margin-top: 1rem">
      <div class="input-group">
        <textarea class="form-control" rows="4" v-model="lyric" aria-label="With textarea"></textarea>
      </div>

      <div class="btn-group" role="group" aria-label="Basic example" style="margin-top: 1rem">
        <button type="button" data-toggle="button" class="btn btn-secondary">Multiline</button>
        <button @click="addLyric" class="btn btn-outline-secondary">Add Lyrics</button>
      </div>

      <v-client-table :data="tableData" :columns="columns">
        <button @click="removeBar(props.index)" slot="erase" slot-scope="props" class="btn btn-danger">Erase</button>
      </v-client-table>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

const api = axios.create({baseURL: 'http://localhost:5000'})
const lookupApiUrl = '/lookup/'

export default {
  data () {
    let tableData

    if (localStorage.tableData) {
      tableData = JSON.parse(localStorage.tableData)
    } else {
      tableData = []
    }

    return {
      lyric: '',
      columns: ['text', 'ending', 'erase'],
      tableData
    }
  },

  methods: {
    async addLyric () {
      let ending = await this.lookupEnding(this.lyric)

      console.log(ending)
      this.tableData.push({
        text: this.lyric,
        ending
      })

      this.lyric = ''
      localStorage.tableData = JSON.stringify(this.tableData)
    },

    async lookupEnding (txt) {
      let url = lookupApiUrl + txt
      try {
        let data = await api.get(url, {
          headers: {'Access-Control-Allow-Origin': '*'}
        })
        console.log(data)
        return data.data.ending
      } catch (e) {
        console.log(e)
      }
    },

    removeBar (id) {
      this.tableData.splice(id - 1, 1)
      localStorage.tableData = JSON.stringify(this.tableData)
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
