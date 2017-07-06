# Apocalypse
JavaScript framework for traditional websites

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