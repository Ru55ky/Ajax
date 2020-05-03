<template>
<v-container fluid v-if="!loading">
  <v-layout row wrap justify-center="center">
    <v-flex xs12 sm10>
     <v-row dense>
       <v-card
         class="mt-5 mx-auto"
         max-width="400"
         v-for="realtor in realtors"
         :key="realtor.id"
         :to="'/realtor/' + realtor.id"
       >
         <v-img
           class="white--text align-end"
           height="200px"
           :src="realtor.imageSrc"
         >
           <v-card-title></v-card-title>
         </v-img>

         <v-card-subtitle class="pb-0"></v-card-subtitle>

         <v-card-text class="text--primary">
           <h2 class="title font-weight-regular">{{realtor.nameSecond}} {{realtor.nameFirst}}</h2>
           <div>{{realtor.picker}}</div>
         </v-card-text>
         <v-card-actions>
           <v-btn
             color="orange"
             text
             :to="'/realtor/' + realtor.id"
           >
             Больше информации
           </v-btn>
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
export default {
  computed: {
    realtors () {
      return this.$store.getters.realtors
    },
    adById () {
      return this.$store.getters.adById
    },
    loading () {
      return this.$store.getters.loading
    }
  }
}
</script>

<style scoped>
  v-progress-circular {
    margin: 1rem;
  }
</style>
