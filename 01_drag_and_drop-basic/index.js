const items = [
  {
    title: "Call the dentist",
    content:
      "Schedule a check-up appointment for next week. Buy vegetables, fruits, and other essentials for the week. Buy vegetables, fruits, and other essentials for the week.",
  },
  {
    title: "Grocery shopping",
    content: "Buy vegetables, fruits, and other essentials for the week.",
  },
  {
    title: "Reply to all pending emails",
    content: "Ensure all communications are up to date.",
  },
  {
    title: "Prepare a presentation for Monday's meeting",
    content: "Gather all necessary data and slides.",
  },
  {
    title: "Research new marketing strategies",
    content: "Explore current trends for upcoming campaigns.",
  },
  {
    title: "Review and update the budget report",
    content: "Ensure all financials are accurate.",
  },
  {
    title: "Organize the workspace for better efficiency",
    content: "A tidy space improves productivity.",
  },
  {
    title: "Plan the team building activity for next month",
    content: "Boost team morale with a fun activity.",
  },
  {
    title: "Update the software on all office computers",
    content: "Ensure all systems are running the latest versions.",
  },
  {
    title: "Write a blog post about the latest project",
    content: "Share insights and results with your audience.",
  },
  {
    title: "Review monthly subscriptions",
    content: "Check for any unused subscriptions and cancel them.",
  },
  {
    title: "Book a car service appointment",
    content: "Schedule a maintenance check for the car before the road trip.",
  },
];

const state = {
  boards: [
    {
      boardId: "B00001",
      items: [...items.slice(0, 4)],
    },
  ],
};

const board = document.querySelector(".board");

board.insertAdjacentElement(
  "afterbegin",
  generateMarkupList(state.boards[0].items)
);

const draggables = document.querySelectorAll("li[draggable='true']");
draggables.forEach(addListeners);

function generateMarkupList(items) {
  const itemsMarkup = items
    .map(({ title, content }, index) =>
      generateMarkupItem({ id: index, title, content })
    )
    .join("");

  const itemList = document.createElement("ul");
  itemList.classList.add("item-list");
  itemList.innerHTML = sanitizeMarkup(itemsMarkup);

  return itemList;
}

function generateMarkupItem({ id, title, content }) {
  return `
    <li class="item" draggable="true" data-id="${id}">
        <h3 class="item--title">${title}</h3>
        <p class="item--content truncate">${content}</p>
    </li>
    `;
}

function sanitizeMarkup(markup) {
  return markup
    .replace(/<script/gi, "&lt;script")
    .replace(/<\/script>/gi, "&lt;/script&gt;");
}

function handleDragstart(e) {
  e.dataTransfer.setData("text/plain", this.dataset.id);
  this.classList.add("dragging");
}

function addListeners(el) {
  el.addEventListener("dragover", handleDragover);
  el.addEventListener("dragstart", handleDragstart);
  el.addEventListener("dragend", handleDragend);
  el.addEventListener("drop", handleDrop);
}

function handleDrag() {}

function handleDragend() {
  this.classList.remove("dragging");
}

function handleDragenter() {}

function handleDragover(e) {
  e.preventDefault();
}

function handleDragleave() {}

function handleDrop(e) {
  e.preventDefault();
  const draggedId = e.dataTransfer.getData("text/plain");
  const targetId = this.dataset.id;
  this.classList.remove("dragover");

  if (draggedId === targetId) return;

  swapItems(draggedId, targetId);
}

function swapItems(draggedId, targetId) {
  const draggedItem = document.querySelector(`li[data-id="${draggedId}"]`);
  const targetItem = document.querySelector(`li[data-id="${targetId}"]`);

  if (!draggedItem || !targetItem) return;

  const { parentNode } = draggedItem;
  const placeholder = document.createElement("li");

  parentNode.insertBefore(placeholder, draggedItem);
  parentNode.insertBefore(draggedItem, targetItem);
  parentNode.insertBefore(targetItem, placeholder);
  placeholder.remove();
}
