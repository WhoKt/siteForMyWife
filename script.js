/* TIMER */
const startDate = new Date("2025-05-30T00:00:00");

function updateTimer() {
    const now = new Date();
    const diff = now - startDate;

    document.getElementById("days").textContent = Math.floor(diff / 86400000);
    document.getElementById("hours").textContent = Math.floor(diff / 3600000) % 24;
    document.getElementById("minutes").textContent = Math.floor(diff / 60000) % 60;
    document.getElementById("seconds").textContent = Math.floor(diff / 1000) % 60;
}

setInterval(updateTimer, 1000);
updateTimer();


/* REVEAL */
const observer = new IntersectionObserver(
    (entries) => {
        entries.forEach((e) => {
            if (e.isIntersecting) e.target.classList.add("active");
        });
    },
    { threshold: 0.15 }
);

document.querySelectorAll(".reveal").forEach((el) => observer.observe(el));


/* SECRET BUTTONS */
const messages = [
    "я тя лю. Ну это вдруг если ты забыла",
    "подарю тебе дом с голубыми ставнями и видом на реку, чтоб ты могла рисовать тупа",
    "артём какашка"
];

function showSecret(i) {
    const box = document.getElementById("secretBox");

    box.classList.remove("text-animate");
    void box.offsetWidth;

    box.textContent = messages[i];
    box.classList.add("text-animate");
}

window.showSecret = showSecret;


/* PHOTO LIGHTBOX + DESCRIPTIONS */
const photoData = [
    "тупа ты всегда(я кстати не против)))",
    "прикольная темка получилась",
    "тёмная ночь... только пули свистят по степи...",
    "просто красивый момент где мы тупа в будущем будем",
    "тупа мы когда уединяемся😏",
    "хахахаххаха ну ты и китайка пузатая",
    "смешное выражение лица у тебя :)))",
    "чут чут я испугался тогда",
    "усатые мы",
    "я фотограф.... поставил камеру на штатив..."
];

const lightbox = document.getElementById("lightbox");
const lightboxImg = document.getElementById("lightboxImg");
const lightboxText = document.getElementById("lightboxText");

document.querySelectorAll(".photo img").forEach((img) => {
    img.addEventListener("click", () => {
        const index = Number(img.dataset.index);

        lightboxImg.src = img.src;
        lightboxText.textContent = photoData[index] || "";

        lightbox.classList.add("active");
    });
});

lightbox.addEventListener("click", () => {
    lightbox.classList.remove("active");
});

/* GALLERY REVEAL */
const photoObserver = new IntersectionObserver(
    (entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
                photoObserver.unobserve(entry.target);
            }
        });
    },
    { threshold: 0.2 }
);

document.querySelectorAll(".photo").forEach((photo, index) => {
    photo.style.transitionDelay = (index * 60) + "ms";
    photoObserver.observe(photo);
});
