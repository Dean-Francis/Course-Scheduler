// We add a listener to determine whether DOMContentLoaded loads properly.
// Then we load a function grabbing a reference to the document, it does not store a copy of the element it is the actual reference to the DOM value
document.addEventListener("DOMContentLoaded", function() {
    const form = document.getElementById("addCourseForm");
    const addedCoursesContainer = document.getElementById("addedCourses");
    const addedTimeDayContainer = document.getElementById("addedTimeDay");

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

        // Retrieve the values from the form
        const courseName = document.getElementById("courseName").value.trim();
        const courseCode = document.getElementById("courseCode").value.trim();
        const courseInstructor = document.getElementById("courseInstructor").value.trim();
        const creditHours = document.getElementById("creditHours").value.trim();

        // Validate form inputs
        if (courseName && courseCode && courseInstructor && creditHours) {
            // Create a new container for the course
            const courseSection = document.createElement("div");
            courseSection.classList.add("course-section");

            // Add course details and a form for timing and day
            courseSection.innerHTML = `
                <h4>${courseName}</h4>
                <p>Course Code: ${courseCode}</p>
                <p>Instructor: ${courseInstructor}</p>
                <p>Credit Hours: ${creditHours}</p>
                <div class="courseTimeDay">
                    <form class="timeDayForm">
                        <label for="courseTime">From:</label>
                        <input type="time" id="from" name="courseTime" required>
                        <label for="courseTime">To:</label>
                        <input type="time" id="to" name="courseTime" required>
                        <label for="courseDay">Day:</label>
                        <select id="courseDay" name="courseDay" required>
                            <option value="Monday">Monday</option>
                            <option value="Tuesday">Tuesday</option>
                            <option value="Wednesday">Wednesday</option>
                            <option value="Thursday">Thursday</option>
                            <option value="Friday">Friday</option>
                        </select>
                        <button type="submit" class="addTimeDay">Add Time & Day</button>
                    </form>
                    <div class="timeDayList">
                        <h5>Added Timings:</h5>
                        <ul></ul>
                    </div>
                </div>
                <button class="removeCourse">Remove Course</button>
            `;

            // Append the new container to the added courses container
            addedCoursesContainer.appendChild(courseSection);

            // Add a click event listener to the remove course button
            const removeCourseButton = courseSection.querySelector(".removeCourse");
            removeCourseButton.addEventListener("click", function() {
                addedCoursesContainer.removeChild(courseSection);
            });

            // Add event listener to the "Add Time & Day" button
            const timeDayForm = courseSection.querySelector(".timeDayForm");
            const timeDayList = courseSection.querySelector(".timeDayList ul");

            timeDayForm.addEventListener("submit", function (event) {
                event.preventDefault();

                // Retrieve the timing and day values
                const fromTime = courseSection.querySelector("#from").value.trim();
                const toTime = courseSection.querySelector("#to").value.trim();
                const courseDay = courseSection.querySelector("#courseDay").value.trim();

                // Validate the inputs
                if (fromTime && toTime && courseDay) {
                    // Create a new list item
                    const listItem = document.createElement("li");
                    listItem.textContent = `Timing: ${fromTime} - ${toTime}, Day: ${courseDay}`;

                    // Create a "Remove Timing" button
                    const removeButton = document.createElement("button");
                    removeButton.textContent = "Remove Timing";
                    removeButton.classList.add("removeTiming");

                    // Append the button to the list item
                    listItem.appendChild(removeButton);

                    // Append the list item to the list
                    timeDayList.appendChild(listItem);

                    // Add event listener to the "Remove Timing" button
                    removeButton.addEventListener("click", function () {
                        timeDayList.removeChild(listItem);
                    });

                    // Clear the input fields for the next entry
                    timeDayForm.reset();
                } else {
                    alert("Please fill out the timing and day fields.");
                }
            });

            // Clear the form after submission
            form.reset();
        } else {
            // Show an alert if any field is missing
            alert("Please fill out all fields before submitting.");
        }
    });
});
