document.addEventListener("DOMContentLoaded", function () {
    // Declare the global courses array
    let courses = JSON.parse(localStorage.getItem("courses")) || [];
    const form = document.getElementById("addCourseForm");
    const addedCoursesContainer = document.getElementById("addedCourses");

    // Add a new course
    form.addEventListener("submit", function (event) {
        event.preventDefault();

        // Retrieve the values from the form
        const courseName = document.getElementById("courseName").value.trim();
        const courseCode = document.getElementById("courseCode").value.trim();
        const courseInstructor = document.getElementById("courseInstructor").value.trim();
        const creditHours = document.getElementById("creditHours").value.trim();

        // Validate form inputs
        if (courseName && courseCode && courseInstructor && creditHours) {
            // Add the new course to the global courses array
            courses.push({
                courseName,
                courseCode,
                courseInstructor,
                creditHours,
                timings: [] // Initialize timings as an empty array
            });

            // Save the updated array back to localStorage
            localStorage.setItem("courses", JSON.stringify(courses));

            // Reload the courses to reflect the changes
            loadCourses();

            // Clear the form after submission
            form.reset();
        } else {
            alert("Please fill out all fields before submitting.");
        }
    });

    // Load and display courses
    function loadCourses() {
        // Update the global courses array from localStorage
        courses = JSON.parse(localStorage.getItem("courses")) || [];

        // Clear the existing courses in the UI
        addedCoursesContainer.innerHTML = "";

        // Loop through the courses and add them to the UI
        courses.forEach((course, index) => {
            const courseSection = document.createElement("div");
            courseSection.classList.add("course-section");

            courseSection.innerHTML = `
                <h4>${course.courseName}</h4>
                <p>Course Code: ${course.courseCode}</p>
                <p>Instructor: ${course.courseInstructor}</p>
                <p>Credit Hours: ${course.creditHours}</p>
                <div class="courseTimeDay">
                    <form class="timeDayForm">
                        <label for="courseTime">From:</label>
                        <input type="time" id="from-${index}" name="courseTime" required>
                        <label for="courseTime">To:</label>
                        <input type="time" id="to-${index}" name="courseTime" required>
                        <label for="courseDay">Day:</label>
                        <select id="courseDay-${index}" name="courseDay" required>
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
                        <ul>
                            ${(course.timings || [])
                                .map(
                                    (timing) =>
                                        `<li>Timing: ${timing.fromTime} - ${timing.toTime}, Day: ${timing.courseDay}</li>`
                                )
                                .join("")}
                        </ul>
                    </div>
                </div>
                <button class="removeCourse">Remove Course</button>
            `;

            // Append the course section to the container
            addedCoursesContainer.appendChild(courseSection);

            // Add event listener to the "Remove Course" button
            const removeCourseButton = courseSection.querySelector(".removeCourse");
            removeCourseButton.addEventListener("click", function () {
                // Remove the course from the global courses array
                courses.splice(index, 1);

                // Update localStorage to reflect the removal
                localStorage.setItem("courses", JSON.stringify(courses));

                // Reload the courses to reflect the changes in the UI
                loadCourses();
            });

            // Add event listener to the "Add Timings" form
            const timeDayForm = courseSection.querySelector(".timeDayForm");
            const timeDayList = courseSection.querySelector(".timeDayList ul");

            timeDayForm.addEventListener("submit", function (event) {
                event.preventDefault();

                // Retrieve the timing and day values
                const fromTime = document.getElementById(`from-${index}`).value.trim();
                const toTime = document.getElementById(`to-${index}`).value.trim();
                const courseDay = document.getElementById(`courseDay-${index}`).value.trim();

                // Validate the inputs
                if (fromTime && toTime && courseDay) {
                    // Add the timing to the course
                    courses[index].timings = courses[index].timings || [];
                    courses[index].timings.push({ fromTime, toTime, courseDay });

                    // Save the updated courses to localStorage
                    localStorage.setItem("courses", JSON.stringify(courses));

                    // Dynamically update the timings list in the UI
                    const newTiming = document.createElement("li");
                    newTiming.textContent = `Timing: ${fromTime} - ${toTime}, Day: ${courseDay}`;
                    timeDayList.appendChild(newTiming);

                    // Clear the form fields
                    timeDayForm.reset();
                } else {
                    alert("Please fill out the timing and day fields.");
                }
            });
        });
    }

    // Load courses on page load
    loadCourses();
});
