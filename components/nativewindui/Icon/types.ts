import type MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import type MaterialIcons from '@expo/vector-icons/MaterialIcons';
import type { SymbolViewProps } from 'expo-symbols';
import type { IconMapper } from 'rn-icon-mapper';

type SfSymbolProps = Omit<SymbolViewProps, 'name'> & {
  name: Extract<SymbolViewProps['name'], string>;
};

type MaterialCommunityIconsProps = React.ComponentProps<typeof MaterialCommunityIcons>;
type MaterialIconsProps = React.ComponentProps<typeof MaterialIcons>;

type Style = SymbolViewProps['style'] &
  MaterialIconsProps['style'] &
  MaterialCommunityIconsProps['style'];

type IconProps = IconMapper<SfSymbolProps, MaterialIconsProps, MaterialCommunityIconsProps> & {
  style?: Style;
  className?: string;
};

export type { IconProps };
