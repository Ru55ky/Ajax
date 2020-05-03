<template>
    <v-container fluid v-if="!loading">
      <v-layout row wrap justify-center="top">
        <v-flex
          xs12
          sm10
        >
          <v-row dense>
            <v-card
              class="mt-5 mx-auto"
              max-width="400"
            >
              <v-img
                class="white--text align-end"
                height="200px"
                :src="realtor.imageSrc"
              >
                <v-card-title>{{realtor.nameSecond}} {{realtor.nameFirst}}</v-card-title>
              </v-img>

              <v-card-subtitle class="pb-0"></v-card-subtitle>

              <v-card-text class="text--primary">
                <div>{{realtor.picker}}</div>
              </v-card-text>

              <v-card-actions>
                <div class="text-center ma-2">
                  <v-btn
                    color="orange"
                    text
                    @click="snackbar = true"
                  >Удалить
                  </v-btn>
                  <v-snackbar v-model="snackbar">Подтвердите действие
                    <v-btn
                      color="orange"
                      text
                      @click="deleteRealtor(realtor.id)"
                    >Удалить</v-btn>
                  </v-snackbar>
                </div>
                <EditRealtor :realtor="realtor"></EditRealtor>
              </v-card-actions>
            </v-card>
          </v-row>
        </v-flex>
      </v-layout>
    </v-container>
  <v-container v-else>
      <v-layout row wrap justify-center="center">
        <div class="text-center">
          <v-progress-circular
            indeterminate
            color="primary"
            :size="50"
          ></v-progress-circular>
        </div>
      </v-layout>
  </v-container>
</template>
<script>
import EditRealtor from './EditRealtor'
export default {
  props: ['id'],
  data () {
    return {
      snackbar: false
    }
  },
  computed: {
    realtor () {
      const id = this.id
      return this.$store.getters.adById(id)
    },
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    deleteRealtor (id) {
      this.$store.dispatch('deleteRealtor', id)
        .then(() => {
          this.$router.push('/')
          this.$store.dispatch('fetchRealtor')
        })
        .catch(() => {})
    }
  },
  components: {
    EditRealtor: EditRealtor
  }
}
</script>

<style scoped>

</style>
