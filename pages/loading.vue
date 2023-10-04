<template>
  <div class="splash-screen">
    <svg xmlns="http://www.w3.org/2000/svg" width="400" height="400" class=".lines">
      <!-- Outer Circle -->
      <circle
        cx="200"
        cy="200"
        r="190"
        fill="none"
        stroke="#3498db"
        stroke-width="4"
      />

      <!-- Concentric Circles -->
      <circle
        cx="200"
        cy="200"
        r="140"
        fill="none"
        stroke="#e74c3c"
        stroke-width="4"
      />
      <circle
        cx="200"
        cy="200"
        r="120"
        fill="none"
        stroke="#f39c12"
        stroke-width="4"
      />
      <circle
        cx="200"
        cy="200"
        r="100"
        fill="none"
        stroke="#27ae60"
        stroke-width="4"
      />
      <circle
        cx="200"
        cy="200"
        r="80"
        fill="none"
        stroke="#9b59b6"
        stroke-width="4"
      />

      <!-- Petal-like Shapes -->
      <path d="M200,120 Q240,150 200,180 Q160,150 200,120" fill="none" stroke="#e74c3c" stroke-width="4" />
      <path d="M200,120 Q240,150 200,180 Q160,150 200,120" transform="rotate(72 200 200)" fill="none" stroke="#f39c12" stroke-width="4" />
      <path d="M200,120 Q240,150 200,180 Q160,150 200,120" transform="rotate(144 200 200)" fill="none" stroke="#27ae60" stroke-width="4" />
      <path d="M200,120 Q240,150 200,180 Q160,150 200,120" transform="rotate(216 200 200)" fill="none" stroke="#9b59b6" stroke-width="4" />
      <path d="M200,120 Q240,150 200,180 Q160,150 200,120" transform="rotate(288 200 200)" fill="none" stroke="#3498db" stroke-width="4" />

      <!-- Intricate Patterns -->
      <!-- More complex paths, patterns, and shapes -->
      <!-- Example: -->
      <!-- Add more complex paths and patterns -->

      <!-- Central Design Element -->
      <circle cx="200" cy="200" r="10" fill="#e74c3c" />

      <!-- Additional Details -->
      <!-- Continue to add more patterns, shapes, and details to expand the mandala -->
    </svg>
  </div>
</template>

<script setup>
const { $anime } = useNuxtApp();

onMounted(() => {
  const path = document.querySelectorAll('path'); // Select all path elements

  // Start the staggered animation when the component is mounted
  $anime({
    targets: path,
    strokeDashoffset: [$anime.setDashoffset, 0],
    easing: 'easeInOutSine',
    duration: 2000,
    delay: function (el, i) {
      return i * 100; // Delay each path animation
    },
    direction: 'alternate',
    loop: true,
  });
});
</script>

<style scoped>
.splash-screen {
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
  background-color: #282c35; /* Background color for the splash screen */
}

/* Style the SVG shapes here, e.g., .splash-screen circle */
</style>
