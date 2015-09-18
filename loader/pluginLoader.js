/**
 * Created by Andrew on 9/16/2015.
 * @Todo  Load plugin information from json configs
 */
//namespace, version, display name, author, description, source code link, twitter
var AUROUS_PLUGINS = [
    ["helloWorld", 1, "Andrews Hello Script", "Andrew", "This plugin should list all plugins currently found on the system.", "https://github.com/Codeusa/", "https://twitter.com/andrewmd5", false],
    ["gohan", 2.4, "Andrews Gohan Script", "Andrew", "Draws a picture of Gohan on the screen", "https://github.com/codeusa/", "https://twitter.com/andrewmd5", false]
];
window.activePlugins = {};
window.aurousScript = $; //assign Jquery to aurousScript 

aurousScript(function() {
    var includes = {
        "activePlugins": {
            'items': AUROUS_PLUGINS,
            'callback': function() {
                // activePlugins have been loaded to the system now.
                var i = 0;
                for (var pluginName in activePlugins) {
                    var moduleVersion = AUROUS_PLUGINS[i][1];
                    var moduleDisplayName = AUROUS_PLUGINS[i][2];
                    var moduleAuthor = AUROUS_PLUGINS[i][3];
                    var moduleDescription = AUROUS_PLUGINS[i][4];
                    var moduleSource = AUROUS_PLUGINS[i][5];
                    var moduleTwitter = AUROUS_PLUGINS[i][6];
                    //if plugin lacks a .init it will not be loaded into the namespace, checked by core application.
                    try {
                        activePlugins[pluginName].init(moduleDisplayName, moduleVersion, moduleDescription, moduleAuthor, moduleTwitter, moduleSource, false);
                    } catch (err) {
                        activePlugins[pluginName] = null;
                        delete activePlugins[pluginName];
                        AUROUS_PLUGINS[i][7] = true;
                    }
                    i++;
                }

            }
        }
    };

    for (var packageName in includes) {
        var pkg = includes[packageName];
        var includeItems = pkg.items;
        var includePaths = [];
        var includeCallback = 'callback' in pkg ? pkg.callback : function() {};

        for (var i = 0; i < includeItems.length; i++) {
            var moduleName = includeItems[i][0];
            var scriptPath = packageName + '/' + moduleName + '.js';
            includePaths.push(scriptPath);
        }
        aurousScript.include(includePaths, includeCallback);
    }
});
