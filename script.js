// ==========================================
// STUDENT HUB - MODULAR JAVASCRIPT
// ==========================================


// ==========================================
// 1. FETCH JSON DATA
// ==========================================

async function fetchJSON(file) {

    try {

        const response = await fetch(file);

        if (!response.ok) {
            throw new Error(
                `Failed to load ${file}`
            );
        }

        return await response.json();

    } catch (error) {

        console.error(error);
        throw error;

    }
}


// ==========================================
// 2. COMMON PAGINATION
// ==========================================

function paginate(data, currentPage, itemsPerPage) {

    const start =
        (currentPage - 1) * itemsPerPage;

    const end =
        start + itemsPerPage;

    return data.slice(start, end);
}


// ==========================================
// 3. EVENTS MODULE
// ==========================================

async function loadEvents() {

    const container =
        document.getElementById("eventList");

    if (!container) return;


    // Loading message

    container.innerHTML =
        "<p>Loading events...</p>";


    try {

        const events =
            await fetchJSON("data/events.json");


        let currentPage = 1;

        const itemsPerPage = 3;


        function render() {

            let data = [...events];


            // SEARCH

            const search =
                document.getElementById("search")
                    .value
                    .toLowerCase();

            data = data.filter(event =>

                event.title
                    .toLowerCase()
                    .includes(search) ||

                event.category
                    .toLowerCase()
                    .includes(search) ||

                event.description
                    .toLowerCase()
                    .includes(search)
            );


            // FILTER

            const filter =
                document.getElementById("filter")
                    .value;

            if (filter !== "all") {

                data = data.filter(event =>
                    event.category === filter
                );

            }


            // SORT

            const sort =
                document.getElementById("sort")
                    .value;

            if (sort === "title") {

                data.sort((a, b) =>
                    a.title.localeCompare(b.title)
                );

            }

            if (sort === "date") {

                data.sort((a, b) =>
                    new Date(a.date) -
                    new Date(b.date)
                );

            }


            // TOTAL PAGES

            const totalPages =
                Math.ceil(
                    data.length / itemsPerPage
                );


            if (
                currentPage > totalPages &&
                totalPages > 0
            ) {
                currentPage = totalPages;
            }


            // PAGINATION

            const pageData =
                paginate(
                    data,
                    currentPage,
                    itemsPerPage
                );


            // DYNAMIC RENDERING

            container.innerHTML = "";


            if (pageData.length === 0) {

                container.innerHTML =
                    "<p>No events found.</p>";

            } else {

                pageData.forEach(event => {

                    const card =
                        document.createElement("div");

                    card.className =
                        "event-json-card";

                    card.innerHTML = `
                        <div class="event-content">

                            <h3>
                                ${event.title}
                            </h3>

                            <p>
                                <strong>Category:</strong>
                                ${event.category}
                            </p>

                            <p>
                                <strong>Date:</strong>
                                ${event.date}
                            </p>

                            <p>
                                <strong>Venue:</strong>
                                ${event.venue}
                            </p>

                            <p>
                                ${event.description}
                            </p>

                        </div>
                    `;

                    container.appendChild(card);

                });

            }


            // PAGE NUMBER

            document.getElementById(
                "pageNumber"
            ).textContent =
                `Page ${totalPages === 0 ? 0 : currentPage}
                 of ${totalPages}`;


            // BUTTONS

            document.getElementById("prev")
                .disabled =
                currentPage <= 1;

            document.getElementById("next")
                .disabled =
                currentPage >= totalPages ||
                totalPages === 0;

        }


        // SEARCH

        document.getElementById("search")
            .addEventListener("input", () => {

                currentPage = 1;

                render();

            });


        // FILTER

        document.getElementById("filter")
            .addEventListener("change", () => {

                currentPage = 1;

                render();

            });


        // SORT

        document.getElementById("sort")
            .addEventListener("change", () => {

                currentPage = 1;

                render();

            });


        // PREVIOUS

        document.getElementById("prev")
            .addEventListener("click", () => {

                if (currentPage > 1) {

                    currentPage--;

                    render();

                }

            });


        // NEXT

        document.getElementById("next")
            .addEventListener("click", () => {

                const totalPages =
                    Math.ceil(
                        events.length /
                        itemsPerPage
                    );

                if (currentPage < totalPages) {

                    currentPage++;

                    render();

                }

            });


        render();


    } catch (error) {

        container.innerHTML = `
            <p class="error">
                ⚠️ Unable to load events.
                Please try again later.
            </p>
        `;

    }

}


// ==========================================
// 4. STUDENTS MODULE
// ==========================================

async function loadStudents() {

    const container =
        document.getElementById("studentList");

    if (!container) return;


    container.innerHTML =
        "<p>Loading student profiles...</p>";


    try {

        const students =
            await fetchJSON("data/students.json");


        let currentPage = 1;

        const itemsPerPage = 5;


        function render() {

            let data = [...students];


            // SEARCH

            const search =
                document.getElementById(
                    "studentSearch"
                ).value.toLowerCase();


            data = data.filter(student =>

                student.name
                    .toLowerCase()
                    .includes(search) ||

                student.rollNo
                    .toLowerCase()
                    .includes(search) ||

                student.branch
                    .toLowerCase()
                    .includes(search)
            );


            // FILTER

            const filter =
                document.getElementById(
                    "branchFilter"
                ).value;


            if (filter !== "all") {

                data = data.filter(student =>
                    student.branch === filter
                );

            }


            // SORT

            const sort =
                document.getElementById(
                    "studentSort"
                ).value;


            if (sort === "name") {

                data.sort((a, b) =>
                    a.name.localeCompare(b.name)
                );

            }


            if (sort === "rollNo") {

                data.sort((a, b) =>
                    a.rollNo.localeCompare(b.rollNo)
                );

            }


            const totalPages =
                Math.ceil(
                    data.length / itemsPerPage
                );


            if (
                currentPage > totalPages &&
                totalPages > 0
            ) {
                currentPage = totalPages;
            }


            const pageData =
                paginate(
                    data,
                    currentPage,
                    itemsPerPage
                );


            container.innerHTML = "";


            if (pageData.length === 0) {

                container.innerHTML =
                    "<p>No students found.</p>";

            } else {

                pageData.forEach(student => {

                    const card =
                        document.createElement("div");

                    card.className = "card";

                    card.innerHTML = `

                        <h3>
                            ${student.name}
                        </h3>

                        <p>
                            <strong>Roll No:</strong>
                            ${student.rollNo}
                        </p>

                        <p>
                            <strong>Branch:</strong>
                            ${student.branch}
                        </p>

                        <p>
                            <strong>Semester:</strong>
                            ${student.semester}
                        </p>

                        <p>
                            <strong>Email:</strong>
                            ${student.email}
                        </p>

                    `;

                    container.appendChild(card);

                });

            }


            document.getElementById(
                "studentPage"
            ).textContent =
                `Page ${totalPages === 0 ? 0 : currentPage}
                 of ${totalPages}`;


            document.getElementById(
                "studentPrev"
            ).disabled = currentPage <= 1;


            document.getElementById(
                "studentNext"
            ).disabled =
                currentPage >= totalPages ||
                totalPages === 0;

        }


        document.getElementById(
            "studentSearch"
        ).addEventListener("input", () => {

            currentPage = 1;

            render();

        });


        document.getElementById(
            "branchFilter"
        ).addEventListener("change", () => {

            currentPage = 1;

            render();

        });


        document.getElementById(
            "studentSort"
        ).addEventListener("change", () => {

            currentPage = 1;

            render();

        });


        document.getElementById(
            "studentPrev"
        ).addEventListener("click", () => {

            if (currentPage > 1) {

                currentPage--;

                render();

            }

        });


        document.getElementById("studentNext")
    .addEventListener("click", () => {
        if (currentPage < Math.ceil(students.length / itemsPerPage)) {
            currentPage++;
            render();
        }
    });


        render();


    } catch (error) {

        container.innerHTML = `
            <p class="error">
                ⚠️ Unable to load student profiles.
            </p>
        `;

    }

}


// ==========================================
// 5. FAQ MODULE
// ==========================================

async function loadFAQs() {

    const container =
        document.getElementById("faqList");

    if (!container) return;


    container.innerHTML =
        "<p>Loading FAQs...</p>";


    try {

        const faqs =
            await fetchJSON("data/faqs.json");


        let currentPage = 1;

        const itemsPerPage = 5;


        function render() {

            let data = [...faqs];


            // SEARCH

            const search =
                document.getElementById(
                    "faqSearch"
                ).value.toLowerCase();


            data = data.filter(faq =>

                faq.question
                    .toLowerCase()
                    .includes(search) ||

                faq.answer
                    .toLowerCase()
                    .includes(search)
            );


            // FILTER

            const filter =
                document.getElementById(
                    "faqFilter"
                ).value;


            if (filter !== "all") {

                data = data.filter(faq =>
                    faq.category === filter
                );

            }


            // SORT

            const sort =
                document.getElementById(
                    "faqSort"
                ).value;


            if (sort === "question") {

                data.sort((a, b) =>
                    a.question.localeCompare(
                        b.question
                    )
                );

            }


            const totalPages =
                Math.ceil(
                    data.length / itemsPerPage
                );


            if (
                currentPage > totalPages &&
                totalPages > 0
            ) {
                currentPage = totalPages;
            }


            const pageData =
                paginate(
                    data,
                    currentPage,
                    itemsPerPage
                );


            container.innerHTML = "";


            if (pageData.length === 0) {

                container.innerHTML =
                    "<p>No FAQs found.</p>";

            } else {

                pageData.forEach(faq => {

                    const item =
                        document.createElement("div");

                    item.className = "faq-item";

                    item.innerHTML = `

                        <button
                            class="faq-question"
                            onclick="toggleFAQ(this)"
                        >
                            ${faq.question}
                        </button>

                        <div
                            class="faq-answer"
                            style="display:none;"
                        >
                            <p>
                                <strong>
                                    ${faq.category}
                                </strong>
                            </p>

                            <p>
                                ${faq.answer}
                            </p>
                        </div>

                    `;

                    container.appendChild(item);

                });

            }


            document.getElementById(
                "faqPage"
            ).textContent =
                `Page ${totalPages === 0 ? 0 : currentPage}
                 of ${totalPages}`;


            document.getElementById(
                "faqPrev"
            ).disabled = currentPage <= 1;


            document.getElementById("faqNext")
    .addEventListener("click", () => {
        if (currentPage < Math.ceil(faqs.length / itemsPerPage)) {
            currentPage++;
            render();
        }
    });

        }


        document.getElementById(
            "faqSearch"
        ).addEventListener("input", () => {

            currentPage = 1;

            render();

        });


        document.getElementById(
            "faqFilter"
        ).addEventListener("change", () => {

            currentPage = 1;

            render();

        });


        document.getElementById(
            "faqSort"
        ).addEventListener("change", () => {

            currentPage = 1;

            render();

        });


        document.getElementById(
            "faqPrev"
        ).addEventListener("click", () => {

            if (currentPage > 1) {

                currentPage--;

                render();

            }

        });


        document.getElementById(
            "faqNext"
        ).addEventListener("click", () => {

            if (currentPage < totalPages) {

                currentPage++;

                render();

            }

        });


        render();


    } catch (error) {

        container.innerHTML = `
            <p class="error">
                ⚠️ Unable to load FAQs.
            </p>
        `;

    }

}


// ==========================================
// 6. FAQ TOGGLE
// ==========================================

function toggleFAQ(button) {

    const answer =
        button.nextElementSibling;

    if (answer.style.display === "none") {

        answer.style.display = "block";

    } else {

        answer.style.display = "none";

    }

}


// ==========================================
// 7. START APPLICATION
// ==========================================

document.addEventListener(
    "DOMContentLoaded",
    () => {

        loadEvents();

        loadStudents();

        loadFAQs();

    }
);