// Adjust these two values (optional)
var labelFont = 25;
var trackHeight = 30;

function adjustTrackHeight(trackHeight) {
	var elems = document.getElementsByClassName("track rect-track");
	for (var i = 0; i < elems.length; i++) {
		elems[i].style.cssText += "height: " + trackHeight + "px;";
	}
}

adjustTrackHeight(trackHeight);

// Obtained from tracing.js
tr.ui.b.drawLabels = function(ctx, dt, viewLWorld, viewRWorld, slices, async, fontSize, yOffset) {
    const elidedTitleCache = new tr.ui.b.ElidedTitleCache();
    const ColorScheme = tr.b.ColorScheme;
    const colorsAsStrings = ColorScheme.colorsAsStrings;
    const EventPresenter = tr.ui.b.EventPresenter;
    const blackColorId = ColorScheme.getColorIdForReservedName('black');
    const THIN_SLICE_HEIGHT = 4;
    const SLICE_WAITING_WIDTH_DRAW_THRESHOLD = 3;
    const SLICE_ACTIVE_WIDTH_DRAW_THRESHOLD = 1;
    const SHOULD_ELIDE_TEXT = true;
    const pixelRatio = window.devicePixelRatio || 1;
    const pixWidth = dt.xViewVectorToWorld(1);
    ctx.save();
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    //ctx.font = (fontSize * pixelRatio) + 'px sans-serif';
    ctx.font = labelFont + 'px sans-serif';
    if (async) {
        ctx.font = 'italic ' + ctx.font;
    }
    const cY = yOffset * pixelRatio;
    const lowSlice = tr.b.findLowIndexInSortedArray(slices, function(slice) {
        return slice.start + slice.duration;
    }, viewLWorld);
    const quickDiscardThreshold = pixWidth * 20;
    for (let i = lowSlice; i < slices.length; ++i) {
        const slice = slices[i];
        if (slice.start > viewRWorld)
            break;
        if (slice.duration <= quickDiscardThreshold)
            continue;
        const xLeftClipped = Math.max(slice.start, viewLWorld);
        const xRightClipped = Math.min(slice.start + slice.duration, viewRWorld);
        const visibleWidth = xRightClipped - xLeftClipped;
        const title = slice.title + (slice.didNotFinish ? ' (Did Not Finish)' : '');
        let drawnTitle = title;
        let drawnWidth = elidedTitleCache.labelWidth(ctx, drawnTitle);
        const fullLabelWidth = elidedTitleCache.labelWidthWorld(ctx, drawnTitle, pixWidth);
        if (SHOULD_ELIDE_TEXT && fullLabelWidth > visibleWidth) {
            const elidedValues = elidedTitleCache.get(ctx, pixWidth, drawnTitle, drawnWidth, visibleWidth);
            drawnTitle = elidedValues.string;
            drawnWidth = elidedValues.width;
        }
        if (drawnWidth * pixWidth < visibleWidth) {
            ctx.fillStyle = EventPresenter.getTextColor(slice);
            const cX = dt.xWorldToView((xLeftClipped + xRightClipped) / 2);
            ctx.fillText(drawnTitle, cX, cY, drawnWidth);
        }
    }
    ctx.restore();
}
