import { mapSetting } from "./config/mapSetting.js";
import { points } from "./data/points.js";

import { createGridScale } from "./projection/gridScale.js";
import { projectGeo } from "./projection/geoProject.js";

import { createViewport } from "./utils/viewport.js";

import { drawGrid } from "./render/gridRenderer.js";
import { drawPoints } from "./render/pointRenderer.js";
import { renderAll } from "./render/renderPipeline.js";

import { bindResize } from "./canvasControl/resize.js";
import { startLoop } from "./canvasControl/animationLoop.js";

/* ========== canvas ========== */

const canvas = document.getElementById("map");
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const ctx = canvas.getContext("2d");

/* ========== scale & center ========== */
const scale = createGridScale(mapSetting);
const centerGeo = {
    lat: mapSetting.centerLat,
    lon: mapSetting.centerLon,
};

/* ========== viewport ========== */
const viewport = createViewport();
viewport.centerX = 0;
viewport.centerY = 0;

/* ========== project data ========== */
const pointsWorld = points.map((p) => ({
    id: p.id,
    ...projectGeo(p.lat, p.lon, centerGeo, scale),
}));

const GRID_DEGREE_STEP = 0.1; // 每 0.1°

/* ========== render ========== */
function render() {
    // renderAll(ctx, viewport, [
    //     () => drawGrid(ctx, viewport, GRID_DEGREE_STEP * scale.worldPerDegree),
    //     () => drawPoints(ctx, pointsWorld, viewport),
    // ]);
    drawGrid(
        ctx,
        { canvasWidth: canvas.width, canvasHeight: canvas.height },
        viewport,
        GRID_DEGREE_STEP * scale.worldPerDegree
    );
}

/* ========== init ========== */
bindResize(canvas, viewport, scale.worldPerDegree, render);
startLoop(render);
