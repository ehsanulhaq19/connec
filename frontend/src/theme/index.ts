export interface Theme {
  colors: {
    primary: {
      light: string;
      main: string;
      dark: string;
    };
    secondary: {
      light: string;
      main: string;
      dark: string;
    };
    accent: string;
    background: string;
    darkbg: string;
    text: {
      primary: string;
      secondary: string;
    };
    border: string;
  };
  fonts: {
    sizes: {
      xs: string;
      sm: string;
      base: string;
      lg: string;
      xl: string;
      '2xl': string;
      '3xl': string;
      '4xl': string;
      '5xl': string;
    };
    families: {
      sans: string;
      heading: string;
    };
  };
  spacing: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
    xl: string;
  };
}

export const lightTheme: Theme = {
  colors: {
    primary: {
      light: '#4f8cff',
      main: '#2563eb',
      dark: '#1e40af',
    },
    secondary: {
      light: '#f3f4f6',
      main: '#64748b',
      dark: '#334155',
    },
    accent: '#f59e42',
    background: '#f9fafb',
    darkbg: '#18181b',
    text: {
      primary: '#111827',
      secondary: '#6b7280',
    },
    border: '#e5e7eb',
  },
  fonts: {
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    families: {
      sans: 'Inter, ui-sans-serif, system-ui',
      heading: 'Montserrat, ui-sans-serif, system-ui',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};

export const darkTheme: Theme = {
  colors: {
    primary: {
      light: '#60a5fa',
      main: '#3b82f6',
      dark: '#1d4ed8',
    },
    secondary: {
      light: '#374151',
      main: '#9ca3af',
      dark: '#d1d5db',
    },
    accent: '#fbbf24',
    background: '#18181b',
    darkbg: '#0f0f0f',
    text: {
      primary: '#f9fafb',
      secondary: '#d1d5db',
    },
    border: '#374151',
  },
  fonts: {
    sizes: {
      xs: '0.75rem',
      sm: '0.875rem',
      base: '1rem',
      lg: '1.125rem',
      xl: '1.25rem',
      '2xl': '1.5rem',
      '3xl': '1.875rem',
      '4xl': '2.25rem',
      '5xl': '3rem',
    },
    families: {
      sans: 'Inter, ui-sans-serif, system-ui',
      heading: 'Montserrat, ui-sans-serif, system-ui',
    },
  },
  spacing: {
    xs: '0.25rem',
    sm: '0.5rem',
    md: '1rem',
    lg: '1.5rem',
    xl: '2rem',
  },
};

export type ThemeMode = 'light' | 'dark';

export const getTheme = (mode: ThemeMode): Theme => {
  return mode === 'light' ? lightTheme : darkTheme;
}; 