# chrome-tracing-font

Adjust the font and track height in chrome tracing.

Chrome tracing `chrome://tracing` is an amazing tool to visualize timeline
(performance) information. It is used by Javascript developers, all
major Deep Learning frameworks e.g. TensorFlow, PyTorch, MXNet etc.

However, the font size in the tool is notoriously small (10 pt) which puts
a lot of strain on the eyes. Browser scaling does not really help because 
the labels are actually inside a HTML `canvas` element and not part of the
DOM.

The javascipt code in `adjust_font_height.js` allows you to adjust the
font of the labels and the height of the tracks. A track is a row of
colored rectangles.

## Instructions
- Load a trace in `chrome://tracing`.
- Open Developer tools using `Shift`+`Ctrl`+`I` or `F12`.
- Go to the Console tab.
- Paste the code in `adjust_font_height.js`.

Optionally, adjust the font and track height before pasting.

## Result
[Before][./before.png] [After][./after.png]

## Known Issues
The code does not play nice when tracks are collapsed/expanded. Solutions
are welcome.
