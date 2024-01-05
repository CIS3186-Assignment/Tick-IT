import { DefaultTheme } from 'react-native-paper';

const customTheme = {
  ...DefaultTheme,
  dark: false,
  version: 3,
  mode: 'adaptive',
  roundness: 8,

  colors: {
    ...DefaultTheme.colors,
    primary: "rgb(55, 92, 169)",
    onPrimary: "rgb(255, 255, 255)",
    primaryContainer: "rgb(217, 226, 255)",
    onPrimaryContainer: "rgb(0, 25, 69)",
    
    secondary: "rgb(87, 94, 113)",
    onSecondary: "rgb(255, 255, 255)",
    secondaryContainer: "rgb(220, 226, 249)",
    onSecondaryContainer: "rgb(21, 27, 44)",
    
    tertiary: "rgb(37, 51, 84)",
    onTertiary: "rgb(255, 255, 255)",
    tertiaryContainer: "rgbrgb(37, 51, 84)",
    onTertiaryContainer: "rgb(255, 255, 255)",
    
    error: "rgb(186, 26, 26)",
    onError: "rgb(255, 255, 255)",
    errorContainer: "rgb(255, 218, 214)",
    onErrorContainer: "rgb(65, 0, 2)",
    
    background: "rgb(20, 20, 20)",
    onBackground: "rgb(27, 27, 31)",
    
    surface: "rgb(254, 251, 255)",
    onSurface: "rgb(27, 27, 31)",
    
    surfaceVariant: "rgb(225, 226, 236)",
    onSurfaceVariant: "rgb(68, 70, 79)",
    
    outline: "rgb(117, 119, 128)",
    outlineVariant: "rgb(197, 198, 208)",
    
    shadow: "rgb(0, 0, 0)",
    scrim: "rgb(0, 0, 0)",
    
    inverseSurface: "rgb(48, 48, 52)",
    inverseOnSurface: "rgb(242, 240, 244)",
    inversePrimary: "rgb(176, 198, 255)",
    
    // Elevation Colors
    elevation: {
      level0: "transparent",
      level1: "rgb(244, 243, 251)",
      level2: "rgb(238, 238, 248)",
      level3: "rgb(232, 234, 246)",
      level4: "rgb(230, 232, 245)",
      level5: "rgb(226, 229, 243)",
    },
    
    surfaceDisabled: "rgba(27, 27, 31, 0.12)",
    onSurfaceDisabled: "rgba(27, 27, 31, 0.38)",
    
    backdrop: "rgba(46, 48, 56, 0.4)"
  },

  fonts: {
    labelMedium: {
      fontFamily: 'System', // Use 'System' for the system font
      letterSpacing: 0.5,
      fontWeight: '500',
      lineHeight: 18,
      fontSize: 16,
    },
    bodySmall: {
      fontFamily: 'System', // Use 'System' for the system font
      letterSpacing: 0.3,
      fontWeight: '400',
      lineHeight: 18,
      fontSize: 14,
    },
    labelLarge: {
      fontFamily: 'System', // Use 'System' for the system font
      letterSpacing: 0.3,
      fontWeight: '400',
      lineHeight: 25,
      fontSize: 18,
    },
    bodyLarge: {
      fontFamily: 'System', // Use 'System' for the system font
      letterSpacing: 0.3,
      fontWeight: '400',
      lineHeight: 25,
      fontSize: 18,
    },
  },

  animation: {
    scale: 1.0,
  },
};

export default customTheme;