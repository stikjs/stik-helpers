var jsdom = require("jsdom").jsdom;
GLOBAL.document = jsdom("<html><head></head><body></body></html>");
GLOBAL.window = document.parentWindow;

require("stik-core.js");
require("../src/helpers");
require("../src/utils");
require("stik-labs.js");
