<template>
  <v-autocomplete
    @input="input"
    :value="font"
    :items="fontItems"
    :disabled="disabled"
    item-value="class"
    outlined
    label="Font"
    dense
    hide-details
  >
    <template v-slot:item="{ item }">
      <span :class="item.class"> {{ item.text }} </span>
    </template>
    <template v-slot:selection="{ item }">
      <span :class="item.class"> {{ item.text }} </span>
    </template>
  </v-autocomplete>
</template>

<script>
export default {
  model: {
    prop: 'font',
  },
  props: {
    font: {
      type: String,
      default: null,
    },
    disabled: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      fontItems: [
        {
          class: 'font-dancing-script',
          text: 'Dancing Script',
        },
        {
          class: 'font-indie-flower',
          text: 'Indie Flower',
        },
        {
          class: 'font-merriweather',
          text: 'Merriweather',
        },
        {
          class: 'font-nunito',
          text: 'Nunito',
        },
        {
          class: 'font-odibee-sans',
          text: 'Odibee Sans',
        },
        {
          class: 'font-pacifico',
          text: 'Pacifico',
        },
        {
          class: 'font-shadows-into-light',
          text: 'Shadows Into Light',
        },
        {
          class: 'font-sigmar-one',
          text: 'Sigmar One',
        },
        {
          class: 'font-stint-ultra-condensed',
          text: 'Stint Ultra Condensed',
        },
      ],
    }
  },
  methods: {
    input($event) {
      this.$emit('input', $event)
    },
  },
}
</script>

<style></style>
