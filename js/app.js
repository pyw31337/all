/**
 * PYW Hub - Main Application Script
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
  projectsGrid: document.getElementById('projects-grid'),
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
  modalCloseBtn: document.getElementById('modal-close-btn'),
  guideModal: document.getElementById('guide-modal'),
  guideCloseBtn: document.getElementById('guide-close-btn')
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

// Projects Grid Rendering
function renderProjects() {
  if (!elements.projectsGrid) return;

  const filtered = getFilteredProjects();

  if (filtered.length === 0) {
    elements.projectsGrid.innerHTML = `
      <div class="empty-state">
        <div class="empty-icon">${getIcon('search')}</div>
        <h3>일치하는 서비스가 없습니다</h3>
        <p style="margin-top: 0.5rem; color: var(--text-muted);">검색어를 변경하거나 다른 카테고리를 선택해보세요.</p>
      </div>
    `;
    return;
  }

  const projectCardsHtml = filtered.map(project => {
    const highlightsHtml = (project.highlights || []).slice(0, 3).map(h => `
      <li class="highlight-item">
        <span class="highlight-icon">${getIcon('check')}</span>
        <span class="highlight-text"><strong>${escapeHtml(h.title)}:</strong> ${escapeHtml(h.desc)}</span>
      </li>
    `).join('');

    const techTagsHtml = (project.techStack || []).map(tech => `
      <span class="tech-tag">${escapeHtml(tech)}</span>
    `).join('');

    const hasLiveUrl = Boolean(project.url);
    const hasGithubUrl = Boolean(project.githubUrl);

    return `
      <article class="project-card" data-project-id="${project.id}">
        <div class="card-accent-bar" style="background: ${project.gradient || project.accentColor};"></div>
        
        <header class="card-header">
          <div class="card-title-group">
            <div class="card-icon-wrap" style="background: ${project.gradient || project.accentColor};">
              ${project.title.charAt(0)}
            </div>
            <div class="card-titles">
              <h3 class="card-title">${escapeHtml(project.title)}</h3>
              <span class="card-slug">${escapeHtml(project.titleEn || project.slug)}</span>
            </div>
          </div>
          
          <div class="status-pill">
            <span class="pulse-dot"></span>
            <span>${escapeHtml(project.badge || project.statusLabel)}</span>
          </div>
        </header>

        <p class="card-summary">${escapeHtml(project.summary)}</p>

        <ul class="card-highlights">
          ${highlightsHtml}
        </ul>

        <div class="tech-stack-row">
          ${techTagsHtml}
        </div>

        <footer class="card-actions">
          ${hasLiveUrl ? `
            <a href="${escapeHtml(project.url)}" target="_blank" rel="noopener noreferrer" class="btn-primary" title="웹사이트 바로가기">
              <span>서비스 바로가기</span>
              ${getIcon('externalLink')}
            </a>
          ` : `
            <button type="button" class="btn-secondary" style="opacity: 0.6; cursor: default;" title="내부 운영 서비스">
              <span>내부 운영</span>
            </button>
          `}

          ${hasGithubUrl ? `
            <a href="${escapeHtml(project.githubUrl)}" target="_blank" rel="noopener noreferrer" class="btn-secondary" title="GitHub 저장소 보기">
              ${getIcon('github')}
            </a>
          ` : ''}

          <button type="button" class="btn-secondary detail-btn" data-project-id="${project.id}" title="상세 설명 보기">
            ${getIcon('info')}
          </button>
        </footer>
      </article>
    `;
  }).join('');

  // Add Service Prompt Card
  const addServiceCardHtml = `
    <article class="add-service-card" id="open-guide-card">
      <div class="add-service-icon">
        ${getIcon('sparkles')}
      </div>
      <h3 class="add-service-title">새 서비스 추가하기</h3>
      <p class="add-service-desc">
        <code>data/projects.js</code> 파일에 간단한 정보만 입력하면 포트폴리오에 자동으로 반영됩니다.
      </p>
    </article>
  `;

  elements.projectsGrid.innerHTML = projectCardsHtml + addServiceCardHtml;
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
      <h4>${escapeHtml(h.title)}</h4>
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

function openGuideModal() {
  if (elements.guideModal) {
    elements.guideModal.showModal();
  }
}

function closeGuideModal() {
  if (elements.guideModal && elements.guideModal.open) {
    elements.guideModal.close();
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

  // Card Clicks (Event Delegation)
  if (elements.projectsGrid) {
    elements.projectsGrid.addEventListener('click', (e) => {
      const detailBtn = e.target.closest('.detail-btn');
      if (detailBtn) {
        const projectId = detailBtn.dataset.projectId;
        openServiceModal(projectId);
        return;
      }

      const guideCard = e.target.closest('#open-guide-card');
      if (guideCard) {
        openGuideModal();
        return;
      }
    });
  }

  // Modal Close Buttons
  if (elements.modalCloseBtn) {
    elements.modalCloseBtn.addEventListener('click', closeServiceModal);
  }

  if (elements.guideCloseBtn) {
    elements.guideCloseBtn.addEventListener('click', closeGuideModal);
  }

  // Light Dismiss on Backdrop Click for Modern Dialog
  [elements.serviceModal, elements.guideModal].forEach(dialog => {
    if (!dialog) return;
    dialog.addEventListener('click', (event) => {
      const rect = dialog.getBoundingClientRect();
      const isInDialog = (
        rect.top <= event.clientY &&
        event.clientY <= rect.top + rect.height &&
        rect.left <= event.clientX &&
        event.clientX <= rect.left + rect.width
      );
      if (!isInDialog) {
        dialog.close();
      }
    });
  });
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
