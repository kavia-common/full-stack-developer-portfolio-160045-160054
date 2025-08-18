const API_BASE = process.env.REACT_APP_API_BASE_URL || "";

/**
 * Helper to handle fetch responses and errors consistently.
 * Converts non-2xx to Error and parses JSON when applicable.
 * @param {Response} res
 * @returns {Promise<any>}
 */
async function handleJson(res) {
  const contentType = res.headers.get("content-type") || "";
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    const err = new Error(errText || `Request failed with status ${res.status}`);
    err.status = res.status;
    throw err;
  }
  if (contentType.includes("application/json")) {
    return res.json();
  }
  return res.text();
}

/**
 * Build absolute URL based on env-configured API base.
 * @param {string} path
 */
function url(path) {
  if (!API_BASE) return path;
  // Ensure single slash between base and path
  return `${API_BASE.replace(/\/+$/, "")}/${path.replace(/^\/+/, "")}`;
}

// PUBLIC_INTERFACE
export async function getAbout() {
  /** Fetch About content: { status, data: About } */
  const res = await fetch(url("/api/about"), { headers: { Accept: "application/json" } });
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function getSkills() {
  /** Fetch skills categories: { status, data: SkillCategory[] } */
  const res = await fetch(url("/api/skills"), { headers: { Accept: "application/json" } });
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function getExperience() {
  /** Fetch experience timeline: { status, data: ExperienceItem[] } */
  const res = await fetch(url("/api/experience"), { headers: { Accept: "application/json" } });
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function getProjects() {
  /** Fetch featured projects: { status, data: Project[] } */
  const res = await fetch(url("/api/projects"), { headers: { Accept: "application/json" } });
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function getContactDetails() {
  /** Fetch public contact details: { status, data: ContactDetails } */
  const res = await fetch(url("/api/contact"), { headers: { Accept: "application/json" } });
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function submitContact(payload) {
  /** Submit contact message: returns 201 with ContactMessageResponse */
  const res = await fetch(url("/api/contact"), {
    method: "POST",
    headers: { "Content-Type": "application/json", Accept: "application/json" },
    body: JSON.stringify(payload),
  });
  return handleJson(res);
}

// PUBLIC_INTERFACE
export async function downloadResume() {
  /**
   * Download resume blob and return an object URL plus filename.
   * Caller should revokeObjectURL when done.
   */
  const res = await fetch(url("/api/resume"));
  if (!res.ok) {
    const errText = await res.text().catch(() => "");
    const err = new Error(errText || `Resume download failed with status ${res.status}`);
    err.status = res.status;
    throw err;
  }
  const blob = await res.blob();
  // Try to extract filename from Content-Disposition
  const cd = res.headers.get("content-disposition") || "";
  let filename = "resume";
  const match = cd.match(/filename\*?=(?:UTF-8''|")?([^;"]+)/i);
  if (match && match[1]) {
    try {
      filename = decodeURIComponent(match[1].replace(/["']/g, ""));
    } catch {
      filename = match[1].replace(/["']/g, "");
    }
  } else {
    // Best guess for common types
    const type = blob.type || "";
    if (type.includes("pdf")) filename = "resume.pdf";
    else if (type.includes("msword") || type.includes("wordprocessingml")) filename = "resume.docx";
    else filename = "resume.txt";
  }
  const objectUrl = URL.createObjectURL(blob);
  return { objectUrl, filename };
}
