module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      [
        'module-resolver',
        {
          alias: {
            // This needs to be mirrored in tsconfig.json
            'constants/*': './src/constants/*',
            'screens/*': './src/screens/*',
            'types/*': './src/types/*',
            'components/*': './src/components/*',
            'assets/*': './src/assets/*',
            'navigation/*': './src/navigation/*',
            'localization/*': './src/localization/*',
            'services/*': './src/services/*',
            'providers/*': './src/providers/*',
            'wrapper/*': './src/wrapper/*',
            'mocks/*': './src/mocks/*',
            'utils/*': './src/utils/*',
            'store/*': './src/store/*',
            'hooks/*': './src/hooks/*'
          },
        },
      ],
    ],
  };
};
