const form = document.querySelector("#test-form");
const results = document.querySelector("#results");
const status = document.querySelector("#status");
const generateButton = document.querySelector("#generate-button");
const clearButton = document.querySelector("#clear-button");
const copyButton = document.querySelector("#copy-button");
const scriptSection = document.querySelector("#script-section");
const scriptOutput = document.querySelector("#script-output");
const copyScriptButton = document.querySelector("#copy-script-button");

form.addEventListener("submit", async (event) => {
  event.preventDefault();
  const data = new FormData(form);
  const requirement = [
    `Requirement: ${data.get("requirement")}`,
    data.get("scenario") && `Scenario / feature: ${data.get("scenario")}`,
    data.get("userRole") && `User role: ${data.get("userRole")}`,
    data.get("priority") && `Priority: ${data.get("priority")}`,
    data.get("platform") && `Platform / environment: ${data.get("platform")}`,
    data.get("details") && `Additional details: ${data.get("details")}`,
  ].filter(Boolean).join("\n");

  generateButton.disabled = true;
  status.textContent = "Generating test cases...";
  results.textContent = "";
  copyButton.hidden = true;
  scriptSection.hidden = true;
  scriptOutput.value = "";

  try {
    const response = await fetch("/api/ai/generate-tests", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ requirement }),
    });
    const payload = await response.json();
    if (!response.ok || !payload.success) throw new Error(payload.error || "Request failed");
    results.textContent = JSON.stringify(payload.data, null, 2);
    scriptOutput.value = payload.data.playwrightScript || "";
    scriptSection.hidden = !scriptOutput.value;
    copyButton.hidden = false;
    status.textContent = "Test cases generated successfully.";
    status.style.color = "#72d5c2";
  } catch (error) {
    status.textContent = error instanceof Error ? error.message : "Unable to generate test cases.";
    status.style.color = "#f4b6a9";
  } finally {
    generateButton.disabled = false;
  }
});

clearButton.addEventListener("click", () => {
  form.reset();
  results.innerHTML = '<span class="placeholder">Your generated test cases will appear here.</span>';
  status.textContent = "";
  copyButton.hidden = true;
  scriptSection.hidden = true;
  scriptOutput.value = "";
});

copyButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(results.textContent);
  copyButton.textContent = "Copied";
  setTimeout(() => { copyButton.textContent = "Copy JSON"; }, 1200);
});

copyScriptButton.addEventListener("click", async () => {
  await navigator.clipboard.writeText(scriptOutput.value);
  copyScriptButton.textContent = "Copied";
  setTimeout(() => { copyScriptButton.textContent = "Copy script"; }, 1200);
});
