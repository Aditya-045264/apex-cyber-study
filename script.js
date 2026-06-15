document.addEventListener('DOMContentLoaded', () => {

    // --- HELPER: UPDATE COUNTERS ---
    function updateCounters() {
        const taskCount = document.getElementById('taskCount');
        const queryCount = document.getElementById('queryCount');
        const taskList = document.getElementById('taskList');
        const queriesDisplayList = document.getElementById('queriesDisplayList');

        if (taskCount && taskList) taskCount.textContent = taskList.children.length;
        if (queryCount && queriesDisplayList) queryCount.textContent = queriesDisplayList.children.length;
    }

    // --- 1. CLOCK & DATE ---
    function updateClockAndDate() {
        const now = new Date();
        const clockDisplay = document.getElementById('clockDisplay');
        const dateDisplay = document.getElementById('dateDisplay');
        if (clockDisplay) clockDisplay.textContent = now.toLocaleTimeString();
        if (dateDisplay) {
            const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
            dateDisplay.textContent = now.toLocaleDateString(undefined, options);
        }
    }
    setInterval(updateClockAndDate, 1000);

    // --- 2. TIMER ---
    const timerDisplay = document.getElementById('timerDisplay');
    const timerBtn = document.getElementById('timerBtn');
    let timerInterval = null, minutes = 25, seconds = 0;

    if (timerBtn) {
        timerBtn.addEventListener('click', () => {
            if (timerInterval) {
                clearInterval(timerInterval);
                timerInterval = null;
                timerBtn.textContent = "Start";
            } else {
                timerBtn.textContent = "Stop";
                timerInterval = setInterval(() => {
                    if (seconds === 0) {
                        if (minutes === 0) {
                            clearInterval(timerInterval);
                            alert("Time is up!");
                            return;
                        }
                        minutes--; seconds = 59;
                    } else { seconds--; }
                    if(timerDisplay) timerDisplay.textContent = `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
                }, 1000);
            }
        });
    }

    // --- 3. TASKS ---
    const addBtn = document.getElementById('addBtn');
    const taskInput = document.getElementById('taskInput');
    const taskList = document.getElementById('taskList');

    if (addBtn) {
        addBtn.addEventListener('click', () => {
            if (taskInput.value.trim() === '') return;
            const li = document.createElement('li');
            li.textContent = taskInput.value;
            taskList.appendChild(li);
            taskInput.value = '';
            updateCounters();
        });
    }

    // --- 4. AI BOT ---
    const submitQueryBtn = document.getElementById('submitQueryBtn');
    const queryText = document.getElementById('queryText');
    const queriesDisplayList = document.getElementById('queriesDisplayList');

    const knowledgeBase = {
        "force": "Force is a push or pull. Formula: F = ma.",
        "gravity": "Gravity attracts mass. On Earth: 9.8 m/s².",
        "pythagoras": "a² + b² = c² in a right-angled triangle.",
    "variable": "A letter or symbol representing an unknown value, such as x or y.",
    "expression": "A combination of numbers, variables, and operators (like 2x + 5) without an equals sign.",
    "equation": "A mathematical statement that two expressions are equal, indicated by an '=' sign.",
    "inequality": "A statement showing that two values are not necessarily equal, using symbols like <, >, ≤, or ≥.",
    "linear_equation": "An equation that graphs as a straight line, typically in the form y = mx + b.",
    "slope": "The measure of the steepness and direction of a line, often represented by 'm' in y = mx + b.",
    "quadratic_equation": "An equation in the form ax² + bx + c = 0, where the graph is a parabola.",
    "polynomial": "An expression consisting of variables and coefficients, involving only addition, subtraction, and multiplication.",
    "factoring": "The process of breaking down an expression into a product of simpler factors.",

        "default": "I'm a study assistant! Ask me about physics or math topics."
    };

    if (submitQueryBtn) {
        submitQueryBtn.addEventListener('click', () => {
            const question = queryText.value.trim();
            if (question === '') return;

            // Display question
            const div = document.createElement('div');
            div.innerHTML = `<p><b>You:</b> ${question}</p>`;
            queriesDisplayList.appendChild(div);

            // Find answer
            let reply = knowledgeBase["default"];
            for (let key in knowledgeBase) {
                if (question.toLowerCase().includes(key)) reply = knowledgeBase[key];
            }

            // Display reply
            const botDiv = document.createElement('div');
            botDiv.innerHTML = `<p style="color:#00e676;"><b>Bot:</b> ${reply}</p>`;
            queriesDisplayList.appendChild(botDiv);
            
            queryText.value = '';
            updateCounters(); // Updates the query counter
        });
    }
});