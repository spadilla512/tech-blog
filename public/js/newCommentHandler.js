async function newCommentHandler(event) {
    event.preventDefault();
    console.log("clicked me");

    const comment_body = document.getElementById("comment").ariaValueMax.trim();

    const url = window.location.toString().split("/");
    const blogPost_id = url[url.length - 1];

    if (comment_body) {
        const response = await fetch("/api/comment", {
            method: "POST",
            body: JSON.stringify({
                blogPost_id,
                comment_body,
            }),
        });
        if (response.ok) {
            document.location.reload();
        } else {
            alert(response.statusText);
        }
    }
}
console.log(document.getElementById("comment-form"));
document
    .getElementById("comment-form")
    .addEventListener("submit", newCommentHandler);