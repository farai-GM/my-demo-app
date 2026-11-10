import { Link } from 'expo-router';
import { Platform, View } from 'react-native';

import { Button } from '@/components/nativewindui/Button';
import { Icon } from '@/components/nativewindui/Icon';
import { Text } from '@/components/nativewindui/Text';
import { useColorScheme } from '@/lib/useColorScheme';

const SF_SYMBOL_PROPS = { type: 'hierarchical' } as const;

export default function WelcomeConsentScreen() {
  const { colors } = useColorScheme();

  return (
    <View className="p-safe flex-1">
      <View className="mx-auto max-w-sm flex-1 justify-between gap-4 p-6">
        <View className="ios:pt-8 pt-12">
          <Text variant="largeTitle" className="ios:text-left text-center font-bold">
            Welcome to
          </Text>
          <Text variant="largeTitle" className="ios:text-left text-primary text-center font-bold">
            NativewindUI
          </Text>
        </View>
        <View className="gap-8">
          {FEATURES.map((feature) => (
            <View key={feature.title} className="flex-row items-center gap-4">
              <View className="pt-px">
                <Icon
                  name={feature.icon}
                  size={38}
                  color={colors.primary}
                  sfSymbol={SF_SYMBOL_PROPS}
                />
              </View>
              <View className="flex-1">
                <Text variant="callout" className="font-semibold">
                  {feature.title}
                </Text>
                <Text variant="subhead" className="text-muted-foreground leading-5">
                  {feature.description}
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View className="gap-4">
          <View className="items-center">
            <Icon name="info.circle" color={colors.primary} sfSymbol={SF_SYMBOL_PROPS} />
            <Text variant="caption2" className="pt-1 text-center">
              By pressing continue, you agree to our{' '}
              <Link href="../">
                <Text variant="caption2" className="text-primary">
                  Terms of Service
                </Text>
              </Link>{' '}
              and that you have read our{' '}
              <Link href="../">
                <Text variant="caption2" className="text-primary">
                  Privacy Policy
                </Text>
              </Link>
            </Text>
          </View>
          <Link href="../" asChild>
            <Button size={Platform.select({ ios: 'lg', default: 'md' })}>
              <Text>Continue</Text>
            </Button>
          </Link>
        </View>
      </View>
    </View>
  );
}

const FEATURES = [
  {
    title: 'Build beautiful apps',
    description: 'A collection of components and flows that are easy to use and customize.',
    icon: 'wrench.and.screwdriver.fill',
  },
  {
    title: 'Documentation',
    description: 'A comprehensive guide to help you get started.',
    icon: 'doc.on.doc.fill',
  },
  {
    title: 'Community',
    description: 'Join our community to get help and support.',
    icon: 'ellipsis.message.fill',
  },
] as const;
