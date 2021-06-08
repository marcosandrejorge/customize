<template>
  <v-toolbar dense class="included no-box-top">
    <v-btn text @click="insertText">
      <v-icon>mdi-format-text</v-icon>
    </v-btn>
    <v-btn text @click="selectFileBackground">
      <v-file-input
        hide-input
        @change="backgroundImageLoaded"
        class="no-flex"
        hide-details
        prepend-icon="mdi-image-plus"
        id="file-background"
      ></v-file-input>
    </v-btn>
    <SelectSticker @selectedSticker="selectedSticker" />
    <ColorPicker v-model="backgroundModel.color" @input="inputBackground" label="Background" />
    <ColorPicker
      v-model="elementModel.color"
      :disabled="!isTypeText"
      @input="inputElement"
      icon="mdi-format-color-text"
    />
    <FontText v-model="elementModel.font" :disabled="!isTypeText" @input="inputElement" />
    <v-text-field
      v-model="elementModel.fontSize"
      label="Font size"
      outlined
      dense
      hide-details
      @input="inputElement"
      :disabled="!isTypeText"
    ></v-text-field>
    <v-text-field
      v-model="elementModel.text"
      label="Text"
      outlined
      dense
      hide-details
      @input="inputElement"
      :disabled="!isTypeText"
    ></v-text-field>
    <v-btn-toggle dense v-model="toggle_rotate" mandatory>
      <v-btn @click="rotate('right')" :disabled="!elementSelected">
        <v-icon>mdi-rotate-right</v-icon>
      </v-btn>
      <v-btn @click="rotate('left')" :disabled="!elementSelected">
        <v-icon>mdi-rotate-left</v-icon>
      </v-btn>
    </v-btn-toggle>
    <v-btn @click="deselect" text :disabled="!elementSelected">
      <v-icon>mdi-select-off</v-icon>
    </v-btn>
    <v-btn @click="deleteElement" text :disabled="!elementSelected">
      <v-icon>mdi-delete</v-icon>
    </v-btn>
  </v-toolbar>
</template>

<script>
import ColorPicker from '../components/ColorPicker.vue'
import SelectSticker from '../components/SelectSticker.vue'
import FontText from '../components/FontText.vue'
export default {
  props: {
    element: {
      type: Object,
      default: () => {
        return {}
      },
    },
    background: {
      type: Object,
      default: () => {
        return {}
      },
    },
    elementSelected: {
      type: Boolean,
      default: false,
    },
  },
  components: {
    ColorPicker,
    FontText,
    SelectSticker,
  },
  data() {
    return {
      toggle_multiple: null,
      toggle_rotate: null,
      elementModel: {},
      backgroundModel: {},
    }
  },
  computed: {
    isTypeText() {
      if (this.elementSelected) {
        return this.element.type === 'text'
      }
      return false
    },
  },
  methods: {
    selectFileBackground() {
      document.getElementById('file-background').click()
    },
    deselect() {
      this.$emit('deselect')
    },
    deleteElement() {
      this.$emit('deleteElement')
    },
    setBackground() {
      this.backgroundModel = { ...this.background }
    },
    setElement() {
      this.elementModel = { ...this.element }
    },
    rotate(type) {
      if (!this.elementSelected) return
      let rotateElement = this.elementModel.rotate
      if (type === 'left') {
        if (rotateElement === 0) {
          rotateElement = 360
        }
        rotateElement -= 10
      } else {
        if (rotateElement === 360) {
          rotateElement = 0
        }
        rotateElement += 10
      }
      this.elementModel.contentClass = `rotate-${rotateElement}`
      this.elementModel.rotate = rotateElement
      this.inputElement()
    },
    inputBackground() {
      this.$emit('backgroundUpdate', this.backgroundModel)
    },
    inputElement() {
      this.$emit('elementUpdate', this.elementModel)
    },
    insertText() {
      this.$emit('insertText')
    },
    backgroundImageLoaded($event) {
      this.$emit('backgroundImageLoaded', $event)
    },
    selectedSticker($event) {
      this.$emit('selectedSticker', $event)
    },
  },
  mounted() {
    this.setBackground()
    this.setElement()
  },
  watch: {
    background() {
      this.setBackground()
    },
    element() {
      this.setElement()
    },
  },
}
</script>

<style></style>
