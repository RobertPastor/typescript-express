
function navBarClicked($this) {
    console.log("Nav Bar link clicked " + String($this.name));
    navBarCleanHighlights();
    $("a[name='" + String($this.name) + "']").addClass("highlight-underline");
    return false;
}

function navBarCleanHighlights() {
    $.each(["navBarIndex", "navBarAuthenticate", "navBarTools", "navBarProjects"], function (index, value) {
        $("a[name='" + String(value) + "']").removeClass("highlight-underline");
    });
}

function highLightNavBar(name) {
    console.log("High light nav bar element = " + String(name));
    $("a[name='" + String(name) + "']").addClass("highlight-underline");
}