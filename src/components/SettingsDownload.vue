<template>
  <v-dialog v-model="dialog" max-width="600px">
    <template v-slot:activator="{ on }">
      <slot name="default" :on="on"></slot>
    </template>
    <v-card>
      <v-card-title>
        <span class="text-h5">Download</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-form ref="form">
            <v-row>
              <v-col cols="12" sm="12">
                <v-text-field v-model="name" label="Name" :rules="required"></v-text-field>
              </v-col>
              <v-col cols="12" sm="12">
                <v-autocomplete v-model="type" :items="types" :rules="required" label="Type"></v-autocomplete>
              </v-col>
            </v-row>
          </v-form>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="clear"> Close </v-btn>
        <v-btn color="blue darken-1" text @click="settingsDownload"> Download </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data() {
    return {
      dialog: false,
      name: null,
      type: null,
      types: ['.png', '.jpeg'],
      required: [(v) => !!v || 'Required'],
    }
  },
  methods: {
    settingsDownload() {
      if (!this.$refs.form.validate()) return
      this.$emit('settingsDownload', {
        name: this.name,
        type: this.type,
      })
      this.clear()
    },
    clear() {
      this.name = null
      this.type = null
      this.dialog = false
      this.$refs.form.reset()
    },
  },
}
</script>

<style></style>
