<template>
  <v-menu v-model="menu" top nudge-bottom="105" nudge-left="16" :close-on-content-click="false">
    <template v-slot:activator="{ on }">
      <v-btn text :disabled="disabled" v-on="on">
        <v-icon>{{ icon }}</v-icon>
        <div :style="swatchStyle" />
      </v-btn>
    </template>
    <v-card>
      <v-card-text class="pa-0">
        <v-color-picker v-model="color" @input="input" flat />
      </v-card-text>
    </v-card>
  </v-menu>
</template>

<script>
export default {
  model: {
    prop: 'colorModel',
  },
  props: {
    colorModel: {
      type: [String, Object],
      default: () => {
        return {}
      },
    },
    disabled: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: 'mdi-format-color-fill',
    },
  },
  data() {
    return {
      color: '',
      menu: false,
    }
  },
  computed: {
    swatchStyle() {
      const { color, menu } = this
      return {
        backgroundColor: color,
        cursor: 'pointer',
        height: '25px',
        width: '25px',
        borderRadius: menu ? '50%' : '4px',
        transition: 'border-radius 200ms ease-in-out',
      }
    },
  },
  methods: {
    input($event) {
      this.$emit('input', $event)
    },
    setColor() {
      this.color = this.colorModel
    },
  },
  mounted() {
    this.setColor()
  },
  watch: {
    colorModel() {
      this.setColor()
    },
  },
}
</script>

<style></style>
