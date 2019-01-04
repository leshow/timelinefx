# timelinefx

JavaScript fork of the timelinefx lib.

Allows particle system effects created in the standalone TimelineFX tool to be loaded and run within a browser.

## Basic usage:

- Unzip TimelineFX .eff file containing xml and images.
- Place those assets where they can be accessed from your javascript.

```
// Create particle manager and fx library
var particleManager = new ParticleManager( /* particle limit = */ 1000, /* layers = */ 1 );
EffectsLibrary.Init();
EffectsLibrary.Load( xml );

// Grab an effect prototype
var effectPrototype = EffectsLibrary.GetEffect( "explosion" );
effectPrototype.CompileAll();

// Create/spawn an effect instance
var currentEffectInstance = new Effect( effectPrototype, particleManager );
particleManager.AddEffect( currentEffectInstance );``
```

A complete demo can be found here: http://factor43.com/projects/tfx/demo

## Fork

This fork brings the timelinefxjs lib to ES6+ syntax & style. Eventually we will include typescript definitions.
