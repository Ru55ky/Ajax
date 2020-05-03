<template>
<v-app>
<v-container fluid>
  <v-layout row wrap justify-center="center">
    <v-flex
    xs12
    sm10
    >
      <v-row dense>
        <v-form
          ref="form"
          v-model="valid"
        >
          <v-text-field
            v-model="nameFirst"
            :counter="15"
            :rules="nameRules"
            label="First name"
            required
          ></v-text-field>

          <v-text-field
            v-model="nameSecond"
            :counter="15"
            :rules="nameRules"
            label="Second name"
            required
          ></v-text-field>

          <v-btn
          required
          color="indigo"
          fab
          @click="triggerUpload"
          >
            <v-icon>mdi-cloud-upload</v-icon>
          </v-btn>
          <input
            ref="fileInput"
            type="file"
            style="display: none;"
            accept="image/*"
            @change="onFileChange"
          >
          <v-layout row>
            <v-flex xs12>
              <img :src="imageSrc" height="100" v-if="imageSrc">
            </v-flex>
          </v-layout>
            <v-row class="mt-2" >
              <v-date-picker v-model="picker" :show-current="true"></v-date-picker>
            </v-row>
          <v-select
            v-model="unit"
            :items="items"
            :rules="[v => !!v || 'Item is required']"
            label="Unit"
            required
          ></v-select>
          <v-btn
            :loading="loading"
            :disabled="!valid || !image || loading"
            color="success"
            class="mr-4"
            @click="createRealtor"
          >
            Create
          </v-btn>
        </v-form>
      </v-row>
    </v-flex>
  </v-layout>
</v-container>
</v-app>
</template>

<script>
export default {
  data: () => ({
    valid: true,
    nameFirst: '',
    nameSecond: '',
    imageSrc: '',
    unit: null,
    image: null,
    picker: new Date().toISOString().substr(0, 10),
    nameRules: [
      v => !!v || 'Name is required',
      v => (v && v.length <= 15) || 'Name must be less than 10 characters'
    ],
    items: [
      'Unit 1',
      'Unit 2',
      'Unit 3',
      'Unit 4',
      'Unit 5'
    ],
    checkbox: false
  }),
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    createRealtor () {
      if (this.$refs.form.validate() || this.image) {
        const realtor = {
          nameFirst: this.nameFirst,
          nameSecond: this.nameSecond,
          image: this.image,
          unit: this.unit,
          picker: this.picker
        }
        this.$store.dispatch('createRealtor', realtor)
          .then(() => {
            this.$router.push('/')
            this.$store.dispatch('fetchRealtor')
          })
          .catch(() => {})
      }
    },
    triggerUpload () {
      this.$refs.fileInput.click()
    },
    onFileChange (event) {
      const file = event.target.files[0]

      const reader = new FileReader()
      reader.onload = e => {
        this.imageSrc = reader.result
      }
      reader.readAsDataURL(file)
      this.image = file
    }
  }
}
</script>

<style scoped>

</style>
