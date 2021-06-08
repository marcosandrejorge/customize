<template>
  <v-dialog v-model="dialog" width="500">
    <template v-slot:activator="{ on }">
      <v-btn text v-on="on">
        <v-icon>mdi-sticker-emoji</v-icon>
      </v-btn>
    </template>
    <v-card min-height="200" min-width="100" :style="{ cursor: 'pointer' }">
      <v-card-title>Select sticker</v-card-title>
      <v-divider></v-divider>
      <v-container>
        <v-row dense>
          <v-col v-for="sticker in getStickers" :key="sticker.id">
            <v-card width="100" height="100" @click="selectSticker(sticker)">
              <v-img :src="sticker.src" width="100" height="100" />
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-card>
  </v-dialog>
</template>

<script>
import mixinSticker from '../mixins/mixinSticker'
export default {
  mixins: [mixinSticker],
  data() {
    return {
      dialog: false,
    }
  },
  methods: {
    selectSticker(sticker) {
      this.dialog = false
      this.$emit('selectedSticker', sticker)
    },
  },
}
</script>

<style></style>
