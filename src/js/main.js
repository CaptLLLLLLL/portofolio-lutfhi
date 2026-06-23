const menuBtn = document.getElementById("menuBtn");
const navMenu = document.getElementById("navMenu");
const logoBtn = document.getElementById("logo");
const exploreBtn = document.getElementById("exploreBtn");
const cards = document.querySelectorAll(".project-card");
const nextBtn = document.getElementById("nextProject");
const prevBtn = document.getElementById("prevProject");
const mainFooter = document.getElementById("mainFooter");

const sectionList = [
    "heroSection",
    "aboutSection",
    "projectSection",
    "experienceSection",
    "contactSection",
];

let currentSection = 0;
let currentProject = 0;
let isMenuOpen = false;

function switchSection(targetId, direction = "in") {
    const allSections = document.querySelectorAll(".section");
    const target = document.getElementById(targetId);

    if (!target) {
        return;
    }

    allSections.forEach((section) => {
        section.classList.remove("active", "zoom-in", "zoom-out");
    });

    target.classList.add(direction === "in" ? "zoom-in" : "zoom-out");

    setTimeout(() => {
        target.classList.add("active");
    }, 10);

    document.querySelectorAll(".nav-dot").forEach((dot) => {
        dot.classList.remove("active-dot");
    });

    const activeDot = document.querySelector(`.nav-dot[data-section="${targetId}"]`);

    if (activeDot) {
        activeDot.classList.add("active-dot");
    }

    if (mainFooter) {
        if (targetId === "projectDetailSection") {
            mainFooter.classList.add("opacity-0", "pointer-events-none", "translate-y-10");
        } else {
            mainFooter.classList.remove("opacity-0", "pointer-events-none", "translate-y-10");
        }
    }

    currentSection = sectionList.indexOf(targetId);
    document.querySelectorAll(".nav-link").forEach((link) => {
        link.classList.toggle(
            "active-nav",
            link.dataset.section === targetId
        );
    });

    currentSection = sectionList.indexOf(targetId);
}

function toggleMenu() {
    isMenuOpen = !isMenuOpen;

    menuBtn.classList.toggle("active");

    if (isMenuOpen) {
        navMenu.classList.remove(
            "opacity-0",
            "pointer-events-none",
            "-translate-x-full",
            "sm:-translate-x-5"
        );

        navMenu.classList.add(
            "opacity-100",
            "translate-x-0"
        );

        logoBtn.classList.remove("left-1/2", "-translate-x-1/2");
        logoBtn.classList.add("right-10");

        return;
    }

    navMenu.classList.add(
        "opacity-0",
        "pointer-events-none",
        "-translate-x-full",
        "sm:-translate-x-5"
    );

    navMenu.classList.remove(
        "opacity-100",
        "translate-x-0"
    );

    logoBtn.classList.add("left-1/2", "-translate-x-1/2");
    logoBtn.classList.remove("right-10");
}

document.querySelectorAll(".nav-link").forEach((link) => {
    link.addEventListener("click", () => {
        switchSection(link.dataset.section, "in");

        if (isMenuOpen) {
            toggleMenu();
        }
    });
});

const closeMenu = document.getElementById("closeMenu");

if (closeMenu) {
    closeMenu.addEventListener("click", toggleMenu);
}

function goToNextSection() {
    currentSection++;

    if (currentSection >= sectionList.length) {
        currentSection = 0;
    }

    switchSection(sectionList[currentSection], "in");
}

function updateSlider() {
    const total = cards.length;

    if (!total) {
        return;
    }

    const prev = (currentProject - 1 + total) % total;
    const next = (currentProject + 1) % total;

    cards.forEach((card, index) => {
        card.classList.remove("active-card", "left-card", "right-card", "hidden-card");

        if (index === currentProject) {
            card.classList.add("active-card");
        } else if (index === prev) {
            card.classList.add("left-card");
        } else if (index === next) {
            card.classList.add("right-card");
        } else {
            card.classList.add("hidden-card");
        }
    });

    document.querySelectorAll(".slider-dot").forEach((dot, index) => {
        dot.classList.toggle("active-slider-dot", index === currentProject);
    });
}

function goToNextProject() {
    currentProject++;

    if (currentProject >= cards.length) {
        currentProject = 0;
    }

    updateSlider();
}

function goToPrevProject() {
    currentProject--;

    if (currentProject < 0) {
        currentProject = cards.length - 1;
    }

    updateSlider();
}

if (menuBtn && navMenu && logoBtn) {
    menuBtn.addEventListener("click", toggleMenu);
}

if (logoBtn) {
    logoBtn.addEventListener("click", () => {
        switchSection("heroSection", "out");
    });
}

if (exploreBtn) {
    exploreBtn.addEventListener("click", goToNextSection);
}

document.querySelectorAll(".nav-dot").forEach((dot) => {
    dot.addEventListener("click", () => {
        switchSection(dot.dataset.section, "in");
    });
});

if (nextBtn) {
    nextBtn.addEventListener("click", goToNextProject);
}

if (prevBtn) {
    prevBtn.addEventListener("click", goToPrevProject);
}

updateSlider();

// Experience Section
const experienceData = [
    {
        role: "Frontend Web Developer",
        company: "PT. Mitra Graha Integrasi",
        desc: "Designed user interfaces for web and Mobile platforms, created interactive prototypes, and improve product usability and visual consistency.",
        impacts: [
            "Created web and CMS interface layouts",
            "Built design prototypes in Figma",
            "Improved UI consistency across pages"
        ],
        tags: ["Figma", "UI Design", "Prototype", "CMS"]
    },
    {
        role: "Graphic Designer",
        company: "PT. Gemilang Duabelas Prosindo",
        desc: "Created visual assets, branding materials, and promotional layouts for digital and internal company content.",
        impacts: [
            "Created visual design assets",
            "Supported branding materials",
            "Designed promotional layouts"
        ],
        tags: ["Branding", "Visual Design", "Creative"]
    },
    {
        role: "Frontend Web Developer",
        company: "PT. Kiano Karya Cemerlang",
        desc: "Built responsive web interfaces and transformed layouts into clean, maintainable frontend components.",
        impacts: [
            "Built responsive web interfaces",
            "Implemented UI layouts into code",
            "Improved component consistency"
        ],
        tags: ["HTML", "CSS", "Tailwind", "JavaScript"]
    }
];

const expItems = document.querySelectorAll(".exp-item");
const expRole = document.getElementById("expRole");
const expCompany = document.getElementById("expCompany");
const expDesc = document.getElementById("expDesc");
const expImpactList = document.getElementById("expImpactList");
const expTagList = document.getElementById("expTagList");

function updateExperience(index) {
    const data = experienceData[index];

    expRole.textContent = data.role;
    expCompany.textContent = data.company;
    expDesc.textContent = data.desc;

    expImpactList.innerHTML = data.impacts.map(item => `
        <div class="exp-impact">
            <span></span>
            <p>${item}</p>
        </div>
    `).join("");

    expTagList.innerHTML = data.tags.map(tag => `
        <span class="exp-tag">${tag}</span>
    `).join("");

    expItems.forEach(item => {
        item.classList.remove("active-exp");
    });

    expItems[index].classList.add("active-exp");
}

if (
    expItems.length &&
    expRole &&
    expCompany &&
    expDesc &&
    expImpactList &&
    expTagList
) {
    expItems.forEach(item => {
        item.addEventListener("click", () => {
            const index = item.dataset.exp;
            updateExperience(index);
        });
    });

    updateExperience(0);
}

// Project Detail Section
const projectData = [
    {
        title: "MIGRASI Company Profile",
        category: "UI/UX Design | Web & CMS",
        image: "./src/img/cmigrasi.png",
        desc: "Designed a company profile website and CMS interface for PT. Mitra Graha Integrasi, focusing on clean layout, content structure, usability, and visual consistency across public and admin pages.",
        tools: ["Figma", "UI Design", "CMS", "Prototype"],
        link: "https://www.figma.com/design/vcyuLu5A7raf7OocOCShDC/Website-MIGRASI?t=vuGgatn6XQ3VPhsJ-1"
    },
    {
        title: "Revamp UI ReflectQ",
        category: "Mobile UI Design",
        image: "./src/img/cref.png",
        desc: "Designed a mobile user interface with a focus on usability, visual appeal, and seamless user experience.",
        tools: ["Figma", "Mobile UI", "UX Flow"],
        link: "https://www.figma.com/design/dL2JwpYTyNPoFe93poqYeU/Revamp-UI-UX-Aplikasi-RefletQ?node-id=0-1&t=mfxN1FRGsrqtlZ06-1"
    },
    {
        title: "Mobile UI/UX Design Maseer",
        category: "Mobile App",
        image: "./src/img/cmas.png",
        desc: "Designed a mobile UI/UX concept for a Hajj navigation app, helping pilgrims find the nearest entrance gate to Masjid Al-Haram through intuitive route recommendations and a user-friendly interface.",
        tools: ["Figma", "Mobile UI", "Prototype", "Consultation"],
        link: "https://www.figma.com/design/587NxhzjieRaPz4FHSd0XR/Mobile-UI-UX-Design-Maseer?node-id=0-1&t=mfxN1FRGsrqtlZ06-1"
    }
];

const detailImage = document.getElementById("detailImage");
const detailTitle = document.getElementById("detailTitle");
const detailCategory = document.getElementById("detailCategory");
const detailDesc = document.getElementById("detailDesc");
const detailTools = document.getElementById("detailTools");
const detailLink = document.getElementById("detailLink");
const backToProjects = document.getElementById("backToProjects");

function openProjectDetail(index) {
    const project = projectData[index];

    detailImage.src = project.image;
    detailTitle.textContent = project.title;
    detailCategory.textContent = project.category;
    detailDesc.textContent = project.desc;
    detailLink.href = project.link;

    detailTools.innerHTML = project.tools.map(tool => `
        <span class="px-3 py-1 rounded-full border bg-[#20C8FF]/10 border-[#20C8FF]/30 text-xs sm:text-sm">
            ${tool}
        </span>
    `).join("");

    mainFooter.classList.add(
        "opacity-0",
        "pointer-events-none",
        "translate-y-10"
    );

    switchSection("projectDetailSection", "in");
}

document.querySelectorAll(".project-card").forEach((card) => {
    card.addEventListener("click", (e) => {
        e.preventDefault();
        const index = Number(card.dataset.project);
        openProjectDetail(index);
    });
});

backToProjects.addEventListener("click", () => {
    switchSection("projectSection", "out");
});