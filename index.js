import fetch from 'node-fetch';

var allData, teams, elements;

function setVar(value) {
    allData = value;
    teams = allData.teams;
    elements = allData.elements;

    listAllPlayersForTeam("TEAM_NAME");
}

function listAllPlayersForTeam(teamName) {
    var teamCode = -1;
    for (var i in teams) {
        var parent = teams[i].name.toString().toLowerCase();
        var child = teamName.toLowerCase();
        if (parent.includes(child)) {
            teamCode = teams[i].code;
            break;
        }
    }

    if (teamCode == -1) console.log("No teams with this name");
    else {
        for (var j in elements) {
            if (elements[j].team_code == teamCode) console.log(elements[j].first_name + " " + elements[j].second_name);
        }
    }
}

var response = fetch('https://fantasy.premierleague.com/api/bootstrap-static/')
    .then(res => res.json())
    .then(res => setVar(res));

// Team Name, Position, Statistic with a Threshold