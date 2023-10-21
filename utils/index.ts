export function drawPath (paths: any) {
  const { $anime } = useNuxtApp();

  // Start the staggered animation when the component is mounted
  $anime({
    targets: paths,
    strokeDashoffset: [$anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2000,

    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    delay: function (el, i) {
      return i * 100; // Delay each path animation
    },
    direction: 'alternate',
    loop: false,
  });
}
