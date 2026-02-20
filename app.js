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
const ExamSelectView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion, compressImage } = ctx;
        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'header' },
                React.createElement('h1', { className: 'logo' }, 'Syllabus Tracker'),
                React.createElement('p', { className: 'tagline' }, 'Choose Your Path to Success')
            ),
            React.createElement('div', { className: 'grid grid-2' },
                React.createElement('div', {
                    className: 'card exam-card',
                    onClick: () => {
                        setCurrentExam('NEET');
                        localStorage.setItem('currentExam', 'NEET');
                        // Firestore mein bhi turant save karo taaki logout ke baad bhi yaad rahe
                        if (window.db && window.dbFuncs && user) {
                            const { doc, setDoc } = window.dbFuncs;
                            setDoc(doc(window.db, "users", user.uid), { _currentExam: 'NEET' }, { merge: true }).catch(e => console.log(e));
                        }
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
                        localStorage.setItem('currentExam', 'JEE');
                        // Firestore mein bhi turant save karo taaki logout ke baad bhi yaad rahe
                        if (window.db && window.dbFuncs && user) {
                            const { doc, setDoc } = window.dbFuncs;
                            setDoc(doc(window.db, "users", user.uid), { _currentExam: 'JEE' }, { merge: true }).catch(e => console.log(e));
                        }
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

const HomePage = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion } = ctx;
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
               // Focus Timer Card (Updated to match other cards)
                React.createElement('div', { 
                    className: 'card', 
                    onClick: () => navigateTo('stopwatch'),
                    // Style se background black aur color white hata diya
                    style: { textAlign: 'center', cursor: 'pointer', minHeight: '180px', display: 'flex', flexDirection: 'column', justifyContent: 'center', padding: '1.5rem' }
                },
                    React.createElement('div', { style: { fontSize: '3rem', marginBottom: '0.75rem' } }, '⏱️'),
                    // Title aur Subtitle se bhi color white hata diya taaki default black/grey ho jaye
                    React.createElement('h3', { className: 'card-title', style: { fontSize: '1.25rem', margin: 0 } }, 'Focus Timer'),
                    React.createElement('p', { className: 'card-subtitle', style: { fontSize: '0.9rem', marginTop: '5px' } }, 'Track Study Hours')
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

const SubjectsView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion } = ctx;
        const subjects = Object.keys(EXAM_SYLLABUS[currentExam][selectedClass]);

        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('home') }, 'Home'),
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
                    React.createElement('p', { className: 'card-subtitle' }, `${getChapters(currentExam, selectedClass, subject).length} Chapters`),
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

const ChaptersView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion } = ctx;
        const chapters = getChapters(currentExam, selectedClass, selectedSubject);
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

                // Persist rename: figure out the original name (before any previous rename)
                const custom = data.syllabusCustom?.[currentExam]?.[selectedClass]?.[selectedSubject] || {};
                const prevRenamed = custom.renamed || {};
                const prevAdded = custom.added || [];
                const prevDeleted = custom.deleted || [];

                // Find original key for this chapter (reverse lookup in renamed map)
                let originalName = oldName;
                // If oldName is itself a renamed chapter, find its original key
                const reverseEntry = Object.entries(prevRenamed).find(([orig, curr]) => curr === oldName);
                if (reverseEntry) originalName = reverseEntry[0];

                // Determine if this chapter was a custom-added one
                const isCustomAdded = prevAdded.includes(oldName);

                setData(prev => {
                    const prevCustom = prev.syllabusCustom || {};
                    const prevExam = prevCustom[currentExam] || {};
                    const prevClass = prevExam[selectedClass] || {};
                    const prevSubject = prevClass[selectedSubject] || {};
                    const existingRenamed = prevSubject.renamed || {};
                    const existingAdded = prevSubject.added || [];

                    // Build new renamed map
                    let newRenamed = { ...existingRenamed };
                    let newAdded = [...existingAdded];

                    if (isCustomAdded) {
                        // For custom added chapters, just update the name in 'added' array
                        newAdded = newAdded.map(n => n === oldName ? trimmedName : n);
                    } else {
                        // For base syllabus chapters, map originalName -> trimmedName
                        newRenamed[originalName] = trimmedName;
                    }

                    const nextState = {
                        ...prev,
                        syllabusCustom: {
                            ...prevCustom,
                            [currentExam]: {
                                ...prevExam,
                                [selectedClass]: {
                                    ...prevClass,
                                    [selectedSubject]: {
                                        ...prevSubject,
                                        renamed: newRenamed,
                                        added: newAdded
                                    }
                                }
                            }
                        }
                    };

                    // Migrate progress data from old chapter key to new chapter key
                    const oldData = (nextState[currentExam]?.[selectedClass]?.[selectedSubject]?.[oldName]) || {};
                    if (Object.keys(oldData).length > 0) {
                        nextState[currentExam] = {
                            ...nextState[currentExam],
                            [selectedClass]: {
                                ...nextState[currentExam]?.[selectedClass],
                                [selectedSubject]: {
                                    ...nextState[currentExam]?.[selectedClass]?.[selectedSubject],
                                    [trimmedName]: { ...oldData }
                                }
                            }
                        };
                        delete nextState[currentExam][selectedClass][selectedSubject][oldName];
                    }

                    // Debounce karega Firestore write
                    unsavedChangesRef.current = true;
                    return nextState;
                });

                forceChapterRefresh();
                showToast(`Chapter renamed: ${oldName} → ${trimmedName}`);
            }
            setEditingChapter(null);
            setEditedName('');
        };
const handleDeleteChapter = (chapterName) => {
    setModalConfig({
        title: 'Delete Chapter',
        message: `Are you sure you want to delete "${chapterName}"? All progress data will be permanently lost.`,
        onConfirm: () => {
            setData(prev => {
                const prevCustom = prev.syllabusCustom || {};
                const prevExam = prevCustom[currentExam] || {};
                const prevClass = prevExam[selectedClass] || {};
                const prevSubject = prevClass[selectedSubject] || {};
                const existingDeleted = prevSubject.deleted || [];
                const existingAdded = prevSubject.added || [];
                const existingRenamed = prevSubject.renamed || {};

                // Check if it's a custom-added chapter (just remove from added list)
                const isCustomAdded = existingAdded.includes(chapterName);

                let newAdded = existingAdded;
                let newDeleted = existingDeleted;
                let newRenamed = existingRenamed;

                if (isCustomAdded) {
                    // Just remove from the added list
                    newAdded = existingAdded.filter(n => n !== chapterName);
                } else {
                    // For base syllabus chapters: find the original name and add to deleted
                    const reverseEntry = Object.entries(existingRenamed).find(([orig, curr]) => curr === chapterName);
                    const originalName = reverseEntry ? reverseEntry[0] : chapterName;
                    if (!existingDeleted.includes(originalName)) {
                        newDeleted = [...existingDeleted, originalName];
                    }
                    // Also remove from renamed map if it was renamed
                    if (reverseEntry) {
                        newRenamed = { ...existingRenamed };
                        delete newRenamed[reverseEntry[0]];
                    }
                }

                // Remove progress data for this chapter
                let nextState = {
                    ...prev,
                    syllabusCustom: {
                        ...prevCustom,
                        [currentExam]: {
                            ...prevExam,
                            [selectedClass]: {
                                ...prevClass,
                                [selectedSubject]: {
                                    ...prevSubject,
                                    deleted: newDeleted,
                                    added: newAdded,
                                    renamed: newRenamed
                                }
                            }
                        }
                    }
                };

                // Remove progress data
                if (nextState[currentExam]?.[selectedClass]?.[selectedSubject]?.[chapterName]) {
                    const subjectData = { ...nextState[currentExam][selectedClass][selectedSubject] };
                    delete subjectData[chapterName];
                    nextState = {
                        ...nextState,
                        [currentExam]: {
                            ...nextState[currentExam],
                            [selectedClass]: {
                                ...nextState[currentExam][selectedClass],
                                [selectedSubject]: subjectData
                            }
                        }
                    };
                }

                // Debounce karega Firestore write
                unsavedChangesRef.current = true;

                return nextState;
            });

            setShowModal(false);
            forceChapterRefresh();
            showToast(`Chapter deleted: ${chapterName}`);
        }
    });
    setShowModal(true);
};

        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: changeExam }, 'Exam Select'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('subjects') }, selectedClass),
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
                                    onKeyDown: (e) => {
                                        if (e.key === 'Enter') handleRenameChapter(chapter);
                                        if (e.key === 'Escape') {
                                            setEditingChapter(null);
                                            setEditedName('');
                                        }
                                    },
                                    autoFocus: true,
                                    onClick: (e) => e.stopPropagation(),
                                    style: { flex: 1, position: 'relative', zIndex: 10 }
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
                                            navigateTo('detail', { selectedChapter: chapter });
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
                                navigateTo('detail', { selectedChapter: chapter });
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
                                navigateTo('detail', { selectedChapter: chapter });
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
                            style: { width: '100%', padding: '1rem', position: 'relative', zIndex: 10 },
                            onClick: (e) => e.stopPropagation()
                        },
                            React.createElement('input', {
                                type: 'text',
                                placeholder: 'Enter chapter name...',
                                value: newChapterName,
                                onChange: (e) => setNewChapterName(e.target.value),
                                onKeyDown: (e) => {
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
                                    outline: 'none',
                                    position: 'relative',
                                    zIndex: 10,
                                    boxSizing: 'border-box'
                                }
                            }),
                            React.createElement('div', { style: { display: 'flex', gap: '0.5rem', position: 'relative', zIndex: 10 } },
                                React.createElement('button', {
                                    className: 'btn',
                                    onClick: (e) => { e.stopPropagation(); handleAddChapter(); },
                                    style: { 
                                        flex: 1,
                                        background: 'var(--success)',
                                        color: 'white',
                                        position: 'relative',
                                        zIndex: 10
                                    }
                                }, '✓ Add'),
                                React.createElement('button', {
                                    className: 'btn btn-secondary',
                                    onClick: (e) => {
                                        e.stopPropagation();
                                        setShowAddForm(false);
                                        setNewChapterName('');
                                    },
                                    style: { flex: 1, position: 'relative', zIndex: 10 }
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

const DetailView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion } = ctx;
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
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('subjects') }, selectedClass),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('chapters') }, selectedSubject),
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

const DashboardView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion } = ctx;
        // --- NAYA STATE: Dashboard ka class filter track karne ke liye ---
        const [dashFilter, setDashFilter] = React.useState('Overall');
        
        // Naye filter ke sath analytics calculation
        const analytics = getAnalytics(dashFilter);

        return React.createElement('div', { className: 'container' },
            // 1. Navigation Breadcrumb
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('home') }, 'Home'),
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
                React.createElement('button', { className: 'btn btn-secondary', onClick: () => navigateTo('home') }, '🔙 Back to Home')
            )
        );
    };  

        
const DailyGoalsView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion, triggerRevision, view, compressImage } = ctx;

    // --- HELPER: India Current Date ---
    const getISTDate = () => {
        return new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    };

    const todayIST = getISTDate();
    const [viewDate, setViewDate] = useState(todayIST); 
    const [showAddModal, setShowAddModal] = useState(false);
    
    // --- GRAPH STATES ---
    const [graphMode, setGraphMode] = useState('WEEK'); // 'WEEK', 'MONTH', 'YEAR'
    const [graphOffset, setGraphOffset] = useState(0); 
    const [graphLabel, setGraphLabel] = useState(''); // E.g., "Feb 2026"

    const [newGoal, setNewGoal] = useState({ 
        title: '', desc: '', icon: '📖', isRecurring: false, date: todayIST
    });
    
    const goalChartRef = React.useRef(null);
    const isToday = viewDate === todayIST;

    const goals = (data.dailyGoals || []).filter(g => {
        if (g.isRecurring) return true;
        return g.date === viewDate;
    });

    // --- ACTIONS ---
    const addGoal = () => {
        if (!newGoal.title.trim()) {
            showToast('Goal name bhariye!');
            return;
        }
        const updatedGoals = [...(data.dailyGoals || []), { 
            ...newGoal, id: Date.now(), doneDates: {}, date: viewDate 
        }];
        setData(prev => ({ ...prev, dailyGoals: updatedGoals }));
        setShowAddModal(false);
        setNewGoal({ title: '', desc: '', icon: '📖', isRecurring: false, date: todayIST });
        showToast('Target Saved!');
    };

    const toggleGoal = (id) => {
        if (!isToday) {
            showToast("⚠️ History edit nahi kar sakte!");
            return;
        }
        const updatedGoals = (data.dailyGoals || []).map(g => {
            if (g.id === id) {
                const currentStatus = g.doneDates?.[todayIST] || false;
                return { ...g, doneDates: { ...(g.doneDates || {}), [todayIST]: !currentStatus } };
            }
            return g;
        });
        
        const todaysTasks = updatedGoals.filter(g => g.isRecurring || g.date === todayIST);
        const completedCount = todaysTasks.filter(g => g.doneDates?.[todayIST]).length;
        const percent = todaysTasks.length > 0 ? Math.round((completedCount / todaysTasks.length) * 100) : 0;

        setData(prev => ({ 
            ...prev, dailyGoals: updatedGoals,
            goalsHistory: { ...(prev.goalsHistory || {}), [todayIST]: percent } 
        }));
    };

    const deleteGoal = (id) => {
        const updatedGoals = (data.dailyGoals || []).filter(g => g.id !== id);
        setData(prev => ({ ...prev, dailyGoals: updatedGoals }));
        showToast("Goal deleted");
    };

    // --- ENHANCED GRAPH LOGIC ---
    useEffect(() => {
        if (!goalChartRef.current || typeof Chart === 'undefined') return;
        
        const history = data.goalsHistory || {};
        const labels = [];
        const dataPoints = [];
        const today = new Date();
        const formatDateKey = (d) => d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        // Logic to clear old chart before drawing new one
        const chartInstance = Chart.getChart(goalChartRef.current);
        if (chartInstance) chartInstance.destroy();

        // 1. WEEK VIEW
        if (graphMode === 'WEEK') {
            const currentDay = today.getDay(); // 0-6
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - currentDay + (graphOffset * 7));
            
            // Label update
            const endOfWeek = new Date(startOfWeek);
            endOfWeek.setDate(startOfWeek.getDate() + 6);
            setGraphLabel(`${startOfWeek.getDate()} ${startOfWeek.toLocaleDateString('en-US', {month:'short'})} - ${endOfWeek.getDate()} ${endOfWeek.toLocaleDateString('en-US', {month:'short'})}`);

            for (let i = 0; i < 7; i++) {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + i);
                labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
                dataPoints.push(history[formatDateKey(d)] || 0);
            }
        } 
        // 2. MONTH VIEW
        else if (graphMode === 'MONTH') {
            const targetDate = new Date(today.getFullYear(), today.getMonth() + graphOffset, 1);
            const daysInMonth = new Date(targetDate.getFullYear(), targetDate.getMonth() + 1, 0).getDate();
            
            // Label update (e.g. "February 2026")
            setGraphLabel(targetDate.toLocaleDateString('en-US', { month: 'long', year: 'numeric' }));

            for(let i=1; i<=daysInMonth; i++) {
                const d = new Date(targetDate.getFullYear(), targetDate.getMonth(), i);
                labels.push(i); // 1, 2, 3...
                dataPoints.push(history[formatDateKey(d)] || 0);
            }
        } 
        // 3. YEAR VIEW
        else if (graphMode === 'YEAR') {
            const targetYear = today.getFullYear() + graphOffset;
            setGraphLabel(`${targetYear}`);

            for(let m=0; m<12; m++) {
                labels.push(new Date(targetYear, m, 1).toLocaleDateString('en-US', { month: 'short' }));
                
                // Calculate Monthly Avg
                let sum = 0, count = 0;
                // Simple regex check for keys starting with YYYY-MM
                const prefix = `${targetYear}-${String(m+1).padStart(2, '0')}`;
                Object.keys(history).forEach(key => {
                    if(key.startsWith(prefix)) {
                        sum += history[key];
                        count++;
                    }
                });
                dataPoints.push(count > 0 ? Math.round(sum/count) : 0);
            }
        }

        // DRAW CHART
        new Chart(goalChartRef.current, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: 'Success %',
                    data: dataPoints,
                    borderColor: '#0F766E', // Primary Teal color
                    backgroundColor: 'rgba(15, 118, 110, 0.1)',
                    borderWidth: 3,
                    tension: 0.4,
                    pointRadius: graphMode === 'MONTH' ? 1 : 4,
                    pointBackgroundColor: '#fff',
                    pointBorderColor: '#0F766E',
                    fill: true
                }]
            },
            options: { 
                responsive: true, 
                maintainAspectRatio: false, 
                scales: { 
                    y: { 
                        beginAtZero: true, 
                        max: 100, 
                        grid: { color: '#f3f4f6' },
                        ticks: { font: { size: 10 } }
                    },
                    x: { 
                        grid: { display: false },
                        ticks: { font: { size: 10 }, maxRotation: 0, autoSkip: true, maxTicksLimit: 14 }
                    }
                },
                plugins: { legend: { display: false } },
                interaction: { intersect: false, mode: 'index' }
            }
        });

    }, [data.goalsHistory, graphMode, graphOffset]);

    const progressPercent = goals.length > 0 ? Math.round((goals.filter(g => g.doneDates?.[viewDate]).length / goals.length) * 100) : 0;

    // --- STYLES ---
// --- STYLES (Updated for Clickability) ---
    const activeBtnStyle = {
        background: '#0F766E', color: 'white', border: 'none',
        borderRadius: '6px', padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer',
        position: 'relative', zIndex: 50, boxShadow: '0 2px 5px rgba(15, 118, 110, 0.3)'
    };
    
    const inactiveBtnStyle = {
        background: '#f3f4f6', color: '#666', border: '1px solid #e5e7eb',
        borderRadius: '6px', padding: '6px 12px', fontSize: '0.85rem', fontWeight: 'bold', cursor: 'pointer',
        position: 'relative', zIndex: 50
    };
    
    const navBtnStyle = {
        background: '#ffffff', color: '#333', border: '1px solid #e5e7eb', borderRadius: '50%',
        width: '32px', height: '32px', fontSize: '1.2rem', cursor: 'pointer',
        display: 'flex', alignItems: 'center', justifyContent: 'center', paddingBottom: '3px',
        position: 'relative', zIndex: 50, boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
    };
// --- NEW MARQUEE STYLE ---
    const marqueeStyle = `
        .scrolling-strip-container {
            width: 100%;
            overflow: hidden;
            background: #FEF3C7; /* Light Yellow */
            border-bottom: 2px solid #F59E0B;
            margin-bottom: 20px;
            border-radius: 8px;
            padding: 8px 0;
        }
        .scrolling-text {
            display: inline-block;
            white-space: nowrap;
            color: #92400E; /* Dark Brown/Orange */
            font-weight: 700;
            font-size: 0.9rem;
            animation: scroll-left 15s linear infinite;
            padding-left: 100%;
        }
        @keyframes scroll-left {
            0% { transform: translateX(0); }
            100% { transform: translateX(-100%); }
        }
    `;
    return React.createElement('div', { className: 'container daily-goals-page' },
                               // 1. Style Inject
        React.createElement('style', null, marqueeStyle),
        // 2. Scrolling Strip
        React.createElement('div', { className: 'scrolling-strip-container' },
            React.createElement('div', { className: 'scrolling-text' }, 
                "💡 Tips: Set target before sleep for the next day. Believe me, focus will increase! 🚀"
            )
        ),
        React.createElement('div', { className: 'nav-breadcrumb' },
            React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('home') }, 'Home'),
            React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
            React.createElement('span', { className: 'breadcrumb-item active' }, 'Daily Goals')
        ),

        // Header Card
        React.createElement('div', { className: 'goals-header-card' },
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', gap: '15px' } },
                React.createElement('div', null,
                    React.createElement('h2', { className: 'logo', style: { fontSize: '2.5rem', marginBottom: '5px' } }, 'Targets'),
                    React.createElement('p', { style: { color: 'var(--text-light)', fontWeight: '700' } }, 
                        isToday ? "📅 Today's List" : `📅 List for ${viewDate.split('-').reverse().join('/')}`
                    )
                ),
                React.createElement('div', { className: 'date-picker-wrapper' },
                    React.createElement('input', { 
                        type: 'date', className: 'date-input-modern',
                        value: viewDate, onChange: (e) => setViewDate(e.target.value)
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

        !isToday && React.createElement('div', { className: 'lock-banner' }, 
            `🔒 ${viewDate < todayIST ? 'History View' : 'Future Plan'}`
        ),

        // --- ENHANCED GRAPH CARD ---
        React.createElement('div', { className: 'card', style: { marginBottom: '2rem', padding: '20px' } },
            // Title Row
            React.createElement('div', { style: { display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '10px' } },
                React.createElement('div', null,
                    React.createElement('h3', { style: { fontSize: '1.1rem', fontWeight: '800', margin: 0, display:'flex', alignItems:'center', gap:'6px' } }, 
                        '📈 Consistency',
                        React.createElement('span', { style: { fontSize:'0.75rem', color:'#0F766E', background:'#ccfbf1', padding:'2px 8px', borderRadius:'10px' } }, graphLabel)
                    )
                ),
                // Controls
                React.createElement('div', { style: { display: 'flex', alignItems: 'center', gap: '8px' } },
                    React.createElement('button', { style: navBtnStyle, onClick: () => setGraphOffset(graphOffset - 1) }, '‹'),
                    React.createElement('div', { style: { display: 'flex', gap: '4px', background:'#f9fafb', padding:'4px', borderRadius:'8px', border:'1px solid #eee' } },
                        React.createElement('button', { style: graphMode === 'WEEK' ? activeBtnStyle : inactiveBtnStyle, onClick: () => { setGraphMode('WEEK'); setGraphOffset(0); } }, 'W'),
                        React.createElement('button', { style: graphMode === 'MONTH' ? activeBtnStyle : inactiveBtnStyle, onClick: () => { setGraphMode('MONTH'); setGraphOffset(0); } }, 'M'),
                        React.createElement('button', { style: graphMode === 'YEAR' ? activeBtnStyle : inactiveBtnStyle, onClick: () => { setGraphMode('YEAR'); setGraphOffset(0); } }, 'Y')
                    ),
                    React.createElement('button', { style: navBtnStyle, onClick: () => setGraphOffset(graphOffset + 1) }, '›')
                )
            ),
            
            // Canvas
            React.createElement('div', { style: { height: '200px' } },
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
                            display: 'flex', alignItems: 'center', justifyContent: 'center',
                            background: goal.doneDates?.[viewDate] ? 'var(--primary)' : 'transparent',
                            border: `2px solid ${goal.doneDates?.[viewDate] ? 'var(--primary)' : '#ccc'}`,
                            borderRadius: '6px', color: 'white', fontSize: '14px', fontWeight: 'bold',
                            minWidth: '24px', minHeight: '24px'
                        }
                    }, goal.doneDates?.[viewDate] ? '✓' : ''),
                    React.createElement('div', { className: 'goal-icon-circle' }, goal.icon),
                    React.createElement('div', { className: 'goal-content' },
                        React.createElement('span', { className: 'goal-title' }, goal.title),
                        React.createElement('span', { className: 'goal-desc' }, goal.isRecurring ? '🔄 Recurring' : (goal.desc || 'No description'))
                    ),
                    isToday && React.createElement('button', { 
                        className: 'delete-goal-btn', 
                        onClick: (e) => { e.stopPropagation(); deleteGoal(goal.id); } 
                    }, '🗑️')
                )
            ))
        ),

        // Add Button
        viewDate >= todayIST && React.createElement('button', { 
            className: 'btn btn-primary', 
            style: {
                position: 'fixed', bottom: '25px', left: '50%', transform: 'translateX(-50%)',
                width: '90%', maxWidth: '400px', borderRadius: '50px', zIndex: '100',
                background: 'var(--secondary)', boxShadow: '0 8px 20px rgba(245, 158, 11, 0.4)'
            },
            onClick: () => { setNewGoal({...newGoal, date: viewDate}); setShowAddModal(true); }
        }, '+ New Target'),

        // Add Modal
        showAddModal && React.createElement('div', { className: 'modal' },
            React.createElement('div', { className: 'modal-content glass-modal' },
                React.createElement('button', { className: 'modal-close-x', onClick: () => setShowAddModal(false) }, '×'),
                React.createElement('h3', { className: 'custom-modal-header' }, 
                    React.createElement('span', { className: 'target-icon' }, '🎯'), ' New Target'
                ),
                React.createElement('div', { className: 'input-group' },
                    React.createElement('label', null, 'Goal Name'),
                    React.createElement('input', { 
                        className: 'input-style', value: newGoal.title, 
                        onChange: e => setNewGoal({...newGoal, title: e.target.value}), placeholder: 'Running, Physics, etc.' 
                    })
                ),
                React.createElement('div', { className: 'input-group' },
                    React.createElement('label', null, 'Description'),
                    React.createElement('textarea', { 
                        className: 'input-style', style: { minHeight: '80px', resize: 'none' },
                        value: newGoal.desc, onChange: e => setNewGoal({...newGoal, desc: e.target.value})
                    })
                ),
                React.createElement('div', { className: 'input-group' },
                    React.createElement('label', null, 'Icon'),
                    React.createElement('select', { 
                        className: 'input-style', value: newGoal.icon, onChange: e => setNewGoal({...newGoal, icon: e.target.value})
                    }, ['📖', '🧪', '🧬', '📐', '📝', '🎯', '🔥', '💪'].map(emoji => React.createElement('option', { key: emoji, value: emoji }, emoji)))
                ),
                React.createElement('div', { className: 'active-for-container' },
                    React.createElement('div', { className: 'active-for-row' },
                        React.createElement('span', { className: 'active-for-title' }, 'ACTIVE FOR ALL MONTH '),
                        React.createElement('label', { className: 'habit-checkbox-wrapper' },
                            React.createElement('input', { 
                                type: 'checkbox', checked: newGoal.isRecurring,
                                onChange: (e) => setNewGoal({...newGoal, isRecurring: e.target.checked})
                            }),
                            React.createElement('span', { className: 'habit-checkbox-text' }, 'Daily Habit')
                        )
                    )
                ),
                React.createElement('div', { className: 'modal-buttons' },
                    React.createElement('button', { className: 'btn btn-cancel', onClick: () => setShowAddModal(false) }, 'Cancel'),
                    React.createElement('button', { className: 'btn btn-save-target', onClick: addGoal }, 'Save')
                )
            )
        )
    );
};

const TestAnalysisView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion, triggerRevision, view, compressImage } = ctx;

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
            // Destroy existing chart instance before creating a new one
            const existingLineChart = Chart.getChart(lineRef.current);
            if (existingLineChart) existingLineChart.destroy();
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
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('home') }, 'Home'),
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
                React.createElement('button', { className: 'btn-action secondary', onClick: () => navigateTo('error-book') }, '📖 Open Error Book')
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
// --- UPDATED STOPWATCH VIEW (With Wake Lock & Midnight Background Sync) ---
const StopwatchView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion, triggerRevision, view, compressImage } = ctx;

    const [now, setNow] = useState(Date.now());
    const [graphMode, setGraphMode] = useState('WEEK');
    const [graphOffset, setGraphOffset] = useState(0);
    // isFocusMode lives in App state (line ~294) - NOT here
    // Reason: StopwatchView is inside App's function body, so every setData()
    // call causes App to re-render, creating a NEW StopwatchView function ref,
    // forcing React to unmount+remount it and wiping all local state.
    // App-level isFocusMode survives all re-renders completely.
    
    const chartRef = React.useRef(null);
    const wakeLockRef = React.useRef(null); // Screen Sleep Fix

    const getTodayStr = () => new Date().toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
    const { isRunning = false, startTime = null, elapsed = 0, laps = [] } = data.timerState || {};

    // --- 1. SCREEN WAKE LOCK (Sleep Fix) ---
    const requestWakeLock = async () => {
        if ('wakeLock' in navigator && isRunning) {
            try {
                wakeLockRef.current = await navigator.wakeLock.request('screen');
            } catch (err) { console.log("WakeLock Error:", err); }
        }
    };

    // --- 2. MIDNIGHT SYNC LOGIC (Background Fix) ---
    const syncTimerAcrossMidnight = () => {
        const nowTs = Date.now();
        const startOfToday = new Date();
        startOfToday.setHours(0, 0, 0, 0);
        const startOfTodayTs = startOfToday.getTime();

        const todayStr = getTodayStr();
        const yesterday = new Date(startOfTodayTs - 86400000).toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });

        // CASE A: Timer chal raha tha aur 12 baj gaye
        if (isRunning && startTime && startTime < startOfTodayTs) {
            const yesterdaySeconds = Math.floor((startOfTodayTs - startTime) / 1000);
            setData(prev => ({
                ...prev,
                studyHistory: { ...prev.studyHistory, [yesterday]: (prev.studyHistory?.[yesterday] || 0) + yesterdaySeconds + elapsed },
                timerState: { ...prev.timerState, startTime: startOfTodayTs, elapsed: 0, laps: [`🌙 Midnight Split`, ...prev.timerState.laps] }
            }));
            showToast("Day Change: Time Split! 🌙");
        } 
        // CASE B: Timer paused tha lekin 12 baj gaye (Reset Today)
        else if (!isRunning && elapsed > 0 && data.lastActiveDate !== todayStr) {
            const lastDate = data.lastActiveDate || yesterday;
            setData(prev => ({
                ...prev,
                studyHistory: { ...prev.studyHistory, [lastDate]: (prev.studyHistory?.[lastDate] || 0) + elapsed },
                timerState: { ...prev.timerState, elapsed: 0, laps: [] },
                lastActiveDate: todayStr
            }));
            showToast("New Day Started! ☀️");
        }
    };

    // --- 3. EFFECTS ---
    // ✅ ISSE PASTE KAREIN (Naya Background Sync Logic)
    useEffect(() => {
        // 1. Initial Check
        syncTimerAcrossMidnight(); 
        
        const handleVisibility = () => {
            if (document.visibilityState === 'visible') {
                // Jab user wapas app me aaye, toh check karo timer sahi hai ya nahi
                syncTimerAcrossMidnight();
                requestWakeLock();
                
                // Force UI update
                setNow(Date.now());
            } else if (document.visibilityState === 'hidden' && isRunning) {
                // Jab user app minimize kare, toh current progress save kar lo
                // Taaki agar OS app kill kar de, toh data save rahe
                const currentElapsed = elapsed + (startTime ? Math.floor((Date.now() - startTime) / 1000) : 0);
                const dateStr = getTodayStr();
                
                // Hum state update nahi kar rahe, seedha data object me changes push kar rahe hain
                // taaki 'Smart Save' usse pick kar le
                setData(prev => ({
                   ...prev,
                   lastActiveDate: dateStr
                   // Note: Hum yahan timer stop nahi kar rahe, bas state sync kar rahe hain
                }));
            }
        };

        document.addEventListener('visibilitychange', handleVisibility);
        return () => document.removeEventListener('visibilitychange', handleVisibility);
    }, [isRunning, startTime, elapsed]); // Dependencies updated

    useEffect(() => {
        let interval = null;
        if (isRunning) {
            requestWakeLock();
            interval = setInterval(() => setNow(Date.now()), 1000);
        } else {
            if (wakeLockRef.current) wakeLockRef.current.release();
        }
        return () => {
            clearInterval(interval);
            if (wakeLockRef.current) wakeLockRef.current.release();
        };
    }, [isRunning]);

    // Graph aur Baaki code same rahega...
    useEffect(() => {
        if (!chartRef.current || typeof Chart === 'undefined') return;
        const history = data.studyHistory || {};
        const labels = [], dataPoints = [];
        const today = new Date();
        
        if (graphMode === 'WEEK') {
            const currentDay = today.getDay(); 
            const startOfWeek = new Date(today);
            startOfWeek.setDate(today.getDate() - currentDay + (graphOffset * 7));

            for (let i = 0; i < 7; i++) {
                const d = new Date(startOfWeek);
                d.setDate(startOfWeek.getDate() + i);
                const dateStr = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
                labels.push(d.toLocaleDateString('en-US', { weekday: 'short' }));
                dataPoints.push(((history[dateStr] || 0) / 3600).toFixed(2)); 
            }
        } else {
             const targetMonth = new Date(today.getFullYear(), today.getMonth() + graphOffset, 1);
             const daysInMonth = new Date(targetMonth.getFullYear(), targetMonth.getMonth() + 1, 0).getDate();
             for(let i=1; i<=daysInMonth; i++) {
                 const d = new Date(targetMonth.getFullYear(), targetMonth.getMonth(), i);
                 const dateStr = d.toLocaleDateString('en-CA', { timeZone: 'Asia/Kolkata' });
                 labels.push(i);
                 dataPoints.push(((history[dateStr] || 0) / 3600).toFixed(2));
             }
        }
        
        const chartInstance = Chart.getChart(chartRef.current);
        if (chartInstance) chartInstance.destroy();

        new Chart(chartRef.current, {
            type: 'bar',
            data: { labels, datasets: [{ label: 'Hours', data: dataPoints, backgroundColor: '#3b82f6', borderRadius: 4, barPercentage: 0.6 }] },
            options: { 
                responsive: true, maintainAspectRatio: false, 
                scales: { y: { beginAtZero: true, grid: { color: '#333' }, ticks: { color: '#888' } }, x: { grid: { display: false }, ticks: { color: '#888' } } }, 
                plugins: { legend: { display: false } } 
            }
        });
    }, [data.studyHistory, graphMode, graphOffset, isRunning]);

    // Display Values
    const totalSeconds = elapsed + (isRunning && startTime ? Math.floor((now - startTime) / 1000) : 0);
    const h = Math.floor(totalSeconds / 3600).toString().padStart(2, '0');
    const m = Math.floor((totalSeconds % 3600) / 60).toString().padStart(2, '0');
    const s = (totalSeconds % 60).toString().padStart(2, '0');

    // Handlers
    const handleStop = (e) => {
        if(e) e.stopPropagation();
        if (!isRunning) return;
        const sessionSecs = Math.floor((Date.now() - startTime) / 1000);
        const dateStr = getTodayStr();
        setData(p => ({ 
            ...p, 
            studyHistory: { ...p.studyHistory, [dateStr]: (p.studyHistory?.[dateStr] || 0) + sessionSecs }, 
            timerState: { ...p.timerState, isRunning: false, startTime: null, elapsed: elapsed + sessionSecs },
            lastActiveDate: dateStr
        }));
    };

    const handleStart = (e) => {
        if(e) e.stopPropagation();
        const dateStr = getTodayStr();
        setData(p => ({ ...p, timerState: { ...p.timerState, isRunning: true, startTime: Date.now() }, lastActiveDate: dateStr }));
    };
    
    const handleReset = (e) => { 
        if(e) e.stopPropagation();
        setModalConfig({
            title: 'Hard Reset?',
            message: 'Resetting will CLEAR today\'s entire progress graph and timer. Confirm?',
            onConfirm: () => {
                const dateStr = getTodayStr();
                setData(p => ({ 
                    ...p, 
                    studyHistory: { ...p.studyHistory, [dateStr]: 0 },
                    timerState: { isRunning: false, startTime: null, elapsed: 0, laps: [] } 
                }));
                setShowModal(false);
                showToast("Timer & Graph Reset for Today");
            }
        });
        setShowModal(true);
    };

    const handleLap = (e) => {
        if(e) e.stopPropagation();
        setData(p => ({ ...p, timerState: { ...p.timerState, laps: [`${h}:${m}:${s}`, ...p.timerState.laps] } }));
    };

    // CSS-ONLY fullscreen toggle — NO browser requestFullscreen() API.
    // Why: requestFullscreen() on mobile Chrome/Android auto-exits whenever ANY
    // button click triggers setData() -> App re-render -> DOM mutation.
    // The browser's fullscreen system sees DOM changes as "user left fullscreen"
    // and fires fullscreenchange exit. No amount of stopPropagation fixes this.
    // Solution: position:fixed overlay via CSS class. Pure React state — zero
    // browser fullscreen API involvement — completely immune to re-render exits.
    const toggleFullScreen = () => {
        setIsFocusMode(prev => !prev);
    };

    // ESC key exits CSS fullscreen
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape' && isFocusMode) setIsFocusMode(false);
        };
        document.addEventListener('keydown', handleKeyDown);
        return () => document.removeEventListener('keydown', handleKeyDown);
    }, [isFocusMode]);

    // Lock body scroll when fullscreen active, restore on exit
    useEffect(() => {
        if (isFocusMode) {
            document.body.style.overflow = 'hidden';
        } else {
            document.body.style.overflow = '';
        }
        return () => { document.body.style.overflow = ''; };
    }, [isFocusMode]);

    // --- NEW CSS: ORIENTATION AWARE SCALING ---
// --- FINAL CSS: SCALING LOGIC (VMIN + Font Fix) ---
    const fixedStyles = `
        /* 1. DEFAULT DESKTOP (Normal Mode) */
        .flip-clock { display: flex; gap: 15px; justify-content: center; margin-bottom: 2rem; }
        .flip-unit-container {
            display: flex; justify-content: center; align-items: center; position: relative;
            width: 120px; height: 160px; background-color: #202020; border-radius: 12px;
            font-size: 90px; font-family: 'Manrope', sans-serif; color: #e5e5e5;
            box-shadow: 0 10px 30px rgba(0,0,0,0.5); overflow: hidden;
        }
        .static-card { width: 30px; height: 160px; font-size: 70px; display: flex; align-items: center; justify-content: center; color: #666; }
        .upper-card, .lower-card { display: flex; justify-content: center; width: 100%; height: 50%; overflow: hidden; position: absolute; left: 0; background-color: #202020; }
        .upper-card { top: 0; align-items: flex-end; border-bottom: 2px solid #000; border-top-left-radius: 12px; border-top-right-radius: 12px; }
        .lower-card { bottom: 0; align-items: flex-start; border-bottom-left-radius: 12px; border-bottom-right-radius: 12px; }
        .upper-card span { transform: translateY(50%); } 
        .lower-card span { transform: translateY(-50%); }

        /* Graph Controls */
        .chart-controls-fixed { display: flex; align-items: center; justify-content: center; gap: 15px; margin-bottom: 15px; position: relative; z-index: 50; }
        .chart-nav-btn { background: #262626; border: 1px solid #404040; color: white; width: 38px; height: 38px; border-radius: 50%; font-size: 1.5rem; cursor: pointer; display: flex; align-items: center; justify-content: center; padding-bottom: 4px; }
        .chart-filter-group { display: flex; background: #262626; padding: 4px; border-radius: 8px; border: 1px solid #404040; }
        .chart-filter-btn { background: transparent; border: none; color: #a3a3a3; padding: 6px 16px; border-radius: 6px; font-weight: 700; font-size: 0.85rem; cursor: pointer; }
        .chart-filter-btn.active { background: #3b82f6; color: white; }

        /* 2. MOBILE VIEW (Normal Mode) */
        @media (max-width: 600px) {
            .flip-clock { gap: 1vw; }
            .flip-unit-container { width: 26vw; height: 38vw; font-size: 20vw; }
            .static-card { width: 4vw; height: 38vw; font-size: 16vw; }
            .btn-circle { width: 65px; height: 65px; font-size: 0.8rem; }
        }

        /* 3. CSS FULLSCREEN MODE - position:fixed, NO browser Fullscreen API */
        /* Immune to button-click exits that break requestFullscreen on mobile */
        .stopwatch-page.fullscreen-mode {
            position: fixed !important;
            top: 0 !important; left: 0 !important;
            width: 100vw !important; height: 100vh !important;
            z-index: 9999 !important;
            background: black !important;
            display: flex !important; flex-direction: column !important;
            justify-content: center !important; align-items: center !important;
            overflow: hidden !important;
        }
        .stopwatch-page.fullscreen-mode .stopwatch-container {
            width: 100%; height: 100%;
            display: flex; flex-direction: column;
            justify-content: center; align-items: center;
            padding: 0; margin: 0; max-width: none;
        }

        /* Top 70% Clock */
        .stopwatch-page.fullscreen-mode .flip-clock {
            flex: 7; width: 100%;
            display: flex; justify-content: center; align-items: center;
            margin: 0; gap: 2vmin;
        }
        .stopwatch-page.fullscreen-mode .flip-unit-container {
            width: 26vmin; height: 36vmin;
            font-size: 20vmin; /* Reduced from 24 to 20 */
            border-radius: 3vmin;
        }
        .stopwatch-page.fullscreen-mode .static-card { width: 6vmin; height: 36vmin; font-size: 16vmin; }
        
        /* Bottom 30% Buttons */
        .stopwatch-page.fullscreen-mode .stopwatch-controls {
            flex: 3; width: 100%;
            display: flex; justify-content: center; align-items: flex-start;
            padding-top: 2vh; gap: 5vw;
        }

        /* --- ORIENTATION RULES --- */
        
        /* PORTRAIT (Phone Seedha) */
        @media (orientation: portrait) {
            .stopwatch-page.fullscreen-mode .flip-unit-container {
                width: 28vw; height: 38vw;
                font-size: 20vw; /* Reduced from 28 to 20 */
                border-radius: 4vw;
            }
            .stopwatch-page.fullscreen-mode .static-card { width: 5vw; height: 38vw; font-size: 15vw; }
            .stopwatch-page.fullscreen-mode .btn-circle { width: 20vw; height: 20vw; font-size: 4vw; }
        }

        /* LANDSCAPE (Phone Teda / Laptop) */
        @media (orientation: landscape) {
            .stopwatch-page.fullscreen-mode .flip-unit-container {
                height: 50vh; width: 36vh;
                font-size: 30vh; /* Reduced from 40 to 30 */
                border-radius: 4vh;
            }
            .stopwatch-page.fullscreen-mode .static-card { height: 50vh; width: 5vh; font-size: 25vh; }
            .stopwatch-page.fullscreen-mode .btn-circle { height: 15vh; width: 15vh; font-size: 2.5vh; }
        }
    `;

    return React.createElement('div', { 
        className: `stopwatch-page ${isFocusMode ? 'fullscreen-mode' : ''}` 
    },
        React.createElement('style', null, fixedStyles),

        // Top Bar
        !isFocusMode && React.createElement('div', { style: { padding: '20px', display: 'flex', justifyContent: 'space-between', width: '100%', maxWidth: '1000px', margin: '0 auto' } },
            React.createElement('button', { onClick: () => navigateTo('home'), style: { background: 'none', border: 'none', color: '#fff', fontSize: '1.2rem', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' } }, '← Back'),
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
                // Graph
                React.createElement('div', { className: 'stats-container' },
                    React.createElement('div', { className: 'chart-controls-fixed' },
                        React.createElement('button', { className: 'chart-nav-btn', onClick: () => setGraphOffset(graphOffset - 1) }, '‹'),
                        React.createElement('div', { className: 'chart-filter-group' }, 
                            React.createElement('button', { className: `chart-filter-btn ${graphMode === 'WEEK'?'active':''}`, onClick: () => {setGraphMode('WEEK'); setGraphOffset(0)} }, 'Week'), 
                            React.createElement('button', { className: `chart-filter-btn ${graphMode === 'MONTH'?'active':''}`, onClick: () => {setGraphMode('MONTH'); setGraphOffset(0)} }, 'Month')
                        ),
                        React.createElement('button', { className: 'chart-nav-btn', onClick: () => setGraphOffset(graphOffset + 1) }, '›')
                    ),
                    React.createElement('div', { style: { height: '220px' } }, React.createElement('canvas', { ref: chartRef }))
                )
            )
        )
    );
};
const ErrorBookView = (ctx) => {
    const { data, setData, currentExam, setCurrentExam, user, navigateTo, changeExam, showToast, setShowModal, setModalConfig, getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics, getChapters, getSubjectClass, updateChapterData, addCustomChapter, exportData, importData, selectedClass, setSelectedClass, selectedSubject, setSelectedSubject, selectedChapter, setSelectedChapter, editMode, setEditMode, isFocusMode, setIsFocusMode, forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion } = ctx;
        const [f, setF] = useState({ tid: '', sub: 'Physics', search: '' });
        const [showAdd, setShowAdd] = useState(false);
        const [m, setM] = useState({ type: 'Silly Mistake', img1: '', img2: '', myMistake: '', correctLogic: '' });
        const [isUploading, setIsUploading] = useState(false);
        const [fileTargets, setFileTargets] = useState({ q: null, s: null });

        const uploadToCloudinary = async (file, retries = 2) => {
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            const formData = new FormData();
            formData.append('file', file, 'photo.jpg');
            formData.append('upload_preset', UPLOAD_PRESET);

            // 30 second timeout — slow net pe hang nahi karega
            const controller = new AbortController();
            const timeout = setTimeout(() => controller.abort(), 30000);

            const res = await fetch(`https://api.cloudinary.com/v1_1/${CLOUD_NAME}/image/upload`, {
                method: 'POST',
                body: formData,
                signal: controller.signal
            });
            clearTimeout(timeout);

            const resData = await res.json();

            // Cloudinary ka actual error dikhao
            if (resData.error) throw new Error('Cloudinary: ' + resData.error.message);
            if (!resData.secure_url) throw new Error('No URL returned from Cloudinary');

            return resData.secure_url;

        } catch (err) {
            const isLast = attempt === retries;
            if (err.name === 'AbortError') {
                if (isLast) throw new Error('Upload timeout! Internet slow hai, baad mein try karein.');
            } else if (isLast) {
                throw err; // Final attempt fail — error upar bhejo
            }
            // Retry se pehle 2 second wait
            await new Promise(r => setTimeout(r, 2000));
        }
    }
};
        const filtered = (data.mistakes || []).filter(x => {
            const matchTest = f.tid ? String(x.tid) === String(f.tid) : true;
            const matchSub = x.sub === f.sub;
            const matchSearch = x.myMistake ? x.myMistake.toLowerCase().includes(f.search.toLowerCase()) : true;
            return matchTest && matchSub && matchSearch;
        });
        const toggleMastery = (id) => {
            setData(p => ({ ...p, mistakes: p.mistakes.map(x => x.id === id ? {...x, mastered: !x.mastered} : x) }));
            showToast('Status updated!');
        };
        return React.createElement('div', { className: 'container' },
            React.createElement('div', { className: 'nav-breadcrumb' },
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('home') }, 'Home'),
                React.createElement('span', { className: 'breadcrumb-separator' }, '/'),
                React.createElement('span', { className: 'breadcrumb-item', onClick: () => navigateTo('test-analysis') }, 'Test Analysis'),
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
const App = () => {
 // --- AKELA AUR SAHI SYNC LOGIC ---
    const [user, setUser] = useState(null);
    const [currentExam, setCurrentExam] = useState(() => localStorage.getItem('currentExam') || null);
    // BUG FIX: agar currentExam null/empty hai toh kabhi bhi lastView mat use karo - hamesha exam-select se shuru karo
    const [view, setView] = useState(() => {
        const savedExam = localStorage.getItem('currentExam');
        if (!savedExam || savedExam === '') return 'exam-select';
        return localStorage.getItem('lastView') || 'home';
    });
const [selectedClass, setSelectedClass] = useState(() => localStorage.getItem('lastClass') || null);
const [selectedSubject, setSelectedSubject] = useState(() => localStorage.getItem('lastSubject') || null);
const [selectedChapter, setSelectedChapter] = useState(() => localStorage.getItem('lastChapter') || null);
    const [data, setData] = useState({ 
        NEET: {}, JEE: {}, dailyGoals: [], tests: [], mistakes: [] ,studyHistory: {}, 
        timerState: { isRunning: false, startTime: null, elapsed: 0, laps: [] },
        syllabusCustom: {}
    });
    // Track custom chapters in state so mutations to EXAM_SYLLABUS trigger re-renders
    const [customChapterVersion, setCustomChapterVersion] = useState(0);
    const forceChapterRefresh = () => setCustomChapterVersion(v => v + 1);
    const [activeNotif, setActiveNotif] = useState(null);
    const [notifShow, setNotifShow] = useState(false);
    const [editMode, setEditMode] = useState(false);
    const [showModal, setShowModal] = useState(false);
    const [modalConfig, setModalConfig] = useState({});
    const [toast, setToast] = useState({ show: false, message: '' });
    const [isFetched, setIsFetched] = useState(false);
    // isFocusMode at App level so it survives StopwatchView unmount/remount on every setData() call
    const [isFocusMode, setIsFocusMode] = useState(false);
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
                    canvas.toBlob((blob) => resolve(blob), 'image/jpeg', 0.5);
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
        const pendingCount = (data.mistakes || []).filter(m => !m.mastered).length;
        if (pendingCount === 0) return;
        const init = setTimeout(triggerRevision, 8000); // Page load ke 8 sec baad
        const loop = setInterval(triggerRevision, 900000); // Har 15 min
        return () => { clearTimeout(init); clearInterval(loop); };
    }, [isFetched, data.mistakes]);
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

// ============================================================
// OPTIMIZATION v3: SMART CACHE + MULTI-DEVICE SYNC
// 1. localStorage cache check karo first (2 min fresh = skip Firestore read)
// 2. Cache miss tabhi Firestore fetch karo
// 3. Stale-while-revalidate: show cache instantly, refresh in background (30 sec threshold)
// 4. NEW: Har 2 min mein background poll — dusre device ka data aayega
//    (Read cost: 1 read/2min = 720 reads/day — well within 50,000 free limit)
// 5. NEW: _lastSaved timestamp comparison — only update UI if remote is newer
// 6. NEW: Visibility change pe turant sync — jab phone unlock ho ya tab switch ho
// ============================================================
const CACHE_TTL_MS = 2 * 60 * 1000; // 2 minutes — checkbox click ke 2 min baad ya app close pe Firestore save hoga
// PRO FIX: Background auto-poll REMOVED — not needed. User manually refreshes on other device.
// This was causing extra Firestore reads for no benefit.

// 3. LOAD DATA — Cache-First Strategy
useEffect(() => {
    const loadFromDB = async () => {
        if (!user || !window.db || !window.dbFuncs) return;

        const cacheKey = 'localDataBackup_' + user.uid;
        const cacheTimeKey = 'localDataTime_' + user.uid;
        const cachedRaw = localStorage.getItem(cacheKey);
        const cachedTime = parseInt(localStorage.getItem(cacheTimeKey) || '0', 10);
        const nowTs = Date.now();
        const isCacheFresh = cachedRaw && (nowTs - cachedTime) < CACHE_TTL_MS;

        // Helper to restore currentExam from data
        const restoreExamLocal = (parsedData) => {
            const lsExam = localStorage.getItem('currentExam');
            const fsExam = parsedData?._currentExam || '';
            const restoredExam = (lsExam && lsExam !== '') ? lsExam : (fsExam !== '' ? fsExam : null);
            if (restoredExam) {
                setCurrentExam(restoredExam);
                localStorage.setItem('currentExam', restoredExam);
                setView(prev => (prev === 'exam-select' ? 'home' : prev));
            }
        };

        if (isCacheFresh) {
            // CACHE HIT: Firestore read skip karo — instant load from phone memory
            console.log("✅ Cache Hit — Firestore read skipped (bandwidth saved)");
            try {
                const parsed = JSON.parse(cachedRaw);
                parsed.timerState = { ...parsed.timerState, isRunning: false, startTime: null };
                const safeData = {
                    NEET: {}, JEE: {}, dailyGoals: [], tests: [], mistakes: [],
                    studyHistory: {}, syllabusCustom: {},
                    ...parsed, timerState: parsed.timerState
                };
                setData(safeData);
                restoreExamLocal(safeData);
                setIsFetched(true);

                // PRO FIX: Stale-while-revalidate REMOVED — was triggering extra Firestore read 
                // after just 30 seconds even when cache was fresh. Not needed for this app's design.
                // Dusre device pe user manually refresh karega — auto background read band kiya.
                return;
            } catch(parseErr) {
                console.error("Cache parse error, falling back to Firestore:", parseErr);
                // Cache corrupt — fall through to Firestore fetch below
            }
        }

        // CACHE MISS or STALE: Firestore se fetch karo
        console.log("🔥 Firestore fetch (cache miss/expired)");
        try {
            const { doc, getDoc } = window.dbFuncs;
            const docRef = doc(window.db, "users", user.uid);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                const loadedData = docSnap.data();
                const safeTimerState = { isRunning: false, startTime: null, elapsed: loadedData?.timerState?.elapsed || 0, laps: loadedData?.timerState?.laps || [] };
                const safeData = {
                    NEET: {}, JEE: {}, dailyGoals: [], tests: [], mistakes: [],
                    studyHistory: {}, syllabusCustom: {},
                    ...loadedData, timerState: safeTimerState
                };
                setData(safeData);
                restoreExamLocal(safeData);
                // Cache save with timestamp
                try { localStorage.setItem(cacheKey, JSON.stringify(safeData)); localStorage.setItem(cacheTimeKey, String(Date.now())); } catch(e) {}
            }
            setIsFetched(true);
        } catch (err) {
            console.error("Load error:", err);
            // ERROR HANDLING: User-facing messages for load failures
            const code = err?.code || '';
            // Offline fallback: stale cache bhi chalega
            try {
                const backup = localStorage.getItem(cacheKey);
                if (backup) {
                    const parsed = JSON.parse(backup);
                    parsed.timerState = { ...parsed.timerState, isRunning: false, startTime: null };
                    setData(parsed);
                    restoreExamLocal(parsed);
                    if (!navigator.onLine) {
                        showToast('📶 Offline — showing last saved data.');
                    } else if (code === 'permission-denied') {
                        showToast('⚠️ Permission error. Please logout & login again.');
                    } else if (code === 'resource-exhausted' || code === 'quota-exceeded') {
                        showToast('⚠️ Firebase quota exceeded. Showing cached data.');
                    } else {
                        showToast('⚠️ Offline mode — showing cached data.');
                    }
                } else {
                    // No cache either — show meaningful error
                    if (!navigator.onLine) {
                        showToast('📶 No internet & no cache. Please connect and refresh.');
                    } else {
                        showToast('⚠️ Could not load data. Please refresh the page.');
                    }
                }
            } catch(backupErr) { console.error("Backup load error:", backupErr); }
            setIsFetched(true);
        }
    };
    if (user) loadFromDB();
}, [user]);

// PRO FIX: Background auto-poll useEffect REMOVED.
// Original design: user manually refreshes on other device to get latest data.
// Auto-poll was causing unnecessary Firestore reads every 2 min per user.

    // 4. SMART SAVE — Debounced + Cache-First + Bandwidth Optimized
    // Strategy:
    //   Part A: localStorage INSTANTLY (har change pe, zero cost)
    //   Part B: Firestore DEBOUNCED — 4 second wait, multiple changes batch ho jaate hain
    //           Isse "100 writes" ki jagah "5-10 writes" hoti hain per session
    //           Cache timestamp bhi update karte hain taaki next app open pe Firestore read skip ho
    const unsavedChangesRef = React.useRef(false);
    const saveDebounceTimerRef = React.useRef(null);

    // Part A: LocalStorage — Instant save (reload proof, zero Firebase cost)
    useEffect(() => {
        if (!isFetched) return;
        unsavedChangesRef.current = true;
        const dataToSave = { ...data, _currentExam: currentExam || '' };
        const cacheKey = 'localDataBackup_' + user?.uid;
        const cacheTimeKey = 'localDataTime_' + user?.uid;
        try {
            const jsonStr = JSON.stringify(dataToSave);
            // PRO FIX: localStorage 2MB size guard — browser crash se bachao
            // Agar 2MB se zyada ho toh sirf last 30 din ki history rakho
            if (jsonStr.length < 2 * 1024 * 1024) {
                localStorage.setItem(cacheKey, jsonStr);
            } else {
                const { studyHistory, ...rest } = dataToSave;
                const keys = Object.keys(studyHistory || {}).sort().slice(-30);
                const trimmed = {};
                keys.forEach(k => { trimmed[k] = studyHistory[k]; });
                localStorage.setItem(cacheKey, JSON.stringify({ ...rest, studyHistory: trimmed }));
                console.warn("⚠️ localStorage: trimmed to last 30 days history to fit 2MB");
            }
            localStorage.setItem('currentExam', currentExam || '');
        } catch(e) { 
            console.error("Local Save Error", e);
            // localStorage full ya blocked — user ko batao
            if (e.name === 'QuotaExceededError') {
                showToast('⚠️ Storage full! Old history cleared automatically.');
            }
        }
    }, [data, currentExam, isFetched, user]);

    // Part B: Firestore — Debounced cloud save
    useEffect(() => {
        if (!user || !window.dbFuncs || !window.db) return;

        const saveToCloudNow = async () => {
            if (!unsavedChangesRef.current) return;
            console.log("🔥 Debounced Cloud Sync...");
            const { doc, setDoc } = window.dbFuncs;
            try {
                const docRef = doc(window.db, "users", user.uid);
                const saveTimestamp = Date.now();
                const dataToSave = { ...data, _currentExam: currentExam || '', _lastSaved: saveTimestamp };

                // PRO FIX: 1MB SIZE GUARD — Firestore hard limit hai 1MB per document
                // Agar exceed ho toh oldest studyHistory trim karo — data loss nahi hoga
                const sizeBytes = new TextEncoder().encode(JSON.stringify(dataToSave)).length;
                if (sizeBytes > 900 * 1024) { // 900KB = safe buffer
                    console.warn(`⚠️ Size ${Math.round(sizeBytes/1024)}KB near 1MB! Auto-trimming...`);
                    if (dataToSave.studyHistory) {
                        const keys = Object.keys(dataToSave.studyHistory).sort();
                        // Sirf last 60 din rakho
                        keys.slice(0, Math.max(keys.length - 60, 0)).forEach(k => delete dataToSave.studyHistory[k]);
                    }
                    if (dataToSave.timerState?.laps?.length > 50) {
                        dataToSave.timerState.laps = dataToSave.timerState.laps.slice(-50);
                    }
                }

                await setDoc(docRef, dataToSave, { merge: true });
                unsavedChangesRef.current = false;
                const cacheKey = 'localDataBackup_' + user.uid;
                const cacheTimeKey = 'localDataTime_' + user.uid;
                try {
                    localStorage.setItem(cacheKey, JSON.stringify(dataToSave));
                    localStorage.setItem(cacheTimeKey, String(saveTimestamp));
                } catch(e) {}
                console.log("✅ Cloud sync done — _lastSaved:", saveTimestamp);
            } catch (err) {
                console.error("Cloud Save Error:", err);
                // ERROR HANDLING: User-facing messages for common Firebase errors
                const code = err?.code || '';
                if (code === 'resource-exhausted' || code === 'quota-exceeded') {
                    showToast('⚠️ Firebase quota exceeded! Data saved locally only.');
                } else if (code === 'permission-denied') {
                    showToast('⚠️ Save failed: Permission denied. Please logout & login again.');
                } else if (code === 'unavailable' || !navigator.onLine) {
                    showToast('📶 Offline — data saved locally, will sync when online.');
                } else if (code === 'unauthenticated') {
                    showToast('⚠️ Session expired. Please login again.');
                    setTimeout(() => { window.location.href = 'login.html'; }, 2000);
                } else {
                    showToast('⚠️ Cloud save failed. Data is safe locally.');
                }
            }
        };

        // Debounce: multiple rapid changes ko 2 MIN baad ek write mein batch karo
        // Example: 50 checkbox clicks in 2 min = sirf 1 Firestore write (not 50)
        // App close/refresh/tab switch pe turant save hota hai (neeche handlers hain)
        const triggerDebouncedSave = () => {
            if (saveDebounceTimerRef.current) clearTimeout(saveDebounceTimerRef.current);
            saveDebounceTimerRef.current = setTimeout(() => {
                if (unsavedChangesRef.current) saveToCloudNow();
            }, 120000); // 2 minutes = 120000ms (was 4000ms)
        };

        // Trigger debounced save on every data change
        if (unsavedChangesRef.current) triggerDebouncedSave();

        // App minimize / tab switch hone pe turant save karo
        const handleVisibility = () => {
            if (document.visibilityState === 'hidden') {
                if (saveDebounceTimerRef.current) clearTimeout(saveDebounceTimerRef.current);
                saveToCloudNow();
            }
        };

        // Browser close / reload pe save karo
        const handleUnload = () => {
            if (unsavedChangesRef.current) saveToCloudNow();
        };

        // 2 minute fallback save (long sessions mein data loss prevent karo)
        const intervalID = setInterval(() => {
            if (unsavedChangesRef.current) saveToCloudNow();
        }, 120000);

        document.addEventListener('visibilitychange', handleVisibility);
        window.addEventListener('beforeunload', handleUnload);

        return () => {
            clearInterval(intervalID);
            if (saveDebounceTimerRef.current) clearTimeout(saveDebounceTimerRef.current);
            document.removeEventListener('visibilitychange', handleVisibility);
            window.removeEventListener('beforeunload', handleUnload);
        };
    }, [user, data, currentExam]);
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

    // --- PERSISTENT CHAPTER LIST HELPER ---
    // Returns the effective chapter list for a subject, merging EXAM_SYLLABUS with
    // persisted adds, deletes, and renames stored in data.syllabusCustom
    const getChapters = (examName, className, subject) => {
        if (!examName || !EXAM_SYLLABUS[examName]?.[className]?.[subject]) return [];
        // Start from original syllabus (copy to avoid mutation)
        let chapters = [...EXAM_SYLLABUS[examName][className][subject]];
        const custom = data.syllabusCustom?.[examName]?.[className]?.[subject] || {};
        const deleted = custom.deleted || [];
        const added = custom.added || [];
        const renamed = custom.renamed || {}; // { oldName: newName }

        // Apply renames to base list
        chapters = chapters.map(ch => renamed[ch] || ch);
        // Remove deleted
        chapters = chapters.filter(ch => !deleted.includes(ch));
        // Add custom chapters (that aren't already present)
        added.forEach(ch => { if (!chapters.includes(ch)) chapters.push(ch); });
        return chapters;
    };

// --- INSTANT SAVE FIX (Reload karne par data nahi udega) ---
    const updateChapterData = (className, subject, chapter, newData) => {
        setData(prev => {
            // 1. Naya state calculate karo
            const nextState = {
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
            };

            // 2. localStorage mein TURANT save + cache timestamp invalidate karo
            // (taaki next open pe Firestore se fresh data aaye agar cache stale ho jaye)
            if (user?.uid) {
                const cacheKey = 'localDataBackup_' + user.uid;
                const cacheTimeKey = 'localDataTime_' + user.uid;
                try {
                    localStorage.setItem(cacheKey, JSON.stringify({ ...nextState, _currentExam: currentExam || '' }));
                    // Cache time ko current time se 25 min peeche set karo
                    // Iska matlab: next open pe background revalidation trigger hogi (5 min threshold)
                    // par immediate Firestore read nahi hogi (still within 30 min window)
                    localStorage.setItem(cacheTimeKey, String(Date.now() - 25 * 60 * 1000));
                } catch(e) {}
            }

            // 3. Debounced Firestore write (setData ke baad useEffect trigger karega)
            // Direct Firestore call yahaan nahi karni — debounce handle karega
            // Isse 10 rapid checkbox clicks = 1 Firestore write (not 10)
            unsavedChangesRef.current = true;

            return nextState; // UI update
        });
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

    const addCustomChapter = (className, subject, chapterName) => {
        const currentChapters = getChapters(currentExam, className, subject);
        if (!currentChapters.includes(chapterName)) {
            setData(prev => {
                const prevCustom = prev.syllabusCustom || {};
                const prevExam = prevCustom[currentExam] || {};
                const prevClass = prevExam[className] || {};
                const prevSubject = prevClass[subject] || {};
                const prevAdded = prevSubject.added || [];
                const nextState = {
                    ...prev,
                    syllabusCustom: {
                        ...prevCustom,
                        [currentExam]: {
                            ...prevExam,
                            [className]: {
                                ...prevClass,
                                [subject]: {
                                    ...prevSubject,
                                    added: [...prevAdded, chapterName]
                                }
                            }
                        }
                    }
                };
                // Debounce karega Firestore write (saves writes + bandwidth)
                unsavedChangesRef.current = true;
                return nextState;
            });
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
        if (!currentExam || !EXAM_SYLLABUS[currentExam]?.[className]?.[subject]) return 0;
        const chapters = getChapters(currentExam, className, subject);
        if (!chapters || chapters.length === 0) return 0;
        const total = chapters.reduce((sum, chapter) => sum + getProgress(className, subject, chapter), 0);
        return Math.round(total / chapters.length);
    };

    const getClassProgress = (className) => {
        if (!currentExam || !EXAM_SYLLABUS[currentExam]?.[className]) return 0;
        const subjects = Object.keys(EXAM_SYLLABUS[currentExam][className]);
        if (!subjects || subjects.length === 0) return 0;
        const total = subjects.reduce((sum, subject) => sum + getSubjectProgress(className, subject), 0);
        return Math.round(total / subjects.length);
    };
const getAnalytics = (filterClass = 'Overall') => {
        // Guard: currentExam must be set
        if (!currentExam || !EXAM_SYLLABUS[currentExam]) {
            return {
                overallProgress: 0, totalChapters: 0, completedChapters: 0,
                avgSatisfaction: 0, strongCount: 0, moderateCount: 0, weakCount: 0,
                neglectedSubject: 'None', neglectedProgress: 0
            };
        }
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
                const chapters = getChapters(currentExam, className, subject);
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
                // Validate that the imported data has expected structure
                if (typeof importedData !== 'object' || importedData === null) {
                    throw new Error('Invalid data format');
                }
                // Merge with safe defaults to prevent missing key crashes
                const safeData = {
                    NEET: {},
                    JEE: {},
                    dailyGoals: [],
                    tests: [],
                    mistakes: [],
                    studyHistory: {},
                    syllabusCustom: {},
                    timerState: { isRunning: false, startTime: null, elapsed: 0, laps: [] },
                    ...importedData,
                    // Always reset timer running state on import
                    timerState: { 
                        ...(importedData.timerState || {}), 
                        isRunning: false,
                        startTime: null
                    }
                };
                setData(safeData);
                showToast('Data imported successfully!');
            } catch (error) {
                showToast('Error importing data. Please check the file format.');
            }
        };
        reader.readAsText(file);
        // Reset file input so same file can be imported again if needed
        event.target.value = '';
    };


    // --- CTX OBJECT: All shared state/functions passed to child components ---
    // This fixes the React anti-pattern of defining components inside App.
    // Components are now defined outside App and receive ctx as a single prop.
    // This prevents unnecessary re-mounting on every setData() call.
    const ctx = {
        data, setData, currentExam, setCurrentExam, user,
        navigateTo, changeExam, showToast, setShowModal, setModalConfig,
        getChapterData, getProgress, getSubjectProgress, getClassProgress, getAnalytics,
        getChapters, getSubjectClass, updateChapterData, addCustomChapter,
        exportData, importData,
        selectedClass, setSelectedClass, selectedSubject, setSelectedSubject,
        selectedChapter, setSelectedChapter,
        editMode, setEditMode, isFocusMode, setIsFocusMode,
        forceChapterRefresh, unsavedChangesRef, isFetched, customChapterVersion,
        triggerRevision, view, toast, activeNotif, notifShow, setNotifShow,
        showModal, modalConfig, compressImage
    };

    if (!isFetched) return null;
   return React.createElement(React.Fragment, null,
        // --- 1. SMART FLOATING REVISION BUTTON (Disappears when all clear) ---
        (data.mistakes || []).some(m => !m.mastered) && React.createElement('button', { 
            className: 'floating-rev-btn', 
            onClick: triggerRevision, 
            title: 'Quick Revision' 
        }, '💡'),

        // --- 2. MAIN VIEWS ---
        view === 'exam-select' && React.createElement(ExamSelectView, ctx),
        view === 'home' && React.createElement(HomePage, ctx),
        view === 'subjects' && React.createElement(SubjectsView, ctx),
        view === 'chapters' && React.createElement(ChaptersView, ctx),
        view === 'detail' && React.createElement(DetailView, ctx),
        view === 'dashboard' && React.createElement(DashboardView, ctx),
        view === 'daily-goals' && React.createElement(DailyGoalsView, ctx),
        view === 'test-analysis' && React.createElement(TestAnalysisView, ctx),
        view === 'stopwatch' && React.createElement(StopwatchView, ctx),
        view === 'error-book' && React.createElement(ErrorBookView, ctx),

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
        notifShow && activeNotif && React.createElement('div', { className: 'error-notification show', onClick: () => { setNotifShow(false); navigateTo('error-book'); } },
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

// React 18: createRoot replaces deprecated ReactDOM.render
const rootElement = document.getElementById('root');
if (!window.__reactRootMounted) {
    window.__reactRootMounted = ReactDOM.createRoot(rootElement);
}
window.__reactRootMounted.render(React.createElement(App));
