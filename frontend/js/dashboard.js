async function loadContent(route) {
    const res = await fetch(route);

    const data = await res.text();

    document.getElementById("main-content").innerHTML = data;
};