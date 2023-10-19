import type { Config } from 'tailwindcss';
export default <Partial<Config>> {
  content: [
    'docs/content/**/*.md',
  ],
  // darkMode: 'class' // maybe I don't need this because nuxtUI auto imports colorMode?

};
