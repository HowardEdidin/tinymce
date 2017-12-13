import { Arr } from '@ephox/katamari';
import { Fun } from '@ephox/katamari';
import { Element } from '@ephox/sugar';
import { Traverse } from '@ephox/sugar';
import { Awareness } from '@ephox/sugar';
import { Selection } from '@ephox/sugar';
import { WindowSelection } from '@ephox/sugar';

var COLLAPSED_WIDTH = 2;

var collapsedRect = function (rect) {
  return {
    left: rect.left,
    top: rect.top,
    right: rect.right,
    bottom: rect.bottom,
    width: Fun.constant(COLLAPSED_WIDTH),
    height: rect.height
  };
};

var toRect = function (rawRect) {
  return {
    left: Fun.constant(rawRect.left),
    top: Fun.constant(rawRect.top),
    right: Fun.constant(rawRect.right),
    bottom: Fun.constant(rawRect.bottom),
    width: Fun.constant(rawRect.width),
    height: Fun.constant(rawRect.height)
  };
};

var getRectsFromRange = function (range) {
  if (! range.collapsed) {
    return Arr.map(range.getClientRects(), toRect);
  } else {
    var start = Element.fromDom(range.startContainer);
    return Traverse.parent(start).bind(function (parent) {
      var selection = Selection.exact(start, range.startOffset, parent, Awareness.getEnd(parent));
      var optRect = WindowSelection.getFirstRect(range.startContainer.ownerDocument.defaultView, selection);
      return optRect.map(collapsedRect).map(Arr.pure);
    }).getOr([ ]);
  }
};

var getRectangles = function (cWin) {
  var sel = cWin.getSelection();
  // In the Android WebView for some reason cWin.getSelection returns undefined.
  // The undefined check it is to avoid throwing of a JS error.
  return sel !== undefined && sel.rangeCount > 0 ? getRectsFromRange(sel.getRangeAt(0)) : [ ];
};

export default <any> {
  getRectangles: getRectangles
};