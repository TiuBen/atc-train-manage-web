import { createGPSToScreen } from "../projection/geoProject.js";
import { mapSetting } from "../config/mapSetting.js";

const pointConverter = createGPSToScreen(mapSetting);
export function drawPoints(ctx, points) {
    ctx.save();

    ctx.fillStyle = "#4dabf7";

    points.forEach((p) => {
        const s = pointConverter(p.lat, p.lon);
        ctx.beginPath();
        ctx.arc(s.x, s.y, 4, 0, Math.PI * 2);
        ctx.fill();
    });
    ctx.restore();
}
