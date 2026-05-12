class Student {
    constructor(id, name, semester, courses) {
        this.id = id;
        this.name = name;
        this.semester = semester;
        this.courses = courses;
    }
}

const student1 = new Student("S101", "Musab Ejaz", 6, ["Data Structures", "Web Dev", "Databases"]);
const student2 = new Student("S102", "Tayyab Janjua", 6, ["Operating Systems", "Networks", "Gen AI"]);
const student3 = new Student("S103", "Hassan Raza", 6, ["Programming", "Calculus", "Physics"]);

const students = [student1, student2, student3];

const container = document.getElementById("student-container");

let htmlContent = "";

students.forEach(student => {

    const coursesHTML = student.courses
        .map(course => `<span class="course-tag">${course}</span>`)
        .join("");

    htmlContent += `
        <div class="student-card">
            <h2>${student.name}</h2>
            <p><strong>Student ID:</strong> ${student.id}</p>
            <p><strong>Semester:</strong> ${student.semester}</p>
            <div class="courses">
                ${coursesHTML}
            </div>
        </div>
    `;
});

container.innerHTML = htmlContent;