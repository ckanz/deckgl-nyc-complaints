# NYC Complaint Heatmap

This is a project visualising NYC complaint data using the 3DHeatmap example
on [deck.gl](http://deck.gl) website.

### Usage
- Install Package
```
npm install
```

- Unzip the `data.zip` folder.

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
