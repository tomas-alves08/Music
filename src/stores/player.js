import { defineStore } from 'pinia'
import { Howl } from 'howler'
import helper from '@/includes/helper'

export default defineStore('player', {
  state: () => ({
    current_song: {},
    sound: {},
    seek: '0:00',
    duration: '0:00',
    playerProgress: '0%'
  }),
  actions: {
    async newSong(song) {
      //   if (this.sound.playing) {
      //     if (song.modified_name === this.current_song.modified_name) {
      //       if (!this.playing) this.sound.play()
      //       return
      //     }
      //     if (song.modified_name !== this.current_song.modified_name) this.sound.pause()
      //   }
      if (this.sound instanceof Howl) this.sound.unload()

      this.current_song = song

      this.sound = new Howl({
        src: [song.url],
        html5: true
      })

      this.sound.play()

      this.sound.on('play', () => {
        requestAnimationFrame(this.progress)
      })
    },
    async toggleAudio() {
      if (!this.sound.playing) return

      if (this.sound.playing()) {
        this.sound.pause()
      } else {
        this.sound.play()
      }
    },
    progress() {
      this.seek = helper.formatTime(this.sound.seek())
      this.duration = helper.formatTime(this.sound._duration)

      this.playerProgress = `${(this.sound.seek() / this.sound._duration) * 100}%`
      console.log(
        this.sound._duration,
        this.sound.seek(),
        this.playerProgress,
        this.sound.playing(),
        typeof this.progress
      )

      if (this.sound.playing()) {
        requestAnimationFrame(this.progress())
      }
    },
    updateSeek(event) {
      if (!this.sound.playing) return

      const { x, width } = event.currentTarget.getBoundingClientRect()
      const clickX = event.clientX - x
      const percentage = clickX / width
      const seconds = this.sound._duration * percentage

      this.sound.seek(seconds)
      this.sound.once('seek', this.progress)

      console.log(this.sound.playing, x, width, clickX, this.sound._duration, percentage, seconds)
    }
  },
  getters: {
    playing: (state) => {
      if (state.sound.playing) return state.sound.playing()

      return false
    }
  }
})
