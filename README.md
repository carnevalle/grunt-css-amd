# grunt-css-amd
> Compile css files into javascript AMD named module files. Submitted by [Thiago Felix](/thiagofelix).

## Getting Started
Install this grunt plugin next to your project's [grunt.js gruntfile][getting_started] with: `npm install grunt-grunt-css-amd`

Then add this line to your project's `grunt.js` gruntfile:

```javascript
grunt.loadNpmTasks('grunt-css-amd');
```

[grunt]: https://github.com/cowboy/grunt
[getting_started]: https://github.com/cowboy/grunt/blob/master/docs/getting_started.md

### Overview

Inside your `grunt.js` file, add a section named `cssamd`.

This task will find all matched css files and compile each file to a relative javascript ( [AMD module formatted](http://requirejs.org/docs/whyamd.html) ) file

This idea came up from the soundclound team on this [post](http://backstage.soundcloud.com/2012/06/building-the-next-soundcloud/).

The main reason to do that is because compiling css to amd module you can require it as a view dependencie on [Backbone](backbonejs.org) like soundcloud team demonstrate on their blog.

There is a [Demo](https://github.com/thiagofelix/backbone-css-view-example) about this concept, see it in action.

### Config Example


``` javascript
cssamd: {
  compile:{
    files: {      
      "path/to/modules/folder/": [
        "path/to/css/folder/**/*.css"
      ]
    }
    options: {
    	moduleNamePrefix: "" // Optional
    }
  }
}
```

#### Parameters

##### files 
This define where the modules will be saved after processing css files

#### Options

##### moduleNamePrefix (optional)
By default the name of module will be "path/to/modules/folder" + "css_file_name.css". Like this exemple below:
define("path/to/moodules/folder/foo.css", [], function(){})

If you set a moduleNamePrefix, it will override the "path/to/module/folder/" in the module's name.
