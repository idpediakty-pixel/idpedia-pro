const API_BASE_URL = http://localhost:5000/api";
const state = { selectedRole: "official", token: "", user: null, organizations: [], students: [], editingStudentId: null, selectedPhoto: null };
const $ = (id) => document.getElementById(id);

function setRole(role) {
  state.selectedRole = role;
  $("officialTab").classList.toggle("active", role === "official");
  $("orgTab").classList.toggle("active", role === "organization");
  $("loginError").hidden = true;
}

async function api(path, options = {}) {
  const headers = options.headers || {};
  if (state.token) headers.Authorization = "Bearer " + state.token;
  const res = await fetch(API_BASE_URL + path, { ...options, headers });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data.message || "Something went wrong");
  return data;
}

async function login(e) {
  e.preventDefault();
  try {
    const data = await api("/auth/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: state.selectedRole, username: $("username").value.trim(), password: $("password").value.trim() })
    });
    state.token = data.token;
    state.user = data.user;
    $("loginPage").hidden = true;
    $("appPage").hidden = false;
    $("loginForm").reset();
    await loadDashboard();
  } catch (err) {
    $("loginError").textContent = err.message;
    $("loginError").hidden = false;
  }
}

async function loadDashboard() {
  const official = state.user.role === "official";
  document.querySelectorAll(".official-only").forEach((el) => { el.hidden = !official; });
  $("roleBadge").textContent = official ? "Super Admin" : "Institution";
  $("contextLabel").textContent = official ? "Official Dashboard" : "Organization Dashboard";
  if (official) {
    showPanel("official");
    await loadOrganizations();
  } else {
    $("activeOrgName").textContent = state.user.orgName;
    $("activeOrgId").textContent = state.user.orgId;
    showPanel("organization");
    await loadStudents();
  }
}

function showPanel(panel) {
  $("officialPanel").hidden = panel !== "official";
  $("orgPanel").hidden = panel !== "organization";
  $("recordsPanel").hidden = panel !== "records";
  document.querySelectorAll(".nav-item").forEach((b) => b.classList.remove("active"));
  $(panel === "records" ? "navRecords" : "navRegistration").classList.add("active");
  $("pageTitle").textContent = panel === "records" ? "View Records" : state.user && state.user.role === "official" ? "Register Organization" : "New Student Registration";
}

async function loadOrganizations() {
  const data = await api("/organizations");
  state.organizations = data.organizations;
  $("orgTableBody").innerHTML = state.organizations.map((o) => "<tr><td>" + o.orgName + "</td><td>" + o.orgId + "</td><td>" + o.userId + "</td></tr>").join("");
}

async function saveOrganization(e) {
  e.preventDefault();
  await api("/organizations", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ orgName: $("newOrgName").value.trim(), orgId: $("newOrgId").value.trim(), userId: $("newOrgUserId").value.trim(), password: $("newOrgPass").value.trim() })
  });
  $("orgForm").reset();
  await loadOrganizations();
  alert("New Organization Registered Successfully!");
}

async function loadStudents() {
  const data = await api("/students");
  state.students = data.students;
  renderStudents();
}

function photoUrl(s) {
  if (!s.photoUrl) return "https://via.placeholder.com/150?text=No+Photo";
  return s.photoUrl.startsWith("http") ? s.photoUrl : API_BASE_URL.replace("/api", "") + s.photoUrl;
}

function renderStudents() {
  if (!state.students.length) {
    $("studentTableBody").innerHTML = '<tr><td colspan="5">No records saved yet. New entries will automatically appear here.</td></tr>';
    return;
  }
  $("studentTableBody").innerHTML = state.students.map((s) =>
    '<tr>' +
    '<td><img class="student-photo" src="' + photoUrl(s) + '" alt="' + s.name + '"></td>' +
    '<td>' + s.admnNo + '</td>' +
    '<td>' + s.name + '</td>' +
    '<td>' + s.classDept + '</td>' +
    '<td><div class="row-actions"><button onclick="startEdit(\'' + s._id + '\')" type="button">Edit</button><button onclick="deleteStudent(\'' + s._id + '\')" type="button">Delete</button></div></td>' +
    '</tr>'
  ).join("");
}

async function saveStudent(e) {
  e.preventDefault();
  const formData = new FormData($("studentForm"));
  if (!state.selectedPhoto) formData.delete("photo");
  await api(state.editingStudentId ? "/students/" + state.editingStudentId : "/students", { method: state.editingStudentId ? "PUT" : "POST", body: formData });
  resetStudentForm();
  await loadStudents();
  alert("Saved successfully!");
}

function startEdit(id) {
  const s = state.students.find((x) => x._id === id);
  if (!s) return;
  state.editingStudentId = id;
  ["admnNo", "name", "classDept", "guardian", "mobile", "house", "place"].forEach((f) => { $(f).value = s[f] || ""; });
  $("saveStudentBtn").textContent = "Update Database";
  $("cancelEditBtn").hidden = false;
  scrollTo({ top: 0, behavior: "smooth" });
}

async function deleteStudent(id) {
  if (!confirm("Are you sure you want to delete this record?")) return;
  await api("/students/" + id, { method: "DELETE" });
  await loadStudents();
}

function resetStudentForm() {
  state.editingStudentId = null;
  state.selectedPhoto = null;
  $("studentForm").reset();
  $("photoPreviewWrap").hidden = true;
  $("saveStudentBtn").textContent = "Save to Database";
  $("cancelEditBtn").hidden = true;
}

function showRecords(mode) {
  showPanel("records");
  $("recordsTitle").textContent = mode === "zip" ? "Export to ZIP" : mode === "active" ? "Active Users" : "View Records";
  const source = state.user.role === "official" ? state.organizations : [{ orgName: state.user.orgName, orgId: state.user.orgId }];
  $("recordsList").innerHTML = mode === "active"
    ? '<div class="record-card"><div><strong>Active organization users</strong><span>Live status can be extended later with socket sessions.</span></div></div>'
    : source.map((o) => '<div class="record-card"><div><strong>' + o.orgId + ' - ' + o.orgName + '</strong><span>Class-wise records are available from the Student API.</span></div></div>').join("");
}

function logout() {
  state.token = "";
  state.user = null;
  state.organizations = [];
  state.students = [];
  resetStudentForm();
  $("appPage").hidden = true;
  $("loginPage").hidden = false;
}

$("officialTab").onclick = () => setRole("official");
$("orgTab").onclick = () => setRole("organization");
$("loginForm").onsubmit = login;
$("orgForm").onsubmit = saveOrganization;
$("studentForm").onsubmit = saveStudent;
$("logoutBtn").onclick = logout;
$("mobileLogoutBtn").onclick = logout;
$("cancelEditBtn").onclick = resetStudentForm;
$("clearPhotoBtn").onclick = () => { state.selectedPhoto = null; $("photo").value = ""; $("photoPreviewWrap").hidden = true; };
$("photo").onchange = () => { const f = $("photo").files[0]; state.selectedPhoto = f || null; if (f) { $("photoPreview").src = URL.createObjectURL(f); $("photoPreviewWrap").hidden = false; } };
$("navRegistration").onclick = () => showPanel(state.user.role === "official" ? "official" : "organization");
$("navRecords").onclick = () => showRecords("records");
$("navZip").onclick = () => showRecords("zip");
$("navActiveUsers").onclick = () => showRecords("active");
