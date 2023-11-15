export default defineAppConfig({
  theme: {
    primaryColor: '#ababab',
  },
  ui: {
    primary: 'red',
    gray: 'zinc',
    popover: {
      container:
          'z-50 group', // z-50 is for the popover to be on top of the sidebar
    },
  },
});
