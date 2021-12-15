import {
  TileLayer,
  BitmapLayer,
  SimpleMeshLayer,
  COORDINATE_SYSTEM //ビルトインされている座標系を読み込み
} from "deck.gl";

import { SphereGeometry } from '@luma.gl/core';
import { Texture2D } from '@luma.gl/webgl';

const sphereMesh = new SphereGeometry({
  radius: 6.3e6,
  nlat: 32,
  nlong: 60
});




export function renderLayers({video}) {


  const layer = new SimpleMeshLayer({
    id: 'spheres',
    data: [0],
    coordinateSystem: COORDINATE_SYSTEM.CARTESIAN,
    mesh: sphereMesh,
    texture: { data: video,},
    getPosition: [0, 0, 0],
    getColor: [128, 0, 0],
    getOrientation:[0, 0, 270],
    material:{
      ambient: 0.35,
      diffuse: 0.6,
      shininess: 12,
      specularColor: [30, 30, 30]
    }
  })

  return [layer];
}
