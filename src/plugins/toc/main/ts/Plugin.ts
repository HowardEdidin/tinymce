/**
 * Plugin.js
 *
 * Released under LGPL License.
 * Copyright (c) 1999-2017 Ephox Corp. All rights reserved
 *
 * License: http://www.tinymce.com/license
 * Contributing: http://www.tinymce.com/contributing
 */

import PluginManager from 'tinymce/core/PluginManager';
import Commands from './api/Commands';
import Settings from './api/Settings';
import FilterContent from './core/FilterContent';
import Buttons from './ui/Buttons';

PluginManager.add('toc', function (editor) {
  Commands.register(editor);
  Buttons.register(editor);
  FilterContent.setup(editor);
});

export default function () { };