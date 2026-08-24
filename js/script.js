/* =========================================
   MOBILE MENU
========================================= */

const mobileMenuBtn = document.getElementById("mobileMenuBtn");
const navMenu = document.getElementById("navMenu");

if (mobileMenuBtn && navMenu) {

    mobileMenuBtn.addEventListener("click", function () {

        navMenu.classList.toggle("active");

        const icon = mobileMenuBtn.querySelector("i");

        if (navMenu.classList.contains("active")) {
            icon.classList.remove("fa-bars");
            icon.classList.add("fa-xmark");
        } else {
            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");
        }

    });

}


/* =========================================
   CLOSE MOBILE MENU
========================================= */

const navLinks = document.querySelectorAll(".nav-link");

navLinks.forEach(function (link) {

    link.addEventListener("click", function () {

        if (navMenu) {
            navMenu.classList.remove("active");
        }

        if (mobileMenuBtn) {

            const icon = mobileMenuBtn.querySelector("i");

            icon.classList.remove("fa-xmark");
            icon.classList.add("fa-bars");

        }

    });

});


/* =========================================
   ACTIVE NAVIGATION
========================================= */

const sections = document.querySelectorAll("section[id]");

window.addEventListener("scroll", function () {

    let currentSection = "";

    sections.forEach(function (section) {

        const sectionTop = section.offsetTop - 150;
        const sectionHeight = section.offsetHeight;

        if (
            window.scrollY >= sectionTop &&
            window.scrollY < sectionTop + sectionHeight
        ) {
            currentSection = section.getAttribute("id");
        }

    });


    navLinks.forEach(function (link) {

        link.classList.remove("active");

        if (
            link.getAttribute("href") === "#" + currentSection
        ) {
            link.classList.add("active");
        }

    });

});


/* =========================================
   COUNTER ANIMATION
========================================= */

const counters = document.querySelectorAll(".counter");

let counterStarted = false;

function startCounters() {

    if (counterStarted) {
        return;
    }

    const statsSection =
        document.querySelector(".stats-section");

    if (!statsSection) {
        return;
    }

    const sectionPosition =
        statsSection.getBoundingClientRect().top;

    if (sectionPosition < window.innerHeight - 100) {

        counterStarted = true;

        counters.forEach(function (counter) {

            const target =
                Number(counter.getAttribute("data-target"));

            let current = 0;

            const increment =
                Math.max(1, Math.ceil(target / 60));

            const timer = setInterval(function () {

                current += increment;

                if (current >= target) {

                    current = target;

                    clearInterval(timer);

                }

                counter.textContent =
                    current.toLocaleString();

            }, 25);

        });

    }

}

window.addEventListener("scroll", startCounters);
window.addEventListener("load", startCounters);


/* =========================================
   BACK TO TOP
========================================= */

const backToTop =
    document.getElementById("backToTop");

window.addEventListener("scroll", function () {

    if (!backToTop) {
        return;
    }

    if (window.scrollY > 500) {
        backToTop.classList.add("show");
    } else {
        backToTop.classList.remove("show");
    }

});


if (backToTop) {

    backToTop.addEventListener("click", function () {

        window.scrollTo({
            top: 0,
            behavior: "smooth"
        });

    });

}


/* =========================================
   CONTACT FORM
========================================= */

const contactForm =
    document.getElementById("contactForm");

const emailModal =
    document.getElementById("emailModal");

const emailModalClose =
    document.getElementById("emailModalClose");

const openGmail =
    document.getElementById("openGmail");

const openEmailApp =
    document.getElementById("openEmailApp");

const copyEnquiry =
    document.getElementById("copyEnquiry");

const copySuccess =
    document.getElementById("copySuccess");

const modalRecipient =
    document.getElementById("modalRecipient");


/* =========================================
   BUSINESS EMAIL
========================================= */

const recipientEmail =
    "info@lexoralegal.com";


/* =========================================
   ENQUIRY DATA
========================================= */

let enquiryData = {
    name: "",
    phone: "",
    email: "",
    service: "",
    message: ""
};


/* =========================================
   GET FORM DATA
========================================= */

function createEmailData() {

    const name =
        document.getElementById("name").value.trim();

    const phone =
        document.getElementById("phone").value.trim();

    const email =
        document.getElementById("email").value.trim();

    const service =
        document.getElementById("service").value.trim();

    const message =
        document.getElementById("message").value.trim();


    enquiryData = {
        name: name,
        phone: phone,
        email: email,
        service: service,
        message: message
    };


    return enquiryData;

}


/* =========================================
   EMAIL SUBJECT
========================================= */

function createEmailSubject() {

    return "New Legal Enquiry - " + enquiryData.name;

}


/* =========================================
   EMAIL BODY
========================================= */

function createEmailBody() {

    return (
        "Hello,\n\n" +

        "A new enquiry has been submitted " +
        "through the website.\n\n" +

        "--------------------------------\n" +

        "Name: " +
        enquiryData.name +
        "\n" +

        "Phone: " +
        enquiryData.phone +
        "\n" +

        "Email: " +
        enquiryData.email +
        "\n" +

        "Legal Service: " +
        enquiryData.service +
        "\n" +

        "--------------------------------\n\n" +

        "Message:\n" +

        enquiryData.message +

        "\n\n" +

        "--------------------------------\n\n" +

        "This enquiry was submitted " +
        "from the website."
    );

}


/* =========================================
   OPEN GMAIL
========================================= */

function openGmailCompose() {

    const subject =
        createEmailSubject();

    const body =
        createEmailBody();


    const gmailUrl =
        "https://mail.google.com/mail/?" +
        "view=cm" +
        "&fs=1" +
        "&to=" +
        encodeURIComponent(recipientEmail) +
        "&su=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);


    window.open(
        gmailUrl,
        "_blank"
    );

}


/* =========================================
   OPEN DEFAULT EMAIL APP
========================================= */

function openDefaultEmailApp() {

    const subject =
        createEmailSubject();

    const body =
        createEmailBody();


    const mailtoLink =
        "mailto:" +
        recipientEmail +
        "?subject=" +
        encodeURIComponent(subject) +
        "&body=" +
        encodeURIComponent(body);


    window.location.href =
        mailtoLink;

}


/* =========================================
   COPY ENQUIRY
========================================= */

function copyCompleteEnquiry() {

    const text =
        "To: " +
        recipientEmail +

        "\n\n" +

        "Subject: " +
        createEmailSubject() +

        "\n\n" +

        createEmailBody();


    function showCopySuccess() {

        if (copySuccess) {

            copySuccess.classList.add("show");

            setTimeout(function () {

                copySuccess.classList.remove("show");

            }, 3000);

        }

    }


    if (
        navigator.clipboard &&
        navigator.clipboard.writeText
    ) {

        navigator.clipboard
            .writeText(text)
            .then(function () {

                showCopySuccess();

            })
            .catch(function () {

                fallbackCopy(text);

            });

    } else {

        fallbackCopy(text);

    }

}


/* =========================================
   COPY FALLBACK
========================================= */

function fallbackCopy(text) {

    const temporaryTextArea =
        document.createElement("textarea");

    temporaryTextArea.value = text;

    temporaryTextArea.style.position = "fixed";
    temporaryTextArea.style.left = "-9999px";

    document.body.appendChild(
        temporaryTextArea
    );

    temporaryTextArea.focus();
    temporaryTextArea.select();

    try {

        document.execCommand("copy");

    } catch (error) {

        console.error(
            "Copy failed:",
            error
        );

    }

    temporaryTextArea.remove();


    if (copySuccess) {

        copySuccess.classList.add("show");

        setTimeout(function () {

            copySuccess.classList.remove("show");

        }, 3000);

    }

}


/* =========================================
   OPEN MODAL
========================================= */

function showEmailModal() {

    if (!emailModal) {
        return;
    }


    if (modalRecipient) {

        modalRecipient.textContent =
            recipientEmail;

    }


    emailModal.classList.add("active");

    document.body.classList.add(
        "modal-open"
    );

}


/* =========================================
   CLOSE MODAL
========================================= */

function closeEmailModal() {

    if (!emailModal) {
        return;
    }


    emailModal.classList.remove("active");

    document.body.classList.remove(
        "modal-open"
    );

}


/* =========================================
   CONTACT FORM SUBMIT
========================================= */

if (contactForm) {

    contactForm.addEventListener(
        "submit",
        function (event) {

            event.preventDefault();


            const data =
                createEmailData();


            /* -----------------------------
               NAME
            ----------------------------- */

            if (!data.name) {

                alert(
                    "Please enter your name."
                );

                document
                    .getElementById("name")
                    .focus();

                return;

            }


            /* -----------------------------
               PHONE
            ----------------------------- */

            if (!data.phone) {

                alert(
                    "Please enter your phone number."
                );

                document
                    .getElementById("phone")
                    .focus();

                return;

            }


            /* -----------------------------
               EMAIL
            ----------------------------- */

            if (!data.email) {

                alert(
                    "Please enter your email address."
                );

                document
                    .getElementById("email")
                    .focus();

                return;

            }


            /* -----------------------------
               SERVICE
            ----------------------------- */

            if (!data.service) {

                alert(
                    "Please select a legal service."
                );

                document
                    .getElementById("service")
                    .focus();

                return;

            }


            /* -----------------------------
               MESSAGE
            ----------------------------- */

            if (!data.message) {

                alert(
                    "Please enter your message."
                );

                document
                    .getElementById("message")
                    .focus();

                return;

            }


            /* -----------------------------
               EMAIL FORMAT
            ----------------------------- */

            const emailPattern =
                /^[^\s@]+@[^\s@]+\.[^\s@]+$/;


            if (!emailPattern.test(data.email)) {

                alert(
                    "Please enter a valid email address."
                );

                document
                    .getElementById("email")
                    .focus();

                return;

            }


            /* -----------------------------
               PHONE FORMAT
            ----------------------------- */

            const phoneDigits =
                data.phone.replace(/\D/g, "");


            if (
                phoneDigits.length < 7 ||
                phoneDigits.length > 15
            ) {

                alert(
                    "Please enter a valid phone number."
                );

                document
                    .getElementById("phone")
                    .focus();

                return;

            }


            /* -----------------------------
               GMAIL
            ----------------------------- */

            const emailLower =
                data.email.toLowerCase();


            if (
                emailLower.endsWith("@gmail.com")
            ) {

                openGmailCompose();

                return;

            }


            /* -----------------------------
               OTHER EMAIL
            ----------------------------- */

            showEmailModal();

        }
    );

}


/* =========================================
   MODAL CLOSE BUTTON
========================================= */

if (emailModalClose) {

    emailModalClose.addEventListener(
        "click",
        closeEmailModal
    );

}


/* =========================================
   OPEN GMAIL FROM MODAL
========================================= */

if (openGmail) {

    openGmail.addEventListener(
        "click",
        function () {

            openGmailCompose();

            closeEmailModal();

        }
    );

}


/* =========================================
   OPEN EMAIL APP
========================================= */

if (openEmailApp) {

    openEmailApp.addEventListener(
        "click",
        function () {

            openDefaultEmailApp();

        }
    );

}


/* =========================================
   COPY ENQUIRY BUTTON
========================================= */

if (copyEnquiry) {

    copyEnquiry.addEventListener(
        "click",
        function () {

            copyCompleteEnquiry();

        }
    );

}


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

if (emailModal) {

    emailModal.addEventListener(
        "click",
        function (event) {

            if (event.target === emailModal) {

                closeEmailModal();

            }

        }
    );

}


/* =========================================
   ESCAPE KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            emailModal &&
            emailModal.classList.contains("active")
        ) {

            closeEmailModal();

        }

    }
);


/* =========================================
   NAVBAR SHADOW
========================================= */

const navbar =
    document.querySelector(".navbar");

window.addEventListener(
    "scroll",
    function () {

        if (!navbar) {
            return;
        }


        if (window.scrollY > 20) {

            navbar.style.boxShadow =
                "0 5px 25px rgba(0, 0, 0, 0.08)";

        } else {

            navbar.style.boxShadow =
                "none";

        }

    }
);


/* =========================================
   PAGE LOAD
========================================= */

window.addEventListener(
    "load",
    function () {

        document.body.classList.add(
            "page-loaded"
        );

    }
);

/* =========================================
   TEAM PROFILE MODAL
========================================= */

const profileModal =
    document.getElementById("profileModal");

const profileModalClose =
    document.getElementById("profileModalClose");

const profileModalName =
    document.getElementById("profileModalName");

const profileModalDesignation =
    document.getElementById("profileModalDesignation");

const profileModalContent =
    document.getElementById("profileModalContent");

const profileLinkedIn =
    document.getElementById("profileLinkedIn");

const profileEmail =
    document.getElementById("profileEmail");

const viewProfileButtons =
    document.querySelectorAll(".view-profile-btn");


/* =========================================
   OPEN PROFILE
========================================= */

function openProfileModal(button) {

    if (!profileModal) {
        return;
    }


    const teamCard =
        button.closest(".team-card");


    if (!teamCard) {
        return;
    }


    const nameElement =
        teamCard.querySelector(".team-main-info h3");


    const designationElement =
        teamCard.querySelector(".team-main-info p");


    const profileDetails =
        teamCard.querySelector(".profile-details");


    const linkedinLink =
        teamCard.querySelector(
            ".team-social a[href]"
        );


    const emailLink =
        teamCard.querySelector(
            ".team-social a[href^='mailto:']"
        );


    /* -----------------------------
       BASIC PROFILE INFORMATION
    ----------------------------- */

    if (profileModalName && nameElement) {

        profileModalName.textContent =
            nameElement.textContent.trim();

    }


    if (
        profileModalDesignation &&
        designationElement
    ) {

        profileModalDesignation.textContent =
            designationElement.textContent.trim();

    }


    /* -----------------------------
       PROFILE DETAILS
    ----------------------------- */

    if (profileModalContent && profileDetails) {

        profileModalContent.innerHTML =
            profileDetails.innerHTML;

    }


    /* -----------------------------
       SOCIAL LINKS
    ----------------------------- */

    if (profileLinkedIn) {

        if (
            linkedinLink &&
            linkedinLink.getAttribute("href") !== "#"
        ) {

            profileLinkedIn.href =
                linkedinLink.getAttribute("href");

            profileLinkedIn.style.display =
                "inline-flex";

        } else {

            profileLinkedIn.style.display =
                "none";

        }

    }


    if (profileEmail) {

        if (emailLink) {

            profileEmail.href =
                emailLink.getAttribute("href");

            profileEmail.style.display =
                "inline-flex";

        }

    }


    /* -----------------------------
       SHOW MODAL
    ----------------------------- */

    profileModal.classList.add("active");

    profileModal.setAttribute(
        "aria-hidden",
        "false"
    );

    document.body.style.overflow =
        "hidden";


    /* Focus close button */

    if (profileModalClose) {

        setTimeout(function () {

            profileModalClose.focus();

        }, 100);

    }

}


/* =========================================
   CLOSE PROFILE MODAL
========================================= */

function closeProfileModal() {

    if (!profileModal) {
        return;
    }


    profileModal.classList.remove("active");

    profileModal.setAttribute(
        "aria-hidden",
        "true"
    );

    document.body.style.overflow = "";

}


/* =========================================
   VIEW PROFILE BUTTONS
========================================= */

viewProfileButtons.forEach(function (button) {

    button.addEventListener(
        "click",
        function () {

            openProfileModal(button);

        }
    );

});


/* =========================================
   CLOSE BUTTON
========================================= */

if (profileModalClose) {

    profileModalClose.addEventListener(
        "click",
        closeProfileModal
    );

}


/* =========================================
   CLICK OUTSIDE MODAL
========================================= */

if (profileModal) {

    profileModal.addEventListener(
        "click",
        function (event) {

            if (
                event.target ===
                profileModal
            ) {

                closeProfileModal();

            }

        }
    );

}


/* =========================================
   ESC KEY
========================================= */

document.addEventListener(
    "keydown",
    function (event) {

        if (
            event.key === "Escape" &&
            profileModal &&
            profileModal.classList.contains(
                "active"
            )
        ) {

            closeProfileModal();

        }

    }
);