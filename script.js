// We add a listener to determine whether DOMContentLoaded loads properly.
// Then we load a function grabbing a reference to the document, it does not store a copy of the element it is the actual reference to the DOM value
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("addCourseForm");

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Retrieves the values inside Course Name etc..
        const courseName = document.getElementById("courseName").value;
        const courseCode = document.getElementById("courseCode").value;
        const courseInstructor = document.getElementById("courseInstructor").value;
        const courseSemester = document.getElementById("courseSemester").value;

        // Store Data in a Variable
        // Using Object literal Structure
        // Easier to define an object
        const course = {
            name: courseName,
            code: courseCode, 
            instructor: courseInstructor,
            semester: courseSemester,
        };

        // Shows the user that the course has been added successfully
        console.log("Courses Added: ", course);

        // Clear the form after submission
        form.reset();
    });
});
