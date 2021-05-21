import React from 'react'
import { render } from 'react-dom'
import { StaticMap } from 'react-map-gl'
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import DeckGL from '@deck.gl/react'

// Source data CSV
const DATA_URL =
  'https://raw.githubusercontent.com/ckanz/deckgl-nyc-complaints/master/data/nyc-complaint-data.csv'; // eslint-disable-line

const INITIAL_VIEW_STATE = {
  longitude: -74.0,
  latitude: 40.68,
  zoom: 10.5,
  minZoom: 5,
  maxZoom: 15,
  pitch: 50,
  bearing: 0
}

const MAP_STYLE = 'https://basemaps.cartocdn.com/gl/dark-matter-nolabels-gl-style/style.json'

/* eslint-disable react/no-deprecated */
export default function App ({
  data,
  mapStyle = MAP_STYLE,
  radius = 25,
  upperPercentile = 100,
  coverage = 0.8
}) {
  const layers = [
    new HexagonLayer({
      id: 'heatmap',
      coverage,
      data,
      elevationRange: [0, 200],
      elevationScale: data && data.length ? 50 : 0,
      extruded: true,
      getPosition: d => d,
      radius,
      upperPercentile,
      transitions: {
        elevationScale: 200
      }
    })
  ]

  return (
    <DeckGL
      layers={layers}
      initialViewState={INITIAL_VIEW_STATE}
      controller
    >
      <StaticMap reuseMaps mapStyle={mapStyle} preventStyleDiffing />
    </DeckGL>
  )
}

export function renderToDOM (container) {
  render(<App />, container)

  require('d3-request').csv(DATA_URL, (error, response) => {
    if (!error) {
      const data = response.map(d => [Number(d.lng), Number(d.lat)])
      render(<App data={data} />, container)
    }
  })
}
