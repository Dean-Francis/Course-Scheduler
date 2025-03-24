// We add a listener to determine whether DOMContentLoaded loads properly.
// Then we load a function grabbing a reference to the document, it does not store a copy of the element it is the actual reference to the DOM value
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("addCourseForm");

    const prerequisite = {
        // Semester 2
        "LNG 182": ["LNG 181"],
        "BCS 102": ["BCS 101"],
        "MTH 113": ["MTH 112"],
        "ENT 142": ["ENT 141"],
        // Semester 3
        "MTH 114": ["MTH 112"],
        "MTH 130": ["MTH 112"],
        "MTH 203": ["MTH 112", "BCS 102"],
        "ENT 241": ["ENT 142"],
        // Semester 4
        "ENG 210": ["BCS 202, ENG 101"],
        "BCS 203": ["BCS 201", "BCS 202"],
        "BCS 206": ["BCS 202", "MTH 203"],
        "BCS 221": ["BCS 102"],
        "BCS 222": ["BCS 201", "BCS 202"],
        "ENT 242": ["ENT 241"],
        // Semester 5
        "BCS 301": ["BCS 206", "ENG 210"],
        "BCS 303": ["BCS 221"],
        "BCS 304": ["BCS 202", "MTH 114", "MTH 130", "MTH 203"],
        "BCS 311": ["BCS 102", "MTH 114"],
        // Semester 6
        "BCS 305": ["BCS 203", "BCS 206"],
        "BCS 306": ["BCS 201", "BCS 202"],
        "BCS 307": ["ENG 210"],
        "BCS 309": ["BCS 201", "BCS 206"],
        "BCS 323": ["BCS 102"],
        // Semester 7
        "BCS 402": ["BCS 203", "BCS 309"],
        // Semester 8
        "BCS 403": ["BCS 206", "BCS 306"],
        "BCS 405": ["BCS 206", "BCS 222"],
    }

    form.addEventListener("submit", function(event) {
        event.preventDefault();

        // Retrieves the values inside Course Name etc..
        const courseName = document.getElementById("courseName").value;
        const courseCode = document.getElementById("courseCode").value;
        const courseInstructor = document.getElementById("courseInstructor").value;
        const credit_hours = document.getElementById("creditHours").value;

        // Store Data in a Variable
        // Using Object literal Structure
        // Easier to define an object
        const course = {
            name: courseName,
            code: courseCode, 
            instructor: courseInstructor,
            credit_hours: credit_hours,
            
        };


        // Shows the user that the course has been added successfully
        console.log("Courses Added: ", course);

        // Clear the form after submission
        form.reset();
    });
});
