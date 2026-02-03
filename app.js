
const { useState, useEffect } = React;

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

const App = () => {
    const [currentExam, setCurrentExam] = useState(() => {
        const saved = localStorage.getItem('currentExam');
        return saved || null;
    });
    const [view, setView] = useState(() => {
        return currentExam ? 'home' : 'exam-select';
    });
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [data, setData] = useState(() => {
        // 1. Browser ki memory (LocalStorage) se purana data uthana
        const saved = localStorage.getItem('syllabusData');
        
        // 2. Ek 'Default Structure' banana jisme NEET, JEE aur naya DailyGoals ho
        const defaultData = { 
            NEET: {}, 
            JEE: {}, 
            dailyGoals: [] // Yeh naya section hai jo goals store karega
        };

        if (saved) {
            // Agar pehle se koi data hai (JSON format mein), toh use Object mein badlo
            const parsedData = JSON.parse(saved);
            
            // Sabse Important: Purane data (NEET/JEE) ko rakho aur naya 'dailyGoals' usme merge kar do
            // Agar user ne pehle se goals save kiye hain, toh parsedData.dailyGoals use hoga
            return { 
                ...defaultData, 
                ...parsedData,
                dailyGoals: parsedData.dailyGoals || [] 
            };
        } else {
            // Agar naya user hai, toh khali default structure bhej do
            return defaultData;
        }
    });
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [toast, setToast] = useState({ show: false, message: '' });
    const [refreshTrigger, setRefreshTrigger] = useState(0);

    useEffect(() => {
        localStorage.setItem('syllabusData', JSON.stringify(data));
    }, [data]);

    useEffect(() => {
        localStorage.setItem('currentExam', currentExam || '');
    }, [currentExam]);

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const changeExam = () => {
        setCurrentExam(null);
        setView('exam-select');
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
            setRefreshTrigger(prev => prev + 1);
        }
    });
    setShowModal(true);
};

    const addCustomChapter = (className, subject, chapterName) => {
        if (!EXAM_SYLLABUS[currentExam][className][subject].includes(chapterName)) {
            EXAM_SYLLABUS[currentExam][className][subject].push(chapterName);
            showToast(`Added: ${chapterName}`);
        }
        setRefreshTrigger(prev => prev + 1);
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
                React.createElement('h1', { className: 'logo' }, 'Exam Tracker'),
                React.createElement('p', { className: 'tagline' }, 'Choose Your Path to Success')
            ),
            React.createElement('div', { className: 'grid grid-2' },
                React.createElement('div', {
                    className: 'card exam-card',
                    onClick: () => {
                        setCurrentExam('NEET');
                        setView('home');
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
                        setView('home');
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
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, 'Home')
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
                        setView('subjects');
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
                        setView('subjects');
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
            React.createElement('div', { style: { textAlign: 'center', marginTop: '3rem' } },
                React.createElement('button', {
                    className: 'btn btn-primary',
                    onClick: () => setView('dashboard'),
                    style: { fontSize: '1.1rem', padding: '1rem 2rem' }
                }, '📊 View Analytics Dashboard')
            ),// --- NAYA DAILY GOALS BUTTON ---
React.createElement('div', { style: { textAlign: 'center', marginTop: '1.5rem' } },
    React.createElement('button', {
        className: 'btn',
        onClick: () => setView('daily-goals'),
        style: { 
            fontSize: '1.1rem', 
            padding: '1rem 2.5rem', 
            background: 'linear-gradient(135deg, #F59E0B, #D97706)', // Professional Gold/Orange Gradient
            color: 'white',
            border: 'none',
            borderRadius: '12px',
            boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)',
            cursor: 'pointer',
            fontWeight: 'bold',
            transition: 'transform 0.2s ease'
        }
    }, '🎯 My Daily Goals')
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
                        setView('chapters');
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
                setRefreshTrigger(prev => prev + 1);
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
                    setRefreshTrigger(prev => prev + 1);
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
            setRefreshTrigger(p => p + 1);
        }
    });
    setShowModal(true);
};

        return React.createElement('div', { className: 'container', key: `chapters-view-${refreshTrigger}` },
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
    setView('detail');
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
    console.log("MINUS CLICKED", chapter);
    alert("minus pressed");
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
        const [showAddModal, setShowAddModal] = React.useState(false);
        const [newGoal, setNewGoal] = React.useState({ 
            title: '', 
            desc: '', 
            icon: '📖', 
            isRecurring: true 
        });

        const goals = data.dailyGoals || [];

        const addGoal = () => {
            if (!newGoal.title.trim()) {
                showToast('Goal ka naam likhna zaroori hai!');
                return;
            }
            const updatedGoals = [...goals, { ...newGoal, id: Date.now(), completed: false }];
            setData(prev => ({ ...prev, dailyGoals: updatedGoals }));
            setShowAddModal(false);
            setNewGoal({ title: '', desc: '', icon: '📖', isRecurring: true });
            showToast('🎯 Target Set Ho Gaya!');
        };

        const toggleGoal = (id) => {
            const updatedGoals = goals.map(g => g.id === id ? { ...g, completed: !g.completed } : g);
            setData(prev => ({ ...prev, dailyGoals: updatedGoals }));
        };

        const deleteGoal = (id) => {
            const updatedGoals = goals.filter(g => g.id !== id);
            setData(prev => ({ ...prev, dailyGoals: updatedGoals }));
        };

        const completedCount = goals.filter(g => g.completed).length;
        const progressPercent = goals.length > 0 ? Math.round((completedCount / goals.length) * 100) : 0;

        return React.createElement('div', { className: 'container daily-goals-page' },
            // 1. Breadcrumb (Wapas jaane ke liye)
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, 'Daily Goals')
            ),

            // 2. Main Header Card (Title aur Progress ek card ke andar)
            React.createElement('div', { className: 'goals-header-card' },
                React.createElement('h2', { className: 'logo', style: {fontSize: '2.5rem', marginBottom: '1rem'} }, 'Today\'s Targets'),
                React.createElement('div', { className: 'progress-container' },
                    React.createElement('div', { className: 'progress-label' },
                        React.createElement('span', {style: {fontWeight: '700'}}, 'Daily Task Progress:'),
                        React.createElement('span', {style: {fontWeight: '700', color: 'var(--primary)'}}, ` ${progressPercent}%`) // Space theek kiya yahan
                    ),
                    React.createElement('div', { className: 'progress-bar-bg', style: {height: '12px'} },
                        React.createElement('div', { 
                            className: 'progress-bar-fill', 
                            style: { width: `${progressPercent}%`, background: 'linear-gradient(90deg, var(--secondary), #fbbf24)' } 
                        })
                    )
                )
            ),

            // 3. Add Goal Button (Full width professional button)
            React.createElement('div', { style: { textAlign: 'center', marginBottom: '2rem' } },
                React.createElement('button', { 
                    className: 'btn btn-primary', 
                    onClick: () => setShowAddModal(true), 
                    style: {
                        background: 'var(--secondary)', 
                        padding: '1rem 2.5rem', 
                        fontSize: '1.1rem', 
                        borderRadius: '12px', 
                        width: '100%', 
                        maxWidth: '500px',
                        boxShadow: '0 4px 15px rgba(245, 158, 11, 0.3)'
                    } 
                }, '+ Add Today\'s Goal')
            ),

            // 4. Goals List Section
            React.createElement('div', { style: { maxWidth: '700px', margin: '0 auto' } },
                goals.length === 0 
                ? React.createElement('div', { className: 'empty-state-container' }, 
                    React.createElement('div', {style: {fontSize: '4rem', marginBottom: '1rem'}}, '✨'),
                    React.createElement('h3', {style: {color: 'var(--text-light)'}}, 'Koi targets nahi hain?'),
                    React.createElement('p', {style: {color: 'var(--text-light)'}}, 'Naya goal jorein aur padhai shuru karein!'))
                : goals.map(goal => React.createElement('div', { 
                    key: goal.id, 
                    className: `card goal-card ${goal.completed ? 'completed' : ''}`, 
                    style: { 
                        marginBottom: '1rem', 
                        borderLeft: '6px solid var(--secondary)',
                        padding: '1.25rem'
                    },
                    onClick: () => toggleGoal(goal.id) 
                },
                    React.createElement('div', { style: {display: 'flex', alignItems: 'center', gap: '15px'} },
                        React.createElement('input', { 
                            type: 'checkbox', 
                            checked: goal.completed, 
                            readOnly: true, 
                            className: 'custom-checkbox', 
                            style: {width: '22px', height: '22px'} 
                        }),
                        React.createElement('div', { className: 'goal-icon-circle', style: {background: 'rgba(245, 158, 11, 0.1)', fontSize: '1.5rem'} }, goal.icon),
                        React.createElement('div', { className: 'goal-content' },
                            React.createElement('span', { className: 'goal-title', style: {fontSize: '1.1rem', fontWeight: '700'} }, goal.title),
                            React.createElement('span', { className: 'goal-desc', style: {display: 'block', color: 'var(--text-light)', fontSize: '0.9rem'} }, 
                                goal.isRecurring ? '🔄 Active for all months' : goal.desc
                            )
                        ),
                        React.createElement('button', { 
                            style: { marginLeft: 'auto', background: 'none', border: 'none', cursor: 'pointer', fontSize: '1.3rem', padding: '10px' },
                            onClick: (e) => { e.stopPropagation(); deleteGoal(goal.id); }
                        }, '🗑️')
                    )
                ))
            ),

            // 5. Add Goal Modal (Popup)
            showAddModal && React.createElement('div', { className: 'modal' },
                React.createElement('div', { className: 'modal-content glass-modal' },
                    React.createElement('div', { className: 'custom-modal-header' },
                        React.createElement('span', { className: 'target-icon' }, '🎯'),
                        React.createElement('span', null, 'Naya Target Set Karein')
                    ),
                    React.createElement('div', { className: 'input-group' },
                        React.createElement('label', null, 'Goal Name'),
                        React.createElement('input', { 
                            className: 'input-style', 
                            value: newGoal.title,
                            onChange: (e) => setNewGoal({...newGoal, title: e.target.value}),
                            placeholder: 'Kya karna hai?'
                        })
                    ),
                    React.createElement('div', { className: 'input-group' },
                        React.createElement('label', null, 'Description'),
                        React.createElement('input', { 
                            className: 'input-style', 
                            value: newGoal.desc,
                            onChange: (e) => setNewGoal({...newGoal, desc: e.target.value}),
                            placeholder: 'Details...'
                        })
                    ),
                    React.createElement('div', { className: 'input-group' },
                        React.createElement('label', null, 'Choose Icon'),
                        React.createElement('select', { 
                            className: 'input-style',
                            value: newGoal.icon,
                            onChange: (e) => setNewGoal({...newGoal, icon: e.target.value})
                        },
                            ['📖', '🧪', '✍️', '📝', '⏰', '🎯', '💡'].map(i => React.createElement('option', {key: i, value: i}, i))
                        )
                    ),
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
                        React.createElement('p', { className: 'habit-help-text' }, 'This habit will appear in all months')
                    ),
                    React.createElement('div', { className: 'modal-buttons' },
                        React.createElement('button', { className: 'btn btn-cancel', onClick: () => setShowAddModal(false) }, 'Cancel'),
                        React.createElement('button', { className: 'btn btn-save-target', onClick: addGoal }, 'Save Target')
                    )
                )
            )
        );
    };
    return React.createElement(React.Fragment, null,
        view === 'exam-select' && React.createElement(ExamSelectView),
        view === 'home' && React.createElement(HomePage),
        view === 'subjects' && React.createElement(SubjectsView),
        view === 'chapters' && React.createElement(ChaptersView),
        view === 'detail' && React.createElement(DetailView),
        view === 'dashboard' && React.createElement(DashboardView),
         view === 'daily-goals' && React.createElement(DailyGoalsView),
        showModal && React.createElement('div', { className: 'modal', onClick: () => setShowModal(false) },
            React.createElement('div', { className: 'modal-content', onClick: (e) => e.stopPropagation() },
                React.createElement('h3', { className: 'modal-title' }, modalConfig.title),
                React.createElement('p', { style: { marginBottom: '1.5rem' } }, modalConfig.message),
                React.createElement('div', { className: 'modal-buttons' },
                    React.createElement('button', { 
                        className: 'btn btn-secondary', 
                        onClick: () => setShowModal(false),
                        style: { flex: 1 }
                    }, '✕ No, Cancel'),
                    React.createElement('button', { 
                        className: 'btn btn-danger', 
                        onClick: () => {
                            if (modalConfig.onConfirm) {
                                modalConfig.onConfirm();
                            }
                        },
                        style: { flex: 1 }
                    }, '✓ Yes, Delete')
                )
            )
        ),
        toast.show && React.createElement('div', { className: 'toast' }, toast.message)
    );
};

ReactDOM.render(React.createElement(App), document.getElementById('root'));
