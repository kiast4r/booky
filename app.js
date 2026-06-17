document.addEventListener("DOMContentLoaded", () => {
    // Fire routing logic modules on system start
    setupNavigationTabs();
    setupGenreVibeFilters();
});

// --- COMPONENT 1: WORKING DYNAMIC TAB TOGGLE HANDLERS ---
function setupNavigationTabs() {
    const bookTabItem = document.getElementById("tab-books");
    const filmTabItem = document.getElementById("tab-films");

    const bookPageContainer = document.getElementById("page-books");
    const filmPageContainer = document.getElementById("page-films");

    if (bookTabItem && filmTabItem) {
        // Books navigation focus trigger
        bookTabItem.addEventListener("click", () => {
            bookTabItem.classList.add("active-tab");
            filmTabItem.classList.remove("active-tab");

            bookPageContainer.classList.add("active-page");
            filmPageContainer.classList.remove("active-page");

            resetDisplayFiltersOnSwap();
        });

        // Films navigation focus trigger
        filmTabItem.addEventListener("click", () => {
            filmTabItem.classList.add("active-tab");
            bookTabItem.classList.remove("active-tab");

            filmPageContainer.classList.add("active-page");
            bookPageContainer.classList.remove("active-page");

            resetDisplayFiltersOnSwap();
        });
    }
}

// --- COMPONENT 2: INTERACTIVE LIVE GENRE FILTERS ---
function setupGenreVibeFilters() {
    const filterButtons = document.querySelectorAll(".filter-container .filter-btn");

    filterButtons.forEach(button => {
        button.addEventListener("click", () => {
            // Drop highlighting states from sibling elements inside row
            filterButtons.forEach(btn => btn.classList.remove("active-filter"));
            button.classList.add("active-filter");

            // Extract target data label parameter attribute
            const selectedGenreFilter = button.getAttribute("data-genre");

            // Locate active tab space layout container strictly to avoid faults
            const currentActivePanel = document.querySelector(".page-content.active-page");
            if (!currentActivePanel) return;

            const localTargetCards = currentActivePanel.querySelectorAll(".item-card");

            localTargetCards.forEach(card => {
                const itemDataGenre = card.getAttribute("data-genre");

                if (selectedGenreFilter === "all" || itemDataGenre === selectedGenreFilter) {
                    card.classList.remove("hidden-card");
                } else {
                    card.classList.add("hidden-card");
                }
            });
        });
    });
}

// --- COMPONENT 3: RE-RENDER AND RE-ALIGN ACTION UTILITY ---
function resetDisplayFiltersOnSwap() {
    // Drop hidden CSS layout tags across every panel item layout block
    const globalCards = document.querySelectorAll(".item-card");
    globalCards.forEach(card => card.classList.remove("hidden-card"));

    // Shift focus class back to the global default "Show All" element controller
    const totalFilterButtons = document.querySelectorAll(".filter-container .filter-btn");
    totalFilterButtons.forEach(btn => btn.classList.remove("active-filter"));

    const defaultShowAllSelector = document.getElementById("filter-all");
    if (defaultShowAllSelector) {
        defaultShowAllSelector.classList.add("active-filter");
    }
}
