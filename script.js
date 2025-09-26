<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Test Case Manager</title>
  <style>
    body {
      margin: 0;
      font-family: Arial, sans-serif;
      background: #121212;
      color: #ddd;
    }

    .sidebar {
      width: 200px;
      background: #1e1e1e;
      height: 100vh;
      padding: 20px 0;
      float: left;
    }

    .sidebar a {
      display: block;
      padding: 12px 20px;
      color: #ddd;
      text-decoration: none;
    }

    .sidebar a:hover,
    .sidebar .active {
      background: #2a3f74;
      border-radius: 6px;
    }

    .main {
      margin-left: 220px;
      padding: 20px;
    }

    h2 {
      margin-bottom: 20px;
    }

    .table {
      width: 100%;
      border-collapse: collapse;
      background: #1e1e1e;
      border-radius: 10px;
      overflow: hidden;
    }

    .table th, .table td {
      padding: 14px;
      text-align: left;
      border-bottom: 1px solid #333;
    }

    .status-passed {
      color: #4CAF50;
      font-weight: bold;
    }

    .status-failed {
      color: #f44336;
      font-weight: bold;
    }

    .btn {
      background: #2a2a2a;
      border: 1px solid #444;
      padding: 6px 12px;
      color: #ddd;
      border-radius: 5px;
      cursor: pointer;
    }

    .btn:hover {
      background: #3a3a3a;
    }

    .logout {
      float: right;
      margin: 10px;
      background: transparent;
      border: 1px solid #555;
      color: #ddd;
      padding: 6px 14px;
      border-radius: 5px;
      cursor: pointer;
    }

    .logout:hover {
      background: #333;
    }
  </style>
</head>
<body>
  <button class="logout">Logout</button>

  <div class="sidebar">
    <a href="#">Dashboard</a>
    <a href="#">Add Test Case</a>
    <a href="#" class="active">View Test Cases</a>
  </div>

  <div class="main">
    <h2>Test Cases</h2>
    <table class="table">
      <thead>
        <tr>
          <th>Test Case Name</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody id="tableBody"></tbody>
    </table>
  </div>

  <script>
    // جلب الـ test cases من localStorage
    let testCases = JSON.parse(localStorage.getItem("testCases")) || [];

    // مكان عرض البيانات
    let tableBody = document.getElementById("tableBody");

    // لو مفيش بيانات
    if (testCases.length === 0) {
      tableBody.innerHTML = "<tr><td colspan='3'>No Test Cases Found</td></tr>";
    } else {
      // عرض البيانات
      testCases.forEach(tc => {
        let row = document.createElement("tr");
        row.innerHTML = `
          <td>${tc.title}</td>
          <td class="${tc.status.toLowerCase() === 'pass' ? 'status-passed' : 'status-failed'}">
            ${tc.status}
          </td>
          <td>
            <button class="btn" onclick="viewTestCase('${tc.id}')">View</button>
          </td>
        `;
        tableBody.appendChild(row);
      });
    }

    // Function بسيطة لعرض تفاصيل Test Case (ممكن تطورها بعدين)
    function viewTestCase(id) {
      let tc = testCases.find(item => item.id === id);
      if (tc) {
        alert(`
Test Case: ${tc.title}
Steps: ${tc.steps}
Expected: ${tc.expected}
Actual: ${tc.actual}
Status: ${tc.status}
        `);
      }
    }
  </script>
</body>
</html>