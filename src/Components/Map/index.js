import React, {useState,  useEffect, createContext } from 'react';
import DeckGL, {
    MapController,
    //globviewを読み込む(まだexperimentalなのでアンダーバーがついています)
    _GlobeView as GlobeView
} from "deck.gl";


import { renderLayers } from "./RenderLayers";


// 背景マップに使用するMapboxのトークン設定
const MAPBOX_ACCESS_TOKEN = process.env.MAPBOX_ACCESS_TOKEN;

// 初期ビューポートの設定
const INITIAL_VIEW_STATE = {
    bearing: 0,
    latitude: 0,
    longitude: 0,
    pitch: 0,
    zoom: 1.2
};

const VIDEO_URL = "video/world.mp4";

export const CtxLayerStatus = createContext();

function Map() {
    const [viwState, setViewState] = useState(INITIAL_VIEW_STATE);
    const [video, setVideo] = useState(null);

    useEffect(() => {
        let videoEl;
        /* global document */
        if (typeof document !== 'undefined') {
            videoEl = document.createElement('video');
            videoEl.crossOrigin = 'anonymous';
            videoEl.preload = 'auto';
            videoEl.muted = true;
            videoEl.autoplay = true;
            videoEl.loop = true;

            const source = document.createElement('source');
            source.src = VIDEO_URL;
            videoEl.append(source);    
            setVideo(videoEl);

            videoEl.addEventListener("loadeddata", function () {
                videoEl.play();
            });                    
        }
        //return () => videoEl && videoEl.pause();
    }, []);


    return (
        <div>
            <DeckGL
                views={
                    //GlobeViewを適用する
                    new GlobeView()
                }
                initialViewState={viwState}
                controller={true}
                layers={renderLayers({ video})}
                _animate={true}
            >
            </DeckGL>
        </div>
    );
}

export default Map;