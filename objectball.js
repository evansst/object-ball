function gameObject() {
  return {
    home: {
      teamName: 'Brooklyn Nets',
      colors: ['Black', 'White'],
      players : {
        'Alan Anderson': {
          number: 0,
          shoe: 16,
          points: 22,
          rebounds: 12,
          assists: 12,
          steals: 3,
          blocks: 1,
          slamDunks: 1
        },
        'Reggie Evans': {
          number: 30,
          shoe: 14,
          points: 12,
          rebounds: 12,
          assists: 12,
          steals: 12,
          blocks: 12,
          slamDunks: 7
        },
          'Brook Lopez': {
          number: 11,
          shoe: 17,
          points: 17,
          rebounds: 19,
          assists: 10,
          steals: 3,
          blocks: 1,
          slamDunks: 15
        },
          'Mason Plumlee': {
          number: 1,
          shoe: 19,
          points: 26,
          rebounds: 12,
          assists: 6,
          steals: 3,
          blocks: 8,
          slamDunks: 5
        },
          'Jason Terry': {
          number: 31,
          shoe: 15,
          points: 19,
          rebounds: 2,
          assists: 2,
          steals: 4,
          blocks: 11,
          slamDunks: 1
        }
      }
    },
    away: {
      teamName: 'Charlotte Hornets',
      colors: ['Turquoise', 'Purple'],
      players : {
        'Jeff Adrian': {
          number: 4,
          shoe: 18,
          points: 10,
          rebounds: 1,
          assists: 1,
          steals: 2,
          blocks: 7,
          slamDunks: 2
        },
        'Bismak Biyombo': {
          number: 0,
          shoe: 16,
          points: 12,
          rebounds: 4,
          assists: 7,
          steals: 7,
          blocks: 15,
          slamDunks: 10
        },
        'DeSagna Diop': {
          number: 2,
          shoe: 14,
          points: 24,
          rebounds: 12,
          assists: 12,
          steals: 4,
          blocks: 5,
          slamDunks: 5
        },
        'Ben Gordon': {
          number: 8,
          shoe: 15,
          points: 33,
          rebounds: 3,
          assists: 2,
          steals: 1,
          blocks: 1,
          slamDunks: 0
        },
        'Brendan Haywood': {
          number: 33,
          shoe: 15,
          points: 6,
          rebounds: 12,
          assists: 12,
          steals: 22,
          blocks: 5,
          slamDunks: 12
        }
      }
    }
  };
}


function numPointsScored(playerName) {
  return playerStats(playerName).points;
}

function shoeSize(playerName) {
  return getPlayerByName(playerName).shoe;
}

function teamColors(teamname) {
  return getTeamByName(teamname).colors;
}

function teamNames() {
  return [homeTeam().teamName, awayTeam().teamName];
}

function playerNumbers(teamName) {
  return Object.keys(getPlayersByTeamName(teamName)).map( player => playerHash()[player].number );
}


function playerStats(playerName) {
  return getPlayerByName(playerName);
}

function bigShoeRebounds() {
  const maxRebounds = Math.max(...listOfStats('rebounds'));
  return playerStats(findPlayerByStat('rebounds', maxRebounds)).shoe;
}

function mostPointsScored() {
  const maxPoints = Math.max(...listOfStats('points'));
  return findPlayerByStat('points', maxPoints);
}

function winningTeam() {
  const homeTeamPoints = statsByTeam(homeTeam().teamName, 'points');
  const awayTeamPoints = statsByTeam(awayTeam().teamName, 'points');
  return homeTeamPoints > awayTeamPoints ? homeTeam().teamName : awayTeam().teamName;
}

function playerWithLongestName() {
  return playerNames().reduce(function(previousName, currentName) {
    return previousName.length > currentName.length ? previousName : currentName;
  });
}

function doesLongNameStealATon() {
  const maxSteals = Math.max(...listOfStats('steals'));
  return getPlayerByName(playerWithLongestName()).steals == maxSteals;
}

function teamName(location) {
  return location === 'home' ? homeTeam().teamName : awayTeam().teamName;
}

function homeTeam() {
  return gameObject().home;
}

function awayTeam() {
  return gameObject().away;
}

function playerHash() {
  return { ...homeTeam().players, ...awayTeam().players };
}

function getPlayerByName(playerName) {
  return playerHash()[playerName];
}

function getTeamByName(teamname) {
  return homeTeam().teamName === teamname ? homeTeam() : awayTeam();
}

function getPlayersByTeamName(teamname) {
  return getTeamByName(teamname).players;
}

function listOfStats(stat) {
  return Object.keys(playerHash()).map( player => playerHash()[player][stat] ); 
}

function statsByTeam(teamname, stat) {
  return Object.keys(getPlayersByTeamName(teamname)).map( player => playerHash()[player][stat] );
}

function findPlayerByStat(stat, value) {
  return Object.keys(playerHash()).find( player => playerHash()[player][stat] ===  value);
}

function playerNames() {
  return Object.keys(playerHash());
}


console.log(`'${teamName('home')}' should be 'Brooklyn Nets'`);
console.log('Ben Gordon scored ' + numPointsScored('Ben Gordon'));
console.log('Brooklyn Nets colors are ' + teamColors('Brooklyn Nets'));
console.log('Team names are ' + teamNames());
console.log('The Nets numbers are ' + playerNumbers('Brooklyn Nets'));
console.log('The shoe size of the player with the most rebounds is ' + bigShoeRebounds());
console.log(mostPointsScored() + ' scored the most points.');
console.log(winningTeam() + 'is the winning team!');
console.log(playerWithLongestName() + ' has the longest name.');
console.log(doesLongNameStealATon());