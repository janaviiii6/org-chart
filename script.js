document.addEventListener("DOMContentLoaded", function () {
    // Fetch employee data from the endpoint
    fetch('getOrgChart.php')
        .then(response => response.json())
        .then(employees => {
            console.log(employees);
            const employeeHierarchy = buildHierarchy(employees);
            renderOrgChart(employeeHierarchy);
        })
        .catch(error => console.error("Error fetching data: ", error));
});

function buildHierarchy(employees) {
    const employeeMap = {};

    // Map each employee by ID for easy reference
    employees.forEach(emp => {
        employeeMap[emp.id] = { ...emp, children: [] };
    });

    const hierarchy = [];

    employees.forEach(emp => {
        if (emp.parent_id == null) {
            hierarchy.push(employeeMap[emp.id]);
        } else {
            employeeMap[emp.parent_id].children.push(employeeMap[emp.id]); // Add child to parent's children array
        }
    });

    return hierarchy;
}

function renderOrgChart(data) {
    const container = document.getElementById('employee-cards-container');

    // Helper function to render cards recursively for each level
    function renderLevel(levelData, level) {
        const levelContainer = document.createElement('div');
        levelContainer.classList.add(`level-${level}`, 'level-container');

        levelData.forEach(emp => {
            const cardWrapper = document.createElement('div');
            cardWrapper.classList.add('card-wrapper');
            cardWrapper.dataset.children = emp.children.map(child => child.name).join(',');

            // Image container
            const imageContainer = document.createElement('div');
            imageContainer.classList.add('image-container');
            const img = document.createElement('img');
            img.src = emp.photo_url;
            img.alt = emp.name;
            imageContainer.appendChild(img);

            // Card
            const card = document.createElement('div');
            card.classList.add('card');

            // Add 'expandable' class to the card if employee has children
            if (emp.children.length > 0) {
                card.classList.add('expandable');
                card.dataset.expandable = true;
            } else {
                card.dataset.expandable = false;
            }

            const empName = document.createElement('p');
            empName.classList.add('emp-name');
            empName.textContent = emp.name;
            const empDes = document.createElement('p');
            empDes.classList.add('emp-des');
            empDes.textContent = emp.title;

            card.appendChild(empName);
            card.appendChild(empDes);

            cardWrapper.appendChild(imageContainer);
            cardWrapper.appendChild(card);

            levelContainer.appendChild(cardWrapper);

            
            if (emp.children && emp.children.length > 0) {
                const hierarchy = renderLevel(emp.children, level + 1);
                hierarchy.style.display = 'none';  
                cardWrapper.appendChild(hierarchy);
            }
        });

        return levelContainer;
    }

    
    const rootLevelData = data.filter(emp => emp.parent_id === null);
    const orgChartHTML = renderLevel(rootLevelData, 0);
    container.appendChild(orgChartHTML);

    // Add event listeners to expandable cards to show their children when clicked
    container.addEventListener('click', function (event) {
        const clickedCard = event.target.closest('.card');
        
        if (clickedCard && clickedCard.dataset.expandable === 'true') {
            const cardWrapper = clickedCard.closest('.card-wrapper');
            const childrenContainer = cardWrapper.querySelector('.level-container');
            
            if (childrenContainer) {
                // Toggle visibility of the children
                const currentDisplay = childrenContainer.style.display;
                childrenContainer.style.display = (currentDisplay === 'none' || currentDisplay === '') ? 'flex' : 'none';
            }
        }
    });
}
