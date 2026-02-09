/**
 * GeniusPet Dashboard - Simple Hash Router
 * Handles navigation between pages
 */

const Router = {
  routes: {
    '/': 'dashboard',
    '/profile': 'profile',
    '/activity': 'activity',
    '/settings': 'settings',
    '/demo': 'demo',
    '/welcome': 'welcome'
  },

  // Initialize router
  init() {
    // Listen for hash changes
    window.addEventListener('hashchange', () => this.handleRoute());

    // Handle initial route
    this.handleRoute();
  },

  // Handle route changes
  handleRoute() {
    const hash = window.location.hash || '#/';
    const path = hash.replace('#', '') || '/';
    const pageName = this.routes[path] || 'dashboard';

    AppState.currentPage = pageName;
    this.render(pageName);
    this.updateNav(pageName);
  },

  // Render a page
  render(pageName) {
    const mainContent = document.getElementById('main-content');
    if (!mainContent) return;

    // Get page content
    const pageRenderer = Pages[pageName];
    if (pageRenderer) {
      mainContent.innerHTML = pageRenderer.call(Pages);
    } else {
      mainContent.innerHTML = Components.emptyState(
        'file-question',
        'Page Not Found',
        'The page you\'re looking for doesn\'t exist.',
        'Go Home',
        'window.location.hash = "#/"'
      );
    }

    // Reinitialize Lucide icons
    if (typeof lucide !== 'undefined') {
      lucide.createIcons();
    }

    // Scroll to top
    window.scrollTo(0, 0);
  },

  // Update navigation active state
  updateNav(pageName) {
    const navItems = document.querySelectorAll('.nav-item');
    navItems.forEach(item => {
      const itemPage = item.dataset.page;
      if (itemPage === pageName) {
        item.classList.add('active', 'text-primary');
        item.classList.remove('text-gray');
      } else {
        item.classList.remove('active', 'text-primary');
        item.classList.add('text-gray');
      }
    });
  },

  // Navigate to a page
  navigate(path) {
    window.location.hash = path;
  }
};

// Helper function for rendering current page (used by state updates)
function renderCurrentPage() {
  Router.render(AppState.currentPage);
}
