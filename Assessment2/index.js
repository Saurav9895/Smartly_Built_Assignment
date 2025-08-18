const colors = {
  background: "#f5f5f5",
  white: "#ffffff",
};
const items = [
  {
    button: document.getElementById("recent-conversation"),
    link: document.getElementById("recent-conversation-link"),
    containerIndex: 0,
  },
  {
    button: document.getElementById("all-conversations"),
    link: document.getElementById("all-conversations-link"),
    containerIndex: 1,
  },
  {
    button: document.getElementById("photos"),
    link: document.getElementById("photos-link"),
    containerIndex: 2,
  },
];

const conversationContainers = document.querySelectorAll(
  ".section-two .fourth-container"
);

function activateTab(activeIndex) {
  items.forEach((item, index) => {
    conversationContainers[index].classList.toggle(
      "displaying",
      index !== activeIndex
    );

    item.button.style.backgroundColor =
      index === activeIndex ? colors.background : colors.white;

    item.link.style.textDecoration =
      index === activeIndex ? "none" : "underline";
  });
}

items.forEach((item, index) => {
  item.button.addEventListener("click", () => activateTab(index));
});

activateTab(0);
