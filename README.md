desktop
=======

[![wercker status](https://app.wercker.com/status/632b9941c98f988188237f4395abeade/m/)](https://app.wercker.com/project/bykey/632b9941c98f988188237f4395abeade)

## Dependencies
* NPM
* Bower (`npm install -g bower`)
* Grunt (`npm install -g grunt-cli`)

## Usage

#### Install & Update
```sh
$ npm install
$ bower install
```

#### Development / Server
Starts webserver on `localhost:8081` with livereload.
```sh
$ grunt server
```

#### Build (just needed for deployment)
```sh
$ grunt build
```
## Supported browsers

Unsupported browsers will be redirected to `m.sub2home.com`

IE  | Firefox | Chrome | Safari | Opera | iOS  | Android | Blackberry
--- | ---     | ---    | ---    | ---   | ---  | ---     | ---
9+  | 4+      | 4+     | 5+     | 10.5+ | -    | -       | -

### Polyfills

* [History API](https://github.com/devote/HTML5-History-API) - IE9
* [CORS](https://github.com/jpillora/xdomain) - IE9