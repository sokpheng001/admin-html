function getAllStudents() {
  const tableBody = document.querySelector(".student-table tbody");

  fetch("../php/service/student_service.php?read=true", {
    method: "GET",
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      return response.json(); // Parse JSON data only if response is ok
    })
    .then((data) => {
      if (data.length === 0) {
        checkIfNoData("empty");
        return; // Exit the function if no data is found
      }

      // Truncate email if it's too long
      const truncateEmail = (email) => {
        if (email.length > 5) {
          return email.slice(0, 5) + "...";
        }
        return email;
      };

      // Loop through the data and add rows to the table
      data.forEach((user) => {
        const row = document.createElement("tr");

        row.innerHTML = `
          <td>${user.stu_id}</td>  <!-- Student ID -->
          <td>${user.khmer_name}</td>  <!-- Khmer Name -->
          <td>${user.latin_name}</td>  <!-- Latin Name -->
          <td>${user.father_name}</td>  <!-- Father Name -->
          <td>${user.mother_name}</td>  <!-- Mother Name -->
          <td>${user.date_of_birth}</td>  <!-- Date of Birth -->
          <td>${user.place_of_birth}</td>  <!-- Place of Birth -->
          <td>
            <span style="cursor: pointer" class="email-display" data-email="${
              user.original_email
            }">
              ${truncateEmail(user.original_email)}
            </span>
          </td>  <!-- Original Email -->
          <td>
            <span style="cursor: pointer" class="email-display" data-email="${
              user.school_email
            }">
              ${truncateEmail(user.school_email)}
            </span>
          </td>  <!-- School Email -->
          <td>${user.phone_number}</td>  <!-- Phone Number -->
          <td>${user.major}</td>  <!-- Major -->
          <td>${user.expired_date}</td>  <!-- Expired Date -->
          <td>${user.gender}</td>  <!-- Gender -->
          <td>
            <button class="action-button edit">កែ</button>
            <button class="action-button delete" onclick="openModal()">លុប</button>
          </td>  <!-- Actions -->
        `;

        tableBody.appendChild(row);
      });
    })
    .catch((error) => {
      checkIfNoData("error");
      console.error("Error fetching users:", error);
    });
}

function checkIfNoData(status) {
  const tableBody = document.querySelector("table tbody");
  const message = document.createElement("tr");
  const cell = document.createElement("td");
  cell.colSpan = 13; // Adjust the number of columns based on your table
  cell.style.textAlign = "center";
  if (status.toLocaleLowerCase() === "error") {
    cell.textContent = "ការទទួលទិន្នន័យពី Server មានបញ្ហា ⚠️"; // "Error fetching data from Server" in Khmer
  } else if (status.toLocaleLowerCase() === "empty") {
    cell.textContent = "មិនមានទិន្នន័យ 🪹"; // "No data available" in Khmer
  } else {
    cell.textContent = status + " ⚠️"; // Show the specific status message with a warning symbol
  }
  message.appendChild(cell);
  tableBody.appendChild(message);
}

getAllStudents();


function deleteStudentId(stu_id){}