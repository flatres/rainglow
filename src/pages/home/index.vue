<template>
  <q-page-container class="fit">
    <q-page class="fit bg-black justify-center flex">
      <div class="q-pa-md fit rainglow-wrapper bg-black">
        <div class="text-subtitle1 q-mb-sm hidden">
          RainGlow – Current Light State
        </div>

        <div v-if="!row" class="text-white">
          No data loaded.
        </div>

        <div v-else class="rainglow-ring-container">
          <!-- DEVICE BODY / RING -->
          <div class="rainglow-ring">

            <!-- outer decorative outline -->
            <div class="ring-outline ring-outline-outer"></div>
            <div class="ring-outline ring-outline-inner"></div>

            <!-- CENTER LED -->
            <div
              class="center-led"
              :class="{ 'center-alert': centerRainAlert }"
              :style="centerStyle"
            >
              <!-- <div class="center-label">Centre</div> -->
              <div class="center-temp">
                {{ formattedTemp }}°C
              </div>
            </div>

            <!-- OUTER LED DOTS (back to original positioning) -->
            <div
              v-for="seg in segments"
              :key="'dot-' + seg.index"
              class="outer-led"
              :style="seg.positionStyle"
            >
              <div
                class="outer-led-dot"
                :class="{ 'is-current': seg.index === currentBlock }"
                :style="seg.colorStyle"
              ></div>
            </div>

            <!-- OUTER LED LABELS (separate, on a larger radius) -->
            <div
              v-for="seg in segments"
              :key="'info-' + seg.index"
              class="outer-led-info desktop-only text-white"
              :style="seg.infoStyle"
            >
              <div class="outer-led-time">
                {{ seg.timeStart }}–{{ seg.timeEnd }}
              </div>
              <div class="outer-led-meta">
                <span
                  class="day-tag"
                  :class="seg.dayOffset === 0 ? 'day-today' : 'day-tomorrow'"
                >
                  {{ seg.dayOffset === 0 ? 'T' : '+1' }}
                </span>
                <span class="q-ml-xs">
                  {{ seg.probRain.toFixed(0) }}% • {{ seg.rainMm.toFixed(1) }}mm
                </span>
              </div>
            </div>
          </div>

          <!-- SUMMARY LINE -->
          <div class="q-mt-sm text-body2 rg-summary q-mt-xl desktop-only" v-if="summaryText" style="margin-top:100px">
            {{ summaryText }}
          </div>

          <!-- LEGEND -->
          <div class="q-mt-md text-caption desktop-only text-white">
            <div class="text-center">
              <span class="legend-box legend-current"></span>
              Blinking outer LED = current time interval
            </div>
            <div class="text-center">
              <span class="legend-box legend-today"></span> Today
              &nbsp;&nbsp;
              <span class="legend-box legend-tomorrow"></span> Tomorrow
            </div>
            <div v-if="centerRainAlert">
              <span class="legend-dot legend-center"></span>
              Centre pulsing = rain alert (from now onwards today)
            </div>
          </div>

        </div>
      </div>
    </q-page>
  </q-page-container>
</template>

<script>
import RainglowApi from './api/rainglowApi.js'
export default {
  name: 'RainglowDisplay',

  props: {
    // One DB row from rainglow_data (or null while loading)
  },

  data () {
    return {
      row: null,
      // LED 0 at top, then clockwise
      polarPositions: [
        { angleDeg: -90, radius: 120 }, // 0 top
        { angleDeg: -30, radius: 120 }, // 1 top-right
        { angleDeg: 30, radius: 120 }, // 2 bottom-right
        { angleDeg: 90, radius: 120 }, // 3 bottom
        { angleDeg: 150, radius: 120 }, // 4 bottom-left
        { angleDeg: 210, radius: 120 } // 5 top-left
      ]
    }
  },

  created () {
    RainglowApi.getStatus(this.processData, null)
  },

  computed: {
    /** Match firmware: 24 hours / 6 blocks = 4h per block */
    currentBlock () {
      const hour = new Date().getHours()
      return Math.floor(hour / 4) // 0..5
    },

    formattedTemp () {
      if (!this.row || this.row.temp_c == null) return '--'
      const v = Number(this.row.temp_c)
      return isNaN(v) ? '--' : v.toFixed(1)
    },

    centerStyle () {
      if (!this.row) return {}
      const r = Number(this.row.r_c || 0)
      const g = Number(this.row.g_c || 0)
      const b = Number(this.row.b_c || 0)
      return {
        backgroundColor: 'rgb(' + r + ', ' + g + ', ' + b + ')'
      }
    },

    /** Build array of 6 segments from the row */
    segments () {
      const row = this.row
      if (!row) return []

      const out = []
      const radiusDot = 120 // same as original
      const radiusLabel = 190 // labels further out so they clear the device

      for (let i = 0; i < 6; i++) {
        const polar = this.polarPositions[i]
        const rad = (polar.angleDeg * Math.PI) / 180

        // Original container offsets for the dot
        const xDot = radiusDot * Math.cos(rad) - 12
        const yDot = radiusDot * Math.sin(rad) - 10

        // Label centre on a larger radius, true radial position
        const xLabel = radiusLabel * Math.cos(rad)
        const yLabel = radiusLabel * Math.sin(rad)

        const dayOffset = Number(row['dayOffset_' + i] || 0)
        const probRain = Number(row['probRain_' + i] || 0)
        const rainMm = Number(row['rainMM_' + i] || 0)
        const timeStart = String(row['timeStart_' + i] || '')
        const timeEnd = String(row['timeEnd_' + i] || '')

        const r = Number(row['r_' + i] || 0)
        const g = Number(row['g_' + i] || 0)
        const b = Number(row['b_' + i] || 0)

        out.push({
          index: i,
          dayOffset,
          probRain,
          rainMm,
          timeStart,
          timeEnd,
          colorStyle: {
            backgroundColor: 'rgb(' + r + ', ' + g + ', ' + b + ')'
          },
          // dot container (same behaviour as your original component)
          positionStyle: {
            transform: 'translate(' + xDot + 'px,' + yDot + 'px)'
          },
          // label container, centred and pushed out more
          infoStyle: {
            transform: 'translate(-50%, -50%) translate(' + xLabel + 'px,' + yLabel + 'px)'
          }
        })
      }

      return out
    },

    /**
     * Center rain alert:
     * true if from "now" onwards TODAY (dayOffset == 0 and index >= currentBlock)
     *   maxProb >= 60 OR totalRain >= 5 mm
     */
    centerRainAlert () {
      if (!this.row) return false

      let maxProb = 0
      let totalMm = 0

      for (let i = this.currentBlock; i < 6; i++) {
        const dayOffset = Number(this.row['dayOffset_' + i] || 0)
        if (dayOffset !== 0) {
          continue // only consider today's remaining blocks
        }
        const p = Number(this.row['probRain_' + i] || 0)
        const mm = Number(this.row['rainMM_' + i] || 0)
        if (p > maxProb) maxProb = p
        totalMm += mm
      }

      return (maxProb >= 60) || (totalMm >= 5)
    },

    /**
     * Human-readable one-liner summary of today/tomorrow.
     */
    summaryText () {
      if (!this.row) return ''

      const today = {
        totalMm: 0,
        maxProb: 0,
        earliestWetIndex: null
      }

      const tomorrow = {
        totalMm: 0,
        maxProb: 0,
        earliestWetIndex: null
      }

      // thresholds for "meaningful" rain in a block
      const MIN_MM = 0.2
      const MIN_PROB = 40

      for (let i = 0; i < 6; i++) {
        const dayOffset = Number(this.row['dayOffset_' + i] || 0)
        const probRain = Number(this.row['probRain_' + i] || 0)
        const rainMm = Number(this.row['rainMM_' + i] || 0)

        const target = (dayOffset === 0) ? today : (dayOffset === 1 ? tomorrow : null)
        if (!target) continue

        target.totalMm += rainMm
        if (probRain > target.maxProb) {
          target.maxProb = probRain
        }

        const isWet = (rainMm >= MIN_MM) || (probRain >= MIN_PROB)
        if (isWet && target.earliestWetIndex == null) {
          target.earliestWetIndex = i
        }
      }

      const anyToday = today.totalMm >= MIN_MM
      const anyTomorrow = tomorrow.totalMm >= MIN_MM

      const todayPhrase = this.describeDay('today', today)
      const tomorrowPhrase = this.describeDay('tomorrow', tomorrow)

      if (!anyToday && !anyTomorrow) {
        return 'Mostly dry today and tomorrow.'
      }

      if (anyToday && !anyTomorrow) {
        return todayPhrase + ' Tomorrow looks mostly dry.'
      }

      if (!anyToday && anyTomorrow) {
        return 'Today is mostly dry. ' + tomorrowPhrase
      }

      // both have rain
      return todayPhrase + ' ' + tomorrowPhrase
    }
  },

  methods: {
    processData (x) {
      console.log(x)
      this.row = x
    },

    /**
     * Map a block index to a rough time-of-day description.
     * 0: 00–03, 1: 04–07, 2: 08–11, 3: 12–15, 4: 16–19, 5: 20–23
     */
    blockToPeriod (index) {
      switch (index) {
        case 0: return 'overnight'
        case 1: return 'early morning'
        case 2: return 'late morning'
        case 3: return 'afternoon'
        case 4: return 'evening'
        case 5: return 'late evening'
        default: return ''
      }
    },

    /**
     * Build a phrase for one day (today/tomorrow)
     * based on total mm, max probability and earliest wet block.
     */
    describeDay (label, info) {
      const total = info.totalMm
      const prob = info.maxProb
      const wetIndex = info.earliestWetIndex

      if (total < 0.2) {
        return (label === 'today')
          ? 'Today is mostly dry.'
          : 'Tomorrow is mostly dry.'
      }

      const mmStr = total.toFixed(1)
      const probStr = prob.toFixed(0) + '%'

      let intensity = 'showers'
      if (total >= 5) {
        intensity = 'heavy rain'
      } else if (total >= 2) {
        intensity = 'rain'
      }

      console.log(intensity)

      const when = (wetIndex != null) ? this.blockToPeriod(wetIndex) : 'at times'

      if (label === 'today') {
        return 'Showers today (' + mmStr + 'mm, up to ' + probStr + ', mainly ' + when + ').'
      } else {
        return 'Showers tomorrow (' + mmStr + 'mm, up to ' + probStr + ', mainly ' + when + ').'
      }
    }
  }
}
</script>

<style scoped>
.rainglow-wrapper {
  max-width: 720px;
  padding-top:100px;
}

/* Layout */
.rainglow-ring-container {
  display: flex;
  flex-direction: column;
  align-items: center;
}

/* Main circular device body */
.rainglow-ring {
  position: relative;
  width: 280px;
  height: 280px;
  border-radius: 50%;
  margin: 0 auto;

  background: radial-gradient(circle, #8b8b8b 0%, #4f4f4f 60%, #5f5f5f 100%);
  /* background: radial-gradient(circle, #222 0%, #111 60%, #000 100%); */
  box-shadow:
    0 0 0 1px rgba(255,255,255,0.04),
    0 10px 25px rgba(0,0,0,0.6);
}

/* full device outline rings */
.ring-outline {
  position: absolute;
  left: 50%;
  top: 50%;
  border-radius: 50%;
  transform: translate(-50%, -50%);
  pointer-events: none;
}

.ring-outline-outer {
  width: 260px;
  height: 260px;
  border: 3px solid rgba(255,255,255,0.12);
  box-shadow:
    0 0 12px rgba(0,0,0,0.8),
    inset 0 0 10px rgba(0,0,0,0.6);
}

.ring-outline-inner {
  width: 140px;
  height: 140px;
  border: 2px solid rgba(255,255,255,0.25);
  box-shadow: inset 0 0 8px rgba(0,0,0,0.7);
}

/* Center LED */
.center-led {
  position: absolute;
  left: 50%;
  top: 50%;
  width: 80px;
  height: 80px;
  transform: translate(-50%, -50%);
  border-radius: 50%;
  box-shadow:
    0 0 12px rgba(0,0,0,0.7),
    0 0 20px rgba(0,0,0,0.5);
  color: white;
  text-align: center;

  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;

  transition:
    background-color 0.6s ease,
    box-shadow 0.4s ease,
    transform 0.4s ease;
}

.center-label {
  font-size: 0.7rem;
  opacity: 0.85;
}

.center-temp {
  font-size: 1rem;
  font-weight: 600;
}

/* Center rain alert pulsing */
.center-led.center-alert {
  animation: center-pulse 1.4s infinite;
}

@keyframes center-pulse {
  0%, 100% {
    transform: translate(-50%, -50%) scale(1);
    box-shadow:
      0 0 12px rgba(0,0,0,0.7),
      0 0 20px rgba(255,255,255,0.5);
  }
  50% {
    transform: translate(-50%, -50%) scale(1.1);
    box-shadow:
      0 0 18px rgba(0,0,0,0.8),
      0 0 28px rgba(255,255,255,0.9);
  }
}

/* Outer LED containers – back to original behaviour */
.outer-led {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;
  text-align: center;
}

/* LED dot */
.outer-led-dot {
  width: 26px;
  height: 26px;
  border-radius: 50%;
  border: 2px solid rgba(255,255,255,0.25);
  box-shadow: 0 0 8px rgba(0,0,0,0.7);

  transition:
    background-color 0.5s ease,
    box-shadow 0.4s ease,
    transform 0.4s ease;
}

/* Pulse only for the current timeblock */
.outer-led-dot.is-current {
  animation: rg-pulse 1s infinite;
}

@keyframes rg-pulse {
  0%, 100% {
    transform: scale(1);
    box-shadow: 0 0 10px rgba(255,255,255,0.9);
  }
  50% {
    transform: scale(1.25);
    box-shadow: 0 0 18px rgba(255,255,255,1);
  }
}

/* Label containers: positioned independently, on a larger circle */
.outer-led-info {
  position: absolute;
  left: 50%;
  top: 50%;
  transform-origin: center center;

  font-size: 0.65rem;
  color: black;
  white-space: nowrap;
  text-align: center;
}

.outer-led-time {
  font-weight: 600;
}

.outer-led-meta {
  opacity: 0.85;
}

/* Today / tomorrow tags */
.day-tag {
  padding: 1px 4px;
  border-radius: 3px;
  font-size: 0.6rem;
  text-transform: uppercase;
}

.day-today {
  background: rgba(0,200,0,0.25);
  border: 1px solid rgba(0,200,0,0.6);
}

.day-tomorrow {
  background: rgba(0,150,255,0.25);
  border: 1px solid rgba(0,150,255,0.6);
}

/* Summary text */
.rg-summary {
  /* max-width: 360px; */
  text-align: center;
}

/* Legend */
.legend-box {
  width: 12px;
  height: 12px;
  display: inline-block;
  border-radius: 2px;
  margin-right: 4px;
}

.legend-current {
  background: white;
  box-shadow: 0 0 6px rgba(255,255,255,0.8);
}

.legend-today {
  background: rgba(0,200,0,0.8);
}

.legend-tomorrow {
  background: rgba(0,150,255,0.8);
}

.legend-dot {
  width: 10px;
  height: 10px;
  display: inline-block;
  border-radius: 50%;
  margin-right: 4px;
}

.legend-center {
  background: #ffffff;
  box-shadow: 0 0 6px rgba(255,255,255,0.9);
}
</style>
