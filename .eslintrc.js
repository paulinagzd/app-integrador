module.exports = {
  env: {
    browser: true,
    es2021: true,
  },
  extends: [
    'plugin:react/recommended',
    'airbnb',
  ],
  parserOptions: {
    ecmaFeatures: {
      jsx: true,
    },
    ecmaVersion: 'latest',
    sourceType: 'module',
  },
  plugins: [
    'react',
  ],
  rules: {
    'react/jsx-filename-extension': [1, { extensions: ['.js', '.jsx'] }],
    'dot-location': ['error', 'property'],
    'import/prefer-default-export': 'off',
    'react/jsx-props-no-spreading': 'off',
    'react/prop-types': 'off',
    'react/destructuring-assignment': 'off',
    'react/jsx-no-undef': ['error', {
      allowGlobals: true,
    }],
    'import/no-extraneous-dependencies': 'warn',
    'import/no-unresolved': ['error', {
      ignore: ['^@.*'],
    }],
    'no-restricted-exports': ['error', {
      restrictedNamedExports: ['then'],
    }],
    'react/function-component-definition': ['error', {
      namedComponents: 'arrow-function',
      unnamedComponents: 'arrow-function',
    }],
    'react/no-unstable-nested-components': ['error', {
      allowAsProps: true,
    }],
    'jsx-a11y/anchor-is-valid': 0,
  },
};
