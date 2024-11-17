export default {
  '*.{ts?(x)}': () => 'tsc -p tsconfig.json --noEmit --pretty',
  '*.!{js?(x),ts?(x)}': ['prettier --ignore-unknown --write'],
  '*.{js?(x),ts?(x)}': ['prettier --ignore-unknown --write', 'eslint --fix --max-warnings=0'],
};
