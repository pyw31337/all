/**
 * pyw31337 Hub - Main Application Script
 * 100% Full-Width Visual Showcase with 3D Realistic App Icons & Wide Backgrounds
 */

import { CATEGORIES, PROJECTS, PORTFOLIO_STATS } from '../data/projects.js';
import { getIcon } from './icons.js';

// Application State
const state = {
  activeCategory: 'all',
  searchQuery: '',
  selectedProject: null,
  theme: localStorage.getItem('pyw_hub_theme') || (window.matchMedia('(prefers-color-scheme: light)').matches ? 'light' : 'dark')
};

// DOM Elements
const elements = {
  themeToggle: document.getElementById('theme-toggle'),
  themeIcon: document.getElementById('theme-icon'),
  categoryList: document.getElementById('category-filters'),
  searchInput: document.getElementById('search-input'),
  projectsContainer: document.getElementById('projects-container'),
  totalCount: document.getElementById('stat-total'),
  liveCount: document.getElementById('stat-live'),
  repoCount: document.getElementById('stat-repos'),
  serviceModal: document.getElementById('service-modal'),
  modalTitle: document.getElementById('modal-title'),
  modalSlug: document.getElementById('modal-slug'),
  modalBadge: document.getElementById('modal-badge'),
  modalDesc: document.getElementById('modal-desc'),
  modalHighlights: document.getElementById('modal-highlights'),
  modalTech: document.getElementById('modal-tech'),
  modalLiveLink: document.getElementById('modal-live-link'),
  modalGithubLink: document.getElementById('modal-github-link'),
  modalCloseBtn: document.getElementById('modal-close-btn')
};

// Initialize App
function init() {
  applyTheme(state.theme);
  renderStats();
  renderCategoryTabs();
  renderProjects();
  setupEventListeners();
}

// Theme Management
function applyTheme(theme) {
  state.theme = theme;
  document.documentElement.setAttribute('data-theme', theme);
  localStorage.setItem('pyw_hub_theme', theme);
  if (elements.themeIcon) {
    elements.themeIcon.innerHTML = theme === 'light' ? getIcon('moon') : getIcon('sun');
  }
}

function toggleTheme() {
  const nextTheme = state.theme === 'dark' ? 'light' : 'dark';
  applyTheme(nextTheme);
}

// Stats Rendering
function renderStats() {
  if (elements.totalCount) elements.totalCount.textContent = PORTFOLIO_STATS.totalProjects;
  if (elements.liveCount) elements.liveCount.textContent = PORTFOLIO_STATS.liveServices;
  if (elements.repoCount) elements.repoCount.textContent = PORTFOLIO_STATS.publicRepos;
}

// Category Tabs Rendering
function renderCategoryTabs() {
  if (!elements.categoryList) return;

  elements.categoryList.innerHTML = CATEGORIES.map(cat => {
    const isActive = state.activeCategory === cat.id;
    return `
      <button type="button" class="category-chip ${isActive ? 'active' : ''}" data-category="${cat.id}">
        <span>${getIcon(cat.icon)}</span>
        <span>${cat.label}</span>
      </button>
    `;
  }).join('');
}

// Projects Filtering Logic
function getFilteredProjects() {
  const query = state.searchQuery.trim().toLowerCase();

  return PROJECTS.filter(project => {
    // Category match
    const categoryMatch = state.activeCategory === 'all' || project.category === state.activeCategory;
    if (!categoryMatch) return false;

    // Search query match
    if (!query) return true;

    const searchableText = [
      project.title,
      project.titleEn,
      project.slug,
      project.summary,
      project.badge,
      ...(project.techStack || []),
      ...(project.highlights ? project.highlights.map(h => `${h.title} ${h.desc}`) : [])
    ].join(' ').toLowerCase();

    return searchableText.includes(query);
  });
}

// 100% Full-Width Showcase Sections Rendering
function renderProjects() {
  if (!elements.projectsContainer) return;

  const filtered = getFilteredProjects();

  if (filtered.length === 0) {
    elements.projectsContainer.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${getIcon('search')}</div>
        <h3>일치하는 서비스가 없습니다</h3>
        <p style="margin-top: 0.5rem; color: var(--text-muted);">검색어를 변경하거나 다른 카테고리를 선택해보세요.</p>
      </div>
    `;
    return;
  }

  const sectionsHtml = filtered.map((project, idx) => {
    const highlightsHtml = (project.highlights || []).map(h => `
      <div class="feature-box">
        <div class="feature-icon" style="color: ${project.accentColor}; background: ${project.accentColor}1c;">
          ${getIcon(h.icon || 'check')}
        </div>
        <div class="feature-content">
          <h4 class="feature-title">${escapeHtml(h.title)}</h4>
          <p class="feature-desc">${escapeHtml(h.desc)}</p>
        </div>
      </div>
    `).join('');

    const techTagsHtml = (project.techStack || []).map(tech => `
      <span class="tech-tag">${escapeHtml(tech)}</span>
    `).join('');

    const hasLiveUrl = Boolean(project.url);
    const hasGithubUrl = Boolean(project.githubUrl);

    return `
      <section class="service-showcase-section" data-project-id="${project.id}" style="--project-glow: ${project.bgGlow}; --project-accent: ${project.accentColor}; --project-accent-glow: ${project.accentGlow};">
        <!-- Wide Immersive Background Screenshot Scene -->
        <div class="section-wide-bg" style="background-image: url('${project.screenshot}');"></div>
        <div class="section-wide-vignette"></div>
        <div class="section-grid-pattern"></div>
        <div class="section-accent-line" style="background: ${project.gradient};"></div>

        <div class="section-inner-container">
          <!-- Information & Story Column -->
          <div class="service-info-col">
            <div class="service-meta-header">
              <div class="service-meta-badges">
                <span class="service-category-tag">${escapeHtml(project.categoryLabel)}</span>
                <span class="status-pill">
                  <span class="pulse-dot"></span>
                  <span>${escapeHtml(project.badge || project.statusLabel)}</span>
                </span>
              </div>
            </div>

            <!-- Title with 3D App Icon Badge -->
            <div class="service-title-container">
              <div class="app-icon-3d-wrap" title="${escapeHtml(project.title)} 3D 앱 아이콘">
                <div class="app-icon-3d" style="--icon-glow: ${project.accentGlow};">
                  <img src="${project.iconPath}" alt="${escapeHtml(project.title)} 아이콘" class="app-icon-3d-img" />
                  <div class="app-icon-3d-gloss"></div>
                </div>
              </div>
              <div class="service-title-text-group">
                <h2 class="service-title">${escapeHtml(project.title)}</h2>
                <span class="service-title-en">${escapeHtml(project.titleEn)}</span>
              </div>
            </div>

            <p class="service-summary">${escapeHtml(project.summary)}</p>

            <!-- Visual Feature Highlights with Rich Icons -->
            <div class="service-highlights-grid">
              ${highlightsHtml}
            </div>

            <!-- Tech Stack Tags -->
            <div class="tech-stack-row">
              ${techTagsHtml}
            </div>

            <!-- Action Buttons -->
            <div class="service-actions-row">
              ${hasLiveUrl ? `
                <a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" class="btn-primary" title="웹사이트 바로가기">
                  <span>서비스 바로가기</span>
                  ${getIcon('externalLink')}
                </a>
              ` : `
                <button type="button" class="btn-secondary" style="opacity: 0.6; cursor: default;">
                  <span>내부 운영</span>
                </button>
              `}

              ${hasGithubUrl ? `
                <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-secondary" title="GitHub 저장소 보기">
                  ${getIcon('github')}
                  <span>GitHub</span>
                </a>
              ` : ''}

              <button type="button" class="btn-secondary detail-btn" data-project-id="${project.id}" title="상세 기획 및 아키텍처 보기">
                ${getIcon('info')}
                <span>상세보기</span>
              </button>
            </div>
          </div>

          <!-- Wide Visual Display & Browser Mockup Column -->
          <div class="service-visual-col">
            <div class="browser-frame">
              <!-- Browser Window Title Bar with App Tab -->
              <div class="browser-topbar">
                <div class="browser-dots">
                  <span class="dot red"></span>
                  <span class="dot yellow"></span>
                  <span class="dot green"></span>
                </div>

                <div class="browser-tab">
                  <img src="${project.iconPath}" class="browser-tab-icon" alt="" />
                  <span class="browser-tab-title">${escapeHtml(project.title)}</span>
                </div>

                <div class="browser-address-bar">
                  <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"/><path d="M7 11V7a5 5 0 0 1 10 0v4"/></svg>
                  <span class="browser-url-text">${escapeHtml(project.url || 'https://pyw31337.github.io/' + project.slug)}</span>
                </div>

                ${hasLiveUrl ? `
                  <a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" class="browser-external-link" title="새 창에서 열기">
                    ${getIcon('externalLink')}
                  </a>
                ` : ''}
              </div>

              <!-- High-res Screenshot Container with Interactive Zoom Overlay -->
              <div class="browser-viewport" data-project-id="${project.id}" title="클릭하여 상세 정보 및 큰 화면 보기">
                <img src="${project.screenshot}" alt="${escapeHtml(project.title)} 실제 서비스 캡처 화면" loading="${idx === 0 ? 'eager' : 'lazy'}" class="service-screenshot">
                <div class="browser-viewport-overlay">
                  <span class="preview-zoom-btn">
                    ${getIcon('maximize')}
                    <span>상세보기 & 큰 화면</span>
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    `;
  }).join('');

  elements.projectsContainer.innerHTML = sectionsHtml;
}

// Modal Control with Modern Light-Dismiss and Starting-Style
function openServiceModal(projectId) {
  const project = PROJECTS.find(p => p.id === projectId);
  if (!project || !elements.serviceModal) return;

  state.selectedProject = project;

  elements.modalTitle.textContent = project.title;
  elements.modalSlug.textContent = `${project.titleEn} (${project.slug})`;
  elements.modalBadge.textContent = project.badge || project.statusLabel;
  elements.modalDesc.textContent = project.description;

  elements.modalHighlights.innerHTML = (project.highlights || []).map(h => `
    <li class="modal-highlight-box">
      <div style="display: flex; align-items: center; gap: 0.55rem; margin-bottom: 0.35rem;">
        <span style="color: ${project.accentColor}; display: flex;">${getIcon(h.icon || 'check')}</span>
        <h4 style="margin-bottom: 0;">${escapeHtml(h.title)}</h4>
      </div>
      <p>${escapeHtml(h.desc)}</p>
    </li>
  `).join('');

  elements.modalTech.innerHTML = (project.techStack || []).map(tech => `
    <span class="tech-tag">${escapeHtml(tech)}</span>
  `).join('');

  if (project.url) {
    elements.modalLiveLink.href = project.url;
    elements.modalLiveLink.style.display = 'inline-flex';
  } else {
    elements.modalLiveLink.style.display = 'none';
  }

  if (project.githubUrl) {
    elements.modalGithubLink.href = project.githubUrl;
    elements.modalGithubLink.style.display = 'inline-flex';
  } else {
    elements.modalGithubLink.style.display = 'none';
  }

  elements.serviceModal.showModal();
}

function closeServiceModal() {
  if (elements.serviceModal && elements.serviceModal.open) {
    elements.serviceModal.close();
  }
}

// Setup Event Listeners
function setupEventListeners() {
  // Theme Toggle
  if (elements.themeToggle) {
    elements.themeToggle.addEventListener('click', toggleTheme);
  }

  // Category Filtering
  if (elements.categoryList) {
    elements.categoryList.addEventListener('click', (e) => {
      const chip = e.target.closest('.category-chip');
      if (!chip) return;
      const categoryId = chip.dataset.category;
      if (categoryId && categoryId !== state.activeCategory) {
        state.activeCategory = categoryId;
        renderCategoryTabs();
        renderProjects();
      }
    });
  }

  // Search Input
  if (elements.searchInput) {
    elements.searchInput.addEventListener('input', (e) => {
      state.searchQuery = e.target.value;
      renderProjects();
    });
  }

  // Container Delegated Clicks
  if (elements.projectsContainer) {
    elements.projectsContainer.addEventListener('click', (e) => {
      const detailBtn = e.target.closest('.detail-btn');
      if (detailBtn) {
        const projectId = detailBtn.dataset.projectId;
        openServiceModal(projectId);
        return;
      }

      const viewport = e.target.closest('.browser-viewport');
      if (viewport) {
        const projectId = viewport.dataset.projectId;
        openServiceModal(projectId);
        return;
      }
    });
  }

  // Modal Close Button
  if (elements.modalCloseBtn) {
    elements.modalCloseBtn.addEventListener('click', closeServiceModal);
  }

  // Light Dismiss on Backdrop Click for Modern Dialog
  if (elements.serviceModal) {
    elements.serviceModal.addEventListener('click', (event) => {
      const rect = elements.serviceModal.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        elements.serviceModal.close();
      }
    });
  }
}

// Helper: Escape HTML
function escapeHtml(str) {
  if (!str) return '';
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

// Kickoff
document.addEventListener('DOMContentLoaded', init);
