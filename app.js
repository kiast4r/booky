document.addEventListener("DOMContentLoaded", () => {
    // Start up the event listeners once the page loads
    initTabSystemLogic();
    initGenreFilterSystemLogic();
});

// --- CODE PART 1: SMOOTH NAVIGATION TAB CHANGER ---
function initTabSystemLogic() {
    const bookTabItem = document.getElementById("tab-books");
    const filmTabItem = document.getElementById("tab-films");

    const bookPageContainer = document.getElementById("page-books");
    const filmPageContainer = document.getElementById("page-films");

    if (bookTabItem && filmTabItem) {
        // When you click on the Books Tab
        bookTabItem.addEventListener("click", () => {
            bookTabItem.classList.add("active-tab");
            filmTabItem.classList.remove("active-tab");

            bookPageContainer.classList.add("active-page");
            filmPageContainer.classList.remove("active-page");

            resetCardDisplayFiltersOnSwap();
        });

        // When you click on the Films Tab
        filmTabItem.addEventListener("click", () => {
            filmTabItem.classList.add("active-tab");
            bookTabItem.classList.remove("active-tab");

            filmPageContainer.classList.add("active-page");
            bookPageContainer.classList.remove("active-page");

            resetCardDisplayFiltersOnSwap();
        });
    }
}

// --- CODE PART 2: INTERACTIVE LIVE GENRE VIBE FILTER ---
function initGenreFilterSystemLogic() {
    const genreButtonsList = document.querySelectorAll(".filter-container .filter-btn");

    genreButtonsList.forEach(button => {
        button.addEventListener("click", () => {
            // Remove the neon pink highlight from all filter buttons
            genreButtonsList.forEach(btn => btn.classList.remove("active-filter"));
            // Highlight only the button you just clicked
            button.classList.add("active-filter");

            // Read the custom data-genre label from the HTML code
            const selectedGenreFilter = button.getAttribute("data-genre");

            // Look up ONLY the tab page currently visible on your screen
            const currentActivePanel = document.querySelector(".page-content.active-page");
            if (!currentActivePanel) return;

            // Target exclusively the cards inside that active page view area
            const localTargetCards = currentActivePanel.querySelectorAll(".item-card");

            localTargetCards.forEach(card => {
                const itemDataGenre = card.getAttribute("data-genre");

                // If "Show All" is clicked, or the genre matches perfectly, show it. Otherwise, hide it.
                if (selectedGenreFilter === "all" || itemDataGenre === selectedGenreFilter) {
                    card.classList.remove("hidden-card");
                } else {
                    card.classList.add("hidden-card");
                }
            });
        });
    });
}

// --- CODE PART 3: AUTOMATIC RESET UTILITY ON TAB HOPPING ---
function resetCardDisplayFiltersOnSwap() {
    // Show every single card across all tabs again so they aren't stuck hidden
    const globalCards = document.querySelectorAll(".item-card");
    globalCards.forEach(card => card.classList.remove("hidden-card"));

    // Reset the vibe filter highlight look back to the main global default "Show All" button
    const totalFilterButtons = document.querySelectorAll(".filter-container .filter-btn");
    totalFilterButtons.forEach(btn => btn.classList.remove("active-filter"));

    const defaultShowAllSelector = document.getElementById("filter-all");
    if (defaultShowAllSelector) {
        defaultShowAllSelector.classList.add("active-filter");
    }
}
