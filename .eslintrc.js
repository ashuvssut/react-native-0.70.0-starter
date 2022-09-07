module.exports = {
  root: true,
  extends: '@react-native-community',
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  overrides: [
    {
      files: ['*.ts', '*.tsx'],
      rules: {
        '@typescript-eslint/no-shadow': ['error'],
        'no-shadow': 'off',
        'no-undef': 'off',
      },
    },
    {
      files: ['*.tsx'],
      rules: {
        'no-restricted-imports': [
          'error',
          {
            paths: [
              {
                name: 'react-native',
                importNames: ['SafeAreaView'],
                message:
                  'Import SafeAreaView from react-native-safe-area-context instead',
              },
              {
                name: 'react-native-safe-area-view',
                importNames: ['SafeAreaView'],
                message:
                  'Import SafeAreaView from react-native-safe-area-context instead',
              },
            ],
          },
        ],
      },
    },
  ],
};
