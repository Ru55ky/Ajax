<template>
    <v-dialog width="400" v-model="dialogEdit" v-if="!loading">
      <template v-slot:activator="{on}">
        <v-btn class="warning" v-on="on" text>Изменить</v-btn>
      </template>
      <v-row dense>
        <v-card
          width="500"
        >
          <v-card-title><h3>Редактирование профиля</h3></v-card-title>
          <v-divider></v-divider>
          <v-img
            class="white--text align-end"
            height="200"
            src=""
          ></v-img>
          <v-divider></v-divider>
          <v-card-text>
            <v-text-field
              name="nameEdit"
              label="Изменить имя"
              type="text"
              v-model="nameFirstEdit"
            ></v-text-field>
          </v-card-text>
            <v-card-text>
              <v-text-field
              name="nameSecondEdit"
              label="Измените фамилию"
              v-model="nameSecondEdit"
              type="text"
              ></v-text-field>
            </v-card-text>
          <v-card-text>
            <v-text-field
            name="guidEdit"
            label="Измените свой GUID"
            type="text"
            ></v-text-field>
          </v-card-text>
          <v-spacer></v-spacer>
          <v-card-actions>
            <v-btn
              text
              color="warning"
              v-model="cancelEdit"
              @click="dialogEdit = false"
            >Отмена</v-btn>
            <v-btn
              text
              color="success"
              @click="successEdit(realtor.nameFirst, realtor.nameSecond, realtor.id)"
            >Принять</v-btn>
          </v-card-actions>
        </v-card>
      </v-row>
    </v-dialog>
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
export default {
  props: ['realtor'],
  data () {
    return {
      dialogEdit: false,
      nameFirstEdit: this.realtor.nameFirst,
      nameSecondEdit: this.realtor.nameSecond
    }
  },
  computed: {
    loading () {
      return this.$store.getters.loading
    }
  },
  methods: {
    cancelEdit () {
      this.nameFirstEdit = this.realtor.nameFirst
      this.nameSecondEdit = this.realtor.nameSecond
    },
    successEdit () {
      if (this.nameFirstEdit !== '' && this.nameSecondEdit !== '') {
        this.$store.dispatch('updateRealtor', {
          nameFirst: this.nameFirstEdit,
          nameSecond: this.nameSecondEdit,
          id: this.realtor.id
        })
      }
    }
  }
}
</script>

<style scoped>

</style>
