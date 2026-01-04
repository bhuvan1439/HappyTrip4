const draggables = document.querySelectorAll('.draggable-item');
const containers = document.querySelectorAll('.planner-column-content');

// Initial listeners are attached via attachDragEvents below

containers.forEach(container => {
    container.addEventListener('dragover', e => {
        e.preventDefault();
        const afterElement = getDragAfterElement(container, e.clientY);
        const draggable = document.querySelector('.dragging');
        if (afterElement == null) {
            container.appendChild(draggable);
        } else {
            container.insertBefore(draggable, afterElement);
        }
    });
});

function getDragAfterElement(container, y) {
    const draggableElements = [...container.querySelectorAll('.draggable-item:not(.dragging)')];

    return draggableElements.reduce((closest, child) => {
        const box = child.getBoundingClientRect();
        const offset = y - box.top - box.height / 2;
        if (offset < 0 && offset > closest.offset) {
            return { offset: offset, element: child };
        } else {
            return closest;
        }
    }, { offset: Number.NEGATIVE_INFINITY }).element;
}

// Save Trip Logic (Mock)
const saveTripBtn = document.getElementById('save-trip-btn');
if (saveTripBtn) {
    saveTripBtn.addEventListener('click', () => {
        const itineraryItems = document.getElementById('itinerary-list').children;
        const items = [];
        for (let item of itineraryItems) {
            items.push(item.innerText);
        }

        if (items.length === 0) {
            alert('Your itinerary is empty!');
            return;
        }

        alert(`Trip saved with ${items.length} items! (This would save to backend in a real app)`);
        console.log('Saved Items:', items);
    });
}

// Reusable function to attach drag events
function attachDragEvents(draggable) {
    draggable.addEventListener('dragstart', () => {
        draggable.classList.add('dragging');
    });

    draggable.addEventListener('dragend', () => {
        draggable.classList.remove('dragging');
    });
}

// Attach events to initial items
draggables.forEach(draggable => {
    attachDragEvents(draggable);
});

// Search Logic with Nominatim API
const plannerSearch = document.getElementById('planner-search');
let debounceTimer;

if (plannerSearch) {
    plannerSearch.addEventListener('input', (e) => {
        const searchTerm = e.target.value;
        const placesList = document.getElementById('places-list');

        clearTimeout(debounceTimer);

        if (searchTerm.length < 3) {
            // Optional: Restore default list if query is too short
            // For now, we just don't search
            return;
        }

        debounceTimer = setTimeout(async () => {
            try {
                placesList.innerHTML = '<div class="draggable-item">Searching...</div>';

                const res = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchTerm)}`);
                const data = await res.json();

                placesList.innerHTML = ''; // Clear "Searching..."

                if (data.length === 0) {
                    placesList.innerHTML = '<div class="draggable-item">No results found</div>';
                    return;
                }

                data.forEach(place => {
                    const div = document.createElement('div');
                    div.classList.add('draggable-item');
                    div.draggable = true;
                    // Use only the first part of the display name for brevity
                    div.textContent = place.display_name.split(',')[0];
                    div.title = place.display_name; // Show full name on hover

                    placesList.appendChild(div);
                    attachDragEvents(div);
                });

            } catch (error) {
                console.error('Error fetching places:', error);
                placesList.innerHTML = '<div class="draggable-item">Error fetching places</div>';
            }
        }, 500); // 500ms debounce
    });
}
