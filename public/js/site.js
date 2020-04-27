function navBarClicked($this) {
    console.log("Nav Bar link clicked " + String($this.name));
    navBarCleanHighlights();
    $("a[name='" + String($this.name) + "']").addClass("highlight-underline");
    return false;
}

function navBarCleanHighlights() {
    $.each(["navBarIndex", "navBarProjectVersions", "navBarKlocMeasures", "navBarComponentsOptions", "navBarTests", "navBarAbout"], function (index, value) {
        $("a[name='" + String(value) + "']").removeClass("highlight-underline");
    });
}