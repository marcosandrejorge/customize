<template>
  <v-toolbar dense class="included no-box-top">
    <v-row>
      <v-col cols="6" sm="6" md="3">
        <v-text-field :value="width" label="Width" outlined dense hide-details @input="inputWidth"></v-text-field>
      </v-col>
      <v-col cols="6" sm="6" md="3">
        <v-text-field :value="height" label="Height" outlined dense hide-details @input="inputHeight"></v-text-field>
      </v-col>
    </v-row>
  </v-toolbar>
</template>

<script>
export default {
  props: {
    width: {
      type: Number,
      default: 875,
    },
    height: {
      type: Number,
      default: 1840,
    },
  },
  components: {},
  data() {
    return {}
  },
  computed: {},
  methods: {
    inputWidth($event) {
      this.$emit('width', parseFloat($event))
    },
    inputHeight($event) {
      this.$emit('height', parseFloat($event))
    },
  },
  mounted() {},
  watch: {},
}
</script>

<style></style>
