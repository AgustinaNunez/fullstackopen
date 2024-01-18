import { Text as NativeText, StyleSheet, Platform } from 'react-native';

import theme from '../theme';

const styles = StyleSheet.create({
  text: {
    color: theme.colors.primary,
    fontSize: theme.fontSizes.body,
    fontFamily: Platform.select({
      android: theme.fonts.main.android,
      ios: theme.fonts.main.ios,
      default: theme.fonts.main.default,
    }),
    fontWeight: theme.fontWeights.normal,
    marginVertical: 2,
  },
  colorPrimary: {
    color: theme.colors.primary,
  },
  colorDescription: {
    color: theme.colors.grey,
  },
  fontSizeTitle: {
    fontSize: theme.fontSizes.title,
  },
  fontWeightBold: {
    fontWeight: theme.fontWeights.bold,
  },
});

const Text = ({ color, fontSize, fontWeight, style, ...props }) => {
  const textStyle = [
    styles.text,
    color === 'primary' && styles.colorPrimary,
    color === 'description' && styles.colorDescription,
    fontSize === 'title' && styles.fontSizeTitle,
    fontWeight === 'bold' && styles.fontWeightBold,
    style,
  ];

  return <NativeText style={textStyle} {...props} />;
};

export default Text;