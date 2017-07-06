# Apocalypse
This is a super simple JavaScript framework built for traditional websites. It works, but it's basic and needs a lot of attention.

## Why build another framework?
I needed a Framework that worked for traditional websites, the only modern tools I see released these days are that of Single Page Application Frameworks, libraries such as Angular, Ember and React. These Frameworks are amazing, but they don't help us very much if we want to build a Drupal site with server rendered templates.

### This framework provides the following:
* Object-orientated
* Modern ES2015 JavaScript, especially **modules**
* Automatic separation of above and below fold execution, optimising for the fastest possible page load
* Simplified asynchronous loading of JavaScript if and when it is required
* Effortless DOM bindings provided by a simple **data attribute** which contain a **direct path to the JavaScrit module itself!** No more confusion about where JavaScript is being executed from and on which element.
* Fully encapsulated component logic save for hooks that allow them to communicate in a clean and controlled manner

## Structure
* **config** - a place for all of your configurations files
* **core** - in charge of module loading and base classes for modules
* **modules** - this is where the majority of your code will exist
    * _priority_ - immediate execution for above fold content such as top navigation menus or hero banners
    * _common_ - concatinated group of below fold, common components such as footers, articles and sidebars. This file is asyncrously downloaded and excuted immediately after _priority_
    * _demand_ - file separated, less common components which are asyncrously downloaded on existance
* **services** - a collection of utility modules

## Goals/Needs
* At the moment each _demand_ module is split off into it's own bundle, I'm thinking it would probably be better to chunk these modules until they reach a certain filesize
* I have left styling out of this project (for now) but I could do with some suggestions with regards to automating above and below fold css compilation. Like styles compiled from _priority_ might be used as critical render blocking css but then everything from _common_ and _demand_ gets concatinated and asynchronously loaded in later.
* Better naming conventions, better architecture, better documentation etc

## installation
``` bash
npm install
```

## Usage
``` bash
npm run-script dev
npm run-script build
```

## Hooks

### beforeModules
All logic that needs to execute before any module is loaded should go here.

### afterModules
Logic that needs to execute after all the modules is loaded should go here.

### destroyAddons
Any third party script that might have a global effect can be broken down here.


## Modules
This is the base class for all modules.

## Properties
A list of available properties.

### node
This is the raw DOM node that you attached the data-module(-*) attribute to.
```javascript
this.width = this.node.style.width;
```

### element
This is the jQuery selected DOM node
```javascript
this.height = this.element.height();
```

### dom
This contains common DOM nodes such as window, document, body etc... Cached into a single object
```javascript
 // jQuery selected window element
this.window_height = this.dom.window.height();
```

### break_point
```javascript
 // 768px
this.media_query = this.break_point.small;
```

## Actions
A list of available actions.

### debug
Decorated console.log message. Disabled outside of local development

```javascript
error(error) {
    this.debug('error logging', error);
}

// Result
[APOCALYPSE LOG - module_name] error logging [Object]
```

### broadcast
Allows us to effectively communicate with other components
```javascript
// example component
speakToFriend() {
    this.broadcast('notify', 'Is there anybody out there!');
}
```

### onmessage
This method allows us to receive broadcasts from other components.
```javascript
// another component
constructor(application, node, config, name) {
    super(application, node, config, name);

    // specify broadcast
    this.messages = ['notify'];
}

...

// listen for broadcasts
onmessage(name, data) {
    switch(name) {
        case 'notify':
            // data = 'Is there anybody out there!'
            this.notified(data);
            break;
    }
}
```

### accessible
This combination enables users with accessability needs to engage with our components va the keyboard.<br>
returns true IF the action was a mouse click OR the SPACE/ENTER key was pressed.
```javascript
bindEvents() {
    this.element.on('click keydown', this.eventFired);
}

eventFired(event) {
    if (!this.accessible(event))
        return;

    ...
}
```

## Methods
A list of available methods

### init
Where it all begins
```javascript
init() {
    this.bindEvents();
    ...
}
```

### destroy
Where it all (should) end
```javascript
destroy() {
    super.destroy();

    this.thirdparty.kill();
    ...
}
```