#NYC Complaint Heatmap

This is a project visualising [NYC complaint data](https://data.cityofnewyork.us/Public-Safety/NYPD-Complaint-Data-Historic/qgea-i56i) using the 3DHeatmap example on [deck.gl](http://deck.gl) website. The data has been stripped down to the latitude and longitude columns only to reduce its file size.

### Usage
- Install Package
```
npm install
```

- Add your [Mapbox access token](https://www.mapbox.com/help/define-access-token/) by adding a `creds.js` file containing

```
module.exports = {
  mapboxToken: '{YOUR_MAPBOX_TOKEN}'
};
```

- Start the app by running
```
npm start
```
