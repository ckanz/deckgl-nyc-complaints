import React from 'react'
import DeckGL from '@deck.gl/react'
import { render } from 'react-dom'
import { StaticMap } from 'react-map-gl'
import { HexagonLayer } from '@deck.gl/aggregation-layers'
import { AmbientLight, PointLight, LightingEffect } from '@deck.gl/core'
import { csv } from 'd3-request'
import { mapboxToken } from './creds.js'
import csvFile from './data/nyc-complaint-data.csv'

const INITIAL_VIEW_STATE = {
  longitude: -74.0,
  latitude: 40.68,
  zoom: 10.5,
  minZoom: 5,
  maxZoom: 15,
  pitch: 50,
  bearing: 0
}

const lightingEffect = new LightingEffect({
  ambientLight: new AmbientLight(),
  pointLight1: new PointLight()
})

const material = {
  ambient: 0.64,
  diffuse: 0.6,
  shininess: 32,
  specularColor: [51, 51, 51]
}

const colorRange = [
  [200, 200, 200],
  [200, 150, 150],
  [200, 100, 100],
  [200, 50, 50],
  [200, 0, 0]
]

export const renderToDOM = container => {
  csv(csvFile, (error, data) => {
    if (error) {
      console.error(error)
      return
    }
    render(
      <DeckGL
        layers={[new HexagonLayer({
          id: 'heatmap',
          colorDomain: [0, 1600],
          elevationScale: 50,
          extruded: true,
          getPosition: d => [Number(d.lng), Number(d.lat)],
          radius: 25,
          data,
          colorRange,
          material
        })]}
        effects={[lightingEffect]}
        initialViewState={INITIAL_VIEW_STATE}
        controller
      >
        <StaticMap
          reuseMaps
          mapStyle='mapbox://styles/mapbox/dark-v10'
          mapboxApiAccessToken={mapboxToken}
          preventStyleDiffing
        />
      </DeckGL>, container)
  })
}
