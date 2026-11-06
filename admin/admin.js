const API_BASE = String(window.IMAGE_ADMIN_CONFIG?.apiBaseUrl || "").replace(/\/$/, "");
const translations = {
  zh: {
    back: "返回網站", eyebrow: "私人 Repo · 管理者", title: "網站圖片管理",
    intro: "使用具有私人 repo 寫入權限的 GitHub 帳號登入。儲存後會自動發布到網站，更新可能需要幾分鐘；照片會公開給所有訪客。",
    setupTitle: "管理服務尚未啟用", setupBody: "請先完成 Cloudflare Worker 與 GitHub App 設定，再填入管理 API 網址。",
    loginTitle: "管理者登入", loginHelp: "登入後即可管理網站圖片。唯有 repo 寫入成員可儲存變更。", loginButton: "使用 GitHub 登入",
    signedInAs: "目前登入：", logout: "登出", fixedEyebrow: "圖片位置", fixedTitle: "首頁影片封面與教授照片",
    fixedHelp: "選擇首頁影片封面或教授照片位置並上傳替換。", membersEyebrow: "成員管理", membersTitle: "成員資料與照片",
    membersHelp: "選擇成員卡片，可單獨修改姓名或替換照片。姓名與照片都會公開顯示。",
    finishMemberEdit: "請先儲存或取消目前的成員編輯，再編輯其他成員。",
    editMember: "編輯", cancelEdit: "取消", memberNameLabel: "成員姓名", memberImageLabel: "替換照片（選填）",
    memberImageHint: "不選新照片就只更新姓名；姓名會同時用於中英文網站。",
    memberSave: "儲存成員資料", memberSaved: "成員資料已提交至 main，網站正在更新。",
    slotLabel: "圖片位置", imageLabel: "替換圖片",
    fileHint: "JPG、PNG 或 WebP；單張上限 10 MiB，會優先轉為 WebP 以減少檔案大小。",
    previewEmpty: "選擇圖片後預覽", saveSlot: "儲存圖片", galleryEyebrow: "活動相簿", galleryTitle: "活動相簿",
    galleryHelp: "新增照片，或選擇既有項目替換照片及修改說明。", galleryTarget: "相簿項目", dateLabel: "活動日期",
    titleZh: "標題（繁體中文）", titleEn: "標題（English）", descriptionZh: "說明（繁體中文）",
    descriptionEn: "說明（English）", galleryImage: "活動照片", galleryFileHint: "新增項目必須選照片；修改既有項目時可只改文字。",
    saveGallery: "儲存相簿項目", homeImage: "首頁影片封面", professorImage: "教授照片",
    newGallery: "＋ 新增相簿照片", edit: "編輯", selectImage: "選擇圖片", needLogin: "請先使用 GitHub 登入。",
    loading: "讀取資料中…", preparing: "正在準備圖片…", saving: "正在上傳並提交至 main…", saved: "已提交至 main，GitHub Pages 正在更新。",
    saveFailed: "儲存失敗。請重新載入後再試，並確認登入帳號具有 repo 寫入權限。",
    loadFailed: "無法讀取相簿資料，請重新登入或稍後再試。", sessionExpired: "登入已過期，請重新登入。",
    unsupported: "請選擇 JPG、PNG 或 WebP 圖片。", tooLarge: "圖片不可超過 10 MiB。",
    chooseFile: "請先選擇圖片。", noPhotos: "目前尚無活動照片。", untitledPhoto: "未命名照片",
    saveError_image_required: "新增相簿照片請先選擇圖片。",
    saveError_invalid_image_size: "圖片必須大於 0，且不可超過 10 MiB。",
    saveError_invalid_image_type: "圖片格式無效，請使用 JPG、PNG 或 WebP。",
    saveError_request_too_large: "上傳內容超過大小限制；請縮小圖片後再試。",
    saveError_invalid_metadata: "日期格式不正確，或文字超過欄位字數上限。",
    saveError_invalid_manifest: "相簿資料格式有誤。請重新載入頁面；若仍發生請聯絡管理員。",
    saveError_conflict: "main 已有新變更，請重新載入資料後再儲存。",
    saveError_session_expired: "登入已逾時，請重新登入後再儲存。",
    saveError_sign_in_required: "登入工作階段無效，請重新登入。",
    saveError_invalid_session: "登入工作階段無效，請重新登入。",
    saveError_write_access_required: "此 GitHub 帳號沒有私人 repo 寫入權限。",
    saveError_github_permission_denied: "GitHub App 權限不足；請管理員檢查 App 安裝及 repo 權限。",
    saveError_github_rate_limited: "GitHub 暫時限制 API 請求，請稍候幾分鐘再試。",
    saveError_github_sso_required: "此帳號需要先完成組織 SSO 驗證，再重新登入。",
    saveError_github_api_forbidden: "GitHub 拒絕了 API 請求；請稍後再試，若持續發生請聯絡管理員。",
    saveError_github_auth_invalid: "GitHub 登入權杖已失效，請重新登入。",
    saveError_github_user_agent_required: "GitHub API 拒絕了請求標頭；請管理員確認 Worker 已更新。",
    saveError_github_api_failed: "GitHub API 暫時無法完成儲存，請稍後重試。",
    saveError_manifest_unavailable: "無法讀取相簿清單，請重新載入或稍後再試。",
    saveError_service_not_configured: "圖片管理服務設定不完整，請聯絡管理員。",
    saveError_network_error: "連線失敗，請檢查網路後再試。",
    saveError_image_prepare_failed: "瀏覽器無法處理這張圖片，請另存為 JPG、PNG 或 WebP 後再試。",
    saveError_refresh_failed: "圖片已提交，但清單更新失敗。請重新載入確認，避免重複上傳。",
    saveError_invalid_member_name: "姓名不可空白，且最多 60 字。",
    saveError_no_changes: "尚未修改姓名或選擇新照片。",
    saveError_unknown: "儲存失敗。請重新載入後再試；若仍發生，請提供畫面上的時間給管理員。",
    authError_oauth_denied: "你取消了 GitHub 授權。請重新登入並完成授權。",
    authError_oauth_failed: "GitHub 授權流程未完成。請從本頁重新開始登入。",
    authError_state_invalid: "登入狀態已失效或逾時。請從本頁重新開始登入，不要重複使用舊的登入頁。",
    authError_app_credentials_invalid: "GitHub App 憑證驗證失敗。請 repo 管理員在 Cloudflare 核對 Client ID 與 Secret；不要將 Secret 傳給他人。",
    authError_callback_mismatch: "GitHub App 的 Callback URL 與 Worker 設定不一致，請管理員核對 Callback URL。",
    authError_oauth_code_invalid: "GitHub 授權碼無效或已過期。請重新開始登入。",
    authError_email_unverified: "此 GitHub 帳號的主要 Email 尚未驗證。請先到 GitHub 驗證 Email，再重新登入。",
    authError_github_api_failed: "GitHub 暫時拒絕了登入請求。請稍後重試；若持續發生，請提供大約發生時間給管理員。",
    authError_github_api_forbidden: "GitHub 已完成授權，但個人資料 API 回覆 403。請管理員檢查 GitHub App 授權與帳號政策；若重試仍發生，請告知發生時間。",
    authError_github_user_agent_required: "GitHub API 拒絕了缺少或無效的 User-Agent 標頭。管理員需部署最新 Worker 後重新登入。",
    authError_github_auth_invalid: "GitHub 拒絕了這次短效登入權杖。請重新開始登入；若持續發生，請管理員檢查 App 授權狀態。",
    authError_github_rate_limited: "GitHub 暫時限制了 API 請求。請稍候幾分鐘後再登入。",
    authError_github_sso_required: "此 GitHub 帳號需要先完成組織 SSO 驗證。請先登入組織，再重新授權此 App。",
    authError_github_permission_denied: "GitHub App 權杖沒有存取所需資源的權限。請管理員檢查 App 是否安裝於此 repo，且帳號有寫入權限。",
    authError_write_access_required: "此 GitHub 帳號沒有此私人 repo 的寫入權限。請使用有寫入權限的帳號。",
    authError_session_setup_failed: "無法建立登入工作階段。請管理員檢查 Cloudflare Worker 與 KV 設定。",
    authError_unknown: "登入時發生未分類錯誤。請稍後重試，並提供大約發生時間給管理員。",
    uploadAdd: "新增照片", uploadUpdate: "更新照片／說明",
  },
  en: {
    back: "Back to website", eyebrow: "PRIVATE REPOSITORY · ADMIN", title: "Website Image Manager",
    intro: "Sign in with a GitHub account that can write to the private repository. Saves are published automatically; updates can take a few minutes. Photos are visible to all visitors.",
    setupTitle: "Management service is not enabled", setupBody: "Configure the Cloudflare Worker and GitHub App, then set the management API URL.",
    loginTitle: "Administrator sign-in", loginHelp: "Sign in to manage site images. Only repository members with write access can save changes.", loginButton: "Sign in with GitHub",
    signedInAs: "Signed in as ", logout: "Sign out", fixedEyebrow: "IMAGE SLOTS", fixedTitle: "Homepage video poster and professor photo",
    fixedHelp: "Choose the homepage video poster or professor photo slot and upload its replacement.", membersEyebrow: "MEMBERS", membersTitle: "Member details and photos",
    membersHelp: "Choose a member card to edit the name or replace the photo. Names and photos are public.",
    finishMemberEdit: "Save or cancel the current member edit before editing another member.",
    editMember: "Edit", cancelEdit: "Cancel", memberNameLabel: "Member name", memberImageLabel: "Replace photo (optional)",
    memberImageHint: "Leave the photo empty to update only the name. The same name appears on both language versions.",
    memberSave: "Save member details", memberSaved: "Member details committed to main. The website is updating.",
    slotLabel: "Image slot", imageLabel: "Replacement image",
    fileHint: "JPG, PNG, or WebP; up to 10 MiB. Images are converted to WebP when supported to reduce file size.",
    previewEmpty: "Image preview appears here", saveSlot: "Save image", galleryEyebrow: "GALLERY", galleryTitle: "Activity gallery",
    galleryHelp: "Add a photo or select an existing item to replace its image and edit its copy.", galleryTarget: "Gallery item", dateLabel: "Event date",
    titleZh: "Title (Traditional Chinese)", titleEn: "Title (English)", descriptionZh: "Description (Traditional Chinese)",
    descriptionEn: "Description (English)", galleryImage: "Activity photo", galleryFileHint: "A photo is required for new items; existing items can be updated without replacing the image.",
    saveGallery: "Save gallery item", homeImage: "Homepage video poster", professorImage: "Professor photo",
    newGallery: "＋ Add gallery photo", edit: "Edit", selectImage: "Choose image", needLogin: "Please sign in with GitHub first.",
    loading: "Loading…", preparing: "Preparing image…", saving: "Uploading and committing to main…", saved: "Committed to main. GitHub Pages is updating.",
    saveFailed: "Save failed. Reload and try again, and confirm your account has repository write access.",
    loadFailed: "Could not load image data. Sign in again or try later.", sessionExpired: "Your session expired. Please sign in again.",
    unsupported: "Choose a JPG, PNG, or WebP image.", tooLarge: "Images must be 10 MiB or smaller.",
    chooseFile: "Choose an image first.", noPhotos: "There are no activity photos yet.", untitledPhoto: "Untitled photo",
    saveError_image_required: "Choose an image before adding a gallery item.",
    saveError_invalid_image_size: "The image must be larger than 0 bytes and no more than 10 MiB.",
    saveError_invalid_image_type: "Unsupported image. Choose JPG, PNG, or WebP.",
    saveError_request_too_large: "The upload exceeds the size limit. Reduce the image size and try again.",
    saveError_invalid_metadata: "The date is invalid or text exceeds a field's character limit.",
    saveError_invalid_manifest: "The gallery data is invalid. Reload the page; contact the admin if it continues.",
    saveError_conflict: "main has changed. Reload the gallery data before saving again.",
    saveError_session_expired: "Your session expired. Sign in again before saving.",
    saveError_sign_in_required: "Your sign-in session is invalid. Sign in again.",
    saveError_invalid_session: "Your sign-in session is invalid. Sign in again.",
    saveError_write_access_required: "This GitHub account does not have write access to the private repository.",
    saveError_github_permission_denied: "The GitHub App lacks permission. Ask the admin to check its installation and repository access.",
    saveError_github_rate_limited: "GitHub temporarily rate-limited API requests. Wait a few minutes and try again.",
    saveError_github_sso_required: "This account needs organization SSO verification before signing in again.",
    saveError_github_api_forbidden: "GitHub denied the API request. Try later; contact the admin if it continues.",
    saveError_github_auth_invalid: "The GitHub sign-in token is invalid. Sign in again.",
    saveError_github_user_agent_required: "GitHub rejected the API request headers. Ask the admin to confirm the Worker is updated.",
    saveError_github_api_failed: "GitHub could not complete the save. Try again later.",
    saveError_manifest_unavailable: "Could not read the gallery list. Reload or try later.",
    saveError_service_not_configured: "The image management service is not fully configured. Contact the admin.",
    saveError_network_error: "Network connection failed. Check your connection and try again.",
    saveError_image_prepare_failed: "Your browser could not process this image. Save it as JPG, PNG, or WebP and try again.",
    saveError_refresh_failed: "The image was committed, but the list could not refresh. Reload to check before uploading again.",
    saveError_invalid_member_name: "Name cannot be blank and must be 60 characters or fewer.",
    saveError_no_changes: "No name change or replacement photo was provided.",
    saveError_unknown: "Save failed. Reload and try again; if it continues, tell the admin approximately when it happened.",
    authError_oauth_denied: "GitHub authorization was declined. Sign in again and approve the request.",
    authError_oauth_failed: "The GitHub authorization flow did not complete. Restart sign-in from this page.",
    authError_state_invalid: "The sign-in state expired or did not match. Restart sign-in from this page; do not reuse an old login page.",
    authError_app_credentials_invalid: "GitHub App credentials could not be verified. Ask the repository admin to check the Client ID and Secret in Cloudflare; never share the Secret.",
    authError_callback_mismatch: "The GitHub App callback URL does not match the Worker configuration. Ask the admin to verify the callback URL.",
    authError_oauth_code_invalid: "The GitHub authorization code is invalid or expired. Restart sign-in.",
    authError_email_unverified: "The primary email on this GitHub account is not verified. Verify it on GitHub, then sign in again.",
    authError_github_api_failed: "GitHub temporarily rejected the sign-in request. Try again later; if it persists, tell the admin approximately when it happened.",
    authError_github_api_forbidden: "GitHub authorized the app, but its profile API returned 403. Ask the admin to check the GitHub App authorization and account policy; include when it happened if it repeats.",
    authError_github_user_agent_required: "GitHub rejected the API request because its User-Agent header was missing or invalid. Ask the admin to deploy the latest Worker, then sign in again.",
    authError_github_auth_invalid: "GitHub rejected the short-lived sign-in token. Restart sign-in; if it persists, ask the admin to check the app authorization.",
    authError_github_rate_limited: "GitHub temporarily rate-limited API requests. Wait a few minutes, then sign in again.",
    authError_github_sso_required: "This GitHub account requires organization SSO. Sign in to the organization, then authorize the app again.",
    authError_github_permission_denied: "The GitHub App token cannot access a required resource. Ask the admin to verify the app installation and your repository write access.",
    authError_write_access_required: "This GitHub account does not have write access to the private repository. Use an account with write access.",
    authError_session_setup_failed: "A sign-in session could not be created. Ask the admin to check the Cloudflare Worker and KV settings.",
    authError_unknown: "An unclassified sign-in error occurred. Try again later and tell the admin approximately when it happened.",
    uploadAdd: "Add photo", uploadUpdate: "Update photo / copy",
  },
};

const AUTH_ERROR_CODES = new Set([
  "oauth_denied", "oauth_failed", "state_invalid", "app_credentials_invalid",
  "callback_mismatch", "oauth_code_invalid", "email_unverified", "github_api_failed",
  "github_api_forbidden", "github_user_agent_required", "github_auth_invalid", "github_rate_limited",
  "github_sso_required", "github_permission_denied", "write_access_required",
  "session_setup_failed", "unknown",
]);

let savedLanguage = "zh";
try { savedLanguage = localStorage.getItem("soc-vlsi-eda-language") || "zh"; } catch { /* Storage may be unavailable in private browsing. */ }
let language = savedLanguage === "en" ? "en" : "zh";
let sessionId = "";
let authErrorCode = "";
let imageManifest = null;
let manifestRevision = "";
let slotPreviewUrl = "";
let galleryPreviewUrl = "";
let activeMemberEditor = "";
const memberPreviewUrls = new Map();
const t = (key) => translations[language][key] || key;
const el = (id) => document.getElementById(id);
const SAVE_ERROR_CODES = new Set([
  "image_required", "invalid_image_size", "invalid_image_type", "request_too_large", "invalid_metadata",
  "invalid_member_name", "no_changes",
  "invalid_manifest", "conflict", "session_expired", "sign_in_required", "invalid_session",
  "write_access_required", "github_permission_denied", "github_rate_limited", "github_sso_required",
  "github_api_forbidden", "github_auth_invalid", "github_user_agent_required", "github_api_failed",
  "manifest_unavailable", "service_not_configured", "network_error", "image_prepare_failed", "refresh_failed",
]);

function escapeHtml(value) {
  return String(value ?? "").replace(/[&<>"']/g, (character) => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" })[character]);
}

function localizedCopy(value) {
  return [value?.[language], value?.zh, value?.en].find((text) => typeof text === "string" && text.trim())?.trim() || "";
}

function galleryLabel(item) {
  return localizedCopy(item.title) || item.date || `${t("untitledPhoto")} · ${String(item.id || "item").slice(0, 6)}`;
}

function saveErrorMessage(code) {
  const safeCode = SAVE_ERROR_CODES.has(code) ? code : "unknown";
  return t(`saveError_${safeCode}`);
}

function applyLanguage() {
  document.documentElement.lang = language === "en" ? "en" : "zh-Hant";
  document.querySelectorAll("[data-i18n]").forEach((node) => { node.textContent = t(node.dataset.i18n); });
  el("language-toggle").textContent = language === "zh" ? "EN" : "中文";
  el("language-toggle").setAttribute("aria-label", language === "zh" ? "Switch to English" : "切換為繁體中文");
  el("login-link").textContent = t("loginButton");
  if (authErrorCode) showAuthError(authErrorCode);
  if (imageManifest) renderSelectors(false);
}

function status(target, message, kind = "") {
  target.textContent = message;
  target.dataset.kind = kind;
}

function showAuthError(code) {
  authErrorCode = AUTH_ERROR_CODES.has(code) ? code : "unknown";
  status(el("auth-status"), t(`authError_${authErrorCode}`), "error");
}

async function api(path, options = {}) {
  const headers = new Headers(options.headers || {});
  if (sessionId) headers.set("Authorization", `Bearer ${sessionId}`);
  const response = await fetch(`${API_BASE}${path}`, { ...options, headers, credentials: "omit" });
  if (response.status === 401) {
    sessionId = "";
    el("editor").hidden = true;
    el("auth-card").hidden = false;
    status(el("auth-status"), t("sessionExpired"), "error");
  }
  return response;
}

function setPreview(input, image, empty, currentUrlRef) {
  if (currentUrlRef === "slot") {
    if (slotPreviewUrl) URL.revokeObjectURL(slotPreviewUrl);
    slotPreviewUrl = "";
  } else {
    if (galleryPreviewUrl) URL.revokeObjectURL(galleryPreviewUrl);
    galleryPreviewUrl = "";
  }
  const file = input.files?.[0];
  if (!file) { image.hidden = true; empty.hidden = false; return; }
  const url = URL.createObjectURL(file);
  if (currentUrlRef === "slot") slotPreviewUrl = url;
  else galleryPreviewUrl = url;
  image.src = url;
  image.hidden = false;
  empty.hidden = true;
}

async function prepareImage(file) {
  if (!file) throw new Error("no-file");
  if (!["image/jpeg", "image/png", "image/webp"].includes(file.type)) throw new Error("unsupported");
  if (file.size > 10 * 1024 * 1024) throw new Error("too-large");
  if (!("createImageBitmap" in window)) return file;
  const bitmap = await createImageBitmap(file);
  const scale = Math.min(1, 2200 / Math.max(bitmap.width, bitmap.height));
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(bitmap.width * scale));
  canvas.height = Math.max(1, Math.round(bitmap.height * scale));
  canvas.getContext("2d").drawImage(bitmap, 0, 0, canvas.width, canvas.height);
  bitmap.close?.();
  const converted = await new Promise((resolve) => canvas.toBlob(resolve, "image/webp", 0.84));
  return converted && converted.size < file.size ? new File([converted], `${file.name.replace(/\.[^.]+$/, "")}.webp`, { type: "image/webp" }) : file;
}

function clearMemberPreviewUrls() {
  for (const url of memberPreviewUrls.values()) URL.revokeObjectURL(url);
  memberPreviewUrls.clear();
}

function renderMemberCards() {
  clearMemberPreviewUrls();
  activeMemberEditor = "";
  el("member-admin-grid").innerHTML = imageManifest.members.map((member, index) => {
    const id = escapeHtml(member.id);
    const name = escapeHtml(member.name);
    const image = escapeHtml(member.image);
    return `<article class="member-admin-card" data-member-card="${id}">
      <div class="member-admin-summary">
        <img src="../${image}" alt="" loading="lazy" />
        <div class="member-admin-summary-copy"><span>${String(index + 1).padStart(2, "0")}</span><h3>${name}</h3></div>
        <button class="secondary-button" type="button" data-edit-member="${id}" data-i18n="editMember">${escapeHtml(t("editMember"))}</button>
      </div>
      <form class="member-admin-form" data-member-form="${id}" hidden>
        <label><span data-i18n="memberNameLabel">${escapeHtml(t("memberNameLabel"))}</span><input type="text" data-member-name="${id}" maxlength="60" value="${name}" autocomplete="off" /></label>
        <label><span data-i18n="memberImageLabel">${escapeHtml(t("memberImageLabel"))}</span><input type="file" data-member-file="${id}" accept="image/jpeg,image/png,image/webp" /><small data-i18n="memberImageHint">${escapeHtml(t("memberImageHint"))}</small></label>
        <div class="member-admin-preview"><img src="../${image}" alt="" data-member-preview="${id}" /></div>
        <div class="member-admin-actions"><button class="primary-button" type="submit" data-i18n="memberSave">${escapeHtml(t("memberSave"))}</button><button class="secondary-button" type="button" data-cancel-member="${id}" data-i18n="cancelEdit">${escapeHtml(t("cancelEdit"))}</button></div>
        <p class="member-admin-status" data-member-status="${id}" role="status" aria-live="polite"></p>
      </form>
    </article>`;
  }).join("");

  el("member-admin-grid").querySelectorAll("[data-edit-member]").forEach((button) => {
    button.addEventListener("click", () => {
      const memberId = button.dataset.editMember;
      if (activeMemberEditor && activeMemberEditor !== memberId) {
        status(el("page-status"), t("finishMemberEdit"), "error");
        return;
      }
      activeMemberEditor = memberId;
      status(el("page-status"), "");
      button.hidden = true;
      const form = el("member-admin-grid").querySelector(`[data-member-form="${memberId}"]`);
      form.hidden = false;
      form.querySelector(`[data-member-name="${memberId}"]`).focus();
    });
  });

  el("member-admin-grid").querySelectorAll("[data-member-file]").forEach((input) => {
    input.addEventListener("change", () => {
      const memberId = input.dataset.memberFile;
      const preview = el("member-admin-grid").querySelector(`[data-member-preview="${memberId}"]`);
      const previousUrl = memberPreviewUrls.get(memberId);
      if (previousUrl) URL.revokeObjectURL(previousUrl);
      memberPreviewUrls.delete(memberId);
      const file = input.files?.[0];
      if (file) {
        const url = URL.createObjectURL(file);
        memberPreviewUrls.set(memberId, url);
        preview.src = url;
      } else {
        const member = imageManifest.members.find((entry) => entry.id === memberId);
        if (member) preview.src = `../${member.image}`;
      }
    });
  });

  el("member-admin-grid").querySelectorAll("[data-cancel-member]").forEach((button) => {
    button.addEventListener("click", () => {
      const memberId = button.dataset.cancelMember;
      const form = button.closest("form");
      const url = memberPreviewUrls.get(memberId);
      if (url) URL.revokeObjectURL(url);
      memberPreviewUrls.delete(memberId);
      form.reset();
      const member = imageManifest.members.find((entry) => entry.id === memberId);
      const preview = form.querySelector(`[data-member-preview="${memberId}"]`);
      if (member && preview) preview.src = `../${member.image}`;
      form.hidden = true;
      el("member-admin-grid").querySelector(`[data-edit-member="${memberId}"]`).hidden = false;
      activeMemberEditor = "";
      status(el("page-status"), "");
    });
  });

  el("member-admin-grid").querySelectorAll("[data-member-form]").forEach((form) => {
    form.addEventListener("submit", (event) => submitMemberForm(event, form.dataset.memberForm));
  });
}

function renderSelectors(renderMembers = true) {
  const previousSlot = el("slot-select").value;
  const options = [
    `<option value="hero">${escapeHtml(t("homeImage"))}</option>`,
    `<option value="professor">${escapeHtml(t("professorImage"))}</option>`,
  ];
  el("slot-select").innerHTML = options.join("");
  if ([...el("slot-select").options].some((option) => option.value === previousSlot)) el("slot-select").value = previousSlot;
  showCurrentSlotPreview();

  if (renderMembers) renderMemberCards();

  const previousGallery = el("gallery-target").value;
  el("gallery-target").innerHTML = [`<option value="new">${escapeHtml(t("newGallery"))}</option>`, ...imageManifest.gallery.map((item) => `<option value="${escapeHtml(item.id)}">${escapeHtml(galleryLabel(item))}</option>`)].join("");
  if ([...el("gallery-target").options].some((option) => option.value === previousGallery)) el("gallery-target").value = previousGallery;
  renderGalleryAdminList();
  populateGalleryForm();
}

function renderGalleryAdminList() {
  const target = el("gallery-admin-list");
  if (!imageManifest.gallery.length) { target.textContent = t("noPhotos"); return; }
  target.innerHTML = imageManifest.gallery.map((item) => {
    const title = localizedCopy(item.title);
    const date = typeof item.date === "string" ? item.date : "";
    return `<article class="gallery-admin-item"><img src="../${escapeHtml(item.image)}" alt="" loading="lazy" /><div>${title ? `<h3>${escapeHtml(title)}</h3>` : ""}${date ? `<p>${escapeHtml(date)}</p>` : ""}</div><button class="secondary-button" type="button" data-edit-gallery="${escapeHtml(item.id)}">${escapeHtml(t("edit"))}</button></article>`;
  }).join("");
  target.querySelectorAll("[data-edit-gallery]").forEach((button) => {
    button.addEventListener("click", () => { el("gallery-target").value = button.dataset.editGallery; populateGalleryForm(); el("gallery-form").scrollIntoView({ behavior: "smooth", block: "center" }); });
  });
}

function populateGalleryForm() {
  if (!imageManifest) return;
  const selected = el("gallery-target").value;
  const item = imageManifest.gallery.find((entry) => entry.id === selected);
  el("gallery-date").value = item?.date || "";
  el("gallery-title-zh").value = item?.title?.zh || "";
  el("gallery-title-en").value = item?.title?.en || "";
  el("gallery-description-zh").value = item?.description?.zh || "";
  el("gallery-description-en").value = item?.description?.en || "";
  el("gallery-file").value = "";
  setPreview(el("gallery-file"), el("gallery-preview"), el("gallery-preview-empty"), "gallery");
  if (item?.image) {
    el("gallery-preview").src = `../${item.image}`;
    el("gallery-preview").hidden = false;
    el("gallery-preview-empty").hidden = true;
  }
  status(el("gallery-status"), "");
}

function showCurrentSlotPreview() {
  if (!imageManifest) return;
  const selected = el("slot-select").value;
  let imagePath = "";
  if (selected === "hero") imagePath = imageManifest.hero.image;
  else if (selected === "professor") imagePath = imageManifest.professor.image;
  else imagePath = "";
  if (imagePath) {
    el("slot-preview").src = `../${imagePath}`;
    el("slot-preview").hidden = false;
    el("slot-preview-empty").hidden = true;
  }
}

async function loadManifest() {
  const response = await api("/api/images");
  if (!response.ok) throw new Error("manifest");
  const payload = await response.json();
  imageManifest = payload.manifest;
  manifestRevision = payload.headSha;
  renderSelectors();
}

async function initializeSession() {
  const hash = new URLSearchParams(location.hash.slice(1));
  sessionId = hash.get("session") || "";
  const authError = hash.get("auth_error");
  if (sessionId || authError) history.replaceState(null, "", `${location.pathname}${location.search}`);
  if (authError) showAuthError(authError);
  if (!sessionId) return;
  try {
    const response = await api("/api/session");
    if (!response.ok) throw new Error("session");
    const user = await response.json();
    el("user-login").textContent = user.login;
    el("auth-card").hidden = true;
    el("editor").hidden = false;
    await loadManifest();
  } catch {
    sessionId = "";
    el("auth-card").hidden = false;
    el("editor").hidden = true;
    status(el("auth-status"), t("loadFailed"), "error");
  }
}

async function submitImageForm(event, target, metadata) {
  event.preventDefault();
  const statusNode = el(target.type === "gallery" ? "gallery-status" : "slot-status");
  const input = el(target.type === "gallery" ? "gallery-file" : "slot-file");
  const file = input.files?.[0] || null;
  if (target.type !== "gallery" && !file) { status(statusNode, t("chooseFile"), "error"); return; }
  if (target.type === "gallery" && target.id === "new" && !file) { status(statusNode, t("chooseFile"), "error"); return; }
  const button = event.currentTarget.querySelector("button[type=submit]");
  button.disabled = true;
  status(statusNode, t(file ? "preparing" : "saving"));
  try {
    const form = new FormData();
    form.set("target", JSON.stringify(target));
    form.set("metadata", JSON.stringify(metadata));
    form.set("expectedHeadSha", manifestRevision);
    if (file) {
      try { form.set("image", await prepareImage(file), file.name); }
      catch (error) {
        if (error.message === "too-large" || error.message === "unsupported") throw error;
        throw new Error("image_prepare_failed");
      }
      status(statusNode, t("saving"));
    }
    const response = await api("/api/images/save", { method: "POST", body: form });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "unknown");
    try { await loadManifest(); }
    catch { throw new Error("refresh_failed"); }
    input.value = "";
    status(statusNode, t("saved"), "success");
  } catch (error) {
    const code = error instanceof TypeError ? "network_error"
      : error.message === "too-large" ? "invalid_image_size"
        : error.message === "unsupported" ? "invalid_image_type"
          : error.message;
    status(statusNode, saveErrorMessage(code), "error");
  } finally {
    button.disabled = false;
  }
}

async function submitMemberForm(event, memberId) {
  event.preventDefault();
  const member = imageManifest?.members.find((entry) => entry.id === memberId);
  if (!member) return;
  const formNode = event.currentTarget;
  const nameInput = formNode.querySelector(`[data-member-name="${memberId}"]`);
  const imageInput = formNode.querySelector(`[data-member-file="${memberId}"]`);
  const statusNode = formNode.querySelector(`[data-member-status="${memberId}"]`);
  const saveButton = formNode.querySelector("button[type=submit]");
  const name = nameInput.value.trim();
  const file = imageInput.files?.[0] || null;
  if (!name || name.length > 60) { status(statusNode, t("saveError_invalid_member_name"), "error"); return; }
  if (!file && name === member.name) { status(statusNode, t("saveError_no_changes"), "error"); return; }

  saveButton.disabled = true;
  formNode.querySelectorAll("button[type=button], input").forEach((control) => { control.disabled = true; });
  status(statusNode, t(file ? "preparing" : "saving"));
  status(el("page-status"), "");
  try {
    const request = new FormData();
    request.set("target", JSON.stringify({ type: "slot", id: memberId }));
    request.set("metadata", JSON.stringify({ name }));
    request.set("expectedHeadSha", manifestRevision);
    if (file) {
      let prepared;
      try { prepared = await prepareImage(file); }
      catch (error) {
        if (error.message === "too-large" || error.message === "unsupported") throw error;
        throw new Error("image_prepare_failed");
      }
      request.set("image", prepared, prepared.name);
      status(statusNode, t("saving"));
    }
    const response = await api("/api/images/save", { method: "POST", body: request });
    const result = await response.json().catch(() => ({}));
    if (!response.ok) throw new Error(result.error || "unknown");
    try { await loadManifest(); }
    catch { throw new Error("refresh_failed"); }
    status(el("page-status"), t("memberSaved"), "success");
  } catch (error) {
    const code = error instanceof TypeError ? "network_error"
      : error.message === "too-large" ? "invalid_image_size"
        : error.message === "unsupported" ? "invalid_image_type"
          : error.message;
    status(statusNode, saveErrorMessage(code), "error");
  } finally {
    saveButton.disabled = false;
    formNode.querySelectorAll("button[type=button], input").forEach((control) => { control.disabled = false; });
  }
}

el("language-toggle").addEventListener("click", () => {
  language = language === "zh" ? "en" : "zh";
  try { localStorage.setItem("soc-vlsi-eda-language", language); } catch { /* The language still changes for this page view. */ }
  applyLanguage();
});
el("slot-file").addEventListener("change", () => setPreview(el("slot-file"), el("slot-preview"), el("slot-preview-empty"), "slot"));
el("slot-select").addEventListener("change", () => {
  el("slot-file").value = "";
  showCurrentSlotPreview();
});
el("gallery-file").addEventListener("change", () => setPreview(el("gallery-file"), el("gallery-preview"), el("gallery-preview-empty"), "gallery"));
el("gallery-target").addEventListener("change", populateGalleryForm);
el("slot-form").addEventListener("submit", (event) => submitImageForm(event, { type: "slot", id: el("slot-select").value }, {}));
el("gallery-form").addEventListener("submit", (event) => submitImageForm(event, { type: "gallery", id: el("gallery-target").value }, {
  date: el("gallery-date").value,
  title: { zh: el("gallery-title-zh").value, en: el("gallery-title-en").value },
  description: { zh: el("gallery-description-zh").value, en: el("gallery-description-en").value },
}));
el("logout-button").addEventListener("click", async () => {
  try { await api("/api/logout", { method: "POST" }); } catch { /* Clear the local session even if the service is offline. */ }
  sessionId = "";
  imageManifest = null;
  manifestRevision = "";
  el("editor").hidden = true;
  el("auth-card").hidden = false;
  status(el("auth-status"), t("needLogin"));
});

applyLanguage();
if (!API_BASE) {
  el("setup-notice").hidden = false;
  el("auth-card").hidden = true;
} else {
  el("login-link").href = `${API_BASE}/auth/login`;
  el("auth-card").hidden = false;
  initializeSession();
}
