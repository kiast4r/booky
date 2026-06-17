document.addEventListener("DOMContentLoaded", () => {
    initTabs();
    initFilters();
});

// --- TAB SELECTION STATE ENGINE ---
function initTabs() {
    const tabItems = document.querySelectorAll(".nav-tabs .tab-item");
    const pages = document.querySelectorAll(".page-content");

    tabItems.forEach(tab => {
        tab.querySelector("button").addEventListener("click", () => {
            const target = tab.getAttribute("data-target");

            // Clean active classes from all tab nodes
            tabItems.forEach(t => t.classList.remove("active-tab"));
            pages.forEach(p => p.classList.remove("active-page"));

            // Bind active states to target elements
            tab.classList.add("active-tab");
            document.getElementById(`page-${target}`).classList.add("active-page");

            // Clear current filters automatically on tab swaps
            resetGenreFilters();
        });
    });
}

// --- LIVE GENRE FILTER SYSTEM ENGINE ---
function initFilters() {
    const filterButtons = document.querySelectorAll(".filter-container .filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            const targetGenre = button.getAttribute("data-filter");

            // Clean active classes from other tag controllers
            filterButtons.forEach(btn => btn.classList.remove("active-filter"));
            button.classList.add("active-filter");

            // Query active elements visible on the screen
            const activePage = document.querySelector(".page-content.active-page");
            const structuralCards = activePage.querySelectorAll(".item-card");

            structuralCards.forEach(card => {
                const cardGenre = card.getAttribute("data-genre");

                if (targetGenre === "all" || cardGenre === targetGenre) {
                    card.classList.remove("hidden-card");
                } else {
                    card.classList.add("hidden-card");
                }
            });
        });
    });
}

// Automatically reveal cards when switching main tabs
function resetGenreFilters() {
    const structuralCards = document.querySelectorAll(".item-card");
    const filterButtons = document.querySelectorAll(".filter-container .filter-btn");

    structuralCards.forEach(card => card.classList.remove("hidden-card"));
    filterButtons.forEach(btn => btn.classList.remove("active-filter"));
    
    // Fallback focus state target element back to global default view index
    const fallBackDefaultBtn = document.querySelector('.filter-container [data-filter="all"]');
    if (fallBackDefaultBtn) {
        fallBackDefaultBtn.classList.add("active-filter");
    }
}
