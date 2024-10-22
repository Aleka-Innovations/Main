// Main

function YouTube() {
    window.open("https://youtube.com/@aleka_2024?si=PvfJFMh3HnF8bCVS")
}

function Discord() {
    window.open("https://discord.gg/F6Qh7wmjNk")
}

function TikTok() {
    window.open("https://www.tiktok.com/@aleka_2024_?_t=8qkkwIFrOwj&_r=1")
}

function Twitter() {
    window.open("https://x.com/Aleka_2024")
}


function Join() {
    window.open("https://www.roblox.com/groups/3812713/Aleka#!/about")
}

document.addEventListener("DOMContentLoaded", function() {
    // Array med bakgrunnsbilder
    const backgrounds = [
        '/Main/Images/Background1.png',
        '/Main/Images/Background2.png',
        '/Main/Images/Background3.png'
    ];

    // Forhåndslaste alle bakgrunnsbilder
    backgrounds.forEach(function(image) {
        const img = new Image();
        img.src = image;
    });

    // Velg et tilfeldig bilde fra arrayen
    const randomIndex = Math.floor(Math.random() * backgrounds.length);

    // Sett bakgrunnsbildet på body-elementet
    document.body.style.backgroundImage = `url(${backgrounds[randomIndex]})`;
});