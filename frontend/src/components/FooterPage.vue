<template>
  <v-footer dark padless app inset>
    <v-card class="d-flex justify-center" flat tile color="red" :elevation="10">
      <v-card-text class="py-2 white--text text-center">
        {{ new Date().getFullYear() }} — <strong>By Ranyl Foumbi</strong>
      </v-card-text>
    </v-card>
  </v-footer>
</template>
