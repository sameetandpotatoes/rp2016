$( document ).ready(function() {
    $.getJSON('assets/js/companies.json', function (data) {
        for (var index in data) {
            var company = data[index];
            var $mainPane = $("<div>", {"class": "row company-card"});
            $mainPane.append("<img src='" + company.image +  "' class='col-sm-12 col-lg-3'/>");
            var textDiv = $("<div>", {"class": "col-sm-12 col-lg-9"})
            textDiv.append($("<p></p>").text(company.description));
            textDiv.append($("<p></p>")
                            .append($("<span style='font-weight:bold'>Opportunities: </span>"))
                            .append($("<span></span>").text(company.seeking)));
            textDiv.append($("<p></p>")
                            .append($("<span style='font-weight:bold'>Work Authorization: </span>"))
                            .append($("<span></span>").text(company.work)));
            $mainPane.append(textDiv);
            $(".companies-list").append($mainPane);
        }
    });
});
