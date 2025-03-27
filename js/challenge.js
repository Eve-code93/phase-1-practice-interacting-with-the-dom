document.addEventListener("DOMContentLoaded", () => {
    let counter = document.getElementById("counter");
    let plusBtn = document.getElementById("plus");
    let minusBtn = document.getElementById("minus");
    let likeBtn = document.getElementById("heart");
    let pauseBtn = document.getElementById("pause");
    let commentForm = document.getElementById("comment-form");
    let commentInput = document.getElementById("comment-input");
    let commentList = document.getElementById("list");
    let likesList = document.querySelector(".likes");

    let count = 0;
    let isPaused = false;
    let likes = {};
    
    // Timer function
    let timer = setInterval(() => {
        if (!isPaused) {
            counter.textContent = ++count;
        }
    }, 1000);

    // Increment button
    plusBtn.addEventListener("click", () => {
        counter.textContent = ++count;
    });

    // Decrement button
    minusBtn.addEventListener("click", () => {
        counter.textContent = --count;
    });

    // Like button
    likeBtn.addEventListener("click", () => {
        if (!likes[count]) {
            likes[count] = 1;
        } else {
            likes[count]++;
        }

        let existingLike = document.getElementById(`like-${count}`);
        if (existingLike) {
            existingLike.textContent = `${count} has been liked ${likes[count]} times.`;
        } else {
            let li = document.createElement("li");
            li.id = `like-${count}`;
            li.textContent = `${count} has been liked 1 time.`;
            likesList.appendChild(li);
        }
    });

    // Pause/Resume button
    pauseBtn.addEventListener("click", () => {
        if (!isPaused) {
            clearInterval(timer);
            isPaused = true;
            pauseBtn.textContent = "resume";
            plusBtn.disabled = true;
            minusBtn.disabled = true;
            likeBtn.disabled = true;
        } else {
            timer = setInterval(() => {
                counter.textContent = ++count;
            }, 1000);
            isPaused = false;
            pauseBtn.textContent = "pause";
            plusBtn.disabled = false;
            minusBtn.disabled = false;
            likeBtn.disabled = false;
        }
    });

    // Comment submission
    commentForm.addEventListener("submit", (e) => {
        e.preventDefault();
        let comment = commentInput.value.trim();
        if (comment) {
            let p = document.createElement("p");
            p.textContent = comment;
            commentList.appendChild(p);
            commentInput.value = ""; // Clear input
        }
    });
});
