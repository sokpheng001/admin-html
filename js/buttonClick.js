let currentTooltip;

function openModal() {
  document.getElementById("deleteConfirmationModal").style.display = "block";
}

function closeModal() {
  document.getElementById("deleteConfirmationModal").style.display = "none";
}

function deleteRecord() {
  closeModal();
  alert("Record deleted (This is a placeholder action).");
}

// Optional: Close the modal if the user clicks outside the modal
window.onclick = function (event) {
  var modal = document.getElementById("deleteConfirmationModal");
  if (event.target == modal) {
    closeModal();
  }
};

// ------------------------------------------------------------------------------------------------
// Function to handle email clicks
function handleEmailClick(event) {
  console.log("អ៊ីមែលត្រូវបានចុច!"); // "Email clicked!" in Khmer
  event.preventDefault(); // Prevent the default action (i.e., highlighting the email or any other default browser behavior)

  const emailElement = event.target;
  const fullEmail = emailElement.dataset.email || emailElement.innerText.trim(); // Get full email from data attribute
  if (!fullEmail) {
    console.error("រកអ៊ីមែលមិនឃើញ!"); // "Couldn't find the email!"
    return;
  }

  // Remove any existing tooltip
  if (currentTooltip) {
    currentTooltip.remove();
  }

  // Create a tooltip after a small delay to avoid blocking copy interaction
  setTimeout(() => {
    // Create tooltip elements
    const tooltip = document.createElement("div");
    tooltip.style.position = "absolute";
    tooltip.style.background = "white";
    tooltip.style.border = "1px solid black";
    tooltip.style.padding = "10px";
    tooltip.style.zIndex = "1000";
    tooltip.style.top = `${event.clientY + 20}px`; // Make sure it's not overlapping
    tooltip.style.left = `${event.clientX}px`;

    // Email text
    const emailText = document.createElement("span");
    emailText.textContent = fullEmail;

    // Copy button
    const copyButton = document.createElement("button");
    copyButton.style.cursor = "pointer";
    copyButton.textContent = "ចម្លង"; // "Copy" in Khmer
    copyButton.onclick = function () {
      navigator.clipboard
        .writeText(fullEmail) // Copy full email from data-email
        .then(() => alert("អ៊ីមែលត្រូវបានចម្លងទៅក្ដារតម្លាក់ខ្ទាស់!")) // "Email copied to clipboard!" in Khmer
        .catch((err) => console.error("មិនអាចចម្លងអ៊ីមែលបានទេ: ", err));
      tooltip.remove();
      currentTooltip = null;
    };

    // Append elements
    tooltip.appendChild(emailText);
    tooltip.appendChild(document.createElement("br"));
    tooltip.appendChild(copyButton);
    document.body.appendChild(tooltip);
    currentTooltip = tooltip;

    // Close tooltip when clicking outside
    setTimeout(() => {
      document.addEventListener("click", function handleOutsideClick(event) {
        if (currentTooltip && !tooltip.contains(event.target)) {
          tooltip.remove();
          currentTooltip = null;
          document.removeEventListener("click", handleOutsideClick);
        }
      });
    }, 10);
  }, 100); // Delay to avoid blocking interaction
}
// Attach event listener to the table container using event delegation
document.addEventListener("DOMContentLoaded", function () {
  console.log("DOM បានបង្ហាញរួចហើយ!"); // "DOM is ready!" in Khmer

  // Event delegation: Listen for clicks on any email display element inside the table
  document
    .querySelector(".student-table")
    .addEventListener("click", function (event) {
      if (event.target && event.target.classList.contains("email-display")) {
        handleEmailClick(event);
      }
    });
});
