const { useState, useEffect } = React;
const CLOUD_NAME = "dbprdbrzk";
const UPLOAD_PRESET = "sylltrack";

// Inhe hum abhi variable mein store nahi karenge, 
// balki seedhe component ke andar se access karenge.

// Syllabus data structure for both exams
const EXAM_SYLLABUS = {
    NEET: {
        "Class 11": {
            Physics: [
                "Vectors",
                "Units and Measurements",
                "Motion in a Straight Line",
                "Motion in a Plane",
                "Laws of Motion",
                "Work, Energy and Power",
                "Rotational Motion",
                "Gravitation",
                "Mechanical Properties of Solids",
                "Mechanical Properties of Fluids",
                "Thermal Properties of Matter",
                "Thermodynamics",
                "Kinetic Theory",
                "Oscillations",
                "Waves"
            ],
            "Physical Chemistry": [
                "Some Basic Concepts of Chemistry",
                "Structure of atom",
                "States of Matter",
                "Thermodynamics",
                "Redox Reactions",
                "Chemical equilibrium",
                "Ionic equilibrium"
            ],
            "Organic Chemistry": [
                "Some Basic principles and Techniques (IUPAC Naming)",
                "Some Basic principles and Techniques (Isomerism)",
                "General organic chemistry (GOC)",
                "Purification, Characterisation, Qualitative & Quantitative",
                "Hydrocarbons"
            ],
            "Inorganic Chemistry": [
                "Classification of Elements and Periodicity in Properties",
                "Chemical Bonding and Molecular Structure",
                "The p-Block Elements"
            ],
            Botany: [
                "Cell-the unit of life",
                "Cell cycle cell division",
                "The living world",
                "Biological classification",
                "Plant kingdom",
                "Morphology of flowering plants",
                "Anatomy of flowering plants",
                "Photosynthesis in higher plants",
                "Respiration in plants",
                "Plant growth and development"
            ],
            Zoology: [
                "Structural Organisation in Animals",
                "Breathing & Exchange of Gases",
                "Body Fluids & Circulation",
                "Excretory Products & Their Elimination",
                "Locomotion & Movement",
                "Neural Control & Coordination",
                "Chemical Coordination & Integration",
                "Animal kingdom",
                "Biomolecules"
            ]
        },
        "Class 12": {
            Physics: [
                "Electric Charges and Fields",
                "Electrostatic Potential and Capacitance",
                "Current Electricity",
                "Magnetism and Matter",
                "Electromagnetic Induction",
                "Alternating Current",
                "Electromagnetic Waves",
                "Ray Optics and Optical Instruments",
                "Wave Optics",
                "Dual Nature of Radiation and Matter",
                "Atoms",
                "Nuclei",
                "Semiconductor Electronics",
            ],
            "Physical Chemistry": [
                "Solutions",
                "Electrochemistry",
                "Chemical Kinetics",
            ],
            "Organic Chemistry": [
                "Haloalkanes and Haloarenes",
                "Alcohols, Phenols and Ethers",
                "Aldehydes, Ketones and Carboxylic Acids",
                "Amines",
                "Biomolecules",
            ],
            "Inorganic Chemistry": [
                "The d-Block and f-Block Elements",
                "Coordination Compounds"
            ],
            Botany: [
                "Sexual Reproduction in Flowering Plants",
                "Principles of Inheritance and Variation",
                "Molecular Basis of Inheritance",
                "Microbes in Human Welfare",
                "Organisms and Populations",
                "Ecosystem",
                "Biodiversity and Conservation",
            ],
            Zoology: [
                "Human Reproduction",
                "Reproductive Health",
                "Evolution",
                "Human Health and Disease",
                "Biotechnology Principles and Processes",
                "Biotechnology and its Applications",
            ]
        }
    },
    JEE: {
        "Class 11": {
            Physics: [
                "Vectors",
                "Units and Measurements",
                "Motion in a Straight Line",
                "Motion in a Plane",
                "Laws of Motion",
                "Work, Energy and Power",
                "Rotational Motion",
                "Gravitation",
                "Mechanical Properties of Solids",
                "Mechanical Properties of Fluids",
                "Thermal Properties of Matter",
                "Thermodynamics",
                "Kinetic Theory",
                "Oscillations",
                "Waves"
            ],
            "Physical Chemistry": [
                "Some Basic Concepts of Chemistry",
                "Structure of atom",
                "States of Matter",
                "Thermodynamics",
                "Redox Reactions",
                "Chemical equilibrium",
                "Ionic equilibrium"
            ],
            "Organic Chemistry": [
                "Some Basic principles and Techniques (IUPAC Naming)",
                "Some Basic principles and Techniques (Isomerism)",
                "General organic chemistry (GOC)",
                "Purification, Characterisation, Qualitative & Quantitative",
                "Hydrocarbons"
            ],
            "Inorganic Chemistry": [
                "Classification of Elements and Periodicity in Properties",
                "Chemical Bonding and Molecular Structure",
                "The s-Block Elements",
                "The p-Block Elements"
            ],
            Mathematics: [
                "Sets, Relations and Functions",
                "Complex Numbers and Quadratic Equations",
                "Matrices and Determinants",
                "Permutations and Combinations",
                "Binomial Theorem and its Simple Applications",
                "Sequence and Series",
                "Limit, Continuity and Differentiability",
                "Integral Calculus",
                "Differential Equations",
                "Coordinate Geometry",
                "Three Dimensional Geometry",
                "Vector Algebra",
                "Statistics and Probability",
                "Trigonometry",
                "Mathematical Reasoning"
            ]
        },
        "Class 12": {
            Physics: [
                "Electric Charges and Fields",
                "Electrostatic Potential and Capacitance",
                "Current Electricity",
                "Magnetic Effects of Current",
                "Magnetism and Matter",
                "Electromagnetic Induction",
                "Alternating Current",
                "Electromagnetic Waves",
                "Ray Optics and Optical Instruments",
                "Wave Optics",
                "Dual Nature of Radiation and Matter",
                "Atoms",
                "Nuclei",
                "Semiconductor Electronics",
            ],
            "Physical Chemistry": [
                "Solutions",
                "Electrochemistry",
                "Chemical Kinetics",
            ],
            "Organic Chemistry": [
                "Haloalkanes and Haloarenes",
                "Alcohols, Phenols and Ethers",
                "Aldehydes, Ketones and Carboxylic Acids",
                "Amines",
                "Biomolecules",
            ],
            "Inorganic Chemistry": [
                "The d-Block and f-Block Elements",
                "Coordination Compounds"
            ],
            Mathematics: [
                "Relations and Functions",
                "Inverse Trigonometric Functions",
                "Matrices",
                "Determinants",
                "Continuity and Differentiability",
                "Applications of Derivatives",
                "Integrals",
                "Applications of Integrals",
                "Differential Equations",
                "Vector Algebra",
                "Three Dimensional Geometry",
                "Linear Programming",
                "Probability"
            ]
        }
    }
};
// --- FLIP ANIMATION COMPONENTS ---
// --- IMPROVED FLIP ANIMATION COMPONENTS ---
const AnimatedCard = ({ digit }) => {
    // Key change forces animation restart
    return React.createElement('div', { className: 'flip-unit-container' },
        // Upper card (Static current)
        React.createElement('div', { className: 'upper-card' }, 
            React.createElement('span', null, digit)
        ),
        // Lower card (Static current)
        React.createElement('div', { className: 'lower-card' }, 
            React.createElement('span', null, digit)
        ),
        // Flipper (Animation trigger)
        React.createElement('div', { 
            key: digit, // Crucial for animation reset
            className: 'upper-card fold', 
            style: { zIndex: 2 } 
        }, 
            React.createElement('span', null, digit)
        ),
        React.createElement('div', { 
            key: `${digit}-bottom`, 
            className: 'lower-card unfold', 
            style: { zIndex: 2 } 
        }, 
            React.createElement('span', null, digit)
        )
    );
};

const StaticCard = () => {
    return React.createElement('div', { className: 'static-card' }, 
        React.createElement('span', null, ':')
    );
};
const App = () => {
 // --- AKELA AUR SAHI SYNC LOGIC ---
    const [user, setUser] = useState(null);
    const [currentExam, setCurrentExam] = useState(() => localStorage.getItem('currentExam') || null);
    const [view, setView] = useState(() => localStorage.getItem('lastView') || (currentExam ? 'home' : 'exam-select'));
const [selectedClass, setSelectedClass] = useState(() => localStorage.getItem('lastClass') || null);
const [selectedSubject, setSelectedSubject] = useState(() => localStorage.getItem('lastSubject') || null);
const [selectedChapter, setSelectedChapter] = useState(() => localStorage.getItem('lastChapter') || null);
    const [data, setData] = useState({ 
        NEET: {}, JEE: {}, dailyGoals: [], tests: [], mistakes: [] ,studyHistory: {}, 
        timerState: { isRunning: false, startTime: null, elapsed: 0, laps: [] }
    });
    const [activeNotif, setActiveNotif] = useState(null);
    const [notifShow, setNotifShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [toast, setToast] = useState({ show: false, message: '' });
    const [isFetched, setIsFetched] = useState(false);
const compressImage = (file) => {
        return new Promise((resolve) => {
            const reader = new FileReader(); reader.readAsDataURL(file);
            reader.onload = (e) => {
                const img = new Image(); img.src = e.target.result;
                img.onload = () => {
                    const canvas = document.createElement('canvas');
                    // HARD COMPRESSION: Width 400px (Sufficient for phone screen)
                    const MAX_WIDTH = 400; 
                    let width = img.width, height = img.height;
                    if (width > MAX_WIDTH) { height *= MAX_WIDTH / width; width = MAX_WIDTH; }
                    canvas.width = width; canvas.height = height;
                    const ctx = canvas.getContext('2d');
                    ctx.drawImage(img, 0, 0, width, height);
                    // Quality 0.2 gives roughly 30-40KB file size
                    resolve(canvas.toDataURL('image/jpeg', 0.2));
                };
            };
        });
    };

    // --- FAST REVISION LOGIC (Improved) ---
    const triggerRevision = () => {
        const pending = (data.mistakes || []).filter(m => !m.mastered);
        if (pending.length === 0) {
            showToast("No mistakes found! Keep it up.");
            return;
        }
        const random = pending[Math.floor(Math.random() * pending.length)];
        setActiveNotif(random);
        setNotifShow(true);
        setTimeout(() => setNotifShow(false), 20000); // 20 sec stay
    };

    useEffect(() => {
        if (!isFetched || !data.mistakes || data.mistakes.length === 0) return;
        const init = setTimeout(triggerRevision, 8000); // Page load ke 8 sec baad
        const loop = setInterval(triggerRevision, 900000); // Har 15 min
        return () => { clearTimeout(init); clearInterval(loop); };
    }, [isFetched]);
    // 1. Auth Status (Login Check)
    // --- BROWSER BACK BUTTON FIX ---
    useEffect(() => {
        // App load hote hi Home state ko history mein replace karein
        if (view === 'home' && !window.history.state) {
            window.history.replaceState({ 
                view: 'home', 
                selectedClass: null, 
                selectedSubject: null, 
                selectedChapter: null 
            }, "");
        }
    }, [view]);
    useEffect(() => {
        if (!window.auth) return;
        const unsubscribe = window.auth.onAuthStateChanged((u) => {
            if (u) { setUser(u); } 
            else { window.location.href = "login.html"; }
        });
        return () => unsubscribe();
    }, []);

    // 2. Navigation Logic
    const navigateTo = (viewName, params = {}) => {
        localStorage.setItem('lastView', viewName);
        localStorage.setItem('lastClass', params.selectedClass !== undefined ? params.selectedClass : (selectedClass || ''));
        localStorage.setItem('lastSubject', params.selectedSubject !== undefined ? params.selectedSubject : (selectedSubject || ''));
        localStorage.setItem('lastChapter', params.selectedChapter !== undefined ? params.selectedChapter : (selectedChapter || ''));
        // Naye params ko current state ke sath merge karein
        const nextClass = params.selectedClass !== undefined ? params.selectedClass : selectedClass;
        const nextSub = params.selectedSubject !== undefined ? params.selectedSubject : selectedSubject;
        const nextChap = params.selectedChapter !== undefined ? params.selectedChapter : selectedChapter;

        const state = {
            view: viewName,
            selectedClass: nextClass,
            selectedSubject: nextSub,
            selectedChapter: nextChap
        };

        // Browser history mein naya stop add karein
        window.history.pushState(state, "");

        // React states update karein
        setView(viewName);
        setSelectedClass(nextClass);
        setSelectedSubject(nextSub);
        setSelectedChapter(nextChap);
    };

    useEffect(() => {
        const handlePopState = (event) => {
            if (event.state) {
                setView(event.state.view);
                setSelectedClass(event.state.selectedClass);
                setSelectedSubject(event.state.selectedSubject);
                setSelectedChapter(event.state.selectedChapter);
            }
        };
        window.addEventListener('popstate', handlePopState);
        return () => window.removeEventListener('popstate', handlePopState);
    }, []);

// 3. LOAD DATA (Database se progress lana) - FIXED VERSION
useEffect(() => {
    const loadFromDB = async () => {
        if (user && window.db && window.dbFuncs) {
            try {
                const { doc, getDoc } = window.dbFuncs;
                const docRef = doc(window.db, "users", user.uid);
                const docSnap = await getDoc(docRef);
                if (docSnap.exists()) {
                    setData(docSnap.data());
                }
                setIsFetched(true);
            } catch (err) {
                console.error("Load error:", err);
                setIsFetched(true);
            }
        }
    };
    if (user) loadFromDB();
}, [user]);

    // 4. SAVE DATA (Progress database mein bhejna)
    useEffect(() => {
        const saveToDB = async () => {
            if (user && isFetched && window.dbFuncs && window.db) {
                const { doc, setDoc } = window.dbFuncs;
                try {
                    const docRef = doc(window.db, "users", user.uid);
                    await setDoc(docRef, data, { merge: true });
                    localStorage.setItem('currentExam', currentExam || '');
                } catch (err) {
                    console.error("Save error:", err);
                }
            }
        };
        const timer = setTimeout(saveToDB, 1500);
        return () => clearTimeout(timer);
    }, [data, currentExam, isFetched, user]);
    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const changeExam = () => {
        setCurrentExam(null);
        setView('exam-select');
        localStorage.removeItem('lastView');
        localStorage.removeItem('lastClass');
        localStorage.removeItem('lastSubject');
        localStorage.removeItem('lastChapter');
        setSelectedClass(null);
        setSelectedSubject(null);
        setSelectedChapter(null);
    };

    const getChapterData = (className, subject, chapter) => {
        if (!data[currentExam]) return {};
        if (!data[currentExam][className]) return {};
        if (!data[currentExam][className][subject]) return {};
        return data[currentExam][className][subject][chapter] || {};
    };

    const updateChapterData = (className, subject, chapter, newData) => {
        setData(prev => ({
            ...prev,
            [currentExam]: {
                ...prev[currentExam],
                [className]: {
                    ...prev[currentExam]?.[className],
                    [subject]: {
                        ...prev[currentExam]?.[className]?.[subject],
                        [chapter]: {
                            ...prev[currentExam]?.[className]?.[subject]?.[chapter],
                            ...newData
                        }
                    }
                }
            }
        }));
    };

    const resetAllProgress = () => {
        setModalConfig({
            title: 'Reset All Progress',
            message: 'Are you sure you want to reset all progress? This action cannot be undone.',
            onConfirm: () => {
                setData(prev => ({ ...prev, [currentExam]: {} }));
                setShowModal(false);
                showToast('All progress has been reset');
            }
        });
        setShowModal(true);
    };

    const handleDeleteChapter = (className, subject, chapter) => {
    setModalConfig({
        title: "Delete Chapter",
        message: `Are you sure you want to delete "${chapter}"?`,
        onConfirm: () => {
            // Remove chapter from syllabus list (THIS WAS MISSING)
            const chapters = EXAM_SYLLABUS[currentExam][className][subject];
            const index = chapters.indexOf(chapter);
            if (index > -1) chapters.splice(index, 1);

            // Remove saved progress data
            setData(prev => {
                const newData = { ...prev };
                if (newData[currentExam]?.[className]?.[subject]) {
                    delete newData[currentExam][className][subject][chapter];
                }
                return newData;
            });

            setShowModal(false);
            showToast("Chapter deleted");

            // force re-render
            
        }
    });
    setShowModal(true);
};

    const addCustomChapter = (className, subject, chapterName) => {
        if (!EXAM_SYLLABUS[currentExam][className][subject].includes(chapterName)) {
            EXAM_SYLLABUS[currentExam][className][subject].push(chapterName);
            showToast(`Added: ${chapterName}`);
        }
       
    };

    const getProgress = (className, subject, chapter) => {
        const chapterData = getChapterData(className, subject, chapter);
        
        // Weighted components (total = 100%)
        let totalProgress = 0;
        
        // Lecture - 20%
        if (chapterData.lecture) totalProgress += 20;
        
        // Notes - 15%
        if (chapterData.notes) totalProgress += 15;
        
        // DPP - 10%
        if (chapterData.dpp) totalProgress += 10;
        
        // NEET PYQ - 15%
        if (chapterData.pyq) totalProgress += 15;
        
        // Short Notes - 10%
        if (chapterData.shortNotes) totalProgress += 10;
        
        // NCERT Reading - 5%
        if (chapterData.ncert) totalProgress += 5;
        
        // Test - 10%
        if (chapterData.test) totalProgress += 10;
        
        // Revisions (1-5) - 1% each = 5%
        if (chapterData.revision1) totalProgress += 1;
        if (chapterData.revision2) totalProgress += 1;
        if (chapterData.revision3) totalProgress += 1;
        if (chapterData.revision4) totalProgress += 1;
        if (chapterData.revision5) totalProgress += 1;
        
        // Satisfaction Rating - 1% per star (max 10%)
        const satisfaction = chapterData.satisfaction || 0;
        totalProgress += satisfaction; // Each star = 1%
        
        return Math.round(totalProgress);
    };

    const getSubjectProgress = (className, subject) => {
        const chapters = EXAM_SYLLABUS[currentExam][className][subject];
        const total = chapters.reduce((sum, chapter) => sum + getProgress(className, subject, chapter), 0);
        return Math.round(total / chapters.length);
    };

    const getClassProgress = (className) => {
        const subjects = Object.keys(EXAM_SYLLABUS[currentExam][className]);
        const total = subjects.reduce((sum, subject) => sum + getSubjectProgress(className, subject), 0);
        return Math.round(total / subjects.length);
    };
const getAnalytics = (filterClass = 'Overall') => {
        // Step A: Check karna ki data 'Overall' chahiye ya kisi specific Class ka
        const classes = filterClass === 'Overall' 
            ? Object.keys(EXAM_SYLLABUS[currentExam]) 
            : [filterClass];
            
        let totalChapters = 0;
        let completedChapters = 0;
        let totalProgress = 0;
        let totalSatisfaction = 0;
        let satisfactionCount = 0;
        let strongCount = 0;
        let moderateCount = 0;
        let weakCount = 0;
        let subjectProgress = {};

        // Step B: Loop chala kar data nikalna
        classes.forEach(className => {
            if (!EXAM_SYLLABUS[currentExam][className]) return;

            Object.keys(EXAM_SYLLABUS[currentExam][className]).forEach(subject => {
                const chapters = EXAM_SYLLABUS[currentExam][className][subject];
                totalChapters += chapters.length;

                if (!subjectProgress[subject]) {
                    subjectProgress[subject] = { total: 0, count: 0, name: subject };
                }

                chapters.forEach(chapter => {
                    const progress = getProgress(className, subject, chapter);
                    totalProgress += progress;
                    subjectProgress[subject].total += progress;
                    subjectProgress[subject].count += 1;

                    if (progress === 100) completedChapters++;
                    
                    const chapterData = getChapterData(className, subject, chapter);
                    const stars = chapterData.satisfaction || 0;
                    
                    if (stars > 0) {
                        totalSatisfaction += stars;
                        satisfactionCount++;
                        // Rating Logic: Strong, Moderate, Weak
                        if (stars >= 8) strongCount++;
                        else if (stars >= 5) moderateCount++;
                        else weakCount++;
                    }
                });
            });
        });

        // Step C: Sabse kam progress wala subject dhundna
        const neglected = Object.entries(subjectProgress)
            .map(([key, val]) => ({ 
                name: val.name, 
                progress: val.count > 0 ? Math.round(val.total / val.count) : 0 
            }))
            .sort((a, b) => a.progress - b.progress)[0] || { name: 'None', progress: 0 };

        // Step D: Dashboard ko final data bhejna
        return {
            overallProgress: totalChapters > 0 ? Math.round(totalProgress / totalChapters) : 0,
            totalChapters,
            completedChapters,
            avgSatisfaction: satisfactionCount > 0 ? (totalSatisfaction / satisfactionCount).toFixed(1) : 0,
            strongCount,
            moderateCount,
            weakCount,
            neglectedSubject: neglected.name,
            neglectedProgress: neglected.progress
        };
    };

    const getSubjectClass = (subject) => {
        const subjectMap = {
            'Physics': 'subject-physics',
            'Botany': 'subject-botany',
            'Zoology': 'subject-zoology',
            'Mathematics': 'subject-mathematics',
            'Physical Chemistry': 'subject-physical-chemistry',
            'Organic Chemistry': 'subject-organic-chemistry',
            'Inorganic Chemistry': 'subject-inorganic-chemistry'
        };
        return subjectMap[subject] || '';
    };

    // Import/Export functions
    const exportData = () => {
        const dataStr = JSON.stringify(data, null, 2);
        const dataBlob = new Blob([dataStr], { type: 'application/json' });
        const url = URL.createObjectURL(dataBlob);
        const link = document.createElement('a');
        link.href = url;
        link.download = `${currentExam}_syllabus_backup_${new Date().toISOString().split('T')[0]}.json`;
        link.click();
        URL.revokeObjectURL(url);
        showToast('Data exported successfully!');
    };

    const importData = (event) => {
        const file = event.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (e) => {
            try {
                const importedData = JSON.parse(e.target.result);
                setData(importedData);
                showToast('Data imported successfully!');
            } catch (error) {
                showToast('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
    };

    const ExamSelectView = () => {
        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'header' },
                React.createElement('h1', { className: 'logo' }, 'SyllbusS Tracker'),
                React.createElement('p', { className: 'tagline' }, 'Choose Your Path to Success')
            ),
            React.createElement('div', { className: 'grid grid-2' },
                React.createElement('div', {
                    className: 'card exam-card',
                    onClick: () => {
                        setCurrentExam('NEET');
                        navigateTo('home');
                    }
                },
                    React.createElement('div', { className: 'exam-icon' }, '🏥'),
                    React.createElement('h2', { className: 'card-title', style: { fontSize: '2rem', marginTop: '1rem' } }, 'NEET'),
                    React.createElement('p', { className: 'card-subtitle' }, 'National Eligibility cum Entrance Test'),
                    React.createElement('div', { className: 'exam-subjects' },
                        React.createElement('span', { className: 'exam-subject-tag' }, 'Physics'),
                        React.createElement('span', { className: 'exam-subject-tag' }, 'Chemistry'),
                        React.createElement('span', { className: 'exam-subject-tag' }, 'Biology')
                    )
                ),
                React.createElement('div', {
                    className: 'card exam-card',
                    onClick: () => {
                        setCurrentExam('JEE');
                        navigateTo('home');
                    }
                },
                    React.createElement('div', { className: 'exam-icon' }, '⚙️'),
                    React.createElement('h2', { className: 'card-title', style: { fontSize: '2rem', marginTop: '1rem' } }, 'JEE'),
                    React.createElement('p', { className: 'card-subtitle' }, 'Joint Entrance Examination'),
                    React.createElement('div', { className: 'exam-subjects' },
                        React.createElement('span', { className: 'exam-subject-tag' }, 'Physics'),
                        React.createElement('span', { className: 'exam-subject-tag' }, 'Chemistry'),
                        React.createElement('span', { className: 'exam-subject-tag' }, 'Mathematics')
                    )
                )
            ),
            React.createElement('div', { className: 'social-links', style: { marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem' } },
                React.createElement('a', {
                    href: 'https://www.instagram.com/naitik_156_?igsh=ejF0ZmV4dTJoa3Iz',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'social-link',
                    style: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s' }
                },
                    React.createElement('svg', {
                        width: '24',
                        height: '24',
                        viewBox: '0 0 24 24',
                        fill: 'currentColor',
                        style: { color: '#E4405F' }
                    },
                        React.createElement('path', {
                            d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
                        })
                    ),
                    React.createElement('span', null, '@naitik_156_')
                ),
                React.createElement('a', {
                    href: 'mailto:rajnaitik620@gmail.com',
                    className: 'social-link',
                    style: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s' }
                },
                    React.createElement('svg', {
                        width: '24',
                        height: '24',
                        viewBox: '0 0 24 24',
                        fill: 'currentColor',
                        style: { color: '#EA4335' }
                    },
                        React.createElement('path', {
                            d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
                        })
                    ),
                    React.createElement('span', null, 'rajnaitik620@gmail.com')
                )
            )
        );
    };

    const HomePage = () => {
    return React.createElement('div', { className: 'container' },
        // --- COMPACT HEADER (Breadcrumb + Small Logout) ---
        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '1.5rem', gap: '10px' } },
            React.createElement('div', { className: 'nav-breadcrumb', style: { margin: 0 } },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, 'Home')
            ),
            React.createElement('button', { 
                className: 'btn btn-logout-small', 
                onClick: window.logoutUser 
            }, 'Logout 🚪')
        ),
            React.createElement('div', { className: 'header' },
                React.createElement('h1', { className: 'logo' }, `${currentExam} Syllabus Tracker`),
                React.createElement('p', { className: 'tagline' }, 'Track Your Progress • Stay Focused • Achieve Success')
            ),
            React.createElement('div', { style: { textAlign: 'center', marginBottom: '2rem', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '0.75rem' } },
                React.createElement('button', {
                    className: 'btn btn-secondary',
                    onClick: changeExam,
                    style: { minWidth: '200px' }
                }, 'Change Exam'),
                React.createElement('div', { style: { display: 'flex', gap: '0.75rem', flexWrap: 'wrap', justifyContent: 'center' } },
                    React.createElement('button', {
                        className: 'btn btn-primary',
                        onClick: exportData,
                        style: { minWidth: '150px' }
                    }, '📥 Export Data'),
                    React.createElement('label', {
                        className: 'btn btn-primary',
                        style: { cursor: 'pointer', minWidth: '150px' }
                    },
                        '📤 Import Data',
                        React.createElement('input', {
                            type: 'file',
                            accept: '.json',
                            onChange: importData,
                            style: { display: 'none' }
                        })
                    )
                )
            ),
            React.createElement('div', { className: 'grid grid-2' },
                React.createElement('div', {
                    className: 'card class-card',
                    onClick: () => {
                        setSelectedClass('Class 11');
                        navigateTo('subjects', { selectedClass: 'Class 11' });
                    }
                },
                    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                        React.createElement('span', { style: { fontSize: '3rem' } }, '📚'),
                        React.createElement('h2', { className: 'card-title', style: { margin: 0 } }, 'Class 11')
                    ),
                    React.createElement('p', { className: 'card-subtitle' }, 'Foundation Building Phase'),
                    React.createElement('div', { className: 'progress-container', style: { marginTop: '1.5rem' } },
                        React.createElement('div', { className: 'progress-label' },
                            React.createElement('span', null, 'Overall Progress'),
                            React.createElement('span', null, `${getClassProgress('Class 11')}%`)
                        ),
                        React.createElement('div', { className: 'progress-bar-bg' },
                            React.createElement('div', { className: 'progress-bar-fill', style: { width: `${getClassProgress('Class 11')}%` } })
                        )
                    )
                ),
                React.createElement('div', {
                    className: 'card class-card',
                    onClick: () => {
                        setSelectedClass('Class 12');
                        navigateTo('subjects', { selectedClass: 'Class 12' });
                    }
                },
                    React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '1rem' } },
                        React.createElement('span', { style: { fontSize: '3rem' } }, '🎓'),
                        React.createElement('h2', { className: 'card-title', style: { margin: 0 } }, 'Class 12')
                    ),
                    React.createElement('p', { className: 'card-subtitle' }, 'Advanced Concepts Phase'),
                    React.createElement('div', { className: 'progress-container', style: { marginTop: '1.5rem' } },
                        React.createElement('div', { className: 'progress-label' },
                            React.createElement('span', null, 'Overall Progress'),
                            React.createElement('span', null, `${getClassProgress('Class 12')}%`)
                        ),
                        React.createElement('div', { className: 'progress-bar-bg' },
                            React.createElement('div', { className: 'progress-bar-fill', style: { width: `${getClassProgress('Class 12')}%` } })
                        )
                    )
                )
            ),
            // --- NEW BENTO FEATURE CARDS GRID ---
            React.createElement('div', { className: 'grid grid-3', style: { marginTop: '3rem', gap: '1.5rem' } },
                
                // Analytics Card
                React.createElement('div', { 
                    className: 'card', 
                    onClick: () => navigateTo('dashboard'),
                    style: { textAlign: 'center', cursor: 'pointer', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem' }
                },
                    React.createElement('div', { style: { fontSize: '3rem', marginBottom: '0.75rem' } }, '📈'),
                    React.createElement('h3', { className: 'card-title', style: { fontSize: '1.25rem', margin: 0 } }, 'Analytics'),
                    React.createElement('p', { className: 'card-subtitle', style: { fontSize: '0.9rem', marginTop: '5px' } }, 'Full Performance Report')
                ),

                // Test Analysis Card
                React.createElement('div', { 
                    className: 'card', 
                    onClick: () => navigateTo('test-analysis'),
                    style: { textAlign: 'center', cursor: 'pointer', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem' }
                },
                    React.createElement('div', { style: { fontSize: '3rem', marginBottom: '0.75rem' } }, '📝'),
                    React.createElement('h3', { className: 'card-title', style: { fontSize: '1.25rem', margin: 0 } }, 'Test & Error'),
                    React.createElement('p', { className: 'card-subtitle', style: { fontSize: '0.9rem', marginTop: '5px' } }, 'Master Your Mistakes')
                ),

                // Daily Goals Card
                React.createElement('div', { 
                    className: 'card', 
                    onClick: () => navigateTo('daily-goals'),
                    style: { 
                        textAlign: 'center', 
                        cursor: 'pointer', 
                        minHeight: '180px', 
                        display: 'flex', 
                        flexDirection: 'column', 
                        justifyContent: 'center',
                        padding: '1.5rem',
                        borderBottom: '5px solid #F59E0B' // Premium Gold border
                    }
                },
                    React.createElement('div', { style: { fontSize: '3rem', marginBottom: '0.75rem' } }, '🎯'),
                    React.createElement('h3', { className: 'card-title', style: { fontSize: '1.25rem', margin: 0 } }, 'Daily Goals'),
                    React.createElement('p', { className: 'card-subtitle', style: { fontSize: '0.9rem', marginTop: '5px' } }, 'Check Today\'s Targets')
                ),
                                // Focus Timer Card
                React.createElement('div', { 
                    className: 'card', 
                    onClick: () => navigateTo('stopwatch'),
                    style: { textAlign: 'center', cursor: 'pointer', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem', background: '#1c1917', color: 'white', border: '1px solid #333' }
                },
                    React.createElement('div', { style: { fontSize: '3rem', marginBottom: '0.75rem' } }, '⏱️'),
                    React.createElement('h3', { className: 'card-title', style: { fontSize: '1.25rem', margin: 0, color: 'white' } }, 'Focus Timer'),
                    React.createElement('p', { className: 'card-subtitle', style: { fontSize: '0.9rem', marginTop: '5px', color: '#a8a29e' } }, 'Track Study Hours')
                )
            ),
            React.createElement('div', { className: 'social-links', style: { marginTop: '3rem', display: 'flex', justifyContent: 'center', gap: '2rem', flexWrap: 'wrap' } },
                React.createElement('a', {
                    href: 'https://www.instagram.com/naitik_156_?igsh=ejF0ZmV4dTJoa3Iz',
                    target: '_blank',
                    rel: 'noopener noreferrer',
                    className: 'social-link',
                    style: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s' }
                },
                    React.createElement('svg', {
                        width: '24',
                        height: '24',
                        viewBox: '0 0 24 24',
                        fill: 'currentColor',
                        style: { color: '#E4405F' }
                    },
                        React.createElement('path', {
                            d: 'M12 2.163c3.204 0 3.584.012 4.85.07 3.252.148 4.771 1.691 4.919 4.919.058 1.265.069 1.645.069 4.849 0 3.205-.012 3.584-.069 4.849-.149 3.225-1.664 4.771-4.919 4.919-1.266.058-1.644.07-4.85.07-3.204 0-3.584-.012-4.849-.07-3.26-.149-4.771-1.699-4.919-4.92-.058-1.265-.07-1.644-.07-4.849 0-3.204.013-3.583.07-4.849.149-3.227 1.664-4.771 4.919-4.919 1.266-.057 1.645-.069 4.849-.069zm0-2.163c-3.259 0-3.667.014-4.947.072-4.358.2-6.78 2.618-6.98 6.98-.059 1.281-.073 1.689-.073 4.948 0 3.259.014 3.668.072 4.948.2 4.358 2.618 6.78 6.98 6.98 1.281.058 1.689.072 4.948.072 3.259 0 3.668-.014 4.948-.072 4.354-.2 6.782-2.618 6.979-6.98.059-1.28.073-1.689.073-4.948 0-3.259-.014-3.667-.072-4.947-.196-4.354-2.617-6.78-6.979-6.98-1.281-.059-1.69-.073-4.949-.073zm0 5.838c-3.403 0-6.162 2.759-6.162 6.162s2.759 6.163 6.162 6.163 6.162-2.759 6.162-6.163c0-3.403-2.759-6.162-6.162-6.162zm0 10.162c-2.209 0-4-1.79-4-4 0-2.209 1.791-4 4-4s4 1.791 4 4c0 2.21-1.791 4-4 4zm6.406-11.845c-.796 0-1.441.645-1.441 1.44s.645 1.44 1.441 1.44c.795 0 1.439-.645 1.439-1.44s-.644-1.44-1.439-1.44z'
                        })
                    ),
                    React.createElement('span', null, '@naitik_156_')
                ),
                React.createElement('a', {
                    href: 'mailto:rajnaitik620@gmail.com',
                    className: 'social-link',
                    style: { display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text)', textDecoration: 'none', transition: 'color 0.3s' }
                },
                    React.createElement('svg', {
                        width: '24',
                        height: '24',
                        viewBox: '0 0 24 24',
                        fill: 'currentColor',
                        style: { color: '#EA4335' }
                    },
                        React.createElement('path', {
                            d: 'M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z'
                        })
                    ),
                    React.createElement('span', null, 'rajnaitik620@gmail.com')
                )
            )
        );
    };

    const SubjectsView = () => {
        const subjects = Object.keys(EXAM_SYLLABUS[currentExam][selectedClass]);

        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, selectedClass)
            ),
            React.createElement('div', { className: 'header' },
                React.createElement('h2', { className: 'logo', style: { fontSize: '2.5rem' } }, selectedClass)
            ),
            React.createElement('div', { className: 'grid grid-3' },
                subjects.map(subject => React.createElement('div', {
                    key: subject,
                    className: `card ${getSubjectClass(subject)}`,
                    onClick: () => {
                        setSelectedSubject(subject);
                        navigateTo('chapters', { selectedSubject: subject });
                    }
                },
                    React.createElement('h3', { className: 'card-title' }, subject),
                    React.createElement('p', { className: 'card-subtitle' }, `${EXAM_SYLLABUS[currentExam][selectedClass][subject].length} Chapters`),
                    React.createElement('div', { className: 'progress-container', style: { marginTop: '1.5rem' } },
                        React.createElement('div', { className: 'progress-label' },
                            React.createElement('span', null, 'Progress'),
                            React.createElement('span', null, `${getSubjectProgress(selectedClass, subject)}%`)
                        ),
                        React.createElement('div', { className: 'progress-bar-bg' },
                            React.createElement('div', { className: 'progress-bar-fill', style: { width: `${getSubjectProgress(selectedClass, subject)}%` } })
                        )
                    )
                ))
            )
        );
    };

    const ChaptersView = () => {
        const chapters = [...EXAM_SYLLABUS[currentExam][selectedClass][selectedSubject]];
        const [showAddForm, setShowAddForm] = useState(false);
        const [newChapterName, setNewChapterName] = useState('');
        const [editingChapter, setEditingChapter] = useState(null);
        const [editedName, setEditedName] = useState('');

        const handleAddChapter = () => {
            if (newChapterName.trim()) {
                const trimmedName = newChapterName.trim();
                addCustomChapter(selectedClass, selectedSubject, trimmedName);
                
                // Initialize default task structure for new chapter
                updateChapterData(selectedClass, selectedSubject, trimmedName, {
                    lecture: false,
                    notes: false,
                    dpp: false,
                    pyq: false,
                    shortNotes: false,
                    ncert: false,
                    test: false,
                    revision1: false,
                    revision2: false,
                    revision3: false,
                    revision4: false,
                    revision5: false,
                    satisfaction: 0
                });
                
                setNewChapterName('');
                setShowAddForm(false);
                showToast(`Chapter added: ${trimmedName}`);
                
                // Force re-render to update UI and recalculate percentages
            
            }
        };

        const handleRenameChapter = (oldName) => {
            if (editedName.trim() && editedName.trim() !== oldName) {
                const trimmedName = editedName.trim();
                const index = EXAM_SYLLABUS[currentExam][selectedClass][selectedSubject].indexOf(oldName);
                if (index > -1) {
                    // Update the chapter name in the syllabus
                    EXAM_SYLLABUS[currentExam][selectedClass][selectedSubject][index] = trimmedName;
                    
                    // Migrate all data from old chapter name to new
                    const oldData = getChapterData(selectedClass, selectedSubject, oldName);
                    if (Object.keys(oldData).length > 0) {
                        updateChapterData(selectedClass, selectedSubject, trimmedName, oldData);
                        // Delete old chapter data
                        setData(prev => {
                            const newData = { ...prev };
                            if (newData[currentExam]?.[selectedClass]?.[selectedSubject]) {
                                const subjectData = { ...newData[currentExam][selectedClass][selectedSubject] };
                                delete subjectData[oldName];
                                newData[currentExam][selectedClass][selectedSubject] = subjectData;
                            }
                            return newData;
                        });
                    }
                    
                    showToast(`Chapter renamed: ${oldName} → ${trimmedName}`);
                    
                    // Force re-render to update UI
                 
                }
            }
            setEditingChapter(null);
            setEditedName('');
        };
const handleDeleteChapter = (chapterName) => {
    setModalConfig({
        title: 'Delete Chapter',
        message: `Are you sure you want to delete "${chapterName}"? All progress data will be permanently lost.`,
        onConfirm: () => {

            const list = EXAM_SYLLABUS[currentExam][selectedClass][selectedSubject];
            const index = list.indexOf(chapterName);
            if (index > -1) list.splice(index, 1);

            setData(prev => {
                const copy = { ...prev };
                if (copy[currentExam]?.[selectedClass]?.[selectedSubject]) {
                    delete copy[currentExam][selectedClass][selectedSubject][chapterName];
                }
                return copy;
            });

            setShowModal(false);
            showToast(`Chapter deleted: ${chapterName}`);
            
        }
    });
    setShowModal(true);
};

        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('subjects') }, selectedClass),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, selectedSubject)
            ),
            React.createElement('div', { className: 'header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '1rem' } },
                React.createElement('h2', { className: 'logo', style: { fontSize: '2rem', margin: 0 } }, selectedSubject),
                React.createElement('button', {
                    className: editMode ? 'edit-toggle-btn active' : 'edit-toggle-btn',
                    onClick: () => {
                        setEditMode(!editMode);
                        setShowAddForm(false);
                        setEditingChapter(null);
                        setNewChapterName('');
                    },
                    style: {
                        background: editMode ? 'var(--success)' : 'var(--primary)',
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.5rem'
                    }
                }, 
                    editMode ? '✓ Done Editing' : '✏️ Edit Chapters'
                )
            ),
            editMode && React.createElement('div', { 
                className: 'edit-mode-banner',
                style: {
                    background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.1), rgba(52, 211, 153, 0.1))',
                    padding: '1rem',
                    borderRadius: '8px',
                    marginBottom: '1.5rem',
                    textAlign: 'center',
                    border: '2px dashed var(--success)',
                    animation: 'fadeIn 0.3s ease'
                }
            },
                React.createElement('p', { style: { margin: 0, color: 'var(--success)', fontWeight: '600' } }, 
                    '✏️ Edit Mode Active: Click chapter names to rename, use - to delete, or + to add new chapters'
                )
            ),
            React.createElement('div', { className: 'grid grid-3' },
                chapters.map(chapter => {
                    const progress = getProgress(selectedClass, selectedSubject, chapter);
                    const chapterData = getChapterData(selectedClass, selectedSubject, chapter);
                    const satisfaction = chapterData.satisfaction || 0;
                    
                    return React.createElement('div', {
                        key: chapter,
                        className: `card chapter-card ${getSubjectClass(selectedSubject)}`,
                      onClick: (e) => {
    if (editMode) return;   // when editing, don't open chapter
    setSelectedChapter(chapter);
    navigateTo('detail', { selectedChapter: chapter });
}, 

                       style: {
                            cursor: editMode ? 'default' : 'pointer',
                            opacity: editMode && editingChapter && editingChapter !== chapter ? 0.6 : 1
                        }
                    },
                        React.createElement('div', { className: 'chapter-header', style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', gap: '0.5rem', marginBottom: '1rem' } },
                            editingChapter === chapter
                                ? React.createElement('input', {
                                    type: 'text',
                                    className: 'chapter-edit-input',
                                    value: editedName,
                                    onChange: (e) => setEditedName(e.target.value),
                                    onBlur: () => handleRenameChapter(chapter),
                                    onKeyPress: (e) => {
                                        if (e.key === 'Enter') handleRenameChapter(chapter);
                                        if (e.key === 'Escape') {
                                            setEditingChapter(null);
                                            setEditedName('');
                                        }
                                    },
                                    autoFocus: true,
                                    onClick: (e) => e.stopPropagation(),
                                    style: { flex: 1 }
                                })
                                : React.createElement('h3', {
                                    className: 'card-title chapter-title',
                                    onClick: (e) => {
                                        if (editMode) {
                                            e.stopPropagation();
                                            setEditingChapter(chapter);
                                            setEditedName(chapter);
                                        } else {
                                            setSelectedChapter(chapter);
                                            setView('detail');
                                        }
                                    },
                                    style: { 
                                        flex: 1, 
                                        cursor: editMode ? 'text' : 'pointer',
                                        margin: 0
                                    }
                                }, chapter),
                            editMode && React.createElement('button', {
                                className: 'delete-chapter-btn',
                            onClick: (e) => {
    e.stopPropagation();
    handleDeleteChapter(chapter);
},


                                title: 'Delete chapter'
                            }, '−')
                        ),
                        !editMode && React.createElement('div', { 
                            className: 'satisfaction-display',
                            onClick: () => {
                                setSelectedChapter(chapter);
                                setView('detail');
                            }
                        },
                            React.createElement('span', { style: { fontSize: '1.5rem' } },
                                satisfaction > 0 ? `${'★'.repeat(satisfaction)}${'☆'.repeat(10 - satisfaction)}` : '☆☆☆☆☆☆☆☆☆☆'
                            )
                        ),
                        !editMode && React.createElement('div', { 
                            className: 'progress-container', 
                            style: { marginTop: '1rem' },
                            onClick: () => {
                                setSelectedChapter(chapter);
                                setView('detail');
                            }
                        },
                            React.createElement('div', { className: 'progress-label' },
                                React.createElement('span', null, 'Progress'),
                                React.createElement('span', null, `${progress}%`)
                            ),
                            React.createElement('div', { className: 'progress-bar-bg' },
                                React.createElement('div', { className: 'progress-bar-fill', style: { width: `${progress}%` } })
                            )
                        ),
                        editMode && React.createElement('div', {
                            style: {
                                marginTop: '1rem',
                                padding: '0.75rem',
                                background: 'rgba(15, 118, 110, 0.05)',
                                borderRadius: '8px',
                                fontSize: '0.85rem',
                                color: 'var(--text-light)',
                                textAlign: 'center'
                            }
                        }, `Progress: ${progress}% • ${satisfaction > 0 ? `${satisfaction}/10 ★` : 'Not rated'}`)
                    );
                }),
                editMode && React.createElement('div', {
                    className: 'card add-chapter-card',
                    style: {
                        display: 'flex',
                        flexDirection: 'column',
                        justifyContent: 'center',
                        alignItems: 'center',
                        minHeight: '200px',
                        border: '2px dashed var(--success)',
                        background: 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(52, 211, 153, 0.05))',
                        cursor: showAddForm ? 'default' : 'pointer'
                    },
                    onClick: () => !showAddForm && setShowAddForm(true)
                },
                    showAddForm
                        ? React.createElement('div', { 
                            className: 'add-chapter-form',
                            style: { width: '100%', padding: '1rem' },
                            onClick: (e) => e.stopPropagation()
                        },
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Enter chapter name...',
                                value: newChapterName,
                                onChange: (e) => setNewChapterName(e.target.value),
                                onKeyPress: (e) => {
                                    if (e.key === 'Enter') handleAddChapter();
                                    if (e.key === 'Escape') {
                                        setShowAddForm(false);
                                        setNewChapterName('');
                                    }
                                },
                                autoFocus: true,
                                style: {
                                    width: '100%',
                                    padding: '0.75rem',
                                    fontSize: '1rem',
                                    border: '2px solid var(--success)',
                                    borderRadius: '8px',
                                    marginBottom: '1rem',
                                    outline: 'none'
                                }
                            }),
                            React.createElement('div', { style: { display: 'flex', gap: '0.5rem' } },
                                React.createElement('button', {
                                    className: 'btn',
                                    onClick: handleAddChapter,
                                    style: { 
                                        flex: 1,
                                        background: 'var(--success)',
                                        color: 'white'
                                    }
                                }, '✓ Add'),
                                React.createElement('button', {
                                    className: 'btn btn-secondary',
                                    onClick: () => {
                                        setShowAddForm(false);
                                        setNewChapterName('');
                                    },
                                    style: { flex: 1 }
                                }, '✕ Cancel')
                            )
                        )
                        : React.createElement(React.Fragment, null,
                            React.createElement('div', {
                                className: 'add-chapter-icon',
                                style: {
                                    fontSize: '3rem',
                                    color: 'var(--success)',
                                    marginBottom: '0.5rem',
                                    fontWeight: 'bold'
                                }
                            }, '+'),
                            React.createElement('p', {
                                className: 'card-subtitle',
                                style: { margin: 0, color: 'var(--success)', fontWeight: '600' }
                            }, 'Add New Chapter')
                        )
                )
            )
        );
    };

    const DetailView = () => {
        const chapterData = getChapterData(selectedClass, selectedSubject, selectedChapter);
        const progress = getProgress(selectedClass, selectedSubject, selectedChapter);

        const resetChapter = () => {
            setModalConfig({
                title: 'Reset Chapter',
                message: `Are you sure you want to reset all progress for "${selectedChapter}"?`,
                onConfirm: () => {
                    updateChapterData(selectedClass, selectedSubject, selectedChapter, {
                        lecture: false,
                        notes: false,
                        dpp: false,
                        pyq: false,
                        shortNotes: false,
                        ncert: false,
                        test: false,
                        revision1: false,
                        revision2: false,
                        revision3: false,
                        revision4: false,
                        revision5: false,
                        satisfaction: 0
                    });
                    setShowModal(false);
                    showToast('Chapter progress reset');
                }
            });
            setShowModal(true);
        };

        const tasks = [
            { label: 'Lecture (20%)', key: 'lecture' },
            { label: 'Notes (15%)', key: 'notes' },
            { label: 'DPP (10%)', key: 'dpp' },
            { label: `${currentExam} PYQ (15%)`, key: 'pyq' },
            { label: 'Short Notes (10%)', key: 'shortNotes' },
            { label: 'NCERT Reading (5%)', key: 'ncert' },
            { label: 'Test (10%)', key: 'test' },
            { label: 'Revision 1 (1%)', key: 'revision1' },
            { label: 'Revision 2 (1%)', key: 'revision2' },
            { label: 'Revision 3 (1%)', key: 'revision3' },
            { label: 'Revision 4 (1%)', key: 'revision4' },
            { label: 'Revision 5 (1%)', key: 'revision5' },
        ];

        return React.createElement('div', { className: 'container detail-page' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('subjects') }, selectedClass),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('chapters') }, selectedSubject),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, selectedChapter)
            ),
            React.createElement('div', { className: `detail-card ${getSubjectClass(selectedSubject)}` },
                React.createElement('div', { className: 'detail-header' },
                    React.createElement('h2', { className: 'detail-title' }, selectedChapter),
                    React.createElement('div', { className: 'progress-container' },
                        React.createElement('div', { className: 'progress-label' },
                            React.createElement('span', { style: { fontSize: '1.1rem', fontWeight: '700' } }, 'Overall Progress'),
                            React.createElement('span', { style: { fontSize: '1.5rem', fontWeight: '700', color: 'var(--primary)' } }, `${progress}%`)
                        ),
                        React.createElement('div', { className: 'progress-bar-bg', style: { height: '14px' } },
                            React.createElement('div', { className: 'progress-bar-fill', style: { width: `${progress}%` } })
                        )
                    )
                ),
                React.createElement('div', { 
                    className: 'weight-info', 
                    style: { 
                        background: 'rgba(15, 118, 110, 0.05)', 
                        padding: '1rem', 
                        borderRadius: '8px', 
                        marginBottom: '1.5rem',
                        fontSize: '0.85rem',
                        color: 'var(--text-light)'
                    } 
                },
                    React.createElement('strong', null, 'Progress Calculation: '),
                    'Each task has a weight that contributes to your overall progress (Total = 100%)'
                ),
                React.createElement('table', { className: 'task-table' },
                    React.createElement('tbody', null,
                        tasks.map(task => React.createElement('tr', { key: task.key },
                            React.createElement('td', { className: 'task-label' }, task.label),
                            React.createElement('td', { className: 'checkbox-wrapper' },
                                React.createElement('input', {
                                    type: 'checkbox',
                                    className: 'custom-checkbox',
                                    checked: !!chapterData[task.key],
                                    onChange: (e) => {
                                        updateChapterData(selectedClass, selectedSubject, selectedChapter, { [task.key]: e.target.checked });
                                    }
                                })
                            )
                        )),
                        React.createElement('tr', null,
                            React.createElement('td', { className: 'task-label' }, 'Satisfaction Level (1% per star, max 10%)'),
                            React.createElement('td', null,
                                React.createElement('div', { className: 'star-rating' },
                                    [...Array(10)].map((_, i) => React.createElement('span', {
                                        key: i,
                                        className: `star ${(chapterData.satisfaction || 0) > i ? 'filled' : ''}`,
                                        onClick: () => {
                                            updateChapterData(selectedClass, selectedSubject, selectedChapter, { satisfaction: i + 1 });
                                        }
                                    }, '★'))
                                )
                            )
                        )
                    )
                ),
                React.createElement('div', { className: 'action-buttons' },
                    React.createElement('button', { className: 'btn btn-danger', onClick: resetChapter }, 'Reset Chapter')
                )
            )
        );
    };

  const DashboardView = () => {
        // --- NAYA STATE: Dashboard ka class filter track karne ke liye ---
        const [dashFilter, setDashFilter] = React.useState('Overall');
        
        // Naye filter ke sath analytics calculation
        const analytics = getAnalytics(dashFilter);

        return React.createElement('div', { className: 'container' },
            // 1. Navigation Breadcrumb
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, 'Smart Dashboard')
            ),
            
            // 2. Dashboard Title
            React.createElement('div', { className: 'header' },
                React.createElement('h2', { className: 'logo', style: {fontSize: '2.2rem'} }, `${currentExam} Performance`),
                React.createElement('p', { className: 'tagline' }, `Viewing analytics for: ${dashFilter}`)
            ),

            // 3. CLASS SWITCHER BUTTONS (Professional Toggle)
            React.createElement('div', { className: 'dashboard-toggle' },
                ['Overall', 'Class 11', 'Class 12'].map(option => 
                    React.createElement('button', {
                        key: option,
                        className: `toggle-btn ${dashFilter === option ? 'active' : ''}`,
                        onClick: () => setDashFilter(option)
                    }, option)
                )
            ),

            // 4. MAIN STATS CARDS (Top Row)
            React.createElement('div', { className: 'dashboard-stats' },
                // Overall Progress Card
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-label' }, 'Overall Completion'),
                    React.createElement('div', { className: 'stat-value' }, `${analytics.overallProgress}%`),
                    React.createElement('div', { className: 'progress-bar-bg', style: {height: '8px', marginTop: '12px'} },
                        React.createElement('div', { className: 'progress-bar-fill', style: { width: `${analytics.overallProgress}%` } })
                    )
                ),
                // Chapters Done Card
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-label' }, 'Chapters Mastered'),
                    React.createElement('div', { className: 'stat-value', style: { color: 'var(--primary)' } }, `${analytics.completedChapters}/${analytics.totalChapters}`),
                    React.createElement('div', { className: 'stat-label', style: {fontSize: '0.8rem', marginTop: '5px'} }, '100% preparation done')
                ),
                // Satisfaction/Quality Card
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-label' }, 'Study Quality'),
                    React.createElement('div', { className: 'stat-value', style: { color: 'var(--secondary)' } }, `${analytics.avgSatisfaction}/10`),
                    React.createElement('div', { className: 'stat-label', style: {fontSize: '0.8rem', marginTop: '5px'} }, 'Based on star ratings')
                )
            ),

            // 5. SECONDARY ANALYSIS (Middle Row)
            React.createElement('div', { className: 'grid grid-2', style: { marginTop: '2rem' } },
                
                // Chapter Mastery Levels (Visual representation of Stars)
                React.createElement('div', { className: 'card' },
                    React.createElement('h3', { className: 'card-title', style: {fontSize: '1.25rem', marginBottom: '1.5rem'} }, 'Mastery Breakdown'),
                    React.createElement('div', { style: { display: 'flex', flexDirection: 'column', gap: '1.2rem' } },
                        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement('span', { style: { fontWeight: '600' } }, '🟢 Strong Chapters'),
                            React.createElement('span', { className: 'exam-subject-tag', style: {background: '#10B981'} }, analytics.strongCount)
                        ),
                        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement('span', { style: { fontWeight: '600' } }, '🟡 Moderate Prep'),
                            React.createElement('span', { className: 'exam-subject-tag', style: {background: '#F59E0B'} }, analytics.moderateCount)
                        ),
                        React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center' } },
                            React.createElement('span', { style: { fontWeight: '600' } }, '🔴 Need Attention'),
                            React.createElement('span', { className: 'exam-subject-tag', style: {background: '#EF4444'} }, analytics.weakCount)
                        )
                    )
                ),

                // Neglected Area / Subject Focus
                React.createElement('div', { className: 'card' },
                    React.createElement('h3', { className: 'card-title', style: {fontSize: '1.25rem', marginBottom: '1rem'} }, 'Focus Required'),
                    React.createElement('div', { style: { textAlign: 'center', background: 'rgba(239, 68, 68, 0.05)', padding: '1.5rem', borderRadius: '12px' } },
                        React.createElement('p', { style: { fontSize: '0.9rem', color: 'var(--text-light)', marginBottom: '0.5rem' } }, 'Least Prepared Subject:'),
                        React.createElement('h4', { style: { fontSize: '1.8rem', color: 'var(--danger)', marginBottom: '1rem' } }, analytics.neglectedSubject),
                        React.createElement('div', { className: 'progress-bar-bg' },
                            React.createElement('div', { 
                                className: 'progress-bar-fill', 
                                style: { width: `${analytics.neglectedProgress}%`, background: 'var(--danger)' } 
                            })
                        ),
                        React.createElement('p', { style: { marginTop: '0.8rem', fontSize: '0.85rem', fontWeight: '700' } }, `${analytics.neglectedProgress}% syllabus covered`)
                    )
                )
            ),

            // 6. ACTION FOOTER
            React.createElement('div', { style: { marginTop: '3rem', textAlign: 'center', display: 'flex', justifyContent: 'center', gap: '1rem' } },
                React.createElement('button', { className: 'btn btn-primary', onClick: exportData }, '📥 Download Report'),
                React.createElement('button', { className: 'btn btn-secondary', onClick: () => setView('home') }, '🔙 Back to Home')
            )
        );
    };  
const DailyGoalsView = () => {
    // --- HELPER: India ki Current Date nikalne ke liye (YYYY-MM-DD) ---
    const getISTDate = () => {
        return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    };

    const todayIST = getISTDate();
    const [viewDate, setViewDate] = useState(todayIST); // Select ki gayi date
    const [showAddModal, setShowAddModal] = useState(false);
    const [newGoal, setNewGoal] = useState({ 
        title: '', 
        desc: '', 
        icon: '📖', 
        isRecurring: false, 
        date: todayIST
    });
    
    const goalChartRef = React.useRef(null);

    // --- LOCK LOGIC: Kya hum aaj ki date dekh rahe hain? ---
    const isToday = viewDate === todayIST;

    // Goals filter: Sirf wahi dikhao jo us date ke hain ya har din (Recurring) hote hain
    const goals = (data.dailyGoals || []).filter(g => {
        if (g.isRecurring) return true;
        return g.date === viewDate;
    });

    const addGoal = () => {
        if (!newGoal.title.trim()) {
            showToast('Goal name bhariye!');
            return;
        }
        // Naya function: date: viewDate set kiya gaya hai
        const updatedGoals = [...(data.dailyGoals || []), { 
    ...newGoal, 
    id: Date.now(), 
    doneDates: {}, // Naya: Har din ka status yahan save hoga
    date: viewDate 
}];
        setData(prev => ({ ...prev, dailyGoals: updatedGoals }));
        setShowAddModal(false);
        // Reset form to default
        setNewGoal({ title: '', desc: '', icon: '📖', isRecurring: false, date: todayIST });
        showToast(`🎯 Target saved for ${viewDate.split('-').reverse().join('/')}`);
    };

    const toggleGoal = (id) => {
        if (!isToday) {
            showToast("⚠️ Aap sirf AAJ ke goals mark kar sakte hain!");
            return;
        }
        const updatedGoals = (data.dailyGoals || []).map(g => {
            if (g.id === id) {
                // Ab hum global "completed" ki jagah us din ki date check kar rahe hain
                const currentStatus = g.doneDates?.[todayIST] || false;
                return { 
                    ...g, 
                    doneDates: { ...(g.doneDates || {}), [todayIST]: !currentStatus } 
                };
            }
            return g;
        });
        
        // History calculation logic
        const todaysTasks = updatedGoals.filter(g => g.isRecurring || g.date === todayIST);
        const completedCount = todaysTasks.filter(g => g.doneDates?.[todayIST]).length;
        const percent = todaysTasks.length > 0 ? Math.round((completedCount / todaysTasks.length) * 100) : 0;

        setData(prev => ({ 
            ...prev, 
            dailyGoals: updatedGoals,
            goalsHistory: { ...(prev.goalsHistory || {}), [todayIST]: percent } 
        }));
    };
    const deleteGoal = (id) => {
        const updatedGoals = (data.dailyGoals || []).filter(g => g.id !== id);
        setData(prev => ({ ...prev, dailyGoals: updatedGoals }));
        showToast("Goal deleted");
    };

    // Graph drawing logic
    useEffect(() => {
        if (!goalChartRef.current || typeof Chart === 'undefined') return;
        const history = data.goalsHistory || {};
        const dates = Object.keys(history).sort().slice(-7); 
        const scores = dates.map(d => history[d]);
        const finalLabels = dates.length > 0 ? dates.map(d => d.split('-').slice(1).reverse().join('/')) : ["-", "-", "-", "-", "-", "-", "-"];
        
        const chart = new Chart(goalChartRef.current, {
            type: 'line',
            data: {
                labels: finalLabels,
                datasets: [{
                    label: 'Success %',
                    data: scores.length > 0 ? scores : [0,0,0,0,0,0,0],
                    borderColor: '#F59E0B',
                    backgroundColor: 'rgba(245, 158, 11, 0.1)',
                    fill: true,
                    tension: 0.4,
                    borderWidth: 3
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                scales: { y: { beginAtZero: true, max: 100, ticks: { callback: v => v + '%' } } },
                plugins: { legend: { display: false } }
            }
        });
        return () => chart.destroy();
    }, [data.goalsHistory]);

    const progressPercent = goals.length > 0 ? Math.round((goals.filter(g => g.doneDates?.[viewDate]).length / goals.length) * 100) : 0;

    return React.createElement('div', { className: 'container daily-goals-page' },
        React.createElement('div', { className: 'nav-breadcrumb' },
            React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
            React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
            React.createElement('span', { className: 'breadcrumb-item active' }, 'Daily Goals')
        ),

        // Header Section with Date Picker
        React.createElement('div', { className: 'goals-header-card' },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '15px' } },
                React.createElement('div', null,
                    React.createElement('h2', { className: 'logo', style: { fontSize: '2.5rem', marginBottom: '5px' } }, 'Targets'),
                    React.createElement('p', { style: { color: 'var(--text-light)', fontWeight: '700' } }, 
                        isToday ? "📅 Today's List" : `📅 List for ${viewDate.split('-').reverse().join('/')}`
                    )
                ),
                // DATE SWITCHER (Top Right Corner)
                React.createElement('div', { className: 'date-picker-wrapper' },
                    React.createElement('input', { 
                        type: 'date', 
                        className: 'date-input-modern',
                        value: viewDate,
                        onChange: (e) => setViewDate(e.target.value)
                    })
                )
            ),
            
            React.createElement('div', { className: 'progress-container', style: { marginTop: '1.5rem' } },
                React.createElement('div', { className: 'progress-label' },
                    React.createElement('span', { style: { fontWeight: '700' } }, 'Completion:'),
                    React.createElement('span', { style: { fontWeight: '700', color: 'var(--primary)' } }, `${progressPercent}%`)
                ),
                React.createElement('div', { className: 'progress-bar-bg', style: { height: '8px' } },
                                
                    React.createElement('div', { className: 'progress-bar-fill', style: { width: `${progressPercent}%`, background: 'linear-gradient(90deg, #F59E0B, #fbbf24)' } })
                )
            )
        ),

        // Lock Message (Past ya Future dates ke liye)
        !isToday && React.createElement('div', { className: 'lock-banner' }, 
            `🔒 You are viewing ${viewDate < todayIST ? 'History' : 'Future Planning'}. Marking/Unmarking is disabled.`
        ),

        // Consistency Graph
        React.createElement('div', { className: 'card', style: { marginBottom: '2rem', padding: '20px', borderLeft: '6px solid #F59E0B' } },
            React.createElement('h3', { style: { fontSize: '1rem', fontWeight: '800', marginBottom: '15px' } }, '📈 Consistency Trend'),
            React.createElement('div', { style: { height: '180px' } },
                React.createElement('canvas', { ref: goalChartRef })
            )
        ),

        // Goals List
        React.createElement('div', { style: { maxWidth: '700px', margin: '0 auto', paddingBottom: '80px' } },
            goals.length === 0 
            ? React.createElement('div', { className: 'empty-state-container' }, 'No goals found for this date.')
            : goals.map(goal => React.createElement('div', { 
                key: goal.id, 
                className: `card goal-card ${goal.doneDates?.[viewDate] ? 'completed' : ''} ${!isToday ? 'locked-card' : ''}`,
                onClick: () => toggleGoal(goal.id) 
            },
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '15px', width: '100%' } },
                    React.createElement('div', { 
    className: 'custom-checkbox',
    style: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: goal.doneDates?.[viewDate] ? 'var(--primary)' : 'transparent',
        border: `2px solid ${goal.doneDates?.[viewDate] ? 'var(--primary)' : '#ccc'}`,
        borderRadius: '6px',
        color: 'white',
        fontSize: '14px',
        fontWeight: 'bold',
        transition: 'all 0.2s'
    }
}, goal.doneDates?.[viewDate] ? '✓' : ''),
                    React.createElement('div', { className: 'goal-icon-circle' }, goal.icon),
                    React.createElement('div', { className: 'goal-content' },
                        React.createElement('span', { className: 'goal-title' }, goal.title),
                        React.createElement('span', { className: 'goal-desc' }, 
                            goal.isRecurring ? '🔄 Active every day' : (goal.desc || 'No description')
                        )
                    ),
                    isToday && React.createElement('button', { 
                        className: 'delete-goal-btn', 
                        onClick: (e) => { e.stopPropagation(); deleteGoal(goal.id); } 
                    }, '🗑️')
                )
            ))
        ),

        // Add Button (Sirf aaj aur aage ki dates ke liye dikhega)
        viewDate >= todayIST && React.createElement('button', { 
            className: 'btn btn-primary', 
            style: {
                position: 'fixed', bottom: '25px', left: '50%', transform: 'translateX(-50%)',
                width: '90%', maxWidth: '400px', borderRadius: '15px', zIndex: '100',
                background: 'var(--secondary)', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)'
            },
            onClick: () => {
                setNewGoal({...newGoal, date: viewDate});
                setShowAddModal(true);
            }
        }, '+ Add Target for ' + viewDate.split('-').reverse().slice(0,2).join('/')),

        // Add Modal
        showAddModal && React.createElement('div', { className: 'modal' },
            React.createElement('div', { className: 'modal-content glass-modal' },
                React.createElement('button', { className: 'modal-close-x', onClick: () => setShowAddModal(false) }, '×'),
                React.createElement('h3', { className: 'custom-modal-header' }, 
                    React.createElement('span', { className: 'target-icon' }, '🎯'), ' Naya Target Set Karein'
                ),
                // Goal Name
                React.createElement('div', { className: 'input-group' },
                    React.createElement('label', null, 'Goal Name'),
                    React.createElement('input', { 
                        className: 'input-style', 
                        value: newGoal.title, 
                        onChange: e => setNewGoal({...newGoal, title: e.target.value}),
                        placeholder: 'Kya karna hai?' 
                    })
                ),
                // Description (Restored like Image 2)
                React.createElement('div', { className: 'input-group' },
                    React.createElement('label', null, 'Description'),
                    React.createElement('textarea', { 
                        className: 'input-style', 
                        style: { minHeight: '80px', resize: 'none' },
                        value: newGoal.desc, 
                        onChange: e => setNewGoal({...newGoal, desc: e.target.value}),
                        placeholder: 'Details...' 
                    })
                ),
                // Icon Selector (Restored like Image 2)
                React.createElement('div', { className: 'input-group' },
                    React.createElement('label', null, 'Choose Icon'),
                    React.createElement('select', { 
                        className: 'input-style',
                        value: newGoal.icon,
                        onChange: e => setNewGoal({...newGoal, icon: e.target.value})
                    }, 
                        ['📖', '🧪', '🧬', '📐', '📝', '🎯', '🔥', '💪'].map(emoji => 
                            React.createElement('option', { key: emoji, value: emoji }, emoji)
                        )
                    )
                ),
                // Active For Section
                React.createElement('div', { className: 'active-for-container' },
                    React.createElement('div', { className: 'active-for-row' },
                        React.createElement('span', { className: 'active-for-title' }, 'Active For'),
                        React.createElement('label', { className: 'habit-checkbox-wrapper' },
                            React.createElement('input', { 
                                type: 'checkbox', 
                                checked: newGoal.isRecurring,
                                onChange: (e) => setNewGoal({...newGoal, isRecurring: e.target.checked})
                            }),
                            React.createElement('span', { className: 'habit-checkbox-text' }, 'All months (default)')
                        )
                    ),
                    React.createElement('p', { className: 'habit-help-text' }, 
                        newGoal.isRecurring ? 'This habit will appear in all months' : `Appearing for ${viewDate.split('-').reverse().join('-')}`
                    )
                ),
                React.createElement('div', { className: 'modal-buttons' },
                    React.createElement('button', { className: 'btn btn-cancel', onClick: () => setShowAddModal(false) }, 'Cancel'),
                    React.createElement('button', { className: 'btn btn-save-target', onClick: addGoal }, 'Save Target')
                )
            )
        )
    );
};
        


const TestAnalysisView = () => {
        const [activeTab, setActiveTab] = useState('OVERALL');
        const lineRef = React.useRef(null);
        const pieRef = React.useRef(null);
        
        // Modal states with unique names to prevent logic overlap
        const [showEntryModal, setShowEntryModal] = useState(false);
        const [editingId, setEditingId] = useState(null);

        const isNEET = currentExam === 'NEET';
        const subjects = isNEET ? ['OVERALL', 'PHY', 'CHEM', 'BIO'] : ['OVERALL', 'PHY', 'CHEM', 'MATH'];

     const [ts, setTs] = useState({ 
            name: '', 
            phy: {c:'', i:'', u:''}, 
            chem: {c:'', i:'', u:''}, 
            bio: {c:'', i:'', u:''}, 
            math: {c:'', i:'', u:''} 
        });

        // Add Result Handler
        const handleOpenAdd = () => {
            setTs({ name: '', phy: {c:'',i:'',u:''}, chem: {c:'',i:'',u:''}, bio: {c:'',i:'',u:''}, math: {c:'',i:'',u:''} });
            setEditingId(null);
            setShowEntryModal(true);
        };

        // Edit Result Handler
        const handleOpenEdit = (test) => {
            setTs({...test});
            setEditingId(test.id);
            setShowEntryModal(true);
        };

        // Delete with Confirmation Logic
    const handleDelete = (id, name) => {
            setModalConfig({
                title: 'Confirm Delete',
                message: `Are you sure you want to delete "${name}"?`,
                onConfirm: () => {
                    const currentTests = data[currentExam]?.tests || [];
                    setData(p => ({ 
                        ...p, 
                        [currentExam]: {
                            ...p[currentExam],
                            tests: currentTests.filter(t => t.id !== id)
                        }
                    }));
                    setShowModal(false);
                    showToast("Test record deleted");
                }
            });
            setShowModal(true);
        };

        useEffect(() => {
            if (!lineRef.current) return;
            const ctx = lineRef.current.getContext('2d');
            const isSubView = activeTab !== 'OVERALL';
            let maxLimit = isNEET ? 720 : 300;
            if(isSubView) {
                if(isNEET) maxLimit = (activeTab === 'BIO' ? 360 : 180);
                else maxLimit = 100;
            }

            // NEET/JEE ke hisab se data filter karna
            const currentTests = data[currentExam]?.tests || [];
            const hasData = currentTests.length > 0;
            const labels = hasData ? currentTests.map(t => t.name) : ["-", "-", "-", "-", "-"];
            const points = hasData ? currentTests.map(t => {
                if(activeTab === 'OVERALL') return t.total || 0;
                const key = activeTab.toLowerCase();
                const sub = t[key] || {c:0, i:0};
                return (Number(sub.c) * 4) - Number(sub.i);
            }) : [0, 0, 0, 0, 0];

            const lineChart = new Chart(lineRef.current, {
                type: 'line',
                data: {
                    labels: labels,
                    datasets: [{
                        label: activeTab + ' Score',
                        data: points,
                        borderColor: hasData ? '#0F766E' : '#E7E5E4', 
                        borderWidth: 3, tension: 0.4, fill: true,
                        backgroundColor: hasData ? 'rgba(15, 118, 110, 0.1)' : 'rgba(231, 229, 228, 0.1)',
                        pointRadius: hasData ? 5 : 0
                    }]
                },
                options: { 
                    responsive: true, maintainAspectRatio: false,
                    scales: { y: { beginAtZero: true, max: maxLimit, grid: { color: '#f3f4f6' } } },
                    plugins: { legend: { display: false } }
                }
            });
            return () => lineChart.destroy();
        }, [data, activeTab, currentExam]);
        useEffect(() => {
            if (!pieRef.current) return;
            const subFilter = activeTab === 'OVERALL' ? null : 
                             (activeTab === 'BIO' ? 'BIO_MERGED' : 
                             (activeTab === 'PHY' ? 'Physics' : 
                             (activeTab === 'CHEM' ? 'Chemistry' : 'Mathematics')));
            
            const filteredMistakes = (data.mistakes || []).filter(m => {
                if (!subFilter) return true;
                if (subFilter === 'BIO_MERGED') return (m.sub === 'Botany' || m.sub === 'Zoology');
                return m.sub === subFilter;
            });
            
            const hasMistakes = filteredMistakes.length > 0;
            let chartData, chartLabels, chartColors;

            if (hasMistakes) {
                const counts = {};
                filteredMistakes.forEach(m => counts[m.type] = (counts[m.type] || 0) + 1);
                chartLabels = Object.keys(counts);
                chartData = Object.values(counts);
                chartColors = ['#0F766E', '#14B8A6', '#F59E0B', '#EF4444', '#6366F1'];
            } else {
                // Khali state mein professional grey ring
                chartLabels = ["No Mistakes"];
                chartData = [1];
                chartColors = ['#F5F5F4'];
            }
            
            const pieChart = new Chart(pieRef.current, {
                type: 'doughnut',
                data: { 
                    labels: chartLabels, 
                    datasets: [{ data: chartData, backgroundColor: chartColors, borderWidth: 0 }] 
                },
                options: { 
                    cutout: '75%', 
                    plugins: { 
                        legend: { display: hasMistakes, position: 'bottom' },
                        tooltip: { enabled: hasMistakes }
                    } 
                }
            });
            return () => pieChart.destroy();
        }, [data.mistakes, activeTab]);

        return React.createElement('div', { className: 'container' },
            // --- BREADCRUMB NAVIGATION ADDED ---
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, 'Test Analysis')
            ),

            React.createElement('div', { className: 'analysis-header' },
                React.createElement('h2', { className: 'logo', style:{fontSize:'2rem'} }, 'Test Analysis'),
                React.createElement('div', { className: 'tab-modern-container' },
                    subjects.map((s, idx) => React.createElement(React.Fragment, { key: s },
                        React.createElement('span', { className: `tab-modern ${activeTab === s ? 'active' : ''}`, onClick: () => setActiveTab(s) }, s),
                        idx < subjects.length - 1 && React.createElement('span', { className: 'tab-sep' }, '/')
                    ))
                )
            ),
            React.createElement('div', { className: 'analysis-main-grid' },
                React.createElement('div', { className: 'chart-main-card' }, React.createElement('canvas', { ref: lineRef })),
                React.createElement('div', { className: 'mistake-stats-card' },
                    React.createElement('h3', {style:{fontSize:'1rem'}}, `${activeTab} Mistake Breakdown`),
                    React.createElement('canvas', { ref: pieRef })
                )
            ),
            
            // --- TEST HISTORY SECTION WITH EDIT/DELETE ---
React.createElement('div', { className: 'test-history-card' },
                React.createElement('h3', {style:{marginBottom:'15px'}}, `${currentExam} History`),
                (!data[currentExam]?.tests || data[currentExam].tests.length === 0) ? React.createElement('p', null, 'No history found.') :
                data[currentExam].tests.slice().reverse().map(t => React.createElement('div', { key: t.id, className: 'test-list-item' },
                    React.createElement('div', null, 
                        React.createElement('div', {style:{fontWeight:'700'}}, t.name), 
                        React.createElement('div', {style:{fontSize:'0.8rem', color:'#666'}}, `Total Score: ${t.total}`)
                    ),
                    React.createElement('div', { className: 'test-actions' },
                        React.createElement('button', { className: 'action-icon-btn btn-edit', onClick: () => handleOpenEdit(t) }, '✏️'),
                        React.createElement('button', { className: 'action-icon-btn btn-delete', onClick: () => handleDelete(t.id, t.name) }, '🗑️')
                    )
                ))
            ),                

            React.createElement('div', { className: 'analysis-footer-actions' },
                React.createElement('button', { className: 'btn-action primary', onClick: handleOpenAdd }, '➕ Add New Result'),
                React.createElement('button', { className: 'btn-action secondary', onClick: () => setView('error-book') }, '📖 Open Error Book')
            ),

            // --- ENTRY/EDIT MODAL ---
            showEntryModal && React.createElement('div', { className: 'modal' },
                React.createElement('div', { className: 'modal-content modern-modal' },
                    React.createElement('button', { className: 'modal-close-x', onClick: () => setShowEntryModal(false) }, '×'),
                    React.createElement('h3', {style:{marginBottom:'20px'}}, editingId ? 'Edit Test Result' : 'Record New Test'),
                    React.createElement('input', { 
                        className: 'modern-input', 
                        value: ts.name,
                        placeholder: 'Test Name (e.g. NEET Mock 01)', 
                        style:{width:'100%', padding:'12px', borderRadius:'10px', border:'1.5px solid #e5e7eb', marginBottom:'20px'}, 
                        onChange: e => setTs({...ts, name: e.target.value}) 
                    }),
                    
                    (isNEET ? ['phy', 'chem', 'bio'] : ['phy', 'chem', 'math']).map(k => {
                        const maxQ = (isNEET && k === 'bio') ? 90 : (isNEET ? 45 : 25);
                        const currentTotal = Number(ts[k].c) + Number(ts[k].i) + Number(ts[k].u);
                        return React.createElement('div', { key: k, className: 'score-row' },
                            React.createElement('div', {style:{display:'flex', justifyContent:'space-between', alignItems:'center'}}, 
                                React.createElement('label', {style:{fontWeight:'800', fontSize:'0.9rem'}}, 
                                    k === 'bio' ? 'BIOLOGY (90 Qs)' : `${k.toUpperCase()} (${isNEET ? '45' : '25'} Qs)`
                                ),
                                React.createElement('span', {className: `validation-msg ${currentTotal !== maxQ ? 'v-error' : 'v-success'}`}, `${currentTotal}/${maxQ} Entered`)
                            ),
                           
                            React.createElement('div', { className: 'input-pair' },
                                React.createElement('input', { type: 'number', value: ts[k].c, placeholder: 'Correct', onChange: e => { let n = {...ts}; n[k].c = parseInt(e.target.value)||0; setTs(n); } }),
                                React.createElement('input', { type: 'number', value: ts[k].i, placeholder: 'Wrong', onChange: e => { let n = {...ts}; n[k].i = parseInt(e.target.value)||0; setTs(n); } }),
                                React.createElement('input', { type: 'number', value: ts[k].u, placeholder: 'Skipped', onChange: e => { let n = {...ts}; n[k].u = parseInt(e.target.value)||0; setTs(n); } })
                            )
                        );
                    }),

                    React.createElement('button', { 
                        className: 'btn-save', 
                        style: {width:'100%', background:'#0F766E', color:'white', border:'none', padding:'15px', borderRadius:'12px', fontWeight:'800', marginTop:'20px', cursor:'pointer'},
                     onClick: () => {
                            if(!ts.name) return alert('Enter Test Name!');
                            const keys = isNEET ? ['phy', 'chem', 'bio'] : ['phy', 'chem', 'math'];
                            
                            // Check logic: Blank ko Number 0 banayenge
                            for(let k of keys) {
                                const target = (isNEET && k === 'bio') ? 90 : (isNEET ? 45 : 25);
                                const current = Number(ts[k].c) + Number(ts[k].i) + Number(ts[k].u);
                                const diff = Math.abs(target - current);
                                const subName = k === 'bio' ? 'BIOLOGY' : k.toUpperCase();

                                if(current !== target) {
                                    const message = current < target 
                                        ? `⚠️ ${subName} mein abhi ${diff} sawal kam hain!\n\nTarget: ${target}\nFilled: ${current}\n\nKripya ${diff} sawal aur add karein (Correct, Wrong ya Skip mein).`
                                        : `⚠️ ${subName} mein aapne ${diff} sawal zyada bhar diye hain!\n\nTarget: ${target}\nFilled: ${current}\n\nKripya ${diff} sawal kam karein.`;
                                    
                                    return alert(message);
                                }
                            }

                            const calc = (k) => (Number(ts[k].c) * 4) - Number(ts[k].i);
                            const totalScore = keys.reduce((sum, k) => sum + calc(k), 0);
                            
                            const currentTests = data[currentExam]?.tests || [];
                            if(editingId) {
                                const updated = currentTests.map(t => t.id === editingId ? {...ts, total: totalScore, id: editingId} : t);
                                setData(p => ({ ...p, [currentExam]: { ...p[currentExam], tests: updated } }));
                                showToast("Changes saved!");
                            } else {
                                const newTests = [...currentTests, {...ts, total: totalScore, id: Date.now()}];
                                setData(p => ({ ...p, [currentExam]: { ...p[currentExam], tests: newTests } }));
                                showToast("Test result added!");
                            }
                            setShowEntryModal(false);
                        }
                    }, editingId ? 'Update & Recalculate' : 'Save & Calculate Score')
                )
            )
        );
    };
    // --- UPDATED STOPWATCH VIEW (With Midnight Auto-Split & Graph Fixes) ---
const StopwatchView = () => {
    // Current state track karne ke liye
    const [now, setNow] = useState(Date.now());
    const [graphMode, setGraphMode] = useState('WEEK'); // 'WEEK' or 'MONTH'
    const [graphOffset, setGraphOffset] = useState(0);
    const [isFocusMode, setIsFocusMode] = useState(false);
    const chartRef = React.useRef(null);
    
    // Last save time track karne ke liye ref (re-render se bachne ke liye)
    const lastAutoSaveRef = React.useRef(Date.now());
    
    // Current Date String helper (IST)
    const getTodayStr = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    
    // Session Date track karne ke liye (taaki pata chale midnight kab cross hua)
    const sessionDateRef = React.useRef(getTodayStr());

    // Database values
    const { isRunning = false, startTime = null, elapsed = 0, laps = [] } = data.timerState || {};

    // 1. TIMER & AUTO-SAVE LOGIC
    useEffect(() => {
        let interval = null;
        if (isRunning) {
            interval = setInterval(() => {
                const currentTime = Date.now();
                setNow(currentTime);

                const currentStr = getTodayStr();

                // --- A. MIDNIGHT AUTO-SPLIT LOGIC ---
                // Agar date badal gayi (matlab 12 baj gaye)
                if (currentStr !== sessionDateRef.current) {
                    const prevDate = sessionDateRef.current;
                    
                    // 1. Pichle din ka hisaab calculate karein
                    // (Abhi tak ka total elapsed + start time se midnight tak ka diff)
                    // Note: Simplification ke liye hum current session ko 'Yesterday' me daal kar 
                    // timer ko 0 se 'Today' ke liye start kar denge.
                    
                    const sessionSecs = Math.floor((currentTime - startTime) / 1000);
                    const totalForPrevDay = elapsed + sessionSecs;

                    // 2. Data update karein (Yesterday save + New Start for Today)
                    setData(prev => ({
                        ...prev,
                        studyHistory: {
                            ...prev.studyHistory,
                            [prevDate]: (prev.studyHistory?.[prevDate] || 0) + totalForPrevDay
                        },
                        timerState: {
                            ...prev.timerState,
                            startTime: currentTime, // Naya start time abhi se
                            elapsed: 0,            // Pichla elapsed zero kar diya (kyunki wo kal save ho gaya)
                            laps: [`🌙 Midnight Reset`, ...prev.timerState.laps]
                        }
                    }));

                    // 3. References update
                    sessionDateRef.current = currentStr;
                    lastAutoSaveRef.current = currentTime;
                    showToast("Midnight! 🌙 New Day Started.");
                }

                // --- B. 3-MINUTE AUTO-SAVE LOGIC ---
                // Har 3 minute (180,000 ms) mein graph update karein
                if (currentTime - lastAutoSaveRef.current > 180000) {
                    const sessionSecs = Math.floor((currentTime - startTime) / 1000);
                    const totalCurrent = elapsed + sessionSecs;
                    
                    // Sirf history update karein, timer state reset nahi karenge
                    setData(prev => ({
                        ...prev,
                        studyHistory: {
                            ...prev.studyHistory,
                            [currentStr]: (prev.studyHistory?.[currentStr] || 0) + totalCurrent
                        }
                    }));
                    
                    // Note: Hum timerState reset nahi kar rahe, bas history me add kar rahe hain
                    // taaki graph real-time dikhe. Agli baar save karte waqt overlapping handle karna padega
                    // Isliye "Minimal Edit" approach me:
                    // Hum temporary save kar rahe hain. Perfect consistency ke liye
                    // hume 'elapsed' ko commit karke startTime reset karna chahiye silently.
                    
                    // Silent Commit Approach:
                    setData(prev => ({
                        ...prev,
                        studyHistory: {
                            ...prev.studyHistory,
                            [currentStr]: (prev.studyHistory?.[currentStr] || 0) + sessionSecs // Sirf naya session add karo history me
                        },
                        timerState: {
                            ...prev.timerState,
                            startTime: currentTime, // Start time abhi kar do
                            elapsed: elapsed + sessionSecs // Elapsed bada do
                        }
                    }));
                    
                    lastAutoSaveRef.current = currentTime;
                }

            }, 1000); // Check every second
        }
        return () => clearInterval(interval);
    }, [isRunning, startTime, elapsed]);

    // 2. GRAPH LOGIC (Same as before)
    useEffect(() => {
        if (!chartRef.current || typeof Chart === 'undefined') return;
        const history = data.studyHistory || {};
        const labels = [], dataPoints = [];
        const today = new Date();
        
        if (graphMode === 'WEEK') {
            const currentDay = today.getDay(); // 0 (Sun) to 6 (Sat)
            // Calculate start of week (Sunday) based on offset
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - currentDay + (graphOffset * 7));
            
            for (let i = 0; i < 7; i++) {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + i);
                const dateStr = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
                labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
                // Hours me convert kiya
                dataPoints.push(((history[dateStr] || 0) / 3600).toFixed(2)); 
            }
        } else {
             // MONTH logic
             const targetMonth = new Date(today.getFullYear(), today.getMonth() + graphOffset, 1);
             const daysInMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
             for(let i=1; i<=daysInMonth; i++) {
                 const d = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), i);
                 const dateStr = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
                 labels.push(i);
                 dataPoints.push(((history[dateStr] || 0) / 3600).toFixed(2));
             }
        }

        // Destroy old chart if exists (Chart.js quirk handling)
        const chartInstance = Chart.getChart(chartRef.current);
        if (chartInstance) chartInstance.destroy();

        const chart = new Chart(chartRef.current, {
            type: 'bar',
            data: { 
                labels, 
                datasets: [{ 
                    label: 'Hours', 
                    data: dataPoints, 
                    backgroundColor: '#3b82f6', 
                    borderRadius: 4,
                    barPercentage: 0.6
                }] 
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                scales: { 
                    y: { beginAtZero: true, grid: { color: '#333' }, ticks: { color: '#888' } }, 
                    x: { grid: { display: false }, ticks: { color: '#888' } } 
                }, 
                plugins: { legend: { display: false } } 
            }
        });
        return () => { if(chart) chart.destroy(); };
    }, [data.studyHistory, graphMode, graphOffset, isRunning]); // Graph updates when studyHistory updates

    // Calculation for Display
    const totalSeconds = elapsed + (isRunning && startTime ? Math.floor((now - startTime) / 1000) : 0);
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');

    // Handlers
    const handleStop = () => {
        if (!isRunning) return;
        const sessionSecs = Math.floor((Date.now() - startTime) / 1000);
        const dateStr = getTodayStr();
        
        // Pause par turant save
        setData(p => ({ 
            ...p, 
            studyHistory: { ...p.studyHistory, [dateStr]: (p.studyHistory?.[dateStr] || 0) + sessionSecs }, 
            timerState: { ...p.timerState, isRunning: false, startTime: null, elapsed: elapsed + sessionSecs } 
        }));
    };

    const handleStart = () => {
        // Start karte waqt session date set karein taaki midnight detect ho sake
        sessionDateRef.current = getTodayStr();
        setData(p => ({ ...p, timerState: { ...p.timerState, isRunning: true, startTime: Date.now() } }));
    };
    
    const handleReset = () => { 
        setModalConfig({
            title: 'Reset Timer?',
            message: 'Timer will go to 00:00:00. Session saved.',
            onConfirm: () => {
                if(isRunning) handleStop();
                setData(p => ({ ...p, timerState: { isRunning: false, startTime: null, elapsed: 0, laps: [] } }));
                setShowModal(false);
            }
        });
        setShowModal(true);
    };

    const handleLap = () => setData(p => ({ ...p, timerState: { ...p.timerState, laps: [`${h}:${m}:${s}`, ...p.timerState.laps] } }));

    // Fullscreen Toggles
    const toggleFullScreen = () => {
        if (!document.fullscreenElement) {
            document.documentElement.requestFullscreen().catch(e => console.log(e));
            setIsFocusMode(true);
        } else {
            if (document.exitFullscreen) document.exitFullscreen();
            setIsFocusMode(false);
        }
    };
    
    useEffect(() => {
        const handleEsc = () => { if (!document.fullscreenElement) setIsFocusMode(false); };
        document.addEventListener('fullscreenchange', handleEsc);
        return () => document.removeEventListener('fullscreenchange', handleEsc);
    }, []);

    // --- CSS INJECTION FOR ARROW FIX ---
    // (Aap chahein to isse styles.css me daal sakte hain, par yahan bhi kaam karega)
    const arrowStyles = {
        chartControls: {
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            gap: '15px',
            marginBottom: '15px'
        },
        navBtn: {
            background: '#333',
            color: '#fff',
            border: 'none',
            width: '32px',
            height: '32px',
            borderRadius: '50%',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            fontSize: '1.2rem',
            paddingBottom: '3px' // Visual center fix
        }
    };

    return React.createElement('div', { className: `stopwatch-page ${isFocusMode ? 'fullscreen-mode' : ''}` },
        // Top Bar
        !isFocusMode && React.createElement('div', { style: { padding: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1000px', margin: '0 auto' } },
            React.createElement('button', { onClick: () => setView('home'), style: { background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' } }, '← Back'),
            React.createElement('button', { onClick: toggleFullScreen, style: { background: 'none', border: 'none', color: '#fff', fontSize: '1.5rem', cursor: 'pointer' } }, '⛶')
        ),
        
        isFocusMode && React.createElement('button', { 
            onClick: toggleFullScreen, 
            style: { position: 'absolute', top: '20px', right: '30px', background: 'none', border: 'none', color: '#444', fontSize: '1.5rem', cursor: 'pointer', zIndex: 100 } 
        }, '⛶'),

        React.createElement('div', { className: 'stopwatch-container' },
            // CLOCK
            React.createElement('div', { className: 'flip-clock' }, 
                React.createElement(AnimatedCard, { digit: h }), React.createElement(StaticCard, null), 
                React.createElement(AnimatedCard, { digit: m }), React.createElement(StaticCard, null), 
                React.createElement(AnimatedCard, { digit: s })
            ),
            
            // CONTROLS
            React.createElement('div', { className: 'stopwatch-controls' },
                !isRunning 
                    ? React.createElement('button', { className: 'btn-circle btn-start', onClick: handleStart }, 'Start') 
                    : React.createElement('button', { className: 'btn-circle btn-stop', onClick: handleStop }, 'Pause'),
                React.createElement('button', { className: 'btn-circle btn-reset', onClick: handleReset }, 'Reset'),
                (isRunning || elapsed > 0) && React.createElement('button', { className: 'btn-circle btn-lap', onClick: handleLap }, 'Lap')
            ),

            // LAPS AND GRAPH
            !isFocusMode && React.createElement('div', { className: 'grid-dark' },
                // Laps
                React.createElement('div', { className: 'stats-container' }, 
                    React.createElement('h3', { style: { color: '#888', borderBottom: '1px solid #333', paddingBottom: '10px' } }, 'Session Laps'), 
                    React.createElement('div', { className: 'lap-list' }, 
                        laps.length === 0 ? React.createElement('div', {style:{color:'#444', textAlign:'center', marginTop:'20px'}}, 'No laps yet') :
                        laps.map((l, i) => React.createElement('div', { key: i, className: 'lap-item' }, React.createElement('span', null, `#${laps.length - i}`), React.createElement('span', {style:{color:'#fff'}}, l)))
                    )
                ),
                // Graph with FIXED ARROWS
                React.createElement('div', { className: 'stats-container' },
                    React.createElement('div', { style: arrowStyles.chartControls },
                        React.createElement('button', { style: arrowStyles.navBtn, onClick: () => setGraphOffset(graphOffset - 1) }, '‹'),
                        React.createElement('div', null, 
                            React.createElement('button', { className: `chart-filter-btn ${graphMode === 'WEEK'?'active':''}`, onClick: () => {setGraphMode('WEEK'); setGraphOffset(0)} }, 'W'), 
                            React.createElement('button', { className: `chart-filter-btn ${graphMode === 'MONTH'?'active':''}`, onClick: () => {setGraphMode('MONTH'); setGraphOffset(0)} }, 'M')
                        ),
                        React.createElement('button', { style: arrowStyles.navBtn, onClick: () => setGraphOffset(graphOffset + 1) }, '›')
                    ),
                    React.createElement('div', { style: { height: '220px' } }, React.createElement('canvas', { ref: chartRef }))
                )
            )
        )
    );
};
    const ErrorBookView = () => {
        const [f, setF] = useState({ tid: '', sub: 'Physics', search: '' });
        const [showAdd, setShowAdd] = useState(false);
        const [m, setM] = useState({ type: 'Silly Mistake', img1: '', img2: '', myMistake: '', correctLogic: '' });
        const [isUploading, setIsUploading] = useState(false);
        const [fileTargets, setFileTargets] = useState({ q: null, s: null });

        const uploadToCloudinary = async (file) => {
            const formData = new FormData();
            formData.append('file', file);
            formData.append('upload_preset', UPLOAD_PRESET);
            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData
            });
            const data = await res.json();
            return data.secure_url;
        };
        const filtered = (data.mistakes || []).filter(x => {
            const matchTest = f.tid ? x.tid == f.tid : true;
            const matchSub = x.sub == f.sub;
            const matchSearch = x.myMistake ? x.myMistake.toLowerCase().includes(f.search.toLowerCase()) : true;
            return matchTest && matchSub && matchSearch;
        });
        const toggleMastery = (id) => {
            setData(p => ({ ...p, mistakes: p.mistakes.map(x => x.id === id ? {...x, mastered: !x.mastered} : x) }));
            showToast('Status updated!');
        };
        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('test-analysis') }, 'Test Analysis'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, 'Error Book')
            ),
            React.createElement('input', { className: 'search-bar', placeholder: '🔍 Search mistakes...', onChange: e => setF({...f, search: e.target.value}) }),
            React.createElement('div', { style: {display:'flex', gap:'10px', marginBottom: '15px'} },
                React.createElement('select', { 
                    className: 'chart-tab', 
                    style:{padding:'10px', borderRadius:'10px'}, 
                    onChange: e => setF({...f, tid: e.target.value}) 
                }, 
                    React.createElement('option', {value:''}, 'All Tests'), 
                    (data[currentExam]?.tests || []).map(t => React.createElement('option', { key: t.id, value: t.id }, t.name))
                ),
                React.createElement('select', { className: 'chart-tab', style:{padding:'10px', borderRadius:'10px'}, onChange: e => setF({...f, sub: e.target.value}) }, ['Physics', 'Chemistry', 'Botany', 'Zoology', 'Mathematics'].map(s => React.createElement('option', { key: s }, s)))
            ),
            React.createElement('button', { className: 'btn btn-primary', style: {width:'100%', marginBottom: '20px'}, onClick: () => setShowAdd(true) }, '+ Add New Mistake'),
filtered.length === 0 ? React.createElement('p', {style:{textAlign:'center', padding:'2rem'}}, 'No mistakes found.') : 
            filtered.map(x => React.createElement('div', { key: x.id, className: `mistake-card level-${x.type.toLowerCase().replace(' ', '-')} ${x.mastered ? 'mastered' : ''}` },
                React.createElement('div', { style:{display:'flex', justifyContent:'space-between'} }, 
                    React.createElement('div', { className: 'type-tag', style: {background:'#333', color:'white', padding:'4px 10px', borderRadius:'5px', fontSize:'0.7rem'} }, x.type), 
                    React.createElement('button', { onClick: () => setData(p => ({...p, mistakes: p.mistakes.filter(y => y.id !== x.id)})), style:{border:'none', background:'none', cursor:'pointer'} }, '🗑️')
                ),
                (x.img1 || x.img2) && React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', margin: '10px 0' } },
                    x.img1 && React.createElement('img', { 
                        src: x.img1, 
                        onClick: () => window.open(x.img1, '_blank'),
                        style: { width: '100%', maxHeight: '350px', objectFit: 'contain', borderRadius: '10px', cursor: 'zoom-in', border: '1px solid #eee', background: '#f8fafc' } 
                    }),
                    x.img2 && React.createElement('img', { 
                        src: x.img2, 
                        onClick: () => window.open(x.img2, '_blank'),
                        style: { width: '100%', maxHeight: '350px', objectFit: 'contain', borderRadius: '10px', cursor: 'zoom-in', border: '1px solid #eee', background: '#f8fafc' } 
                    })
                ),
                React.createElement('div', { className: 'mistake-grid' },
                    React.createElement('div', { className: 'mistake-box box-wrong' }, React.createElement('strong', null, 'Mistake: '), x.myMistake),
                    React.createElement('div', { className: 'mistake-box box-right' }, React.createElement('strong', null, 'Correct Logic: '), x.correctLogic)
                ),
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', marginTop: '15px', gap: '10px' } },
                    React.createElement('button', { 
                        className: 'mastered-btn', 
                        style: { background: x.mastered ? '#9ca3af' : '#10b981', color: 'white', border: 'none', padding: '8px 18px', borderRadius: '10px', cursor: 'pointer', fontWeight: '700' }, 
                        onClick: () => toggleMastery(x.id) 
                    }, x.mastered ? '🔙 Revision Needed' : '✅ Concept Clear')
                )
            )),
            showAdd && React.createElement('div', { className: 'modal' },
                React.createElement('div', { className: 'modal-content modern-modal', style: { padding: '2rem', maxWidth: '500px' } },
                    React.createElement('button', { className: 'modal-close-x', onClick: () => setShowAdd(false) }, '×'),
                    React.createElement('h3', { style: { marginBottom: '1.5rem', fontSize: '1.5rem', color: 'var(--primary)' } }, '📝 Record Mistake'),
                    
                    React.createElement('div', { style: { display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '10px', marginBottom: '1rem' } },
                        React.createElement('div', null,
                            React.createElement('label', { style: { fontSize: '0.8rem', fontWeight: '700' } }, 'Select Test'),
                            React.createElement('select', { 
                                className: 'input-style', 
                                style: { width: '100%' },
                                value: f.tid,
                                onChange: e => setF({...f, tid: e.target.value})
                            }, 
                                React.createElement('option', { value: '' }, 'Choose Test'),
                                (data[currentExam]?.tests || []).map(t => React.createElement('option', { key: t.id, value: t.id }, t.name))
                            )
                        ),
                        React.createElement('div', null,
                            React.createElement('label', { style: { fontSize: '0.8rem', fontWeight: '700' } }, 'Subject'),
                            React.createElement('select', { 
                                className: 'input-style', 
                                style: { width: '100%' },
                                value: f.sub,
                                onChange: e => setF({...f, sub: e.target.value})
                            }, 
                                (currentExam === 'NEET' ? ['Physics', 'Chemistry', 'Botany', 'Zoology'] : ['Physics', 'Chemistry', 'Mathematics']).map(s => React.createElement('option', { key: s, value: s }, s))
                            )
                        )
                    ),

                    React.createElement('div', { style: { marginBottom: '1rem' } },
                        React.createElement('label', { style: { fontSize: '0.8rem', fontWeight: '700' } }, 'Mistake Type'),
                        React.createElement('select', { 
                            className: 'input-style', 
                            style: { width: '100%' }, 
                            onChange: e => setM({...m, type: e.target.value}) 
                        }, ['Conceptual Error', 'Silly Mistake', 'Calculation Mistake', 'Never Studied', 'Blunder'].map(t => React.createElement('option', { key: t }, t)))
                    ),

                    React.createElement('div', { style: { background: '#f8fafc', padding: '10px', borderRadius: '12px', marginBottom: '1rem', border: '1px solid #e2e8f0' } },
                        React.createElement('p', { style: { fontSize: '0.75rem', color: '#64748b', marginBottom: '8px', fontWeight: '700' } }, '📸 Photos (Optional)'),
                        React.createElement('div', { style: { display: 'flex', gap: '10px' } },
                            React.createElement('div', { style: { flex: 1 } },
                                React.createElement('span', { style: { fontSize: '0.65rem', display: 'block' } }, 'Question'),
                                React.createElement('input', { type: 'file', accept: 'image/*', style: { fontSize: '0.7rem', width: '100%' }, onChange: e => setFileTargets(prev => ({ ...prev, q: e.target.files[0] })) })
                            ),
                            React.createElement('div', { style: { flex: 1 } },
                                React.createElement('span', { style: { fontSize: '0.65rem', display: 'block' } }, 'Solution'),
                                React.createElement('input', { type: 'file', accept: 'image/*', style: { fontSize: '0.7rem', width: '100%' }, onChange: e => setFileTargets(prev => ({ ...prev, s: e.target.files[0] })) })
                            )
                        )
                    ),

                    React.createElement('textarea', { className: 'input-style', style:{width:'100%', height:'70px', marginBottom:'10px'}, placeholder: 'Explain your mistake...', onChange: e => setM({...m, myMistake: e.target.value}) }),
                    React.createElement('textarea', { className: 'input-style', style:{width:'100%', height:'70px', marginBottom:'10px'}, placeholder: 'Correct logic/formula...', onChange: e => setM({...m, correctLogic: e.target.value}) }),
                    
                    React.createElement('button', { 
                        className: 'btn btn-primary', 
                        disabled: isUploading,
                        style: { width: '100%', height: '50px' },
                        onClick: async () => {
                            if (!f.tid) return alert('⚠️ Error: Pehle Test select karein!');
                            if (!m.myMistake || !m.correctLogic) return alert('⚠️ Error: Details bhariye!');

                            setIsUploading(true);
                            let qUrl = ""; 
                            let sUrl = "";
                            
                            try {
                                showToast((fileTargets.q || fileTargets.s) ? 'Hard Compressing & Uploading...' : 'Saving...');
                                
                                // Question Image Compression & Upload
                                if (fileTargets.q) {
                                    const compressedQ = await compressImage(fileTargets.q);
                                    qUrl = await uploadToCloudinary(compressedQ);
                                }
                                
                                // Solution Image Compression & Upload
                                if (fileTargets.s) {
                                    const compressedS = await compressImage(fileTargets.s);
                                    sUrl = await uploadToCloudinary(compressedS);
                                }

                                const currentMistakes = data.mistakes || [];
                                const finalMistake = { 
                                    ...m, 
                                    ...f, 
                                    img1: qUrl, 
                                    img2: sUrl, 
                                    mastered: false, 
                                    id: Date.now() 
                                };

                                setData(p => ({ 
                                    ...p, 
                                    mistakes: [...currentMistakes, finalMistake] 
                                }));

                                setShowAdd(false);
                                setFileTargets({ q: null, s: null });
                                setM({ type: 'Silly Mistake', img1: '', img2: '', myMistake: '', correctLogic: '' });
                                showToast('Mistake Saved (Hard Compressed)!');
                            } catch (err) {
                                console.error(err);
                                alert('Error: Upload Failed! Internet ya Cloudinary check karein.');
                            } finally {
                                setIsUploading(false);
                            }
                        }
                    }, isUploading ? '⏳ Uploading...' : '✓ Save Mistake')
                )
            )
        );
    };
    // Agar data fetch nahi hua, toh kuch render mat karo (Splash screen chalti rahegi)
    if (!isFetched) return null;
   return React.createElement(React.Fragment, null,
        // --- 1. SMART FLOATING REVISION BUTTON (Disappears when all clear) ---
        (data.mistakes || []).some(m => !m.mastered) && React.createElement('button', { 
            className: 'floating-rev-btn', 
            onClick: triggerRevision, 
            title: 'Quick Revision' 
        }, '💡'),

        // --- 2. MAIN VIEWS ---
        view === 'exam-select' && React.createElement(ExamSelectView),
        view === 'home' && React.createElement(HomePage),
        view === 'subjects' && React.createElement(SubjectsView),
        view === 'chapters' && React.createElement(ChaptersView),
        view === 'detail' && React.createElement(DetailView),
        view === 'dashboard' && React.createElement(DashboardView),
        view === 'daily-goals' && React.createElement(DailyGoalsView),
        view === 'test-analysis' && React.createElement(TestAnalysisView),
        view === 'stopwatch' && React.createElement(StopwatchView),
        view === 'error-book' && React.createElement(ErrorBookView),

        // --- 3. GLOBAL MODAL (Reset Chapter, Delete, etc.) WITH 'X' ---
        showModal && React.createElement('div', { className: 'modal', onClick: () => setShowModal(false) },
            React.createElement('div', { className: 'modal-content modern-modal', onClick: (e) => e.stopPropagation() },
                React.createElement('button', { className: 'modal-close-x', onClick: () => setShowModal(false) }, '×'),
                React.createElement('h3', { className: 'modal-title' }, modalConfig.title),
                React.createElement('p', { style: { marginBottom: '1.5rem', color: '#57534E' } }, modalConfig.message),
                React.createElement('div', { className: 'modal-buttons' },
                    React.createElement('button', { className: 'btn btn-secondary', onClick: () => setShowModal(false), style: { flex: 1 } }, '✕ Close'),
                    React.createElement('button', { className: 'btn btn-danger', onClick: () => { if (modalConfig.onConfirm) modalConfig.onConfirm(); }, style: { flex: 1 } }, '✓ Confirm')
                )
            )
        ),

        // --- 4. TOAST NOTIFICATIONS ---
        toast.show && React.createElement('div', { className: 'toast' }, toast.message),

  // --- 5. ENHANCED REVISION NOTIFICATION (The Popup) ---
        notifShow && activeNotif && React.createElement('div', { className: 'error-notification show', onClick: () => { setNotifShow(false); setView('error-book'); } },
            React.createElement('div', { className: 'notif-header' }, 
                React.createElement('span', null, '💡 QUICK REVISION FLASHCARD'), 
                React.createElement('span', { className: 'notif-close', onClick: e => { e.stopPropagation(); setNotifShow(false); } }, '×')
            ),
            React.createElement('div', { 
                style:{
                    fontSize:'0.95rem', 
                    fontWeight:'800', 
                    color:'#b91c1c', 
                    marginBottom:'10px',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere'
                } 
            }, 
                `Galti: "${activeNotif.myMistake}"`
            ),
            React.createElement('div', { 
                style:{
                    fontSize:'0.9rem', 
                    color:'#15803d', 
                    background:'#f0fdf4', 
                    padding:'12px', 
                    borderRadius:'12px', 
                    border:'1.5px solid #dcfce7',
                    fontWeight: '600',
                    lineHeight: '1.4',
                    wordBreak: 'break-word',
                    overflowWrap: 'anywhere'
                } 
            }, 
                `Sahi Concept: ${activeNotif.correctLogic}`
            ),
            React.createElement('p', { style:{fontSize:'0.7rem', color:'#9ca3af', marginTop:'8px', textAlign:'right'} }, 'Tap to open Error Book →')
        )
    );
};

ReactDOM.render(React.createElement(App), document.getElementById('root'));
