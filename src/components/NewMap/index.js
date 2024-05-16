import { mergeClasses } from "@/helpers/className";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import { useEffect, useRef } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import { Point, Polygon, SpatialReference } from "@arcgis/core/geometry";
import { UniqueValueRenderer } from "@arcgis/core/renderers";
import sbyGeoJSON from './geojson/sby.json'

const NewMap = (props) => {
  const {
    extendClassname = false,
    overrideClassname = false,
    customClassname,
} = props;
  const mapRef = useRef();

  useEffect(() => {
    if (!mapRef?.current) return;

    const centerPoint = new Point({
      x: 112.79475362523111,
      y: -7.282367554399435,
      spatialReference: {
          wkid: 4326
      }
    });

    const myMap = new Map({
      basemap: "streets-navigation-vector"
    });

    const view = new MapView({
      map: myMap,
      container: mapRef.current,
      zoom: 10,
      constraints: {
        minZoom: 2,
      },
      center: webMercatorUtils.geographicToWebMercator(centerPoint),
    });

    const graphics = sbyGeoJSON.features.map(feature => {
      console.log(feature.properties.NAMOBJ);
      const geometry = new Polygon({
        rings: feature.geometry.coordinates,
        spatialReference: new SpatialReference({ wkid: 4326 })
      });

      const graphic = new Graphic({
        geometry: geometry,
        attributes: feature.properties
      });

      return graphic;
    });

    const renderer = new UniqueValueRenderer({
      field: "NAMOBJ",
      defaultSymbol: {
          type: "simple-fill",
          color: [128, 128, 128, 1],
          outline: {
              color: [255, 255, 255, 0.8],
              width: 2
          }
      }
  });

  const featureLayer = new FeatureLayer({
    source: graphics,
    fields: [],
    geometryType: "polygon",
    objectIdField: "ID",
    spatialReference: { wkid: 4326 },
    renderer: renderer
});
// const uniqueValueInfo = renderer.getUniqueValueInfo("Kecamatan A");
// sbyGeoJSON.features.forEach(feature => {
//   if (feature.properties && feature.properties.NAMOBJ) {
//       // Akses properti NAMOBJ di sini
//       console.log(feature.properties.NAMOBJ);
//   } else {
//       console.log("Properti NAMOBJ tidak tersedia untuk fitur ini.");
//   }
// });
    myMap.add(featureLayer);
    return () => view && view.destroy();
  }, []);

  return (
    <div ref={mapRef} className={mergeClasses('new-map w-full h-full')} />
  )
}

export default NewMap;