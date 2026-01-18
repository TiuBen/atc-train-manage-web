export function drawGrid(ctx, mapSetting) {
    const { canvasWidth, canvasHeight, originX = 700, originY = 350, minX, maxX, minY, maxY, worldToScreen } = mapSetting;
    ctx.save();
    ctx.translate(0.5, 0.5);

    ctx.strokeStyle = "rgba(0,0,0,0.05)";
    ctx.lineWidth = 0.5;

    const GRID_SIZE = 200; // ★ 每一格 100px
    const half = GRID_SIZE / 2;

    /* ================= 垂直线 ================= */

    // 向右
    for (let x = originX + half; x <= canvasWidth; x += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }

    // 向左
    for (let x = originX - half; x >= 0; x -= GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(x, 0);
        ctx.lineTo(x, canvasHeight);
        ctx.stroke();
    }

    /* ================= 水平线 ================= */

    // 向下
    for (let y = originY + half; y <= canvasHeight; y += GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }

    // 向上
    for (let y = originY - half; y >= 0; y -= GRID_SIZE) {
        ctx.beginPath();
        ctx.moveTo(0, y);
        ctx.lineTo(canvasWidth, y);
        ctx.stroke();
    }
    ctx.restore();
}
