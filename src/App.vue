<template>
  <v-app app id="inspire">
    <v-navigation-drawer
      v-model="drawer"
      app
    >
      <v-list dense>
        <v-list-item
          v-for="item in links"
          :key="item.title"
          :to="item.src"
        >
          <v-list-item-action>
            <v-icon>{{item.icon}}</v-icon>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>{{item.title}}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar
      app
      color="indigo"
      dark
    >
      <v-app-bar-nav-icon @click.stop="drawer = !drawer" />
      <v-toolbar-title>Realtors</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-toolbar-items class="d-none d-sm-flex"
      dark
      v-for="item in links"
           :key="item.title"
           link
           :to="item.src"
      >
        <v-btn dark depressed color="indigo" class="" :to="item.src">
          <v-icon left>{{item.icon}}</v-icon>
          {{item.title}}
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-content>
      <v-container
        class="fill-height"
        fluid
      >
        <router-view></router-view>
      </v-container>
    </v-content>
  </v-app>

</template>

<script>
export default {
  props: {
    source: String
  },
  data () {
    return {
      drawer: false,
      links: [
        {title: 'Главная', src: '/', icon: 'mdi-account-group'},
        {title: 'Новый риэлтор', src: '/realtor/newRealtor', icon: 'mdi-account-plus'},
        {title: 'Поиск', src: '/realtor/listRealtors', icon: 'mdi-account-search'}
      ]
    }
  }
}
</script>
