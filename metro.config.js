
/**
 * Metro configuration
 * https://reactnative.dev/docs/metro
 *
 * @type {import('metro-config').MetroConfig}
 */const {getDefaultConfig, mergeConfig} = require('@react-native/metro-config');

 const defaultConfig = getDefaultConfig(__dirname);
 const {assetExts, sourceExts} = defaultConfig.resolver;
const config = {
  transformer: {
    babelTransformerPath: require.resolve('react-native-svg-transformer'),
  },
  resolver: {
    assetExts: [...assetExts, 'png'].filter(ext => ext !== 'svg'), // Ensure 'png' is included
    sourceExts: [...sourceExts, 'svg'],
  },
};


module.exports = mergeConfig(getDefaultConfig(__dirname), config);
