import image1 from '../assets/img/stickers/sticker_csgo_1.png'
import image2 from '../assets/img/stickers/sticker_csgo_2.png'
import image3 from '../assets/img/stickers/sticker_csgo_3.png'
import image4 from '../assets/img/stickers/sticker_csgo_4.png'
import image5 from '../assets/img/stickers/sticker_csgo_5.png'
import image6 from '../assets/img/stickers/sticker_csgo_6.png'
import image7 from '../assets/img/stickers/sticker_csgo_7.png'
import image8 from '../assets/img/stickers/sticker_csgo_8.png'
import image9 from '../assets/img/stickers/sticker_csgo_9.png'
import image10 from '../assets/img/stickers/sticker_csgo_10.png'
import image11 from '../assets/img/stickers/sticker_csgo_11.png'
import image12 from '../assets/img/stickers/sticker_csgo_12.png'
export default {
  data() {
    return {
      stickers: [
        {
          id: 1,
          src: image1,
        },
        {
          id: 2,
          src: image2,
        },
        {
          id: 3,
          src: image3,
        },
        {
          id: 4,
          src: image4,
        },
        {
          id: 5,
          src: image5,
        },
        {
          id: 6,
          src: image6,
        },
        {
          id: 7,
          src: image7,
        },
        {
          id: 8,
          src: image8,
        },
        {
          id: 9,
          src: image9,
        },
        {
          id: 10,
          src: image10,
        },
        {
          id: 11,
          src: image11,
        },
        {
          id: 12,
          src: image12,
        },
      ],
    }
  },
  computed: {
    getStickers() {
      return this.stickers
    },
  },
}
