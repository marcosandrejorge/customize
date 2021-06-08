<template>
  <div>
    <v-toolbar dense class="included">
      <SettingsDownload @settingsDownload="saveToImage">
        <template v-slot="{ on }">
          <v-btn text v-on="on" class="primary">
            <v-icon>mdi-download</v-icon>
          </v-btn>
        </template>
      </SettingsDownload>
      <v-tabs v-model="tab" align-with-title>
        <v-tabs-slider color="primary"></v-tabs-slider>
        <v-tab v-for="item in itemsTab" :key="item">
          {{ item }}
        </v-tab>
      </v-tabs>
    </v-toolbar>
    <ToolbarEdit
      :element="getElement"
      :background="background"
      :element-selected="isSelected"
      @elementUpdate="elementUpdate"
      @backgroundUpdate="backgroundUpdate"
      @deselect="deselect"
      @deleteElement="deleteElementSelected"
      @insertText="insertText"
      @backgroundImageLoaded="backgroundImageLoaded"
      @selectedSticker="insertSticker"
      v-show="tab === 0"
    />
    <ToolbarSettings
      :width="background.width"
      :height="background.height"
      @width="updateWidthBackground"
      @height="updateHeightBackground"
      v-if="tab === 1"
    />
    <v-card
      class="mx-auto my-12 box v-card-img"
      :color="background.color"
      :width="background.width"
      :height="background.height"
    >
      <template v-for="(element, index) in elements">
        <VueDragResize
          :key="index"
          :is-active="index === elementSelected"
          :z="element.zIndex"
          :contentClass="element.contentClass"
          :h="element.height"
          :w="element.width"
          :y="element.top"
          :x="element.left"
          @resizing="resize($event, element)"
          @dragging="resize($event, element)"
          @activated="onActivated(index)"
        >
          <template v-if="element.type === 'img'">
            <v-img class="img" :src="element.src" :width="element.width" :height="element.height" />
          </template>
          <template v-if="element.type === 'sticker'">
            <img class="img sticker" :src="element.src" :width="element.width" :height="element.height" />
          </template>
          <template v-if="element.type === 'text'">
            <span
              class="text"
              :style="{ color: element.color, fontSize: element.fontSize + 'px' }"
              :class="element.font"
              >{{ element.text }}</span
            >
          </template>
        </VueDragResize>
      </template>
    </v-card>
  </div>
</template>

<script>
import VueDragResize from 'vue-drag-resize'
import ToolbarEdit from '../components/ToolbarEdit.vue'
import ToolbarSettings from '../components/ToolbarSettings.vue'
import SettingsDownload from '../components/SettingsDownload.vue'
const IMG = 'img'
const TEXT = 'text'
const STICKER = 'sticker'
const widthBackground = 875
const heightBackground = 1840
const widthSticker = 200
const heightSticker = 200
const colorDefault = '#E2E2E2FF'
const backgroundDefault = '#FFFFFF'
import * as htmlToImage from 'html-to-image'

export default {
  name: 'app',

  components: {
    VueDragResize,
    ToolbarEdit,
    ToolbarSettings,
    SettingsDownload,
  },

  data() {
    return {
      tab: 0,
      itemsTab: ['Edit', 'Settings'],
      showMenu: false,
      elementSelected: null,
      elements: [],
      background: {
        color: backgroundDefault,
        width: widthBackground,
        height: heightBackground,
      },
    }
  },
  computed: {
    getElement() {
      return !this.isSelected ? {} : { ...this.elements[this.elementSelected] }
    },
    isSelected() {
      return this.elementSelected !== null
    },
  },
  methods: {
    async saveToImage(settings) {
      this.elementSelected = null
      var node = document.querySelector('.box')
      let config = {
        width: this.background.width,
        height: this.background.height,
        style: {
          marginRight: 'auto',
          marginLeft: 'auto',
          marginTop: '0px',
          marginBottom: '48px',
        },
      }
      let download = function (dataUrl) {
        var link = document.createElement('a')
        link.download = `${settings.name}${settings.type}`
        link.href = dataUrl
        link.click()
      }
      switch (settings.type) {
        case '.png':
          htmlToImage.toPng(node, config).then((dataUrl) => download(dataUrl))
          break
        case '.jpeg':
          htmlToImage.toJpeg(node, config).then((dataUrl) => download(dataUrl))
          break
      }
    },
    deselect() {
      this.elementSelected = null
    },
    deleteElementSelected() {
      this.elements.splice(this.elementSelected, 1)
      this.deselect()
    },
    onClickOutsideStandard() {
      this.elementSelected = null
    },
    include() {
      return [document.querySelector('.included')]
    },
    backgroundUpdate($event) {
      this.background = { ...$event }
    },
    updateWidthBackground($event) {
      this.background.width = $event
      this.updateWidthHeightElementTypeImg()
    },
    updateHeightBackground($event) {
      this.background.height = $event
      this.updateWidthHeightElementTypeImg()
    },
    updateWidthHeightElementTypeImg() {
      this.elements.forEach((element) => {
        if (element.type === 'img') {
          element.width = this.background.width
          element.height = this.background.height
        }
      })
    },
    backgroundImageLoaded(file) {
      if (!(file instanceof File)) return
      this.deleteElementByType('img')
      this.elements.push({
        type: IMG,
        src: URL.createObjectURL(file),
        text: null,
        font: null,
        fontSize: null,
        rotate: 0,
        color: colorDefault,
        zIndex: 1,
        width: this.background.width,
        height: this.background.height,
        top: 0,
        left: 0,
        contentClass: '',
      })
      this.selectLastElement()
    },
    insertSticker(sticker) {
      this.elements.push({
        type: STICKER,
        src: sticker.src,
        text: null,
        font: null,
        fontSize: null,
        rotate: 0,
        color: null,
        zIndex: 2,
        width: widthSticker,
        height: heightSticker,
        top: 200,
        left: 0,
        contentClass: '',
      })
      this.selectLastElement()
    },
    insertText() {
      this.elements.push({
        type: TEXT,
        src: null,
        text: 'Text',
        font: null,
        fontSize: 20,
        rotate: 0,
        color: colorDefault,
        zIndex: 3,
        width: 200,
        height: 20,
        top: 0,
        left: 0,
        contentClass: '',
      })
      this.selectLastElement()
    },
    selectLastElement() {
      this.elementSelected = this.elements.length - 1
    },
    deleteElementByType(type) {
      let indexElement = null
      this.elements.forEach((element, index) => {
        if (element.type === type) {
          indexElement = index
        }
      })

      if (indexElement !== null) {
        this.elements.splice(indexElement, 1)
      }
    },
    elementUpdate($event) {
      if (!this.isSelected) return
      this.elements[this.elementSelected].text = $event.text
      this.elements[this.elementSelected].font = $event.font
      this.elements[this.elementSelected].fontSize = $event.fontSize
      this.elements[this.elementSelected].rotate = $event.rotate
      this.elements[this.elementSelected].color = $event.color
      this.elements[this.elementSelected].contentClass = $event.contentClass
    },
    onActivated(indexElement) {
      this.elementSelected = indexElement
    },
    resize(newRect, element) {
      element.width = newRect.width
      element.height = newRect.height
      element.top = newRect.top
      element.left = newRect.left
    },
  },
}
</script>
