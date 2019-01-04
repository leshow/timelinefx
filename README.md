# timelinefx

JavaScript fork of the timelinefx lib.

Allows particle system effects created in the standalone TimelineFX tool to be loaded and run within a browser.

## Basic usage:

- Unzip TimelineFX .eff file containing xml and images.
- Place those assets where they can be accessed from your javascript.

```
// Create particle manager and fx library
var particleManager = new ParticleManager( drawSprite, particle limit = 1000, layers = 1 );
EffectsLibrary.init();
EffectsLibrary.load( xml );

// Grab an effect prototype
var effectPrototype = EffectsLibrary.getEffect( "explosion" );
effectPrototype.compileAll();

// Create/spawn an effect instance
var currentEffectInstance = new Effect( effectPrototype, particleManager );
particleManager.addEffect( currentEffectInstance );``
```

A complete demo can be found here: http://factor43.com/projects/tfx/demo

## Fork

This fork brings the timelinefxjs lib to ES6+ syntax & style. Eventually we will include typescript definitions.

There is only one major API change between this fork and gooddoggy's timelinefx, and that is that `ParticleManager` takes 3 arguments now, the first one being the `drawSprite` function.
