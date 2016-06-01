(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var App = function () {
  function App(args) {
    _classCallCheck(this, App);

    // code
    var scene, camera, controls, effect, cube, manager, material, parameters;
    var mouseY, mouseX;
  }

  _createClass(App, [{
    key: 'init',
    value: function init() {
      this.scene = new THREE.Scene();
      this.camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 2000);
      this.camera.position.z = 1000;

      var renderer = new THREE.WebGLRenderer();
      renderer.setSize(window.innerWidth, window.innerHeight);
      document.body.appendChild(renderer.domElement);

      this.controls = new THREE.VRControls(this.camera);
      this.controls.standing = true;

      this.effect = new THREE.VREffect(renderer);
      this.effect.setSize(window.innerWidth, window.innerHeight);

      this.manager = new WebVRManager(renderer, this.effect);

      var geometry = new THREE.Geometry();
      var sprite = new THREE.TextureLoader().load("textures/hasu.png");
      for (var i = 0; i < 10000; i++) {
        var vertex = new THREE.Vector3();
        vertex.x = 2000 * Math.random() - 1000;
        vertex.y = 2000 * Math.random() - 1000;
        vertex.z = 2000 * Math.random() - 1000;
        geometry.vertices.push(vertex);
      }
      this.material = new THREE.PointsMaterial({ size: 35, sizeAttenuation: false, map: sprite, alphaTest: 0.5, transparent: true });
      this.material.color.setHSL(1.0, 0.3, 0.7);
      var particles = new THREE.Points(geometry, this.material);
      this.scene.add(particles);

      document.addEventListener('mousemove', this.onDocumentMouseMove, false);
      document.addEventListener('touchstart', this.onDocumentTouchStart, false);
      document.addEventListener('touchmove', this.onDocumentTouchMove, false);

      window.addEventListener('resize', this.onResize, true);
      window.addEventListener('vrdisplaypresentchange', this.onResize, true);
      this.render();
    }
  }, {
    key: 'onDocumentMouseMove',
    value: function onDocumentMouseMove(event) {
      this.mouseX = event.clientX - window.innerWidth / 2;
      this.mouseY = event.clientY - window.innerHeight / 2;
    }
  }, {
    key: 'onDocumentTouchStart',
    value: function onDocumentTouchStart(event) {
      if (event.touches.length == 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - window.innerWidth / 2;
        this.mouseY = event.touches[0].pageY - window.innerHeight / 2;
      }
    }
  }, {
    key: 'onDocumentTouchMove',
    value: function onDocumentTouchMove(event) {
      if (event.touches.length == 1) {
        event.preventDefault();
        this.mouseX = event.touches[0].pageX - window.innerWidth / 2;
        this.mouseY = event.touches[0].pageY - window.innerHeight / 2;
      }
    }
  }, {
    key: 'onResize',
    value: function onResize(e) {
      this.effect.setSize(window.innerWidth, window.innerHeight);
      this.camera.aspect = window.innerWidth / window.innerHeight;
      this.camera.updateProjectionMatrix();
    }
  }, {
    key: 'render',
    value: function render() {
      var _this = this;

      var time = Date.now() * 0.00005;

      this.camera.position.z -= 2;
      this.camera.position.x += (this.mouseX - this.camera.position.x) * 1;
      this.camera.position.z += (-this.mouseY - this.camera.position.y) * 0.05;

      if (this.camera.position.z > 2500) {
        this.camera.position.z = 2500;
      }

      if (this.camera.position.z < -2500) {
        this.camera.position.z = -2500;
      }

      // this.camera.position.x += ( this.mouseX - this.camera.position.x ) * 0.05;
      // this.camera.position.y += ( - this.mouseY - this.camera.position.y ) * 0.05;
      this.camera.lookAt(this.scene.position);

      requestAnimationFrame(function () {
        return _this.render();
      });
      this.controls.update();

      var h = 360 * (1.0 + time) % 360 / 360;
      this.material.color.setHSL(h, 0.5, 0.5);

      this.manager.render(this.scene, this.camera);
    }
  }]);

  return App;
}();

var user = new App();
user.init();
},{}]},{},[1]);
