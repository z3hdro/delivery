import { ExpoConfig, ConfigContext } from '@expo/config';
import { withAppDelegate, ConfigPlugin } from 'expo/config-plugins';
import yandexConfig from './secrets/yandex_config.json';

const VERSION = '1.0.0';
const BUILD_NUMBER = 1;
const NAME = 'Delivery app';
const SLUG = 'Delivery';

const withYandexMaps: ConfigPlugin = (config) => {
  return withAppDelegate(config, async (config) => {
    const appDelegate = config.modResults;

    // Add import
    if (!appDelegate.contents.includes('#import <YandexMapsMobile/YMKMapKitFactory.h>')) {
      // Replace the first line with the intercom import
      appDelegate.contents = appDelegate.contents.replace(
        /#import "AppDelegate.h"/g,
        '#import "AppDelegate.h"\n#import <YandexMapsMobile/YMKMapKitFactory.h>'
      );
    }

    const mapKitMethodInvocations = [
      `[YMKMapKit setApiKey:@"${yandexConfig.API_KEY}"];`,
      '[YMKMapKit setLocale:@"ru_RU"];',
      '[YMKMapKit mapKit];',
    ]
      .map((line) => `\t${line}`)
      .join('\n');

    // Add invocation
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    if (!appDelegate.contents.includes(mapKitMethodInvocations)) {
      appDelegate.contents = appDelegate.contents.replace(
        /\s+return YES;/g,
        `\n\n${mapKitMethodInvocations}\n\n\treturn YES;`
      );
    }

    return config;
  });
};
export default ({ config }: ConfigContext): ExpoConfig => {
  const updatedConfig = {
    ...config,
    name: NAME,
    slug: SLUG,
    version: VERSION,
    ios: {
      ...config.ios,
      buildNumber: `${BUILD_NUMBER}`
    },
    android: {
      ...config.android,
      versionCode: BUILD_NUMBER
    },
  };

  return withYandexMaps(updatedConfig);
};
