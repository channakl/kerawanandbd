import { mergeClasses } from "@/helpers/className";
import Map from "@arcgis/core/Map.js";
import MapView from "@arcgis/core/views/MapView.js";
import { useEffect, useRef } from "react";
import FeatureLayer from "@arcgis/core/layers/FeatureLayer.js";
import Graphic from "@arcgis/core/Graphic.js";
import * as webMercatorUtils from "@arcgis/core/geometry/support/webMercatorUtils.js";
import { Point, Polygon, SpatialReference } from "@arcgis/core/geometry";
import { UniqueValueRenderer, SimpleRenderer } from "@arcgis/core/renderers";
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
  console.log(sbyGeoJSON)

  const graphics = sbyGeoJSON.features.map(feature => {
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

const featureLayer = new FeatureLayer({
    source: graphics,
    // fields: ["NAMOBJ"],
    geometryType: "polygon",
    objectIdField: "ID",
    spatialReference: { wkid: 4326 },
});

  myMap.add(featureLayer);
    return () => view && view.destroy();
  }, []);

  return (
    <div ref={mapRef} className={mergeClasses('new-map w-full h-full')} />
  )
}

export default NewMap;