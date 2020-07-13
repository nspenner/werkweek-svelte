var ghpages = require("gh-pages");

ghpages.publish(
  "public",
  {
    branch: "gh-pages",
    repo: "https://github.com/nspenner/werkweek-svelte.git",
    user: {
      name: "nspenner",
      email: "nathan.minchow@outlook.com",
    },
  },
  () => {
    console.log("Deploy Complete!");
  }
);
