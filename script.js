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
    // --- SCIENCE & MATH ---
    "polynomial": "An expression consisting of variables and coefficients.",
    "factoring": "Breaking an expression into simpler product factors.",
    "dna": "The hereditary material in humans and almost all other organisms.",
    "gravity": "The force that attracts a body toward the center of the earth.",
    "atom": "The basic unit of a chemical element.",
    "molecule": "A group of atoms bonded together.",
    "quantum": "The minimum amount of any physical entity involved in an interaction.",
    "relativity": "Einstein's theory that space and time are linked for objects moving at a constant speed.",
    "entropy": "A measure of disorder or randomness in a system.",
    "calculus": "The mathematical study of continuous change.",
    "geometry": "Study of shapes, sizes, and properties of space.",
    "prime": "A number greater than 1 with no divisors other than 1 and itself.",
    "velocity": "The speed of an object in a given direction.",
    "inertia": "The tendency of an object to resist changes in its state of motion.",
    "friction": "The resistance that one surface or object encounters when moving over another.",

    // --- CHEMISTRY & ELEMENTS ---
    "element": "A substance consisting of atoms with the same number of protons.",
    "periodic table": "A tabular display of all known chemical elements.",
    "acid": "A substance with a pH less than 7.",
    "base": "A substance with a pH greater than 7.",
    "catalyst": "A substance that increases the rate of a chemical reaction.",
    "covalent": "A chemical bond that involves the sharing of electron pairs.",
    "ionic": "A chemical bond formed through electrostatic attraction.",
    "hydrogen": "The chemical element with the symbol H and atomic number 1.",
    "oxygen": "A highly reactive nonmetal and an oxidizing agent.",
    "carbon": "A versatile element that forms the basis of all known life.",

    // --- GEOGRAPHY & SPACE ---
    "mars": "The fourth planet, often called the Red Planet.",
    "jupiter": "The largest planet in our solar system, a gas giant.",
    "sun": "The star at the center of our solar system.",
    "moon": "Earth's only natural satellite.",
    "everest": "The highest mountain on Earth, located in the Himalayas.",
    "amazon": "The largest tropical rainforest in the world.",
    "pacific": "The largest and deepest of Earth's oceanic divisions.",
    "sahara": "The largest hot desert in the world.",
    "black hole": "A region where gravity is so strong that nothing can escape.",
    "nebula": "A giant cloud of dust and gas in space.",
    "galaxy": "A massive system of stars, stellar remnants, gas, and dust.",
    "orbit": "The curved path of a celestial object around a star, planet, or moon.",

    // --- HISTORY, CULTURE & MYTHOLOGY ---
    "zeus": "The king of the gods in Greek mythology.",
    "odin": "The chief god of Norse mythology, ruler of Asgard.",
    "pyramid": "Ancient monumental structures, most famously in Egypt.",
    "rome": "The heart of the ancient Roman Empire.",
    "samurai": "Military nobility and officer caste of medieval Japan.",
    "viking": "Seafaring warriors from the Scandinavian regions.",
    "renaissance": "A period of European cultural and artistic rebirth.",
    "democracy": "A system of government by the whole population.",
    "shogun": "A hereditary commander-in-chief in feudal Japan.",
    "history": "The study of past events, particularly in human affairs.",
    "mythology": "A collection of myths, especially one belonging to a particular religious or cultural tradition.",

    // --- TECHNOLOGY & COMPUTING ---
    "javascript": "A programming language used for interactive web effects.",
    "html": "The standard markup language for documents in a web browser.",
    "css": "The language used to style the look and feel of a website.",
    "ai": "Simulation of human intelligence by computer systems.",
    "blockchain": "A shared, immutable ledger for recording transactions.",
    "cloud": "Computing services delivered over the internet.",
    "binary": "A base-2 number system using only 0s and 1s.",
    "algorithm": "A process or set of rules to be followed in calculations.",
    "compiler": "A program that translates code into machine language.",
    "database": "An organized collection of structured information.",
    "server": "A computer or system that provides resources to other computers.",
    "network": "A set of computers connected to each other for sharing resources.",

    // --- LITERATURE & PHILOSOPHY ---
    "stoicism": "A school of thought teaching self-control.",
    "ethics": "Moral principles that govern behavior.",
    "logic": "Reasoning according to strict principles.",
    "shakespeare": "English playwright, widely regarded as the greatest writer.",
    "homer": "Ancient Greek author of the Iliad and the Odyssey.",
    "existentialism": "A philosophical theory that emphasizes the existence of the individual.",

    // --- FINANCE & ECONOMY ---
    "inflation": "A general increase in prices and fall in purchasing power.",
    "capital": "Wealth in the form of money or assets.",
    "monopoly": "Exclusive control of the supply or trade in a commodity.",
    "startup": "A newly established business venture.",
    "stock": "A share in the ownership of a company.",
    "interest": "Money paid regularly at a particular rate for the use of money lent.",




// Add these to your knowledgeBase object:

// --- LAW & GOVERNANCE ---
"constitution": "The supreme law of a land, defining the structure of government.",
"contract": "A legally binding agreement between two or more parties.",
"patent": "A government license giving a right to exclude others from making an invention.",
"law": "The system of rules which a particular country or community recognizes as regulating the actions of its members.",

// --- ADVANCED ANATOMY ---
"heart": "A muscular organ that pumps blood through the circulatory system.",
"brain": "An organ of soft nervous tissue that acts as the control center of the body.",
"liver": "A large organ that produces bile and detoxifies chemicals.",
"kidney": "An organ that filters blood and excretes waste as urine.",

// --- PSYCHOLOGY & BEHAVIOR ---
"cognitive": "Relating to the mental action or process of acquiring knowledge and understanding.",
"subconscious": "Part of the mind of which one is not fully aware but which influences one's actions.",
"motivation": "The reason or reasons one has for acting or behaving in a particular way.",
"anxiety": "A feeling of worry, nervousness, or unease, typically about an imminent event.",

// --- ADVANCED PHYSICS ---
"thermodynamics": "The branch of physical science that deals with the relations between heat and other forms of energy.",
"superconductor": "A material that can conduct electricity with zero resistance.",
"photon": "A particle representing a quantum of light or other electromagnetic radiation.",
"isomorphism": "A mapping between two structures that preserves their properties.",
   "default": "I have a massive database! Ask me about Science, Space, History, Tech, or Finance."
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