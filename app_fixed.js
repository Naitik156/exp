
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
                "Moving Charges and Magnetism",
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
                "Communication Systems"
            ],
            "Physical Chemistry": [
                "Solutions",
                "Electrochemistry",
                "Chemical Kinetics",
                "Surface Chemistry",
                "Solid State"
            ],
            "Organic Chemistry": [
                "Haloalkanes and Haloarenes",
                "Alcohols, Phenols and Ethers",
                "Aldehydes, Ketones and Carboxylic Acids",
                "Amines",
                "Biomolecules",
                "Polymers",
                "Chemistry in Everyday Life"
            ],
            "Inorganic Chemistry": [
                "General Principles and Processes of Isolation of Elements",
                "The p-Block Elements",
                "The d-Block and f-Block Elements",
                "Coordination Compounds"
            ],
            Botany: [
                "Reproduction in Organisms",
                "Sexual Reproduction in Flowering Plants",
                "Human Reproduction",
                "Reproductive Health",
                "Principles of Inheritance and Variation",
                "Molecular Basis of Inheritance",
                "Evolution",
                "Human Health and Disease",
                "Strategies for Enhancement in Food Production",
                "Microbes in Human Welfare",
                "Biotechnology Principles and Processes",
                "Biotechnology and its Applications",
                "Organisms and Populations",
                "Ecosystem",
                "Biodiversity and Conservation",
                "Environmental Issues"
            ],
            Zoology: [
                "Reproduction in Organisms",
                "Sexual Reproduction in Flowering Plants",
                "Human Reproduction",
                "Reproductive Health",
                "Principles of Inheritance and Variation",
                "Molecular Basis of Inheritance",
                "Evolution",
                "Human Health and Disease",
                "Strategies for Enhancement in Food Production",
                "Microbes in Human Welfare",
                "Biotechnology Principles and Processes",
                "Biotechnology and its Applications",
                "Organisms and Populations",
                "Ecosystem",
                "Biodiversity and Conservation",
                "Environmental Issues"
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
                "The p-Block Elements",
                "Hydrogen",
                "The s-Block Elements"
            ],
            Mathematics: [
                "Sets, Relations and Functions",
                "Complex Numbers",
                "Quadratic Equations",
                "Sequences and Series",
                "Permutations and Combinations",
                "Binomial Theorem",
                "Mathematical Induction",
                "Straight Lines",
                "Conic Sections",
                "Three Dimensional Geometry",
                "Limits and Derivatives",
                "Mathematical Reasoning",
                "Statistics",
                "Probability",
                "Trigonometric Functions",
                "Trigonometric Equations"
            ]
        },
        "Class 12": {
            Physics: [
                "Electric Charges and Fields",
                "Electrostatic Potential and Capacitance",
                "Current Electricity",
                "Moving Charges and Magnetism",
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
                "Communication Systems"
            ],
            "Physical Chemistry": [
                "Solutions",
                "Electrochemistry",
                "Chemical Kinetics",
                "Surface Chemistry",
                "Solid State"
            ],
            "Organic Chemistry": [
                "Haloalkanes and Haloarenes",
                "Alcohols, Phenols and Ethers",
                "Aldehydes, Ketones and Carboxylic Acids",
                "Amines",
                "Biomolecules",
                "Polymers",
                "Chemistry in Everyday Life"
            ],
            "Inorganic Chemistry": [
                "General Principles and Processes of Isolation of Elements",
                "The p-Block Elements",
                "The d-Block and f-Block Elements",
                "Coordination Compounds"
            ],
            Mathematics: [
                "Relations and Functions",
                "Inverse Trigonometric Functions",
                "Matrices",
                "Determinants",
                "Continuity and Differentiability",
                "Application of Derivatives",
                "Integrals",
                "Application of Integrals",
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
    const [currentExam, setCurrentExam] = useState(null);
    const [view, setView] = useState('exam-select');
    const [selectedClass, setSelectedClass] = useState(null);
    const [selectedSubject, setSelectedSubject] = useState(null);
    const [selectedChapter, setSelectedChapter] = useState(null);
    const [customChapters, setCustomChapters] = useState({});
    const [progressData, setProgressData] = useState({});
    const [newChapterName, setNewChapterName] = useState('');
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({ title: '', message: '', onConfirm: null });
    const [toast, setToast] = useState({ show: false, message: '' });
    const [editingChapter, setEditingChapter] = useState(null);
    const [editChapterName, setEditChapterName] = useState('');

    useEffect(() => {
        const savedExam = localStorage.getItem('currentExam');
        const savedView = localStorage.getItem('currentView');
        const savedCustomChapters = localStorage.getItem('customChapters');
        const savedProgressData = localStorage.getItem('progressData');

        if (savedExam) setCurrentExam(savedExam);
        if (savedView) setView(savedView);
        if (savedCustomChapters) setCustomChapters(JSON.parse(savedCustomChapters));
        if (savedProgressData) setProgressData(JSON.parse(savedProgressData));
    }, []);

    useEffect(() => {
        if (currentExam) localStorage.setItem('currentExam', currentExam);
    }, [currentExam]);

    useEffect(() => {
        localStorage.setItem('currentView', view);
    }, [view]);

    useEffect(() => {
        localStorage.setItem('customChapters', JSON.stringify(customChapters));
    }, [customChapters]);

    useEffect(() => {
        localStorage.setItem('progressData', JSON.stringify(progressData));
    }, [progressData]);

    const showToast = (message) => {
        setToast({ show: true, message });
        setTimeout(() => setToast({ show: false, message: '' }), 3000);
    };

    const selectExam = (exam) => {
        setCurrentExam(exam);
        setView('home');
    };

    const changeExam = () => {
        setView('exam-select');
        setSelectedClass(null);
        setSelectedSubject(null);
        setSelectedChapter(null);
    };

    const selectClass = (className) => {
        setSelectedClass(className);
        setView('subjects');
    };

    const selectSubject = (subject) => {
        setSelectedSubject(subject);
        setView('chapters');
    };

    const getAllChapters = () => {
        const baseChapters = EXAM_SYLLABUS[currentExam]?.[selectedClass]?.[selectedSubject] || [];
        const customKey = `${currentExam}-${selectedClass}-${selectedSubject}`;
        const custom = customChapters[customKey] || [];
        return [...baseChapters, ...custom];
    };

    const addCustomChapter = () => {
        if (!newChapterName.trim()) {
            showToast('⚠️ Chapter name cannot be empty!');
            return;
        }

        const customKey = `${currentExam}-${selectedClass}-${selectedSubject}`;
        const existingCustom = customChapters[customKey] || [];
        
        if (existingCustom.includes(newChapterName.trim())) {
            showToast('⚠️ Chapter already exists!');
            return;
        }

        setCustomChapters({
            ...customChapters,
            [customKey]: [...existingCustom, newChapterName.trim()]
        });
        setNewChapterName('');
        showToast('✓ Chapter added successfully!');
    };

    const startEditingChapter = (chapter) => {
        setEditingChapter(chapter);
        setEditChapterName(chapter);
    };

    const saveEditChapter = () => {
        if (!editChapterName.trim()) {
            showToast('⚠️ Chapter name cannot be empty!');
            return;
        }

        const customKey = `${currentExam}-${selectedClass}-${selectedSubject}`;
        const existingCustom = customChapters[customKey] || [];
        
        // Check if new name already exists (but not the current one being edited)
        if (editChapterName.trim() !== editingChapter && existingCustom.includes(editChapterName.trim())) {
            showToast('⚠️ Chapter with this name already exists!');
            return;
        }

        // Update chapter name in custom chapters
        const updatedCustom = existingCustom.map(ch => 
            ch === editingChapter ? editChapterName.trim() : ch
        );

        setCustomChapters({
            ...customChapters,
            [customKey]: updatedCustom
        });

        // Update progress data if exists
        const progressKey = `${currentExam}-${selectedClass}-${selectedSubject}-${editingChapter}`;
        const newProgressKey = `${currentExam}-${selectedClass}-${selectedSubject}-${editChapterName.trim()}`;
        
        if (progressData[progressKey]) {
            const newProgressData = { ...progressData };
            newProgressData[newProgressKey] = newProgressData[progressKey];
            delete newProgressData[progressKey];
            setProgressData(newProgressData);
        }

        setEditingChapter(null);
        setEditChapterName('');
        showToast('✓ Chapter renamed successfully!');
    };

    const cancelEditChapter = () => {
        setEditingChapter(null);
        setEditChapterName('');
    };

    const deleteCustomChapter = (chapterToDelete) => {
        setModalConfig({
            title: 'Delete Chapter',
            message: `Are you sure you want to delete "${chapterToDelete}"? This will also delete all progress data for this chapter.`,
            onConfirm: () => {
                const customKey = `${currentExam}-${selectedClass}-${selectedSubject}`;
                const existingCustom = customChapters[customKey] || [];
                
                setCustomChapters({
                    ...customChapters,
                    [customKey]: existingCustom.filter(ch => ch !== chapterToDelete)
                });

                const progressKey = `${currentExam}-${selectedClass}-${selectedSubject}-${chapterToDelete}`;
                const newProgressData = { ...progressData };
                delete newProgressData[progressKey];
                setProgressData(newProgressData);

                setShowModal(false);
                showToast('✓ Chapter deleted successfully!');
            }
        });
        setShowModal(true);
    };

    const selectChapter = (chapter) => {
        setSelectedChapter(chapter);
        setView('detail');
    };

    const updateChapterData = (className, subject, chapter, updates) => {
        const key = `${currentExam}-${className}-${subject}-${chapter}`;
        setProgressData({
            ...progressData,
            [key]: { ...(progressData[key] || {}), ...updates }
        });
    };

    const getChapterData = (className, subject, chapter) => {
        const key = `${currentExam}-${className}-${subject}-${chapter}`;
        return progressData[key] || {};
    };

    const getChapterProgress = (chapterData) => {
        const tasks = [
            { key: 'ncert', weight: 15 },
            { key: 'video', weight: 15 },
            { key: 'notes', weight: 15 },
            { key: 'pyq', weight: 20 },
            { key: 'modules', weight: 15 },
            { key: 'dpp', weight: 10 }
        ];

        let progress = tasks.reduce((acc, task) => {
            return acc + (chapterData[task.key] ? task.weight : 0);
        }, 0);

        progress += (chapterData.satisfaction || 0);
        return Math.min(progress, 100);
    };

    const resetChapter = () => {
        setModalConfig({
            title: 'Reset Chapter Progress',
            message: `Are you sure you want to reset all progress for "${selectedChapter}"?`,
            onConfirm: () => {
                const key = `${currentExam}-${selectedClass}-${selectedSubject}-${selectedChapter}`;
                const newProgressData = { ...progressData };
                delete newProgressData[key];
                setProgressData(newProgressData);
                setShowModal(false);
                showToast('✓ Chapter progress reset successfully!');
            }
        });
        setShowModal(true);
    };

    const exportData = () => {
        const data = {
            exam: currentExam,
            customChapters,
            progressData,
            exportDate: new Date().toISOString()
        };
        const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
        const url = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = url;
        a.download = `${currentExam}_progress_${new Date().toISOString().split('T')[0]}.json`;
        a.click();
        showToast('✓ Data exported successfully!');
    };

    const importData = (e) => {
        const file = e.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                try {
                    const data = JSON.parse(event.target.result);
                    if (data.exam === currentExam) {
                        setCustomChapters(data.customChapters || {});
                        setProgressData(data.progressData || {});
                        showToast('✓ Data imported successfully!');
                    } else {
                        showToast('⚠️ Import failed: Exam mismatch!');
                    }
                } catch (error) {
                    showToast('⚠️ Import failed: Invalid file!');
                }
            };
            reader.readAsText(file);
        }
        e.target.value = '';
    };

    const getAnalytics = () => {
        const subjects = Object.keys(EXAM_SYLLABUS[currentExam]?.[selectedClass] || {});
        let totalProgress = 0;
        let totalChapters = 0;
        let completedChapters = 0;
        let strongCount = 0;
        let moderateCount = 0;
        let weakCount = 0;
        let totalSatisfaction = 0;
        let satisfactionCount = 0;

        const subjectProgress = {};

        subjects.forEach(subject => {
            const chapters = getAllChaptersForSubject(subject);
            let subjectTotal = 0;

            chapters.forEach(chapter => {
                const chapterData = getChapterData(selectedClass, subject, chapter);
                const progress = getChapterProgress(chapterData);
                
                totalProgress += progress;
                totalChapters++;
                subjectTotal += progress;

                if (progress === 100) completedChapters++;
                if (progress >= 80) strongCount++;
                else if (progress >= 50) moderateCount++;
                else if (progress > 0) weakCount++;

                if (chapterData.satisfaction) {
                    totalSatisfaction += chapterData.satisfaction;
                    satisfactionCount++;
                }
            });

            subjectProgress[subject] = chapters.length > 0 ? Math.round(subjectTotal / chapters.length) : 0;
        });

        const neglectedSubject = Object.entries(subjectProgress).sort((a, b) => a[1] - b[1])[0];

        return {
            overallProgress: totalChapters > 0 ? Math.round(totalProgress / totalChapters) : 0,
            totalChapters,
            completedChapters,
            strongCount,
            moderateCount,
            weakCount,
            avgSatisfaction: satisfactionCount > 0 ? (totalSatisfaction / satisfactionCount).toFixed(1) : 0,
            neglectedSubject: neglectedSubject?.[0] || 'N/A',
            neglectedProgress: neglectedSubject?.[1] || 0
        };
    };

    const getAllChaptersForSubject = (subject) => {
        const baseChapters = EXAM_SYLLABUS[currentExam]?.[selectedClass]?.[subject] || [];
        const customKey = `${currentExam}-${selectedClass}-${subject}`;
        const custom = customChapters[customKey] || [];
        return [...baseChapters, ...custom];
    };

    const ExamSelectView = () => {
        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'header' },
                React.createElement('h1', { className: 'logo' }, '🎓 Study Progress Tracker')
            ),
            React.createElement('div', { className: 'exam-cards' },
                React.createElement('div', {
                    className: 'exam-card',
                    onClick: () => selectExam('NEET')
                },
                    React.createElement('div', { className: 'exam-icon' }, '🏥'),
                    React.createElement('h2', null, 'NEET'),
                    React.createElement('p', null, 'National Eligibility cum Entrance Test')
                ),
                React.createElement('div', {
                    className: 'exam-card',
                    onClick: () => selectExam('JEE')
                },
                    React.createElement('div', { className: 'exam-icon' }, '⚙️'),
                    React.createElement('h2', null, 'JEE'),
                    React.createElement('p', null, 'Joint Entrance Examination')
                )
            )
        );
    };

    const HomePage = () => {
        const classes = Object.keys(EXAM_SYLLABUS[currentExam] || {});

        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, 'Home')
            ),
            React.createElement('div', { className: 'header' },
                React.createElement('h2', { className: 'logo' }, `${currentExam} Study Progress`),
                React.createElement('button', {
                    className: 'btn btn-primary',
                    style: { marginTop: '1rem' },
                    onClick: () => setView('dashboard')
                }, '📊 View Dashboard')
            ),
            React.createElement('div', { className: 'class-selection' },
                classes.map(className =>
                    React.createElement('div', {
                        key: className,
                        className: 'class-card',
                        onClick: () => selectClass(className)
                    },
                        React.createElement('div', { className: 'class-icon' }, '📚'),
                        React.createElement('h3', null, className)
                    )
                )
            )
        );
    };

    const SubjectsView = () => {
        const subjects = Object.keys(EXAM_SYLLABUS[currentExam]?.[selectedClass] || {});

        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, selectedClass)
            ),
            React.createElement('div', { className: 'header' },
                React.createElement('h2', { className: 'logo' }, `${selectedClass} - Select Subject`)
            ),
            React.createElement('div', { className: 'subject-grid' },
                subjects.map(subject =>
                    React.createElement('div', {
                        key: subject,
                        className: 'subject-card',
                        onClick: () => selectSubject(subject)
                    },
                        React.createElement('h3', null, subject),
                        React.createElement('p', null, `${getAllChaptersForSubject(subject).length} Chapters`)
                    )
                )
            )
        );
    };

    const ChaptersView = () => {
        const chapters = getAllChapters();
        const baseChapters = EXAM_SYLLABUS[currentExam]?.[selectedClass]?.[selectedSubject] || [];
        const customKey = `${currentExam}-${selectedClass}-${selectedSubject}`;
        const customChaptersList = customChapters[customKey] || [];

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
            React.createElement('div', { className: 'header' },
                React.createElement('h2', { className: 'logo' }, selectedSubject),
                React.createElement('p', { className: 'subtitle' }, `${chapters.length} Total Chapters`)
            ),
            React.createElement('div', { className: 'add-chapter-section' },
                React.createElement('input', {
                    type: 'text',
                    className: 'input',
                    placeholder: 'Add custom chapter...',
                    value: newChapterName,
                    onChange: (e) => setNewChapterName(e.target.value),
                    onKeyPress: (e) => {
                        if (e.key === 'Enter') addCustomChapter();
                    }
                }),
                React.createElement('button', {
                    className: 'btn btn-primary',
                    onClick: addCustomChapter
                }, '+ Add')
            ),
            React.createElement('div', { className: 'chapter-list' },
                chapters.map(chapter => {
                    const chapterData = getChapterData(selectedClass, selectedSubject, chapter);
                    const progress = getChapterProgress(chapterData);
                    const isCustom = customChaptersList.includes(chapter);
                    const isEditing = editingChapter === chapter;

                    return React.createElement('div', {
                        key: chapter,
                        className: 'chapter-item',
                        style: { 
                            background: isCustom ? 'linear-gradient(135deg, rgba(16, 185, 129, 0.05), rgba(5, 150, 105, 0.05))' : 'var(--card-bg)',
                            borderLeft: isCustom ? '4px solid var(--success)' : 'none'
                        }
                    },
                        React.createElement('div', { 
                            className: 'chapter-info',
                            style: { flex: 1, cursor: isEditing ? 'default' : 'pointer' },
                            onClick: () => !isEditing && selectChapter(chapter)
                        },
                            isEditing 
                                ? React.createElement('input', {
                                    type: 'text',
                                    className: 'input',
                                    value: editChapterName,
                                    onChange: (e) => setEditChapterName(e.target.value),
                                    onKeyPress: (e) => {
                                        if (e.key === 'Enter') saveEditChapter();
                                        if (e.key === 'Escape') cancelEditChapter();
                                    },
                                    autoFocus: true,
                                    onClick: (e) => e.stopPropagation(),
                                    style: { 
                                        fontSize: '1rem',
                                        padding: '0.5rem',
                                        marginBottom: '0.5rem',
                                        width: '100%'
                                    }
                                })
                                : React.createElement('div', { className: 'chapter-name' },
                                    chapter,
                                    isCustom && React.createElement('span', { 
                                        className: 'custom-badge',
                                        style: {
                                            marginLeft: '0.5rem',
                                            fontSize: '0.7rem',
                                            padding: '0.15rem 0.5rem',
                                            background: 'var(--success)',
                                            color: 'white',
                                            borderRadius: '12px',
                                            fontWeight: '600'
                                        }
                                    }, 'Custom')
                                ),
                            !isEditing && React.createElement('div', { className: 'progress-container', style: { marginTop: '0.5rem' } },
                                React.createElement('div', { className: 'progress-label' },
                                    React.createElement('span', null, 'Progress'),
                                    React.createElement('span', null, `${progress}%`)
                                ),
                                React.createElement('div', { className: 'progress-bar-bg' },
                                    React.createElement('div', {
                                        className: 'progress-bar-fill',
                                        style: { width: `${progress}%` }
                                    })
                                )
                            )
                        ),
                        isCustom && (
                            isEditing 
                                ? React.createElement('div', { 
                                    className: 'chapter-actions',
                                    style: { display: 'flex', gap: '0.5rem', marginLeft: '1rem' }
                                },
                                    React.createElement('button', {
                                        className: 'btn btn-success',
                                        onClick: (e) => {
                                            e.stopPropagation();
                                            saveEditChapter();
                                        },
                                        style: { padding: '0.4rem 0.8rem', fontSize: '0.85rem' }
                                    }, '✓ Save'),
                                    React.createElement('button', {
                                        className: 'btn btn-secondary',
                                        onClick: (e) => {
                                            e.stopPropagation();
                                            cancelEditChapter();
                                        },
                                        style: { padding: '0.4rem 0.8rem', fontSize: '0.85rem' }
                                    }, '✕ Cancel')
                                )
                                : React.createElement('div', { 
                                    className: 'chapter-actions',
                                    style: { display: 'flex', gap: '0.5rem', marginLeft: '1rem' }
                                },
                                    React.createElement('button', {
                                        className: 'btn btn-secondary',
                                        onClick: (e) => {
                                            e.stopPropagation();
                                            startEditingChapter(chapter);
                                        },
                                        style: { padding: '0.4rem 0.8rem', fontSize: '0.85rem' }
                                    }, '✏️ Edit'),
                                    React.createElement('button', {
                                        className: 'btn btn-danger',
                                        onClick: (e) => {
                                            e.stopPropagation();
                                            deleteCustomChapter(chapter);
                                        },
                                        style: { padding: '0.4rem 0.8rem', fontSize: '0.85rem' }
                                    }, '🗑️ Delete')
                                )
                        )
                    );
                })
            )
        );
    };

    const DetailView = () => {
        const chapterData = getChapterData(selectedClass, selectedSubject, selectedChapter);
        const progress = getChapterProgress(chapterData);

        const tasks = [
            { key: 'ncert', label: 'NCERT (15%)', weight: 15 },
            { key: 'video', label: 'Video Lectures (15%)', weight: 15 },
            { key: 'notes', label: 'Notes (15%)', weight: 15 },
            { key: 'pyq', label: 'PYQ (20%)', weight: 20 },
            { key: 'modules', label: 'Modules (15%)', weight: 15 },
            { key: 'dpp', label: 'DPP (10%)', weight: 10 }
        ];

        return React.createElement('div', { className: 'container' },
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
            React.createElement('div', { className: 'card' },
                React.createElement('h2', { className: 'card-title' }, selectedChapter),
                React.createElement('p', { className: 'card-subtitle' }, `${selectedSubject} - ${selectedClass}`),
                React.createElement('div', { className: 'progress-container', style: { marginTop: '1.5rem' } },
                    React.createElement('div', { className: 'progress-label' },
                        React.createElement('span', null, 'Overall Progress'),
                        React.createElement('span', { style: { fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--primary)' } }, `${progress}%`)
                    ),
                    React.createElement('div', { 
                        className: 'progress-bar-bg',
                        style: { height: '2rem', marginTop: '0.5rem' }
                    },
                        React.createElement('div', {
                            className: 'progress-bar-fill',
                            style: { 
                                width: `${progress}%`,
                                transition: 'width 0.3s ease'
                            }
                        })
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
        const analytics = getAnalytics();

        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => setView('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item active' }, 'Dashboard')
            ),
            React.createElement('div', { className: 'header', style: { marginBottom: '2rem' } },
                React.createElement('h2', { className: 'logo', style: { fontSize: '2rem' } }, `${currentExam} Performance Analytics`),
                React.createElement('div', { style: { marginTop: '1.5rem', display: 'flex', gap: '0.75rem', justifyContent: 'center', flexWrap: 'wrap' } },
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
            React.createElement('div', { className: 'dashboard-stats' },
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-value' }, `${analytics.overallProgress}%`),
                    React.createElement('div', { className: 'stat-label' }, 'Overall Completion')
                ),
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-value' }, `${analytics.completedChapters}/${analytics.totalChapters}`),
                    React.createElement('div', { className: 'stat-label' }, 'Chapters Completed')
                ),
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-value', style: { color: 'var(--success)' } }, analytics.strongCount),
                    React.createElement('div', { className: 'stat-label' }, 'Strong Chapters')
                ),
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-value', style: { color: 'var(--warning)' } }, analytics.moderateCount),
                    React.createElement('div', { className: 'stat-label' }, 'Moderate Chapters')
                ),
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-value', style: { color: 'var(--danger)' } }, analytics.weakCount),
                    React.createElement('div', { className: 'stat-label' }, 'Weak Chapters')
                ),
                React.createElement('div', { className: 'stat-card' },
                    React.createElement('div', { className: 'stat-value' }, `${analytics.avgSatisfaction}/10`),
                    React.createElement('div', { className: 'stat-label' }, 'Avg Satisfaction')
                )
            ),
            React.createElement('div', { className: 'card', style: { marginTop: '2rem' } },
                React.createElement('h3', { className: 'card-title' }, 'Most Neglected Subject'),
                React.createElement('p', { className: 'card-subtitle' }, analytics.neglectedSubject),
                React.createElement('div', { className: 'progress-container' },
                    React.createElement('div', { className: 'progress-label' },
                        React.createElement('span', null, 'Progress'),
                        React.createElement('span', null, `${analytics.neglectedProgress}%`)
                    ),
                    React.createElement('div', { className: 'progress-bar-bg' },
                        React.createElement('div', { className: 'progress-bar-fill', style: { width: `${analytics.neglectedProgress}%` } })
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
