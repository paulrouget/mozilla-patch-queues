# HG changeset patch
# Parent f68b0f7d24a861f0dacc35a03b3f822b7e59a2cb
Bug 765573 - (devtools.jsm) Implement devtools.jsm

diff --git a/browser/base/content/browser-appmenu.inc b/browser/base/content/browser-appmenu.inc
--- a/browser/base/content/browser-appmenu.inc
+++ b/browser/base/content/browser-appmenu.inc
@@ -155,22 +155,16 @@
                     command="Tools:WebConsole"
                     key="key_webConsole"/>
           <menuitem id="appmenu_pageInspect"
                     hidden="true"
                     label="&inspectMenu.label;"
                     type="checkbox"
                     command="Tools:Inspect"
                     key="key_inspect"/>
-          <menuitem id="appmenu_responsiveUI"
-                    hidden="true"
-                    label="&responsiveDesignTool.label;"
-                    type="checkbox"
-                    command="Tools:ResponsiveUI"
-                    key="key_responsiveUI"/>
           <menuitem id="appmenu_debugger"
                     hidden="true"
                     type="checkbox"
                     label="&debuggerMenu.label2;"
                     key="key_debugger"
                     command="Tools:Debugger"/>
           <menuitem id="appmenu_remoteDebugger"
                     hidden="true"
@@ -180,22 +174,16 @@
                     hidden="true"
                     label="&chromeDebuggerMenu.label;"
                     command="Tools:ChromeDebugger"/>
           <menuitem id="appmenu_scratchpad"
                     hidden="true"
                     label="&scratchpad.label;"
                     key="key_scratchpad"
                     command="Tools:Scratchpad"/>
-          <menuitem id="appmenu_styleeditor"
-                    hidden="true"
-                    type="checkbox"
-                    label="&styleeditor.label;"
-                    key="key_styleeditor"
-                    command="Tools:StyleEditor"/>
           <menuitem id="appmenu_pageSource"
                     label="&viewPageSourceCmd.label;"
                     command="View:PageSource"
                     key="key_viewSource"/>
           <menuitem id="appmenu_errorConsole"
                     hidden="true"
                     label="&errorConsoleCmd.label;"
                     key="key_errorConsole"
diff --git a/browser/base/content/browser-menubar.inc b/browser/base/content/browser-menubar.inc
--- a/browser/base/content/browser-menubar.inc
+++ b/browser/base/content/browser-menubar.inc
@@ -530,23 +530,16 @@
                             command="Tools:WebConsole"/>
                   <menuitem id="menu_pageinspect"
                             type="checkbox"
                             hidden="true"
                             label="&inspectMenu.label;"
                             accesskey="&inspectMenu.accesskey;"
                             key="key_inspect"
                             command="Tools:Inspect"/>
-                  <menuitem id="menu_responsiveUI"
-                            type="checkbox"
-                            hidden="true"
-                            label="&responsiveDesignTool.label;"
-                            accesskey="&responsiveDesignTool.accesskey;"
-                            key="key_responsiveUI"
-                            command="Tools:ResponsiveUI"/>
                   <menuitem id="menu_debugger"
                             hidden="true"
                             type="checkbox"
                             label="&debuggerMenu.label2;"
                             key="key_debugger"
                             command="Tools:Debugger"/>
                   <menuitem id="menu_remoteDebugger"
                             hidden="true"
@@ -557,23 +550,16 @@
                             label="&chromeDebuggerMenu.label;"
                             command="Tools:ChromeDebugger"/>
                   <menuitem id="menu_scratchpad"
                             hidden="true"
                             label="&scratchpad.label;"
                             accesskey="&scratchpad.accesskey;"
                             key="key_scratchpad"
                             command="Tools:Scratchpad"/>
-                  <menuitem id="menu_styleeditor"
-                            type="checkbox"
-                            hidden="true"
-                            label="&styleeditor.label;"
-                            accesskey="&styleeditor.accesskey;"
-                            key="key_styleeditor"
-                            command="Tools:StyleEditor"/>
                   <menuitem id="menu_pageSource"
                             accesskey="&pageSourceCmd.accesskey;"
                             label="&pageSourceCmd.label;"
                             key="key_viewSource"
                             command="View:PageSource"/>
                   <menuitem id="javascriptConsole"
                             hidden="true"
                             label="&errorConsoleCmd.label;"
diff --git a/browser/base/content/browser-sets.inc b/browser/base/content/browser-sets.inc
--- a/browser/base/content/browser-sets.inc
+++ b/browser/base/content/browser-sets.inc
@@ -90,18 +90,16 @@
     <command id="Tools:Downloads" oncommand="BrowserDownloadsUI();"/>
     <command id="Tools:DevToolbar" oncommand="DeveloperToolbar.toggle();" disabled="true"/>
     <command id="Tools:WebConsole" oncommand="HUDConsoleUI.toggleHUD();"/>
     <command id="Tools:Inspect" oncommand="InspectorUI.toggleInspectorUI();" disabled="true"/>
     <command id="Tools:Debugger" oncommand="DebuggerUI.toggleDebugger();" disabled="true"/>
     <command id="Tools:RemoteDebugger" oncommand="DebuggerUI.toggleRemoteDebugger();" disabled="true"/>
     <command id="Tools:ChromeDebugger" oncommand="DebuggerUI.toggleChromeDebugger();" disabled="true"/>
     <command id="Tools:Scratchpad" oncommand="Scratchpad.openScratchpad();" disabled="true"/>
-    <command id="Tools:StyleEditor" oncommand="StyleEditor.toggle();" disabled="true"/>
-    <command id="Tools:ResponsiveUI" oncommand="ResponsiveUI.toggle();" disabled="true"/>
     <command id="Tools:Addons" oncommand="BrowserOpenAddonsMgr();"/>
     <command id="Tools:Sanitize"
      oncommand="Cc['@mozilla.org/browser/browserglue;1'].getService(Ci.nsIBrowserGlue).sanitize(window);"/>
     <command id="Tools:PrivateBrowsing" oncommand="gPrivateBrowsingUI.toggleMode();"/>
     <command id="History:UndoCloseTab" oncommand="undoCloseTab();"/>
     <command id="History:UndoCloseWindow" oncommand="undoCloseWindow();"/>
     <command id="Browser:ToggleAddonBar" oncommand="toggleAddonBar();"/>
   </commandset>
@@ -248,27 +246,18 @@
     />
     <key id="key_inspect" key="&inspectMenu.commandkey;" command="Inspector:Inspect"
 #ifdef XP_MACOSX
         modifiers="accel,alt"
 #else
         modifiers="accel,shift"
 #endif
     />
-    <key id="key_responsiveUI" key="&responsiveDesignTool.commandkey;" command="Tools:ResponsiveUI"
-#ifdef XP_MACOSX
-        modifiers="accel,alt"
-#else
-        modifiers="accel,shift"
-#endif
-    />
     <key id="key_scratchpad" keycode="&scratchpad.keycode;" modifiers="shift"
          keytext="&scratchpad.keytext;" command="Tools:Scratchpad"/>
-    <key id="key_styleeditor" keycode="&styleeditor.keycode;" modifiers="shift"
-         keytext="&styleeditor.keytext;" command="Tools:StyleEditor"/>
     <key id="openFileKb" key="&openFileCmd.commandkey;" command="Browser:OpenFile"  modifiers="accel"/>
     <key id="key_savePage" key="&savePageCmd.commandkey;" command="Browser:SavePage" modifiers="accel"/>
     <key id="printKb" key="&printCmd.commandkey;" command="cmd_print"  modifiers="accel"/>
     <key id="key_close" key="&closeCmd.key;" command="cmd_close" modifiers="accel"/>
     <key id="key_closeWindow" key="&closeCmd.key;" command="cmd_closeWindow" modifiers="accel,shift"/>
     <key id="key_undo"
          key="&undoCmd.key;"
          modifiers="accel"/>
diff --git a/browser/base/content/browser.js b/browser/base/content/browser.js
--- a/browser/base/content/browser.js
+++ b/browser/base/content/browser.js
@@ -105,16 +105,22 @@ XPCOMUtils.defineLazyGetter(this, "Popup
     return new tmp.PopupNotifications(gBrowser,
                                       document.getElementById("notification-popup"),
                                       document.getElementById("notification-popup-box"));
   } catch (ex) {
     Cu.reportError(ex);
   }
 });
 
+XPCOMUtils.defineLazyGetter(this, "gDevTools", function() {
+  let tmp = {};
+  Cu.import("resource:///modules/devtools/devtools.jsm", tmp);
+  return tmp.gDevTools;
+});
+
 XPCOMUtils.defineLazyGetter(this, "DeveloperToolbar", function() {
   let tmp = {};
   Cu.import("resource:///modules/devtools/DeveloperToolbar.jsm", tmp);
   return new tmp.DeveloperToolbar(window, document.getElementById("developer-toolbar"));
 });
 
 XPCOMUtils.defineLazyGetter(this, "InspectorUI", function() {
   let tmp = {};
@@ -1520,45 +1526,26 @@ function delayedStartup(isLoadingBlank, 
   if (scratchpadEnabled) {
     document.getElementById("menu_scratchpad").hidden = false;
     document.getElementById("Tools:Scratchpad").removeAttribute("disabled");
 #ifdef MENUBAR_CAN_AUTOHIDE
     document.getElementById("appmenu_scratchpad").hidden = false;
 #endif
   }
 
-  // Enable Style Editor?
-  let styleEditorEnabled = gPrefService.getBoolPref(StyleEditor.prefEnabledName);
-  if (styleEditorEnabled) {
-    document.getElementById("menu_styleeditor").hidden = false;
-    document.getElementById("Tools:StyleEditor").removeAttribute("disabled");
-#ifdef MENUBAR_CAN_AUTOHIDE
-    document.getElementById("appmenu_styleeditor").hidden = false;
-#endif
-    document.getElementById("developer-toolbar-styleeditor").hidden = false;
-  }
-
 #ifdef MENUBAR_CAN_AUTOHIDE
   // If the user (or the locale) hasn't enabled the top-level "Character
   // Encoding" menu via the "browser.menu.showCharacterEncoding" preference,
   // hide it.
   if ("true" != gPrefService.getComplexValue("browser.menu.showCharacterEncoding",
                                              Ci.nsIPrefLocalizedString).data)
     document.getElementById("appmenu_charsetMenu").hidden = true;
 #endif
 
-  // Enable Responsive UI?
-  let responsiveUIEnabled = gPrefService.getBoolPref("devtools.responsiveUI.enabled");
-  if (responsiveUIEnabled) {
-    document.getElementById("menu_responsiveUI").hidden = false;
-    document.getElementById("Tools:ResponsiveUI").removeAttribute("disabled");
-#ifdef MENUBAR_CAN_AUTOHIDE
-    document.getElementById("appmenu_responsiveUI").hidden = false;
-#endif
-  }
+  gDevTools.newBrowserWindow(window);
 
   let appMenuButton = document.getElementById("appmenu-button");
   let appMenuPopup = document.getElementById("appmenu-popup");
   if (appMenuButton && appMenuPopup) {
     let appMenuOpening = null;
     appMenuButton.addEventListener("mousedown", function(event) {
       if (event.button == 0)
         appMenuOpening = new Date();
@@ -7373,63 +7360,16 @@ var Scratchpad = {
 };
 
 XPCOMUtils.defineLazyGetter(Scratchpad, "ScratchpadManager", function() {
   let tmp = {};
   Cu.import("resource:///modules/devtools/scratchpad-manager.jsm", tmp);
   return tmp.ScratchpadManager;
 });
 
-var ResponsiveUI = {
-  toggle: function RUI_toggle() {
-    this.ResponsiveUIManager.toggle(window, gBrowser.selectedTab);
-  }
-};
-
-XPCOMUtils.defineLazyGetter(ResponsiveUI, "ResponsiveUIManager", function() {
-  let tmp = {};
-  Cu.import("resource:///modules/devtools/responsivedesign.jsm", tmp);
-  return tmp.ResponsiveUIManager;
-});
-
-var StyleEditor = {
-  prefEnabledName: "devtools.styleeditor.enabled",
-  /**
-   * Opens the style editor. If the UI is already open, it will be focused.
-   *
-   * @param {CSSStyleSheet} [aSelectedStyleSheet] default Stylesheet.
-   * @param {Number} [aLine] Line to which the caret should be moved (one-indexed).
-   * @param {Number} [aCol] Column to which the caret should be moved (one-indexed).
-   */
-  openChrome: function SE_openChrome(aSelectedStyleSheet, aLine, aCol)
-  {
-    let contentWindow = gBrowser.selectedBrowser.contentWindow;
-    let win = this.StyleEditorManager.getEditorForWindow(contentWindow);
-    if (win) {
-      this.StyleEditorManager.selectEditor(win);
-    } else {
-      this.StyleEditorManager.newEditor(contentWindow,
-                                        aSelectedStyleSheet, aLine, aCol);
-    }
-  },
-
-  toggle: function SE_toggle()
-  {
-    let contentWindow = gBrowser.selectedBrowser.contentWindow;
-    this.StyleEditorManager.toggleEditor(contentWindow);
-  }
-};
-
-XPCOMUtils.defineLazyGetter(StyleEditor, "StyleEditorManager", function() {
-  let tmp = {};
-  Cu.import("resource:///modules/devtools/StyleEditor.jsm", tmp);
-  return new tmp.StyleEditorManager(window);
-});
-
-
 XPCOMUtils.defineLazyGetter(window, "gShowPageResizers", function () {
 #ifdef XP_WIN
   // Only show resizers on Windows 2000 and XP
   let sysInfo = Components.classes["@mozilla.org/system-info;1"]
                           .getService(Components.interfaces.nsIPropertyBag2);
   return parseFloat(sysInfo.getProperty("version")) < 6;
 #else
   return false;
diff --git a/browser/base/content/browser.xul b/browser/base/content/browser.xul
--- a/browser/base/content/browser.xul
+++ b/browser/base/content/browser.xul
@@ -1038,21 +1038,16 @@
                          label="&webConsoleButton.label;"
                          class="devtools-toolbarbutton"
                          command="Tools:WebConsole"/>
           <toolbarbutton id="developer-toolbar-inspector"
                          label="&inspectorButton.label;"
                          class="devtools-toolbarbutton"
                          hidden="true"
                          command="Tools:Inspect"/>
-          <toolbarbutton id="developer-toolbar-styleeditor"
-                         label="&styleeditor.label;"
-                         class="devtools-toolbarbutton"
-                         hidden="true"
-                         command="Tools:StyleEditor"/>
           <toolbarbutton id="developer-toolbar-debugger"
                          label="&scriptsButton.label;"
                          class="devtools-toolbarbutton"
                          hidden="true"
                          command="Tools:Debugger"/>
 #ifndef XP_MACOSX
           <toolbarbutton id="developer-toolbar-closebutton"
                          class="devtools-closebutton"
diff --git a/browser/devtools/commandline/GcliCommands.jsm b/browser/devtools/commandline/GcliCommands.jsm
--- a/browser/devtools/commandline/GcliCommands.jsm
+++ b/browser/devtools/commandline/GcliCommands.jsm
@@ -17,16 +17,21 @@ XPCOMUtils.defineLazyGetter(this, "Servi
   Cu.import("resource://gre/modules/Services.jsm", obj);
   return obj.Services;
 });
 XPCOMUtils.defineLazyGetter(this, "LayoutHelpers", function () {
   var obj = {};
   Cu.import("resource:///modules/devtools/LayoutHelpers.jsm", obj);
   return obj.LayoutHelpers;
 });
+XPCOMUtils.defineLazyGetter(this, "StyleEditorManager", function () {
+  var obj = {};
+  Cu.import("resource:///modules/devtools/StyleEditor.jsm", obj);
+  return obj.StyleEditorManager;
+});
 
 
 /**
  * 'echo' command
  */
 gcli.addCommand({
   name: "echo",
   description: gcli.lookup("echoDesc"),
@@ -267,17 +272,18 @@ gcli.addCommand({
          min: 1,
          step: 10
        },
        description: gcli.lookup("editLineToJumpToDesc")
      }
    ],
    exec: function(args, context) {
      let win = HUDService.currentContext();
-     win.StyleEditor.openChrome(args.resource.element, args.line);
+     // FIXME
+     //StyleEditorManager.newEditor(args.resource.element, args.line);
    }
 });
 
 /**
  * 'break' command
  */
 gcli.addCommand({
   name: "break",
diff --git a/browser/devtools/responsivedesign/responsivedesign.jsm b/browser/devtools/responsivedesign/responsivedesign.jsm
--- a/browser/devtools/responsivedesign/responsivedesign.jsm
+++ b/browser/devtools/responsivedesign/responsivedesign.jsm
@@ -3,44 +3,27 @@
 /* This Source Code Form is subject to the terms of the Mozilla Public
  * License, v. 2.0. If a copy of the MPL was not distributed with this
  * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
 
 const Ci = Components.interfaces;
 const Cu = Components.utils;
 
 Cu.import("resource://gre/modules/Services.jsm");
+Cu.import("resource:///modules/devtools/devtools.jsm");
 Cu.import("resource://gre/modules/XPCOMUtils.jsm");
 
-var EXPORTED_SYMBOLS = ["ResponsiveUIManager"];
+var EXPORTED_SYMBOLS = ["ResponsiveUI"];
 
 const MIN_WIDTH = 50;
 const MIN_HEIGHT = 50;
 
 const MAX_WIDTH = 10000;
 const MAX_HEIGHT = 10000;
 
-let ResponsiveUIManager = {
-  /**
-   * Check if the a tab is in a responsive mode.
-   * Leave the responsive mode if active,
-   * active the responsive mode if not active.
-   *
-   * @param aWindow the main window.
-   * @param aTab the tab targeted.
-   */
-  toggle: function(aWindow, aTab) {
-    if (aTab.responsiveUI) {
-      aTab.responsiveUI.close();
-    } else {
-      aTab.responsiveUI = new ResponsiveUI(aWindow, aTab);
-    }
-  },
-}
-
 let presets = [
   // Phones
   {key: "320x480", width: 320, height: 480},    // iPhone, B2G, with <meta viewport>
   {key: "360x640", width: 360, height: 640},    // Android 4, phones, with <meta viewport>
 
   // Tablets
   {key: "768x1024", width: 768, height: 1024},   // iPad, with <meta viewport>
   {key: "800x1280", width: 800, height: 1280},   // Android 4, Tablet, with <meta viewport>
@@ -102,30 +85,31 @@ function ResponsiveUI(aWindow, aTab)
 
   // Let's bind some callbacks.
   this.bound_presetSelected = this.presetSelected.bind(this);
   this.bound_rotate = this.rotate.bind(this);
   this.bound_startResizing = this.startResizing.bind(this);
   this.bound_stopResizing = this.stopResizing.bind(this);
   this.bound_onDrag = this.onDrag.bind(this);
   this.bound_onKeypress = this.onKeypress.bind(this);
+  this.bound_close = this.close.bind(this);
 
   // Events
-  this.tab.addEventListener("TabClose", this);
-  this.tab.addEventListener("TabAttrModified", this);
+  this.tab.addEventListener("TabClose", this.bound_close);
   this.mainWindow.addEventListener("keypress", this.bound_onKeypress, true);
 
   this.buildUI();
-  this.checkMenus();
 
   try {
     if (Services.prefs.getBoolPref("devtools.responsiveUI.rotate")) {
       this.rotate();
     }
   } catch(e) {}
+
+  gDevTools.onOpen(this.tab, this, "ResponsiveDesign");
 }
 
 ResponsiveUI.prototype = {
   _transitionsEnabled: true,
   get transitionsEnabled() this._transitionsEnabled,
   set transitionsEnabled(aValue) {
     this._transitionsEnabled = aValue;
     if (aValue && !this._resizing && this.stack.hasAttribute("responsivemode")) {
@@ -134,46 +118,44 @@ ResponsiveUI.prototype = {
       this.stack.setAttribute("notransition", "true");
     }
   },
 
   /**
    * Destroy the nodes. Remove listeners. Reset the style.
    */
   close: function RUI_unload() {
-    this.unCheckMenus();
     // Reset style of the stack.
     let style = "max-width: none;" +
                 "min-width: 0;" +
                 "max-height: none;" +
                 "min-height: 0;";
     this.stack.setAttribute("style", style);
 
     if (this.isResizing)
       this.stopResizing();
 
     this.saveCurrentPreset();
 
     // Remove listeners.
     this.mainWindow.removeEventListener("keypress", this.bound_onKeypress, true);
     this.menulist.removeEventListener("select", this.bound_presetSelected, true);
-    this.tab.removeEventListener("TabClose", this);
-    this.tab.removeEventListener("TabAttrModified", this);
+    this.tab.removeEventListener("TabClose", this.bound_close);
     this.rotatebutton.removeEventListener("command", this.bound_rotate, true);
 
     // Removed elements.
     this.container.removeChild(this.toolbar);
     this.stack.removeChild(this.resizer);
     this.stack.removeChild(this.resizeBar);
 
     // Unset the responsive mode.
     this.container.removeAttribute("responsivemode");
     this.stack.removeAttribute("responsivemode");
 
-    delete this.tab.responsiveUI;
+    gDevTools.onClose(this.tab, this, "ResponsiveDesign");
   },
 
   /**
    * Retrieve a preset from its key.
    *
    * @param aKey preset's key.
    * @returns the index of the preset, -1 if not found.
    */
@@ -196,48 +178,16 @@ ResponsiveUI.prototype = {
         this.mainWindow.gBrowser.selectedBrowser == this.browser) {
       aEvent.preventDefault();
       aEvent.stopPropagation();
       this.close();
     }
   },
 
   /**
-   * Handle events
-   */
-  handleEvent: function (aEvent) {
-    switch (aEvent.type) {
-      case "TabClose":
-        this.close();
-        break;
-      case "TabAttrModified":
-        if (this.mainWindow.gBrowser.selectedBrowser == this.browser) {
-          this.checkMenus();
-        } else {
-          this.unCheckMenus();
-        }
-        break;
-    }
-  },
-
-  /**
-   * Check the menu items.
-   */
-   checkMenus: function RUI_checkMenus() {
-     this.chromeDoc.getElementById("Tools:ResponsiveUI").setAttribute("checked", "true");
-   },
-
-  /**
-   * Uncheck the menu items.
-   */
-   unCheckMenus: function RUI_unCheckMenus() {
-     this.chromeDoc.getElementById("Tools:ResponsiveUI").setAttribute("checked", "false");
-   },
-
-  /**
    * Build the toolbar and the resizers.
    *
    * <vbox anonid="browserContainer"> From tabbrowser.xml
    *  <toolbar class="devtools-toolbar devtools-responsiveui-toolbar">
    *    <menulist class="devtools-menulist"/> // presets
    *    <toolbarbutton tabindex="0" class="devtools-toolbarbutton" label="rotate"/> // rotate
    *  </toolbar>
    *  <stack anonid="browserStack"> From tabbrowser.xml
diff --git a/browser/devtools/shared/devtools.jsm b/browser/devtools/shared/devtools.jsm
new file mode 100644
--- /dev/null
+++ b/browser/devtools/shared/devtools.jsm
@@ -0,0 +1,292 @@
+/* -*- Mode: C++; tab-width: 8; indent-tabs-mode: nil; c-basic-offset: 2 -*- */
+/* vim: set ft=javascript ts=2 et sw=2 tw=80: */
+/* This Source Code Form is subject to the terms of the Mozilla Public
+ * License, v. 2.0. If a copy of the MPL was not distributed with this
+ * file, You can obtain one at http://mozilla.org/MPL/2.0/. */
+
+// FIXME: what if page reload? We need to flush _browser
+
+const Cu = Components.utils;
+
+Cu.import("resource://gre/modules/Services.jsm");
+let browserStrings = Services.strings.createBundle("chrome://browser/locale/browser.properties");
+
+var EXPORTED_SYMBOLS = ["gDevTools"];
+
+let ResponsiveDesignTool = {
+  id: "ResponsiveDesign",
+  killswitch: "devtools.responsiveUI.enabled",
+  get label() {return this._l10n("responsiveDesignTool.label")},
+  get accesskey() {return this._l10n("responsiveDesignTool.accesskey")},
+  get key() {return this._l10n("responsiveDesignTool.commandkey")},
+  keyModifiers: "accel,shift",
+  keyModifiersMac: "accel,alt",
+  checkbox: true,
+  inDevToolbar: false,
+
+  onCommand: function(aBrowserWindow) {
+    let browser = aBrowserWindow.gBrowser.selectedBrowser;
+    if (this.isOpenForBrowser(browser)) {
+      let instance = this._browsers.get(browser);
+      instance.close();
+    } else {
+      if (!this.ResponsiveUI) {
+        Cu.import("resource:///modules/devtools/responsivedesign.jsm", this);
+      }
+      new this.ResponsiveUI(aBrowserWindow, browser);
+    }
+  },
+  onOpen: function(aBrowser, aInstance) {
+    this._browsers.set(aBrowser, aInstance);
+  },
+  onClose: function(aBrowser, aInstance) {
+    this._browsers.delete(aBrowser);
+  },
+  isOpenForBrowser: function(aBrowser) {
+    return this._browsers.has(aBrowser);
+  },
+
+  _browsers: new Map(),
+  _l10n: function(key) {
+    return browserStrings.GetStringFromName(key);
+  },
+};
+
+let StyleEditorTool = {
+  id: "StyleEditor",
+  killswitch: "devtools.styleeditor.enabled",
+  get label() {return this._l10n("styleeditor.label")},
+  get accesskey() {return this._l10n("styleeditor.accesskey")},
+  get keycode() {return this._l10n("styleeditor.keycode")},
+  get keytext() {return this._l10n("styleeditor.keytext")},
+  keyModifiers: "shift",
+  checkbox: true,
+  inDevToolbar: true,
+
+  onCommand: function(aBrowserWindow) {
+    let win = aBrowserWindow.gBrowser.selectedBrowser;
+    if (this._browsers.has(win)) {
+      let instance = this._browsers.get(win);
+      instance.close();
+    } else {
+      if (!this.StyleEditorManager) {
+        Cu.import("resource:///modules/devtools/StyleEditor.jsm", this);
+      }
+
+      this.StyleEditorManager.newEditor(win, win.contentWindow);
+    }
+  },
+  onOpen: function(aWin, aInstance) {
+    this._browsers.set(aWin, aInstance);
+  },
+  onClose: function(aWin, aInstance) {
+    this._browsers.delete(aWin);
+  },
+  isOpenForBrowser: function(aBrowser) {
+    return this._browsers.has(aBrowser);
+  },
+
+  _browsers: new Map(),
+  _l10n: function(key) {
+    return browserStrings.GetStringFromName(key);
+  },
+};
+
+let tools = [
+  ResponsiveDesignTool,
+  StyleEditorTool
+];
+
+gDevTools = {
+  tools: {},
+
+  newBrowserWindow: function(aBrowserWindow) {
+    for (let tool of tools) {
+      this.registerTool(aBrowserWindow, tool);
+    }
+    this.buildSeveralTools(aBrowserWindow, this.tools);
+  },
+
+  registerTool: function(aBrowserWindow, aTool) {
+    this.listenToTabsIfNeeded(aBrowserWindow);
+    if (aTool.id in this.tools) {
+      // already registered
+      return;
+    }
+    this.tools[aTool.id] = aTool;
+  },
+
+  buildOneTool: function(aBrowserWindow, aTool) {
+    this.buildSeveralTools(aBrowserWindow, [aTool]);
+  },
+
+  buildSeveralTools: function(aBrowserWindow, aTools) {
+    let doc = aBrowserWindow.document;
+
+    let fragment = doc.createDocumentFragment();
+    for (let toolName in aTools) {
+      let tool = aTools[toolName];
+      let menuitem = doc.createElement("menuitem");
+      menuitem.id = "appmenu_" + tool.id;
+      menuitem.setAttribute("key", "key_" + tool.id);
+      menuitem.setAttribute("command", "Tools:" + tool.id);
+      fragment.appendChild(menuitem);
+    }
+
+    // Global menu
+    let popup = doc.getElementById("appmenu_webDeveloper_popup");
+    if (popup)
+      popup.insertBefore(fragment, doc.getElementById("appmenu_pageSource"));
+
+    // Menu bar
+    popup = doc.getElementById("menuWebDeveloperPopup");
+    if (popup)
+      popup.insertBefore(fragment, doc.getElementById("menu_pageSource"));
+
+    // Commands
+    fragment = doc.createDocumentFragment();
+    for (let toolName in aTools) {
+      let tool = aTools[toolName];
+      let enable = tool.killswitch ? Services.prefs.getBoolPref(tool.killswitch):true;
+      let command = doc.createElement("command");
+      command.id = "Tools:" + tool.id;
+      command.setAttribute("oncommand", "gDevTools.onCommand(window, \"" + tool.id + "\")");
+      command.setAttribute("disabled", !enable);
+      command.setAttribute("hidden", !enable);
+      command.setAttribute("label", tool.label);
+      command.setAttribute("accesskey", tool.accesskey);
+      if (tool.checkbox) {
+        command.setAttribute("type", "checkbox");
+      }
+      fragment.appendChild(command);
+    }
+    let commandSet = doc.getElementById("mainCommandSet")
+    if (commandSet)
+      commandSet.appendChild(fragment);
+
+    // Keys
+    fragment = doc.createDocumentFragment();
+    for (let toolName in aTools) {
+      let tool = aTools[toolName];
+      let key = doc.createElement("key");
+      key.id = "key_" + tool.id;
+      if (tool.key) {
+        key.setAttribute("key", tool.key);
+      }
+      if (tool.keycode) {
+        key.setAttribute("keycode", tool.keycode);
+      }
+      if (tool.keytext) {
+        key.setAttribute("keytext", tool.keytext);
+      }
+
+      if (tool.keyModifiersMac && Services.appinfo.OS == "Darwin") {
+        key.setAttribute("modifiers", tool.keyModifiersMac);
+      } else {
+        key.setAttribute("modifiers", tool.keyModifiers);
+      }
+      key.setAttribute("command", "Tools:" + tool.id);
+      fragment.appendChild(key);
+    }
+    let keyset = doc.getElementById("mainKeyset")
+    if (keyset)
+      keyset.appendChild(fragment);
+
+    // Developer Toolbar
+    fragment = doc.createDocumentFragment();
+    for (let toolName in aTools) {
+      let tool = aTools[toolName];
+      if (tool.inDevToolbar) {
+        let button = doc.createElement("toolbarbutton");
+        button.id = "developer-toolbar-" + tool.id;
+        button.className = "devtools-toolbarbutton";
+        button.setAttribute("command", "Tools:" + tool.id);
+        fragment.appendChild(button);
+      }
+    }
+    let toolbar = doc.getElementById("developer-toolbar");
+    if (toolbar) {
+      if (toolbar.lastChild && toolbar.lastChild.id == "developer-toolbar-closebutton") {
+        toolbar.insertBefore(fragment, toolbar.lastChild);
+      } else {
+        toolbar.appendChild(fragment);
+      }
+    }
+  },
+
+  isBrowserSelected: function(aBrowser) {
+    return aBrowser == aBrowser.ownerDocument.defaultView.gBrowser.selectedBrowser;
+  },
+  onOpen: function(aBrowser, aInstance, aToolName) {
+    let tool = this.tools[aToolName];
+    if (tool.onOpen) {
+      tool.onOpen(aBrowser, aInstance);
+    }
+    if (tool.checkbox && aBrowser && this.isBrowserSelected(aBrowser)) {
+      let window = aBrowser.ownerDocument.defaultView;
+      let command = window.document.getElementById("Tools:" + tool.id);
+      command.setAttribute("checked", "true");
+    }
+  },
+
+  onClose: function(aBrowser, aInstance, aToolName) {
+    let tool = this.tools[aToolName];
+    if (tool.onClose) {
+      tool.onClose(aBrowser, aInstance);
+    }
+    if (tool.checkbox && aBrowser && this.isBrowserSelected(aBrowser)) {
+      let window = aBrowser.ownerDocument.defaultView;
+      let command = window.document.getElementById("Tools:" + tool.id);
+      command.setAttribute("checked", "false");
+    }
+  },
+
+  onCommand: function(aBrowserWindow, aToolName) {
+    if (!(aToolName in this.tools)) {
+      // this tool has never been registered before
+      return;
+    }
+
+    let tool = this.tools[aToolName];
+    tool.onCommand(aBrowserWindow);
+  },
+
+  trackedWindows: new Set(),
+  listenToTabsIfNeeded: function(aBrowserWindow) {
+    if (this.trackedWindows.has(aBrowserWindow)) {
+      // already tracked
+      return;
+    }
+
+
+    let win = aBrowserWindow;
+    let tabs = win.gBrowser.tabContainer;
+    let bound_refreshCommands = this.refreshCommands.bind(this);
+
+    tabs.addEventListener("TabSelect", bound_refreshCommands, true);
+
+    let set = this.trackedWindows;
+    set.add(win);
+    win.addEventListener("unload", function onClose(aEvent) {
+      tabs.removeEventListener("TabSelect", bound_refreshCommands, true);
+      win.removeEventListener("unload", onClose, false);
+      set.delete(win);
+    }, false);
+
+  },
+
+  refreshCommands: function(aEvent) {
+    if (aEvent.target.ownerDocument) {
+      let window = aEvent.target.ownerDocument.defaultView;
+      let browser = window.gBrowser.selectedBrowser;
+      for (let toolName in this.tools) {
+        let tool = this.tools[toolName];
+        if (!tool.checkbox) {
+          continue;
+        }
+        let command = window.document.getElementById("Tools:" + tool.id);
+        command.setAttribute("checked", tool.isOpenForBrowser(browser));
+      }
+    }
+  },
+}
diff --git a/browser/devtools/styleeditor/StyleEditor.jsm b/browser/devtools/styleeditor/StyleEditor.jsm
--- a/browser/devtools/styleeditor/StyleEditor.jsm
+++ b/browser/devtools/styleeditor/StyleEditor.jsm
@@ -1159,32 +1159,17 @@ function setupBracketCompletion(aSourceE
     // and rewind caret
     aSourceEditor.setCaretOffset(aSourceEditor.getCaretOffset() - 1);
   }, false);
 }
 
 /**
   * Manage the different editors instances.
   */
-
-function StyleEditorManager(aWindow) {
-  this.chromeWindow = aWindow;
-  this.listenToTabs();
-  this.editors = new Map();
-}
-
-StyleEditorManager.prototype = {
-
-  /**
-   * Get the editor for a specific content window.
-   */
-  getEditorForWindow: function SEM_getEditorForWindow(aContentWindow) {
-    return this.editors.get(aContentWindow);
-  },
-
+let StyleEditorManager = {
   /**
    * Focus the editor and select a stylesheet.
    *
    * @param {CSSStyleSheet} [aSelectedStyleSheet] default Stylesheet.
    * @param {Number} [aLine] Line to which the caret should be moved (one-indexed).
    * @param {Number} [aCol] Column to which the caret should be moved (one-indexed).
    */
   selectEditor: function SEM_selectEditor(aWindow, aSelectedStyleSheet, aLine, aCol) {
@@ -1192,95 +1177,35 @@ StyleEditorManager.prototype = {
       aWindow.styleEditorChrome.selectStyleSheet(aSelectedStyleSheet, aLine, aCol);
     }
     aWindow.focus();
   },
 
   /**
    * Open a new editor.
    *
+   * @param {XULBrowser} browser window.
    * @param {Window} content window.
    * @param {CSSStyleSheet} [aSelectedStyleSheet] default Stylesheet.
    * @param {Number} [aLine] Line to which the caret should be moved (one-indexed).
    * @param {Number} [aCol] Column to which the caret should be moved (one-indexed).
    */
-  newEditor: function SEM_newEditor(aContentWindow, aSelectedStyleSheet, aLine, aCol) {
+  newEditor: function SEM_newEditor(aBrowser,
+                                    aContentWindow,
+                                    aSelectedStyleSheet,
+                                    aLine,
+                                    aCol) {
     const CHROME_URL = "chrome://browser/content/styleeditor.xul";
     const CHROME_WINDOW_FLAGS = "chrome,centerscreen,resizable,dialog=no";
 
     let args = {
+      browser: aBrowser,
       contentWindow: aContentWindow,
       selectedStyleSheet: aSelectedStyleSheet,
-      manager: this,
       line: aLine,
       col: aCol
     };
     args.wrappedJSObject = args;
     let chromeWindow = Services.ww.openWindow(null, CHROME_URL, "_blank",
                                               CHROME_WINDOW_FLAGS, args);
     chromeWindow.focus();
-
-    this.editors.set(aContentWindow, chromeWindow);
-
-    this.refreshCommand();
-
-    return chromeWindow;
-  },
-
-  /**
-   * Toggle an editor.
-   *
-   * @param {Window} associated content window.
-   */
-  toggleEditor: function SEM_toggleEditor(aContentWindow) {
-    let editor = this.getEditorForWindow(aContentWindow);
-    if (editor) {
-      editor.close();
-    } else {
-      this.newEditor(aContentWindow);
-    }
-  },
-
-  /**
-   * Close an editor.
-   *
-   * @param {Window} associated content window.
-   */
-  unregisterEditor: function SEM_unregisterEditor(aContentWindow) {
-    let chromeWindow = this.editors.get(aContentWindow);
-    if (chromeWindow) {
-      chromeWindow.close();
-    }
-    this.editors.delete(aContentWindow);
-    this.refreshCommand();
-  },
-
-  /**
-   * Update the status of tool's menuitems and buttons.
-   */
-  refreshCommand: function SEM_refreshCommand() {
-    let contentWindow = this.chromeWindow.gBrowser.selectedBrowser.contentWindow;
-    let command = this.chromeWindow.document.getElementById("Tools:StyleEditor");
-
-    let win = this.getEditorForWindow(contentWindow);
-    if (win) {
-      command.setAttribute("checked", "true");
-    } else {
-      command.setAttribute("checked", "false");
-    }
-  },
-
-  /**
-   * Trigger refreshCommand when needed.
-   */
-  listenToTabs: function SEM_listenToTabs() {
-    let win = this.chromeWindow;
-    let tabs = win.gBrowser.tabContainer;
-
-    let bound_refreshCommand = this.refreshCommand.bind(this);
-    tabs.addEventListener("TabSelect", bound_refreshCommand, true);
-
-    win.addEventListener("DOMWindowClose", function onClose(aEvent) {
-      tabs.removeEventListener("TabSelect", bound_refreshCommand, true);
-      win.removeEventListener("DOMWindowClose", onClose, false);
-    }, false);
   },
 }
diff --git a/browser/devtools/styleeditor/styleeditor.xul b/browser/devtools/styleeditor/styleeditor.xul
--- a/browser/devtools/styleeditor/styleeditor.xul
+++ b/browser/devtools/styleeditor/styleeditor.xul
@@ -116,20 +116,24 @@
       </xul:toolbar>
       <xul:box class="stylesheet-editor-input textbox"
                data-placeholder="&editorTextbox.placeholder;"/>
     </xul:box>
   </div> <!-- #splitview-templates -->
 </xul:box>   <!-- .splitview-root -->
 
 <xul:script type="application/javascript"><![CDATA[
-Components.utils.import("resource:///modules/devtools/StyleEditorChrome.jsm");
+const Cu = Components.utils;
+Cu.import("resource:///modules/devtools/StyleEditorChrome.jsm");
 let chromeRoot = document.getElementById("style-editor-chrome");
 let args = window.arguments[0].wrappedJSObject;
 let contentWindow = args.contentWindow;
 let chrome = new StyleEditorChrome(chromeRoot, contentWindow);
 chrome.selectStyleSheet(args.selectedStyleSheet, args.line, args.col);
 window.styleEditorChrome = chrome;
 let manager = args.manager;
-window.onunload = function() manager.unregisterEditor(contentWindow);
+
+Cu.import("resource:///modules/devtools/devtools.jsm");
+gDevTools.onOpen(args.browser, window, "StyleEditor");
+window.onunload = function() gDevTools.onClose(args.browser, window, "StyleEditor");
 ]]>
 </xul:script>
 </xul:window>
diff --git a/browser/locales/en-US/chrome/browser/browser.dtd b/browser/locales/en-US/chrome/browser/browser.dtd
--- a/browser/locales/en-US/chrome/browser/browser.dtd
+++ b/browser/locales/en-US/chrome/browser/browser.dtd
@@ -209,20 +209,16 @@ These should match what Safari and other
 
 <!ENTITY inspectMenu.label            "Inspect">
 <!ENTITY inspectMenu.accesskey        "T">
 <!ENTITY inspectMenu.commandkey       "I">
 
 <!ENTITY inspectContextMenu.label     "Inspect Element">
 <!ENTITY inspectContextMenu.accesskey "Q">
 
-<!ENTITY responsiveDesignTool.label   "Responsive Design View">
-<!ENTITY responsiveDesignTool.accesskey "R">
-<!ENTITY responsiveDesignTool.commandkey "M">
-
 <!-- LOCALIZATION NOTE (scratchpad.label): This menu item label appears
   -  in the Tools menu. See bug 653093.
   -  The Scratchpad is intended to provide a simple text editor for creating
   -  and evaluating bits of JavaScript code for the purposes of function
   -  prototyping, experimentation and convenient scripting.
   -
   -  It's quite possible that you won't have a good analogue for the word
   -  "Scratchpad" in your locale. You should feel free to find a close
@@ -267,23 +263,16 @@ These should match what Safari and other
   -  alternate view for the Inspector, creating a 3D visualization of the
   -  webpage. -->
 <!ENTITY inspect3DViewButton.label     "3D View">
 <!ENTITY inspect3DViewButton.accesskey "W">
 
 <!ENTITY inspectStyleButton.label     "Style">
 <!ENTITY inspectStyleButton.accesskey "S">
 
-<!-- LOCALIZATION NOTE (styleeditor.label): This menu item label appears
-  -  in the Tools menu. -->
-<!ENTITY styleeditor.label            "Style Editor">
-<!ENTITY styleeditor.accesskey        "y">
-<!ENTITY styleeditor.keycode          "VK_F7">
-<!ENTITY styleeditor.keytext          "F7">
-
 <!ENTITY getMoreDevtoolsCmd.label        "Get More Tools">
 <!ENTITY getMoreDevtoolsCmd.accesskey    "M">
 
 <!ENTITY fileMenu.label         "File"> 
 <!ENTITY fileMenu.accesskey       "F">
 <!ENTITY newNavigatorCmd.label        "New Window">
 <!ENTITY newNavigatorCmd.key        "N">
 <!ENTITY newNavigatorCmd.accesskey      "N">
diff --git a/browser/locales/en-US/chrome/browser/browser.properties b/browser/locales/en-US/chrome/browser/browser.properties
--- a/browser/locales/en-US/chrome/browser/browser.properties
+++ b/browser/locales/en-US/chrome/browser/browser.properties
@@ -362,8 +362,19 @@ webapps.requestInstall = Do you want to 
 # LOCALIZATION NOTE (telemetryOptOutPrompt): %1$S and %3$S will be replaced by
 # brandFullName, and %2$S by the value of the toolkit.telemetry.server_owner preference.
 telemetryOptOutPrompt = %1$S sends information about performance, hardware, usage and customizations back to %2$S to help improve %3$S.
 
 # LOCALIZATION NOTE (fullscreen.entered): displayed when we enter HTML5 fullscreen mode, %S is the domain name of the focused website (e.g. mozilla.com).
 fullscreen.entered=%S is now fullscreen.
 # LOCALIZATION NOTE (fullscreen.rememberDecision): displayed when we enter HTML5 fullscreen mode, %S is the domain name of the focused website (e.g. mozilla.com).
 fullscreen.rememberDecision=Remember decision for %S
+
+# LOCALIZATION NOTE (styleeditor.*): DevTools, Style Editor controls
+styleeditor.label=Style Editor
+styleeditor.accesskey=y
+styleeditor.keycode=VK_F7
+styleeditor.keytext=F7
+
+# LOCALIZATION NOTE (responsiveDesignTool.*): DevTools Responsive Design tool controls
+responsiveDesignTool.label=Responsive Design View
+responsiveDesignTool.accesskey=R
+responsiveDesignTool.commandkey=M
diff --git a/browser/locales/en-US/chrome/browser/devtools/styleeditor.properties b/browser/locales/en-US/chrome/browser/devtools/styleeditor.properties
--- a/browser/locales/en-US/chrome/browser/devtools/styleeditor.properties
+++ b/browser/locales/en-US/chrome/browser/devtools/styleeditor.properties
@@ -60,9 +60,8 @@ saveStyleSheet.commandkey=S
 # conjunction with accel (Command on Mac or Ctrl on other platforms) to Undo a
 # change in the editor.
 undo.commandkey=Z
 
 # LOCALIZATION NOTE  (redo.commandkey): This the key to use in
 # conjunction with accel+shift (accel is Command on Mac or Ctrl on other
 # platforms) to Redo a change in the editor.
 redo.commandkey=Z
-
